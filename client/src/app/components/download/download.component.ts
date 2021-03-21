/**
 * A component that shows connected devices
 *
 * @requires Component
 * @requires OnInit
 * @requires ViewChild
 * @requires ElementRef
 * @requires MatTableDataSource
 * @requires SelectionModel
 * @requires MatPaginator
 * @requires MatSort
 *
 * @requires Item
 * @requires PaginatorService
 * @requires ItemService
 * @requires DownloadService
 * @requires Download
 * @requires ItemDownload
 */

// Npm modules
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// App modules
import { PaginatorService } from '@services/table/paginator.service';
import { ItemService, NO_BYTES } from '@services/item/item.service';
import { DownloadService } from '@services/download/download.service';
import { Download } from '@models/download/download';
import { DownloadStatus } from '@enums/download-status';
import { ItemDownload } from '@models/download/item-download';

@Component({
	selector: 'app-download',
	templateUrl: './download.component.html',
	styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

	// Table items
	private _items: ItemDownload[] = [];

	// Items columns
	public displayedColumns: string[] = ['select', 'name', 'from', 'downloaded', 'isZip', 'status', 'blob'];
	// Items data
	public dataSource!: MatTableDataSource<ItemDownload>;
	// Selected items
	public selection = new SelectionModel<ItemDownload>(true, []);
	// Table page size
	public pageSize: number = 0;

	// Table paginator
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	// Table sorting
	@ViewChild(MatSort) sort!: MatSort;
	// Device from input text
	@ViewChild('input') input!: ElementRef;

	constructor(
		private _paginatorService: PaginatorService,
		public downloadService: DownloadService,
		public itemService: ItemService
	) {

		this._paginatorService.getWindowResizePageNumber().subscribe(
			(pageSize: number) => {
				// Window size has changed
				if (!isNaN(pageSize) && pageSize > 0) {
					this._setPageSize(pageSize);
				}
			}
		);

		this.dataSource = new MatTableDataSource([] as ItemDownload[]);
	}

	ngOnInit(): void {
		this._initializeDownload();
	}

	/**
     * Initialize download subscription to be notified at each change of status
     * @return {Void}
     */
	private _initializeDownload(): void {

		this.downloadService.getDownloadStatus().subscribe(
			(download: Download) => {

				const itemIndex: number = this._findItemIndex(download);

				switch (download.status) {

					case DownloadStatus.STARTED:
						// The download is started
						this._setStartedStatus(download, itemIndex);
						break;

					case DownloadStatus.IN_PROGRESS:
						// Item is still downloading
						this._setInProgressStatus(download, itemIndex);
						break;

					case DownloadStatus.ENDED:
						// The download has completed
						this._setEndedStatus(download, itemIndex);
						break;

					case DownloadStatus.INTERRUPTED:
						// The download was interrupted
						this._setInterruptedStatus(itemIndex);
						break;

					case DownloadStatus.ERROR:
						// An error has occured while downloading
						this._setErrorStatus(itemIndex);
						break;

				}

				this._loadItemDownload(download.status);
			}
		)
	}

	/**
     * Load download items into table
     * @param  {DownloadStatus} status Item status
     * @return {Void}
     */
	private _loadItemDownload(status: DownloadStatus): void {
		this.dataSource = new MatTableDataSource(this._items);
		if (status === DownloadStatus.STARTED) {
			// Update paginator and sort if there is new item
			this._loadTable();
		}
	}

	/**
     * Load download items into table
     * @return {Void}
     */
	private _loadTable(): void {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.filterPredicate = function (data: ItemDownload, filter: string): boolean {
			return data.from ? data.from.toLowerCase().includes(filter) : false;
		};
	}

	/**
     * Apply filter to table
     * @param  {Event} event Input's onkeyup event
     * @return {Void}
     */
	public applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		if (this.dataSource) {
			this.dataSource.filter = filterValue.trim().toLowerCase();
			// Return to first page
			if (this.dataSource.paginator) {
				this.dataSource.paginator.firstPage();
			}
		}
	}

	/**
     * Emit on click clear
     * @return {Void}
     */
	public handleClickClear(): void {
		// Empty input value
		this.input.nativeElement.value = '';
	}

	/**
     * Remove the selected items
     * @return {Void}
     */
	public handleClickRemoveItemSelected(): void {

		let i: number;
		this.selection.selected.forEach(item => {
			// Find index of item to remove
			i = this._findItemIndex({ isZip: item.isZip, name: item.name, status: item.status, id: item.id, zipId: item.zipId });
			if (i != -1) {
				if (this._items[i].status === DownloadStatus.ENDED) {
					// Remove item from ready downloads
					this.downloadService.removeItemToReadyDownloads();
				}
				this._items.splice(i, 1);
			}
		});
		this._loadTable();
		this.selection.clear();
	}

	/**
     * Stop all downloading items
     * @return {Void}
     */
	public handleClickStopDownloads(): void {

		// Items to stop download
		const itemsInDownload: ItemDownload[] = this._items.filter(item => this.isItemDownloading(item));
		let itemsInDownloadToStop: Download[] = [];
		itemsInDownload.forEach(item => {
			itemsInDownloadToStop.push(this._mapItemDownloadToDownload(item));
		});
		this.downloadService.stopAllDownloads(itemsInDownloadToStop);
	}

	/**
     * Interrupt current item download
     * @param  {ItemDownload} item Item to stop download
     * @return {Void}
     */
	public handleClickInterruptDownload(item: ItemDownload): void {
		this.downloadService.stopPendingSubscription(this._mapItemDownloadToDownload(item), true);
	}

	/**
     * Download current item
     * @param  {ItemDownload} item Item to download
     * @return {Void}
     */
	public handleClickItemDownload(item: ItemDownload): void {

		if (item.blob) {
			// Download item
			this.downloadService.downloadItem(item.blob, item.name);
			// Remove blob
			item.blob = undefined;
			// Remove current item to ready downloads
			this.downloadService.removeItemToReadyDownloads();
		}
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
		this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => {
			if (!this.isItemDownloading(row)) {
				// Select only if it is not downloading
				this.selection.select(row)
			}
		});
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
     * Find table file index by name and id
	 * @param  {String} name File name
     * @param  {Number} id   File id
     * @return {Number}      File index
     */
	private _findFileIndex(name: string, id: number | undefined): number {
		return this._items.findIndex(item => item.name === name && item.id === id && item.isZip === false);
	}

	/**
     * Find table folder index by name and zipId
     * @param  {String} name  Folder name
	 * @param  {String} zipId Folder zipId
     * @return {Number}       Folder index
     */
	private _findFolderIndex(name: string, zipId: string | undefined): number {
		return this._items.findIndex(item => item.name === name && item.zipId === zipId && item.isZip === true);
	}

	/**
     * Find item index
     * @param  {Download} download Download info
     * @return {Number}            Item index
     */
	private _findItemIndex(download: Download): number {

		if (download.isZip) {
			// Folder
			return this._findFolderIndex(download.name, download.zipId);
		} else {
			// File
			return this._findFileIndex(download.name, download.id);
		}
	}

	/**
     * Set started status, add item to table
     * @param  {Download} download  Download info
     * @param  {Number}   itemIndex Current item index
     * @return {Void}
     */
	private _setStartedStatus(download: Download, itemIndex: number): void {

		if (itemIndex === -1) {

			// Item to download is not in table
			let item: ItemDownload = {
				name: download.name,
				isZip: download.isZip,
				from: download.from,
				status: DownloadStatus.STARTED,
				totBytesDownloaded: 0,
				sizeDownloaded: NO_BYTES
			}

			if (download.id) {
				// Add information if it is a file
				item.id = download.id;
				item.totBytes = download.totBytes;
				item.size = download.size;
				item.percentage = 0;
			}
			if (download.zipId) {
				// Add information if it is a folder
				item.zipId = download.zipId;
			}

			// Add the new item to beginning of item list
			this._items.unshift(item);
			// There is new item in this page, show notification to user
			this.downloadService.setNewItemInDownloadPage();
		}
	}

	/**
     * Set in progress status, update item info
     * @param  {Download} download  Download info
	 * @param  {Number}   itemIndex Current item index
     * @return {Void}
     */
	private _setInProgressStatus(download: Download, itemIndex: number): void {

		if (itemIndex != -1) {
			if (this._items[itemIndex].status === DownloadStatus.STARTED) {
				// Item is in started status yet
				this._items[itemIndex].status = DownloadStatus.IN_PROGRESS;
			}

			if (this._items[itemIndex].status === DownloadStatus.IN_PROGRESS) {
				if (download.totBytesDownloaded) {
					// Update item's tot downloaded bytes
					this._items[itemIndex].totBytesDownloaded = download.totBytesDownloaded;
					this._items[itemIndex].sizeDownloaded = this.itemService.formatBytes(download.totBytesDownloaded);

					if (!download.isZip) {
						// File
						let bytes = this._items[itemIndex].totBytes;
						if (!bytes) {
							bytes = 1;
						}
						this._items[itemIndex].percentage = Math.trunc(this._items[itemIndex].totBytesDownloaded / bytes * 100);
					}
				}
			} else {
				// Item was previously downloaded yet, remove subscription
				this.downloadService.stopPendingSubscription(download, false);
				this.downloadService.removeFromPendingSubscription(download);
			}
		}
	}

	/**
     * Set ended status, set download as ready
     * @param  {Download} download  Download info
	 * @param  {Number}   itemIndex Current item index
     * @return {Void}
     */
	private _setEndedStatus(download: Download, itemIndex: number): void {
		if (itemIndex != -1) {
			this._items[itemIndex].percentage = 100;
			this._items[itemIndex].blob = download.blob;
			if (download.isZip) {
				// Set size to zip
				this._items[itemIndex].size = this._items[itemIndex].sizeDownloaded;
				this._items[itemIndex].totBytes = this._items[itemIndex].totBytesDownloaded;
			}
			this._items[itemIndex].status = DownloadStatus.ENDED;
			this.downloadService.addItemToReadyDownloads();
			this.downloadService.removeFromPendingSubscription(this._mapItemDownloadToDownload(this._items[itemIndex]));
		}
	}

	/**
     * Set interrupted status, update item info
	 * @param  {Number} itemIndex Current item index
     * @return {Void}
     */
	private _setInterruptedStatus(itemIndex: number): void {

		if (itemIndex != -1) {
			this._items[itemIndex].status = DownloadStatus.INTERRUPTED;
			this.downloadService.removeFromPendingSubscription(this._mapItemDownloadToDownload(this._items[itemIndex]));
		}
	}

	/**
     * Set error status, update item info
	 * @param  {Number} itemIndex Current item index
     * @return {Void}
     */
	private _setErrorStatus(itemIndex: number): void {

		if (itemIndex != -1) {
			this._items[itemIndex].status = DownloadStatus.ERROR;
			this.downloadService.removeFromPendingSubscription(this._mapItemDownloadToDownload(this._items[itemIndex]));
		}
	}

	/**
     * Map item download to download
	 * @param  {ItemDownload} item Item to map
     * @return {Download}          Mapped object
     */
	private _mapItemDownloadToDownload(item: ItemDownload): Download {
		return {
			name: item.name,
			isZip: item.isZip,
			status: item.status,
			id: item.id,
			zipId: item.zipId
		};
	}

	/**
     * Lets you know if at least one item is still downloading
     * @return {Boolean} True if at least one item is still downloading
     */
	public get isDownloading(): boolean {
		return this._items.filter(item => item.status === DownloadStatus.IN_PROGRESS).length > 0
	}

	/**
     * Lets you know if item is still downloading
     * @param  {ItemDownload} item Item to test
     * @return {Boolean}           True if item is still downloading
     */
	public isItemDownloading(item: ItemDownload): boolean {
		return item.status === DownloadStatus.STARTED || item.status === DownloadStatus.IN_PROGRESS;
	}

}
