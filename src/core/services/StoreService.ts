import { hostname } from 'node:os';
import Store from 'electron-store';
import { generateCerts } from '#core/lib/ssl.ts';
import { APP_CONFIG } from '#shared/constants.ts';
import { Language, Theme } from '#shared/types/ipc.types.ts';

type StoreSchema = {
  name: string;
  language: Language;
  theme: Theme;
  cert: string;
  key: string;
};

class StoreService {
  private store!: Store<StoreSchema>;

  async initialize() {
    this.store = new Store<StoreSchema>();

    if (this.store.get('name') === undefined) {
      // set device name as hostname
      this.setName(hostname());
    }
    if (this.store.get('language') === undefined) {
      // set language as device (if supported) or set default
      const currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
      const locale = currentLocale.split('-')[0];
      const isLocaleSupported = (APP_CONFIG.LANGUAGES as readonly string[]).includes(locale);
      this.setLanguage(isLocaleSupported ? (locale as Language) : APP_CONFIG.LANGUAGES[0]);
    }
    if (this.store.get('theme') === undefined) {
      // set theme as auto
      this.setTheme('auto');
    }

    if (this.store.get('cert') === undefined || this.store.get('key') === undefined) {
      // create cert.pem
      const { cert, key } = await generateCerts();
      this.store.set('cert', cert);
      this.store.set('key', key);
    }
  }

  getName(): string {
    return this.store.get('name');
  }
  setName(name: string) {
    this.store.set('name', name);
  }

  getLanguage(): Language {
    return this.store.get('language');
  }
  setLanguage(language: Language) {
    this.store.set('language', language);
  }

  getTheme(): Theme {
    return this.store.get('theme');
  }
  setTheme(theme: Theme) {
    this.store.set('theme', theme);
  }

  getHttpsCert(): string {
    return this.store.get('cert');
  }

  getHttpsKey(): string {
    return this.store.get('key');
  }
}

export const storeService = new StoreService();
