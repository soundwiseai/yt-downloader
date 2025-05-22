import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue'; // 主页
import PrivacyPolicy from './components/PrivacyPolicy.vue'; // 隐私政策页
import TeamOfServer from './components/TeamOfServer.vue'; // 隐私政策页
import i18n, { setI18nLanguage, loadLocaleMessages } from './i18n'

const routes = [
  { path: '/', component: Home },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/teamof-server', component: TeamOfServer },
  { path: '/:locale', component: Home, props: true },
  { path: '/:locale/youtube-to-mp3', component: Home, props: true },
  { path: '/:locale/youtube-video-downloader', component: Home, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const locale = to.params.locale;
  let type = 'default';
  if (to.path.endsWith('/youtube-to-mp3')) {
    type = 'mp3';
  } else if (to.path.endsWith('/youtube-video-downloader')) {
    type = 'downloader';
  }
  console.log('[router] beforeEach', { path: to.path, locale, type });
  const { targetLocale } = await loadLocaleMessages(i18n, locale, type);
  await nextTick();
  setI18nLanguage(i18n, targetLocale);
  console.log('[router] setI18nLanguage', targetLocale);
  return next();
});

export default router;
