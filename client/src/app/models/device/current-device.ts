/**
 * A class that represent current device
 */

export class CurrentDevice {

	constructor(
		public os: string,
		public name: string,
		public language: string,
		public theme: string,
		public network: string
	) { }

}