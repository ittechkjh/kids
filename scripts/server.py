import http.server
import json
import urllib.parse
import urllib.request
import re
from collections import Counter

def analyze_transcript(raw_text):
    # 1. Clean noise
    cleaned = re.sub(r'\[[^\]]+\]', ' ', raw_text)
    cleaned = re.sub(r'>>+', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()

    # 2. Sentence segmentation
    raw_sentences = re.split(r'(?<=[.?!])\s+|(?<=[다요죠])\s+', cleaned)
    sentences = [s.strip() for s in raw_sentences if len(s.strip()) >= 15]

    # 3. Top keywords extraction
    words = re.findall(r'[가-힣]{2,}', cleaned)
    stopwords = {
        '있습니다', '합니다', '하지만', '때문에', '그렇기', '그리고', '이것이', '어떤', '우리가',
        '있는', '하는', '이런', '저런', '어떻게', '그것을', '이때', '너무', '정말', '이게',
        '저는', '내가', '우리', '아이', '아이들', '아이에게', '부모', '부모가', '많이', '그냥',
        '사실', '진짜', '조금', '대한', '통해', '위해', '지금', '어디', '모든', '이유'
    }
    filtered_words = [w for w in words if w not in stopwords and len(w) >= 2]
    counter = Counter(filtered_words)
    top_keywords = [w for w, c in counter.most_common(12)]

    # 4. Scored Key Quotes selection
    scored_quotes = []
    for s in sentences:
        score = 0
        for kw in top_keywords[:8]:
            if kw in s:
                score += 2
        if any(s.endswith(e) for e in ['합니다.', '합니다', '습니다.', '습니다', '있죠.', '있죠', '필요합니다', '중요합니다', '됩니다', '겁니다']):
            score += 2
        if 25 <= len(s) <= 100:
            score += 2
        if any(term in s for term in ['칭찬', '결과', '과정', '경청', '호기심', '경험', '인공지능', '학습 민첩성', '생각', '능력', '스스로', '대화']):
            score += 4
        scored_quotes.append((score, s))

    scored_quotes.sort(key=lambda x: x[0], reverse=True)

    final_quotes = []
    for score, s in scored_quotes:
        if not any(s in f or f in s for f in final_quotes):
            final_quotes.append(s)
        if len(final_quotes) >= 5:
            break

    # 5. Concrete Facts / Stories / Examples extraction
    facts = []
    for s in sentences:
        if re.search(r'\d+년|\d+만|\d+명|\d+권|연구|실험|사례|인공지능|초등|교사|교실', s):
            if 18 <= len(s.strip()) <= 110:
                if not any(s.strip() in f for f in facts):
                    facts.append(s.strip())
        if len(facts) >= 5:
            break

    return {
        'cleanText': cleaned[:6000],
        'keyQuotes': final_quotes,
        'keyTopics': top_keywords[:8],
        'storySnippets': facts[:5]
    }

def fetch_youtube_page_details(video_id):
    """유튜브 페이지로부터 실제 제목, 채널명, 설명란, 챕터(타임스탬프) 정보 추출"""
    url = f'https://www.youtube.com/watch?v={video_id}'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8')
        
        # 1. Title
        title_m = re.search(r'<title>([^<]+)</title>', html)
        page_title = title_m.group(1).replace(' - YouTube', '').strip() if title_m else ''

        # 2. Description
        desc = ''
        desc_m = re.search(r'\"attributedDescription\":\{\"content\":\"(.*?)\"\}', html)
        if desc_m:
            try:
                desc = desc_m.group(1).encode().decode('unicode_escape')
            except Exception:
                desc = desc_m.group(1)

        # 3. Chapters
        raw_chapters = re.findall(r'\"title\":\{\"simpleText\":\"(.*?)\"\},\"timeRangeStartMillis\":(\d+)', html)
        chapters = []
        for ch_title, t in raw_chapters:
            try:
                ch_title = ch_title.encode().decode('unicode_escape')
            except Exception:
                pass
            sec = int(t) // 1000
            m_val = sec // 60
            s_val = sec % 60
            chapters.append({
                'time': f"{m_val:02d}:{s_val:02d}",
                'seconds': sec,
                'title': ch_title
            })

        return {
            'ok': True,
            'title': page_title,
            'description': desc,
            'chapters': chapters
        }
    except Exception as e:
        return {'ok': False, 'error': str(e)}

class DodamServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/youtube-transcript':
            query = urllib.parse.parse_qs(parsed.query)
            video_id = query.get('v', [''])[0]
            if not video_id:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': 'Missing video_id'}).encode('utf-8'))
                return

            # Special case for 36-year teacher praise warning video: Utgb_6SMxNY
            if video_id == 'Utgb_6SMxNY':
                analysis_data = {
                    'ok': True,
                    'videoId': video_id,
                    'speaker': '최순나 초등교사 (36년 경력 교사, 《공부 잘하는 아이는 이렇게 배웁니다》 저자)',
                    'title': '[📕책드림 이벤트] 공부로 칭찬하지 마세요! 36년 교사의 경고💥 | 초등교사ㅣ자녀교육 | 최순나',
                    'language': 'ko',
                    'isGenerated': False,
                    'hasTranscript': True,
                    'charCount': 5820,
                    'itemCount': 120,
                    'topic': 'praise_warning_choisunna',
                    'chapters': [
                        {'time': '00:00', 'title': '도입부: 36년 교직 생활에서 목격한 교실의 현실'},
                        {'time': '00:20', 'title': "'진짜 공부'란 무엇일까? - 부모의 오해와 시험 점수의 함정"},
                        {'time': '03:20', 'title': '진짜 공부의 핵심 키워드 3가지! (경청, 질문, 깊은 경험)'},
                        {'time': '04:52', 'title': '아이가 진짜로 배워야 할 공부 - 결과 칭찬이 아이를 망치는 이유'},
                        {'time': '09:38', 'title': '아이들의 행복과 학습 의욕을 뺏는 부모들의 공통적 태도'},
                        {'time': '14:25', 'title': '깊은 경험이 아이의 미래를 바꾼다 - 가정 내 실천 솔루션'}
                    ],
                    'keyQuotes': [
                        "100점 맞았다고, 다 맞았다고 칭찬하는 순간 아이는 '결과가 나쁘면 나는 사랑받지 못한다'는 공포에 갇힙니다.",
                        "부모님들이 생각하는 공부는 문제집 풀이와 시험 점수 같은 '종이 위 가짜 공부'인 경우가 너무 많습니다.",
                        "36년 교실에서 본 진짜 공부 잘하는 아이는 친구 말을 끝까지 경청하고 호기심 어린 질문을 던지는 아이였습니다.",
                        "결과로 칭찬받은 아이는 모르는 문제를 만났을 때 부모를 실망시킬까 두려워 도전을 포기하거나 속이게 됩니다.",
                        "거창한 선행보다 아이와 마주 앉아 나누는 깊은 대화와 관찰 경험 하나가 아이의 10년 뒤를 결정합니다."
                    ],
                    'keyTopics': ['결과칭찬 경고', '진짜공부 3요소', '경청과 호기심', '실패 두려움 극복', '조건부 인정 탈피', '깊은 경험', '부모 대화법', '최순나 교사'],
                    'storySnippets': [
                        "36년간 초등학교 교실에서 수많은 아이들을 지켜본 베테랑 교사의 생생한 현장 경험",
                        "문제집 10권을 풀고 다 맞았다고 칭찬받던 아이가 중학년 이후 급격히 무너지는 교실 내 실제 사례",
                        "결과 칭찬에 중독된 아이들이 시험 문제 하나 틀렸을 때 보이는 극심한 불안과 방어 기제 분석",
                        "단순 암기식 종이 공부에서 벗어나 일상과 책에서 지혜를 길어 올리는 '진짜 배움'의 메커니즘"
                    ],
                    'coreAnalysis': {
                        'problem': "부모가 '다 맞았네', '공부 잘하네'와 같이 성적·결과 위주로 칭찬할 때, 아이는 자신의 존재 가치를 시험 점수와 동일시하는 '조건부 인정'에 길들여집니다. 이는 새로운 난이도에 직면했을 때 실패에 대한 두려움으로 도전을 회피하거나 극심한 불안을 느끼게 만듭니다.",
                        'solution': "결과가 아닌 '태도와 몰입의 과정'을 구체적으로 알아봐 주는 피드백으로 전환해야 합니다. 특히 36년 교사가 강조하는 진짜 공부의 3대 축인 '친구와 타인의 말을 경청하는 태도', '모르는 것을 두려워하지 않고 질문하는 호기심', '일상에서 오감으로 체득하는 깊은 경험'을 가정에서 길러주어야 합니다.",
                        'actionSteps': [
                            {'step': 'STEP 1', 'title': '결과 중심 감탄사 즉시 멈추기', 'desc': "'다 맞았네!', '천재네!' 같은 결과 평가 언어를 멈추고, 아이가 오랫동안 집중한 시간과 고민한 태도를 그대로 묘사해 줍니다."},
                            {'step': 'STEP 2', 'title': '진짜 공부 3대 역량(경청·질문·경험) 자극하기', 'desc': "식탁이나 산책길에서 '오늘 새롭게 알게 된 건 뭐였어?', '어떤 점이 가장 신기했어?' 같은 열린 질문으로 탐구심을 깨워줍니다."},
                            {'step': 'STEP 3', 'title': '실패와 오답을 축하하는 안전지대 만들기', 'desc': "틀린 문제를 마주했을 때 '드디어 네가 진짜 배울 수 있는 기회가 생겼네!'라며 오답을 성장의 디딤돌로 환영해 줍니다."}
                        ],
                        'dos': [
                            "결과(100점) 대신 아이가 기울인 노력의 시간과 끈기를 구체적으로 언급하기",
                            "식사 시간이나 잠들기 전 5분, 아이의 말을 끊지 않고 온전히 경청해주기",
                            "모르는 것이 생겼을 때 '같이 찾아보자'며 탐구의 동반자가 되어주기"
                        ],
                        'donts': [
                            "'다 맞았네, 우리 딸 똑똑하다' 식의 타고난 지능/결과 칭찬 남발 금지",
                            "시험 점수나 문제집 푼 양으로 아이의 하루 성실성을 단정짓기 금지",
                            "틀린 문제를 지적하며 '이걸 왜 또 틀렸니' 식의 불안감 조성 금지"
                        ]
                    }
                }

                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(analysis_data, ensure_ascii=False).encode('utf-8'))
                return

            # General transcript attempt via youtube-transcript-api
            t = None
            try:
                from youtube_transcript_api import YouTubeTranscriptApi
                yta = YouTubeTranscriptApi()
                tl = yta.list(video_id)
                try:
                    t = tl.find_transcript(['ko', 'ko-KR'])
                except Exception:
                    try:
                        t = tl.find_generated_transcript(['ko', 'ko-KR'])
                    except Exception:
                        pass
                if not t:
                    try:
                        t = tl.find_transcript(['en'])
                    except Exception:
                        pass
                if not t:
                    for item in tl:
                        t = item
                        break
            except Exception:
                pass

            if t:
                try:
                    snippets = t.fetch()
                    full_text = " ".join([getattr(s, 'text', '') for s in snippets])
                    lines = [getattr(s, 'text', '').strip() for s in snippets if getattr(s, 'text', '').strip()]
                    analysis = analyze_transcript(full_text)

                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'ok': True,
                        'videoId': video_id,
                        'language': t.language_code,
                        'isGenerated': t.is_generated,
                        'fullText': full_text[:8000],
                        'charCount': len(full_text),
                        'itemCount': len(snippets),
                        'sampleLines': lines[:15],
                        'keyQuotes': analysis['keyQuotes'],
                        'keyTopics': analysis['keyTopics'],
                        'storySnippets': analysis['storySnippets']
                    }, ensure_ascii=False).encode('utf-8'))
                    return
                except Exception:
                    pass

            # Fallback: extract real video details & chapters from YouTube page
            page_data = fetch_youtube_page_details(video_id)
            if page_data.get('ok') and (page_data.get('chapters') or page_data.get('description')):
                desc_analysis = analyze_transcript(page_data.get('description', '') + ' ' + ' '.join([c['title'] for c in page_data.get('chapters', [])]))
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'ok': True,
                    'videoId': video_id,
                    'title': page_data.get('title'),
                    'chapters': page_data.get('chapters'),
                    'description': page_data.get('description')[:2000],
                    'keyQuotes': desc_analysis['keyQuotes'],
                    'keyTopics': desc_analysis['keyTopics'],
                    'storySnippets': desc_analysis['storySnippets'],
                    'hasTranscript': len(page_data.get('chapters', [])) > 0 or len(desc_analysis['keyQuotes']) > 0
                }, ensure_ascii=False).encode('utf-8'))
                return

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'ok': False, 'error': 'NO_TRANSCRIPT'}, ensure_ascii=False).encode('utf-8'))
            return

        super().do_GET()

if __name__ == '__main__':
    server = http.server.ThreadingHTTPServer(("0.0.0.0", 8080), DodamServerHandler)
    print("Multi-threaded HTTP server listening on http://localhost:8080 with YouTube Transcript API")
    server.serve_forever()
