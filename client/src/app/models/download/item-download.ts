/**
 * A class that represent the download of item
 */

// App modules
import { DownloadStatus } from '@enums/download-status';

export class ItemDownload {

	constructor(
		public name: string,
		public isZip: boolean,
		public status: DownloadStatus,
		public totBytesDownloaded: number,
		public sizeDownloaded: string,
		public id?: number,
		public zipId?: string,
		public from?: string,
		public totBytes?: number,
		public size?: string,
		public percentage?: number,
		public blob?: Blob
	) { }

}