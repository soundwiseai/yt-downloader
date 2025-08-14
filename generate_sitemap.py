import os
import json

# 修改为你的正式域名（如未定可先用占位符）
BASE_URL = 'https://youtubetomp4.pro'

# 支持的语言
SUPPORTED_LOCALES = ['en', 'es', 'es-419', 'ar', 'hi', 'pt', 'pt-br', 'ko', 'ja', 'zh-TW', 'zh-CN', 'ru', 'id', 'th', 'vi', 'tr', 'fr', 'it', 'de']

# 从 sites.ts 读取站点配置
def read_sites_config():
    try:
        # 读取 sites.ts 文件
        with open('sites.ts', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 提取数组部分
        start = content.find('[') 
        end = content.rfind(']') + 1
        if start == -1 or end == 0:
            print("Error: Could not find array in sites.ts")
            return []
            
        # 将 TypeScript 数组转换为可解析的 JSON
        array_content = content[start:end]
        # 将单引号替换为双引号，以符合 JSON 格式
        array_content = array_content.replace("'", '"')
        # 为对象的键添加引号 (name, i18n, seo, url, header, footer)
        import re
        array_content = re.sub(r'(\w+):', r'"\1":', array_content)
        # 修复布尔值
        array_content = array_content.replace('true', 'true').replace('false', 'false')
        # 删除尾随逗号
        array_content = re.sub(r',(\s*[}\]])', r'\1', array_content)
        
        # 解析为 Python 对象
        sites = json.loads(array_content)
        return [site['url'] for site in sites]
    except Exception as e:
        print(f"Error reading sites.ts: {e}")
        # 如果出错，返回默认值
        return [
            '',  # 首页
            '/youtube-to-mp3',
            '/youtube-video-downloader',
            '/youtube-transcript-generator'
        ]

# 主要页面路径（不含 locale 前缀）
URLS = read_sites_config()

def generate_sitemap(static_dir='public'):
    # 使用 UTC 时间
    from datetime import datetime, timezone
    lastmod = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:00:00+00:00')
    
    sitemap_urls = [
        f"""  <url>
    <loc>{BASE_URL}</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""",
    ]
    
    # Add English pages without /en prefix (except homepage which is already added)
    for url in URLS:
        if url:  # Skip empty string (homepage)
            loc = f"{BASE_URL}{url}"
            sitemap_urls.append(f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""")
    
    # Add other language pages with locale prefix
    for locale in SUPPORTED_LOCALES:
        # Skip /en URLs since they redirect to /
        if locale == 'en':
            continue
        
        # Add language root page (e.g., /zh-TW)
        sitemap_urls.append(f"""  <url>
    <loc>{BASE_URL}/{locale}</loc>
    <lastmod>{lastmod}</lastmod>
  </url>""")
        
        # Add language-specific sub-pages
        for url in URLS:
            if url:  # Skip empty string (homepage is already handled above)
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
