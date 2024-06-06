/**
 * A module that allow to build AppX Windows installer
 *
 * @requires path
 * @requires child_process
 */

// Npm modules
const path = require('path');
const exec = require('child_process').exec;

const releasePath = path.join(__dirname, '../../../release');
const resourcesPath = path.join(__dirname, '../../../resources');

/**
 * Build AppX installer file
 * @param  {String}           bundledFolderName Release folder
 * @param  {String}           outputFolderName  Output folder name
 * @param  {String}           appName           App name
 * @param  {String}           appVersion        App version
 * @return {Promise<Boolean>}                   Build script status
 */
async function buildAppX(bundledFolderName, outputFolderName, appName, appVersion) {
    
  return await new Promise((resolve, reject) => {

		exec(`powershell -Command electron-windows-store --input-directory ${releasePath}\\${bundledFolderName} --output-directory ${releasePath}\\${outputFolderName}\\ --assets ${resourcesPath}\\msix --package-name ${appName} --package-version ${appVersion} --make-pri true --manifest ${resourcesPath}\\windows-store-manifest.xml`, {
			cwd: path.join(__dirname, '../..')
		}, function (error) {
			error ? reject(false) : resolve(true);
		});

	});
}

module.exports = {
	buildAppX
}