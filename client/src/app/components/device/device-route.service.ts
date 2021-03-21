/**
 * A service that handle device route
 *
 * @requires Injectable
 * @requires Observable
 * @requires Subject
 *
 * @requires DeviceNetwork
 */

// Npm modules
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// App modules
import { DeviceNetwork } from '@models/device/device-network';

@Injectable({
	providedIn: 'root'
})
export class DeviceRouteService {

	// Device info
	private _device!: DeviceNetwork;

	// Subject to pass total items shared to devices page
	private _deviceShares$: Subject<number> = new Subject<number>();

	// Subject to notify a offline device
	private _deviceOffline$: Subject<string> = new Subject<string>();

	constructor() { }

	/**
     * Get device
     * @return {DeviceNetwork} Device
     */
	public getDevice(): DeviceNetwork {
		return this._device;
	}

	/**
     * Set device
     * @param  {DeviceNetwork} device Device
     * @return {Void}
     */
	public setDevice(device: DeviceNetwork): void {
		this._device = device;
	}

	/**
	 * Receive notification of total items shared by a device
 	 * @return {Observable<Number>} Total items shared as observable
 	 */
	public getDeviceShares(): Observable<number> {
		return this._deviceShares$.asObservable();
	}

	/**
	 * Notifies the total items shared by a device
	 * @param  {Number} items Total items shared
 	 * @return {Void}
 	 */
	public setDeviceShares(items: number): void {
		this._deviceShares$.next(items);
	}

	/**
	 * Receive notification of a offline device
 	 * @return {Observable<String>} Offline device ip
 	 */
	public getDeviceOffline(): Observable<string> {
		return this._deviceOffline$.asObservable();
	}

	/**
	 * Notifies a offline device
	 * @param  {String} ip Offline device ip
 	 * @return {Void}
 	 */
	public setDeviceOffline(ip: string): void {
		this._deviceOffline$.next(ip);
	}

}
