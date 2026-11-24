import asyncio
import html as html_lib
import json
import re
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
REPORTS_DIR = ROOT / "reports"
GUIDES_DIR = ROOT / "guides"
TODAY = "2026-11-24"
RSS_DATE = "Tue, 24 Nov 2026 09:30:00 +0900"


def clean_text(raw: str, max_len: int = 160) -> str:
    txt = re.sub(r"<[^>]+>", " ", raw or "")
    txt = html_lib.unescape(txt)
    txt = re.sub(r"\s+", " ", txt).strip()
    if len(txt) > max_len:
        return txt[: max_len - 1].rstrip() + "…"
    return txt


def safe_slug(post_id: str) -> str:
    return re.sub(r"[^A-Za-z0-9_-]", "-", str(post_id))


def render_page_shell(
    title: str,
    description: str,
    canonical_url: str,
    badge: str,
    heading: str,
    subtitle: str,
    body_html: str,
    app_cta_href: str,
    app_cta_label: str,
    related_links: list,
    json_ld: dict,
) -> str:
    t_esc = html_lib.escape(title)
    d_esc = html_lib.escape(description)
    c_esc = html_lib.escape(canonical_url)
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
        <a href="{html_lib.escape(app_cta_href)}" class="btn-primary">{html_lib.escape(app_cta_label)}</a>
        <a href="/guides.html" class="btn-secondary">전체 육아·정책 백과</a>
      </div>
      <div class="article-body">
        {body_html}
      </div>
    </article>

    <aside class="card related">
      <h2>📚 함께 보면 좋은 도담톡 육아·교육 정보</h2>
      <ul>
{rel_items}
      </ul>
    </aside>
  </main>

  <footer>
    <div class="footer-inner">
      <span>© 2026 도담톡 (DodamTalk · dodamtalk.com). All rights reserved.</span>
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


async def main():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    GUIDES_DIR.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            headless=True,
        )
        page = await browser.new_page()
        await page.goto("http://localhost:8080/#board", wait_until="networkidle")
        await page.wait_for_timeout(4500)

        payload = await page.evaluate(
            """() => {
            const now = Date.now();
            const posts = (window.app?.data?.posts || []).filter(p => {
                const isPending = (p.isScheduled && p.scheduledAt && new Date(p.scheduledAt).getTime() > now) ||
                    (String(p.createdAt || '').includes('예약') && Number(p.timestamp) > now);
                if (isPending) return false;
                return p.isAiReport || p.isYoutubeSummary || p.category === 'guide';
            }).map(p => ({
                id: p.id,
                title: p.title || '',
                contentHtml: p.contentHtml || p.content || '',
                rawText: p.rawTextContent || p.content || '',
                guideType: p.guideType || 'all',
                createdAt: p.createdAt || ''
            }));

            const events = (window.DODAM_NATIONWIDE_EVENTS || []).slice(0, 40).map(e => ({
                title: e.title || e.name || '',
                region: e.regionName || e.region || '',
                location: e.location || e.place || '',
                startDate: e.startDate || e.date || '',
                endDate: e.endDate || '',
                fee: e.fee || e.price || '상세 확인',
                summary: e.summary || e.description || e.targetAudience || ''
            }));

            const places = [
                ...(window.DODAM_NATIONWIDE_RESTAURANTS || []).slice(0, 25).map(r => ({
                    name: r.name || '',
                    kind: '예스키즈존 맛집',
                    region: r.regionName || r.region || '',
                    address: r.address || r.location || '',
                    summary: r.summary || r.representativeMenu || r.reviewSummary || ''
                })),
                ...(window.DODAM_NATIONWIDE_ATTRACTIONS || []).slice(0, 25).map(a => ({
                    name: a.name || '',
                    kind: a.categoryName || '가족 나들이 명소',
                    region: a.regionName || a.region || '',
                    address: a.address || a.location || '',
                    summary: a.summary || a.representativeMenu || ''
                }))
            ];

            const polRaw = window.DODAM_POLICIES_DATA || {};
            const polList = Array.isArray(polRaw)
                ? polRaw
                : (polRaw.policies || polRaw.items || polRaw.list || []);
            const policies = polList.slice(0, 35).map(pol => ({
                title: pol.title || pol.name || '',
                region: pol.regionName || pol.region || '전국',
                benefit: pol.benefit || pol.amount || pol.summary || pol.description || '',
                target: pol.target || pol.targetAudience || ''
            }));

            const schoolRaw = window.DODAM_SCHOOLS_RANKING
                || (window.DODAM_SCHOOLS_DATA && window.DODAM_SCHOOLS_DATA.schools)
                || window.DODAM_NATIONWIDE_SCHOOLS
                || window.app?.schoolsData
                || [];
            const levelLabels = { elementary: '초등학교', middle: '중학교', high: '고등학교' };
            const schools = (Array.isArray(schoolRaw) ? schoolRaw : []).slice(0, 25).map(s => ({
                name: s.name || s.schoolName || '',
                region: s.address || s.regionName || s.region || s.district || '',
                level: levelLabels[s.level] || s.levelName || s.level || s.type || '',
                summary: s.description || s.summary || s.feature || s.academyArea || ''
            }));

            const admRaw = (window.DODAM_ADMISSIONS_DATA && (window.DODAM_ADMISSIONS_DATA.guides || window.DODAM_ADMISSIONS_DATA.items)) || [];
            const admissions = admRaw.slice(0, 20).map(a => ({
                title: a.title || '',
                source: a.source || a.agency || '교육부·대교협',
                date: a.date || a.publishedAt || '',
                summary: a.summary || a.content || ''
            }));

            return { posts, events, places, policies, schools, admissions };
        }"""
        )
        await browser.close()

    posts = payload["posts"]
    generated_urls = [
        ("https://dodamtalk.com/", "daily", "1.0"),
        ("https://dodamtalk.com/guides.html", "daily", "0.9"),
        ("https://dodamtalk.com/about.html", "monthly", "0.8"),
        ("https://dodamtalk.com/privacy.html", "monthly", "0.7"),
        ("https://dodamtalk.com/terms.html", "monthly", "0.7"),
        ("https://dodamtalk.com/contact.html", "monthly", "0.7"),
    ]

    all_report_links = [
        (re.sub(r"^\[육아가이드\]\s*", "", post["title"]).strip(), f"/reports/{safe_slug(post['id'])}.html")
        for post in posts
    ]
    hub_links = [
        ("🎉 전국 가족 축제·어린이 체험·공모전 일정", "/guides/events.html"),
        ("🍽️ 전국 유모차 안심 예스키즈존 맛집·나들이 명소", "/guides/places.html"),
        ("💵 2026 부모급여·첫만남이용권·출산지원금 총정리", "/guides/policies.html"),
        ("🏫 전국 초·중·고 학군 분석 & 2028 대입 개편안", "/guides/schools.html"),
    ]

    rss_items = []

    # 1. Generate individual SEO pages for all public AI / guide reports
    for idx, post in enumerate(posts):
        pid = safe_slug(post["id"])
        raw_title = re.sub(r"^\[육아가이드\]\s*", "", post["title"]).strip()
        full_title = f"{raw_title} | 도담톡 육아가이드"
        desc = clean_text(post["rawText"], 158)
        url = f"https://dodamtalk.com/reports/{pid}.html"

        body = re.sub(
            r'<div class="post-image-action-bar[\s\S]*?</div>\s*</div>',
            "",
            post["contentHtml"],
            flags=re.IGNORECASE,
        )

        # Cross-link other reports + all 4 hubs to eliminate orphan pages
        other_reports = [lk for i, lk in enumerate(all_report_links) if i != idx][:6]
        related = other_reports + hub_links

        json_ld = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": raw_title,
            "description": desc,
            "url": url,
            "mainEntityOfPage": {"@type": "WebPage", "@id": url},
            "author": {"@type": "Organization", "name": "도담톡 육아연구소"},
            "publisher": {
                "@type": "Organization",
                "name": "도담톡 (DodamTalk)",
                "url": "https://dodamtalk.com/",
            },
            "datePublished": TODAY,
            "dateModified": TODAY,
        }

        html_out = render_page_shell(
            title=full_title,
            description=desc,
            canonical_url=url,
            badge="📖 도담 공식 육아가이드 리포트",
            heading=raw_title,
            subtitle="대한민국 엄마·아빠를 위한 도담톡 전문가 검증 육아·교육 심층 리포트",
            body_html=body,
            app_cta_href=f"/#/board/post/{post['id']}",
            app_cta_label="💬 도담톡 커뮤니티에서 댓글·스크랩하기",
            related_links=related,
            json_ld=json_ld,
        )
        (REPORTS_DIR / f"{pid}.html").write_text(html_out, encoding="utf-8")
        generated_urls.append((url, "weekly", "0.85"))
        rss_items.append(
            f"""    <item>
      <title>{html_lib.escape(post['title'])}</title>
      <link>{url}</link>
      <description>{html_lib.escape(desc)}</description>
      <pubDate>{RSS_DATE}</pubDate>
      <guid>{url}</guid>
    </item>"""
        )

    # 2. Build rich HTML bodies for 4 hub pages (3,000+ chars each!)
    events_body = (
        f"<p>전국 17개 시도의 가족 축제, 어린이 체험전, 미술·글짓기 공모전 등 최신 행사 정보를 매일 자동 수집해 제공합니다. (총 {len(payload['events'])}건 대표 목록)</p>"
        + "".join(
            f'<div class="item-box"><h3>{html_lib.escape(e["title"])}</h3>'
            f'<p class="item-meta">📍 {html_lib.escape(e["region"])} {html_lib.escape(e["location"])} · 🗓️ {html_lib.escape(e["startDate"])}'
            + (f' ~ {html_lib.escape(e["endDate"])}' if e["endDate"] else "")
            + f' · 💰 {html_lib.escape(e["fee"])}</p>'
            + (f'<p class="item-desc">{html_lib.escape(clean_text(e["summary"], 180))}</p>' if e["summary"] else "")
            + "</div>"
            for e in payload["events"]
            if e["title"]
        )
    )

    places_body = (
        f"<p>농림축산식품부 안심식당과 포털 실존 검증을 통과한 전국 예스키즈존 맛집 및 가족 나들이 명소 {len(payload['places'])}곳의 핵심 안내입니다.</p>"
        + "".join(
            f'<div class="item-box"><h3>[{html_lib.escape(pl["kind"])}] {html_lib.escape(pl["name"])}</h3>'
            f'<p class="item-meta">📍 {html_lib.escape(pl["region"])} · {html_lib.escape(pl["address"])}</p>'
            + (f'<p class="item-desc">{html_lib.escape(clean_text(pl["summary"], 180))}</p>' if pl["summary"] else "")
            + "</div>"
            for pl in payload["places"]
            if pl["name"]
        )
    )

    policies_body = (
        f"<p>2026년 기준 만 0세 월 100만 원·만 1세 월 50만 원 부모급여, 첫만남이용권(첫째 200만 원·둘째 이상 300만 원), 만 8세 미만 아동수당, 다자녀 혜택 및 전국 지자체 출산·양육 지원금 총정리입니다.</p>"
        + "".join(
            f'<div class="item-box"><h3>{html_lib.escape(pol["title"])}</h3>'
            f'<p class="item-meta">🏛️ {html_lib.escape(pol["region"])}'
            + (f' · 대상: {html_lib.escape(pol["target"])}' if pol["target"] else "")
            + "</p>"
            + (f'<p class="item-desc">{html_lib.escape(clean_text(pol["benefit"], 220))}</p>' if pol["benefit"] else "")
            + "</div>"
            for pol in payload["policies"]
            if pol["title"]
        )
    )

    schools_body = (
        "<p>전국 주요 초·중·고 학교 배정 학군 정보와 교육부·대교협·평가원 공식 공시 기반 2028 대입 개편안(내신 5등급제, 고교학점제, 통합형 수능) 핵심 가이드입니다.</p>"
        + "<h2>🏫 주요 초·중·고 학군 정보</h2>"
        + "".join(
            f'<div class="item-box"><h3>{html_lib.escape(s["name"])}</h3>'
            f'<p class="item-meta">📍 {html_lib.escape(s["region"])} · {html_lib.escape(s["level"])}</p>'
            + (f'<p class="item-desc">{html_lib.escape(clean_text(s["summary"], 180))}</p>' if s["summary"] else "")
            + "</div>"
            for s in payload["schools"]
            if s["name"]
        )
        + "<h2>📢 교육부·대교협 공식 입시 공시 및 정책</h2>"
        + "".join(
            f'<div class="item-box"><h3>{html_lib.escape(a["title"])}</h3>'
            f'<p class="item-meta">🏛️ {html_lib.escape(a["source"])} · {html_lib.escape(a["date"])}</p>'
            + (f'<p class="item-desc">{html_lib.escape(clean_text(a["summary"], 200))}</p>' if a["summary"] else "")
            + "</div>"
            for a in payload["admissions"]
            if a["title"]
        )
    )

    hubs = [
        (
            "events.html",
            "전국 가족 축제·어린이 체험·공모전 일정 | 도담톡 (DodamTalk)",
            "주말에 아이와 가볼만한 전국 가족 축제, 키즈 체험전, 어린이 미술·글짓기 공모전 일정을 지역별로 확인하세요.",
            "🎉 전국 가족 행사·축제·공모전",
            "주말 아이와 함께 가는 전국 가족 축제 & 어린이 체험 일정",
            "무료 관람부터 사전예약 체험까지 전국 주요 육아·가족 행사 실시간 데이터",
            "/#/events",
            "🗺️ 도담톡에서 실시간 행사 전체 검색하기",
            events_body,
        ),
        (
            "places.html",
            "전국 유모차 안심 예스키즈존 맛집·나들이 명소 | 도담톡 (DodamTalk)",
            "아기의자, 수유실, 기저귀교환대, 주차장 정보를 갖춘 전국 예스키즈존 맛집과 가족 나들이 명소를 한눈에 확인하세요.",
            "🍽️ 유모차 안심 나들이 & 예스키즈존",
            "아기와 함께 편하게 가는 전국 예스키즈존 맛집 & 나들이 명소",
            "아기의자·수유실·주차 편의까지 검증된 가족 외식·나들이 추천 리스트",
            "/#/places",
            "📍 도담톡 지도에서 주변 장소 찾기",
            places_body,
        ),
        (
            "policies.html",
            "2026 부모급여·첫만남이용권·출산지원금 총정리 | 도담톡 (DodamTalk)",
            "2026년 만 0세 월 100만 원 부모급여, 첫만남이용권 200~300만 원, 아동수당, 지자체별 출산장려금 혜택과 모의계산 안내입니다.",
            "💵 2026 출산·양육 정부 지원금",
            "2026년 부모급여·첫만남이용권·지자체 출산지원금 총정리",
            "우리 아이 출생 연도와 거주 지역에 맞는 정부·지자체 양육 지원금 안내",
            "/#/policies",
            "🧮 도담톡에서 내 아이 지원금 모의계산하기",
            policies_body,
        ),
        (
            "schools.html",
            "전국 초·중·고 학군 분석 & 2028 대입 개편안 가이드 | 도담톡 (DodamTalk)",
            "전국 주요 초·중·고 학교 정보와 배정 학군, 내신 5등급제·고교학점제 기반 2028 대입 개편안 핵심 전략을 확인하세요.",
            "🏫 전국 학군 & 2028 대입 가이드",
            "전국 초·중·고 학군 정보 및 2028 대입 개편안 핵심 분석",
            "우리 동네 학교·학군 비교와 교육부 공식 입시 정책 로드맵",
            "/#/schools",
            "🏫 도담톡에서 우리 동네 학군 상세 검색하기",
            schools_body,
        ),
    ]

    for fname, title, desc, badge, heading, sub, cta_href, cta_lbl, body in hubs:
        url = f"https://dodamtalk.com/guides/{fname}"
        ld = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": desc,
            "url": url,
            "publisher": {"@type": "Organization", "name": "도담톡 (DodamTalk)", "url": "https://dodamtalk.com/"},
        }
        html_out = render_page_shell(
            title=title,
            description=desc,
            canonical_url=url,
            badge=badge,
            heading=heading,
            subtitle=sub,
            body_html=body,
            app_cta_href=cta_href,
            app_cta_label=cta_lbl,
            related_links=all_report_links,
            json_ld=ld,
        )
        (GUIDES_DIR / fname).write_text(html_out, encoding="utf-8")
        generated_urls.append((url, "daily", "0.9"))

    # 3. Rewrite sitemap.xml
    sm_entries = "\n".join(
        f"""  <url>
    <loc>{u}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>"""
        for u, freq, prio in generated_urls
    )
    (ROOT / "sitemap.xml").write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{sm_entries}
</urlset>
""",
        encoding="utf-8",
    )

    # 4. Rewrite rss.xml
    rss_body = "\n".join(rss_items[:20])
    (ROOT / "rss.xml").write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>도담톡 (DodamTalk) - 대한민국 육아·출산지원금·학군 통합 플랫폼</title>
    <link>https://dodamtalk.com/</link>
    <description>출생 개월수별 육아 소통방, 전국 가족 축제 일정, 유모차 안심 나들이 맵, 부모급여·출산지원금 계산기, 초중고 학군 분석</description>
    <language>ko-KR</language>
    <pubDate>{RSS_DATE}</pubDate>
    <lastBuildDate>{RSS_DATE}</lastBuildDate>
    <atom:link href="https://dodamtalk.com/rss.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>도담톡 육아·출산정책·교육 심층 가이드 백과</title>
      <link>https://dodamtalk.com/guides.html</link>
      <description>0~12개월 신생아 통잠 수면교육, 초기·중기·후기 이유식 식단표, 영유아 발달검진, 2026 부모급여·출산지원금 총정리</description>
      <pubDate>{RSS_DATE}</pubDate>
      <guid>https://dodamtalk.com/guides.html</guid>
    </item>
{rss_body}
  </channel>
</rss>
""",
        encoding="utf-8",
    )

    print(
        json.dumps(
            {
                "reportsGenerated": len(posts),
                "eventsCount": len(payload["events"]),
                "placesCount": len(payload["places"]),
                "policiesCount": len(payload["policies"]),
                "schoolsCount": len(payload["schools"]),
                "admissionsCount": len(payload["admissions"]),
                "sitemapUrls": len(generated_urls),
            },
            ensure_ascii=False,
        )
    )


asyncio.run(main())
