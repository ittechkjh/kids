# -*- coding: utf-8 -*-
import re
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

urls = re.findall(r'href=[\'"](https?://[^\'"]+)[\'"]', text)
print(f"Total href urls in index.html: {len(urls)}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for u in set(urls):
    if any(k in u for k in ['cdnjs', 'fontawesome', 'cdn', 'tailwindcss', 'fonts', 'unpkg']):
        continue
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
            content = resp.read(4096).decode('utf-8', errors='ignore')
            has_err = any(p in content for p in ['찾을수가 없습니다', '유효하지 않은 요청'])
            print(f"{resp.status} (err={has_err}): {u}")
    except Exception as e:
        print(f"FAIL: {u} -> {e}")
