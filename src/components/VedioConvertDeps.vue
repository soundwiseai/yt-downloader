<template>
    <section class="how-to-convert">
      <h2 class="title">How to Convert YouTube Video to MP4</h2>
      <p class="description">
        Imagine being on a long flight or in a remote area with no internet access. Streaming your favorite video becomes impossible, right? 
        That’s where offline viewing saves the day. By downloading videos in advance, you can enjoy uninterrupted entertainment anytime, anywhere. 
        A YouTube to MP4 converter makes this process seamless. It lets you download YouTube videos quickly and efficiently.
      </p>
      
      <div class="steps">
        <div v-for="(step, index) in steps" :key="index" class="step">
          <img :src="step.image" :alt="step.title" class="step-image"/>
          <p class="step-text">
            <span class="step-number">Step {{ index + 1 }}.</span> {{ step.title }}
          </p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        steps: [
          { image: require("@/assets/yt_convert_deps1.png"), title: "Copy the YouTube Video URL" },
          { image: require("@/assets/yt_convert_deps2.png"), title: "Directly click on the ‘Download’ button" },
          { image: require("@/assets/yt_convert_deps3.png"), title: "Wait for minutes and save the video" }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .how-to-convert {
    text-align: center;
    max-width: 90%;
    margin: auto;
    padding: 20px 20px;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #1A3B8C;
    margin-bottom: 15px;
  }
  
  .description {
    font-size: 0.9rem;
    color: #555;
    width: 78%;
    margin: auto;
    line-height: 1.6;
  }
  
  .steps {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    gap: 20px;
  }
  
  .step {
    flex: 1;
    text-align: center;
  }
  
  .step-image {
    max-width: 290px;
    height: auto;
    border-radius: 10px;
  }
  
  .step-text {
    font-size: 1rem;
    color: #222;
    margin-top: 20px;
  }
  
  .step-number {
    font-weight: bold;
    color: #0d1c44;
  }
  </style>
  