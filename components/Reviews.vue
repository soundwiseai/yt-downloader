<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div
        class="carousel-item"
        v-for="(review, index) in reviews.length"
        :key="index"
        :class="{'active': activeIndex === index}"
      >
        <div class="card-accent"></div>
        <div class="card-body">
          <div class="quote-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 7H7C5.89543 7 5 7.89543 5 9V13C5 14.1046 5.89543 15 7 15H9.5C9.5 16.3807 8.38071 17.5 7 17.5V19.5C9.48528 19.5 11.5 17.4853 11.5 15V9C11.5 7.89543 10.6046 7 9.5 7H11ZM19.5 7H15.5C14.3954 7 13.5 7.89543 13.5 9V13C13.5 14.1046 14.3954 15 15.5 15H18C18 16.3807 16.8807 17.5 15.5 17.5V19.5C17.9853 19.5 20 17.4853 20 15V9C20 7.89543 19.1046 7 18 7H19.5Z" fill="#2563eb"/>
            </svg>
          </div>
          <div class="star-rating">
            <svg v-for="star in 5" :key="star" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div class="review-content">
            <p v-html="_t(`reviews[${index}].text`)"></p>
          </div>
          <div class="review-author">
            <div class="author-avatar">
              {{ _t(`reviews[${index}].author`).charAt(0) }}
            </div>
            <span>{{ _t(`reviews[${index}].author`) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { _t, _tm } from '@/i18n/utils'

// 状态
const activeIndex = ref(0)
const scrollInterval = ref(null)
const carousel = ref(null)

// 在 setup 顶层调用 _tm
const reviewsData = _tm('reviews')

// 获取评论列表
const reviews = computed(() => reviewsData)

// 滚动到当前选中项
const scrollToCurrent = () => {
  const container = carousel.value
  if (!container) return

  const activeCard = container.children[activeIndex.value]
  if (!activeCard) return

  container.scrollTo({
    left: activeCard.offsetLeft,
    behavior: 'smooth'
  })
}

// 停止自动滚动
const stopAutoScroll = () => {
  if (scrollInterval.value) {
    clearInterval(scrollInterval.value)
    scrollInterval.value = null
  }
}

// 开始自动滚动
const startAutoScroll = () => {
  // 清除可能存在的旧定时器
  stopAutoScroll()

  scrollInterval.value = setInterval(() => {
    try {
      const reviewsList = reviews.value
      if (!reviewsList || !reviewsList.length) return

      activeIndex.value = (activeIndex.value + 1) % reviewsList.length
      nextTick(() => {
        scrollToCurrent()
      })
    } catch (error) {
      console.error('Error in auto scroll:', error)
      stopAutoScroll()
    }
  }, 3000)
}

// 生命周期钩子
onMounted(() => {
  startAutoScroll()
})

onBeforeUnmount(() => {
  stopAutoScroll()
})
</script>

<style scoped>
.carousel-container {
  width: 100%;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  margin-top: 40px;
  padding: 10px 0;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 24px;
  padding: 20px 40px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel {
  scrollbar-width: none;
}

.carousel-item {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
  width: 33.33%;
  flex-shrink: 0;
  scroll-snap-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  position: relative;
}

.carousel-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
}

.carousel-item.active {
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-accent {
  width: 5px;
  min-height: 100%;
  background: linear-gradient(180deg, #2563eb 0%, #3b82f6 100%);
  flex-shrink: 0;
}

.card-body {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.quote-icon {
  opacity: 0.8;
  line-height: 1;
}

.star-rating {
  display: flex;
  gap: 3px;
  margin-bottom: 4px;
}

.review-content {
  font-size: 1rem;
  color: #1e293b;
  line-height: 1.7;
  flex: 1;
}

.review-content p {
  margin: 0;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.review-author span {
  font-size: 0.95rem;
  color: #1e293b;
  font-weight: 600;
}

.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.carousel-container::before {
  left: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

@media (max-width: 1024px) {
  .carousel-item {
    width: 45%;
  }
}

@media (max-width: 768px) {
  .carousel {
    gap: 16px;
    padding: 16px 20px;
  }

  .carousel-item {
    width: 85%;
  }

  .card-body {
    padding: 20px 18px;
  }

  .carousel-container::before,
  .carousel-container::after {
    width: 30px;
  }
}
</style>
