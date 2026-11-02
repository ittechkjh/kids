# -*- coding: utf-8 -*-
"""
검증 통과 안심식당(현재 ~475곳) 대상 네이버 플레이스 실시간 정보 연동
- 모바일 검색 결과 파싱:
  1) Naver Place ID
  2) 별점 (HTML 별점 태그가 있는 매장: 4.9, 4.79 등 실시간 파싱)
  3) 방문자리뷰 / 전체리뷰 수 ('2,145', '1.2만' 등 지원)
  4) 네이버 플레이스 직접 링크
- 캐시(scripts/data/verify_cache.json)에 naverId, naverRating, naverReviewCount, naverUrl 저장
"""
import json, os, random, re, time, urllib.parse, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CACHE_PATH = os.path.join(ROOT, 'scripts', 'data', 'verify_cache.json')
RAW_PATH = os.path.join(ROOT, 'scripts', 'data', 'mafra_raw.json')

UA_MOBILE = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    'Referer': 'https://m.search.naver.com/'
}

def fetch_naver_place(name, road_address):
    # 정규화된 쿼리 목록 구성
    parts = road_address.split()
    sigungu = f"{parts[0][:2]} {parts[1]}" if len(parts) > 1 else ''
    district_road = ' '.join(parts[1:3]) if len(parts) > 2 else ''
    
    queries = []
    if sigungu:
        queries.append(f"{name} {sigungu}".strip())
    if district_road and district_road != sigungu:
        queries.append(f"{name} {district_road}".strip())
    if len(parts) > 1:
        queries.append(f"{name} {parts[1]}".strip())
    queries.append(name.strip())
    
    # 중복 제거 (순서 유지)
    seen = set()
    unique_queries = [q for q in queries if q and not (q in seen or seen.add(q))]
    
    for q in unique_queries:
        u = f"https://m.search.naver.com/search.naver?query={urllib.parse.quote(q)}"
        req = urllib.request.Request(u, headers=UA_MOBILE)
        try:
            html = urllib.request.urlopen(req, timeout=7).read().decode('utf-8', 'replace')
            
            pids = re.findall(r'https?://m\.place\.naver\.com/restaurant/(\d+)', html)
            if not pids:
                continue
            pid = pids[0]
            
            # 별점
            rm = re.search(r'별점</span>\s*<span>([0-9.]+)</span>', html)
            rating = float(rm.group(1)) if rm else None
            
            # 리뷰 수 (예: 리뷰 2,145 또는 리뷰 1.2만)
            vm = re.search(r'리뷰\s*([0-9.,]+)\s*(만)?', html)
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
            
    # 매칭 실패 시 기본 검색 URL 반환
    fallback_q = f"{name} {sigungu}".strip()
    return {
        'naverId': None,
        'naverRating': None,
        'naverReviewCount': 0,
        'naverUrl': f"https://map.naver.com/p/search/{urllib.parse.quote(fallback_q)}"
    }

def main():
    if not os.path.exists(CACHE_PATH):
        print("verify_cache.json 파일이 없습니다.")
        return

    with open(CACHE_PATH, 'r', encoding='utf-8') as f:
        cache = json.load(f)

    # 검증 통과 후보 (평점 4.0+ 또는 리뷰 많은 곳)
    targets = []
    for sid, v in cache.items():
        if v.get('status') != 'verified':
            continue
        n = v.get('ratingCount') or 0
        b = v.get('blogReviewCount') or 0
        r = v.get('rating') or 0
        if (r >= 4.0 and n >= 20) or (n + b >= 1000):
            targets.append((sid, v))

    print(f"기준 통과 대상 업소: {len(targets)}곳")
    
    updated_cnt = 0
    star_found = 0
    
    for i, (sid, v) in enumerate(targets, 1):
        if v.get('naverId') and v.get('naverRating') is not None:
            continue
            
        name = v.get('placeName')
        addr = v.get('roadAddress') or ''
        
        info = fetch_naver_place(name, addr)
        v.update(info)
        updated_cnt += 1
        if info.get('naverRating'):
            star_found += 1
            
        print(f"[{i}/{len(targets)}] {name} -> 네이버 ID: {info.get('naverId')} | 별점: {info.get('naverRating')} | 리뷰: {info.get('naverReviewCount')}건")
        
        if updated_cnt % 20 == 0:
            with open(CACHE_PATH, 'w', encoding='utf-8') as f:
                json.dump(cache, f, ensure_ascii=False)
            print(f"  ... 캐시 중간 저장 완료 ({updated_cnt}건 처리)")
            
        time.sleep(random.uniform(0.4, 0.8))

    with open(CACHE_PATH, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False)
        
    print(f"\n최종 완료! 업데이트: {updated_cnt}건, 네이버 별점 발굴: {star_found}건")

if __name__ == '__main__':
    main()
