/**
 * A service that handle theme
 *
 * @requires Injectable
 *
 * @requires ThemeList
 */

// Npm modules
import { Injectable } from '@angular/core';

// App modules
import { ThemeList } from '@enums/theme-list';

// Available themes
export const THEME_LIGHT = "theme-light";
export const THEME_DARK = "theme-dark";

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	constructor() { }

	/**
	 * Set theme configuration
	 * @param  {String} theme Theme to set
 	 * @return {Void}
 	 */
	public setTheme(theme: string): void {

		let body = document.body;
		// Update body id
		if (theme === ThemeList.LIGHT) {
			body.id = THEME_LIGHT;
		} else if (theme === ThemeList.DARK) {
			body.id = THEME_DARK;
		}
	}

	/**
	 * Get current theme configuration
 	 * @return {String} Current theme
 	 */
	public getTheme(): string {
		return document.body.id;
	}

}
