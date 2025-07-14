<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{{ _t('site') }}</h3>
        <div class="footer-link">Youtubetomp4.pro</div>
      </div>

      <div class="footer-section tools">
        <h3>{{ _t('tools') }}</h3>
        <router-link :to="getLocalizedPath('/')" class="footer-link">home</router-link>
        <router-link :to="getLocalizedPath('/youtube-video-downloader')" class="footer-link">youtube video</router-link>
        <router-link :to="getLocalizedPath('/youtube-to-mp3')" class="footer-link">youtube mp3</router-link>
        <router-link :to="getLocalizedPath('/youtube-transcript-generator')" class="footer-link">youtube transcript</router-link>
      </div>

      <div class="footer-section">
        <div class="comparison">
          <h3>{{ _t('comparison') }}</h3>
          <div class="footer-link">{{ _t('comparisonText') }}</div>
        </div>
        <div class="contact">
          <h3>{{ _t('email') }}</h3>
          <div class="footer-link">admin@Youtubetomp4.pro</div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="language-selector">
        <router-link to="/privacy-policy" class="lang-link">{{ _t('privacyPolicy') }}</router-link>
        <router-link to="/terms-of-service" class="lang-link">{{ _t('termsOfService') }}</router-link>
      </div>
      <div class="copyright">
        © 2025 Youtubetomp4.pro
      </div>
    </div>
  </footer>
</template>

<script setup>
import { _t } from '@/i18n/utils'

const props = defineProps({
  locale: {
    type: String,
    default: ''
  }
})

// 获取本地化路径
const getLocalizedPath = (path) => {
  const currentLocale = props.locale
  
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
const handleNavigation = (event) => {
  if (route.path !== '/') {
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
