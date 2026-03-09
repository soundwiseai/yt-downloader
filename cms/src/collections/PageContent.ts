import type { CollectionConfig } from 'payload'
import { LOCALES, LOCALE_CODES } from '../shared/locales'

/**
 * 页面内容 — 每条记录 = 一个页面的一种语言的 i18n JSON
 *
 * 例：pageKey="mp4", locale="en" → en/mp4.json
 *
 * 站点隔离通过多租户插件实现（自动按 tenant 过滤）
 * 创建时支持「所有语言」模式，一键为页面创建全部语言版本
 */
export const PageContent: CollectionConfig = {
  slug: 'page-content',
  labels: { singular: '页面内容', plural: '页面内容' },
  access: {
    read: () => true, // 公开读取 — 内容最终都是公开 HTML，构建时需要无认证访问
  },
  admin: {
    useAsTitle: 'displayTitle',
    defaultColumns: ['pageKey', 'locale', 'updatedAt'],
    description: '管理各页面的 i18n JSON 内容',
    listSearchableFields: ['displayTitle', 'pageKey', 'locale'],
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // 仅在创建时处理「所有语言」批量创建
        if (operation !== 'create' || data?.createMode !== 'all') return data

        const { createMode, ...cleanData } = data

        // 找出该 pageKey 已存在哪些语言
        const existing = await req.payload.find({
          collection: 'page-content',
          where: { pageKey: { equals: cleanData.pageKey } },
          limit: 100,
        })
        const existingLocales = new Set(existing.docs.map((d: any) => d.locale))
        const localesToCreate = LOCALE_CODES.filter((code) => !existingLocales.has(code))

        if (localesToCreate.length === 0) {
          throw new Error(`页面「${cleanData.pageKey}」所有语言版本都已存在`)
        }

        const [firstLocale, ...restLocales] = localesToCreate
        cleanData.locale = firstLocale
        cleanData.displayTitle = `${cleanData.pageKey} - ${firstLocale}`
        if (!cleanData.content) cleanData.content = {}

        for (const locale of restLocales) {
          await req.payload.create({
            collection: 'page-content',
            data: {
              ...cleanData,
              locale,
              displayTitle: `${cleanData.pageKey} - ${locale}`,
              content: cleanData.content || {},
              // 路由配置只在第一条记录上保留，其他语言不重复存储
              urlPath: undefined,
              template: undefined,
              i18nPrefix: undefined,
              seoPrefix: undefined,
              showInHeader: undefined,
              showInFooter: undefined,
            },
          })
        }

        return cleanData
      },
    ],
  },
  fields: [
    {
      name: 'displayTitle',
      label: '显示标题',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return `${siblingData.pageKey} - ${siblingData.locale}`
          },
        ],
      },
    },
    {
      name: 'pageKey',
      label: '页面名称',
      type: 'text',
      required: true,
      admin: {
        description: '页面标识符，如 mp4、mp3、downloader、transcript、m4a',
      },
    },
    {
      name: 'createMode',
      label: '语言模式',
      type: 'radio',
      admin: {
        description: '「所有语言」会自动为该页面创建所有语言版本',
        condition: (_, siblingData) => !siblingData?.id,
      },
      defaultValue: 'all',
      options: [
        { label: '所有语言（自动创建全部）', value: 'all' },
        { label: '指定语言（只创建一个）', value: 'single' },
      ],
    },
    {
      name: 'locale',
      label: '语言',
      type: 'select',
      required: true,
      options: [...LOCALES],
      admin: {
        condition: (_, siblingData) => {
          if (siblingData?.id) return true
          return siblingData?.createMode === 'single'
        },
      },
    },
    // ── 路由配置（页面级，只需在任一语言上设置，export 脚本会自动提取） ──
    {
      type: 'collapsible',
      label: '路由 & 站点配置',
      admin: {
        description: '配置页面的 URL 路径、模板类型、导航显示等。每个 pageKey 只需设置一次。',
      },
      fields: [
        {
          name: 'urlPath',
          label: 'URL 路径',
          type: 'text',
          admin: {
            description: '页面的 URL 路径，如 /youtube-to-mp3（必须以 / 开头）',
          },
        },
        {
          name: 'template',
          label: '渲染模板',
          type: 'select',
          defaultValue: 'home',
          options: [
            { label: 'Home（下载器通用模板）', value: 'home' },
            { label: 'Transcript（字幕提取模板）', value: 'transcript' },
          ],
          admin: {
            description: '选择此页面使用的前端组件模板',
          },
        },
        {
          name: 'i18nPrefix',
          label: 'i18n 前缀',
          type: 'text',
          admin: {
            description: 'i18n 翻译键前缀，如 mp3、downloader（通常与 pageKey 相同）',
          },
        },
        {
          name: 'seoPrefix',
          label: 'SEO 前缀',
          type: 'text',
          admin: {
            description: 'SEO 配置前缀，如 mp3_seo、downloader_seo',
          },
        },
        {
          name: 'showInHeader',
          label: '顶部导航显示',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: '是否在顶部导航栏中显示此页面链接',
          },
        },
        {
          name: 'showInFooter',
          label: '底部导航显示',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: '是否在底部导航栏中显示此页面链接',
          },
        },
      ],
    },
    {
      name: 'content',
      label: 'JSON 内容',
      type: 'json',
      admin: {
        description: '完整的页面 i18n JSON，可先留空后续填写',
      },
    },
  ],
  // 注意：唯一性由 tenant + pageKey + locale 组合保证（插件自动注入 tenant 字段）
}
