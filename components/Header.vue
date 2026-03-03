<template>
  <header class="header">
    <div class="container">
      <!-- 左侧 Logo -->
      <div class="logo">
        <span class="site-name" @click="goHome">{{ _t("siteName") }}</span>
      </div>

      <!-- 移动端汉堡菜单按钮 -->
      <button class="menu-toggle" @click="toggleMobileMenu" :class="{ 'is-open': showMobileMenu }">
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
      </button>

      <!-- 右侧导航（桌面端直接显示，移动端点击汉堡后展开） -->
      <nav class="nav" :class="{ 'is-open': showMobileMenu }">
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
const showMobileMenu = ref(false);

// 从 i18n 配置中获取语言列表
const languages = locales.value;

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  // 关闭菜单时也关闭语言下拉
  if (!showMobileMenu.value) {
    showLanguageMenu.value = false;
  }
};

// 跳转到指定站点
const goToSite = (url) => {
  const lang = locale.value;
  const prefix = lang === 'en' ? '' : `/${lang}`;
  router.push({ path: `${prefix}${url}` });
  showMobileMenu.value = false;
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
  showMobileMenu.value = false;

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

// 点击页面其他地方关闭菜单
const closeMenus = (event) => {
  if (showLanguageMenu.value && !event.target.closest('.language-selector')) {
    showLanguageMenu.value = false;
  }
  if (showMobileMenu.value && !event.target.closest('.header')) {
    showMobileMenu.value = false;
  }
};

// 监听路由变化，自动关闭菜单
watch(route, () => {
  showLanguageMenu.value = false;
  showMobileMenu.value = false;
});

import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  document.addEventListener('click', closeMenus);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenus);
});

const goHome = () => {
  showMobileMenu.value = false;
  if (route.path !== '/') {
    router.push({ path: '/' });
  }
}
</script>

<style scoped>
/* ============================================
   Header - Mobile First
   ============================================ */

.header {
  background-color: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  width: 100%;
  min-height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

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

.logo .site-name:hover {
  color: #1D4ED8;
}

/* ============================================
   汉堡菜单按钮 (仅移动端显示)
   ============================================ */
.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 200ms ease-out;
  z-index: 60;
}

.menu-toggle:hover {
  background-color: #F1F5F9;
}

.menu-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #475569;
  border-radius: 2px;
  transition: all 300ms ease-out;
}

/* 汉堡 → X 动画 */
.menu-toggle.is-open .menu-bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu-toggle.is-open .menu-bar:nth-child(2) {
  opacity: 0;
}
.menu-toggle.is-open .menu-bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ============================================
   Nav - 移动端：隐藏，点击汉堡展开
   ============================================ */
.nav {
  display: none;
  flex-direction: column;
  gap: 0;
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 55;
}

.nav.is-open {
  display: flex;
}

/* Nav links */
.nav-link {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 200ms ease-out;
  border-bottom: none;
}

.nav-link:hover {
  color: #2563EB;
  background-color: #F8FAFC;
  text-decoration: none;
}

/* Language selector - mobile */
.language-selector {
  position: relative;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

.selected-language {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
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

.dropdown-arrow {
  font-size: 0.625rem;
  margin-left: 0.5rem;
  color: #94A3B8;
  transition: color 200ms ease-out;
}

.selected-language:hover .dropdown-arrow {
  color: #2563EB;
}

/* Language dropdown */
.language-dropdown {
  position: absolute;
  top: 100%;
  right: 1.5rem;
  left: 1.5rem;
  width: auto;
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

.language-option:hover {
  background-color: #EFF6FF;
  color: #2563EB;
}

/* ============================================
   Tablet+ (>=768px) - 隐藏汉堡，直接显示导航
   ============================================ */
@media (min-width: 768px) {
  /* 隐藏汉堡按钮 */
  .menu-toggle {
    display: none;
  }

  /* Nav 直接显示为横排 */
  .nav {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    position: static;
    background: none;
    border-bottom: none;
    box-shadow: none;
    padding: 0;
    align-items: center;
    width: auto;
  }

  .nav-link {
    font-size: 0.875rem;
    padding: 0.25rem 0.25rem;
  }

  .nav-link:hover {
    background-color: transparent;
  }

  .language-selector {
    margin-left: 0.5rem;
    padding: 0;
    width: auto;
  }

  .selected-language {
    width: auto;
    justify-content: center;
  }

  .language-dropdown {
    left: auto;
    right: 0;
    width: 240px;
  }
}

/* ============================================
   Desktop (>=1024px) - refined spacing
   ============================================ */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .logo .site-name {
    font-size: 1.5rem;
  }

  .nav {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.875rem;
  }

  .language-selector {
    margin-left: 1rem;
  }
}
</style>
