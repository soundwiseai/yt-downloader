/**
 * 构建预处理脚本 — 从 CMS API 拉取数据，写入本地文件
 *
 * 在 nuxt generate / nuxt build 之前自动执行。
 * 通过环境变量配置 CMS 地址和租户，支持多站点复用。
 *
 * 环境变量：
 *   CMS_API_URL   — CMS 的 API 地址（默认 https://cms.musely.io）
 *   TENANT_SLUG   — 当前站点的租户标识（默认 y2mp4）
 *   SITE_DOMAIN   — 站点域名，用于 sitemap / robots（默认按 tenant / common.siteName 推断）
 *
 * 输出：
 *   1. i18n/locales/{locale}/{i18nPrefix}.json — 页面 i18n 内容
 *   2. i18n/locales/{locale}/common.json   — 公共 i18n 内容
 *   3. sites.ts                            — 站点路由配置
 *   4. public/sitemap.xml                  — 站点地图
 *
 * Usage: tsx scripts/fetch-cms.ts
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { inferSiteDomain, inferTenantSlug } from '../utils/project-identity'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const I18N_DIR = path.join(PROJECT_ROOT, 'i18n/locales')
const SITES_FILE = path.join(PROJECT_ROOT, 'sites.ts')
const SITEMAP_FILE = path.join(PROJECT_ROOT, 'public/sitemap.xml')
const ROBOTS_FILE = path.join(PROJECT_ROOT, 'public/robots.txt')

// ── 环境变量 ──

const CMS_API_URL = process.env.CMS_API_URL || 'https://cms.musely.io'
const TENANT_SLUG = inferTenantSlug({
  projectRoot: PROJECT_ROOT,
  tenantSlug: process.env.TENANT_SLUG,
  siteDomain: process.env.SITE_DOMAIN,
})
const SITE_DOMAIN = inferSiteDomain({
  projectRoot: PROJECT_ROOT,
  tenantSlug: TENANT_SLUG,
  siteDomain: process.env.SITE_DOMAIN,
})

// ── 类型 ──

type SiteConfig = {
  name: string
  i18n: string
  seo: string
  url: string
  template: string
  header: boolean
  footer: boolean
}

type PageDoc = {
  id: string
  pageKey: string
  locale: string
  content: Record<string, any> | null
  navTitle?: string
  urlPath?: string
  template?: string
  i18nPrefix?: string
  seoPrefix?: string
  showInHeader?: boolean
  showInFooter?: boolean
  tenant?: { slug: string } | string
}

type CommonDoc = {
  id: string
  locale: string
  content: Record<string, any> | null
  tenant?: { slug: string } | string
}

// ── API 请求 ──

async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${CMS_API_URL}/api/${endpoint}`)

  // 多租户过滤
  url.searchParams.set('where[tenant.slug][equals]', TENANT_SLUG)
  url.searchParams.set('limit', '0') // 获取全部记录
  url.searchParams.set('sort', 'locale')

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  const fullUrl = url.toString()
  console.log(`  📡 GET ${fullUrl}`)

  const response = await fetch(fullUrl)
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`CMS API 请求失败: ${response.status} ${response.statusText}\n  URL: ${fullUrl}\n  Response: ${text.slice(0, 500)}`)
  }

  return response.json() as Promise<T>
}

// ── 主流程 ──

async function main() {
  console.log(`\n🔗 CMS API 直连模式`)
  console.log(`   CMS:    ${CMS_API_URL}`)
  console.log(`   Tenant: ${TENANT_SLUG}`)
  console.log(`   Domain: ${SITE_DOMAIN}\n`)

  // 1. 拉取页面内容
  console.log('📄 拉取页面内容...')
  const pageResult = await fetchAPI<{ docs: PageDoc[] }>('page-content')
  const pageDocs = pageResult.docs

  if (pageDocs.length === 0) {
    console.log('⚠️  CMS 中没有找到页面内容数据，跳过 CMS 数据写入')
    console.log('   如果这是首次设置，请先在 CMS 后台创建内容')
    console.log('   将使用本地已有的 i18n 文件和 sites.ts\n')
    return
  }

  // 写入 i18n JSON
  let pageCount = 0
  const routeMap = new Map<string, SiteConfig>()
  const allLocales = new Set<string>()
  // 收集各语言的导航锚文本 { locale: { pageKey: navTitle } }
  const navTitlesByLocale = new Map<string, Record<string, string>>()

  for (const doc of pageDocs) {
    const { pageKey, locale, content, navTitle, urlPath, template, i18nPrefix, seoPrefix, showInHeader, showInFooter } = doc
    allLocales.add(locale)

    // 写 i18n JSON — 使用 i18nPrefix 作为文件名（与 nuxt.config.ts 中的文件列表对应）
    if (content && Object.keys(content).length > 0) {
      const dir = path.join(I18N_DIR, locale)
      fs.mkdirSync(dir, { recursive: true })
      const fileName = i18nPrefix || pageKey
      const filePath = path.join(dir, `${fileName}.json`)
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8')
      pageCount++
    }

    // 收集导航锚文本
    if (navTitle?.trim()) {
      if (!navTitlesByLocale.has(locale)) {
        navTitlesByLocale.set(locale, {})
      }
      navTitlesByLocale.get(locale)![pageKey] = navTitle.trim()
    }

    // 收集路由配置（只从有 urlPath 的记录中提取，每个 pageKey 取第一个）
    if (urlPath && !routeMap.has(pageKey)) {
      // seoPrefix 必须以 _seo 结尾，与 usePageSeo.ts 中 t(`${seoPrefix}.title`) 的用法对应
      const rawSeo = seoPrefix || i18nPrefix || pageKey
      const normalizedSeo = rawSeo.endsWith('_seo') ? rawSeo : `${rawSeo}_seo`

      routeMap.set(pageKey, {
        name: pageKey,
        i18n: i18nPrefix || pageKey,
        seo: normalizedSeo,
        url: normalizeRoutePath(urlPath),
        template: template || 'home',
        header: showInHeader ?? false,
        footer: showInFooter ?? true,
      })
    }
  }
  console.log(`   ✅ 页面内容: ${pageCount} 个 i18n JSON 文件`)

  // 2. 拉取公共内容
  console.log('📄 拉取公共内容...')
  const commonResult = await fetchAPI<{ docs: CommonDoc[] }>('common-content')
  let commonCount = 0

  for (const doc of commonResult.docs) {
    const { locale, content } = doc
    allLocales.add(locale)

    if (content && Object.keys(content).length > 0) {
      // 合并该语言的导航锚文本到 common.json
      const navTitles = navTitlesByLocale.get(locale) || {}
      const merged = { ...content, ...navTitles }

      const dir = path.join(I18N_DIR, locale)
      fs.mkdirSync(dir, { recursive: true })
      const filePath = path.join(dir, 'common.json')
      fs.writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n', 'utf-8')
      commonCount++
    }
  }

  // 对于有 navTitle 但没有 common-content 的语言，也要写入 common.json
  for (const [locale, titles] of navTitlesByLocale) {
    const dir = path.join(I18N_DIR, locale)
    const filePath = path.join(dir, 'common.json')
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(filePath, JSON.stringify(titles, null, 2) + '\n', 'utf-8')
      commonCount++
    }
  }
  console.log(`   ✅ 公共内容: ${commonCount} 个 common.json 文件`)

  // 3. 生成 sites.ts
  if (routeMap.size > 0) {
    generateSitesTs(routeMap)
    console.log(`   ✅ sites.ts: ${routeMap.size} 个站点路由`)
  } else {
    console.log(`   ⚠️  CMS 中没有路由配置（urlPath），sites.ts 保持不变`)
  }

  // 4. 生成 sitemap.xml
  const locales = allLocales.size > 0
    ? Array.from(allLocales).sort((a, b) => a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b))
    : getLocalesFromI18nDir()

  // 用 CMS 路由配置或回退到现有 sites.ts
  const sitesForSitemap = routeMap.size > 0
    ? routeMap
    : loadExistingSites()

  if (sitesForSitemap.size > 0) {
    generateSitemap(sitesForSitemap, locales)
    generateRobotsTxt()
    console.log(`   ✅ sitemap.xml: ${locales.length} 语言 × ${sitesForSitemap.size} 页面`)
    console.log(`   ✅ robots.txt: ${SITE_DOMAIN}/sitemap.xml`)
  }

  console.log(`\n🎉 CMS 数据同步完成！共写入 ${pageCount + commonCount} 个内容文件\n`)
}

function normalizeRoutePath(urlPath: string) {
  const trimmed = String(urlPath || '').trim()
  if (!trimmed || trimmed === '/') {
    return '/'
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeadingSlash.replace(/\/+$/, '') || '/'
}

// ── 生成 sites.ts ──

function generateSitesTs(routeMap: Map<string, SiteConfig>) {
  const sites = Array.from(routeMap.values()).sort((a, b) => {
    const aUrl = normalizeRoutePath(a.url)
    const bUrl = normalizeRoutePath(b.url)
    const aIsHome = aUrl === '/'
    const bIsHome = bUrl === '/'

    if (aIsHome !== bIsHome) {
      return aIsHome ? -1 : 1
    }

    return aUrl.localeCompare(bUrl) || a.name.localeCompare(b.name)
  })
  const entries = sites.map((site) => {
    return `    {
        name: '${site.name}',
        i18n: '${site.i18n}',
        seo: '${site.seo}',
        url: '${normalizeRoutePath(site.url)}',
        template: '${site.template}',
        header: ${site.header},
        footer: ${site.footer}
    }`
  })

  const content = `/**
 * 多站点配置文件（由构建脚本从 CMS 自动生成，请勿手动编辑）
 *
 * 生成时间: ${new Date().toISOString()}
 * 数据来源: ${CMS_API_URL} / tenant: ${TENANT_SLUG}
 *
 * 要修改站点配置，请在 CMS 后台的「页面内容 → 路由 & 站点配置」中编辑，
 * 下次构建时会自动更新。
 */
export default [
${entries.join(',\n')}
]
`
  fs.writeFileSync(SITES_FILE, content, 'utf-8')
}

// ── 生成 sitemap.xml ──

function generateSitemap(routeMap: Map<string, SiteConfig>, locales: string[]) {
  const today = new Date().toISOString().split('T')[0] + 'T00:00:00+00:00'
  const sites = Array.from(routeMap.values())
  const pageSites = sites.filter((site) => normalizeRoutePath(site.url) !== '/')

  let urls = ''

  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`

    // 首页
    const homeLoc = locale === 'en' ? SITE_DOMAIN : `${SITE_DOMAIN}${prefix}`
    urls += `  <url>\n    <loc>${homeLoc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`

    // 各页面
    for (const site of pageSites) {
      urls += `  <url>\n    <loc>${SITE_DOMAIN}${prefix}${normalizeRoutePath(site.url)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>
`
  fs.mkdirSync(path.dirname(SITEMAP_FILE), { recursive: true })
  fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8')
}

function generateRobotsTxt() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_DOMAIN}/sitemap.xml
`
  fs.writeFileSync(ROBOTS_FILE, robots, 'utf-8')
}

// ── 辅助函数 ──

function getLocalesFromI18nDir(): string[] {
  if (!fs.existsSync(I18N_DIR)) return ['en']
  return fs.readdirSync(I18N_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b))
}

function loadExistingSites(): Map<string, SiteConfig> {
  const map = new Map<string, SiteConfig>()
  try {
    // 动态读取现有 sites.ts 的导出
    const sitesPath = path.join(PROJECT_ROOT, 'sites.ts')
    const content = fs.readFileSync(sitesPath, 'utf-8')
    // 简单解析：提取 JSON-like 对象
    const match = content.match(/export default (\[[\s\S]*\])/)
    if (match) {
      // 把 TS 语法简单转换为可 eval 的格式
      const jsonLike = match[1]
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":')
        .replace(/,\s*]/g, ']')
        .replace(/,\s*}/g, '}')
      const sites = JSON.parse(jsonLike)
      for (const site of sites) {
        map.set(site.name, site)
      }
    }
  } catch {
    // 解析失败则返回空 map
  }
  return map
}

// ── 执行 ──

main().catch((err) => {
  console.error('\n❌ CMS 数据同步失败:', err.message || err)
  console.error('\n   如果 CMS 不可用，可以跳过此步骤：')
  console.error('   SKIP_CMS=1 npm run generate\n')

  // CMS 不可用时不阻塞构建 — 使用本地已有的文件
  if (process.env.SKIP_CMS === '1') {
    console.log('⚠️  SKIP_CMS=1 已设置，跳过 CMS 数据同步，使用本地文件\n')
    process.exit(0)
  }

  process.exit(1)
})
