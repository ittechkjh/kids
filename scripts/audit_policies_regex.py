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

urls = re.findall(r"url:\s*['\"]([^'\"]+)['\"]", text)
print(f"Total urls in policies_data.js: {len(urls)}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

results = []
for u in set(urls):
    item = {'url': u, 'status': None, 'error': False, 'message': ''}
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
            item['status'] = resp.status
            content = resp.read(8192).decode('utf-8', errors='ignore')
            for phrase in ['찾을수가 없습니다', '유효하지 않은 요청입니다', '존재하지 않는', '페이지를 찾을 수 없습니다']:
                if phrase in content:
                    item['error'] = True
                    item['message'] = phrase
                    break
            if not item['error']:
                item['message'] = 'OK'
    except urllib.error.HTTPError as he:
        item['status'] = he.code
        item['error'] = True
        item['message'] = f"HTTP {he.code}"
    except Exception as e:
        item['error'] = True
        item['message'] = str(e)
    results.append(item)

with open('scripts/policies_url_check.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

failed = [r for r in results if r['error']]
print(f"Tested {len(results)} distinct URLs. Failed: {len(failed)}")
for f in failed:
    print(f"FAIL: {f['url']} -> {f['message']}")
