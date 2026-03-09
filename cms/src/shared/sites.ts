/**
 * 站点配置 — SEO 矩阵的多站点定义
 *
 * 所有 collection 的站点选项都从这里读取
 */
export const SITES = [
  { label: 'y2mp4.com（YouTube to MP4）', value: 'y2mp4' },
  { label: 'y2bmp3.com（YouTube to MP3）', value: 'y2bmp3' },
  { label: 'y2script.com（YouTube Transcript）', value: 'y2script' },
] as const

export const SITE_CODES = SITES.map((s) => s.value)
