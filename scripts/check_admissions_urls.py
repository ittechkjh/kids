# -*- coding: utf-8 -*-
import json
import urllib.request
import urllib.error
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('js/admissions_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('{')
end = text.rfind('}')
data = json.loads(text[start:end+1])

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
}

results = []

for g in data['guides']:
    url = g['officialUrl']
    item = {
        'id': g['id'],
        'title': g['title'],
        'url': url,
        'status': None,
        'error_text': False,
        'message': ''
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
            item['status'] = resp.status
            content = resp.read(8192).decode('utf-8', errors='ignore')
            for phrase in ['찾을수가 없습니다', '유효하지 않은 요청입니다', '존재하지 않는', '페이지를 찾을 수 없습니다']:
                if phrase in content:
                    item['error_text'] = True
                    item['message'] = phrase
                    break
            if not item['error_text']:
                item['message'] = 'OK'
    except Exception as e:
        item['message'] = f"Exception: {str(e)}"
    results.append(item)

with open('scripts/url_check_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Done checking. Results written to scripts/url_check_results.json")
