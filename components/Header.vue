<template>
  <header class="header">
    <div class="container">
      <!-- Logo -->
      <div class="logo" @click="goHome">
        <span class="logo-icon">&#9654;</span>
        <span class="site-name">Y2mp4</span>
        <span class="site-domain">.com</span>
      </div>
      <!-- Navigation -->
      <nav class="nav">
        <a
          v-for="site in sites.filter(site => site.header)"
          :key="site.url"
          href="#"
          class="nav-link"
          @click.prevent="goToSite(site.url)"
        >
          {{ _t(site.name) }}
        </a>

        <!-- Language selector dropdown -->
        <div class="language-selector">
          <div class="selected-language" @click="toggleLanguageMenu">
            <svg class="globe-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm6.918 6h-3.215c-.354-1.594-.947-2.975-1.726-3.906A8.035 8.035 0 0115.918 6zM10 2c.94 0 2.16 1.641 2.697 4H7.303C7.84 3.641 9.06 2 10 2zM2 10c0-.69.098-1.36.276-2h3.588c-.07.65-.114 1.32-.114 2s.044 1.35.114 2H2.276A7.96 7.96 0 012 10zm2.082 4h3.215c.354 1.594.947 2.975 1.726 3.906A8.035 8.035 0 014.082 14zm0-8a8.035 8.035 0 014.941-3.906C8.244 3.025 7.65 4.406 7.297 6H4.082zM10 18c-.94 0-2.16-1.641-2.697-4h5.394C12.16 16.359 10.94 18 10 18zm3.25-6H6.75c-.08-.65-.125-1.318-.125-2s.046-1.35.125-2h6.5c.079.65.125 1.318.125 2s-.046 1.35-.125 2zm.773 5.906c.78-.931 1.372-2.312 1.726-3.906h3.215a8.035 8.035 0 01-4.941 3.906zM14.25 12c.07-.65.114-1.32.114-2s-.044-1.35-.114-2h3.588c.178.64.276 1.31.276 2s-.098 1.36-.276 2H14.25z"/>
            </svg>
            {{ getCurrentLanguageName() }}
            <span class="dropdown-arrow">
              <svg viewBox="0 0 10 6" fill="currentColor" width="10" height="6">
                <path d="M1 1l4 4 4-4"/>
              </svg>
            </span>
          </div>
          <div class="language-dropdown" v-if="showLanguageMenu">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="language-option"
              :class="{ active: lang.code === locale }"
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

// 从 i18n 配置中获取语言列表
const languages = locales.value;

// 跳转到指定站点
const goToSite = (url) => {
  const lang = locale.value;
  const prefix = lang === 'en' ? '' : `/${lang}`;
  router.push({ path: `${prefix}${url}` });
};

// 切换语言菜单显示/隐藏
const toggleLanguageMenu = () => {
  showLanguageMenu.value = !showLanguageMenu.value;
};

// 获取当前语言名称
const getCurrentLanguageName = () => {
  const currentLang = languages.find(lang => lang.code === locale.value);
  return currentLang ? currentLang.name : 'English';
};

// 切换语言
const changeLanguage = async (langCode) => {
  showLanguageMenu.value = false;
  
  // 先切换语言
  await setLocale(langCode);

  // 判断当前页面是否为 mp3 或 downloader
  const path = route.path;
  let suffix = '';
  for (const site of sites) {
    if (path.endsWith(site.url)) {
        suffix = site.url;
        break;
    }
  }

  // 生成目标路径并跳转
  const prefix = langCode === 'en' ? '' : `/${langCode}`;
  const targetPath = `${prefix}${suffix}`;
  router.push({ path: targetPath });
};

// 点击页面其他地方关闭语言菜单
const closeLanguageMenu = (event) => {
  if (showLanguageMenu.value && !event.target.closest('.language-selector')) {
    showLanguageMenu.value = false;
  }
};

// 监听路由变化，自动关闭语言菜单
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

const handleNavigation = (event) => {
  const currentRoute = useRoute()
  if (currentRoute.path !== '/') {
    event.preventDefault() // 阻止跳转
  }
}

const goHome = () => {
  if (route.path !== '/') {
    router.push({ path: '/' });
  }
}
</script>

<style scoped>
/* ---- Header ---- */
.header {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 0;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 20px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* ---- Logo ---- */
.logo {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
}

.logo:hover {
  opacity: 0.85;
}

.logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
  margin-right: 8px;
  flex-shrink: 0;
}

.site-name {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.3px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.site-domain {
  font-size: 20px;
  font-weight: 700;
  color: #60a5fa;
  letter-spacing: -0.3px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* ---- Navigation ---- */
.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  width: 100%;
  align-items: flex-start;
}

.nav-link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 6px;
  transition: color 0.2s, background-color 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.nav-link:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
  text-decoration: none;
}

/* ---- Language Selector ---- */
.language-selector {
  position: relative;
  cursor: pointer;
}

.selected-language {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s, background-color 0.2s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.selected-language:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
}

.globe-icon {
  flex-shrink: 0;
  opacity: 0.8;
}

.dropdown-arrow {
  display: inline-flex;
  align-items: center;
  margin-left: 2px;
  opacity: 0.6;
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 220px;
  background-color: #1e293b;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06);
  z-index: 200;
  max-height: 320px;
  overflow-y: auto;
  padding: 4px;
}

.language-option {
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  border-radius: 6px;
  transition: color 0.15s, background-color 0.15s;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.language-option:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.language-option.active {
  background-color: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
}

/* ---- Tablet (>= 600px) ---- */
@media (min-width: 600px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 56px;
  }

  .nav {
    flex-direction: row;
    gap: 2px;
    margin-top: 0;
    margin-left: auto;
    width: auto;
    align-items: center;
  }

  .language-selector {
    margin-left: 4px;
  }
}

/* ---- Desktop (>= 1024px) ---- */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 0 32px;
    height: 60px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .site-name,
  .site-domain {
    font-size: 22px;
  }

  .nav {
    gap: 4px;
  }

  .nav-link {
    font-size: 15px;
    padding: 8px 14px;
  }

  .selected-language {
    font-size: 15px;
    padding: 8px 14px;
  }
}

/* ---- Mobile (< 600px) ---- */
@media (max-width: 599px) {
  .container {
    padding: 12px 16px;
  }

  .language-selector {
    width: 100%;
  }

  .selected-language {
    width: 100%;
    box-sizing: border-box;
    justify-content: flex-start;
  }

  .language-dropdown {
    left: 0;
    right: 0;
    width: auto;
  }
}
</style>
