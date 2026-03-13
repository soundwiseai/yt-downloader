import sites from '@/sites'

export const SUPPORTED_LOCALE_CODES = [
  'en', 'ar', 'de', 'es', 'es-419', 'fr', 'hi', 'id', 'it',
  'ja', 'ko', 'pt', 'pt-br', 'th', 'tr', 'vi', 'zh-TW', 'zh-CN', 'ru'
] as const

export type SiteConfig = {
  name: string
  i18n: string
  seo: string
  url: string
  template: string
  header: boolean
  footer: boolean
}

const LEGACY_SITE_LABEL_KEYS: Record<string, string> = {
  m4a: 'youtube2m4a',
  mp3: 'mp3Converter',
  downloader: 'videoDownloader',
  transcript: 'transcribeGenerator',
}

export function normalizePath(path = '/'): string {
  if (!path || path === '/') {
    return '/'
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  return normalized.replace(/\/+$/, '') || '/'
}

export function getLocaleFromPath(path = '/'): string | null {
  const normalized = normalizePath(path)
  const segments = normalized.split('/').filter(Boolean)
  const candidate = segments[0]

  return candidate && SUPPORTED_LOCALE_CODES.includes(candidate as typeof SUPPORTED_LOCALE_CODES[number])
    ? candidate
    : null
}

export function stripLocalePrefix(path = '/'): string {
  const normalized = normalizePath(path)
  const locale = getLocaleFromPath(normalized)

  if (!locale) {
    return normalized
  }

  const stripped = normalized.slice(locale.length + 1)
  return stripped ? normalizePath(stripped) : '/'
}

export function getPrimarySite(): SiteConfig | null {
  return (
    (sites.find((site) => normalizePath(site.url) === '/') as SiteConfig | undefined) ??
    (sites[0] as SiteConfig | undefined) ??
    null
  )
}

export function resolveSiteForPath(path = '/'): SiteConfig | null {
  const pathWithoutLocale = stripLocalePrefix(path)

  if (pathWithoutLocale === '/') {
    return getPrimarySite()
  }

  return (
    (sites.find((site) => normalizePath(site.url) === pathWithoutLocale) as SiteConfig | undefined) ??
    null
  )
}

export function buildLocalizedPath(path = '/', locale?: string | null): string {
  const normalized = normalizePath(path)

  if (!locale || locale === 'en') {
    return normalized
  }

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

export function getSiteLabelKeyCandidates(site: Pick<SiteConfig, 'name' | 'i18n'>): string[] {
  return [
    site.name,
    site.i18n,
    LEGACY_SITE_LABEL_KEYS[site.i18n],
    LEGACY_SITE_LABEL_KEYS[site.name],
  ].filter((value, index, values): value is string => Boolean(value) && values.indexOf(value) === index)
}
