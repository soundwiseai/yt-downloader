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
          <button class="download-button2" :class="{ 'is-loading': loading }" :disabled="loading" @click="fetchFormats">
            <span v-if="loading" class="btn-loading">
              <span class="spinner"></span>
            </span>
            <span v-else>{{ _t("download") }}</span>
          </button>
        </div>
      </div>

      <p class="converter-container-tip">
        {{ _t("tip") }}
        <span class="info-container">
          <!-- 信息图标 -->
          <NuxtImg class="info-icon" :src="`/images/yt_tips.png`" alt="YouTube URL tips icon"/>

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
        <div class="formats-save-tip-wrapper">
          <span class="formats-save-tip">{{ _t("saveTip") }}</span>
          <div class="save-tip-tooltip">
            <NuxtImg src="/images/yt_save_tip.png" alt="Right-click to save video" class="save-tip-img" />
          </div>
        </div>
        <div class="formats-list">
          <div v-for="format in videoData.formats" :key="format.format_id" class="format-item">
            <div class="format-details">
              <span class="format-name">{{ videoData.title }}.{{ format.ext }}</span>
              <span class="format-info">{{ format.resolution || _t('audioOnly') }} &bull; {{ (format.filesize / (1024 *
                1024)).toFixed(2) }} MB</span>
            </div>
            <a :href="format.url" class="format-download-btn" target="_blank" rel="noopener">
              <svg class="dl-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {{ _t("download") }}
            </a>
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
    const response = await axios.get('/api/get-formats', {
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
/* ==============================
   MainContent.vue - Redesigned
   Design Spec: Flat Minimal (SaaS Tool)
   ============================== */

/* Global */
.main-content {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Hero Section */
.converter-container {
  background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%);
  padding: 60px 20px;
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

/* Title - Poppins 700 */
.title {
  font-family: 'Poppins', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: #1E293B;
}

/* Description - Open Sans */
.description {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.125rem;
  color: #475569;
  margin: 10px 0 20px;
  line-height: 1.6;
}

/* Input area outer container */
.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* Input wrapper - white bg, bordered */
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 100%;
  max-width: 560px;
  height: 56px;
  gap: 10px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border: 2px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: border-color 200ms ease-out;
}

.input-wrapper:focus-within {
  border-color: #2563EB;
}

/* Input box - white, no border */
.input-box {
  flex: 1;
  padding: 0 16px;
  border: none;
  outline: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #1E293B;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 12px;
}

/* Download button */
.download-button2 {
  font-family: 'Poppins', sans-serif;
  background-color: #2563EB;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  height: calc(100% - 8px);
  padding: 0 24px;
  border-radius: 8px;
  margin-right: 4px;
  transition: background-color 200ms ease-out;
  word-wrap: break-word;
  max-width: 200px;
}

.download-button2:hover {
  background-color: #1D4ED8;
}

/* No URL entered - muted state */
.download-button2.is-empty {
  background-color: #CBD5E1;
  color: #94A3B8;
  cursor: not-allowed;
}

/* Loading state - pulse animation */
.download-button2.is-loading {
  background-color: #2563EB;
  cursor: wait;
  opacity: 0.8;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Tip text below input */
.converter-container-tip {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;
  color: #64748B;
  margin-top: 20px;
}

/* Video result area */
.container2 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

/* Video card */
.video-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
  border-radius: 8px;
  margin-right: 12px;
  object-fit: cover;
}

/* Title inside video card */
.video-card .title {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1E293B;
  flex-grow: 1;
  text-align: left;
}

.formats-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
  margin-top: 20px;
}

.formats-title-tip {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;
  color: #64748B;
  margin-top: -8px;
}

.formats-save-tip-wrapper {
  position: relative;
  display: inline-block;
  margin-top: 4px;
  cursor: pointer;
}

.formats-save-tip {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;
  color: #94A3B8;
  font-style: italic;
  text-decoration: none;
  border-bottom: 1px dashed #CBD5E1;
  padding-bottom: 1px;
  transition: color 200ms ease-out;
}

.formats-save-tip-wrapper:hover .formats-save-tip {
  color: #2563EB;
  border-bottom-color: #2563EB;
}

/* Hover 弹出教程图片 */
.save-tip-tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background: #1E293B;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  padding: 8px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms ease-out, visibility 200ms ease-out;
  z-index: 100;
  pointer-events: none;
}

.formats-save-tip-wrapper:hover .save-tip-tooltip {
  visibility: visible;
  opacity: 1;
}

.save-tip-tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #1E293B transparent transparent transparent;
}

.save-tip-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}

.formats-list {
  margin-top: 20px;
}

/* Format list item */
.format-item {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  justify-content: space-between;
  transition: background-color 200ms ease-out;
}

.format-item:hover {
  background-color: #F8FAFC;
}

.format-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  justify-content: center;
  text-align: left;
  min-width: 0;
}

.format-name {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.format-info {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.75rem;
  color: #64748B;
  margin-top: 4px;
}

/* Download button per format */
.format-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 12px;
  padding: 8px 16px;
  background-color: #2563EB;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 200ms ease-out;
}

.format-download-btn:hover {
  background-color: #1D4ED8;
  color: #FFFFFF;
  text-decoration: none;
}

.dl-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Placeholder */
::placeholder {
  color: #94A3B8;
  opacity: 1;
}

::-webkit-input-placeholder {
  color: #94A3B8;
}

::-moz-placeholder {
  color: #94A3B8;
}

:-ms-input-placeholder {
  color: #94A3B8;
}

/* Info icon and tooltip */
.info-container {
  display: inline-block;
  position: relative;
}

.converter-container-tip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  color: #64748B;
  font-weight: bold;
  border-radius: 50%;
  transition: background-color 200ms ease-out;
}

.info-icon:hover {
  background-color: #E2E8F0;
}

/* Tooltip */
.tooltip {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  background-color: #FFFFFF;
  color: #334155;
  text-align: left;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms ease-out;
  z-index: 100;
}

.info-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 8px;
  border-style: solid;
  border-color: #FFFFFF transparent transparent transparent;
}

/* ==============================
   Responsive - Mobile First
   ============================== */
@media screen and (max-width: 768px) {
  .converter-container {
    padding: 40px 16px;
  }

  .input-wrapper {
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: auto;
    background-color: transparent;
    border: none;
    box-shadow: none;
    gap: 12px;
    padding: 0;
  }

  .input-wrapper:focus-within {
    border-color: transparent;
  }

  .input-box {
    width: 100%;
    height: 56px;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    padding: 0 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    font-size: 1rem;
  }

  .input-box:focus {
    border-color: #2563EB;
  }

  .download-button2 {
    width: 100%;
    height: 52px;
    padding: 14px 0;
    margin-right: 0;
    font-size: 1.0625rem;
    border-radius: 12px;
    max-width: 100%;
  }

  .video-card {
    width: 100%;
    max-width: none;
  }

  .formats-list {
    width: 100%;
  }

  .format-item {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .format-details {
    align-items: flex-start;
    width: 100%;
  }

  .format-download-btn {
    margin-left: 0;
    justify-content: center;
    padding: 10px 16px;
  }

  .format-name {
    font-size: 0.8125rem;
  }

  .format-info {
    font-size: 0.75rem;
  }

  .icon {
    width: 185px;
    height: auto;
  }

  .title {
    font-size: 1.875rem;
  }

  .description {
    font-size: 1rem;
  }
}

/* Desktop */
@media screen and (min-width: 769px) {
  .container {
    justify-content: center;
  }

  .input-wrapper {
    width: 50%;
    min-width: 480px;
  }
}

/* Loading indicator */
.loading-indicator {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.loading-indicator .bar {
  width: 10px;
  height: 30px;
  margin: 0 3px;
  background-color: #2563EB;
  border-radius: 2px;
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
