/**
 * A script that allow to build app for Windows installer x86
 *
 * @requires config
 * @requires client
 * @requires folders
 * @requires files
 * @requires npm_run
 * @requires rename
 * @requires msi
 */

// App modules
const config = require('../../config');
const client = require('../../scripts/common/client');
const folders = require('../../scripts/common/folders');
const files = require('../../scripts/common/files');
const npm_run = require('../../scripts/common/npm-run');
const rename = require('../../scripts/common/rename');
const msi = require('../../scripts/windows/msi');

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
		if (!await npm_run.buildScript(config.windowsConfig.npmPortable86Script)) {
			return;
		}
		console.log('Finish!');

		console.log('Build version...');
		if (!await msi.buildMsi(
			config.windowsConfig.npmPortable86Path,
			config.windowsConfig.msiOutFolder86,
			config.appName,
			'x86',
			config.version,
			config.description,
			config.author,
			config.windowsConfig.iconName
		)) {
			return;
		}
		console.log('Finish!');

		console.log('Move file...');
		await rename.moveFile(config.windowsConfig.msiOutFolder86, config.windowsConfig.npmInstallerFile, `${config.windowsConfig.npmPortable86Path} v${config.version}.msi`);
		console.log('Finish!');

		console.log('Remove pre release folder...');
		await folders.removeReleaseFolder(config.windowsConfig.npmPortable86Path);
		console.log('Finish!');

		console.log('Remove release folder...');
		await folders.removeReleaseFolder(config.windowsConfig.msiOutFolder86);
		console.log('Finish!');

	} catch (e) {
		console.log(e);
	}

}

build();