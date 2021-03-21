/**
 * Environment configurations for production
 */

// App modules
import { Environment } from '@interfaces/environment.interface';
import { LANGUAGE_CODE_EN } from '@services/language/language.service';

export const environment: Environment = {
	production: true,
	startupTimeout: 2000,
	apiPort: '5431',
	apiProtocol: 'https',
	apiEndpoint: 'sharefi',
	defaultLanguageCode: LANGUAGE_CODE_EN
};
