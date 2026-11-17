import { createApp, nextTick } from 'vue';
import './style.css';
import App from './App.vue';
import { initializeI18n } from './lib/i18n.ts';
import { initializeTheme } from './lib/utils.ts';

(async () => {
  const app = createApp(App);
  await initializeTheme();
  const i18n = await initializeI18n();
  app.use(i18n);
  app.mount('#app');
  await nextTick();
  // after two frames the theme is applied
  requestAnimationFrame(() => requestAnimationFrame(() => window.electronApi.isReady()));
})();
