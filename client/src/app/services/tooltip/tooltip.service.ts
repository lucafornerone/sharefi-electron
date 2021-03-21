/**
 * A service that handle tooltip
 *
 * @requires Injectable
 */

// Npm modules
import { Injectable } from '@angular/core';

// Class of tooltip's external wrapper HTML elementL
const TOOLTIP_EXTERNAL_WRAPPER: string = 'cdk-overlay-container';

@Injectable({
	providedIn: 'root'
})
export class TooltipService {

	constructor() { }

	/**
	 * Check for tooltips from devices pages, if there are, hide them
	 * @return {Void}
	 */
	public checkTooltipFromDevicePage(): void {
		const childrens = document.body.children;
		if (childrens && childrens.length > 0 && childrens[childrens.length - 1]) {
			let externalWrapper: any = childrens[childrens.length - 1];
			// Check for tooltip external wrapper
			if (externalWrapper.className === TOOLTIP_EXTERNAL_WRAPPER && externalWrapper.children && externalWrapper.children.length === 1) {

				// Check for internal wrapper
				if (externalWrapper.children[0].children && externalWrapper.children[0].children.length > 0) {

					// Tooltip to analyze
					let tooltip: any;

					// Hide all tooltips (they are of previous page)
					for (let i = 0; i < externalWrapper.children[0].children.length; i++) {
						tooltip = externalWrapper.children[0].children[i];
						// Hide last children
						tooltip.children[0].children[0].style.display = 'none';
					}
				}
			}
		}
	}

}
