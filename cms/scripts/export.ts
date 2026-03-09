/**
 * Export 脚本 — 把 CMS 内容导出到前端项目
 *
 * 导出三部分：
 * 1. PageContent.content → i18n/locales/{locale}/{pageKey}.json
 * 2. CommonContent       → i18n/locales/{locale}/common.json
 * 3. PageContent 路由配置 → sites.ts（自动生成）
 * 4. 基于 sites.ts       → public/sitemap.xml（自动生成）
 *
 * Usage: cd cms && npm run export
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '../..')
const I18N_DIR = path.join(PROJECT_ROOT, 'i18n/locales')
const SITES_FILE = path.join(PROJECT_ROOT, 'sites.ts')
const SITEMAP_FILE = path.join(PROJECT_ROOT, 'public/sitemap.xml')
const DOMAIN = 'https://y2mp4.com'

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

// ── 导出逻辑 ──

async function exportContent() {
  const payload = await getPayload({ config })

  // 1. 导出页面内容（i18n JSON）
  const pages = await payload.find({
    collection: 'page-content',
    limit: 0,
    sort: 'locale',
  })

  let pageCount = 0
  const routeMap = new Map<string, SiteConfig>()

  for (const doc of pages.docs) {
    const { pageKey, locale, content, urlPath, template, i18nPrefix, seoPrefix, showInHeader, showInFooter } = doc as any

    // 写 i18n JSON
    if (content && Object.keys(content).length > 0) {
      const dir = path.join(I18N_DIR, locale)
      fs.mkdirSync(dir, { recursive: true })
      const filePath = path.join(dir, `${pageKey}.json`)
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8')
      pageCount++
    }

    // 收集路由配置（只从有 urlPath 的记录中提取，每个 pageKey 取第一个）
    if (urlPath && !routeMap.has(pageKey)) {
      routeMap.set(pageKey, {
        name: pageKey,
        i18n: i18nPrefix || pageKey,
        seo: seoPrefix || `${pageKey}_seo`,
        url: urlPath,
        template: template || 'home',
        header: showInHeader ?? false,
        footer: showInFooter ?? true,
      })
    }
  }
  console.log(`✅ 页面内容导出: ${pageCount} 个文件`)

  // 2. 导出公共内容
  const commons = await payload.find({
    collection: 'common-content',
    limit: 0,
    sort: 'locale',
  })

  let commonCount = 0
  for (const doc of commons.docs) {
    const { locale, content } = doc as any
    if (content && Object.keys(content).length > 0) {
      const dir = path.join(I18N_DIR, locale)
      fs.mkdirSync(dir, { recursive: true })
      const filePath = path.join(dir, 'common.json')
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8')
      commonCount++
    }
  }
  console.log(`✅ 公共内容导出: ${commonCount} 个文件`)

  // 3. 生成 sites.ts（如果 CMS 中有路由配置）
  if (routeMap.size > 0) {
    generateSitesTs(routeMap)
    console.log(`✅ sites.ts 生成: ${routeMap.size} 个站点`)

    // 4. 生成 sitemap.xml
    const locales = getLocalesFromI18nDir()
    generateSitemap(routeMap, locales)
    console.log(`✅ sitemap.xml 生成: ${locales.length} 个语言 × ${routeMap.size} 个页面`)
  } else {
    console.log(`⚠️  CMS 中没有路由配置（urlPath），sites.ts 和 sitemap.xml 保持不变`)
    console.log(`   提示：在 CMS 页面内容的「路由 & 站点配置」中填写 URL 路径即可启用`)
  }

  console.log(`\n🎉 导出完成！`)
  process.exit(0)
}

// ── 生成 sites.ts ──

function generateSitesTs(routeMap: Map<string, SiteConfig>) {
  const sites = Array.from(routeMap.values())
  const entries = sites.map((site) => {
    return `    {
        name: '${site.name}',
        i18n: '${site.i18n}',
        seo: '${site.seo}',
        url: '${site.url}',
        template: '${site.template}',
        header: ${site.header},
        footer: ${site.footer}
    }`
  })

  const content = `/**
 * 多站点配置文件（由 CMS export 脚本自动生成，请勿手动编辑）
 *
 * 生成时间: ${new Date().toISOString()}
 * 数据来源: CMS PageContent 集合的路由配置字段
 *
 * 要修改站点配置，请在 CMS 后台的「页面内容 → 路由 & 站点配置」中编辑，
 * 然后运行 cd cms && npm run export 重新生成。
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

  let urls = ''

  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`

    // 首页
    const homeLoc = locale === 'en' ? DOMAIN : `${DOMAIN}${prefix}`
    urls += `  <url>\n    <loc>${homeLoc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`

    // 各页面
    for (const site of sites) {
      urls += `  <url>\n    <loc>${DOMAIN}${prefix}${site.url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>
`
  fs.mkdirSync(path.dirname(SITEMAP_FILE), { recursive: true })
  fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8')
}

// ── 辅助函数 ──

function getLocalesFromI18nDir(): string[] {
  if (!fs.existsSync(I18N_DIR)) return ['en']
  return fs.readdirSync(I18N_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort((a, b) => {
      // en 排在最前面
      if (a === 'en') return -1
      if (b === 'en') return 1
      return a.localeCompare(b)
    })
}

exportContent().catch((err) => {
  console.error('导出失败:', err)
  process.exit(1)
})
