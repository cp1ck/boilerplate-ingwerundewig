/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const contentful = require('contentful-management');
const spaceExport = require('contentful-export');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();


const {
    REACT_APP_CONTENTFUL_CMA_API_KEY,
    REACT_APP_CONTENTFUL_SPACE_ID,
} = process.env;

const exportSetup = async () => {
    console.log(` 
        This setup will export the actual space from the correspondent CMA Token 
        If you don't have any CMA token, generate a new one at ${chalk.yellow(`app.contentful.com ${chalk.red('->')} Space Settings ${chalk.red('->')} API keys`)}
        Ready? Let's go! 🎉
    `);


    if (!REACT_APP_CONTENTFUL_CMA_API_KEY || !REACT_APP_CONTENTFUL_SPACE_ID) {
        console.error('You have to set Space ID and Cma Api within you env!');
        return;
    }

    try {
        const client = await contentful.createClient({
            accessToken: REACT_APP_CONTENTFUL_CMA_API_KEY
        });
        const space = await client.getSpace(REACT_APP_CONTENTFUL_SPACE_ID);
        if (space) {
            await spaceExport({
                contentFile: `export_${space.sys.id}.json`,
                contentModelOnly: true,
                exportDir: 'scripts/',
                managementToken: REACT_APP_CONTENTFUL_CMA_API_KEY,
                skipContent: true,
                skipRoles: true,
                skipLocales: true,
                skipWebhooks: true,
                spaceId: REACT_APP_CONTENTFUL_SPACE_ID,
            });
            console.log(chalk.green('Export All Done!'));
        }
    } catch (error) {
        console.error('Oh no! Some errors occurred!', error);
    }
};

exportSetup();
