# -*- coding: utf-8 -*-
import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect where posts starts and ends
posts_start = text.find('  posts: [')
growth_start = text.find('  growthStandards: {')

print("posts_start:", posts_start)
print("growth_start:", growth_start)

# Clean data.js by setting posts: [] and removing cohortRooms, clubs, marketItems, gearReviews
new_data_js = text[:posts_start] + """  posts: [],

""" + text[growth_start:]

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_data_js)

print("Successfully cleaned js/data.js! Removed all dummy posts and mock prototypes.")
