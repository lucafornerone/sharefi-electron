/**
 * A script that allow to build app for Windows portable x64
 *
 * @requires config
 * @requires client
 * @requires folders
 * @requires files
 * @requires npm_run
 * @requires rename
 * @requires zip
 */

// App modules
const config = require('../../config');
const client = require('../../scripts/common/client');
const folders = require('../../scripts/common/folders');
const files = require('../../scripts/common/files');
const npm_run = require('../../scripts/common/npm-run');
const rename = require('../../scripts/common/rename');
const zip = require('../../scripts/common/zip');

async function build() {

	const releaseFolderName = `${config.windowsConfig.npmPortable64Path} v${config.version}`;

	try {

		console.log('Delete old build app...');
		await folders.removeBuildFolder(config.windowsConfig.buildFolder);
		console.log('Finish!');

		console.log('Build Client...');
		if (!await client.buildClient()) {
			return;
		}
		console.log('Finish!');

		console.log('Prepare folders...');
		if (!await folders.prepareFolders(config.windowsConfig.scriptFolder, config.windowsConfig.prepareFoldersScript)) {
			return;
		}
		console.log('Finish!');

		console.log('Remove unused files...');
		await files.removeServerReadme(config.windowsConfig.buildFolder);
		await files.removeServerDev(config.windowsConfig.buildFolder);
		console.log('Finish!');

		console.log('Build version...');
		if (!await npm_run.buildScript(config.windowsConfig.npmPortable64Script)) {
			return;
		}
		console.log('Finish!');

		console.log('Rename release folder...');
		await rename.renameItem(config.windowsConfig.npmPortable64Path, releaseFolderName);
		console.log('Finish!');

		console.log('Zip release folder...');
		if (!await zip.zipFolder(releaseFolderName)) {
			return;
		}
		console.log('Finish!');

		console.log('Remove release folder...');
		await folders.removeReleaseFolder(releaseFolderName);
		console.log('Finish!');

	} catch (e) {
		console.log(e);
	}

}

build();