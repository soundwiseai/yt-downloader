<template>
  <section class="features">
    <h2>{{ $t('featuresConverter') }}</h2>
    <div class="features-container">
      <div class="feature-item" v-for="(feature, index) in $tm('features')" :key="index">
        <div class="feature-icon">
          <img :src="feature.icon" alt="feature icon" />
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
    <div class="download-button-container">
      <button class="download-button" @click="goHome">{{ $t('downloadNow') }}</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/').then(() => {
    window.scrollTo(0, 0); // 先滚动到顶部
    setTimeout(() => {
      location.reload(); // 刷新页面
    }, 100); // 延迟一点，确保滚动生效
  });
    }
  }
};
</script>

<style scoped>
.features {
  text-align: center;
  padding: 20px 20px;
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #1A3B8C;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 每行显示三个卡片 */
  grid-gap: 20px;
  margin: 0 auto;
  width: 88%;
}

.feature-item {
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
}

.feature-icon img {
  width: 116px;
  height: 116px;
}

.feature-item h3 {
  font-size: 1.3rem;
  color: #1A3B8C;
}

.feature-item p {
  font-size: 0.9rem;
  color: #3E3E3E;
}

.download-button-container {
  margin-top: 40px;
}

.download-button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
}

.download-button:hover {
  background-color: #0056b3;
}

@media (max-width: 1024px) {
  .features-container {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
    /* 在小屏幕下每行显示一个卡片 */
  }

  .feature-item {
    width: 100%;
  }
}
</style>