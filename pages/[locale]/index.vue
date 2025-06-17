<template>
  <Home :locale="locale" />
</template>

<script setup lang="ts">
import Home from '@/components/Home.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const locale = route.params.locale

const { setSeoMeta } = usePageSeo()

// 设置 SEO meta 信息
setSeoMeta()
</script>
