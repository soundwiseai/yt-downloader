<template>
  <section class="benefits">
    <h2>{{ _t('benefits.title') }}</h2>

    <div class="benefit-item"
         v-for="(benefit, index) in benefits"
         :key="index"
         :class="{'reverse-layout': index % 2 !== 0, 'alt-bg': index % 2 !== 0}">
      <div class="benefit-text">
        <div class="benefit-badge">{{ String(index + 1).padStart(2, '0') }}</div>
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
  padding: 60px 20px;
}

.benefits h2 {
  font-size: 2.2rem;
  color: #1e293b;
  margin-bottom: 56px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.benefit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  gap: 48px;
  width: 88%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 48px 40px;
  border-radius: 20px;
  transition: transform 0.3s ease-in-out;
}

.benefit-item.alt-bg {
  background-color: #f8fafc;
}

.benefit-item.reverse-layout {
  flex-direction: row-reverse;
}

.benefit-text {
  width: 55%;
  text-align: left;
}

.benefit-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.benefit-text h3 {
  font-size: 1.6rem;
  color: #1e293b;
  margin-bottom: 16px;
  margin-top: 0;
  font-weight: 700;
  line-height: 1.3;
}

.benefit-text p {
  font-size: 1rem;
  color: #64748b;
  white-space: pre-wrap;
  line-height: 1.8;
  margin: 0;
}

.benefit-image {
  width: 42%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-image img {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-item:hover .benefit-image img {
  transform: scale(1.02);
  box-shadow: 0 16px 48px rgba(37, 99, 235, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06);
}

@media (max-width: 1024px) {
  .benefit-item {
    width: 94%;
    gap: 32px;
    padding: 36px 28px;
  }
}

@media (max-width: 768px) {
  .benefits {
    padding: 40px 16px;
  }

  .benefits h2 {
    font-size: 1.7rem;
    margin-bottom: 36px;
  }

  .benefit-item {
    flex-direction: column;
    text-align: center;
    padding: 32px 20px;
    gap: 24px;
    width: 100%;
  }

  .benefit-item.reverse-layout {
    flex-direction: column;
  }

  .benefit-text {
    width: 100%;
    text-align: center;
  }

  .benefit-badge {
    margin-left: auto;
    margin-right: auto;
  }

  .benefit-image {
    width: 100%;
  }

  .benefit-image img {
    width: 85%;
    max-width: 360px;
  }
}
</style>
