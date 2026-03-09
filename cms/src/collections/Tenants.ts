import type { CollectionConfig } from 'payload'

/**
 * 租户（站点）集合 — 定义 SEO 矩阵中的各个站点
 *
 * 多租户插件要求必须有此集合，用于存储站点信息
 * 每条记录代表一个站点（y2mp4 / y2bmp3 / y2script）
 */
export const Tenants: CollectionConfig = {
  slug: 'tenants',
  labels: { singular: '站点', plural: '站点' },
  access: {
    read: () => true, // 公开读取 — 构建时需要查询 tenant 信息
  },
  admin: {
    useAsTitle: 'name',
    description: 'SEO 矩阵站点管理 — 通过左上角切换器选择要管理的站点',
  },
  fields: [
    {
      name: 'name',
      label: '站点名称',
      type: 'text',
      required: true,
      admin: { description: '如：y2mp4、y2bmp3、y2script' },
    },
    {
      name: 'slug',
      label: '站点标识',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: '用于 API 查询和数据导出的标识符' },
    },
    {
      name: 'domain',
      label: '域名',
      type: 'text',
      required: true,
      admin: { description: '站点域名，如 y2mp4.com' },
    },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      defaultValue: 'staging',
      options: [
        { label: '已上线', value: 'live' },
        { label: '测试中', value: 'staging' },
      ],
    },
    {
      name: 'repo',
      label: 'GitHub Repo',
      type: 'text',
      admin: { description: '如 soundwiseai/yt-downloader' },
    },
  ],
}
