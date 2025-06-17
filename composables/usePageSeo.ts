import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const SUPPORTED_LOCALES = [
  { code: 'en', lang: 'en' },
  { code: 'ar', lang: 'ar' },
  { code: 'es', lang: 'es' },
  { code: 'hi', lang: 'hi' },
  { code: 'id', lang: 'id' },
  { code: 'ja', lang: 'ja' },
  { code: 'ko', lang: 'ko' },
  { code: 'pt', lang: 'pt' },
  { code: 'th', lang: 'th' },
  { code: 'vi', lang: 'vi' },
  { code: 'zh-TW', lang: 'zh-Hant' }
]

export const usePageSeo = () => {
  const { t } = useI18n()

  const setSeoMeta = () => {
    const route = useRoute()
    const currentPath = route.path
    const baseUrl = 'https://youtubetomp4.pro'
    const canonicalPath = currentPath.replace(/^\/[^/]+/, '')
    const canonicalUrl = `${baseUrl}${canonicalPath}`

    // SEO meta 标签
    useSeoMeta({
      title: () => t('seo.title'),
      description: () => t('seo.description'),
      ogTitle: () => t('seo.ogTitle'),
      ogDescription: () => t('seo.ogDescription'),
      ogSiteName: () => t('siteName'),
      twitterTitle: () => t('seo.ogTitle'),
      twitterDescription: () => t('seo.ogDescription'),
      canonical: canonicalUrl,
      alternateLanguages: () => {
        const links = {}
        SUPPORTED_LOCALES.forEach(({ code, lang }) => {
          const path = code === 'en' ? currentPath : `/${code}${currentPath}`
          links[lang] = `${baseUrl}${path}`
        })
        return links
      }
    })
  }

  return {
    setSeoMeta
  }
}
