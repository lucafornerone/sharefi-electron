/** 
 * A module that represents your device
 * @module Device
 */

/** A class that allows to create a new device */
class Device {

    /**
     * Creates a new device
     * @param  {String} os       OS name
     * @param  {String} name     Device's name
     * @param  {String} language Device's language
     * @param  {String} theme    Device's theme
     * @param  {String} network  Device's network connection name
     */
    constructor(os, name, language, theme, network) {
        this.os = os;
        this.name = name;
        this.language = language;
        this.theme = theme;
        this.network = network;
    }

}

module.exports = Device;