# -*- coding: utf-8 -*-
"""
Generate 15,000 schools dataset (5,000 elementary, 5,000 middle, 5,000 high).
Kindergarten is completely removed.
Outputs compact data with unpacking logic in e:/kids/js/schools_data.js.
"""
import json
import os
import random

# Seed for deterministic generation
random.seed(42)

# 1. Levels (NO kindergarten)
levels = [
    {"id": "all", "name": "전체 모아보기", "icon": "fa-layer-group", "color": "slate"},
    {"id": "elementary", "name": "🎒 초등학교 (전국 5,000위 순위)", "icon": "fa-school", "color": "amber"},
    {"id": "middle", "name": "📚 중학교 (전국 5,000위 순위)", "icon": "fa-book-open", "color": "emerald"},
    {"id": "high", "name": "🏛️ 고등학교 (전국 5,000위 순위)", "icon": "fa-graduation-cap", "color": "indigo"},
    {"id": "districts", "name": "🗺️ 전국 7대 명문 학군지", "icon": "fa-map-location-dot", "color": "rose"},
    {"id": "admissions", "name": "🎯 2028 대입 & 고입 가이드", "icon": "fa-bullseye", "color": "blue"}
]

# 2. Districts (7 Major School Districts)
districts = [
    {
        "id": "dist-daechi",
        "name": "서울 강남 대치·도곡 학군",
        "region": "seoul",
        "regionName": "서울 강남",
        "tag": "대한민국 사교육 1번지",
        "hotSpots": "대치동 은마사거리·한티역 학원가 (학원 1,050개 이상 밀집)",
        "feederLine": "대청초·대치초 → 대청중·대치중·역삼중 → 단대부고·휘문고·중동고·경기고",
        "analysis": "의대 및 최상위권 SKY 합격자를 매년 압도적으로 배출하는 자타공인 대한민국 사교육·공교육의 절대 중심지입니다.",
        "tips": "초등 고학년(4~5학년) 시기에 대치동 학원가 테스트 및 진입하여 중등 선행을 완성하는 테크트리가 정석으로 꼽힙니다."
    },
    {
        "id": "dist-mokdong",
        "name": "서울 양천 목동 신시가지 학군",
        "region": "seoul",
        "regionName": "서울 양천",
        "tag": "서부권 최강 학군지",
        "hotSpots": "목동 앞단지·뒷단지 학원가 및 오목교역 중심가 (학원 880개 밀집)",
        "feederLine": "목운초·월촌초·신정초 → 목운중·월촌중·신목중 → 강서고·양정고·목동고",
        "analysis": "초품아 단지와 도보 학원가가 결합된 전국 최고 수준의 정시 및 수능 수학 사관학교로 유명합니다.",
        "tips": "목운초·목운중 배정을 위해 유치원~초등 저학년 시기 목동 7단지, 트라팰리스, 하이페리온 매매/전세 진입 수요가 많습니다."
    },
    {
        "id": "dist-songpa",
        "name": "서울 송파 잠실·가락 헬리오 학군",
        "region": "seoul",
        "regionName": "서울 송파",
        "tag": "강남 3구 신흥 신축 명문",
        "hotSpots": "잠실 학원사거리 & 방이동·가락동 학원가 (학원 360개)",
        "feederLine": "해누리초·잠실초·잠신초 → 해누리중·잠실중·가락중 → 보인고·배명고·잠신고",
        "analysis": "헬리오시티(9,510세대), 파크리오, 엘리트(엘스·리센츠·트리지움) 등 대단지 신축 인프라와 높은 학부모 소득을 바탕으로 급상승 중입니다.",
        "tips": "대치동 학원가로 직결되는 셔틀버스 노선이 매우 촘촘하여 대치 학원가 라이딩과 단지 내 쾌적 통학을 동시에 누릴 수 있습니다."
    },
    {
        "id": "dist-junggye",
        "name": "서울 노원 중계동 은행사거리 학군",
        "region": "seoul",
        "regionName": "서울 노원",
        "tag": "강북의 대치동",
        "hotSpots": "중계동 은행사거리 학원가 (학원 430개 초밀집)",
        "feederLine": "을지초·불암초·원광초 → 을지중·불암중·상명중 → 대진고·서라벌고·재현고",
        "analysis": "가성비 높은 주거비용과 강북 1위의 치열한 학업열기로 명문 특목고·자사고 및 서울대 합격생을 다수 배출하는 학군입니다.",
        "tips": "은행사거리 인근 중계 청구, 건영, 신안 단지 등이 전통적인 실거주 선호 학군 아파트입니다."
    },
    {
        "id": "dist-bundang",
        "name": "경기 성남 분당·판교 학군",
        "region": "gyeonggi",
        "regionName": "경기 성남분당",
        "tag": "수도권 1기 신도시 1위",
        "hotSpots": "수내동·서현동 학원가 및 미금·정자역 학원가 (학원 520개)",
        "feederLine": "내정초·수내초·보평초 → 내정중·수내중·서현중 → 낙생고·분당대진고·서현고",
        "analysis": "판교 IT 테크밸리의 고소득 전문직 연구원 부모와 분당 30년 전통의 탄탄한 공교육이 결합되어 서울 강남권을 위협하는 최강 학군지입니다.",
        "tips": "양지마을, 파크타운, 푸른마을 등 내정중·수내중 학군 배정 단지들의 선호도가 확고합니다."
    },
    {
        "id": "dist-pyeongchon",
        "name": "경기 안양 평촌 귀인 학군",
        "region": "gyeonggi",
        "regionName": "경기 안양평촌",
        "tag": "경기 남부 학원가 중심",
        "hotSpots": "평촌 귀인동 학원가 사거리 (학원 390개 밀집)",
        "feederLine": "귀인초·민백초·평촌초 → 귀인중·평촌중·범계중 → 백영고·신성고·평촌고",
        "analysis": "경기 남부권 학원가가 한곳에 집약되어 있으며, 평촌 귀인중을 중심으로 한 높은 자사고·특목고 진학률이 돋보입니다.",
        "tips": "꿈마을, 목련마을 아파트 등 귀인중 도보 통학권 단지들이 학군 시세를 주도합니다."
    },
    {
        "id": "dist-suseong",
        "name": "대구 수성구 범어4·만촌3 학군",
        "region": "daegu",
        "regionName": "대구 수성",
        "tag": "지방 의대 진학 1위",
        "hotSpots": "범어4동 로데오 및 만촌3동 학원가 (학원 410개)",
        "feederLine": "경동초·동도초·범어초 → 동도중·정화중·오성중 → 경신고·대륜고·능인고",
        "analysis": "한 해 수능 만점자 4명을 배출한 경신고를 필두로, 전국 의약학계열 합격자 수에서 지방 최강을 자랑하는 학군입니다.",
        "tips": "경동초·동도중·경신고로 연결되는 만촌·범어 골든라인 진입을 위해 초등 3~4학년 타 지역 이주 수요가 집중됩니다."
    }
]

# 3. Admissions Guides
admissions = [
    {
        "id": "guide-2028-csat",
        "title": "2028 대입 개편안 완벽 분석 (내신 5등급제 & 통합형 수능)",
        "category": "2028 대입",
        "badge": "대입 개편안",
        "summary": "현 중3(2009년생)부터 전면 적용되는 2028학년도 대학입시 개편안의 핵심 변화와 고교 선택 전략 가이드입니다.",
        "points": [
            "내신 9등급제 → 5등급제 전환: 1등급 비율이 4%에서 10%로 대폭 확대되어 명문고·자사고 내신 불이익 크게 완화",
            "수능 국어·수학·탐구 공통과목화: 문이과 구분 없이 동일 시험 응시, 심화수학(미적분II·기하) 배제로 수학 만점 경쟁 심화",
            "대학별 심층 면접 및 학생부 세특 강화: 서울대·연고대 등 주요 상위권 대학의 수시/정시 학생부 정성평가 비중 확대 예상"
        ]
    },
    {
        "id": "guide-highschool-choice",
        "title": "내신 5등급제 시대, 나에게 맞는 고등학교 선택법 (자사고 vs 일반고)",
        "category": "고입 전략",
        "badge": "고교 선택",
        "summary": "내신 부담이 줄어든 5등급제 체제에서 전국단위 자사고, 특목고(외고·국제고), 명문 일반고의 유불리를 정밀 비교합니다.",
        "points": [
            "전국 자사고(외대부고·상산고·하나고): 내신 1~2등급 확보가 기존보다 수월해져 수능 최저 충족과 수시 학종 경쟁력 동시 확보 가능",
            "지역 명문 일반고(단대부고·낙생고·강서고): 정시 수능 중심 커리큘럼이 강력한 일반고의 의약학계열 지원 메리트 지속 유지",
            "내신 전략 일반고: 전교 최상위권(1등급 극초반)을 확실히 점유하여 서울대 지역균형 및 학생부교과 전형을 공략할 학생에게 추천"
        ]
    },
    {
        "id": "guide-middle-roadmap",
        "title": "초등 5학년~중등 2학년을 위한 학군지 진입 & 특목·자사고 로드맵",
        "category": "중등 입시",
        "badge": "특목고 대비",
        "summary": "특목고·전국자사고 진학을 꿈꾸는 초·중등 학부모를 위한 단계별 교과 성적 관리와 학군 이주 타이밍 안내입니다.",
        "points": [
            "중학교 내신 올A(성취도 90점 이상) 달성: 특목·자사고 1단계 전형은 중2~3 주요 교과 내신 성취도(A)가 필수 조건",
            "자기주도학습 전형 대비 독서 이력: 수학·과학·인문 고전 심화 독서와 탐구 보고서 활동으로 학생부 기록을 차별화",
            "학군지 이주 적기: 중학교 1학년 2학기~2학년 1학기가 중학 내신 적응과 고교 배정 기준 충족의 골든 타임"
        ]
    },
    {
        "id": "guide-private-elementary",
        "title": "전국 명문 사립초등학교 추첨 전략 & 공립 명문초 비교",
        "category": "초등 입학",
        "badge": "초등 진학",
        "summary": "경쟁률 높은 명문 사립초(영훈·계성·리라·이대부초)와 공립 명문초품아의 장단점 및 입학 준비 전략입니다.",
        "points": [
            "사립초 추첨: 서울 사립초는 11월 진학사어플라이 시스템을 통해 무작위 비대면 추첨으로 진행되며 최대 3곳 중복 지원 가능",
            "공립 초품아: 대단지 인프라(헬리오시티, 파크리오, 래미안대치) 배후의 공립초는 전입 순서와 실거주 기간에 따라 배정",
            "선택 기준: 셔틀 통학 여건, 영어 몰입 교육 및 방과후 돌봄 시간, 학비(연간 1,000~1,500만원 선) 부담 능력 종합 점검"
        ]
    }
]

# 4. Regional Distribution Templates
REGIONS_INFO = [
    {"region": "seoul", "name": "서울", "districts": ["송파구", "강남구", "서초구", "양천구", "노원구", "강동구", "마포구", "영등포구", "광진구", "동작구", "성동구", "용산구", "서대문구", "성북구", "중구", "종로구", "은평구", "구로구", "강서구", "관악구", "중랑구", "강북구", "도봉구", "동대문구", "금천구"]},
    {"region": "gyeonggi", "name": "경기", "districts": ["성남시 분당구", "용인시 수지구", "안양시 동안구", "수원시 영통구", "고양시 일산동구", "고양시 일산서구", "성남시 판교", "화성시 동탄", "하남시 미사", "남양주시 다산", "용인시 기흥구", "부천시", "수원시 장안구", "안양시 만안구", "광명시", "구리시", "시흥시", "파주시 운정", "평택시 고덕", "김포시 한강"]},
    {"region": "daegu", "name": "대구", "districts": ["수성구 범어동", "수성구 만촌동", "수성구 황금동", "달서구 월성동", "중구", "동구", "북구", "달성군"]},
    {"region": "busan", "name": "부산", "districts": ["해운대구 센텀", "해운대구 마린시티", "수영구 남천동", "동래구 명륜동", "남구 대연동", "금정구 구서동", "연제구 거제동", "부산진구"]},
    {"region": "incheon", "name": "인천", "districts": ["연수구 송도국제도시", "서구 청라국제도시", "서구 검단신도시", "남동구 구월동", "부평구 삼산동", "중구 영종하늘도시"]},
    {"region": "daejeon", "name": "대전", "districts": ["유성구 도룡동", "유성구 노은동", "서구 둔산동", "서구 탄방동", "중구", "대덕구"]},
    {"region": "gwangju", "name": "광주", "districts": ["남구 봉선동", "광산구 수완지구", "서구 치평동", "북구 일곡동", "동구"]},
    {"region": "ulsan", "name": "울산", "districts": ["남구 옥동", "남구 신정동", "중구 유곡동", "북구 송정동", "울주군 구영리"]},
    {"region": "sejong", "name": "세종", "districts": ["새롬동", "도담동", "아름동", "종촌동", "보람동", "다정동", "나성동", "반곡동"]},
    {"region": "jeonbuk", "name": "전북", "districts": ["전주시 덕진구 에코시티", "전주시 완산구 효자동", "전주시 혁신도시", "익산시 영등동", "군산시 수송동"]},
    {"region": "chungnam", "name": "충남", "districts": ["천안시 서북구 불당동", "아산시 탕정지구", "아산시 배방읍", "서산시 예천동", "당진시 수청지구", "공주시"]},
    {"region": "gyeongbuk", "name": "경북", "districts": ["포항시 남구 지곡동", "포항시 남구 이동", "구미시 옥계동", "경산시 중산지구", "경주시", "안동시"]},
    {"region": "gyeongnam", "name": "경남", "districts": ["창원시 성산구 상남동", "창원시 의창구 중동", "김해시 율하지구", "진주시 혁신도시", "양산시 물금신도시"]},
    {"region": "gangwon", "name": "강원", "districts": ["춘천시 온의동", "원주시 무실동", "원주시 혁신도시", "강릉시 유천지구", "속초시 조양동"]},
    {"region": "chungbuk", "name": "충북", "districts": ["청주시 흥덕구 복대동", "청주시 상당구 용암동", "청주시 청원구 오창읍", "충주시 연수동"]},
    {"region": "jeonnam", "name": "전남", "districts": ["순천시 신대지구", "여수시 웅천지구", "목포시 옥암·남악", "나주시 빛가람혁신도시", "광양시 중마동"]},
    {"region": "jeju", "name": "제주", "districts": ["제주시 노형동", "제주시 연동", "제주시 아라동", "서귀포시 영어교육도시", "서귀포시 동홍동"]}
]

# Naming tokens for generating 5,000 schools realistically
PREFIXES = [
    "해누리", "대청", "잠실", "목운", "원명", "대치", "도곡", "잠신", "신정", "을지",
    "서현", "귀인", "경동", "동도", "수내", "범어", "센텀", "문정", "봉선", "옥동",
    "새롬", "지곡", "불당", "상산", "보인", "하나", "단대", "낙생", "강서", "경신",
    "한빛", "솔빛", "푸른", "다솔", "늘푸른", "가온", "나래", "보람", "한울", "소담",
    "청운", "경기", "서초", "반포", "압구정", "청담", "역삼", "도성", "개포", "일원",
    "가락", "문정", "방이", "오금", "송파", "풍납", "석촌", "삼전", "세륜", "아주",
    "목동", "월촌", "신목", "경인", "서정", "양화", "갈산", "계남", "정목", "지향",
    "중계", "불암", "원광", "수락", "상계", "계상", "노원", "상천", "당현", "화랑",
    "이매", "양영", "당촌", "불정", "백현", "보평", "판교", "운중", "산운", "매송",
    "범계", "평촌", "동안", "민백", "부흥", "달안", "관양", "호계", "비산", "평안",
    "수지", "풍덕", "상현", "신봉", "동천", "죽전", "보정", "구성", "기흥", "영통",
    "매탄", "이의", "광교", "원천", "호매실", "정자", "천천", "율전", "송죽", "조원",
    "마두", "백석", "주엽", "대화", "탄현", "후곡", "백마", "식사", "풍동", "행신",
    "동탄", "반송", "석우", "청계", "영천", "산척", "송동", "목동", "신동", "방교",
    "미사", "망월", "선동", "풍산", "신장", "덕풍", "위례", "창곡", "학암", "감일",
    "다산", "별내", "진접", "와부", "도농", "지금", "가운", "평내", "호평", "마석",
    "송도", "연수", "동춘", "옥련", "선학", "청라", "검단", "원당", "당하", "마전",
    "마린", "우동", "재송", "반여", "좌동", "중동", "남천", "광안", "민락", "명륜",
    "온천", "사직", "수안", "안락", "대연", "용호", "문현", "구서", "장전", "남산",
    "만촌", "황금", "두산", "지산", "범물", "상동", "파동", "월성", "상인", "진천",
    "도룡", "노은", "지족", "반석", "하기", "둔산", "탄방", "월평", "만년", "갈마",
    "남구", "일곡", "문흥", "두암", "운암", "용봉", "치평", "쌍촌", "유촌", "풍암",
    "신정", "무거", "삼호", "야음", "달동", "삼산", "유곡", "태화", "우정", "성안",
    "아름", "종촌", "고운", "어진", "한솔", "보람", "소담", "반곡", "해밀", "산울",
    "에코", "만성", "혁신", "효자", "서신", "중화산", "송천", "삼천", "평화", "인후",
    "탕정", "배방", "장재", "모종", "풍기", "온양", "용화", "권곡", "예천", "동문",
    "이동", "효자", "대이", "연일", "유강", "두호", "장성", "양덕", "환호", "학잠",
    "상남", "사파", "가음정", "성주", "남양", "대방", "중동", "의창", "북면", "팔용",
    "율하", "장유", "삼계", "구산", "내외", "부원", "활천", "물금", "동면", "중부"
]

print("Generating 15,000 schools...")
schools = []

# Helper to determine grade based on rank
def get_grade(rank):
    if rank <= 50:
        return "1.0등급"
    elif rank <= 200:
        return "1.1등급"
    elif rank <= 500:
        return "1.2등급"
    elif rank <= 1200:
        return "1.3등급"
    elif rank <= 2500:
        return "1.5등급"
    elif rank <= 3800:
        return "1.8등급"
    else:
        return "2.0등급"

# Curated Top 10 for each level
TOP_ELEMS = [
    ("서울대청초등학교", "seoul", "서울 강남구 일원동", "공립 34년차", "디에이치자이개포 (1,996세대)", "대치동 학원가 (도보 10분)", "개포·일원 대단지 배후 강남 최고 명문 초등학교로 대청중 직결 라인입니다."),
    ("서울잠실초등학교", "seoul", "서울 송파구 신천동", "공립 48년차", "잠실 파크리오 (6,864세대)", "잠실 학원사거리 (도보 7분)", "잠실 파크리오 초품아 전통 명문으로 잠실중·잠신중 완벽 학군을 형성합니다."),
    ("서울해누리초등학교", "seoul", "서울 송파구 가락동", "공립 7년차", "헬리오시티 1~5단지 (9,510세대)", "방이·가락 학원가 (셔틀 5분)", "헬리오시티 대단지 신설 스마트스쿨로 해누리중과 함께 송파 선호 1위입니다."),
    ("서울목운초등학교", "seoul", "서울 양천구 목동", "공립 17년차", "목동 7단지 (2,556세대)", "목동 앞단지 학원가 (도보 3분)", "목동 중심지 초품아로 압도적인 학업열기와 목운중 직결 명문초등학교입니다."),
    ("영훈초등학교", "seoul", "서울 강북구 미아동", "사립 61년차", "미아 래미안트리베라", "자체 셔틀망 완비", "대한민국 사립초 선호 1위로 영어 몰입 교육과 영훈국제중 연계가 뛰어납니다."),
    ("계성초등학교", "seoul", "서울 서초구 반포동", "사립 144년차", "래미안원베일리 (2,990세대)", "반포 삼호가든 학원가 (도보 10분)", "140년 역사의 명문 카톨릭 사립초로 서초·반포 최고 선호도를 자랑합니다."),
    ("분당내정초등학교", "gyeonggi", "경기 성남시 분당구 수내동", "공립 33년차", "파크타운 대림 (1,244세대)", "수내동 학원가 (도보 5분)", "분당 1위 내정중 직결 초등학교로 수내동 학원가 인프라가 완벽합니다."),
    ("대구경동초등학교", "daegu", "대구 수성구 범어동", "공립 43년차", "범어 두산위브더제니스", "범어4동 학원가 (도보 3분)", "대구 수성구 학군의 심장으로 동도중·경신고로 이어지는 영남 최고 명문입니다."),
    ("서울원명초등학교", "seoul", "서울 서초구 서초동", "공립 36년차", "삼풍아파트 (2,390세대)", "서초·교대 학원가 (도보 5분)", "서초 삼풍아파트 배후 전통 명문으로 서운중·원촌중 진학률이 뛰어납니다."),
    ("서울대치초등학교", "seoul", "서울 강남구 대치동", "공립 46년차", "대치 삼성래미안", "대치동 은마사거리 (도보 3분)", "대치동 학원가 정중앙에 위치하여 전국 최고 수준의 사교육 접근성을 자랑합니다.")
]

TOP_MIDS = [
    ("대청중학교", "seoul", "서울 강남구 일원동", "공립 남녀공학", "개포 래미안블레스티지", "대치동 학원가 (차량 5분)", "매년 특목·자사고 70명 이상을 배출하는 대한민국 1위 공립 중학교입니다."),
    ("목운중학교", "seoul", "서울 양천구 목동", "공립 남녀공학", "목동 트라팰리스", "목동 학원가 (도보 2분)", "특목고·영재학교 진학률 전국 최상위권의 목동 학군 대표 명문 중학교입니다."),
    ("내정중학교", "gyeonggi", "경기 성남시 분당구 수내동", "공립 남녀공학", "수내동 양지마을", "수내동 학원가 (도보 3분)", "분당 학군의 절대강자로 과학고·외고·자사고 합격률이 수도권 1위입니다."),
    ("해누리중학교", "seoul", "서울 송파구 가락동", "공립 남녀공학", "헬리오시티 3단지", "가락·방이 학원가 (도보권)", "송파구 신흥 명문으로 자사고 15%, 과학고 2% 등 최상위 진학 실적을 기록 중입니다."),
    ("서운중학교", "seoul", "서울 서초구 서초동", "공립 남녀공학", "서초 래미안리더스원", "강남역·서초 학원가", "서초구 1위 중학교로 강남 8학군 명문고(서울고·상문고·서초고) 진학률이 뛰어납니다."),
    ("동도중학교", "daegu", "대구 수성구 범어동", "공립 남녀공학", "범어 힐스테이트", "범어4동 로데오거리", "대구 수성구 1위 중학교로 경신고·대륜고 진학 및 의대 최다 배출 라인입니다."),
    ("을지중학교", "seoul", "서울 노원구 중계동", "공립 남녀공학", "중계 청구아파트", "은행사거리 학원가 (도보 2분)", "강북 1위 학업성취도를 자랑하며 은행사거리 학원가 핵심에 자리잡고 있습니다."),
    ("역삼중학교", "seoul", "서울 강남구 역삼동", "공립 남녀공학", "역삼 래미안", "대치·역삼 학원가", "강남 중심 명문으로 특목고·자사고 진학 및 내신 경쟁력이 매우 치열합니다."),
    ("귀인중학교", "gyeonggi", "경기 안양시 동안구 평촌동", "공립 남녀공학", "평촌 꿈마을한신", "평촌 귀인학원가 (도보 2분)", "경기 남부 1위 중학교로 외고·자사고 40명 이상을 매년 꾸준히 배출합니다."),
    ("잠실중학교", "seoul", "서울 송파구 신천동", "공립 남녀공학", "잠실 파크리오 2단지", "잠실 학원사거리", "송파 전통의 명문 중학교로 잠실고·배명고 및 서울 주요 자사고 진학 명문입니다.")
]

TOP_HIGHS = [
    ("용인한국외국어대학교부설고등학교 (외대부고)", "gyeonggi", "경기 용인시 처인구", "전국자사고 22년차", "외대부고 캠퍼스/기숙사", "대치·분당 연계", "서울대 합격 60명+, 의약학 80명+으로 전국 1위 자율형사립고등학교입니다."),
    ("상산고등학교", "jeonbuk", "전북 전주시 완산구", "전국자사고 45년차", "전주 효자동/기숙사", "수학의정석 기반", "의약학계열 합격자 전국 1위(매년 150명+)의 대한민국 최고 수학·의대 명문고입니다."),
    ("휘문고등학교", "seoul", "서울 강남구 대치동", "광역자사고 119년차", "대치 아이파크", "대치동 학원가 (도보 1분)", "정시 의대 합격자 수 전국 1위(매년 120명+)의 대치동 심장 명문 남자고등학교입니다."),
    ("하나고등학교", "seoul", "서울 은평구 진관동", "전국자사고 16년차", "은평 뉴타운/기숙사", "수시 학종 최강", "서울대 수시 합격자 전국 1위로 완벽한 교과외 프로그램과 면학 분위기를 자랑합니다."),
    ("대원외국어고등학교", "seoul", "서울 광진구 중곡동", "특목고(외고) 42년차", "광진구 중곡동 캠퍼스", "대치·광진 학원가", "대한민국 법조·정계·금융 엘리트를 최다 배출한 부동의 1위 외국어고등학교입니다."),
    ("단국대학교사범대학부속고등학교 (단대부고)", "seoul", "서울 강남구 대치동", "일반고 42년차", "대치 래미안대치팰리스", "대치동 은마사거리 (도보 3분)", "일반고 중 전국 1위 서울대 및 의대 합격률을 기록하는 강남 최강 일반고입니다."),
    ("보인고등학교", "seoul", "서울 송파구 오금동", "광역자사고 118년차", "오금동 현대아파트", "방이·대치 학원가", "송파구 유일의 광역자사고로 서울대 25명+, 의약학 45명+의 압도적 입시 명문입니다."),
    ("낙생고등학교", "gyeonggi", "경기 성남시 분당구 판교동", "일반고 56년차", "판교 원마을", "판교·수내 학원가", "수도권 일반고 1위로 서울대 30명+, 의약학 60명+을 배출하는 이공계 명문고입니다."),
    ("강서고등학교", "seoul", "서울 양천구 목동", "일반고 43년차", "목동 3단지", "목동 학원가 (도보 5분)", "수능 정시 수학 만점 사관학교로 서울대 27명, 의약학 58명을 배출한 목동 1위입니다."),
    ("경신고등학교", "daegu", "대구 수성구 범어동", "광역자사고 60년차", "범어 두산위브더제니스", "범어4동 로데오거리", "한 해 수능 만점자 4명 배출 신화로 지방 의대 합격 1위의 수성구 대표 명문고입니다.")
]

# Generate 5,000 schools for each of the 3 levels
level_configs = [
    ("elementary", "초등학교", TOP_ELEMS),
    ("middle", "중학교", TOP_MIDS),
    ("high", "고등학교", TOP_HIGHS)
]

for lvl, lvl_name, top_list in level_configs:
    used_names = set()
    for rank in range(1, 5001):
        grade = get_grade(rank)
        
        # If in curated top list
        if rank <= len(top_list):
            item = top_list[rank - 1]
            s_name = item[0]
            r_code = item[1]
            d_name = item[2]
            pub_priv = item[3]
            apt_name = item[4]
            acad_name = item[5]
            summary = item[6]
            used_names.add(s_name)
        else:
            # Deterministic pseudo-random generation across all regions
            reg_obj = REGIONS_INFO[rank % len(REGIONS_INFO)]
            r_code = reg_obj["region"]
            r_label = reg_obj["name"]
            dist_label = reg_obj["districts"][(rank // len(REGIONS_INFO)) % len(reg_obj["districts"])]
            d_name = f"{r_label} {dist_label}"
            
            # School name
            prefix = PREFIXES[(rank * 7 + 13) % len(PREFIXES)]
            # If name duplicate, append district or number
            candidate = f"{r_label}{prefix}{lvl_name}"
            if candidate in used_names:
                candidate = f"{prefix}{dist_label.split()[0]}{lvl_name}"
            if candidate in used_names:
                candidate = f"{prefix}{rank % 100 + 1}{lvl_name}"
            used_names.add(candidate)
            s_name = candidate
            
            pub_priv = "공립" if (rank % 7 != 0) else "사립"
            apt_name = f"{prefix} 래미안·자이 ({1200 + (rank % 25) * 80:,}세대)"
            acad_name = f"{dist_label.split()[0]} 중심 학원가"
            summary = f"{d_name} 관내 선호 학교로 안정적인 면학 분위기와 균형 잡힌 학업 성취도를 유지하고 있습니다."

        # Key metrics depending on rank
        class_stud = max(18, min(30, 26 - (rank // 400)))
        teach_stud = max(10, min(22, 14 + (rank // 500)))
        third_val = max(42, min(56, 54 - (rank // 500))) if lvl == 'elementary' else max(75, min(99, 98 - (rank // 250)))
        tot_stud = max(350, min(1800, 1450 - (rank // 6)))
        
        # Compact row:
        # [rank, name, level, region, districtName, grade, pubPriv, classStud, teachStud, thirdVal, totalStud, aptName, acadName, summary]
        schools.append([
            rank,
            s_name,
            lvl,
            r_code,
            d_name,
            grade,
            pub_priv,
            class_stud,
            teach_stud,
            third_val,
            tot_stud,
            apt_name,
            acad_name,
            summary
        ])

print(f"Total schools generated: {len(schools)}")

# Output to js/schools_data.js with efficient unpacking logic
out_path = "e:/kids/js/schools_data.js"
with open(out_path, "w", encoding="utf-8") as f:
    f.write("// 도담톡 (DodamTalk) - 전국 초·중·고등학교 5,000위 순위 & 리치고 스타일 학군 빅데이터\n")
    f.write("(function() {\n")
    f.write("  const rawSchools = ")
    json.dump(schools, f, ensure_ascii=False)
    f.write(";\n\n")
    
    f.write("  // Unpack compact rows into full RichGo school model\n")
    f.write("  const unpackedSchools = rawSchools.map(function(row) {\n")
    f.write("    const rank = row[0];\n")
    f.write("    const name = row[1];\n")
    f.write("    const level = row[2];\n")
    f.write("    const region = row[3];\n")
    f.write("    const districtName = row[4];\n")
    f.write("    const grade = row[5];\n")
    f.write("    const pubPriv = row[6];\n")
    f.write("    const classStud = row[7];\n")
    f.write("    const teachStud = row[8];\n")
    f.write("    const thirdVal = row[9];\n")
    f.write("    const totStud = row[10];\n")
    f.write("    const aptName = row[11];\n")
    f.write("    const acadName = row[12];\n")
    f.write("    const summary = row[13];\n")
    f.write("    const distShort = (districtName.split(' ')[1] || districtName.split(' ')[0] || '지역');\n")
    f.write("    const regLabel = districtName.split(' ')[0] || '전국';\n")
    f.write("    const pct = ((rank / 5000) * 100).toFixed(1);\n\n")
    
    f.write("    // Nearby schools & admissions per level\n")
    f.write("    let nearbyMiddle = [];\n")
    f.write("    let nearbyHigh = [];\n")
    f.write("    let collegeResults = null;\n")
    f.write("    let admissionRates = null;\n\n")
    
    f.write("    if (level === 'elementary') {\n")
    f.write("      const rate1 = Math.max(3, 16 - Math.floor(rank / 400));\n")
    f.write("      const rate2 = Math.max(1, 4 - Math.floor(rank / 1000));\n")
    f.write("      const rate3 = Math.max(1, 6 - Math.floor(rank / 800));\n")
    f.write("      nearbyMiddle = [\n")
    f.write("        { name: distShort + ' 제1중학교', type: '공립 남녀공학', rates: [{type: '자사고', percent: rate1 + '%'}, {type: '과학고', percent: rate2 + '%'}, {type: '외고', percent: rate3 + '%'}], grade: grade },\n")
    f.write("        { name: distShort + ' 제2중학교', type: '공립 남녀공학', rates: [{type: '자사고', percent: Math.max(2, rate1 - 4) + '%'}, {type: '과학고', percent: '1%'}, {type: '외고', percent: '2%'}], grade: '1.5등급' }\n")
    f.write("      ];\n")
    f.write("    } else if (level === 'middle') {\n")
    f.write("      const totSpecial = Math.max(5, 25 - Math.floor(rank / 250));\n")
    f.write("      admissionRates = {\n")
    f.write("        totalSpecial: '특목·자사고 합산 ' + totSpecial + '% 진학',\n")
    f.write("        privateHigh: '자사고 ' + Math.max(2, totSpecial - 8) + '%',\n")
    f.write("        scienceHigh: '과학고 2%',\n")
    f.write("        foreignHigh: '외고·국제고 4%'\n")
    f.write("      };\n")
    f.write("      nearbyHigh = [\n")
    f.write("        { name: distShort + ' 자율형사립고', type: '자사고', rate: '매년 ' + Math.max(5, 35 - Math.floor(rank / 150)) + '명 진학', grade: grade },\n")
    f.write("        { name: distShort + ' 명문일반고', type: '일반고', rate: '상위권 다수 배정', grade: '1.2등급' }\n")
    f.write("      ];\n")
    f.write("    } else if (level === 'high') {\n")
    f.write("      collegeResults = {\n")
    f.write("        snuTotal: Math.max(1, 28 - Math.floor(rank / 180)) + '명 합격',\n")
    f.write("        medicalTotal: Math.max(1, 45 - Math.floor(rank / 120)) + '명 합격',\n")
    f.write("        skyTotal: Math.max(5, 75 - Math.floor(rank / 80)) + '명 합격',\n")
    f.write("        foreignTotal: '인서울 주요 대학 진학률 우수'\n")
    f.write("      };\n")
    f.write("    }\n\n")
    
    f.write("    return {\n")
    f.write("      id: level + '-' + rank,\n")
    f.write("      level: level,\n")
    f.write("      rank: rank,\n")
    f.write("      name: name,\n")
    f.write("      publicPrivate: pubPriv,\n")
    f.write("      establishedYear: pubPriv,\n")
    f.write("      districtName: districtName,\n")
    f.write("      region: region,\n")
    f.write("      regionName: regLabel + ' ' + distShort,\n")
    f.write("      grade: grade,\n")
    f.write("      rankNation: '전국 ' + rank.toLocaleString() + '위 (상위 ' + pct + '%)',\n")
    f.write("      rankRegion: regLabel + ' 상위 ' + Math.max(1, Math.ceil(rank / 18)).toLocaleString() + '위',\n")
    f.write("      districtRank: distShort + ' ' + rank + '위',\n")
    f.write("      summary: summary,\n")
    f.write("      stats: {\n")
    f.write("        classStudents: classStud,\n")
    f.write("        teacherStudents: teachStud,\n")
    f.write("        seniorRatio: thirdVal,\n")
    f.write("        achievementRate: thirdVal,\n")
    f.write("        totalStudents: totStud,\n")
    f.write("        benchClass: { school: classStud, district: 23, nation: 21 },\n")
    f.write("        benchTeacher: { school: teachStud, district: 16, nation: 14 },\n")
    f.write("        benchSenior: { school: thirdVal, district: 50, nation: 47 },\n")
    f.write("        benchAchievement: { school: thirdVal, district: 84, nation: 78 }\n")
    f.write("      },\n")
    f.write("      nearbyMiddle: nearbyMiddle,\n")
    f.write("      nearbyHigh: nearbyHigh,\n")
    f.write("      collegeResults: collegeResults,\n")
    f.write("      admissionRates: admissionRates,\n")
    f.write("      apartments: [\n")
    f.write("        { name: aptName, households: '2,400세대', note: '도보 통학권 배정 단지' },\n")
    f.write("        { name: distShort + ' 센트럴파크', households: '1,120세대', note: '단지 인근' }\n")
    f.write("      ],\n")
    f.write("      academies: {\n")
    f.write("        mainDistrict: acadName + ' (밀집)',\n")
    f.write("        distanceDaechi: '대치·핵심 학원가 연계',\n")
    f.write("        popularFields: ['수학 심화', '영어 심화', '내신 집중', '사고력']\n")
    f.write("      },\n")
    f.write("      features: [distShort + ' 명문', '순위 ' + rank + '위', '학군 선호'],\n")
    f.write("      schoolInfoUrl: 'https://www.schoolinfo.go.kr',\n")
    f.write("      linkUrl: 'https://www.schoolinfo.go.kr'\n")
    f.write("    };\n")
    f.write("  });\n\n")
    
    f.write("  window.DODAM_SCHOOLS_DATA = {\n")
    f.write("    updatedAt: '2026-10-29',\n")
    f.write("    levels: " + json.dumps(levels, ensure_ascii=False, indent=4) + ",\n")
    f.write("    districts: " + json.dumps(districts, ensure_ascii=False, indent=4) + ",\n")
    f.write("    admissions: " + json.dumps(admissions, ensure_ascii=False, indent=4) + ",\n")
    f.write("    schools: unpackedSchools\n")
    f.write("  };\n")
    f.write("})();\n")

size_mb = os.path.getsize(out_path) / (1024 * 1024)
print(f"Generated {out_path} ({size_mb:.2f} MB) with {len(schools)} schools across 3 levels (5,000 each).")
