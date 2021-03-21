// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Environment configurations for development
 */

// App modules
import { Environment } from '@interfaces/environment.interface';
import { LANGUAGE_CODE_EN } from '@services/language/language.service';

export const environment: Environment = {
	production: false,
	startupTimeout: 200,
	apiPort: '5431',
	apiProtocol: 'http',
	apiEndpoint: 'sharefi',
	defaultLanguageCode: LANGUAGE_CODE_EN
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
