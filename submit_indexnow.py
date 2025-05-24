import requests
import json

# 替换为你的信息
data = {
    "host": "www.example.org",  # 你的主域名
    "key": "7878c216bd9c42e4bb6736efc77a86b4",  # 你的IndexNow key
    "keyLocation": "https://www.example.org/7878c216bd9c42e4bb6736efc77a86b4.txt",  # key文件的URL
    "urlList": [
        "https://www.example.org/url1",
        "https://www.example.org/folder/url2",
        "https://www.example.org/url3"
    ]
}

headers = {
    'Content-Type': 'application/json; charset=utf-8'
}

response = requests.post('https://api.indexnow.org/IndexNow', headers=headers, data=json.dumps(data))

print('Status Code:', response.status_code)
print('Response:', response.text)
