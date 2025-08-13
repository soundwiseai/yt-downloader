<template>
  <header class="header">
    <div class="container">
      <!-- 左侧 Logo -->
      <div class="logo">
        <span class="site-name" @click="goHome">{{ _t("siteName") }}</span>
      </div>
      <!-- 右侧导航 -->
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
  if (path.endsWith('/youtube-to-mp3')) {
    suffix = '/youtube-to-mp3';
  } else if (path.endsWith('/youtube-video-downloader')) {
    suffix = '/youtube-video-downloader';
  } else if (path.endsWith('/youtube-transcript-generator')) {
    suffix = '/youtube-transcript-generator';
  } else if (path.endsWith('/youtube-to-m4a')) {
    suffix = '/youtube-to-m4a';
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
.language-selector {
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}

/* 移动端下语言选择器样式 */
@media (max-width: 599px) {
  .language-selector {
    margin-left: 0;
    width: 100%;
    margin-top: 5px;
    margin-left: -8px;
  }
  
  .selected-language {
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
  }
}

.selected-language {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s;
}

.selected-language:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 5px;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 240px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.language-option {
  padding: 10px 15px;
  color: #333;
  transition: background-color 0.2s;
}

.language-option:hover {
  background-color: #f5f5f5;
}
</style>

<style scoped>
/* 📱 默认：移动端优先（Logo + 导航栏 垂直排列） */
.header {
  background-color: #1A3B8C38; /* 背景颜色 */
  padding: 15px 0;
  width: 100%;
}

/* ✅ 让 `container` 默认是垂直布局 */
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 改为左对齐 */
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* ✅ Logo 样式 */
.logo .site-name {
  font-size: 20px;
  font-weight: bold;
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: #113b92;
  white-space: nowrap; /* 防止换行 */
  cursor: pointer;
}

/* ✅ 导航栏默认左对齐 */
.nav {
  display: flex;
  flex-direction: column; /* ✅ 移动端上下排列 */
  gap: 10px;
  margin-top: 10px;
  width: 100%; /* 确保导航栏占满宽度 */
  align-items: flex-start; /* 左对齐 */
}

/* ✅ 导航栏样式 */
.nav-link {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap; /* 避免导航项换行 */
  margin-right: 40px;
}

.nav-link:hover {
  text-decoration: underline;
}

/* 📱✅ 渐进式增强：平板 (≥600px) */
@media (min-width: 600px) {
  .container {
    flex-direction: row; /* ✅ 变成水平排列 */
    justify-content: space-between; /* ✅ 两端对齐，让导航栏靠右 */
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  /* ✅ 导航栏靠右对齐 */
  .nav {
    flex-direction: row;
    gap: 15px;
    margin-left: auto; /* ✅ 让导航栏靠右对齐 */
    width: auto; /* 重置宽度 */
    align-items: center; /* 居中对齐 */
  }

  .nav-link {
    font-size: 16px;
  }
}

/* 🖥️ 桌面端优化（≥1024px） */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo .site-name {
    font-size: 24px;
  }

  .nav {
    gap: 20px; /* 增加间距 */
  }

  .nav-link {
    font-size: 18px;
  }
}
</style>
