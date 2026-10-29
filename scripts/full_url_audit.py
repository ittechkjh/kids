# -*- coding: utf-8 -*-
import json
import re
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

files_to_check = [
    'index.html',
    'js/admissions_data.js',
    'js/policies_data.js',
    'js/app.js'
]

urls = []
for fname in files_to_check:
    try:
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read()
        found = re.findall(r'https?://[a-zA-Z0-9\.\-_~:/?#\[\]@!$&\'()*+,;=%]+', content)
        for u in found:
            u = u.rstrip('.,;:\'"`')
            if 'localhost' in u or '127.0.0.1' in u or 'example.com' in u or 'unpkg.com' in u or 'cdn' in u or 'fonts' in u or 'github' in u:
                continue
            if (fname, u) not in urls:
                urls.append((fname, u))
    except Exception as e:
        print(f"Error reading {fname}: {e}")

print(f"Total urls to test: {len(urls)}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
}

results = []
for fname, u in urls:
    item = {'file': fname, 'url': u, 'status': None, 'error': False, 'reason': ''}
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=7) as resp:
            item['status'] = resp.status
            content = resp.read(8192).decode('utf-8', errors='ignore')
            for phrase in ['찾을수가 없습니다', '유효하지 않은 요청입니다', '존재하지 않는', '페이지를 찾을 수 없습니다']:
                if phrase in content:
                    item['error'] = True
                    item['reason'] = phrase
                    break
            if not item['error']:
                item['reason'] = 'OK'
    except urllib.error.HTTPError as he:
        item['status'] = he.code
        item['error'] = True
        item['reason'] = f"HTTP {he.code}"
    except Exception as e:
        item['error'] = True
        item['reason'] = str(e)
    results.append(item)

with open('scripts/full_url_audit.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

failed = [r for r in results if r['error']]
print(f"Audit completed: {len(results)} tested, {len(failed)} failed.")
with open('scripts/failed_urls.json', 'w', encoding='utf-8') as f:
    json.dump(failed, f, ensure_ascii=False, indent=2)
