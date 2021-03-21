/**
 * A component that shows shared items
 *
 * @requires Component
 * @requires OnInit
 * @requires ViewChild
 * @requires MatTableDataSource
 * @requires SelectionModel
 * @requires MatPaginator
 * @requires MatSort
 * @requires MatDialog
 *
 * @requires Item
 * @requires PaginatorService
 * @requires ItemService
 * @requires ItemApiService
 * @requires ShareDialogComponent
 * @requires ShareDialogData
 * @requires ItemType
 * @requires ItemRequest
 */

// Npm modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

// App modules
import { Item } from '@models/item/item';
import { PaginatorService } from '@services/table/paginator.service';
import { ItemService } from '@services/item/item.service';
import { ItemApiService } from '@services/api/item-api.service';
import { ShareDialogComponent, ShareDialogData } from '@components/share-dialog/share-dialog.component';
import { ItemType } from '@enums/item-type';
import { ItemRequest } from '@interfaces/item-request.interface';

@Component({
	selector: 'app-shares',
	templateUrl: './shares.component.html',
	styleUrls: ['./shares.component.scss']
})
export class SharesComponent implements OnInit {

	// Items columns
	public displayedColumns: string[] = ['select', 'name', 'tag', 'type'];
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
		private _paginatorService: PaginatorService,
		private _itemApiService: ItemApiService,
		private _matDialog: MatDialog,
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
	}

	ngOnInit(): void {
		// Load own shared items by selected device
		this.loadOwnSharedItems();
	}

	ngAfterViewInit(): void {
		// Set page size after page is loaded
		this._setPageSize(this._paginatorService.getPageSize());
	}

	/**
     * Load own shared items
     * @return {Void}
     */
	public loadOwnSharedItems(): void {
		this._itemApiService.getOwnSharedItems().subscribe(
			(items: Item[]) => {
				// Load own shared items to table
				this.dataSource = new MatTableDataSource(items);
				this.loadTable();
			}
		)
	}

	/**
     * Load own shared items into table
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
     * Open the native prompt window for choosing files
     * @return {Void}
     */
	public handleClickShareFile(): void {

		// Api to open native files prompt
		this._itemApiService.openPromptFile().subscribe(
			(filesPath: string[]) => {
				if (filesPath) {
					this._openShareDialog(filesPath, ItemType.FILE);
				}
			}
		)
	}

	/**
     * Open the native prompt window for choosing folders
     * @return {Void}
     */
	public handleClickShareFolder(): void {

		// Api to open native folders prompt
		this._itemApiService.openPromptFolder().subscribe(
			(foldersPath: string[]) => {
				if (foldersPath) {
					this._openShareDialog(foldersPath, ItemType.FOLDER);
				}
			}
		)
	}

	/**
     * Remove sharing of selected items
     * @return {Void}
     */
	public handleClickRemoveSelectedShares(): void {

		// Items list to remove
		let itemsToRemove: ItemRequest[] = [];
		this.selection.selected.forEach(item => {
			itemsToRemove.push(
				{
					id: item.id,
					type: item.type
				}
			)
		});

		// Api to remove selected items
		this._itemApiService.removeSharingItems(itemsToRemove).subscribe(
			(success: boolean) => {
				if (success) {
					this.selection.clear();
					this.loadOwnSharedItems();
				}
			}
		)

	}

	/**
	 * Open share dialog to share items
	 * @param  {String[]} items Items to share
	 * @return {Void}
	 */
	private _openShareDialog(items: string[], itemType: ItemType): void {

		// Dialog params
		const data: ShareDialogData = {
			itemsPath: items,
			itemType: itemType
		}

		const dialog = this._matDialog.open(ShareDialogComponent, {
			height: '200px',
			width: '450px',
			disableClose: true,
			panelClass: 'share-dialog-component-modal',
			data: data
		});

		dialog.afterClosed().subscribe(success => {
			if (success) {
				if (this.dataSource && this.dataSource.paginator) {
					this.dataSource.paginator.firstPage();
				}
				this.selection.clear();
				this.loadOwnSharedItems();
			}
		});
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

}
