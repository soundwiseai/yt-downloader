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
  },
  nitro: {
    prerender: {
      routes: [
        '/en/youtube-to-mp3',
        '/en/youtube-video-downloader',
        '/ar/youtube-to-mp3',
        '/ar/youtube-video-downloader',
        '/es/youtube-to-mp3',
        '/es/youtube-video-downloader',
        '/hi/youtube-to-mp3',
        '/hi/youtube-video-downloader',
        '/id/youtube-to-mp3',
        '/id/youtube-video-downloader',
        '/ja/youtube-to-mp3',
        '/ja/youtube-video-downloader',
        '/ko/youtube-to-mp3',
        '/ko/youtube-video-downloader',
        '/pt/youtube-to-mp3',
        '/pt/youtube-video-downloader',
        '/th/youtube-to-mp3',
        '/th/youtube-video-downloader',
        '/vi/youtube-to-mp3',
        '/vi/youtube-video-downloader',
        '/zh-TW/youtube-to-mp3',
        '/zh-TW/youtube-video-downloader',
        '/youtube-to-mp3',
        '/youtube-video-downloader'
      ]
    }
  }
})