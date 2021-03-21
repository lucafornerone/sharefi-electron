/** 
 * A module that represents device config elements
 * @module ConfigElement
 * 
 */

/**
 * Device config elements
 * @enum
 */
const ConfigElement = {
	NAME: {
		description: 'name',
		type: 'string'
	},
	LANGUAGE: {
		description: 'language',
		type: 'string'
	},
	THEME: {
		description: 'theme',
		type: 'string'
	}
}

module.exports = ConfigElement;