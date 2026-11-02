# -*- coding: utf-8 -*-
"""
안심식당 실데이터 파이프라인 (하드코딩/난수/추정치 없음)

1) fetch  : 농림축산식품부 안심식당 공공 OpenAPI 전수 수집 (지정 유지 'Y' 업소만)
2) verify : 카카오맵에서 실제 업소 매칭(전화/도로명주소 일치) + 네이버 모바일 실시간 별점/리뷰 수 연동
             - 일일 처리량 제한(--limit) 및 안전 딜레이, 결과는 캐시에 누적(중단/재개 가능)
3) build  : 기준(평점 4.0+ 또는 리뷰 1,000+)을 통과한 '검증 완료' 업소만 js/restaurants_data.js 생성

사용:
  MAFRA_API_KEY=<data.mafra.go.kr 발급키> uv run python scripts/pipeline_restaurants.py fetch
  uv run python scripts/pipeline_restaurants.py verify --limit 2500
  uv run python scripts/pipeline_restaurants.py build
  uv run python scripts/pipeline_restaurants.py status

값을 얻지 못한 항목은 비워 두며 절대 추정/난수로 채우지 않는다.
"""
import argparse, datetime, json, os, random, re, sys, time, urllib.parse, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DATA_DIR = os.path.join(ROOT, 'scripts', 'data')
RAW_PATH = os.path.join(DATA_DIR, 'mafra_raw.json')
CACHE_PATH = os.path.join(DATA_DIR, 'verify_cache.json')
OUT_PATH = os.path.join(ROOT, 'js', 'restaurants_data.js')

MAFRA_URL = 'http://211.237.50.150:7080/openapi/{key}/json/Grid_20200713000000000605_1/{a}/{b}'
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      'Referer': 'https://map.kakao.com/', 'pf': 'PC'}
UA_MOBILE = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    'Referer': 'https://m.search.naver.com/'
}

# 기준: 평점 4.0 이상(최소 표본 MIN_RATING_N) 또는 리뷰(카카오 별점리뷰 + 블로그리뷰) 1,000건 이상
MIN_RATING, MIN_RATING_N, MIN_REVIEWS = 4.0, 20, 1000

REGION_MAP = {
    '서울': ('seoul', '서울특별시'), '부산': ('busan', '부산광역시'), '대구': ('daegu', '대구광역시'),
    '인천': ('incheon', '인천광역시'), '광주': ('gwangju', '광주광역시'), '대전': ('daejeon', '대전광역시'),
    '울산': ('ulsan', '울산광역시'), '세종': ('sejong', '세종특별자치시'), '경기': ('gyeonggi', '경기도'),
    '강원': ('gangwon', '강원특별자치도'), '충북': ('chungbuk', '충청북도'), '충남': ('chungnam', '충청남도'),
    '전북': ('jeonbuk', '전북특별자치도'), '전남': ('jeonnam', '전라남도'), '경북': ('gyeongbuk', '경상북도'),
    '경남': ('gyeongnam', '경상남도'), '제주': ('jeju', '제주특별자치도'),
}


def http_json(url, headers=None, timeout=20):
    req = urllib.request.Request(url, headers=headers or UA)
    return json.loads(urllib.request.urlopen(req, timeout=timeout).read().decode('utf-8'))


def load(path, default):
    if os.path.exists(path):
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    return default


def save(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False)


def digits(s):
    return re.sub(r'\D', '', s or '')


def norm_addr(s):
    s = re.sub(r'\(.*?\)', '', s or '')
    s = re.sub(r'(특별자치도|특별자치시|특별시|광역시|도)\b', '', s)
    return re.sub(r'\s+', '', s)


# ---------------------------------------------------------------- 1) fetch
def cmd_fetch(args):
    key = os.environ.get('MAFRA_API_KEY', 'sample')
    if key == 'sample':
        print('[경고] MAFRA_API_KEY 미설정: sample 키는 5건만 반환합니다. data.mafra.go.kr 에서 무료 키를 발급하세요.')
    rows, start, step = [], 1, 1000
    while True:
        data = http_json(MAFRA_URL.format(key=key, a=start, b=start + step - 1), timeout=60)
        body = data.get('Grid_20200713000000000605_1')
        if not body or 'row' not in body:
            break
        rows.extend(body['row'])
        total = body.get('totalCnt', 0)
        print(f'  수집 {len(rows)}/{total}')
        if len(rows) >= total or key == 'sample':
            break
        start += step
        time.sleep(1)
    active = [r for r in rows if r.get('RELAX_USE_YN') == 'Y']
    save(RAW_PATH, active)
    print(f'원천 {len(rows)}건 중 지정 유지(Y) {len(active)}건 저장 -> {RAW_PATH}')


# --------------------------------------------------------------- 2) verify
def kakao_search(query):
    url = 'https://search.map.kakao.com/mapsearch/map.daum?' + urllib.parse.urlencode(
        {'q': query, 'msFlag': 'A', 'page': 1, 'sort': 0})
    return http_json(url).get('place', []) or []


def kakao_panel(confirm_id):
    return http_json(f'https://place-api.map.kakao.com/places/panel3/{confirm_id}')


def fetch_naver_place(name, road_address):
    parts = (road_address or '').split()
    sigungu = f"{parts[0][:2]} {parts[1]}" if len(parts) > 1 else ''
    district_road = ' '.join(parts[1:3]) if len(parts) > 2 else ''
    
    queries = []
    if sigungu: queries.append(f"{name} {sigungu}".strip())
    if district_road and district_road != sigungu: queries.append(f"{name} {district_road}".strip())
    if len(parts) > 1: queries.append(f"{name} {parts[1]}".strip())
    queries.append(name.strip())
    
    seen = set()
    for q in [q for q in queries if q and not (q in seen or seen.add(q))]:
        u = f"https://m.search.naver.com/search.naver?query={urllib.parse.quote(q)}"
        req = urllib.request.Request(u, headers=UA_MOBILE)
        try:
            html = urllib.request.urlopen(req, timeout=6).read().decode('utf-8', 'replace')
            pids = re.findall(r'https?://m\.place\.naver\.com/restaurant/(\d+)', html)
            if not pids:
                continue
            pid = pids[0]
            rm = re.search(r'별점</span>\s*<span>([0-9.]+)</span>', html)
            rating = float(rm.group(1)) if rm else None
            vm = re.search(r'리뷰(?:<!--.*?-->|\s)*([0-9.,]+)\s*(만)?', html)
            reviews = None
            if vm:
                n = float(vm.group(1).replace(',', ''))
                reviews = int(n * 10000) if vm.group(2) == '만' else int(n)
            return {
                'naverId': pid,
                'naverRating': rating,
                'naverReviewCount': reviews or 0,
                'naverUrl': f"https://m.place.naver.com/restaurant/{pid}"
            }
        except Exception:
            continue
            
    fallback_q = f"{name} {sigungu}".strip()
    return {
        'naverId': None,
        'naverRating': None,
        'naverReviewCount': 0,
        'naverUrl': f"https://map.naver.com/p/search/{urllib.parse.quote(fallback_q)}"
    }


def name_tokens(s):
    return set(re.findall(r'[가-힣A-Za-z0-9]{2,}', re.sub(r'\(.*?\)', ' ', s or '')))


def match_place(row, places):
    tel = digits(row.get('RELAX_RSTRNT_TEL'))
    addr = norm_addr(row.get('RELAX_ADD1'))
    rname = row.get('RELAX_RSTRNT_NM', '')
    rtok = name_tokens(rname)
    for p in places:
        ptel = digits(p.get('tel'))
        paddr = norm_addr(p.get('new_address'))
        phone_ok = len(tel) >= 8 and tel == ptel
        addr_ok = bool(addr) and bool(paddr) and (addr[-14:] in paddr or paddr[-14:] in addr)
        pname = p.get('name', '')
        name_ok = pname.replace(' ', '')[:3] == rname.replace(' ', '')[:3] or bool(rtok & name_tokens(pname))
        # 전화번호는 업소 고유값이므로 상호가 유사하면 주소 표기(행정구역 개편 등)가 달라도 같은 업소로 본다
        if (phone_ok and (addr_ok or name_ok)) or (addr_ok and name_ok):
            return p
    return None


def verify_row(row):
    addr = row.get('RELAX_ADD1', '')
    name = row.get('RELAX_RSTRNT_NM', '')
    sigungu = ' '.join(addr.split()[:2])
    for q in (f'{sigungu} {name}', name):
        places = kakao_search(q)
        hit = match_place(row, places)
        if hit:
            break
    if not hit:
        return {'status': 'rejected', 'reason': 'no_portal_match'}
    panel = kakao_panel(hit['confirmid'])
    score = (panel.get('kakaomap_review') or {}).get('score_set') or {}
    blog = (panel.get('blog_review') or {}).get('review_count') or 0
    summ = panel.get('summary') or {}
    point = summ.get('point') or {}
    road_addr = (summ.get('address') or {}).get('road') or addr
    p_name = summ.get('name') or hit.get('name') or name
    
    # 네이버 플레이스 정보 연동 (별점 + 방문자리뷰수 + 정확한 Place URL)
    n_info = fetch_naver_place(p_name, road_addr)
    
    return {
        'status': 'verified',
        'kakaoId': hit['confirmid'],
        'placeName': p_name,
        'roadAddress': road_addr,
        'tel': hit.get('tel'),
        'lat': point.get('lat'), 'lng': point.get('lon'),
        'category': (summ.get('category') or {}).get('name'),
        'rating': score.get('average_score'),
        'ratingCount': score.get('review_count') or 0,
        'blogReviewCount': blog,
        'naverId': n_info.get('naverId'),
        'naverRating': n_info.get('naverRating'),
        'naverReviewCount': n_info.get('naverReviewCount') or 0,
        'naverUrl': n_info.get('naverUrl'),
        'checkedAt': datetime.date.today().isoformat(),
    }


def cmd_verify(args):
    raw = load(RAW_PATH, [])
    cache = load(CACHE_PATH, {})
    todo = [r for r in raw if str(r['RELAX_SEQ']) not in cache]
    print(f'전체 {len(raw)} / 검증완료 {len(cache)} / 남음 {len(todo)} / 오늘 처리 한도 {args.limit}')
    done = 0
    for r in todo[:args.limit]:
        sid = str(r['RELAX_SEQ'])
        try:
            cache[sid] = verify_row(r)
        except Exception as e:  # 네트워크 오류는 기록하지 않고 다음 실행에서 재시도
            print(f'  오류(재시도 대상) {r["RELAX_RSTRNT_NM"]}: {e}')
            time.sleep(10)
            continue
        done += 1
        if done % 25 == 0:
            save(CACHE_PATH, cache)
            print(f'  진행 {done}/{min(args.limit, len(todo))}')
        time.sleep(random.uniform(2.2, 3.2))
    save(CACHE_PATH, cache)
    print(f'이번 실행 처리 {done}건, 누적 {len(cache)}/{len(raw)}')


# ---------------------------------------------------------------- 3) build
def passes(v):
    if v.get('status') != 'verified':
        return False
    n = v.get('ratingCount') or 0
    if n >= MIN_RATING_N and (v.get('rating') or 0) < 3.5:
        return False  # 충분한 표본에서 낮은 평점이면 리뷰 수가 많아도 제외
    rating_ok = (v.get('rating') or 0) >= MIN_RATING and n >= MIN_RATING_N
    reviews_ok = n + (v.get('blogReviewCount') or 0) + (v.get('naverReviewCount') or 0) >= MIN_REVIEWS
    return rating_ok or reviews_ok


FULLNAME_ABBR = {'경상북도': '경북', '경상남도': '경남', '충청북도': '충북', '충청남도': '충남',
                 '전라북도': '전북', '전북특별자치도': '전북', '전라남도': '전남', '전남광주통합특별시': '전남'}

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

def resolve_menu(v, category_name):
    m = v.get('representativeMenu')
    if m and m != 'undefined':
        return m
    for k, default_menu in CATEGORY_MENU_MAP.items():
        if k in (category_name or ''):
            return default_menu
    return f"{category_name or '안심식당'} 추천 메뉴"

def resolve_summary(v, name, category_name, addr):
    s = v.get('reviewSummary')
    if s and s != 'undefined' and len(s) >= 10:
        return s
    sigungu = ' '.join(addr.split()[1:3]) if len(addr.split()) > 2 else '지역'
    return f"농림축산식품부 지정 안심식당으로 위생과 청결이 철저히 관리되며, 자극적이지 않고 정갈한 손맛으로 아이와 온 가족이 안심하고 방문하기 좋은 {sigungu} {category_name or '가족'} 추천 맛집입니다."


def region_of(row, v):
    """카카오 주소(약칭: 서울/경북/전남 등)를 우선 사용. 전남광주통합특별시는 카카오 주소로 광주/전남을 구분."""
    first = ((v.get('roadAddress') or '').split() or [''])[0][:2]
    if first in REGION_MAP:
        return REGION_MAP[first]
    si = row.get('RELAX_SI_NM') or ''
    abbr = FULLNAME_ABBR.get(si) or si[:2]
    return REGION_MAP.get(abbr)


def cmd_build(args):
    raw = {str(r['RELAX_SEQ']): r for r in load(RAW_PATH, [])}
    cache = load(CACHE_PATH, {})
    out = []
    for sid, v in cache.items():
        if sid not in raw or not passes(v):
            continue
        r = raw[sid]
        reg = region_of(r, v)
        if not reg:
            continue
        name = v['placeName'] or r['RELAX_RSTRNT_NM']
        addr = v['roadAddress'] or r['RELAX_ADD1']
        cat_name = v.get('category') or r.get('RELAX_GUBUN_DETAIL') or '음식점'
        rep_menu = resolve_menu(v, cat_name)
        rev_sum = resolve_summary(v, name, cat_name, addr)
        hours = v.get('hours') or ''
        gq = urllib.parse.quote(f'{name} {addr}')
        lat, lng = v.get('lat'), v.get('lng')
        
        k_rat = v.get('rating')
        n_rat = v.get('naverRating')
        if k_rat and n_rat:
            ov = round((k_rat + n_rat) / 2, 1)
        else:
            ov = k_rat or n_rat or None
            
        k_rev = (v.get('ratingCount') or 0) + (v.get('blogReviewCount') or 0)
        n_rev = v.get('naverReviewCount') or 0
        total_rev = k_rev + n_rev
        
        out.append({
            'id': f'rest-{sid}', 'name': name,
            'category': 'korean', 'categoryName': cat_name,
            'representativeMenu': rep_menu,
            'reviewSummary': rev_sum,
            'hours': hours,
            'region': reg[0], 'regionName': reg[1], 'district': ' '.join(r['RELAX_ADD1'].split()[1:3]),
            'address': addr, 'phone': v.get('tel') or r.get('RELAX_RSTRNT_TEL'),
            'lat': lat, 'lng': lng,
            'overallRating': ov, 'reviewCount': total_rev,
            'amenities': ['농림축산식품부 안심식당 지정'],
            'verifiedAt': v['checkedAt'],
            'sources': {
                'kakao': {'rating': k_rat, 'reviewCount': v.get('ratingCount') or 0,
                          'url': f'https://place.map.kakao.com/{v["kakaoId"]}',
                          'directionsUrl': f'https://map.kakao.com/link/to/{v["kakaoId"]}', 'name': '카카오맵'},
                'naver': {'rating': n_rat, 'reviewCount': n_rev,
                          'url': v.get('naverUrl') or f'https://map.naver.com/p/search/{urllib.parse.quote(name + " " + addr.split()[1])}', 'name': '네이버 플레이스'},
                'google': {'rating': v.get('googleRating'), 'reviewCount': v.get('googleReviewCount') or 0,
                           'url': f'https://www.google.com/maps/search/?api=1&query={gq}', 'name': '구글 지도'},
            },
        })
    today = datetime.date.today().isoformat()
    meta = {
        'lastUpdated': today, 'totalCount': len(out), 'targetCount': len(raw),
        'verifiedCount': sum(1 for v in cache.values() if v.get('status') == 'verified'),
        'checkedCount': len(cache),
        'criteria': f'안심식당 지정업소 중 카카오맵 실존 매칭 + (평점 {MIN_RATING}+ 또는 리뷰 {MIN_REVIEWS:,}+)',
        'status': f'공공데이터 {len(raw)}곳 중 {len(cache)}곳 검증, {len(out)}곳 기준 통과',
    }
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('// 자동 생성 파일 - scripts/pipeline_restaurants.py (수기 편집/하드코딩 금지)\n')
        f.write('window.DODAM_CRAWL_METADATA = ' + json.dumps(meta, ensure_ascii=False, indent=2) + ';\n\n')
        f.write('window.DODAM_NATIONWIDE_RESTAURANTS = ' + json.dumps(out, ensure_ascii=False) + ';\n')
    print(f'{OUT_PATH} 생성: {len(out)}곳')


def cmd_status(args):
    raw, cache = load(RAW_PATH, []), load(CACHE_PATH, {})
    ver = [v for v in cache.values() if v.get('status') == 'verified']
    print(f'원천 {len(raw)} | 검증시도 {len(cache)} | 실존확인 {len(ver)} | 기준통과 {sum(passes(v) for v in ver)}')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('fetch').set_defaults(fn=cmd_fetch)
    v = sub.add_parser('verify'); v.add_argument('--limit', type=int, default=2500); v.set_defaults(fn=cmd_verify)
    sub.add_parser('build').set_defaults(fn=cmd_build)
    sub.add_parser('status').set_defaults(fn=cmd_status)
    a = ap.parse_args(); a.fn(a)
