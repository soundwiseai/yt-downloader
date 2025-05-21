import { createI18n } from "vue-i18n";


// // **自动检测浏览器语言**
// const lang = navigator.language;
// const browserLang = lang.split("-")[0]; // 获取 `zh-CN` 的 `zh`
// const defaultLang = messages[browserLang] ? browserLang : (messages[lang] ?  lang : "en"); // 优先匹配 Main Language，如果匹配不到则匹配次级语言，兜底使用英语

// console.log("defaultLang", defaultLang);

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === 'legacy') {
      i18n.global.locale = locale
    } else {
      i18n.global.locale.value = locale
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html').setAttribute('lang', locale)
  }
  
export async function loadLocaleMessages(i18n, locale, type = 'default') {
  let messagesModule;
  if (type === 'mp3') {
    messagesModule = await import(`./messages/mp3.js`);
    console.log('[i18n] mp3.js loaded');
  } 
  else if (type === 'downloader') {
    messagesModule = await import(`./messages/downloader.js`);
    console.log('[i18n] downloader.js loaded');
  } else {
    messagesModule = await import(`./messages/default.js`);
    console.log('[i18n] default.js loaded');
  }
  const messages = messagesModule.messages;
  const supportedLocales = Object.keys(messages);

  let targetLocale = locale;
  if (!targetLocale) {
    const lang = navigator.language;
    const browserLang = lang.split('-')[0];
    if (supportedLocales.includes(browserLang)) {
      targetLocale = browserLang;
      console.log(`[i18n] locale not specified, auto use browser main lang: ${browserLang}`);
    } else if (supportedLocales.includes(lang)) {
      targetLocale = lang;
      console.log(`[i18n] locale not specified, auto use browser full lang: ${lang}`);
    } else {
      targetLocale = 'en';
      console.log(`[i18n] locale not specified, fallback to en.`);
    }
  } else if (!supportedLocales.includes(targetLocale)) {
    console.warn(`[i18n] Locale '${targetLocale}' not supported. Fallback to 'en'. Supported:`, supportedLocales);
    targetLocale = 'en';
  }

  i18n.global.setLocaleMessage(targetLocale, messages[targetLocale]);
  console.log(`[i18n] setLocaleMessage:`, targetLocale, messages[targetLocale]);
  return { targetLocale };
}

const i18n = createI18n({});
export default i18n;
