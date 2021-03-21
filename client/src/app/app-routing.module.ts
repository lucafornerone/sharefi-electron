/**
 * Angular's auto generated module
 * 
 * @requires NgModule
 * @requires Routes
 * @requires RouterModule
 * 
 * @requires DevicesComponent
 * @requires SharesComponent
 * @requires DownloadComponent
 * @requires DeviceComponent
 */

// Npm modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App components
import { DevicesComponent } from '@components/devices/devices.component';
import { SharesComponent } from '@components/shares/shares.component';
import { DownloadComponent } from '@components/download/download.component';
import { DeviceComponent } from '@components/device/device.component';

const routes: Routes = [
	{ path: 'devices', component: DevicesComponent, data: { shouldDetach: true } }, // This component is not reloaded every time
	{ path: 'device/:ip', component: DeviceComponent },
	{ path: 'shares', component: SharesComponent },
	{ path: 'download', component: DownloadComponent, data: { shouldDetach: true } }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
