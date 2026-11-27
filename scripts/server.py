import http.server
import json
import urllib.parse
import urllib.request
import re
import os
from collections import Counter

def load_gemini_api_key():
    """환경변수 또는 .env / ~/.env에서 GEMINI_API_KEY 안전하게 로드"""
    key = os.environ.get('GEMINI_API_KEY', '').strip()
    if key:
        return key
    for env_path in ['.env', os.path.expanduser('~/.env')]:
        if os.path.exists(env_path):
            try:
                with open(env_path, 'r', encoding='utf-8-sig') as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith('GEMINI_API_KEY='):
                            return line.split('=', 1)[1].strip().strip('"').strip("'")
            except Exception:
                pass
    return ''

def analyze_transcript(raw_text):
    cleaned = re.sub(r'\[[^\]]+\]', ' ', raw_text)
    cleaned = re.sub(r'>>+', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()

    raw_sentences = re.split(r'(?<=[.?!])\s+|(?<=[다요죠])\s+', cleaned)
    sentences = [s.strip() for s in raw_sentences if len(s.strip()) >= 15]

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
        with urllib.request.urlopen(req, timeout=8) as resp:
            html = resp.read().decode('utf-8')
        
        title_m = re.search(r'<title>([^<]+)</title>', html)
        page_title = title_m.group(1).replace(' - YouTube', '').strip() if title_m else ''

        desc = ''
        desc_m = re.search(r'\"attributedDescription\":\{\"content\":\"(.*?)\"\}', html)
        if desc_m:
            try:
                desc = desc_m.group(1).encode().decode('unicode_escape')
            except Exception:
                desc = desc_m.group(1)

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

def call_gemini_youtube_summary(api_key, video_id, title, description, chapters, transcript_text):
    """Gemini API를 호출하여 유튜브 영상 실제 내용을 바탕으로 구조화된 육아가이드 JSON 생성"""
    youtube_url = f"https://www.youtube.com/watch?v={video_id}"
    chapters_str = "\n".join([f"- {c['time']} {c['title']}" for c in chapters]) if chapters else "없음"

    prompt = f"""당신은 대한민국 최고의 육아·아동발달·초중등 교육 전문 에디터입니다.
아래 유튜브 영상의 실제 내용(음성/자막/설명/챕터)을 철저하게 분석하여, 영상에 등장하는 실제 강연자·핵심 논점·사례·실천법을 100% 반영한 고품질 블로그 리포트 JSON을 작성해 주세요.
절대로 영상 내용과 무관한 일반론이나 다른 주제를 지어내지 마세요. 반드시 이 영상({youtube_url})의 실제 내용을 요약해야 합니다.

[영상 기본 정보]
- 제목: {title}
- 챕터 타임라인:
{chapters_str}
- 영상 설명란:
{description[:1500]}
- 추출된 자막/스크립트:
{transcript_text[:6000] if transcript_text else "직접 영상 URL을 분석하여 내용을 추출하세요."}

다음 JSON 스키마로만 정확히 응답하세요 (마크다운 코드블록 없이 순수 JSON):
{{
  "cleanTitle": "영상의 핵심 주제를 담은 품격 있는 제목 (25~45자)",
  "speaker": "영상 속 강연자/전문가 이름 및 직함",
  "badge": "이모지 포함 짧은 카테고리 배지 (예: 🎒 초등 교육)",
  "subName": "강연자 및 주제 한 줄 소개",
  "targetAge": "주요 대상 연령/학부모 (예: 예비 초등~초등 학부모)",
  "focus": "핵심 키워드 3가지 (가운데점 · 구분)",
  "visualTheme": "영상 분위기에 맞는 테마 선택 (edu_blueprint, warm_editorial, clinical_mint, deep_focus 중 택1)",
  "layoutVariant": "인포그래픽 레이아웃 선택 (cards, timeline_flow, horizontal_bars, split_compare 중 택1)",
  "c1Sub": "리포트 핵심 한 줄 요약 부제목 (18~30자)",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
  "b1": "영상 핵심 요약 포인트 1 (40~55자)",
  "b2": "영상 핵심 요약 포인트 2 (40~55자)",
  "b3": "영상 핵심 요약 포인트 3 (40~55자)",
  "keyQuotes": ["강연자의 실제 핵심 발언/명대사 1", "강연자의 실제 핵심 발언/명대사 2", "강연자의 실제 핵심 발언/명대사 3"],
  "chapters": [
    {{"time": "00:00", "title": "실제 영상 흐름에 따른 구간별 주제"}}
  ],
  "c2Title": "[원인 분석] 영상에서 지적하는 핵심 문제/오해 제목",
  "c2Sub": "영상 내용에 맞춘 원인 분석 부제목 (15~26자, 예: 왜 아이가 집중하지 못할까?)",
  "c2Box1Title": "원인1 핵심 제목(8~14자)",
  "c2Box1P1": "원인1 구체적 설명 완결 문장 (반드시 24~38자, 단어 토막 금지)",
  "c2Box1P2": "원인1 영상 속 구체적 사례·부작용 완결 문장 (반드시 24~38자)",
  "c2Box1Sub": "원인1 핵심 결론 한 줄 (14~22자)",
  "c2Box2Title": "원인2 핵심 제목(8~14자)",
  "c2Box2P1": "원인2 구체적 설명 완결 문장 (반드시 24~38자, 단어 토막 금지)",
  "c2Box2P2": "원인2 영상 속 구체적 사례·부작용 완결 문장 (반드시 24~38자)",
  "c2Box2Sub": "원인2 핵심 결론 한 줄 (14~22자)",
  "c2Box3Title": "원인3 핵심 제목(8~14자)",
  "c2Box3P1": "원인3 구체적 설명 완결 문장 (반드시 24~38자, 단어 토막 금지)",
  "c2Box3P2": "원인3 영상 속 구체적 사례·부작용 완결 문장 (반드시 24~38자)",
  "c2Box3Sub": "원인3 핵심 결론 한 줄 (14~22자)",
  "c3Title": "[실전 솔루션] 영상에서 제시하는 3단계 해결책 제목",
  "c3Sub": "영상 내용에 맞춘 실전 솔루션 부제목 (15~26자, 예: 자사고·입시 성공을 위한 3단계 전략)",
  "c3Step1Name": "1단계 핵심",
  "c3Step1Title": "솔루션1 핵심 제목(8~14자)",
  "c3Step1P1": "솔루션1 구체적 실행 방법 완결 문장 (반드시 24~38자, 단어 토막 금지)",
  "c3Step1P2": "솔루션1 실전 적용 예시·팁 완결 문장 (반드시 24~38자)",
  "c3Step1Sub": "솔루션1 기대 효과 한 줄 (14~22자)",
  "c3Step2Name": "2단계 핵심",
  "c3Step2Title": "솔루션2 핵심 제목(8~14자)",
  "c3Step2P1": "솔루션2 구체적 실행 방법 완결 문장 (반드시 24~38자, 단어 토막 금지)",
  "c3Step2P2": "솔루션2 실전 적용 예시·팁 완결 문장 (반드시 24~38자)",
  "c3Step2Sub": "솔루션2 기대 효과 한 줄 (14~22자)",
  "c3Step3Name": "3단계 핵심",
  "c3Step3Title": "솔루션3 핵심 제목(8~14자)",
  "c3Step3P1": "솔루션3 구체적 실행 방법 완결 문장 (반드시 24~38자, 단어 토막 금지)",
  "c3Step3P2": "솔루션3 실전 적용 예시·팁 완결 문장 (반드시 24~38자)",
  "c3Step3Sub": "솔루션3 기대 효과 한 줄 (14~22자)",
  "c4Title": "[핵심 심층 구성] 영상 내용에 가장 어울리는 4가지 핵심 영역 제목 (무조건 4주 루틴이 아닌 영상 맞춤 구성 예: 학년별 전략, 오해와 진실 4가지, 4주 루틴 등)",
  "c4Sub": "영상 내용에 맞춘 4가지 구성 부제목 (15~26자)",
  "c4W1": "항목1 제목 (예: 초등 저학년 / 오해 1 / 1단계 등)", "c4W1L1": "✔ 세부1", "c4W1L2": "✔ 세부2", "c4W1L3": "✔ 세부3", "c4W1Sub": "항목1 핵심",
  "c4W2": "항목2 제목", "c4W2L1": "✔ 세부1", "c4W2L2": "✔ 세부2", "c4W2L3": "✔ 세부3", "c4W2Sub": "항목2 핵심",
  "c4W3": "항목3 제목", "c4W3L1": "✔ 세부1", "c4W3L2": "✔ 세부2", "c4W3L3": "✔ 세부3", "c4W3Sub": "항목3 핵심",
  "c4W4": "항목4 제목", "c4W4L1": "✔ 세부1", "c4W4L2": "✔ 세부2", "c4W4L3": "✔ 세부3", "c4W4Sub": "항목4 핵심",
  "c5Title": "[핵심 비교 · 지침] 영상 주제에 맞는 2단 비교/질문답변 제목 (DO vs DON'T, 기존 방식 vs 바꿀 방식, 핵심 Q&A 등)",
  "c5Sub": "영상 내용에 맞춘 2단 비교 부제목 (15~26자)",
  "c5LeftLabel": "왼쪽 배지(10자이내, 예: 권장 전략 / 바꿀 습관 / 핵심 질문)",
  "c5RightLabel": "오른쪽 배지(10자이내, 예: 피할 실수 / 기존 습관 / 전문가 해답)",
  "c5Do1": "✔ 왼쪽 항목 1", "c5Do2": "✔ 왼쪽 항목 2", "c5Do3": "✔ 왼쪽 항목 3", "c5Do4": "✔ 왼쪽 항목 4",
  "c5Dont1": "✘ 오른쪽 항목 1", "c5Dont2": "✘ 오른쪽 항목 2", "c5Dont3": "✘ 오른쪽 항목 3", "c5Dont4": "✘ 오른쪽 항목 4",
  "intro": "영상 도입부 및 강연자 문제 제기 요약 (350자 이상, 문단 구분 \\n\\n)",
  "sec1Title": "1장 본문 소제목 (번호/1장 없이 순수 제목만, 15~28자)",
  "sec1": "1장 심층 분석: 영상 내용 기반 핵심 배경과 사례 (400자 이상, 문단 구분 \\n\\n)",
  "sec2Title": "2장 본문 소제목 (번호/2장 없이 순수 제목만, 15~28자)",
  "sec2": "2장 핵심 전략: 영상에서 제안한 구체적 방법론 상세 해설 (450자 이상, 문단 구분 \\n\\n)",
  "sec3Title": "3장 본문 소제목 (번호/3장 없이 순수 제목만, 15~28자)",
  "sec3": "3장 심층 적용 가이드: 영상 내용 기반 단계·기준·사례 상세 설명 (350자 이상, 문단 구분 \\n\\n)",
  "sec4Title": "4장 본문 소제목 (번호/4장 없이 순수 제목만, 15~28자)",
  "sec4": "4장 부모 Q&A 2가지 및 핵심 요약 (Q1, Q2 형태, 350자 이상)",
  "outro": "따뜻한 에필로그 및 요약 마무리 (150자 이상)",
  "customCards": [
    {{
      "cardType": "summary_hero | wide_bars | columns_3 | grid_2x2 | compare_2col | qa_cards 중 영상 내용에 가장 어울리는 유형을 카드마다 다르게 선택",
      "kicker": "[카테고리 태그] 예: [핵심 브리핑], [트렌드 변화], [유형별 비교], [실전 체크리스트], [핵심 Q&A] 등 영상에 맞게 자유 작성",
      "title": "카드 큰 제목 (14~28자, 영상 내용에 맞게 자유 작성)",
      "leftLabel": "compare_2col일 때만 왼쪽 배지(예: 과거 방식 / 장점 / 권장), 아니면 빈 문자열",
      "rightLabel": "compare_2col일 때만 오른쪽 배지(예: 최신 트렌드 / 주의점 / 피할 점), 아니면 빈 문자열",
      "items": [
        {{"label": "항목 소제목 또는 질문 (8~22자)", "body": "영상 속 구체적 내용·수치·사례를 담은 완결 문장 (24~42자)", "sub": "핵심 포인트 한 줄 (12~22자)"}}
      ]
    }}
  ]
}}
※ 중요 규칙:
- customCards는 반드시 5개의 카드로 구성하되, 아래 본문 위치와 주제가 1:1로 정확히 일치해야 합니다(순서 뒤바뀜 절대 금지):
  1) customCards[0]: 도입부(intro) 바로 아래 배치 → 영상 전체 핵심 요약
  2) customCards[1]: 1장(sec1Title·sec1) 바로 아래 배치 → 반드시 1장 본문 내용만 시각화
  3) customCards[2]: 2장(sec2Title·sec2) 바로 아래 배치 → 반드시 2장 본문 내용만 시각화
  4) customCards[3]: 3장(sec3Title·sec3) 바로 아래 배치 → 반드시 3장 본문 내용만 시각화
  5) customCards[4]: 4장(sec4Title·sec4) 바로 아래 배치 → 반드시 4장 본문(Q&A 포함) 내용만 시각화
- 5장의 cardType은 각 장의 내용(비교/트렌드/사례/Q&A/단계 등)에 가장 어울리게 서로 다르게 자유 선택하세요.
- wide_bars, columns_3은 items 3개, grid_2x2는 items 4개, compare_2col은 items 4~6개(앞 절반은 왼쪽, 뒤 절반은 오른쪽), qa_cards는 items 2~3개, summary_hero는 items 3개로 채우세요."""

    # Try calling Gemini API with YouTube fileUri first (native multimodal video understanding)
    models_to_try = [
        ("gemini-3-flash-preview", 0),
        ("gemini-3.5-flash-lite", None),
        ("gemini-3.1-flash-lite", None),
        ("gemini-3.8-flash", None),
        ("gemini-3.5-flash", 0),
    ]
    parts = []
    if not transcript_text:
        parts.append({"fileData": {"mimeType": "video/mp4", "fileUri": youtube_url}})
    parts.append({"text": prompt})

    last_err = "unknown error"
    for model_name, thinking_budget in models_to_try:
        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        gen_cfg = {
            "responseMimeType": "application/json",
            "temperature": 0.4,
        }
        if thinking_budget is not None:
            gen_cfg["thinkingConfig"] = {"thinkingBudget": thinking_budget}
        body = {
            "contents": [{"parts": parts}],
            "generationConfig": gen_cfg,
        }
        req = urllib.request.Request(
            endpoint,
            data=json.dumps(body).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                res_json = json.loads(resp.read().decode('utf-8'))
            text_out = res_json['candidates'][0]['content']['parts'][0]['text']
            parsed = json.loads(text_out)
            if isinstance(parsed, list) and parsed:
                parsed = parsed[0]
            return {'ok': True, 'profile': parsed, 'model': model_name}
        except Exception as e:
            last_err = f"{model_name}: {e}"
            continue

    return {'ok': False, 'error': last_err}

class DodamServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/youtube-transcript':
            query = urllib.parse.parse_qs(parsed.query)
            video_id = query.get('v', [''])[0]
            custom_key = query.get('apiKey', [''])[0]
            if not video_id:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': 'Missing video_id'}).encode('utf-8'))
                return

            # 1. Try youtube-transcript-api
            transcript_text = ''
            t_lang = 'ko'
            t_gen = False
            item_count = 0
            try:
                from youtube_transcript_api import YouTubeTranscriptApi
                yta = YouTubeTranscriptApi()
                tl = yta.list(video_id)
                t = None
                for langs in [['ko', 'ko-KR'], ['en']]:
                    try:
                        t = tl.find_transcript(langs)
                        break
                    except Exception:
                        try:
                            t = tl.find_generated_transcript(langs)
                            break
                        except Exception:
                            pass
                if not t:
                    for item in tl:
                        t = item
                        break
                if t:
                    snippets = t.fetch()
                    transcript_text = " ".join([getattr(s, 'text', '') for s in snippets])
                    t_lang = t.language_code
                    t_gen = t.is_generated
                    item_count = len(snippets)
            except Exception:
                pass

            # 2. Fetch YouTube Page Details (Title, Description, Chapters)
            page_data = fetch_youtube_page_details(video_id)
            title = page_data.get('title', '')
            description = page_data.get('description', '')
            chapters = page_data.get('chapters', [])

            # 3. Check for Gemini API Key (.env or query)
            api_key = custom_key or load_gemini_api_key()
            ai_profile = None
            ai_error = None
            if api_key:
                gemini_res = call_gemini_youtube_summary(
                    api_key, video_id, title, description, chapters, transcript_text
                )
                if gemini_res.get('ok'):
                    ai_profile = gemini_res.get('profile')
                else:
                    ai_error = gemini_res.get('error')

            # 4. Build final response
            analysis = analyze_transcript(transcript_text or (description + ' ' + ' '.join([c['title'] for c in chapters])))

            resp_payload = {
                'ok': True,
                'videoId': video_id,
                'title': title,
                'language': t_lang,
                'isGenerated': t_gen,
                'fullText': transcript_text[:8000] if transcript_text else description[:2000],
                'charCount': len(transcript_text) if transcript_text else len(description),
                'itemCount': item_count if item_count else len(chapters),
                'hasTranscript': bool(transcript_text) or bool(ai_profile),
                'hasGeminiKey': bool(api_key),
                'aiProfile': ai_profile,
                'aiError': ai_error,
                'speaker': ai_profile.get('speaker', '') if ai_profile else '',
                'chapters': (ai_profile.get('chapters') if ai_profile and ai_profile.get('chapters') else chapters),
                'keyQuotes': (ai_profile.get('keyQuotes') if ai_profile and ai_profile.get('keyQuotes') else analysis['keyQuotes']),
                'keyTopics': (ai_profile.get('keywords') if ai_profile and ai_profile.get('keywords') else analysis['keyTopics']),
                'storySnippets': analysis['storySnippets']
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(resp_payload, ensure_ascii=False).encode('utf-8'))
            return

        super().do_GET()

if __name__ == '__main__':
    server = http.server.ThreadingHTTPServer(("0.0.0.0", 8080), DodamServerHandler)
    print("Multi-threaded HTTP server listening on http://localhost:8080 with Gemini YouTube Summarizer")
    server.serve_forever()
