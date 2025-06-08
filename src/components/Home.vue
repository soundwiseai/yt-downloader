<template>
    <div id="app">
      <MainContent />
      <Reviews />
      <VedioConvertDeps/>
      <Features />
      <Benefits />
      <FAQ />
    </div>
  </template>
  
  <script>
  import VedioConvertDeps from './VedioConvertDeps.vue'
  import MainContent from './MainContent.vue'
  import Features from './Features.vue'
  import Benefits from './Benefits.vue'
  import Reviews from './Reviews.vue'
  import FAQ from './FAQ.vue'
  import { useI18n } from 'vue-i18n'
  import { watch, onMounted } from 'vue'

  export default {
    name: 'App',
    components: {
      MainContent,
      VedioConvertDeps,
      Reviews,
      Features,
      Benefits,
      FAQ,
    },
    props: {
      locale: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const { locale, t } = useI18n();
      const supportedLanguages = ['en', 'es', 'ar', 'hi', 'pt', 'ko', 'ja', 'zh-TW', 'id', 'th', 'vi'];
      
      const updateMetaTags = () => {
        // 更新 title
        document.title = t('seo.title');
        
        // 更新 meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', t('seo.description'));
        
        // 更新 meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', t('seo.keywords'));
        
        // 更新 Open Graph 标签
        const ogTags = {
          'og:title': t('seo.ogTitle'),
          'og:description': t('seo.ogDescription'),
          'og:type': 'website',
          'og:locale': locale.value,
          'og:locale:alternate': supportedLanguages.filter(lang => lang !== locale.value).join(',')
        };
        
        Object.entries(ogTags).forEach(([property, content]) => {
          let metaTag = document.querySelector(`meta[property="${property}"]`);
          if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('property', property);
            document.head.appendChild(metaTag);
          }
          metaTag.setAttribute('content', content);
        });
      };
           
      watch(() => props.locale, (newLocale) => {
        console.log('[Home] Props locale changed:', newLocale, 'Current locale:', locale.value);
        if (newLocale && locale.value !== newLocale) {
          if (supportedLanguages.includes(newLocale)) {
            console.log('[Home] Setting locale to:', newLocale);
            locale.value = newLocale;
            updateMetaTags();
          }
        } 
      }, { immediate: true });

      onMounted(() => {
        updateMetaTags();
      });
    }
  }
  </script>