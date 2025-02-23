<template>
    <section class="features">
      <h2>Features of YouTube Video Converter</h2>
      <div class="features-container">
        <div
          class="feature-item"
          v-for="(feature, index) in features"
          :key="index"
        >
          <div class="feature-icon">
            <img :src="feature.icon" alt="feature icon" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
      <div class="download-button-container">
        <button class="download-button">Download Now &gt;&gt;</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        features: [
          {
            icon: require('@/assets/yt_feature.png'),  // 假设图标路径
            title: "High Success Rate YouTube Downloads",
            description: "Download YouTube videos effortlessly with our advanced converter, featuring industry-leading success rates and reliable quality preservation for all content types."
          },
          {
            icon: require('@/assets/yt_feature.png'),
            title: "Lightning-Fast YouTube to MP4 Converter",
            description: "Transform YouTube videos into high-quality MP4 files in seconds. Experience seamless, instant downloads without compromising video quality."
          },
          {
            icon: require('@/assets/yt_feature.png'),
            title: "100% Safe and Secure",
            description: "Download YouTube videos safely with our clean, privacy-focused converter. No tracking, no malware – just pure simplicity."
          },
          {
            icon: require('@/assets/yt_feature.png'),
            title: "Unlimited Downloads",
            description: "Convert and save as many YouTube videos as your heart desires, with zero waiting time or pesky download caps getting in your way."
          },
          {
            icon: require('@/assets/yt_feature.png'),
            title: "No Login & No Software Installation",
            description: "Jump right in and convert videos without creating accounts or downloading anything. Just paste your link and you're good to go – no fuss, no hassle."
          },
          {
            icon: require('@/assets/yt_feature.png'),
            title: "Various Formats Support",
            description: "Download in MP4, M4A, or WEBM. Whatever format or quality you're after, we've got you covered."
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .features {
    text-align: center;
    padding: 20px 20px;
  }
  
  .features h2 {
    font-size: 2rem;
    margin-bottom: 40px;
    color: #1A3B8C;
  }
  
  .features-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 每行显示三个卡片 */
    grid-gap: 20px;
    margin: 0 auto;
    width: 88%;
  }
  
  .feature-item {
    background-color: #f1f1f1;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    text-align: center;
  }
  
  .feature-icon img {
    width: 116px;
    height: 116px;
  }
  
  .feature-item h3 {
    font-size: 1.3rem;
    color: #1A3B8C;
  }
  
  .feature-item p {
    font-size: 0.9rem;
    color: #3E3E3E;
  }
  
  .download-button-container {
    margin-top: 40px;
  }
  
  .download-button {
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2rem;
  }
  
  .download-button:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 1024px) {
    .features-container {
      width: 90%;
    }
  }
  
  @media (max-width: 768px) {
    .features-container {
      grid-template-columns: 1fr; /* 在小屏幕下每行显示一个卡片 */
    }
  
    .feature-item {
      width: 100%;
    }
  }
  </style>
  