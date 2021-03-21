/**
 * A service that handle loader
 *
 * @requires Injectable
 */

// Npm modules
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	// Current loader status
	private _isVisible: boolean = false;
	// Current loader error label status
	private _isErrorVisible: boolean = false;

	constructor() { }

	/**
	 * Show loader
 	 * @return {Void}
 	 */
	public show(): void {
		this._isVisible = true;
	}

	/**
	 * Hide loader
 	 * @return {Void}
 	 */
	public hide(): void {
		this._isVisible = false;
		if (this._isErrorVisible) {
			// Remove error label
			this._isErrorVisible = false;
		}
	}

	/**
	 * Show loader error label
	 * @return {Void}
	 */
	public showError(): void {
		this._isErrorVisible = true;
	}

	/**
	 * Get current loader visibility status
 	 * @return {Boolean} Loader visibility status
 	 */
	public isVisible(): boolean {
		return this._isVisible;
	}

	/**
	 * Get current loader error label visibility status
 	 * @return {Boolean} loader error label visibility status
 	 */
	public isErrorVisible(): boolean {
		return this._isErrorVisible;
	}

}
