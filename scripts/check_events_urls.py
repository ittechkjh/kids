# -*- coding: utf-8 -*-
import json
import re

with open('js/events_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('{')
end = text.rfind('}')
data = json.loads(text[start:end+1])

events = data.get('events', [])
print(f"Total events in events_data.js: {len(events)}")

urls = []
for e in events:
    link = e.get('link') or e.get('url') or e.get('detailUrl')
    if link and link.startswith('http'):
        urls.append((e.get('id'), e.get('title'), e.get('boardType'), link))

print(f"Total event URLs: {len(urls)}")
with open('scripts/events_urls.json', 'w', encoding='utf-8') as f:
    json.dump(urls[:100], f, ensure_ascii=False, indent=2)

print("Sample saved to scripts/events_urls.json")
