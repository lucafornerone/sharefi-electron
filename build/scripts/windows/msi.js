/**
 * A module that allow to build msi Windows installer
 *
 * @requires electron-wix-msi
 * @requires path
 */

// Npm modules
const MSICreator = require('electron-wix-msi').MSICreator;
const path = require('path');

const releasePath = path.join(__dirname, '../../../release');
const resourcesPath = path.join(__dirname, '../../../resources');

/**
 * Build msi Windows installer
 * @param  {String}           srcFolder   Build folder
 * @param  {String}           outFolder   Installer folder
 * @param  {String}           name        App name
 * @param  {String}           arch        Build arch
 * @param  {String}           version     App version
 * @param  {String}           description App description
 * @param  {String}           author      App author
 * @param  {String}           icon        Icon name
 * @return {Promise<Boolean>}             Build status
 */
async function buildMsi(srcFolder, outFolder, name, arch, version, description, author, icon) {

	const msiCreator = new MSICreator({
		appDirectory: `${releasePath}/${srcFolder}`,
		outputDirectory: `${releasePath}/${outFolder}`,
		name: name,
		exe: name,
		arch: arch,
		version: version,
		description: description,
		manufacturer: author,
		icon: `${resourcesPath}/${icon}`,
		ui: {
			chooseDirectory: true
		}
	});

	return await new Promise((resolve, reject) => {

		try {

			msiCreator.create().then(async function () {
				await msiCreator.compile();
				resolve(true);
			});

		} catch (e) {
			reject(false);
		}
	});

}

module.exports = {
	buildMsi
}