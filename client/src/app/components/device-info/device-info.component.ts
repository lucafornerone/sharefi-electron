/**
 * A component that shows connected device info
 *
 * @requires Component
 * @requires OnInit
 * @requires Input
 */

// Npm modules
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-device-info',
	templateUrl: './device-info.component.html',
	styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {

	// Device name
	@Input() public name!: string;
	// Device os
	@Input() public os!: string;
	// Device total items shared
	@Input() public items!: number;
	// Device ip
	@Input() public ip!: string;
	// Device mac
	@Input() public mac!: string;

	constructor() { }

	ngOnInit(): void {
	}

}
