<template>
  <div class="footer">
    <p>&copy;2025 YouTube to MP4 Converter.All Rights Reserved.</p>
    <p>
      <router-link 
      to="/privacy-policy" 
      @click="handleNavigation($event, '/privacy-policy')"
    >
      Privacy Policy
    </router-link> |

    <router-link 
      to="/teamof-server" 
      @click="handleNavigation($event, '/teamof-server')"
    >
      Terms of Service
    </router-link>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    handleNavigation(event) {
      if (this.$route.path !== '/') {
        event.preventDefault(); // 阻止跳转
      }
    }
  }
};
</script>

<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  bottom: 0;
  width: 100%;
}

a, router-link {
  color: blue;
  text-decoration: none;
  font-weight: bold;
}

a:hover, router-link:hover {
  text-decoration: underline;
}
</style>
