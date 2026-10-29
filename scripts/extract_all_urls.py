# -*- coding: utf-8 -*-
import json
import re

files_to_check = [
    'index.html',
    'js/admissions_data.js',
    'js/policy_data.js',
    'js/app.js'
]

urls = set()
for fname in files_to_check:
    try:
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read()
        found = re.findall(r'https?://[^\s"\'<>`)]+', content)
        for u in found:
            # Clean trailing punctuation
            u = u.rstrip('.,;:')
            urls.add((fname, u))
    except Exception as e:
        print(f"Error reading {fname}: {e}")

print(f"Total unique (file, url) pairs found: {len(urls)}")
with open('scripts/all_extracted_urls.txt', 'w', encoding='utf-8') as f:
    for fname, u in sorted(urls):
        f.write(f"{fname}\t{u}\n")

print("Saved to scripts/all_extracted_urls.txt")
