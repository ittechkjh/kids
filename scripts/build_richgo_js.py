# -*- coding: utf-8 -*-
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('data/seeds/richgo_districts_database.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

js_content = f"""// 리치고(Richgo m.richgo.ai) MCP API 연동 전국 핵심 학군·배정 단지 데이터베이스
// Sourced via Richgo MCP get_school_district & get_school Tools
window.DODAM_RICHGO_DATABASE = {json.dumps(data, ensure_ascii=False, indent=2)};
"""

with open('js/richgo_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Created js/richgo_data.js! Size: {len(js_content)} bytes")
