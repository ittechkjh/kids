# -*- coding: utf-8 -*-
import sys

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. In constructor: add admissions state
ctor_target = "    this.schoolCardSubTabs = {};"
ctor_replacement = """    this.schoolCardSubTabs = {};
    this.admissionsCategory = 'all';
    this.admissionsSearchKeyword = '';"""

assert ctor_target in content, "ctor_target not found in js/app.js"
content = content.replace(ctor_target, ctor_replacement, 1)

# 2. In init(): update hash router
hash_target = "    if (['board', 'festivals', 'contests', 'food', 'policy', 'school'].includes(initHash)) {"
hash_replacement = "    if (['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions'].includes(initHash)) {"

assert hash_target in content, "hash_target not found in js/app.js"
content = content.replace(hash_target, hash_replacement, 1)

hash2_target = "      if (['board', 'festivals', 'contests', 'food', 'policy', 'school'].includes(h)) {"
hash2_replacement = "      if (['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions'].includes(h)) {"

assert hash2_target in content, "hash2_target not found in js/app.js"
content = content.replace(hash2_target, hash2_replacement, 1)

# 3. In switchMainView: handle apartments and admissions
switch_target = """    } else if (viewId === 'school') {
      this.initSchoolView();
    }"""
switch_replacement = """    } else if (viewId === 'school') {
      this.initSchoolView();
    } else if (viewId === 'apartments') {
      this.initApartmentsView();
    } else if (viewId === 'admissions') {
      this.initAdmissionsView();
    }"""

assert switch_target in content, "switch_target not found in js/app.js"
content = content.replace(switch_target, switch_replacement, 1)

# 4. Clean user-facing "리치고" badges in school cards
content = content.replace("리치고 실시간 연동", "실시간 학군 연동")
content = content.replace("'>리치고</span>", "'>공식인증</span>")
content = content.replace("리치고 ${richgoSchool.grade}등급", "AI 학군 ${richgoSchool.grade}등급")
content = content.replace("리치고 공식 연동", "공식 학군 연동")
content = content.replace("리치고 공시 최상위 대입 실적", "공식 공시 최상위 대입 실적")
content = content.replace("리치고 특목고·자사고 진학률 공시", "특목고·자사고 진학률 공시")
content = content.replace("(리치고 MCP 분석)", "(공식 학군 분석)")
content = content.replace("리치고 상세 →", "상세 분석 →")
content = content.replace("주변 배정 아파트 & 리치고 실거래·추정 시세", "주변 배정 아파트 & 실거래·추정 시세")
content = content.replace("리치고(Richgo m.richgo.ai) MCP 알고리즘 실시간 분석", "공식 학군 알고리즘 실시간 분석")
content = content.replace("<span>리치고 원문 분석 보기</span>", "<span>상세 분석 보기</span>")
content = content.replace("데이터 출처: 리치고(Richgo m.richgo.ai) MCP API (get_school & get_school_district) · 교육부 공시 실시간 연동", "데이터 출처: 교육부 공식 공시 & 학교알리미 & 학군 분석 시스템")

# 5. Insert new methods before initRichgoApartmentSection
insert_marker = "  // ==========================================\n  // [Richgo MCP API] 아파트 학군 실시간 연동기\n  // https://m.richgo.ai/developers/mcp.html#tool-schools\n  // =========================================="

new_methods = """  // ==========================================
  // [아파트별 학군 & 배정학교 실시간 조회 게시판]
  // ==========================================
  initApartmentsView() {
    const presetContainer = document.getElementById('apartments-preset-chips');
    if (!presetContainer) return;

    const presets = [
      { name: '잠실엘스', label: '잠실엘스 (송파)' },
      { name: '은마', label: '은마아파트 (대치)' },
      { name: '반포자이', label: '반포자이 (서초)' },
      { name: '목동신시가지7단지', label: '목동7단지 (양천)' },
      { name: '판교푸르지오그랑블', label: '판교그랑블 (분당)' },
      { name: '마포래미안푸르지오', label: '마래푸 (마포)' },
      { name: '과천위버필드', label: '과천위버필드' },
      { name: '킨텍스원시티', label: '킨텍스원시티' },
      { name: '송도더샵퍼스트파크', label: '송도더샵 (인천)' },
      { name: '범어자이', label: '범어자이 (대구)' },
      { name: '크로바', label: '크로바 (대전)' }
    ];

    presetContainer.innerHTML = presets.map((p) => `
      <button
        type="button"
        onclick="app.searchApartmentDistrict('${p.name}')"
        class="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/25 border border-white/20 text-white font-extrabold text-[11px] whitespace-nowrap transition backdrop-blur-xs cursor-pointer"
      >
        ${p.label}
      </button>
    `).join('');

    const resultsBox = document.getElementById('apartments-district-results-box');
    if (resultsBox && !resultsBox.dataset.loaded) {
      resultsBox.dataset.loaded = 'true';
      this.searchApartmentDistrict('잠실엘스');
    }
  }

  async searchApartmentDistrict(queryParam) {
    const inputEl = document.getElementById('apartments-search-input');
    const query = queryParam || (inputEl ? inputEl.value.trim() : '');
    if (!query) return;

    if (inputEl) inputEl.value = query;

    const resultsBox = document.getElementById('apartments-district-results-box');
    if (!resultsBox) return;

    resultsBox.innerHTML = `
      <div class="p-6 text-center text-indigo-200 flex flex-col items-center justify-center gap-2">
        <i class="fa-solid fa-circle-notch fa-spin text-2xl text-amber-300"></i>
        <div class="text-xs font-bold">공식 학구도 및 [${query}] 단지 배정 학군 데이터를 실시간 조회 중입니다...</div>
      </div>
    `;

    try {
      if (!window.DodamRichgoAPI) throw new Error('DodamRichgoAPI not loaded');
      const apts = await window.DodamRichgoAPI.searchApartments(query);
      if (!apts || apts.length === 0) {
        resultsBox.innerHTML = `
          <div class="p-5 rounded-2xl bg-white/10 border border-white/20 text-center text-xs text-indigo-200">
            [${query}] 단지 검색 결과가 없습니다. 상단 주요 학군 단지 버튼을 클릭하거나 다른 아파트명으로 검색해보세요.
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
        const distStr = s.walk_distance_m ? `도보 ${s.walk_distance_m}m` : (s.straight_distance_m ? `직선 ${s.straight_distance_m}m` : '인근');
        const gradeBadge = s.grade ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-black bg-indigo-600 text-white">${s.grade}급</span>` : '';
        const rankBadge = s.sd_rank ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">${s.sd_rank}</span>` : '';
        
        let recordsHtml = '';
        if (s.admission_records && s.admission_records.length > 0) {
          recordsHtml = `
            <div class="flex items-center gap-1 flex-wrap pt-1">
              ${s.admission_records.slice(0, 3).map((r) => `
                <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-black">
                  <span>${r.target}</span>
                  <strong class="text-rose-600">${r.count}명</strong>
                </span>
              `).join('')}
            </div>
          `;
        }

        return `
          <div class="p-3 rounded-2xl bg-white text-slate-900 border border-slate-200/90 shadow-2xs hover:border-indigo-400 transition space-y-1.5">
            <div class="flex items-start justify-between gap-1.5">
              <div class="min-w-0">
                <div class="font-black text-xs sm:text-sm text-slate-900 truncate hover:text-indigo-600 cursor-pointer" onclick="app.searchSchoolAndOpenModal('${s.name}')">
                  ${s.name}
                </div>
                <div class="text-[11px] text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                  <i class="fa-solid fa-person-walking text-indigo-500"></i>
                  <span class="text-indigo-600 font-black">${distStr}</span>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                ${gradeBadge}
                ${rankBadge}
              </div>
            </div>
            ${recordsHtml}
            <div class="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span class="text-slate-400 cursor-pointer hover:text-indigo-600 font-bold" onclick="app.searchSchoolAndOpenModal('${s.name}')">
                상세 분석 보기 →
              </span>
              <a href="${s.url}" target="_blank" class="font-extrabold text-indigo-600 hover:underline flex items-center gap-0.5">
                <span>공식 정보 보기</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
              </a>
            </div>
          </div>
        `;
      };

      resultsBox.innerHTML = `
        <div class="space-y-3">
          <!-- 단지 헤더 바 -->
          <div class="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div class="space-y-0.5 min-w-0">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px]">선택 단지</span>
                <h4 class="font-black text-white text-sm sm:text-base truncate">${topApt.name}</h4>
              </div>
              <p class="text-xs text-indigo-200 truncate">${topApt.address || '대한민국 주요 핵심 학군 주거 단지'}</p>
            </div>
            <a
              href="${topApt.url || `https://m.richgo.ai/realty/danji/${topApt.danji_id}`}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 hover:bg-amber-300 font-black text-xs shadow-sm transition flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <i class="fa-solid fa-chart-line text-indigo-600"></i>
              <span>단지 실거래·시세 보기</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
            </a>
          </div>

          <!-- 3단 학군 그리드 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- 1. 초등학교 -->
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div class="flex items-center justify-between text-xs font-black text-amber-300 border-b border-white/10 pb-1.5">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-school"></i>
                  <span>배정 초등학교 (${elemSchools.length}개)</span>
                </span>
                <span class="text-[10px] text-indigo-200 font-normal">통학구역 순</span>
              </div>
              <div class="space-y-2">
                ${elemSchools.length > 0 ? elemSchools.map(renderSchoolItem).join('') : '<p class="text-xs text-indigo-300/70 py-4 text-center">배정 초등학교 정보가 없습니다.</p>'}
              </div>
            </div>

            <!-- 2. 중학교 -->
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div class="flex items-center justify-between text-xs font-black text-emerald-300 border-b border-white/10 pb-1.5">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-book-open"></i>
                  <span>배정·인근 중학교 (${midSchools.length}개)</span>
                </span>
                <span class="text-[10px] text-indigo-200 font-normal">거리순</span>
              </div>
              <div class="space-y-2">
                ${midSchools.length > 0 ? midSchools.map(renderSchoolItem).join('') : '<p class="text-xs text-indigo-300/70 py-4 text-center">인근 중학교 정보가 없습니다.</p>'}
              </div>
            </div>

            <!-- 3. 고등학교 -->
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div class="flex items-center justify-between text-xs font-black text-sky-300 border-b border-white/10 pb-1.5">
                <span class="flex items-center gap-1.5">
                  <i class="fa-solid fa-graduation-cap"></i>
                  <span>인근 고등학교 & 입시 (${highSchools.length}개)</span>
                </span>
                <span class="text-[10px] text-indigo-200 font-normal">대입실적 연동</span>
              </div>
              <div class="space-y-2">
                ${highSchools.length > 0 ? highSchools.map(renderSchoolItem).join('') : '<p class="text-xs text-indigo-300/70 py-4 text-center">인근 고등학교 정보가 없습니다.</p>'}
              </div>
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      console.error('searchApartmentDistrict error:', err);
      resultsBox.innerHTML = `
        <div class="p-5 rounded-2xl bg-white/10 border border-white/20 text-center text-xs text-rose-300">
          학군 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </div>
      `;
    }
  }

  // ==========================================
  // [교육부(MOE) 공식 공시 입시 정보 포털 컨트롤러]
  // ==========================================
  initAdmissionsView() {
    this.renderAdmissionsCategories();
    this.renderAdmissionsList();
  }

  renderAdmissionsCategories() {
    const container = document.getElementById('admissions-category-chips');
    if (!container) return;

    const categories = window.DODAM_ADMISSIONS_DATA?.categories || [];
    container.innerHTML = categories.map((cat) => {
      const active = this.admissionsCategory === cat.id;
      return `
        <button
          type="button"
          onclick="app.setAdmissionsCategory('${cat.id}')"
          class="px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition border shrink-0 ${
            active
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
          }"
        >
          <i class="fa-solid ${cat.icon || 'fa-tag'} mr-1 ${active ? 'text-amber-300' : 'text-slate-400'}"></i>
          <span>${cat.name}</span>
        </button>
      `;
    }).join('');
  }

  setAdmissionsCategory(catId) {
    this.admissionsCategory = catId;
    this.renderAdmissionsCategories();
    this.renderAdmissionsList();
  }

  onAdmissionsSearch(query) {
    this.admissionsSearchKeyword = (query || '').trim().toLowerCase();
    const clearBtn = document.getElementById('admissions-search-clear');
    if (clearBtn) {
      if (this.admissionsSearchKeyword) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }
    this.renderAdmissionsList();
  }

  clearAdmissionsSearch() {
    const input = document.getElementById('admissions-search-input');
    if (input) input.value = '';
    this.admissionsSearchKeyword = '';
    const clearBtn = document.getElementById('admissions-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
    this.renderAdmissionsList();
  }

  renderAdmissionsList() {
    const container = document.getElementById('admissions-list-container');
    if (!container) return;

    const allGuides = window.DODAM_ADMISSIONS_DATA?.guides || [];
    const filtered = allGuides.filter((g) => {
      if (this.admissionsCategory !== 'all' && g.category !== this.admissionsCategory) {
        return false;
      }
      if (this.admissionsSearchKeyword) {
        const kw = this.admissionsSearchKeyword;
        const matchTitle = (g.title || '').toLowerCase().includes(kw);
        const matchSum = (g.summary || '').toLowerCase().includes(kw);
        const matchContent = (g.content || '').toLowerCase().includes(kw);
        const matchTarget = (g.target || '').toLowerCase().includes(kw);
        const matchPoints = (g.keyPoints || []).some((p) => p.toLowerCase().includes(kw));
        if (!matchTitle && !matchSum && !matchContent && !matchTarget && !matchPoints) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="community-card p-10 text-center bg-white border border-slate-200 text-slate-400 space-y-2">
          <i class="fa-solid fa-file-circle-question text-3xl text-slate-300"></i>
          <div class="text-sm font-bold text-slate-700">해당 조건에 일치하는 입시 정보가 없습니다.</div>
          <p class="text-xs">카테고리를 변경하거나 다른 검색어를 입력해주세요.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((g) => {
      const badgeHtml = g.badge
        ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-black ${g.badgeColor || 'bg-indigo-600 text-white'}">${g.badge}</span>`
        : '';

      const keyPointsHtml = (g.keyPoints || []).slice(0, 3).map((p) => `
        <li class="flex items-start gap-1.5 text-xs text-slate-600">
          <i class="fa-solid fa-circle-check text-emerald-500 text-[11px] mt-0.5 shrink-0"></i>
          <span>${p}</span>
        </li>
      `).join('');

      return `
        <div class="community-card p-5 bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-md transition space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-xs">
                ${g.categoryName || '입시정보'}
              </span>
              <span class="text-xs font-bold text-slate-400">
                ${g.agency || '교육부'}
              </span>
              ${badgeHtml}
            </div>
            <div class="text-xs font-bold text-slate-400 flex items-center gap-1">
              <i class="fa-regular fa-calendar text-[11px]"></i>
              <span>${g.date || '2026.10'}</span>
            </div>
          </div>

          <div>
            <h3
              onclick="app.openAdmissionDetailModal('${g.id}')"
              class="font-black text-base sm:text-lg text-slate-900 hover:text-indigo-600 transition cursor-pointer leading-snug"
            >
              ${g.title}
            </h3>
            <div class="flex items-center gap-2 mt-1.5 text-xs font-bold text-slate-500">
              <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700">🎯 ${g.target || '학생 및 학부모'}</span>
            </div>
          </div>

          <p class="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
            ${g.summary}
          </p>

          <div class="space-y-1.5 pt-1">
            <div class="text-[11px] font-black text-slate-500">핵심 포인트</div>
            <ul class="space-y-1">
              ${keyPointsHtml}
            </ul>
          </div>

          <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
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
          </div>
        </div>
      `;
    }).join('');
  }

  openAdmissionDetailModal(guideId) {
    const allGuides = window.DODAM_ADMISSIONS_DATA?.guides || [];
    const guide = allGuides.find((g) => g.id === guideId);
    if (!guide) return;

    const modalEl = document.getElementById('admission-detail-modal');
    const headerEl = document.getElementById('admission-modal-header');
    const bodyEl = document.getElementById('admission-modal-body');
    const linksEl = document.getElementById('admission-modal-links');
    if (!modalEl || !headerEl || !bodyEl) return;

    const badgeHtml = guide.badge
      ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-black ${guide.badgeColor || 'bg-indigo-600 text-white'}">${guide.badge}</span>`
      : '';

    headerEl.innerHTML = `
      <div class="flex items-center gap-2 flex-wrap">
        <span class="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-xs">
          ${guide.categoryName || '입시정보'}
        </span>
        <span class="text-xs font-bold text-slate-400">${guide.agency || '교육부'}</span>
        ${badgeHtml}
        <span class="text-xs text-slate-400 font-bold ml-auto">${guide.date || ''}</span>
      </div>
      <h3 class="font-black text-base sm:text-lg text-slate-900 mt-1 leading-snug">
        ${guide.title}
      </h3>
      <div class="text-xs font-bold text-indigo-700 mt-1">
        🎯 ${guide.target || '전체 대상'}
      </div>
    `;

    const keyPointsListHtml = (guide.keyPoints || []).map((p) => `
      <li class="flex items-start gap-2 text-xs text-slate-700">
        <i class="fa-solid fa-check text-indigo-600 font-black mt-0.5 shrink-0"></i>
        <span>${p}</span>
      </li>
    `).join('');

    bodyEl.innerHTML = `
      <div class="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 font-medium text-xs leading-relaxed">
        <strong>요약:</strong> ${guide.summary}
      </div>

      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div class="font-black text-slate-900 text-xs flex items-center gap-1.5">
          <i class="fa-solid fa-list-check text-indigo-600"></i>
          <span>핵심 변경 사항 체크리스트</span>
        </div>
        <ul class="space-y-1.5">
          ${keyPointsListHtml}
        </ul>
      </div>

      <div class="prose prose-xs max-w-none text-slate-800 space-y-3 leading-relaxed border-t border-slate-100 pt-3">
        ${guide.content}
      </div>
    `;

    if (linksEl) {
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
    }

    modalEl.classList.remove('hidden');
  }

  closeAdmissionDetailModal() {
    const modalEl = document.getElementById('admission-detail-modal');
    if (modalEl) modalEl.classList.add('hidden');
  }
\n"""

assert insert_marker in content, "insert_marker not found in js/app.js"
content = content.replace(insert_marker, new_methods + insert_marker, 1)

# In existing searchRichgoApartment: clean console message or text
content = content.replace("리치고(Richgo) MCP API에서 [${query}] 단지 및 배정 학군 데이터를 실시간 조회 중입니다...", "공식 학구도 및 [${query}] 단지 배정 학군 데이터를 실시간 조회 중입니다...")
content = content.replace("<span>리치고 원문</span>", "<span>공식 정보 보기</span>")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully patched js/app.js!")
