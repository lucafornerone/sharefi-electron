/** 
 * A module that allows to map items (file or folder)
 * @module itemMapper
 * 
 * @requires fs
 * @requires glob
 * @requires os
 * 
 * @requires Item
 * @requires ItemShare
 * @requires ItemType
 */

// Npm modules
const fs = require('fs');
const { glob } = require('glob');
const os = require('os');

// App modules
const Item = require('../models/Item');
const ItemShare = require('../models/ItemShare');
const ItemType = require('../enums/ItemType');

/**
 * Map a system item to a shared item
 * @param  {Item}      item System item to map
 * @return {ItemShare}      Mapped shared item
 */
function mapItemToItemShare(item) {

	if (item.type === ItemType.FILE) {
		// Get full name from system file's absolute path
		const fullName = item.path.replace(/^.*[\\\/]/, '');

		return new ItemShare(
			item.id,
			fullName.includes('.') ? fullName.split('.').slice(0, -1).join('.') : fullName, // If file full name has not dot(s) (extension), name is equal to full name
			ItemType.FILE,
			fullName,
			fullName.includes('.') ? fullName.split('.').pop() : '', // If file full name has not dot(s), extension is blank
			_formatBytes(item.bytes),
			item.bytes,
			null,
			item.tag
		);
	} else if (item.type === ItemType.FOLDER) {

		return new ItemShare(
			item.id,
			item.path.match(/([^\/\\]*)\/*$/)[1], // Get folder name from absolute path
			ItemType.FOLDER,
			null,
			null,
			null,
			null,
			item.totFiles,
			item.tag
		)
	}
}

/**
 * Transforms a absolute item path to a representation of a system item
 * @param  {ItemType}      type Item's type
 * @param  {String}        path System item absolute path
 * @param  {String}        tag  A description to more easily identify item
 * @return {Promise<Item>}      Mapped system item representation
 */
async function mapPathToItem(type, path, tag) {

	try {

		// Get item information
		const stats = fs.statSync(path);

		if (type === ItemType.FILE) {

			return new Item(
				stats.ino,
				ItemType.FILE,
				path,
				stats.size,
				null,
				tag
			);
		} else if (type === ItemType.FOLDER) {

			return new Item(
				stats.ino,
				ItemType.FOLDER,
				path,
				null,
				await _getTotFiles(path),
				tag
			)
		}

	} catch (error) {
		return null;
	}
}

/**
 * Converts the total file bytes into a readable string (expressed in Bytes, KB, MB, GB etc.)
 * For more information: {@link https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript stackoverflow}
 * @param  {Number} bytes      Total file bytes
 * @param  {Number} [decimals] Optional number of decimals
 * @return {String}            Readable file's size
 */
function _formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get the total of files in folder
 * @param  {String}          path Folder path
 * @return {Promise<Number>}      Total files
 */
async function _getTotFiles(path) {

	const totFiles = os.platform() === 'win32' ? await glob('**/*', { cwd: path, windowsPathsNoEscape: true }) : await glob(path + '/**/*');
	return totFiles ? totFiles.length : 0;
}

module.exports = {
	mapItemToItemShare,
	mapPathToItem
}