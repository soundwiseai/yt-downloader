<template>
  <div id="app">
    <Header />
    <router-view /> <!-- 动态加载不同页面 -->
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
/* 全局样式 */
body {
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  font-family: "DM Sans", sans-serif;
}
</style>
