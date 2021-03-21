/**
 * A service that handle routing
 *
 * @requires Injectable
 * @requires Router
 * 
 * @requires Routing
 * @requires RoutingList
 */

// Npm modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// App modules
import { Routing } from '@interfaces/routing.interface';
import { RoutingList } from '@enums/routing-list';

// Available routes
export const ROUTING_ITEMS: Routing[] = [
	{
		name: RoutingList.DEVICES,
		url: '/devices',
		i18nValue: 'nav.devices'
	},
	{
		name: RoutingList.SHARES,
		url: '/shares',
		i18nValue: 'nav.shares'
	},
	{
		name: RoutingList.DOWNLOAD,
		url: '/download',
		i18nValue: 'nav.download'
	}
]

export const DEVICE_ROUTE: string = '/device';

@Injectable({
	providedIn: 'root'
})
export class RoutingService {

	// Current selected page
	private _pageSelected!: string;

	constructor(
		private _router: Router
	) {

		// Initialize navigation
		this.navigateTo(RoutingList.DOWNLOAD);
	}

	/**
	 * Get current page selected
 	 * @return {String} Current page selected
 	 */
	public getPageSelected(): string {
		return this._pageSelected;
	}

	/**
	 * Set current page selected
 	 * @param  {String} page New current page
 	 * @return {Void}
 	 */
	public setPageSelected(page: string): void {
		this._pageSelected = page;
	}

	/**
	 * Navigate to page
 	 * @param  {String} destination Destination page
 	 * @return {Void}
 	 */
	public navigateTo(destination: RoutingList): void {
		// Find page info from page name
		const pageIndex: number = ROUTING_ITEMS.findIndex(route => route.name === destination);
		if (pageIndex != -1) {
			const page: Routing = ROUTING_ITEMS[pageIndex];
			// Navigate to page
			this._router.navigate([page.url]);
			this._pageSelected = page.name;
		}
	}

	/**
	 * Get available routes
	 * @return {RoutingList} Available routes
	 */
	public get availableRoutes(): typeof RoutingList {
		return RoutingList;
	}

}
