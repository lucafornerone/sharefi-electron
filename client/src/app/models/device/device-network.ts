/**
 * A class that represent a device on network
 */

export class DeviceNetwork {

	constructor(
		public os: string,
		public name: string,
		public items: number,
		public ip: string,
		public mac: string
	) { }

}