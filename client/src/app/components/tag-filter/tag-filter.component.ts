/**
 * A component that shows tag filter
 *
 * @requires Component
 * @requires OnInit
 * @requires Output
 * @requires EventEmitter
 * @requires ViewChild
 * @requires ElementRef
 */

// Npm modules
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-tag-filter',
	templateUrl: './tag-filter.component.html',
	styleUrls: ['./tag-filter.component.scss']
})
export class TagFilterComponent implements OnInit {

	// Tag input text
	@ViewChild('input') input!: ElementRef;
	// Event emitter for input
	@Output() public change: EventEmitter<string> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	/**
     * Emit onkeyup event
     * @param  {Event} event Input's onkeyup event
     * @return {Void}
     */
	public handleKeyupTag(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.change.emit(filterValue.trim().toLowerCase());
	}


	/**
     * Emit on click clear
     * @return {Void}
     */
	public handleClickClear(): void {
		// Empty input value
		this.input.nativeElement.value = '';
		this.change.emit('');
	}

}
