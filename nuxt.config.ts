// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  devServer: { port: 3088 },
  modules: ['@nuxtjs/i18n', '@nuxt/image'],
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    locales: (() => {
      // 自动发现 i18n JSON 文件 — CMS 新增页面时无需修改此配置
      // pregenerate 脚本会在 nuxt generate 之前把 CMS 内容写入 i18n/locales/
      const fs = require('fs')
      const path = require('path')
      const i18nFiles = (code: string) => {
        const dir = path.join(__dirname, 'i18n/locales', code)
        try {
          return fs.readdirSync(dir)
            .filter((f: string) => f.endsWith('.json'))
            .sort((a: string, b: string) => a === 'common.json' ? -1 : b === 'common.json' ? 1 : a.localeCompare(b))
            .map((f: string) => `${code}/${f}`)
        } catch {
          return [`${code}/common.json`]
        }
      }
      return [
        { code: 'en', name: 'English', files: i18nFiles('en') },
        { code: 'ar', name: 'العربية', files: i18nFiles('ar') },
        { code: 'de', name: 'Deutsch', files: i18nFiles('de') },
        { code: 'es', name: 'Español', files: i18nFiles('es') },
        { code: 'es-419', name: 'Español (Latinoamérica)', files: i18nFiles('es-419') },
        { code: 'fr', name: 'Français', files: i18nFiles('fr') },
        { code: 'hi', name: 'हिन्दी', files: i18nFiles('hi') },
        { code: 'id', name: 'Bahasa Indonesia', files: i18nFiles('id') },
        { code: 'it', name: 'Italiano', files: i18nFiles('it') },
        { code: 'ja', name: '日本語', files: i18nFiles('ja') },
        { code: 'ko', name: '한국어', files: i18nFiles('ko') },
        { code: 'pt', name: 'Português', files: i18nFiles('pt') },
        { code: 'pt-br', name: 'Português (Brasil)', files: i18nFiles('pt-br') },
        { code: 'th', name: 'ไทย', files: i18nFiles('th') },
        { code: 'tr', name: 'Türkçe', files: i18nFiles('tr') },
        { code: 'vi', name: 'Tiếng Việt', files: i18nFiles('vi') },
        { code: 'zh-TW', name: '繁體中文', files: i18nFiles('zh-TW') },
        { code: 'zh-CN', name: '简体中文', files: i18nFiles('zh-CN') },
        { code: 'ru', name: 'Русский', files: i18nFiles('ru') },
      ]
    })()
  },
  watch: {
    ignored: ['**/node_modules/**', '**/.git/**', '**/.output/**']
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://y2mp4.com',
          changeOrigin: true,
          secure: true
        }
      },
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.output/**', '**/.nuxt/**']
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