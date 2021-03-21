/**
 * A service that handle item
 *
 * @requires Injectable
 *
 * @requires ItemType
 */

// Npm modules
import { Injectable } from '@angular/core';

// App modules
import { ItemType } from '@enums/item-type';

export const NO_BYTES: string = '0 Bytes';

@Injectable({
	providedIn: 'root'
})
export class ItemService {

	constructor() { }

	/**
	 * Get available item type
	 * @return {ItemType} Available item type
	 */
	public get availableItemType(): typeof ItemType {
		return ItemType;
	}

	/**
     * Converts the total file bytes into a readable string (expressed in Bytes, KB, MB, GB etc.)
     * For more information: {@link https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript stackoverflow}
     * @param  {Number} bytes      Total file bytes
     * @param  {Number} [decimals] Optional number of decimals
     * @return {String}            Readable file's size
     */
	public formatBytes(bytes: number, decimals: number = 2): string {
		if (bytes === 0) return NO_BYTES;

		const k: number = 1024;
		const dm: number = decimals < 0 ? 0 : decimals;
		const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i: number = Math.floor(Math.log(bytes) / Math.log(k));

		let size: string = parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '';
		if (i > 0) {
			// Fix decimal only if size is not in bytes
			if (!size.includes('.')) {
				// Correct to two decimal places if there aren't any
				size += '.00';
			} else if (size.split('.')[1].length === 1) {
				// Correct to two decimal places if there is only one
				size += '0';
			}
		}
		return size + ' ' + sizes[i];
	}
}
