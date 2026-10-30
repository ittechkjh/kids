# -*- coding: utf-8 -*-
"""
Apply comprehensive mobile UI/UX improvements across index.html and js/app.js.
Handles CRLF / LF gracefully.
"""
import re

def patch_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update header class to relative on mobile, sticky on desktop
    old_header = '<header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">'
    new_header = '<!-- 스티키 메인 헤더 (모바일 본문 확보를 위해 relative, 데스크톱 sticky) -->\n  <header class="relative lg:sticky lg:top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">'
    assert old_header in content, "Could not find old_header in index.html"
    content = content.replace(old_header, new_header)

    # 2. Hide logo subtitle on mobile
    old_sub = '<p class="text-xs text-slate-500">개월수 동기방 · 동네 공동육아 · 실시간 육아 수다</p>'
    new_sub = '<p class="hidden sm:block text-xs text-slate-500">개월수 동기방 · 동네 공동육아 · 실시간 육아 수다</p>'
    assert old_sub in content, "Could not find old_sub in index.html"
    content = content.replace(old_sub, new_sub)

    # 3. Mobile action buttons in logo row: shrink-0 whitespace-nowrap
    old_mobile_actions = '''          <!-- 모바일 액션 버튼 -->
          <div class="flex items-center gap-2 lg:hidden">

            <button onclick="app.openLoginModal()" id="mobile-auth-btn" class="p-2 rounded-xl border border-stone-200 text-slate-700 hover:bg-stone-50 transition" title="로그인 / 관리자">
              <i class="fa-solid fa-lock"></i>
            </button>
            <button onclick="app.openWritePage()" class="px-3 py-2 rounded-xl coral-badge-gradient text-white text-xs font-extrabold shadow-sm">
              <i class="fa-solid fa-pen mr-1"></i>글쓰기
            </button>
            <button onclick="app.openProfileModal()" class="p-2 rounded-xl border border-stone-200 text-slate-700">
              <i class="fa-solid fa-baby"></i>
            </button>
          </div>'''
    
    new_mobile_actions = '''          <!-- 모바일 액션 버튼 -->
          <div class="flex items-center gap-1.5 lg:hidden">
            <button onclick="app.openLoginModal()" id="mobile-auth-btn" class="p-2 rounded-xl border border-stone-200 text-slate-700 hover:bg-stone-50 transition shrink-0" title="로그인 / 관리자">
              <i class="fa-solid fa-lock text-xs"></i>
            </button>
            <button onclick="app.openWritePage()" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl coral-badge-gradient text-white text-xs font-black shadow-sm shrink-0 whitespace-nowrap">
              <i class="fa-solid fa-pen text-[11px]"></i>
              <span>글쓰기</span>
            </button>
            <button onclick="app.openProfileModal()" class="p-2 rounded-xl border border-stone-200 text-slate-700 shrink-0" title="내 정보">
              <i class="fa-solid fa-baby text-xs"></i>
            </button>
          </div>'''
    # Normalize CRLF for matching
    content_norm = content.replace('\r\n', '\n')
    old_mobile_actions_norm = old_mobile_actions.replace('\r\n', '\n')
    assert old_mobile_actions_norm in content_norm, "Could not find old_mobile_actions in index.html"
    content_norm = content_norm.replace(old_mobile_actions_norm, new_mobile_actions)

    # 4. Consolidate Region select and Global Search into 1 row on mobile
    old_search_container = '''        <!-- 검색창 + 동네 선택 + 글쓰기/스크랩 버튼 -->
        <div class="flex flex-wrap items-center gap-2 flex-1 lg:max-w-2xl lg:justify-end">
          <!-- 동네 필터 -->
          <div class="relative">
            <select id="global-region-select" onchange="app.onChangeRegion(this.value)" class="appearance-none bg-stone-100 hover:bg-stone-200/70 text-slate-800 font-bold text-xs rounded-xl pl-3 pr-8 py-2.5 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer">'''
    
    new_search_container = '''        <!-- 검색창 + 동네 선택 + 글쓰기/스크랩 버튼 (모바일 1행 정렬) -->
        <div class="flex items-center gap-2 flex-1 lg:max-w-2xl lg:justify-end w-full">
          <!-- 동네 필터 -->
          <div class="relative shrink-0 w-32 sm:w-44">
            <select id="global-region-select" onchange="app.onChangeRegion(this.value)" class="w-full appearance-none bg-stone-100 hover:bg-stone-200/70 text-slate-800 font-bold text-xs rounded-xl pl-2.5 pr-7 py-2 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer truncate">'''
    
    old_search_container_norm = old_search_container.replace('\r\n', '\n')
    assert old_search_container_norm in content_norm, "Could not find old_search_container in index.html"
    content_norm = content_norm.replace(old_search_container_norm, new_search_container)

    # Search input min-w
    old_search_input = '''          <!-- 통합 검색창 -->
          <div class="relative flex-1 min-w-[190px]">
            <i class="fa-solid fa-magnifying-glass text-slate-400 text-xs absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input
              id="community-search-input"
              type="text"
              placeholder="밤중수유, 이유식, 초1입학, 두돌춘기 등 검색..."
              oninput="app.onSearchKeyword(this.value)"
              class="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <!-- 스크랩북 버튼 -->
          <button onclick="app.openScrapModal()" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-slate-700 transition">
            <i class="fa-solid fa-bookmark text-amber-500"></i>
            <span>스크랩</span>
            <span id="scrap-count-badge" class="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold">0</span>
          </button>

          <!-- 로그인 / 회원 / 관리자 버튼 -->
          <div id="desktop-auth-container" class="inline-flex items-center gap-1.5"></div>

          <!-- 글쓰기 버튼 (데스크톱) -->
          <button onclick="app.openWritePage()" class="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl coral-badge-gradient hover:opacity-95 text-xs font-extrabold text-white shadow-sm shadow-rose-500/20 transition">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>커뮤니티 글쓰기</span>
          </button>'''

    new_search_input = '''          <!-- 통합 검색창 -->
          <div class="relative flex-1 min-w-0">
            <i class="fa-solid fa-magnifying-glass text-slate-400 text-xs absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input
              id="community-search-input"
              type="text"
              placeholder="게시글·지역·키워드 검색..."
              oninput="app.onSearchKeyword(this.value)"
              class="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <!-- 스크랩북 버튼 (모바일 숨김) -->
          <button onclick="app.openScrapModal()" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-slate-700 transition shrink-0">
            <i class="fa-solid fa-bookmark text-amber-500"></i>
            <span>스크랩</span>
            <span id="scrap-count-badge" class="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[11px] font-extrabold">0</span>
          </button>

          <!-- 로그인 / 회원 / 관리자 버튼 (데스크톱 전용) -->
          <div id="desktop-auth-container" class="hidden lg:inline-flex items-center gap-1.5 shrink-0"></div>

          <!-- 글쓰기 버튼 (데스크톱 전용) -->
          <button onclick="app.openWritePage()" class="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl coral-badge-gradient hover:opacity-95 text-xs font-extrabold text-white shadow-sm shadow-rose-500/20 transition shrink-0">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>커뮤니티 글쓰기</span>
          </button>'''

    old_search_input_norm = old_search_input.replace('\r\n', '\n')
    assert old_search_input_norm in content_norm, "Could not find old_search_input in index.html"
    content_norm = content_norm.replace(old_search_input_norm, new_search_input)

    # 5. 8 Main Platform Navigation Tabs (4x2 on mobile, 8x1 on desktop)
    old_nav = '''      <!-- 8대 핵심 플랫폼 탭 네비게이션: 게시판 / 행사·축제 / 대회일정 / 맛집맵 / 정책·지원금 / 학교정보 / 아파트 학군 / 입시정보 -->
      <nav class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 mt-3 pt-2.5 border-t border-stone-100">
        <button data-view="board" onclick="app.switchMainView('board')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition bg-slate-900 text-white shadow-sm text-center">
          <i class="fa-solid fa-clipboard-list text-rose-400"></i>
          <span>💬 도담 육아 게시판</span>
        </button>
        <button data-view="festivals" onclick="app.switchMainView('festivals')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-person-running text-amber-500"></i>
          <span>🎪 지역행사 & 축제</span>
        </button>
        <button data-view="contests" onclick="app.switchMainView('contests')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-graduation-cap text-indigo-500"></i>
          <span>🏆 전국 대회일정</span>
        </button>
        <button data-view="food" onclick="app.switchMainView('food')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-map-location-dot text-rose-500"></i>
          <span>🍽️ 전국 안심 맛집맵</span>
        </button>
        <button data-view="policy" onclick="app.switchMainView('policy')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-hand-holding-dollar text-emerald-500"></i>
          <span>💰 육아 정책·지원금</span>
        </button>
        <button data-view="school" onclick="app.switchMainView('school')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-school text-sky-500"></i>
          <span>🏫 전국 학교 순위</span>
        </button>
        <button data-view="apartments" onclick="app.switchMainView('apartments')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-building text-violet-500"></i>
          <span>🏢 아파트 학군·배정</span>
        </button>
        <button data-view="admissions" onclick="app.switchMainView('admissions')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-book-bookmark text-rose-500"></i>
          <span>📚 교육부 입시 정보</span>
        </button>
      </nav>'''

    new_nav = '''      <!-- 8대 핵심 플랫폼 탭 네비게이션 (모바일 4x2 그리드, 데스크톱 8열) -->
      <nav class="grid grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-1.5 mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-stone-100">
        <button data-view="board" onclick="app.switchMainView('board')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold transition bg-slate-900 text-white shadow-sm text-center">
          <i class="fa-solid fa-clipboard-list text-rose-400 text-xs"></i>
          <span class="sm:hidden">육아게시판</span>
          <span class="hidden sm:inline">도담 육아 게시판</span>
        </button>
        <button data-view="festivals" onclick="app.switchMainView('festivals')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-person-running text-amber-500 text-xs"></i>
          <span class="sm:hidden">행사·축제</span>
          <span class="hidden sm:inline">지역행사 & 축제</span>
        </button>
        <button data-view="contests" onclick="app.switchMainView('contests')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-graduation-cap text-indigo-500 text-xs"></i>
          <span class="sm:hidden">대회일정</span>
          <span class="hidden sm:inline">전국 대회일정</span>
        </button>
        <button data-view="food" onclick="app.switchMainView('food')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-utensils text-rose-500 text-xs"></i>
          <span class="sm:hidden">안심맛집</span>
          <span class="hidden sm:inline">전국 안심 맛집</span>
        </button>
        <button data-view="policy" onclick="app.switchMainView('policy')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-hand-holding-dollar text-emerald-500 text-xs"></i>
          <span class="sm:hidden">육아정책</span>
          <span class="hidden sm:inline">육아 정책·지원금</span>
        </button>
        <button data-view="school" onclick="app.switchMainView('school')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-school text-sky-500 text-xs"></i>
          <span class="sm:hidden">학교순위</span>
          <span class="hidden sm:inline">전국 학교 순위</span>
        </button>
        <button data-view="apartments" onclick="app.switchMainView('apartments')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-building text-violet-500 text-xs"></i>
          <span class="sm:hidden">아파트학군</span>
          <span class="hidden sm:inline">아파트 학군·배정</span>
        </button>
        <button data-view="admissions" onclick="app.switchMainView('admissions')" class="nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-book-bookmark text-rose-500 text-xs"></i>
          <span class="sm:hidden">입시정보</span>
          <span class="hidden sm:inline">교육부 입시 정보</span>
        </button>
      </nav>'''
    
    old_nav_norm = old_nav.replace('\r\n', '\n')
    assert old_nav_norm in content_norm, "Could not find old_nav in index.html"
    content_norm = content_norm.replace(old_nav_norm, new_nav)

    # 6. Update board category chips container to 2-column grid on mobile
    old_chips = '<div class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs py-1" id="board-category-chips"></div>'
    new_chips = '<div class="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 text-xs py-1" id="board-category-chips"></div>'
    assert old_chips in content_norm, "Could not find old_chips in index.html"
    content_norm = content_norm.replace(old_chips, new_chips)

    # 7. Update bottom board search bar
    old_bottom_search = '''              <!-- 하단 네이버 카페형 검색 폼 -->
              <div class="flex items-center gap-1.5 flex-1 max-w-md justify-end">
                <select id="board-search-type" class="px-2 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none">
                  <option value="all">제목+내용</option>
                  <option value="title">제목만</option>
                  <option value="author">작성자</option>
                  <option value="tag">태그</option>
                </select>
                <input
                  id="board-bottom-search-input"
                  type="text"
                  placeholder="검색어를 입력하세요"
                  class="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#03C75A]"
                  onkeydown="if(event.key==='Enter') app.submitBottomSearch()"
                />
                <button
                  type="button"
                  onclick="app.submitBottomSearch()"
                  class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black transition cursor-pointer"
                >
                  검색
                </button>
              </div>'''

    new_bottom_search = '''              <!-- 하단 네이버 카페형 검색 폼 -->
              <div class="flex items-center gap-1.5 flex-1 max-w-md w-full justify-end">
                <select id="board-search-type" class="shrink-0 px-2 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none">
                  <option value="all">제목+내용</option>
                  <option value="title">제목만</option>
                  <option value="author">작성자</option>
                  <option value="tag">태그</option>
                </select>
                <input
                  id="board-bottom-search-input"
                  type="text"
                  placeholder="검색어를 입력하세요"
                  class="flex-1 min-w-0 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#03C75A]"
                  onkeydown="if(event.key==='Enter') app.submitBottomSearch()"
                />
                <button
                  type="button"
                  onclick="app.submitBottomSearch()"
                  class="shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black transition cursor-pointer"
                >
                  검색
                </button>
              </div>'''

    old_bottom_search_norm = old_bottom_search.replace('\r\n', '\n')
    assert old_bottom_search_norm in content_norm, "Could not find old_bottom_search in index.html"
    content_norm = content_norm.replace(old_bottom_search_norm, new_bottom_search)

    # 8. Add mobile scroll-to-top floating button before </body>
    if 'id="mobile-scroll-top-btn"' not in content_norm:
        fab_button = '''
  <!-- 모바일 플로팅 상단 이동 버튼 -->
  <button
    id="mobile-scroll-top-btn"
    onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
    class="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-slate-900/90 text-white shadow-lg border border-slate-700 flex items-center justify-center text-sm transition-all opacity-0 pointer-events-none hover:bg-slate-800 sm:bottom-6 sm:right-6"
    title="맨 위로 가기"
  >
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</body>'''
        content_norm = content_norm.replace('</body>', fab_button)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content_norm)
    print("index.html patched successfully!")


def patch_app_js():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    content_norm = content.replace('\r\n', '\n')

    # 1. Update switchMainView nav-view-btn class
    old_switch_nav = '''    document.querySelectorAll('.nav-view-btn').forEach((btn) => {
      const active = btn.getAttribute('data-view') === viewId;
      btn.className = active
        ? 'nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition bg-slate-900 text-white shadow-sm text-center'
        : 'nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition text-slate-600 hover:text-slate-900 hover:bg-stone-100 text-center';
    });'''

    new_switch_nav = '''    document.querySelectorAll('.nav-view-btn').forEach((btn) => {
      const active = btn.getAttribute('data-view') === viewId;
      btn.className = active
        ? 'nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition bg-slate-900 text-white shadow-sm text-center'
        : 'nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition text-slate-600 hover:text-slate-900 hover:bg-stone-100 text-center';
    });'''

    assert old_switch_nav in content_norm, "Could not find old_switch_nav in js/app.js"
    content_norm = content_norm.replace(old_switch_nav, new_switch_nav)

    # 2. Update renderBoardCategories
    old_chips_render = '''          return `
            <button
              type="button"
              onclick="app.selectBoardCategory('${c.id}')"
              data-category="${c.id}"
              class="px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition border shrink-0 flex items-center gap-1.5 cursor-pointer ${
                active
                  ? 'bg-[#03C75A] text-white border-[#03C75A] shadow-sm'
                  : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-white hover:border-stone-300'
              }"
            >
              <i class="fa-solid ${c.icon || 'fa-tag'} text-[10px] ${active ? 'text-white' : 'text-slate-400'}"></i>
              <span>${c.name}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                active ? 'bg-white/25 text-white' : 'bg-stone-200 text-slate-600'
              }">${count}</span>
            </button>
          `;'''

    new_chips_render = '''          return `
            <button
              type="button"
              onclick="app.selectBoardCategory('${c.id}')"
              data-category="${c.id}"
              class="w-full sm:w-auto px-2.5 py-2 sm:py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition border shrink-0 flex items-center justify-between sm:justify-start gap-1.5 cursor-pointer ${
                active
                  ? 'bg-[#03C75A] text-white border-[#03C75A] shadow-sm'
                  : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-white hover:border-stone-300'
              }"
            >
              <span class="truncate text-[11px] sm:text-xs">${c.name}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black shrink-0 ${
                active ? 'bg-white/25 text-white' : 'bg-stone-200 text-slate-600'
              }">${count}</span>
            </button>
          `;'''

    assert old_chips_render in content_norm, "Could not find old_chips_render in js/app.js"
    content_norm = content_norm.replace(old_chips_render, new_chips_render)

    # 3. Add scroll listener for mobile-scroll-top-btn at the bottom of app.js
    if 'mobile-scroll-top-btn' not in content_norm:
        scroll_code = '''
// 모바일 플로팅 탑버튼 스크롤 감지 리스너
window.addEventListener('scroll', () => {
  const btn = document.getElementById('mobile-scroll-top-btn');
  if (!btn) return;
  if (window.scrollY > 280) {
    btn.classList.remove('opacity-0', 'pointer-events-none');
    btn.classList.add('opacity-100');
  } else {
    btn.classList.add('opacity-0', 'pointer-events-none');
    btn.classList.remove('opacity-100');
  }
});
'''
        content_norm += scroll_code

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content_norm)
    print("js/app.js patched successfully!")

if __name__ == '__main__':
    patch_index_html()
    patch_app_js()
