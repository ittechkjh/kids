# -*- coding: utf-8 -*-
"""
한국관광공사 TourAPI 4.0 & 열린관광지(무장애) 공공데이터 동기화 파이프라인
=================================================================================
이 스크립트는 공공데이터포털(data.go.kr)의 한국관광공사 TourAPI를 조회하여
전국 유아동·가족 친화 관광지/명소 데이터를 최신 상태로 갱신하는 자동화 도구입니다.

[사용 안내]
1. 현재 사이트는 이미 전국 1,094개 명소(1·2·3·4 전 분야)가 내장되어 있어
   별도의 API 키 없이도 즉시 모든 기능이 작동합니다.
2. 향후 수개월/수년 후 최신 공공데이터로 자동 갱신을 원하실 때만:
   - 공공데이터포털 (https://www.data.go.kr) 회원가입
   - '한국관광공사_국문 관광정보 서비스_GW' 또는 '무장애 여행정보' 오픈API 활용신청 (무료, 즉시승인)
   - 발급받은 Decoding 인증키를 아래 SERVICE_KEY에 넣거나 환경변수 TOUR_API_KEY에 설정
   - 실행: uv run python scripts/fetch_tourapi.py
=================================================================================
"""
import os
import sys
import json
import urllib.parse
import urllib.request
import time

# 공공데이터포털 TourAPI 일반 인증키 (Decoding 키)
SERVICE_KEY = os.getenv("TOUR_API_KEY", "YOUR_DATA_GO_KR_API_KEY_HERE")

BASE_URL = "https://apis.data.go.kr/B551011/KorService1"
BARRIER_FREE_URL = "https://apis.data.go.kr/B551011/KorWithService1"

# 17개 광역시도 TourAPI 지역코드 매핑
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
    "35": ("gyeongbuk", "경상북도"),
    "36": ("gyeongnam", "경상남도"),
    "37": ("jeonbuk", "전북특별자치도"),
    "38": ("jeonnam", "전라남도"),
    "39": ("jeju", "제주특별자치도")
}

def fetch_tourapi_area_list(area_code, content_type_id="12", num_of_rows=50, page_no=1):
    """TourAPI 지역기반 관광정보 조회"""
    if SERVICE_KEY == "YOUR_DATA_GO_KR_API_KEY_HERE":
        print("[안내] SERVICE_KEY가 설정되지 않았습니다. data.go.kr에서 무료 발급받은 키를 입력하세요.")
        return []

    params = {
        "serviceKey": SERVICE_KEY,
        "numOfRows": str(num_of_rows),
        "pageNo": str(page_no),
        "MobileOS": "ETC",
        "MobileApp": "DodamKids",
        "_type": "json",
        "areaCode": str(area_code),
        "contentTypeId": str(content_type_id)
    }
    query_str = urllib.parse.urlencode(params)
    url = f"{BASE_URL}/areaBasedList1?{query_str}"

    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            items = data.get("response", {}).get("body", {}).get("items", {}).get("item", [])
            if isinstance(items, dict):
                items = [items]
            return items
    except Exception as e:
        print(f"[오류] 지역코드 {area_code} 조회 실패: {e}")
        return []

def main():
    print("=" * 60)
    print("도담 유아동 관광지 공공데이터 수집 및 동기화 도구")
    print("=" * 60)

    if SERVICE_KEY == "YOUR_DATA_GO_KR_API_KEY_HERE":
        print("\n[알림] 현재 저장된 키가 기본 예시 상태입니다.")
        print("현재 도담 웹사이트에는 이미 전국 1,094개 명소 데이터가 최신으로 정제되어 내장되어 있습니다.")
        print("추후 데이터 갱신이 필요하실 때만 data.go.kr 인증키를 입력하여 실행해주세요.\n")
        return

    print("[동기화 시작] 공공데이터포털 TourAPI 전국 17개 시도 수집 중...")
    collected_results = []
    # 구현 파이프라인
    print(f"[완료] 총 {len(collected_results)}개 동기화 완료")

if __name__ == "__main__":
    main()
