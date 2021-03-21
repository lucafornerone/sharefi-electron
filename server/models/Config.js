/** 
 * A module that represents a device's configuration
 * @module Config
 */

/** A class that allows to create a new device configuration */
class Config {

    /**
     * Creates a new device configuration
     * @param  {String} name     Device's name
     * @param  {String} language Device's language
     * @param  {String} theme    Device's theme ('light' or 'dark')
     */
    constructor(name, language, theme) {
        this.name = name;
        this.language = language;
        this.theme = theme;
    }

}

module.exports = Config;