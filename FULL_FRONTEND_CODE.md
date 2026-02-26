# Y2mp4.com - 前端完整代码

> YouTube to MP4 在线下载工具，基于 Nuxt 3 + Vue 3 + i18n（19 种语言）
> GitHub: https://github.com/soundwiseai/yt-downloader
> 线上地址: https://y2mp4.com

---

## 项目概览

| 项目 | 详情 |
|------|------|
| **框架** | Nuxt 3 + Vue 3 |
| **路由** | Nuxt 自动路由（文件系统） |
| **样式** | Scoped CSS（无 UI 框架） |
| **字体** | Poppins（标题）+ Open Sans（正文） |
| **主色** | `#2563EB`（蓝色） |
| **国际化** | @nuxtjs/i18n，19 种语言 |
| **部署** | `yarn generate` 生成静态文件，SCP 到 VPS |
| **后端** | VPS 上 Node.js Express + yt-dlp CLI |
| **反向代理** | Caddy（API → localhost:3000，静态文件 → /yt/dist） |

## 目录结构

```
yt-downloader/
├── app.vue                        # 根组件（全局样式、GA/Clarity、Header+Footer）
├── pages/
│   └── index.vue                  # 首页入口（渲染 Home 组件）
├── components/
│   ├── Home.vue                   # 首页布局组合
│   ├── Header.vue                 # 顶部导航栏
│   ├── MainContent.vue            # 核心：URL 输入 + 格式列表 + 下载按钮
│   ├── Reviews.vue                # 用户评价轮播
│   ├── VedioConvertDeps.vue       # "如何转换" 步骤说明
│   ├── Features.vue               # 功能特点 Grid
│   ├── Benefits.vue               # 优势说明（图文交替）
│   └── FAQ.vue                    # 常见问题手风琴
├── composables/
│   └── usePageSeo.ts              # SEO meta + hreflang 生成
├── i18n/
│   ├── utils.js                   # 多站点 i18n 工具函数
│   └── locales/                   # 19 种语言 JSON 文件
├── sites.ts                       # 多站点配置（URL、i18n前缀、SEO前缀）
├── nuxt.config.ts                 # Nuxt 配置（i18n、Vite proxy、预渲染）
├── package.json                   # 依赖
└── design-spec.jsonc              # 设计规范 token
```

---

## 1. package.json

```json
{
  "name": "nuxt-app",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "@nuxt/image": "1.10.0",
    "@nuxtjs/i18n": "9.5.5",
    "axios": "^1.9.0",
    "nuxt": "^3.17.5",
    "vue": "^3.5.16",
    "vue-router": "^4.5.1"
  },
  "packageManager": "yarn@1.22.22"
}
```

---

## 2. nuxt.config.ts

```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/image'],
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ar', name: 'العربية', file: 'ar.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'es-419', name: 'Español (Latinoamérica)', file: 'es-419.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'hi', name: 'हिन्दी', file: 'hi.json' },
      { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'ko', name: '한국어', file: 'ko.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'pt-br', name: 'Português (Brasil)', file: 'pt-br.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'zh-TW', name: '繁體中文', file: 'zh-TW.json' },
      { code: 'zh-CN', name: '简体中文', file: 'zh-CN.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ]
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://y2mp4.com',
          changeOrigin: true,
          secure: true
        }
      }
    }
  },
  nitro: {
    prerender: {
      routes: (() => {
        const sites = require('./sites').default;
        const locales = [
          'en', 'ar', 'de', 'es', 'es-419', 'fr', 'hi', 'id', 'it',
          'ja', 'ko', 'pt', 'pt-br', 'th', 'tr', 'vi', 'zh-TW', 'zh-CN', 'ru'
        ];
        const rootRoutes = locales.map(locale => locale === 'en' ? '/' : `/${locale}`);
        const siteRoutes: string[] = [];
        locales.forEach(locale => {
          sites.forEach((site: {url: string}) => {
            if (locale === 'en') {
              siteRoutes.push(site.url);
            } else {
              siteRoutes.push(`/${locale}${site.url}`);
            }
          });
        });
        return [...rootRoutes, ...siteRoutes];
      })()
    }
  }
})
```

---

## 3. sites.ts（多站点配置）

```typescript
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
        header: false,
        footer: true
    },
    {
        name: 'transcribeGenerator',
        i18n: 'transcript',
        seo: 'transcript_seo',
        url: '/youtube-transcript-generator',
        header: true,
        footer: true
    },
    {
        name: 'youtube2m4a',
        i18n: 'm4a',
        seo: 'm4a_seo',
        url: '/youtube-to-m4a',
        header: false,
        footer: true
    }
]
```

---

## 4. i18n/utils.js（多站点 i18n 工具）

```javascript
import sites from "~/sites"

// 根据子站路径返回对应的 i18n 字符串
export const _t = (str) => {
    const route = useRoute()
    const { t, te } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url) && te(`${site.i18n}_${str}`)) {
            return t(`${site.i18n}_${str}`)
        }
    }
    return t(str)
}

// 判断各子站路径是否存在对应的 i18n 字符串
export const _te = (str) => {
    const route = useRoute()
    const { te } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url) && te(`${site.i18n}_${str}`)) {
            return te(`${site.i18n}_${str}`)
        }
    }
    return te(str)
}

export const _tm = (str) => {
    const route = useRoute()
    const { tm, te } = useI18n()
    for (const site of sites) {
        if (route.path.endsWith(site.url) && te(`${site.i18n}_${str}`)) {
            return tm(`${site.i18n}_${str}`)
        }
    }
    return tm(str)
}
```

---

## 5. composables/usePageSeo.ts

```typescript
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import sites from '@/sites'

const SUPPORTED_LOCALES = [
  { code: 'en', lang: 'en' },
  { code: 'ar', lang: 'ar' },
  { code: 'de', lang: 'de' },
  { code: 'es', lang: 'es' },
  { code: 'es-419', lang: 'es-419' },
  { code: 'fr', lang: 'fr' },
  { code: 'hi', lang: 'hi' },
  { code: 'id', lang: 'id' },
  { code: 'it', lang: 'it' },
  { code: 'ja', lang: 'ja' },
  { code: 'ko', lang: 'ko' },
  { code: 'pt', lang: 'pt' },
  { code: 'pt-br', lang: 'pt-BR' },
  { code: 'th', lang: 'th' },
  { code: 'tr', lang: 'tr' },
  { code: 'vi', lang: 'vi' },
  { code: 'zh-TW', lang: 'zh-Hant' },
  { code: 'zh-CN', lang: 'zh-Hans' },
  { code: 'ru', lang: 'ru' }
]

export const usePageSeo = () => {
  const { t } = useI18n()

  const setSeoMeta = () => {
    const route = useRoute()
    const currentPath = route.path
    const baseUrl = 'https://y2mp4.com'

    const pathWithoutLocale = currentPath.replace(/^\/[a-zA-Z]{2}(-[a-zA-Z0-9]{2,})?(?=\/|$)/, '') || '/'
    const canonicalUrl = `${baseUrl}${currentPath}`
    const normalizedPath = currentPath.replace(/\/$/, '')
    let seoPrefix = 'seo'

    for (const site of sites) {
      if (normalizedPath.endsWith(site.url) || normalizedPath === site.url) {
        seoPrefix = site.seo
        break
      }
    }

    const hreflangLinks = SUPPORTED_LOCALES.map(({ code, lang }) => {
      let localizedPath
      if (code === 'en') {
        localizedPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale
      } else {
        localizedPath = pathWithoutLocale === '/' ? `/${code}` : `/${code}${pathWithoutLocale}`
      }
      return {
        rel: 'alternate',
        hreflang: lang,
        href: `${baseUrl}${localizedPath}`
      }
    })

    useSeoMeta({
      title: () => t(`${seoPrefix}.title`),
      description: () => t(`${seoPrefix}.description`),
      ogTitle: () => t(`${seoPrefix}.ogTitle`),
      ogDescription: () => t(`${seoPrefix}.ogDescription`),
      ogSiteName: () => t('siteName')
    })

    useHead({
      link: [
        { rel: 'canonical', href: canonicalUrl },
        ...hreflangLinks
      ]
    })
  }

  return { setSeoMeta }
}
```

---

## 6. app.vue（根组件）

```vue
<template>
  <div id="app">
    <Header :locale="locale"/>
    <NuxtPage />
    <Footer :locale="locale"/>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { computed, watch } from 'vue'
const route = useRoute()

// 从路径中提取 locale
const getLocaleFromPath = (path) => {
  const pathParts = path.split('/')
  if (pathParts.length > 1 && pathParts[1]) {
    const localePattern = /^[a-z]{2}(-\w+)?$/
    if (localePattern.test(pathParts[1])) {
      return pathParts[1]
    }
  }
  return null
}

const locale = computed(() => {
  const fromParams = route.params.locale
  const fromPath = getLocaleFromPath(route.path)
  return fromParams || fromPath || 'en'
})

useHead({
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    { name: 'server-locale', content: locale.value },
    { 'http-equiv': 'content-language', content: locale.value },
  ],
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-90XNEYE25X',
      async: true
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-90XNEYE25X');
      `
    },
    {
      children: `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "t51z5mynwr");
      `
    }
  ]
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #FFFFFF;
  color: #1E293B;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { cursor: pointer; }
button { cursor: pointer; }
</style>
```

---

## 7. pages/index.vue（首页入口）

```vue
<template>
  <Home :locale="locale" />
</template>

<script setup lang="ts">
import Home from '@/components/Home.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const locale = route.params.locale || 'en'

const { setSeoMeta } = usePageSeo()
setSeoMeta()
</script>
```

---

## 8. components/Home.vue（首页布局组合）

```vue
<template>
  <div id="app">
    <div class="container">
      <MainContent />
      <Reviews />
      <VedioConvertDeps/>
      <Features />
      <Benefits />
      <FAQ />
    </div>
  </div>
</template>

<script setup>
import VedioConvertDeps from './VedioConvertDeps.vue'
import MainContent from './MainContent.vue'
import Features from './Features.vue'
import Benefits from './Benefits.vue'
import Reviews from './Reviews.vue'
import FAQ from './FAQ.vue'

defineProps({
  locale: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
```

---

## 9. components/Header.vue（顶部导航栏）

```vue
<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <span class="site-name" @click="goHome">{{ _t("siteName") }}</span>
      </div>
      <!-- 导航 -->
      <nav class="nav">
        <a
          v-for="site in sites.filter(site => site.header)"
          :key="site.url"
          href="#"
          class="nav-link"
          @click.prevent="goToSite(site.url)"
        >
          {{ _t(site.name) }} &gt;
        </a>

        <!-- 语言选择下拉菜单 -->
        <div class="language-selector">
          <div class="selected-language" @click="toggleLanguageMenu">
            {{ getCurrentLanguageName() }} <span class="dropdown-arrow">▼</span>
          </div>
          <div class="language-dropdown" v-if="showLanguageMenu">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="language-option"
              @click="changeLanguage(lang.code)"
            >
              {{ lang.name }}
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { _t } from '@/i18n/utils'
import sites from '@/sites'

const { locale, locales, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();
const showLanguageMenu = ref(false);

const languages = locales.value;

const goToSite = (url) => {
  const lang = locale.value;
  const prefix = lang === 'en' ? '' : `/${lang}`;
  router.push({ path: `${prefix}${url}` });
};

const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};

const getCurrentLanguageName = () => {
  const currentLang = languages.find(lang => lang.code === locale.value);
  return currentLang ? currentLang.name : 'English';
};

const changeLanguage = async (langCode) => {
  showLanguageMenu.value = false;
  await setLocale(langCode);

  const path = route.path;
  let suffix = '';
  for (const site of sites) {
    if (path.endsWith(site.url)) {
        suffix = site.url;
        break;
    }
  }

  const prefix = langCode === 'en' ? '' : `/${langCode}`;
  const targetPath = `${prefix}${suffix}`;
  router.push({ path: targetPath });
};

const closeLanguageMenu = (event) => {
  if (showLanguageMenu.value && !event.target.closest('.language-selector')) {
    showLanguageMenu.value = false;
  }
};

watch(route, () => {
  showLanguageMenu.value = false;
});

import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  document.addEventListener('click', closeLanguageMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeLanguageMenu);
});

const goHome = () => {
  if (route.path !== '/') {
    router.push({ path: '/' });
  }
}
</script>

<style scoped>
/* Header - Mobile First */
.header {
  background-color: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  width: 100%;
  height: auto;
  min-height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.logo { display: flex; align-items: center; flex-shrink: 0; }

.logo .site-name {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563EB;
  white-space: nowrap;
  cursor: pointer;
  letter-spacing: -0.01em;
  transition: color 200ms ease-out;
}

.logo .site-name:hover { color: #1D4ED8; }

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.75rem;
  width: 100%;
  align-items: flex-start;
}

.nav-link {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.25rem 0;
  cursor: pointer;
  transition: color 200ms ease-out;
  border-bottom: 2px solid transparent;
}

.nav-link:hover { color: #2563EB; text-decoration: none; }

.language-selector {
  position: relative;
  margin-left: 0;
  margin-top: 0.5rem;
  width: 100%;
  cursor: pointer;
}

.selected-language {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 200ms ease-out;
  width: 100%;
  box-sizing: border-box;
}

.selected-language:hover {
  background-color: #EFF6FF;
  border-color: #BFDBFE;
  color: #2563EB;
}

.dropdown-arrow { font-size: 0.625rem; margin-left: 0.5rem; color: #94A3B8; }
.selected-language:hover .dropdown-arrow { color: #2563EB; }

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  min-width: 200px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 0.25rem;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E2E8F0;
  padding: 0.25rem 0;
}

.language-option {
  padding: 0.5rem 1rem;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.language-option:hover { background-color: #EFF6FF; color: #2563EB; }

/* Tablet (>=600px) */
@media (min-width: 600px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    height: 64px;
  }
  .nav {
    flex-direction: row;
    gap: 1rem;
    margin-left: auto;
    margin-top: 0;
    width: auto;
    align-items: center;
  }
  .language-selector { margin-left: 1rem; margin-top: 0; width: auto; }
  .selected-language { width: auto; justify-content: center; }
  .language-dropdown { left: auto; right: 0; width: 240px; }
}

/* Desktop (>=1024px) */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .logo .site-name { font-size: 1.5rem; }
  .nav { gap: 1.5rem; }
  .language-selector { margin-left: 1.5rem; }
}
</style>
```

---

## 10. components/MainContent.vue（核心组件）

> **这是最重要的组件**：URL 输入框 + 调用后端 API 获取格式 + 显示视频信息 + 下载按钮

```vue
<template>
  <main class="main-content">
    <div class="converter-container">
      <!-- 图标 -->
      <div class="icon-container">
        <NuxtImg src="/images/yt_icon.png" alt="YouTube Icon" class="icon" />
      </div>

      <!-- 标题 -->
      <h1 class="title">{{ _t("title") }}</h1>

      <!-- 描述 -->
      <p class="description">
        {{ _t("description") }}
      </p>

      <div class="container">
        <div class="input-wrapper">
          <input type="text" v-model="yt_url" placeholder="https://www.youtube.com/watch?v=..." class="input-box" @paste="onPaste"/>
          <button
            class="download-button2"
            :class="{ 'is-empty': !yt_url.trim(), 'is-loading': loading }"
            :disabled="loading || !yt_url.trim()"
            @click="fetchFormats"
          >
            <span v-if="loading" class="btn-loading">
              <span class="spinner"></span>
            </span>
            <span v-else>{{ _t("download") }}</span>
          </button>
        </div>
      </div>

      <p class="converter-container-tip">
        {{ _t("tip") }}
        <span class="info-container">
          <NuxtImg class="info-icon" :src="`/images/yt_tips.png`" alt="YouTube URL tips icon"/>
          <span class="tooltip">
            <span v-html="_t('tooltipText')"></span>
          </span>
        </span>
      </p>

      <!-- 加载动画 -->
      <div v-if="loading" class="loading-indicator">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>

    <!-- 视频结果卡片 -->
    <div class="container2" v-if="!loading && videoData && videoData?.title">
      <div class="video-card">
        <div class="video-header">
          <NuxtImg :src="videoData.thumbnail" class="thumbnail" alt="Thumbnail" />
          <h2 class="title">{{ videoData.title }}</h2>
        </div>
        <h3 class="formats-title">{{ _t("formats") }}</h3>
        <p class="formats-title-tip">{{ _t("formatsTip") }}</p>
        <p class="formats-save-tip">{{ _t("saveTip") }}</p>
        <div class="formats-list">
          <div v-for="format in videoData.formats" :key="format.format_id" class="format-item">
            <div class="format-details">
              <span class="format-name">{{ videoData.title }}.{{ format.ext }}</span>
              <span class="format-info">{{ format.resolution || _t('audioOnly') }} &bull; {{ (format.filesize / (1024 * 1024)).toFixed(2) }} MB</span>
            </div>
            <a :href="format.url" class="format-download-btn" target="_blank" rel="noopener">
              <svg class="dl-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {{ _t("download") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { _t } from '@/i18n/utils'

const yt_url = ref('')
const videoData = ref({})
const loading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  errorMessage.value = _t("errorGetVideoInfo")
})

const isValidYoutubeUrl = (url) => {
  return url.includes('youtube.');
}

// 粘贴自动触发下载
const onPaste = (event) => {
  let text = (event.clipboardData || window.clipboardData).getData("text");
  yt_url.value = text
  fetchFormats()
}

// 核心：调用后端 API 获取视频格式
const fetchFormats = async () => {
  if (!yt_url.value || !isValidYoutubeUrl(yt_url.value)) {
    alert('请输入有效的 YouTube 视频 URL')
    return
  }

  loading.value = true
  try {
    const response = await axios.get('/api/get-formats', {
      params: { url: yt_url.value }
    })
    videoData.value = response.data
  } catch (error) {
    console.error(errorMessage.value, error)
    alert(errorMessage.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 全局 */
.main-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Hero 区域 - 渐变背景 */
.converter-container {
  background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%);
  padding: 60px 20px;
}

.icon-container { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
.icon { width: 285px; height: auto; }

.title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: #1E293B;
}

.description {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.125rem;
  color: #475569;
  margin: 10px 0 20px;
  line-height: 1.6;
}

.container { display: flex; justify-content: center; margin-top: 40px; }

/* 输入框容器 */
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 100%;
  max-width: 560px;
  height: 56px;
  gap: 10px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border: 2px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: border-color 200ms ease-out;
}
.input-wrapper:focus-within { border-color: #2563EB; }

.input-box {
  flex: 1;
  padding: 0 16px;
  border: none;
  outline: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #1E293B;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 12px;
}

/* 下载按钮 - 三种状态 */
.download-button2 {
  font-family: 'Poppins', sans-serif;
  background-color: #2563EB;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  height: calc(100% - 8px);
  padding: 0 24px;
  border-radius: 8px;
  margin-right: 4px;
  transition: background-color 200ms ease-out;
  max-width: 200px;
}
.download-button2:hover { background-color: #1D4ED8; }

/* 无 URL - 灰色禁用 */
.download-button2.is-empty {
  background-color: #CBD5E1;
  color: #94A3B8;
  cursor: not-allowed;
}

/* 加载中 - 蓝色半透明 */
.download-button2.is-loading {
  background-color: #2563EB;
  cursor: wait;
  opacity: 0.8;
}

.btn-loading { display: flex; align-items: center; justify-content: center; }

.spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.converter-container-tip {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;
  color: #64748B;
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* 视频结果卡片 */
.container2 { display: flex; justify-content: center; align-items: center; padding: 0 20px; }

.video-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.video-header { display: flex; align-items: center; justify-content: center; }
.thumbnail { width: 120px; height: 80px; border-radius: 8px; margin-right: 12px; object-fit: cover; }
.video-card .title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1E293B;
  flex-grow: 1;
  text-align: left;
}

.formats-title { font-family: 'Poppins', sans-serif; font-size: 0.875rem; font-weight: 600; color: #1E293B; margin-top: 20px; }
.formats-title-tip { font-family: 'Open Sans', sans-serif; font-size: 0.75rem; color: #64748B; margin-top: -8px; }
.formats-save-tip { font-family: 'Open Sans', sans-serif; font-size: 0.75rem; color: #94A3B8; margin-top: 4px; font-style: italic; }

/* 格式列表 */
.format-item {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  justify-content: space-between;
  transition: background-color 200ms ease-out;
}
.format-item:hover { background-color: #F8FAFC; }

.format-details { display: flex; flex-direction: column; align-items: flex-start; flex-grow: 1; text-align: left; min-width: 0; }
.format-name {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.format-info { font-family: 'Open Sans', sans-serif; font-size: 0.75rem; color: #64748B; margin-top: 4px; }

/* 每行的下载按钮 */
.format-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 12px;
  padding: 8px 16px;
  background-color: #2563EB;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 200ms ease-out;
}
.format-download-btn:hover { background-color: #1D4ED8; color: #FFFFFF; text-decoration: none; }
.dl-icon { width: 16px; height: 16px; flex-shrink: 0; }

::placeholder { color: #94A3B8; opacity: 1; }

/* Tooltip */
.info-container { display: inline-block; position: relative; }
.info-icon { font-size: 14px; cursor: pointer; width: 18px; height: 18px; border-radius: 50%; }
.tooltip {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  background-color: #FFFFFF;
  color: #334155;
  text-align: left;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  line-height: 1.5;
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms ease-out;
  z-index: 100;
}
.info-container:hover .tooltip { visibility: visible; opacity: 1; }

/* 响应式 - 手机 */
@media screen and (max-width: 768px) {
  .converter-container { padding: 40px 16px; }
  .input-wrapper {
    flex-direction: column;
    width: 100%;
    height: auto;
    background-color: transparent;
    border: none;
    box-shadow: none;
    gap: 12px;
    padding: 0;
  }
  .input-box {
    width: 100%;
    height: 56px;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    padding: 0 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  }
  .input-box:focus { border-color: #2563EB; }
  .download-button2 { width: 160px; height: 48px; padding: 12px 0; margin-right: 0; }
  .format-item { flex-direction: column; align-items: stretch; gap: 10px; }
  .format-download-btn { margin-left: 0; justify-content: center; padding: 10px 16px; }
  .icon { width: 185px; }
  .title { font-size: 1.875rem; }
  .description { font-size: 1rem; }
}

/* 桌面端 */
@media screen and (min-width: 769px) {
  .container { justify-content: center; }
  .input-wrapper { width: 50%; min-width: 480px; }
}

/* 加载动画 */
.loading-indicator { display: flex; justify-content: center; margin-top: 40px; }
.loading-indicator .bar {
  width: 10px; height: 30px; margin: 0 3px;
  background-color: #2563EB; border-radius: 2px;
  animation: loadingAnimation 1.2s infinite;
}
.loading-indicator .bar:nth-child(1) { animation-delay: 0s; }
.loading-indicator .bar:nth-child(2) { animation-delay: 0.2s; }
.loading-indicator .bar:nth-child(3) { animation-delay: 0.4s; }

@keyframes loadingAnimation {
  0%, 80%, 100% { transform: scaleY(0.4); }
  40% { transform: scaleY(1); }
}
</style>
```

---

## 11. components/Reviews.vue（用户评价轮播）

```vue
<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div
        class="carousel-item"
        v-for="(review, index) in reviews.length"
        :key="index"
        :class="{'active': activeIndex === index}"
      >
        <div class="review-author">
          <span>{{ _t(`reviews[${index}].author`) }}</span>
        </div>
        <div class="review-content">
          <p v-html="_t(`reviews[${index}].text`)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { _t, _tm } from '@/i18n/utils'

const activeIndex = ref(0)
const scrollInterval = ref(null)
const carousel = ref(null)

const reviewsData = _tm('reviews')
const reviews = computed(() => reviewsData)

const scrollToCurrent = () => {
  const container = carousel.value
  if (!container) return
  const activeCard = container.children[activeIndex.value]
  if (!activeCard) return
  container.scrollTo({ left: activeCard.offsetLeft, behavior: 'smooth' })
}

const stopAutoScroll = () => {
  if (scrollInterval.value) { clearInterval(scrollInterval.value); scrollInterval.value = null; }
}

const startAutoScroll = () => {
  stopAutoScroll()
  scrollInterval.value = setInterval(() => {
    try {
      const reviewsList = reviews.value
      if (!reviewsList || !reviewsList.length) return
      activeIndex.value = (activeIndex.value + 1) % reviewsList.length
      nextTick(() => { scrollToCurrent() })
    } catch (error) {
      console.error('Error in auto scroll:', error)
      stopAutoScroll()
    }
  }, 3000)
}

onMounted(() => { startAutoScroll() })
onBeforeUnmount(() => { stopAutoScroll() })
</script>

<style scoped>
.carousel-container {
  width: 100%;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  margin-top: 3rem;
  padding: 0 1rem;
  box-sizing: border-box;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 1.5rem 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar { display: none; }

.carousel-item {
  background-color: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 1.5rem;
  border-radius: 12px;
  width: 33.33%;
  flex-shrink: 0;
  scroll-snap-align: center;
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
  box-sizing: border-box;
}
.carousel-item:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }

.carousel-item .review-content {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #334155;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.carousel-item .review-author {
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  color: #2563EB;
  font-weight: 600;
}

/* 左右渐隐 */
.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  width: 10%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.carousel-container::before { left: 0; background: linear-gradient(to right, rgba(255,255,255,0.7), transparent); }
.carousel-container::after { right: 0; background: linear-gradient(to left, rgba(255,255,255,0.7), transparent); }

@media (max-width: 1024px) { .carousel-item { width: 45%; } }
@media (max-width: 768px) {
  .carousel-container { margin-top: 2rem; }
  .carousel-item { width: 80%; padding: 1.25rem; }
  .carousel { gap: 0.75rem; padding: 1rem 0; }
}
</style>
```

---

## 12. components/VedioConvertDeps.vue（转换步骤说明）

```vue
<template>
  <section class="how-to-convert">
    <h2 class="title">{{ _t("howToConvertTitle") }}</h2>
    <p class="description">{{ _t("howToConvertDescription") }}</p>

    <div class="steps">
      <div v-for="(step, index) in steps" :key="index" class="step">
        <NuxtImg :src="step.image" :alt="step.title" class="step-image"/>
        <p class="step-text">
          <span class="step-number">{{ _t("step") }} {{ index + 1 }}.</span>
          <span v-html="_t(step.title)"></span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { _t } from '@/i18n/utils'

const steps = [
  { image: "/images/yt_convert_deps1.png", title: "copyUrl" },
  { image: "/images/yt_convert_deps2.png", title: "clickDownload" },
  { image: "/images/yt_convert_deps3.png", title: "saveVideo" }
]
</script>

<style scoped>
.how-to-convert { text-align: center; max-width: 90%; margin: auto; padding: 20px; }
.title { font-size: 2rem; font-weight: bold; color: #1A3B8C; margin-bottom: 15px; }
.description { font-size: 0.9rem; color: #555; width: 78%; margin: auto; line-height: 1.6; }
.steps { display: flex; justify-content: space-between; align-items: center; margin-top: 40px; gap: 20px; flex-wrap: wrap; }
.step { flex: 1 1 30%; text-align: center; margin-bottom: 30px; }
.step-image { max-width: 100%; height: auto; border-radius: 10px; }
.step-text { font-size: 1rem; color: #222; margin-top: 20px; }
.step-number { font-weight: bold; color: #0d1c44; }

@media (max-width: 768px) {
  .steps { flex-direction: column; }
  .step { flex: 1 1 100%; margin-bottom: 15px; }
  .title { font-size: 1.5rem; }
  .description { font-size: 0.85rem; width: 90%; }
}
</style>
```

---

## 13. components/Features.vue（功能特点）

```vue
<template>
  <section class="features">
    <h2>{{ _t('featuresConverter') }}</h2>
    <div class="features-container">
      <div class="feature-item" v-for="(feature, index) in _tm('features')" :key="index">
        <div class="feature-icon">
           <img :src="_t(`features[${index}].icon`)" alt="feature icon" />
        </div>
        <h3>{{ _t(`features[${index}].title`) }}</h3>
        <p v-html="_t(`features[${index}].description`)"></p>
      </div>
    </div>
    <div class="download-button-container">
      <button class="download-button" @click="goHome">{{ _t('downloadNow') }}</button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { _t, _tm } from '@/i18n/utils'

const router = useRouter()

const goHome = () => {
  router.push('/').then(() => {
    window.scrollTo(0, 0)
    setTimeout(() => { location.reload() }, 100)
  })
}
</script>

<style scoped>
.features { text-align: center; padding: 3rem 1.5rem; max-width: 1200px; margin: 0 auto; }
.features h2 { font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 700; margin-bottom: 3rem; color: #1E293B; }

.features-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 0 auto; width: 100%; }

.feature-item {
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: box-shadow 200ms ease-out;
}
.feature-item:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12); }
.feature-icon img { width: 96px; height: 96px; margin-bottom: 1rem; }
.feature-item h3 { font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; color: #1E293B; margin-bottom: 0.5rem; }
.feature-item p { font-family: 'Open Sans', sans-serif; font-size: 0.875rem; color: #475569; line-height: 1.6; }

.download-button-container { margin-top: 3rem; }
.download-button {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  background-color: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.125rem;
  transition: background-color 200ms ease-out;
}
.download-button:hover { background-color: #1D4ED8; }

@media (max-width: 1024px) { .features-container { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .features { padding: 2rem 1rem; }
  .features h2 { font-size: 1.875rem; margin-bottom: 2rem; }
  .features-container { grid-template-columns: 1fr; gap: 1rem; }
}
</style>
```

---

## 14. components/Benefits.vue（优势说明）

```vue
<template>
  <section class="benefits">
    <h2>{{ _t('benefits.title') }}</h2>

    <div class="benefit-item"
         v-for="(benefit, index) in benefits"
         :key="index"
         :class="{'reverse-layout': index % 2 !== 0}">
      <div class="benefit-text">
        <h3>{{ benefit.title }}</h3>
        <p v-html="benefit.description.replace(/\n/g, '<br>')"></p>
      </div>
      <div class="benefit-image">
        <NuxtImg :src="benefit.image" alt="Benefit Image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { _t, _te } from '@/i18n/utils'

const benefits = computed(() => {
  let items = []
  if(_te('benefits.convenience.title')) {
    items.push({ title: _t('benefits.convenience.title'), description: _t('benefits.convenience.description'), image: '/images/yt_benefits1.png' })
  }
  if(_te('benefits.avoidAds.title')) {
    items.push({ title: _t('benefits.avoidAds.title'), description: _t('benefits.avoidAds.description'), image: '/images/yt_benefits2.png' })
  }
  if(_te('benefits.saveData.title')) {
    items.push({ title: _t('benefits.saveData.title'), description: _t('benefits.saveData.description'), image: '/images/yt_benefits3.png' })
  }
  if(_te('benefits.moreFromDownloads.title')) {
    items.push({ title: _t('benefits.moreFromDownloads.title'), description: _t('benefits.moreFromDownloads.description'), image: '/images/yt_benefits4.png' })
  }
  return items
})
</script>

<style scoped>
.benefits { text-align: center; padding: 4rem 1.5rem; max-width: 1200px; margin: 0 auto; }
.benefits h2 { font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 700; color: #1E293B; margin-bottom: 3rem; }

.benefit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  gap: 3rem;
  width: 100%;
}
.benefit-item.reverse-layout { flex-direction: row-reverse; }
.benefit-text { flex: 1; text-align: left; }
.benefit-text h3 { font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #1E293B; margin-bottom: 1rem; }
.benefit-text p { font-family: 'Open Sans', sans-serif; font-size: 1rem; color: #475569; white-space: pre-wrap; line-height: 1.7; }
.benefit-image { flex: 1; display: flex; justify-content: center; }
.benefit-image img { max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }

@media (max-width: 768px) {
  .benefits { padding: 2rem 1rem; }
  .benefits h2 { font-size: 1.875rem; margin-bottom: 2rem; }
  .benefit-item { flex-direction: column; text-align: center; gap: 1.5rem; margin-bottom: 2.5rem; }
  .benefit-text { width: 100%; text-align: center; }
  .benefit-image img { width: 85%; }
  .benefit-item.reverse-layout { flex-direction: column; }
}
</style>
```

---

## 15. components/FAQ.vue（常见问题）

```vue
<template>
  <div class="faq-container">
    <h2 class="faq-title">{{ _t('faqTitle') }}</h2>
    <div class="faq-wrapper">
      <div v-for="(item, index) in faqs" :key="index" class="faq-item">
        <div class="faq-header" @click="toggleFAQ(index)">
          <span class="arrow">{{ activeIndex === index ? "▼" : "▶" }}</span>
          <span class="faq-question">{{ item.question }}</span>
        </div>
        <div v-if="activeIndex === index" class="faq-content">
          <div v-html="item.answer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { _t, _te } from '@/i18n/utils'

const activeIndex = ref(0)

const faqs = computed(() => {
  let items = []
  for(let i=1; i<10; i++) {
    if(_te(`faq${i}Question`)) {
      items.push({
        question: _t(`faq${i}Question`),
        answer: _t(`faq${i}Answer`)
      })
    }
    else break
  }
  return items
})

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-container { width: 85%; margin: 20px auto; margin-bottom: 80px; }
.faq-title { font-weight: bold; color: #1A3B8C; margin-bottom: 20px; }
.faq-wrapper { border: 1px solid #3b82f6; background-color: #f8fafc; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.faq-item { border-bottom: 0.5px solid #3b82f6; }
.faq-item:last-child { border-bottom: none; }
.faq-header { display: flex; align-items: center; padding: 15px; font-size: 18px; font-weight: bold; color: #1e3a8a; cursor: pointer; }
.arrow { margin-right: 10px; font-size: 14px; transition: transform 0.2s ease; }
.faq-content { padding: 5px 15px 40px 40px; font-size: 0.9em; color: #333; white-space: pre-line; }
.faq-question { white-space: pre-line; }
</style>
```

---

## 16. components/Footer.vue（底部）

```vue
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{{ _t('resource') }}</h3>
        <router-link :to="getLocalizedPath('/')" class="footer-link">Y2mp4.com</router-link>
      </div>

      <div class="footer-section tools">
        <h3>{{ _t('tools') }}</h3>
        <router-link
          v-for="site in sites.filter(site => site.footer)"
          :key="site.url"
          :to="getLocalizedPath(site.url)"
          class="footer-link"
        >
          {{ _t(site.name) }}
        </router-link>
      </div>

      <div class="footer-section">
        <div class="contact">
          <h3>{{ _t('email') }}</h3>
          <a href="mailto:hello@y2mp4.com" class="footer-link">hello@y2mp4.com</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="language-selector">
        <router-link to="/privacy-policy" class="lang-link">{{ _t('privacyPolicy') }}</router-link>
        <router-link to="/terms-of-service" class="lang-link">{{ _t('termsOfService') }}</router-link>
      </div>
      <div class="copyright">2025 Y2mp4.com</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import sites from '@/sites'

const { t: _t } = useI18n()

const getLocalizedPath = (path: string) => {
  const route = useRoute()
  const currentPath = route.path
  const pathParts = currentPath.split('/')
  let currentLocale = ''

  if (pathParts.length > 1 && /^[a-z]{2}(-\w+)?$/.test(pathParts[1])) {
    currentLocale = pathParts[1]
  }

  if (currentLocale === 'en') return path

  if (currentLocale) {
    if (path === '/') return `/${currentLocale}`
    return `/${currentLocale}${path}`
  }

  return path
}
</script>

<style scoped>
.footer {
  background-color: #0F172A;
  color: white;
  padding: 3rem 1.5rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}
.footer-content { display: flex; justify-content: space-between; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 2rem; }
.footer-section { flex: 1; min-width: 160px; }
.footer h3 { font-family: 'Poppins', sans-serif; color: #FFFFFF; margin-bottom: 1rem; font-size: 1rem; font-weight: 600; }
.footer-link { margin-bottom: 0.5rem; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 0.875rem; display: block; text-decoration: none; transition: color 200ms ease-out; }
.footer-link:hover { color: #FFFFFF; }

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  flex-wrap: wrap;
}
.language-selector { display: flex; gap: 1.5rem; }
.lang-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.875rem; cursor: pointer; transition: color 200ms ease-out; }
.lang-link:hover { color: #FFFFFF; text-decoration: underline; }
.copyright { color: rgba(255,255,255,0.5); font-size: 0.8125rem; }

@media (max-width: 768px) {
  .footer { padding: 2rem 1rem 1rem; }
  .footer-content { flex-direction: column; gap: 1.5rem; }
  .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
  .language-selector { justify-content: center; }
}
</style>
```

---

## 17. 后端 API（VPS 上的 server.js）

> 后端运行在 VPS `65.49.205.191`，路径 `/yt/server/server.js`

```javascript
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/get-formats', async (req, res) => {
  // CORS 设置
  const allowedOrigins = ['https://yt.4ris.xyz', 'http://localhost:3000', 'http://localhost:3001'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  } else {
    return res.status(403).json({ error: '禁止访问' });
  }

  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: '无效的 YouTube URL' });
  }

  // 调用 yt-dlp CLI 获取视频 JSON 信息
  const ytDlpProcess = spawn('yt-dlp', ['-j', videoUrl]);

  let output = '';
  let errorOutput = '';

  ytDlpProcess.stdout.on('data', (data) => { output += data.toString(); });
  ytDlpProcess.stderr.on('data', (data) => { errorOutput += data.toString(); });

  ytDlpProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Get resource format error!', details: errorOutput });
    }

    try {
      const data = JSON.parse(output);
      const allowedFormats = ['mp4', 'webm', 'm4a'];

      const formats = data.formats
        .filter(format =>
          allowedFormats.includes(format.ext)
          && format.protocol !== 'm3u8_native'
          && format.acodec !== 'none'
        )
        .map(format => ({
          format_id: format.format_id,
          ext: format.ext,
          resolution: format.height ? `${format.width}x${format.height}` : 'Audio Only',
          fps: format.fps || null,
          vcodec: format.vcodec !== 'none' ? format.vcodec : null,
          acodec: format.acodec !== 'none' ? format.acodec : null,
          url: format.url,
          filesize: format.filesize || null
        }));

      const videoFormats = formats.filter(f => f.vcodec);
      const audioFormats = formats.filter(f => f.acodec && !f.vcodec);

      res.json({
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        formats: [...videoFormats, ...audioFormats],
        subtitles: { ...data.automatic_captions, ...data.subtitles },
        output: data
      });
    } catch (err) {
      return res.status(500).json({ error: '解析 JSON 失败', details: err.message });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`服务器运行在 http://0.0.0.0:${port}`);
});
```

---

## 18. 设计规范概要

| Token | 值 |
|-------|------|
| **主色** | `#2563EB` (蓝) |
| **Hover** | `#1D4ED8` |
| **文字色** | `#1E293B` (深灰) |
| **副文字** | `#475569` |
| **灰色文字** | `#64748B` / `#94A3B8` |
| **背景** | `#FFFFFF` |
| **卡片背景** | `#F8FAFC` |
| **边框** | `#E2E8F0` |
| **Footer 背景** | `#0F172A` |
| **标题字体** | Poppins 600/700 |
| **正文字体** | Open Sans 400/500 |
| **圆角** | 8px（按钮）/ 12px（卡片） |
| **阴影** | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| **过渡** | `200ms ease-out` |

---

## 19. 数据流说明

```
用户浏览器
  ↓ 访问 https://y2mp4.com
  ↓
Cloudflare CDN (SSL 终止)
  ↓
VPS Caddy (Origin Certificate)
  ├── /api/* → reverse_proxy → Node.js Express (localhost:3000)
  │     └── GET /get-formats?url=xxx
  │           └── spawn('yt-dlp', ['-j', url])
  │                 └── 返回 JSON（标题、缩略图、格式列表含直链 URL）
  └── /* → 静态文件 /yt/dist（Nuxt generate 的产物）

前端流程:
  1. 用户粘贴 YouTube URL → 自动触发 fetchFormats()
  2. axios.get('/api/get-formats', { params: { url } })
  3. 后端 yt-dlp -j 获取视频信息 → 返回格式列表（含 YouTube CDN 直链）
  4. 前端渲染格式列表 → 每行一个蓝色 Download 按钮
  5. 点击 Download → <a :href="format.url" target="_blank"> 打开 YouTube CDN 直链
```

---

## 20. i18n 语言文件（共 19 种）

```
i18n/locales/
├── en.json        # English
├── ar.json        # العربية
├── de.json        # Deutsch
├── es.json        # Español
├── es-419.json    # Español (Latinoamérica)
├── fr.json        # Français
├── hi.json        # हिन्दी
├── id.json        # Bahasa Indonesia
├── it.json        # Italiano
├── ja.json        # 日本語
├── ko.json        # 한국어
├── pt.json        # Português
├── pt-br.json     # Português (Brasil)
├── th.json        # ไทย
├── tr.json        # Türkçe
├── vi.json        # Tiếng Việt
├── zh-TW.json     # 繁體中文
├── zh-CN.json     # 简体中文
└── ru.json        # Русский
```

每个文件包含 SEO、UI 文案、Reviews、Features、Benefits、FAQ 等所有翻译。品牌名统一为 "Y2mp4.com"。

---

*文件生成时间: 2025-02*
