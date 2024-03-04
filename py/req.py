import requests
from bs4 import BeautifulSoup

url = "https://klpbbs.com/forum.php?mod=guide&view=hot&mobile=2"

# 发送GET请求
response = requests.get(url)

# 检查请求是否成功
if response.status_code == 200:
    # 解析页面内容
    soup = BeautifulSoup(response.text, "html.parser")

    # 在这里根据你的需求提取页面信息，这里只是简单地将整个HTML保存到文件
    with open("index.html", "w", encoding="utf-8") as file:
        file.write(str(soup))
else:
    print(f"Failed to fetch the page. Status code: {response.status_code}")
