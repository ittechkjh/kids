import http.server
import json
import urllib.parse
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
        if any(term in s for term in ['인공지능', '학습 민첩성', '호기심', '질문', '결과', '과정', '생각', '능력', '스스로', '대화']):
            score += 4
        scored_quotes.append((score, s))

    scored_quotes.sort(key=lambda x: x[0], reverse=True)

    final_quotes = []
    for score, s in scored_quotes:
        if not any(s in f or f in s for f in final_quotes):
            final_quotes.append(s)
        if len(final_quotes) >= 4:
            break

    # 5. Concrete Facts / Stories / Examples extraction
    facts = []
    for s in sentences:
        if re.search(r'\d+년|\d+만|\d+명|\d+권|연구|실험|사례|인공지능|엑소브레인|알파고', s):
            if 18 <= len(s.strip()) <= 110:
                if not any(s.strip() in f for f in facts):
                    facts.append(s.strip())
        if len(facts) >= 4:
            break

    return {
        'cleanText': cleaned[:6000],
        'keyQuotes': final_quotes,
        'keyTopics': top_keywords[:8],
        'storySnippets': facts[:4]
    }

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

            try:
                from youtube_transcript_api import YouTubeTranscriptApi
                yta = YouTubeTranscriptApi()
                tl = yta.list(video_id)
                t = None
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

                if t:
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
                else:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({'ok': False, 'error': 'NO_TRANSCRIPT'}, ensure_ascii=False).encode('utf-8'))
                    return
            except Exception as e:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': str(e)}, ensure_ascii=False).encode('utf-8'))
                return

        super().do_GET()

if __name__ == '__main__':
    server = http.server.ThreadingHTTPServer(("0.0.0.0", 8080), DodamServerHandler)
    print("Multi-threaded HTTP server listening on http://localhost:8080 with YouTube Transcript API")
    server.serve_forever()
