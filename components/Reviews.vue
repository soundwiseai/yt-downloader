<template>
  <div class="carousel-container">、
    <div class="carousel" ref="carousel">
      <div
        class="carousel-item"
        v-for="(review, index) in reviews.length"
        :key="index"
        :class="{'active': activeIndex === index}"
      >
        <div class="review-author">
          <span>{{ _t(`reviews[${index}].author`) }}</span>
        </div>
        <div class="review-content">
          <p v-html="_t(`reviews[${index}].text`)"></p>
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
  /* Container - limits card scroll area */
  .carousel-container {
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    position: relative;
    margin-top: 3rem;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  /* Scroll area - horizontal card layout */
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding: 1.5rem 0;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  /* Hide scrollbar - Webkit */
  .carousel::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar - Firefox */
  .carousel {
    scrollbar-width: none;
  }

  /* Card styles */
  .carousel-item {
    background-color: #F8FAFC;
    border: 1px solid #E2E8F0;
    padding: 1.5rem;
    border-radius: 12px;
    width: 33.33%;
    flex-shrink: 0;
    scroll-snap-align: center;
    transition: transform 200ms ease-out, box-shadow 200ms ease-out;
    box-sizing: border-box;
  }

  .carousel-item:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .carousel-item .quote-icon {
    font-size: 2rem;
    color: #2563EB;
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
  }

  .carousel-item .review-content {
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    color: #334155;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .carousel-item .review-author {
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem;
    color: #2563EB;
    font-weight: 600;
  }

  /* Soft edge fade on left and right */
  .carousel-container::before,
  .carousel-container::after {
    content: "";
    position: absolute;
    top: 0;
    width: 10%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .carousel-container::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.7), transparent);
  }

  .carousel-container::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.7), transparent);
  }

  /* Responsive - tablet */
  @media (max-width: 1024px) {
    .carousel-item {
      width: 45%;
    }
  }

  /* Responsive - mobile */
  @media (max-width: 768px) {
    .carousel-container {
      margin-top: 2rem;
    }

    .carousel-item {
      width: 80%;
      padding: 1.25rem;
    }

    .carousel {
      gap: 0.75rem;
      padding: 1rem 0;
    }
  }
  </style>
  
  