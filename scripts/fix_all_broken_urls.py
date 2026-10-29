# -*- coding: utf-8 -*-
import json

# 1. Update data/seeds/admissions_official_seed.json
with open('data/seeds/admissions_official_seed.json', 'r', encoding='utf-8') as f:
    seed_data = json.load(f)

# Verified official URLs
url_mapping = {
    'adm-2028-reform-final': 'https://www.moe.go.kr/boardCnts/list.do?boardID=294&m=020402&s=moe',
    'adm-high-credit-system': 'https://www.hscredit.kr',
    'adm-susi-jungsi-timeline': 'https://www.adiga.kr',
    'adm-special-highschool-guide': 'https://www.schoolinfo.go.kr',
    'adm-medical-school-quota': 'https://www.adiga.kr',
    'adm-free-semester-roadmap': 'https://www.ggoomgil.go.kr',
    'adm-no-major-expansion': 'https://www.kcue.or.kr',
    'adm-private-education-measures': 'https://www.moe.go.kr/boardCnts/list.do?boardID=294&m=020402&s=moe'
}

for g in seed_data['guides']:
    if g['id'] in url_mapping:
        g['officialUrl'] = url_mapping[g['id']]

with open('data/seeds/admissions_official_seed.json', 'w', encoding='utf-8') as f:
    json.dump(seed_data, f, ensure_ascii=False, indent=2)

# 2. Update js/admissions_data.js
js_content = f"""// 교육부(MOE)·대교협·평가원 공식 입시 정보 포털 데이터베이스
// 2028 대입 개편안, 고교학점제, 수시·정시 전형 가이드, 특목·자사고 고입
window.DODAM_ADMISSIONS_DATA = {json.dumps(seed_data, ensure_ascii=False, indent=2)};
"""

with open('js/admissions_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

# 3. Update js/policies_data.js
with open('js/policies_data.js', 'r', encoding='utf-8') as f:
    policy_text = f.read()

# Fix dummy government24 link
policy_text = policy_text.replace(
    'https://www.gov.kr/portal/rcvfvrSvc/dtlEx/000000000001',
    'https://www.gov.kr/portal/onestopSvc/happyBirth'
)

# Fix dead seoul-momcare link
policy_text = policy_text.replace(
    'https://www.seoul-momcare.com',
    'https://umppa.seoul.go.kr'
)

with open('js/policies_data.js', 'w', encoding='utf-8') as f:
    f.write(policy_text)

print("Successfully fixed URLs in seed, admissions_data.js and policies_data.js!")
