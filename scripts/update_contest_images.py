# -*- coding: utf-8 -*-
import json, re, hashlib

# Curated thematic Unsplash image pools for each contest domain
# High resolution, fast-loading, authentic photography
THEME_IMAGES = {
    # 1. 미술 / 그림 / 포스터 / 사생대회
    "art": [
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80", # palette paint
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80", # art gallery painting
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80", # watercolors brushes
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&auto=format&fit=crop&q=80", # colorful canvas
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80", # kid drawing crayon
        "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80", # sketch pencils
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80", # oil painting canvas
        "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=800&auto=format&fit=crop&q=80", # drawing exhibition
        "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&auto=format&fit=crop&q=80", # pastel chalk colors
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80", # modern art painting
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80", # colored markers art
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80", # brush stroke oil
    ],
    # 2. 백일장 / 글짓기 / 문학 / 수필 / 시
    "writing": [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80", # fountain pen writing
        "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80", # manuscript notebook
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=80", # writing on journal
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80", # vintage ink pen & book
        "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=80", # poetry writing desk
        "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&auto=format&fit=crop&q=80", # pen on paper desk
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80", # creative writing desk
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80", # open book & pencil
    ],
    # 3. 독서 / 동화 / 책
    "reading": [
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80", # library stack of books
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80", # open storybook
        "https://images.unsplash.com/photo-1507842229452-7740e53a299d?w=800&auto=format&fit=crop&q=80", # modern book library
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80", # kid reading storybook
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80", # library bookshelf
        "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=800&auto=format&fit=crop&q=80", # cozy book page
    ],
    # 4. 과학 / STEM / 우주 / 항공 / 수학
    "stem": [
        "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80", # science beaker chemistry
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80", # science lab flask
        "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&auto=format&fit=crop&q=80", # starry galaxy space
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80", # earth from space
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&auto=format&fit=crop&q=80", # microscope research
        "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80", # math geometry compass
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80", # math formulas board
        "https://images.unsplash.com/photo-1517976487541-15cf44e451b4?w=800&auto=format&fit=crop&q=80", # rocket launch
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=80", # drone in sky
    ],
    # 5. 코딩 / AI / 소프트웨어 / 로봇
    "coding": [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80", # code on laptop
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80", # futuristic robot
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80", # matrix code cybersecurity
        "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&auto=format&fit=crop&q=80", # kid robotic circuit kit
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80", # engineering circuits
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80", # computer microchip
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80", # developer typing
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80", # cybersecurity tech
    ],
    # 6. 음악 / 동요 / 합창 / 악기
    "music": [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80", # acoustic guitar
        "https://images.unsplash.com/photo-1520523839898-50712705497c?w=800&auto=format&fit=crop&q=80", # grand piano keys
        "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&auto=format&fit=crop&q=80", # violin orchestral
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80", # concert lights
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=80", # vintage microphone
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80", # jazz instruments
    ],
    # 7. 해양 / 바다 / 수상 안전
    "ocean": [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80", # sunny ocean beach
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&auto=format&fit=crop&q=80", # sea turtle swimming
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80", # deep blue sea waves
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80", # calm turquoise ocean
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80", # underwater coral reef
    ],
    # 8. 소방 / 불조심 / 안전
    "fire_safety": [
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80", # fire engine safety
        "https://images.unsplash.com/photo-1527788263495-3518a5c1342e?w=800&auto=format&fit=crop&q=80", # red fire truck
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80", # safety poster art
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80", # emergency safety team
    ],
    # 9. 숲 / 생태 / 환경 / 자연
    "nature": [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80", # green forest trees
        "https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80", # sunlight forest
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&auto=format&fit=crop&q=80", # lush pine woodland
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80", # forest pathway nature
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&auto=format&fit=crop&q=80", # green leaf seedling
    ],
    # 10. 박물관 / 역사 / 문화콘텐츠
    "culture": [
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&auto=format&fit=crop&q=80", # national museum architecture
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&auto=format&fit=crop&q=80", # museum exhibition artifacts
        "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=800&auto=format&fit=crop&q=80", # museum cultural gallery
        "https://images.unsplash.com/photo-1572953109213-3be62398eb95?w=800&auto=format&fit=crop&q=80", # traditional architecture
        "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&auto=format&fit=crop&q=80", # artistic sculpture
    ],
    # 11. 영어 / 글로벌 / 말하기
    "english": [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80", # students discussing
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80", # speech presentation
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80", # global friends
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80", # world globe study
    ],
    # 12. 일반 어린이 공모전 / 페스티벌
    "general": [
        "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&auto=format&fit=crop&q=80", # kids laughing celebration
        "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800&auto=format&fit=crop&q=80", # happy creative children
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80", # playful colorful blocks
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80", # children festival celebration
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=80", # festive colorful flags
    ]
}

def pick_contest_image(contest):
    title = contest.get('title', '')
    cat = contest.get('category', '')
    cid = contest.get('id', '')
    
    # Hash of id for deterministic variety
    h = int(hashlib.md5(cid.encode('utf-8')).hexdigest()[:8], 16)
    
    # Keyword title matching takes priority!
    if any(k in title for k in ['불조심', '소방', '화재', '안전포스터']):
        pool = THEME_IMAGES['fire_safety']
    elif any(k in title for k in ['해양', '바다', '해경', '수산', '해양안전']):
        pool = THEME_IMAGES['ocean']
    elif any(k in title for k in ['숲', '대관령', '생태', '환경', '나무', '녹색', '자연']):
        pool = THEME_IMAGES['nature']
    elif any(k in title for k in ['박물관', '문화전당', '문화재', '전통', '역사', '아시아문화']):
        pool = THEME_IMAGES['culture']
    elif any(k in title for k in ['백일장', '글짓기', '시', '수필', '한글', '산문', '독후감']):
        pool = THEME_IMAGES['writing']
    elif any(k in title for k in ['독서', '책', '동화', '도서']):
        pool = THEME_IMAGES['reading']
    elif any(k in title for k in ['사생', '그림', '포스터', '미술', '만화', '웹툰', '디자인', '캘리그라피', '캐릭터']):
        pool = THEME_IMAGES['art']
    elif any(k in title for k in ['코딩', '해커톤', '소프트웨어', 'AI', '인공지능', '프로그래밍', '알고리즘', '앱']):
        pool = THEME_IMAGES['coding']
    elif any(k in title for k in ['로봇', '드론', '메이커']):
        pool = THEME_IMAGES['coding']
    elif any(k in title for k in ['과학', '우주', '항공', '수학', '올림피아드', '발명', '탐구']):
        pool = THEME_IMAGES['stem']
    elif any(k in title for k in ['음악', '동요', '합창', '악기', '피아노', '바이올린', '콩쿠르', '국악']):
        pool = THEME_IMAGES['music']
    elif any(k in title for k in ['영어', '스피치', '외국어', '말하기']):
        pool = THEME_IMAGES['english']
    elif cat == 'contest_art':
        pool = THEME_IMAGES['art']
    elif cat in ['contest_writing']:
        pool = THEME_IMAGES['writing']
    elif cat in ['contest_reading']:
        pool = THEME_IMAGES['reading']
    elif cat in ['contest_coding', 'contest_robot']:
        pool = THEME_IMAGES['coding']
    elif cat in ['contest_stem', 'contest_math']:
        pool = THEME_IMAGES['stem']
    elif cat in ['contest_music']:
        pool = THEME_IMAGES['music']
    elif cat in ['contest_english']:
        pool = THEME_IMAGES['english']
    else:
        pool = THEME_IMAGES['general']
        
    return pool[h % len(pool)]

# Load events data
with open('js/events_data.js', encoding='utf-8') as f:
    text = f.read()

target = 'window.DODAM_NATIONWIDE_EVENTS = '
idx = text.find(target)
if idx == -1:
    print("Could not find window.DODAM_NATIONWIDE_EVENTS")
    exit(1)

prefix = text[:idx + len(target)]
rest = text[idx + len(target):].strip().rstrip(';')
events = json.loads(rest)

print(f"Loaded {len(events)} events.")

updated_contests = 0
for e in events:
    if e.get('boardType') == 'contests':
        new_img = pick_contest_image(e)
        e['imageUrl'] = new_img
        updated_contests += 1

print(f"Updated images for {updated_contests} contests.")

# Test on the screenshot 6 contests
target_titles = [
    '불조심',
    '해양경찰청',
    '국립중앙박물관',
    '대관령 숲사랑',
    '국립아시아문화전당',
    '한글사랑'
]
print("\nVerifying user screenshot cases:")
for kw in target_titles:
    match = [e for e in events if kw in e.get('title', '')]
    if match:
        m0 = match[0]
        print(f"  [{m0['title']}] -> {m0['imageUrl']}")

new_json = json.dumps(events, indent=2, ensure_ascii=False)
new_content = prefix + new_json + ";\n"

with open('js/events_data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Saved updated js/events_data.js successfully!")
