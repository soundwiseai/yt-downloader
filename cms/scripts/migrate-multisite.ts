/**
 * 多站点迁移脚本
 *
 * 1. 把现有 PageContent / CommonContent 记录标记为 site="y2mp4"
 * 2. 从 y2bmp3 和 ytbscript 的 i18n 文件导入内容
 *
 * Usage: cd cms && NODE_ENV=development PGSSLMODE=require npx tsx scripts/migrate-multisite.ts
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 加载环境变量
const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
for (const envFile of ['.env', '.env.local']) {
  const envPath = path.resolve(_dirname, '..', envFile)
  if (!fs.existsSync(envPath)) continue
  const content = fs.readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const eqIndex = line.indexOf('=')
    if (eqIndex === -1 || line.startsWith('#')) continue
    const key = line.slice(0, eqIndex).trim()
    const val = line.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '')
    if (key) process.env[key] = val
  }
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const PAGE_KEYS = ['mp4', 'mp3', 'downloader', 'transcript', 'm4a']
const LOCALES = [
  'en', 'ar', 'de', 'es', 'es-419', 'fr', 'hi', 'id', 'it',
  'ja', 'ko', 'pt', 'pt-br', 'ru', 'th', 'tr', 'vi', 'zh-CN', 'zh-TW',
]

// 各站点的 i18n 目录
const SITE_REPOS: Record<string, string> = {
  y2bmp3: path.resolve(_dirname, '../../../y2bmp3/i18n/locales'),
  y2script: path.resolve(_dirname, '../../../ytbscript/i18n/locales'),
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const payload = await getPayload({ config })

  // ========== Step 1: 现有数据标记为 y2mp4 ==========
  console.log('\n=== Step 1: 标记现有数据为 y2mp4 ===\n')

  // PageContent
  const { docs: pageDocs } = await payload.find({
    collection: 'page-content',
    limit: 500,
    where: {
      or: [
        { site: { equals: null } },
        { site: { exists: false } },
      ],
    },
  })

  let count = 0
  for (const doc of pageDocs) {
    await payload.update({
      collection: 'page-content',
      id: doc.id,
      data: {
        site: 'y2mp4',
        displayTitle: `[y2mp4] ${doc.pageKey} - ${doc.locale}`,
      },
    })
    count++
  }
  console.log(`  PageContent: 标记了 ${count} 条为 y2mp4`)

  // 也更新已经有 site 但 displayTitle 格式旧的
  const { docs: allPageDocs } = await payload.find({
    collection: 'page-content',
    limit: 500,
  })
  for (const doc of allPageDocs) {
    const expected = `[${doc.site || 'y2mp4'}] ${doc.pageKey} - ${doc.locale}`
    if (doc.displayTitle !== expected) {
      await payload.update({
        collection: 'page-content',
        id: doc.id,
        data: {
          site: (doc.site as string) || 'y2mp4',
          displayTitle: expected,
        },
      })
    }
  }

  // CommonContent
  const { docs: commonDocs } = await payload.find({
    collection: 'common-content',
    limit: 100,
  })
  count = 0
  for (const doc of commonDocs) {
    const site = (doc.site as string) || 'y2mp4'
    await payload.update({
      collection: 'common-content',
      id: doc.id,
      data: {
        site,
        displayTitle: `[${site}] common - ${doc.locale}`,
      },
    })
    count++
  }
  console.log(`  CommonContent: 更新了 ${count} 条`)

  // ========== Step 2: 导入 y2bmp3 和 y2script ==========
  for (const [siteName, localesDir] of Object.entries(SITE_REPOS)) {
    console.log(`\n=== Step 2: 导入 ${siteName} ===\n`)

    if (!fs.existsSync(localesDir)) {
      console.log(`  ⚠️ 跳过 ${siteName}：找不到 ${localesDir}`)
      continue
    }

    let imported = 0
    let skipped = 0

    // 导入页面内容
    for (const locale of LOCALES) {
      for (const pageKey of PAGE_KEYS) {
        const jsonPath = path.join(localesDir, locale, `${pageKey}.json`)
        if (!fs.existsSync(jsonPath)) {
          skipped++
          continue
        }

        // 检查是否已存在
        const existing = await payload.find({
          collection: 'page-content',
          where: {
            and: [
              { site: { equals: siteName } },
              { pageKey: { equals: pageKey } },
              { locale: { equals: locale } },
            ],
          },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          skipped++
          continue
        }

        const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
        await payload.create({
          collection: 'page-content',
          data: {
            site: siteName,
            pageKey,
            locale,
            createMode: 'single',
            displayTitle: `[${siteName}] ${pageKey} - ${locale}`,
            content: jsonContent,
          },
        })
        imported++
        console.log(`  ✅ [${siteName}] ${pageKey} - ${locale}`)
        await sleep(200) // 避免 Neon 连接过载
      }

      // 导入公共内容
      const commonPath = path.join(localesDir, locale, 'common.json')
      if (fs.existsSync(commonPath)) {
        const existing = await payload.find({
          collection: 'common-content',
          where: {
            and: [
              { site: { equals: siteName } },
              { locale: { equals: locale } },
            ],
          },
          limit: 1,
        })

        if (existing.docs.length === 0) {
          const jsonContent = JSON.parse(fs.readFileSync(commonPath, 'utf-8'))
          await payload.create({
            collection: 'common-content',
            data: {
              site: siteName,
              locale,
              displayTitle: `[${siteName}] common - ${locale}`,
              content: jsonContent,
            },
          })
          imported++
          console.log(`  ✅ [${siteName}] common - ${locale}`)
          await sleep(200)
        }
      }
    }

    console.log(`  ${siteName} 完成：导入 ${imported} 条，跳过 ${skipped} 条`)
  }

  console.log('\n=== 全部迁移完成！===\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('迁移失败:', err)
  process.exit(1)
})
