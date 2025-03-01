import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue'; // 主页
import PrivacyPolicy from './components/PrivacyPolicy.vue'; // 隐私政策页
import TeamOfServer from './components/TeamOfServer.vue'; // 隐私政策页

const routes = [
  { path: '/', component: Home },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/teamof-server', component: TeamOfServer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
