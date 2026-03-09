/**
 * 批量更新所有 PageContent 记录的 displayTitle 字段
 *
 * Usage: cd cms && npx tsx scripts/update-display-titles.ts
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 手动加载 .env 和 .env.local
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
    if (key) {
      process.env[key] = val
    }
  }
}

// 确保 Neon 连接使用 SSL
if (process.env.POSTGRES_URL && !process.env.POSTGRES_URL.includes('sslmode=')) {
  process.env.POSTGRES_URL += '?sslmode=require'
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const PAGE_LABELS: Record<string, string> = {
  mp4: 'MP4 下载器',
  mp3: 'MP3 转换器',
  downloader: '视频下载器',
  transcript: '字幕提取器',
  m4a: 'M4A 转换器',
}

async function main() {
  const payload = await getPayload({ config })

  // 拉取所有 page-content 记录
  const { docs } = await payload.find({
    collection: 'page-content',
    limit: 200,
  })

  console.log(`找到 ${docs.length} 条记录，开始更新 displayTitle...`)

  let updated = 0
  for (const doc of docs) {
    const pageKey = doc.pageKey as string
    const locale = doc.locale as string
    const pageName = PAGE_LABELS[pageKey] || pageKey
    const displayTitle = `${pageName} - ${locale}`

    await payload.update({
      collection: 'page-content',
      id: doc.id,
      data: { displayTitle },
    })

    updated++
    console.log(`  ✅ [${updated}/${docs.length}] ${displayTitle}`)
  }

  console.log(`\n全部完成！更新了 ${updated} 条记录。`)
  process.exit(0)
}

main().catch((err) => {
  console.error('脚本执行失败:', err)
  process.exit(1)
})
