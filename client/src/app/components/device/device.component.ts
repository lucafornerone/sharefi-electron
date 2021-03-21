/**
 * A component that show device's shared items
 *
 * @requires Component
 * @requires OnInit
 * @requires ViewChild
 * @requires MatTableDataSource
 * @requires SelectionModel
 * @requires MatPaginator
 * @requires MatSort
 * @requires uuid
 * @requires TranslateService
 *
 * @requires DeviceRouteService
 * @requires Item
 * @requires ItemApiService
 * @requires DeviceNetwork
 * @requires PaginatorService
 * @requires ItemService
 * @requires DownloadRequest
 * @requires DownloadService
 * @requires DownloadStatus
 * @requires Download
 * @requires TooltipService
 * @requires RoutingService
 * @requires RoutingList
 */

// Npm modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { v4 as uuid } from 'uuid';
import { TranslateService } from '@ngx-translate/core';

// App modules
import { DeviceRouteService } from './device-route.service';
import { Item } from '@models/item/item';
import { ItemApiService } from '@services/api/item-api.service';
import { DeviceNetwork } from '@models/device/device-network';
import { PaginatorService } from '@services/table/paginator.service';
import { ItemService } from '@services/item/item.service';
import { DownloadRequest } from '@interfaces/download-request.interface';
import { DownloadService } from '@services/download/download.service';
import { DownloadStatus } from '@enums/download-status';
import { Download } from '@models/download/download';
import { TooltipService } from '@services/tooltip/tooltip.service';
import { RoutingService } from '@services/routing/routing.service';
import { RoutingList } from '@enums/routing-list';

@Component({
	selector: 'app-device',
	templateUrl: './device.component.html',
	styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

	// Device name
	public device!: DeviceNetwork;

	// Items columns
	public displayedColumns: string[] = ['select', 'name', 'bytes', 'tag', 'type'];
	// Items data
	public dataSource!: MatTableDataSource<Item>;
	// Selected items
	public selection = new SelectionModel<Item>(true, []);
	// Table page size
	public pageSize: number = 0;

	// Table paginator
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	// Table sorting
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private _deviceRouteService: DeviceRouteService,
		private _itemApiService: ItemApiService,
		private _paginatorService: PaginatorService,
		private _downloadService: DownloadService,
		private _translateService: TranslateService,
		private _tooltipService: TooltipService,
		private _routingService: RoutingService,
		public itemService: ItemService,
	) {

		// Get device name from device route service
		this.device = this._deviceRouteService.getDevice();

		// Get notification of window size change
		this._paginatorService.getWindowResizePageNumber().subscribe(
			(pageSize: number) => {
				// Window size has changed
				if (!isNaN(pageSize) && pageSize > 0) {
					this._setPageSize(pageSize);
				}
			}
		);

		// Hide tooltips from devices page, if there are
		this._tooltipService.checkTooltipFromDevicePage();
	}

	ngOnInit(): void {
		// Load shared items by selected device
		this.loadSharedItems();
	}

	ngAfterViewInit(): void {
		// Set page size after page is loaded
		this._setPageSize(this._paginatorService.getPageSize());
	}

	/**
     * Load shared items for current device
     * @return {Void}
     */
	public loadSharedItems(): void {
		this._itemApiService.getSharedItems(this.device.ip).subscribe(
			(items: Item[]) => {
				// Load shared items to table
				this.dataSource = new MatTableDataSource(items);
				this.loadTable();
				// Notifies total shared items to devices page
				this._deviceRouteService.setDeviceShares(items.length);
			},
			() => {
				// The device is unreachable, remove it from devices
				this._deviceRouteService.setDeviceOffline(this.device.ip);
				this._routingService.navigateTo(RoutingList.DEVICES);
			}
		)
	}

	/**
     * Load shared items into table
     * @return {Void}
     */
	public loadTable(): void {
		// Set paginator and sorting
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		// Set filters to tag column
		this.dataSource.filterPredicate = function (data: Item, filter: string): boolean {
			return data.tag.toLowerCase().includes(filter);
		};
	}

	/**
     * Download selected items as individual items
     * @return {Void}
     */
	public handleClickDownloadItemIndividual(): void {
		this.selection.selected.forEach(element => {
			this._downloadItem(element);
		});
		this.selection.clear();
	}

	/**
     * Download item as individual
     * @param  {Item} item Item to download
     * @return {Void}
     */
	private _downloadItem(item: Item): void {

		// Download request object
		const downloadRequest: DownloadRequest = {
			id: item.id,
			name: item.name
		}

		// Set new item download status
		if (item.type === this.itemService.availableItemType.FILE) {
			this._streamFile(downloadRequest, item);
		} else if (item.type === this.itemService.availableItemType.FOLDER) {
			this._streamFolder(downloadRequest);
		}
	}

	/**
     * Download selected items as single zip
     * @return {Void}
     */
	public handleClickDownloadZip(): void {

		let downloadRequest: DownloadRequest[] = [];
		// Add each selected item to the request
		this.selection.selected.forEach(item => {
			downloadRequest.push(
				{
					id: item.id,
					name: item.name,
					type: item.type
				}
			)
		});

		// First element name, it will be in zip name
		let firstItemName: string = '';
		const firstItemSelected: Item = this.selection.selected[0];

		if (firstItemSelected.type === this.itemService.availableItemType.FILE) {
			// Full name for file
			firstItemName = firstItemSelected.fullName;
		} else if (firstItemSelected.type === this.itemService.availableItemType.FOLDER) {
			// Name for folder
			firstItemName = firstItemSelected.name;
		}

		this._translateService.get('download.elements').subscribe(elements => {
			this._streamZip(downloadRequest, firstItemName, elements);
		});

		this.selection.clear();
	}

	/**
     * Whether the number of selected elements matches the total number of rows
     * @return {Boolean} True if all shared items are selected
     */
	public isAllSelected(): boolean {
		if (this.dataSource) {
			return this.selection.selected.length === this.dataSource.data.length;
		} else {
			return false;
		}
	}

	/**
     * Selects all rows if they are not all selected, otherwise clear selection
     * @return {Void}
     */
	public masterToggle(): void {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/**
     * Apply filter to table
     * @param  {String} text Input tag text
     * @return {Void}
     */
	public applyFilter(text: string): void {
		if (this.dataSource && typeof text === 'string') {
			this.dataSource.filter = text;
			// Return to first page
			if (this.dataSource.paginator) {
				this.dataSource.paginator.firstPage();
			}
		}
	}

	/**
     * Set table page size
     * @param  {Number} pageSize Table page size
     * @return {Void}
     */
	private _setPageSize(pageSize: number): void {
		this.pageSize = pageSize;
		setTimeout(() => {
			this.dataSource.paginator = this.paginator;
		}, 250);
	}

	/**
     * Start item's download status
     * @param  {String}  name    Item name
     * @param  {Boolean} isZip   True if item is zip
     * @param  {Number}  [id]    Item id (undefined for folder)
     * @param  {Number}  [bytes] Item total bytes (undefined for folder)
     * @param  {String}  [size]  Item size (undefined for folder)
     * @param  {String}  [zipId] Zip id (undefined for file)
     * @return {Void}
     */
	private _startDownloadStatus(name: string, isZip: boolean, id?: number, bytes?: number, size?: string, zipId?: string): void {

		let startStatus: Download = {
			name: name,
			isZip: isZip,
			from: this.device.name,
			status: DownloadStatus.STARTED
		}

		if (id) {
			// File
			startStatus.totBytes = bytes;
			startStatus.size = size;
		}
		this._setDownloadStatus(startStatus, id, zipId);
	}

	/**
     * Update in progress item's download status
     * @param  {String}  name               Item name
     * @param  {Boolean} isZip              True if item is zip
     * @param  {Number}  totBytesDownloaded Current total bytes downloaded
     * @param  {Number}  [id]               Item id (undefined for folder)
     * @param  {String}  [zipId]            Zip id (undefined for file)
     * @return {Void}
     */
	private _inProgressDownloadStatus(name: string, isZip: boolean, totBytesDownloaded: number, id?: number, zipId?: string): void {

		let updateStatus: Download = {
			name: name,
			isZip: isZip,
			totBytesDownloaded: totBytesDownloaded,
			status: DownloadStatus.IN_PROGRESS
		}
		this._setDownloadStatus(updateStatus, id, zipId);
	}

	/**
     * End item's download status
     * @param  {String}  name    Item name
     * @param  {Boolean} isZip   True if item is zip
     * @param  {Blob}    blob    Items's blob
     * @param  {Number}  [id]    Item id (undefined for folder)
     * @param  {String}  [zipId] Zip id (undefined for file)
     * @return {Void}
     */
	private _endDownloadStatus(name: string, isZip: boolean, blob: Blob, id?: number, zipId?: string): void {

		let endStatus: Download = {
			name: name,
			isZip: isZip,
			status: DownloadStatus.ENDED,
			blob: blob
		}
		this._setDownloadStatus(endStatus, id, zipId);
	}

	/**
     * Error item's download status
     * @param  {String}  name    Item name
     * @param  {Boolean} isZip   True if item is zip
     * @param  {Number}  [id]    Item id (undefined for folder)
     * @param  {String}  [zipId] Zip id (undefined for file)
     * @return {Void}
     */
	private _errorDownloadStatus(name: string, isZip: boolean, id?: number, zipId?: string): void {

		let endStatus: Download = {
			name: name,
			isZip: isZip,
			status: DownloadStatus.ERROR
		}
		this._setDownloadStatus(endStatus, id, zipId);
	}

	/**
     * Set item download status
     * @param  {Download} status  Download status to notify
	 * @param  {Number}   [id]    Item id (undefined for folder)
     * @param  {String}   [zipId] Zip id (undefined for file)
     * @return {Void}
     */
	private _setDownloadStatus(status: Download, id?: number, zipId?: string): void {

		if (id) {
			// File
			status.id = id;
		}
		if (zipId) {
			// Folder
			status.zipId = zipId;
		}
		this._downloadService.setDownloadStatus(status);
	}

	/**
     * Stream file
     * @param  {DownloadRequest} downloadRequest Download request
     * @param  {Item}            file            File to stream
     * @return {Void}
     */
	private _streamFile(downloadRequest: DownloadRequest, file: Item): void {

		// Initialize file download status
		this._startDownloadStatus(file.fullName, false, downloadRequest.id, file.bytes, file.size);

		// Add file to pending downloads
		this._downloadService.addPendingSubscription(
			{
				name: file.fullName,
				id: downloadRequest.id,
				zipId: null,
				subscription: this._itemApiService.streamItem(this.device.ip, downloadRequest, this.itemService.availableItemType.FILE).subscribe(
					(progress: any) => {

						if (progress) {
							if (progress.type === 4) {

								// File is ready to download
								this._endDownloadStatus(file.fullName, false, progress.body, downloadRequest.id);

							} else if (progress.type === 3) {

								// File is still downloading
								this._inProgressDownloadStatus(file.fullName, false, progress.loaded, downloadRequest.id);
							}
						} else {

							// An error has occured while downloading
							this._errorDownloadStatus(file.fullName, false, downloadRequest.id);
						}

					}
				)
			}
		);
	}

	/**
     * Stream folder
     * @param  {DownloadRequest} downloadRequest Download request
     * @return {Void}
     */
	private _streamFolder(downloadRequest: DownloadRequest): void {

		// Generated zip id
		const zipId: string = uuid();

		// Generated zip name
		const zipName: string = `${downloadRequest.name}.zip`;

		// Initialize folder download status
		this._startDownloadStatus(zipName, true, undefined, undefined, undefined, zipId);

		// Add folder to pending downloads
		this._downloadService.addPendingSubscription(
			{
				name: zipName,
				zipId: zipId,
				id: null,
				subscription: this._itemApiService.streamItem(this.device.ip, downloadRequest, this.itemService.availableItemType.FOLDER).subscribe(
					(progress: any) => {

						if (progress) {

							if (progress.type === 4) {

								// Folder is ready to download
								this._endDownloadStatus(zipName, true, progress.body, undefined, zipId);

							} else if (progress.type === 3) {

								// Folder is still downloading
								this._inProgressDownloadStatus(zipName, true, progress.loaded, undefined, zipId);
							}
						} else {

							// An error has occured while downloading
							this._errorDownloadStatus(zipName, true, undefined, zipId)
						}

					}
				)
			}
		);
	}

	/**
     * Stream zip
     * @param  {DownloadRequest[]} downloadRequests Download requests
     * @param  {String}            firstItemName    First item name
     * @param  {String}            elementsLabel    Translated elements label 
     * @return {Void}
     */
	private _streamZip(downloadRequests: DownloadRequest[], firstItemName: string, elementsLabel: string): void {

		// Generated zip id
		const zipId: string = uuid();
		// Generated zip name
		const zipName: string = `${firstItemName} + ${downloadRequests.length - 1} ${elementsLabel}.zip`;

		// Initialize zip download status
		this._startDownloadStatus(zipName, true, undefined, undefined, undefined, zipId);

		// Add zip to pending downloads
		this._downloadService.addPendingSubscription(
			{
				name: zipName,
				zipId: zipId,
				id: null,
				subscription: this._itemApiService.streamZip(this.device.ip, downloadRequests).subscribe(
					(progress: any) => {

						if (progress) {

							if (progress.type === 4) {

								// Folder is ready to download
								this._endDownloadStatus(zipName, true, progress.body, undefined, zipId);

							} else if (progress.type === 3) {

								// Folder is still downloading
								this._inProgressDownloadStatus(zipName, true, progress.loaded, undefined, zipId);
							}
						} else {

							// An error has occured while downloading
							this._errorDownloadStatus(zipName, true, undefined, zipId);
						}


					}
				)
			}
		);
	}

}
