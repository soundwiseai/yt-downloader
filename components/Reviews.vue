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
  /* 容器，限制卡片滚动区域 */
  .carousel-container {
    width: 100%;
    min-height: 200px; /* 设置卡片容器最小高度 */
    overflow: hidden; /* 隐藏超出部分 */
    position: relative;
    margin-top: 40px;
  }
  
  /* 滚动区域，卡片水平排列 */
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory; /* 强制对齐 */
    gap: 10px; /* 卡片间距 */
    padding: 20px 0;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch; /* 让滚动更平滑 */
  }
  
  /* 隐藏滚动条 */
  .carousel::-webkit-scrollbar {
    display: none;
  }
  
  /* 隐藏滚动条（对于 Firefox） */
  .carousel {
    scrollbar-width: none;
  }
  
  /* 卡片样式 */
  .carousel-item {
    background-color: #f1f1f1;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 33.33%; /* 每个卡片占容器的三分之一宽度 */
    flex-shrink: 0; /* 防止卡片缩小 */
    scroll-snap-align: center; /* 卡片居中对齐 */
    transition: transform 0.3s ease;
  }
  
  .carousel-item .quote-icon {
    font-size: 3rem;
    color: #007bff;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  
  .carousel-item .review-content {
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .carousel-item .review-author {
    font-size: 1rem;
    color: #007bff;
    font-weight: bold;
  }
  
  /* 使左右的卡片稍微外露 */
  .carousel-container::before,
  .carousel-container::after {
    content: "";
    position: absolute;
    top: 0;
    width: 15%; /* 让左右卡片外露 */
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  .carousel-container::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.9), transparent);
  }
  
  .carousel-container::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.9), transparent);
  }
  </style>
  
  