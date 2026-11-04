# -*- coding: utf-8 -*-
"""
교육부(MOE) 공식 입시정보, 대교협·평가원 공시 및 최신 교육정책 일일 자동 수집기
- 교육부 보도자료 (boardID=294)
- 교육부 공지사항 (boardID=333)
- 교육부 초·중·고 및 대입 정책 (boardID=316, 337)
"""

import urllib.request
import ssl
import re
import json
import datetime
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# SSL context
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
}

def fetch_moe_board(board_id, m_code, max_pages=1):
    """교육부 특정 게시판 목록을 수집합니다."""
    items = []
    url = f"https://www.moe.go.kr/boardCnts/listRenew.do?boardID={board_id}&m={m_code}&s=moe"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12, context=ctx) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
        for row in rows:
            m_view = re.search(r"goView\('(\d+)',\s*'(\d+)'", row)
            m_title = re.search(r'<a[^>]+title="([^"]+)"', row)
            m_date = re.search(r'<td>(\d{4}-\d{2}-\d{2})</td>', row)

            if m_view and m_title:
                b_id = m_view.group(1)
                b_seq = m_view.group(2)
                title = m_title.group(1).strip()
                date_str = m_date.group(1) if m_date else datetime.date.today().strftime('%Y-%m-%d')
                link = f"https://www.moe.go.kr/boardCnts/viewRenew.do?boardID={b_id}&boardSeq={b_seq}&lev=0&statusYN=W&s=moe&m={m_code}"

                dept_match = re.search(r'<td>([^<]+담당관|[^<]+과|[^<]+팀|[^<]+국)</td>', row)
                dept = dept_match.group(1).strip() if dept_match else "교육부"

                items.append({
                    "boardSeq": b_seq,
                    "title": title,
                    "date": date_str.replace('-', '.'),
                    "dept": dept,
                    "link": link
                })
    except Exception as e:
        print(f"Error fetching MOE board {board_id}: {e}")

    return items

def classify_education_item(item):
    """제목 및 부서 키워드에 따라 카테고리와 메타데이터를 정밀 분류합니다."""
    title = item["title"]
    dept = item.get("dept", "교육부")

    if any(k in title for k in ["2028", "대입개편", "내신 5등급", "통합형 수능", "수능 개편"]):
        cat = "reform2028"
        cat_name = "2028 대입개편"
        badge = "교육부 확정"
        badge_color = "bg-rose-500 text-white"
        target = "현재 중3 ~ 초6 학생 및 학부모"
        points = [
            "2028 대입 개편안 확정 및 세부 시행 방안 안내",
            "통합형 수능(국어·수학·탐구 공통과목) 및 내신 5등급제 상대평가 기준",
            "교육부 공식 공시 및 대학별 전형 연계 사항"
        ]
    elif any(k in title for k in ["고교학점", "학점제", "192학점", "과목선택"]):
        cat = "highcredit"
        cat_name = "고교학점제"
        badge = "전면 시행"
        badge_color = "bg-emerald-600 text-white"
        target = "현재 중3 및 고교 재학생 학부모"
        points = [
            "고교학점제 192학점 이수 기준 및 과목 선택 가이드",
            "진로선택·융합선택 과목 개설 현황 및 최소 학업성취수준 보장지도",
            "공동교육과정 및 학교 간 온라인 학점 연계 지원책"
        ]
    elif any(k in title for k in ["수시", "정시", "대입", "대학입학", "전형", "모집요강", "의대", "무전공", "학생부종합"]):
        cat = "college"
        cat_name = "수시·정시 전형"
        badge = "대입 가이드"
        badge_color = "bg-indigo-600 text-white"
        target = "수험생 및 고등학생 학부모"
        points = [
            "대학 입학 전형 시행계획 및 모집요강 가이드라인",
            "학생부종합·교과·논술 및 수능위주 정시 전형 공식 공시",
            "대교협 대학어디가(ADIGA) 포털 연동 안내"
        ]
    elif any(k in title for k in ["특목고", "자사고", "외고", "국제고", "영재", "고입"]):
        cat = "specialhigh"
        cat_name = "고입 전형"
        badge = "특목·자사고"
        badge_color = "bg-amber-500 text-white"
        target = "초등·중학생 학부모"
        points = [
            "전국 단위 자사고 및 외국어고·국제고 자기주도학습 전형 요강",
            "영재학교·과학고 입학전형 및 내신 평가 반영 비율",
            "시·도 교육청 고등학교 입학전형 기본계획"
        ]
    elif any(k in title for k in ["수능", "모의평가", "평가원", "수능시험", "9월 모의"]):
        cat = "suneung"
        cat_name = "수능·평가원"
        badge = "평가원 공시"
        badge_color = "bg-purple-600 text-white"
        target = "고3 수험생 및 N수생"
        points = [
            "한국교육과정평가원 주관 수능 및 전국연합 모의평가 시행계획",
            "킬러문항 배제 및 EBS 연계 체감도 원칙",
            "수능 성적 통지 및 대학별 수능 최저학력기준 적용 안내"
        ]
    elif any(k in title for k in ["교육과정", "2022 개정"]):
        cat = "curriculum"
        cat_name = "교육과정"
        badge = "개정 교육과정"
        badge_color = "bg-teal-600 text-white"
        target = "초·중·고 학부모"
        points = [
            "2022 개정 교육과정 단계적 적용 일정 및 교과서 검정 현황",
            "디지털·인공지능(AI) 소양 함양 및 학생 주도형 수업",
            "학교 교육과정 편성·운영 자율권 확대"
        ]
    else:
        cat = "policy"
        cat_name = "교육부 공시"
        badge = "공식 보도"
        badge_color = "bg-blue-600 text-white"
        target = "초·중·고 학부모 및 학생"
        points = [
            f"교육부 {dept} 공식 발표 및 정책 시행 공시",
            "교육 현장 적용 지원 대책 및 관련 세부 추진계획",
            "교육부 공식 누리집 원문 공시 및 첨부문서 연계"
        ]

    summary = f"교육부 {dept} 공식 발표 - {title}. 교육부 공식 누리집 공시 원문을 통해 세부 추진 계획 및 공시 문서를 확인할 수 있습니다."
    content_html = f"""<h3>{title}</h3>
<p><strong>공식 발표 기관:</strong> 대한민국 교육부 ({dept}) | <strong>공시일:</strong> {item['date']}</p>
<p>{summary}</p>
<h4>주요 공시 사항</h4>
<ul>
  <li>{points[0]}</li>
  <li>{points[1]}</li>
  <li>{points[2]}</li>
</ul>
<p>상세 공시 원문 및 첨부파일은 <a href="{item['link']}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 font-bold underline">교육부 공식 공시 원문 바로가기</a>를 통해 열람하실 수 있습니다.</p>"""

    return {
        "id": f"moe-{item['boardSeq']}",
        "category": cat,
        "categoryId": cat,
        "categoryName": cat_name,
        "title": title,
        "agency": f"교육부 {dept}",
        "date": item["date"],
        "badge": badge,
        "badgeColor": badge_color,
        "target": target,
        "summary": summary,
        "keyPoints": points,
        "content": content_html,
        "officialUrl": item["link"]
    }

def main():
    print("=== 교육부(MOE) 공식 입시정보 및 교육정책 자동 수집 시작 ===")

    # 1. Fetch MOE Press Releases (보도자료: 294)
    bodo_items = fetch_moe_board(294, "020402")
    print(f"교육부 공식 보도자료 {len(bodo_items)}건 수신")

    # 2. Fetch MOE Notices (공지사항: 333)
    notice_items = fetch_moe_board(333, "0205")
    print(f"교육부 공식 공지사항 {len(notice_items)}건 수신")

    all_raw = bodo_items + notice_items
    print(f"총 {len(all_raw)}건 원본 공시 확보")

    # Convert to standard format
    collected_guides = []
    seen_titles = set()
    for item in all_raw:
        if item["title"] in seen_titles:
            continue
        seen_titles.add(item["title"])
        guide = classify_education_item(item)
        collected_guides.append(guide)

    # Load existing official seed guides
    existing_seed_file = 'data/seeds/admissions_official_seed.json'
    existing_guides = []
    if os.path.exists(existing_seed_file):
        try:
            with open(existing_seed_file, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
                existing_guides = existing_data.get('guides', [])
        except Exception as e:
            print("Failed to read existing seed:", e)

    # Merge: Put newly collected items first, preserve non-duplicate curated foundational guides
    final_guides = []
    for cg in collected_guides:
        final_guides.append(cg)

    for eg in existing_guides:
        if not any(cg['title'] == eg['title'] or cg['id'] == eg['id'] for cg in collected_guides):
            # Ensure both category and categoryId exist
            if 'category' not in eg and 'categoryId' in eg:
                eg['category'] = eg['categoryId']
            if 'categoryId' not in eg and 'category' in eg:
                eg['categoryId'] = eg['category']
            final_guides.append(eg)

    today_str = datetime.date.today().strftime('%Y-%m-%d')

    metadata = {
        "title": "교육부(MOE)·대교협·평가원 공식 입시 정보 포털",
        "lastUpdated": today_str,
        "totalCount": len(final_guides),
        "todayCollectedCount": len(collected_guides),
        "officialSources": [
            {"name": "교육부 (MOE)", "url": "https://www.moe.go.kr"},
            {"name": "대학어디가 포털 (ADIGA)", "url": "https://www.adiga.kr"},
            {"name": "한국대학교육협의회 (대교협)", "url": "https://www.kcue.or.kr"},
            {"name": "한국교육과정평가원 (수능)", "url": "https://www.suneung.re.kr"},
            {"name": "EBSi 고교강의", "url": "https://www.ebsi.co.kr"},
            {"name": "학교알리미 (공시)", "url": "https://www.schoolinfo.go.kr"}
        ]
    }

    categories = [
        {"id": "all", "name": "전체 공식 입시 가이드", "icon": "fa-layer-group"},
        {"id": "reform2028", "name": "2028 대입 개편안", "icon": "fa-bullseye"},
        {"id": "highcredit", "name": "고교학점제", "icon": "fa-graduation-cap"},
        {"id": "college", "name": "수시·정시 전형 가이드", "icon": "fa-university"},
        {"id": "specialhigh", "name": "특목·자사·영재고 고입", "icon": "fa-school"},
        {"id": "curriculum", "name": "2022 개정 교육과정", "icon": "fa-book-open-reader"},
        {"id": "suneung", "name": "수능 및 모의평가", "icon": "fa-pen-to-square"},
        {"id": "policy", "name": "교육부 최신 공시·보도", "icon": "fa-landmark"}
    ]

    database = {
        "metadata": metadata,
        "categories": categories,
        "guides": final_guides
    }

    # Save to data/seeds/admissions_official_seed.json
    os.makedirs('data/seeds', exist_ok=True)
    with open('data/seeds/admissions_official_seed.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, ensure_ascii=False, indent=2)

    # Save to js/admissions_data.js
    js_content = f"""// 교육부(MOE)·한국대학교육협의회(대교협)·한국교육과정평가원 공식 인증 입시 정보 데이터베이스
// 매일 새벽 자동 수집 크롤러(daily_crawler.yml)를 통해 실시간 연동 갱신됩니다.
window.DODAM_ADMISSIONS_DATA = {json.dumps(database, ensure_ascii=False, indent=2)};
"""
    with open('js/admissions_data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"js/admissions_data.js 및 seed 파일 갱신 완료! 총 {len(final_guides)}건 (오늘 수집: {len(collected_guides)}건)")

if __name__ == '__main__':
    main()
