import http.server
import json
import urllib.parse
from functools import partial

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
                    # Extract top keywords and key sentences
                    lines = [getattr(s, 'text', '').strip() for s in snippets if getattr(s, 'text', '').strip()]
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
                        'itemCount': len(snippets),
                        'sampleLines': lines[:15]
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
