/**
 * A service that handle apis
 *
 * @requires Injectable
 * 
 * @requires environment
 */

// Npm modules
import { Injectable } from '@angular/core';

// App modules
import { environment } from '@environment';

export const LOCALHOST_PATH: string = 'localhost';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor() { }

	/**
	 * Get the api url to make the HTTP request
 	 * @param  {String} ip          Device's ip
 	 * @param  {String} primaryPath Api primary path
 	 * @param  {String} apiName     Api name
 	 * @return {String}             Api complete url
 	 */
	public getUrl(ip: string, primaryPath: string, apiName: string): string {
		return `${environment.apiProtocol}://${ip}:${environment.apiPort}/${environment.apiEndpoint}/${primaryPath}${apiName}`;
	}

}
