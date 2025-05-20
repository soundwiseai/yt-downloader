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
  import { watch } from 'vue'

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
      lang: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const { locale } = useI18n();
      const supportedLanguages = ['en', 'es', 'ar', 'hi', 'pt', 'ko', 'ja', 'zh-TW', 'id', 'th', 'vi'];
           
      watch(() => props.lang, (newLang) => {
        if (newLang && locale.value !== newLang) {
          if (supportedLanguages.includes(newLang)) {
            locale.value = newLang;
          }
        } else if (!newLang && locale.value !== 'en') {
          // 默认英语
          locale.value = 'en';
        }
      }, { immediate: true });
    }
  }
  </script>