/** 
 * A module that represents a generic device on the network
 * @module DeviceGeneric
 */

/** A class that allows to create a new generic device */
class DeviceGeneric {

	/**
     * Creates a new generic device
     * @param  {String} name Device's name
     * @param  {String} ip   Device's ip address
     * @param  {String} mac  Device's mac address
     */
	constructor(name, ip, mac) {
		this.name = name;
		this.ip = ip;
		this.mac = mac;
	}

}

module.exports = DeviceGeneric;