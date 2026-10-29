# -*- coding: utf-8 -*-
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update <nav> to 8 tabs
old_nav = """      <!-- 4대 핵심 플랫폼 탭 네비게이션: 게시판 / 지역행사(볼거리·마라톤) / 대회일정(공부·사생·독서토론) / 맛집맵 -->
      <nav class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 mt-3 pt-2.5 border-t border-stone-100">
        <button data-view="board" onclick="app.switchMainView('board')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold transition bg-slate-900 text-white shadow-sm text-center">
          <i class="fa-solid fa-clipboard-list text-rose-400"></i>
          <span>💬 도담 육아 게시판</span>
        </button>
        <button data-view="festivals" onclick="app.switchMainView('festivals')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-person-running text-amber-500"></i>
          <span>🎪 지역행사 & 축제</span>
        </button>
        <button data-view="contests" onclick="app.switchMainView('contests')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-graduation-cap text-indigo-500"></i>
          <span>🏆 전국 대회일정</span>
        </button>
        <button data-view="food" onclick="app.switchMainView('food')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-map-location-dot text-rose-500"></i>
          <span>🍽️ 전국 안심 맛집맵</span>
        </button>
        <button data-view="policy" onclick="app.switchMainView('policy')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-hand-holding-dollar text-emerald-500"></i>
          <span>💰 육아 정책·지원금</span>
        </button>
        <button data-view="school" onclick="app.switchMainView('school')" class="nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold transition text-slate-600 hover:bg-stone-100 text-center">
          <i class="fa-solid fa-school text-sky-500"></i>
          <span>🏫 학교정보 & 입시순위</span>
        </button>
      </nav>"""

new_nav = """      <!-- 8대 핵심 플랫폼 탭 네비게이션: 게시판 / 행사·축제 / 대회일정 / 맛집맵 / 정책·지원금 / 학교정보 / 아파트 학군 / 입시정보 -->
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
      </nav>"""

assert old_nav in html, "old_nav not found"
html = html.replace(old_nav, new_nav, 1)

# 2. In #view-schools: remove #richgo-apartment-section and clean "리치고" text
apt_section_old = """          <!-- 리치고(Richgo) 아파트 학군 실시간 연동기 -->
          <div class="community-card p-4 sm:p-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl shadow-xl space-y-4 border border-indigo-700/60" id="richgo-apartment-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-700/60 pb-3">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span>LIVE MCP 연동</span>
                  </span>
                  <span class="text-xs font-bold text-indigo-300">리치고(Richgo) m.richgo.ai 공식 API</span>
                </div>
                <h3 class="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>🏢 아파트별 학군 & 배정학교 실시간 조회</span>
                </h3>
                <p class="text-xs text-indigo-200">
                  아파트 단지명(예: 잠실엘스, 은마, 반포자이, 판교그랑블, 목동7단지)을 검색하면 배정 초·중·고 도보 거리, 학군 등급(S/A/B), 시도 순위 및 대입 합격 실적을 실시간으로 가져옵니다.
                </p>
              </div>

              <div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <a
                  href="https://m.richgo.ai/developers/mcp.html#tool-schools"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-black text-white transition backdrop-blur-xs"
                >
                  <i class="fa-solid fa-code text-[11px] text-amber-300"></i>
                  <span>리치고 MCP 개발자 명세</span>
                  <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-white/70"></i>
                </a>
              </div>
            </div>

            <!-- 아파트 검색바 -->
            <div class="space-y-2">
              <div class="relative flex items-center">
                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-300 text-sm"></i>
                <input
                  type="text"
                  id="richgo-apartment-search-input"
                  placeholder="아파트명 또는 단지명을 입력하세요 (예: 잠실엘스, 은마, 판교그랑블, 반포자이, 목동7단지, 마포래미안푸르지오...)"
                  class="w-full pl-10 pr-24 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-900 border-2 border-indigo-400 focus:border-amber-400 focus:outline-none shadow-inner placeholder:text-slate-400"
                  onkeydown="if(event.key==='Enter') app.searchRichgoApartment()"
                />
                <button
                  type="button"
                  onclick="app.searchRichgoApartment()"
                  class="absolute right-2 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition shadow-sm flex items-center gap-1"
                >
                  <i class="fa-solid fa-bolt text-[11px] text-amber-300"></i>
                  <span>조회</span>
                </button>
              </div>

              <!-- 대표 인기 단지 핫픽 태그 -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                <span class="text-indigo-300 font-extrabold shrink-0 mr-1">🔥 주요 학군 아파트:</span>
                <div class="flex items-center gap-1.5 flex-nowrap" id="richgo-preset-chips">
                  <!-- Rendered dynamically -->
                </div>
              </div>
            </div>

            <!-- 아파트 학군 실시간 결과 컨테이너 -->
            <div id="richgo-district-results-box" class="space-y-3 pt-1">
              <!-- Rendered dynamically -->
            </div>
          </div>"""

assert apt_section_old in html, "apt_section_old not found"
html = html.replace(apt_section_old, "", 1)

# Clean "리치고" from index.html
html = html.replace("리치고(RichGo) 헤더 & 17개 시도 선택 알약 버튼 바", "전국 학교 학군 순위 헤더 & 17개 시도 선택 알약 버튼 바")
html = html.replace("시군구별 순위 테이블 섹션 (리치고 스타일)", "시군구별 순위 테이블 섹션 (공식 학군 기준)")
html = html.replace("<span>리치고 순위표</span>", "<span>전국 학교 순위표</span>")
html = html.replace("데이터 출처: 리치고(RichGo) & 학교알리미", "데이터 출처: 교육부 공식 공시 & 학교알리미")
html = html.replace("리치고(RichGo) 학교 등급 산출 기준 모달", "공식 학교 학군 등급 산출 기준 모달")
html = html.replace("리치고(RichGo) 학교 등급 산출 기준</h3>", "공식 학교 학군 등급 산출 기준</h3>")
html = html.replace("리치고(RichGo) 공시 전국 학교 학군 등급표", "공식 공시 전국 학교 학군 등급표")
html = html.replace("리치고(RichGo) 학교 상세 심층 분석 모달", "전국 학교 상세 심층 분석 모달")

# 3. Add #view-apartments and #view-admissions right after #view-schools
view_schools_end = """          </div>
        </section>
  </main>"""

new_sections = """          </div>
        </section>

        <!-- VIEW 7: 아파트별 학군 & 배정학교 실시간 조회 게시판 -->
        <section id="view-apartments" class="view-section hidden space-y-5">
          <!-- 상단 헤더 배너 -->
          <div class="community-card p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl shadow-xl space-y-4 border border-indigo-700/60">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-700/60 pb-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    <span>실시간 학군 연동</span>
                  </span>
                  <span class="text-xs font-bold text-indigo-300">교육부 공식 학구도 및 전국 아파트 배정학교 분석</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>🏢 전국 아파트별 학군 & 배정학교 실시간 조회</span>
                </h2>
                <p class="text-xs text-indigo-200 leading-relaxed">
                  아파트 단지명(예: 잠실엘스, 은마, 반포자이, 판교그랑블, 목동7단지)을 검색하면 배정 초·중·고 도보 거리, 학군 등급(S/A/B), 시도 내 순위 및 대입 합격 실적을 실시간으로 확인합니다.
                </p>
              </div>

              <div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span class="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-black text-indigo-200">
                  📍 전국 17개 시도 주요 아파트 단지 연동
                </span>
              </div>
            </div>

            <!-- 아파트 검색바 -->
            <div class="space-y-2.5 pt-1">
              <div class="relative flex items-center">
                <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 text-sm"></i>
                <input
                  type="text"
                  id="apartments-search-input"
                  placeholder="아파트명 또는 단지명을 입력하세요 (예: 잠실엘스, 은마, 반포자이, 목동7단지, 판교그랑블, 마포래미안푸르지오...)"
                  class="w-full pl-11 pr-24 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-slate-900 border-2 border-indigo-400 focus:border-amber-400 focus:outline-none shadow-inner placeholder:text-slate-400"
                  onkeydown="if(event.key==='Enter') app.searchApartmentDistrict()"
                />
                <button
                  type="button"
                  onclick="app.searchApartmentDistrict()"
                  class="absolute right-2.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <i class="fa-solid fa-bolt text-[11px] text-amber-300"></i>
                  <span>조회</span>
                </button>
              </div>

              <!-- 대표 인기 단지 핫픽 태그 바 -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                <span class="text-indigo-300 font-extrabold shrink-0 mr-1">🔥 주요 학군 아파트:</span>
                <div class="flex items-center gap-1.5 flex-nowrap" id="apartments-preset-chips">
                  <!-- Rendered dynamically -->
                </div>
              </div>
            </div>

            <!-- 아파트 학군 실시간 결과 컨테이너 -->
            <div id="apartments-district-results-box" class="space-y-3 pt-2">
              <!-- Rendered dynamically -->
            </div>
          </div>
        </section>

        <!-- VIEW 8: 교육부 공식 공시 입시 정보 포털 -->
        <section id="view-admissions" class="view-section hidden space-y-5">
          <!-- 상단 포털 헤더 -->
          <div class="community-card p-6 bg-white border border-slate-200 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-extrabold text-[11px]">
                    교육부(MOE) 공식 공시
                  </span>
                  <span class="text-xs font-bold text-slate-400">대교협 · 한국교육과정평가원 · KEDI 공시</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                  <span>📚 교육부 공시 입시 정보 포털</span>
                </h2>
                <p class="text-xs text-slate-500 font-medium mt-1">
                  2028 대입 개편 확정안, 고교학점제 전면 시행, 2026~2027 수시·정시 전형 가이드 및 특목·자사고 고입 로드맵을 신속하고 정확하게 제공합니다.
                </p>
              </div>

              <div class="flex items-center gap-2 self-start sm:self-auto shrink-0 text-xs">
                <span class="text-slate-500 font-bold">최종 공시 업데이트:</span>
                <strong class="text-indigo-600 font-black" id="admissions-updated-date">2026.10.29</strong>
              </div>
            </div>

            <!-- 4대 공식 입시 핵심 하이라이트 배너 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div onclick="app.setAdmissionsCategory('reform2028')" class="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 hover:bg-rose-100/60 cursor-pointer transition flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs">🎯</div>
                <div class="min-w-0">
                  <div class="text-[10px] text-rose-600 font-extrabold">교육부 확정</div>
                  <div class="font-black text-slate-900 truncate mt-0.5">2028 대입 개편안</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">통합형 수능 & 내신 5등급제</div>
                </div>
              </div>

              <div onclick="app.setAdmissionsCategory('highcredit')" class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 hover:bg-emerald-100/60 cursor-pointer transition flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs">📘</div>
                <div class="min-w-0">
                  <div class="text-[10px] text-emerald-600 font-extrabold">전면 시행</div>
                  <div class="font-black text-slate-900 truncate mt-0.5">고교학점제 가이드</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">192학점 이수 & 과목선택</div>
                </div>
              </div>

              <div onclick="app.setAdmissionsCategory('college')" class="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 hover:bg-indigo-100/60 cursor-pointer transition flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs">🏛️</div>
                <div class="min-w-0">
                  <div class="text-[10px] text-indigo-600 font-extrabold">대교협 공시</div>
                  <div class="font-black text-slate-900 truncate mt-0.5">수시·정시 전형 일정</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">무전공·의대 선발 확대</div>
                </div>
              </div>

              <div onclick="app.setAdmissionsCategory('specialhigh')" class="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 hover:bg-amber-100/60 cursor-pointer transition flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-base shrink-0 shadow-2xs">🎒</div>
                <div class="min-w-0">
                  <div class="text-[10px] text-amber-700 font-extrabold">고입 전형</div>
                  <div class="font-black text-slate-900 truncate mt-0.5">특목·자사고 고입</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">전국단위 자사고·과고·외고</div>
                </div>
              </div>
            </div>

            <!-- 공식 유관기관 바로가기 링크 바 -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1 text-[11px] font-bold text-slate-600 border-t border-slate-100">
              <span class="text-slate-400 shrink-0 font-extrabold">🏛️ 공식 기관 바로가기:</span>
              <a href="https://www.moe.go.kr" target="_blank" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 shrink-0 transition">교육부 누리집</a>
              <a href="https://www.adiga.kr" target="_blank" class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 shrink-0 transition">대입정보포털 어디가</a>
              <a href="https://www.kcue.or.kr" target="_blank" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 shrink-0 transition">대학교육협의회</a>
              <a href="https://www.suneung.re.kr" target="_blank" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 shrink-0 transition">수능평가원</a>
              <a href="https://www.schoolinfo.go.kr" target="_blank" class="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 shrink-0 transition">학교알리미</a>
              <a href="https://www.ebsi.co.kr" target="_blank" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 shrink-0 transition">EBSi 입시</a>
            </div>
          </div>

          <!-- 카테고리 탭 칩스 & 검색 바 -->
          <div class="community-card p-4 bg-white border border-slate-200 space-y-3">
            <!-- 카테고리 버튼들 -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs" id="admissions-category-chips">
              <!-- Rendered dynamically -->
            </div>

            <!-- 검색바 -->
            <div class="relative flex items-center">
              <i class="fa-solid fa-magnifying-glass text-slate-400 text-xs absolute left-3.5 top-1/2 -translate-y-1/2"></i>
              <input
                type="text"
                id="admissions-search-input"
                placeholder="입시 정보 키워드 검색 (예: 내신 5등급제, 고교학점제, 통합수능, 무전공, 의대 정원, 과학고...)"
                oninput="app.onAdmissionsSearch(this.value)"
                class="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs font-medium border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                id="admissions-search-clear"
                onclick="app.clearAdmissionsSearch()"
                class="hidden absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>

          <!-- 입시 정보 목록 리스트 컨테이너 -->
          <div id="admissions-list-container" class="space-y-3">
            <!-- Rendered dynamically -->
          </div>
        </section>
  </main>"""

assert view_schools_end in html, "view_schools_end not found"
html = html.replace(view_schools_end, new_sections, 1)

# 4. Add #admission-detail-modal before closing body
modal_code = """  <!-- ==========================================
       MODAL 8: 교육부 입시 정보 상세 심층 모달
       ========================================== -->
  <div id="admission-detail-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
      <!-- 모달 헤더 -->
      <div class="flex items-start justify-between border-b border-stone-100 pb-3 shrink-0">
        <div id="admission-modal-header" class="space-y-1 pr-2">
          <!-- Rendered dynamically -->
        </div>
        <button onclick="app.closeAdmissionDetailModal()" class="text-slate-400 hover:text-slate-600 transition p-1"><i class="fa-solid fa-xmark text-xl"></i></button>
      </div>

      <!-- 모달 본문 (스크롤) -->
      <div id="admission-modal-body" class="overflow-y-auto flex-1 pr-1 space-y-4 text-xs leading-relaxed">
        <!-- Rendered dynamically -->
      </div>

      <!-- 모달 하단 닫기 & 원문 바로가기 -->
      <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 shrink-0 text-xs">
        <div id="admission-modal-links" class="flex items-center gap-2">
          <!-- Rendered dynamically -->
        </div>
        <button onclick="app.closeAdmissionDetailModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition">
          닫기
        </button>
      </div>
    </div>
  </div>

  <script src="js/admissions_data.js"></script>
"""

script_schools = '<script src="js/richgo_data.js"></script>'
assert script_schools in html, "script_schools not found"
html = html.replace(script_schools, script_schools + "\n  <script src=\"js/admissions_data.js\"></script>", 1)

# Add modal before </body>
body_end = '</body>'
assert body_end in html, "body_end not found"
html = html.replace(body_end, modal_code + "\n</body>", 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully updated index.html with new boards and cleaned names!")
