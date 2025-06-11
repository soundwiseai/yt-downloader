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