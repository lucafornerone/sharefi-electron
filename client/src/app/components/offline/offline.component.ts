/**
 * A component that shows header
 *
 * @requires Component
 * @requires OnInit
 *
 * @requires NetworkService
 */

// Npm modules
import { Component, OnInit } from '@angular/core';

// App modules
import { NetworkService } from '@services/network/network.service';

@Component({
	selector: 'app-offline',
	templateUrl: './offline.component.html',
	styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

	constructor(
		public networkService: NetworkService
	) { }

	ngOnInit(): void {
	}

}
