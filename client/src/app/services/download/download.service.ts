/**
 * A service that handle download
 *
 * @requires Injectable
 * @requires Subject
 * @requires Observable
 *
 * @requires Download
 * @requires DownloadStatus
 * @requires DownloadSubscription
 */

// Npm modules
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// App modules
import { Download } from '@models/download/download';
import { DownloadStatus } from '@enums/download-status';
import { DownloadSubscription } from '@interfaces/download-subscription.interface';

@Injectable({
	providedIn: 'root'
})
export class DownloadService {

	// Subject to pass download info from device page to download page
	private _downloadStatus$: Subject<Download> = new Subject<Download>();

	// Current ready items to be downloaded
	private _readyDownloads: number = 0;

	// Current pending download subscriptions
	private _pendingSubscription: DownloadSubscription[] = [];

	private _hasDownloadPageNewItem: boolean = false;

	constructor() { }

	/**
	 * Receive notification of download status change
 	 * @return {Observable<Download>} Download status as observable
 	 */
	public getDownloadStatus(): Observable<Download> {
		return this._downloadStatus$.asObservable();
	}

	/**
	 * Notifies the download status change
	 * @param  {Download} download Current download info
 	 * @return {Void}
 	 */
	public setDownloadStatus(download: Download): void {
		this._downloadStatus$.next(download);
	}

	/**
	 * Get number of ready downloads
 	 * @return {Number} Total ready downloads
 	 */
	public getReadyDownloads(): number {
		return this._readyDownloads;
	}

	/**
	 * Add new item to ready downloads
 	 * @return {Void}
 	 */
	public addItemToReadyDownloads(): void {
		this._readyDownloads = this.getReadyDownloads() + 1;
	}

	/**
	 * Remove item to ready downloads
 	 * @return {Void}
 	 */
	public removeItemToReadyDownloads(): void {
		this._readyDownloads = this.getReadyDownloads() - 1;
	}

	/**
     * Add pending subscription, only from device page
     * @param  {Download} download Download subscription to add
     * @return {Void}
     */
	public addPendingSubscription(download: DownloadSubscription): void {
		this._pendingSubscription.push(download);
	}

	/**
     * Get pending subscription list
     * @return {DownloadSubscription[]} Pending subscription list
     */
	 public getPendingSubscription(): DownloadSubscription[] {
		return this._pendingSubscription;
	}

	/**
	 * Stop all pending downloads
	 * @param  {Download[]} downloads Download items to stop
 	 * @return {Void}
 	 */
	public stopAllDownloads(downloads: Download[]): void {

		downloads.forEach(item => {
			this.stopPendingSubscription(item, true);
		});
	}

	/**
     * Stop pending subscription
     * @param  {Download} download       Pending download to stop subscription
     * @param  {Boolean}  isInterruption True if stop come from user interruption
     * @return {Void}
     */
	public stopPendingSubscription(dowload: Download, isInterruption: boolean): void {

		// Find item to stop download
		const index = this._pendingSubscription.findIndex(s => s.name === dowload.name && (dowload.isZip ? s.zipId === dowload.zipId : s.id === dowload.id));
		// Stop download
		this._pendingSubscription[index].subscription.unsubscribe();

		if (isInterruption) {
			// Update item status
			this.setDownloadStatus(
				{
					name: dowload.name,
					isZip: dowload.isZip,
					status: DownloadStatus.INTERRUPTED,
					id: dowload.id,
					zipId: dowload.zipId
				}
			)
		}
	}

	/**
     * Remove pending subscription after the finish
     * @param  {Download} download Pending download to remove
     * @return {Void}
     */
	public removeFromPendingSubscription(download: Download): void {
		const index = this._pendingSubscription.findIndex(s => s.name === download.name && (download.isZip ? s.zipId === download.zipId : s.id === download.id));
		if (index != -1) {
			this._pendingSubscription.splice(index, 1);
		}
	}


	/**
	 * Lets you know if the download page has a new item
 	 * @return {Boolean} True if download page has a new item
 	 */
	public hasDownloadPageNewItem(): boolean {
		return this._hasDownloadPageNewItem;
	}

	/**
	 * Set new item in download page
 	 * @return {Void}
 	 */
	public setNewItemInDownloadPage(): void {

		if (!this._hasDownloadPageNewItem) {

			this._hasDownloadPageNewItem = true;
			setTimeout(() => {
				this._hasDownloadPageNewItem = false;
			}, 2000); // Duration of the notification in nav component
		}
	}

	/**
	 * Get available download status
	 * @return {DownloadStatus} Available download status
	 */
	public get availableDownloadStatus(): typeof DownloadStatus {
		return DownloadStatus;
	}

	/**
	 * Download item
	 * @param  {Blob}   item     Item to download
	 * @param  {String} fileName Item name
 	 * @return {Void}
 	 */
	public downloadItem(item: Blob, itemName: string): void {
		const url = window.URL.createObjectURL(item);
		let itemDownload = document.createElement('a');
		document.body.appendChild(itemDownload);
		itemDownload.setAttribute('style', 'display: none');
		itemDownload.href = url;
		itemDownload.download = itemName;
		itemDownload.click();
		window.URL.revokeObjectURL(url);
		itemDownload.remove();
	}

}
