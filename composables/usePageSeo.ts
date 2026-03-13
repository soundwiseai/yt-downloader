import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { resolveSiteForPath, stripLocalePrefix } from '@/utils/site-config'

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
  { code: 'zh-TW', lang: 'zh-Hant' },
  { code: 'zh-CN', lang: 'zh-Hans' },
  { code: 'ru', lang: 'ru' }
]

export const usePageSeo = () => {
  const { t, te } = useI18n()
  const runtimeConfig = useRuntimeConfig()

  const setSeoMeta = () => {
    const route = useRoute()
    const currentPath = route.path
    const baseUrl = runtimeConfig.public.siteUrl as string
    
    // 提取语言无关的路径部分
    const pathWithoutLocale = stripLocalePrefix(currentPath)
    
    const canonicalUrl = `${baseUrl}${currentPath}`

    const seoCandidates = ['seo']
    const activeSite = resolveSiteForPath(currentPath)

    if (activeSite?.seo) {
      seoCandidates.unshift(activeSite.seo)
    }

    const seoPrefix = seoCandidates.find((candidate) => te(`${candidate}.title`)) || seoCandidates[0]

    const englishPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
    const englishUrl = `${baseUrl}${englishPath}`

    const hreflangLinks = SUPPORTED_LOCALES.map(({ code, lang }) => {
      let localizedPath
      if (code === 'en') {
        localizedPath = englishPath
      } else {
        localizedPath = pathWithoutLocale === '/' ? `/${code}` : `/${code}${pathWithoutLocale}`
      }

      return {
        rel: 'alternate',
        hreflang: lang,
        href: `${baseUrl}${localizedPath}`
      }
    })

    hreflangLinks.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: englishUrl
    })

    useSeoMeta({
      title: () => t(`${seoPrefix}.title`),
      description: () => t(`${seoPrefix}.description`),
      ogTitle: () => t(`${seoPrefix}.ogTitle`),
      ogDescription: () => t(`${seoPrefix}.ogDescription`),
      ogSiteName: () => t('siteName'),
      ogImage: `${baseUrl}/images/logo.png`,
      ogUrl: canonicalUrl,
      ogType: 'website',
      twitterCard: 'summary',
      twitterTitle: () => t(`${seoPrefix}.ogTitle`),
      twitterDescription: () => t(`${seoPrefix}.ogDescription`),
      twitterImage: `${baseUrl}/images/logo.png`
    })

    useHead({
      link: [
        {
          rel: 'canonical',
          href: canonicalUrl
        },
        ...hreflangLinks
      ]
    })
  }

  return {
    setSeoMeta
  }
}
