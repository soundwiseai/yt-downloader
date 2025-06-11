<template>
  <section class="how-to-convert">
    <h2 class="title">{{ _t("howToConvertTitle") }}</h2>
    <p class="description">
      {{ _t("howToConvertDescription") }}
    </p>
    
    <div class="steps">
      <div v-for="(step, index) in steps" :key="index" class="step">
        <NuxtImg :src="step.image" :alt="step.title" class="step-image"/>
        <p class="step-text">
          <span class="step-number">{{ _t("step") }} {{ index + 1 }}.</span> {{ _t(step.title) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { _t } from '@/i18n/utils'

// 定义步骤列表
const steps = [
  { image: "/images/yt_convert_deps1.png", title: "copyUrl" },
  { image: "/images/yt_convert_deps2.png", title: "clickDownload" },
  { image: "/images/yt_convert_deps3.png", title: "saveVideo" }
]
</script>

<style scoped>
.how-to-convert {
  text-align: center;
  max-width: 90%;
  margin: auto;
  padding: 20px 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1A3B8C;
  margin-bottom: 15px;
}

.description {
  font-size: 0.9rem;
  color: #555;
  width: 78%;
  margin: auto;
  line-height: 1.6;
}

.steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
  flex-wrap: wrap; /* Allow wrapping on small screens */
}

.step {
  flex: 1 1 30%; /* Ensures each step takes 30% width on larger screens */
  text-align: center;
  margin-bottom: 30px; /* Adds spacing between steps */
}

.step-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.step-text {
  font-size: 1rem;
  color: #222;
  margin-top: 20px;
}

.step-number {
  font-weight: bold;
  color: #0d1c44;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .steps {
    flex-direction: column; /* Stack items vertically on smaller screens */
  }

  .step {
    flex: 1 1 100%; /* Take full width */
    margin-bottom: 15px;
  }

  .title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.85rem;
    width: 90%;
  }

  .step-text {
    font-size: 0.95rem;
  }
}
</style>