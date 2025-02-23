<template>
    <div class="faq-container">
      <h2 class="faq-title">FAQ</h2>
      <div class="faq-wrapper">
        <div v-for="(item, index) in faqs" :key="index" class="faq-item">
          <div class="faq-header" @click="toggleFAQ(index)">
            <span class="arrow">{{ activeIndex === index ? "▼" : "▶" }}</span>
            <span class="faq-question">{{ item.question }}</span>
          </div>
          <div v-if="activeIndex === index" class="faq-content">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: null, // 记录当前展开的索引
        faqs: [
          {
            question: "1. Is it legal to use a YouTube to MP4 converter?",
            answer: "It depends on the video. You can legally download videos with a Creative Commons license or those explicitly allowed for offline use. Avoid downloading copyrighted content without permission to stay on the right side of the law.Tip: Always check the video’s terms of use before downloading."
          },
          {
            question: "2. Can I use a YouTube to MP4 converter on my phone?",
            answer: "Yes! it works on mobile devices. You can use apps or mobile-friendly websites to download videos directly to your phone. Just paste the video link, select MP4, and hit download."
          },
          {
            question: "3. What’s the best resolution to download YouTube videos in?",
            answer: "It depends on your needs. For high-quality playback, go for HD (720p) or 4K. If you’re saving storage space, choose a lower resolution like 480p.Pro Tip: Balance quality and file size based on your device’s storage capacity."
          },
          {
            question: "4. Are free YouTube to MP4 converters safe?",
            answer: "While many free converters out there can be sketchy, we take your security seriously. Our converter runs entirely in your browser without any sneaky downloads or suspicious pop-ups. We use secure HTTPS encryption and never store your personal data or viewing history. Plus, we regularly scan for malware and keep our service squeaky clean. No spyware, no bloatware - just straightforward video conversion you can trust."
          },
          {
            question: "5. Who always use the YouTube to MP4 converter?",
            answer: "Our converter is the perfect tool for all sorts of users. Here's who'll love it: \n Content Creators: Snag videos for your next big edit or social media remix\nStudents & Teachers: Stock up on tutorials and lectures for study sessions anywhere\nRoad Warriors: Load up your device with entertainment for those long flights and commutes\nBusiness Pros: Keep important video content at your fingertips, internet or not\nEveryday Viewers: Kick back and enjoy your favorite YouTube content on any device, whenever you want\n\nWhich languages does our converter support?\nOur converter speaks your language - literally! Whether your videos are in English, Spanish, Japanese, or any other language on YouTube, we've got you covered. If YouTube can play it, we can convert it.\n\nIs there a limit to how many videos I can convert?\nNope! Convert as many videos as you want - no daily caps or restrictions here. Just paste your links and you're all set. No need to create an account or download any software either. While we keep things wide open, we do have some basic anti-spam measures in place to keep the service running smoothly for everyone. And what’s more, it is totally free!"
          }
        ]
      };
    },
    methods: {
      toggleFAQ(index) {
        this.activeIndex = this.activeIndex === index ? null : index;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 最外层容器 */
  .faq-container {
    width: 85%;
    margin: 20px auto;
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
  