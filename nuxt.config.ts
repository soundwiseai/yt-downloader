// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/image'],
  i18n: {
    defaultLocale: 'en',
    
    locales: [
      { code: 'en', name: 'English', files: 'en.json' },
      { code: 'ar', name: 'العربية', file: 'ar.json' },      
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'hi', name: 'हिन्दी', file: 'hi.json' },
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'zh-TW', name: '繁體中文', file: 'zh-TW.json' }    
    ]
  }
})