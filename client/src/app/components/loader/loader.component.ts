/**
 * A component that shows header
 *
 * @requires Component
 * @requires OnInit
 *
 * @requires ThemeService
 * @requires THEME_LIGHT
 * @requires THEME_DARK
 * @requires LoaderService
 */

// Npm modules
import { Component, OnInit } from '@angular/core';

// App modules
import { ThemeService, THEME_LIGHT, THEME_DARK } from '@services/theme/theme.service';
import { LoaderService } from '@services/loader/loader.service';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

	constructor(
		public themeService: ThemeService,
		public loaderService: LoaderService
	) { }

	ngOnInit(): void {
	}

	/**
	 * Get light theme description
	 * @return {string} Light theme description
 	 */
	public get lightTheme(): string {
		return THEME_LIGHT;
	}

	/**
	 * Get dark theme description
	 * @return {string} Dark theme description
 	 */
	public get darkTheme(): string {
		return THEME_DARK;
	}


}
