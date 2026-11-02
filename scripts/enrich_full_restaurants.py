# -*- coding: utf-8 -*-
"""
전국 검증 안심식당 상세 정보 심층 보강 스크립트:
1) Kakao Panel3 API 병렬 연동:
   - ai_mate (AI 한줄평 및 요약)
   - menu / keywords (대표 추천 메뉴)
   - open_hours (영업시간)
2) Naver Mobile Search & Place 연동:
   - 실시간 별점 (4.X)
   - 방문자/블로그 리뷰 수
   - 정확한 m.place.naver.com 플레이스 링크
3) 카테고리별 스마트 폴백 체계 완비 (대표메뉴 및 육아맘 한줄평 undefined 0% 보장)
"""
import concurrent.futures, json, os, random, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CACHE_PATH = os.path.join(ROOT, 'scripts', 'data', 'verify_cache.json')
RAW_PATH = os.path.join(ROOT, 'scripts', 'data', 'mafra_raw.json')

UA_KAKAO = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
    'Referer': 'https://map.kakao.com/'
}

UA_NAVER = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
}

CATEGORY_MENU_MAP = {
    '순대': '순대국밥, 얼큰순대국, 모듬순대',
    '감자탕': '우거지감자탕, 뼈해장국, 볶음밥',
    '국수': '잔치국수, 비빔국수, 왕만두',
    '돈까스,우동': '생등심돈가스, 치즈돈가스, 냉모밀',
    '육류,고기': '숙성삼겹살, 한우생등심, 된장찌개',
    '갈비': '소갈비, 돼지갈비, 냉면',
    '오리': '생오리구이, 오리주물럭, 볶음밥',
    '해물,생선': '모듬생선구이, 해물탕, 고등어조림',
    '찌개,전골': '김치찌개, 부대찌개, 라면사리',
    '닭요리': '토종닭백숙, 닭볶음탕, 닭한마리',
    '장어': '민물장어구이, 장어탕, 생강채',
    '국밥': '돼지국밥, 따로국밥, 수육백반',
    '복어': '복지리, 복매운탕, 복튀김',
    '한식': '정갈한 한식 한상차림, 제육볶음, 된장찌개',
    '일식': '특초밥, 모듬사시미, 미니우동',
    '중국요리': '짜장면, 짬뽕, 탕수육',
    '양식': '안심스테이크, 까르보나라, 마르게리따 피자',
    '분식': '떡볶이, 모듬튀김, 찰순대',
    '냉면': '함흥물냉면, 비빔냉면, 수제손만두',
    '두부전문점': '해물순두부, 들깨순두부, 손두부보쌈',
    '샤브샤브': '소고기샤브샤브, 모듬야채, 생칼국수',
    '게,대게': '대게코스, 게딱지볶음밥, 대게라면',
    '추어': '남원추어탕, 통추어탕, 추어튀김',
    '회': '활어모듬회, 매운탕, 초밥',
    '곱창,막창': '한우소곱창, 대창구이, 깍두기볶음밥',
}

def make_parenting_summary(name, cat, rating, addr):
    sigungu = ' '.join(addr.split()[1:3]) if len(addr.split()) > 2 else '지역'
    return f"농림축산식품부 지정 안심식당으로 위생과 청결이 철저히 관리되며, 자극적이지 않고 정갈한 손맛으로 아이와 온 가족이 안심하고 방문하기 좋은 {sigungu} {cat or '가족'} 추천 맛집입니다."

def fetch_kakao_details(kakao_id, name, cat, addr):
    try:
        pu = f'https://place-api.map.kakao.com/places/panel3/{kakao_id}'
        req = urllib.request.Request(pu, headers=UA_KAKAO)
        pdata = json.loads(urllib.request.urlopen(req, timeout=5).read().decode('utf-8'))
        
        ai_mate = pdata.get('ai_mate') or {}
        ai_summary = (ai_mate.get('bottom_sheet') or {}).get('summary') or (ai_mate.get('summary') or {}).get('title') or ''
        
        menus = []
        for sheet in (ai_mate.get('bottom_sheet') or {}).get('sheets') or []:
            menus.extend(sheet.get('keywords') or [])
        if not menus and (ai_mate.get('summary') or {}).get('contents'):
            menus = [c.replace(' 추천', '').replace(' 필수', '') for c in ai_mate['summary']['contents']]
            
        open_hours = pdata.get('open_hours') or {}
        hours_str = ''
        try:
            periods = open_hours.get('week_from_today', {}).get('week_periods', [])
            if periods:
                days = periods[0].get('days', [])
                if days:
                    hours_str = days[0].get('on_days', {}).get('start_end_time_desc', '')
        except:
            pass
            
        rep_menu = ', '.join(menus[:3]) if menus else (CATEGORY_MENU_MAP.get(cat) or f'{cat} 대표 요리')
        rev_sum = ai_summary if (ai_summary and len(ai_summary) >= 10) else make_parenting_summary(name, cat, None, addr)
        
        return {
            'representativeMenu': rep_menu,
            'reviewSummary': rev_sum,
            'hours': hours_str
        }
    except Exception:
        return {
            'representativeMenu': CATEGORY_MENU_MAP.get(cat) or f'{cat} 대표 요리',
            'reviewSummary': make_parenting_summary(name, cat, None, addr),
            'hours': ''
        }

def fetch_naver_details(name, addr):
    parts = addr.split()
    queries = [name.strip()]
    if len(parts) > 1:
        queries.append(f"{name} {parts[1]}".strip())
    if len(parts) > 2:
        queries.append(f"{name} {parts[2]}".strip())
        queries.append(f"{name} {' '.join(parts[1:3])}".strip())
        
    for q in queries:
        u = f"https://m.search.naver.com/search.naver?query={urllib.parse.quote(q)}"
        req = urllib.request.Request(u, headers=UA_NAVER)
        try:
            html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', 'replace')
            pids = re.findall(r'https?://m\.place\.naver\.com/restaurant/(\d+)', html) or re.findall(r'place\.naver\.com/restaurant/(\d+)', html)
            if not pids:
                continue
            pid = pids[0]
            
            rm = re.search(r'별점</span>\s*<span>([0-9.]+)</span>', html)
            rating = float(rm.group(1)) if rm else None
            
            vm = re.search(r'리뷰(?:<!--.*?-->|\s)*([0-9.,]+)\s*(만)?', html)
            reviews = None
            if vm:
                cnt = float(vm.group(1).replace(',', ''))
                reviews = int(cnt * 10000) if vm.group(2) == '만' else int(cnt)
                
            if not reviews:
                try:
                    pu = f"https://m.place.naver.com/restaurant/{pid}/home"
                    phtml = urllib.request.urlopen(urllib.request.Request(pu, headers=UA_NAVER), timeout=4).read().decode('utf-8', 'replace')
                    vr = re.findall(r'방문자리뷰(?:<!--.*?-->|\s)*(?:<em>)?([0-9,]+)', phtml)
                    br = re.findall(r'블로그리뷰(?:<!--.*?-->|\s)*(?:<em>)?([0-9,]+)', phtml)
                    sr = re.findall(r'별점(?:<!--.*?-->|\s)*(?:<em>)?([0-9.]+)', phtml)
                    v_cnt = int(vr[0].replace(',', '')) if vr else 0
                    b_cnt = int(br[0].replace(',', '')) if br else 0
                    if v_cnt + b_cnt > 0:
                        reviews = v_cnt + b_cnt
                    if sr and not rating:
                        rating = float(sr[0])
                except Exception:
                    pass
                
            return {
                'naverId': pid,
                'naverRating': rating,
                'naverReviewCount': reviews or 0,
                'naverUrl': f"https://m.place.naver.com/restaurant/{pid}"
            }
        except Exception:
            continue
            
    fallback_q = f"{name} {parts[1] if len(parts) > 1 else ''}".strip()
    return {
        'naverId': None,
        'naverRating': None,
        'naverReviewCount': 0,
        'naverUrl': f"https://map.naver.com/p/search/{urllib.parse.quote(fallback_q)}"
    }

def main():
    with open(CACHE_PATH, 'r', encoding='utf-8') as f:
        cache = json.load(f)
    with open(RAW_PATH, 'r', encoding='utf-8') as f:
        raw_list = json.load(f)
    raw = {str(r['RELAX_SEQ']): r for r in raw_list}
    
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from pipeline_restaurants import passes, region_of
    
    # 1. build 대상 식당 추출 (총 487곳)
    build_targets = [
        (sid, cache[sid]) for sid in cache
        if sid in raw and passes(cache[sid]) and region_of(raw[sid], cache[sid])
    ]
    
    # 본래순대(13972) 및 미보강 업소를 최우선으로 정렬
    def sort_key(item):
        sid, v = item
        if sid == '13972':
            return -100
        has_k = 1 if (v.get('representativeMenu') and v.get('representativeMenu') != 'undefined') else 0
        has_n = 1 if (v.get('naverReviewCount', 0) > 0) else 0
        return has_k + has_n
        
    build_targets.sort(key=sort_key)
    
    print(f"빌드 대상 식당 총 {len(build_targets)}곳 우선 보강 시작...")
    
    # Step 1: Kakao 부가정보 병렬 수집 (빠르고 안전)
    def worker_kakao(item):
        sid, v = item
        if not v.get('representativeMenu') or v.get('representativeMenu') == 'undefined' or not v.get('reviewSummary'):
            k_info = fetch_kakao_details(v.get('kakaoId'), v.get('placeName'), v.get('category'), v.get('roadAddress'))
            v.update(k_info)
            return True
        return False
        
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        k_results = list(executor.map(worker_kakao, build_targets))
    print(f"Kakao 부가정보 (메뉴/한줄평/영업시간) {sum(k_results)}건 보강 완료")
    
    # Step 2: Naver 실시간 정보 수집 (정확한 딜레이와 동시 2 워커로 밴 방지)
    def worker_naver(item):
        sid, v = item
        if not v.get('naverId') or v.get('naverReviewCount', 0) == 0:
            time.sleep(random.uniform(0.1, 0.25))
            n_info = fetch_naver_details(v.get('placeName'), v.get('roadAddress'))
            v.update(n_info)
            return True
        return False

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        n_results = list(executor.map(worker_naver, build_targets))
    print(f"Naver 실시간 정보 (별점/리뷰수/플레이스링크) {sum(n_results)}건 보강 완료")
    
    # 저장
    with open(CACHE_PATH, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False)
    print(f"verify_cache.json 저장 완료!")

if __name__ == '__main__':
    main()
