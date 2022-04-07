/**
 * A script that allow to build app for macOS store
 *
 * @requires config
 * @requires client
 * @requires folders
 * @requires files
 * @requires npm_run
 * @requires sign
 * @requires rename
 */

// App modules
const config = require('../../config');
const client = require('../../scripts/common/client');
const folders = require('../../scripts/common/folders');
const files = require('../../scripts/common/files');
const npm_run = require('../../scripts/common/npm-run');
const sign = require('../../scripts/darwin/sign');
const rename = require('../../scripts/common/rename');

async function build() {

    try {

        console.log('Delete old build app...');
        await folders.removeBuildFolder(config.macOsConfig.buildFolder);
        console.log('Finish!');

        console.log('Build Client...');
        if (!await client.buildClient()) {
            return;
        }
        console.log('Finish!');

        console.log('Prepare folders...');
        if (!await folders.prepareFolders(config.macOsConfig.scriptFolder, config.macOsConfig.prepareFoldersScript)) {
            return;
        }
        console.log('Finish!');

        console.log('Remove unused files...');
        await files.removeServerReadme(config.macOsConfig.buildFolder);
        await files.removeServerDev(config.macOsConfig.buildFolder);
        console.log('Finish!');

        console.log('Change name to package.json...');
        if (!await files.overridePackageJsonName(config.macOsConfig.buildFolder, config.macOsConfig.masName)) {
            return;
        }
        console.log('Finish!');

        console.log('Build version...');
        if (!await npm_run.buildScript(config.macOsConfig.npmMas)) {
            return;
        }
        console.log('Finish!');

        console.log('Remove unsupported languages...');
        await folders.removeMasLanguages(config.macOsConfig.masApp, config.languagesAvailable);
        console.log('Finish!');

        console.log('Sign mas...');
        if (!await sign.signMasApp(config.macOsConfig.masApp)) {
            return;
        }
        console.log('Finish!');

        console.log('Resign and package...');
        if (!await sign.resignPackage(config.macOsConfig.scriptFolder, config.macOsConfig.masResignScript)) {
            return;
        }
        console.log('Finish!');

        console.log('Move file...');
        await rename.moveFile(config.macOsConfig.masAppFolder, config.macOsConfig.masFileName, `${config.macOsConfig.masName} v${config.version}.pkg`);
        console.log('Finish!');

        console.log('Remove release folder...');
        await folders.removeReleaseFolder(config.macOsConfig.masBuildFolder);
        console.log('Finish!');

    } catch (e) {
        console.log(e);
    }

}

build();