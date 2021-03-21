/**
 * A service that handle network
 *
 * @requires Injectable
 * @requires Subject
 * @requires Observable
 */

// Npm modules
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// Offline status description
const OFFLINE: string = 'Offline';

@Injectable({
	providedIn: 'root'
})
export class NetworkService {

	// Subject for network status
	private _networkStatus$: Subject<boolean> = new Subject<boolean>();

	constructor() {

		// Listen for online status
		window.addEventListener('online', () => {
			this.setNetworkStatus(true);
		});
		// Listen for offline status
		window.addEventListener('offline', () => {
			this.setNetworkStatus(false);
		});
	}

	/**
	 * Receive notification of network status change
 	 * @return {Observable<boolean>} Network status as observable
 	 */
	public getNetworkStatus(): Observable<boolean> {
		return this._networkStatus$.asObservable();
	}

	/**
	 * Notifies the network status change
	 * @param  {boolean} isOnline Current network status
 	 * @return {Void}
 	 */
	public setNetworkStatus(isOnline: boolean): void {
		this._networkStatus$.next(isOnline);
	}

	/**
	 * Get current online status
	 * @return {Boolean} True if device is online
	 */
	public isOnline(): boolean {
		return navigator.onLine;
	}

	/**
	 * Get offline description
	 * @return {String} Offline description
	 */
	public get offlineDescription(): string {
		return OFFLINE;
	}

}
