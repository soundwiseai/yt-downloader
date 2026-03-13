<template>
  <!-- 根据 sites.ts 中的 template 字段选择渲染组件 -->
  <Home v-if="siteConfig?.template === 'home' || isLocaleHome" :locale="currentLocale" />

  <div v-else-if="siteConfig?.template === 'transcript'" id="app">
    <div class="container">
      <Transcription />
      <Reviews />
      <VedioConvertDeps />
      <Features />
      <Benefits />
      <FAQ />
    </div>
  </div>

  <!-- 未匹配的路由 → 404 -->
  <div v-else class="not-found">
    <h1>404 - Page Not Found</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Home from '@/components/Home.vue'
import Transcription from '@/components/Transcription.vue'
import Reviews from '@/components/Reviews.vue'
import VedioConvertDeps from '@/components/VedioConvertDeps.vue'
import Features from '@/components/Features.vue'
import Benefits from '@/components/Benefits.vue'
import FAQ from '@/components/FAQ.vue'
import sites from '@/sites'
import { SUPPORTED_LOCALE_CODES, resolveSiteForPath } from '@/utils/site-config'

const route = useRoute()

// slug 是数组，例如：
// /youtube-to-mp3       → ['youtube-to-mp3']
// /es/youtube-to-mp3    → ['es', 'youtube-to-mp3']
// /es                   → ['es']
const slugParts = (route.params.slug as string[]) || []

// 已知语言列表（从 nuxt.config.ts 同步）
const LOCALE_CODES = [...SUPPORTED_LOCALE_CODES]

// 解析 slug：判断第一段是否是 locale
let currentLocale = 'en'
let pagePath = ''

if (slugParts.length === 1) {
  // 单段路径：可能是 locale（如 /es）或 page（如 /youtube-to-mp3）
  if (LOCALE_CODES.includes(slugParts[0])) {
    currentLocale = slugParts[0]
    pagePath = '' // locale 首页
  } else {
    pagePath = `/${slugParts[0]}`
  }
} else if (slugParts.length === 2) {
  // 双段路径：locale + page（如 /es/youtube-to-mp3）
  if (LOCALE_CODES.includes(slugParts[0])) {
    currentLocale = slugParts[0]
    pagePath = `/${slugParts[1]}`
  } else {
    pagePath = '/__not_found__'
  }
} else if (slugParts.length > 2) {
  // 超过两段 → 404
  pagePath = '/__not_found__'
}

// 是否是某个 locale 的首页（如 /es、/ja）
const isLocaleHome = pagePath === '' && currentLocale !== 'en'

// 从 sites.ts 查找匹配的站点配置
const siteConfig = pagePath ? sites.find((site: any) => site.url === pagePath) : resolveSiteForPath(route.path)

// SEO
const { setSeoMeta } = usePageSeo()
setSeoMeta()
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-family: sans-serif;
}
</style>
