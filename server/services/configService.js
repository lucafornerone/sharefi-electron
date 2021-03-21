/**
 * A module that contains config's functions
 * @module configService
 *
 * @requires fs
 * 
 * @requires ConfigElement
 * @requires Theme
 * @requires configuration
 * @requires constant
 */

// Npm modules
const fs = require('fs');

// App modules
const ConfigElement = require('../enums/ConfigElement');
const Theme = require('../enums/Theme');
const configuration = require('../../configuration');
const constant = require('../../constant');

/**
 * Get user's set configs
 * @return {Promise<Object>} User's set configs
 */
async function getConfigs() {
	return await JSON.parse(fs.readFileSync(configuration.getConfigFilePath(), { encoding: constant.encoding }));
}

/**
 * Update device name
 * @param  {String}          name Updated device name
 * @return {Promise<Object>}      User's set configs
 */
async function updateName(name) {
	return await _updateConfig(ConfigElement.NAME, name);
}

/**
 * Update device language
 * @param  {String}          language Updated device language code (ISO 639-1)
 * @return {Promise<Object>}          User's set configs
 */
async function updateLanguage(language) {
	return await _updateConfig(ConfigElement.LANGUAGE, language);
}

/**
 * Update device theme
 * @param  {Theme}           theme Updated device theme
 * @return {Promise<Object>}       User's set configs
 */
async function updateTheme(theme) {
	return await _updateConfig(ConfigElement.THEME, theme);
}

/**
 * Check the correctness type of updated config
 * @param  {Any}           value         Updated config value
 * @param  {ConfigElement} configElement Device config element
 * @return {Boolean}                     True if updated config value type is correct
 */
function isRightTypeof(value, configElement) {
	return typeof value === configElement.type;
}

/**
 * Check the correctness of the updated theme
 * @param  {String}  theme Updated device theme
 * @return {Boolean}       True if updated theme is valid
 */
function isUpdatedThemeInThemeList(theme) {
	
	if (theme === Theme.LIGHT) {
		return true;
	} else if (theme === Theme.DARK) {
		return true;
	} else {
		return false;
	}
}

/**
 * Update device config
 * @param  {ConfigElement}   configElement Device config element
 * @param  {Any}             updatedConfig Updated config element
 * @return {Promise<Object>}
 */
async function _updateConfig(configElement, updatedConfig) {

	// User's set configs
	let config = await getConfigs();
	// Update config element
	config[configElement.description] = updatedConfig;

	// Update device config
	fs.writeFileSync(configuration.getConfigFilePath(), JSON.stringify(config), { encoding: constant.encoding },
		(error) => {
			new Error(error);
		}
	);

	return config;
}


module.exports = {
	getConfigs,
	updateName,
	updateLanguage,
	updateTheme,
	isRightTypeof,
	isUpdatedThemeInThemeList
}