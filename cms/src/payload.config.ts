import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import path from 'path'
import { fileURLToPath } from 'url'
import { zh } from '@payloadcms/translations/languages/zh'
import { en } from '@payloadcms/translations/languages/en'

import { Users } from './collections/Users'
import { Tenants } from './collections/Tenants'
import { PageContent } from './collections/PageContent'
import { CommonContent } from './collections/CommonContent'
import { LanguageConfig } from './globals/LanguageConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// 统一使用 Postgres（Neon 远程数据库，单库 + 多租户隔离）
const dbAdapter = postgresAdapter({
  pool: { connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || '' },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Musely CMS',
    },
  },
  i18n: {
    supportedLanguages: { zh, en },
    fallbackLanguage: 'zh',
  },
  editor: lexicalEditor(),
  collections: [Users, Tenants, PageContent, CommonContent],
  globals: [LanguageConfig],
  plugins: [
    multiTenantPlugin({
      collections: {
        'page-content': {},
        'common-content': {},
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'y2mp4-cms-default-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: dbAdapter,
  sharp,
})
