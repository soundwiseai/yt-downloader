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
      locale: {
        type: String,
        default: ''
      }
    },
    setup(props) {
      const { locale } = useI18n();
      const supportedLanguages = ['en', 'es', 'ar', 'hi', 'pt', 'ko', 'ja', 'zh-TW', 'id', 'th', 'vi'];
           
      watch(() => props.locale, (newLocale) => {
        if (newLocale && locale.value !== newLocale) {
          if (supportedLanguages.includes(newLocale)) {
            locale.value = newLocale;
          }
        } 
      }, { immediate: true });
    }
  }
  </script>