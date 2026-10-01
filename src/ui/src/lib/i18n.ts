import { createI18n, type I18n } from 'vue-i18n';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import pt from '../locales/pt.json';

const messages = { en, de, es, fr, it, pt };

export let i18n: I18n;

export async function initializeI18n() {
  const { language } = await window.electronApi.getSettings();
  i18n = createI18n({
    legacy: false,
    locale: language,
    messages,
  });

  return i18n;
}
