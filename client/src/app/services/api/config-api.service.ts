/**
 * A service that handle config's apis
 *
 * @requires Injectable
 * @requires HttpClient
 * @requires Observable
 * @requires of
 * @requires map
 * @requires catchError
 *
 * @requires ApiService
 * @requires LOCALHOST_PATH
 * @requires ApiName
 */

// Npm modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// App modules
import { ApiService, LOCALHOST_PATH } from './api.service';
import { ApiName } from '@enums/api-name';
import { CurrentDevice } from '@models/device/current-device';

// Config's api primary path name
const CONFIG_PATH: string = 'config/';

@Injectable({
	providedIn: 'root'
})
export class ConfigApiService {

	constructor(
		private _http: HttpClient,
		private _apiService: ApiService
	) { }

    /**
	 * Api to update device name
	 * @param  {String}             name Updated device name
 	 * @return {Observable<String>}      Device name
 	 */
	public updateName(name: string): Observable<string> {
		const body = {
			'name': name
		}
		return this._http.post<CurrentDevice>(this._apiService.getUrl(LOCALHOST_PATH, CONFIG_PATH, ApiName.CONFIG_NAME), body).pipe(
			map(device => device.name ? device.name : '')
		);
	}

	/**
	 * Api to update device theme
	 * @param  {String}             theme Updated device theme
 	 * @return {Observable<String>}       Device theme
 	 */
	public updateTheme(theme: string): Observable<string> {
		const body = {
			'theme': theme
		}
		return this._http.post<CurrentDevice>(this._apiService.getUrl(LOCALHOST_PATH, CONFIG_PATH, ApiName.CONFIG_THEME), body).pipe(
			map(device => device.theme ? device.theme : '')
		);
	}

	/**
	 * Api to update device language
	 * @param  {String}             language Updated device language
 	 * @return {Observable<String>}          Device language
 	 */
	public updateLanguage(language: string): Observable<string> {
		const body = {
			'language': language
		}
		return this._http.post<CurrentDevice>(this._apiService.getUrl(LOCALHOST_PATH, CONFIG_PATH, ApiName.CONFIG_LANGUAGE), body).pipe(
			map(device => device.language ? device.language : '')
		);
	}

}
