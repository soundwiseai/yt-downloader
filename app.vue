<template>
  <div id="app">
    <Header :locale="locale"/>
    <NuxtPage />
    <Footer :locale="locale"/>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import { computed, watch } from 'vue'
const route = useRoute()

// 从路径中提取 locale
const getLocaleFromPath = (path) => {
  const pathParts = path.split('/')
  // 检查是否是根路径下的 locale，如 /zh-TW
  if (pathParts.length > 1 && pathParts[1]) {
    // 检查是否符合语言代码格式（如 'en', 'zh-TW', 'zh-CN' 等）
    const localePattern = /^[a-z]{2}(-[A-Z]{2})?$/
    if (localePattern.test(pathParts[1])) {
      return pathParts[1]
    }
  }
  return null
}

// 使用计算属性响应式地获取当前 locale
const locale = computed(() => {
  const fromParams = route.params.locale
  const fromPath = getLocaleFromPath(route.path)
  const result = fromParams || fromPath || 'en'
  console.log('路由参数:', route.params);
  console.log('当前路径:', route.path);
  console.log('当前使用的 locale:', result);
  return result
})

useHead({
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-90XNEYE25X',
      async: true
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-90XNEYE25X');
      `
    }
  ]
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  font-family: "DM Sans", sans-serif;
}
</style>
