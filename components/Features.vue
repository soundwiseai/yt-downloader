<template>
  <section class="features">
    <h2>{{ _t('featuresConverter') }}</h2>
    <div class="features-container">
      <div class="feature-item" v-for="(feature, index) in _tm('features') " :key="index">
        <div class="feature-icon">
           <img :src="_t(`features[${index}].icon`)" alt="feature icon" />
        </div>
        <h3>{{ _t(`features[${index}].title`) }}</h3>
        <p v-html="_t(`features[${index}].description`)"></p>
      </div>
    </div>
    <div class="download-button-container">
      <button class="download-button" @click="goHome">{{ _t('downloadNow') }}</button>
    </div> 
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { _t, _tm } from '@/i18n/utils'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/').then(() => {
    window.scrollTo(0, 0)  // 先滚动到顶部
    setTimeout(() => {
      location.reload()  // 刷新页面
    }, 100)  // 延迟一点，确保滚动生效
  })
}
</script>

<style scoped>
.features {
  text-align: center;
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.features h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1E293B;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 0 auto;
  width: 100%;
}

.feature-item {
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: box-shadow 200ms ease-out, transform 200ms ease-out;
}

.feature-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.feature-icon img {
  width: 96px;
  height: 96px;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.5rem;
}

.feature-item p {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.6;
}

.download-button-container {
  margin-top: 3rem;
}

.download-button {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: 12px 24px;
  background-color: #2563EB;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.125rem;
  transition: background-color 200ms ease-out;
}

.download-button:hover {
  background-color: #1D4ED8;
}

@media (max-width: 1024px) {
  .features-container {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 2rem 1rem;
  }

  .features h2 {
    font-size: 1.875rem;
    margin-bottom: 2rem;
  }

  .features-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .feature-item {
    padding: 1.5rem 1rem;
  }

  .download-button-container {
    margin-top: 2rem;
  }
}
</style>