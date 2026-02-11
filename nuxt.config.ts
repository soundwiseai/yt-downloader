// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/image'],
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ar', name: 'العربية', file: 'ar.json' },      
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'es-419', name: 'Español (Latinoamérica)', file: 'es-419.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'hi', name: 'हिन्दी', file: 'hi.json' },
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'pt-br', name: 'Português (Brasil)', file: 'pt-br.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'zh-TW', name: '繁體中文', file: 'zh-TW.json' },
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ]
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://y2mp4.com',
          changeOrigin: true,
          secure: true
        }
      }
    }
  },
  nitro: {
    prerender: {
      routes: (() => {
        // 导入站点配置
        const sites = require('./sites').default;
        const locales = [
          'en', 'ar', 'de', 'es', 'es-419', 'fr', 'hi', 'id', 'it',
          'ja', 'ko', 'pt', 'pt-br', 'th', 'tr', 'vi', 'zh-TW', 'zh-CN', 'ru'
        ];
        
        // 生成所有语言的根路径
        const rootRoutes = locales.map(locale => locale === 'en' ? '/' : `/${locale}`);
        
        // 生成所有语言的所有站点路径
        const siteRoutes: string[] = [];
        locales.forEach(locale => {
          sites.forEach((site: {url: string}) => {
            if (locale === 'en') {
              siteRoutes.push(site.url);
            } else {
              siteRoutes.push(`/${locale}${site.url}`);
            }
          });
        });
        
        return [...rootRoutes, ...siteRoutes];
      })()
    }
  }
})