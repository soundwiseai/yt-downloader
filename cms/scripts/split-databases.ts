/**
 * 数据库拆分脚本 — 从单库按 site 字段拆分到 3 个独立数据库
 *
 * 流程：
 * 1. 从旧库（neondb）dump schema 到新库
 * 2. 按 site 把数据复制到对应的新库
 * 3. 清理旧库中非 y2mp4 的数据
 *
 * 用法：NODE_ENV=development npx tsx scripts/split-databases.ts
 */

import { Client } from 'pg'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const OLD_DB = 'postgresql://neondb_owner:npg_p0FQ5DkilhtJ@ep-plain-morning-ah2f8zf7-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require'

const SITE_DBS: Record<string, string> = {
  y2mp4: OLD_DB,
  y2bmp3: OLD_DB.replace('/neondb?', '/cms_y2bmp3?'),
  y2script: OLD_DB.replace('/neondb?', '/cms_y2script?'),
}

async function getTableDDL(client: Client): Promise<string[]> {
  // 获取所有建表 DDL（通过查 information_schema 手动构建）
  // 但这太复杂了，我们用另一种方式：直接在新库上启动 Payload 让它 push schema
  // 所以这个脚本只负责数据迁移
  return []
}

async function main() {
  console.log('=== 数据库拆分：从单库迁移到独立库 ===\n')

  // Step 1: 从旧库读取各站点数据
  const oldClient = new Client({ connectionString: OLD_DB })
  await oldClient.connect()

  const sites = ['y2bmp3', 'y2script'] as const

  for (const site of sites) {
    console.log(`\n--- 处理 ${site} ---`)

    // 读取该站点的 page_content
    const pages = await oldClient.query(
      'SELECT page_key, locale, content, display_title FROM page_content WHERE site = $1',
      [site],
    )
    console.log(`  读取 page_content: ${pages.rowCount} 条`)

    // 读取该站点的 common_content
    const commons = await oldClient.query(
      'SELECT locale, content, display_title FROM common_content WHERE site = $1',
      [site],
    )
    console.log(`  读取 common_content: ${commons.rowCount} 条`)

    // 连接目标库
    const targetClient = new Client({ connectionString: SITE_DBS[site] })
    await targetClient.connect()

    // 先创建必要的 enum 类型和表（如果不存在）
    // Payload 使用的 enum 类型
    await targetClient.query(`
      DO $$ BEGIN
        CREATE TYPE enum_page_content_locale AS ENUM (
          'en','ar','de','es','es-419','fr','hi','id','it','ja','ko','pt','pt-br','ru','th','tr','vi','zh-CN','zh-TW'
        );
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
    `)
    await targetClient.query(`
      DO $$ BEGIN
        CREATE TYPE enum_page_content_create_mode AS ENUM ('all','single');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
    `)
    await targetClient.query(`
      DO $$ BEGIN
        CREATE TYPE enum_common_content_locale AS ENUM (
          'en','ar','de','es','es-419','fr','hi','id','it','ja','ko','pt','pt-br','ru','th','tr','vi','zh-CN','zh-TW'
        );
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
    `)

    // 创建 page_content 表（新 schema，无 site 字段）
    await targetClient.query(`
      CREATE TABLE IF NOT EXISTS page_content (
        id SERIAL PRIMARY KEY,
        display_title VARCHAR,
        page_key VARCHAR NOT NULL,
        create_mode enum_page_content_create_mode DEFAULT 'all',
        locale enum_page_content_locale NOT NULL,
        content JSONB,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(page_key, locale)
      );
    `)

    // 创建 common_content 表（新 schema，无 site 字段）
    await targetClient.query(`
      CREATE TABLE IF NOT EXISTS common_content (
        id SERIAL PRIMARY KEY,
        display_title VARCHAR,
        locale enum_common_content_locale NOT NULL UNIQUE,
        content JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // 插入 page_content 数据
    let pageImported = 0
    for (const row of pages.rows) {
      try {
        await targetClient.query(
          `INSERT INTO page_content (page_key, locale, content, display_title, updated_at, created_at)
           VALUES ($1, $2, $3, $4, NOW(), NOW())
           ON CONFLICT (page_key, locale) DO NOTHING`,
          [
            row.page_key,
            row.locale,
            JSON.stringify(row.content),
            `${row.page_key} - ${row.locale}`,
          ],
        )
        pageImported++
      } catch (e: any) {
        console.log(`  ⚠️ page ${row.page_key}-${row.locale}: ${e.message.slice(0, 60)}`)
      }
      await sleep(50)
    }

    // 插入 common_content 数据
    let commonImported = 0
    for (const row of commons.rows) {
      try {
        await targetClient.query(
          `INSERT INTO common_content (locale, content, display_title, updated_at, created_at)
           VALUES ($1, $2, $3, NOW(), NOW())
           ON CONFLICT (locale) DO NOTHING`,
          [row.locale, JSON.stringify(row.content), `common - ${row.locale}`],
        )
        commonImported++
      } catch (e: any) {
        console.log(`  ⚠️ common ${row.locale}: ${e.message.slice(0, 60)}`)
      }
      await sleep(50)
    }

    await targetClient.end()
    console.log(`  ✅ ${site} 导入完成: ${pageImported} 页面 + ${commonImported} 公共`)
  }

  // Step 2: 清理旧库（y2mp4）
  console.log('\n--- 清理旧库 y2mp4 ---')

  // 删除非 y2mp4 数据
  const delPages = await oldClient.query("DELETE FROM page_content WHERE site != 'y2mp4'")
  console.log(`  删除非 y2mp4 的 page_content: ${delPages.rowCount} 条`)

  const delCommons = await oldClient.query("DELETE FROM common_content WHERE site != 'y2mp4'")
  console.log(`  删除非 y2mp4 的 common_content: ${delCommons.rowCount} 条`)

  // 更新 displayTitle（去掉 [y2mp4] 前缀）
  await oldClient.query("UPDATE page_content SET display_title = page_key || ' - ' || locale")
  await oldClient.query("UPDATE common_content SET display_title = 'common - ' || locale")
  console.log('  更新 displayTitle 格式')

  await oldClient.end()

  console.log('\n=== 数据库拆分完成！===')
  console.log('  neondb       → y2mp4 数据（已清理其他站点）')
  console.log('  cms_y2bmp3   → y2bmp3 数据')
  console.log('  cms_y2script → y2script 数据')
  console.log('\n下一步：用 ./start-cms.sh <站点> 启动 CMS，Payload 会自动同步完整 schema')

  process.exit(0)
}

main().catch((e) => {
  console.error('迁移失败:', e)
  process.exit(1)
})
