<template>
  <div id="app">
    <Header />
    <MainContent />
    <Reviews />
    <VedioConvertDeps/>
    <Features />
    <Benefits />
    <FAQ />
    <Footer />
  </div>
</template>

<script>
import VedioConvertDeps from './components/VedioConvertDeps.vue'
import Header from './components/Header.vue'
import MainContent from './components/MainContent.vue'
import Features from './components/Features.vue'
import Benefits from './components/Benefits.vue'
import Reviews from './components/Reviews.vue'
import FAQ from './components/FAQ.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    MainContent,
    VedioConvertDeps,
    Reviews,
    Features,
    Benefits,
    FAQ,
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
