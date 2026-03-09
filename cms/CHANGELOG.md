# CMS Changelog

## 2026-03-09

### 架构升级：CMS API 直连 + 动态路由

**核心改动：** 前端构建时直接从 CMS REST API 拉取数据，取代手动 `npm run export`。

#### CMS 端改动

- **公开读 API** — `PageContent`、`CommonContent`、`Tenants` 三个集合添加 `access: { read: () => true }`
  - 构建时无需认证即可读取内容数据
  - 写入/更新/删除仍需登录（默认行为不变）
- **PageContent 新增路由配置字段** — 支持从 CMS 管理站点路由：
  - `urlPath` — 页面 URL 路径（如 `/youtube-to-mp3`）
  - `template` — 渲染模板（`home` / `transcript`）
  - `i18nPrefix` — i18n 翻译键前缀
  - `seoPrefix` — SEO 配置前缀
  - `showInHeader` / `showInFooter` — 导航栏显示控制
- **export.ts 增强** — 除导出 i18n JSON 外，还能生成 `sites.ts` 和 `sitemap.xml`

#### 前端项目改动

- **构建预处理脚本** `scripts/fetch-cms.ts` — 构建时自动从 CMS API 拉数据
  - `prebuild` / `pregenerate` npm hook 自动触发
  - 支持 `SKIP_CMS=1` 优雅降级（CMS 不可用时用本地文件）
- **动态路由** `pages/[...slug].vue` — 替代硬编码的 7 个 Vue 页面文件
  - 根据 `sites.ts` 的 `template` 字段选择渲染 `<Home>` 或 `<Transcription>` 组件
  - 新增页面零代码改动，只需在 CMS 配置
- **sites.ts** — 新增 `template` 字段

#### 部署配置（必须）

1. **CMS 部署** — 推送 CMS 代码到 GitHub → Vercel 自动部署
   - 部署后验证：`curl https://cms.musely.io/api/page-content?limit=1` 应返回 JSON

2. **前端 Vercel 环境变量**（在各站点的 Vercel 项目 Settings → Environment Variables）：

   | 变量名 | 值 | 说明 |
   |:---|:---|:---|
   | `CMS_API_URL` | `https://cms.musely.io` | CMS API 地址 |
   | `TENANT_SLUG` | `y2mp4`（按站点改） | 多租户标识 |
   | `SITE_DOMAIN` | `https://y2mp4.com`（按站点改） | 用于 sitemap 生成 |

3. **CMS 内容配置**（在 CMS 后台 → 页面内容）：
   - 每个 pageKey 的任一语言记录中，展开「路由 & 站点配置」填写 `urlPath`、`template` 等
   - 不填则 `sites.ts` 保持手动维护的版本

4. **可选：Webhook 自动重建**
   - 在 Vercel 项目 Settings → Git → Deploy Hooks 创建 hook URL
   - 在 CMS 配置 `afterChange` hook 调用该 URL
   - 效果：CMS 改内容 → 自动触发前端重新构建

#### 新增页面流程（从此以后）

```
1. CMS 后台创建 PageContent → 填 pageKey + urlPath + template
2. 选「所有语言」→ 自动创建 19 个语言版本
3. 各语言填写 i18n JSON 内容
4. 前端构建（自动或手动触发）→ 新页面上线
5. 零代码改动
```

#### 多站点复用

```
新站点只需：
1. CMS 创建 tenant（如 site-b）
2. fork/复用前端代码
3. Vercel 设置 TENANT_SLUG=site-b, SITE_DOMAIN=https://site-b.com
4. 在 CMS 填内容 → 构建 → 上线
```
