/**
 * A module that allow to rename release's folder and file
 *
 * @requires path
 * @requires fs
 */

// Npm modules
const path = require('path');
const fs = require('fs');

const releasePath = path.join(__dirname, '../../../release');

/**
 * Rename release folder or file app
 * @param  {String}        currentName Current item name
 * @param  {String}        newName     New item name
 * @return {Promise<Void>}
 */
async function renameItem(currentName, newName) {

	fs.renameSync(`${releasePath}/${currentName}`, `${releasePath}/${newName}`);
}

/**
 * Move release file app
 * @param  {String}        folderName  File's folder
 * @param  {String}        currentPath Current file path
 * @param  {String}        newPath     New file path
 * @return {Promise<Void>}
 */
async function moveFile(folderName, currentPath, newPath) {

	fs.renameSync(`${releasePath}/${folderName}/${currentPath}`, `${releasePath}/${newPath}`);

}

module.exports = {
	renameItem,
	moveFile
}