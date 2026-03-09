import type { CollectionConfig } from 'payload'
import { LOCALES } from '../shared/locales'

/**
 * 公共内容 — 每条记录 = 一种语言的 common.json
 *
 * 对应 i18n/locales/{locale}/common.json（Header / Footer / 错误提示等）
 * 站点隔离通过多租户插件实现（自动按 tenant 过滤）
 */
export const CommonContent: CollectionConfig = {
  slug: 'common-content',
  labels: { singular: '公共内容', plural: '公共内容' },
  access: {
    read: () => true, // 公开读取 — 构建时需要无认证访问
  },
  admin: {
    useAsTitle: 'displayTitle',
    defaultColumns: ['locale', 'updatedAt'],
    description: '管理 Header / Footer / 错误提示等公共文案',
    listSearchableFields: ['displayTitle', 'locale'],
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
            return `common - ${siblingData.locale}`
          },
        ],
      },
    },
    {
      name: 'locale',
      label: '语言',
      type: 'select',
      required: true,
      options: [...LOCALES],
    },
    {
      name: 'content',
      label: 'JSON 内容',
      type: 'json',
      required: true,
      admin: {
        description: '完整的 common.json 内容（Header / Footer / 错误提示等公共文案）',
      },
    },
  ],
  // 注意：唯一性由 tenant + locale 组合保证（插件自动注入 tenant 字段）
}
