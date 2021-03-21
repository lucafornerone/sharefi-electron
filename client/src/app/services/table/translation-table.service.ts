/**
 * A class that handle table's translation
 *
 * @requires MatPaginatorIntl
 * @requires TranslateService
 */

// Npm modules
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class TranslationTableService extends MatPaginatorIntl {

	// Custom translate object
	public translate!: TranslateService;
	// MatPaginatorIntl properties
	public itemsPerPageLabel = '';
	public nextPageLabel = '';
	public previousPageLabel = '';
	public lastPageLabel = '';
	public firstPageLabel = '';
	public rangeLabelIntl = '';

	/**
	 * Override default Mat Paginator translation
	 * @param  {TranslateService} translate Custom translate object
     * @return {Void}
     */
	public injectTranslateService(translate: TranslateService): void {
		this.translate = translate;
		this.translate.onLangChange.subscribe(() => {
			this.translateLabels();
		});
		this.translateLabels();
	}

	/**
	 * Translate all table labels in current language
     * @return {Void}
     */
	public translateLabels(): void {
		this.translate.get('table.of').subscribe(of => {
			this.rangeLabelIntl = of;
			this.changes.next();
		});
	}

	/**
	 * Override default Mat Paginator translation
	 * @param  {Number} page     Current page
	 * @param  {Number} pageSize Page size
	 * @param  {Number} length   Total items
     * @return {String}          Range label text
     */
	public getRangeLabel = (page: number, pageSize: number, length: number): string => {

		if (length === 0 || pageSize === 0) {
			return '0 ' + this.rangeLabelIntl + ' ' + length;
		}

		length = Math.max(length, 0);
		const startIndex = page * pageSize;
		const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
		return startIndex + 1 + ' - ' + endIndex + '  ' + this.rangeLabelIntl + ' ' + length;
	};

}
