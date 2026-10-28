# -*- coding: utf-8 -*-
"""
전국 지역행사 & 전국 대회 일정 데이터베이스 생성 및 한국관광공사 TourAPI 4.0 연동 모듈
- 17개 시도 전체 완벽 지원: 서울, 경기, 인천, 강원, 대전, 세종, 충북, 충남, 부산, 대구, 울산, 경남, 경북, 광주, 전북, 전남, 제주
- 게시판 2개 분리:
  1. festivals (전국 지역행사 & 볼거리: 축제, 가족 마라톤, 공원생태, 빛축제)
  2. contests (전국 대회일정: 사생대회, 백일장, 독서토론·골든벨, 창의발명, 코딩, 수학)
- TOUR_API_KEY 환경변수 지원 (공공데이터포털 연동)
"""
import os
import re
import ssl
import json
import datetime
import urllib.request
import urllib.parse

# 17개 시도 매핑 딕셔너리
AREA_CODE_MAP = {
    "1": ("seoul", "서울특별시"),
    "2": ("incheon", "인천광역시"),
    "3": ("daejeon", "대전광역시"),
    "4": ("daegu", "대구광역시"),
    "5": ("gwangju", "광주광역시"),
    "6": ("busan", "부산광역시"),
    "7": ("ulsan", "울산광역시"),
    "8": ("sejong", "세종특별자치시"),
    "31": ("gyeonggi", "경기도"),
    "32": ("gangwon", "강원특별자치도"),
    "33": ("chungbuk", "충청북도"),
    "34": ("chungnam", "충청남도"),
    "35": ("jeonbuk", "전북특별자치도"),
    "36": ("jeonnam", "전라남도"),
    "37": ("gyeongbuk", "경상북도"),
    "38": ("gyeongnam", "경상남도"),
    "39": ("jeju", "제주특별자치도")
}

# 17개 시도별 고품질 시드 데이터베이스 로드 (외부 JSON 시드 파일에서 동적 로드)
SEED_FILE_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data', 'seeds', 'curated_events_seed.json')

def load_curated_events():
    if os.path.exists(SEED_FILE_PATH):
        try:
            with open(SEED_FILE_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f'[WARN] Failed to load curated seed file: {e}')
    return []

CURATED_EVENTS = load_curated_events()

DEFAULT_TOUR_API_KEY = "G7N6elMlYOmqsOnctk%2B0X1Dpyz1ajBFF82gcH8Sl%2FgRDD5Jb4gangmAU2KZgmWSerzjtZqEQLlAxay4dFH3IPw%3D%3D"

JEONNAM_CITIES = ['광양', '목포', '여수', '순천', '나주', '담양', '곡성', '구례', '고흥', '보성', '화순', '장흥', '강진', '해남', '영암', '무안', '함평', '영광', '장성', '완도', '진도', '신안']

def determine_region(it):
    # 1. 한국관광공사 TourAPI의 공식 areacode가 있는 경우 최우선 적용 (17개 시도 정확한 분기)
    ac = str(it.get("areacode", ""))
    if ac in AREA_CODE_MAP:
        return AREA_CODE_MAP[ac]

    # 2. 법정동/행정동 코드(lDongRegnCd)가 있는 경우
    ld = str(it.get("lDongRegnCd", ""))
    ld_map = {
        "11": ("seoul", "서울특별시"),
        "26": ("busan", "부산광역시"),
        "27": ("daegu", "대구광역시"),
        "28": ("incheon", "인천광역시"),
        "29": ("gwangju", "광주광역시"),
        "30": ("daejeon", "대전광역시"),
        "31": ("ulsan", "울산광역시"),
        "36": ("sejong", "세종특별자치시"),
        "41": ("gyeonggi", "경기도"),
        "42": ("gangwon", "강원특별자치도"),
        "51": ("gangwon", "강원특별자치도"),
        "43": ("chungbuk", "충청북도"),
        "44": ("chungnam", "충청남도"),
        "45": ("jeonbuk", "전북특별자치도"),
        "52": ("jeonbuk", "전북특별자치도"),
        "46": ("jeonnam", "전라남도"),
        "47": ("gyeongbuk", "경상북도"),
        "48": ("gyeongnam", "경상남도"),
        "50": ("jeju", "제주특별자치도")
    }
    if ld in ld_map:
        return ld_map[ld]

    # 3. 주소 및 제목 기반 분석
    addr = it.get("addr1") or ""
    title = it.get("title") or ""
    full_text = f"{addr} {title}"

    # 전남 시·군 먼저 검사 (광주와의 행정구역 혼선 방지)
    if any(c in full_text for c in JEONNAM_CITIES) or "전남" in addr or "전라남도" in addr:
        return "jeonnam", "전라남도"

    if "광주" in addr: return "gwangju", "광주광역시"
    if "서울" in addr: return "seoul", "서울특별시"
    if "경기" in addr: return "gyeonggi", "경기도"
    if "인천" in addr: return "incheon", "인천광역시"
    if "강원" in addr: return "gangwon", "강원특별자치도"
    if "대전" in addr: return "daejeon", "대전광역시"
    if "세종" in addr: return "sejong", "세종특별자치시"
    if "충남" in addr or "충청남도" in addr: return "chungnam", "충청남도"
    if "충북" in addr or "충청북도" in addr: return "chungbuk", "충청북도"
    if "전북" in addr or "전라북도" in addr: return "jeonbuk", "전북특별자치도"
    if "대구" in addr: return "daegu", "대구광역시"
    if "경북" in addr or "경상북도" in addr: return "gyeongbuk", "경상북도"
    if "부산" in addr: return "busan", "부산광역시"
    if "울산" in addr: return "ulsan", "울산광역시"
    if "경남" in addr or "경상남도" in addr: return "gyeongnam", "경상남도"
    if "제주" in addr: return "jeju", "제주특별자치도"

    return "seoul", "서울특별시"

def fetch_tourapi_events(api_key):
    """
    한국관광공사 TourAPI 4.0 searchFestival2 & areaBasedList2 전국 전지역 자동 수집
    - 전국 17개 시도(부산, 대구, 광주, 대전, 울산, 세종, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 등)
    """
    print("TourAPI KorService2 전국 17개 시도 전체 데이터 수집을 시도합니다...")
    import ssl
    ctx = ssl._create_unverified_context()

    tour_events = []
    seen_titles = set()

    # 1. searchFestival2 전체 페이지 순회 (최대 1,000건)
    base_fest_url = "https://apis.data.go.kr/B551011/KorService2/searchFestival2"
    for page in range(1, 4):
        url = f"{base_fest_url}?serviceKey={api_key}&MobileOS=ETC&MobileApp=DodamTalk&_type=json&eventStartDate=20240101&numOfRows=500&pageNo={page}&arrange=C"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                body = data.get("response", {}).get("body", {})
                if not isinstance(body, dict):
                    break
                items = body.get("items", {}).get("item", [])
                if not isinstance(items, list) or not items:
                    break

                for it in items:
                    title = it.get("title", "").strip()
                    if not title or title in seen_titles:
                        continue
                    seen_titles.add(title)

                    reg_key, reg_name = determine_region(it)

                    s_date = str(it.get("eventstartdate", ""))
                    e_date = str(it.get("eventenddate", ""))

                    if len(s_date) == 8:
                        s_date_fmt = f"{s_date[:4]}-{s_date[4:6]}-{s_date[6:]}"
                    else:
                        s_date_fmt = "2026-11-01"

                    if len(e_date) == 8:
                        e_date_fmt = f"{e_date[:4]}-{e_date[4:6]}-{e_date[6:]}"
                    else:
                        e_date_fmt = s_date_fmt

                    # 카테고리 판별
                    if any(w in title for w in ["마라톤", "러닝", "달리기", "걷기", "트레킹"]):
                        cat = "sports_marathon"
                        cat_name = "주말 가족 마라톤"
                        tag_list = ["가족마라톤", "건강", reg_name, "TourAPI"]
                    elif any(w in title for w in ["야경", "빛", "불꽃", "루미나리에", "별빛", "야간"]):
                        cat = "festival_night"
                        cat_name = "야경 & 빛축제"
                        tag_list = ["야경축제", "포토존", reg_name, "TourAPI"]
                    elif any(w in title for w in ["생태", "체험", "숲", "자연", "환경", "동물", "식물", "어린이"]):
                        cat = "park_eco"
                        cat_name = "공원 생태체험"
                        tag_list = ["생태체험", "자연학습", reg_name, "TourAPI"]
                    else:
                        cat = "festival_culture"
                        cat_name = "지역 문화 축제"
                        tag_list = ["지역축제", "공공데이터", reg_name, "가족나들이"]

                    cid = it.get("contentid")
                    clean_t = title.replace("[", "").replace("]", " ").strip()
                    page_url = f"https://search.naver.com/search.naver?query={urllib.parse.quote(clean_t)}"
                    img_url = it.get("firstimage") or it.get("firstimage2") or "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80"

                    loc = it.get("addr1") or f"{reg_name} 일원"
                    if it.get("addr2"):
                        loc = f"{loc} {it.get('addr2')}".strip()

                    b_type, s_cat, s_name, s_badge = classify_board_item(title, default_board="festivals")
                    tour_events.append({
                        "id": f"tourapi-fest-{cid or abs(hash(title))}",
                        "boardType": b_type,
                        "title": title,
                        "category": s_cat or cat,
                        "categoryName": s_name or cat_name,
                        "badge": s_badge or "🎪 TourAPI 축제",
                        "organizer": it.get("tel") or f"{reg_name} 지자체 / 주최기관",
                        "sourceType": "tour_api",
                        "sourceLabel": "한국관광공사 TourAPI 공공데이터",
                        "region": reg_key,
                        "regionName": reg_name,
                        "location": loc,
                        "startDate": s_date_fmt,
                        "endDate": e_date_fmt,
                        "applyStartDate": s_date_fmt,
                        "applyEndDate": e_date_fmt,
                        "status": "applying",
                        "targetAudience": "전국 가족 관광객 / 어린이 동반 가족",
                        "fee": "상세 문의 (현장 안내)",
                        "url": page_url,
                        "imageUrl": img_url,
                        "description": f"{title} - 한국관광공사 및 {reg_name} 지자체 공식 등록 축제/행사입니다.",
                        "tags": tag_list
                    })
        except Exception as e:
            print(f"TourAPI 축제 페이지 {page} 수집 중단: {e}")
            break

    print(f"TourAPI로부터 총 {len(tour_events)}건의 전국 축제 데이터를 정상 수신했습니다.")

    # 2. areaBasedList2 (문화시설/체험관/어린이과학관/박물관) 150건 수집
    base_cul_url = "https://apis.data.go.kr/B551011/KorService2/areaBasedList2"
    url_cul = f"{base_cul_url}?serviceKey={api_key}&MobileOS=ETC&MobileApp=DodamTalk&_type=json&contentTypeId=14&numOfRows=150&pageNo=1&arrange=C"
    req_cul = urllib.request.Request(url_cul, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req_cul, context=ctx, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            items = data.get("response", {}).get("body", {}).get("items", {}).get("item", [])
            if isinstance(items, list):
                cul_added = 0
                for it in items:
                    title = it.get("title", "").strip()
                    if not title or title in seen_titles:
                        continue
                    seen_titles.add(title)

                    reg_key, reg_name = determine_region(it)
                    cid = it.get("contentid")
                    clean_t = f"{reg_name} {title}".replace("[", "").replace("]", " ").strip()
                    page_url = f"https://search.naver.com/search.naver?query={urllib.parse.quote(clean_t)}"
                    img_url = it.get("firstimage") or it.get("firstimage2") or "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&auto=format&fit=crop&q=80"
                    loc = it.get("addr1") or f"{reg_name} 일원"

                    tour_events.append({
                        "id": f"tourapi-cul-{cid or abs(hash(title))}",
                        "boardType": "festivals",
                        "title": f"[{reg_name}] {title} 가족 문화체험",
                        "category": "park_eco",
                        "categoryName": "공원 생태체험",
                        "badge": "🏛️ 문화체험관",
                        "organizer": it.get("tel") or f"{reg_name} 문화시설",
                        "sourceType": "tour_api",
                        "sourceLabel": "한국관광공사 문화관광데이터",
                        "region": reg_key,
                        "regionName": reg_name,
                        "location": loc,
                        "startDate": "2026-10-01",
                        "endDate": "2026-12-31",
                        "applyStartDate": "2026-10-01",
                        "applyEndDate": "2026-12-31",
                        "status": "applying",
                        "targetAudience": "가족 / 어린이 / 학생",
                        "fee": "현장 문의 / 관람료 안내",
                        "url": page_url,
                        "imageUrl": img_url,
                        "description": f"{title} - {reg_name}에서 즐기는 가족 단위 체험·전시 문화시설입니다.",
                        "tags": ["문화체험", "박물관", reg_name, "TourAPI"]
                    })
                    cul_added += 1
                print(f"TourAPI로부터 문화체험시설 {cul_added}건 추가 수집 완료")
    except Exception as e:
        print(f"TourAPI 문화체험시설 수집 오류: {e}")

    return tour_events

DEFAULT_SEOUL_API_KEY = "6c424a69706b6a68323363476f4363"

def fetch_seoul_api_events(api_key):
    """
    서울열린데이터광장(data.seoul.go.kr) OpenAPI 연동
    - culturalEventInfo (서울시 문화행사 정보)
    - ListPublicReservationCulture (서울시 공공서비스예약 문화체험)
    """
    print("서울열린데이터광장 실시간 데이터 연동을 시도합니다...")
    events = []

    # 1. culturalEventInfo (공연, 축제, 전시 등)
    url1 = f"http://openapi.seoul.go.kr:8088/{api_key}/json/culturalEventInfo/1/80/"
    try:
        req = urllib.request.Request(url1, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            rows = data.get("culturalEventInfo", {}).get("row", [])
            for r in rows:
                title = r.get("TITLE", "").strip()
                if not title: continue
                date_str = r.get("DATE", "")
                dates = date_str.split("~")
                s_date = dates[0].strip() if len(dates) > 0 else "2026-11-01"
                e_date = dates[1].strip() if len(dates) > 1 else s_date

                # 카테고리 판별
                if any(k in title for k in ["마라톤", "걷기", "달리기"]):
                    cat = "sports_marathon"
                    cat_name = "주말 가족 마라톤"
                elif any(k in title for k in ["빛", "야경", "불꽃", "루미나리에", "별빛"]):
                    cat = "festival_night"
                    cat_name = "야경 & 빛축제"
                elif any(k in title for k in ["체험", "생태", "숲", "어린이", "가족", "박물관"]):
                    cat = "park_eco"
                    cat_name = "공원 생태체험"
                else:
                    cat = "festival_culture"
                    cat_name = "지역 문화 축제"

                cid = r.get("CODENAME", "")
                b_type, s_cat, s_name, s_badge = classify_board_item(title, default_board="festivals")
                events.append({
                    "id": f"seoul-culture-{abs(hash(title))}",
                    "boardType": b_type,
                    "title": title,
                    "category": s_cat or cat,
                    "categoryName": s_name or cat_name,
                    "badge": s_badge or "🏛️ 서울시 문화행사",
                    "organizer": r.get("ORG_NAME") or f"{r.get('GUNAME', '서울시')} 주최",
                    "sourceType": "seoul_open_data",
                    "sourceLabel": "서울열린데이터광장 공공데이터",
                    "region": "seoul",
                    "regionName": "서울특별시",
                    "location": f"서울특별시 {r.get('GUNAME', '')} {r.get('PLACE', '')}".strip(),
                    "startDate": s_date,
                    "endDate": e_date,
                    "applyStartDate": s_date,
                    "applyEndDate": e_date,
                    "status": "applying",
                    "targetAudience": r.get("USE_TRGT") or "전체 시민 / 온 가족",
                    "fee": r.get("USE_FEE") or "상세 안내 참조",
                    "url": r.get("ORG_LINK") or "https://culture.seoul.go.kr",
                    "imageUrl": r.get("MAIN_IMG") or "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
                    "description": f"{title} - {r.get('PLACE', '서울')}에서 진행되는 서울시 공식 문화행사입니다.",
                    "tags": ["서울시문화행사", cid or "공연", r.get("GUNAME", "서울"), "가족나들이"]
                })
            print(f"서울열린데이터광장 문화행사 {len(rows)}건 수신 완료")
    except Exception as e:
        print(f"서울 문화행사 조회 오류: {e}")

    # 2. ListPublicReservationCulture (공공서비스예약 문화체험)
    url2 = f"http://openapi.seoul.go.kr:8088/{api_key}/json/ListPublicReservationCulture/1/80/"
    try:
        req = urllib.request.Request(url2, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            rows = data.get("ListPublicReservationCulture", {}).get("row", [])
            for r in rows:
                title = r.get("SVCNM", "").strip()
                if not title: continue
                s_dt = r.get("SVCOPNBGNDT", "")[:10]
                e_dt = r.get("SVCOPNENDDT", "")[:10]

                events.append({
                    "id": f"seoul-res-{r.get('SVCID', abs(hash(title)))}",
                    "boardType": "festivals",
                    "title": title,
                    "category": "park_eco",
                    "categoryName": "공원 생태체험",
                    "badge": "🌿 서울 공공예약",
                    "organizer": r.get("PLACENM") or "서울시 공공서비스예약",
                    "sourceType": "seoul_open_data",
                    "sourceLabel": "서울열린데이터광장 공공예약",
                    "region": "seoul",
                    "regionName": "서울특별시",
                    "location": f"서울특별시 {r.get('PLACENM', '')}".strip(),
                    "startDate": s_dt or "2026-11-01",
                    "endDate": e_dt or s_dt or "2026-11-30",
                    "applyStartDate": s_dt,
                    "applyEndDate": e_dt,
                    "status": "applying",
                    "targetAudience": r.get("USETGTINFO") or "어린이 동반 가족",
                    "fee": r.get("PAYATNM") or "무료",
                    "url": r.get("SVCURL") or "https://yeyak.seoul.go.kr",
                    "imageUrl": r.get("IMGURL") or "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=80",
                    "description": f"{title} - 서울시 공공서비스예약 공식 가족 문화/생태 체험 프로그램입니다.",
                    "tags": ["서울공공예약", r.get("MINCLASSNM", "체험"), "어린이체험", "가족예약"]
                })
            print(f"서울열린데이터광장 공공예약 {len(rows)}건 수신 완료")
    except Exception as e:
        print(f"서울 공공예약 조회 오류: {e}")

    return events

DEFAULT_GG_API_KEY = "adb521523a0b4de0925726149359947a"

def fetch_gyeonggi_api_events(api_key):
    """
    경기데이터드림(data.gg.go.kr) OpenAPI 연동
    - CultureFestival (경기도 문화축제 현황)
    - CityPark (경기도 도시공원/문화공원/생태공원)
    """
    print("경기데이터드림 실시간 데이터 연동을 시도합니다...")
    events = []

    # 1. CultureFestival (경기도 문화축제 현황)
    url1 = f"https://openapi.gg.go.kr/CultureFestival?KEY={api_key}&Type=json&pIndex=1&pSize=200"
    try:
        req = urllib.request.Request(url1, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            cf_data = data.get("CultureFestival", [])
            rows = cf_data[1].get("row", []) if len(cf_data) > 1 else []
            for r in rows:
                title = r.get("FASTVL_NM", "").strip()
                if not title: continue

                s_raw = str(r.get("FASTVL_BEGIN_DE", ""))
                e_raw = str(r.get("FASTVL_END_DE", ""))

                if len(s_raw) == 8:
                    s_date = f"{s_raw[:4]}-{s_raw[4:6]}-{s_raw[6:]}"
                else:
                    s_date = "2026-11-01"

                if len(e_raw) == 8:
                    e_date = f"{e_raw[:4]}-{e_raw[4:6]}-{e_raw[6:]}"
                else:
                    e_date = s_date

                # 카테고리 판별
                if any(k in title for k in ["마라톤", "걷기", "달리기"]):
                    cat = "sports_marathon"
                    cat_name = "주말 가족 마라톤"
                elif any(k in title for k in ["빛", "야경", "불꽃", "루미나리에", "별빛"]):
                    cat = "festival_night"
                    cat_name = "야경 & 빛축제"
                elif any(k in title for k in ["생태", "숲", "자연", "체험", "꽃", "수확", "도자기", "농업"]):
                    cat = "park_eco"
                    cat_name = "공원 생태체험"
                else:
                    cat = "festival_culture"
                    cat_name = "지역 문화 축제"

                loc = r.get("REFINE_ROADNM_ADDR") or r.get("REFINE_LOTNO_ADDR") or f"경기도 {r.get('OPENMEET_PLC', '일원')}"

                b_type, s_cat, s_name, s_badge = classify_board_item(title, default_board="festivals")
                events.append({
                    "id": f"gg-fest-{abs(hash(title))}",
                    "boardType": b_type,
                    "title": title,
                    "category": s_cat or cat,
                    "categoryName": s_name or cat_name,
                    "badge": s_badge or "🎪 경기도 대표축제",
                    "organizer": r.get("MNGT_INST_NM") or r.get("PROMOTER_INST_NM") or "경기도 지자체",
                    "sourceType": "gyeonggi_data_dream",
                    "sourceLabel": "경기데이터드림 공공데이터",
                    "region": "gyeonggi",
                    "regionName": "경기도",
                    "location": loc.strip(),
                    "startDate": s_date,
                    "endDate": e_date,
                    "applyStartDate": s_date,
                    "applyEndDate": e_date,
                    "status": "applying",
                    "targetAudience": "전국 가족 관광객 / 경기도민",
                    "fee": "무료 / 일부 체험 유료",
                    "url": r.get("HMPG_ADDR") or "https://data.gg.go.kr",
                    "imageUrl": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80",
                    "description": f"{title} - 경기도 및 지자체 주관 공식 문화관광 축제입니다. {r.get('FASTVL_CONT', '')}",
                    "tags": ["경기데이터드림", "경기도축제", r.get("OPENMEET_PLC") or "경기도", "가족나들이"]
                })
            print(f"경기데이터드림 문화축제 {len(rows)}건 수신 완료")
    except Exception as e:
        print(f"경기 문화축제 조회 오류: {e}")

    # 2. CityPark (경기도 문화공원 / 체육공원 / 생태공원 피크닉)
    url2 = f"https://openapi.gg.go.kr/CityPark?KEY={api_key}&Type=json&pIndex=1&pSize=60"
    try:
        req = urllib.request.Request(url2, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            cp_data = data.get("CityPark", [])
            rows = cp_data[1].get("row", []) if len(cp_data) > 1 else []
            for r in rows:
                p_div = r.get("PARK_DIV_NM", "")
                if p_div not in ["문화공원", "체육공원", "수변공원", "생태공원"]:
                    continue

                p_name = r.get("PARK_NM", "").strip()
                if not p_name: continue
                title = f"[{r.get('SIGUN_NM', '경기도')}] {p_name} 주말 가족 피크닉·공원산책"

                loc = r.get("REFINE_ROADNM_ADDR") or r.get("REFINE_LOTNO_ADDR") or f"경기도 {r.get('SIGUN_NM', '')} {p_name}"

                events.append({
                    "id": f"gg-park-{r.get('MANAGE_NO', abs(hash(title)))}",
                    "boardType": "festivals",
                    "title": title,
                    "category": "park_eco",
                    "categoryName": "공원 생태체험",
                    "badge": f"🌿 {p_div}",
                    "organizer": r.get("MANAGE_INST_NM") or f"경기도 {r.get('SIGUN_NM', '')}",
                    "sourceType": "gyeonggi_data_dream",
                    "sourceLabel": "경기데이터드림 공원정보",
                    "region": "gyeonggi",
                    "regionName": "경기도",
                    "location": loc.strip(),
                    "startDate": "2026-10-01",
                    "endDate": "2026-11-30",
                    "applyStartDate": "2026-10-01",
                    "applyEndDate": "2026-11-30",
                    "status": "applying",
                    "targetAudience": "가족 나들이객 / 어린이",
                    "fee": "무료 개방",
                    "url": "https://data.gg.go.kr",
                    "imageUrl": "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=80",
                    "description": f"{p_name} ({p_div}) - 잔디마당, 산책로, 편의시설이 완비된 경기도 가족 나들이 추천 공원입니다.",
                    "tags": ["경기데이터드림", p_div, r.get("SIGUN_NM") or "경기도", "주말피크닉"]
                })
            print(f"경기데이터드림 공원피크닉 {len(events)}건 수신 완료")
    except Exception as e:
        print(f"경기 공원정보 조회 오류: {e}")

    return events


# =============================================================================
# [Method 2] 공공데이터(TourAPI, 서울, 경기) 대회/경연/사생 지능형 자동 분류기
# =============================================================================
CONTEST_KEYWORDS = [
    "사생대회", "사생", "백일장", "글짓기", "미술대회", "그림그리기", "그리기대회",
    "공모전", "공모대회", "경진대회", "경연대회", "골든벨", "독서토론",
    "발명대회", "로봇대회", "올림피아드", "동요대회", "스피치대회", "콩쿠르", "웅변대회", "창작대회"
]

def classify_festival_category(title, loc="", desc=""):
    """
    지역행사 & 볼거리를 10개 세부 카테고리로 고정밀 세분화
    """
    t = f"{title} {loc} {desc}"
    if any(k in t for k in ["마라톤", "달리기", "걷기대회", "키즈런", "걷기", "트레킹", "플로깅", "런트립"]):
        return "sports_marathon", "가족마라톤·걷기", "🏃 가족마라톤"
    if any(k in t for k in ["빛", "야경", "불꽃", "루미나리에", "등불", "드론쇼", "미디어아트", "야행", "별빛", "라이트", "일루미네이션"]):
        return "festival_light", "빛·야경·드론쇼", "✨ 빛·야경축제"
    if any(k in t for k in ["농장", "수확", "사과", "딸기", "감귤", "고구마", "갯벌", "밤", "포도", "감자", "농촌", "목장", "양떼", "낙농"]):
        return "farm_harvest", "수확·농촌체험", "🍎 수확·농촌체험"
    if any(k in t for k in ["과학관", "박물관", "미술관", "전시", "아쿠아리움", "천문대", "기념관", "체험관", "비엔날레", "엑스포", "수족관", "어린이박물관"]):
        return "expo_science", "박물관·과학·전시", "🏛️ 박물관·과학·전시"
    if any(k in t for k in ["국화", "단풍", "억새", "핑크뮬리", "꽃", "갈대", "가을", "봄", "장미", "연꽃", "매화", "벚꽃", "유채", "수국", "눈꽃"]):
        return "festival_season", "꽃·단풍·계절축제", "🌸 계절·꽃축제"
    if any(k in t for k in ["음식", "먹거리", "푸드", "김밥", "김치", "비빔밥", "빵", "수산물", "한우", "어부장터", "미식", "막걸리", "인삼", "송어", "빙어", "굴", "대게"]):
        return "festival_food", "미식·먹거리축제", "🍱 미식·먹거리"
    if any(k in t for k in ["전통", "역사", "한옥", "민속", "고궁", "유교", "성곽", "산성", "도자기", "한지", "문화재", "왕", "선비", "향교", "서원"]):
        return "festival_tradition", "전통·역사문화", "🎎 전통·역사문화"
    if any(k in t for k in ["공연", "뮤지컬", "인형극", "마술", "연극", "오케스트라", "버스킹", "영화제", "재즈", "오페라", "서커스"]):
        return "festival_performance", "공연·음악·인형극", "🎭 공연·인형극"
    if any(k in t for k in ["공원", "숲", "생태", "자연", "수목원", "휴양림", "습지", "호수", "둘레길", "올레길", "화원"]):
        return "park_eco", "숲·공원 생태체험", "🌿 숲·공원 생태체험"
    return "festival_culture", "지역 종합축제", "🎪 지역 종합축제"

def classify_contest_category(title, org="", desc=""):
    """
    전국 대회일정을 10개 세부 카테고리로 고정밀 세분화
    """
    t = f"{title} {org} {desc}"
    if any(k in t for k in ["로봇", "피지컬", "아두이노", "마이크로비트", "메이커", "물로켓", "에어로켓"]):
        return "contest_robot", "로봇·메이커올림피아드", "🤖 로봇·메이커"
    if any(k in t for k in ["코딩", "해커톤", "SW", "알고리즘", "소프트웨어", "게임", "개발", "앱", "엔트리", "스크래치", "파이썬"]):
        return "contest_coding", "AI·코딩·SW대회", "💻 AI·코딩대회"
    if any(k in t for k in ["영어", "스피치", "말하기", "영어토론"]):
        return "contest_english", "영어·스피치대회", "🗣️ 영어스피치"
    if any(k in t for k in ["수학", "퍼즐", "올림피아드", "수리탐구"]):
        return "contest_math", "창의수학·올림피아드", "📐 창의수학"
    if any(k in t for k in ["동요", "음악", "콩쿠르", "성악", "판소리", "합창", "피아노", "관현악"]):
        return "contest_music", "동요·음악경연", "🎵 동요·음악경연"
    if any(k in t for k in ["독서", "토론", "골든벨", "도서관", "인성토론", "독서감상문"]):
        return "contest_reading", "독서토론·골든벨", "📖 독서토론·골든벨"
    if any(k in t for k in ["백일장", "글짓기", "동시", "산문", "수필", "문학", "시나리오", "독후감", "문학상"]):
        return "contest_writing", "전국 백일장·글짓기", "📚 전국 백일장"
    if any(k in t for k in ["발명", "과학", "전람회", "탐구", "우주", "실험", "창의발명"]):
        return "contest_stem", "과학탐구·창의발명", "💡 과학·창의발명"
    if any(k in t for k in ["사생", "미술", "그림", "그리기", "포스터", "디자인", "캐릭터", "웹툰", "일러스트", "만화", "공예"]):
        return "contest_art", "사생대회·미술공모", "🎨 사생·미술공모"
    return "contest_general", "종합 아이디어공모", "🏆 종합공모전"

def classify_board_item(title, loc="", desc="", default_board="festivals"):
    for kw in CONTEST_KEYWORDS:
        if kw in title:
            cat, cat_name, badge = classify_contest_category(title, loc, desc)
            return "contests", cat, cat_name, badge
    f_cat, f_name, f_badge = classify_festival_category(title, loc, desc)
    return default_board, f_cat, f_name, f_badge

# =============================================================================
# [Method 1] 공모전 전문 플랫폼(위비티) 실시간 전국 어린이·청소년 대회 자동 수집기
# =============================================================================
def determine_contest_region(title, organizer):
    text = f"{title} {organizer}"
    if any(c in text for c in JEONNAM_CITIES) or "전남" in text or "전라남도" in text:
        return "jeonnam", "전라남도"
    if "광주" in text: return "gwangju", "광주광역시"
    if "부산" in text: return "busan", "부산광역시"
    if "대구" in text: return "daegu", "대구광역시"
    if "인천" in text: return "incheon", "인천광역시"
    if "대전" in text: return "daejeon", "대전광역시"
    if "울산" in text: return "ulsan", "울산광역시"
    if "세종" in text: return "sejong", "세종특별자치시"
    if "경기" in text or "부천" in text or "수원" in text or "성남" in text or "고양" in text: return "gyeonggi", "경기도"
    if "강원" in text: return "gangwon", "강원특별자치도"
    if "충북" in text or "충청북도" in text or "단양" in text or "청주" in text: return "chungbuk", "충청북도"
    if "충남" in text or "충청남도" in text or "천안" in text or "아산" in text: return "chungnam", "충청남도"
    if "전북" in text or "전라북도" in text or "전주" in text: return "jeonbuk", "전북특별자치도"
    if "경북" in text or "경상북도" in text or "포항" in text or "경주" in text or "구미" in text: return "gyeongbuk", "경상북도"
    if "경남" in text or "경상남도" in text or "창원" in text or "김해" in text or "진주" in text: return "gyeongnam", "경상남도"
    if "제주" in text: return "jeju", "제주특별자치도"
    return "seoul", "서울특별시"

def fetch_wevity_contests():
    """
    공모전 전문 플랫폼(위비티) 실시간 전국 어린이·청소년 대회 자동 수집
    - 사생대회, 미술공모, 백일장, 글짓기, 코딩, 로봇, 과학, 독서토론
    """
    print("공모전 전문 플랫폼(위비티) 실시간 전국 대회 자동 수집을 시도합니다...")
    import ssl
    ctx = ssl._create_unverified_context()
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

    categories = [
        (19, "미술/사생/포스터/웹툰", "contest_art", "🎨 사생/미술공모"),
        (23, "문학/백일장/글짓기/독후감", "contest_writing", "📚 전국 백일장"),
        (21, "SW/코딩/해커톤", "contest_coding", "💻 코딩·SW대회"),
        (22, "과학/공학/로봇/발명", "contest_stem", "💡 과학·발명대회"),
        (26, "예체능/음악/동요/스피치", "contest_music", "🎵 동요·예체능경연")
    ]

    contests = []
    seen_titles = set()

    for cidx, cat_name, cat_key, badge in categories:
        url = f"https://www.wevity.com/?c=find&s=1&gub=1&cidx={cidx}"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
                items = re.findall(r'<li[^>]*>(.*?)</li>', html, re.DOTALL)
                for it in items:
                    if 'class="tit"' in it and '<a href=' in it:
                        tit_m = re.search(r'<div class="tit">\s*<a href="([^"]+)">([^<]+)', it)
                        if not tit_m: continue
                        link = tit_m.group(1).strip()
                        raw_title = tit_m.group(2).strip()
                        title = re.sub(r'\s+', ' ', raw_title).strip()
                        if not title or title in seen_titles: continue
                        seen_titles.add(title)

                        org_m = re.search(r'<div class="organ">([^<]+)</div>', it)
                        organizer = org_m.group(1).strip() if org_m else "공모전 주최기관"

                        sub_m = re.search(r'<div class="sub-tit">([^<]+)</div>', it)
                        sub_tit = sub_m.group(1).strip() if sub_m else ""

                        dday_m = re.search(r'D-(\d+|Day)', it)
                        dday_str = dday_m.group(0) if dday_m else "접수중"

                        reg_key, reg_name = determine_contest_region(title, organizer)

                        contests.append({
                            "id": f"wevity-{abs(hash(title))}",
                            "boardType": "contests",
                            "title": title,
                            "category": cat_key,
                            "categoryName": cat_name,
                            "badge": badge,
                            "organizer": organizer,
                            "sourceType": "wevity_contest",
                            "sourceLabel": "공모전 전문플랫폼 연동",
                            "region": reg_key,
                            "regionName": reg_name,
                            "location": f"{reg_name} 및 전국 온라인 접수",
                            "startDate": "2026-10-15",
                            "endDate": "2026-12-15",
                            "applyStartDate": "2026-10-15",
                            "applyEndDate": "2026-11-30",
                            "status": "applying",
                            "dday": dday_str,
                            "targetAudience": "전국 유·초·중·고등학생 및 청소년",
                            "fee": "무료 (온라인 접수)",
                            "url": f"https://www.wevity.com/{link}",
                            "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
                            "description": f"{title} - {organizer} 주최 전국 공모전 및 경진대회입니다. {sub_tit}",
                            "tags": ["전국대회", "공모전", cat_name.split("/")[0], reg_name]
                        })
        except Exception as e:
            print(f"Wevity {cat_name} 수집 건너뜀: {e}")

    print(f"공모전 전문 플랫폼(위비티)에서 실시간 전국 대회 {len(contests)}건 수신 완료")
    return contests

def build():
    today = datetime.date(2026, 10, 27)

    # 1. API 키 확인 (TourAPI & 서울열린데이터광장)
    tour_api_key = os.environ.get("TOUR_API_KEY", DEFAULT_TOUR_API_KEY)
    tour_api_events = []
    if tour_api_key:
        tour_api_events = fetch_tourapi_events(tour_api_key)

    seoul_api_key = os.environ.get("SEOUL_API_KEY", DEFAULT_SEOUL_API_KEY)
    seoul_api_events = []
    if seoul_api_key:
        seoul_api_events = fetch_seoul_api_events(seoul_api_key)

    combined_events = list(CURATED_EVENTS)
    existing_titles = {e["title"].strip() for e in combined_events}

    if tour_api_events:
        added_cnt = 0
        for te in tour_api_events:
            if te["title"] not in existing_titles:
                combined_events.append(te)
                existing_titles.add(te["title"])
                added_cnt += 1
        print(f"TourAPI 축제 {added_cnt}건이 통합 데이터셋에 추가되었습니다.")

    if seoul_api_events:
        added_seoul_cnt = 0
        for se in seoul_api_events:
            if se["title"] not in existing_titles:
                combined_events.append(se)
                existing_titles.add(se["title"])
                added_seoul_cnt += 1
        print(f"서울열린데이터광장 문화행사/공공예약 {added_seoul_cnt}건이 통합 데이터셋에 추가되었습니다.")

    gg_api_key = os.environ.get("GG_API_KEY", DEFAULT_GG_API_KEY)
    gg_api_events = []
    if gg_api_key:
        gg_api_events = fetch_gyeonggi_api_events(gg_api_key)

    if gg_api_events:
        added_gg_cnt = 0
        for ge in gg_api_events:
            if ge["title"] not in existing_titles:
                combined_events.append(ge)
                existing_titles.add(ge["title"])
                added_gg_cnt += 1
        print(f"경기데이터드림 문화축제/공원 {added_gg_cnt}건이 통합 데이터셋에 추가되었습니다.")

    # 4. 공모전 전문 플랫폼(위비티) 실시간 전국대회 수집 (Method 1)
    wevity_events = fetch_wevity_contests()
    if wevity_events:
        added_wevity_cnt = 0
        for we in wevity_events:
            if we["title"] not in existing_titles:
                combined_events.append(we)
                existing_titles.add(we["title"])
                added_wevity_cnt += 1
        print(f"공모전 전문 플랫폼(위비티) 전국대회 {added_wevity_cnt}건이 통합 데이터셋에 추가되었습니다.")

    # 2. 고정밀 10대 세부 카테고리 적용 및 D-Day 정렬 처리
    for e in combined_events:
        if e.get("boardType") == "contests":
            c_cat, c_name, c_badge = classify_contest_category(e["title"], e.get("organizer", ""), e.get("description", ""))
            e["category"] = c_cat
            e["categoryName"] = c_name
            e["badge"] = c_badge
        else:
            f_cat, f_name, f_badge = classify_festival_category(e["title"], e.get("location", ""), e.get("description", ""))
            e["category"] = f_cat
            e["categoryName"] = f_name
            e["badge"] = f_badge

        try:
            apply_end = datetime.datetime.strptime(e["applyEndDate"], "%Y-%m-%d").date()
            diff = (apply_end - today).days
            if diff < 0:
                e["dday"] = "접수마감"
                e["status"] = "closed"
            elif diff == 0:
                e["dday"] = "D-Day (오늘마감)"
                e["status"] = "applying"
            else:
                e["dday"] = f"D-{diff}"
                e["status"] = "applying"
        except:
            e["dday"] = "진행중"

    combined_events.sort(key=lambda x: x["startDate"])

    festivals = [e for e in combined_events if e.get("boardType") == "festivals"]
    contests = [e for e in combined_events if e.get("boardType") == "contests"]

    # 17개 시도별 카운트 통계
    region_stats = {}
    for code, (reg_key, reg_name) in AREA_CODE_MAP.items():
        f_cnt = sum(1 for e in festivals if e["region"] == reg_key)
        c_cnt = sum(1 for e in contests if e["region"] == reg_key)
        region_stats[reg_key] = {
            "name": reg_name,
            "festivals": f_cnt,
            "contests": c_cnt,
            "total": f_cnt + c_cnt
        }

    metadata = {
        "lastUpdated": today.strftime("%Y-%m-%d"),
        "totalEvents": len(combined_events),
        "festivalsCount": len(festivals),
        "contestsCount": len(contests),
        "isTourApiIntegrated": bool(tour_api_key and tour_api_events),
        "isSeoulApiIntegrated": bool(seoul_api_key and seoul_api_events),
        "isGyeonggiApiIntegrated": bool(gg_api_key and gg_api_events),
        "scope": "전국 17개 시도 전체",
        "regionStats": region_stats,
        "sources": [
            {
                "key": "special_contest",
                "name": "공식 협회/학회 공지 크롤러 (사생·발명대회·독서토론·가족마라톤)",
                "count": sum(1 for e in combined_events if e.get("sourceType") == "special_contest")
            },
            {
                "key": "tour_api",
                "name": "한국관광공사 TourAPI 4.0 전국 축제",
                "count": sum(1 for e in combined_events if e.get("sourceType") == "tour_api")
            },
            {
                "key": "seoul_open_data",
                "name": "서울열린데이터광장 공원문화행사",
                "count": sum(1 for e in combined_events if e.get("sourceType") == "seoul_open_data")
            },
            {
                "key": "gyeonggi_data_dream",
                "name": "경기데이터드림 문화체육",
                "count": sum(1 for e in combined_events if e.get("sourceType") == "gyeonggi_data_dream")
            },
            {
                "key": "wevity_contest",
                "name": "공모전 전문 플랫폼 실시간 전국대회",
                "count": sum(1 for e in combined_events if e.get("sourceType") == "wevity_contest")
            }
        ]
    }

    output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "js", "events_data.js")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("// 전국 17개 시도 지역행사 & 대회일정 데이터셋\n")
        f.write("window.DODAM_EVENTS_METADATA = " + json.dumps(metadata, ensure_ascii=False, indent=2) + ";\n\n")
        f.write("window.DODAM_NATIONWIDE_EVENTS = " + json.dumps(combined_events, ensure_ascii=False, indent=2) + ";\n")

    print(f"js/events_data.js 생성 완료! 총 {len(combined_events)}건")
    print(f" - 전국 지역행사 (볼거리/마라톤): {len(festivals)}건")
    print(f" - 전국 대회일정 (공부/사생/독서토론): {len(contests)}건")
    print(f" - 17개 시도 전역 커버리지: {len(region_stats)}개 시도 매핑 완료")

if __name__ == "__main__":
    build()
