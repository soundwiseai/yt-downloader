import { createApp } from 'vue'
import App from './App.vue'
import i18n, { loadLocaleMessages, setI18nLanguage } from './i18n'
import router from './router';

// 初始化默认语言
async function initializeApp() {
  try {
    // 加载默认语言消息
    const { targetLocale } = await loadLocaleMessages(i18n, null, 'default');
    setI18nLanguage(i18n, targetLocale);
    console.log('[main] App initialized with locale:', targetLocale);
  } catch (error) {
    console.error('[main] Error initializing app:', error);
    setI18nLanguage(i18n, 'en');
  }

  const app = createApp(App);
  app.use(i18n);
  app.use(router);
  app.mount('#app');
}

initializeApp();
