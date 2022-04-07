/** 
 * A module that contains all build config for the different OS
 * @module config
 */

/** Common */
const appName = 'sharefi';
const version = '0.3.8';
const description = 'Share files through your local network';
const author = 'Luca Fornerone';
const completeName = 'sharefi-electron';
const languagesAvailable = ['de', 'en', 'es', 'fr', 'it'];

/** macOS */
const macOsConfig = {
	buildFolder: 'app-darwin',
	scriptFolder: 'darwin',
	prepareFoldersScript: 'prepare-folders.sh',
	npmPortable64Script: 'build:darwin-portable-x64',
	npmPortable64Path: 'sharefi-darwin-x64',
	npmPortable64File: 'sharefi.app',
	npmInstaller64Script: 'build:darwin-dmg-x64',
	npmInstaller64File: 'sharefi.dmg',
	masName: 'sharefi - LAN File Sharing',
	npmMas: 'build:darwin-mas',
	masBuildFolder: 'mas',
	masApp: 'release/mas/sharefi-mas-x64/sharefi.app',
	masAppFolder: 'mas/sharefi-mas-x64',
	masResignScript: 'resign-package.sh',
	masFileName: 'sharefi-mac_store.pkg'
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
	releaseRedHat: 'redhat',
	releaseSnap: 'snap',
	releaseSnapScript: 'electron-builder --linux snap',
	snapPackageIcon: '{ "linux": { "target": "snap", "icon": "build/icons" } }',
	snapPackageOutput: '{ "build": { "directories": { "output": "snap" }, "snap": { "stagePackages": ["default","wireless-tools","net-tools","network-manager-pptp"] } } }',
	snapPackageProductName: '{ "productName": "sharefi" }',
	snapPrepareIconScript: 'prepare-snap-icon.sh',
	snapLocalDevicesIndexJs: 'local-devices/src/index.js',
	snapLocalDevicesParserJs: 'local-devices/src/parser/linux.js'
}

module.exports = {
	appName,
	version,
	description,
	author,
	completeName,
	languagesAvailable,
	macOsConfig,
	windowsConfig,
	linuxConfig
}