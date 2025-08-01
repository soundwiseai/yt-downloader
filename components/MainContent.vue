<template>
  <main class="main-content">
    <div class="converter-container">
      <!-- 图标 -->
      <div class="icon-container">
        <NuxtImg src="/images/yt_icon.png" alt="YouTube Icon" class="icon" />
      </div>

      <!-- 标题 -->
      <h1 class="title">{{ _t("title") }}</h1>

      <!-- 描述 -->
      <p class="description">
        {{ _t("description") }}
      </p>

      <div class="container">
        <div class="input-wrapper">
          <input type="text" v-model="yt_url" placeholder="https://www.youtube.com/watch?v=..." class="input-box"  @paste="onPaste"/>
          <button class="download-button2" :class="{ 'disabled': loading }" :disabled="loading" @click="fetchFormats">
            {{ _t("download") }}
          </button>
        </div>
      </div>

      <p class="converter-container-tip">
        {{ _t("tip") }}
        <span class="info-container">
          <!-- 信息图标 -->
          <NuxtImg class="info-icon" :src="`/images/yt_tips.png`"/>

          <!-- 悬停时显示的提示框 -->
          <span class="tooltip">
            <span v-html="_t('tooltipText')"></span>
          </span>
        </span>
      </p>

      <!-- 加载动画 -->
      <div v-if="loading" class="loading-indicator">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </div>

    <div class="container2" v-if="!loading && videoData && videoData?.title">
      <div class="video-card">
        <div class="video-header">
          <NuxtImg :src="videoData.thumbnail" class="thumbnail" alt="Thumbnail" />
          <h2 class="title">{{ videoData.title }}</h2>
        </div>
        <h3 class="formats-title">{{ _t("formats") }}</h3>
        <p class="formats-title-tip">{{ _t("formatsTip") }}</p>
        <div class="formats-list">
          <div v-for="format in videoData.formats" :key="format.format_id" class="format-item">
            <span class="download-icon">⬇️</span>
            <div class="format-details">
              <a :href="format.url" class="download-link" target="_blank">
                {{ videoData.title }}.{{ format.ext }}
              </a>
              <span class="format-info">{{ format.resolution || _t('audioOnly') }} • {{ (format.filesize / (1024 *
                1024)).toFixed(2) }} MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { _t } from '@/i18n/utils'

// 响应式状态
const yt_url = ref('')
const videoData = ref({})
const loading = ref(false)
const errorMessage = ref('')

// 在组件挂载时检查剪贴板
onMounted(() => {
  errorMessage.value = _t("errorGetVideoInfo")
})

const isValidYoutubeUrl = (url) => {
  return url.includes('youtube.');
}

// 处理粘贴事件
const onPaste = (event) => {
  let text = (event.clipboardData || window.clipboardData).getData("text");
  yt_url.value = text
  fetchFormats()
}

// 获取视频格式
const fetchFormats = async () => {
  if (!yt_url.value || !isValidYoutubeUrl(yt_url.value)) {
    alert('请输入有效的 YouTube 视频 URL')
    return
  }

  loading.value = true
  try {
    const response = await axios.get('https://youtubetomp4.pro/api/get-formats', {
      params: { url: yt_url.value }
    })
    videoData.value = response.data
  } catch (error) {
    console.error(errorMessage.value, error)
    alert(errorMessage.value)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
/* 全局样式 */
.main-content {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.converter-container {
  padding: 40px 20px;
}

.icon-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.icon {
  width: 285px;
  height: auto;
}

.title {
  font-size: 32px;
  font-weight: bold;
  color: #113b92;
}

.description {
  font-size: 16px;
  color: #555;
  margin: 10px 0 20px;
}

/* 最外层容器居中 */
.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* 输入框和按钮的整体外层 */
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  /* 最大宽度，防止过宽 */
  height: 60px;
  /* 高度统一 */
  gap: 10px;
  box-sizing: border-box;
  background-color: #e8e8e8;
}

/* 输入框样式 */
.input-box {
  flex: 1;
  /* 填满剩余空间 */
  padding: 0 12px;
  border: none;
  outline: none;
  font-size: 1em;
  color: #333;
  height: 100%;
  /* 保证输入框高度与父容器一致 */
  background-color: #e8e8e8;
  border-radius: 8px;
}

/* 下载按钮样式 */
.download-button2 {
  background-color: #027AFF;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  height: 100%;
  /* 保证按钮高度与输入框一致 */
  padding: 0 20px;
  /* 左右内边距 */
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
  word-wrap: break-word;
  max-width: 200px;
}

/* 按钮 hover 样式 */
.download-button2:hover {
  background-color: #027AFF;
}

.download-button2.disabled {
  background-color: #ccc;
  color: #888;
  cursor: not-allowed;
}

.converter-container-tip {
  font-size: 12px;
  margin-top: 20px;
}

.container2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-card {
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
}

.video-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail {
  width: 120px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  flex-grow: 1;
}

.formats-title {
  font-size: 14px;
  font-weight: bold;
}

.formats-title-tip {
  font-size: 12px;
  margin-top: -10px;
}

.formats-list {
  margin-top: 20px;
}

.format-item {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  background: #ffffff;
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 16px;
  justify-content: space-between;
  /* 图标和内容之间保持间距 */
}

.download-icon {
  font-size: 36px;
  margin-right: 10px;
}

.format-details {
  display: flex;
  flex-direction: column;
  /* 垂直排列内容 */
  align-items: flex-start;
  /* 让文本居左 */
  flex-grow: 1;
  /* 使format-details占据剩余空间 */
  justify-content: center;
  /* 保证内容垂直居中 */
  text-align: left;
}

.download-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.download-link:hover {
  text-decoration: underline;
}

.format-info {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

/* 标准写法 */
::placeholder {
  color: #999;
  opacity: 1;
}

/* 兼容 WebKit (Chrome, Safari, Edge) */
::-webkit-input-placeholder {
  color: #999;
}

/* 兼容 Mozilla Firefox */
::-moz-placeholder {
  color: #999;
}

/* 兼容 Microsoft Edge (旧版) */
:-ms-input-placeholder {
  color: #999;
}

/* 兼容 Internet Explorer */
:-moz-placeholder {
  color: #999;
}

/* 信息图标样式 */
.info-container {
  display: inline-block;
  position: relative;
}


.converter-container-tip {
  display: inline-flex;
  align-items: center;
  /* 保持垂直居中 */
  gap: 6px;
  /* 文字和图标之间增加间距 */
}

.info-container {
  position: relative;
  display: inline-block;
}

.info-icon {
  font-size: 14px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-weight: bold;
}

.info-icon:hover {
  background-color: #ddd;
}

/* 提示框样式 */
.tooltip {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  background-color: white;
  color: black;
  text-align: left;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  line-height: 1.4;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 100;
}

/* 悬停时显示提示框 */
.info-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

/* 小三角形 */
.tooltip::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {

  /* 移动端：输入框和按钮纵向排列 */
  .input-wrapper {
    flex-direction: column;
    /* 输入框和按钮纵向排列 */
    width: 100%;
    /* 宽度充满屏幕 */
    height: auto;
    /* 使容器的高度适应内容 */
    background-color: transparent;
  }

  .input-box {
    width: 100%;
    margin-bottom: 0px;
    padding: 18px;
  }

  .download-button2 {
    width: 160px;
    /* 按钮在小屏幕上占满宽度 */
    padding: 16px 0;
    /* 增加按钮的高度 */
  }

  .video-card {
    width: 100%;
    max-width: none;
  }

  .formats-list {
    width: 100%;
  }

  .format-item {
    align-items: flex-start;
    /* 确保所有内容都对齐 */
    text-align: left;
  }

  .download-icon {
    margin-bottom: 10px;
    /* 图标和内容之间的间距 */
  }

  .format-details {
    align-items: flex-start;
    /* 让文本靠左 */
    width: 100%;
    /* 保证格式信息区占据剩余空间 */
  }

  .download-link {
    font-size: 14px;
  }

  .format-info {
    font-size: 12px;
  }

  .icon {
    width: 185px;
    height: auto;
  }
}

/* Web端样式 */
@media screen and (min-width: 769px) {
  .container {
    justify-content: center;
  }

  .input-wrapper {
    width: 44%;
  }
}


.loading-indicator {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.loading-indicator .bar {
  width: 10px;
  height: 30px;
  margin: 0 3px;
  background-color: #1A3B8C;
  animation: loadingAnimation 1.2s infinite;
}

.loading-indicator .bar:nth-child(1) {
  animation-delay: 0s;
}

.loading-indicator .bar:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-indicator .bar:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loadingAnimation {

  0%,
  80%,
  100% {
    transform: scaleY(0.4);
  }

  40% {
    transform: scaleY(1);
  }
}
</style>
