<template>
  <main class="main-content">
    <div class="converter-container">
      <!-- 图标 -->
      <div class="icon-container">
        <img src="@/assets/yt_icon.png" alt="YouTube Icon" class="icon" />
      </div>

      <!-- 标题 -->
      <h1 class="title">YouTube to MP4 Converter</h1>

      <!-- 描述 -->
      <p class="description">
        Paste URL and Quick Convert YouTube to MP4. Always free, always works, no ads.
      </p>

      <div class="container">
        <div class="input-wrapper">
          <input type="text" v-model="yt_url" placeholder="https://www.youtube.com/watch?v=..." class="input-box" />
          <button class="download-button2" @click="fetchFormats">DOWNLOAD</button>
        </div>
      </div>

      <p class="converter-container-tip">Please be mindful of copyright when downloading content. This tool isn't designed for downloading copyrighted music. </p>
    </div>

    <div class="container2" v-if="videoData && videoData?.title">
      <div class="video-card">
        <div class="video-header">
          <img :src="videoData.thumbnail" class="thumbnail" alt="Thumbnail">
          <h2 class="title">{{ videoData.title }}</h2>
        </div>
        <h3 class="formats-title">All Formats</h3>
        <p class="formats-title-tip">Click to save</p>
        <div class="formats-list">
          <div v-for="format in videoData.formats" :key="format.format_id" class="format-item">
            <span class="download-icon">⬇️</span>
            <div class="format-details">
              <a :href="format.url" class="download-link" target="_blank">
                {{ videoData.title }}.{{ format.ext }}
              </a>
              <span class="format-info">{{ format.resolution || "Audio Only" }} • {{ (format.filesize / (1024 * 1024)).toFixed(2) }} MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      yt_url: 'https://www.youtube.com/watch?v=39olCJI2TgQ', // 用来存储 YouTube 链接
      videoData: {
      }
    };
  },
  methods: {
    download() {
      alert(`Starting download for: ${this.url}`);
    },
    async downloadFile(link) {
      try {
        // 向后端发送请求下载文件
        const response = await axios.get(link, {
          responseType: 'blob'  // 设置返回类型为二进制流
        });

        // 创建一个临时链接，触发浏览器下载
        const blob = response.data;
        const downloadUrl = window.URL.createObjectURL(blob);
        const linkElement = document.createElement('a');
        linkElement.href = downloadUrl;
        linkElement.download = 'video.mp4';  // 可根据需要修改文件名
        linkElement.click();

        // 释放 URL 对象
        window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        console.error('下载失败:', error);
        alert('下载失败，请稍后再试');
      }
    },

    async fetchFormats() {
      if (!this.yt_url) {
        alert('请输入有效的 YouTube 视频 URL');
        return;
      }

      console.log("fetchFormats yt_url: " + this.yt_url);
      try {
        const response = await axios.get('http://localhost:3001/get-formats', {
          params: { url: this.yt_url }
        });
        this.videoData = response.data; // 保存返回的格式信息
        console.log("fetchFormats this.videoData: " + this.videoData);
      } catch (error) {
        console.error('获取格式失败:', error);
      }
    },
    // async ytDownlaodTest(){
    //   if (!this.yt_url) {
    //     alert('请输入有效的 YouTube 视频 URL');
    //     return;
    //   }
    //   const videoStream = ytdl(this.yt_url);
    //   videoStream.pipe(fs.createWriteStream('video.mp4'));
    //   videoStream.on('end',()=>{
    //       console.log("downlaod ==========");
    //   });
    // }
  }
}
</script>

<style scoped>
.main-content {
  text-align: center;
}

.converter-container {
  text-align: center;
  padding: 40px 20px;
}

.converter-container-tip{
  font-size: 12px;
  white-space: pre-line;
  margin-top: 30px;
}

/* 图标 */
.icon-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.icon {
  width: 285px;
  height: auto;
}

/* 标题 */
.title {
  font-size: 32px;
  font-weight: bold;
  color: #113b92;
}

/* 描述 */
.description {
  font-size: 16px;
  color: #555;
  margin: 10px 0 20px;
}

/* 最外层居中容器 */
.container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* 输入框和按钮的整体外层 */
.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 8px;
  overflow: hidden;
  /* 避免圆角问题 */
  width: 44%;
  min-width: 300px;
  /* 防止过窄 */
  height: 60px;
}

/* 输入框样式 */
.input-box {
  flex: 1;
  padding: 12px;
  border: none;
  outline: none;
  font-size: 1em;
  color: #333;
  margin: 0px 0px 0px 10px;
}

/* 下载按钮样式 */
.download-button2 {
  background-color: #027AFF;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  height: 54px;
  margin: 4px;
  padding: 20px;
  border-radius: 8px;
}

.download-button2:hover {
  background-color: #027AFF;
}

.download-button {
  background-color: #3b82f6;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  height: 56px;
  margin: 4px;
}

.download-button:hover {
  background-color: #2563eb;
}


.download-list {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 30%;
  /* 设置宽度为输入框的 2/3 */
  margin: 40px auto;
  /* 水平居中 */
}

.download-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.download-item .item-info p {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.download-button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.download-button:hover {
  background-color: #218838;
}

.container2 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.video-card {
  background: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
}

.video-header {
  display: flex;
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

.formats-title-tip{
  font-size: 12px;
  margin-top:  -10px;
}

.formats-list {
  margin-top: 20px;
}

.format-item {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 16px;
  border-radius: 5px;
  margin-bottom: 16px;
}

.download-icon {
  font-size: 36px;
  margin-right: 10px;
}

.format-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.download-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
    display: -webkit-box; /* 必须使用的属性 */
  -webkit-line-clamp: 2; /* 最大行数 */
  -webkit-box-orient: vertical; /* 设置为垂直方向 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 溢出时显示省略号 */
}

.download-link:hover {
  text-decoration: underline;
}

.format-info {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}
</style>