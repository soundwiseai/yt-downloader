/**
 * 多站点配置文件
 *
 * 此文件集中管理所有站点的配置信息，包括：
 * - name: 站点名称 / pageKey（页面标识符）
 * - i18n: 国际化前缀，用于 i18n 文件中的键名前缀
 * - seo: SEO 相关配置的前缀
 * - url: 站点的 URL 路径
 * - template: 渲染模板（home = 下载器通用 / transcript = 字幕提取）
 * - header: 是否在顶部导航栏显示
 * - footer: 是否在底部导航栏显示
 *
 * 注意：此文件可由 CMS export 脚本自动生成。
 * 如果 CMS 中配置了路由字段，运行 cd cms && npm run export 会覆盖此文件。
 */
export default [
    {
        name: 'videoDownloader',
        i18n: 'downloader',
        seo: 'downloader_seo',
        url: '/youtube-video-downloader',
        template: 'home',
        header: true,
        footer: true
    },
    {
        name: 'mp3Converter',
        i18n: 'mp3',
        seo: 'mp3_seo',
        url: '/youtube-to-mp3',
        template: 'home',
        header: false,
        footer: true
    },
    {
        name: 'transcribeGenerator',
        i18n: 'transcript',
        seo: 'transcript_seo',
        url: '/youtube-transcript-generator',
        template: 'transcript',
        header: true,
        footer: true
    },
    {
        name: 'youtube2m4a',
        i18n: 'm4a',
        seo: 'm4a_seo',
        url: '/youtube-to-m4a',
        template: 'home',
        header: false,
        footer: true
    }
]
