<template>
    <header class="header">
      <div class="container">
        <!-- 左侧 Logo -->
        <div class="logo">
          <span class="site-name">Youtubetomp4.pro</span>
        </div>
        <!-- 右侧导航 -->
        <nav class="nav">
          <a href="#" class="nav-link">YouTube Video Downloader &gt;</a>
          <a href="#" class="nav-link">YouTube to MP3 Converter &gt;</a>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
  };
  </script>
  
  <style scoped>
  /* 头部整体样式 */
  .header {
    background-color: #1A3B8C38; /* 灰蓝色背景 */
    padding: 26px 0;
    width: 100%;
  }
  
  /* 布局 */
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start; /* 让 Logo 和导航靠左 */
    max-width: 1200px;
    margin: 0 0,20px,20px;
    padding: 0 20px;
  }
  
  /* Logo 样式 */
  .logo .site-name {
    font-size: 24px;
    font-weight: bold;
    font-family: "Comic Sans MS", cursive, sans-serif;
    color: #113b92; /* 深蓝色 */
  }
  
  /* 导航链接 */
  .nav {
    display: flex;
    gap: 15px; /* 减小间距 */
    font-weight: bold;
    font-family: "DM Sans", sans-serif;
    margin-left: 40px; /* 让导航靠近 Logo */
  }
  
  .nav-link {
    font-size: 16px;
    color: #000;
    text-decoration: none;
    font-weight: 500;
    margin-left: 40px;
  }
  
  .nav-link:hover {
    text-decoration: underline;
  }
  </style>
  