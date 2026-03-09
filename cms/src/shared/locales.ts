/**
 * 语言配置 — 从前端项目 nuxt.config.ts 的 i18n 配置同步
 *
 * 所有 collection 的语言选项都从这里读取，保持单一数据源
 */
export const LOCALES = [
  { label: 'English', value: 'en' },
  { label: 'العربية', value: 'ar' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Español', value: 'es' },
  { label: 'Español (Latinoamérica)', value: 'es-419' },
  { label: 'Français', value: 'fr' },
  { label: 'हिन्दी', value: 'hi' },
  { label: 'Bahasa Indonesia', value: 'id' },
  { label: 'Italiano', value: 'it' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
  { label: 'Português', value: 'pt' },
  { label: 'Português (Brasil)', value: 'pt-br' },
  { label: 'Русский', value: 'ru' },
  { label: 'ภาษาไทย', value: 'th' },
  { label: 'Türkçe', value: 'tr' },
  { label: 'Tiếng Việt', value: 'vi' },
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁體中文', value: 'zh-TW' },
] as const

export const LOCALE_CODES = LOCALES.map((l) => l.value)
