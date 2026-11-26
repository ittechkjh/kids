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

        # Unpack extraMeta from comments (matches firebase_db.js unpackPostDoc)
        comments = fields.get("comments") if isinstance(fields.get("comments"), list) else []
        extra_meta = {}
        for c in comments:
            if isinstance(c, dict) and (c.get("isDodamMeta") or c.get("_dodam_meta") or c.get("__dodam_meta__")) and isinstance(c.get("meta"), dict):
                extra_meta = c["meta"]

        merged = {**fields, **extra_meta}
        base_id = re.sub(r"_rev_\d+$", "", str(merged.get("id") or doc_id))
        merged["id"] = base_id
        merged["_docId"] = doc_id

        # Deduplicate revisions: keep latest timestamp or latest _rev_
        prev = raw_posts.get(base_id)
        if prev is None or int(merged.get("timestamp") or 0) >= int(prev.get("timestamp") or 0):
            raw_posts[base_id] = merged

    result = []
    for pid, p in raw_posts.items():
        if pid in deleted_ids or p.get("_docId") in deleted_ids:
            continue
        is_ai = bool(p.get("isAiReport") or p.get("isYoutubeSummary") or p.get("category") == "guide")
        if not is_ai:
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
        content_html = str(p.get("contentHtml") or p.get("content") or "").strip()
        if not title or len(strip_html(content_html)) < 80:
            continue

        result.append({
            "id": pid,
            "title": title,
            "contentHtml": content_html,
            "rawText": str(p.get("rawTextContent") or p.get("content") or ""),
            "guideType": str(p.get("guideType") or "all"),
            "youtubeVideoId": str(p.get("youtubeVideoId") or ""),
            "createdAt": created_str,
            "timestamp": ts_ms,
        })

    result.sort(key=lambda x: x["timestamp"], reverse=True)

    # Deduplicate by youtubeVideoId or normalized title (keep latest, matching firebase_db.js)
    deduped = []
    seen_yt: set[str] = set()
    seen_titles: set[str] = set()
    for item in result:
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
        deduped.append(item)
    return deduped


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
        <a href="/guides.html">육아백과</a>
        <a href="/guides/events.html">가족행사</a>
        <a href="/guides/places.html">나들이·맛집</a>
        <a href="/guides/policies.html">출산지원금</a>
        <a href="/guides/schools.html">학군·입시</a>
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
        <a href="/guides.html" class="btn-secondary">📚 육아·정책 백과 전체보기</a>
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
        <a href="/about.html">서비스 소개</a>
        <a href="/guides.html">육아·정책 백과</a>
        <a href="/privacy.html">개인정보처리방침</a>
        <a href="/terms.html">이용약관</a>
        <a href="/contact.html">문의하기</a>
      </div>
    </div>
  </footer>
</body>
</html>
"""


def update_index_and_guides_links(report_entries: list[dict]):
    # 1. Update index.html between <!-- AUTO-SEO-LINKS-START --> and <!-- AUTO-SEO-LINKS-END -->
    idx_path = ROOT / "index.html"
    if idx_path.exists():
        idx_txt = idx_path.read_text(encoding="utf-8")
        hub_links = [
            '        <span class="text-slate-400 font-extrabold mr-1">📌 분야별 데이터 아카이브:</span>',
            '        <a href="/guides/events.html" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">🎉 전국 가족 행사·축제</a>',
            '        <a href="/guides/places.html" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">🍽️ 예스키즈존 나들이·맛집</a>',
            '        <a href="/guides/policies.html" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">💵 2026 출산·양육 지원금</a>',
            '        <a href="/guides/schools.html" class="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 hover:border-rose-300 hover:text-rose-600 transition">🏫 전국 학군·입시 분석</a>',
        ]
        for r in report_entries[:16]:
            short_t = r["title"].replace("[육아가이드]", "").strip()
            if len(short_t) > 26:
                short_t = short_t[:25] + "…"
            hub_links.append(
                f'        <a href="/reports/{html_lib.escape(r["id"])}.html" class="px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition">📖 {html_lib.escape(short_t)}</a>'
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
                f'<a href="/reports/{html_lib.escape(r["id"])}.html" class="block font-extrabold text-slate-900 hover:text-emerald-700 text-sm">{t_esc}</a>'
                f'<p class="text-xs text-slate-500 mt-1 line-clamp-2">{d_esc}</p></li>'
            )
        section_html = f"""<!-- AUTO-REPORTS-START -->
    <section class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs">DODAMTALK ARCHIVE · {TODAY} 기준</span>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-2">도담톡 최신 육아·교육 심층 리포트 &amp; 데이터 허브 전체 목록</h2>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 text-xs font-bold">
        <a href="/guides/events.html" class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition">🎉 전국 가족 행사·축제 일정</a>
        <a href="/guides/places.html" class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition">🍽️ 예스키즈존 맛집·나들이 명소</a>
        <a href="/guides/policies.html" class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition">💵 2026 출산·양육 지원금 총정리</a>
        <a href="/guides/schools.html" class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 hover:bg-indigo-100 transition">🏫 전국 학군 랭킹 &amp; 2028 대입 공시</a>
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
{chr(10).join(cards)}
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
    GUIDES_DIR.mkdir(parents=True, exist_ok=True)

    posts = fetch_firestore_posts()
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
                "url": f"{BASE_URL}/reports/{sid}.html",
                "title": strip_html(t_m.group(1)) if t_m else sid,
                "desc": html_lib.unescape(d_m.group(1)) if d_m else "",
            })

    hub_nav_links = [
        ("🎉 전국 가족 행사·축제 일정 아카이브", "/guides/events.html"),
        ("🍽️ 전국 예스키즈존 맛집·나들이 명소 가이드", "/guides/places.html"),
        ("💵 2026 정부·지자체 출산·양육 지원금 총정리", "/guides/policies.html"),
        ("🏫 전국 초·중·고 학군 & 2028 대입 입시 가이드", "/guides/schools.html"),
    ]

    # Build report entries
    all_report_links = [(p["title"], f"/reports/{p['id']}.html") for p in posts] + [
        (s["title"], f"/reports/{s['id']}.html") for s in seed_entries
    ]

    report_entries = []
    for idx, post in enumerate(posts):
        pid = post["id"]
        title = post["title"]
        raw_html = post["contentHtml"]
        raw_html = re.sub(r"<script[^>]*>.*?</script>", "", raw_html, flags=re.S | re.I)
        desc = truncate_desc(post["rawText"] or raw_html, 155)
        canonical = f"{BASE_URL}/reports/{pid}.html"
        subtitle = f"도담톡 육아·교육 심층 리포트 · 발행일 {TODAY}"

        other_reports = [lnk for lnk in all_report_links if lnk[1] != f"/reports/{pid}.html"][:8]
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
            canonical=f"{BASE_URL}/guides/events.html",
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
                "url": f"{BASE_URL}/guides/events.html",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/events.html"] + all_report_links[:16],
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
            canonical=f"{BASE_URL}/guides/places.html",
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
                "url": f"{BASE_URL}/guides/places.html",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/places.html"] + all_report_links[:16],
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
            canonical=f"{BASE_URL}/guides/policies.html",
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
                "url": f"{BASE_URL}/guides/policies.html",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/policies.html"] + all_report_links[:16],
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
            canonical=f"{BASE_URL}/guides/schools.html",
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
                "url": f"{BASE_URL}/guides/schools.html",
                "dateModified": TODAY,
                "inLanguage": "ko-KR",
            },
            related_links=[lnk for lnk in hub_nav_links if lnk[1] != "/guides/schools.html"] + all_report_links[:16],
        ),
        encoding="utf-8",
    )

    # 3. Update index.html & guides.html with full static links
    update_index_and_guides_links(report_entries)

    # 4. Update sitemap.xml
    sitemap_urls = [
        (f"{BASE_URL}/", "daily", "1.0"),
        (f"{BASE_URL}/guides.html", "daily", "0.9"),
        (f"{BASE_URL}/guides/events.html", "daily", "0.9"),
        (f"{BASE_URL}/guides/places.html", "daily", "0.9"),
        (f"{BASE_URL}/guides/policies.html", "weekly", "0.9"),
        (f"{BASE_URL}/guides/schools.html", "weekly", "0.9"),
    ]
    for r in report_entries:
        sitemap_urls.append((r["url"], "weekly", "0.85"))
    sitemap_urls.extend([
        (f"{BASE_URL}/about.html", "monthly", "0.7"),
        (f"{BASE_URL}/contact.html", "monthly", "0.6"),
        (f"{BASE_URL}/privacy.html", "yearly", "0.4"),
        (f"{BASE_URL}/terms.html", "yearly", "0.4"),
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
        (f"{BASE_URL}/guides/events.html", "전국 가족 행사·어린이 축제 일정 총정리", "전국 17개 시·도 실시간 가족 축제·체험·대회 일정 아카이브"),
        (f"{BASE_URL}/guides/places.html", "전국 예스키즈존 맛집·아이와 가볼만한곳 나들이 명소", "실존 검증된 전국 예스키즈존 안심식당과 가족 나들이 명소 추천"),
        (f"{BASE_URL}/guides/policies.html", "2026 정부·지자체 출산지원금·부모급여 총정리", "첫만남이용권, 부모급여, 아동수당 및 지자체별 출산축하금 안내"),
        (f"{BASE_URL}/guides/schools.html", "전국 초·중·고 학군 랭킹 & 2028 대입 입시 공식 공시", "전국 학군 분석 및 교육부 공식 입시 브리핑"),
    ]
    for r in report_entries:
        rss_items.append((r["url"], r["title"], r["desc"]))

    rss_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        "  <channel>",
        "    <title>도담톡 (DodamTalk) — 대한민국 육아·정책·학군 심층 가이드</title>",
        f"    <link>{BASE_URL}/</link>",
        f'    <atom:link href="{BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />',
        "    <description>전국 가족 행사·예스키즈존 맛집·2026 출산지원금·학군 입시 및 AI 육아 심층 리포트</description>",
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
