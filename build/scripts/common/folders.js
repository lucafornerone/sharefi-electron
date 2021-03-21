/**
 * A module that allow to prepare folders for build
 *
 * @requires child_process
 * @requires path
 * @requires fs
 */

// Npm modules
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

/**
 * Prepare folders for build
 * @param  {String}           folder OS script folder
 * @param  {String}           script Script name
 * @return {Promise<Boolean>}        Preparation status
 */
async function prepareFolders(folder, script) {

	const basePath = path.join(__dirname, '..');

	return await new Promise((resolve, reject) => {

		exec(`${basePath}/${folder}/${script}`, function (error) {
			error ? reject(false) : resolve(true);
		});

	});

}

/**
 * Remove build folder
 * @param  {String}        folder OS build folder
 * @return {Promise<Void>}
 */
async function removeBuildFolder(folder) {

	const basePath = path.join(__dirname, '../..');

	const buildFolder = `${basePath}/${folder}`;
	if (fs.existsSync(buildFolder)) {
		fs.rmdirSync(buildFolder, { recursive: true });
	}

}

/**
 * Remove linux build folder
 * @param  {String}        folder       Linux build folder
 * @param  {String}        scriptFolder Script folder
 * @param  {String}        scriptName   Script name
 * @return {Promise<Void>}
 */
async function removeLinuxBuildFolder(folder, scriptFolder, scriptName) {

	const basePath = path.join(__dirname, '../..');

	const buildFolder = `${basePath}/${folder}`;
	if (fs.existsSync(buildFolder)) {		
		await _removeLinuxFolder(scriptFolder, scriptName);
	}

}

/**
 * Remove linux pre release folder
 * @param  {String}        folder       Linux pre release folder
 * @param  {String}        scriptFolder Script folder
 * @param  {String}        scriptName   Script name
 * @return {Promise<Void>}
 */
async function removeLinuxPreReleaseFolder(folder, scriptFolder, scriptName) {

	const basePath = path.join(__dirname, '../../../release');

	const preReleaseFolder = `${basePath}/${folder}`;
	if (fs.existsSync(preReleaseFolder)) {		
		await _removeLinuxFolder(scriptFolder, scriptName);
	}

}

/**
 * Remove release folder
 * @param  {String}        folder Release folder
 * @return {Promise<Void>}
 */
async function removeReleaseFolder(folder) {

	const releasePath = path.join(__dirname, '../../../release');

	const releaseFolder = `${releasePath}/${folder}`;
	if (fs.existsSync(releaseFolder)) {
		fs.rmdirSync(releaseFolder, { recursive: true });
	}

}

/**
 * Remove linux folder
 * @param  {String}        scriptFolder Script folder
 * @param  {String}        scriptName   Script name
 * @return {Promise<Void>}
 */
async function _removeLinuxFolder(scriptFolder, scriptName) {

	const scriptPath = path.join(__dirname, '..');

	return await new Promise((resolve, reject) => {

		exec(`${scriptPath}/${scriptFolder}/${scriptName}`, function (error) {
			error ? reject() : resolve();
		});

	});
}

/**
 * Prepare icon
 * @param  {String}           folder OS script folder
 * @param  {String}           script Script name
 * @return {Promise<Boolean>}        Preparation status
 */
async function prepareIcon(folder, script) {

	const basePath = path.join(__dirname, '..');

	return await new Promise((resolve, reject) => {

		exec(`${basePath}/${folder}/${script}`, function (error) {
			error ? reject(false) : resolve(true);
		});

	});

}

module.exports = {
	prepareFolders,
	removeBuildFolder,
	removeReleaseFolder,
	removeLinuxBuildFolder,
	removeLinuxPreReleaseFolder,
	prepareIcon
}
