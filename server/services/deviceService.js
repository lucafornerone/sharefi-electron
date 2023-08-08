/**
 * A module that contains device's functions
 * @module deviceService
 *
 * @requires os
 * @requires node-wifi
 * @requires electron
 * @requires child_process
 * @requires default-gateway
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
const os = require('os');
const nodeWifi = require('node-wifi');
const { shell } = require('electron');
const { execSync } = require('child_process');
const defaultGateway = require('default-gateway');

// App modules
const ConfigElement = require('../enums/ConfigElement');
const SupportedOS = require('../enums/SupportedOS');
const Device = require('../models/Device');
const DeviceNetowrk = require('../models/DeviceNetwork');
const configService = require('./configService');
const itemService = require('./itemService');
const constant = require('../../constant');

/**
 * Get all possible devices connected to same local network
 * @return {Promise<DeviceGeneric[]>} Devices generic details
 */
async function findDevices() {

	try {

		// Get current interface
		const { gateway, interface } = await defaultGateway.v4();
		// Get network info by interface and ipv
		const networkInfo = os.networkInterfaces()[interface].find(n => n.family === constant.ipv);
		// Get total hosts in current subnet
		let totalHosts = constant.supportedSubnets.get(networkInfo.netmask);
		if (totalHosts === undefined) {
			// Use default subnet total hosts
			totalHosts = constant.supportedSubnets.get(constant.defaultSubnet);
		}
		let ipList = _generateIpList(gateway, totalHosts - 1);
		// Remove current ip
		ipList = ipList.filter(ip => ip !== networkInfo.address);
		return ipList.map(ip => ({ 'ip': ip }));

	} catch (error) {
		return [];
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
					if (error || !currentConnections || currentConnections.length === 0) {
						reject();
					}

					// Get connection name
					if (os.platform() === 'win32') {
						// Use windows-release to determinate Windows version
						import('windows-release').then(windowsRelease => {
							// On Windows 11 connection name is in bssid property
							networkName = windowsRelease.default.call() === '11' ? currentConnections[0].bssid : currentConnections[0].ssid;
							resolve();
						});
					} else {
						networkName = currentConnections[0].ssid;
						resolve();
					}
				});

			});

		} catch (e) {
			// Device has not wi-fi module
		}
	}

	// If device is not connected to wifi, is connected through wired
	return networkName ? networkName : constant.wiredConnectionDescription;
}

/**
 * Generate N ip from start ip
 * @param  {String}   ip Start ip
 * @param  {Number}   n  Number of ip to generate
 * @return {String[]}    Ip list
 */
function _generateIpList(ip, n) {
	const ipParts = ip.split('.').map(Number);
	let ipList = [];

	for (let i = 0; i < n; i++) {
		ipList.push(ipParts.join('.'));
		ipParts[3]++;
		for (let j = 3; j >= 0; j--) {
			if (ipParts[j] > 255) {
				ipParts[j] = 0;
				ipParts[j - 1]++;
			}
		}
	}

	return ipList;
}

module.exports = {
	findDevices,
	getDeviceInfo,
	getDeviceDetail,
	openWebsite
}
