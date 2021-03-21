/**
 * A service that handle config's apis
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
 * @requires Item
 * @requires DownloadRequest
 * @requires ItemType
 * @requires ItemRequest
 */

// Npm modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// App modules
import { ApiService, LOCALHOST_PATH } from './api.service';
import { ApiName } from '@enums/api-name';
import { Item } from '@models/item/item';
import { DownloadRequest } from '@interfaces/download-request.interface';
import { ItemType } from '@enums/item-type';
import { ItemRequest } from '@interfaces/item-request.interface';

// Item's api primary path name
const ITEM_PATH: string = 'item/';

@Injectable({
	providedIn: 'root'
})
export class ItemApiService {

	constructor(
		private _http: HttpClient,
		private _apiService: ApiService
	) { }

	/**
	 * Api to get shared items
	 * @param  {String}             ip Device's ip
 	 * @return {Observable<Item[]>}    Shared items
 	 */
	public getSharedItems(ip: string): Observable<Item[]> {
		return this._http.get<Item[]>(this._apiService.getUrl(ip, ITEM_PATH, ApiName.ITEM_GET), { headers: new HttpHeaders({ timeout: `${3000}` }) }).pipe(
			map(items => items)
		);
	}

	/**
	 * Api to stream item
	 * @param  {String}          ip       Device's ip
	 * @param  {DownloadRequest} download Download request
	 * @param  {ItemType}        itemType Item type to stream
 	 * @return {Observable<Any>}          HTTP event as observable
 	 */
	public streamItem(ip: string, download: DownloadRequest, itemType: ItemType): Observable<any> {

		let apiName: string = '';
		if (itemType === ItemType.FILE) {
			apiName = ApiName.ITEM_STREAM_FILE;
		} else if (itemType === ItemType.FOLDER) {
			apiName = ApiName.ITEM_STREAM_FOLDER;
		}

		return this._http.post(this._apiService.getUrl(ip, ITEM_PATH, apiName), download,
			{ responseType: 'blob', reportProgress: true, observe: 'events' }).pipe(
				map(res => res),
				catchError(error => of(null))
			);
	}

	/**
	 * Api to stream zip
	 * @param  {String}            ip        Device's ip
	 * @param  {DownloadRequest[]} downloads Download requests
 	 * @return {Observable<Any>}             HTTP event as observable
 	 */
	public streamZip(ip: string, downloads: DownloadRequest[]): Observable<any> {

		return this._http.post(this._apiService.getUrl(ip, ITEM_PATH, ApiName.ITEM_STREAM_ZIP), { 'items': downloads },
			{ responseType: 'blob', reportProgress: true, observe: 'events' }).pipe(
				map(res => res),
				catchError(error => of(null))
			);
	}

	/**
	 * Api to get own shared items
 	 * @return {Observable<Item[]>} Own shared items
 	 */
	public getOwnSharedItems(): Observable<Item[]> {
		return this._http.get<Item[]>(this._apiService.getUrl(LOCALHOST_PATH, ITEM_PATH, ApiName.ITEM_GET)).pipe(
			map(items => items)
		);
	}

	/**
	 * Api to open native prompt window for choosing files
 	 * @return {Observable<String[]>} Files path
 	 */
	public openPromptFile(): Observable<string[]> {
		return this._http.get<string[]>(this._apiService.getUrl(LOCALHOST_PATH, ITEM_PATH, ApiName.ITEM_PROMPT_FILE)).pipe(
			map(filesPath => filesPath)
		)
	}

	/**
	 * Api to open native prompt window for choosing folders
 	 * @return {Observable<String[]>} Folders path
 	 */
	public openPromptFolder(): Observable<string[]> {
		return this._http.get<string[]>(this._apiService.getUrl(LOCALHOST_PATH, ITEM_PATH, ApiName.ITEM_PROMPT_FOLDER)).pipe(
			map(filesPath => filesPath)
		)
	}

	/**
	 * Api to share items
	 * @param  {String[]}            items    Items path
	 * @param  {ItemType}            itemType Item type to share
	 * @param  {String}              tag      Text to more easily identify shared items
 	 * @return {Observable<Boolean>}          Sharing success
 	 */
	public shareItems(items: string[], itemType: ItemType, tag: string): Observable<boolean> {
		const body = {
			'items': items,
			'itemType': itemType,
			'tag': tag
		}
		return this._http.post<boolean>(this._apiService.getUrl(LOCALHOST_PATH, ITEM_PATH, ApiName.ITEM_SHARE), body).pipe(
			map(success => success)
		);
	}

	/**
	 * Api to remove sharing items
	 * @param  {ItemRequest[]}       items Items to remove
 	 * @return {Observable<Boolean>}       Remove sharing success
 	 */
	public removeSharingItems(items: ItemRequest[]): Observable<boolean> {
		return this._http.post<boolean>(this._apiService.getUrl(LOCALHOST_PATH, ITEM_PATH, ApiName.ITEM_REMOVE_SHARE), { 'items': items }).pipe(
			map(success => success)
		);
	}

}
