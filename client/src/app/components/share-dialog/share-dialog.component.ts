/**
 * A component that shows header
 *
 * @requires Component
 * @requires OnInit
 * @requires Inject
 * @requires MatDialogRef
 * @requires MAT_DIALOG_DATA
 *
 * @requires ItemApiService
 * @requires ItemType
 * @requires ItemService
 */

// Npm modules
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// App modules
import { ItemApiService } from '@services/api/item-api.service';
import { ItemType } from '@enums/item-type';
import { ItemService } from '@services/item/item.service';

export interface ShareDialogData {
	itemsPath: string[],
	itemType: ItemType
}

@Component({
	selector: 'app-share-dialog',
	templateUrl: './share-dialog.component.html',
	styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

	// Tag text
	public tag: string = '';
	// Loader status
	public isLoaderVisible:boolean = false;

	constructor(
		private _itemApiService: ItemApiService,
		private _dialogRef: MatDialogRef<ShareDialogComponent>,
		public itemService: ItemService,
		@Inject(MAT_DIALOG_DATA) public data: ShareDialogData
	) { }

	ngOnInit(): void {
	}

	/**
     * Share items
     * @return {Void}
     */
	public handleClickShare(): void {

		// Show loader
		this.isLoaderVisible = true;
		this._itemApiService.shareItems(this.data.itemsPath, this.data.itemType, this.tag).subscribe(
			(success: boolean) => {
				this._dialogRef.close(success);
			}
		)
	}

}
