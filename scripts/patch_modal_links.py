# -*- coding: utf-8 -*-

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update list card action buttons in renderAdmissionsList
old_card_action = """          <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
            <button
              type="button"
              onclick="app.openAdmissionDetailModal('${g.id}')"
              class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <i class="fa-solid fa-book-open-reader"></i>
              <span>상세 분석 & 비교표 보기</span>
            </button>

            <a
              href="${g.officialUrl || 'https://www.moe.go.kr'}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center gap-1 text-[11px]"
            >
              <span>교육부 공식 원문 보기</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
            </a>
          </div>"""

new_card_action = """          <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
            <button
              type="button"
              onclick="app.openAdmissionDetailModal('${g.id}')"
              class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <i class="fa-solid fa-book-open-reader"></i>
              <span>상세 분석 & 비교표 보기</span>
            </button>

            <div class="flex items-center gap-1.5 flex-wrap">
              <a
                href="${g.officialUrl || 'https://www.moe.go.kr'}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition flex items-center gap-1 text-[11px] border border-indigo-200/60"
              >
                <i class="fa-solid fa-building-columns text-[10px]"></i>
                <span>공식 포털 원문</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px] text-indigo-400"></i>
              </a>
              <a
                href="https://search.naver.com/search.naver?query=${encodeURIComponent('교육부 ' + (g.title || '').replace(/\\\\[.*?\\\\]/g, '').trim())}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition flex items-center gap-1 text-[11px]"
              >
                <i class="fa-solid fa-newspaper text-[10px] text-emerald-600"></i>
                <span>공식 공시 검색</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px] text-slate-400"></i>
              </a>
            </div>
          </div>"""

assert old_card_action in code, "old_card_action not found in js/app.js"
code = code.replace(old_card_action, new_card_action, 1)

# 2. Update modal buttons in openAdmissionDetailModal
old_modal_links = """    if (linksEl) {
      linksEl.innerHTML = `
        <a
          href="${guide.officialUrl || 'https://www.moe.go.kr'}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs transition"
        >
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          <span>교육부 공식 원문 보러가기</span>
        </a>
      `;
    }"""

new_modal_links = """    if (linksEl) {
      const cleanTitle = (guide.title || '').replace(/\\\\[.*?\\\\]/g, '').trim();
      const naverSearchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent('교육부 ' + cleanTitle)}`;
      linksEl.innerHTML = `
        <a
          href="${guide.officialUrl || 'https://www.moe.go.kr'}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs transition border border-indigo-200"
        >
          <i class="fa-solid fa-building-columns text-[10px]"></i>
          <span>${guide.agency || '교육부'} 공식 사이트 바로가기</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-indigo-400"></i>
        </a>
        <a
          href="${naverSearchUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-black text-xs transition border border-emerald-200"
        >
          <i class="fa-solid fa-newspaper text-[10px] text-emerald-600"></i>
          <span>네이버 공식 공문·보도자료 검색</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-emerald-500"></i>
        </a>
      `;
    }"""

assert old_modal_links in code, "old_modal_links not found in js/app.js"
code = code.replace(old_modal_links, new_modal_links, 1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully updated js/app.js with dual robust link system!")
