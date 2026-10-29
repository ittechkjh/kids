# -*- coding: utf-8 -*-
with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
keys = re.findall(r'^\s\s([a-zA-Z0-9_]+):\s*[\[\{]', text, re.MULTILINE)
print('Top level keys in DODAM_COMMUNITY_DATA:', keys)

for k in keys:
    pos = text.find(f"  {k}:")
    print(f"Key {k} starts at char {pos}")
