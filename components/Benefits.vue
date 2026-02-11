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
import { _t, _te } from '@/i18n/utils'

const benefits = computed(() => {
  let items = []
  // 检查每个翻译是否存在, 只有存在时才添加到 items 中
  if(_te('benefits.convenience.title')) {
    items.push({
      title: _t('benefits.convenience.title'),
      description: _t('benefits.convenience.description'),
      image: '/images/yt_benefits1.png',
    })
  }
  if(_te('benefits.avoidAds.title')) {
    items.push({
      title: _t('benefits.avoidAds.title'),
      description: _t('benefits.avoidAds.description'),
      image: '/images/yt_benefits2.png',
    })
  }
  if(_te('benefits.saveData.title')) {
    items.push({
      title: _t('benefits.saveData.title'),
      description: _t('benefits.saveData.description'),
      image: '/images/yt_benefits3.png',
    })
  }
  if(_te('benefits.moreFromDownloads.title')) {
    items.push({
      title: _t('benefits.moreFromDownloads.title'),
      description: _t('benefits.moreFromDownloads.description'),
      image: '/images/yt_benefits4.png',
    })
  }
  return items
})

</script>

<style scoped>
.benefits {
  text-align: center;
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefits h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 3rem;
}

.benefit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  gap: 3rem;
  width: 100%;
  transition: transform 200ms ease-out;
}

.benefit-item.reverse-layout {
  flex-direction: row-reverse;
}

.benefit-text {
  flex: 1;
  text-align: left;
}

.benefit-text h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 1rem;
}

.benefit-text p {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #475569;
  white-space: pre-wrap;
  line-height: 1.7;
}

.benefit-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.benefit-image img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .benefits {
    padding: 3rem 1.5rem;
  }

  .benefit-item {
    gap: 2rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .benefits {
    padding: 2rem 1rem;
  }

  .benefits h2 {
    font-size: 1.875rem;
    margin-bottom: 2rem;
  }

  .benefit-item {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .benefit-text {
    width: 100%;
    text-align: center;
  }

  .benefit-image img {
    width: 85%;
  }

  .benefit-item.reverse-layout {
    flex-direction: column;
  }
}
</style>
