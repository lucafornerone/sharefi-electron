/**
 * A module that contains device's functions
 * @module deviceService
 *
 * @requires local-devices
 * @requires os
 * @requires node-wifi
 * @requires electron
 * @requires child_process
 *
 * @requires ConfigElement
 * @requires SupportedOS
 * @requires Device
 * @requires DeviceNetowrk
 * @requires configService
 * @requires itemService
 * @requires constant
 */

// Npm modules
const localDevices = require('local-devices');
const os = require('os');
const networkInterfaces = os.networkInterfaces();
const nodeWifi = require('node-wifi');
const { shell } = require('electron');
const { execSync } = require('child_process');

// App modules
const ConfigElement = require('../enums/ConfigElement');
const SupportedOS = require('../enums/SupportedOS');
const Device = require('../models/Device');
const DeviceNetowrk = require('../models/DeviceNetwork');
const configService = require('./configService');
const itemService = require('./itemService');
const constant = require('../../constant');

/**
 * Find all devices connected to same local network
 * @return {Promise<DeviceGeneric[]>} Devices generic details
 */
async function findDevices() {

	let devices = [];

	try {

		await new Promise((resolve, reject) => {

			localDevices().then(devicesFounded => {
				devices = devicesFounded;
				resolve();
			}, () => {
				reject();
			});

		});

		const ipList = _getIpList();

		// Check the presence of the application device ip in device list founded
		for (let i = 0; i < devices.length; i++) {
			if (ipList.indexOf(devices[i].ip) >= 0) {
				// Remove the application device from device list founded
				devices.splice(i, 1);
				break;
			}
		}

		return devices;
	} catch (error) {
		return null;
	}
}

/**
 * Obtain device information
 * @return {Promise<DeviceNetowrk>} Device information
 */
async function getDeviceInfo() {
	return new DeviceNetowrk(_getOSName(), await _getDeviceName(), itemService.getTotalItems());
}

/**
 * Obtain device detail
 * @param  {String}          defaultLanguage Device default language code (ISO 639-1)
 * @param  {String}          defaultTheme    Device default prefers-color-scheme
 * @return {Promise<Device>}                 Device detail
 */
async function getDeviceDetail(defaultLanguage, defaultTheme) {
	return new Device(_getOSName(), await _getDeviceName(), await _getDeviceLanguage(defaultLanguage), await _getDeviceTheme(defaultTheme), await _getNetworkName());
}

/**
 * Open website url
 * @param  {String} url Website url
 * @return {Void}
 */
function openWebsite(url) {
	shell.openExternal(url);
	return;
}

/**
 * Get OS name
 * @return {String} OS name
 */
function _getOSName() {

	switch (process.platform) {
		case 'linux':
			return SupportedOS.LINUX;
		case 'win32':
			return SupportedOS.WIN32;
		case 'darwin':
			return SupportedOS.DARWIN;
	}
}

/**
 * Get device name
 * @return {Promise<String>} Device name
 */
async function _getDeviceName() {
	return await _getConfigElementValue(ConfigElement.NAME, os.hostname());
}

/**
 * Get device language code
 * @param  {String}          defaultLanguage Device default language code (ISO 639-1)
 * @return {Promise<String>}                 Device language code
 */
async function _getDeviceLanguage(defaultLanguage) {
	return await _getConfigElementValue(ConfigElement.LANGUAGE, defaultLanguage);
}

/**
 * Get device theme
 * @param  {String}          defaultTheme Device default prefers-color-scheme
 * @return {Promise<String>}              Device theme
 */
async function _getDeviceTheme(defaultTheme) {
	return await _getConfigElementValue(ConfigElement.THEME, defaultTheme);
}

/**
 * Get the config element value set or default
 * @param  {ConfigElement} configElement Config element to obtain
 * @param  {Any}           defaultValue  Config element default value
 * @return {Promise<Any>}                Config element value
 */
async function _getConfigElementValue(configElement, defaultValue) {

	const config = await configService.getConfigs();
	// Check the presence of the set value
	if (config && config[configElement.description]) {
		return config[configElement.description];
	} else {
		return defaultValue;
	}
}

/**
 * Get device ip list
 * @return {String[]} Device ip list
 */
function _getIpList() {

	let ipList = [];

	// Get ip addresses from network interfaces
	for (const interfaceName of Object.keys(networkInterfaces)) {
		for (const net of networkInterfaces[interfaceName]) {

			// Skip over non application internet protocol version and internal addresses
			if (net.family === constant.ipv && !net.internal) {
				if (net.address) {
					ipList.push(net.address);
				}
			}
		}
	}
	return ipList;
}

/**
 * Get network name
 * @return {Promise<String>} Network name
 */
async function _getNetworkName() {

	let networkName;

	if (_getOSName() === SupportedOS.LINUX) {

		try {
			// Get result from 'iwgetid' command
			const iwgetid = execSync('iwgetid').toString();
			if (iwgetid && iwgetid.includes('ESSID:')) {

				// Device is connected to wi-fi
				const ssidNameWithQuotes = iwgetid.split('ESSID:')[1];
				if (ssidNameWithQuotes && ssidNameWithQuotes.includes('"')) {
					// Get network name without quotes
					networkName = ssidNameWithQuotes.replace(/"|\n/g, '');
				}
			}
		} catch (e) {
			// Wired connection
		}
	} else {

		try {

			// Initialize module
			nodeWifi.init({ iface: null });

			await new Promise((resolve, reject) => {

				// List all wi-fi networks
				nodeWifi.getCurrentConnections(function (error, currentConnections) {
					if (error) {
						reject();
					}
					// Take first connection's SSID
					if (currentConnections && currentConnections.length > 0 && currentConnections[0].ssid) {
						networkName = currentConnections[0].ssid;
					}
					resolve();
				});

			});

		} catch (e) {
			// Device has not wi-fi module
		}
	}

	// If device is not connected to wifi, is connected through wired
	return networkName ? networkName : constant.wiredConnectionDescription;
}

module.exports = {
	findDevices,
	getDeviceInfo,
	getDeviceDetail,
	openWebsite
}
