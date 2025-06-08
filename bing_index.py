import requests
import json
import xml.etree.ElementTree as ET

# 替换为你的信息
HOST = "youtubetomp4.pro"  # 你的主域名
KEY = "7878c216bd9c42e4bb6736efc77a86b4"  # 你的IndexNow key
KEY_LOCATION = "https://youtubetomp4.pro/7878c216bd9c42e4bb6736efc77a86b4.txt"  # key文件的URL

# 读取 sitemap.xml 并提取所有 <loc> 链接
sitemap_path = "public/sitemap.xml"  # 如你的 sitemap 路径不同请修改
url_list = []
try:
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    for url in root.findall('sm:url', ns):
        loc = url.find('sm:loc', ns)
        if loc is not None and loc.text:
            url_list.append(loc.text.strip())
except Exception as e:
    print("读取 sitemap.xml 失败:", e)
    exit(1)

if not url_list:
    print("未在 sitemap.xml 中找到任何链接，终止提交。")
    exit(1)

# 组装 IndexNow 请求体
payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": url_list
}

headers = {
    'Content-Type': 'application/json; charset=utf-8'
}

response = requests.post('https://www.bing.com/indexnow', headers=headers, data=json.dumps(payload))

print('Status Code:', response.status_code)
print('Response:', response.text)