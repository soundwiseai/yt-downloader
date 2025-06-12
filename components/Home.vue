<template>
  <div id="app">
    <div class="container">
      <MainContent />
      <Reviews />
      <VedioConvertDeps/>
      <Features />
      <Benefits />
      <FAQ />
    </div>
  </div>
</template>

<script setup>
import VedioConvertDeps from './VedioConvertDeps.vue'
import MainContent from './MainContent.vue'
import Features from './Features.vue'
import Benefits from './Benefits.vue'
import Reviews from './Reviews.vue'
import FAQ from './FAQ.vue'

// 定义 props
defineProps({
  locale: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>