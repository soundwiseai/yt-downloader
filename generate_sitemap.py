import os

# 修改为你的正式域名（如未定可先用占位符）
BASE_URL = 'https://youtubetomp4.pro'

# 支持的语言
SUPPORTED_LOCALES = ['en', 'es', 'ar', 'hi', 'pt', 'ko', 'ja', 'zh-TW', 'id', 'th', 'vi']

# 主要页面路径（不含 locale 前缀）
URLS = [
    '',  # 首页
    '/youtube-to-mp3',
    '/youtube-video-downloader'
]

def generate_sitemap(static_dir='public'):
    # 使用 UTC 时间
    from datetime import datetime, timezone
    lastmod = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:00:00+00:00')
    
    sitemap_urls = [
        f"""  <url>
    <loc>{BASE_URL}</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""",
        f"""  <url>
    <loc>{BASE_URL}/privacy-policy</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""",
        f"""  <url>
    <loc>{BASE_URL}/teamof-server</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""",
    ]
    for locale in SUPPORTED_LOCALES:
        for url in URLS:
            loc = f"{BASE_URL}/{locale}{url}"
            sitemap_urls.append(f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""")

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(sitemap_urls)}
</urlset>"""
    os.makedirs(static_dir, exist_ok=True)
    output_path = os.path.join(static_dir, 'sitemap.xml')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml)
    print('sitemap.xml 生成成功:', output_path)

if __name__ == '__main__':
    # 如果你的静态目录是 dist，请把 static_dir 改为 'dist'
    generate_sitemap(static_dir='public')
