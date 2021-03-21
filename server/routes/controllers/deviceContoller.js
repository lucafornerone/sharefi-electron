/** 
 * A module that handle device's HTTP requests
 * @module deviceController 
 * 
 * @requires express
 * 
 * @requires ConfigElement
 * @requires hostMiddleware
 * @requires configService
 * @requires deviceService
 */

// Npm modules
const express = require('express');

// App modules
const deviceController = express.Router();
const ConfigElement = require('../../enums/ConfigElement');
const hostMiddleware = require('../middlewares/hostMiddleware');
const configService = require('../../services/configService');
const deviceService = require('../../services/deviceService');

/**
 * GET api to find all devices connected to same local network
 * @name device/find
 * @function
 * 
 * @return {DeviceGeneric[]} Devices generic details
 */
deviceController.get('/find', hostMiddleware.sameHost, async (req, res) => {
	res.send(await deviceService.findDevices());
});

/**
 * GET api to ping device to know if app is running
 * @name device/ping
 * @function
 * 
 * @return {Boolean} True if app is running
 */
deviceController.get('/ping', (req, res) => {
	res.send(true);
});

/**
 * GET api to obtain device information
 * @name device/info
 * @function
 * 
 * @return {DeviceNetwork} Device information
 */
deviceController.get('/info', hostMiddleware.otherHost, async (req, res) => {
	res.send(await deviceService.getDeviceInfo());
});

/**
 * POST api to obtain device detail
 * @name device/detail
 * @function
 * 
 * @param  {String} defaultLanguage Device default language code (ISO 639-1) - for more information: {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes Wikipedia}
 * @param  {String} defaultTheme    Device default prefers-color-scheme - for more information: {@link https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme MDN}
 * @return {Device}                 Device detail
 */
deviceController.post('/detail', hostMiddleware.sameHost, async (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.defaultLanguage &&
		body.defaultLanguage.length === 2 &&
		configService.isRightTypeof(body.defaultLanguage, ConfigElement.LANGUAGE) &&
		body.defaultTheme &&
		configService.isUpdatedThemeInThemeList(body.defaultTheme)
	) {
		res.send(await deviceService.getDeviceDetail(body.defaultLanguage, body.defaultTheme));
	} else {
		// Bad request
		res.status(400).send();
	}
});

/**
 * POST api to open a website on device
 * @name device/website
 * @function
 * 
 * @param  {String} url Website url
 * @return {Void}
 */
deviceController.post('/website', hostMiddleware.sameHost, (req, res) => {

	const body = req.body;

	// Check HTTP body request syntax
	if (
		body &&
		body.url
	) {
		res.send(deviceService.openWebsite(body.url));
	} else {
		// Bad request
		res.status(400).send();
	}
});


module.exports = deviceController;