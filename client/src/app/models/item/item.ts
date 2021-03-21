/**
 * A class that represent a shared item
 * @requires ItemType
 */

// App modules
import { ItemType } from '@enums/item-type';

export class Item {

	constructor(
		public id: number,
		public name: string,
		public type: ItemType,
		public fullName: string,
		public extension: string,
		public size: string,
		public bytes: number,
		public totFiles: number,
		public tag: string
	) { }

}