# -*- coding: utf-8 -*-
import json, re, urllib.parse

def clean_restaurant_name_and_query(raw_name):
    raw_name = (raw_name or '').strip()
    
    # 1. Authentic branches (known benchmarks)
    if re.search(r'(본점|DCC점|노형점|용산아이파크몰점|강남점|여의도점|안지랑본점|성산본점|보문로점|한옥마을점)$', raw_name):
        return raw_name, raw_name
        
    # 2. Clean query
    clean = re.sub(r'\s*\([^)]*\)', '', raw_name)
    clean = re.sub(r'\s+[^\s]+/[^\s]+', '', clean)
    clean = re.sub(r'\s+[가-힣0-9A-Za-z·/]+(?:호점|점)$', '', clean)
    clean = re.sub(r'\s*/.*$', '', clean).strip()
    
    clean_query = clean or raw_name
    return raw_name, clean_query

with open('js/restaurants_data.js', encoding='utf-8') as f:
    text = f.read()

target = 'window.DODAM_NATIONWIDE_RESTAURANTS = '
idx = text.find(target)
if idx == -1:
    print("Could not find window.DODAM_NATIONWIDE_RESTAURANTS!")
    exit(1)

prefix = text[:idx + len(target)]
rest_content = text[idx + len(target):].strip()
if rest_content.endswith(';'):
    suffix = ';'
    json_str = rest_content[:-1].strip()
else:
    suffix = ''
    json_str = rest_content

print("Parsing JSON...")
data = json.loads(json_str)
print(f"Loaded {len(data)} restaurants.")

updated_count = 0
for r in data:
    raw_name, clean_query = clean_restaurant_name_and_query(r.get('name'))
    encoded_query = urllib.parse.quote(clean_query)
    
    sources = r.get('sources', {})
    
    # Naver URL
    sources['naver'] = sources.get('naver', {})
    sources['naver']['url'] = f"https://map.naver.com/p/search/{encoded_query}"
    
    # Kakao URL
    sources['kakao'] = sources.get('kakao', {})
    sources['kakao']['url'] = f"https://map.kakao.com/?q={encoded_query}"
    sources['kakao']['directionsUrl'] = f"https://map.kakao.com/link/to/{encoded_query},{r.get('lat')},{r.get('lng')}"
    
    # Google URL
    sources['google'] = sources.get('google', {})
    sources['google']['url'] = f"https://www.google.com/maps/search/?api=1&query={encoded_query}"
    
    r['sources'] = sources
    updated_count += 1

print(f"Updated {updated_count} restaurant sources.")

# Check sample
print("\nSamples:")
for r in data[:3]:
    print(f"[{r['id']}] {r['name']} -> Naver: {r['sources']['naver']['url']}")
hanil = [r for r in data if '한일옥' in r['name']]
for r in hanil[:3]:
    print(f"[{r['id']}] {r['name']} -> Naver: {r['sources']['naver']['url']}, Kakao: {r['sources']['kakao']['url']}")

new_json = json.dumps(data, ensure_ascii=False)
new_content = prefix + new_json + suffix

with open('js/restaurants_data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully saved updated js/restaurants_data.js!")
