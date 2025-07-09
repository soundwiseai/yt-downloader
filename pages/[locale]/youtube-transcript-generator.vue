<template>
  <div id="app">
    <div>123</div>
    <div class="container">
      <Reviews />
      <VedioConvertDeps/>
      <Features />
      <Benefits />
      <FAQ />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePageSeo } from '@/composables/usePageSeo'
import Reviews from '@/components/Reviews.vue'
import VedioConvertDeps from '@/components/VedioConvertDeps.vue'
import Features from '@/components/Features.vue'
import Benefits from '@/components/Benefits.vue'
import FAQ from '@/components/FAQ.vue'

const route = useRoute()
const locale = route.params.locale

const { setSeoMeta } = usePageSeo()

// 设置 SEO meta 信息
setSeoMeta()
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

