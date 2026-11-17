import asyncio
import html as html_lib
import json
import os
import re
from datetime import datetime
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
REPORTS_DIR = ROOT / "reports"
GUIDES_DIR = ROOT / "guides"
TODAY = "2026-11-17"
RSS_DATE = "Tue, 17 Nov 2026 14:00:00 +0900"


def clean_text(raw: str, max_len: int = 155) -> str:
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
        f'          <li><a href="{html_lib.escape(u)}" class="text-emerald-700 hover:underline font-semibold">{html_lib.escape(lbl)}</a></li>'
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
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {{ font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; }}
    .article-body img {{ max-width: 100%; height: auto; border-radius: 12px; margin: 18px auto; display: block; }}
    .article-body h2 {{ font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 28px 0 12px; padding-left: 12px; border-left: 4px solid #059669; }}
    .article-body p {{ font-size: 0.98rem; line-height: 1.85; color: #334155; margin-bottom: 14px; }}
  </style>
</head>
<body class="bg-stone-50 text-slate-800">
  <header class="bg-white border-b border-stone-200 sticky top-0 z-20">
    <div class="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
      <a href="/" class="flex items-center gap-2 font-black text-lg text-emerald-700">
        <span>🌱 도담톡 (DodamTalk)</span>
      </a>
      <nav class="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-600">
        <a href="/guides.html" class="hover:text-emerald-700">육아백과</a>
        <a href="/guides/events.html" class="hover:text-emerald-700">가족행사</a>
        <a href="/guides/places.html" class="hover:text-emerald-700">나들이</a>
        <a href="/guides/policies.html" class="hover:text-emerald-700">지원금</a>
        <a href="/guides/schools.html" class="hover:text-emerald-700">학군·입시</a>
      </nav>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    <article class="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
      <div class="space-y-3 border-b border-stone-100 pb-6">
        <span class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">{b_esc}</span>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">{h_esc}</h1>
        <p class="text-sm text-slate-500 font-medium">{s_esc}</p>
        <div class="pt-2 flex flex-wrap gap-2">
          <a href="{html_lib.escape(app_cta_href)}" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold transition">{html_lib.escape(app_cta_label)}</a>
          <a href="/guides.html" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs sm:text-sm font-bold transition">전체 가이드 목록</a>
        </div>
      </div>

      <div class="article-body">
        {body_html}
      </div>
    </article>

    <aside class="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
      <h2 class="text-base font-black text-slate-900">📚 함께 보면 좋은 도담톡 육아·교육 정보</h2>
      <ul class="space-y-2 text-sm">
{rel_items}
      </ul>
    </aside>
  </main>

  <footer class="bg-white border-t border-stone-200 mt-10">
    <div class="max-w-4xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
      <span>© 2026 도담톡 (DodamTalk · dodamtalk.com). All rights reserved.</span>
      <div class="flex flex-wrap gap-3 font-bold">
        <a href="/about.html" class="hover:text-emerald-700">서비스 소개</a>
        <a href="/guides.html" class="hover:text-emerald-700">육아·정책 백과</a>
        <a href="/privacy.html" class="hover:text-emerald-700">개인정보처리방침</a>
        <a href="/terms.html" class="hover:text-emerald-700">이용약관</a>
        <a href="/contact.html" class="hover:text-emerald-700">문의하기</a>
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
        await page.wait_for_timeout(4000)

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

            const events = (window.DODAM_EVENTS || []).slice(0, 20).map(e => ({
                title: e.title || '',
                region: e.regionName || e.region || '',
                location: e.location || '',
                startDate: e.startDate || '',
                endDate: e.endDate || '',
                fee: e.fee || '',
                summary: e.summary || e.description || ''
            }));

            const places = [
                ...(window.DODAM_RESTAURANTS || []).slice(0, 12).map(r => ({
                    name: r.name || '',
                    region: r.regionName || r.region || '',
                    address: r.address || '',
                    summary: r.summary || r.representativeMenu || ''
                })),
                ...(window.DODAM_ATTRACTIONS || []).slice(0, 12).map(a => ({
                    name: a.name || '',
                    region: a.regionName || a.region || '',
                    address: a.address || '',
                    summary: a.summary || ''
                }))
            ];

            const policies = (window.DODAM_POLICIES || []).slice(0, 20).map(pol => ({
                title: pol.title || pol.name || '',
                region: pol.regionName || pol.region || '전국',
                benefit: pol.benefit || pol.amount || pol.summary || '',
                target: pol.target || pol.targetAudience || ''
            }));

            const schools = (window.DODAM_SCHOOLS || []).slice(0, 18).map(s => ({
                name: s.name || s.schoolName || '',
                region: s.region || s.district || '',
                level: s.level || s.type || '',
                summary: s.summary || s.feature || ''
            }));

            return { posts, events, places, policies, schools };
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

    report_links = []
    rss_items = []

    # 1. Generate individual SEO pages for each public AI / guide report
    for post in posts:
        pid = safe_slug(post["id"])
        raw_title = re.sub(r"^\[육아가이드\]\s*", "", post["title"]).strip()
        full_title = f"{raw_title} | 도담톡 육아가이드"
        desc = clean_text(post["rawText"], 155)
        url = f"https://dodamtalk.com/reports/{pid}.html"

        # Remove interactive copy buttons from static SEO HTML
        body = re.sub(
            r'<div class="post-image-action-bar[\s\S]*?</div>\s*</div>',
            "",
            post["contentHtml"],
            flags=re.IGNORECASE,
        )

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
            related_links=[
                ("🎉 전국 가족 축제·어린이 행사 일정 모아보기", "/guides/events.html"),
                ("🍽️ 전국 유모차 안심 예스키즈존 맛집·나들이 명소", "/guides/places.html"),
                ("💵 2026 부모급여·첫만남이용권·출산지원금 총정리", "/guides/policies.html"),
                ("🏫 전국 학군 분석 및 2028 대입 개편안 가이드", "/guides/schools.html"),
            ],
            json_ld=json_ld,
        )
        (REPORTS_DIR / f"{pid}.html").write_text(html_out, encoding="utf-8")
        generated_urls.append((url, "weekly", "0.85"))
        report_links.append((raw_title, f"/reports/{pid}.html"))
        rss_items.append(
            f"""    <item>
      <title>{html_lib.escape(post['title'])}</title>
      <link>{url}</link>
      <description>{html_lib.escape(desc)}</description>
      <pubDate>{RSS_DATE}</pubDate>
      <guid>{url}</guid>
    </item>"""
        )

    # 2. Generate 4 rich category hub pages
    hubs = [
        (
            "events.html",
            "전국 가족 축제·어린이 체험·공모전 일정 | 도담톡 (DodamTalk)",
            "주말에 아이와 가볼만한 전국 가족 축제, 키즈 체험전, 어린이 미술·글짓기 공모전 일정을 지역별로 확인하세요.",
            "🎉 전국 가족 행사·축제·공모전",
            "주말 아이와 함께 가는 전국 가족 축제 & 어린이 체험 일정",
            "무료 관람부터 사전예약 체험까지 전국 주요 육아·가족 행사 정보",
            "/#/events",
            "🗺️ 도담톡에서 실시간 행사 전체 검색하기",
            "".join(
                f'<div class="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-3"><h3 class="font-bold text-slate-900">{html_lib.escape(e["title"])}</h3><p class="text-xs text-slate-500 mt-1">📍 {html_lib.escape(e["region"])} {html_lib.escape(e["location"])} · 🗓️ {html_lib.escape(e["startDate"])}~{html_lib.escape(e["endDate"])} · 💰 {html_lib.escape(e["fee"])}</p><p class="text-sm text-slate-700 mt-1.5">{html_lib.escape(clean_text(e["summary"], 140))}</p></div>'
                for e in payload["events"]
            ),
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
            "".join(
                f'<div class="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-3"><h3 class="font-bold text-slate-900">{html_lib.escape(pl["name"])}</h3><p class="text-xs text-slate-500 mt-1">📍 {html_lib.escape(pl["region"])} · {html_lib.escape(pl["address"])}</p><p class="text-sm text-slate-700 mt-1.5">{html_lib.escape(clean_text(pl["summary"], 140))}</p></div>'
                for pl in payload["places"]
            ),
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
            "".join(
                f'<div class="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-3"><h3 class="font-bold text-slate-900">{html_lib.escape(pol["title"])}</h3><p class="text-xs text-emerald-700 font-bold mt-1">🏛️ {html_lib.escape(pol["region"])} {html_lib.escape(pol["target"])}</p><p class="text-sm text-slate-700 mt-1.5">{html_lib.escape(clean_text(pol["benefit"], 160))}</p></div>'
                for pol in payload["policies"]
            ),
        ),
        (
            "schools.html",
            "전국 초·중·고 학군 분석 & 2028 대입 개편안 가이드 | 도담톡 (DodamTalk)",
            "전국 주요 초·중·고 학교 정보와 배정 학군, 내신 5등급제·고교학점제 기반 2028 대입 개편안 핵심 전략을 확인하세요.",
            "🏫 전국 학군 & 2028 대입 가이드",
            "전국 초·중·고 학군 정보 및 2028 대입 개편안 핵심 분석",
            "우리 동네 학교·학군 비교와 초·중·고 자녀 입시 로드맵",
            "/#/schools",
            "🏫 도담톡에서 우리 동네 학군 상세 검색하기",
            "".join(
                f'<div class="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-3"><h3 class="font-bold text-slate-900">{html_lib.escape(s["name"])}</h3><p class="text-xs text-slate-500 mt-1">📍 {html_lib.escape(s["region"])} · {html_lib.escape(s["level"])}</p><p class="text-sm text-slate-700 mt-1.5">{html_lib.escape(clean_text(s["summary"], 140))}</p></div>'
                for s in payload["schools"]
            ),
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
            body_html=body or f"<p>{html_lib.escape(desc)}</p>",
            app_cta_href=cta_href,
            app_cta_label=cta_lbl,
            related_links=report_links[:6],
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

    # 4. Rewrite rss.xml (no ?post=... duplicate canonical URLs!)
    rss_body = "\n".join(rss_items[:15])
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
                "hubsGenerated": len(hubs),
                "sitemapUrls": len(generated_urls),
                "reportLinks": report_links,
            },
            ensure_ascii=False,
        )
    )


asyncio.run(main())
