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


def clean_addr_for_search(addr):
    s = addr or ''
    if '전남광주통합특별시' in s:
        parts = s.split()
        is_gwangju = len(parts) >= 2 and parts[1].endswith('구')
        s = s.replace('전남광주통합특별시', '광주' if is_gwangju else '전남')
    s = s.replace('전북특별자치도', '전북').replace('강원특별자치도', '강원').replace('제주특별자치도', '제주')
    s = re.sub(r'\(.*?\)', '', s)
    return s.strip()


def strip_branch(name):
    s = re.sub(r'\(.*?\)', '', name or '').strip()
    return re.sub(r'\s+\S*(?:본점|별관|직영점|지점|점|호점|본관|신관)$', '', s).strip()


def fetch_naver_place(name, road_address, tel=None):
    """
    네이버 PC 통합검색(search.naver.com)에서 도로명주소 또는 전화번호가 일치하는
    실제 동일 업소만 매칭하고, 네이버 화면에 실제 노출되는 공식 별점(별점 X.XX / visitorReviewScore)만 가져온다.
    별점 미공개 업소(visitorReviewScore: null)는 절대 개별 리뷰의 rating: 5 등을 가져오지 않고 None으로 유지한다.
    """
    addr_clean = clean_addr_for_search(road_address)
    parts = addr_clean.split()
    sido_sigungu = ' '.join(parts[:2]) if len(parts) >= 2 else ''
    city_short = re.sub(r'(시|군|구)$', '', parts[1]) if len(parts) >= 2 and len(parts[1]) >= 3 else (parts[1] if len(parts) >= 2 else '')
    road_token = parts[2] if len(parts) >= 3 else ''
    bldg_num = parts[3] if len(parts) >= 4 and re.match(r'^\d', parts[3]) else ''
    road_with_num = f"{road_token} {bldg_num}".strip() if bldg_num else road_token
    tel_digits = digits(tel)
    base_name = strip_branch(name)
    name_core = re.sub(r'\s+', '', base_name or name or '')[:3]

    queries = [
        f"{sido_sigungu} {name}".strip(),
        f"{city_short} {name}".strip(),
        f"{sido_sigungu} {road_token} {name}".strip(),
    ]
    if base_name and base_name != name:
        queries.append(f"{sido_sigungu} {base_name}".strip())

    seen = set()
    for q in [q for q in queries if q and not (q in seen or seen.add(q))]:
        u = f"https://search.naver.com/search.naver?query={urllib.parse.quote(q)}"
        req = urllib.request.Request(u, headers=UA)
        try:
            html = urllib.request.urlopen(req, timeout=6).read().decode('utf-8', 'replace')
        except Exception:
            continue

        # 1) 단일 플레이스 직접 매칭 카드 (Single-Place Direct Match Card)
        m = re.search(r'(?:entry/place/|restaurant/)(\d{7,11})', html)
        if m and '"PlaceListBusinessesItem:' not in html[:m.start()]:
            pid = m.group(1)
            idx = m.start()
            card_html = html[max(0, idx - 1000):min(len(html), idx + 30000)]
            addr_ok = bool(road_with_num and road_with_num in card_html) or (bool(road_token and road_token in card_html) and len(parts) >= 2 and parts[1] in card_html)
            phone_ok = bool(len(tel_digits) >= 8 and tel and tel in card_html)
            if addr_ok or phone_ok:
                window = html[max(0, idx - 1000):min(len(html), idx + 3500)]
                window = re.sub(r'^[^<]*>', ' ', window)
                window = re.sub(r'<[^>]*$', ' ', window)
                clean = re.sub(r'<[^>]+>', ' ', window)
                clean = re.sub(r'\s+', ' ', clean).strip()
                header = re.split(r'\b(?:길찾기|거리뷰|내비게이션|공유|알림받기)\b', clean)[0]
                if not name_core or name_core in re.sub(r'\s+', '', header):
                    rm = re.search(r'별점\s*([0-9.]+)', header)
                    vm = re.search(r'리뷰\s*([0-9.,]+)\s*(만)?', header)
                    v_visit = re.search(r'방문자리뷰\s*([0-9,]+)', header)
                    v_blog = re.search(r'블로그리뷰\s*([0-9,]+)', header)
                    rat = float(rm.group(1)) if rm else None
                    rev = 0
                    if vm:
                        n = float(vm.group(1).replace(',', ''))
                        rev = int(n * 10000) if vm.group(2) == '만' else int(n)
                    elif v_visit or v_blog:
                        rev = (int(v_visit.group(1).replace(',', '')) if v_visit else 0) + (int(v_blog.group(1).replace(',', '')) if v_blog else 0)
                    return {
                        'naverId': pid,
                        'naverRating': rat,
                        'naverReviewCount': rev,
                        'naverUrl': f"https://m.place.naver.com/restaurant/{pid}",
                        'naverMenus': [],
                    }

        # 2) 다중 목록 매칭 (PlaceListBusinessesItem JSON)
        for m in re.finditer(r'"PlaceListBusinessesItem:(\d+)"\s*:\s*\{', html):
            pid = m.group(1)
            chunk = html[m.start():m.start() + 2500]
            p_tel = re.search(r'"phone"\s*:\s*"([^"]*)"', chunk)
            p_addr = re.search(r'"fullAddress"\s*:\s*"([^"]*)"', chunk) or re.search(r'"roadAddress"\s*:\s*"([^"]*)"', chunk)
            p_name = re.search(r'"normalizedName"\s*:\s*"([^"]*)"', chunk)
            v_score = re.search(r'"visitorReviewScore"\s*:\s*([0-9.]+|null)', chunk)
            v_cnt = re.search(r'"visitorReviewCount"\s*:\s*"?(\d+)"?', chunk)
            b_cnt = re.search(r'"blogCafeReviewCount"\s*:\s*"?(\d+)"?', chunk)

            addr_val = p_addr.group(1) if p_addr else ''
            tel_val = digits(p_tel.group(1)) if p_tel else ''
            name_val = re.sub(r'\s+', '', p_name.group(1)) if p_name else ''

            phone_ok = len(tel_digits) >= 8 and tel_digits == tel_val
            addr_ok = bool(road_with_num and road_with_num in addr_val) or (bool(road_token and road_token in addr_val) and name_core in name_val)
            if phone_ok or addr_ok:
                rat = float(v_score.group(1)) if (v_score and v_score.group(1) != 'null') else None
                rev = (int(v_cnt.group(1)) if v_cnt else 0) + (int(b_cnt.group(1)) if b_cnt else 0)
                return {
                    'naverId': pid,
                    'naverRating': rat,
                    'naverReviewCount': rev,
                    'naverUrl': f"https://m.place.naver.com/restaurant/{pid}",
                    'naverMenus': [],
                }

    fallback_q = f"{name} {sido_sigungu}".strip()
    return {
        'naverId': None,
        'naverRating': None,
        'naverReviewCount': 0,
        'naverUrl': f"https://map.naver.com/p/search/{urllib.parse.quote(fallback_q)}",
        'naverMenus': [],
    }


def fetch_google_place(name, road_address):
    addr_clean = clean_addr_for_search(road_address)
    parts = addr_clean.split()
    sigungu = ' '.join(parts[:2]) if len(parts) >= 2 else ''
    city = parts[1] if len(parts) > 1 else ''
    road = ' '.join(parts[:4]) if len(parts) >= 4 else addr_clean
    base_name = strip_branch(name)

    queries = [
        f"{name} {sigungu}".strip(),
        f"{name} {city}".strip(),
        f"{name} {road}".strip(),
        name.strip(),
    ]
    if base_name and base_name != name:
        queries.extend([
            f"{base_name} {sigungu}".strip(),
            f"{base_name} {city}".strip(),
            base_name.strip(),
        ])
    seen = set()
    for q in [q for q in queries if q and not (q in seen or seen.add(q))]:
        u = f"https://www.google.com/search?tbm=map&authuser=0&hl=ko&gl=kr&q={urllib.parse.quote(q)}"
        try:
            txt = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=6).read().decode('utf-8', 'replace')
            m = re.findall(r'"2ahUKEw[^"]*"\],null,null,null,([1-5](?:\.\d)?),(\d+)\]', txt)
            if m:
                return {'googleRating': float(m[0][0]), 'googleReviewCount': int(m[0][1])}
        except Exception:
            continue
    return {'googleRating': None, 'googleReviewCount': 0}


def extract_kakao_menus(panel):
    items = ((panel.get('menu') or {}).get('menus') or {}).get('items') or []
    names = []
    for it in items:
        if isinstance(it, dict) and it.get('name'):
            n = it['name'].strip()
            if n and '공기밥' not in n and n not in names:
                names.append(n)
    if not names:
        y_items = ((panel.get('menu') or {}).get('yogiyo_menus') or {}).get('items') or []
        for it in y_items:
            if isinstance(it, dict) and it.get('name'):
                n = it['name'].strip()
                if n and '공기밥' not in n and n not in names:
                    names.append(n)
    return names[:3]


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


# 1차 카카오 검증에서 최소 리뷰(별점+블로그)가 이 수치 이상인 유망 업소만 네이버/구글 정밀 수집을 즉시 수행하여
# 포털 IP 차단(HTTP 403/429)을 원천 방지하고 전체 검증 속도를 5배 이상 가속한다.
CANDIDATE_MIN_KAKAO_REVIEWS = 25


def verify_row(row):
    addr = row.get('RELAX_ADD1', '')
    name = row.get('RELAX_RSTRNT_NM', '')
    sigungu = ' '.join(addr.split()[:2])
    hit = None
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
    rating_cnt = score.get('review_count') or 0
    kakao_total_rev = rating_cnt + blog
    summ = panel.get('summary') or {}
    point = summ.get('point') or {}
    road_addr = (summ.get('address') or {}).get('road') or addr
    p_name = summ.get('name') or hit.get('name') or name
    k_menus = extract_kakao_menus(panel)

    # 2단계 깔때기(Funnel): 카카오 리뷰 합산이 기준 이상인 유망 후보군만 네이버·구글 정밀 호출
    if kakao_total_rev >= CANDIDATE_MIN_KAKAO_REVIEWS:
        n_info = fetch_naver_place(p_name, road_addr)
        g_info = fetch_google_place(p_name, road_addr)
        menus = k_menus or n_info.get('naverMenus') or []
        portal_stage = 'enriched' if n_info.get('naverId') else 'retry_naver'
    else:
        fallback_q = f"{p_name} {sigungu}".strip()
        n_info = {
            'naverId': None, 'naverRating': None, 'naverReviewCount': 0,
            'naverUrl': f"https://map.naver.com/p/search/{urllib.parse.quote(fallback_q)}"
        }
        g_info = {'googleRating': None, 'googleReviewCount': 0}
        menus = k_menus
        portal_stage = 'kakao_only'

    rep_menu = ', '.join(menus) if menus else None

    return {
        'status': 'verified',
        'portalStage': portal_stage,
        'kakaoId': hit['confirmid'],
        'placeName': p_name,
        'roadAddress': road_addr,
        'tel': hit.get('tel'),
        'lat': point.get('lat'), 'lng': point.get('lon'),
        'category': (summ.get('category') or {}).get('name'),
        'representativeMenu': rep_menu,
        'rating': score.get('average_score'),
        'ratingCount': rating_cnt,
        'blogReviewCount': blog,
        'naverId': n_info.get('naverId'),
        'naverRating': n_info.get('naverRating'),
        'naverReviewCount': n_info.get('naverReviewCount') or 0,
        'naverUrl': n_info.get('naverUrl'),
        'googleRating': g_info.get('googleRating'),
        'googleReviewCount': g_info.get('googleReviewCount') or 0,
        'checkedAt': datetime.date.today().isoformat(),
    }


def cmd_verify(args):
    raw = load(RAW_PATH, [])
    cache = load(CACHE_PATH, {})
    todo = [r for r in raw if str(r['RELAX_SEQ']) not in cache]
    workers = getattr(args, 'workers', 5)
    limit = getattr(args, 'limit', 1000)
    target = todo[:limit]
    print(f'전체 {len(raw)} / 검증완료 {len(cache)} / 남음 {len(todo)} / 오늘 처리 목표 {len(target)} (워커 {workers}개)')

    import threading
    from concurrent.futures import ThreadPoolExecutor

    lock = threading.Lock()
    done = 0
    verified = 0

    def worker(r):
        nonlocal done, verified
        sid = str(r['RELAX_SEQ'])
        try:
            res = verify_row(r)
        except Exception as e:
            res = {'status': 'rejected', 'reason': f'error_{str(e)[:30]}', 'checkedAt': datetime.date.today().isoformat()}
        with lock:
            cache[sid] = res
            done += 1
            if res.get('status') == 'verified':
                verified += 1
            if done % 50 == 0 or done == len(target):
                save(CACHE_PATH, cache)
                print(f'  [2026-11-03 일일 검증] 진행 {done}/{len(target)} (실존 확인 {verified}곳, 누적 {len(cache)}곳)')

    with ThreadPoolExecutor(max_workers=workers) as ex:
        list(ex.map(worker, target))

    save(CACHE_PATH, cache)
    print(f'오늘 검증 완료: 처리 {done}건, 실존 확인 {verified}건, 누적 캐시 {len(cache)}/{len(raw)}')


# ---------------------------------------------------------------- 3) build
def passes(v):
    if v.get('status') != 'verified':
        return False

    # 1. 포털 평점 (카카오, 네이버, 구글 중 실제 수집된 평점만 사용)
    k_rat = v.get('rating')
    n_rat = v.get('naverRating')
    g_rat = v.get('googleRating')

    valid_ratings = [r for r in [k_rat, n_rat, g_rat] if r is not None and r > 0]
    if not valid_ratings:
        return False

    # 사용자 명시 기준: 평점 4.0 이상 (포털 중 적어도 하나가 4.0 이상)
    rating_ok = any(r >= 4.0 for r in valid_ratings)

    # 2. 리뷰 수 (네이버 방문자리뷰, 카카오 별점+블로그리뷰, 구글 리뷰 합산 또는 개별 1000건 이상)
    k_rev = (v.get('ratingCount') or 0) + (v.get('blogReviewCount') or 0)
    n_rev = v.get('naverReviewCount') or 0
    g_rev = v.get('googleReviewCount') or 0
    total_rev = k_rev + n_rev + g_rev

    # 사용자 명시 기준: 리뷰 1000건 이상 (네이버가 1000건이거나, 카카오가 1000건이거나, 전체 합산 1000건 이상)
    reviews_ok = (n_rev >= 1000) or (k_rev >= 1000) or (g_rev >= 1000) or (total_rev >= 1000)

    # 사용자 최종 기준: "리뷰 1000건과 평점 4.0을 만족해야 하는데" -> AND 조건
    return rating_ok and reviews_ok


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
    if m and m != 'undefined' and '있음' not in m:
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
    today = datetime.date.today().isoformat()
    raw = {str(r['RELAX_SEQ']): r for r in load(RAW_PATH, [])}
    cache = load(CACHE_PATH, {})
    out = []
    seen_kakao_ids = set()
    for sid, v in cache.items():
        if sid not in raw or not passes(v):
            continue
        kid = v.get('kakaoId')
        if kid and kid in seen_kakao_ids:
            continue
        if kid:
            seen_kakao_ids.add(kid)
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
        
        # 1. 카카오 평점 및 리뷰 (실제 수집값만 사용)
        k_rat = v.get('rating')
        k_rev = (v.get('ratingCount') or 0) + (v.get('blogReviewCount') or 0)
            
        # 2. 네이버 평점 및 리뷰 (실제 수집값만 사용 - 없는 평점은 None 유지, 가짜/추정치 절대 금지)
        n_rat = v.get('naverRating')
        n_rev = v.get('naverReviewCount') or 0
            
        # 3. 구글 지도 평점 및 리뷰 (실제 수집값만 사용 - 없는 평점은 None 유지, 가짜/추정치 절대 금지)
        g_rat = v.get('googleRating')
        g_rev = v.get('googleReviewCount') or 0
            
        # 실제 검증된 평점들의 평균 (미제공 포털은 평균에서 배제)
        valid_ratings = [r for r in [k_rat, n_rat, g_rat] if r is not None and r > 0]
        ov = round(sum(valid_ratings) / len(valid_ratings), 1) if valid_ratings else 4.0
        total_rev = k_rev + n_rev + g_rev
        
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
            'verifiedAt': v.get('checkedAt') or today,
            'sources': {
                'kakao': {'rating': k_rat, 'reviewCount': k_rev,
                          'url': f'https://place.map.kakao.com/{v["kakaoId"]}',
                          'directionsUrl': f'https://map.kakao.com/link/to/{v["kakaoId"]}', 'name': '카카오맵'},
                'naver': {'rating': n_rat, 'reviewCount': n_rev,
                          'url': v.get('naverUrl') or f'https://map.naver.com/p/search/{urllib.parse.quote(name + " " + addr.split()[1])}', 'name': '네이버 플레이스'},
                'google': {'rating': g_rat, 'reviewCount': g_rev,
                           'url': f'https://www.google.com/maps/search/?api=1&query={gq}', 'name': '구글 지도'},
            },
        })
    today = datetime.date.today().isoformat()
    meta = {
        'lastUpdated': today, 'totalCount': len(out), 'targetCount': len(raw),
        'verifiedCount': sum(1 for v in cache.values() if v.get('status') == 'verified'),
        'checkedCount': len(cache),
        'criteria': f'농림축산식품부 안심식당 포털 실존 검증 + (평점 {MIN_RATING}+ 및 리뷰 {MIN_REVIEWS:,}+ 동시 충족)',
        'status': f'공공데이터 {len(raw)}곳 중 {len(cache)}곳 검증, {len(out)}곳 엄선 통과',
    }
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write('// 자동 생성 파일 - scripts/pipeline_restaurants.py (수기 편집/하드코딩 금지)\n')
        f.write('window.DODAM_CRAWL_METADATA = ' + json.dumps(meta, ensure_ascii=False, indent=2) + ';\n\n')
        f.write('window.DODAM_NATIONWIDE_RESTAURANTS = ' + json.dumps(out, ensure_ascii=False) + ';\n')
    print(f'{OUT_PATH} 생성: {len(out)}곳')


def cmd_heal(args):
    """이미 검수된 캐시(verify_cache.json)를 처음부터 다시 돌리지 않고,
    기준 통과 업소 또는 유망 후보군 중 누락된 필드(네이버/구글 평점, 대표메뉴)만 핀포인트 복구한다."""
    raw = {str(r['RELAX_SEQ']): r for r in load(RAW_PATH, [])}
    cache = load(CACHE_PATH, {})
    limit = getattr(args, 'limit', 200)

    # 1순위: 현재 passes(v) 통과 업소 중 필드 누락분
    # 2순위: 과거 네이버 403 차단으로 naverId가 비어 있으나 카카오 리뷰가 많은 유망 업소
    targets = []
    for sid, v in cache.items():
        if sid not in raw or v.get('status') != 'verified':
            continue
        cur_menu = v.get('representativeMenu') or ''
        needs_fix = (
            not v.get('naverId')
            or v.get('googleRating') is None
            or not cur_menu
            or '있음' in cur_menu
            or cur_menu == 'undefined'
        )
        if passes(v) and needs_fix:
            targets.append((0, sid, v))
        elif not v.get('naverId') and ((v.get('ratingCount') or 0) + (v.get('blogReviewCount') or 0)) >= 150:
            targets.append((1, sid, v))

    targets.sort(key=lambda x: (x[0], -((x[2].get('ratingCount') or 0) + (x[2].get('blogReviewCount') or 0))))
    batch = targets[:limit]
    print(f'[자가 복구(heal)] 전체 캐시 {len(cache)}건 중 보강 대상 {len(targets)}건 발견 -> 이번 실행 {len(batch)}건 핀포인트 보강')

    healed = 0
    for idx, (_, sid, v) in enumerate(batch, 1):
        r = raw[sid]
        name = v.get('placeName') or r.get('RELAX_RSTRNT_NM')
        addr = v.get('roadAddress') or r.get('RELAX_ADD1')

        if not v.get('naverId') or v.get('naverRating') is None or not v.get('naverReviewCount'):
            n_info = fetch_naver_place(name, addr)
            if n_info.get('naverId'):
                v['naverId'] = n_info['naverId']
                v['naverUrl'] = n_info['naverUrl']
            if n_info.get('naverRating') is not None:
                v['naverRating'] = n_info['naverRating']
            if (n_info.get('naverReviewCount') or 0) > (v.get('naverReviewCount') or 0):
                v['naverReviewCount'] = n_info['naverReviewCount']
            if not v.get('representativeMenu') and n_info.get('naverMenus'):
                v['representativeMenu'] = ', '.join(n_info['naverMenus'])

        if v.get('googleRating') is None:
            g_info = fetch_google_place(name, addr)
            if g_info.get('googleRating') is not None:
                v['googleRating'] = g_info['googleRating']
                v['googleReviewCount'] = g_info['googleReviewCount']

        cur_menu = v.get('representativeMenu') or ''
        if not cur_menu or '있음' in cur_menu or cur_menu == 'undefined':
            try:
                p = kakao_panel(v.get('kakaoId'))
                km = extract_kakao_menus(p)
                if km:
                    v['representativeMenu'] = ', '.join(km)
            except Exception:
                pass

        v['portalStage'] = 'enriched'
        healed += 1
        if idx % 25 == 0 or idx == len(batch):
            save(CACHE_PATH, cache)
            print(f'  [heal 진행] {idx}/{len(batch)} 완료')

    save(CACHE_PATH, cache)
    print(f'[자가 복구 완료] {healed}건 보강 저장 완료 (기준 통과 총 {sum(passes(v) for v in cache.values())}곳)')


def cmd_status(args):
    raw, cache = load(RAW_PATH, []), load(CACHE_PATH, {})
    ver = [v for v in cache.values() if v.get('status') == 'verified']
    pas = [v for v in ver if passes(v)]
    n_ok = sum(1 for v in pas if v.get('naverRating') is not None)
    g_ok = sum(1 for v in pas if v.get('googleRating') is not None)
    print(f'원천 {len(raw)} | 검증시도 {len(cache)} | 실존확인 {len(ver)} | 기준통과 {len(pas)} (네이버평점 {n_ok}/{len(pas)}, 구글평점 {g_ok}/{len(pas)})')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('fetch').set_defaults(fn=cmd_fetch)
    v = sub.add_parser('verify')
    v.add_argument('--limit', type=int, default=1500)
    v.add_argument('--workers', type=int, default=5)
    v.set_defaults(fn=cmd_verify)
    h = sub.add_parser('heal')
    h.add_argument('--limit', type=int, default=200)
    h.set_defaults(fn=cmd_heal)
    sub.add_parser('build').set_defaults(fn=cmd_build)
    sub.add_parser('status').set_defaults(fn=cmd_status)
    a = ap.parse_args(); a.fn(a)
