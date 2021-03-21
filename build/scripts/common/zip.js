/**
 * A module that allow to zip release's folder and file
 *
 * @requires path
 * @requires fs
 *
 * @requires archiver
 */

// Npm modules
const path = require('path');
const fs = require('fs');

// App modules
const archiver = require('archiver');

const releasePath = path.join(__dirname, '../../../release');

/**
 * Zip release folder app
 * @param  {String}        folder Folder name
 * @return {Promise<Void>}
 */
async function zipFolder(folder) {

	const path = `${releasePath}/${folder}`;

	await _removeZipIfExists(path);

	return await new Promise((resolve, reject) => {

		const output = fs.createWriteStream(`${path}.zip`);
		output.on('close', function () {
			resolve(true);
		});

		const archive = archiver('zip', { zlib: { level: 9 } });
		archive.on('error', function () {
			reject(false);
		});

		archive.pipe(output);
		archive.directory(path, folder);
		archive.finalize();

	});

}

/**
 * Remove release zip if exists
 * @param  {String}        path Folder path
 * @return {Promise<Void>}
 */
async function _removeZipIfExists(path) {

	const zip = `${path}.zip`;
	if (fs.existsSync(zip)) {
		console.log('Delete old release zip...');
		fs.unlinkSync(zip);
	}
}

module.exports = {
	zipFolder
}