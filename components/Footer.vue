<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Brand column -->
      <div class="footer-section footer-brand">
        <div class="footer-logo">
          <span class="footer-logo-icon">&#9654;</span>
          <span class="footer-logo-name">Y2mp4</span>
          <span class="footer-logo-domain">.com</span>
        </div>
        <p class="footer-tagline">Fast, free YouTube video downloader. Convert and download videos in MP4 and MP3 formats.</p>
      </div>

      <!-- Resources column -->
      <div class="footer-section">
        <h3>{{ _t('resource') }}</h3>
        <router-link :to="getLocalizedPath('/')" class="footer-link">Y2mp4.com</router-link>
      </div>

      <!-- Tools column -->
      <div class="footer-section">
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

      <!-- Contact column -->
      <div class="footer-section">
        <h3>{{ _t('email') }}</h3>
        <a href="mailto:team@y2mp4.com" class="footer-link">team@y2mp4.com</a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-legal">
        <router-link to="/privacy-policy" class="legal-link">{{ _t('privacyPolicy') }}</router-link>
        <span class="legal-separator"></span>
        <router-link to="/terms-of-service" class="legal-link">{{ _t('termsOfService') }}</router-link>
      </div>
      <div class="copyright">
        &copy; 2025 Y2mp4.com. All rights reserved.
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
  background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
  color: #e2e8f0;
  padding: 48px 24px 24px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-brand {
  padding-right: 24px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 12px;
}

.footer-logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 5px;
  font-size: 11px;
  color: #fff;
  margin-right: 6px;
  flex-shrink: 0;
}

.footer-logo-name {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.3px;
}

.footer-logo-domain {
  font-size: 18px;
  font-weight: 700;
  color: #60a5fa;
  letter-spacing: -0.3px;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  max-width: 280px;
}

.footer-section h3 {
  color: #ffffff;
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.footer-link {
  display: block;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
  line-height: 1.5;
}

.footer-link:hover {
  color: #60a5fa;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-wrap: wrap;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 16px;
}

.legal-link {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}

.legal-link:hover {
  color: #60a5fa;
}

.legal-separator {
  width: 1px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.15);
}

.copyright {
  color: rgba(255, 255, 255, 0.35);
  font-size: 13px;
}

/* ---- Tablet ---- */
@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-brand {
    grid-column: 1 / -1;
    padding-right: 0;
  }

  .footer-tagline {
    max-width: 100%;
  }
}

/* ---- Mobile ---- */
@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }

  .footer-legal {
    justify-content: center;
  }
}
</style>
