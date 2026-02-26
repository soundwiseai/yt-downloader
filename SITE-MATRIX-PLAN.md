# 网站矩阵建设方案

> 最后更新：2026-02-26
> 分支：site-matrix-plan

---

## 一、项目概述

将现有 Y2MP4.com 项目扩展为三站矩阵，每站主攻一个高搜索量关键词群：

| 站点 | 域名 | 首页核心功能 | 目标关键词群 |
|------|------|-------------|-------------|
| MP4 站 | y2mp4.com | 视频下载（MP4） | youtube to mp4, youtube video downloader |
| MP3 站 | y2bmp3.com | 音频下载（M4A/MP3） | youtube to mp3, youtube audio downloader |
| 字幕站 | y2script.com | 字幕/转录提取 | youtube transcript, youtube subtitles |

**架构决策：三个独立 GitHub 仓库**

- 从 y2mp4 fork 出 y2bmp3 和 ytbscript
- 三站前端完全独立，各自维护
- 三站共用同一台 VPS 和同一个后端 API
- 通过 Cloudflare Proxy 隐藏真实 IP

---

## 二、当前项目分析

### 现有代码结构（需要了解以便 fork）

```
yt-downloader/
├── nuxt.config.ts          # Nuxt 配置（域名、i18n、预渲染路由）
├── app.vue                 # 根组件（GA ID、Clarity ID、字体引入）
├── sites.ts                # 多工具配置（4 个工具的路由/SEO/i18n 映射）
├── design-spec.jsonc       # 设计规范（配色、字体、间距）
│
├── pages/                  # 页面路由
│   ├── index.vue           # 首页（当前 = MP4 下载）
│   ├── youtube-to-mp3.vue
│   ├── youtube-video-downloader.vue
│   ├── youtube-transcript-generator.vue
│   └── [locale]/           # 19 种语言的动态路由
│
├── components/             # Vue 组件
│   ├── Header.vue          # 导航栏（logo、工具链接、语言选择）
│   ├── Footer.vue          # 页脚（工具链接、版权信息）
│   ├── Home.vue            # 首页内容编排
│   ├── MainContent.vue     # 核心功能区（URL 输入 + 格式列表）
│   ├── Benefits.vue        # 卖点展示
│   ├── FAQ.vue             # 常见问题
│   ├── Features.vue        # 功能特性网格
│   └── Reviews.vue         # 用户评价
│
├── composables/
│   └── usePageSeo.ts       # SEO meta 生成（canonical、hreflang、og）
│
├── i18n/
│   ├── utils.js            # 翻译工具函数（_t 支持按工具页面自动切换前缀）
│   └── locales/            # 19 种语言 JSON 文件
│       ├── en.json         # 英语（563 行，包含所有工具的 SEO + 文案）
│       └── ...             # ar, de, es, fr, hi, id, it, ja, ko, pt, ru, th, tr, vi, zh-CN, zh-TW 等
│
├── public/images/          # 静态图片（logo、功能图、benefits 图等 18+ 张）
│
├── server/
│   └── server.js           # Express.js 后端（yt-dlp 调用 + CORS）
│
└── .github/workflows/
    └── manual-build.yml    # CI/CD（手动触发构建 + 部署到 VPS）
```

### 需要 fork 后修改的部分

| 文件/目录 | 需改什么 | 工作量 |
|-----------|---------|--------|
| `nuxt.config.ts` | 域名、Vite proxy target | 小 |
| `app.vue` | GA ID、Clarity ID、字体引入、品牌名 | 小 |
| `sites.ts` | 调整首页默认工具、导航显示逻辑 | 小 |
| `design-spec.jsonc` | 配色方案 | 小 |
| `composables/usePageSeo.ts` | 域名替换（y2mp4.com → 新域名） | 小 |
| `components/Header.vue` | logo 图片、配色 | 中 |
| `components/Footer.vue` | 品牌名、配色 | 中 |
| `components/MainContent.vue` | 配色、首页默认展示逻辑 | 中 |
| `components/Home.vue` | 可能调整 section 顺序（差异化） | 中 |
| `components/Benefits.vue` | 图片、配色 | 中 |
| `components/Features.vue` | 图片、配色 | 中 |
| `components/FAQ.vue` | 配色 | 小 |
| `components/Reviews.vue` | 配色 | 小 |
| `i18n/locales/*.json`（×19） | 所有文案重写 | **大（运营负责）** |
| `public/images/*`（18+ 张） | 全部替换 | **大（设计负责）** |
| `.github/workflows/` | 部署路径、VPS 目标目录 | 小 |
| `public/robots.txt` | 域名 | 小 |
| `public/sitemap.xml` | 域名 + 路由 | 小 |

---

## 三、三站差异化方案

### 3.1 视觉差异化

> 设计方法论：遵循 design-engineer anti-AI-slop 原则
> - 字体必须有个性（禁用 Inter / Roboto / Arial）
> - 配色从产品身份出发（不是随便挑颜色）
> - 背景要有温度和质感（不是空洞的纯白）
> - 每个站必须有一个让人记住的设计记忆点

#### 三站总览对比

| 维度 | y2mp4.com | y2bmp3.com | y2script.com |
|------|-----------|------------|---------------|
| **风格方向** | Flat-Minimal（现状保留） | Warm Analog（暖色模拟感） | Editorial Precision（编辑排版感） |
| **品牌联想** | 科技工具、可靠 | 黑胶唱片、暖声、模拟音频 | 杂志版面、精确、文字之美 |
| **记忆点** | 蓝色信赖感 | 赤陶暖色 + 黑胶质感 | 衬线大标题 + 纸张质感 |
| **主色** | #2563EB 蓝 | #C2410C 赤陶橙 | #047857 深翡翠绿 |
| **CTA 色** | #F97316 橙 | #115E59 深青 | #B45309 琥珀棕 |
| **标题字体** | Poppins | Outfit（几何粗体） | Fraunces（个性衬线） |
| **正文字体** | Open Sans | DM Sans | Plus Jakarta Sans |
| **背景色** | #FFFFFF 纯白 | #FFFBF5 暖奶白 | #FAFAF9 纸白 |
| **灰阶色调** | 冷灰 Slate | 暖灰 Stone | 暖灰 Stone |
| **按钮圆角** | 8px | 20px（大圆角） | 4px（直角方正） |
| **卡片风格** | 冷灰边框 + 阴影 | 无边框，暖色阴影 | 细石灰边框，无阴影 |
| **Hero 背景** | 浅蓝渐变 #EFF6FF→#FFF | 暖奶油渐变 #FFF7ED→#FFFBF5 | 极浅绿渐变 #ECFDF5→#FAFAF9 |
| **Footer** | #0F172A 冷石板 | #1C1917 暖黑 Stone-900 | #022C22 墨绿 Emerald-950 |
| **Hero 布局** | 居中对齐 | 左对齐 | 左文右图 |
| **Section 顺序** | Hero→Reviews→Features→Benefits→FAQ | Hero→Features→Benefits→Reviews→FAQ | Hero→Benefits→Features→FAQ→Reviews |
| **Logo / Favicon** | 各站完全不同 | | |
| **所有配图** | 完全不同的三套（18+ 张） | | |

---

#### y2bmp3.com 完整设计方案 — "Warm Analog"（暖色模拟风）

**设计理念**：
灵感来自黑胶唱片的暖色调和模拟音频的温暖质感。赤陶橙（Terracotta）作为主色传递音乐的温度和能量——不是 Spotify 的冷绿，也不是通用的玫瑰粉，而是有泥土气息的暖色。深青色 CTA 按钮形成冷暖对比，大圆角按钮配合暖色阴影营造"舒适可靠"的下载体验。

**记忆点**：赤陶色 — 用户一看就知道"这不是同一个站"。

```
主色 Primary — 赤陶橙 (Terracotta)
├── 50:   #FFF7ED   ← Section 交替底色
├── 100:  #FFEDD5   ← 图标背景色
├── 200:  #FED7AA   ← 轻量边框
├── 400:  #FB923C   ← 次要强调、标签
├── 600:  #EA580C   ← 中间色
├── DEFAULT: #C2410C ← 主色（链接、标题、导航高亮、品牌色）
├── 800:  #9A3412   ← Hover 状态
└── 900:  #7C2D12   ← 极深强调

CTA — 深青 (Deep Teal)
├── DEFAULT: #115E59  ← 按钮背景（深青色 × 白字，对比度 7.8:1 ✓✓）
└── Hover:   #0F4E49  ← 按钮悬停

背景 & 文字 — Stone 暖灰阶
├── Background:     #FFFBF5  ← 暖奶白（不是纯白！有纸张/唱片封套的温度）
├── Alt Background: #FFF7ED  ← Orange-50（暖桃色）
├── Text:           #292524  ← Stone-800（暖黑，不刺眼）
├── Text Muted:     #78716C  ← Stone-500
├── Border:         #E7E5E4  ← Stone-200（暖灰边框）
└── Border Accent:  #FED7AA  ← Orange-200（品牌色边框）

Footer
├── Background:  #1C1917  ← Stone-900（暖黑色，像音箱木纹的深色）
├── Heading:     #FFFFFF
├── Text:        rgba(255, 255, 255, 0.65)
└── Link Hover:  #FB923C  ← Orange-400（悬停亮色）

Hero 区域
└── Background: linear-gradient(135deg, #FFF7ED 0%, #FFFBF5 100%)
```

**字体**
```
标题: Outfit (500, 600, 700)
  — 几何感无衬线，字重变化丰富，现代但有记忆度
  — 比 Poppins 更硬朗、比 Montserrat 更干净
  — 参考："Startup Bold" 字体方案 (ui-ux-pro-max 数据库)

正文: DM Sans (400, 500, 600)
  — 精致、可读性极高、字形有细节但不喧宾夺主
  — 属于 design-engineer 推荐字体清单

Google Fonts:
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
```

**组件样式**
```
按钮:
  border-radius: 20px（大圆角，接近胶囊但不完全）
  主按钮: bg #115E59, 白字, hover #0F4E49
  次按钮: border #C2410C, 文字 #C2410C, hover bg #FFF7ED

卡片:
  background: #FFFBF5
  border: none
  box-shadow: 0 2px 8px rgba(194, 65, 12, 0.08)（暖色阴影！不是灰色阴影）
  hover: box-shadow: 0 4px 16px rgba(194, 65, 12, 0.15)
  border-radius: 12px

输入框:
  background: #FFFFFF
  border: 2px solid #E7E5E4
  focus border: 2px solid #C2410C
  border-radius: 12px
  focus ring: 0 0 0 3px rgba(194, 65, 12, 0.15)

Feature Card Icon 背景: #FFEDD5 (Orange-100)
Review Card 作者名: #C2410C
```

---

#### y2script.com 完整设计方案 — "Editorial Precision"（编辑排版风）

**设计理念**：
灵感来自高端杂志的编辑排版 — The New Yorker、Monocle 那种"文字即设计"的美感。
深翡翠绿（Emerald）传递"精确、知识、可信赖"。用 Fraunces 衬线体做标题是整个站的核心记忆点——三个站里唯一用衬线体的，一眼就能识别出不同。琥珀棕 CTA 按钮像精装书的烫金封面，4px 直角按钮强化"精确/文档"属性。

**记忆点**：衬线标题 + 纸张质感 — 一打开就感觉"这是一个文字工具"。

```
主色 Primary — 深翡翠绿 (Deep Emerald)
├── 50:   #ECFDF5   ← Section 交替底色
├── 100:  #D1FAE5   ← 图标背景色
├── 200:  #A7F3D0   ← 轻量强调
├── 500:  #10B981   ← 次要强调、成功标签
├── DEFAULT: #047857 ← 主色（链接、标题、导航高亮、品牌色）
├── 800:  #065F46   ← Hover 状态
└── 900:  #064E3B   ← 深强调

CTA — 琥珀棕 (Amber)
├── DEFAULT: #B45309  ← 按钮背景（深琥珀 × 白字，对比度 5.2:1 ✓）
└── Hover:   #92400E  ← 按钮悬停（更深琥珀）

背景 & 文字 — Stone 暖灰阶（纸张质感）
├── Background:     #FAFAF9  ← Stone-50（微暖白，像优质纸张）
├── Alt Background: #ECFDF5  ← Emerald-50（极浅翠绿）
├── Text:           #1C1917  ← Stone-900（近黑色，高可读性）
├── Text Muted:     #78716C  ← Stone-500
├── Border:         #D6D3D1  ← Stone-300（比 y2mp4 稍深，编辑线条感）
└── Border Accent:  #A7F3D0  ← Emerald-200（品牌色边框）

Footer
├── Background:  #022C22  ← Emerald-950（极深墨绿，像精装书封面）
├── Heading:     #FFFFFF
├── Text:        rgba(255, 255, 255, 0.65)
└── Link Hover:  #10B981  ← Emerald-500

Hero 区域
└── Background: linear-gradient(135deg, #ECFDF5 0%, #FAFAF9 100%)
```

**字体**
```
标题: Fraunces (600, 700, 800)
  — Old Style 衬线体，有光学尺寸(optical sizing)特性
  — 字形独特：带有 "wonky" 不规则细节，辨识度极高
  — 属于 design-engineer 推荐字体清单
  — 这是三站中唯一的衬线体 → 最强差异化信号

正文: Plus Jakarta Sans (400, 500, 600)
  — 几何无衬线，笔画圆润但不幼稚
  — 和衬线标题形成经典"Serif heading + Sans body"编辑排版搭配
  — 属于 design-engineer 推荐字体清单

Google Fonts:
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
```

**组件样式**
```
按钮:
  border-radius: 4px（直角方正，精确感）
  主按钮: bg #B45309, 白字, hover #92400E
  次按钮: border #047857, 文字 #047857, hover bg #ECFDF5

卡片:
  background: #FAFAF9
  border: 1px solid #D6D3D1（编辑线条感，不是装饰性的彩色边框）
  box-shadow: none（干净利落）
  hover: border-color #047857
  border-radius: 8px（比按钮稍圆，但不过分）

输入框:
  background: #FFFFFF
  border: 2px solid #D6D3D1
  focus border: 2px solid #047857
  border-radius: 8px
  focus ring: 0 0 0 3px rgba(4, 120, 87, 0.15)

Feature Card Icon 背景: #D1FAE5 (Emerald-100)
Review Card 作者名: #047857
```

---

#### 设计方案对比 — 为什么这版好？

| 维度 | 上一版的问题 | 这一版的改进 |
|------|-------------|-------------|
| **字体** | Inter（AI-slop 黑名单字体）、Montserrat（太通用） | Outfit + DM Sans / Fraunces + Plus Jakarta Sans（全部来自 design-engineer 推荐清单） |
| **背景** | 纯白 #FFFFFF（空洞、无质感） | 暖奶白 #FFFBF5 / 纸白 #FAFAF9（有温度、有材质感） |
| **配色来源** | 从色板随机挑选（玫瑰红、青绿） | 从产品身份推导：音频→赤陶暖色；文字→翡翠绿+编辑感 |
| **灰阶** | 三站共用冷灰 Slate | MP3/字幕站用暖灰 Stone，与 y2mp4 冷灰形成底层差异 |
| **阴影** | 一刀切去掉 / 通用灰色阴影 | MP3 站用暖色阴影 rgba(194,65,12,0.08)，有品牌温度 |
| **CTA 对比度** | 部分 CTA 白字对比度不足 | 深青 #115E59（7.8:1）、琥珀 #B45309（5.2:1），全部 WCAG AA ✓ |
| **记忆点** | 没有明确的"一眼记住"元素 | 赤陶色（MP3）、衬线大标题（字幕）— 各有一个强记忆点 |

### 3.2 功能差异化

| 功能 | y2mp4.com | y2bmp3.com | y2script.com |
|------|-----------|------------|---------------|
| **首页** | 视频下载（MP4） | 音频下载（显示为 MP3） | 字幕/转录提取 |
| **导航栏工具** | MP4(首页) / MP3 / 字幕 | MP3(首页) / MP4 / 字幕 | 字幕(首页) / MP4 / MP3 |
| **格式列表默认排序** | 视频格式优先 | 音频格式优先 | 字幕语言列表优先 |
| **结果展示重点** | 分辨率 + 文件大小 | 音质（码率）+ 文件大小 | 语言列表 + 导出格式 |

### 3.3 SEO 差异化

| 维度 | 必须不同 |
|------|---------|
| Google Analytics ID | 三个不同的 GA-4 Property |
| Microsoft Clarity ID | 三个不同的 Project |
| 站点名称（siteName） | Y2mp4.com / Y2bmp3.com / Y2Script.com |
| 所有 SEO title/description | 完全不同的文案（运营负责） |
| og:image | 三套不同的社交分享图 |
| 站点互链 | **不互链**，或仅 nofollow |
| WHOIS | 域名隐私保护开启 |

---

## 四、基础设施方案

### 4.1 服务器架构（同一台 VPS）

```
                    ┌─── Cloudflare (y2mp4.com)    → IP: 104.21.x.x
用户 ───→ DNS ──────┼─── Cloudflare (y2bmp3.com)   → IP: 172.67.x.x
                    └─── Cloudflare (y2script.com) → IP: 104.21.y.y
                                    │
                                    ▼
                         VPS: 65.49.205.191
                                    │
                              ┌─────┴─────┐
                              │   Caddy    │
                              └─────┬─────┘
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            /yt/dist-y2mp4   /yt/dist-y2bmp3  /yt/dist-ytbscript
              (静态文件)        (静态文件)        (静态文件)
                    │               │               │
                    └───────┬───────┘───────────────┘
                            ▼
                    localhost:3000
                    (Express.js API)
                         │
                         ▼
                      yt-dlp
```

### 4.2 Cloudflare 配置（每个域名）

- DNS A 记录 → 65.49.205.191
- Proxy 状态：**已代理（橙色云朵）** ← 关键！隐藏真实 IP
- SSL 模式：Full (Strict)
- 各自申请 Origin Certificate

### 4.3 Caddy 配置

```caddyfile
# ============ MP4 站 ============
y2mp4.com {
    tls /etc/ssl/y2mp4.com/cert.pem /etc/ssl/y2mp4.com/key.pem
    handle_path /api/* {
        reverse_proxy localhost:3000
    }
    handle {
        root * /yt/dist-y2mp4
        file_server
        try_files {path} {path}/index.html
    }
}
www.y2mp4.com {
    tls /etc/ssl/y2mp4.com/cert.pem /etc/ssl/y2mp4.com/key.pem
    redir https://y2mp4.com{uri} permanent
}

# ============ MP3 站 ============
y2bmp3.com {
    tls /etc/ssl/y2bmp3.com/cert.pem /etc/ssl/y2bmp3.com/key.pem
    handle_path /api/* {
        reverse_proxy localhost:3000
    }
    handle {
        root * /yt/dist-y2bmp3
        file_server
        try_files {path} {path}/index.html
    }
}
www.y2bmp3.com {
    tls /etc/ssl/y2bmp3.com/cert.pem /etc/ssl/y2bmp3.com/key.pem
    redir https://y2bmp3.com{uri} permanent
}

# ============ 字幕站 ============
y2script.com {
    tls /etc/ssl/y2script.com/cert.pem /etc/ssl/y2script.com/key.pem
    handle_path /api/* {
        reverse_proxy localhost:3000
    }
    handle {
        root * /yt/dist-ytbscript
        file_server
        try_files {path} {path}/index.html
    }
}
www.y2script.com {
    tls /etc/ssl/y2script.com/cert.pem /etc/ssl/y2script.com/key.pem
    redir https://y2script.com{uri} permanent
}
```

### 4.4 后端 CORS 更新

```javascript
// server/server.js — 添加新域名
const allowedOrigins = [
    'https://y2mp4.com',
    'https://y2bmp3.com',
    'https://y2script.com',
    'http://localhost:3000',
    'http://localhost:3001'
];
```

---

## 五、详细 TODO 清单

> 标记说明：
> - 🤖 = Claude 可以直接完成
> - 👤 = 需要你（用户）手动操作
> - 👤🤖 = 需要你提供素材/信息，Claude 来执行代码修改
> - ✍️ = 运营/内容团队负责

---

### Phase 0：准备工作

| # | 任务 | 负责 | 说明 |
|---|------|------|------|
| 0.1 | 在 GitHub 创建 y2bmp3 仓库 | 👤 | 新建空仓库，或直接 fork y2mp4 |
| 0.2 | 在 GitHub 创建 ytbscript 仓库 | 👤 | 同上 |
| 0.3 | fork 当前代码到 y2bmp3 本地目录 | 🤖 | `cp -r yt-downloader yt-y2bmp3` + 设置新 remote |
| 0.4 | fork 当前代码到 ytbscript 本地目录 | 🤖 | `cp -r yt-downloader yt-ytbscript` + 设置新 remote |
| 0.5 | 注册 y2bmp3.com 的 Google Analytics Property | 👤 | 拿到新的 GA-4 Measurement ID |
| 0.6 | 注册 y2script.com 的 Google Analytics Property | 👤 | 拿到新的 GA-4 Measurement ID |
| 0.7 | 注册 y2bmp3.com 的 Microsoft Clarity Project | 👤 | 拿到新的 Clarity ID |
| 0.8 | 注册 y2script.com 的 Microsoft Clarity Project | 👤 | 拿到新的 Clarity ID |
| 0.9 | 确认两个新域名的 WHOIS 隐私保护已开启 | 👤 | 在域名注册商后台检查 |

---

### Phase 1：y2bmp3.com（MP3 站）前端改造

#### 1.1 基础配置修改

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 1.1.1 | 修改 `nuxt.config.ts` | 🤖 | 将 Vite proxy target 从 `y2mp4.com` 改为 `y2bmp3.com` |
| 1.1.2 | 修改 `composables/usePageSeo.ts` | 🤖 | 将所有 `y2mp4.com` 替换为 `y2bmp3.com` |
| 1.1.3 | 修改 `app.vue` — GA ID | 👤🤖 | 你提供新 GA ID，我替换代码中的 `G-90XNEYE25X` |
| 1.1.4 | 修改 `app.vue` — Clarity ID | 👤🤖 | 你提供新 Clarity ID，我替换代码中的 `t51z5mynwr` |
| 1.1.5 | 修改 `app.vue` — 字体引入 | 🤖 | 将 Google Fonts 从 Poppins+Open Sans 改为 Inter+Roboto |
| 1.1.6 | 修改 `public/robots.txt` | 🤖 | sitemap URL 指向 y2bmp3.com |
| 1.1.7 | 修改 `public/sitemap.xml` | 🤖 | 所有 URL 域名替换 |

#### 1.2 首页功能调整

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 1.2.1 | 修改 `sites.ts` | 🤖 | 调整工具顺序，MP3 为首页默认；导航栏 header 显示 MP4 和字幕 |
| 1.2.2 | 修改 `pages/index.vue` | 🤖 | 首页渲染音频下载功能（而非视频下载） |
| 1.2.3 | 修改 `MainContent.vue` | 🤖 | 格式列表默认排序：音频格式优先展示 |
| 1.2.4 | 调整格式筛选逻辑 | 🤖 | 音频格式（M4A/WebM audio）排最前面，视频格式放下方 |

#### 1.3 视觉差异化

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 1.3.1 | 全局配色替换 | 🤖 | 主色→#C2410C（赤陶），CTA→#115E59（深青），灰阶→Stone 暖灰，全组件更新 |
| 1.3.2 | 背景色替换 | 🤖 | 纯白→#FFFBF5（暖奶白），Alt BG→#FFF7ED，Hero 渐变 #FFF7ED→#FFFBF5 |
| 1.3.3 | 按钮样式修改 | 🤖 | 圆角从 8px 改为 20px（大圆角风格） |
| 1.3.4 | 卡片样式修改 | 🤖 | 去掉边框，改用暖色阴影 rgba(194,65,12,0.08)，底色 #FFFBF5 |
| 1.3.5 | Header 组件样式 | 🤖 | 赤陶配色 + logo 位置调整 |
| 1.3.6 | Footer 组件样式 | 🤖 | 底色→#1C1917（Stone-900 暖黑）+ 品牌名 Y2bmp3.com |
| 1.3.7 | Hero 区域布局 | 🤖 | 从居中对齐改为左对齐风格 |
| 1.3.8 | 首页 Section 顺序调整 | 🤖 | 改为 Hero→Features→Benefits→Reviews→FAQ |
| 1.3.9 | 字体替换 | 🤖 | Poppins→Outfit（标题），Open Sans→DM Sans（正文） |
| 1.3.10 | `design-spec.jsonc` 更新 | 🤖 | 记录 "Warm Analog" 完整设计规范 |

#### 1.4 图片资源替换

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 1.4.1 | 设计新 logo | 👤 | 提供 logo.png（MP3 站品牌 logo） |
| 1.4.2 | 设计新 favicon | 👤 | 提供 favicon.ico + favicon.png |
| 1.4.3 | 替换 Hero icon | 👤 | 提供 yt_icon.png 替代图（音乐/音频主题） |
| 1.4.4 | 替换 feature 图片 ×6 | 👤 | 提供 yt_feature1~6.png 替代图 |
| 1.4.5 | 替换 benefits 图片 ×4 | 👤 | 提供 yt_benefits1~4.png 替代图 |
| 1.4.6 | 替换 convert_deps 图片 ×3 | 👤 | 提供 yt_convert_deps1~3.png 替代图 |
| 1.4.7 | 替换 tips 相关图片 | 👤 | 提供替代图（可上传至 Cloudflare R2） |
| 1.4.8 | 将图片文件放入仓库 | 🤖 | 你提供图片后，我替换 public/images/ 下的文件 |

#### 1.5 文案（i18n）

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 1.5.1 | 重写 en.json 所有文案 | ✍️ | 所有 SEO 标题/描述、Benefits、FAQ、Reviews 全部围绕 MP3 主题 |
| 1.5.2 | 重写其余 18 种语言 JSON | ✍️ | 基于新英文文案翻译 |
| 1.5.3 | 更新 siteName | 🤖 | 所有语言文件的 siteName 改为 "Y2bmp3.com" |
| 1.5.4 | SEO 关键词调整 | ✍️ | 主攻 "youtube to mp3" 相关长尾词 |

#### 1.6 CI/CD 修改

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 1.6.1 | 修改 GitHub Actions workflow | 🤖 | 部署目标从 `/yt/dist` 改为 `/yt/dist-y2bmp3` |
| 1.6.2 | 更新 workflow 中的仓库引用 | 🤖 | 指向新的 y2bmp3 仓库 |
| 1.6.3 | 配置 GitHub Secrets | 👤 | 新仓库需要配置 VPS SSH 密钥等 Secrets |

---

### Phase 2：y2script.com（字幕站）前端改造

> 与 Phase 1 结构相同，以下只列出差异点

#### 2.1 基础配置修改

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 2.1.1 | 修改 `nuxt.config.ts` | 🤖 | proxy target → `y2script.com` |
| 2.1.2 | 修改 `usePageSeo.ts` | 🤖 | 域名替换为 `y2script.com` |
| 2.1.3 | 修改 `app.vue` — GA/Clarity | 👤🤖 | 你提供 ID，我替换 |
| 2.1.4 | 修改 `app.vue` — 字体 | 🤖 | 改为 Nunito + Lato |
| 2.1.5 | 修改 robots.txt / sitemap.xml | 🤖 | 域名替换 |

#### 2.2 首页功能调整

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 2.2.1 | 修改 `sites.ts` | 🤖 | 字幕生成为首页默认 |
| 2.2.2 | 修改 `pages/index.vue` | 🤖 | 首页渲染 Transcription 组件 |
| 2.2.3 | 修改 `MainContent.vue` | 🤖 | 默认展示字幕语言列表而非格式列表 |

#### 2.3 视觉差异化

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 2.3.1 | 全局配色 | 🤖 | 主色→#047857（深翡翠），CTA→#B45309（琥珀棕），灰阶→Stone 暖灰，全组件更新 |
| 2.3.2 | 背景色替换 | 🤖 | 纯白→#FAFAF9（纸白），Alt BG→#ECFDF5，Hero 渐变 #ECFDF5→#FAFAF9 |
| 2.3.3 | 按钮风格 | 🤖 | 圆角 4px（直角方正，精确编辑感） |
| 2.3.4 | 卡片风格 | 🤖 | 细边框 1px solid #D6D3D1（Stone-300），无阴影，hover border→#047857 |
| 2.3.5 | Hero 布局 | 🤖 | 左文右图双栏布局 |
| 2.3.6 | Section 顺序 | 🤖 | Hero→Benefits→Features→FAQ→Reviews |
| 2.3.7 | Footer 样式 | 🤖 | 底色→#022C22（Emerald-950 墨绿）+ 品牌名 Y2Script.com |
| 2.3.8 | 字体替换 | 🤖 | Poppins→Fraunces 衬线体（标题），Open Sans→Plus Jakarta Sans（正文） |
| 2.3.9 | `design-spec.jsonc` 更新 | 🤖 | 记录 "Editorial Precision" 完整设计规范 |

#### 2.4 图片 / 文案 / CI/CD

与 Phase 1 相同流程，分别由 👤（图片）、✍️（文案）、🤖+👤（CI/CD）负责。

---

### Phase 3：基础设施部署

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 3.1 | Cloudflare 添加 y2bmp3.com | 👤 | 添加站点 → 设置 DNS A 记录 → 开启 Proxy（橙色云朵） |
| 3.2 | Cloudflare 添加 y2script.com | 👤 | 同上 |
| 3.3 | Cloudflare 申请 Origin Certificate（y2bmp3） | 👤 | SSL/TLS → Origin Server → Create Certificate |
| 3.4 | Cloudflare 申请 Origin Certificate（ytbscript） | 👤 | 同上 |
| 3.5 | VPS 上传 SSL 证书 | 👤 | 将证书文件放到 `/etc/ssl/y2bmp3.com/` 和 `/etc/ssl/y2script.com/` |
| 3.6 | VPS 创建部署目录 | 🤖 | `mkdir -p /yt/dist-y2bmp3 /yt/dist-ytbscript` （需 SSH 访问） |
| 3.7 | 更新 Caddy 配置 | 👤🤖 | 我提供配置内容（见上文 4.3），你 SSH 到 VPS 写入 Caddyfile |
| 3.8 | 重启 Caddy | 👤 | `systemctl reload caddy` |
| 3.9 | 更新后端 CORS | 👤🤖 | 我提供代码改动，你 SSH 到 VPS 更新 server.js 并重启 |
| 3.10 | 验证 Cloudflare Proxy 生效 | 👤 | `dig y2bmp3.com` 确认解析到 Cloudflare IP（非 VPS 真实 IP） |
| 3.11 | Google Search Console 注册新站 | 👤 | 为 y2bmp3.com 和 y2script.com 各注册一个 Property |
| 3.12 | 提交 sitemap 到 Search Console | 👤 | 每个站提交各自的 sitemap.xml |

---

### Phase 4：y2mp4.com 现有站优化

| # | 任务 | 负责 | 详细操作 |
|---|------|------|---------|
| 4.1 | 确认 Cloudflare Proxy 已开启 | 👤 | 检查橙色云朵状态 |
| 4.2 | 确认 WHOIS 隐私保护 | 👤 | 三个域名都要检查 |
| 4.3 | Caddy 静态文件目录迁移 | 👤🤖 | 从 `/yt/dist` 迁移到 `/yt/dist-y2mp4`（统一命名规范） |
| 4.4 | 更新 GitHub Actions | 🤖 | 部署路径更新为 `/yt/dist-y2mp4` |

---

## 六、执行顺序与时间预估

```
Week 1: Phase 0（准备） + Phase 4（现有站优化）
├── Day 1-2: 创建仓库、注册分析工具、域名设置
└── Day 3:   现有站部署路径迁移

Week 2-3: Phase 1（MP3 站前端改造）
├── Day 1:   基础配置 + 功能调整（Claude 完成 1.1 + 1.2）
├── Day 2-3: 视觉差异化（Claude 完成 1.3）
├── Day 4-7: 等待图片素材（你/设计）+ 文案（运营）
└── Day 8:   图片文案集成 + CI/CD（Claude + 你）

Week 3-4: Phase 2（字幕站前端改造）
├── 同 Phase 1 流程
└── 可与 Phase 1 后半段并行

Week 4-5: Phase 3（基础设施部署）
├── Day 1: Cloudflare + SSL 配置（你操作）
├── Day 2: VPS Caddy + CORS 配置（协作）
└── Day 3: 验证 + Search Console 提交（你操作）
```

---

## 七、风险与注意事项

### 7.1 SEO 风险

| 风险 | 等级 | 防范措施 |
|------|------|---------|
| 三站被识别为站群 | ⚠️ 中 | Cloudflare Proxy + 差异化 + 不互链 + 不同 GA ID |
| 内容重复被降权 | 🔴 高 | 文案必须完全重写，不能复制粘贴 |
| 新站 sandbox 期 | ⚠️ 中 | 正常现象，新域名通常 1-3 个月进入索引 |

### 7.2 技术风险

| 风险 | 等级 | 防范措施 |
|------|------|---------|
| 三站共用后端宕机影响全部 | ⚠️ 中 | 后期考虑 PM2 cluster 模式或 Docker 化 |
| yt-dlp 被 YouTube 限制 | ⚠️ 中 | 定期更新 yt-dlp + cookies.txt |
| VPS 带宽/CPU 不够 | ⚠️ 低 | 当前架构用户直接从 YouTube 下载，VPS 只做解析，负载很低 |

### 7.3 维护风险

| 风险 | 等级 | 防范措施 |
|------|------|---------|
| 三仓库代码漂移 | ⚠️ 中 | 核心 bug 修复时记得三个仓库都同步 |
| 依赖版本不一致 | ⚠️ 低 | 定期统一升级 Nuxt/Vue 版本 |

---

## 八、Claude 能做 vs 你需要做的——总览

### 🤖 Claude 能直接完成的（给我代码仓库访问即可）

1. Fork 代码到新目录
2. 所有代码文件中的域名替换
3. 配色方案全局替换（所有组件的 CSS）
4. 字体替换
5. 布局结构调整（Hero 区域、Section 顺序）
6. 按钮/卡片风格修改
7. sites.ts 首页工具逻辑调整
8. 格式列表排序逻辑修改
9. siteName 品牌名替换
10. robots.txt / sitemap.xml 更新
11. GitHub Actions workflow 修改
12. design-spec.jsonc 更新
13. CORS 白名单代码改动（提供给你去 VPS 上更新）
14. Caddy 配置文件内容（提供给你去 VPS 上更新）

### 👤 你需要亲自操作的

1. GitHub 创建新仓库（×2）
2. Google Analytics 注册新 Property（×2）
3. Microsoft Clarity 注册新 Project（×2）
4. Cloudflare 添加新域名（×2）
5. Cloudflare 申请 Origin Certificate（×2）
6. VPS SSH 操作：上传证书、更新 Caddyfile、更新 server.js、重启服务
7. Google Search Console 注册 + 提交 sitemap（×2）
8. 域名 WHOIS 隐私保护确认
9. 提供三套图片素材（logo + favicon + 配图共 18+ 张 × 2 站 = 36+ 张图）
10. 提供新的 GA ID 和 Clarity ID 给我写入代码

### ✍️ 运营/内容团队负责的

1. 重写 y2bmp3.com 全部文案（19 种语言 × 1 套内容）
2. 重写 y2script.com 全部文案（19 种语言 × 1 套内容）
3. SEO 关键词策略规划
4. 上线后的外链建设

---

## 九、快速启动检查单

开始执行前，请确认以下准备就绪：

- [ ] GitHub 新仓库已创建（y2bmp3, ytbscript）
- [ ] 新域名 DNS 已转入 Cloudflare
- [ ] Cloudflare Proxy（橙色云朵）已开启
- [ ] 新的 GA-4 ID（×2）已获取
- [ ] 新的 Clarity ID（×2）已获取
- [ ] 图片素材至少有一套准备好（可以先用占位图）
- [ ] VPS SSH 访问正常

以上全部就绪后，通知我，我立即从 Phase 1 开始执行代码改造。
