/** 
 * A module that handle device item's HTTP requests
 * @module itemController 
 * 
 * @requires express
 * 
 * @requires ItemType
 * @requires hostMiddleware
 * @requires itemShareService
 */

// Npm modules
const express = require('express');

// App modules
const itemController = express.Router();
const ItemType = require('../../enums/ItemType');
const hostMiddleware = require('../middlewares/hostMiddleware');
const itemShareService = require('../../services/itemShareService');

/**
 * GET api to obtain shared items
 * @name item/get
 * @function
 * 
 * @return {ItemShare[]} Shared items
 */
itemController.get('/get', (req, res) => {
	res.send(itemShareService.getSharedItems());
});

/**
 * GET api to obtain files full path
 * @name item/files
 * @function
 * 
 * @return {String[]} Selected files full path
 */
itemController.get('/files', hostMiddleware.sameHost, async (req, res) => {
	res.send(await itemShareService.showDialogFiles());
});

/**
 * GET api to obtain folders full path
 * @name item/folders
 * @function
 * 
 * @return {String[]} Selected folders full path
 */
itemController.get('/folders', hostMiddleware.sameHost, async (req, res) => {
	res.send(await itemShareService.showDialogFolders());
});

/**
 * POST api to share items
 * @name item/share
 * @function
 * 
 * @param  {String[]} items    Items' full path to share
 * @param  {ItemType} itemType Item type to share
 * @param  {String}   [tag]    Optional description to more easily identify shared items
 * @return {Boolean}           True if the sharing was successful
 */
itemController.post('/share', hostMiddleware.sameHost, async (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.items &&
		body.items.length > 0 &&
		(body.itemType === ItemType.FILE || body.itemType === ItemType.FOLDER)
	) {
		if (await itemShareService.shareItems(body.items, body.itemType, body.tag ? body.tag : '')) {
			res.send(true);
		} else {
			// At least one item was not found in the system
			res.status(404).send();
		}
	} else {
		// Bad request
		res.status(400).send();
	}
});

/**
 * POST api to remove shared items
 * @name item/remove
 * @function
 * 
 * @param  {Any[]}   items Id and item type of items to remove
 * @return {Boolean}       True if the removal was successful
 */
itemController.post('/remove', hostMiddleware.sameHost, (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.items &&
		body.items.length > 0
	) {
		if (itemShareService.removeSharedItems(body.items)) {
			res.send(true);
		} else {
			// At least one item to remove was not found in the shared items
			res.status(404).send();
		}
	} else {
		// Bad request
		res.status(400).send();
	}
});

/**
 * POST api to stream a shared file
 * @name item/streamFile
 * @function
 * 
 * @param  {Number} id   File's id
 * @param  {String} name File's name
 * @return {Stream}      Stream of the file
 */
itemController.post('/streamFile', hostMiddleware.otherHost, (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.id &&
		body.name
	) {
		const stream = itemShareService.streamFile(body.id, body.name);
		if (stream) {

			stream.on('open', function () {
				// Stream file to client
				stream.pipe(res);
			});
			stream.on('error', function () {
				res.status(500).send();
			});

		} else {
			// File not found
			res.status(404).send();
		}
	} else {
		// Bad request
		res.status(400).send();
	}
});

/**
 * POST api to stream a shared folder
 * @name item/streamFolder
 * @function
 * 
 * @param  {Number} id   Folder's id
 * @param  {String} name Folder's name
 * @return {Stream}      Stream of the folder
 */
itemController.post('/streamFolder', hostMiddleware.otherHost, (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.id &&
		body.name
	) {
		const folderZip = itemShareService.streamFolder(body.id, body.name);
		if (folderZip && folderZip.stream && folderZip.path) {

			// Stream folder to client
			folderZip.stream.pipe(res);

			res.on('finish', function () {
				itemShareService.deleteZip(folderZip.path);
			});

		} else if (folderZip === null) {
			// Folder not found
			res.status(404).send();
		} else {
			// Stream error
			res.status(500).send();
		}
	} else {
		// Bad request
		res.status(400).send();
	}
});

/**
 * POST api to stream a zip containing shared items
 * @name item/streamZip
 * @function
 * 
 * @param  {Any[]}  items Id, name and item type of shared items to stream
 * @return {Stream}       Stream of the zip
 */
itemController.post('/streamZip', hostMiddleware.otherHost, (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.items &&
		body.items.length > 0
	) {
		const zip = itemShareService.streamZip(body.items);
		if (zip && zip.stream && zip.path) {

			// Stream zip to client
			zip.stream.pipe(res);

			res.on('finish', function () {
				itemShareService.deleteZip(zip.path);
			});

		} else if (zip === null) {
			// At least one item was not found
			res.status(404).send();
		} else if (zip === undefined) {
			// Bad request
			res.status(400).send();
		} else {
			// Stream error
			res.status(500).send();
		}
	} else {
		// Bad request
		res.status(400).send();
	}
});


module.exports = itemController;