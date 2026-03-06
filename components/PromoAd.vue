<template>
  <div class="promo-ad">
    <div class="promo-card">
      <div class="promo-emoji">☕️</div>
      <div class="promo-body">
        <p class="promo-text">
          <span class="promo-title">{{ _t('promoTitle') }}</span>
          {{ _t('promoDesc') }}
          <a href="https://musely.io" target="_blank" rel="noopener" class="promo-link">{{ _t('promoProduct') }}</a>。
        </p>
        <p class="promo-bonus">
          <span class="promo-bonus-icon">✨</span>
          {{ _t('promoBonus') }}
        </p>
      </div>
      <div class="promo-cta-wrap">
        <a href="https://musely.io" target="_blank" rel="noopener" class="promo-cta">
          {{ _t('promoCta') }} <span class="promo-arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { _t } from '@/i18n/utils'
</script>

<style scoped>
.promo-ad {
  display: flex;
  justify-content: center;
  margin-top: 28px;
  padding: 0 20px;
}

.promo-card {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 720px;
  width: 100%;
  background-color: rgba(239, 246, 255, 0.8);
  border: 1px solid #DBEAFE;
  border-radius: 12px;
  padding: 20px 24px;
  transition: background-color 200ms ease-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.promo-card:hover {
  background-color: #EFF6FF;
}

.promo-emoji {
  font-size: 1.75rem;
  flex-shrink: 0;
  padding-top: 2px;
}

.promo-body {
  flex: 1;
  min-width: 0;
}

.promo-text {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  line-height: 1.7;
  color: #334155;
  margin: 0;
  text-align: left;
}

.promo-title {
  font-weight: 700;
  color: #1E293B;
}

.promo-link {
  color: #2563EB;
  font-weight: 700;
  text-decoration: none;
}

.promo-link:hover {
  text-decoration: underline;
}

.promo-bonus {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.8125rem;
  color: #64748B;
  margin: 10px 0 0;
  display: flex;
  align-items: center;
  text-align: left;
}

.promo-bonus-icon {
  font-size: 0.625rem;
  margin-right: 6px;
}

.promo-cta-wrap {
  flex-shrink: 0;
  align-self: center;
}

.promo-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #2563EB;
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 9999px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 200ms ease-out;
  box-shadow: 0 1px 3px rgba(37, 99, 235, 0.2);
}

.promo-cta:hover {
  background-color: #1D4ED8;
}

.promo-arrow {
  margin-left: 6px;
  font-size: 0.625rem;
}

/* Mobile responsive */
@media screen and (max-width: 768px) {
  .promo-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .promo-cta-wrap {
    align-self: flex-end;
  }
}
</style>
