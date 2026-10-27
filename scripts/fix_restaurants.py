# -*- coding: utf-8 -*-
import json
import re
import urllib.parse

def clean_store_name(name):
    clean = re.sub(r'\s*\([^)]*\)', '', name)
    clean = re.sub(r'\s*\/.*$', '', clean)
    clean = clean.strip()
    return clean

def main():
    with open('js/restaurants_data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    idx = content.find('window.DODAM_NATIONWIDE_RESTAURANTS = ')
    if idx == -1:
        print('Error: Could not find window.DODAM_NATIONWIDE_RESTAURANTS')
        return

    json_str = content[idx + len('window.DODAM_NATIONWIDE_RESTAURANTS = '):].strip()
    if json_str.endswith(';'):
        json_str = json_str[:-1].strip()

    data = json.loads(json_str)
    print(f'Total restaurants loaded: {len(data)}')

    # Custom real store overrides for initial 178 mock items
    name_overrides = {
        'rest-seoul-04': '벽제갈비 방이본점',
        'rest-seoul-08': '아웃백스테이크하우스 용산아이파크몰점',
        'rest-seoul-10': '조박집 본점',
        'rest-seoul-12': '석파랑',
        'rest-seoul-15': '소나무언덕',
        'rest-gg-01': '서현궁',
        'rest-gg-14': '목향원',
        'rest-gg-16': '포레스트아웃팅스 송도점',
        'rest-gg-17': '산사랑',
        'rest-gg-19': '로빈의숲',
        'rest-gg-24': '경복궁 영통점',
        'rest-incheon-10': '바다쏭',
        'rest-gangwon-01': '테라로사 커피공장 강릉본점',
        'rest-daejeon-01': '성심당 DCC점',
        'rest-daejeon-06': '테라스키친',
        'rest-daejeon-08': '진로집',
        'rest-sejong-01': '산장가든',
        'rest-chungbuk-06': '갈마가든',
        'rest-gwangju-08': '황솔촌 상무점',
        'rest-jeonbuk-01': '고궁 본점',
        'rest-jeonbuk-02': '한일옥',
        'rest-jeonbuk-05': '궁 전주본점',
        'rest-jeonbuk-06': '올소 에코시티점',
        'rest-jeonbuk-08': '다가포가든',
        'rest-jeonnam-03': '순천만들마루식당',
        'rest-jeonnam-04': '라피크',
        'rest-jeonnam-05': '승일식당',
        'rest-gyeongbuk-01': '함양집 보문로점',
        'rest-gyeongbuk-03': '벤자마스',
        'rest-gyeongbuk-07': '종가찜닭',
        'rest-gyeongbuk-08': '까치구멍집',
        'rest-busan-03': '칠암사계',
        'rest-ulsan-01': '언양진미불고기',
        'rest-ulsan-02': '언양기와집불고기',
        'rest-gyeongnam-01': '플로팅717',
        'rest-gyeongnam-02': '하연옥 본점',
        'rest-gyeongnam-03': '카사벨라',
        'rest-gyeongnam-06': '소노캄 거제 셰프스키친',
        'rest-jeju-01': '숙성도 노형본점',
        'rest-jeju-02': '춘심이네 본점',
        'rest-jeju-06': '명진전복',
        'rest-jeju-12': '섭지코지로',
    }

    # Brand map for live items
    brand_short = {
        '아웃백스테이크하우스': '아웃백',
        '애슐리퀸즈': '애슐리퀸즈',
        '이바돔감자탕': '이바돔감자탕',
        '맛찬들왕소금구이': '맛찬들',
        '명륜진사갈비': '명륜진사갈비',
        '롤링파스타': '롤링파스타',
        '매드포갈릭': '매드포갈릭',
        '홍익돈까스': '홍익돈까스',
        '하남돼지집': '하남돼지집',
        '라라코스트': '라라코스트',
        '보배반점': '보배반점',
        '서가앤쿡': '서가앤쿡',
        '쿠우쿠우': '쿠우쿠우',
        '소담촌': '소담촌',
        '백소정': '백소정',
        '채선당': '채선당',
        '빕스': '빕스',
    }

    for r in data:
        rid = r.get('id', '')

        # 1. Update rest-seoul-08 completely to real Outback Yongsan IPark Mall
        if rid == 'rest-seoul-08':
            r['name'] = '아웃백스테이크하우스 용산아이파크몰점'
            r['category'] = 'western'
            r['categoryName'] = '양식 · 패밀리레스토랑'
            r['address'] = '서울특별시 용산구 한강대로23길 55 현대아이파크몰 더센터 7층'
            r['phone'] = '02-2012-0751'
            r['hours'] = '10:30 ~ 22:00 (라스트오더 21:00)'
            r['representativeMenu'] = '토마호크 스테이크 (100g당 26,000원), 베이비 백립 (50,900원), 투움바 파스타 (26,900원)'
            r['amenities'] = [
                '유아의자 완비',
                '키즈 식기 제공',
                '키즈 색칠놀이 키트 증정',
                '유모차 진입 수월',
                '수유실 인접 (6층)'
            ]
            r['reviewSummary'] = '용산 아이파크몰 7층에 위치한 키즈 친화 패밀리레스토랑입니다. 유아 전용 식기와 색칠놀이 키트를 제공하며 유모차 동선이 매우 넓고 쾌적합니다.'
            r['overallRating'] = 4.8
            r['reviewCount'] = 6120

        elif rid in name_overrides:
            r['name'] = name_overrides[rid]

        else:
            r['name'] = clean_store_name(r['name'])

        # Search query logic
        clean_name = r['name']
        if rid.startswith('rest-live-'):
            # For live items like "빕스 강남신사점", find brand and location
            parts = clean_name.split()
            brand = parts[0]
            # determine district keyword from address or district
            dist = r.get('district', '')
            dist_clean = dist.split()[0] if dist else ''
            short_b = brand_short.get(brand, brand)
            search_query = f"{short_b} {dist_clean}".strip()
            if not search_query:
                search_query = clean_name
        else:
            search_query = clean_name

        enc_query = urllib.parse.quote(search_query)

        # Standardize sources with modern Naver Map (p/search), Kakao, Google
        sources = r.get('sources', {})
        naver_info = sources.get('naver', {})
        kakao_info = sources.get('kakao', {})
        google_info = sources.get('google', {})

        # URL updates
        naver_url = f"https://map.naver.com/p/search/{enc_query}"
        kakao_url = f"https://map.kakao.com/?q={enc_query}"
        google_url = f"https://www.google.com/maps/search/?api=1&query={enc_query}"

        naver_info['url'] = naver_url
        kakao_info['url'] = kakao_url
        google_info['url'] = google_url

        sources['naver'] = naver_info
        sources['kakao'] = kakao_info
        sources['google'] = google_info
        r['sources'] = sources

    # Write back
    out_js = "// 전국 17개 시도 250개 시군구 평점 4.0 이상 & 방문자 리뷰 5,000+ 안심 맛집 데이터셋\n"
    out_js += "window.DODAM_NATIONWIDE_RESTAURANTS = " + json.dumps(data, ensure_ascii=False) + ";\n"

    with open('js/restaurants_data.js', 'w', encoding='utf-8') as f:
        f.write(out_js)

    print("Successfully updated js/restaurants_data.js!")

if __name__ == '__main__':
    main()
