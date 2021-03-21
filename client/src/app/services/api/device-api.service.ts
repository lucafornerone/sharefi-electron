/**
 * A service that handle device's apis
 *
 * @requires Injectable
 * @requires HttpClient
 * @requires HttpHeaders
 * @requires Observable
 * @requires of
 * @requires map
 * @requires catchError
 *
 * @requires ApiService
 * @requires LOCALHOST_PATH
 * @requires ApiName
 * @requires CurrentDevice
 * @requires DeviceGeneric
 * @requires DeviceNetwork
 */

// Npm modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// App modules
import { ApiService, LOCALHOST_PATH } from './api.service';
import { ApiName } from '@enums/api-name';
import { CurrentDevice } from '@models/device/current-device';
import { DeviceGeneric } from '@interfaces/device-generic.interface';
import { DeviceNetwork } from '@models/device/device-network';

// Device's api primary path name
const DEVICE_PATH: string = 'device/';

@Injectable({
	providedIn: 'root'
})
export class DeviceApiService {

	constructor(
		private _http: HttpClient,
		private _apiService: ApiService
	) { }

	/**
	 * Api to know if the server has started
 	 * @return {Observable<Boolean>} Ping success status
 	 */
	public pingCurrentDevice(): Observable<boolean> {
		return this._http.get<boolean>(this._apiService.getUrl(LOCALHOST_PATH, DEVICE_PATH, ApiName.DEVICE_PING), { headers: new HttpHeaders({ timeout: `${1000}` }) }).pipe(
			map(result => result)
		);
	}

	/**
	 * Api to get device detail
	 * @param  {String}                    defaultLanguage Device native default language
 	 * @param  {String}                    defaultTheme    Device native default theme
 	 * @return {Observable<CurrentDevice>}                 Device detail
 	 */
	public getCurrentDeviceDetails(defaultLanguage: string, defaultTheme: string): Observable<CurrentDevice> {
		const body = {
			'defaultLanguage': defaultLanguage,
			'defaultTheme': defaultTheme
		}
		return this._http.post<CurrentDevice>(this._apiService.getUrl(LOCALHOST_PATH, DEVICE_PATH, ApiName.DEVICE_DETAIL), body).pipe(
			map(device => new CurrentDevice(device.os, device.name, device.language, device.theme, device.network))
		);
	}

	/**
	 * Api to find generic devices on network
 	 * @return {Observable<DeviceGeneric[]>} Generic devices
 	 */
	public findDevicesOnNetwork(): Observable<DeviceGeneric[]> {
		return this._http.get<DeviceGeneric[]>(this._apiService.getUrl(LOCALHOST_PATH, DEVICE_PATH, ApiName.DEVICE_FIND)).pipe(
			map(deviceGeneric => deviceGeneric),
			catchError(error => of(error))
		);
	}

	/**
	 * Api to ping a device on network to know if it run the app
 	 * @param  {String}              ip Device's ip to ping
 	 * @return {Observable<Boolean>}    Ping success status
 	 */
	public pingDeviceByIp(ip: string): Observable<boolean> {
		return this._http.get<boolean>(this._apiService.getUrl(ip, DEVICE_PATH, ApiName.DEVICE_PING), { headers: new HttpHeaders({ timeout: `${2000}` }) }).pipe(
			map(result => result),
			catchError(error => of(error))
		);
	}

	/**
	 * Api get device info by ip
 	 * @param  {String}                    ip  Device's ip
 	 * @param  {String}                    mac Device's mac
 	 * @return {Observable<DeviceNetwork>}     Device info
 	 */
	public getDeviceInfoByIp(ip: string, mac: string): Observable<DeviceNetwork> {
		return this._http.get<DeviceNetwork>(this._apiService.getUrl(ip, DEVICE_PATH, ApiName.DEVICE_INFO)).pipe(
			map(device => new DeviceNetwork(device.os, device.name, device.items, ip, mac)),
			catchError(error => of(error))
		);
	}

	/**
	 * Api to open website url
 	 * @param  {String}           url Website url
 	 * @return {Observable<Void>}
 	 */
	public openWebsite(url: string): Observable<void> {
		return this._http.post<void>(this._apiService.getUrl(LOCALHOST_PATH, DEVICE_PATH, ApiName.DEVICE_WEBSITE), { 'url': url });
	}

}
