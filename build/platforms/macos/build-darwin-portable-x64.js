/**
 * A script that allow to build app for macOS portable x64
 *
 * @requires config
 * @requires client
 * @requires folders
 * @requires files
 * @requires npm_run
 * @requires rename
 */

// App modules
const config = require('../../config');
const client = require('../../scripts/common/client');
const folders = require('../../scripts/common/folders');
const files = require('../../scripts/common/files');
const npm_run = require('../../scripts/common/npm-run');
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

		console.log('Build version...');
		if (!await npm_run.buildScript(config.macOsConfig.npmPortable64Script)) {
			return;
		}
		console.log('Finish!');

		console.log('Move file...');
		await rename.moveFile(config.macOsConfig.npmPortable64Path, config.macOsConfig.npmPortable64File, `${config.macOsConfig.npmPortable64Path} v${config.version}.app`);
		console.log('Finish!');

		console.log('Remove release folder...');
		await folders.removeReleaseFolder(config.macOsConfig.npmPortable64Path);
		console.log('Finish!');

	} catch (e) {
		console.log(e);
	}

}

build();
