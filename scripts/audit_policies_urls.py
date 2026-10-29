# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('js/policies_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('{')
end = text.rfind('}')
data = json.loads(text[start:end+1])

policies = data.get('policies', [])
print(f"Total policies: {len(policies)}")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

results = []
for p in policies:
    urls_to_test = []
    if p.get('applyUrl'):
        urls_to_test.append(('applyUrl', p['applyUrl']))
    if p.get('sourceUrl'):
        urls_to_test.append(('sourceUrl', p['sourceUrl']))
    if p.get('link'):
        urls_to_test.append(('link', p['link']))

    for key, u in urls_to_test:
        item = {'id': p['id'], 'title': p['title'], 'field': key, 'url': u, 'status': None, 'error': False, 'message': ''}
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

with open('scripts/policies_url_audit.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

failed = [r for r in results if r['error']]
print(f"Tested {len(results)} URLs across policies. Failed: {len(failed)}")
with open('scripts/policies_failed.json', 'w', encoding='utf-8') as f:
    json.dump(failed, f, ensure_ascii=False, indent=2)
