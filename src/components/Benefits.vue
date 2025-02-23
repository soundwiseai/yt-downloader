<template>
    <section class="benefits">
      <h2>Benefits of Using YouTube to MP4 Converter</h2>
  
      <div class="benefit-item" 
           v-for="(benefit, index) in benefits" 
           :key="index"
           :class="{'reverse-layout': index % 2 !== 0}">
        <div class="benefit-text">
          <h3>{{ benefit.title }}</h3>
          <p v-html="benefit.description.replace(/\n/g, '<br>')"></p>
        </div>
        <div class="benefit-image">
          <img :src="benefit.image" alt="Benefit Image" />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        benefits: [
          {
            title: "Convenience and Accessibility",
            description: "Have you ever been stuck somewhere without internet access, wishing you could watch your favorite video? A YouTube to MP4 converter solves this problem. It lets you download videos in MP4 format, which works on almost any device. Whether you’re using a smartphone, tablet, or laptop, you can enjoy your content without worrying about compatibility.\n\nOffline viewing also makes life easier when you’re traveling or in areas with poor connectivity. You don’t have to deal with buffering or interruptions. Plus, downloading videos ensures you always have access to high-quality content, even when the internet isn’t an option.",
            image: require("@/assets/yt_benefits.png"), // Replace with the correct image path
          },
          {
            title: "Avoid Ads",
            description: "Ads can be frustrating, especially when they interrupt your favorite videos. With a YouTube MP4 downloader, you can skip the ads entirely. Once you download a video, you can watch it without any interruptions. This means no more waiting for those “Skip Ad” buttons to appear.\n\nBy avoiding ads, you save time and enjoy a smoother viewing experience. It’s like having your own personal ad-free streaming service. Whether you’re watching tutorials, music videos, or movies, an MP4 downloader ensures nothing gets in the way of your entertainment. ",
            image: require("@/assets/yt_benefits.png"), // Replace with the correct image path
          },
          {
            title: "Save Data and Storage",
            description: "Streaming videos can quickly eat up your mobile data, especially if you’re on a limited plan. A YouTube MP4 downloader helps you save data by letting you download videos over Wi-Fi. Once downloaded, you can watch them as many times as you want without using any additional data.\n\nAnother great benefit is storage efficiency. MP4 files are compact, so they don’t take up much space on your device. You can build an offline library of your favorite videos without worrying about running out of storage. This makes a free converter website an excellent tool for managing your video collection.",
            image: require("@/assets/yt_benefits.png"), // Replace with the correct image path
          },
          {
            title: "Get More From Your Downloads",
            description: "Say goodbye to buffering and data drains! Here's how to make the most of your offline videos:\n<strong>1.Build Your Personal Media Library</strong> \n    Create your own Netflix-style collection - organized by folders and tagged for easy browsing. \n    <strong>Pro tip:</strong> Add quick notes to your videos and keep backups on an external drive. Your entertainment, your rules.\n<strong>2.Travel Without Worries</strong> \n    No more spotty airplane WiFi or boring road trips. Load up your device before hitting the road, \n   and you've got endless entertainment in your pocket. Whether you're camping in the \n    wilderness or stuck in a subway tunnel, your favorite content is always ready to roll. \n <strong>3.Save Those Precious Data Bytes </strong>\n    Download over WiFi, watch anytime. Perfect for:Students grabbing lecture videos for the commuteProfessionals saving work presentations Anyone tired of watching that loading spinner on shaky connections",
            image: require("@/assets/yt_benefits.png"),
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .benefits {
    text-align: center;
    padding: 20px 20px;
  }
  
  .benefits h2 {
    font-size: 2rem;
    color: #1A3B8C;
    margin-bottom: 40px;
  }
  
  .benefit-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    gap: 20px;
    width: 88%;
    margin: 0 auto;
    transition: transform 0.3s ease-in-out;
  }
  
  .benefit-item.reverse-layout {
    flex-direction: row-reverse; /* 交替排列 */
  }
  
  .benefit-text {
    width: 60%;
    text-align: left;
  }
  
  .benefit-text h3 {
    font-size: 1.5rem;
    color: #1A3B8C;
    margin-bottom: 15px;
  }
  
  .benefit-text p {
    font-size: 0.9rem;
    color: #3E3E3E;
    white-space: pre-wrap;
    line-height: 24px;
  }
  
  .benefit-image img {
    max-width: 420px;
    height: auto;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    .benefit-item {
      flex-direction: column;
      text-align: center;
    }
  
    .benefit-text {
      width: 100%;
    }
  
    .benefit-image img {
      width: 80%;
      margin-top: 20px;
    }
  }
  </style>
  