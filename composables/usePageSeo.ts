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
    
    // 修复：更精确地提取页面路径，排除语言前缀
    let pathWithoutLocale = ''
    
    // 检查是否是根路径或首页
    if (currentPath === '/' || currentPath === '') {
      pathWithoutLocale = ''
    } else {
      // 匹配 /locale 或 /locale/path 格式
      const localePathMatch = currentPath.match(/^\/([a-zA-Z-]+)(.*)$/)
      if (localePathMatch) {
        const locale = localePathMatch[1]
        const path = localePathMatch[2]
        
        // 检查第一部分是否是支持的语言代码
        const isLocaleCode = SUPPORTED_LOCALES.some(l => l.code === locale)
        
        if (isLocaleCode) {
          // 如果是语言代码，path 是页面路径
          pathWithoutLocale = path || ''
        } else {
          // 如果不是语言代码，整个路径就是页面路径（如英文默认路径）
          pathWithoutLocale = currentPath
        }
      } else {
        // 没有匹配到格式，直接使用当前路径
        pathWithoutLocale = currentPath
      }
    }
    
    // 确保路径格式正确
    if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale
    }
    
    // 生成canonical URL - 指向当前页面自身
    const canonicalUrl = `${baseUrl}${currentPath}`

    // 根据页面路径确定SEO字段前缀
    let seoPrefix = 'seo'
    
    if (pathWithoutLocale === '/youtube-to-mp3') {
      seoPrefix = 'mp3_seo'
    } else if (pathWithoutLocale === '/youtube-video-downloader') {
      seoPrefix = 'downloader_seo'
    }

    // 生成 hreflang 链接
    const hreflangLinks = SUPPORTED_LOCALES.map(({ code, lang }) => {
      let href
      
      if (code === 'en') {
        // 英文版本：如果是首页则为空，否则直接使用页面路径
        href = pathWithoutLocale === '' ? baseUrl : `${baseUrl}${pathWithoutLocale}`
      } else {
        // 其他语言：添加语言前缀
        href = pathWithoutLocale === '' ? `${baseUrl}/${code}` : `${baseUrl}/${code}${pathWithoutLocale}`
      }
      
      return {
        rel: 'alternate',
        hreflang: lang,
        href: href
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
        // Canonical 标签
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
