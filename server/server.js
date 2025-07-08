const express = require('express');
const ytdl = require('ytdl-core');

const { exec ,spawn } = require('child_process');

const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

//const ytDlpPath = '/opt/homebrew/Caskroom/miniconda/base/bin'
//const ytDlpPath = '/usr/bin';
const ytDlpPath = 'C:/Users/Administrator/AppData/Local/Programs/Python/Python313/Scripts/';

app.use(cors());

// app.get('/get-formats', async (req, res) => {
//   const videoUrl = req.query.url;

//   if (!videoUrl || !ytdl.validateURL(videoUrl)) {
//     return res.status(400).json({ error: '无效的 YouTube URL' });
//   }

//   try {
//     console.log("videoUrl========>"+videoUrl);
//     //ytdl(videoUrl).pipe(fs.createWriteStream('video.mp4'));
//     const baseInfo = await ytdl.getBasicInfo(videoUrl);
//     console.log("videoUrl1========>"+baseInfo);
//     const info = await ytdl.getInfo(videoUrl);
//     console.log("videoUrl2========>"+info);
//     const formats = ytdl.getFormats(info, { filter: 'audioandvideo' });

//     const formattedLinks = formats.map(format => ({
//       name: `${info.videoDetails.title} - ${format.container.toUpperCase()} (${format.qualityLabel})`,
//       size: format.height ? `${format.height}p` : 'Audio',
//       link: format.url,
//       fileSize: format.contentLength ? (format.contentLength / (1024 * 1024)).toFixed(2) + ' MB' : 'N/A'
//     }));

//     res.json(formattedLinks);
//   } catch (error) {
//     console.error('获取格式失败:', error);
//     res.status(500).json({ error: '获取视频格式失败，请检查视频 URL 或网络' });
//   }
// });

app.get('/get-formats2', async (req, res) => {
  const videoUrl = req.query.url;

  console.log("videoUrl yt-dlp========>" + videoUrl);

  if (!videoUrl) {
    return res.status(400).json({ error: '无效的 YouTube URL' });
  }

  // 获取视频标题
  exec(`yt-dlp -e ${videoUrl}`, {
    env: {
      ...process.env,
      PATH: `${process.env.PATH}:${ytDlpPath}`
    }
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`获取标题错误: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    // 获取视频标题
    const videoTitle = stdout.trim();  // 视频标题

    console.log(`视频标题: ${videoTitle}`);

    // 使用 yt-dlp 获取视频信息
    exec(`yt-dlp -F ${videoUrl}`, {
      env: {
        ...process.env, // 保留原有环境变量
        PATH: `${process.env.PATH}:${ytDlpPath}` // 将 yt-dlp 的路径加入 PATH
      }
    }, (error, stdout, stderr) => {

      if (error) {
        console.error(`error: ${error}`);
        return res.status(500).json({ error: 'Get resource format error!' });
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: 'Get resource format error!' });
      }

      console.log("YT-DLP 输出：", stdout);
      // 解析 yt-dlp 输出的格式
      const formats = parseYtdlpFormats(stdout);
      // 过滤视频和音频格式，视频排在前面
      const videoFormats = formats.filter(format => format.ext !== 'audio'); // 过滤视频
      const audioFormats = formats.filter(format => format.ext === 'audio'); // 过滤音频
      // 将视频格式排在前面
      const result = [...videoFormats, ...audioFormats];
      // 返回最终结果
      console.log('返回的格式列表:', result);
      res.json(result);
    });

  });
});


app.get('/get-formats33', async (req, res) => {
  const videoUrl = req.query.url;

  console.log("videoUrl yt-dlp========>" + videoUrl);

  if (!videoUrl) {
    return res.status(400).json({ error: '无效的 YouTube URL' });
  }

  // 使用 yt-dlp 获取视频信息
  exec(`yt-dlp --cookies ${cookiesPath} -j ${videoUrl}`, {
    env: {
      ...process.env, // 保留原有环境变量
      PATH: `${process.env.PATH}:${ytDlpPath}` // 将 yt-dlp 的路径加入 PATH
    }
  }, (error, stdout, stderr) => {

    if (error) {
      console.error(`error: ${error}`);
      return res.status(500).json({ error: 'Get resource format error!' });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: 'Get resource format error!' });
    }

    // 解析 JSON 格式的输出
    const videoInfo = JSON.parse(stdout);
    const data = JSON.parse(stdout);

    // 提取需要的信息
    const videoTitle = data.title;
    const thumbnailUrl = data.thumbnail;
    const videoId = data.id;

    const allowedFormats = ['mp4', 'webm', 'm4a'];

    const formats = data.formats
      .filter(format =>
        allowedFormats.includes(format.ext) && format.protocol !== 'm3u8_native' // 过滤 m3u8 流
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

    // 过滤视频和音频
    const videoFormats = formats.filter(format => format.vcodec);
    const audioFormats = formats.filter(format => format.acodec && !format.vcodec);

    // 构造返回 JSON
    const result = {
      id: videoId,
      title: videoTitle,
      thumbnail: thumbnailUrl,
      formats: [...videoFormats, ...audioFormats] // 视频优先，音频在后
    };

    //console.log('返回的格式列表:', result);
    res.json(result);
  });
});

// 指定 cookies.txt 的路径 (放在当前目录)
const cookiesPath = './cookies.txt';

app.get('/get-formats', async (req, res) => {
  const videoUrl = req.query.url;

  console.log("videoUrl spawn yt-dlp========>", videoUrl);

  if (!videoUrl) {
    return res.status(400).json({ error: '无效的 YouTube URL' });
  }

  // 执行 yt-dlp，并指定 cookies 文件
  const ytDlpProcess = spawn('yt-dlp', ['-j',videoUrl], {
    env: {
      ...process.env, // 保留原有环境变量
      PATH: `${process.env.PATH}:${ytDlpPath}` // 将 yt-dlp 的路径加入 PATH
    }
  });

  let output = '';
  let errorOutput = '';

  // 监听标准输出
  ytDlpProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  // 监听标准错误输出
  ytDlpProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  // 监听进程结束
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
          allowedFormats.includes(format.ext) && format.protocol !== 'm3u8_native' // 过滤 m3u8 流
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
        subtitles: data.subtitles,
        output: data
      };

      res.json(result);
    } catch (err) {
      console.error('JSON 解析错误:', err);
      return res.status(500).json({ error: '解析 JSON 失败', details: err.message });
    }
  });

  // 监听错误
  ytDlpProcess.on('error', (err) => {
    console.error('yt-dlp 执行错误:', err);
    return res.status(500).json({ error: 'yt-dlp 进程启动失败', details: err.message });
  });
});

// 解析 yt-dlp 输出的格式数据
function parseYtdlpFormats(output) {
  const lines = output.split('\n');
  const formats = [];

  // 逐行解析格式
  lines.forEach(line => {
    // 跳过格式标题行
    if (line.startsWith('ID')) return;

    const parts = line.trim().split(/\s+/);
    if (parts.length < 9) return; // 跳过无效的行

    const format = {
      id: parts[0],  // 格式 ID
      ext: parts[1],  // 文件扩展名
      resolution: parts[2],  // 分辨率
      fps: parts[3],  // 帧率
      codec: parts[6],  // 编解码器
      url: parts[parts.length - 1],  // 下载链接
      size: parts[4]  // 文件大小
    };

    formats.push(format);
  });

  return formats;
}

app.listen(port, '0.0.0.0',() => {
  console.log(`服务器运行在 http://0.0.0.0:${port}`);
});