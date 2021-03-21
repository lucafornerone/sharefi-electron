/**
 * A script that allow to build app for Debian based Linux installer x64
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

		console.log('Build pre version...');
		if (!await npm_run.buildScript(config.linuxConfig.npmPortable64Script)) {
			return;
		}
		console.log('Finish!');

		console.log('Build version...');
		if (!await npm_run.buildScript(config.linuxConfig.npmInstallerDebian64Script)) {
			return;
		}
		console.log('Finish!');

		console.log('Remove release folder...');
		await folders.removeLinuxPreReleaseFolder(config.linuxConfig.portableReleaseFolder, config.linuxConfig.scriptFolder, config.linuxConfig.removePreReleaseFolderScript);
		console.log('Finish!');

		console.log(('Rename app file...'));
		await rename.renameItem(`${config.completeName}_${config.version}_amd64.deb`, `${config.appName}-x64-v${config.version}.deb`);
		console.log('Finish!');

	} catch (e) {
		console.log(e);
	}

}

build();
