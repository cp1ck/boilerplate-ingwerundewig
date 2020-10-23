/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const contentful = require('contentful-management');
const spaceImport = require('contentful-import');
const dotenv = require('dotenv');
const inquirer = require('inquirer');
const chalk = require('chalk');
const argv = require('yargs-parser')(process.argv.slice(2));
const exportFile = require('./export.json');

dotenv.config();


const {
    REACT_APP_CONTENTFUL_CMA_API_KEY,
    REACT_APP_CONTENTFUL_SPACE_ID,
} = process.env;


const importSetup = async () => {
    console.log(`
        This setup will import the actual export.json into the Space correspondent to the CMA Token 
        If you don't have any CMA token, generate a new one at ${chalk.yellow(`app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red('->')} API keys`)}
        Ready? Let's go! 🎉
    `);

    if (!REACT_APP_CONTENTFUL_CMA_API_KEY || !REACT_APP_CONTENTFUL_SPACE_ID) {
        console.error('You have to set Space ID and CMA Api Key within you env!');
        return;
    }

    try {
        const client = await contentful.createClient({
            accessToken: REACT_APP_CONTENTFUL_CMA_API_KEY
        });
        const space = await client.getSpace(REACT_APP_CONTENTFUL_SPACE_ID);
        if (space) {
            const confirmation = [
                {
                    name: 'startImport',
                    when: !argv.startImport,
                    message: `The Content Type will now be imported to follwing space: 
                     ${chalk.yellow(space.name)},
                    Confirm with ${chalk.green('YES')} or ${chalk.red('NO')}!`,
                },
            ];
            const { startImport } = await inquirer.prompt(confirmation);
            if (startImport === 'YES') {
                await spaceImport({
                    content: exportFile,
                    contentModelOnly: true,
                    managementToken: REACT_APP_CONTENTFUL_CMA_API_KEY,
                    skipContent: true,
                    skipLocales: true,
                    skipContentPublishing: true,
                    spaceId: REACT_APP_CONTENTFUL_SPACE_ID,
                });
                console.log(chalk.green('Import All Done!'));
            }
        }
    } catch (error) {
        console.error('Oh no! Some errors occurred!', error);
    }
};

importSetup();
