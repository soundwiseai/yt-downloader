# VPS 后端服务文档

## 服务器环境

| 项目 | 详情 |
|------|------|
| **VPS 提供商** | 搬瓦工 (BandwagonHOST) |
| **IP 地址** | `65.49.205.191` |
| **操作系统** | Debian 12 (6.1.0-9-amd64) |
| **Node.js** | v18.19.0 |
| **yt-dlp** | 2025.09.23 |
| **Web 服务器** | Caddy (反向代理 + 静态文件) |
| **域名** | `y2mp4.com` (Cloudflare 托管 DNS + SSL) |

## 目录结构

```
/yt/
├── dist/                  # 前端静态文件（由 GitHub Actions 部署）
├── server/
│   ├── server.js          # 主后端服务（当前运行）
│   ├── server_0728.js     # 历史备份版本
│   ├── package.json       # Node.js 依赖
│   ├── node_modules/      # 依赖包
│   ├── cookies.txt        # yt-dlp cookies 文件
│   ├── out.json           # 运行时数据
│   └── yarn.lock
```

## Caddy 配置

```caddyfile
www.y2mp4.com {
    tls /etc/ssl/y2mp4.com/cert.pem /etc/ssl/y2mp4.com/key.pem
    redir https://y2mp4.com{uri} permanent
}

y2mp4.com {
    tls /etc/ssl/y2mp4.com/cert.pem /etc/ssl/y2mp4.com/key.pem

    # /api/* 请求反向代理到 Node.js 后端
    handle_path /api/* {
        reverse_proxy http://localhost:3000
    }

    # 其他请求作为静态文件服务
    handle {
        root * /yt/dist
        file_server
        try_files {path} {path}/index.html
    }

    log {
        output file /var/log/caddy/access.log
        level info
    }
}
```

**流量路径**: 用户 → Cloudflare CDN (SSL) → VPS Caddy (Origin Certificate) → 静态文件 / Node.js API

## 后端依赖

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.2",
    "ytdl-core": "^4.11.5"
  }
}
```

> 注：`ytdl-core` 在当前代码中已不再使用（被注释掉），实际使用 `yt-dlp` CLI 工具。

## API 接口

### `GET /api/get-formats`

核心接口，获取 YouTube 视频的格式信息、字幕等。

**请求参数**:

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `url` | string | 是 | YouTube 视频 URL |

**实现逻辑**:

1. 接收前端传入的 YouTube URL
2. 通过 `spawn` 调用 `yt-dlp -j <url>` 获取视频 JSON 信息
3. 解析返回数据，提取：
   - 视频标题 (`title`)
   - 缩略图 (`thumbnail`)
   - 视频 ID (`id`)
   - 可用格式 (`formats`) - 过滤 mp4/webm/m4a，排除 m3u8 流
   - 字幕 (`subtitles`) - 合并自动生成字幕和手动字幕
4. 返回结构化 JSON

**返回示例**:

```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Video Title",
  "thumbnail": "https://i.ytimg.com/vi/xxx/maxresdefault.jpg",
  "formats": [
    {
      "format_id": "22",
      "ext": "mp4",
      "resolution": "1280x720",
      "fps": 30,
      "vcodec": "avc1.64001F",
      "acodec": "mp4a.40.2",
      "url": "https://...",
      "filesize": 12345678
    }
  ],
  "subtitles": {
    "en": [{ "ext": "srt", "url": "..." }],
    "zh-Hans": [{ "ext": "srt", "url": "..." }]
  }
}
```

**CORS 策略**:

当前硬编码了允许的来源列表：
```javascript
const allowedOrigins = ['https://yt.4ris.xyz', 'http://localhost:3000', 'http://localhost:3001'];
```

> ⚠️ **注意**: 当前 CORS 白名单中没有包含 `y2mp4.com`，但因为 Caddy 反向代理是同源请求，前端使用相对路径 `/api/get-formats` 不会触发 CORS 检查，所以不影响使用。

### `GET /api/get-formats2` (废弃)

旧版接口，使用 `exec` + `yt-dlp -F` 获取格式列表，返回的是文本解析结果。已被 `/get-formats` 替代。

### `GET /api/get-formats33` (废弃)

中间版本接口，使用 `exec` + `yt-dlp --cookies ... -j`。已被 `/get-formats` 替代。

## server.js 完整源码

```javascript
const express = require('express');
const ytdl = require('ytdl-core');

const { exec, spawn } = require('child_process');

const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

const ytDlpPath = 'C:/Users/Administrator/AppData/Local/Programs/Python/Python313/Scripts/';

app.use(cors());

// 指定 cookies.txt 的路径 (放在当前目录)
const cookiesPath = './cookies.txt';

app.get('/get-formats', async (req, res) => {
  // CORS 设置
  const allowedOrigins = ['https://yt.4ris.xyz', 'http://localhost:3000', 'http://localhost:3001'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    return res.status(403).json({ error: '禁止访问：不允许的来源' });
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  const videoUrl = req.query.url;

  console.log("videoUrl spawn yt-dlp========>", videoUrl);

  if (!videoUrl) {
    return res.status(400).json({ error: '无效的 YouTube URL' });
  }

  // 执行 yt-dlp 获取视频 JSON 信息
  const ytDlpProcess = spawn('yt-dlp', ['-j', videoUrl], {
    env: {
      ...process.env,
      PATH: `${process.env.PATH}:${ytDlpPath}`
    }
  });

  let output = '';
  let errorOutput = '';

  ytDlpProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  ytDlpProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  ytDlpProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`yt-dlp 进程错误，退出码: ${code}`);
      console.error(`stderr: ${errorOutput}`);
      return res.status(500).json({ error: 'Get resource format error!', details: errorOutput });
    }

    try {
      const data = JSON.parse(output);

      const videoTitle = data.title;
      const thumbnailUrl = data.thumbnail;
      const videoId = data.id;

      const allowedFormats = ['mp4', 'webm', 'm4a'];

      const formats = data.formats
        .filter(format =>
          allowedFormats.includes(format.ext)
          && format.protocol !== 'm3u8_native'
          && format.acodec !== 'none'
        )
        .map(format => ({
          format_id: format.format_id,
          ext: format.ext,
          resolution: format.height ? `${format.width}x${format.height}` : 'Audio Only',
          fps: format.fps || null,
          vcodec: format.vcodec !== 'none' ? format.vcodec : null,
          acodec: format.acodec !== 'none' ? format.acodec : null,
          url: format.url,
          filesize: format.filesize || null
        }));

      const videoFormats = formats.filter(format => format.vcodec);
      const audioFormats = formats.filter(format => format.acodec && !format.vcodec);

      const result = {
        id: videoId,
        title: videoTitle,
        thumbnail: thumbnailUrl,
        formats: [...videoFormats, ...audioFormats],
        subtitles: { ...data.automatic_captions, ...data.subtitles },
        output: data
      };

      res.json(result);
    } catch (err) {
      console.error('JSON 解析错误:', err);
      return res.status(500).json({ error: '解析 JSON 失败', details: err.message });
    }
  });

  ytDlpProcess.on('error', (err) => {
    console.error('yt-dlp 执行错误:', err);
    return res.status(500).json({ error: 'yt-dlp 进程启动失败', details: err.message });
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`服务器运行在 http://0.0.0.0:${port}`);
});
```

> 注：上面的源码省略了已废弃的 `/get-formats2` 和 `/get-formats33` 接口代码，完整版本见 VPS `/yt/server/server.js`。

## 部署流程

### 前端部署（自动）

1. 代码推送到 GitHub `main` 分支
2. 手动触发 GitHub Actions `手动打包项目` workflow
3. Actions 执行 `yarn generate` 生成静态文件
4. 通过 SCP 上传 zip 包到 VPS `/yt/`
5. SSH 解压并替换 `/yt/dist` 目录

### 后端部署（手动）

后端 `server.js` 目前需要手动 SSH 到 VPS 修改，不在 GitHub CI/CD 流程中。

```bash
ssh root@65.49.205.191
# 编辑代码
vi /yt/server/server.js
# 重启服务（如果用 systemd 管理）
# 或直接 kill 并重启 node 进程
```

## SSL 证书

| 项目 | 详情 |
|------|------|
| **证书类型** | Cloudflare Origin Certificate |
| **有效期** | 15 年（2026-2041） |
| **证书路径** | `/etc/ssl/y2mp4.com/cert.pem` |
| **私钥路径** | `/etc/ssl/y2mp4.com/key.pem` |
| **覆盖域名** | `*.y2mp4.com` + `y2mp4.com` |
