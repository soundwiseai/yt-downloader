<template>
    <div class="carousel-container">
      <div class="carousel" ref="carousel">
        <div
          class="carousel-item"
          v-for="(review, index) in reviews"
          :key="index"
          :class="{'active': activeIndex === index}"
        >
          <div class="quote-icon">“</div>
          <div class="review-content">
            <p>{{ review.text }}</p>
          </div>
          <div class="review-author">
            <span>{{ review.author }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: 0, // 当前卡片索引
        reviews: [
          { text: "Perfect for saving my favorite videos! Fast downloads and super simple to use. No registration needed.", author: "Sarah_Bennett92" },
          { text: "This tool is great! I love how easy it is to download videos in various formats.", author: "John_Doe" },
          { text: "I’ve been using this for months, and it always works perfectly.", author: "Jane_Smith" },
          { text: "Fast and reliable. The best video downloader!", author: "Michael_Johnson" },
          { text: "Easy to use and very effective for saving content.", author: "David_Lee" },
          { text: "Highly recommended! Works flawlessly for all my videos.", author: "Emma_Wilson" }
        ]
      };
    },
    mounted() {
      this.startAutoScroll();
    },
    methods: {
      startAutoScroll() {
        setInterval(() => {
          this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
          this.$nextTick(() => {
            this.scrollToCurrent();
          });
        }, 3000); // 每3秒切换一次卡片
      },
      scrollToCurrent() {
        const container = this.$refs.carousel;
        const activeCard = container.children[this.activeIndex];
        container.scrollTo({
          left: activeCard.offsetLeft, // 滚动到当前卡片
          behavior: 'smooth'
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 容器，限制卡片滚动区域 */
  .carousel-container {
    width: 100%;
    height: 200px; /* 设置卡片容器高度 */
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
  
  