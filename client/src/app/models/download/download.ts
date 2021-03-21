/**
 * A class that represent the download of item
 */

 // App modules
import { DownloadStatus } from '@enums/download-status';

export class Download {

	constructor(
		public name: string,
		public status: DownloadStatus,
		public isZip: boolean,
		public id?: number,
		public zipId?: string,
		public from?: string,
		public totBytes?: number,
		public totBytesDownloaded?: number,
		public size?: string,
		public blob?: Blob
	) { }

}