/**
 * A module that allow to run npm scripts of package.json
 *
 * @requires child_process
 * @requires path
 */

// Npm modules
const exec = require('child_process').exec;
const path = require('path');

/**
 * Run npm build script
 * @param  {String}           script Script name
 * @return {Promise<Boolean>}        Build script status
 */
async function buildScript(script) {

	return await new Promise((resolve, reject) => {

		exec(`npm run ${script}`, {
			cwd: path.join(__dirname, '../..')
		}, function (error) {
			error ? reject(false) : resolve(true);
		});

	});
}

/**
 * Run npm global package script
 * @param  {String}           script Script name
 * @param  {String}           folder OS build folder
 * @return {Promise<Boolean>}        Build script status
 */
async function buildPackage(script, folder) {

	const basePath = path.join(__dirname, '../..');

	return await new Promise((resolve, reject) => {

		exec(script, {
			cwd: `${basePath}/${folder}`
		}, function (error) {
			error ? reject(false) : resolve(true);
		});

	});
}


module.exports = {
	buildScript,
	buildPackage
}