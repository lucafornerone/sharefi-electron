/**
 * A script that allow to build Snap Linux installer x64
 * 
 * @requires config
 * @requires client
 * @requires folders
 * @requires files
 * @requires npm_run
 */

// App modules
const config = require('../../config');
const client = require('../../scripts/common/client');
const folders = require('../../scripts/common/folders');
const files = require('../../scripts/common/files');
const npm_run = require('../../scripts/common/npm-run');

async function build() {

	try {

		console.log('Delete old build app...');
		await folders.removeLinuxBuildFolder(config.linuxConfig.buildFolder, config.linuxConfig.scriptFolder, config.linuxConfig.removeBuildFolderScript);
		console.log('Finish!');

		console.log('Build Client...');
		if (!await client.buildClient()) {
			return;
		}
		console.log('Finish!');

		console.log('Prepare folders...');
		if (!await folders.prepareFolders(config.linuxConfig.scriptFolder, config.linuxConfig.prepareFoldersScript)) {
			return;
		}
		console.log('Finish!');

		console.log('Remove unused files...');
		await files.removeServerReadme(config.linuxConfig.buildFolder);
		await files.removeServerDev(config.linuxConfig.buildFolder);
		console.log('Finish!');

		console.log('Add info to package.json...');
		if (!await files.addToPackageJson(config.linuxConfig.buildFolder, 
			[config.linuxConfig.snapPackageIcon, config.linuxConfig.snapPackageOutput, config.linuxConfig.snapPackageProductName])) {
			return;
		}
		console.log('Finish!');

		console.log('Prepare icon...');
		if (!await folders.prepareIcon(config.linuxConfig.scriptFolder, config.linuxConfig.snapPrepareIconScript)) {
			return;
		}
		console.log('Finish!');

		console.log('Build version...');
		if (!await npm_run.buildPackage(config.linuxConfig.releaseSnapScript, config.linuxConfig.buildFolder)) {
			return;
		}
		console.log('Finish!');

		console.log('Copy app file...');
		await files.copyFile(config.linuxConfig.buildFolder, config.linuxConfig.releaseSnap, `${config.completeName}_${config.version}_amd64.snap`, `${config.appName}-x64-v${config.version}.snap`);
		console.log('Finish!');

	} catch (e) {
		console.log(e);
	}

}

build();
