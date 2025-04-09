<template>
  <header class="header">
    <div class="container">
      <!-- 左侧 Logo -->
      <div class="logo">
        <span class="site-name" @click="goHome">{{ $t("siteName") }}</span>
      </div>
      <!-- 右侧导航 -->
      <nav class="nav">
        <a href="#" class="nav-link">{{ $t("videoDownloader") }} &gt;</a>
        <a href="#" class="nav-link">{{ $t("mp3Converter") }} &gt;</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/'); // 强制跳转到首页
      }
    }
  }
};
</script>

<style scoped>
/* 📱 默认：移动端优先（Logo + 导航栏 垂直排列） */
.header {
  background-color: #1A3B8C38; /* 背景颜色 */
  padding: 15px 0;
  width: 100%;
}

/* ✅ 让 `container` 默认是垂直布局 */
.container {
  display: flex;
  flex-direction: column; /* 移动端默认上下排列 */
  align-items: center;
  text-align: center; /* 居中对齐 */
  max-width: 100%;
}

/* ✅ Logo 样式 */
.logo .site-name {
  font-size: 20px;
  font-weight: bold;
  font-family: "Comic Sans MS", cursive, sans-serif;
  color: #113b92;
  white-space: nowrap; /* 防止换行 */
  cursor: pointer;
}

/* ✅ 导航栏默认居中 */
.nav {
  display: flex;
  flex-direction: column; /* ✅ 移动端上下排列 */
  gap: 10px;
  margin-top: 10px;
}

/* ✅ 导航栏样式 */
.nav-link {
  font-size: 14px;
  color: #000;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap; /* 避免导航项换行 */
  margin-right: 40px;
}

.nav-link:hover {
  text-decoration: underline;
}

/* 📱✅ 渐进式增强：平板 (≥600px) */
@media (min-width: 600px) {
  .container {
    flex-direction: row; /* ✅ 变成水平排列 */
    justify-content: flex-start; /* ✅ 左对齐 */
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  /* ✅ 导航栏与 Logo 保持 50px 间距 */
  .nav {
    flex-direction: row;
    gap: 15px;
    margin-left: 50px; /* ✅ 让导航栏始终保持 50px 的间距 */
  }

  .nav-link {
    font-size: 16px;
  }
}

/* 🖥️ 桌面端优化（≥1024px） */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo .site-name {
    font-size: 24px;
  }

  .nav {
    gap: 20px; /* 增加间距 */
  }

  .nav-link {
    font-size: 18px;
  }
}
</style>
