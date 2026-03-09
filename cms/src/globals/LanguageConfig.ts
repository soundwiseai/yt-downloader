import type { GlobalConfig } from 'payload'
import { LOCALES } from '../shared/locales'

/**
 * 语言配置 — 只读展示，数据从前端项目 i18n 配置自动同步
 *
 * 左侧菜单显示入口，运营可以查看当前支持的所有语言
 * 所有 Collection 的语言选项都从 shared/locales.ts 读取
 */
export const LanguageConfig: GlobalConfig = {
  slug: 'language-config',
  label: '语言配置',
  admin: {
    description: `当前支持 ${LOCALES.length} 种语言（自动同步自前端项目 i18n 配置，无需手动维护）`,
  },
  hooks: {
    // 每次读取时，把 shared/locales.ts 的数据注入进来
    beforeRead: [
      ({ doc }) => {
        return {
          ...doc,
          totalCount: LOCALES.length,
          languages: LOCALES.map((l, i) => ({
            index: i + 1,
            code: l.value,
            name: l.label,
          })),
        }
      },
    ],
  },
  fields: [
    {
      name: 'totalCount',
      label: '支持语言总数',
      type: 'number',
      admin: { readOnly: true },
    },
    {
      name: 'languages',
      label: '语言列表',
      type: 'array',
      admin: {
        readOnly: true,
        description: '以下语言自动同步自前端项目 nuxt.config.ts 的 i18n 配置，所有页面模块共用',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'index', label: '#', type: 'number', admin: { readOnly: true, width: '15%' } },
            { name: 'code', label: '语言代码', type: 'text', admin: { readOnly: true, width: '35%' } },
            { name: 'name', label: '语言名称', type: 'text', admin: { readOnly: true, width: '50%' } },
          ],
        },
      ],
    },
  ],
}
