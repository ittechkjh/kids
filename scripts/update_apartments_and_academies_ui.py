# -*- coding: utf-8 -*-

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

# 1. Update preset chips in initApartmentsView
target_chip = '''        class="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/25 border border-white/20 text-white font-extrabold text-[11px] whitespace-nowrap transition backdrop-blur-xs cursor-pointer"'''
repl_chip = '''        class="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-slate-700 font-extrabold text-xs whitespace-nowrap transition cursor-pointer"'''

assert target_chip in app_code, "target_chip not found in app.js"
app_code = app_code.replace(target_chip, repl_chip, 1)

# 2. Update searchApartmentDistrict in app.js
with open('search_apartment_snippet.txt', 'r', encoding='utf-8') as f:
    old_search_block = f.read()

new_search_block = '''async searchApartmentDistrict(queryParam) {
    const inputEl = document.getElementById('apartments-search-input');
    const query = queryParam || (inputEl ? inputEl.value.trim() : '');
    if (!query) return;

    if (inputEl) inputEl.value = query;

    const resultsBox = document.getElementById('apartments-district-results-box');
    if (!resultsBox) return;

    resultsBox.innerHTML = `
      <div class="p-8 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
        <i class="fa-solid fa-circle-notch fa-spin text-2xl text-emerald-600"></i>
        <div class="text-xs font-bold text-slate-600">실시간 학군망에서 [${query}] 단지 배정학교 및 통학거리 조회 중...</div>
      </div>
    `;

    try {
      if (!window.DodamRichgoAPI) throw new Error('DodamRichgoAPI not loaded');
      const apts = await window.DodamRichgoAPI.searchApartments(query);
      if (!apts || apts.length === 0) {
        resultsBox.innerHTML = `
          <div class="p-8 rounded-2xl bg-stone-50 border border-stone-200 text-center text-xs text-slate-600 space-y-1">
            <div class="font-bold">[${query}] 검색 결과를 찾지 못했습니다.</div>
            <div class="text-slate-400">아파트명(예: 잠실엘스, 은마, 반포자이) 또는 단지명으로 다시 검색해 주세요.</div>
          </div>
        `;
        return;
      }

      const topApt = apts[0];
      const districtData = await window.DodamRichgoAPI.getSchoolDistrict(topApt.danji_id);
      const schools = districtData?.schools || [];

      const elemSchools = schools.filter((s) => s.level === 'elementary');
      const midSchools = schools.filter((s) => s.level === 'middle');
      const highSchools = schools.filter((s) => s.level === 'high');

      const renderSchoolItem = (s) => {
        const distStr = s.walk_distance_m ? `도보 ${s.walk_distance_m}m` : (s.straight_distance_m ? `직선 ${s.straight_distance_m}m` : '인접');
        const gradeBadge = s.grade ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-600 text-white shadow-2xs">${s.grade}급</span>` : '';
        const rankBadge = s.sd_rank ? `<span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-stone-100 text-slate-700 border border-stone-200">${s.sd_rank}</span>` : '';
        
        let recordsHtml = '';
        if (s.admission_records && s.admission_records.length > 0) {
          recordsHtml = `
            <div class="flex items-center gap-1.5 flex-wrap pt-1">
              ${s.admission_records.slice(0, 3).map((r) => `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-black">
                  <span>${r.target}</span>
                  <strong class="text-rose-600">${r.count}명</strong>
                </span>
              `).join('')}
            </div>
          `;
        }

        return `
          <div class="p-4 rounded-xl bg-white text-slate-900 border border-stone-200 shadow-2xs hover:border-[#03C75A] hover:shadow-xs transition space-y-2">
            <div class="flex items-start justify-between gap-1.5">
              <div class="min-w-0">
                <div class="font-black text-sm text-slate-900 truncate hover:text-[#03C75A] cursor-pointer transition" onclick="app.searchSchoolAndOpenModal('${s.name}')">
                  ${s.name}
                </div>
                <div class="text-[11px] text-slate-500 font-bold flex items-center gap-1.5 mt-1">
                  <i class="fa-solid fa-person-walking text-emerald-600"></i>
                  <span class="text-emerald-700 font-black">${distStr}</span>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                ${gradeBadge}
                ${rankBadge}
              </div>
            </div>
            ${recordsHtml}
            <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
              <span class="text-slate-500 cursor-pointer hover:text-emerald-600 font-bold flex items-center gap-1" onclick="app.searchSchoolAndOpenModal('${s.name}')">
                <span>상세 분석 보기</span>
                <i class="fa-solid fa-arrow-right text-[9px]"></i>
              </span>
              <a href="${s.url}" target="_blank" class="font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1">
                <span>공식 정보 보기</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
              </a>
            </div>
          </div>
        `;
      };

      resultsBox.innerHTML = `
        <div class="space-y-4">
          <!-- 선택 단지 정보 요약 카드 -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-stone-50 via-emerald-50/20 to-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div class="space-y-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-black text-[11px] shadow-2xs">선택 단지</span>
                <h4 class="font-black text-slate-900 text-base sm:text-lg truncate">${topApt.name}</h4>
              </div>
              <p class="text-xs text-slate-500 font-medium truncate">${topApt.address || '공식 주소지 기준 배정학교 연동'}</p>
            </div>
            <a
              href="${topApt.url || `https://m.richgo.ai/realty/danji/${topApt.danji_id}`}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-slate-800 font-black text-xs shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <i class="fa-solid fa-chart-line text-emerald-600"></i>
              <span>단지 실거래·시세 보기</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
            </a>
          </div>

          <!-- 3개 단락 그리드 (초/중/고) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- 1. 초등학교 -->
            <div class="p-3.5 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-2.5">
              <div class="flex items-center justify-between text-xs font-black text-amber-900 border-b border-stone-200/70 pb-2">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-school text-amber-600"></i>
                  <span>배정 초등학교 (${elemSchools.length}개)</span>
                </span>
                <span class="text-[10px] text-slate-400 font-bold">통학구역 순</span>
              </div>
              <div class="space-y-2.5">
                ${elemSchools.length > 0 ? elemSchools.map(renderSchoolItem).join('') : '<p class="text-xs text-slate-400 py-6 text-center font-medium">배정 초등학교 데이터가 없습니다.</p>'}
              </div>
            </div>

            <!-- 2. 중학교 -->
            <div class="p-3.5 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-2.5">
              <div class="flex items-center justify-between text-xs font-black text-sky-900 border-b border-stone-200/70 pb-2">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-book-open text-sky-600"></i>
                  <span>배정·인근 중학교 (${midSchools.length}개)</span>
                </span>
                <span class="text-[10px] text-slate-400 font-bold">거리순</span>
              </div>
              <div class="space-y-2.5">
                ${midSchools.length > 0 ? midSchools.map(renderSchoolItem).join('') : '<p class="text-xs text-slate-400 py-6 text-center font-medium">인근 중학교 데이터가 없습니다.</p>'}
              </div>
            </div>

            <!-- 3. 고등학교 -->
            <div class="p-3.5 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-2.5">
              <div class="flex items-center justify-between text-xs font-black text-indigo-900 border-b border-stone-200/70 pb-2">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-graduation-cap text-indigo-600"></i>
                  <span>인근 고등학교 & 입시 (${highSchools.length}개)</span>
                </span>
                <span class="text-[10px] text-slate-400 font-bold">대입실적 연동</span>
              </div>
              <div class="space-y-2.5">
                ${highSchools.length > 0 ? highSchools.map(renderSchoolItem).join('') : '<p class="text-xs text-slate-400 py-6 text-center font-medium">인근 고등학교 데이터가 없습니다.</p>'}
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      console.error('searchApartmentDistrict error:', err);
      resultsBox.innerHTML = `
        <div class="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center text-xs text-rose-700">
          단지 학군 정보를 불러오는 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      `;
    }
  }

  '''

assert old_search_block in app_code, "old_search_block not found in app.js"
app_code = app_code.replace(old_search_block, new_search_block, 1)

# 3. Update academy tab in generateSchoolSubTabContent
with open('academy_tab_snippet.txt', 'r', encoding='utf-8') as f:
    full_snippet = f.read()

# find if (activeTab === 'academies') { ... } in full_snippet
acad_start = full_snippet.find("if (activeTab === 'academies') {")
acad_end = full_snippet.find("if (activeTab === 'richgo') {", acad_start)
old_acad_block = full_snippet[acad_start:acad_end]

new_acad_block = '''if (activeTab === 'academies') {
      const popularBadges = (s.academies?.popularFields || [])
        .map(
          (p) => {
            const clean = p.startsWith('#') ? p : '#' + p;
            return `
              <span class="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 text-[10px] font-bold">
                ${clean}
              </span>
            `;
          }
        )
        .join('');

      return `
        <div class="space-y-2.5 pt-3 text-xs">
          <div class="p-3.5 rounded-xl bg-gradient-to-r from-indigo-50/80 via-blue-50/40 to-white border border-indigo-100 space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="font-black text-indigo-950 flex items-center gap-1.5">
                <i class="fa-solid fa-school-flag text-indigo-600"></i>
                <span>배후 학원가 지형 및 공공데이터 통계</span>
              </div>
              <span class="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black">
                ${s.academies?.academyCount || '공공데이터 등록 학원가'}
              </span>
            </div>
            <div class="space-y-1.5 text-[11px]">
              <div class="flex items-start gap-1.5">
                <span class="font-extrabold text-slate-700 shrink-0">📍 핵심 학원가:</span>
                <span class="text-slate-900 font-bold">${s.academies?.mainDistrict || '인근 중심가 학원 밀집'}</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="font-extrabold text-slate-700 shrink-0">🚶 거리 및 셔틀:</span>
                <span class="text-slate-900 font-bold">${s.academies?.distanceDetail || s.academies?.distanceDaechi || '도보 및 셔틀 통원권'}</span>
              </div>
              ${s.academies?.topInstitutes ? `
              <div class="flex items-start gap-1.5 pt-1 border-t border-indigo-100/70">
                <span class="font-extrabold text-slate-700 shrink-0">🏢 대표 인기 학원:</span>
                <span class="text-indigo-900 font-bold">${s.academies.topInstitutes}</span>
              </div>` : ''}
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-[10px] font-extrabold text-slate-400 px-1">주요 집중 교습 과목 및 선호 분야</div>
            <div class="flex flex-wrap gap-1">
              ${popularBadges}
            </div>
          </div>
        </div>
      `;
    }

    '''

assert old_acad_block in app_code, "old_acad_block not found in app.js"
app_code = app_code.replace(old_acad_block, new_acad_block, 1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("Successfully updated js/app.js for apartments design and academies UI!")
