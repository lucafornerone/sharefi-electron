/**
 * Angular's auto generated module
 */

/* Npm modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// Translate
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
// Routing
import { RouteReuseStrategy } from '@angular/router';

// Angular Material modules
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

// App modules
import { AppRoutingModule } from './app-routing.module';
import { CustomReuseStrategy } from '@services/routing/reuse-strategy';
import { CustomTimeoutInterceptor, DEFAULT_TIMEOUT } from '@interceptors/timeout.interceptor';
import { TranslationTableService } from '@services/table/translation-table.service';

// App components
import { AppComponent } from './app.component';
import { DevicesComponent } from '@components/devices/devices.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { DownloadComponent } from './components/download/download.component';
import { SharesComponent } from './components/shares/shares.component';
import { DeviceInfoComponent } from './components/device-info/device-info.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DeviceComponent } from './components/device/device.component';
import { TagFilterComponent } from './components/tag-filter/tag-filter.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { OfflineComponent } from './components/offline/offline.component';

@NgModule({
	declarations: [
		AppComponent,
		DevicesComponent,
		HeaderComponent,
		NavComponent,
		DownloadComponent,
		SharesComponent,
		DeviceInfoComponent,
		LoaderComponent,
		DeviceComponent,
		TagFilterComponent,
		ShareDialogComponent,
		OfflineComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),

		MatListModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatMenuModule,
		MatCardModule,
		MatTableModule,
		MatCheckboxModule,
		MatSortModule,
		MatPaginatorModule,
		MatDialogModule,
		MatBadgeModule,
		MatProgressSpinnerModule,
		MatTooltipModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: CustomTimeoutInterceptor, multi: true },
		{ provide: DEFAULT_TIMEOUT, useValue: 31536000000 }, // 1 year
		{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
		{
			provide: MatPaginatorIntl,
			useFactory: (translateService: TranslateService) => {
				const service = new TranslationTableService();
				service.injectTranslateService(translateService);
				return service;
			},
			deps: [TranslateService]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
