# -*- coding: utf-8 -*-
import re
import json

TODAY_DOT = "2026.11.07"
TODAY_DASH = "2026-11-07"

# 1. Update index.html
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace all old dates with TODAY_DOT
html = html.replace('2026.10.29', TODAY_DOT)
html = html.replace('2026.11.03', TODAY_DOT)
html = html.replace('2026.11.04', TODAY_DOT)

# Also update static crawl count badge to reflect 2,087 (993 restaurants + 1,094 attractions)
html = html.replace('<strong id="crawl-stat-total" class="font-black text-emerald-600">464</strong>곳',
                    '<strong id="crawl-stat-total" class="font-black text-emerald-600">2,087</strong>곳')

# Bump version to v11
html = re.sub(r'(\.css|\.js)\?v=20261107_v\d+', r'\1?v=20261107_v11', html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("index.html dates and counts updated.")

# 2. Update js/restaurants_data.js
with open("js/restaurants_data.js", "r", encoding="utf-8") as f:
    rest_js = f.read()

rest_js = re.sub(r'"lastUpdated":\s*"[^"]+"', f'"lastUpdated": "{TODAY_DASH}"', rest_js)
with open("js/restaurants_data.js", "w", encoding="utf-8") as f:
    f.write(rest_js)
print("js/restaurants_data.js updated.")

# 3. Update js/policies_data.js
with open("js/policies_data.js", "r", encoding="utf-8") as f:
    pol_js = f.read()

pol_js = re.sub(r"updatedAt:\s*'[^']+'", f"updatedAt: '{TODAY_DASH}'", pol_js)
with open("js/policies_data.js", "w", encoding="utf-8") as f:
    f.write(pol_js)
print("js/policies_data.js updated.")

# 4. Update js/admissions_data.js
with open("js/admissions_data.js", "r", encoding="utf-8") as f:
    adm_js = f.read()

adm_js = re.sub(r'"lastUpdated":\s*"[^"]+"', f'"lastUpdated": "{TODAY_DASH}"', adm_js)
with open("js/admissions_data.js", "w", encoding="utf-8") as f:
    f.write(adm_js)
print("js/admissions_data.js updated.")

# 5. Update renderUpdateBadges in js/app.js
with open("js/app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

# Enhance renderUpdateBadges to synchronize all 6 view badges
old_render_badges_head = """  renderUpdateBadges() {
    const rawDate = this.eventsMetadata?.lastUpdated || '2026-10-29';
    const formatted = rawDate.replace(/-/g, '.');

    document.querySelectorAll('.last-updated-text').forEach((el) => {
      el.textContent = formatted;
    });"""

new_render_badges_head = """  renderUpdateBadges() {
    // 6대 핵심 서비스(축제, 대회, 맛집·관광지, 정책, 학군, 입시) 통합 최신 업데이트 일자
    const rawDate = this.eventsMetadata?.lastUpdated || window.DODAM_CRAWL_METADATA?.lastUpdated || '2026-11-07';
    const formatted = rawDate.replace(/-/g, '.');

    // 모든 상단 뱃지 일괄 동기화
    document.querySelectorAll('.last-updated-text').forEach((el) => {
      el.textContent = formatted;
    });
    const cDate = document.getElementById('crawl-stat-date');
    if (cDate) cDate.textContent = formatted;
    const aDate = document.getElementById('admissions-updated-date');
    if (aDate) aDate.textContent = formatted;"""

if old_render_badges_head in app_js:
    app_js = app_js.replace(old_render_badges_head, new_render_badges_head)
    print("renderUpdateBadges head updated.")
else:
    print("Warning: old_render_badges_head not found in js/app.js")

# In renderUpdateBadges, ensure total verified places count includes attractions
old_rest_total = """    const crawlStatTotal = document.getElementById('crawl-stat-total');
    if (crawlStatTotal) {
      const restTotal = window.DODAM_NATIONWIDE_RESTAURANTS?.length || window.DODAM_CRAWL_METADATA?.totalCount || 464;
      crawlStatTotal.textContent = restTotal.toLocaleString();
    }"""

new_rest_total = """    const crawlStatTotal = document.getElementById('crawl-stat-total');
    if (crawlStatTotal) {
      const restCount = window.DODAM_NATIONWIDE_RESTAURANTS?.length || 993;
      const attrCount = window.DODAM_NATIONWIDE_ATTRACTIONS?.length || 1094;
      const totalVerified = restCount + attrCount;
      crawlStatTotal.textContent = totalVerified.toLocaleString();
    }"""

if old_rest_total in app_js:
    app_js = app_js.replace(old_rest_total, new_rest_total)
    print("renderUpdateBadges rest_total updated.")
else:
    print("Warning: old_rest_total not found in js/app.js")

with open("js/app.js", "w", encoding="utf-8") as f:
    f.write(app_js)
print("js/app.js updated.")
