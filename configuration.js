/**
 * A module that contains app's configuration functions
 * @module configuration
 *
 * @requires os
 * @requires fs
 * @requires constant
 */

// Npm modules
const homedir = require('os').homedir();
const fs = require('fs');

// App modules
const constant = require('./constant');

/**
 * Initialize app's configuration
 * @param  {Boolean}           isProd True if current environment is production
 * @return {Promise<Boolean>}         True if all configurations are correct
 */
async function initializeConfig(isProd) {

	try {

		// Check the existence of the app configuration folder
		if (await _isConfigurationFolderPresent()) {

			if (!await _isConfigFilePresent()) {
				await _createConfigFile();
			}

			if (!await _isTempFolderPresent()) {
				await _createTempFolder();
			}

			// SSL certificates are present only in the prod environment
			if (isProd) {
				if (await _isSslCertificateFolderPresent()) {

					if (!await _isSslCertificateCertFilePresent()) {
						await _createSslCertificateCertFile();
					}
					if (!await _isSslCertificateKeyFilePresent()) {
						await _createSslCertificateKeyFile();
					}

				} else {
					// Create all SSL configuration file and folders necessary
					await _createSslCertificateFolder();
					await _createSslCertificateCertFile();
					await _createSslCertificateKeyFile();
				}
			}

		} else {

			// Create all configuration file and folders necessary
			await _createConfigurationFolder();
			await _createTempFolder();
			await _createConfigFile();

			// SSL certificates are present only in the prod environment
			if (isProd) {
				// Create all SSL configuration file and folders necessary
				await _createSslCertificateFolder();
				await _createSslCertificateCertFile();
				await _createSslCertificateKeyFile();
			}

		}

		return true;

	} catch (error) {
		return false;
	}

}

/**
 * Get user app configuration folder path
 * @return {String} App configuration folder path
 */
function getConfigurationFolderPath() {
	return `${homedir}/.${constant.appName}`;
}

/**
 * Get user app temp folder path
 * @return {String} App temp folder path
 */
function getTempFolderPath() {
	return `${homedir}/.${constant.appName}/${constant.tmpFolder}`;
}

/**
 * Get user app file config path
 * @return {String} Config file path
 */
function getConfigFilePath() {
	return `${getConfigurationFolderPath()}/${constant.configFileName}`;
}

/**
 * Get user app SSL certificate folder path
 * @return {String} SSL certificate folder path
 */
function getSslCertificateFolderPath() {
	return `${getConfigurationFolderPath()}/${constant.sslFolder}`;
}

/**
 * Get user app SSL certificate cert file path
 * @return {String} SSL certificate cert file path
 */
function getSslCertificateCertFilePath() {
	return `${getSslCertificateFolderPath()}/${constant.sslCertFileName}`;
}

/**
 * Get user app SSL certificate key file path
 * @return {String} SSL certificate key file path
 */
function getSslCertificateKeyFilePath() {
	return `${getSslCertificateFolderPath()}/${constant.sslKeyFileName}`;
}

/**
 * Lets know if app configuration folder path is present
 * @return {Promise<Boolean>} True if configuration folder exists
 */
async function _isConfigurationFolderPresent() {
	return fs.existsSync(getConfigurationFolderPath());
}

/**
 * Create the app configuration folder
 * @return {Promise<Void>}
 */
async function _createConfigurationFolder() {
	fs.mkdirSync(getConfigurationFolderPath());
}

/**
 * Lets know if app temp folder path is present
 * @return {Promise<Boolean>} True if temp folder exists
 */
async function _isTempFolderPresent() {
	return fs.existsSync(getTempFolderPath());
}

/**
 * Create the app temp folder
 * @return {Promise<Void>}
 */
async function _createTempFolder() {
	fs.mkdirSync(getTempFolderPath());
}

/**
 * Lets know if app config file path is present
 * @return {Promise<Boolean>} True if config file exists
 */
async function _isConfigFilePresent() {
	return fs.existsSync(getConfigFilePath());
}

/**
 * Create the app config file
 * @return {Promise<Void>}
 */
async function _createConfigFile() {
	fs.writeFileSync(getConfigFilePath(), JSON.stringify({}));
}

/**
 * Lets know if app SSL certificate folder is present
 * @return {Promise<Boolean>} True if SSL certificate folder exists
 */
async function _isSslCertificateFolderPresent() {
	return fs.existsSync(getSslCertificateFolderPath());
}

/**
 * Create the app SSL certificate folder
 * @return {Promise<Void>}
 */
async function _createSslCertificateFolder() {
	fs.mkdirSync(getSslCertificateFolderPath());
}

/**
 * Lets know if app SSL certificate cert file is present
 * @return {Promise<Boolean>} True if app SSL certificate cert file is present
 */
async function _isSslCertificateCertFilePresent() {
	return fs.existsSync(getSslCertificateCertFilePath());
}

/**
 * Create the app SSL certificate cert file
 * @return {Promise<Void>}
 */
async function _createSslCertificateCertFile() {
	fs.writeFileSync(getSslCertificateCertFilePath(), '');
}

/**
 * Lets know if app SSL certificate key file is present
 * @return {Promise<Boolean>} True if app SSL certificate key file is present
 */
async function _isSslCertificateKeyFilePresent() {
	return fs.existsSync(getSslCertificateKeyFilePath());
}

/**
 * Create the app SSL certificate key file
 * @return {Promise<Void>}
 */
async function _createSslCertificateKeyFile() {
	fs.writeFileSync(getSslCertificateKeyFilePath(), '');
}


module.exports = {
	initializeConfig,
	getConfigurationFolderPath,
	getTempFolderPath,
	getConfigFilePath,
	getSslCertificateFolderPath,
	getSslCertificateCertFilePath,
	getSslCertificateKeyFilePath
}