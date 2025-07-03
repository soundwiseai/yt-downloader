<template>
  <Home :locale="locale" type="mp3" />
</template>

<script setup lang="ts">
import Home from '~/components/Home.vue'
import { useRoute } from 'vue-router'
import { usePageSeo } from '../../composables/usePageSeo'

const route = useRoute()
const locale = route.params.locale

const { setSeoMeta } = usePageSeo()

// 设置 SEO meta 信息
setSeoMeta()
</script>
