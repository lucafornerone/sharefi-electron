import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { initializeI18n } from './lib/i18n.ts';

(async () => {
  const app = createApp(App);
  const i18n = await initializeI18n();
  app.use(i18n);
  app.mount('#app');
})();
