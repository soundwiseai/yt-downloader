<template>
  <Home :locale="locale" type="downloader" />
</template>

<script setup lang="ts">
import Home from '@/components/Home.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const locale = route.params.locale
</script>
