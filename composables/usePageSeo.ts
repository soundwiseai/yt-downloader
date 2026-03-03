import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import sites from '@/sites'

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
  const { t } = useI18n()

  const setSeoMeta = () => {
    const route = useRoute()
    const currentPath = route.path
    const baseUrl = 'https://y2mp4.com'
    
    // 提取语言无关的路径部分
    const pathWithoutLocale = currentPath.replace(/^\/[a-zA-Z]{2}(-[a-zA-Z0-9]{2,})?(?=\/|$)/, '') || '/'
    
    // 生成canonical URL - 修复：指向当前页面自身
    const canonicalUrl = `${baseUrl}${currentPath}`

    // 根据页面路径确定SEO字段前缀
    // 去除尾部斜杠并规范化路径
    const normalizedPath = currentPath.replace(/\/$/, '')
    let seoPrefix = 'seo'
    
    // 从 sites 配置中查找匹配的站点
    for (const site of sites) {
      if (normalizedPath.endsWith(site.url) || normalizedPath === site.url) {
        seoPrefix = site.seo
        break
      }
    }

    // 生成英文版 URL（用于 x-default 和 og:url）
    const englishPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
    const englishUrl = `${baseUrl}${englishPath}`

    // 生成 hreflang 链接
    const hreflangLinks = SUPPORTED_LOCALES.map(({ code, lang }) => {
      let localizedPath
      if (code === 'en') {
        // 英文版本不需要语言前缀
        localizedPath = englishPath
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

    // 添加 x-default，指向英文版
    hreflangLinks.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: englishUrl
    })

    // SEO meta 标签
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
