<template>
  <section class="benefits">
    <h2>{{ _t('benefits.title') }}</h2>

    <div class="benefit-item"
         v-for="(benefit, index) in benefits"
         :key="index"
         :class="{'reverse-layout': index % 2 !== 0}">
      <div class="benefit-text">
        <h3>{{ benefit.title }}</h3>
        <p v-html="benefit.description.replace(/\n/g, '<br>')"></p>
      </div>
      <div class="benefit-image">
        <NuxtImg :src="benefit.image" alt="Benefit Image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { _t } from '@/i18n/utils'

const benefits = computed(() => [
  {
    title: _t('benefits.convenience.title'),
    description: _t('benefits.convenience.description'),
    image: '/images/yt_benefits1.png',
  },
  {
    title: _t('benefits.avoidAds.title'),
    description: _t('benefits.avoidAds.description'),
    image: '/images/yt_benefits2.png',
  },
  {
    title: _t('benefits.saveData.title'),
    description: _t('benefits.saveData.description'),
    image: '/images/yt_benefits3.png',
  },
  {
    title: _t('benefits.moreFromDownloads.title'),
    description: _t('benefits.moreFromDownloads.description'),
    image: '/images/yt_benefits4.png',
  }
])
</script>

<style scoped>
.benefits {
  text-align: center;
  padding: 20px;
}

.benefits h2 {
  font-size: 2rem;
  color: #1A3B8C;
  margin-bottom: 40px;
}

.benefit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;
  width: 88%;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;
}

.benefit-item.reverse-layout {
  flex-direction: row-reverse;
}

.benefit-text {
  width: 60%;
  text-align: left;
}

.benefit-text h3 {
  font-size: 1.5rem;
  color: #1A3B8C;
  margin-bottom: 15px;
}

.benefit-text p {
  font-size: 0.9rem;
  color: #3E3E3E;
  white-space: pre-wrap;
  line-height: 24px;
}

.benefit-image img {
  max-width: 420px;
  height: auto;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .benefit-item {
    flex-direction: column;
    text-align: center;
  }

  .benefit-text {
    width: 100%;
  }

  .benefit-image img {
    width: 80%;
  }
  .benefit-item.reverse-layout {
  flex-direction:column;
}
}
</style>
