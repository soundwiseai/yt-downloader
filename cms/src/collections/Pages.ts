import type { CollectionConfig } from 'payload'

const LOCALES = [
  { label: 'English', value: 'en' },
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁體中文', value: 'zh-TW' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
  { label: 'Español', value: 'es' },
  { label: 'Español (Latam)', value: 'es-419' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Português', value: 'pt' },
  { label: 'Português (BR)', value: 'pt-br' },
  { label: 'Italiano', value: 'it' },
  { label: 'Русский', value: 'ru' },
  { label: 'العربية', value: 'ar' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'Türkçe', value: 'tr' },
  { label: 'Tiếng Việt', value: 'vi' },
  { label: 'ภาษาไทย', value: 'th' },
  { label: 'Bahasa Indonesia', value: 'id' },
  { label: 'Bahasa Melayu', value: 'ms' },
  { label: 'Filipino', value: 'fil' },
]

const PAGE_KEYS = [
  { label: 'MP4 下载器', value: 'mp4' },
  { label: 'MP3 转换器', value: 'mp3' },
  { label: '视频下载器', value: 'downloader' },
  { label: '字幕提取器', value: 'transcript' },
  { label: 'M4A 转换器', value: 'm4a' },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: '页面内容',
    plural: '页面内容',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['pageKey', 'locale', 'title'],
    description: '管理各页面的标题、描述、按钮等文案内容',
  },
  fields: [
    {
      name: 'pageKey',
      type: 'select',
      required: true,
      label: '页面类型',
      options: PAGE_KEYS,
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      label: '语言',
      options: LOCALES,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '页面标题 (H1)',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: '副标题 / 标语',
    },
    {
      name: 'description',
      type: 'textarea',
      label: '页面描述（展示用）',
    },
    {
      name: 'ctaButton',
      type: 'text',
      label: '按钮文案',
    },
    {
      name: 'placeholder',
      type: 'text',
      label: '输入框占位文字',
    },
  ],
}
