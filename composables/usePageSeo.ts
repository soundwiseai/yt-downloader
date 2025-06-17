import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const SUPPORTED_LOCALES = [
  { code: 'en', lang: 'en' },
  { code: 'ar', lang: 'ar' },
  { code: 'es', lang: 'es' },
  { code: 'es-419', lang: 'es-419' },
  { code: 'hi', lang: 'hi' },
  { code: 'id', lang: 'id' },
  { code: 'it', lang: 'it' },
  { code: 'ja', lang: 'ja' },
  { code: 'ko', lang: 'ko' },
  { code: 'pt', lang: 'pt' },
  { code: 'pt-br', lang: 'pt-BR' },
  { code: 'th', lang: 'th' },
  { code: 'tr', lang: 'tr' },
  { code: 'fr', lang: 'fr' },
  { code: 'de', lang: 'de' },
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
