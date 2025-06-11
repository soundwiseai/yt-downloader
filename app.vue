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
