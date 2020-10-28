/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const AWS = require('aws-sdk');
const contentful = require('contentful-management');
const fetch = require('node-fetch');
const spaceImport = require('contentful-import');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const argv = require('yargs-parser')(process.argv.slice(2));
const { exec } = require('child_process');
const exportFile = require('./export.json');

AWS.config.update({ region: 'eu-central-1' });

const mandatoryQuestions = [
    {
        name: 'managementToken',
        when: !argv.managementToken,
        message: 'Your Content Management API access token',
    },
    {
        name: 'githubToken',
        when: !argv.githubToken,
        message: 'Your GitHub personal token',
    },
];


const defaultParams = {
    ArtifactStoreBucket: '53-north-artefacts',
    Customer: '53North',
    EmailService: 'set_manually',
    GitHubRepoOwner: 'SK-ITC',
    GitHubRepoName: 'contentful-boilerplate-1',
    GitHubRepoBranch: 'master',
};

const getPipelineFile = async () => {
    const filePath = path.join(__dirname, '../pipeline.yml');
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

const getRepoName = async () => new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
        if (err) reject(err);
        resolve(stdout.trim());
    });
});

const createEnvironmentFiles = async (spaceId, accessToken, cmaToken) => {
    try {
        console.log('Writing config file...');
        const repoName = await getRepoName();
        // const customerName = repoName.replace('master-', '');
        const customerName = 'ingwerundewig';
        const configFiles = ['.env', `.env.${customerName}`].map(file => path.join(__dirname, '..', file));

        const fileContents = `${[
            'REACT_APP_STAGE=PREVIEW',
            `REACT_APP_CONTENTFUL_SPACE_ID=${spaceId}`,
            `REACT_APP_CONTENTFUL_API_KEY=${accessToken}`,
            `REACT_APP_CONTENTFUL_CMA_API_KEY=${cmaToken}`,
        ].join('\n')}\n`;

        configFiles.forEach((file) => {
            fs.writeFileSync(file, fileContents, 'utf8');
            console.log(`Config file ${chalk.yellow(file)} written`);
        });
    } catch (error) {
        console.error('Error while creating .env files', error);
    }
};

const createStack = async (stackName, pipelineFile, params) => {
    const cloudFormation = new AWS.CloudFormation();
    return cloudFormation.createStack({
        StackName: stackName,
        Capabilities: ['CAPABILITY_IAM'],
        EnableTerminationProtection: false,
        OnFailure: 'DO_NOTHING',
        Parameters: Object.keys(params).map(key => ({
            ParameterKey: key,
            ParameterValue: params[key],
            UsePreviousValue: true
        })),
        TemplateBody: pipelineFile
    }).promise();
};

const createStacks = async (spaceId, accessToken, previewToken, githubToken) => {
    if (!spaceId || !githubToken) {
        console.error('No githubToken or spaceId provided - Stacks won t be created');
        return;
    }

    try {
        const repoName = await getRepoName();
        const pipelineFile = await getPipelineFile();
        const customerName = 'ingwerundewig';
        const stackName = `${customerName.toUpperCase()}-WEBSITE`;

        console.log('Start CloudFormation Stacks creation');
        if (accessToken) {
            const prodParams = {
                ...defaultParams,
                BucketName: `${customerName}-production-bucket`,
                Customer: customerName,
                ContentfulApiKey: accessToken,
                ContentfulSpaceId: spaceId,
                GitHubOauthToken: githubToken,
                GitHubRepoBranch: repoName,
                Stage: 'PRODUCTION',
            };
            const prodStack = await createStack(`${stackName}-PRODUCTION`, pipelineFile, prodParams);
            console.log('CF Production Stack:', prodStack.StackId);
        }

        if (previewToken) {
            const previewParams = {
                ...defaultParams,
                BucketName: `${customerName}-preview-bucket`,
                Customer: customerName,
                ContentfulApiKey: previewToken,
                ContentfulSpaceId: spaceId,
                GitHubOauthToken: githubToken,
                GitHubRepoBranch: repoName,
                Stage: 'PREVIEW',
            };
            const previewStack = await createStack(`${stackName}-PREVIEW`, pipelineFile, previewParams);
            console.log('CF Preview Stack:', previewStack.StackId);
        } else {
            console.warn('No Contentful Preview APi Key provided');
        }
    } catch (error) {
        console.error('Error while creating CloudFormation Stack', error);
    }
};

const updateDefaultLocale = async (spaceId, cmaToken) => {
    const client = await contentful.createClient({ accessToken: cmaToken });
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment('master');
    const locales = await environment.getLocales();
    if (locales && locales.total === 1) {
        // Change default locale
        const locale = await environment.getLocale(locales.items[0].sys.id);
        locale.name = 'German (Germany)';
        locale.code = 'de-DE';
        await locale.update();
    }
};

const getContentfulData = async (cmaToken) => {
    const client = await contentful.createClient({
        accessToken: cmaToken
    });

    const spaces = await client.getSpaces();
    if (spaces && spaces.total === 1) {
        const spaceId = spaces.items[0].sys.id;
        const space = await client.getSpace(spaceId);
        const apiKeys = await space.getApiKeys();
        if (apiKeys && apiKeys.total >= 1) {
            const { accessToken, preview_api_key } = apiKeys.items[0];
            const previewApiKeyId = preview_api_key.sys.id;

            // Workaround SDK currently doesn't implement this endpoint.
            const fetchPdaKey = await fetch(
                `https://api.contentful.com/spaces/${spaceId}/preview_api_keys/${previewApiKeyId}`,
                { headers: { Authorization: `Bearer ${cmaToken}` } }
            );
            const result = await fetchPdaKey.json();
            const previewToken = result.accessToken;

            return { accessToken, previewToken, spaceId };
        }
    }
    return null;
};

const setup = async () => {
    const {
        managementToken, githubToken
    } = await inquirer.prompt(mandatoryQuestions);

    if (!managementToken) {
        console.error('Without CMA Token you are not able to continue');
        return;
    }

    const { accessToken, previewToken, spaceId } = await getContentfulData(managementToken);
    try {
        console.log('Start Contentful Import');
        await updateDefaultLocale(spaceId, managementToken);
        await spaceImport({
            spaceId,
            managementToken,
            content: exportFile,
            contentModelOnly: true,
            skipContent: true,
            skipContentPublishing: true,
        });
    } catch (error) {
        console.error('Error on Contentful Import', error);
    }

    await createStacks(spaceId, accessToken, previewToken, githubToken);
    await createEnvironmentFiles(spaceId, previewToken, managementToken);

    console.log(`All set! You can now run ${chalk.yellow('npm start')} to see it in action.`);
};

console.log(`
  To set up this project you need to provide your Space ID and the belonging API access tokens.
  You can find all the needed information in your Contentful space under:
  ${chalk.yellow(`app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red('->')} API keys`)}

  The ${chalk.green('Content Management API Token')} will be used to import and write data to your space.

  The ${chalk.green('GitHub OAuth Token')} will be used to create a Stack within CloudFormation.

  Ready? Let's do it! 🎉
`);

setup();
