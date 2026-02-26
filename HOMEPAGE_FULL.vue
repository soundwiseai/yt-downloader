<!--
  Y2mp4.com 主页完整单文件示例（英文文案已内联）
  从上到下按页面实际渲染顺序
  技术栈: Nuxt 3 + Vue 3 + i18n (19 种语言)
  后端: VPS 上 Node.js Express + yt-dlp CLI
  API: GET /api/get-formats?url=<youtube_url>
-->

<template>
  <div id="app">

    <!-- ========================================== -->
    <!-- HEADER - 顶部导航栏 (sticky)               -->
    <!-- ========================================== -->
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <span class="site-name" @click="goHome">Y2mp4.com</span>
        </div>
        <nav class="nav">
          <a href="#" class="nav-link" @click.prevent="goToSite('/youtube-video-downloader')">YouTube Video Downloader &gt;</a>
          <a href="#" class="nav-link" @click.prevent="goToSite('/youtube-transcript-generator')">YouTube Transcript Generator &gt;</a>

          <!-- 语言选择下拉菜单（19 种语言） -->
          <div class="language-selector">
            <div class="selected-language" @click="toggleLanguageMenu">
              {{ getCurrentLanguageName() }} <span class="dropdown-arrow">▼</span>
            </div>
            <div class="language-dropdown" v-if="showLanguageMenu">
              <div v-for="lang in languages" :key="lang.code" class="language-option" @click="changeLanguage(lang.code)">
                {{ lang.name }}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <div class="page-container">

      <!-- ========================================== -->
      <!-- HERO + URL 输入 + 下载结果                  -->
      <!-- ========================================== -->
      <main class="main-content">
        <div class="converter-container">
          <div class="icon-container">
            <NuxtImg src="/images/yt_icon.png" alt="YouTube Icon" class="icon" />
          </div>

          <h1 class="title">YouTube to MP4 Converter</h1>

          <p class="description">
            Paste URL and Quick Convert YouTube to MP4. Always free, always works, no ads.
          </p>

          <!-- URL 输入框 + 下载按钮（3 种状态：灰色/蓝色/转圈） -->
          <div class="input-outer">
            <div class="input-wrapper">
              <input type="text" v-model="yt_url" placeholder="https://www.youtube.com/watch?v=..." class="input-box" @paste="onPaste"/>
              <button class="download-button2" :class="{ 'is-empty': !yt_url.trim(), 'is-loading': loading }" :disabled="loading || !yt_url.trim()" @click="fetchFormats">
                <span v-if="loading" class="btn-loading"><span class="spinner"></span></span>
                <span v-else>DOWNLOAD</span>
              </button>
            </div>
          </div>

          <p class="converter-container-tip">
            Please be mindful of copyright when downloading content. This tool isn't designed for downloading copyrighted music.
            <span class="info-container">
              <NuxtImg class="info-icon" src="/images/yt_tips.png" alt="tips"/>
              <span class="tooltip">
                This tool can only be used for legal, non-infringing use. If you are a content creator and want to prevent your videos from being downloaded using this tool, simply add #nodownload to your video's tags or description.
              </span>
            </span>
          </p>

          <!-- 加载动画 -->
          <div v-if="loading" class="loading-indicator">
            <div class="bar"></div><div class="bar"></div><div class="bar"></div>
          </div>
        </div>

        <!-- 视频结果卡片（调用 API 后显示） -->
        <div class="result-container" v-if="!loading && videoData && videoData?.title">
          <div class="video-card">
            <div class="video-header">
              <NuxtImg :src="videoData.thumbnail" class="thumbnail" alt="Thumbnail" />
              <h2 class="video-title">{{ videoData.title }}</h2>
            </div>
            <h3 class="formats-title">All Formats</h3>
            <p class="formats-title-tip">Click to save</p>
            <p class="formats-save-tip">Tip: Right-click the download button and select "Save As" to save directly</p>
            <div class="formats-list">
              <div v-for="format in videoData.formats" :key="format.format_id" class="format-item">
                <div class="format-details">
                  <span class="format-name">{{ videoData.title }}.{{ format.ext }}</span>
                  <span class="format-info">{{ format.resolution || 'Audio Only' }} &bull; {{ (format.filesize / (1024 * 1024)).toFixed(2) }} MB</span>
                </div>
                <a :href="format.url" class="format-download-btn" target="_blank" rel="noopener">
                  <svg class="dl-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  DOWNLOAD
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- ========================================== -->
      <!-- REVIEWS - 用户评价轮播 (6 条)              -->
      <!-- ========================================== -->
      <div class="carousel-container">
        <div class="carousel" ref="carousel">

          <div class="carousel-item">
            <div class="review-author">Sarah_Bennett92</div>
            <div class="review-content"><p>Perfect for saving my favorite videos! Fast downloads and super simple to use. No registration needed.</p></div>
          </div>

          <div class="carousel-item">
            <div class="review-author">John_Doe</div>
            <div class="review-content"><p>This tool is great! I love how easy it is to download videos in various formats.</p></div>
          </div>

          <div class="carousel-item">
            <div class="review-author">Jane_Smith</div>
            <div class="review-content"><p>I've been using this for months, and it always works perfectly.</p></div>
          </div>

          <div class="carousel-item">
            <div class="review-author">Michael_Johnson</div>
            <div class="review-content"><p>Fast and reliable. The best video downloader!</p></div>
          </div>

          <div class="carousel-item">
            <div class="review-author">David_Lee</div>
            <div class="review-content"><p>Easy to use and very effective for saving content.</p></div>
          </div>

          <div class="carousel-item">
            <div class="review-author">Emma_Wilson</div>
            <div class="review-content"><p>Highly recommended! Works flawlessly for all my videos.</p></div>
          </div>

        </div>
      </div>

      <!-- ========================================== -->
      <!-- HOW TO CONVERT - 3 步图文说明              -->
      <!-- ========================================== -->
      <section class="how-to-convert">
        <h2 class="section-title">How to Convert YouTube Video to MP4</h2>
        <p class="section-desc">
          Imagine being on a long flight or in a remote area with no internet access. Streaming your favorite video becomes impossible, right? That's where offline viewing saves the day. By downloading videos in advance, you can enjoy uninterrupted entertainment anytime, anywhere. A YouTube to MP4 converter makes this process seamless. It lets you download YouTube videos quickly and efficiently.
        </p>
        <div class="steps">
          <div class="step">
            <NuxtImg src="/images/yt_convert_deps1.png" alt="Copy URL" class="step-image"/>
            <p class="step-text"><span class="step-number">Step 1.</span> Copy the YouTube Video URL</p>
          </div>
          <div class="step">
            <NuxtImg src="/images/yt_convert_deps2.png" alt="Click Download" class="step-image"/>
            <p class="step-text"><span class="step-number">Step 2.</span> Directly click on the 'Download' button</p>
          </div>
          <div class="step">
            <NuxtImg src="/images/yt_convert_deps3.png" alt="Save Video" class="step-image"/>
            <p class="step-text"><span class="step-number">Step 3.</span> Wait for minutes and save the video</p>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- FEATURES - 6 个功能卡片 (3列Grid)          -->
      <!-- ========================================== -->
      <section class="features">
        <h2>Features of YouTube Video Converter</h2>
        <div class="features-container">

          <div class="feature-item">
            <div class="feature-icon"><img src="/images/yt_feature1.png" alt="feature icon" /></div>
            <h3>High Success Rate YouTube Downloads</h3>
            <p>Download YouTube videos effortlessly with our advanced converter, featuring industry-leading success rates and reliable quality preservation for all content types.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon"><img src="/images/yt_feature2.png" alt="feature icon" /></div>
            <h3>Lightning-Fast YouTube to MP4 Converter</h3>
            <p>Transform YouTube videos into high-quality MP4 files in seconds. Experience seamless, instant downloads without compromising video quality.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon"><img src="/images/yt_feature3.png" alt="feature icon" /></div>
            <h3>100% Safe and Secure</h3>
            <p>Download YouTube videos safely with our clean, privacy-focused converter. No tracking, no malware – just pure simplicity.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon"><img src="/images/yt_feature4.png" alt="feature icon" /></div>
            <h3>Unlimited Downloads</h3>
            <p>Convert and save as many YouTube videos as your heart desires, with zero waiting time or pesky download caps getting in your way.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon"><img src="/images/yt_feature5.png" alt="feature icon" /></div>
            <h3>No Login &amp; No Software Installation</h3>
            <p>Jump right in and convert videos without creating accounts or downloading anything. Just paste your link and you're good to go – no fuss, no hassle.</p>
          </div>

          <div class="feature-item">
            <div class="feature-icon"><img src="/images/yt_feature6.png" alt="feature icon" /></div>
            <h3>Various Formats Support</h3>
            <p>Download in MP4, M4A, or WEBM. Whatever format or quality you're after, we've got you covered.</p>
          </div>

        </div>
        <div class="download-button-container">
          <button class="download-button" @click="goHome">Download Now &gt;&gt;</button>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- BENEFITS - 4 组优势 (图文左右交替)          -->
      <!-- ========================================== -->
      <section class="benefits">
        <h2>Benefits of Using YouTube to MP4 Converter</h2>

        <!-- Benefit 1: 左图右文 -->
        <div class="benefit-item">
          <div class="benefit-text">
            <h3>Convenience and Accessibility</h3>
            <p>Have you ever been stuck somewhere without internet access, wishing you could watch your favorite video? A YouTube to MP4 converter solves this problem. It lets you download videos in MP4 format, which works on almost any device. Whether you're using a smartphone, tablet, or laptop, you can enjoy your content without worrying about compatibility.<br><br>Offline viewing also makes life easier when you're traveling or in areas with poor connectivity. You don't have to deal with buffering or interruptions. Plus, downloading videos ensures you always have access to high-quality content, even when the internet isn't an option.</p>
          </div>
          <div class="benefit-image">
            <NuxtImg src="/images/yt_benefits1.png" alt="Convenience" />
          </div>
        </div>

        <!-- Benefit 2: 右图左文 (reverse) -->
        <div class="benefit-item reverse-layout">
          <div class="benefit-text">
            <h3>Avoid Ads</h3>
            <p>Ads can be frustrating, especially when they interrupt your favorite videos. With a YouTube MP4 downloader, you can skip the ads entirely. Once you download a video, you can watch it without any interruptions. This means no more waiting for those 'Skip Ad' buttons to appear.<br><br>By avoiding ads, you save time and enjoy a smoother viewing experience. It's like having your own personal ad-free streaming service. Whether you're watching tutorials, music videos, or movies, an MP4 downloader ensures nothing gets in the way of your entertainment.</p>
          </div>
          <div class="benefit-image">
            <NuxtImg src="/images/yt_benefits2.png" alt="Avoid Ads" />
          </div>
        </div>

        <!-- Benefit 3: 左图右文 -->
        <div class="benefit-item">
          <div class="benefit-text">
            <h3>Save Data and Storage</h3>
            <p>Streaming videos can quickly eat up your mobile data, especially if you're on a limited plan. A YouTube MP4 downloader helps you save data by letting you download videos over Wi-Fi. Once downloaded, you can watch them as many times as you want without using any additional data.<br><br>Another great benefit is storage efficiency. MP4 files are compact, so they don't take up much space on your device. You can build an offline library of your favorite videos without worrying about running out of storage. This makes a free converter website an excellent tool for managing your video collection.</p>
          </div>
          <div class="benefit-image">
            <NuxtImg src="/images/yt_benefits3.png" alt="Save Data" />
          </div>
        </div>

        <!-- Benefit 4: 右图左文 (reverse) -->
        <div class="benefit-item reverse-layout">
          <div class="benefit-text">
            <h3>Get More From Your Downloads</h3>
            <p>Say goodbye to buffering and data drains! Here's how to make the most of your offline videos:<br>
            <strong>1. Build Your Personal Media Library</strong><br>
            Create your own Netflix-style collection - organized by folders and tagged for easy browsing.<br>
            <strong>Pro tip:</strong> Add quick notes to your videos and keep backups on an external drive. Your entertainment, your rules.<br>
            <strong>2. Travel Without Worries</strong><br>
            No more spotty airplane WiFi or boring road trips. Load up your device before hitting the road, and you've got endless entertainment in your pocket.<br>
            <strong>3. Save Those Precious Data Bytes</strong><br>
            Download over WiFi, watch anytime. Perfect for students grabbing lecture videos, professionals saving work presentations, and anyone tired of watching that loading spinner on shaky connections.</p>
          </div>
          <div class="benefit-image">
            <NuxtImg src="/images/yt_benefits4.png" alt="Get More" />
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- FAQ - 5 个常见问题 (手风琴展开)             -->
      <!-- ========================================== -->
      <div class="faq-container">
        <h2 class="faq-title">FAQ</h2>
        <div class="faq-wrapper">

          <div class="faq-item">
            <div class="faq-header" @click="toggleFAQ(0)">
              <span class="arrow">{{ faqActiveIndex === 0 ? '▼' : '▶' }}</span>
              <span class="faq-question">1. Is it legal to use a YouTube to MP4 converter?</span>
            </div>
            <div v-if="faqActiveIndex === 0" class="faq-content">
              It depends on the video. You can legally download videos with a Creative Commons license or those explicitly allowed for offline use. Avoid downloading copyrighted content without permission to stay on the right side of the law.<br>
              <strong>Tip:</strong> Always check the video's terms of use before downloading.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" @click="toggleFAQ(1)">
              <span class="arrow">{{ faqActiveIndex === 1 ? '▼' : '▶' }}</span>
              <span class="faq-question">2. Can I use a YouTube to MP4 converter on my phone?</span>
            </div>
            <div v-if="faqActiveIndex === 1" class="faq-content">
              Yes! It works on mobile devices. You can use apps or mobile-friendly websites to download videos directly to your phone. Just paste the video link, select MP4, and hit download.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" @click="toggleFAQ(2)">
              <span class="arrow">{{ faqActiveIndex === 2 ? '▼' : '▶' }}</span>
              <span class="faq-question">3. What's the best resolution to download YouTube videos in?</span>
            </div>
            <div v-if="faqActiveIndex === 2" class="faq-content">
              It depends on your needs. For high-quality playback, go for HD (720p) or 4K. If you're saving storage space, choose a lower resolution like 480p.<br>
              <strong>Pro Tip:</strong> Balance quality and file size based on your device's storage capacity.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" @click="toggleFAQ(3)">
              <span class="arrow">{{ faqActiveIndex === 3 ? '▼' : '▶' }}</span>
              <span class="faq-question">4. Are free YouTube to MP4 converters safe?</span>
            </div>
            <div v-if="faqActiveIndex === 3" class="faq-content">
              While many free converters out there can be sketchy, we take your security seriously. Our converter runs entirely in your browser without any sneaky downloads or suspicious pop-ups. We use secure HTTPS encryption and never store your personal data or viewing history. Plus, we regularly scan for malware and keep our service squeaky clean. No spyware, no bloatware - just straightforward video conversion you can trust.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" @click="toggleFAQ(4)">
              <span class="arrow">{{ faqActiveIndex === 4 ? '▼' : '▶' }}</span>
              <span class="faq-question">5. Who uses the YouTube to MP4 converter?</span>
            </div>
            <div v-if="faqActiveIndex === 4" class="faq-content">
              Our converter is the perfect tool for all sorts of users. Here's who'll love it:<br><br>
              <strong>Content Creators:</strong> Snag videos for your next big edit or social media remix<br>
              <strong>Students &amp; Teachers:</strong> Stock up on tutorials and lectures for study sessions anywhere<br>
              <strong>Road Warriors:</strong> Load up your device with entertainment for those long flights and commutes<br>
              <strong>Business Pros:</strong> Keep important video content at your fingertips, internet or not<br>
              <strong>Everyday Viewers:</strong> Kick back and enjoy your favorite YouTube content on any device, whenever you want
            </div>
          </div>

        </div>
      </div>

    </div><!-- /.page-container -->

    <!-- ========================================== -->
    <!-- FOOTER - 深色底部                           -->
    <!-- ========================================== -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Resource</h3>
          <a href="/" class="footer-link">Y2mp4.com</a>
        </div>
        <div class="footer-section">
          <h3>Tools</h3>
          <a href="/youtube-video-downloader" class="footer-link">YouTube Video Downloader</a>
          <a href="/youtube-to-mp3" class="footer-link">YouTube to MP3 Converter</a>
          <a href="/youtube-transcript-generator" class="footer-link">YouTube Transcript Generator</a>
          <a href="/youtube-to-m4a" class="footer-link">YouTube to M4A</a>
        </div>
        <div class="footer-section">
          <h3>Email</h3>
          <a href="mailto:hello@y2mp4.com" class="footer-link">hello@y2mp4.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-links">
          <a href="/privacy-policy" class="lang-link">Privacy Policy</a>
          <a href="/terms-of-service" class="lang-link">Terms of Service</a>
        </div>
        <div class="copyright">2025 Y2mp4.com</div>
      </div>
    </footer>

  </div>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const { locale, locales, setLocale } = useI18n()

// ============ HEADER 逻辑 ============
const showLanguageMenu = ref(false)
const languages = locales.value

const goToSite = (url) => {
  const prefix = locale.value === 'en' ? '' : `/${locale.value}`
  router.push({ path: `${prefix}${url}` })
}
const toggleLanguageMenu = () => { showLanguageMenu.value = !showLanguageMenu.value }
const getCurrentLanguageName = () => {
  const lang = languages.find(l => l.code === locale.value)
  return lang ? lang.name : 'English'
}
const changeLanguage = async (langCode) => {
  showLanguageMenu.value = false
  await setLocale(langCode)
  const prefix = langCode === 'en' ? '' : `/${langCode}`
  router.push({ path: prefix || '/' })
}
const goHome = () => { if (route.path !== '/') router.push({ path: '/' }) }

// ============ 核心下载逻辑 ============
const yt_url = ref('')
const videoData = ref({})
const loading = ref(false)

const onPaste = (event) => {
  yt_url.value = (event.clipboardData || window.clipboardData).getData('text')
  fetchFormats()
}

const fetchFormats = async () => {
  if (!yt_url.value || !yt_url.value.includes('youtube.')) {
    alert('Please enter a valid YouTube URL')
    return
  }
  loading.value = true
  try {
    // 后端 API: VPS 上 yt-dlp -j <url> → 返回 JSON
    const res = await axios.get('/api/get-formats', { params: { url: yt_url.value } })
    videoData.value = res.data
  } catch (err) {
    console.error('get video info error', err)
    alert('get video info error, please try again')
  } finally {
    loading.value = false
  }
}

// ============ Reviews 轮播 ============
const carousel = ref(null)
const autoScrollTimer = ref(null)
let currentSlide = 0

const startAutoScroll = () => {
  autoScrollTimer.value = setInterval(() => {
    const c = carousel.value
    if (!c || !c.children.length) return
    currentSlide = (currentSlide + 1) % c.children.length
    const card = c.children[currentSlide]
    if (card) c.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }, 3000)
}

// ============ FAQ 手风琴 ============
const faqActiveIndex = ref(0)
const toggleFAQ = (index) => { faqActiveIndex.value = faqActiveIndex.value === index ? null : index }

// ============ 生命周期 ============
onMounted(() => {
  startAutoScroll()
  document.addEventListener('click', (e) => {
    if (showLanguageMenu.value && !e.target.closest('.language-selector')) showLanguageMenu.value = false
  })
})
onBeforeUnmount(() => { if (autoScrollTimer.value) clearInterval(autoScrollTimer.value) })
</script>


<style>
/* ================================================================
   全局
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; }
body { font-family: 'Open Sans', sans-serif; background: #FFFFFF; color: #1E293B; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
a { cursor: pointer; }
button { cursor: pointer; }
.page-container { max-width: 1200px; margin: 0 auto; }

/* ================================================================
   HEADER
   ================================================================ */
.header { background: #FFFFFF; border-bottom: 1px solid #E2E8F0; width: 100%; min-height: 64px; position: sticky; top: 0; z-index: 50; }
.header-container { display: flex; flex-direction: column; align-items: flex-start; padding: 0.75rem 1rem; max-width: 1200px; margin: 0 auto; width: 100%; }
.logo { display: flex; align-items: center; }
.logo .site-name { font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 700; color: #2563EB; cursor: pointer; transition: color 200ms; }
.logo .site-name:hover { color: #1D4ED8; }
.nav { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem; width: 100%; }
.nav-link { font-size: 0.875rem; font-weight: 500; color: #475569; text-decoration: none; transition: color 200ms; }
.nav-link:hover { color: #2563EB; }
.language-selector { position: relative; margin-top: 0.5rem; width: 100%; cursor: pointer; }
.selected-language { display: flex; align-items: center; justify-content: space-between; padding: 0.375rem 0.75rem; border-radius: 8px; border: 1px solid #E2E8F0; font-size: 0.875rem; color: #475569; transition: all 200ms; }
.selected-language:hover { background: #EFF6FF; border-color: #BFDBFE; color: #2563EB; }
.dropdown-arrow { font-size: 0.625rem; margin-left: 0.5rem; color: #94A3B8; }
.language-dropdown { position: absolute; top: 100%; right: 0; left: 0; min-width: 200px; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); z-index: 100; margin-top: 0.25rem; max-height: 300px; overflow-y: auto; }
.language-option { padding: 0.5rem 1rem; font-size: 0.875rem; color: #475569; cursor: pointer; }
.language-option:hover { background: #EFF6FF; color: #2563EB; }
@media (min-width: 600px) {
  .header-container { flex-direction: row; justify-content: space-between; align-items: center; padding: 0 1.5rem; height: 64px; }
  .nav { flex-direction: row; gap: 1rem; margin-left: auto; margin-top: 0; width: auto; align-items: center; }
  .language-selector { margin-left: 1rem; margin-top: 0; width: auto; }
  .selected-language { width: auto; }
  .language-dropdown { left: auto; right: 0; width: 240px; }
}
@media (min-width: 1024px) { .header-container { padding: 0 2rem; } .logo .site-name { font-size: 1.5rem; } .nav { gap: 1.5rem; } }

/* ================================================================
   HERO + 输入 + 结果
   ================================================================ */
.main-content { text-align: center; width: 100%; overflow-x: hidden; }
.converter-container { background: linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%); padding: 60px 20px; }
.icon-container { display: flex; justify-content: center; margin-bottom: 20px; }
.icon { width: 285px; height: auto; }
.title { font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 700; color: #1E293B; }
.description { font-size: 1.125rem; color: #475569; margin: 10px 0 20px; line-height: 1.6; }
.input-outer { display: flex; justify-content: center; margin-top: 40px; }
.input-wrapper { display: flex; align-items: center; border-radius: 12px; width: 100%; max-width: 560px; height: 56px; gap: 10px; background: #FFFFFF; border: 2px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: border-color 200ms; }
.input-wrapper:focus-within { border-color: #2563EB; }
.input-box { flex: 1; padding: 0 16px; border: none; outline: none; font-size: 1rem; color: #1E293B; height: 100%; background: #FFFFFF; border-radius: 12px; }
::placeholder { color: #94A3B8; }
.download-button2 { font-family: 'Poppins', sans-serif; background: #2563EB; color: #FFFFFF; font-size: 1rem; font-weight: 600; border: none; height: calc(100% - 8px); padding: 0 24px; border-radius: 8px; margin-right: 4px; transition: background-color 200ms; }
.download-button2:hover { background: #1D4ED8; }
.download-button2.is-empty { background: #CBD5E1; color: #94A3B8; cursor: not-allowed; }
.download-button2.is-loading { background: #2563EB; cursor: wait; opacity: 0.8; }
.btn-loading { display: flex; align-items: center; justify-content: center; }
.spinner { width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,0.3); border-top-color: #FFFFFF; border-radius: 50%; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.converter-container-tip { font-size: 0.75rem; color: #64748B; margin-top: 20px; display: inline-flex; align-items: center; gap: 6px; }
.info-container { display: inline-block; position: relative; }
.info-icon { width: 18px; height: 18px; cursor: pointer; border-radius: 50%; }
.tooltip { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 240px; background: #FFFFFF; color: #334155; padding: 12px; border-radius: 8px; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); font-size: 0.875rem; line-height: 1.5; visibility: hidden; opacity: 0; transition: opacity 200ms; z-index: 100; }
.info-container:hover .tooltip { visibility: visible; opacity: 1; }
.result-container { display: flex; justify-content: center; padding: 0 20px; }
.video-card { background: #FFFFFF; border: 1px solid #E2E8F0; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); width: 100%; max-width: 600px; }
.video-header { display: flex; align-items: center; }
.thumbnail { width: 120px; height: 80px; border-radius: 8px; margin-right: 12px; object-fit: cover; }
.video-title { font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 600; color: #1E293B; flex-grow: 1; text-align: left; }
.formats-title { font-family: 'Poppins', sans-serif; font-size: 0.875rem; font-weight: 600; color: #1E293B; margin-top: 20px; }
.formats-title-tip { font-size: 0.75rem; color: #64748B; margin-top: -8px; }
.formats-save-tip { font-size: 0.75rem; color: #94A3B8; margin-top: 4px; font-style: italic; }
.format-item { display: flex; align-items: center; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; margin-bottom: 12px; justify-content: space-between; transition: background-color 200ms; }
.format-item:hover { background: #F8FAFC; }
.format-details { display: flex; flex-direction: column; flex-grow: 1; text-align: left; min-width: 0; }
.format-name { font-size: 0.875rem; font-weight: 600; color: #1E293B; overflow: hidden; text-overflow: ellipsis; word-break: break-all; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.format-info { font-size: 0.75rem; color: #64748B; margin-top: 4px; }
.format-download-btn { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; margin-left: 12px; padding: 8px 16px; background: #2563EB; color: #FFFFFF; font-family: 'Poppins', sans-serif; font-size: 0.8125rem; font-weight: 600; border-radius: 8px; text-decoration: none; white-space: nowrap; transition: background-color 200ms; }
.format-download-btn:hover { background: #1D4ED8; color: #FFFFFF; }
.dl-icon { width: 16px; height: 16px; }
.loading-indicator { display: flex; justify-content: center; margin-top: 40px; }
.loading-indicator .bar { width: 10px; height: 30px; margin: 0 3px; background: #2563EB; border-radius: 2px; animation: loadingAnimation 1.2s infinite; }
.loading-indicator .bar:nth-child(1) { animation-delay: 0s; }
.loading-indicator .bar:nth-child(2) { animation-delay: 0.2s; }
.loading-indicator .bar:nth-child(3) { animation-delay: 0.4s; }
@keyframes loadingAnimation { 0%,80%,100% { transform: scaleY(0.4); } 40% { transform: scaleY(1); } }
@media (max-width: 768px) {
  .converter-container { padding: 40px 16px; }
  .input-wrapper { flex-direction: column; height: auto; background: transparent; border: none; box-shadow: none; gap: 12px; padding: 0; }
  .input-box { width: 100%; height: 56px; border: 2px solid #E2E8F0; border-radius: 12px; box-sizing: border-box; }
  .input-box:focus { border-color: #2563EB; }
  .download-button2 { width: 160px; height: 48px; padding: 12px 0; margin-right: 0; }
  .format-item { flex-direction: column; align-items: stretch; gap: 10px; }
  .format-download-btn { margin-left: 0; justify-content: center; }
  .icon { width: 185px; }
  .title { font-size: 1.875rem; }
}
@media (min-width: 769px) { .input-wrapper { width: 50%; min-width: 480px; } }

/* ================================================================
   REVIEWS
   ================================================================ */
.carousel-container { width: 100%; min-height: 200px; overflow: hidden; position: relative; margin-top: 3rem; padding: 0 1rem; }
.carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 1rem; padding: 1.5rem 0; scroll-behavior: smooth; scrollbar-width: none; }
.carousel::-webkit-scrollbar { display: none; }
.carousel-item { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1.5rem; border-radius: 12px; width: 33.33%; flex-shrink: 0; scroll-snap-align: center; transition: box-shadow 200ms; }
.carousel-item:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.review-content { font-size: 1rem; color: #334155; line-height: 1.6; margin-bottom: 1rem; }
.review-author { font-family: 'Poppins', sans-serif; font-size: 0.875rem; color: #2563EB; font-weight: 600; }
.carousel-container::before, .carousel-container::after { content: ""; position: absolute; top: 0; width: 10%; height: 100%; z-index: 2; pointer-events: none; }
.carousel-container::before { left: 0; background: linear-gradient(to right, rgba(255,255,255,0.7), transparent); }
.carousel-container::after { right: 0; background: linear-gradient(to left, rgba(255,255,255,0.7), transparent); }
@media (max-width: 1024px) { .carousel-item { width: 45%; } }
@media (max-width: 768px) { .carousel-item { width: 80%; } }

/* ================================================================
   HOW TO CONVERT
   ================================================================ */
.how-to-convert { text-align: center; max-width: 90%; margin: auto; padding: 20px; }
.section-title { font-size: 2rem; font-weight: bold; color: #1A3B8C; margin-bottom: 15px; }
.section-desc { font-size: 0.9rem; color: #555; width: 78%; margin: auto; line-height: 1.6; }
.steps { display: flex; justify-content: space-between; margin-top: 40px; gap: 20px; flex-wrap: wrap; }
.step { flex: 1 1 30%; text-align: center; margin-bottom: 30px; }
.step-image { max-width: 100%; height: auto; border-radius: 10px; }
.step-text { font-size: 1rem; color: #222; margin-top: 20px; }
.step-number { font-weight: bold; color: #0d1c44; }
@media (max-width: 768px) { .steps { flex-direction: column; } .step { flex: 1 1 100%; } }

/* ================================================================
   FEATURES
   ================================================================ */
.features { text-align: center; padding: 3rem 1.5rem; max-width: 1200px; margin: 0 auto; }
.features h2 { font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 700; margin-bottom: 3rem; color: #1E293B; }
.features-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.feature-item { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); padding: 2rem 1.5rem; text-align: center; transition: box-shadow 200ms; }
.feature-item:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
.feature-icon img { width: 96px; height: 96px; margin-bottom: 1rem; }
.feature-item h3 { font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; color: #1E293B; }
.feature-item p { font-size: 0.875rem; color: #475569; line-height: 1.6; }
.download-button-container { margin-top: 3rem; }
.download-button { font-family: 'Poppins', sans-serif; font-weight: 600; padding: 12px 24px; background: #2563EB; color: #FFFFFF; border: none; border-radius: 8px; font-size: 1.125rem; transition: background-color 200ms; }
.download-button:hover { background: #1D4ED8; }
@media (max-width: 1024px) { .features-container { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .features-container { grid-template-columns: 1fr; } .features h2 { font-size: 1.875rem; } }

/* ================================================================
   BENEFITS
   ================================================================ */
.benefits { text-align: center; padding: 4rem 1.5rem; max-width: 1200px; margin: 0 auto; }
.benefits h2 { font-family: 'Poppins', sans-serif; font-size: 2.25rem; font-weight: 700; color: #1E293B; margin-bottom: 3rem; }
.benefit-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; gap: 3rem; }
.benefit-item.reverse-layout { flex-direction: row-reverse; }
.benefit-text { flex: 1; text-align: left; }
.benefit-text h3 { font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #1E293B; margin-bottom: 1rem; }
.benefit-text p { font-size: 1rem; color: #475569; line-height: 1.7; }
.benefit-image { flex: 1; display: flex; justify-content: center; }
.benefit-image img { max-width: 100%; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
@media (max-width: 768px) {
  .benefit-item { flex-direction: column; gap: 1.5rem; }
  .benefit-item.reverse-layout { flex-direction: column; }
  .benefit-text { text-align: center; }
}

/* ================================================================
   FAQ
   ================================================================ */
.faq-container { width: 85%; margin: 20px auto 80px; }
.faq-title { font-weight: bold; color: #1A3B8C; margin-bottom: 20px; }
.faq-wrapper { border: 1px solid #3b82f6; background: #f8fafc; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.faq-item { border-bottom: 0.5px solid #3b82f6; }
.faq-item:last-child { border-bottom: none; }
.faq-header { display: flex; align-items: center; padding: 15px; font-size: 18px; font-weight: bold; color: #1e3a8a; cursor: pointer; }
.arrow { margin-right: 10px; font-size: 14px; }
.faq-content { padding: 5px 15px 40px 40px; font-size: 0.9em; color: #333; white-space: pre-line; }
.faq-question { white-space: pre-line; }

/* ================================================================
   FOOTER
   ================================================================ */
.footer { background: #0F172A; color: white; padding: 3rem 1.5rem 1.5rem; width: 100%; font-family: 'Open Sans', sans-serif; }
.footer-content { display: flex; justify-content: space-between; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 2rem; }
.footer-section { flex: 1; min-width: 160px; }
.footer h3 { font-family: 'Poppins', sans-serif; color: #FFFFFF; margin-bottom: 1rem; font-size: 1rem; font-weight: 600; }
.footer-link { margin-bottom: 0.5rem; color: rgba(255,255,255,0.7); font-size: 0.875rem; display: block; text-decoration: none; transition: color 200ms; }
.footer-link:hover { color: #FFFFFF; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 2rem auto 0; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap; }
.footer-links { display: flex; gap: 1.5rem; }
.lang-link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.875rem; transition: color 200ms; }
.lang-link:hover { color: #FFFFFF; text-decoration: underline; }
.copyright { color: rgba(255,255,255,0.5); font-size: 0.8125rem; }
@media (max-width: 768px) {
  .footer-content { flex-direction: column; }
  .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
  .footer-links { justify-content: center; }
}
</style>
