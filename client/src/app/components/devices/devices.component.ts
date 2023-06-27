/**
 * A component that shows connected devices
 *
 * @requires Component
 * @requires OnInit
 * @requires forkJoin
 * @requires Observable
 *
 * @requires DeviceApiService
 * @requires DeviceGeneric
 * @requires LoaderService
 * @requires DeviceNetwork
 * @requires DEVICE_ROUTE
 * @requires DeviceRouteService
 * @requires NetworkService
 */

// Npm modules
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

// App  modules
import { DeviceApiService } from '@services/api/device-api.service';
import { DeviceGeneric } from '@interfaces/device-generic.interface';
import { LoaderService } from '@services/loader/loader.service';
import { DeviceNetwork } from '@models/device/device-network';
import { DEVICE_ROUTE } from '@services/routing/routing.service';
import { DeviceRouteService } from '@components/device/device-route.service';
import { NetworkService } from '@services/network/network.service';

@Component({
	selector: 'app-devices',
	templateUrl: './devices.component.html',
	styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

	// Devices on network
	public devices: DeviceNetwork[] = [];
	// Device route url
	public deviceRouteUrl: string = DEVICE_ROUTE;

	constructor(
		private _deviceApiService: DeviceApiService,
		private _loaderService: LoaderService,
		private _deviceRouteService: DeviceRouteService,
		public networkService: NetworkService
	) {

		// Network subscription to be notified on network change
		this.networkService.getNetworkStatus().subscribe(
			(isOnline: boolean) => {

				if (isOnline) {
					// Device is back online, reload devices
					this.findDevices();
				}
			}
		);

		// Get notification of total items shared by a device
		this._deviceRouteService.getDeviceShares().subscribe(
			(items: number) => {
				// Find device
				const deviceIndex: number = this.devices.findIndex(device => device.ip === this._deviceRouteService.getDevice().ip);
				if (deviceIndex != -1) {
					// Update total items shared
					this.devices[deviceIndex].items = items;
				}
			}
		);

		// Get notification of a offline device
		this._deviceRouteService.getDeviceOffline().subscribe(
			(ip: string) => {
				// Find device to remove
				const deviceIndex: number = this.devices.findIndex(device => device.ip === ip);
				if (deviceIndex != -1) {
					// Remove device
					this.devices.splice(deviceIndex, 1);
				}
			}
		);
	}

	ngOnInit(): void {
		this.findDevices();
	}

	/**
     * Find devices on network, then displays them
     * @return {Void}
     */
	public findDevices(): void {

		this._loaderService.show();
		this.devices = [];

		// Api to find generic devices on network
		this._deviceApiService.findDevicesOnNetwork().subscribe(
			(deviceGenericList: DeviceGeneric[]) => {

				if (deviceGenericList && deviceGenericList.length > 0) {

					// Array with all generic devices on network, not devices that run app (es. printers, mobile, ecc..)
					let ipDeviceList: Observable<boolean>[] = [];
					deviceGenericList.forEach(element => {
						ipDeviceList.push(this._deviceApiService.pingDeviceByIp(element.ip));
					});

					// Ping of each device
					forkJoin(ipDeviceList).subscribe((devices: boolean[]) => {

						let i: number = 0;
						let deviceIpOnNetwork: string[] = [];
						let deviceMacOnNetwork: string[] = [];
						devices.forEach(element => {
							if (element === true) {
								// This device has app running
								deviceIpOnNetwork.push(deviceGenericList[i].ip);
								deviceMacOnNetwork.push(deviceGenericList[i].mac);
							}
							i++;
						});

						if (deviceIpOnNetwork && deviceIpOnNetwork.length > 0) {
							// At least one device has the app running
							this._getInfoForDeviceOnNetwork(deviceIpOnNetwork, deviceMacOnNetwork);
						} else {
							// No devices founded
							this._loaderService.hide();
						}

					});

				} else {
					// No devices founded
					this._loaderService.hide();
				}

			},
			(error) => {

			}
		)
	}

	/**
     * Get info for devices on network
     * @param  {String[]} ipList  Devices ip
     * @param  {String[]} macList Devices mac
     * @return {Void}
     */
	private _getInfoForDeviceOnNetwork(ipList: string[], macList: string[]): void {

		// Array with all devices that run app
		let ipDeviceNetworkList: Observable<DeviceNetwork>[] = [];
		for (let i = 0; i < ipList.length; i++) {
			ipDeviceNetworkList.push(this._deviceApiService.getDeviceInfoByIp(ipList[i], macList[i]));
		}

		// Get info for each device
		forkJoin(ipDeviceNetworkList).subscribe((devicesNetwork: DeviceNetwork[]) => {

			this.devices = devicesNetwork;
			// App is ready, remove loader
			this._loaderService.hide();
		});

	}

	/**
     * Set device name before navigate to device route
     * @param  {DeviceNetwork} device Clicked device
     * @return {Void}
     */
	public handleNavigateToDevice(device: DeviceNetwork): void {
		this._deviceRouteService.setDevice(device);
	}

}
