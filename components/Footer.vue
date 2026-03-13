<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{{ _t('resource') }}</h3>
        <router-link :to="getLocalizedPath('/')" class="footer-link">{{ siteName }}</router-link>
      </div>

      <div class="footer-section tools">
        <h3>{{ _t('tools') }}</h3>
        <router-link 
          v-for="site in sites.filter(site => site.footer)" 
          :key="site.url" 
          :to="getLocalizedPath(site.url)" 
          class="footer-link"
        >
          {{ getSiteLabel(site) }}
        </router-link>
      </div>

      <div class="footer-section">
        <div class="contact">
          <h3>{{ _t('email') }}</h3>
          <a :href="`mailto:${supportEmail}`" class="footer-link">{{ supportEmail }}</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="language-selector">
        <router-link :to="getLocalizedPath('/privacy-policy')" class="lang-link">{{ _t('privacyPolicy') }}</router-link>
        <router-link :to="getLocalizedPath('/terms-of-service')" class="lang-link">{{ _t('termsOfService') }}</router-link>
      </div>
      <div class="copyright">
        {{ currentYear }} {{ siteName }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import sites from '@/sites'
import { buildLocalizedPath, getLocaleFromPath, getSiteLabelKeyCandidates } from '@/utils/site-config'

const { t: _t, te } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const currentYear = new Date().getFullYear()
const supportEmail = runtimeConfig.public.supportEmail as string
const siteName = computed(() => _t('siteName'))

// 获取本地化路径
const getLocalizedPath = (path: string) => {
  return buildLocalizedPath(path, getLocaleFromPath(route.path))
}

const getSiteLabel = (site: { name: string; i18n: string }) => {
  const key = getSiteLabelKeyCandidates(site).find((candidate) => te(candidate))
  return key ? _t(key) : site.name
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

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  flex: 1;
  min-width: 160px;
}

.footer h3 {
  font-family: 'Poppins', sans-serif;
  color: #FFFFFF;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.footer-link {
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 0.875rem;
  display: block;
  text-decoration: none;
  transition: color 200ms ease-out;
}

.footer-link:hover {
  color: #FFFFFF;
}

.comparison, .contact {
  margin-bottom: 1.5rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}

.language-selector {
  display: flex;
  gap: 1.5rem;
}

.lang-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 200ms ease-out;
}

.lang-link:hover {
  color: #FFFFFF;
  text-decoration: underline;
}

.copyright {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8125rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1rem 1rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .language-selector {
    justify-content: center;
  }
}
</style>
