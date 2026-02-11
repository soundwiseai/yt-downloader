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
    // 检查是否符合语言代码格式（如 'en', 'zh-TW', 'zh-CN', 'es-419' 等）
    const localePattern = /^[a-z]{2}(-\w+)?$/
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
  // console.log('路由参数:', route.params);
  // console.log('当前路径:', route.path);
  // console.log('当前使用的 locale:', result);
  return result
})

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    { name: 'server-locale', content: locale.value },
    { 'http-equiv': 'content-language', content: locale.value },
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
    },
    {
      children: `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "t51z5mynwr");
      `
    }
  ]
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #FFFFFF;
  color: #1E293B;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  cursor: pointer;
}

button {
  cursor: pointer;
}
</style>
