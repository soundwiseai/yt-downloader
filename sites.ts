/**
 * 多站点配置文件（由构建脚本从 CMS 自动生成，请勿手动编辑）
 *
 * 生成时间: 2026-03-13T16:05:24.754Z
 * 数据来源: https://cms.musely.io / tenant: y2mp4
 *
 * 要修改站点配置，请在 CMS 后台的「页面内容 → 路由 & 站点配置」中编辑，
 * 下次构建时会自动更新。
 */
export default [
    {
        name: 'mp4',
        i18n: 'mp4',
        seo: 'mp4_seo',
        url: '/',
        template: 'home',
        header: false,
        footer: false
    },
    {
        name: 'm4a',
        i18n: 'm4a',
        seo: 'm4a_seo',
        url: '/youtube-to-m4a',
        template: 'home',
        header: false,
        footer: true
    },
    {
        name: 'mp3',
        i18n: 'mp3',
        seo: 'mp3_seo',
        url: '/youtube-to-mp3',
        template: 'home',
        header: false,
        footer: true
    },
    {
        name: 'transcript',
        i18n: 'transcript',
        seo: 'transcript_seo',
        url: '/youtube-transcript-generator',
        template: 'transcript',
        header: true,
        footer: true
    },
    {
        name: 'downloader',
        i18n: 'downloader',
        seo: 'downloader_seo',
        url: '/youtube-video-downloader',
        template: 'home',
        header: true,
        footer: true
    }
]
