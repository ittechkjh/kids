# -*- coding: utf-8 -*-
import json

print("Cleaning events data to eliminate all mock/synthetic seed contests...")

# 1. Update curated_events_seed.json
with open('data/seeds/curated_events_seed.json', 'r', encoding='utf-8') as f:
    seed_data = json.load(f)

cleaned_seed = [e for e in seed_data if not (e.get('id', '').startswith('cont-') or e.get('sourceType') == 'special_contest')]
print(f"Seed events: {len(seed_data)} -> {len(cleaned_seed)} (removed {len(seed_data) - len(cleaned_seed)} mock seed items)")

with open('data/seeds/curated_events_seed.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_seed, f, indent=2, ensure_ascii=False)

# 2. Update js/events_data.js
with open('js/events_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix = text.split('window.DODAM_NATIONWIDE_EVENTS = ')[0] + 'window.DODAM_NATIONWIDE_EVENTS = '
json_str = text.split('window.DODAM_NATIONWIDE_EVENTS = ')[1].rsplit(';', 1)[0]
events = json.loads(json_str)

cleaned_events = [e for e in events if not (e.get('id', '').startswith('cont-') or e.get('sourceType') == 'special_contest')]
print(f"Total events: {len(events)} -> {len(cleaned_events)}")

contests_count = len([e for e in cleaned_events if e.get('boardType') == 'contests'])
festivals_count = len([e for e in cleaned_events if e.get('boardType') == 'festivals'])
print(f"  Festivals: {festivals_count}")
print(f"  Contests: {contests_count}")

# Recompute regionStats in metadata
meta_str = prefix.split('window.DODAM_EVENTS_METADATA = ')[1].split(';\n\nwindow.DODAM_NATIONWIDE_EVENTS')[0]
meta = json.loads(meta_str)

meta["totalEvents"] = len(cleaned_events)
meta["festivalsCount"] = festivals_count
meta["contestsCount"] = contests_count
meta["lastUpdated"] = "2026-10-29"

# Recompute region stats
region_stats = {}
for e in cleaned_events:
    reg = e.get('region', 'all')
    b_type = e.get('boardType', 'festivals')
    if reg not in region_stats:
        region_stats[reg] = {
            "name": e.get('regionName', reg),
            "festivals": 0,
            "contests": 0,
            "total": 0
        }
    if b_type == 'contests':
        region_stats[reg]["contests"] += 1
    else:
        region_stats[reg]["festivals"] += 1
    region_stats[reg]["total"] += 1

meta["regionStats"] = region_stats

new_prefix = f"""// 전국 17개 시도 지역행사 & 대회일정 데이터셋
window.DODAM_EVENTS_METADATA = {json.dumps(meta, indent=2, ensure_ascii=False)};

window.DODAM_NATIONWIDE_EVENTS = """

new_content = new_prefix + json.dumps(cleaned_events, indent=2, ensure_ascii=False) + ";\n"

with open('js/events_data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Saved cleaned js/events_data.js successfully!")
