/**
 * A script that allow to build app for Windows Store AppX x64
 *
 * @requires config
 * @requires client
 * @requires folders
 * @requires files
 * @requires npm_run
 * @requires rename
 * @requires store
 */

// App modules
const config = require('../../config');
const client = require('../../scripts/common/client');
const folders = require('../../scripts/common/folders');
const files = require('../../scripts/common/files');
const npm_run = require('../../scripts/common/npm-run');
const rename = require('../../scripts/common/rename');
const store = require('../../scripts/windows/store');

async function build() {

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

		console.log('Build pre version...');
		if (!await npm_run.buildScript(config.windowsConfig.npmStore64Script)) {
			return;
		}
		console.log('Finish!');

		console.log('Build version...');
		if (!await store.buildAppX(
				config.windowsConfig.npmPortable64Path,
				`${config.windowsConfig.npmPortable64Path}-v${config.version}`,
				config.appName,
				`${config.version}.0`)
			) {
			return;
		}
		console.log('Finish!');
		
		console.log('Move file...');
		await rename.moveFile(`${config.windowsConfig.npmPortable64Path}-v${config.version}`, `${config.appName}.appx`, `${config.windowsConfig.npmPortable64Path} v${config.version}.appx`);
		console.log('Finish!');

		console.log('Remove pre release folder...');
		await folders.removeReleaseFolder(`${config.windowsConfig.npmPortable64Path} v${config.version}.msi`);
		console.log('Finish!');

		console.log('Remove release folder...');
		await folders.removeReleaseFolder(config.windowsConfig.npmPortable64Path);
		console.log('Finish!');

	} catch (e) {
		console.log(e);
	}

}

build();