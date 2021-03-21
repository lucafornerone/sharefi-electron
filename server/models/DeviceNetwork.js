/** 
 * A module that represents a device on sharefi network
 * @module DeviceNetwork
 */

/** A class that allows to create a new device on sharefi network */
class DeviceNetwork {

    /**
     * Creates a new network device
     * @param  {String} os    Device's OS name
     * @param  {String} name  Device's name
     * @param  {Number} items Total items shared by the device
     */
    constructor(os, name, items) {
        this.os = os;
        this.name = name;
        this.items = items;
    }

}

module.exports = DeviceNetwork;