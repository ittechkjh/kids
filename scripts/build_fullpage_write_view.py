# -*- coding: utf-8 -*-

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add #view-write right after #view-board
view_board_tag = '</section>'
# Find the end of #view-board
board_start = html.find('<section id="view-board"')
board_end = html.find('</section>', board_start) + len('</section>')

view_write_html = """

        <!-- VIEW 9: 네이버 스마트에디터형 카페 글쓰기 전용 화면 (풀페이지) -->
        <section id="view-write" class="view-section hidden space-y-4">
          <!-- 상단 헤더 바 (네이버 카페 글쓰기 헤더) -->
          <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs px-5 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button
                type="button"
                onclick="app.switchMainView('board')"
                class="text-slate-400 hover:text-slate-700 transition p-1 text-base flex items-center gap-1.5 cursor-pointer"
                title="게시판 목록으로 돌아가기"
              >
                <i class="fa-solid fa-arrow-left"></i>
                <span class="text-xs font-bold sm:inline hidden">목록으로</span>
              </button>
              <div class="h-4 w-px bg-stone-200 sm:block hidden"></div>
              <h2 class="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>카페 글쓰기</span>
              </h2>
            </div>

            <!-- 우측 액션: 임시등록 | 0 & 등록 버튼 -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                onclick="app.savePostDraft()"
                id="btn-draft-save"
                class="px-3.5 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-slate-700 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>임시등록</span>
                <span class="text-stone-300">|</span>
                <span id="draft-count-badge" class="font-black text-emerald-600">0</span>
              </button>
              <button
                type="button"
                onclick="app.loadPostDraft()"
                id="btn-draft-load"
                class="hidden px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs transition cursor-pointer"
              >
                불러오기
              </button>
              <button
                type="button"
                onclick="app.submitNewPost(event)"
                class="px-5 py-1.5 rounded-lg bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>등록</span>
              </button>
            </div>
          </div>

          <!-- 에디터 메인 캔버스 & 설정 사이드바 그리드 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <!-- 좌측: 에디터 본문 (LG 9 cols) -->
            <div class="lg:col-span-9 bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 sm:p-6 space-y-4">
              <!-- 1. 드롭다운 행: [게시판을 선택해 주세요.] [말머리 선택] [지역 선택] -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div>
                  <select id="post-form-category" class="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2 font-bold text-slate-800 focus:border-[#03C75A] focus:outline-none transition">
                    <option value="">게시판을 선택해 주세요.</option>
                    <option value="newborn" selected>🍼 출산·영아(0~24m)</option>
                    <option value="toddler">🧒 유아·어린이집(3~7세)</option>
                    <option value="school">🎒 초등맘 라운지</option>
                    <option value="working">💼 워킹맘·대디</option>
                    <option value="talk">🗣️ 속풀이·부부토크</option>
                    <option value="tips">💡 육아꿀팁·레시피</option>
                  </select>
                </div>

                <div>
                  <select id="post-form-prefix" class="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2 font-bold text-slate-800 focus:border-[#03C75A] focus:outline-none transition">
                    <option value="">말머리 선택</option>
                    <option value="질문">[질문]</option>
                    <option value="정보">[정보]</option>
                    <option value="후기">[후기]</option>
                    <option value="나눔">[나눔]</option>
                    <option value="일상">[일상]</option>
                    <option value="공감">[공감]</option>
                  </select>
                </div>

                <div>
                  <select id="post-form-region" class="w-full bg-white border border-stone-200 rounded-lg px-3.5 py-2 font-bold text-slate-800 focus:border-[#03C75A] focus:outline-none transition">
                    <option value="all">전국 전체 (지역무관)</option>
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

              <!-- 2. 제목 입력 박스 (네이버 스마트에디터 스타일) -->
              <div class="bg-[#f8f9fa] border border-stone-200/90 rounded-xl px-4 py-2.5 focus-within:bg-white focus-within:border-[#03C75A] transition">
                <input
                  id="post-form-title"
                  type="text"
                  required
                  placeholder="제목을 입력해 주세요."
                  class="w-full bg-transparent border-0 text-sm sm:text-base font-bold text-slate-900 placeholder:text-stone-400 focus:outline-none"
                />
              </div>

              <!-- 3. 스마트에디터 툴바 -->
              <div class="border border-stone-200 rounded-xl bg-stone-50/70 p-2 space-y-1.5 text-xs select-none">
                <!-- 1행: 아이콘 기능 버튼 -->
                <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-slate-600 font-medium">
                  <button type="button" onclick="document.getElementById('post-file-input').click()" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-stone-200 hover:bg-stone-100 text-slate-700 font-bold transition shrink-0">
                    <i class="fa-regular fa-image text-emerald-600"></i>
                    <span>사진 첨부</span>
                  </button>

                  <div class="relative inline-block group shrink-0">
                    <button type="button" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-stone-200 hover:bg-stone-100 text-slate-700 font-bold transition">
                      <i class="fa-solid fa-shapes text-amber-500"></i>
                      <span>육아 사진 템플릿</span>
                      <i class="fa-solid fa-chevron-down text-[9px] text-slate-400"></i>
                    </button>
                    <div class="hidden group-hover:block absolute left-0 top-full mt-1 w-44 bg-white border border-stone-200 rounded-xl shadow-lg p-1.5 z-20 space-y-1">
                      <button type="button" onclick="app.addPresetPhoto('baby_food')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">🍼 이유식·식판 사진</button>
                      <button type="button" onclick="app.addPresetPhoto('play')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">🧸 장난감·놀이</button>
                      <button type="button" onclick="app.addPresetPhoto('books')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">📚 전집·그림책 후기</button>
                      <button type="button" onclick="app.addPresetPhoto('stroller')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 font-bold text-[11px] text-slate-700">🚼 유모차·육아용품</button>
                    </div>
                  </div>

                  <div class="h-3.5 w-px bg-stone-300 shrink-0"></div>

                  <button type="button" onclick="app.insertEditorText('> ', '', '인용구를 입력하세요')" class="hover:text-slate-900 p-1 transition shrink-0 flex items-center gap-1" title="인용구">
                    <i class="fa-solid fa-quote-left text-[10px]"></i> 인용구
                  </button>
                  <button type="button" onclick="app.insertEditorText('\\n---\\n', '', '')" class="hover:text-slate-900 p-1 transition shrink-0 flex items-center gap-1" title="구분선">
                    <i class="fa-solid fa-minus text-[10px]"></i> 구분선
                  </button>
                  <button type="button" onclick="app.insertEditorText('• ', '', '목록')" class="hover:text-slate-900 p-1 transition shrink-0 flex items-center gap-1" title="목록">
                    <i class="fa-solid fa-list-ul text-[10px]"></i> 목록
                  </button>

                  <div class="h-3.5 w-px bg-stone-300 shrink-0"></div>

                  <button type="button" onclick="app.applyEditorTemplate('qa')" class="hover:text-slate-900 p-1 transition shrink-0 flex items-center gap-1 text-[11px]" title="질문 템플릿">
                    <i class="fa-regular fa-circle-question text-rose-500"></i> 질문템플릿
                  </button>
                  <button type="button" onclick="app.applyEditorTemplate('review')" class="hover:text-slate-900 p-1 transition shrink-0 flex items-center gap-1 text-[11px]" title="후기 템플릿">
                    <i class="fa-solid fa-star text-amber-500"></i> 후기템플릿
                  </button>
                  <button type="button" onclick="app.applyEditorTemplate('tip')" class="hover:text-slate-900 p-1 transition shrink-0 flex items-center gap-1 text-[11px]" title="꿀팁 템플릿">
                    <i class="fa-solid fa-lightbulb text-amber-400"></i> 꿀팁템플릿
                  </button>
                </div>

                <!-- 2행: 폰트 및 텍스트 서식 버튼 -->
                <div class="flex items-center gap-1.5 pt-1 border-t border-stone-200/60 overflow-x-auto no-scrollbar text-slate-700 font-bold">
                  <span class="px-2 py-0.5 rounded bg-white border border-stone-200 text-[11px]">본문</span>
                  <span class="px-2 py-0.5 rounded bg-white border border-stone-200 text-[11px]">기본서체</span>
                  <span class="px-2 py-0.5 rounded bg-white border border-stone-200 text-[11px]">15</span>
                  <div class="h-3 w-px bg-stone-300 mx-0.5"></div>
                  <button type="button" onclick="app.insertEditorText('**', '**', '굵게')" class="w-6 h-6 rounded hover:bg-stone-200 flex items-center justify-center font-black" title="굵게">B</button>
                  <button type="button" onclick="app.insertEditorText('*', '*', '기울임')" class="w-6 h-6 rounded hover:bg-stone-200 flex items-center justify-center italic font-serif" title="기울임">I</button>
                  <button type="button" onclick="app.insertEditorText('<u>', '</u>', '밑줄')" class="w-6 h-6 rounded hover:bg-stone-200 flex items-center justify-center underline" title="밑줄">U</button>
                  <button type="button" onclick="app.insertEditorText('~~', '~~', '취소선')" class="w-6 h-6 rounded hover:bg-stone-200 flex items-center justify-center line-through" title="취소선">S</button>
                </div>
              </div>

              <!-- 숨겨진 파일 인풋 -->
              <input type="file" id="post-file-input" accept="image/*" class="hidden" onchange="app.handlePhotoUpload(event)" multiple />

              <!-- 첨부 사진 썸네일 스트립 -->
              <div id="post-attached-photos-container" class="hidden flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar border-b border-stone-100"></div>

              <!-- 4. 본문 에디터 캔버스 -->
              <div>
                <textarea
                  id="post-form-content"
                  rows="16"
                  required
                  placeholder="내용을 입력하세요.&#10;&#10;따뜻한 육아 소통과 정보 나눔을 환영합니다."
                  class="w-full p-4 border border-stone-200 rounded-xl leading-relaxed text-slate-800 font-medium text-sm sm:text-base min-h-[380px] focus:outline-none focus:border-[#03C75A] transition"
                ></textarea>
              </div>

              <!-- 5. 하단 태그 입력 바 -->
              <div class="pt-2 border-t border-stone-100 space-y-2">
                <div class="flex items-center gap-2 bg-[#f8f9fa] border border-stone-200 rounded-xl px-3.5 py-2">
                  <span class="text-stone-400 font-bold">#</span>
                  <input
                    id="post-form-tags"
                    type="text"
                    placeholder="태그를 입력해주세요 (최대 10개, 쉼표 또는 띄어쓰기로 구분)"
                    class="flex-1 bg-transparent border-0 text-xs text-slate-800 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                <div class="flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500">
                  <span class="font-extrabold text-stone-400">추천:</span>
                  <button type="button" onclick="app.appendTagToForm('이유식')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#이유식</button>
                  <button type="button" onclick="app.appendTagToForm('수면교육')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#수면교육</button>
                  <button type="button" onclick="app.appendTagToForm('어린이집적응')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#어린이집적응</button>
                  <button type="button" onclick="app.appendTagToForm('워킹맘')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#워킹맘</button>
                  <button type="button" onclick="app.appendTagToForm('초등입학')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#초등입학</button>
                  <button type="button" onclick="app.appendTagToForm('내돈내산')" class="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-slate-600 transition">#내돈내산</button>
                </div>
              </div>

              <!-- 하단 등록 및 취소 버튼 -->
              <div class="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onclick="app.switchMainView('board')"
                  class="px-4 py-2 rounded-lg border border-stone-200 text-slate-600 hover:bg-stone-50 font-bold transition cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="button"
                  onclick="app.submitNewPost(event)"
                  class="px-6 py-2.5 rounded-lg bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-sm shadow-sm transition cursor-pointer"
                >
                  등록하기
                </button>
              </div>
            </div>

            <!-- 우측: 공개 설정 & 옵션 사이드바 (네이버 카페 글쓰기 사이드바) -->
            <div class="lg:col-span-3 space-y-4">
              <!-- 1. 공개 설정 카드 -->
              <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs p-4 sm:p-5 space-y-3 text-xs">
                <div class="font-black text-slate-900 border-b border-stone-100 pb-2 flex items-center gap-1.5">
                  <i class="fa-solid fa-lock text-slate-400"></i>
                  <span>공개 설정</span>
                </div>
                <div class="space-y-2 text-slate-700 font-medium">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="post-visibility" value="member" checked class="accent-[#03C75A]" />
                    <span>ㄴ 멤버공개</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="post-visibility" value="all" class="accent-[#03C75A]" />
                    <span>ㄴ 전체공개</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer pt-1 border-t border-stone-100 text-slate-600">
                    <input type="checkbox" id="post-allow-search" checked class="rounded accent-[#03C75A]" />
                    <span>ㄴ 검색·도담 서비스 공개</span>
                  </label>
                </div>
              </div>

              <!-- 2. 권한 설정 카드 -->
              <div class="bg-white rounded-2xl border border-stone-200 shadow-2xs p-4 sm:p-5 space-y-3 text-xs">
                <div class="font-black text-slate-900 border-b border-stone-100 pb-2 flex items-center gap-1.5">
                  <i class="fa-solid fa-shield-halved text-slate-400"></i>
                  <span>게시글 옵션</span>
                </div>
                <div class="space-y-2.5 text-slate-700 font-medium">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="post-allow-scrap" checked class="rounded accent-[#03C75A]" />
                    <span>카페·블로그 스크랩 허용</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="post-allow-copy" checked class="rounded accent-[#03C75A]" />
                    <span>복사·저장 허용</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="post-allow-source" checked class="rounded accent-[#03C75A]" />
                    <span>자동출처 사용</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="post-allow-comments" checked class="rounded accent-[#03C75A]" />
                    <span>댓글 작성 허용</span>
                  </label>
                </div>
              </div>

              <!-- 3. 작성자 카드 -->
              <div class="bg-stone-50 rounded-2xl border border-stone-200 p-4 text-xs space-y-2">
                <div class="font-extrabold text-slate-500">작성자 정보</div>
                <div class="flex items-center gap-2.5">
                  <div id="write-author-avatar" class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">도</div>
                  <div class="min-w-0">
                    <div id="write-author-name" class="font-black text-slate-900 truncate">도담맘</div>
                    <div id="write-author-badge" class="text-[10px] text-slate-400">육아맘</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>"""

# Insert #view-write right after #view-board
html = html[:board_end] + view_write_html + html[board_end:]

# 2. Remove the old popup modal #write-post-modal if present
modal_start = html.find('<!-- ==========================================\n       MODAL 1: 네이버 스마트에디터형 카페 글쓰기 모달')
if modal_start != -1:
    modal_end = html.find('<!-- ==========================================\n       MODAL 2:', modal_start)
    if modal_end != -1:
        html = html[:modal_start] + html[modal_end:]
        print("Removed old popup #write-post-modal")

# Replace any openWritePostModal() with openWritePage()
html = html.replace('app.openWritePostModal()', "app.openWritePage()")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully updated index.html with full-page write section #view-write!")
