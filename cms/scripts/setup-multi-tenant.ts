/**
 * 多租户数据迁移脚本
 *
 * 1. 创建 3 个 tenant 记录（y2mp4, y2bmp3, y2script）
 * 2. 给现有 y2mp4 数据关联 tenant
 * 3. 从 y2bmp3/y2script 独立库导入数据到主库并关联 tenant
 *
 * 用法：NODE_ENV=development npx tsx scripts/setup-multi-tenant.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { Client } from 'pg'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 手动加载 .env
const envPath = path.resolve(__dirname, '../.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach((line) => {
    const [key, ...vals] = line.split('=')
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim()
  })
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const MAIN_DB = process.env.POSTGRES_URL || ''
const Y2BMP3_DB = MAIN_DB.replace('/neondb?', '/cms_y2bmp3?')
const Y2SCRIPT_DB = MAIN_DB.replace('/neondb?', '/cms_y2script?')

const TENANTS = [
  { name: 'y2mp4', slug: 'y2mp4', domain: 'y2mp4.com', status: 'live', repo: 'soundwiseai/yt-downloader' },
  { name: 'y2bmp3', slug: 'y2bmp3', domain: 'y2bmp3.com', status: 'staging', repo: 'Ericgood/y2bmp3' },
  { name: 'y2script', slug: 'y2script', domain: 'y2script.com', status: 'staging', repo: 'Ericgood/y2script' },
]

async function main() {
  const payload = await getPayload({ config })

  // Step 1: 创建 tenant 记录
  console.log('\n=== Step 1: 创建 Tenant 记录 ===\n')
  const tenantIds: Record<string, number> = {}

  for (const t of TENANTS) {
    // 检查是否已存在
    const existing = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: t.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      tenantIds[t.slug] = existing.docs[0].id as number
      console.log(`  ⏭️ ${t.name} 已存在 (ID: ${tenantIds[t.slug]})`)
    } else {
      const created = await payload.create({
        collection: 'tenants',
        data: t,
      })
      tenantIds[t.slug] = created.id as number
      console.log(`  ✅ ${t.name} 创建成功 (ID: ${tenantIds[t.slug]})`)
    }
    await sleep(200)
  }

  // Step 2: 给现有 y2mp4 数据关联 tenant（直接用 SQL）
  console.log('\n=== Step 2: 关联 y2mp4 数据到 tenant ===\n')
  const mainClient = new Client({ connectionString: MAIN_DB })
  await mainClient.connect()

  // 检查 page_content 表是否有 tenant_id 列（由插件自动添加）
  const colCheck = await mainClient.query(`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'page_content' AND column_name = 'tenant_id'
  `)

  if (colCheck.rows.length === 0) {
    console.log('  ⚠️ tenant_id 列还不存在，等 Payload 自动创建...')
    // 需要通过 Payload API 触发
  }

  // 更新现有 y2mp4 数据的 tenant_id
  const updatePages = await mainClient.query(
    'UPDATE page_content SET tenant_id = $1 WHERE tenant_id IS NULL',
    [tenantIds.y2mp4],
  )
  console.log(`  page_content: 更新了 ${updatePages.rowCount} 条 → y2mp4`)

  const updateCommons = await mainClient.query(
    'UPDATE common_content SET tenant_id = $1 WHERE tenant_id IS NULL',
    [tenantIds.y2mp4],
  )
  console.log(`  common_content: 更新了 ${updateCommons.rowCount} 条 → y2mp4`)

  // Step 3: 从 y2bmp3 库导入数据
  console.log('\n=== Step 3: 导入 y2bmp3 数据 ===\n')
  await importFromDB(mainClient, Y2BMP3_DB, tenantIds.y2bmp3, 'y2bmp3')

  // Step 4: 从 y2script 库导入数据
  console.log('\n=== Step 4: 导入 y2script 数据 ===\n')
  await importFromDB(mainClient, Y2SCRIPT_DB, tenantIds.y2script, 'y2script')

  await mainClient.end()

  console.log('\n=== 多租户迁移完成！===')
  console.log(`  Tenants: ${Object.entries(tenantIds).map(([k, v]) => `${k}(${v})`).join(', ')}`)

  process.exit(0)
}

async function importFromDB(
  mainClient: Client,
  sourceDbUrl: string,
  tenantId: number,
  siteName: string,
) {
  const sourceClient = new Client({ connectionString: sourceDbUrl })
  await sourceClient.connect()

  // 导入 page_content
  const pages = await sourceClient.query(
    'SELECT page_key, locale, content, display_title FROM page_content',
  )
  let pageImported = 0
  for (const row of pages.rows) {
    try {
      await mainClient.query(
        `INSERT INTO page_content (page_key, locale, content, display_title, tenant_id, updated_at, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         ON CONFLICT DO NOTHING`,
        [row.page_key, row.locale, JSON.stringify(row.content), row.display_title, tenantId],
      )
      pageImported++
    } catch (e: any) {
      console.log(`  ⚠️ ${row.page_key}-${row.locale}: ${e.message.slice(0, 60)}`)
    }
    await sleep(50)
  }

  // 导入 common_content
  const commons = await sourceClient.query(
    'SELECT locale, content, display_title FROM common_content',
  )
  let commonImported = 0
  for (const row of commons.rows) {
    try {
      await mainClient.query(
        `INSERT INTO common_content (locale, content, display_title, tenant_id, updated_at, created_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         ON CONFLICT DO NOTHING`,
        [row.locale, JSON.stringify(row.content), row.display_title, tenantId],
      )
      commonImported++
    } catch (e: any) {
      console.log(`  ⚠️ common-${row.locale}: ${e.message.slice(0, 60)}`)
    }
    await sleep(50)
  }

  await sourceClient.end()
  console.log(`  ✅ ${siteName}: ${pageImported} 页面 + ${commonImported} 公共`)
}

main().catch((e) => {
  console.error('迁移失败:', e)
  process.exit(1)
})
