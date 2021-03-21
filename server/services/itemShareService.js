/**
 * A module that contains shared items' functions
 * @module itemShareService
 *
 * @requires archiver
 * @requires electron
 * @requires fs
 * @requires uuid
 * 
 * @requires ItemType
 * @requires itemMapper
 * @requires itemService
 * @requires configuration
 * @requires constant
 */

// Npm modules
const archiver = require('archiver');
const { dialog } = require('electron');
const fs = require('fs');
const { v4: UUID } = require('uuid');

// App modules
const ItemType = require('../enums/ItemType');
const itemMapper = require('../mappers/itemMapper');
const itemService = require('../services/itemService');
const configuration = require('../../configuration');
const constant = require('../../constant');

/**
 * Get shared items
 * @return {ItemShare[]} Shared items
 */
function getSharedItems() {

	let sharedItems = [];
	itemService.getItems().forEach(item => {
		sharedItems.push(itemMapper.mapItemToItemShare(item));
	});
	return sharedItems;
}

/**
 * Remove all files in temp folder
 * @return {Void}
 */
function emptyTmpFolder() {

	const tmpFiles = fs.readdirSync(configuration.getTempFolderPath());
	if (tmpFiles && tmpFiles.length > 0) {

		// Delete all files founded
		let tmpFilePath;
		tmpFiles.forEach(tmpFile => {
			if (tmpFile.includes(constant.tmpFileExtension)) {
				tmpFilePath = `${configuration.getTempFolderPath()}/${tmpFile}`;
				deleteZip(tmpFilePath);
			}
		});
	}
}

/**
 * Delete zip file from temp folder
 * @param  {String} path Zip file path
 * @return {Void}
 */
function deleteZip(path) {
	fs.unlink(path, function () { });
}

/**
 * Shows the native dialog window of the OS for choosing files
 * @return {Promise<String[]>} Selected files full path
 */
async function showDialogFiles() {
	return dialog.showOpenDialogSync({ properties: ['openFile', constant.itemsSelection] });
}

/**
 * Shows the native dialog window of the OS for choosing folders
 * @return {Promise<String[]>} Selected folders full path
 */
async function showDialogFolders() {
	return dialog.showOpenDialogSync({ properties: ['openDirectory', constant.itemsSelection] });
}

/**
 * Share items based on item type
 * @param  {String[]}         items    Items' full path to share
 * @param  {ItemType}         itemType Item type to share
 * @param  {String}           tag      A description to more easily identify shared items
 * @return {Promise<Boolean>}          True if the sharing was successful
 */
async function shareItems(items, itemType, tag) {

	// Check for all items to share
	for (const itemToFind of items) {

		if (!await itemMapper.mapPathToItem(itemType, itemToFind, tag)) {
			// Item not found
			return false;
		}
	}

	let item;
	for (const itemToShare of items) {

		item = await itemMapper.mapPathToItem(itemType, itemToShare, tag);
		if (!itemService.getItemByIdAndType(item.id, itemType)) {
			// The item is not yet present
			itemService.addItem(item);
		}
	}
	return true;
}

/**
 * Remove shared items
 * @param  {Any[]}   items Id and item type of items to remove
 * @return {Boolean}       True if the removal was successful
 */
function removeSharedItems(items) {

	// Check for all items to remove
	for (const itemToFind of items) {

		if (itemService.getItemIndexByIdAndType(itemToFind.id, itemToFind.type) === -1) {
			// Item not found
			return false;
		}
	}

	items.forEach(item => {
		itemService.removeItem(itemService.getItemIndexByIdAndType(item.id, item.type));
	});
	return true;
}

/**
 * Stream a file
 * @param  {Number} id   File's id
 * @param  {String} name File's name
 * @return {Stream}      Stream of the file
 */
function streamFile(id, name) {

	const file = itemService.getItemByIdAndType(id, ItemType.FILE);
	let fileShare;
	if (file) {
		fileShare = itemMapper.mapItemToItemShare(file);
	}

	if (!file || fileShare.name != name) {
		// File not found
		return null;
	}
	return fs.createReadStream(file.path);
}

/**
 * Stream a folder
 * @param  {Number} id   Folder's id
 * @param  {String} name Folder's name
 * @return {Stream}      Stream of the folder
 */
function streamFolder(id, name) {

	// Path of zipped folder
	let zipPath;

	const folder = itemService.getItemByIdAndType(id, ItemType.FOLDER);
	let folderShare;
	if (folder) {
		folderShare = itemMapper.mapItemToItemShare(folder);
	}

	if (!folder || folderShare.name != name) {
		// Folder not found
		return null;
	}

	try {

		// Generate zip name
		zipPath = `${configuration.getTempFolderPath()}/${UUID()}${constant.tmpFileExtension}`;
		const output = fs.createWriteStream(zipPath);
		output.on('close', function () { });

		// Generate an archive to zip the folder
		const archive = archiver(constant.tmpFileExtension.split('.')[1]);
		archive.on('error', function (e) {
			// Stream not completed, remove the zip
			deleteZip(zipPath);
		});

		archive.pipe(output);
		archive.directory(folder.path, false);
		archive.finalize();

		return {
			stream: archive,
			path: zipPath
		}
	} catch (error) {
		// Stream not completed, remove the zip
		if (zipPath) {
			deleteZip(zipPath);
		}
		return false;
	}
}

/**
 * Stream a zip containing shared items
 * @param  {Any[]}  items Id, name and item type of shared items to stream
 * @return {Stream}       Stream of the zip
 */
function streamZip(items) {

	// Check for all items
	let item, itemShare;
	for (const itemToFind of items) {

		if (itemToFind.id && itemToFind.name && itemToFind.type) {

			item = itemService.getItemByIdAndType(itemToFind.id, itemToFind.type);
			if (item) {
				itemShare = itemMapper.mapItemToItemShare(item);
			}

			if (!item || itemShare.name != itemToFind.name) {
				// Item not found
				return null;
			}
		} else {
			// Bad request
			return undefined;
		}
	}

	// Path of zip
	let zipPath;

	try {

		// Generate zip name
		zipPath = `${configuration.getTempFolderPath()}/${UUID()}${constant.tmpFileExtension}`;
		const output = fs.createWriteStream(zipPath);
		output.on('close', function () { });

		// Generate an archive to zip all items
		const archive = archiver(constant.tmpFileExtension.split('.')[1]);
		archive.on('error', function (e) {
			// Stream not completed, remove the zip
			deleteZip(zipPath);
		});

		archive.pipe(output);

		items.forEach(itemToZip => {

			item = itemService.getItemByIdAndType(itemToZip.id, itemToZip.type);
			itemShare = itemMapper.mapItemToItemShare(item);

			// Add item to zip
			if (itemToZip.type === ItemType.FILE) {
				archive.file(item.path, { name: itemShare.fullName });
			} else if (itemToZip.type === ItemType.FOLDER) {
				archive.directory(item.path, itemToZip.name);
			}
		});

		archive.finalize();

		return {
			stream: archive,
			path: zipPath
		}
	} catch (error) {
		// Stream not completed, remove the zip
		if (zipPath) {
			deleteZip(zipPath);
		}
		return false;
	}
}


module.exports = {
	getSharedItems,
	emptyTmpFolder,
	deleteZip,
	showDialogFiles,
	showDialogFolders,
	shareItems,
	removeSharedItems,
	streamFile,
	streamFolder,
	streamZip
}