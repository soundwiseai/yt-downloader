/**
 * Composable for reading CMS-exported content from /content/ directory.
 *
 * Uses Vite's import.meta.glob to load JSON at build time.
 * Falls back to i18n _t() when CMS content is not available,
 * enabling gradual migration from i18n to CMS.
 *
 * Usage:
 *   const { getPageContent, getFaqs, getSeoMeta, getContentOrI18n } = useContent()
 *   const page = getPageContent('mp4', 'en')
 */

import { _t } from '@/i18n/utils'

// --- Types ---

export type PageContent = {
  title: string
  subtitle: string
  description: string
  ctaButton: string
  placeholder: string
}

export type FaqItem = {
  question: string
  answer: any
  order: number
}

export type SeoMeta = {
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
}

// --- Build-time JSON loading via Vite glob ---

const pageFiles: Record<string, PageContent> = import.meta.glob('../content/pages/**/*.json', { eager: true, import: 'default' })
const faqFiles: Record<string, FaqItem[]> = import.meta.glob('../content/faqs/**/*.json', { eager: true, import: 'default' })
const seoFiles: Record<string, SeoMeta> = import.meta.glob('../content/seo/**/*.json', { eager: true, import: 'default' })

/**
 * Resolve a glob import by locale and pageKey.
 * Glob keys look like: ../content/pages/en/mp4.json
 */
function resolveGlob<T>(files: Record<string, T>, type: string, locale: string, pageKey: string): T | null {
  const suffix = `/${type}/${locale}/${pageKey}.json`
  for (const key of Object.keys(files)) {
    if (key.endsWith(suffix)) {
      return files[key]
    }
  }
  return null
}

// --- Composable ---

export const useContent = () => {
  const getPageContent = (pageKey: string, locale: string): PageContent | null => {
    return resolveGlob<PageContent>(pageFiles, 'pages', locale, pageKey)
  }

  const getFaqs = (pageKey: string, locale: string): FaqItem[] | null => {
    return resolveGlob<FaqItem[]>(faqFiles, 'faqs', locale, pageKey)
  }

  const getSeoMeta = (pageKey: string, locale: string): SeoMeta | null => {
    return resolveGlob<SeoMeta>(seoFiles, 'seo', locale, pageKey)
  }

  /**
   * Get a content value with i18n fallback.
   * First checks CMS content, then falls back to _t() i18n.
   */
  const getContentOrI18n = (
    pageKey: string,
    locale: string,
    field: keyof PageContent,
    i18nKey: string
  ): string => {
    const content = getPageContent(pageKey, locale)
    if (content && content[field]) {
      return content[field]
    }
    return _t(i18nKey)
  }

  return {
    getPageContent,
    getFaqs,
    getSeoMeta,
    getContentOrI18n,
  }
}
