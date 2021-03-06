/** 
 * A module that contains all build config for the different OS
 * @module config
 */

/** Common */
const appName = 'sharefi';
const version = '0.1.0';
const description = 'Share files through your local network';
const author = 'Luca Fornerone';
const completeName = 'sharefi-electron';

/** macOS */
const macOsConfig = {
	buildFolder: 'app-darwin',
	scriptFolder: 'darwin',
	prepareFoldersScript: 'prepare-folders.sh',
	npmPortable64Script: 'build:darwin-portable-x64',
	npmPortable64Path: 'sharefi-darwin-x64',
	npmPortable64File: 'sharefi.app',
	npmInstaller64Script: 'build:darwin-dmg-x64',
	npmInstaller64File: 'sharefi.dmg'
}

/** Windows */
const windowsConfig = {
	iconName: 'sharefi.ico',
	buildFolder: 'app-windows',
	scriptFolder: 'windows',
	prepareFoldersScript: 'prepare-folders.bat',
	npmPortable64Script: 'build:windows-portable-x64',
	npmPortable64Path: 'sharefi-win32-x64',
	npmPortable86Script: 'build:windows-portable-x86',
	npmPortable86Path: 'sharefi-win32-ia32',
	msiOutFolder64: 'sharefi-win32-x64-msi',
	msiOutFolder86: 'sharefi-win32-ia32-msi',
	npmInstallerFile: 'sharefi.msi'
}

/** Linux */
const linuxConfig = {
	buildFolder: 'app-linux',
	scriptFolder: 'linux',
	removeBuildFolderScript: 'remove-release-folder.sh',
	removePreReleaseFolderScript: 'remove-pre-release-folder.sh',
	prepareFoldersScript: 'prepare-folders.sh',
	npmPortable64Script: 'build:linux-x64',
	portableReleaseFolder: 'sharefi-electron-linux-x64',
	npmInstallerDebian64Script: 'build:linux-deb-x64',
	releaseDebian: 'debian',
	npmInstallerRedHatx86_64Script: 'build:linux-rpm-x86_64',
	releaseRedHat: 'redhat'
}

module.exports = {
	appName,
	version,
	description,
	author,
	completeName,
	macOsConfig,
	windowsConfig,
	linuxConfig
}