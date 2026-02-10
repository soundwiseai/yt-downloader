<template>
  <main class="main-content">
    <div class="hero-section">
      <div class="converter-container">
        <!-- Icon -->
        <div class="icon-container">
          <div class="icon-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="yt-svg-icon">
              <path d="M43.2 12.3c-.5-1.8-1.9-3.2-3.7-3.7C36.2 7.6 24 7.6 24 7.6s-12.2 0-15.5 1c-1.8.5-3.2 1.9-3.7 3.7C3.8 15.6 3.8 24 3.8 24s0 8.4 1 11.7c.5 1.8 1.9 3.2 3.7 3.7 3.3 1 15.5 1 15.5 1s12.2 0 15.5-1c1.8-.5 3.2-1.9 3.7-3.7 1-3.3 1-11.7 1-11.7s0-8.4-1-11.7z" fill="#FF0000"/>
              <path d="M19.2 31.2l10.4-7.2-10.4-7.2z" fill="#fff"/>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h1 class="title">{{ _t("title") }}</h1>

        <!-- Description -->
        <p class="description">
          {{ _t("description") }}
        </p>

        <div class="container">
          <div class="input-wrapper">
            <div class="input-inner">
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              <input type="text" v-model="yt_url" placeholder="https://www.youtube.com/watch?v=..." class="input-box" @paste="onPaste"/>
            </div>
            <button class="download-button2" :class="{ 'disabled': loading }" :disabled="loading" @click="fetchFormats">
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {{ _t("download") }}
            </button>
          </div>
        </div>

        <p class="converter-container-tip">
          {{ _t("tip") }}
          <span class="info-container">
            <!-- Info icon -->
            <span class="info-icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </span>

            <!-- Tooltip on hover -->
            <span class="tooltip">
              <span v-html="_t('tooltipText')"></span>
            </span>
          </span>
        </p>

        <!-- Loading animation -->
        <div v-if="loading" class="loading-indicator">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>

    <div class="results-section" v-if="!loading && videoData && videoData?.title">
      <div class="container2">
        <div class="video-card">
          <div class="video-header">
            <NuxtImg :src="videoData.thumbnail" class="thumbnail" alt="Thumbnail" />
            <h2 class="video-title">{{ videoData.title }}</h2>
          </div>
          <div class="formats-section">
            <h3 class="formats-title">{{ _t("formats") }}</h3>
            <p class="formats-title-tip">{{ _t("formatsTip") }}</p>
            <div class="formats-list">
              <div v-for="format in videoData.formats" :key="format.format_id" class="format-item">
                <span class="download-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </span>
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
/* =============================================
   HERO SECTION & MAIN LAYOUT
   ============================================= */
.main-content {
  text-align: center;
  font-family: 'DM Sans', Arial, sans-serif;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.hero-section {
  background: linear-gradient(165deg, #e8f4fd 0%, #f0f0ff 40%, #ffffff 100%);
  padding: 0 20px 60px;
}

.converter-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 20px 0;
}

/* =============================================
   ICON
   ============================================= */
.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.icon-badge {
  width: 72px;
  height: 72px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.yt-svg-icon {
  width: 44px;
  height: 44px;
}

/* =============================================
   TITLE & DESCRIPTION
   ============================================= */
.title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 12px;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.description {
  font-size: 17px;
  color: #64748b;
  margin: 0 0 36px;
  line-height: 1.6;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}

/* =============================================
   INPUT AREA
   ============================================= */
.container {
  display: flex;
  justify-content: center;
}

.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 12px;
}

.input-inner {
  flex: 1;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  padding: 0 16px;
  height: 56px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.input-inner:focus-within {
  border-color: #6366f1;
  box-shadow: 0 2px 20px rgba(99, 102, 241, 0.12);
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #94a3b8;
  flex-shrink: 0;
  margin-right: 10px;
}

.input-box {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #334155;
  background: transparent;
  height: 100%;
  font-family: 'DM Sans', Arial, sans-serif;
}

/* =============================================
   DOWNLOAD BUTTON
   ============================================= */
.download-button2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  height: 56px;
  padding: 0 28px;
  border-radius: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  font-family: 'DM Sans', Arial, sans-serif;
}

.download-button2:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
}

.download-button2:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

.download-button2.disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* =============================================
   TIP & TOOLTIP
   ============================================= */
.converter-container-tip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #94a3b8;
  margin-top: 20px;
}

.info-container {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.info-icon-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
  transition: color 0.2s ease, background 0.2s ease;
}

.info-icon-svg:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
}

.tooltip {
  position: absolute;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  background-color: #1e293b;
  color: #f1f5f9;
  text-align: left;
  padding: 12px 14px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-size: 13px;
  line-height: 1.5;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
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
  border-width: 7px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}

/* =============================================
   LOADING ANIMATION
   ============================================= */
.loading-indicator {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 40px;
}

.loading-indicator .bar {
  width: 8px;
  height: 28px;
  border-radius: 4px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
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

/* =============================================
   RESULTS SECTION
   ============================================= */
.results-section {
  padding: 0 20px 60px;
}

.container2 {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: -20px;
}

.video-card {
  background: #ffffff;
  padding: 28px;
  border-radius: 16px;
  width: 100%;
  max-width: 640px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  border: 1px solid #f1f5f9;
}

.video-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
}

.thumbnail {
  width: 140px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
  text-align: left;
  margin: 0;
}

.formats-section {
  margin-top: 20px;
}

.formats-title {
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  margin: 0 0 4px;
  text-align: left;
}

.formats-title-tip {
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 16px;
  text-align: left;
}

.formats-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.format-item {
  display: flex;
  align-items: center;
  background: #f8fafc;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.format-item:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.download-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  flex-shrink: 0;
  margin-right: 14px;
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

.download-link {
  text-decoration: none;
  color: #1e293b;
  font-weight: 600;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.download-link:hover {
  color: #6366f1;
  text-decoration: none;
}

.format-info {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 3px;
}

/* =============================================
   PLACEHOLDER STYLES
   ============================================= */
::placeholder {
  color: #94a3b8;
  opacity: 1;
}

::-webkit-input-placeholder {
  color: #94a3b8;
}

::-moz-placeholder {
  color: #94a3b8;
}

:-ms-input-placeholder {
  color: #94a3b8;
}

/* =============================================
   RESPONSIVE - MOBILE (max-width: 768px)
   ============================================= */
@media screen and (max-width: 768px) {
  .hero-section {
    padding: 0 16px 40px;
  }

  .converter-container {
    padding: 32px 0 0;
  }

  .icon-badge {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }

  .yt-svg-icon {
    width: 36px;
    height: 36px;
  }

  .title {
    font-size: 26px;
    margin-bottom: 8px;
  }

  .description {
    font-size: 15px;
    margin-bottom: 28px;
    padding: 0 8px;
  }

  .input-wrapper {
    flex-direction: column;
    gap: 12px;
  }

  .input-inner {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
  }

  .download-button2 {
    width: 100%;
    max-width: 200px;
    height: 50px;
    padding: 0 24px;
    border-radius: 12px;
  }

  .results-section {
    padding: 0 16px 40px;
  }

  .container2 {
    margin-top: 0;
  }

  .video-card {
    padding: 20px;
    border-radius: 14px;
    max-width: none;
  }

  .video-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .thumbnail {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .video-title {
    font-size: 15px;
  }

  .format-item {
    padding: 12px 14px;
  }

  .download-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    margin-right: 12px;
  }

  .download-icon svg {
    width: 18px;
    height: 18px;
  }

  .download-link {
    font-size: 13px;
  }

  .format-info {
    font-size: 11px;
  }
}

/* =============================================
   RESPONSIVE - DESKTOP (min-width: 769px)
   ============================================= */
@media screen and (min-width: 769px) {
  .container {
    justify-content: center;
  }

  .input-wrapper {
    width: 100%;
    max-width: 600px;
  }
}
</style>
