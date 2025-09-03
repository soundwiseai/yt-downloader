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
          <input type="text" v-model="yt_url" placeholder="https://www.youtube.com/watch?v=..." class="input-box" @paste="onPaste"/>
          <button class="download-button2" :class="{ 'disabled': loading }" :disabled="loading" @click="fetchFormats">
            {{ _t("download") }}
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

    <!-- Toast 提示组件 -->
    <div class="toast-container" v-if="showToast">
      <div class="toast" :class="toastType">
        <div class="toast-message">{{ toastMessage }}</div>
      </div>
    </div>
    
    <div class="container2" v-if="!loading && videoData && videoData?.title">
      <div class="transcript-layout">
        <!-- Left side: Video player -->
        <div class="video-player-section">
          <div class="video-header">
            <h2 class="title">{{ videoData.title }}</h2>
          </div>
          <div class="video-embed">
            <!-- 使用标准 iframe 嵌入方式，添加 enablejsapi=1 参数启用 API -->
            <iframe 
              id="youtube-player"
              :src="`https://www.youtube.com/embed/${getVideoId(yt_url1)}?enablejsapi=1&cc_load_policy=1&cc_lang_pref=en`" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="embedded-video">
            </iframe>
          </div>
        </div>
        
        <!-- Right side: Subtitles list -->
        <div class="subtitles-section">
          
          <!-- 字幕语言下拉菜单和内容显示区域 -->
          <div class="subtitles-controls" v-if="hasSubtitles">
            <div class="subtitles-controls-row">
              <!-- 时间戳显示切换开关 -->
              <div class="timestamp-toggle">
                <label class="switch">
                  <input 
                    type="checkbox" 
                    id="timestamp-checkbox" 
                    v-model="showTimestamps"
                  />
                  <span class="slider round"></span>
                </label>
                <label for="timestamp-checkbox" class="timestamp-label">{{ _t("timestamp") }}</label>
              </div>
            </div>
            
            <!-- 字幕语言下拉菜单 -->
            <div class="subtitle-dropdown">
              <div class="dropdown-container">
                <div class="dropdown-header" @click="toggleDropdown">
                  <span>{{ selectedLanguage ? getLanguageName(selectedLanguage) : _t("selectLanguage") }}</span>
                  <span class="dropdown-arrow">{{ isDropdownOpen ? '▲' : '▼' }}</span>
                </div>
                <div class="dropdown-menu" v-if="isDropdownOpen">
                  <div 
                    v-for="(formats, lang) in sortedSubtitleLanguages" 
                    :key="lang" 
                    class="dropdown-item"
                    @click="selectAndLoadSubtitle(lang)"
                  >
                    {{ getLanguageName(lang) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 复制字幕按钮 -->
            <button 
                class="copy-button" 
                @click="copySubtitlesToClipboard"
                :disabled="!subtitlesLoaded || parsedSubtitles.length === 0"
                :title="_t('copy')"
              >
                {{ _t("copy") }}
              </button>

              <!-- 下载字幕按钮 -->
              <button 
                class="download-button" 
                @click="downloadFile(subtitlesLink)"
                :disabled="!subtitlesLoaded || parsedSubtitles.length === 0"
                :title="_t('downloadNow')"
              >
                {{ _t("downloadNow") }}
              </button>
          </div>
          
          <!-- 无字幕提示 -->
          <div class="no-subtitles" v-if="!hasSubtitles">
            <div>{{ _t("errorTranscriptUnavailable") }}</div>
            <a href="https://soundwise.ai/" class="btn-ai-transcript" target="_blank">{{ _t("aiTranscript") }}</a>
          </div>
          
          <!-- 字幕加载动画 -->
          <div v-if="subtitleLoading" class="subtitle-loading-indicator">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          
          <!-- 字幕内容显示 -->
          <div class="subtitles-content" v-if="subtitlesLoaded && !subtitleLoading">
            <div class="subtitles-list">
              <div 
                v-for="(subtitle, index) in parsedSubtitles" 
                :key="index" 
                class="subtitle-item"
                @click="seekToTime(subtitle.seconds)"
              >
                <div v-if="showTimestamps" class="subtitle-time">{{ subtitle.time }}</div>
                <div class="subtitle-text" :title="subtitle.text">{{ subtitle.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import axios from 'axios'
import { _t } from '@/i18n/utils'

// 引入样式
import './toast.css'

// 响应式状态
const yt_url = ref('')
const yt_url1 = ref('')
const videoData = ref({})
const loading = ref(false)
const subtitleLoading = ref(false) // 单独的字幕加载状态
const parsedSubtitles = ref([])
const subtitlesLoaded = ref(false)
const currentSubtitleLang = ref('')
const errorMessage = ref('')

// 计算属性：按照 languageMap 顺序排序的字幕语言
const sortedSubtitleLanguages = computed(() => {
  if (!videoData.value?.subtitles) return {}
  
  // 创建一个新对象，按照 languageMap 的顺序排序
  const sortedSubtitles = {}
  
  // 按照 languageMap 中的顺序遍历语言
  Object.keys(languageMap).forEach(langCode => {
    // 如果这个语言在视频数据中存在，则添加到排序后的字幕中
    if (videoData.value.subtitles[langCode]) {
      sortedSubtitles[langCode] = videoData.value.subtitles[langCode]
    }
  })
  
  return sortedSubtitles
})

// Toast 提示相关状态
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success') // success 或 error
const isDropdownOpen = ref(false)
const selectedLanguage = ref('')
const hasSubtitles = ref(false)
const videoTitle = ref('')
const showTimestamps = ref(true) // 控制是否显示字幕时间戳

// 从URL中提取YouTube视频ID
const getVideoId = (url) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ''
}

// 获取特定语言的 SRT 格式字幕
const fetchSrtSubtitle = async (lang) => {
  if (!lang) {
    alert('请选择字幕语言')
    return
  }
  
  try {
    subtitleLoading.value = true // 使用字幕专用的加载状态
    
    // 检查该语言是否有 SRT 格式字幕
    const formats = videoData.value.subtitles[lang]
    const srtFormat = formats.find(format => format.ext === 'srt')
    
    if (!srtFormat) {
      throw new Error(`没有找到 ${lang} 语言的 SRT 格式字幕`)
    }
    
    // 获取字幕内容
    const response = await axios.get(srtFormat.url)
    const srtContent = response.data
    parsedSubtitles.value = parseSrtContent(srtContent)
    subtitlesLoaded.value = true
    currentSubtitleLang.value = lang
    videoTitle.value = videoData.value.title
    isDropdownOpen.value = false // 关闭下拉菜单
  } catch (error) {
    console.error('获取字幕内容出错:', error)
    alert('获取字幕内容出错，请重试')
  } finally {
    subtitleLoading.value = false // 重置字幕加载状态
  }
}

// 解析 SRT 格式字幕
const parseSrtContent = (srtContent) => {
  const subtitles = []
  const blocks = srtContent.trim().split('\n\n')
  
  blocks.forEach(block => {
    const lines = block.split('\n')
    if (lines.length >= 3) {
      // 第一行是序号，第二行是时间，剩余行是文本
      const timeCode = lines[1]
      const text = lines.slice(2).join(' ')
      const startTime = timeCode.split(' --> ')[0]
      
      subtitles.push({
        time: formatTimeCode(timeCode),
        text: text,
        rawTime: startTime,
        seconds: convertTimestampToSeconds(startTime)
      })
    }
  })
  
  return subtitles
}

// 格式化时间码
const formatTimeCode = (timeCode) => {
  // 时间码格式: 00:00:00,000 --> 00:00:00,000
  const times = timeCode.split(' --> ')
  if (times.length === 2) {
    return times[0].replace(',', '.')
  }
  return timeCode
}

// 将时间戳转换为秒数
const convertTimestampToSeconds = (timestamp) => {
  // 时间戳格式: 00:00:00,000
  const cleanTimestamp = timestamp.replace(',', '.')
  const parts = cleanTimestamp.split(':')
  
  if (parts.length === 3) {
    const hours = parseInt(parts[0], 10)
    const minutes = parseInt(parts[1], 10)
    const seconds = parseFloat(parts[2])
    
    return hours * 3600 + minutes * 60 + seconds
  }
  
  return 0
}

// 重置字幕状态
const resetSubtitles = () => {
  subtitlesLoaded.value = false
  parsedSubtitles.value = []
  currentSubtitleLang.value = ''
  isDropdownOpen.value = false
  // 不重置 selectedLanguage，保持选中的语言
}

// 切换下拉菜单的显示状态
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// 语言代码到完整英文名称的映射
const languageMap = {
  'en': 'English',
  'en-US': 'English',
  'en-GB': 'English',
  'es': 'Spanish',
  'es-ES': 'Spanish',
  'es-MX': 'Spanish',
  'fr': 'French',
  'fr-FR': 'French',
  'fr-CA': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'zh-Hans': 'Chinese Simplified',
  'zh-Hant': 'Chinese Traditional',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'nl': 'Dutch',
  'pl': 'Polish',
  'tr': 'Turkish',
  'sv': 'Swedish',
  'fi': 'Finnish',
  'da': 'Danish',
  'no': 'Norwegian',
  'cs': 'Czech',
  'hu': 'Hungarian',
  'el': 'Greek',
  'he': 'Hebrew',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'id': 'Indonesian',
  'ms': 'Malay',
  'ro': 'Romanian',
  'uk': 'Ukrainian',
  'bg': 'Bulgarian',
  'hr': 'Croatian',
  'sr': 'Serbian',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'et': 'Estonian',
  'lv': 'Latvian',
  'lt': 'Lithuanian'
}

// 获取语言的完整英文名称
const getLanguageName = (langCode) => {
  const name = languageMap[langCode]
  if (!name) {
    console.log(`未找到语言代码 "${langCode}" 的映射`)
    return langCode // 当找不到映射时，显示语言代码作为后备
  }
  return name
}

// 选择语言
const selectLanguage = (lang) => {
  selectedLanguage.value = lang
  isDropdownOpen.value = false
  setPlayerSubtitleLanguage(lang)
}

// 选择语言并加载字幕
const selectAndLoadSubtitle = (lang) => {
  selectedLanguage.value = lang
  fetchSrtSubtitle(lang)
  setPlayerSubtitleLanguage(lang)
  isDropdownOpen.value = false // 选择后关闭下拉菜单
}

// YouTube播放器API
let player = null

// 跳转到指定时间点
const seekToTime = (seconds) => {
  if (player && typeof player.seekTo === 'function') {
    player.seekTo(seconds, true)
    player.playVideo()
  } else {
    initYouTubePlayer().then(() => {
      if (player) {
        player.seekTo(seconds, true)
        player.playVideo()
      }
    })
  }
}

// 设置 YouTube 播放器的字幕语言
const setPlayerSubtitleLanguage = (languageCode) => {
  if (player && typeof player.setOption === 'function') {
    // 将我们的语言代码转换为 YouTube 的语言代码格式
    // YouTube 使用的是 ISO 639-1 格式，例如 'en', 'zh-Hans', 'fr' 等
    // 有些语言代码可能需要转换
    const ytLangCode = convertToYouTubeLanguageCode(languageCode)
    
    // 设置字幕语言
    player.setOption('captions', 'track', {languageCode: ytLangCode})
    
    // 显示字幕
    player.setOption('captions', 'reload', true)
    player.setOption('captions', 'displaySettings', {background: '#000000CC'})
    
    console.log(`已将 YouTube 播放器字幕语言设置为: ${ytLangCode}`)
  } else {
    console.warn('播放器未准备好或不支持设置字幕语言')
  }
}

// 将我们的语言代码转换为 YouTube 的语言代码格式
const convertToYouTubeLanguageCode = (langCode) => {
  // 这里可以根据需要添加转换规则
  // 例如，如果我们的语言代码是 'zh-cn'，YouTube 可能使用 'zh-Hans'
  const langMap = {
    'zh-cn': 'zh-Hans',
    'zh-tw': 'zh-Hant',
    'zh-hk': 'zh-Hant-HK',
    // 可以根据需要添加更多的映射
  }
  
  return langMap[langCode.toLowerCase()] || langCode
}

// 初始化 YouTube 播放器 API
const initYouTubePlayer = () => {
  return new Promise((resolve) => {
    console.log('Starting YouTube player initialization')
    
    // 检查 iframe 是否存在
    const iframe = document.getElementById('youtube-player')
    if (!iframe) {
      console.error('YouTube player iframe not found, cannot initialize player')
      return resolve(false)
    }
    
    // 如果 API 已经加载，直接初始化播放器
    if (window.YT && window.YT.Player) {
      console.log('YouTube API already loaded, initializing player')
      initPlayer()
      return resolve(true)
    }
    
    // 加载 YouTube IFrame API
    console.log('Loading YouTube IFrame API')
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    
    // 设置全局回调函数
    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API loaded successfully')
      initPlayer()
      resolve(true)
    }
    
    // 添加脚本到页面
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })
}

// 初始化播放器实例
const initPlayer = () => {
  console.log('Initializing YouTube player...')
  
  try {
    // 使用现有的 iframe 初始化播放器
    const iframe = document.getElementById('youtube-player')
    if (!iframe) {
      console.error('YouTube player iframe not found')
      return
    }
    
    // 创建播放器实例，使用现有的 iframe
    player = new window.YT.Player('youtube-player', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
    
    console.log('Player instance created successfully')
  } catch (error) {
    console.error('Error creating YouTube player:', error)
  }
}

// 播放器状态变化回调
const onPlayerStateChange = (event) => {
  // 可以根据需要处理不同的播放器状态
  // 例如：播放、暂停、结束等
  console.log('Player state changed:', event.data)
}

// 播放器准备就绪回调
const onPlayerReady = (event) => {
  console.log('YouTube player ready')
  
  // 先播放一小段时间再暂停，确保字幕系统完全初始化
  player.playVideo()
  
  // 1 秒后暂停视频并设置字幕语言
  setTimeout(() => {
    player.pauseVideo()
    
    // 如果已经选择了字幕语言，则设置播放器字幕
    if (selectedLanguage.value) {
      console.log(`Setting player subtitle language to: ${selectedLanguage.value}`)
      setPlayerSubtitleLanguage(selectedLanguage.value)
    }
  }, 1000)
}

const isValidYoutubeUrl = (url) => {
  return url.includes('youtube.');
}

// 处理粘贴事件
const onPaste = (event) => {  
  let text = (event.clipboardData || window.clipboardData).getData("text");
  yt_url.value = text
  fetchFormats()
}

// 组件挂载后的生命周期钩子
onMounted(() => {
  console.log('Component mounted')

  // 等待 DOM 完全渲染后再初始化播放器
  // 使用 nextTick 确保所有的渲染更新已完成
  nextTick(() => {
    // 然后使用 setTimeout 添加额外的延迟，确保元素已经存在
    setTimeout(() => {
      console.log('Initializing YouTube player after delay')
      initYouTubePlayer()
    }, 1000) // 增加延迟时间到 1 秒
  })

  errorMessage.value = _t('errorGetVideoInfo')
})

// 复制字幕到剪切板
const copySubtitlesToClipboard = () => {
  if (!subtitlesLoaded.value || parsedSubtitles.value.length === 0) {
    showToastMessage('没有可用的字幕内容', 'error')
    return
  }
  
  try {
    // 将字幕格式化为纯文本
    const subtitleText = parsedSubtitles.value.map(subtitle => {
      if (showTimestamps.value) {
        return `${subtitle.time}\n${subtitle.text}`
      } else {
        return subtitle.text
      }
    }).join('\n\n')
    
    // 复制到剪切板
    navigator.clipboard.writeText(subtitleText)
      .then(() => {
        showToastMessage('字幕已复制到剪切板', 'success')
      })
      .catch(err => {
        console.error('复制失败:', err)
        showToastMessage('复制失败', 'error')
      })
  } catch (error) {
    console.error('复制字幕时出错:', error)
    showToastMessage('复制字幕时出错', 'error')
  }
}

// 显示 Toast 提示
const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  
  // 3 秒后自动隐藏
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}


function makeValidFilename(inputString) {
    // 1. Remove or replace invalid characters
    // This regex targets common invalid characters across platforms.
    // It replaces them with a hyphen.
    let sanitizedString = inputString.replace(/[\\/:*?"<>|]/g, '-');

    // 2. Remove leading/trailing spaces, periods, or hyphens
    sanitizedString = sanitizedString.replace(/^[ .-]|[. -]$/g, '');

    // 3. Handle reserved names (Windows specific, but good practice)
    const reservedNames = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\.|$)/i;
    if (reservedNames.test(sanitizedString)) {
        sanitizedString = '_' + sanitizedString; // Prefix to avoid conflict
    }

    // 4. Limit length (optional, but good for compatibility)
    // Some file systems have length limits.
    const maxLength = 255; // Common limit
    if (sanitizedString.length > maxLength) {
        sanitizedString = sanitizedString.substring(0, maxLength);
    }

    return sanitizedString;
}

// 下载文件
const downloadFile = async (link) => {
  try {
    if (!subtitlesLoaded.value || parsedSubtitles.value.length === 0) {
      showToastMessage('没有可用的字幕内容', 'error')
      return
    }

    const head = `# Youtubetomp4.pro free youtube transcript
# ${videoTitle.value}
# ${yt_url.value}
`
    // 将字幕格式化为纯文本
    const subtitleText = parsedSubtitles.value.map(subtitle => {
      if (showTimestamps.value) {
        return `${subtitle.time}\n${subtitle.text}`
      } else {
        return subtitle.text
      }
    }).join('\n')

    // 创建一个临时链接，触发浏览器下载
    const blob = new Blob([`${head}\n\n${subtitleText}`], { type: 'text/plain' })
    const downloadUrl = window.URL.createObjectURL(blob)
    const linkElement = document.createElement('a')
    linkElement.href = downloadUrl
    linkElement.download = `${makeValidFilename(videoTitle.value)}.txt`  // 可根据需要修改文件名
    linkElement.click()

    // 释放 URL 对象
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('下载出错:', error)
    alert('下载出错，请重试')
  }
}

// 获取视频格式
const fetchFormats = async () => {
  if (!yt_url.value || !isValidYoutubeUrl(yt_url.value)) {
    alert('请输入有效的 YouTube 视频 URL')
    return
  }

  loading.value = true
  resetSubtitles()
  try {
    const response = await axios.get('https://youtubetomp4.pro/api/get-formats', {
      params: { url: yt_url.value }
    })
    yt_url1.value = yt_url.value // 此时更新 yt_url1，更新播放器视频
    videoData.value = response.data
    console.log('视频数据:', videoData.value)
    
    // 根据 languageMap 中定义的语言顺序过滤并排序字幕
    if (response.data.subtitles) {
      // 先过滤出在 languageMap 中定义的语言
      const filteredSubtitles = {}
      
      // 按照 languageMap 中的顺序遍历语言
      Object.keys(languageMap).forEach(langCode => {
        // 如果这个语言在响应数据中存在，则添加到过滤后的字幕中
        if (response.data.subtitles && response.data.subtitles[langCode]) {
          filteredSubtitles[langCode] = response.data.subtitles[langCode]
        }
      })
      
      // 将过滤后的字幕赋值给 videoData.value.subtitles
      videoData.value.subtitles = filteredSubtitles
      console.log('过滤并排序后的字幕:', Object.keys(filteredSubtitles))
    } else {
      videoData.value.subtitles = {}
    }
    // 检查是否有字幕
    if (videoData.value.subtitles) {
      // 记录所有可用的语言
      const languages = Object.keys(videoData.value.subtitles)
      console.log(`可用的字幕语言: ${languages.join(', ')}`)
      
      hasSubtitles.value = languages.length > 0
      
      // 如果有字幕语言，自动选择并加载第一项
      if (hasSubtitles.value && languages.length > 0) {
        // 选择第一个可用的字幕语言
        const firstLanguage = languages[0]
        console.log(`自动选择并加载字幕语言: ${firstLanguage}`)
        
        // 调用选择并加载字幕的函数
        nextTick(() => {
          selectAndLoadSubtitle(firstLanguage)
        })
      }
    } else {
      hasSubtitles.value = false
    }
  } catch (error) {
    console.error('get video info error:', error)
    alert(errorMessage.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Toast 提示样式 */
.toast-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.toast {
  background-color: rgba(0, 0, 0, 0.7); /* 黑色半透明背景 */
  color: #fff; /* 白色文字 */
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 80%;
  animation: toast-fade-in 0.3s;
}

/* 不再使用不同的背景色，而是使用图标或文字区分成功/失败 */
.toast.success::before {
  content: '✓'; /* 勾选标记 */
  margin-right: 8px;
}

.toast.error::before {
  content: '✗'; /* 叉号标记 */
  margin-right: 8px;
}

.toast-message {
  font-size: 16px;
  font-weight: 500;
}

@keyframes toast-fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 复制按钮样式 */
.subtitles-controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.download-button, .copy-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.download-button:hover {
  background-color: #0b7dda;
}

.download-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.copy-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.copy-button:hover {
  background-color: #0b7dda;
}

.copy-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

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
  width: 100%;
  box-sizing: border-box;
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
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.transcript-layout {
  display: flex;
  gap: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
  width: 100%;
}

@media (max-width: 992px) {
  .transcript-layout {
    flex-direction: column;
    width: 100%;
  }
  
  .main-content {
    padding: 10px;
  }
  
  .container2 {
    padding: 10px;
  }
  
  /* 移动端下字幕控制区域垂直排列 */
  .subtitles-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  /* 移动端下调整字幕下拉菜单宽度 */
  .subtitle-dropdown, .dropdown-container {
    width: 100%;
  }
  
  /* 移动端下调整复制和下载按钮 */
  .copy-button, .download-button {
    width: 100%;
    margin-top: 5px;
  }
  
  /* 移动端下调整时间戳切换开关位置 */
  .subtitles-controls-row {
    width: 100%;
  }
}

.video-player-section {
  flex: 1;
  min-width: 0;
  padding: 20px;
}

.subtitles-section {
  flex: 1;
  min-width: 0;
  padding: 20px;
  border-left: 1px solid #eee;
}

@media (max-width: 992px) {
  .subtitles-section {
    border-left: none;
    border-top: 1px solid #eee;
  }
}

.video-header {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.video-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
}

.embedded-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
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

.subtitles-title, .formats-title {
  font-size: 18px;
  font-weight: bold;
  color: #113b92;
  margin: 15px 0 5px;
}

.formats-title-tip {
  font-size: 12px;
  margin-top: -10px;
}

.subtitles-list {
  max-height: 400px;
  overflow-y: auto;
}

.subtitle-item {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 8px 10px;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 6px;
  transition: all 0.2s ease;
  border-bottom: 1px solid #eee;
}

.subtitle-item:hover {
  background-color: #f0f7ff;
}

.subtitle-item:active {
  background-color: #e1efff;
  transform: translateY(1px);
}

.subtitle-text {
  text-align: left;
  text-indent: 1em;
  text-wrap: nowrap;
  flex: 1;
}

.subtitles-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.subtitle-details {
  display: flex;
  flex-direction: column;
  /* 垂直排列内容 */
  align-items: flex-start;
  /* 让文本居左 */
  flex-grow: 1;
  /* 使subtitle-details占据剩余空间 */
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

/* 加载动画 */
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

/* 字幕控制区域样式 */
.subtitles-controls {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

/* 时间戳切换样式 */
.timestamp-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.timestamp-label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  user-select: none;
}

/* Switch 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

/* 隐藏原始复选框 */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 开关滑块样式 */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

/* 开关滑块圆形指示器 */
.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
}

/* 选中状态样式 */
input:checked + .slider {
  background-color: #1a73e8;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1a73e8;
}

/* 选中时滑块移动 */
input:checked + .slider:before {
  transform: translateX(20px);
}

/* 圆角样式 */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* 下拉菜单样式 */
.subtitle-dropdown {
  display: flex;
  flex: none;
  align-items: center;
  gap: 5px;
  font-size: .8em;
  min-width: 120px;
}

.dropdown-container {
  position: relative;
  width: 100%;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 15px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.dropdown-header:hover {
  background-color: #1558b7;
}

.dropdown-arrow {
  font-size: 12px;
  color: white;
  margin-left: 10px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 5px;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.view-subtitles-btn {
  padding: 8px 15px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.view-subtitles-btn:hover {
  background-color: #1558b7;
}

.view-subtitles-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.no-subtitles {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  text-align: center;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
}

.btn-ai-transcript {
  padding: 8px 15px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  white-space: nowrap;
  text-decoration: none;
}

.btn-ai-transcript:hover {
  background-color: #1558b7;
}

.btn-ai-transcript:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 字幕加载指示器样式 */
.subtitle-loading-indicator {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.subtitle-loading-indicator .bar {
  width: 8px;
  height: 24px;
  margin: 0 3px;
  background-color: #1A73E8;
  animation: loadingAnimation 1.2s infinite;
}

.subtitle-loading-indicator .bar:nth-child(1) {
  animation-delay: 0s;
}

.subtitle-loading-indicator .bar:nth-child(2) {
  animation-delay: 0.2s;
}

.subtitle-loading-indicator .bar:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
