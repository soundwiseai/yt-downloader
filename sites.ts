/**
 * 多站点配置文件
 * 
 * 此文件集中管理所有站点的配置信息，包括：
 * - name: 站点名称，对应 i18n 翻译键（这个站点在主站语言文件中的名称）
 * - i18n: 国际化前缀，用于 i18n 文件中的键名前缀（这个站点在语言文件中的前缀）
 * - seo: SEO 相关配置的前缀（这个站点的 SEO 配置的前缀）
 * - url: 站点的 URL 路径（对应 vue page 文件的路径）
 * - header: 是否在顶部导航栏显示（true 表示显示，false 表示不显示）
 * - footer: 是否在底部导航栏显示（true 表示显示，false 表示不显示）
 * 
 * 添加新站点时，只需在此数组中添加新对象，其他组件会自动更新
 * 包括：Header、Footer、SEO、预渲染路由、Sitemap 等
 */
export default [
    {
        name: 'videoDownloader',
        i18n: 'downloader',
        seo: 'downloader_seo',
        url: '/youtube-video-downloader',
        header: true,
        footer: true
    },
    {
        name: 'mp3Converter',
        i18n: 'mp3',
        seo: 'mp3_seo',
        url: '/youtube-to-mp3',
        header: true,
        footer: true
    },
    {
        name: 'transcribeGenerator',
        i18n: 'transcript',
        seo: 'transcript_seo',
        url: '/youtube-transcript-generator',
        header: false,
        footer: true
    }
]