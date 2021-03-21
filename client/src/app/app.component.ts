/**
 * Angular's auto generated component
 */

// Npm modules
import { Component } from '@angular/core';
import { LoaderService } from '@services/loader/loader.service';
import { NetworkService } from '@services/network/network.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(
		public loaderService: LoaderService,
		public networkService: NetworkService
	) {

	}


}
