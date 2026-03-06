# Changelog

## 2026-03-04

### Fixed
- Fixed onPaste URL duplication: added `event.preventDefault()` + `.trim()` in MainContent.vue & Transcription.vue
- Fixed error alerts not showing: `_t()` uses Vue composables that fail in async catch blocks; pre-compute all error messages in `onMounted` as refs
- Added `youtu.be` short URL support to Transcription.vue `isValidYoutubeUrl`

### Improved
- Backend error classification: `server.js` now returns `errorType` field (`video_unavailable` / `invalid_url` / `generic_error`)
- User-friendly error messages: "video unavailable" clearly indicates it's a YouTube/uploader issue, not our site
- Replaced hardcoded Chinese alert text with i18n `_t()` calls
- Added `errorVideoUnavailable` and `errorInvalidUrl` i18n keys (19 locales)

### DevOps
- Added `devServer: { port: 45330 }` to `nuxt.config.ts`
- Added `localhost:45330` to backend CORS whitelist
- All changes synced to y2bmp3 and y2script projects

## 2026-03-03

### Fixed (SEO P0)
- Sitemap.xml `lastmod` updated from `2025-02-12` to `2026-03-03`
- Added `hreflang="x-default"` on all pages, pointing to English version
- Added missing OG tags: `og:image`, `og:url`, `og:type` on all 5 pages
- Added Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### Changed
- i18n file split: 19 monolithic JSONs → 19 directories × 6 files (114 total)
  - Files: `common.json`, `mp4.json`, `mp3.json`, `downloader.json`, `transcript.json`, `m4a.json`
  - `nuxt.config.ts` updated: `file` → `files` array per locale
  - Zero functional/SEO impact — pure organizational improvement
- SEO dicts moved from `common.json` to respective page files for easier maintenance
- Added `vite.server.proxy` for `/api` → `https://y2mp4.com` (dev mode only)

### DevOps
- VPS health check script deployed (`/root/health_check.sh`)
  - 9 checks: 5 pages × SEO full check + 2 coming-soon sites + i18n spot check + API deep check
  - Telegram alerts via 「报错小能手」Bot, every 8 hours (Beijing 01:00 / 09:00 / 17:00)
- PM2 auto-start on boot configured (`pm2 startup systemd`)
- GitHub Actions `VPS_PASSWORD` secret needs update (old password expired)

## 2026-02-18

### Changed
- Save tip hover image migrated to Cloudflare R2 CDN (`media.y2mp4.com`)

## 2026-02-17

### Fixed
- Sitemap.xml updated from `youtubetomp4.pro` to `y2mp4.com` (76 URLs)
- YouTube short URL (`youtu.be`) validation fix — YouTube app share links now accepted

### Changed
- UI redesign: mobile hamburger menu (☰) for Header at < 768px
- Mobile input box full-width + download button full-width
- Download button always active (blue) — removed gray disabled state
- FAQ restyled: removed blue border/box, clean accordion on transparent background
- Save tip text: added hover tooltip with tutorial image
