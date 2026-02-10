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
          <a href="mailto:team@y2mp4.com" class="footer-link">team@y2mp4.com</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="language-selector">
        <router-link to="/privacy-policy" class="lang-link">{{ _t('privacyPolicy') }}</router-link>
        <router-link to="/terms-of-service" class="lang-link">{{ _t('termsOfService') }}</router-link>
      </div>
      <div class="copyright">
        2025 Y2mp4.com
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import sites from '@/sites'

const { t: _t } = useI18n()

// 获取本地化路径
const getLocalizedPath = (path: string) => {
  // 使用 useRoute 获取当前路径
  const route = useRoute()
  const currentPath = route.path
  const pathParts = currentPath.split('/')
  let currentLocale = ''
  
  // 检查是否有语言代码
  if (pathParts.length > 1 && /^[a-z]{2}(-\w+)?$/.test(pathParts[1])) {
    currentLocale = pathParts[1]
  }
  
  // 如果 locale 为 'en'，则省略 locale 部分
  if (currentLocale === 'en') {
    return path
  }
  
  // 如果当前路径包含 locale，则添加到目标路径中
  if (currentLocale) {
    // 处理根路径的特殊情况
    if (path === '/') {
      return `/${currentLocale}`
    }
    return `/${currentLocale}${path}`
  }
  
  // 如果没有检测到 locale，直接返回原始路径
  return path
}

// 处理导航
const handleNavigation = (event: Event) => {
  const currentPath = window.location.pathname
  if (currentPath !== '/') {
    event.preventDefault() // 阻止跳转
  }
}
</script>

<style scoped>
.footer {
  background-color: #030d24;
  color: white;
  padding: 40px 20px 20px;
  width: 100%;
  box-sizing: border-box;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  margin-bottom: 20px;
}


.footer h3 {
  color: white;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
}

.footer-link {
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 14px;
  display: block  ;
}

.footer-link:hover {
  color: white;
}

.comparison, .contact {
  margin-bottom: 30px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 30px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}

.language-selector {
  display: flex;
  gap: 20px;
}

.lang-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
}

.lang-link:hover {
  color: white;
  text-decoration: underline;
}

.copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
