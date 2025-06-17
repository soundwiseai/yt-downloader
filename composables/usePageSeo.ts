import { useI18n } from 'vue-i18n'

export const usePageSeo = () => {
  const { t } = useI18n()

  const setSeoMeta = () => {
    useSeoMeta({
      title: () => t('seo.title'),
      description: () => t('seo.description'),
      ogTitle: () => t('seo.ogTitle'),
      ogDescription: () => t('seo.ogDescription'),
      ogSiteName: () => t('siteName'),
      twitterTitle: () => t('seo.ogTitle'),
      twitterDescription: () => t('seo.ogDescription')
    })
  }

  return {
    setSeoMeta
  }
}
