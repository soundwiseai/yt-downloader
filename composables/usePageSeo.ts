import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const SUPPORTED_LOCALES = [
  { code: 'en', lang: 'en' },
  { code: 'ar', lang: 'ar' },
  { code: 'de', lang: 'de' },
  { code: 'es', lang: 'es' },
  { code: 'es-419', lang: 'es-419' },
  { code: 'fr', lang: 'fr' },
  { code: 'hi', lang: 'hi' },
  { code: 'id', lang: 'id' },
  { code: 'it', lang: 'it' },
  { code: 'ja', lang: 'ja' },
  { code: 'ko', lang: 'ko' },
  { code: 'pt', lang: 'pt' },
  { code: 'pt-br', lang: 'pt-BR' },
  { code: 'th', lang: 'th' },
  { code: 'tr', lang: 'tr' },
  { code: 'vi', lang: 'vi' },
  { code: 'zh-TW', lang: 'zh-Hant' }
]

export const usePageSeo = () => {
  const { t } = useI18n()

  const setSeoMeta = () => {
    const route = useRoute()
    const currentPath = route.path
    const baseUrl = 'https://youtubetomp4.pro'
    
    // 提取语言无关的路径部分
    const pathWithoutLocale = currentPath.replace(/^\/[a-zA-Z-]+/, '') || '/'
    
    // 生成canonical URL - 修复：指向当前页面自身
    const canonicalUrl = `${baseUrl}${currentPath}`

    // 根据页面路径确定SEO字段前缀
    // 去除尾部斜杠并规范化路径
    const normalizedPath = currentPath.replace(/\/$/, '')
    let seoPrefix = 'seo'
    
    if (normalizedPath.endsWith('/youtube-to-mp3') || normalizedPath === '/youtube-to-mp3') {
      seoPrefix = 'mp3_seo'
    } else if (normalizedPath.endsWith('/youtube-video-downloader') || normalizedPath === '/youtube-video-downloader') {
      seoPrefix = 'downloader_seo'
    } else if (normalizedPath.endsWith('/youtube-transcript-generator') || normalizedPath === '/youtube-transcript-generator') {
      seoPrefix = 'transcript_seo'
    }

    // 生成 hreflang 链接
    const hreflangLinks = SUPPORTED_LOCALES.map(({ code, lang }) => {
      let localizedPath
      if (code === 'en') {
        // 英文版本不需要语言前缀
        localizedPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
      } else {
        // 其他语言需要语言前缀
        localizedPath = pathWithoutLocale === '/' ? `/${code}` : `/${code}${pathWithoutLocale}`
      }
      
      return {
        rel: 'alternate',
        hreflang: lang,
        href: `${baseUrl}${localizedPath}`
      }
    })

    // SEO meta 标签
    useSeoMeta({
      title: () => t(`${seoPrefix}.title`),
      description: () => t(`${seoPrefix}.description`),
      ogTitle: () => t(`${seoPrefix}.ogTitle`),
      ogDescription: () => t(`${seoPrefix}.ogDescription`),
      ogSiteName: () => t('siteName')
    })

    // 使用 useHead 设置 canonical 和 hreflang 标签
    useHead({
      link: [
        // Canonical 标签 - 修复：指向当前页面
        {
          rel: 'canonical',
          href: canonicalUrl
        },
        // hreflang 标签
        ...hreflangLinks
      ]
    })
  }

  return {
    setSeoMeta
  }
}
