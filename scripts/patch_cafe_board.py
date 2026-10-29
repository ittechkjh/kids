# -*- coding: utf-8 -*-

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace #view-board
old_view_board = """        <!-- VIEW 1: 도담 육아 게시판 (실시간 라운지 -> 본격 커뮤니티 게시판 개편) -->
        <section id="view-board" class="view-section space-y-5">
          <!-- 상단 게시판 헤더 및 빠른 글쓰기 바 -->
          <div class="community-card p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 shadow-sm">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-extrabold text-[11px]">자유 소통</span>
                <h2 class="text-lg font-black text-slate-900">💬 도담 육아 커뮤니티 게시판</h2>
              </div>
              <p class="text-xs text-slate-500 font-medium mt-1">
                출산·영아, 유아·초등 발달, 육아 꿀팁, 고민상담까지 엄마·아빠들과 함께 나누는 열린 게시판
              </p>
            </div>
            <button
              onclick="app.openWritePostModal()"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl coral-badge-gradient text-white font-black text-xs shadow-md shadow-rose-500/20 hover:opacity-95 transition shrink-0"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              <span>새 글 쓰기</span>
            </button>
          </div>

          <!-- 게시판 카테고리 탭 칩스 (가로 스크롤) -->
          <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1" id="board-category-chips"></div>

          <!-- 실시간 육아 밸런스 투표 카드 (게시판 상단 하이라이트) -->
          <div id="active-poll-card" class="community-card p-5 bg-gradient-to-br from-white via-white to-rose-50/40"></div>

          <!-- 게시판 검색 & 정렬 & 뷰모드 헤더 (네이버 카페 스타일) -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1">
            <div class="flex items-center gap-2">
              <h3 id="current-board-title" class="text-sm font-black text-slate-900">전체 게시글</h3>
              <span id="current-board-count" class="text-xs font-bold text-rose-500"></span>
            </div>
            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <!-- 뷰 모드 토글: 네이버 카페 목록형 vs 피드 카드형 -->
              <div class="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 shrink-0">
                <button
                  id="btn-board-view-cafe"
                  onclick="app.setBoardViewMode('cafe')"
                  class="px-2.5 py-1 rounded-lg text-xs font-black transition bg-white text-slate-900 shadow-2xs flex items-center gap-1.5"
                  title="네이버 카페형 깔끔한 목록 보기"
                >
                  <i class="fa-solid fa-list-ul text-[10px] text-emerald-600"></i>
                  <span>카페 목록형</span>
                </button>
                <button
                  id="btn-board-view-card"
                  onclick="app.setBoardViewMode('card')"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1.5"
                  title="피드 카드형 보기"
                >
                  <i class="fa-solid fa-table-cells-large text-[10px]"></i>
                  <span>피드형</span>
                </button>
              </div>

              <!-- 게시판 내 검색창 -->
              <div class="relative">
                <i class="fa-solid fa-magnifying-glass text-slate-400 text-xs absolute left-3 top-1/2 -translate-y-1/2"></i>
                <input
                  id="board-search-input"
                  type="text"
                  placeholder="제목, 내용, 작성자 검색..."
                  oninput="app.onBoardSearch(this.value)"
                  class="pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 w-40 sm:w-48"
                />
              </div>

              <!-- 정렬 버튼 그룹 -->
              <div class="flex items-center gap-1 bg-white border border-stone-200 rounded-xl p-1 text-xs shrink-0">
                <button onclick="app.setBoardSort('latest')" data-sort="latest" class="board-sort-btn px-2.5 py-1 rounded-lg font-extrabold bg-slate-900 text-white">최신순</button>
                <button onclick="app.setBoardSort('popular')" data-sort="popular" class="board-sort-btn px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-800">공감순</button>
                <button onclick="app.setBoardSort('comments')" data-sort="comments" class="board-sort-btn px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-800">댓글순</button>
                <button onclick="app.setBoardSort('views')" data-sort="views" class="board-sort-btn px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-800">조회순</button>
              </div>
            </div>
          </div>

          <!-- 게시글 목록 (네이버 카페형 목록 / 피드형 하이브리드) -->
          <div id="board-posts-list"></div>

          <!-- 게시판 페이징 네비게이션 -->
          <div id="board-pagination-container" class="pt-2 text-center"></div>
        </section>"""

new_view_board = """        <!-- VIEW 1: 도담 육아 게시판 (네이버 카페 완벽 일체형) -->
        <section id="view-board" class="view-section space-y-4">
          <!-- 1. 네이버 카페형 상단 헤더 & 카테고리 탭 바 -->
          <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs p-4 sm:p-5 space-y-3.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3.5">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded-md bg-[#03C75A]/10 text-[#03C75A] font-black text-[11px] border border-[#03C75A]/20 flex items-center gap-1">
                    <i class="fa-solid fa-comments"></i>
                    <span>도담 맘카페</span>
                  </span>
                  <span class="text-xs font-bold text-slate-400">엄마·아빠들의 따뜻한 육아 나눔터</span>
                </div>
                <h2 class="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>☕ 도담 육아 커뮤니티</span>
                </h2>
              </div>

              <!-- 상단 우측 카페 글쓰기 & 투표 토글 버튼 -->
              <div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onclick="app.togglePollBanner()"
                  id="btn-toggle-poll"
                  class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  <i class="fa-solid fa-chart-pie text-amber-500"></i>
                  <span>육아 투표</span>
                </button>
                <button
                  type="button"
                  onclick="app.openWritePostModal()"
                  class="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-xs shadow-sm transition cursor-pointer"
                >
                  <i class="fa-solid fa-pen-nib"></i>
                  <span>카페 글쓰기</span>
                </button>
              </div>
            </div>

            <!-- 네이버 카페 말머리 탭 (스크롤 바) -->
            <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs" id="board-category-chips"></div>

            <!-- 접이식 실시간 육아 밸런스 투표 카드 -->
            <div id="active-poll-card" class="hidden rounded-2xl bg-gradient-to-br from-amber-50/60 to-rose-50/40 p-4 border border-amber-200/60 transition-all"></div>
          </div>

          <!-- 2. 게시판 테이블 상단 컨트롤 바 (네이버 카페 표준) -->
          <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2">
              <h3 id="current-board-title" class="text-sm font-black text-slate-900">전체글</h3>
              <span id="current-board-count" class="text-xs font-bold text-rose-500"></span>
            </div>

            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-between sm:justify-end text-xs">
              <!-- 정렬 선택기 -->
              <div class="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-xl p-0.5 font-bold">
                <button onclick="app.setBoardSort('latest')" data-sort="latest" class="board-sort-btn px-2.5 py-1 rounded-lg font-black bg-slate-900 text-white">최신순</button>
                <button onclick="app.setBoardSort('popular')" data-sort="popular" class="board-sort-btn px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900">공감순</button>
                <button onclick="app.setBoardSort('comments')" data-sort="comments" class="board-sort-btn px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900">댓글순</button>
                <button onclick="app.setBoardSort('views')" data-sort="views" class="board-sort-btn px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900">조회순</button>
              </div>

              <!-- 페이지당 글 수 셀렉터 -->
              <select
                id="board-pagesize-select"
                onchange="app.setBoardPageSize(parseInt(this.value))"
                class="px-2.5 py-1 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="15">15개씩</option>
                <option value="20">20개씩</option>
                <option value="30">30개씩</option>
              </select>

              <!-- 빠른 상단 검색 -->
              <div class="relative">
                <i class="fa-solid fa-magnifying-glass text-slate-400 text-[11px] absolute left-2.5 top-1/2 -translate-y-1/2"></i>
                <input
                  id="board-search-input"
                  type="text"
                  placeholder="제목·작성자 검색"
                  oninput="app.onBoardSearch(this.value)"
                  class="pl-7 pr-3 py-1 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium w-36 sm:w-44 focus:outline-none focus:bg-white focus:border-[#03C75A]"
                />
              </div>
            </div>
          </div>

          <!-- 3. 네이버 카페형 게시글 목록 테이블 -->
          <div id="board-posts-list"></div>

          <!-- 4. 네이버 카페형 하단 컨트롤 & 페이지네이션 바 -->
          <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs p-4 space-y-3">
            <!-- 페이지 번호 네비게이션 -->
            <div id="board-pagination-container" class="text-center"></div>

            <!-- 하단 글쓰기 및 정밀 검색 바 -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
              <button
                type="button"
                onclick="app.openWritePostModal()"
                class="px-4 py-2 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <i class="fa-solid fa-pen-nib"></i>
                <span>카페 글쓰기</span>
              </button>

              <!-- 하단 네이버 카페형 검색 폼 -->
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
              </div>

              <button
                type="button"
                onclick="app.resetBoardFilter()"
                class="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 font-bold transition flex items-center justify-center gap-1 self-start sm:self-auto"
              >
                <i class="fa-solid fa-rotate-left text-[11px]"></i>
                <span>전체목록</span>
              </button>
            </div>
          </div>
        </section>"""

assert old_view_board in html, "old_view_board not found"
html = html.replace(old_view_board, new_view_board, 1)

# Replace #write-post-modal with Naver SmartEditor Style Full Modal
old_write_modal = """  <!-- ==========================================
       MODAL 1: 커뮤니티 새 글 쓰기 모달
       ========================================== -->
  <div id="write-post-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
      <div class="flex items-center justify-between border-b border-stone-100 pb-3">
        <h3 class="text-base font-black text-slate-900">✏️ 도담톡 커뮤니티 새 글 작성</h3>
        <button onclick="app.closeWritePostModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>

      <form onsubmit="app.submitNewPost(event)" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-bold text-slate-700 mb-1">카테고리 선택</label>
            <select id="post-form-category" class="w-full border border-stone-300 rounded-xl px-3 py-2 font-bold">
              <option value="newborn">🍼 출산·영아(0~24m)</option>
              <option value="toddler">🧒 유아·어린이집(3~7세)</option>
              <option value="school">🎒 초등맘 라운지</option>
              <option value="working">💼 워킹맘·대디</option>
              <option value="talk">🗣️ 속풀이·부부토크</option>
              <option value="tips">💡 육아꿀팁·레시피</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">동네 태그</label>
            <select id="post-form-region" class="w-full border border-stone-300 rounded-xl px-3 py-2 font-bold">
              <option value="all">전국 공통</option>
              <option value="pangyo">분당·판교·위례</option>
              <option value="songpa">강남·서초·송파</option>
              <option value="dongtan">동탄·수원·광교</option>
              <option value="mapo">마포·목동·용산</option>
              <option value="sejong">세종·대전·충청</option>
              <option value="incheon">인천·김포·일산</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">제목</label>
          <input id="post-form-title" type="text" required placeholder="고민이나 나누고 싶은 이야기를 적어주세요" class="w-full border border-stone-300 rounded-xl px-3.5 py-2.5 font-bold text-slate-900" />
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">본문 내용</label>
          <textarea id="post-form-content" rows="5" required placeholder="아이 개월수나 상황을 함께 적어주시면 육아 선배·동기분들이 더 정확한 답변을 달아드려요!" class="w-full border border-stone-300 rounded-xl p-3.5 leading-relaxed text-slate-800"></textarea>
        </div>

        <div>
          <label class="block font-bold text-slate-700 mb-1">해시태그 (쉼표로 구분)</label>
          <input id="post-form-tags" type="text" placeholder="예: 수면교육, 이유식식단, 어린이집적응" class="w-full border border-stone-300 rounded-xl px-3.5 py-2" />
        </div>

        <div class="flex justify-end gap-2 pt-3 border-t border-stone-100">
          <button type="button" onclick="app.closeWritePostModal()" class="px-4 py-2 rounded-xl border border-stone-200 font-bold text-slate-600">취소</button>
          <button type="submit" class="px-5 py-2 rounded-xl coral-badge-gradient text-white font-extrabold shadow-sm">게시글 등록하기</button>
        </div>
      </form>
    </div>
  </div>"""

new_write_modal = """  <!-- ==========================================
       MODAL 1: 네이버 스마트에디터형 카페 글쓰기 모달
       ========================================== -->
  <div id="write-post-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
    <div class="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
      <!-- 1. 스마트에디터 상단 헤더 -->
      <div class="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2.5">
          <span class="w-8 h-8 rounded-xl bg-[#03C75A] text-white flex items-center justify-center font-black text-sm shadow-2xs">
            <i class="fa-solid fa-pen-nib"></i>
          </span>
          <div>
            <div class="text-[10px] font-extrabold text-[#03C75A]">NAVER CAFE STYLE EDITOR</div>
            <h3 class="text-sm sm:text-base font-black text-slate-900">도담 육아 카페 글쓰기</h3>
          </div>
        </div>

        <!-- 우측 액션: 임시저장 & 등록 버튼 -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick="app.savePostDraft()"
            id="btn-draft-save"
            class="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-slate-600 font-bold text-xs transition flex items-center gap-1 cursor-pointer"
          >
            <i class="fa-regular fa-floppy-disk text-[11px]"></i>
            <span>임시저장</span>
            <span id="draft-count-badge" class="px-1.5 py-0.2 rounded-full bg-stone-200 text-[10px] font-black">0</span>
          </button>
          <button
            type="button"
            onclick="app.loadPostDraft()"
            id="btn-draft-load"
            class="hidden px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs transition cursor-pointer"
          >
            불러오기
          </button>
          <button
            type="button"
            onclick="app.submitNewPost(event)"
            class="px-4 sm:px-5 py-1.5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-xs shadow-sm transition flex items-center gap-1 cursor-pointer"
          >
            <i class="fa-solid fa-check text-[11px]"></i>
            <span>등록</span>
          </button>
          <button
            type="button"
            onclick="app.closeWritePostModal()"
            class="text-slate-400 hover:text-slate-600 p-1.5 transition ml-1"
          >
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
      </div>

      <!-- 2. 에디터 본문 (스크롤) -->
      <form id="write-post-form" onsubmit="app.submitNewPost(event)" class="overflow-y-auto flex-1 p-5 space-y-4 text-xs">
        <!-- 말머리 및 지역 선택 바 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-slate-700 mb-1">
              <span class="text-rose-500 mr-0.5">*</span>게시판 말머리 선택
            </label>
            <select id="post-form-category" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-800 focus:bg-white focus:border-[#03C75A] focus:outline-none">
              <option value="newborn">🍼 출산·영아(0~24m)</option>
              <option value="toddler">🧒 유아·어린이집(3~7세)</option>
              <option value="school">🎒 초등맘 라운지</option>
              <option value="working">💼 워킹맘·대디</option>
              <option value="talk">🗣️ 속풀이·부부토크</option>
              <option value="tips">💡 육아꿀팁·레시피</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">동네·지역 태그</label>
            <select id="post-form-region" class="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 font-bold text-slate-800 focus:bg-white focus:border-[#03C75A] focus:outline-none">
              <option value="all">전국 전체</option>
              <option value="seoul">서울특별시</option>
              <option value="gyeonggi">경기도</option>
              <option value="incheon">인천광역시</option>
              <option value="daejeon">대전·세종·충청</option>
              <option value="daegu">대구·경북</option>
              <option value="busan">부산·울산·경남</option>
              <option value="gwangju">광주·전라</option>
              <option value="gangwon">강원·제주</option>
            </select>
          </div>
        </div>

        <!-- 스마트에디터 서식 툴바 -->
        <div class="bg-stone-50/90 border border-stone-200 rounded-2xl p-2 flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onclick="document.getElementById('post-file-input').click()"
            class="px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-slate-700 font-bold text-xs flex items-center gap-1 transition"
          >
            <i class="fa-regular fa-image text-emerald-600"></i>
            <span>사진 첨부</span>
          </button>

          <!-- 간편 샘플 사진 프리셋 드롭다운 -->
          <div class="relative inline-block group">
            <button
              type="button"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-slate-700 font-bold text-xs flex items-center gap-1 transition"
            >
              <i class="fa-solid fa-shapes text-amber-500"></i>
              <span>육아 사진 템플릿</span>
              <i class="fa-solid fa-chevron-down text-[9px] text-slate-400"></i>
            </button>
            <div class="hidden group-hover:block absolute left-0 top-full mt-1 w-44 bg-white border border-stone-200 rounded-xl shadow-lg p-1.5 z-20 space-y-1">
              <button type="button" onclick="app.addPresetPhoto('baby_food')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">🍼 이유식·식판 사진</button>
              <button type="button" onclick="app.addPresetPhoto('play')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">🧸 장난감·몬테소리</button>
              <button type="button" onclick="app.addPresetPhoto('books')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">📚 전집·그림책 후기</button>
              <button type="button" onclick="app.addPresetPhoto('stroller')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">🚼 유모차·육아용품</button>
            </div>
          </div>

          <div class="h-4 w-px bg-stone-300 mx-0.5"></div>

          <button
            type="button"
            onclick="app.insertEditorText('> ', '', '인용할 내용을 입력하세요')"
            class="px-2 py-1.5 rounded-lg hover:bg-stone-200/70 text-slate-700 font-bold text-xs transition"
            title="인용구 삽입"
          >
            <i class="fa-solid fa-quote-left"></i>
          </button>
          <button
            type="button"
            onclick="app.insertEditorText('\\n---\\n', '', '')"
            class="px-2 py-1.5 rounded-lg hover:bg-stone-200/70 text-slate-700 font-bold text-xs transition"
            title="구분선 삽입"
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <button
            type="button"
            onclick="app.insertEditorText('• ', '', '목록 내용')"
            class="px-2 py-1.5 rounded-lg hover:bg-stone-200/70 text-slate-700 font-bold text-xs transition"
            title="글머리 기호"
          >
            <i class="fa-solid fa-list-ul"></i>
          </button>
          <button
            type="button"
            onclick="app.insertEditorText('**', '**', '굵은글씨')"
            class="px-2 py-1.5 rounded-lg hover:bg-stone-200/70 text-slate-700 font-black text-xs transition"
            title="굵게"
          >
            <b>B</b>
          </button>

          <div class="h-4 w-px bg-stone-300 mx-0.5"></div>

          <!-- 추천 템플릿 버튼들 -->
          <div class="flex items-center gap-1">
            <span class="text-[10px] text-slate-400 font-extrabold mr-0.5">템플릿:</span>
            <button
              type="button"
              onclick="app.applyEditorTemplate('qa')"
              class="px-2 py-1 rounded-md bg-stone-200/80 hover:bg-stone-300/80 text-slate-700 font-bold text-[11px] transition"
            >
              질문 템플릿
            </button>
            <button
              type="button"
              onclick="app.applyEditorTemplate('review')"
              class="px-2 py-1 rounded-md bg-stone-200/80 hover:bg-stone-300/80 text-slate-700 font-bold text-[11px] transition"
            >
              내돈내산 후기
            </button>
            <button
              type="button"
              onclick="app.applyEditorTemplate('tip')"
              class="px-2 py-1 rounded-md bg-stone-200/80 hover:bg-stone-300/80 text-slate-700 font-bold text-[11px] transition"
            >
              꿀팁 공유
            </button>
          </div>
        </div>

        <input type="file" id="post-file-input" accept="image/*" class="hidden" onchange="app.handlePhotoUpload(event)" multiple />

        <!-- 첨부된 사진 미리보기 썸네일 스트립 -->
        <div id="post-attached-photos-container" class="hidden flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <!-- Rendered dynamically -->
        </div>

        <!-- 네이버 카페 스타일 제목 입력창 -->
        <div>
          <input
            id="post-form-title"
            type="text"
            required
            placeholder="제목을 입력해 주세요 (최대 60자)"
            class="w-full border-0 border-b-2 border-stone-200 py-3 text-base sm:text-lg font-black text-slate-900 placeholder:text-stone-300 focus:outline-none focus:border-[#03C75A] transition"
          />
        </div>

        <!-- 본문 텍스트에어리어 -->
        <div class="space-y-1">
          <textarea
            id="post-form-content"
            rows="10"
            required
            placeholder="아이 개월수나 상황을 함께 적어주시면 육아 선배·동기분들이 더 따뜻하고 정확한 답변을 달아드려요!&#10;&#10;상단의 [사진 첨부]나 [템플릿] 버튼을 활용하시면 더 읽기 편한 글을 쓰실 수 있습니다."
            class="w-full p-4 bg-stone-50/50 rounded-2xl border border-stone-200 focus:bg-white focus:border-[#03C75A] focus:outline-none leading-relaxed text-slate-800 font-medium text-xs sm:text-sm min-h-[240px] transition"
          ></textarea>
        </div>

        <!-- 해시태그 & 추천 태그 바 -->
        <div class="space-y-2 pt-1 border-t border-stone-100">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-hashtag text-slate-400 text-xs"></i>
            <input
              id="post-form-tags"
              type="text"
              placeholder="태그를 입력해 주세요 (쉼표 또는 띄어쓰기로 구분)"
              class="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-[#03C75A] focus:outline-none"
            />
          </div>

          <!-- 인기 추천 태그 클릭 칩스 -->
          <div class="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500">
            <span class="font-extrabold text-slate-400 shrink-0">추천:</span>
            <button type="button" onclick="app.appendTagToForm('이유식')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#이유식</button>
            <button type="button" onclick="app.appendTagToForm('수면교육')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#수면교육</button>
            <button type="button" onclick="app.appendTagToForm('어린이집적응')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#어린이집적응</button>
            <button type="button" onclick="app.appendTagToForm('워킹맘고민')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#워킹맘고민</button>
            <button type="button" onclick="app.appendTagToForm('초등입학')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#초등입학</button>
            <button type="button" onclick="app.appendTagToForm('내돈내산')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#내돈내산</button>
          </div>
        </div>

        <!-- 하단 옵션 바 -->
        <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3 text-slate-500 font-bold">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="post-allow-comments" checked class="rounded accent-[#03C75A]" />
              <span>댓글 허용</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" id="post-allow-search" checked class="rounded accent-[#03C75A]" />
              <span>검색 허용</span>
            </label>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              onclick="app.closeWritePostModal()"
              class="px-4 py-2 rounded-xl border border-stone-200 font-bold text-slate-600 hover:bg-stone-100 transition cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              class="px-5 py-2 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black shadow-sm transition flex items-center gap-1 cursor-pointer"
            >
              <i class="fa-solid fa-check"></i>
              <span>게시글 등록하기</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>"""

assert old_write_modal in html, "old_write_modal not found"
html = html.replace(old_write_modal, new_write_modal, 1)

# Replace #post-detail-modal with Naver Cafe Article Viewer
old_detail_modal = """  <!-- ==========================================
       MODAL: 게시글 상세 및 댓글 모달
       ========================================== -->
  <div id="post-detail-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border border-stone-200">
      <div class="flex items-center justify-between border-b border-stone-100 pb-3 shrink-0">
        <span id="post-detail-category-badge" class="px-2.5 py-1 rounded-full text-xs font-extrabold"></span>
        <button onclick="app.closePostDetailModal()" class="text-slate-400 hover:text-slate-600 text-lg">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="overflow-y-auto space-y-4 py-4 flex-1 pr-1">
        <div>
          <h2 id="post-detail-title" class="text-lg font-black text-slate-900 leading-snug"></h2>
          <div class="flex items-center gap-2.5 text-xs text-slate-400 mt-2 font-medium">
            <span id="post-detail-author" class="font-bold text-slate-700"></span>
            <span id="post-detail-author-badge" class="px-1.5 py-0.5 rounded bg-stone-100 text-slate-600 font-semibold text-[10px]"></span>
            <span id="post-detail-region" class="px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold text-[10px]"></span>
            <span id="post-detail-date"></span>
            <span>· 조회 <span id="post-detail-views">0</span></span>
          </div>
        </div>

        <div id="post-detail-content" class="text-sm text-slate-800 leading-relaxed whitespace-pre-line py-2 border-y border-stone-100"></div>

        <div id="post-detail-tags" class="flex flex-wrap gap-1.5 pt-1"></div>

        <div class="flex items-center justify-center gap-3 pt-2">
          <button id="post-detail-like-btn" onclick="app.reactToPostModal()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-black text-xs hover:bg-rose-100 transition">
            <i class="fa-regular fa-heart"></i>
            <span>공감해요</span>
            <span id="post-detail-likes-count">0</span>
          </button>
          <button id="post-detail-scrap-btn" onclick="app.toggleScrapModal()" class="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-slate-700 font-black text-xs hover:bg-stone-100 transition">
            <i class="fa-regular fa-bookmark"></i>
            <span>스크랩</span>
          </button>
        </div>

        <!-- 댓글 목록 -->
        <div class="space-y-3 pt-4 border-t border-stone-100">
          <h4 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <i class="fa-solid fa-comments text-rose-500"></i>
            <span>댓글 (<span id="post-detail-comments-count">0</span>)</span>
          </h4>
          <div id="post-detail-comments-list" class="space-y-2.5"></div>
        </div>
      </div>

      <!-- 댓글 입력 폼 -->
      <form onsubmit="app.submitBoardComment(event)" class="pt-3 border-t border-stone-100 flex items-center gap-2 shrink-0">
        <input
          id="post-comment-input"
          type="text"
          required
          placeholder="따뜻한 응원이나 경험을 공유해주세요..."
          class="flex-1 border border-stone-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
        />
        <button type="submit" class="px-4 py-2 rounded-xl coral-badge-gradient text-white font-black text-xs shrink-0 hover:opacity-95">
          등록
        </button>
      </form>
    </div>
  </div>"""

new_detail_modal = """  <!-- ==========================================
       MODAL: 네이버 카페형 게시글 상세 뷰어 & 댓글 모달
       ========================================== -->
  <div id="post-detail-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col p-5 sm:p-6 shadow-2xl border border-stone-200">
      <!-- 1. 상단 네이버 카페 네비게이션 바 -->
      <div class="flex items-center justify-between border-b border-stone-100 pb-3 shrink-0 text-xs">
        <div class="flex items-center gap-2">
          <span id="post-detail-category-badge" class="px-2.5 py-1 rounded-full font-black text-[11px]"></span>
          <span class="text-stone-300">|</span>
          <button onclick="app.navigatePostDetail(-1)" class="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1">
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
            <span>이전글</span>
          </button>
          <button onclick="app.navigatePostDetail(1)" class="text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1">
            <span>다음글</span>
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="app.copyPostUrl()" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-600 font-bold text-[11px] flex items-center gap-1 transition">
            <i class="fa-solid fa-link text-[10px]"></i>
            <span>URL 복사</span>
          </button>
          <button onclick="app.closePostDetailModal()" class="text-slate-400 hover:text-slate-600 text-lg p-1 transition">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- 2. 본문 스크롤 영역 -->
      <div class="overflow-y-auto space-y-4 py-4 flex-1 pr-1">
        <!-- 작성자 및 제목 헤더 -->
        <div class="space-y-3">
          <h2 id="post-detail-title" class="text-lg sm:text-xl font-black text-slate-900 leading-snug"></h2>

          <div class="flex items-center justify-between gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-100 text-xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <div id="post-detail-avatar" class="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs"></div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span id="post-detail-author" class="font-black text-slate-900"></span>
                  <span id="post-detail-author-badge" class="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-extrabold text-[10px]"></span>
                  <span id="post-detail-region" class="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-extrabold text-[10px]"></span>
                </div>
                <div class="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-0.5">
                  <span id="post-detail-date"></span>
                  <span>·</span>
                  <span>조회 <span id="post-detail-views">0</span></span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-1.5 shrink-0">
              <button onclick="app.toggleScrapModal()" id="post-detail-scrap-btn" class="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-slate-700 font-bold text-xs flex items-center gap-1 shadow-2xs transition">
                <i class="fa-regular fa-bookmark text-amber-500"></i>
                <span>스크랩</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 첨부 사진 갤러리 렌더링 -->
        <div id="post-detail-images-box" class="space-y-2 hidden"></div>

        <!-- 본문 내용 -->
        <div id="post-detail-content" class="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line py-2"></div>

        <!-- 해시태그 목록 -->
        <div id="post-detail-tags" class="flex flex-wrap gap-1.5 pt-1"></div>

        <!-- 네이버 카페 스타일 중앙 공감(좋아요) 반응 바 -->
        <div class="py-4 border-y border-stone-100 flex items-center justify-center gap-3">
          <button
            id="post-detail-like-btn"
            onclick="app.reactToPostModal()"
            class="flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-xs transition shadow-2xs cursor-pointer"
          >
            <i class="fa-solid fa-heart text-sm text-rose-500"></i>
            <span>공감해요</span>
            <span id="post-detail-likes-count" class="px-2 py-0.5 rounded-full bg-white text-rose-600 font-black text-xs shadow-2xs">0</span>
          </button>
        </div>

        <!-- 댓글 목록 섹션 -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <i class="fa-solid fa-comments text-[#03C75A]"></i>
              <span>댓글 <strong class="text-[#03C75A]" id="post-detail-comments-count">0</strong></span>
            </h4>
            <span class="text-[11px] text-slate-400 font-bold">등록순</span>
          </div>

          <div id="post-detail-comments-list" class="space-y-2.5"></div>
        </div>
      </div>

      <!-- 3. 네이버 카페형 댓글 입력 폼 -->
      <form onsubmit="app.submitBoardComment(event)" class="pt-3 border-t border-stone-100 space-y-2 shrink-0">
        <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
          <span class="w-2 h-2 rounded-full bg-[#03C75A]"></span>
          <span id="comment-author-name">도담맘</span>
          <span class="text-slate-400 font-medium">님으로 댓글 작성 중</span>
        </div>
        <div class="flex items-center gap-2">
          <input
            id="post-comment-input"
            type="text"
            required
            placeholder="따뜻한 응원이나 경험, 조언을 남겨주세요..."
            class="flex-1 border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#03C75A] focus:bg-white bg-stone-50 transition"
          />
          <button
            type="submit"
            class="px-5 py-2 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-xs shrink-0 shadow-2xs transition cursor-pointer"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  </div>"""

assert old_detail_modal in html, "old_detail_modal not found"
html = html.replace(old_detail_modal, new_detail_modal, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully patched index.html for Naver Cafe Board and SmartEditor!")
