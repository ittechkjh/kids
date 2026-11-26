#!/usr/bin/env python3
"""
Generate static crawlable HTML pages for DodamTalk SEO (100% pure Python, zero browser dependency):
- Fetches all public AI reports / guide posts directly from live Firestore REST API
- Builds static /reports/<id>.html with full content, JSON-LD, and internal cross-links
- Builds 4 rich static hub pages under /guides/ (events, places, policies, schools)
- Updates internal static links in index.html and guides.html
- Regenerates sitemap.xml and rss.xml with today's KST date
Safe to run locally AND inside GitHub Actions (daily_crawler.yml).
"""
import email.utils
import html as html_lib
import json
import re
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REPORTS_DIR = ROOT / "reports"
POSTS_DIR = ROOT / "posts"
GUIDES_DIR = ROOT / "guides"
BASE_URL = "https://dodamtalk.com"
FIRESTORE_PROJECT = "kids-912f5"
KST = timezone(timedelta(hours=9))
NOW_KST = datetime.now(KST)
TODAY = NOW_KST.strftime("%Y-%m-%d")
RSS_DATE = email.utils.format_datetime(NOW_KST)


def strip_html(raw: str) -> str:
    txt = re.sub(r"<script[^>]*>.*?</script>", " ", raw or "", flags=re.S | re.I)
    txt = re.sub(r"<style[^>]*>.*?</style>", " ", txt, flags=re.S | re.I)
    txt = re.sub(r"<[^>]+>", " ", txt)
    txt = html_lib.unescape(txt)
    return re.sub(r"\s+", " ", txt).strip()


def truncate_desc(text: str, limit: int = 155) -> str:
    t = strip_html(text)
    if len(t) <= limit:
        return t
    return t[: limit - 1].rstrip() + "…"


def decode_fs_value(val: dict):
    if not isinstance(val, dict):
        return None
    if "stringValue" in val:
        return val["stringValue"]
    if "integerValue" in val:
        try:
            return int(val["integerValue"])
        except Exception:
            return 0
    if "doubleValue" in val:
        return float(val["doubleValue"])
    if "booleanValue" in val:
        return bool(val["booleanValue"])
    if "nullValue" in val:
        return None
    if "timestampValue" in val:
        return val["timestampValue"]
    if "arrayValue" in val:
        return [decode_fs_value(v) for v in val["arrayValue"].get("values", [])]
    if "mapValue" in val:
        return {k: decode_fs_value(v) for k, v in val["mapValue"].get("fields", {}).items()}
    return None


def fetch_firestore_posts() -> list[dict]:
    """Fetch all documents from community_posts via Firestore REST API and unpack like firebase_db.js."""
    base_url = f"https://firestore.googleapis.com/v1/projects/{FIRESTORE_PROJECT}/databases/(default)/documents/community_posts"
    all_docs = []
    page_token = None

    for _ in range(25):
        params = {"pageSize": "300"}
        if page_token:
            params["pageToken"] = page_token
        url = f"{base_url}?{urllib.parse.urlencode(params)}"
        req = urllib.request.Request(url, headers={"User-Agent": "DodamTalk-SEO-Generator/2.0"})
        with urllib.request.urlopen(req, timeout=25) as r:
            data = json.loads(r.read().decode("utf-8"))
        docs = data.get("documents", [])
        all_docs.extend(docs)
        page_token = data.get("nextPageToken")
        if not page_token:
            break

    deleted_ids: set[str] = set()
    latest_deleted_ts = -1
    raw_posts: dict[str, dict] = {}
    now_ms = int(time.time() * 1000)

    for doc in all_docs:
        doc_id = doc.get("name", "").rsplit("/", 1)[-1]
        fields = {k: decode_fs_value(v) for k, v in doc.get("fields", {}).items()}
        cat = str(fields.get("category") or "")

        # Collect deleted post IDs from latest __sys_db__ record (region == 'deleted_posts')
        if cat == "__sys_db__":
            if str(fields.get("region") or "") == "deleted_posts":
                rec_ts = int(fields.get("timestamp") or 0)
                if rec_ts >= latest_deleted_ts:
                    content_str = str(fields.get("content") or "{}")
                    try:
                        parsed = json.loads(content_str)
                        if isinstance(parsed, dict) and isinstance(parsed.get("ids"), list):
                            deleted_ids = {str(x) for x in parsed["ids"]}
                            latest_deleted_ts = rec_ts
                        elif isinstance(parsed, dict) and parsed.get("deletedId"):
                            deleted_ids.add(str(parsed["deletedId"]))
                    except Exception:
                        pass
            continue

        if cat.startswith("__"):
            continue

        # Unpack extraMeta & real comments (matches firebase_db.js unpackPostDoc)
        comments = fields.get("comments") if isinstance(fields.get("comments"), list) else []
        extra_meta = {}
        real_comments = []
        for c in comments:
            if isinstance(c, dict) and (c.get("isDodamMeta") or c.get("_dodam_meta") or c.get("__dodam_meta__")) and isinstance(c.get("meta"), dict):
                extra_meta = c["meta"]
            elif isinstance(c, dict) and str(c.get("content") or "").strip():
                real_comments.append(c)

        merged = {**fields, **extra_meta}
        base_id = re.sub(r"_rev_\d+$", "", str(merged.get("id") or doc_id))
        merged["id"] = base_id
        merged["_docId"] = doc_id
        merged["_realComments"] = real_comments

        # Deduplicate revisions: keep latest timestamp or latest _rev_
        prev = raw_posts.get(base_id)
        if prev is None or int(merged.get("timestamp") or 0) >= int(prev.get("timestamp") or 0):
            raw_posts[base_id] = merged

    guides_result = []
    community_result = []
    cat_labels = {
        "qna": "육아 Q&A",
        "qa": "육아 Q&A",
        "info": "육아 정보공유",
        "lounge": "육아 라운지",
        "talk": "육아 일상·고민",
        "newborn": "신생아·영아",
        "toddler": "유아·어린이집",
        "toddler_early": "영유아·병원 추천",
        "local": "우리 동네 소식",
    }

    for pid, p in raw_posts.items():
        if pid in deleted_ids or p.get("_docId") in deleted_ids:
            continue

        # Filter out pending scheduled posts
        is_scheduled = bool(p.get("isScheduled"))
        sched_at = p.get("scheduledAt")
        sched_ms = None
        if isinstance(sched_at, (int, float)):
            sched_ms = int(sched_at)
        elif isinstance(sched_at, str) and sched_at.strip():
            try:
                dt = datetime.fromisoformat(sched_at.replace("Z", "+00:00"))
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=KST)
                sched_ms = int(dt.timestamp() * 1000)
            except Exception:
                sched_ms = None

        ts_ms = int(p.get("timestamp") or 0)
        created_str = str(p.get("createdAt") or "")
        if is_scheduled and sched_ms and sched_ms > now_ms:
            continue
        if "예약" in created_str and ts_ms > now_ms:
            continue

        title = str(p.get("title") or "").strip()
        if not title:
            continue

        is_ai = bool(p.get("isAiReport") or p.get("isYoutubeSummary") or p.get("category") == "guide")
        content_html = str(p.get("contentHtml") or p.get("content") or "").strip()

        if is_ai:
            if len(strip_html(content_html)) < 80:
                continue
            guides_result.append({
                "id": pid,
                "title": title,
                "contentHtml": content_html,
                "rawText": str(p.get("rawTextContent") or p.get("content") or ""),
                "guideType": str(p.get("guideType") or "all"),
                "youtubeVideoId": str(p.get("youtubeVideoId") or ""),
                "createdAt": created_str,
                "timestamp": ts_ms,
            })
        else:
            # Skip automated test posts containing 10+ digit timestamps in the title
            if re.search(r"\d{10,}", title):
                continue
            plain_body = strip_html(content_html)
            real_cmts = p.get("_realComments") or []
            cmt_chars = sum(len(strip_html(str(c.get("content") or ""))) for c in real_cmts)
            # Quality guard: combined body + comments >= 80 chars so Google never flags thin content
            if len(plain_body) + cmt_chars < 80:
                continue
            author_obj = p.get("author") if isinstance(p.get("author"), dict) else {}
            author_name = str(author_obj.get("nickname") or p.get("authorName") or "도담톡 회원")
            cat_key = str(p.get("category") or "talk")
            community_result.append({
                "id": pid,
                "title": title,
                "category": cat_labels.get(cat_key, "육아 커뮤니티"),
                "author": author_name,
                "contentHtml": content_html,
                "plainText": plain_body,
                "comments": real_cmts,
                "createdAt": created_str,
                "timestamp": ts_ms,
            })

    guides_result.sort(key=lambda x: x["timestamp"], reverse=True)
    community_result.sort(key=lambda x: x["timestamp"], reverse=True)

    # Deduplicate guides by youtubeVideoId or normalized title
    deduped_guides = []
    seen_yt: set[str] = set()
    seen_titles: set[str] = set()
    for item in guides_result:
        yt_id = str(item.get("youtubeVideoId") or "").strip()
        norm_title = re.sub(r"\[[^\]]*\]|\s+", "", item["title"])[:24]
        if yt_id and yt_id in seen_yt:
            continue
        if norm_title and norm_title in seen_titles:
            continue
        if yt_id:
            seen_yt.add(yt_id)
        if norm_title:
            seen_titles.add(norm_title)
        deduped_guides.append(item)

    # Deduplicate community posts by normalized title
    deduped_community = []
    seen_comm_titles: set[str] = set()
    for item in community_result:
        norm_title = re.sub(r"\[[^\]]*\]|\s+", "", item["title"])[:24]
        if norm_title and norm_title in seen_comm_titles:
            continue
        if norm_title:
            seen_comm_titles.add(norm_title)
        deduped_community.append(item)

    return deduped_guides, deduped_community


def extract_json_after_marker(file_path: Path, marker_regex: str):
    """Extract a JSON array or object starting right after a JS assignment marker."""
    if not file_path.exists():
        return None
    text = file_path.read_text(encoding="utf-8", errors="replace")
    m = re.search(marker_regex, text)
    if not m:
        return None
    start = m.end()
    # Skip whitespace
    while start < len(text) and text[start] in " \t\r\n":
        start += 1
    decoder = json.JSONDecoder()
    try:
        obj, _ = decoder.raw_decode(text, start)
        return obj
    except Exception:
        return None


def load_hub_data():
    # 1. Events
    ev_raw = extract_json_after_marker(ROOT / "js" / "events_data.js", r"window\.DODAM_NATIONWIDE_EVENTS\s*=") or []
    events = [
        {
            "title": e.get("title") or e.get("name") or "",
            "region": e.get("regionName") or e.get("region") or "",
            "location": e.get("location") or e.get("place") or "",
            "startDate": e.get("startDate") or e.get("date") or "",
            "endDate": e.get("endDate") or "",
            "fee": e.get("fee") or e.get("price") or "상세 확인",
            "summary": e.get("summary") or e.get("description") or e.get("targetAudience") or "",
        }
        for e in ev_raw[:40]
        if isinstance(e, dict)
    ]

    # 2. Places (Restaurants + Attractions)
    rest_raw = extract_json_after_marker(ROOT / "js" / "restaurants_data.js", r"window\.DODAM_NATIONWIDE_RESTAURANTS\s*=") or []
    attr_raw = extract_json_after_marker(ROOT / "js" / "attractions_data.js", r"window\.DODAM_NATIONWIDE_ATTRACTIONS\s*=") or []
    places = [
        {
            "name": r.get("name") or "",
            "kind": "예스키즈존 맛집",
            "region": r.get("regionName") or r.get("region") or "",
            "address": r.get("address") or r.get("location") or "",
            "summary": r.get("summary") or r.get("representativeMenu") or r.get("reviewSummary") or "",
        }
        for r in rest_raw[:25]
        if isinstance(r, dict)
    ] + [
        {
            "name": a.get("name") or "",
            "kind": a.get("categoryName") or "가족 나들이 명소",
            "region": a.get("regionName") or a.get("region") or "",
            "address": a.get("address") or a.get("location") or "",
            "summary": a.get("summary") or a.get("representativeMenu") or "",
        }
        for a in attr_raw[:25]
        if isinstance(a, dict)
    ]

    # 3. Policies (JS object literal with single quotes)
    policies = []
    pol_path = ROOT / "js" / "policies_data.js"
    if pol_path.exists():
        ptxt = pol_path.read_text(encoding="utf-8", errors="replace")
        # Extract policy blocks inside policies: [ ... ]
        m_pol = re.search(r"policies\s*:\s*\[", ptxt)
        if m_pol:
            chunk = ptxt[m_pol.end():]
            for block in re.findall(r"\{[^{}]*?title\s*:\s*['\"]([^'\"]+)['\"][^{}]*?\}", chunk, flags=re.S):
                pass
            # Better block scan by splitting on "\n    {"
            for blk in re.split(r"\n\s*\{\s*\n", chunk):
                t_m = re.search(r"title\s*:\s*['\"]([^'\"]+)['\"]", blk)
                if not t_m:
                    continue
                r_m = re.search(r"(?:regionName|region|agency)\s*:\s*['\"]([^'\"]+)['\"]", blk)
                b_m = re.search(r"(?:benefit|amount|summary|description)\s*:\s*['\"]([^'\"]+)['\"]", blk)
                tg_m = re.search(r"(?:target|targetAudience)\s*:\s*['\"]([^'\"]+)['\"]", blk)
                policies.append({
                    "title": t_m.group(1),
                    "region": r_m.group(1) if r_m else "전국",
                    "benefit": b_m.group(1) if b_m else "",
                    "target": tg_m.group(1) if tg_m else "",
                })
                if len(policies) >= 35:
                    break

    # 4. Schools
    raw_schools = extract_json_after_marker(ROOT / "js" / "schools_data.js", r"const\s+rawSchools\s*=") or []
    lvl_map = {"elementary": "초등학교", "middle": "중학교", "high": "고등학교"}
    schools = []
    for row in raw_schools[:25]:
        if isinstance(row, list) and len(row) >= 14:
            schools.append({
                "name": str(row[1]),
                "level": lvl_map.get(str(row[2]), str(row[2])),
                "region": str(row[4]),
                "summary": f"{row[6]} · {row[12]} · {row[13]}",
            })

    # 5. Admissions
    adm_obj = extract_json_after_marker(ROOT / "js" / "admissions_data.js", r"window\.DODAM_ADMISSIONS_DATA\s*=") or {}
    adm_list = adm_obj.get("guides") or adm_obj.get("items") or []
    admissions = [
        {
            "title": a.get("title") or "",
            "date": a.get("date") or a.get("publishedAt") or "",
            "category": a.get("categoryName") or a.get("category") or "교육부 공식 공시",
            "summary": a.get("summary") or "",
        }
        for a in adm_list[:20]
        if isinstance(a, dict)
    ]

    return events, places, policies, schools, admissions


def build_page_shell(
    *,
    title: str,
    description: str,
    canonical: str,
    badge: str,
    heading: str,
    subtitle: str,
    body_html: str,
    cta_href: str,
    cta_label: str,
    json_ld: dict,
    related_links: list[tuple[str, str]],
) -> str:
    t_esc = html_lib.escape(title)
    d_esc = html_lib.escape(description)
    c_esc = html_lib.escape(canonical)
    h_esc = html_lib.escape(heading)
    s_esc = html_lib.escape(subtitle)
    b_esc = html_lib.escape(badge)
    ld_json = json.dumps(json_ld, ensure_ascii=False, indent=2)

    rel_items = "\n".join(
        f'          <li><a href="{html_lib.escape(u)}">{html_lib.escape(lbl)}</a></li>'
        for lbl, u in related_links
    )

    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <title>{t_esc}</title>
  <meta name="description" content="{d_esc}" />
  <link rel="canonical" href="{c_esc}" />
  <meta property="og:title" content="{t_esc}" />
  <meta property="og:description" content="{d_esc}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{c_esc}" />
  <meta property="og:image" content="https://dodamtalk.com/og-image.png" />
  <meta property="og:site_name" content="도담톡 (DodamTalk)" />
  <meta property="og:locale" content="ko_KR" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{t_esc}" />
  <meta name="twitter:description" content="{d_esc}" />
  <meta name="twitter:image" content="https://dodamtalk.com/og-image.png" />
  <script type="application/ld+json">
{ld_json}
  </script>
  <style>
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; background: #fafaf9; color: #1e293b; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; line-height: 1.75; }}
    a {{ color: #047857; text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}
    .topbar {{ background: #fff; border-bottom: 1px solid #e7e5e4; position: sticky; top: 0; z-index: 20; }}
    .topbar-inner {{ max-width: 900px; margin: 0 auto; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }}
    .brand {{ font-weight: 900; font-size: 18px; color: #047857; }}
    .nav {{ display: flex; gap: 14px; font-size: 13px; font-weight: 700; flex-wrap: wrap; }}
    .nav a {{ color: #475569; }}
    .wrap {{ max-width: 900px; margin: 28px auto; padding: 0 16px; }}
    .card {{ background: #fff; border: 1px solid #e7e5e4; border-radius: 20px; padding: 28px 26px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 22px; }}
    .badge {{ display: inline-block; padding: 5px 12px; border-radius: 999px; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-size: 12px; font-weight: 800; }}
    h1 {{ font-size: 26px; line-height: 1.38; color: #0f172a; margin: 14px 0 10px; font-weight: 900; }}
    .subtitle {{ color: #64748b; font-size: 14.5px; margin: 0 0 18px; }}
    .cta-row {{ display: flex; flex-wrap: wrap; gap: 10px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; margin-bottom: 24px; }}
    .btn-primary {{ display: inline-block; padding: 10px 18px; border-radius: 12px; background: #059669; color: #fff; font-weight: 800; font-size: 13.5px; }}
    .btn-secondary {{ display: inline-block; padding: 10px 16px; border-radius: 12px; background: #f1f5f9; color: #334155; font-weight: 700; font-size: 13.5px; }}
    .article-body img {{ max-width: 100%; height: auto; border-radius: 12px; margin: 18px auto; display: block; }}
    .article-body h2 {{ font-size: 19px; font-weight: 900; color: #0f172a; margin: 30px 0 12px; padding-left: 12px; border-left: 4px solid #059669; }}
    .article-body p {{ font-size: 15.5px; line-height: 1.9; color: #334155; margin: 0 0 14px; }}
    .item-box {{ background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 14px; padding: 16px 18px; margin-bottom: 12px; }}
    .item-box h3 {{ margin: 0 0 6px; font-size: 16px; color: #0f172a; font-weight: 800; }}
    .item-meta {{ font-size: 12.5px; color: #047857; font-weight: 700; margin: 0 0 6px; }}
    .item-desc {{ font-size: 14px; color: #475569; margin: 0; line-height: 1.7; }}
    .related h2 {{ font-size: 16px; font-weight: 900; margin: 0 0 12px; color: #0f172a; }}
    .related ul {{ margin: 0; padding-left: 18px; display: grid; gap: 8px; font-size: 14px; font-weight: 600; }}
    footer {{ background: #fff; border-top: 1px solid #e7e5e4; margin-top: 40px; }}
    .footer-inner {{ max-width: 900px; margin: 0 auto; padding: 20px 16px; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; font-size: 12px; color: #64748b; }}
    .footer-links {{ display: flex; flex-wrap: wrap; gap: 12px; font-weight: 700; }}
  </style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <a href="/" class="brand">🌱 도담톡 (DodamTalk)</a>
      <nav class="nav">
        <a href="/guides">육아백과</a>
        <a href="/guides/community">커뮤니티</a>
        <a href="/guides/events">가족행사</a>
        <a href="/guides/places">나들이·맛집</a>
        <a href="/guides/policies">출산지원금</a>
        <a href="/guides/schools">학군·입시</a>
      </nav>
    </div>
  </header>

  <main class="wrap">
    <article class="card">
      <span class="badge">{b_esc}</span>
      <h1>{h_esc}</h1>
      <p class="subtitle">{s_esc}</p>
      <div class="cta-row">
        <a href="{html_lib.escape(cta_href)}" class="btn-primary">{html_lib.escape(cta_label)}</a>
        <a href="/guides" class="btn-secondary">📚 육아·정책 백과 전체보기</a>
      </div>
      <div class="article-body">
{body_html}
      </div>
    </article>

    <section class="card related">
      <h2>함께 읽으면 좋은 도담톡 가이드</h2>
      <ul>
{rel_items}
      </ul>
    </section>
  </main>

  <footer>
    <div class="footer-inner">
      <div>© 2026 도담톡 (DodamTalk · dodamtalk.com). All rights reserved.</div>
      <div class="footer-links">
        <a href="/about">서비스 소개</a>
        <a href="/guides">육아·정책 백과</a>
        <a href="/privacy">개인정보처리방침</a>
        <a href="/terms">이용약관</a>
        <a href="/contact">문의하기</a>
      </div>
    </div>
  </footer>
</body>
</html>
"""


def update_index_and_guides_links(report_entries: list[dict], community_entries: list[dict]):
    # 1. Update index.html between <!-- AUTO-SEO-LINKS-START --> and <!-- AUTO-SEO-LINKS-END -->
    idx_path = ROOT / "index.html"
    if idx_path.exists():
        idx_txt = idx_path.read_text(encoding="utf-8")
        hub_links = [
            '        <span class="text-slate-400 font-extrabold mr-1">📌 분야별 데이터 아카이브:</span>',
            '        <a href="/guides/community" class="px-2.5 py-1 rounded-lg bg-rose-50/80 border border-rose-200 text-rose-700 hover:bg-rose-100 transition">💬 육아 커뮤니티 인기글</a>',
            '        <a href="/guides/events" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">🎉 전국 가족 행사·축제</a>',
            '        <a href="/guides/places" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">🍽️ 예스키즈존 나들이·맛집</a>',
            '        <a href="/guides/policies" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">💵 2026 출산·양육 지원금</a>',
            '        <a href="/guides/schools" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">🏫 전국 학군·입시 분석</a>',
        ]
        for r in report_entries[:12]:
            short_t = r["title"].replace("[육아가이드]", "").strip()
            if len(short_t) > 26:
                short_t = short_t[:25] + "…"
            hub_links.append(
                f'        <a href="/reports/{html_lib.escape(r["id"])}" class="px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition">📖 {html_lib.escape(short_t)}</a>'
            )
        for cp in community_entries[:8]:
            short_t = cp["title"].strip()
            if len(short_t) > 26:
                short_t = short_t[:25] + "…"
            hub_links.append(
                f'        <a href="/posts/{html_lib.escape(cp["id"])}" class="px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-900 hover:bg-amber-100 transition">💬 {html_lib.escape(short_t)}</a>'
            )
        replacement = "<!-- AUTO-SEO-LINKS-START -->\n" + "\n".join(hub_links) + "\n        <!-- AUTO-SEO-LINKS-END -->"
        new_idx = re.sub(
            r"<!-- AUTO-SEO-LINKS-START -->.*?<!-- AUTO-SEO-LINKS-END -->",
            lambda _: replacement,
            idx_txt,
            flags=re.S,
        )
        if new_idx != idx_txt:
            idx_path.write_text(new_idx, encoding="utf-8")

    # 2. Update guides.html between <!-- AUTO-REPORTS-START --> and <!-- AUTO-REPORTS-END -->
    gd_path = ROOT / "guides.html"
    if gd_path.exists():
        gd_txt = gd_path.read_text(encoding="utf-8")
        cards = []
        for r in report_entries:
            t_esc = html_lib.escape(r["title"])
            d_esc = html_lib.escape(r["desc"])
            cards.append(
                f'        <li class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 transition">'
                f'<a href="/reports/{html_lib.escape(r["id"])}" class="block font-extrabold text-slate-900 hover:text-emerald-700 text-sm">{t_esc}</a>'
                f'<p class="text-xs text-slate-500 mt-1 line-clamp-2">{d_esc}</p></li>'
            )
        comm_cards = []
        for cp in community_entries:
            t_esc = html_lib.escape(cp["title"])
            d_esc = html_lib.escape(cp["desc"])
            comm_cards.append(
                f'        <li class="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-200/70 hover:border-amber-400 transition">'
                f'<a href="/posts/{html_lib.escape(cp["id"])}" class="block font-extrabold text-slate-900 hover:text-amber-800 text-sm">{t_esc}</a>'
                f'<p class="text-xs text-slate-500 mt-1 line-clamp-2">{d_esc}</p></li>'
            )
        section_html = f"""<!-- AUTO-REPORTS-START -->
    <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs">DODAMTALK ARCHIVE · {TODAY} 기준</span>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-2">도담톡 최신 육아·교육 심층 리포트 &amp; 커뮤니티 전체 목록</h2>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 text-xs font-bold">
        <a href="/guides/community" class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition">💬 육아 커뮤니티·Q&amp;A 모음</a>
        <a href="/guides/events" class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition">🎉 전국 가족 행사·축제 일정</a>
        <a href="/guides/places" class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition">🍽️ 예스키즈존 맛집·나들이 명소</a>
        <a href="/guides/policies" class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition">💵 2026 출산·양육 지원금 총정리</a>
        <a href="/guides/schools" class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition">🏫 전국 학군 랭킹 &amp; 2028 대입 공시</a>
      </div>
      <h3 class="text-base font-black text-slate-900 pt-2">📖 AI 육아·교육 심층 리포트 ({len(report_entries)}건)</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
{chr(10).join(cards)}
      </ul>
      <h3 class="text-base font-black text-slate-900 pt-3">💬 육아 커뮤니티·Q&amp;A·정보공유 ({len(community_entries)}건)</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
{chr(10).join(comm_cards)}
      </ul>
    </section>
    <!-- AUTO-REPORTS-END -->"""
        new_gd = re.sub(
            r"<!-- AUTO-REPORTS-START -->.*?<!-- AUTO-REPORTS-END -->",
            lambda _: section_html,
            gd_txt,
            flags=re.S,
        )
        if new_gd != gd_txt:
            gd_path.write_text(new_gd, encoding="utf-8")


def main():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    GUIDES_DIR.mkdir(parents=True, exist_ok=True)

    posts, community_posts = fetch_firestore_posts()
    events, places, policies, schools, admissions = load_hub_data()

    # Keep existing guide-seed-*.html entries in the list if not in Firestore
    seen_ids = {p["id"] for p in posts}
    seed_entries = []
    for seed_file in sorted(REPORTS_DIR.glob("guide-seed-*.html")):
        sid = seed_file.stem
        if sid not in seen_ids:
            raw_html = seed_file.read_text(encoding="utf-8", errors="replace")
            t_m = re.search(r"<h1[^>]*>(.*?)</h1>", raw_html, flags=re.S)
            d_m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', raw_html)
            seed_entries.append({
                "id": sid,
                "url": f"{BASE_URL}/reports/{sid}",
                "title": strip_html(t_m.group(1)) if t_m else sid,
                "desc": html_lib.unescape(d_m.group(1)) if d_m else "",
            })

    hub_nav_links = [
        ("💬 도담톡 육아 커뮤니티·Q&A·정보공유 모음", "/guides/community"),
        ("🎉 전국 가족 행사·축제 일정 아카이브", "/guides/events"),
        ("🍽️ 전국 예스키즈존 맛집·나들이 명소 가이드", "/guides/places"),
        ("💵 2026 정부·지자체 출산·양육 지원금 총정리", "/guides/policies"),
        ("🏫 전국 초·중·고 학군 & 2028 대입 입시 가이드", "/guides/schools"),
    ]

    # Build report entries
    all_report_links = [(p["title"], f"/reports/{p['id']}") for p in posts] + [
        (s["title"], f"/reports/{s['id']}") for s in seed_entries
    ]

    report_entries = []
    for idx, post in enumerate(posts):
        pid = post["id"]
        title = post["title"]
        raw_html = post["contentHtml"]
        raw_html = re.sub(r"<script[^>]*>.*?</script>", "", raw_html, flags=re.S | re.I)
        desc = truncate_desc(post["rawText"] or raw_html, 155)
        canonical = f"{BASE_URL}/reports/{pid}"
        subtitle = f"도담톡 육아·교육 심층 리포트 · 발행일 {TODAY}"

        other_reports = [lnk for lnk in all_report_links if lnk[1] != f"/reports/{pid}"][:8]
        related = hub_nav_links + other_reports

        json_ld = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": desc,
            "url": canonical,
            "datePublished": TODAY,
            "dateModified": TODAY,
            "inLanguage": "ko-KR",
            "author": {"@type": "Organization", "name": "도담톡 (DodamTalk)"},
            "publisher": {
                "@type": "Organization",
                "name": "도담톡 (DodamTalk)",
                "logo": {"@type": "ImageObject", "url": f"{BASE_URL}/og-image.png"},
            },
        }

        page_html = build_page_shell(
            title=f"{title} | 도담톡 육아 심층 가이드",
            description=desc,
            canonical=canonical,
            badge="도담톡 육아·교육 심층 리포트",
            heading=title,
            subtitle=subtitle,
            body_html=raw_html,
            cta_href=f"/?post={pid}#board",
            cta_label="💬 도담톡 원문·댓글·인포그래픽 보기",
            json_ld=json_ld,
            related_links=related,
        )
        (REPORTS_DIR / f"{pid}.html").write_text(page_html, encoding="utf-8")
        report_entries.append({"id": pid, "url": canonical, "title": title, "desc": desc})

    report_entries.extend(seed_entries)

    # 2. Generate 4 Rich Hub Pages
    # (a) Events
    ev_items = []
    for e in events:
        if not e["title"]:
            continue
        dt_str = f"{e['startDate']} ~ {e['endDate']}" if e["endDate"] else e["startDate"]
        meta_parts = [p for p in [e["region"], e["location"], dt_str, f"이용요금: {e['fee']}"] if p]
        ev_items.append(
            f'<div class="item-box"><h3>{html_lib.escape(e["title"])}</h3>'
            f'<p class="item-meta">{html_lib.escape(" · ".join(meta_parts))}</p>'
            f'<p class="item-desc">{html_lib.escape(e["summary"] or "아이와 함께 방문하기 좋은 가족 참여형 지역 축제·체험 행사입니다.")}</p></div>'
        )
    events_body = (
        f"<p>전국 17개 시·도 공공데이터와 지자체 문화관광 포털에서 매일 자동 수집되는 유아·어린이·가족 대상 축제, 공연, 박람회, 체험 행사 목록입니다. ({TODAY} 기준 주요 {len(ev_items)}건 수록)</p>"
        + "\n".join(ev_items)
    )
    (GUIDES_DIR / "events.html").write_text(
        build_page_shell(
            title="전국 가족 행사·어린이 축제·체험 일정 총정리 | 도담톡",
            description="전국 17개 시도 유아·어린이·가족과 함께 가볼 만한 축제, 전시, 공연, 키즈 대회 및 체험 행사 최신 일정 아카이브입니다.",
            canonical=f"{BASE_URL}/guides/events",
            badge="전국 가족 행사·축제 아카이브",
            heading="전국 가족 행사·어린이 축제·체험 일정 총정리",
            subtitle=f"전국 17개 시·도 실시간 가족 나들이·축제·대회 캘린더 ({TODAY} 업데이트)",
            body_html=events_body,
            cta_href="/#events",
            cta_label="📅 전체 전국 행사 캘린더에서 지역별 필터링하기",
            json_ld={
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "전국 가족 행사·어린이 축제 일정 총정리",
                "url": f"{BASE_URL}/guides/events",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/events"] + all_report_links[:16],
        ),
        encoding="utf-8",
    )

    # (b) Places
    pl_items = []
    for pl in places:
        if not pl["name"]:
            continue
        meta_parts = [p for p in [pl["kind"], pl["region"], pl["address"]] if p]
        pl_items.append(
            f'<div class="item-box"><h3>{html_lib.escape(pl["name"])}</h3>'
            f'<p class="item-meta">{html_lib.escape(" · ".join(meta_parts))}</p>'
            f'<p class="item-desc">{html_lib.escape(pl["summary"] or "유모차 진입 및 가족 단위 방문에 적합한 안심 나들이·식당 추천 장소입니다.")}</p></div>'
        )
    places_body = (
        f"<p>아이와 함께 편하게 방문할 수 있는 전국 예스키즈존 안심식당, 유아숲체험원, 공공 키즈카페, 가족 테마파크 및 주말 나들이 명소 검증 리스트입니다. ({TODAY} 기준 주요 {len(pl_items)}곳 수록)</p>"
        + "\n".join(pl_items)
    )
    (GUIDES_DIR / "places.html").write_text(
        build_page_shell(
            title="전국 예스키즈존 맛집·아이와 가볼만한곳 나들이 명소 | 도담톡",
            description="유모차 접근성·아기의자·놀이공간을 고려한 전국 예스키즈존 안심식당과 공공 키즈카페, 유아숲체험원, 가족 나들이 명소 추천 목록입니다.",
            canonical=f"{BASE_URL}/guides/places",
            badge="전국 예스키즈존·가족 나들이 가이드",
            heading="전국 예스키즈존 맛집·아이와 가볼만한곳 나들이 명소",
            subtitle=f"실존 검증된 전국 가족 외식·주말 나들이 명소 큐레이션 ({TODAY} 업데이트)",
            body_html=places_body,
            cta_href="/#places",
            cta_label="🗺️ 도담톡 지도에서 내 주변 예스키즈존 찾기",
            json_ld={
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "전국 예스키즈존 맛집 및 가족 나들이 명소",
                "url": f"{BASE_URL}/guides/places",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/places"] + all_report_links[:16],
        ),
        encoding="utf-8",
    )

    # (c) Policies
    pol_items = []
    for pol in policies:
        if not pol["title"]:
            continue
        meta_parts = [p for p in [pol["region"], f"지원대상: {pol['target']}" if pol["target"] else ""] if p]
        pol_items.append(
            f'<div class="item-box"><h3>{html_lib.escape(pol["title"])}</h3>'
            f'<p class="item-meta">{html_lib.escape(" · ".join(meta_parts))}</p>'
            f'<p class="item-desc">{html_lib.escape(pol["benefit"] or "정부 및 지자체 출산·양육 지원 혜택 상세 안내")}</p></div>'
        )
    policies_body = (
        f"<p>2026년 최신 기준 첫만남이용권, 부모급여(0세 월 100만원·1세 월 50만원), 아동수당, 육아휴직 급여, 난임·산후조리비 및 전국 17개 시·도 지자체별 출산축하금과 다자녀 혜택을 정리했습니다. ({TODAY} 기준 주요 {len(pol_items)}건 수록)</p>"
        + "\n".join(pol_items)
    )
    (GUIDES_DIR / "policies.html").write_text(
        build_page_shell(
            title="2026 정부·지자체 출산지원금·부모급여·육아정책 총정리 | 도담톡",
            description="첫만남이용권, 부모급여, 아동수당, 육아휴직 급여 개편 및 전국 지자체별 출산축하금·다자녀 지원 혜택을 한눈에 비교하세요.",
            canonical=f"{BASE_URL}/guides/policies",
            badge="2026 출산·양육 지원금 총정리",
            heading="2026 정부·지자체 출산지원금·부모급여·육아정책 총정리",
            subtitle=f"놓치면 손해 보는 중앙정부 및 전국 지자체 출산·보육 현금·바우처 혜택 ({TODAY} 업데이트)",
            body_html=policies_body,
            cta_href="/#policies",
            cta_label="💵 우리 지역 출산지원금 맞춤 계산기 바로가기",
            json_ld={
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "2026 출산·양육 지원금 총정리",
                "url": f"{BASE_URL}/guides/policies",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/policies"] + all_report_links[:16],
        ),
        encoding="utf-8",
    )

    # (d) Schools & Admissions
    sc_items = []
    for s in schools:
        if not s["name"]:
            continue
        meta_parts = [p for p in [s["level"], s["region"]] if p]
        sc_items.append(
            f'<div class="item-box"><h3>{html_lib.escape(s["name"])}</h3>'
            f'<p class="item-meta">{html_lib.escape(" · ".join(meta_parts))}</p>'
            f'<p class="item-desc">{html_lib.escape(s["summary"] or "교육부 학교알리미 공시 기반 학군 분석 정보")}</p></div>'
        )
    adm_items = []
    for a in admissions:
        if not a["title"]:
            continue
        meta_parts = [p for p in [a["category"], a["date"]] if p]
        adm_items.append(
            f'<div class="item-box"><h3>{html_lib.escape(a["title"])}</h3>'
            f'<p class="item-meta">{html_lib.escape(" · ".join(meta_parts))}</p>'
            f'<p class="item-desc">{html_lib.escape(a["summary"] or "교육부 및 한국대학교육협의회 공식 발표 입시 안내")}</p></div>'
        )
    schools_body = (
        f"<p>전국 초·중·고 학군 랭킹, 배정 단지 분석, 고교학점제 및 2028 대입 개편안(내신 5등급제·통합형 수능) 관련 교육부 공식 공시 자료를 한눈에 확인할 수 있습니다. ({TODAY} 기준)</p>"
        + "<h2>전국 주요 학군·학교 정보</h2>"
        + "\n".join(sc_items)
        + "<h2>최신 교육부·대입 공식 공시 브리핑</h2>"
        + "\n".join(adm_items)
    )
    (GUIDES_DIR / "schools.html").write_text(
        build_page_shell(
            title="전국 초·중·고 학군 랭킹 & 2028 대입 입시 공식 공시 | 도담톡",
            description="전국 초·중·고 학군 분석, 특목·자사고 진학 정보 및 교육부·대교협 공식 2028 대입 개편안·수능·입시 공시 최신 요약입니다.",
            canonical=f"{BASE_URL}/guides/schools",
            badge="전국 학군·입시 정보 아카이브",
            heading="전국 초·중·고 학군 랭킹 & 2028 대입 입시 공식 공시",
            subtitle=f"학교알리미 공시 데이터 & 교육부 공식 입시 브리핑 ({TODAY} 업데이트)",
            body_html=schools_body,
            cta_href="/#schools",
            cta_label="🏫 도담톡 학군 지도·입시 포털에서 상세 검색하기",
            json_ld={
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "전국 학군 랭킹 및 2028 대입 입시 가이드",
                "url": f"{BASE_URL}/guides/schools",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/schools"] + all_report_links[:16],
        ),
        encoding="utf-8",
    )

    # 2.5 Generate Static Community Post Pages (/posts/<id>.html) & Community Hub (/guides/community.html)
    all_comm_links = [(cp["title"], f"/posts/{cp['id']}") for cp in community_posts]
    community_entries = []
    for cp in community_posts:
        pid = cp["id"]
        title = cp["title"]
        author = cp["author"]
        cat_lbl = cp["category"]
        canonical = f"{BASE_URL}/posts/{pid}"

        # Render paragraphs safely
        if "<p" in cp["contentHtml"] or "<div" in cp["contentHtml"] or "<br" in cp["contentHtml"]:
            body_inner = re.sub(r"<script[^>]*>.*?</script>", "", cp["contentHtml"], flags=re.S | re.I)
        else:
            paras = [p.strip() for p in re.split(r"\n+", cp["plainText"]) if p.strip()]
            body_inner = "\n".join(f"<p>{html_lib.escape(p)}</p>" for p in paras)

        # Render real comments
        cmt_blocks = []
        json_ld_comments = []
        for c in cp["comments"]:
            c_author = str(c.get("author") or "도담톡 회원")
            c_text = strip_html(str(c.get("content") or ""))
            if not c_text:
                continue
            c_badge = str(c.get("childBadge") or c.get("level") or "")
            meta_str = f"{c_author} · {c_badge}" if c_badge else c_author
            cmt_blocks.append(
                f'<div class="item-box"><p class="item-meta">💬 {html_lib.escape(meta_str)}</p>'
                f'<p class="item-desc">{html_lib.escape(c_text)}</p></div>'
            )
            json_ld_comments.append({
                "@type": "Comment",
                "text": c_text,
                "author": {"@type": "Person", "name": c_author},
            })

        if cmt_blocks:
            body_inner += f"\n<h2>도담톡 부모님 댓글·답변 ({len(cmt_blocks)}개)</h2>\n" + "\n".join(cmt_blocks)

        desc_src = cp["plainText"] + (" " + " ".join(c["text"] for c in json_ld_comments[:2]) if json_ld_comments else "")
        desc = truncate_desc(desc_src, 155)
        subtitle = f"{cat_lbl} · 작성자 {author} · 댓글 {len(cmt_blocks)}개 · {TODAY} 기준"

        other_comm = [lnk for lnk in all_comm_links if lnk[1] != f"/posts/{pid}"][:6]
        related = hub_nav_links + other_comm + all_report_links[:4]

        json_ld = {
            "@context": "https://schema.org",
            "@type": "DiscussionForumPosting",
            "headline": title,
            "text": cp["plainText"],
            "url": canonical,
            "datePublished": TODAY,
            "dateModified": TODAY,
            "inLanguage": "ko-KR",
            "author": {"@type": "Person", "name": author},
            "publisher": {
                "@type": "Organization",
                "name": "도담톡 (DodamTalk)",
                "logo": {"@type": "ImageObject", "url": f"{BASE_URL}/og-image.png"},
            },
        }
        if json_ld_comments:
            json_ld["comment"] = json_ld_comments

        page_html = build_page_shell(
            title=f"{title} | 도담톡 육아 커뮤니티",
            description=desc,
            canonical=canonical,
            badge=f"도담톡 {cat_lbl}",
            heading=title,
            subtitle=subtitle,
            body_html=body_inner,
            cta_href=f"/?post={pid}#board",
            cta_label="💬 도담톡 게시판에서 원문 보기·댓글 달기",
            json_ld=json_ld,
            related_links=related,
        )
        (POSTS_DIR / f"{pid}.html").write_text(page_html, encoding="utf-8")
        community_entries.append({"id": pid, "url": canonical, "title": title, "desc": desc, "category": cat_lbl, "commentCount": len(cmt_blocks)})

    # Community hub page (/guides/community.html)
    comm_hub_items = []
    for ce in community_entries:
        comm_hub_items.append(
            f'<div class="item-box"><h3><a href="/posts/{html_lib.escape(ce["id"])}">{html_lib.escape(ce["title"])}</a></h3>'
            f'<p class="item-meta">{html_lib.escape(ce["category"])} · 댓글 {ce["commentCount"]}개</p>'
            f'<p class="item-desc">{html_lib.escape(ce["desc"])}</p></div>'
        )
    comm_hub_body = (
        f"<p>대한민국 엄마·아빠들이 직접 나누는 육아 고민, 소아과·어린이집 추천, 독서·학습 습관, 주말 나들이 후기 및 실전 육아 꿀팁 모음입니다. ({TODAY} 기준 {len(comm_hub_items)}건 수록)</p>"
        + "\n".join(comm_hub_items)
    )
    (GUIDES_DIR / "community.html").write_text(
        build_page_shell(
            title="도담톡 육아 커뮤니티·Q&A·실전 육아 꿀팁 모음 | 도담톡",
            description="신생아 수면·이유식 질문부터 초등 독서·입학 준비, 동네 소아과 추천, 아이랑 주말 나들이 후기까지 도담톡 부모님들의 생생한 육아 커뮤니티 글 모음입니다.",
            canonical=f"{BASE_URL}/guides/community",
            badge="도담톡 육아 커뮤니티 아카이브",
            heading="도담톡 육아 커뮤니티·Q&A·실전 육아 꿀팁 모음",
            subtitle=f"부모님들의 생생한 육아 고민과 실전 답변 아카이브 ({TODAY} 업데이트)",
            body_html=comm_hub_body,
            cta_href="/#board",
            cta_label="✍️ 도담톡 실시간 게시판에서 글쓰기·소통하기",
            json_ld={
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": "도담톡 육아 커뮤니티·Q&A 모음",
                "url": f"{BASE_URL}/guides/community",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/community"] + all_report_links[:12],
        ),
        encoding="utf-8",
    )

    # 3. Update index.html & guides.html with full static links
    update_index_and_guides_links(report_entries, community_entries)

    # 4. Update sitemap.xml
    sitemap_urls = [
        (f"{BASE_URL}/", "daily", "1.0"),
        (f"{BASE_URL}/guides", "daily", "0.9"),
        (f"{BASE_URL}/guides/community", "daily", "0.9"),
        (f"{BASE_URL}/guides/events", "daily", "0.9"),
        (f"{BASE_URL}/guides/places", "daily", "0.9"),
        (f"{BASE_URL}/guides/policies", "weekly", "0.9"),
        (f"{BASE_URL}/guides/schools", "weekly", "0.9"),
    ]
    for r in report_entries:
        sitemap_urls.append((r["url"], "weekly", "0.85"))
    for ce in community_entries:
        sitemap_urls.append((ce["url"], "weekly", "0.8"))
    sitemap_urls.extend([
        (f"{BASE_URL}/about", "monthly", "0.7"),
        (f"{BASE_URL}/contact", "monthly", "0.6"),
        (f"{BASE_URL}/privacy", "yearly", "0.4"),
        (f"{BASE_URL}/terms", "yearly", "0.4"),
    ])

    sm_lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u, freq, prio in sitemap_urls:
        sm_lines.append("  <url>")
        sm_lines.append(f"    <loc>{html_lib.escape(u)}</loc>")
        sm_lines.append(f"    <lastmod>{TODAY}</lastmod>")
        sm_lines.append(f"    <changefreq>{freq}</changefreq>")
        sm_lines.append(f"    <priority>{prio}</priority>")
        sm_lines.append("  </url>")
    sm_lines.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(sm_lines) + "\n", encoding="utf-8")

    # 5. Update rss.xml
    rss_items = [
        (f"{BASE_URL}/guides/community", "도담톡 육아 커뮤니티·Q&A·실전 육아 꿀팁 모음", "부모님들이 직접 나누는 육아 고민, 소아과 추천, 학습 습관 및 나들이 후기 모음"),
        (f"{BASE_URL}/guides/events", "전국 가족 행사·어린이 축제 일정 총정리", "전국 17개 시·도 실시간 가족 축제·체험·대회 일정 아카이브"),
        (f"{BASE_URL}/guides/places", "전국 예스키즈존 맛집·아이와 가볼만한곳 나들이 명소", "실존 검증된 전국 예스키즈존 안심식당과 가족 나들이 명소 추천"),
        (f"{BASE_URL}/guides/policies", "2026 정부·지자체 출산지원금·부모급여 총정리", "첫만남이용권, 부모급여, 아동수당 및 지자체별 출산축하금 안내"),
        (f"{BASE_URL}/guides/schools", "전국 초·중·고 학군 랭킹 & 2028 대입 입시 공식 공시", "전국 학군 분석 및 교육부 공식 입시 브리핑"),
    ]
    for r in report_entries:
        rss_items.append((r["url"], r["title"], r["desc"]))
    for ce in community_entries:
        rss_items.append((ce["url"], ce["title"], ce["desc"]))

    rss_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        "  <channel>",
        "    <title>도담톡 (DodamTalk) — 대한민국 육아·정책·학군 심층 가이드</title>",
        f"    <link>{BASE_URL}/</link>",
        f'    <atom:link href="{BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />',
        "    <description>전국 가족 행사·예스키즈존 맛집·2026 출산지원금·학군 입시·육아 커뮤니티 및 AI 심층 리포트</description>",
        "    <language>ko</language>",
        f"    <lastBuildDate>{RSS_DATE}</lastBuildDate>",
    ]
    for u, t, d in rss_items:
        rss_lines.extend([
            "    <item>",
            f"      <title>{html_lib.escape(t)}</title>",
            f"      <link>{html_lib.escape(u)}</link>",
            f"      <guid isPermaLink=\"true\">{html_lib.escape(u)}</guid>",
            f"      <description>{html_lib.escape(d)}</description>",
            f"      <pubDate>{RSS_DATE}</pubDate>",
            "    </item>",
        ])
    rss_lines.extend(["  </channel>", "</rss>"])
    (ROOT / "rss.xml").write_text("\n".join(rss_lines) + "\n", encoding="utf-8")

    print(
        json.dumps(
            {
                "today": TODAY,
                "reportsGenerated": len(posts),
                "totalReportsInSitemap": len(report_entries),
                "communityPostsGenerated": len(community_entries),
                "eventsCount": len(ev_items),
                "placesCount": len(pl_items),
                "policiesCount": len(pol_items),
                "schoolsCount": len(sc_items),
                "admissionsCount": len(adm_items),
                "sitemapUrls": len(sitemap_urls),
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
