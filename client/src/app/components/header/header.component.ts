/**
 * A component that shows header
 *
 * @requires Component
 * @requires OnInit
 * @requires TranslateService
 *
 * @requires environment
 * @requires DeviceApiService
 * @requires CurrentDevice
 * @requires ThemeList
 * @requires ConfigApiService
 * @requires ThemeService
 * @requires RoutingService
 * @requires RoutingList
 * @requires LoaderService
 * @requires LanguageService
 * @requires NetworkService
 */

// Npm modules
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// App modules
import { environment } from '@environment';
import { DeviceApiService } from '@services/api/device-api.service';
import { CurrentDevice } from '@models/device/current-device';
import { ThemeList } from '@enums/theme-list';
import { ConfigApiService } from '@services/api/config-api.service';
import { ThemeService } from '@services/theme/theme.service';
import { RoutingService } from '@services/routing/routing.service';
import { RoutingList } from '@enums/routing-list';
import { LoaderService } from '@services/loader/loader.service';
import { LanguageService, LANGUAGE_CODE_EN } from '@services/language/language.service';
import { NetworkService } from '@services/network/network.service';

/* Wired connection description */
const WIRED_CONNECTION: string = 'Wired';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	// Current device detail
	public device!: CurrentDevice;

	constructor(
		private _translate: TranslateService,
		private _deviceApiService: DeviceApiService,
		private _configApiService: ConfigApiService,
		private _themeService: ThemeService,
		private _routingService: RoutingService,
		private _loaderService: LoaderService,
		public languageService: LanguageService,
		public networkService: NetworkService
	) {
		// Default language
		this._translate.use(environment.defaultLanguageCode);

		// Network subscription to be notified on network change
		this.networkService.getNetworkStatus().subscribe(
			(isOnline: boolean) => {

				if (isOnline) {
					// Device back online
					this._loadDeviceDetails();
				}
			}
		);
	}

	ngOnInit(): void {

		this._loaderService.show();

		if (this.networkService.isOnline()) {

			// Load device details
			this._loadDeviceDetails();
		}
	}

	/** 
	 * Load device detail
	 * @return {Void}
	 */
	private _loadDeviceDetails(): void {

		setTimeout(() => {

			this._deviceApiService.pingCurrentDevice().subscribe(
				async (result: boolean) => {

					if (result) {

						// Server has started, get and set device detail
						this.device = await this._getCurrentDeviceDetails();
						if (this.device.language) {

							if (this.languageService.availableLanguagesCode.includes(this.device.language)) {
								// Set language
								this._translate.use(this.device.language);
							} else {
								// OS language not supported
								this.device.language = environment.defaultLanguageCode;
							}
							// Language set, then show search label
							this._loaderService.showSearchLabel = true;
						}
						if (this.device.theme) {
							// Set theme
							this._themeService.setTheme(this.device.theme);
						}

						// Navigate to main page
						this._routingService.navigateTo(RoutingList.DEVICES);
					}
				},
				() => {
					// Server has not started correctly
					this._loaderService.showError();
				}
			);
		}, environment.startupTimeout);
	}

	/**
	 * Get current device details
	 * @return {Promise<CurrentDevice>} Device details
	 */
	private async _getCurrentDeviceDetails(): Promise<CurrentDevice> {

		// Get default system language
		let defaultLanguage: string = LANGUAGE_CODE_EN;
		if (navigator.languages.length > 1) {
			try {
				// Get native device language code (ISO 639-1)
				defaultLanguage = navigator.languages[0].length === 2 ? navigator.languages[0] : navigator.languages[0].split('-')[0];
			} catch (error) {
				console.error(error);
			}
		}

		// Get default system theme
		const defaultTheme: string = window.matchMedia('(prefers-color-scheme:dark)').matches ? ThemeList.DARK : ThemeList.LIGHT;

		let deviceDetail!: CurrentDevice;
		return new Promise((resolve, reject) => {

			this._deviceApiService.getCurrentDeviceDetails(defaultLanguage, defaultTheme).subscribe(
				(currentDeviceDetail: CurrentDevice) => {
					deviceDetail = currentDeviceDetail;
					resolve(deviceDetail);
				},
				(error) => {
					reject();
				}
			);

		});
	}

	/**
	 * Update device name on input's focus out
	 * @param  {String} name Updated device name
	 */
	public async handleFocusOutName(name: string | undefined) {
		if (name) {
			this._configApiService.updateName(name).subscribe(
				// Update name
				updatedName => { this.device.name = updatedName; }
			);
		} else {
			// Input is empty, set previous device name
			const device: CurrentDevice = await this._getCurrentDeviceDetails();
			this.device.name = device.name;
		}
	}

	/**
	 * Update device theme
	 * @param  {String} theme Current device theme
	 * @return {Void}
	 */
	public handleClickTheme(currentTheme: string | undefined): void {

		if (currentTheme) {
			// Theme to update
			const theme: string = currentTheme === ThemeList.LIGHT ? ThemeList.DARK : ThemeList.LIGHT
			this._configApiService.updateTheme(theme).subscribe(
				(updatedTheme: string) => {
					// Update theme
					this.device.theme = updatedTheme;
					this._themeService.setTheme(updatedTheme);
				}
			);
		}
	}

	/**
	 * Update device language
	 * @param  {String} language Updated device language
	 * @return {Void}
	 */
	public handleClickLanguage(language: string): void {

		if (language) {

			this._configApiService.updateLanguage(language).subscribe(
				(updatedLanguage: string) => {
					// Update language
					this.device.language = updatedLanguage;
					this._translate.use(updatedLanguage);
				}
			);
		}
	}

	/**
	 * Get wired connection description to translate it
	 * @return {String} Wired description
	 */
	public get wiredConnection(): string {
		return WIRED_CONNECTION;
	}

}
