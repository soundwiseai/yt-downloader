<template>
    <div class="faq-container">
      <h2 class="faq-title">{{ _t('faqTitle') }}</h2>
      <div class="faq-wrapper">
        <div v-for="(item, index) in faqs" :key="index" class="faq-item">
          <div class="faq-header" @click="toggleFAQ(index)">
            <span class="arrow">{{ activeIndex === index ? "▼" : "▶" }}</span>
            <span class="faq-question">{{ item.question }}</span>
          </div>
          <div v-if="activeIndex === index" class="faq-content">
            <div v-html="item.answer"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { _t, _te } from '@/i18n/utils'

  // 记录当前展开的索引
  const activeIndex = ref(0)

  // FAQ 列表
  const faqs = computed(() => {
    let items = []
    for(let i=1; i<10; i++) {
      if(_te(`faq${i}Question`)) {
        items.push({
          question: _t(`faq${i}Question`),
          answer: _t(`faq${i}Answer`)
        })
      }
      else break
    }
    return items
  })

  // 切换 FAQ 展开状态
  const toggleFAQ = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
  }
  </script>
  
  <style scoped>
  /* 最外层容器 */
  .faq-container {
    width: 85%;
    margin: 20px auto;
    margin-bottom: 80px;
  }
  
  /* 标题（独立，不包含在边框内） */
  .faq-title {
    font-weight: bold;
    color: #1A3B8C;
    margin-bottom: 20px;
  }
  
  /* FAQ 列表整体的背景和边框 */
  .faq-wrapper {
    border: 1px solid #3b82f6;
    background-color: #f8fafc;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* FAQ 每一项 */
  .faq-item {
    border-bottom: 0.5px solid #3b82f6;
  }
  
  /* 最后一项去掉底部边框 */
  .faq-item:last-child {
    border-bottom: none;
  }
  
  /* FAQ 标题 */
  .faq-header {
    display: flex;
    align-items: center;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #1e3a8a;
    cursor: pointer;
  }
  
  /* 箭头图标 */
  .arrow {
    margin-right: 10px;
    font-size: 14px;
    transition: transform 0.2s ease;
  }
  
  /* FAQ 内容（无额外背景） */
  .faq-content {
    padding: 5px 15px 40px 40px;
    font-size: 0.9em;
    color: #333;
    white-space: pre-line;
  }

  .faq-question {
  white-space: pre-line;
}
  </style>
  