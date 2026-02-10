<template>
  <section class="features">
    <h2>{{ _t('featuresConverter') }}</h2>
    <p class="features-subtitle">Everything you need for fast, reliable video downloads</p>
    <div class="features-container">
      <div class="feature-item" v-for="(feature, index) in _tm('features') " :key="index">
        <div class="feature-icon-wrapper">
          <div class="feature-icon">
            <img :src="_t(`features[${index}].icon`)" alt="feature icon" />
          </div>
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
  padding: 60px 20px;
}

.features h2 {
  font-size: 2.2rem;
  margin-bottom: 12px;
  color: #1e293b;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.features-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 48px;
  font-weight: 400;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.feature-item {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03);
  padding: 36px 28px 32px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f1f5f9;
  position: relative;
}

.feature-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: #e0e7ff;
}

.feature-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background 0.3s ease;
}

.feature-item:hover .feature-icon {
  transform: scale(1.08);
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.feature-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.feature-item h3 {
  font-size: 1.2rem;
  color: #1e293b;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 0;
}

.feature-item p {
  font-size: 0.92rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
}

.download-button-container {
  margin-top: 52px;
}

.download-button {
  padding: 14px 36px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
}

.download-button:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
}

.download-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

@media (max-width: 1024px) {
  .features-container {
    width: 90%;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 40px 16px;
  }

  .features h2 {
    font-size: 1.7rem;
  }

  .features-subtitle {
    font-size: 1rem;
    margin-bottom: 32px;
  }

  .features-container {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .feature-item {
    padding: 28px 24px;
  }

  .download-button-container {
    margin-top: 36px;
  }
}
</style>
