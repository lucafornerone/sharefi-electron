/**
 * A interface that represent environment
 */

export interface Environment {
	production: boolean,
	startupTimeout: number, // Milliseconds after which the first api starts
	apiPort: string,
	apiProtocol: string,
	apiEndpoint: string,
	defaultLanguageCode: string
}