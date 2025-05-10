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
  
  export default {
    name: 'App',
    components: {
      MainContent,
      VedioConvertDeps,
      Reviews,
      Features,
      Benefits,
      FAQ,
    }
  }
  </script>
  