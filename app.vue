<template>
  <div id="app">
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

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
