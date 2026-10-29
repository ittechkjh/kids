# -*- coding: utf-8 -*-
import sys, io, json, urllib.request, ssl, time

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
url = "https://m.richgo.ai/api/mcp"

def call_mcp(method_name, args):
    payload = {
        "jsonrpc": "2.0",
        "id": int(time.time()*1000) % 100000,
        "method": "tools/call",
        "params": {
            "name": method_name,
            "arguments": args
        }
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json', 'User-Agent': 'DodamDodam/1.0'}
    )
    with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        return res.get("result", {}).get("structuredContent", {})

hubs = [
    # 서울 강남/서초/송파/양천/노원/마포/광진
    "대치아이파크", "래미안대치팰리스", "은마", "도곡렉슬", "개포래미안포레스트",
    "반포자이", "아크로리버파크", "래미안원베일리", "신반포자이", "서초그랑자이",
    "잠실엘스", "리센츠", "올림픽선수기자촌", "헬리오시티", "파크리오",
    "목동신시가지7단지", "목동신시가지14단지", "목동센트럴푸르지오",
    "중계주공5단지", "상계주공7단지", "마포래미안푸르지오", "광장현대5단지",
    # 경기 분당/판교/과천/평촌/일산/수지/광교
    "판교푸르지오그랑블", "봇들마을8단지", "분당파크뷰", "시범한양", "아름마을건영",
    "과천위버필드", "래미안슈르", "꿈마을우성", "목련마을",
    "킨텍스원시티", "문촌마을16단지", "강선마을14단지",
    "광교중흥S클래스", "자연앤힐스테이트", "수지진산마을삼성5차",
    # 지방 5대 광역시 거점
    "해운대자이", "마린시티자이", "남천삼익비치", "용호동더W",
    "범어자이", "범어동e편한세상", "수성하이츠", "만촌자이르네",
    "송도더샵퍼스트파크", "송도센트럴파크푸르지오",
    "크로바", "목련", "둔산더샵엘리프", "봉선동포스코더샵"
]

harvested_apts = {}
harvested_schools = {}

print(f"Starting harvest for {len(hubs)} apartment hubs across Korea...")

for q in hubs:
    try:
        search_res = call_mcp("search_apartments", {"query": q})
        apts = search_res.get("results", [])
        if apts:
            top_apt = apts[0]
            danji_id = top_apt["danji_id"]
            dist_res = call_mcp("get_school_district", {"danji_id": danji_id, "per_level": 4})
            schools = dist_res.get("schools", [])
            harvested_apts[q] = {
                "danji_id": danji_id,
                "name": top_apt.get("name"),
                "address": top_apt.get("address"),
                "schools": schools
            }
            for s in schools:
                sid = s.get("school_id")
                if sid and sid not in harvested_schools:
                    harvested_schools[sid] = s
            print(f"✓ {q} ({top_apt.get('name')}): {len(schools)} schools found")
        else:
            print(f"✗ {q}: not found")
        time.sleep(0.15)
    except Exception as e:
        print(f"! {q}: {e}")

print(f"\nDone! Total apartments: {len(harvested_apts)}, Total unique Richgo schools: {len(harvested_schools)}")

with open('data/seeds/richgo_districts_database.json', 'w', encoding='utf-8') as f:
    json.dump({
        "apartments": harvested_apts,
        "schools": harvested_schools
    }, f, ensure_ascii=False, indent=2)

print("Saved data/seeds/richgo_districts_database.json!")
