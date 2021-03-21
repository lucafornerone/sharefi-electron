/**
 * A component that shows nav
 * 
 * @requires Component
 * @requires OnInit
 * 
 * @requires Routing
 * @requires RoutingService
 * @requires ROUTING_ITEMS
 * @requires RoutingList
 * @requires DownloadService
 */

// App modules
import { Component, OnInit } from '@angular/core';

// App modules
import { Routing } from '@interfaces/routing.interface';
import { RoutingService, ROUTING_ITEMS } from '@services/routing/routing.service';
import { DownloadService } from '@services/download/download.service';
import { DeviceApiService } from '@services/api/device-api.service';

// App website
const WEBSITE: string = 'https://sharefi.app';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

	// Available routes
	public routes: Routing[] = ROUTING_ITEMS;
	// App website url
	public website: string = WEBSITE;

	constructor(
		private _deviceApiService: DeviceApiService,
		public routingService: RoutingService,
		public downloadService: DownloadService
	) { }

	ngOnInit(): void {
	}

	/**
	 * Change the current page
 	 * @param  {Routing} page New current page
 	 * @return {Void}
 	 */
	public handleChangePage(page: Routing): void {
		this.routingService.setPageSelected(page.name);
	}

	/**
	 * Open app website
 	 * @return {Void}
 	 */
	public handleClickLogo(): void {
		this._deviceApiService.openWebsite(WEBSITE).subscribe();
	}

}
