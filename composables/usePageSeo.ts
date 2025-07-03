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
    
    // 生成canonical URL (指向英文版本)
    const canonicalUrl = pathWithoutLocale === '/' 
      ? baseUrl 
      : `${baseUrl}${pathWithoutLocale}`

    // 根据页面路径确定SEO字段前缀
    // 去除尾部斜杠并规范化路径
    const normalizedPath = currentPath.replace(/\/$/, '')
    let seoPrefix = 'seo'
    
    if (normalizedPath.endsWith('/youtube-to-mp3') || normalizedPath === '/youtube-to-mp3') {
      seoPrefix = 'mp3_seo'
    } else if (normalizedPath.endsWith('/youtube-video-downloader') || normalizedPath === '/youtube-video-downloader') {
      seoPrefix = 'downloader_seo'
    }

    // SEO meta 标签
    // @ts-ignore
    useSeoMeta({
      title: () => t(`${seoPrefix}.title`),
      description: () => t(`${seoPrefix}.description`),
      ogTitle: () => t(`${seoPrefix}.ogTitle`),
      ogDescription: () => t(`${seoPrefix}.ogDescription`),
      ogSiteName: () => t('siteName'),
      canonical: canonicalUrl,
      alternateLanguages: () => {
        const links: Record<string, string> = {}
        SUPPORTED_LOCALES.forEach(({ code, lang }) => {
          // 为每个语言生成正确的路径
          let localizedPath
          if (code === 'en') {
            // 英文版本不需要语言前缀
            localizedPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
          } else {
            // 其他语言需要语言前缀
            localizedPath = pathWithoutLocale === '/' ? `/${code}` : `/${code}${pathWithoutLocale}`
          }
          links[lang] = `${baseUrl}${localizedPath}`
        })
        return links
      }
    })
  }

  return {
    setSeoMeta
  }
}
