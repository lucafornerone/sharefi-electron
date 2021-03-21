/**
 * A service that handle pagination
 *
 * @requires Injectable
 * @requires Observable
 * @requires Subject
 */

// Npm modules
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const HEIGHT_HEADER: number = 64;
const HEIGHT_TOOLBAR: number = 64;
const HEIGHT_FILTERS: number = 64;
const HEIGHT_CONTENT_PADDING: number = 16;
const HEIGHT_TABLE_HEADER: number = 56;
const HEIGHT_TABLE_ROW: number = 48; // Height of each table row
const HEIGHT_TABLE_PAGINATOR: number = 48;

@Injectable({
	providedIn: 'root'
})
export class PaginatorService {

	// Subject to emit window resize event to pages with dinamic pagination
	private _windowResize$: Subject<number> = new Subject<number>();

	constructor() {

		// Each time a window resize occurs, recalculates the number of items per page
		window.onresize = (event: UIEvent) => {
			if (event.type === 'resize') {
				// Update page size after the window size change
				this.setWindowResizePageNumber(this.getPageSize());
			}
		}

	}

	/**
	 * Notifies the window size change
	 * @param  {Number} pageSize Current page size
 	 * @return {Void}
 	 */
	public setWindowResizePageNumber(pageSize: number): void {
		this._windowResize$.next(pageSize);
	}

	/**
	 * Receive notification of window size change
 	 * @return {Observable<Number>} Page size as observable
 	 */
	public getWindowResizePageNumber(): Observable<number> {
		return this._windowResize$.asObservable();
	}

	/**
	 * Get page size based on current window size
 	 * @return {Number} Page size
 	 */
	public getPageSize(): number {
		return Math.trunc((
			window.innerHeight
			- HEIGHT_HEADER
			- HEIGHT_TOOLBAR
			- HEIGHT_FILTERS
			- HEIGHT_CONTENT_PADDING * 2
			- HEIGHT_TABLE_HEADER
			- HEIGHT_TABLE_PAGINATOR)
			/ HEIGHT_TABLE_ROW);
	}



}
