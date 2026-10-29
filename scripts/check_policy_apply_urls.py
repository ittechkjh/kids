# -*- coding: utf-8 -*-
import re
import urllib.request
import urllib.error
import ssl
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('js/policies_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

apply_urls = re.findall(r"applyUrl:\s*['\"]([^'\"]+)['\"]", text)
print(f"Total applyUrls in policies_data.js: {len(apply_urls)}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for u in sorted(set(apply_urls)):
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
            content = resp.read(4096).decode('utf-8', errors='ignore')
            has_err = any(p in content for p in ['찾을수가 없습니다', '유효하지 않은 요청'])
            print(f"{resp.status} (err={has_err}): {u}")
    except Exception as e:
        print(f"FAIL: {u} -> {e}")
