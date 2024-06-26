/**
 * A service that handle language
 *
 * @requires Injectable
 * 
 * @requires Language
 */

// Npm modules
import { Injectable } from '@angular/core';

// App modules
import { Language } from '@interfaces/language.interface';

// Available languages codes
export const LANGUAGE_CODE_DE: string = 'de';
export const LANGUAGE_CODE_ES: string = 'es';
export const LANGUAGE_CODE_EN: string = 'en';
export const LANGUAGE_CODE_FR: string = 'fr';
export const LANGUAGE_CODE_IT: string = 'it';
export const LANGUAGE_CODE_PT: string = 'pt';

// Available languages
export const LANGUAGES: Language[] = [
	{
		code: LANGUAGE_CODE_DE,
		description: 'Deutsch'
	},
	{
		code: LANGUAGE_CODE_ES,
		description: 'Español'
	},
	{
		code: LANGUAGE_CODE_EN,
		description: 'English'
	},
	{
		code: LANGUAGE_CODE_FR,
		description: 'Français'
	},
	{
		code: LANGUAGE_CODE_IT,
		description: 'Italiano'
	},
	{
		code: LANGUAGE_CODE_PT,
		description: 'Português'
	}
]

@Injectable({
	providedIn: 'root'
})
export class LanguageService {

	constructor() { }

	/**
	 * Get available languages
	 * @return {Language[]} Available languages
	 */
	public get availableLanguages(): Language[] {
		return LANGUAGES;
	}

	/**
	 * Get available languages code
	 * @return {string[]} Available languages code
	 */
	public get availableLanguagesCode(): string[] {
		return LANGUAGES.map(l => l.code);
	}

}
