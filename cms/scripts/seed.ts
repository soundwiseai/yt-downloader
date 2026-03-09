/**
 * Seed 脚本 — 把现有 i18n JSON 文件原样导入 CMS
 *
 * 每个 JSON 文件 = CMS 里的一条记录
 * - 页面内容: i18n/locales/{locale}/mp4.json → PageContent { pageKey: "mp4", locale: "en", content: {...} }
 * - 公共内容: i18n/locales/{locale}/common.json → CommonContent { locale: "en", content: {...} }
 *
 * Usage: cd cms && npm run seed
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const I18N_DIR = path.resolve(__dirname, '../../i18n/locales')

const PAGE_KEYS = ['mp4', 'mp3', 'downloader', 'transcript', 'm4a']

const LOCALES = [
  'en', 'ar', 'de', 'es', 'es-419', 'fr', 'hi', 'id', 'it',
  'ja', 'ko', 'pt', 'pt-br', 'ru', 'th', 'tr', 'vi', 'zh-CN', 'zh-TW',
]

async function seed() {
  const payload = await getPayload({ config })

  // 1. 创建管理员用户（如果不存在）
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@y2mp4.com', password: 'admin123' },
    })
    console.log('✅ 管理员用户已创建: admin@y2mp4.com')
  }

  // 2. 导入页面内容
  let pageCount = 0
  for (const locale of LOCALES) {
    for (const pageKey of PAGE_KEYS) {
      const filePath = path.join(I18N_DIR, locale, `${pageKey}.json`)
      if (!fs.existsSync(filePath)) {
        console.log(`⏭️  跳过: ${locale}/${pageKey}.json (文件不存在)`)
        continue
      }
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      try {
        await payload.create({
          collection: 'page-content',
          data: { pageKey, locale, content },
        })
        pageCount++
      } catch (e: any) {
        if (e.message?.includes('UNIQUE') || e.message?.includes('unique')) {
          console.log(`⏭️  已存在: ${locale}/${pageKey}.json`)
        } else {
          console.error(`❌ ${locale}/${pageKey}.json:`, e.message)
        }
      }
    }
  }
  console.log(`✅ 页面内容导入完成: ${pageCount} 条`)

  // 3. 导入公共内容
  let commonCount = 0
  for (const locale of LOCALES) {
    const filePath = path.join(I18N_DIR, locale, 'common.json')
    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  跳过: ${locale}/common.json (文件不存在)`)
      continue
    }
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    try {
      await payload.create({
        collection: 'common-content',
        data: { locale, content },
      })
      commonCount++
    } catch (e: any) {
      if (e.message?.includes('UNIQUE') || e.message?.includes('unique')) {
        console.log(`⏭️  已存在: ${locale}/common.json`)
      } else {
        console.error(`❌ ${locale}/common.json:`, e.message)
      }
    }
  }
  console.log(`✅ 公共内容导入完成: ${commonCount} 条`)

  console.log('\n🎉 Seed 完成！')
  console.log(`   页面内容: ${pageCount} 条 (${LOCALES.length} 语言 × ${PAGE_KEYS.length} 页面)`)
  console.log(`   公共内容: ${commonCount} 条 (${LOCALES.length} 语言)`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed 失败:', err)
  process.exit(1)
})
