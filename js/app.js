// 도담톡 (DodamTalk) - 전국 육아 커뮤니티 플랫폼 컨트롤러
// 4대 핵심 기둥:
// 1) 💬 도담 육아 게시판
// 2) 🎪 전국 지역행사 & 볼거리 (축제, 가족 마라톤, 빛축제, 공원생태)
// 3) 🏆 전국 대회일정 (공부, 사생대회, 백일장, 독서토론·골든벨, 창의발명, 코딩, 수학)
// 4) 🍽️ 전국 안심 맛집 맵 (5,000곳 포털 평점 & 바로가기)

const NATIONWIDE_REGIONS = [
  { id: 'all', name: '전국 전체', group: 'all' },
  { id: 'seoul', name: '서울', group: 'capital' },
  { id: 'gyeonggi', name: '경기', group: 'capital' },
  { id: 'incheon', name: '인천', group: 'capital' },
  { id: 'busan', name: '부산', group: 'yeongnam' },
  { id: 'daegu', name: '대구', group: 'yeongnam' },
  { id: 'ulsan', name: '울산', group: 'yeongnam' },
  { id: 'gyeongnam', name: '경남', group: 'yeongnam' },
  { id: 'gyeongbuk', name: '경북', group: 'yeongnam' },
  { id: 'gwangju', name: '광주', group: 'honam' },
  { id: 'jeonnam', name: '전남', group: 'honam' },
  { id: 'jeonbuk', name: '전북', group: 'honam' },
  { id: 'daejeon', name: '대전', group: 'chungcheong' },
  { id: 'sejong', name: '세종', group: 'chungcheong' },
  { id: 'chungnam', name: '충남', group: 'chungcheong' },
  { id: 'chungbuk', name: '충북', group: 'chungcheong' },
  { id: 'gangwon', name: '강원', group: 'gangwon_jeju' },
  { id: 'jeju', name: '제주', group: 'gangwon_jeju' }
];

const REGION_GROUPS = {
  all: null,
  capital: ['seoul', 'gyeonggi', 'incheon'],
  yeongnam: ['busan', 'daegu', 'ulsan', 'gyeongnam', 'gyeongbuk'],
  honam: ['gwangju', 'jeonnam', 'jeonbuk'],
  chungcheong: ['daejeon', 'sejong', 'chungnam', 'chungbuk'],
  gangwon_jeju: ['gangwon', 'jeju']
};

const FESTIVALS_CATEGORIES = [
  { id: 'all', name: '전체', icon: '🌐' },
  { id: 'festival_culture', name: '지역 종합축제', icon: '🎪' },
  { id: 'expo_science', name: '박물관·과학·전시', icon: '🏛️' },
  { id: 'festival_season', name: '꽃·단풍·계절축제', icon: '🌸' },
  { id: 'park_eco', name: '숲·공원 생태체험', icon: '🌿' },
  { id: 'festival_light', name: '빛·야경·드론쇼', icon: '✨' },
  { id: 'festival_performance', name: '공연·음악·인형극', icon: '🎭' },
  { id: 'festival_tradition', name: '전통·역사문화', icon: '🎎' },
  { id: 'festival_food', name: '미식·먹거리축제', icon: '🍱' },
  { id: 'farm_harvest', name: '수확·농촌체험', icon: '🍎' },
  { id: 'sports_marathon', name: '가족마라톤·걷기', icon: '🏃' }
];

const CONTESTS_CATEGORIES = [
  { id: 'all', name: '전체', icon: '🌐' },
  { id: 'contest_art', name: '사생대회·미술공모', icon: '🎨' },
  { id: 'contest_coding', name: 'AI·코딩·SW대회', icon: '💻' },
  { id: 'contest_writing', name: '전국 백일장·글짓기', icon: '📚' },
  { id: 'contest_stem', name: '과학탐구·창의발명', icon: '💡' },
  { id: 'contest_music', name: '동요·음악경연', icon: '🎵' },
  { id: 'contest_reading', name: '독서토론·골든벨', icon: '📖' },
  { id: 'contest_robot', name: '로봇·메이커올림피아드', icon: '🤖' },
  { id: 'contest_english', name: '영어·스피치대회', icon: '🗣️' },
  { id: 'contest_math', name: '창의수학·올림피아드', icon: '📐' },
  { id: 'contest_general', name: '종합 아이디어공모', icon: '🏆' }
];

class DodamCommunityApp {
  constructor() {
    this.data = window.DODAM_COMMUNITY_DATA || { categories: [], regions: [], polls: [], posts: [] };

    // 1. Navigation & Board State
    this.currentView = 'board'; // 'board' | 'festivals' | 'contests' | 'food'
    this.currentCategory = 'all';
    this.currentRegion = 'all';
    this.boardSearchKeyword = '';
    this.boardSort = 'latest'; // 'latest' | 'popular' | 'comments' | 'views'
    this.boardViewMode = 'cafe'; // 'cafe' | 'card' (네이버 카페 목록형 기본)
    this.boardPage = 1;
    this.boardPageSize = 15;
    this.activePollIndex = 0;
    this.activePostDetailId = null;

    // 2. Nationwide Events Data
    this.allEvents = window.DODAM_NATIONWIDE_EVENTS || [];
    this.eventsMetadata = window.DODAM_EVENTS_METADATA || {};

    // 3. Festivals State (전국 지역행사 & 볼거리)
    this.festivalsViewMode = 'list'; // 'list' | 'calendar'
    this.festivalsCategory = 'all';
    this.festivalsRegion = 'all';
    this.festivalsRegionGroup = 'all';
    this.festivalsStatus = 'all';
    this.festivalsSearchKeyword = '';
    this.festivalsCalendarYear = 2026;
    this.festivalsCalendarMonth = 11;
    this.selectedFestivalsDate = null;
    this.festivalsPage = 1;
    this.festivalsPageSize = 12;
    this.festivalsSort = 'closing'; // 'closing' | 'latest' | 'startDate'

    // 4. Contests State (전국 대회일정: 공부/사생/독서토론)
    this.contestsViewMode = 'list'; // 'list' | 'calendar'
    this.contestsCategory = 'all';
    this.contestsRegion = 'all';
    this.contestsRegionGroup = 'all';
    this.contestsStatus = 'all';
    this.contestsSearchKeyword = '';
    this.contestsCalendarYear = 2026;
    this.contestsCalendarMonth = 11;
    this.selectedContestsDate = null;
    this.contestsPage = 1;
    this.contestsPageSize = 12;
    this.contestsSort = 'closing'; // 'closing' | 'latest' | 'startDate'

    // Active detail modal
    this.activeEventDetailId = null;

    // Storage Keys
    this.profileKey = 'dodam_profile_v1';
    this.scrapsKey = 'dodam_scraps_v1';
    this.customPostsKey = 'dodam_custom_posts_v1';
    this.customRestaurantsKey = 'dodam_custom_restaurants_v1';

    // Food Map State
    this.foodMap = null;
    this.foodMarkersLayer = null;
    this.foodMarkersMap = {};
    this.userLocation = null;
    this.userBeaconMarker = null;
    this.foodPageSize = 15;
    this.foodCurrentPage = 1;

    // Initialize User Data
        // 5. Policy & Subsidies State (육아 정책·지원금)
    this.policyCategory = 'all';
    this.policyRegion = 'all';
    this.policyAgeGroup = 'all';
    this.policySearchKeyword = '';
    this.expandedPolicyIds = new Set();
    this.expandedFaqIndexes = new Set([0]);
    this.calcChildrenCount = 2;
    this.calcYoungestAge = '0';
    this.calcRegion = 'all';
    // 6. Schools & Admissions State (리치고 학군 순위 & 입시 데이터)
    this.schoolLevel = 'elementary';
    this.schoolSido = 'all';
    this.schoolRegion = 'all';
    this.schoolType = 'all';
    this.schoolSearchKeyword = '';
    this.schoolViewMode = 'table';
    this.sigunguTableExpanded = false;
    this.activeModalSchoolId = null;
    this.modalSubTab = 'nearby';
    this.expandedSchoolIds = new Set();
    this.schoolCardSubTabs = {};
    this.schoolPage = 1;
    this.schoolPageSize = 25;

    this.profile = this.loadProfile();
    this.scraps = this.loadScraps();
    this.loadSavedPosts();
  }

  init() {
    this.renderProfileWidget();
    this.renderBoardCategories();
    this.renderActivePoll();
    this.renderBoardView();

    // 지역행사 & 대회일정 지역 선택기 및 뷰 초기화
    this.renderFestivalsRegionChips();
    this.renderFestivalsCategoryChips();
    this.renderFestivalsView();

    this.renderContestsRegionChips();
    this.renderContestsCategoryChips();
    this.renderContestsView();

    this.renderSidebarWidgets();
    this.renderFoodView();
    this.initPolicyView();
    this.initSchoolView();
    this.updateScrapBadge();
    this.renderUpdateBadges();
    this.initFirebaseSync();
    // URL Hash Routing Support (#board, #festivals, #contests, #food, #policy)
    const initHash = (window.location.hash || '').replace('#', '');
    if (['board', 'festivals', 'contests', 'food', 'policy', 'school'].includes(initHash)) {
      this.switchMainView(initHash);
    }
    window.addEventListener('hashchange', () => {
      const h = (window.location.hash || '').replace('#', '');
      if (['board', 'festivals', 'contests', 'food', 'policy', 'school'].includes(h)) {
        this.switchMainView(h);
      }
    });
  }

  renderUpdateBadges() {
    const rawDate = this.eventsMetadata?.lastUpdated || '2026-10-28';
    const formatted = rawDate.replace(/-/g, '.');

    document.querySelectorAll('.last-updated-text').forEach((el) => {
      el.textContent = formatted;
    });

    const fStatDate = document.getElementById('fest-stat-date');
    if (fStatDate) fStatDate.textContent = formatted;
    const fStatToday = document.getElementById('fest-stat-today');
    if (fStatToday) fStatToday.textContent = '233';
    const fStatTotal = document.getElementById('fest-stat-total');
    if (fStatTotal) {
      const fCount = (this.allEvents || []).filter((e) => e.boardType === 'festivals').length || 1829;
      fStatTotal.textContent = fCount.toLocaleString();
    }

    const cStatDate = document.getElementById('cont-stat-date');
    if (cStatDate) cStatDate.textContent = formatted;
    const cStatToday = document.getElementById('cont-stat-today');
    if (cStatToday) cStatToday.textContent = '128';
    const cStatTotal = document.getElementById('cont-stat-total');
    if (cStatTotal) {
      const cCount = (this.allEvents || []).filter((e) => e.boardType === 'contests').length || 1038;
      cStatTotal.textContent = cCount.toLocaleString();
    }

    const crawlStatDate = document.getElementById('crawl-stat-date');
    if (crawlStatDate) crawlStatDate.textContent = formatted;

    const pStatDate = document.getElementById('policy-stat-date');
    if (pStatDate) pStatDate.textContent = formatted;
    const pStatToday = document.getElementById('policy-stat-today');
    if (pStatToday) pStatToday.textContent = '18';
    const pStatTotal = document.getElementById('policy-stat-total');
    if (pStatTotal) {
      const pCount = window.DODAM_POLICIES_DATA?.policies?.length || 20;
      pStatTotal.textContent = pCount.toLocaleString();
    }

    const sStatDate = document.getElementById('school-stat-date');
    if (sStatDate) sStatDate.textContent = formatted;
    const sStatToday = document.getElementById('school-stat-today');
    if (sStatToday) sStatToday.textContent = '24';
    const sStatTotal = document.getElementById('school-stat-total');
    if (sStatTotal) {
      const sCount = (window.DODAM_SCHOOLS_DATA?.schools?.length || 18) + (window.DODAM_SCHOOLS_DATA?.districts?.length || 7) + (window.DODAM_SCHOOLS_DATA?.admissions?.length || 4);
      sStatTotal.textContent = sCount.toLocaleString();
    }
  }

  // ==========================================
  // [Firebase] Cloud Firestore 실시간 동기화
  // ==========================================
  initFirebaseSync() {
    if (typeof window.DodamFirebase === 'undefined') return;

    // 1. 커뮤니티 게시글 실시간 구독
    window.DodamFirebase.subscribePosts((remotePosts) => {
      if (Array.isArray(remotePosts) && remotePosts.length > 0) {
        const remoteMap = new Map();
        remotePosts.forEach((p) => remoteMap.set(p.id, p));

        const merged = [...remotePosts];
        (this.data.posts || []).forEach((p) => {
          if (!remoteMap.has(p.id)) {
            merged.push(p);
          }
        });
        this.data.posts = merged;

        if (this.currentView === 'board') {
          this.renderBoardView();
        }
        if (this.activePostDetailId && remoteMap.has(this.activePostDetailId)) {
          const updatedPost = remoteMap.get(this.activePostDetailId);
          const likesEl = document.getElementById('post-detail-likes-count');
          if (likesEl) {
            const totalLikes =
              (updatedPost.reactions?.like || 0) +
              (updatedPost.reactions?.hug || 0) +
              (updatedPost.reactions?.tip || 0);
            likesEl.textContent = totalLikes;
          }
          this.renderPostDetailComments(updatedPost);
        }
      }
    });


  }

  // ==========================================
  // 1. 내 프로필 & 출석체크 관리
  // ==========================================
  loadProfile() {
    try {
      const raw = localStorage.getItem(this.profileKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      nickname: '판교도담맘',
      babyName: '도담이',
      ageBadge: '11개월 아기',
      region: '분당·판교',
      points: 450,
      level: 'Lv.4 열정맘',
      checkedInToday: false
    };
  }

  saveProfileData() {
    localStorage.setItem(this.profileKey, JSON.stringify(this.profile));
  }

  renderProfileWidget() {
    const el = document.getElementById('my-profile-widget');
    if (!el) return;

    el.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl coral-badge-gradient text-white flex items-center justify-center font-black text-lg shadow-sm">
          ${this.profile.nickname.slice(0, 1)}
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-black text-sm text-slate-900">${this.profile.nickname}</span>
            <span class="px-2 py-0.2 rounded-full bg-rose-50 text-rose-600 text-[10px] font-extrabold border border-rose-200">${this.profile.level}</span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">👶 ${this.profile.babyName} (${this.profile.ageBadge}) · ${this.profile.region}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 pt-2 text-center bg-stone-50 rounded-2xl p-2.5 border border-stone-200/60">
        <div>
          <div class="text-[10px] text-slate-400 font-bold">육아 포인트</div>
          <div class="text-xs font-black text-rose-600">${this.profile.points.toLocaleString()} P</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 font-bold">스크랩</div>
          <div class="text-xs font-black text-slate-800">${this.scraps.length}개</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 font-bold">활동 게시글</div>
          <div class="text-xs font-black text-indigo-600">${this.data.posts.length}건</div>
        </div>
      </div>
    `;

    const attBtn = document.getElementById('attendance-btn');
    if (attBtn && this.profile.checkedInToday) {
      attBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i><span>출석 완료 (+50P)</span>`;
      attBtn.className = 'py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold flex items-center justify-center gap-1.5';
    }
  }

  checkInAttendance() {
    if (this.profile.checkedInToday) {
      this.showToast('오늘은 이미 출석체크를 완료하셨어요! 내일 또 만나요 😊');
      return;
    }
    this.profile.checkedInToday = true;
    this.profile.points += 50;
    this.saveProfileData();
    this.renderProfileWidget();
    this.showToast('🎉 오늘의 육아 출석체크 완료! +50 포인트가 적립되었습니다.');
  }

  openProfileModal() {
    document.getElementById('prof-nickname').value = this.profile.nickname;
    document.getElementById('prof-babyname').value = this.profile.babyName;
    document.getElementById('prof-agebadge').value = this.profile.ageBadge;
    document.getElementById('prof-region').value = this.profile.region;
    document.getElementById('profile-modal').classList.remove('hidden');
  }

  closeProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
  }

  saveProfile(e) {
    e.preventDefault();
    this.profile.nickname = document.getElementById('prof-nickname').value.trim();
    this.profile.babyName = document.getElementById('prof-babyname').value.trim();
    this.profile.ageBadge = document.getElementById('prof-agebadge').value.trim();
    this.profile.region = document.getElementById('prof-region').value.trim();
    this.saveProfileData();
    this.renderProfileWidget();
    this.closeProfileModal();
    this.showToast('내 육아 프로필 정보가 업데이트되었습니다!');
  }

  // ==========================================
  // 2. 메인 뷰 전환 (게시판 / 지역행사 / 대회일정 / 맛집맵)
  // ==========================================
  switchMainView(viewId) {
    if (viewId === 'feed') viewId = 'board';
    if (viewId === 'events') viewId = 'festivals';
    this.currentView = viewId;

    document.querySelectorAll('.view-section').forEach((sec) => sec.classList.add('hidden'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-view-btn').forEach((btn) => {
      const active = btn.getAttribute('data-view') === viewId;
      btn.className = active
        ? 'nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition bg-slate-900 text-white shadow-sm text-center'
        : 'nav-view-btn flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition text-slate-600 hover:text-slate-900 hover:bg-stone-100 text-center';
    });

    this.renderBoardCategories();

    if (viewId === 'festivals') {
      this.renderFestivalsRegionChips();
      this.renderFestivalsCategoryChips();
      this.renderFestivalsView();
      if (this.festivalsViewMode === 'calendar') {
        this.renderFestivalsCalendar();
      }
    } else if (viewId === 'contests') {
      this.renderContestsRegionChips();
      this.renderContestsCategoryChips();
      this.renderContestsView();
      if (this.contestsViewMode === 'calendar') {
        this.renderContestsCalendar();
      }
    } else if (viewId === 'food') {
      setTimeout(() => {
        this.initFoodMap();
        if (this.foodMap) {
          this.foodMap.invalidateSize();
          this.updateFoodMapMarkers();
        }
      }, 100);
    } else if (viewId === 'policy') {
      this.initPolicyView();
    } else if (viewId === 'school') {
      this.initSchoolView();
    }
  }

  // ==========================================
  // 3. 도담 육아 게시판 컨트롤러
  // ==========================================
  renderBoardCategories() {
    const sideEl = document.getElementById('sidebar-category-list');
    const chipEl = document.getElementById('board-category-chips');

    const categories = this.data.categories || [];

    if (sideEl) {
      const catButtons = categories
        .map((c) => {
          const active = c.id === this.currentCategory && this.currentView === 'board';
          return `
            <button
              onclick="app.selectBoardCategory('${c.id}')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                active
                  ? 'bg-rose-50 text-rose-600 font-extrabold'
                  : 'text-slate-600 hover:bg-stone-50 hover:text-slate-900'
              }"
            >
              <span class="flex items-center gap-2">
                <i class="fa-solid ${c.icon} w-4 text-center ${active ? 'text-rose-500' : 'text-slate-400'}"></i>
                <span>${c.name}</span>
              </span>
              ${active ? '<i class="fa-solid fa-chevron-right text-[10px] text-rose-400"></i>' : ''}
            </button>
          `;
        })
        .join('');

      const quickLinks = `
        <div class="pt-2 mt-2 border-t border-stone-100 space-y-1">
          <button
            onclick="app.switchMainView('festivals')"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition ${
              this.currentView === 'festivals'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
            }"
          >
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-person-running ${this.currentView === 'festivals' ? 'text-white' : 'text-amber-500'}"></i>
              <span>전국 지역행사 (볼거리·축제)</span>
            </span>
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'festivals' ? 'bg-white text-amber-600' : 'bg-amber-500 text-white'} text-[9px] font-black">26건</span>
          </button>

          <button
            onclick="app.switchMainView('contests')"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition ${
              this.currentView === 'contests'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-indigo-50 text-indigo-900 border border-indigo-200/80 hover:bg-indigo-100'
            }"
          >
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-graduation-cap ${this.currentView === 'contests' ? 'text-white' : 'text-indigo-600'}"></i>
              <span>전국 대회일정 (사생·독서)</span>
            </span>
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'contests' ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'} text-[9px] font-black">21건</span>
          </button>

          <button
            onclick="app.switchMainView('food')"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition ${
              this.currentView === 'food'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-rose-50 text-rose-900 border border-rose-200/80 hover:bg-rose-100'
            }"
          >
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-utensils ${this.currentView === 'food' ? 'text-white' : 'text-rose-500'}"></i>
              <span>전국 안심 맛집 맵</span>
            </span>
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'food' ? 'bg-white text-rose-600' : 'bg-rose-500 text-white'} text-[9px] font-black">5,000곳</span>
          </button>
          <button
            onclick="app.switchMainView('policy')"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition ${
              this.currentView === 'policy'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200/80 hover:bg-emerald-100'
            }"
          >
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-hand-holding-dollar ${this.currentView === 'policy' ? 'text-white' : 'text-emerald-600'}"></i>
              <span>육아 정책·지원금 모아보기</span>
            </span>
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'policy' ? 'bg-white text-emerald-600' : 'bg-emerald-600 text-white'} text-[9px] font-black">2026</span>
          </button>

          <button
            onclick="app.switchMainView('school')"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-extrabold transition ${
              this.currentView === 'school'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-sky-50 text-sky-900 border border-sky-200/80 hover:bg-sky-100'
            }"
          >
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-school ${this.currentView === 'school' ? 'text-white' : 'text-sky-600'}"></i>
              <span>전국 학교정보 & 입시순위</span>
            </span>
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'school' ? 'bg-white text-sky-600' : 'bg-sky-600 text-white'} text-[9px] font-black">랭킹</span>
          </button>
</div>
      `;

      sideEl.innerHTML = catButtons + quickLinks;
    }

    if (chipEl) {
      chipEl.innerHTML = categories
        .map((c) => {
          const active = c.id === this.currentCategory;
          return `
            <button
              onclick="app.selectBoardCategory('${c.id}')"
              class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 font-black shadow-sm'
                  : 'bg-white text-slate-600 border-stone-200 hover:bg-stone-50'
              }"
            >
              ${c.name}
            </button>
          `;
        })
        .join('');
    }
  }

  selectBoardCategory(catId) {
    this.currentCategory = catId;
    this.boardPage = 1;
    if (this.currentView !== 'board') {
      this.switchMainView('board');
    }
    this.renderBoardCategories();
    this.renderBoardView();
  }

  onChangeRegion(regionId) {
    this.currentRegion = regionId;
    this.boardPage = 1;
    const foodRegionFilter = document.getElementById('food-region-filter');
    if (foodRegionFilter) foodRegionFilter.value = regionId;
    this.updateQuickPillState(regionId);
    this.renderBoardView();
    this.renderFoodView();
    this.updateFoodMapMarkers();
  }

  onSearchKeyword(keyword) {
    this.boardSearchKeyword = keyword.trim().toLowerCase();
    this.boardPage = 1;
    const boardInput = document.getElementById('board-search-input');
    if (boardInput) boardInput.value = keyword;
    if (this.currentView !== 'board') {
      this.switchMainView('board');
    }
    this.renderBoardView();
  }

  onBoardSearch(keyword) {
    this.boardSearchKeyword = keyword.trim().toLowerCase();
    this.boardPage = 1;
    this.renderBoardView();
  }

  setBoardSort(sortMode) {
    this.boardSort = sortMode;
    this.boardPage = 1;
    document.querySelectorAll('.board-sort-btn').forEach((btn) => {
      const active = btn.getAttribute('data-sort') === sortMode;
      btn.className = active
        ? 'board-sort-btn px-2.5 py-1 rounded-lg font-extrabold bg-slate-900 text-white'
        : 'board-sort-btn px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-800';
    });
    this.renderBoardView();
  }

  setBoardViewMode(mode) {
    this.boardViewMode = mode;
    const btnCafe = document.getElementById('btn-board-view-cafe');
    const btnCard = document.getElementById('btn-board-view-card');
    if (btnCafe && btnCard) {
      if (mode === 'cafe') {
        btnCafe.className = 'px-2.5 py-1 rounded-lg text-xs font-black transition bg-white text-slate-900 shadow-2xs flex items-center gap-1.5';
        btnCard.className = 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1.5';
      } else {
        btnCard.className = 'px-2.5 py-1 rounded-lg text-xs font-black transition bg-white text-slate-900 shadow-2xs flex items-center gap-1.5';
        btnCafe.className = 'px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1.5';
      }
    }
    this.renderBoardView();
  }

  setBoardPage(page) {
    this.boardPage = page;
    this.renderBoardView();
    const boardListEl = document.getElementById('board-posts-list');
    if (boardListEl) {
      boardListEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getPinnedNotices() {
    return [
      {
        id: 'notice-1',
        tag: '필독',
        tagColor: 'bg-rose-500 text-white',
        title: '2026 전국 초·중·고 학군 리치고 분석 순위 & 입시 로드맵 안내',
        author: '도담매니저',
        date: '2026.10.28',
        views: 12480,
        likes: 382,
        commentsCount: 42,
        content: '전국 5,000개 초등학교, 중학교, 고등학교 리치고 학군 랭킹 데이터가 업데이트되었습니다. 지역별 1위 명문학교 및 특목고 진학률, 학업성취도를 지금 바로 확인해보세요!'
      },
      {
        id: 'notice-2',
        tag: '공지',
        tagColor: 'bg-emerald-600 text-white',
        title: '도담도담 육아 커뮤니티 클린 이용 수칙 및 나눔·질문 에티켓',
        author: '운영팀',
        date: '2026.10.25',
        views: 8930,
        likes: 215,
        commentsCount: 18,
        content: '모든 부모님들이 편안하고 따뜻하게 소통할 수 있도록 상호 존중과 배려의 댓글 문화를 만들어주세요. 육아 꿀팁, 학군 정보, 체험 후기 환영합니다.'
      },
      {
        id: 'notice-3',
        tag: '안내',
        tagColor: 'bg-indigo-600 text-white',
        title: '이번 주말 아이와 가볼만한 전국 사생대회 & 백일장 일정 모아보기',
        author: '도담체험팀',
        date: '2026.10.27',
        views: 6420,
        likes: 178,
        commentsCount: 29,
        content: '가을 나들이와 함께 참여할 수 있는 전국 국립박물관, 해양안전, 불조심 포스터 등 다채로운 어린이 공모전 일정이 등록되었습니다.'
      }
    ];
  }

  openNoticeDetailModal(noticeId) {
    const notice = this.getPinnedNotices().find((n) => n.id === noticeId);
    if (!notice) return;
    const modal = document.getElementById('post-detail-modal');
    if (!modal) return;
    this.activePostDetailId = noticeId;
    notice.views = (notice.views || 1000) + 1;

    const catBadge = document.getElementById('post-detail-category-badge');
    if (catBadge) {
      catBadge.textContent = `[${notice.tag}] 공지사항`;
      catBadge.className = 'px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white';
    }

    document.getElementById('post-detail-title').textContent = notice.title;
    document.getElementById('post-detail-author').textContent = notice.author;
    document.getElementById('post-detail-author-badge').textContent = '공식 운영진';
    document.getElementById('post-detail-region').textContent = '전국';
    document.getElementById('post-detail-date').textContent = notice.date;
    document.getElementById('post-detail-views').textContent = notice.views.toLocaleString();
    document.getElementById('post-detail-content').textContent = notice.content;

    const tagsEl = document.getElementById('post-detail-tags');
    if (tagsEl) {
      tagsEl.innerHTML = `<span class="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold">#공지사항</span>
        <span class="px-2 py-0.5 rounded-lg bg-stone-100 text-slate-600 text-xs font-semibold">#필독</span>`;
    }

    document.getElementById('post-detail-likes-count').textContent = notice.likes;
    
    // Notice comment mock
    const listEl = document.getElementById('post-detail-comments-list');
    const countEl = document.getElementById('post-detail-comments-count');
    if (countEl) countEl.textContent = `댓글 ${notice.commentsCount}개`;
    if (listEl) {
      listEl.innerHTML = `
        <div class="p-3 bg-stone-50 rounded-xl text-xs text-slate-600 space-y-1">
          <div class="flex items-center justify-between font-bold text-slate-800">
            <span>도담이네맘</span>
            <span class="text-[10px] text-slate-400 font-normal">2시간 전</span>
          </div>
          <div>공지 확인했습니다! 항상 유익한 정보 감사드립니다. 👍</div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
  }

  renderBoardView() {
    const listEl = document.getElementById('board-posts-list');
    const titleEl = document.getElementById('current-board-title');
    const countEl = document.getElementById('current-board-count');
    const paginationEl = document.getElementById('board-pagination-container');
    if (!listEl) return;

    const catObj = this.data.categories.find((c) => c.id === this.currentCategory);
    if (titleEl && catObj) titleEl.textContent = catObj.name;

    let filtered = this.data.posts.filter((p) => {
      if (this.currentCategory === 'hot' && !p.isHot) return false;
      if (this.currentCategory !== 'all' && this.currentCategory !== 'hot' && p.category !== this.currentCategory) return false;
      if (this.currentRegion !== 'all' && p.region !== 'all' && p.region !== this.currentRegion) return false;
      if (this.boardSearchKeyword) {
        const matchTitle = p.title.toLowerCase().includes(this.boardSearchKeyword);
        const matchBody = p.content.toLowerCase().includes(this.boardSearchKeyword);
        const matchAuthor = (p.author?.nickname || '').toLowerCase().includes(this.boardSearchKeyword);
        const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(this.boardSearchKeyword));
        if (!matchTitle && !matchBody && !matchAuthor && !matchTags) return false;
      }
      return true;
    });

    if (this.boardSort === 'popular') {
      filtered.sort(
        (a, b) =>
          b.reactions.like + (b.reactions.hug || 0) + (b.reactions.tip || 0) -
          (a.reactions.like + (a.reactions.hug || 0) + (a.reactions.tip || 0))
      );
    } else if (this.boardSort === 'comments') {
      filtered.sort((a, b) => b.comments.length - a.comments.length);
    } else if (this.boardSort === 'views') {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    if (countEl) countEl.textContent = `${filtered.length}개의 게시글`;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="community-card p-10 text-center space-y-2">
          <div class="text-2xl">🌱</div>
          <div class="text-sm font-extrabold text-slate-700">해당 조건의 게시글이 아직 없습니다.</div>
          <p class="text-xs text-slate-400">첫 번째로 질문이나 따뜻한 육아 꿀팁을 남겨보세요!</p>
          <button onclick="app.openWritePostModal()" class="mt-2 px-4 py-2 rounded-xl coral-badge-gradient text-white text-xs font-bold">
            새 글 쓰기
          </button>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    // Paging calculation
    const totalPosts = filtered.length;
    const totalPages = Math.ceil(totalPosts / this.boardPageSize) || 1;
    if (this.boardPage > totalPages) this.boardPage = totalPages;
    if (this.boardPage < 1) this.boardPage = 1;

    const startIdx = (this.boardPage - 1) * this.boardPageSize;
    const endIdx = startIdx + this.boardPageSize;
    const pagedPosts = filtered.slice(startIdx, endIdx);

    const pinnedNotices = this.getPinnedNotices();

    if (this.boardViewMode === 'cafe') {
      // 1. Naver Cafe List Mode (네이버 카페 목록형)
      const noticeRowsHtml = (this.boardPage === 1)
        ? pinnedNotices.map((n) => `
            <!-- PC Notice Row -->
            <div onclick="app.openNoticeDetailModal('${n.id}')" class="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-rose-50/45 border-b border-rose-100 hover:bg-rose-100/60 cursor-pointer transition items-center">
              <div class="col-span-2 text-center">
                <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-black ${n.tagColor} shadow-2xs">${n.tag}</span>
              </div>
              <div class="col-span-5 flex items-center gap-1.5 min-w-0 pr-2">
                <span class="font-black text-sm text-slate-900 hover:text-rose-600 truncate transition">${n.title}</span>
                <span class="text-xs text-rose-500 font-black shrink-0">[${n.commentsCount}]</span>
              </div>
              <div class="col-span-2 text-center text-xs font-bold text-rose-700 truncate">${n.author}</div>
              <div class="col-span-1 text-center text-xs text-slate-500 font-medium">${n.date}</div>
              <div class="col-span-1 text-center text-xs text-slate-500 font-medium">${n.views.toLocaleString()}</div>
              <div class="col-span-1 text-center text-xs text-rose-500 font-bold">${n.likes}</div>
            </div>

            <!-- Mobile Notice Row (2-line Naver Cafe Style) -->
            <div onclick="app.openNoticeDetailModal('${n.id}')" class="sm:hidden px-4 py-3 bg-rose-50/45 border-b border-rose-100 hover:bg-rose-100/60 cursor-pointer transition space-y-1">
              <div class="flex items-start gap-1.5">
                <span class="px-1.5 py-0.5 rounded-md text-[10px] font-black ${n.tagColor} shrink-0 mt-0.5">${n.tag}</span>
                <span class="font-extrabold text-sm text-slate-900 leading-snug line-clamp-1 hover:text-rose-600">${n.title}</span>
                <span class="text-xs text-rose-500 font-black shrink-0 mt-0.5">[${n.commentsCount}]</span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-500 pl-1">
                <span class="font-bold text-rose-600">${n.author} · ${n.date}</span>
                <div class="flex items-center gap-2">
                  <span>조회 ${n.views.toLocaleString()}</span>
                  <span class="text-rose-500 font-bold">♥ ${n.likes}</span>
                </div>
              </div>
            </div>
          `).join('')
        : '';

      const postRowsHtml = pagedPosts.map((post) => {
        const cat = this.data.categories.find((c) => c.id === post.category);
        const catName = cat ? cat.name : '자유';
        const totalLikes = post.reactions.like + (post.reactions.hug || 0) + (post.reactions.tip || 0);
        const isScrapped = this.scraps.includes(post.id);

        return `
          <!-- PC Post Row (Naver Cafe Table Row) -->
          <div onclick="app.openPostDetailModal('${post.id}')" class="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 bg-white border-b border-stone-100 hover:bg-rose-50/30 cursor-pointer transition items-center group">
            <div class="col-span-2 text-center">
              <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-stone-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700 transition">${catName}</span>
            </div>
            <div class="col-span-5 flex items-center gap-1.5 min-w-0 pr-2">
              ${post.isHot ? '<span class="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 font-black text-[10px] border border-rose-200 shrink-0">HOT</span>' : ''}
              <span class="font-bold text-sm text-slate-800 group-hover:text-rose-600 truncate transition">${post.title}</span>
              ${post.comments.length > 0 ? `<span class="text-xs text-rose-500 font-black shrink-0">[${post.comments.length}]</span>` : ''}
            </div>
            <div class="col-span-2 flex items-center justify-center gap-1.5 text-xs text-slate-700 truncate">
              <span class="w-4 h-4 rounded-full ${post.author.avatarBg} text-[9px] flex items-center justify-center font-bold text-white shrink-0">${post.author.nickname[0]}</span>
              <span class="truncate font-semibold">${post.author.nickname}</span>
            </div>
            <div class="col-span-1 text-center text-xs text-slate-400 font-medium">${post.createdAt}</div>
            <div class="col-span-1 text-center text-xs text-slate-500 font-medium">${post.views || 120}</div>
            <div class="col-span-1 text-center text-xs text-rose-500 font-bold flex items-center justify-center gap-1">
              <i class="fa-solid fa-heart text-[10px]"></i>
              <span>${totalLikes}</span>
            </div>
          </div>

          <!-- Mobile Post Row (Naver Cafe 2-Line High Density) -->
          <div onclick="app.openPostDetailModal('${post.id}')" class="sm:hidden px-4 py-3 bg-white border-b border-stone-100 hover:bg-rose-50/30 cursor-pointer transition space-y-1.5">
            <div class="flex items-start gap-1.5">
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-slate-600 shrink-0 mt-0.5">${catName}</span>
              ${post.isHot ? '<span class="px-1 py-0.2 rounded bg-rose-50 text-rose-600 font-black text-[9px] border border-rose-200 shrink-0 mt-0.5">HOT</span>' : ''}
              <span class="font-bold text-sm text-slate-900 leading-snug line-clamp-2 hover:text-rose-600">${post.title}</span>
              ${post.comments.length > 0 ? `<span class="text-xs text-rose-500 font-black shrink-0 mt-0.5">[${post.comments.length}]</span>` : ''}
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-400 pl-1">
              <div class="flex items-center gap-1.5 text-slate-600 font-medium truncate">
                <span class="truncate">${post.author.nickname}</span>
                <span class="text-stone-300">·</span>
                <span class="text-slate-400 shrink-0">${post.createdAt}</span>
              </div>
              <div class="flex items-center gap-2.5 shrink-0">
                <span class="flex items-center gap-1 text-slate-500"><i class="fa-regular fa-eye text-[10px]"></i>${post.views || 120}</span>
                <span class="flex items-center gap-1 text-rose-500 font-bold"><i class="fa-solid fa-heart text-[10px]"></i>${totalLikes}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      listEl.innerHTML = `
        <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <!-- PC Header -->
          <div class="hidden sm:grid grid-cols-12 gap-2 px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-bold text-slate-500 select-none">
            <div class="col-span-2 text-center">말머리</div>
            <div class="col-span-5 text-left pl-2">제목</div>
            <div class="col-span-2 text-center">작성자</div>
            <div class="col-span-1 text-center">작성일</div>
            <div class="col-span-1 text-center">조회</div>
            <div class="col-span-1 text-center">좋아요</div>
          </div>

          <!-- Pinned Notice Rows -->
          ${noticeRowsHtml}

          <!-- Normal Posts Rows -->
          <div>
            ${postRowsHtml}
          </div>
        </div>
      `;
    } else {
      // 2. Card Feed Mode (피드 카드형 보기)
      listEl.innerHTML = `
        <div class="space-y-3">
          ${pagedPosts
            .map((post) => {
              const cat = this.data.categories.find((c) => c.id === post.category);
              const isScrapped = this.scraps.includes(post.id);
              const totalLikes = post.reactions.like + (post.reactions.hug || 0) + (post.reactions.tip || 0);

              return `
                <article
                  onclick="app.openPostDetailModal('${post.id}')"
                  class="community-card p-5 space-y-3 cursor-pointer hover:border-rose-300 hover:shadow-md transition"
                >
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5">
                      <div class="w-9 h-9 rounded-full ${post.author.avatarBg} flex items-center justify-center font-black text-xs">
                        ${post.author.nickname.slice(0, 1)}
                      </div>
                      <div>
                        <div class="flex items-center gap-1.5">
                          <span class="font-extrabold text-xs text-slate-900">${post.author.nickname}</span>
                          <span class="text-[10px] font-bold text-slate-400">${post.author.level}</span>
                        </div>
                        <div class="text-[11px] text-rose-500 font-bold">${post.author.childBadge} · <span class="text-slate-400 font-normal">${post.createdAt}</span></div>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5" onclick="event.stopPropagation()">
                      ${post.isHot ? '<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-extrabold text-[10px] border border-rose-200">🔥 베스트</span>' : ''}
                      <span class="px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-600 font-bold text-[11px]">${cat ? cat.name : '자유수다'}</span>
                      <button
                        onclick="app.toggleScrap('${post.id}')"
                        title="스크랩"
                        class="w-8 h-8 rounded-xl border ${
                          isScrapped ? 'bg-amber-50 border-amber-300 text-amber-500' : 'border-stone-200 text-slate-400 hover:text-slate-600'
                        } flex items-center justify-center transition"
                      >
                        <i class="fa-solid fa-bookmark text-xs"></i>
                      </button>
                    </div>
                  </div>

                  <div class="space-y-1.5">
                    <h3 class="text-base font-black text-slate-900 leading-snug hover:text-rose-600 transition flex items-center gap-1.5">
                      <span>${post.title}</span>
                      ${post.comments.length > 0 ? `<span class="text-xs text-rose-500 font-extrabold">[${post.comments.length}]</span>` : ''}
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed line-clamp-2">${post.content}</p>
                  </div>

                  ${
                    post.tags && post.tags.length > 0
                      ? `<div class="flex flex-wrap gap-1.5">
                          ${post.tags.map((t) => `<span class="px-2 py-0.5 rounded-lg bg-stone-100 text-slate-600 text-[10px] font-semibold">#${t}</span>`).join('')}
                        </div>`
                      : ''
                  }

                  <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <div class="flex items-center gap-3">
                      <span class="flex items-center gap-1 text-rose-500 font-bold">
                        <i class="fa-solid fa-heart text-[11px]"></i>
                        <span>${totalLikes}</span>
                      </span>
                      <span class="flex items-center gap-1 text-slate-600 font-bold">
                        <i class="fa-regular fa-comment text-[11px]"></i>
                        <span>${post.comments.length}</span>
                      </span>
                      <span class="flex items-center gap-1">
                        <i class="fa-regular fa-eye text-[11px]"></i>
                        <span>${post.views || 120}</span>
                      </span>
                    </div>
                    <span class="text-rose-500 font-bold hover:underline text-[11px]">
                      답글 및 토론 보기 →
                    </span>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      `;
    }

    // Render Pagination Bar
    if (paginationEl) {
      if (totalPages <= 1) {
        paginationEl.innerHTML = '';
      } else {
        const maxButtons = 5;
        let startPage = Math.max(1, this.boardPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);
        if (endPage - startPage + 1 < maxButtons) {
          startPage = Math.max(1, endPage - maxButtons + 1);
        }

        let pagesHtml = '';
        for (let p = startPage; p <= endPage; p++) {
          const isActive = p === this.boardPage;
          pagesHtml += `
            <button
              onclick="app.setBoardPage(${p})"
              class="w-8 h-8 rounded-xl text-xs font-black transition ${
                isActive
                  ? 'coral-badge-gradient text-white shadow-2xs'
                  : 'bg-white border border-stone-200 text-slate-700 hover:bg-stone-50'
              }"
            >${p}</button>
          `;
        }

        paginationEl.innerHTML = `
          <div class="inline-flex items-center justify-center gap-1.5 p-1 bg-stone-50 rounded-2xl border border-stone-200 shadow-2xs">
            <button
              onclick="app.setBoardPage(1)"
              ${this.boardPage === 1 ? 'disabled class="opacity-30 cursor-not-allowed"' : 'class="hover:bg-white text-slate-600"'}
              class="w-8 h-8 rounded-xl text-xs flex items-center justify-center transition"
              title="첫 페이지"
            >
              <i class="fa-solid fa-angles-left text-[10px]"></i>
            </button>
            <button
              onclick="app.setBoardPage(${this.boardPage - 1})"
              ${this.boardPage === 1 ? 'disabled class="opacity-30 cursor-not-allowed"' : 'class="hover:bg-white text-slate-600"'}
              class="w-8 h-8 rounded-xl text-xs flex items-center justify-center transition"
              title="이전 페이지"
            >
              <i class="fa-solid fa-chevron-left text-[10px]"></i>
            </button>
            
            <div class="flex items-center gap-1">
              ${pagesHtml}
            </div>

            <button
              onclick="app.setBoardPage(${this.boardPage + 1})"
              ${this.boardPage === totalPages ? 'disabled class="opacity-30 cursor-not-allowed"' : 'class="hover:bg-white text-slate-600"'}
              class="w-8 h-8 rounded-xl text-xs flex items-center justify-center transition"
              title="다음 페이지"
            >
              <i class="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
            <button
              onclick="app.setBoardPage(${totalPages})"
              ${this.boardPage === totalPages ? 'disabled class="opacity-30 cursor-not-allowed"' : 'class="hover:bg-white text-slate-600"'}
              class="w-8 h-8 rounded-xl text-xs flex items-center justify-center transition"
              title="마지막 페이지"
            >
              <i class="fa-solid fa-angles-right text-[10px]"></i>
            </button>
          </div>
        `;
      }
    }
  }

  openPostDetailModal(postId) {
    const post = this.data.posts.find((p) => p.id === postId);
    if (!post) return;
    this.activePostDetailId = postId;
    if (!post.views) post.views = 120;
    post.views += 1;

    const modal = document.getElementById('post-detail-modal');
    const cat = this.data.categories.find((c) => c.id === post.category);

    const catBadge = document.getElementById('post-detail-category-badge');
    if (catBadge) {
      catBadge.textContent = cat ? cat.name : '자유게시판';
      catBadge.className = 'px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-600 border border-rose-200';
    }

    document.getElementById('post-detail-title').textContent = post.title;
    document.getElementById('post-detail-author').textContent = post.author.nickname;
    document.getElementById('post-detail-author-badge').textContent = post.author.childBadge || '육아맘';
    document.getElementById('post-detail-region').textContent = post.region === 'all' ? '전국' : post.region;
    document.getElementById('post-detail-date').textContent = post.createdAt;
    document.getElementById('post-detail-views').textContent = post.views;
    document.getElementById('post-detail-content').textContent = post.content;

    const tagsEl = document.getElementById('post-detail-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (post.tags || [])
        .map((t) => `<span class="px-2 py-0.5 rounded-lg bg-stone-100 text-slate-600 text-xs font-semibold">#${t}</span>`)
        .join('');
    }

    const totalLikes = post.reactions.like + (post.reactions.hug || 0) + (post.reactions.tip || 0);
    document.getElementById('post-detail-likes-count').textContent = totalLikes;

    this.renderPostDetailComments(post);
    modal.classList.remove('hidden');
  }

  closePostDetailModal() {
    this.activePostDetailId = null;
    const modal = document.getElementById('post-detail-modal');
    if (modal) modal.classList.add('hidden');
    this.renderBoardView();
  }

  renderPostDetailComments(post) {
    const listEl = document.getElementById('post-detail-comments-list');
    const countEl = document.getElementById('post-detail-comments-count');
    if (!listEl) return;

    if (countEl) countEl.textContent = post.comments.length;

    if (post.comments.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">아직 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</div>`;
      return;
    }

    listEl.innerHTML = post.comments
      .map(
        (c) => `
        <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
          <div class="flex items-center justify-between text-xs">
            <span class="font-extrabold text-slate-800">${c.author}</span>
            <span class="text-[10px] text-slate-400">${c.createdAt}</span>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">${c.content}</p>
        </div>
      `
      )
      .join('');
  }

  reactToPostModal() {
    if (!this.activePostDetailId) return;
    const post = this.data.posts.find((p) => p.id === this.activePostDetailId);
    if (!post) return;
    post.reactions.like += 1;
    const totalLikes = post.reactions.like + (post.reactions.hug || 0) + (post.reactions.tip || 0);
    document.getElementById('post-detail-likes-count').textContent = totalLikes;
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.incrementLike(post.id);
    }
    this.showToast('공감하셨습니다! ❤️');
  }

  toggleScrapModal() {
    if (!this.activePostDetailId) return;
    this.toggleScrap(this.activePostDetailId);
  }

  submitBoardComment(e) {
    e.preventDefault();
    if (!this.activePostDetailId) return;
    const post = this.data.posts.find((p) => p.id === this.activePostDetailId);
    const input = document.getElementById('post-comment-input');
    if (!post || !input) return;

    const val = input.value.trim();
    if (!val) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: this.profile.nickname,
      content: val,
      createdAt: '방금 전'
    };
    post.comments.push(newComment);

    input.value = '';
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.addComment(post.id, newComment);
    }
    this.renderPostDetailComments(post);
    this.showToast('댓글이 등록되었습니다!');
  }

  openWritePostModal() {
    document.getElementById('write-post-modal').classList.remove('hidden');
  }

  closeWritePostModal() {
    document.getElementById('write-post-modal').classList.add('hidden');
  }

  submitNewPost(e) {
    e.preventDefault();
    const title = document.getElementById('post-form-title').value.trim();
    const content = document.getElementById('post-form-content').value.trim();
    const category = document.getElementById('post-form-category').value;
    const region = document.getElementById('post-form-region').value;
    const rawTags = document.getElementById('post-form-tags').value.trim();

    const tags = rawTags ? rawTags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category,
      region,
      title,
      content,
      author: {
        nickname: this.profile.nickname,
        level: this.profile.level,
        childBadge: `${this.profile.babyName} (${this.profile.ageBadge})`,
        avatarBg: 'coral-badge-gradient text-white'
      },
      createdAt: '방금 전',
      timestamp: Date.now(),
      views: 1,
      isHot: false,
      reactions: { like: 1, hug: 0, tip: 0 },
      tags,
      comments: []
    };

    this.data.posts.unshift(newPost);
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.createPost(newPost);
    }
    this.closeWritePostModal();
    this.renderBoardView();
    this.showToast('게시글이 성공적으로 등록되었습니다!');
  }

  saveCustomPosts() {
    const custom = this.data.posts.filter((p) => p.id.startsWith('custom-post-'));
    localStorage.setItem(this.customPostsKey, JSON.stringify(custom));
  }

  loadSavedPosts() {
    try {
      const raw = localStorage.getItem(this.customPostsKey);
      if (raw) {
        const posts = JSON.parse(raw);
        this.data.posts.unshift(...posts);
      }
    } catch {}
  }

  renderActivePoll() {
    const container = document.getElementById('active-poll-card');
    if (!container) return;

    const poll = this.data.polls[this.activePollIndex];
    if (!poll) return;
    const total = poll.totalVotes;

    container.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[11px]">${poll.tag}</span>
        <div class="flex items-center gap-2 text-xs text-slate-400 font-bold">
          <span>참여 ${total.toLocaleString()}명</span>
          <button onclick="app.nextPoll()" class="text-rose-500 hover:underline text-[11px]">다음 투표 ↻</button>
        </div>
      </div>
      <h3 class="text-sm sm:text-base font-black text-slate-900 mb-3">Q. ${poll.question}</h3>
      <div class="space-y-2">
        ${poll.options
          .map((opt, idx) => {
            const pct = Math.round((opt.votes / total) * 100);
            const isPicked = poll.userVotedIndex === idx;
            return `
              <button
                onclick="app.votePoll(${idx})"
                class="w-full text-left relative overflow-hidden rounded-xl border ${
                  isPicked ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200 bg-white hover:border-rose-200'
                } p-3 transition"
              >
                <div class="poll-bar-fill absolute left-0 top-0 bottom-0 ${
                  isPicked ? 'bg-rose-200/50' : 'bg-stone-100'
                }" style="width: ${pct}%"></div>
                <div class="relative flex items-center justify-between text-xs font-bold">
                  <span class="${isPicked ? 'text-rose-900 font-extrabold' : 'text-slate-700'}">
                    ${isPicked ? '✔ ' : ''}${opt.label}
                  </span>
                  <span class="${isPicked ? 'text-rose-600 font-black' : 'text-slate-500'}">${pct}% (${opt.votes}명)</span>
                </div>
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  }

  votePoll(optionIndex) {
    const poll = this.data.polls[this.activePollIndex];
    if (!poll) return;
    if (poll.userVotedIndex !== null) {
      poll.options[poll.userVotedIndex].votes -= 1;
      poll.totalVotes -= 1;
    }
    poll.userVotedIndex = optionIndex;
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    this.renderActivePoll();
    this.showToast('투표가 반영되었습니다!');
  }

  nextPoll() {
    this.activePollIndex = (this.activePollIndex + 1) % this.data.polls.length;
    this.renderActivePoll();
  }

  // ==========================================
  // 5. 전국 지역행사 & 볼거리 컨트롤러 (view-festivals)
  //    (노는거, 볼거리 위주: 지역축제, 가족 마라톤, 빛축제, 공원생태)
  // ==========================================
  renderFestivalsRegionChips() {
    const container = document.getElementById('festivals-region-chips');
    if (!container) return;

    const festivals = (this.allEvents || []).filter((e) => e.boardType === 'festivals');
    const group = this.festivalsRegionGroup;

    // Filter regions by active group
    const visibleRegions = NATIONWIDE_REGIONS.filter((r) => {
      if (r.id === 'all') return true;
      if (group === 'all') return true;
      return r.group === group;
    });

    container.innerHTML = visibleRegions
      .map((r) => {
        const count = r.id === 'all'
          ? festivals.length
          : festivals.filter((e) => e.region === r.id).length;
        const isActive = this.festivalsRegion === r.id;

        const activeClass = isActive
          ? 'bg-amber-500 text-white border-amber-500 font-black shadow-sm ring-2 ring-amber-300/70'
          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold';

        return `
          <button
            onclick="app.selectFestivalsRegion('${r.id}')"
            class="w-full py-1.5 px-1 rounded-xl text-[11px] sm:text-xs transition flex items-center justify-center gap-1 border text-center ${activeClass}"
            title="${r.name} (${count}개)"
          >
            <span class="truncate">${r.name === '전국 전체' ? '전국' : r.name}</span>
            <span class="text-[10px] px-1 py-0.2 rounded-full ${
              isActive ? 'bg-white/25 text-white font-black' : 'bg-slate-100 text-slate-500 font-semibold'
            }">${count}</span>
          </button>
        `;
      })
      .join('');
  }

  setFestivalsRegionGroup(grp) {
    this.festivalsRegionGroup = grp;
    document.querySelectorAll('.fest-grp-btn').forEach((btn) => {
      const active = btn.getAttribute('data-grp') === grp;
      btn.className = active
        ? 'fest-grp-btn px-2.5 py-1 rounded-lg bg-slate-900 text-white font-black whitespace-nowrap shadow-sm'
        : 'fest-grp-btn px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 whitespace-nowrap';
    });

    // If active region is not in new group, reset to all
    const validGroupRegions = REGION_GROUPS[grp];
    if (validGroupRegions && !validGroupRegions.includes(this.festivalsRegion)) {
      this.festivalsRegion = 'all';
      const sel = document.getElementById('festival-filter-region');
      if (sel) sel.value = 'all';
    }

    this.renderFestivalsRegionChips();
    this.renderFestivalsCategoryChips();
    this.renderFestivalsView();
    if (this.festivalsViewMode === 'calendar') this.renderFestivalsCalendar();
  }

  selectFestivalsRegion(regId) {
    this.festivalsRegion = regId;
    const sel = document.getElementById('festival-filter-region');
    if (sel) sel.value = regId;

    this.renderFestivalsRegionChips();
    this.renderFestivalsCategoryChips();
    this.renderFestivalsView();
    if (this.festivalsViewMode === 'calendar') this.renderFestivalsCalendar();
  }

  setFestivalsViewMode(mode) {
    this.festivalsViewMode = mode;
    const listContainer = document.getElementById('festivals-list-container');
    const calContainer = document.getElementById('festivals-calendar-container');
    const btnList = document.getElementById('btn-festivals-list-mode');
    const btnCal = document.getElementById('btn-festivals-calendar-mode');

    if (mode === 'calendar') {
      if (calContainer) calContainer.classList.remove('hidden');
      if (btnCal) btnCal.className = 'px-3.5 py-1.5 rounded-xl text-xs font-black transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
      if (btnList) btnList.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition text-slate-500 hover:text-slate-800 flex items-center gap-1.5';
      this.renderFestivalsCalendar();
    } else {
      if (calContainer) calContainer.classList.add('hidden');
      if (btnList) btnList.className = 'px-3.5 py-1.5 rounded-xl text-xs font-black transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
      if (btnCal) btnCal.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition text-slate-500 hover:text-slate-800 flex items-center gap-1.5';
    }
    this.renderFestivalsView();
  }

  renderFestivalsCategoryChips() {
    const container = document.getElementById('festivals-category-chips');
    if (!container) return;

    let festivals = (this.allEvents || []).filter((e) => e.boardType === 'festivals');
    if (this.festivalsRegion !== 'all') {
      festivals = festivals.filter((e) => e.region === this.festivalsRegion);
    }

    container.innerHTML = FESTIVALS_CATEGORIES.map((c) => {
      const count = c.id === 'all'
        ? festivals.length
        : festivals.filter((e) => e.category === c.id).length;
      const isActive = this.festivalsCategory === c.id;

      return `
        <button
          onclick="app.setFestivalsCategory('${c.id}')"
          data-cat="${c.id}"
          class="fest-cat-chip px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition flex items-center gap-1.5 border ${
            isActive
              ? 'bg-slate-900 text-white border-slate-900 font-black shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold'
          }"
        >
          <span>${c.icon} ${c.name}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-white/20 text-white font-black' : 'bg-slate-100 text-slate-500 font-semibold'
          }">${count}</span>
        </button>
      `;
    }).join('');
  }

  setFestivalsCategory(cat) {
    this.festivalsCategory = cat;
    this.renderFestivalsCategoryChips();
    this.renderFestivalsView();
    if (this.festivalsViewMode === 'calendar') this.renderFestivalsCalendar();
  }

  onFestivalsFilterChange() {
    const regEl = document.getElementById('festival-filter-region');
    const statEl = document.getElementById('festival-filter-status');
    const searchEl = document.getElementById('festival-filter-search');

    if (regEl) {
      this.festivalsRegion = regEl.value;
      this.renderFestivalsRegionChips();
    }
    if (statEl) this.festivalsStatus = statEl.value;
    if (searchEl) this.festivalsSearchKeyword = searchEl.value.trim().toLowerCase();

    this.renderFestivalsView();
    if (this.festivalsViewMode === 'calendar') this.renderFestivalsCalendar();
  }

  prevFestivalsMonth() {
    this.festivalsCalendarMonth -= 1;
    if (this.festivalsCalendarMonth < 1) {
      this.festivalsCalendarMonth = 12;
      this.festivalsCalendarYear -= 1;
    }
    this.renderFestivalsCalendar();
  }

  nextFestivalsMonth() {
    this.festivalsCalendarMonth += 1;
    if (this.festivalsCalendarMonth > 12) {
      this.festivalsCalendarMonth = 1;
      this.festivalsCalendarYear += 1;
    }
    this.renderFestivalsCalendar();
  }

  goTodayFestivals() {
    this.festivalsCalendarYear = 2026;
    this.festivalsCalendarMonth = 11;
    this.selectedFestivalsDate = null;
    const bar = document.getElementById('festivals-calendar-day-selected-bar');
    if (bar) bar.classList.add('hidden');
    this.renderFestivalsCalendar();
    this.renderFestivalsView();
  }

  selectFestivalsDate(dateStr) {
    this.selectedFestivalsDate = dateStr;
    const bar = document.getElementById('festivals-calendar-day-selected-bar');
    const barText = document.getElementById('festivals-calendar-selected-date-text');
    if (bar && barText) {
      barText.textContent = `${dateStr} 행사 필터 적용 중`;
      bar.classList.remove('hidden');
    }
    this.renderFestivalsCalendar();
    this.renderFestivalsView();
  }

  clearFestivalsDayFilter() {
    this.selectedFestivalsDate = null;
    const bar = document.getElementById('festivals-calendar-day-selected-bar');
    if (bar) bar.classList.add('hidden');
    this.renderFestivalsCalendar();
    this.renderFestivalsView();
  }

  renderFestivalsCalendar() {
    const grid = document.getElementById('festivals-calendar-grid');
    const title = document.getElementById('festivals-calendar-month-title');
    if (!grid) return;

    if (title) title.textContent = `${this.festivalsCalendarYear}년 ${this.festivalsCalendarMonth}월`;

    const firstDay = new Date(this.festivalsCalendarYear, this.festivalsCalendarMonth - 1, 1).getDay();
    const totalDays = new Date(this.festivalsCalendarYear, this.festivalsCalendarMonth, 0).getDate();
    const prevMonthTotalDays = new Date(this.festivalsCalendarYear, this.festivalsCalendarMonth - 1, 0).getDate();

    let cellsHtml = '';
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthTotalDays - i;
      cellsHtml += `<div class="min-h-[72px] sm:min-h-[88px] p-1.5 rounded-xl bg-stone-50/50 text-slate-300 text-xs font-bold border border-stone-100/60">${d}</div>`;
    }

    const festivalEvents = (this.allEvents || []).filter((e) => {
      if (e.boardType !== 'festivals') return false;
      if (this.festivalsRegion !== 'all' && e.region !== this.festivalsRegion) return false;
      return true;
    });

    for (let d = 1; d <= totalDays; d++) {
      const dayStr = `${this.festivalsCalendarYear}-${String(this.festivalsCalendarMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = this.selectedFestivalsDate === dayStr;
      const isSunday = (firstDay + d - 1) % 7 === 0;
      const isSaturday = (firstDay + d - 1) % 7 === 6;

      const dayEvents = festivalEvents.filter((evt) => {
        const inEventRange = evt.startDate && evt.endDate && dayStr >= evt.startDate && dayStr <= evt.endDate;
        const inApplyRange = evt.applyStartDate && evt.applyEndDate && dayStr >= evt.applyStartDate && dayStr <= evt.applyEndDate;
        return inEventRange || inApplyRange;
      });

      const dayColor = isSunday ? 'text-rose-600' : isSaturday ? 'text-blue-600' : 'text-slate-800';

      let eventBadgesHtml = '';
      if (dayEvents.length > 0) {
        eventBadgesHtml = dayEvents
          .slice(0, 2)
          .map((evt) => {
            let badgeBg = 'bg-amber-100 text-amber-800 border-amber-200';
            if (evt.category === 'sports_marathon') badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-200';
            if (evt.category === 'festival_light') badgeBg = 'bg-indigo-100 text-indigo-800 border-indigo-200';
            return `<div class="truncate text-[9px] sm:text-[10px] px-1 py-0.5 rounded border ${badgeBg} font-black mt-0.5" title="${evt.title}">${evt.title}</div>`;
          })
          .join('');
        if (dayEvents.length > 2) {
          eventBadgesHtml += `<div class="text-[9px] text-slate-400 font-bold mt-0.5">+${dayEvents.length - 2}개 더보기</div>`;
        }
      }

      cellsHtml += `
        <div
          onclick="app.selectFestivalsDate('${dayStr}')"
          class="min-h-[72px] sm:min-h-[88px] p-1.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
            isSelected
              ? 'bg-amber-100/70 border-amber-400 ring-2 ring-amber-300'
              : dayEvents.length > 0
              ? 'bg-white border-amber-200 hover:border-amber-400 hover:shadow-sm'
              : 'bg-white border-stone-200 hover:bg-stone-50'
          }"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-black ${dayColor}">${d}</span>
            ${dayEvents.length > 0 ? `<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>` : ''}
          </div>
          <div class="overflow-hidden flex-1">${eventBadgesHtml}</div>
        </div>
      `;
    }

    grid.innerHTML = cellsHtml;
  }

  setFestivalsSort(sortType) {
    this.festivalsSort = sortType;
    this.festivalsPage = 1;
    this.renderFestivalsView();
  }

  setFestivalsPage(page) {
    this.festivalsPage = page;
    this.renderFestivalsView();
    const el = document.getElementById('view-festivals');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderFestivalsView() {
    const listEl = document.getElementById('festivals-list-container');
    const countBadge = document.getElementById('festivals-count-badge');
    const paginationEl = document.getElementById('festivals-pagination');
    if (!listEl) return;

    let filtered = (this.allEvents || []).filter((evt) => {
      if (evt.boardType !== 'festivals') return false;

      // Category filter
      if (this.festivalsCategory !== 'all' && evt.category !== this.festivalsCategory) return false;

      // Region filter
      if (this.festivalsRegion !== 'all') {
        if (evt.region !== this.festivalsRegion) return false;
      } else if (this.festivalsRegionGroup !== 'all') {
        const allowed = REGION_GROUPS[this.festivalsRegionGroup];
        if (allowed && !allowed.includes(evt.region)) return false;
      }

      // Status filter
      if (this.festivalsStatus !== 'all' && evt.status !== this.festivalsStatus) return false;

      // Keyword search
      if (this.festivalsSearchKeyword) {
        const titleMatch = evt.title.toLowerCase().includes(this.festivalsSearchKeyword);
        const orgMatch = evt.organizer.toLowerCase().includes(this.festivalsSearchKeyword);
        const locMatch = evt.location.toLowerCase().includes(this.festivalsSearchKeyword);
        const descMatch = (evt.description || '').toLowerCase().includes(this.festivalsSearchKeyword);
        const tagMatch = (evt.tags || []).some((t) => t.toLowerCase().includes(this.festivalsSearchKeyword));
        if (!titleMatch && !orgMatch && !locMatch && !descMatch && !tagMatch) return false;
      }

      // Selected calendar date
      if (this.selectedFestivalsDate) {
        const inEventRange = evt.startDate && evt.endDate && this.selectedFestivalsDate >= evt.startDate && this.selectedFestivalsDate <= evt.endDate;
        const inApplyRange = evt.applyStartDate && evt.applyEndDate && this.selectedFestivalsDate >= evt.applyStartDate && this.selectedFestivalsDate <= evt.applyEndDate;
        if (!inEventRange && !inApplyRange) return false;
      }
      return true;
    });

    if (countBadge) countBadge.textContent = filtered.length.toLocaleString();

    // Sort
    if (this.festivalsSort === 'closing') {
      filtered.sort((a, b) => {
        if (a.status === 'applying' && b.status !== 'applying') return -1;
        if (a.status !== 'applying' && b.status === 'applying') return 1;
        return (a.applyEndDate || '').localeCompare(b.applyEndDate || '');
      });
    } else if (this.festivalsSort === 'latest') {
      filtered.sort((a, b) => (b.applyStartDate || '').localeCompare(a.applyStartDate || ''));
    } else if (this.festivalsSort === 'startDate') {
      filtered.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
    }

    // Update sort buttons active state
    ['closing', 'latest', 'startDate'].forEach((st) => {
      const btn = document.getElementById(`btn-fest-sort-${st}`);
      if (!btn) return;
      if (st === this.festivalsSort) {
        btn.className = 'w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-amber-500 text-white font-extrabold shadow-sm transition text-center text-[11px] sm:text-xs';
      } else {
        btn.className = 'w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-center text-[11px] sm:text-xs';
      }
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="col-span-full community-card p-10 text-center space-y-2">
          <div class="text-2xl">🎪</div>
          <div class="text-sm font-extrabold text-slate-700">해당 지역·조건에 맞는 지역행사나 볼거리가 없습니다.</div>
          <p class="text-xs text-slate-400">다른 지역을 선택하거나 '전국 전체'로 확인해보세요.</p>
          <button onclick="app.selectFestivalsRegion('all'); app.setFestivalsCategory('all'); app.clearFestivalsDayFilter();" class="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold">
            지역·필터 초기화
          </button>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    // Pagination slice
    const totalPages = Math.ceil(filtered.length / this.festivalsPageSize);
    if (this.festivalsPage > totalPages) this.festivalsPage = 1;
    const startIdx = (this.festivalsPage - 1) * this.festivalsPageSize;
    const pageItems = filtered.slice(startIdx, startIdx + this.festivalsPageSize);

    listEl.innerHTML = pageItems.map((evt) => this.renderEventCardHtml(evt, 'amber')).join('');

    if (paginationEl) {
      paginationEl.innerHTML = this.renderPaginationHtml(
        filtered.length,
        this.festivalsPage,
        this.festivalsPageSize,
        'setFestivalsPage',
        'amber'
      );
    }
  }

  // ==========================================
  // 6. 전국 대회일정 컨트롤러 (view-contests)
  //    (공부 위주: 사생대회, 백일장, 독서토론/골든벨, 창의발명, 코딩, 수학)
  // ==========================================
  renderContestsRegionChips() {
    const container = document.getElementById('contests-region-chips');
    if (!container) return;

    const contests = (this.allEvents || []).filter((e) => e.boardType === 'contests');
    const group = this.contestsRegionGroup;

    const visibleRegions = NATIONWIDE_REGIONS.filter((r) => {
      if (r.id === 'all') return true;
      if (group === 'all') return true;
      return r.group === group;
    });

    container.innerHTML = visibleRegions
      .map((r) => {
        const count = r.id === 'all'
          ? contests.length
          : contests.filter((e) => e.region === r.id).length;
        const isActive = this.contestsRegion === r.id;

        const activeClass = isActive
          ? 'bg-indigo-600 text-white border-indigo-600 font-black shadow-sm ring-2 ring-indigo-300/70'
          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold';

        return `
          <button
            onclick="app.selectContestsRegion('${r.id}')"
            class="w-full py-1.5 px-1 rounded-xl text-[11px] sm:text-xs transition flex items-center justify-center gap-1 border text-center ${activeClass}"
            title="${r.name} (${count}개)"
          >
            <span class="truncate">${r.name === '전국 전체' ? '전국' : r.name}</span>
            <span class="text-[10px] px-1 py-0.2 rounded-full ${
              isActive ? 'bg-white/25 text-white font-black' : 'bg-slate-100 text-slate-500 font-semibold'
            }">${count}</span>
          </button>
        `;
      })
      .join('');
  }

  setContestsRegionGroup(grp) {
    this.contestsRegionGroup = grp;
    document.querySelectorAll('.cont-grp-btn').forEach((btn) => {
      const active = btn.getAttribute('data-grp') === grp;
      btn.className = active
        ? 'cont-grp-btn px-2.5 py-1 rounded-lg bg-slate-900 text-white font-black whitespace-nowrap shadow-sm'
        : 'cont-grp-btn px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 whitespace-nowrap';
    });

    const validGroupRegions = REGION_GROUPS[grp];
    if (validGroupRegions && !validGroupRegions.includes(this.contestsRegion)) {
      this.contestsRegion = 'all';
      const sel = document.getElementById('contest-filter-region');
      if (sel) sel.value = 'all';
    }

    this.renderContestsRegionChips();
    this.renderContestsCategoryChips();
    this.renderContestsView();
    if (this.contestsViewMode === 'calendar') this.renderContestsCalendar();
  }

  selectContestsRegion(regId) {
    this.contestsRegion = regId;
    const sel = document.getElementById('contest-filter-region');
    if (sel) sel.value = regId;

    this.renderContestsRegionChips();
    this.renderContestsCategoryChips();
    this.renderContestsView();
    if (this.contestsViewMode === 'calendar') this.renderContestsCalendar();
  }

  setContestsViewMode(mode) {
    this.contestsViewMode = mode;
    const listContainer = document.getElementById('contests-list-container');
    const calContainer = document.getElementById('contests-calendar-container');
    const btnList = document.getElementById('btn-contests-list-mode');
    const btnCal = document.getElementById('btn-contests-calendar-mode');

    if (mode === 'calendar') {
      if (calContainer) calContainer.classList.remove('hidden');
      if (btnCal) btnCal.className = 'px-3.5 py-1.5 rounded-xl text-xs font-black transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
      if (btnList) btnList.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition text-slate-500 hover:text-slate-800 flex items-center gap-1.5';
      this.renderContestsCalendar();
    } else {
      if (calContainer) calContainer.classList.add('hidden');
      if (btnList) btnList.className = 'px-3.5 py-1.5 rounded-xl text-xs font-black transition bg-white text-slate-900 shadow-sm flex items-center gap-1.5';
      if (btnCal) btnCal.className = 'px-3.5 py-1.5 rounded-xl text-xs font-bold transition text-slate-500 hover:text-slate-800 flex items-center gap-1.5';
    }
    this.renderContestsView();
  }

  renderContestsCategoryChips() {
    const container = document.getElementById('contests-category-chips');
    if (!container) return;

    let contests = (this.allEvents || []).filter((e) => e.boardType === 'contests');
    if (this.contestsRegion !== 'all') {
      contests = contests.filter((e) => e.region === this.contestsRegion);
    }

    container.innerHTML = CONTESTS_CATEGORIES.map((c) => {
      const count = c.id === 'all'
        ? contests.length
        : contests.filter((e) => e.category === c.id).length;
      const isActive = this.contestsCategory === c.id;

      return `
        <button
          onclick="app.setContestsCategory('${c.id}')"
          data-cat="${c.id}"
          class="cont-cat-chip px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition flex items-center gap-1.5 border ${
            isActive
              ? 'bg-slate-900 text-white border-slate-900 font-black shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold'
          }"
        >
          <span>${c.icon} ${c.name}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-white/20 text-white font-black' : 'bg-slate-100 text-slate-500 font-semibold'
          }">${count}</span>
        </button>
      `;
    }).join('');
  }

  setContestsCategory(cat) {
    this.contestsCategory = cat;
    this.renderContestsCategoryChips();
    this.renderContestsView();
    if (this.contestsViewMode === 'calendar') this.renderContestsCalendar();
  }

  onContestsFilterChange() {
    const regEl = document.getElementById('contest-filter-region');
    const statEl = document.getElementById('contest-filter-status');
    const searchEl = document.getElementById('contest-filter-search');

    if (regEl) {
      this.contestsRegion = regEl.value;
      this.renderContestsRegionChips();
    }
    if (statEl) this.contestsStatus = statEl.value;
    if (searchEl) this.contestsSearchKeyword = searchEl.value.trim().toLowerCase();

    this.renderContestsView();
    if (this.contestsViewMode === 'calendar') this.renderContestsCalendar();
  }

  prevContestsMonth() {
    this.contestsCalendarMonth -= 1;
    if (this.contestsCalendarMonth < 1) {
      this.contestsCalendarMonth = 12;
      this.contestsCalendarYear -= 1;
    }
    this.renderContestsCalendar();
  }

  nextContestsMonth() {
    this.contestsCalendarMonth += 1;
    if (this.contestsCalendarMonth > 12) {
      this.contestsCalendarMonth = 1;
      this.contestsCalendarYear += 1;
    }
    this.renderContestsCalendar();
  }

  goTodayContests() {
    this.contestsCalendarYear = 2026;
    this.contestsCalendarMonth = 11;
    this.selectedContestsDate = null;
    const bar = document.getElementById('contests-calendar-day-selected-bar');
    if (bar) bar.classList.add('hidden');
    this.renderContestsCalendar();
    this.renderContestsView();
  }

  selectContestsDate(dateStr) {
    this.selectedContestsDate = dateStr;
    const bar = document.getElementById('contests-calendar-day-selected-bar');
    const barText = document.getElementById('contests-calendar-selected-date-text');
    if (bar && barText) {
      barText.textContent = `${dateStr} 대회 일정 필터 적용 중`;
      bar.classList.remove('hidden');
    }
    this.renderContestsCalendar();
    this.renderContestsView();
  }

  clearContestsDayFilter() {
    this.selectedContestsDate = null;
    const bar = document.getElementById('contests-calendar-day-selected-bar');
    if (bar) bar.classList.add('hidden');
    this.renderContestsCalendar();
    this.renderContestsView();
  }

  renderContestsCalendar() {
    const grid = document.getElementById('contests-calendar-grid');
    const title = document.getElementById('contests-calendar-month-title');
    if (!grid) return;

    if (title) title.textContent = `${this.contestsCalendarYear}년 ${this.contestsCalendarMonth}월`;

    const firstDay = new Date(this.contestsCalendarYear, this.contestsCalendarMonth - 1, 1).getDay();
    const totalDays = new Date(this.contestsCalendarYear, this.contestsCalendarMonth, 0).getDate();
    const prevMonthTotalDays = new Date(this.contestsCalendarYear, this.contestsCalendarMonth - 1, 0).getDate();

    let cellsHtml = '';
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthTotalDays - i;
      cellsHtml += `<div class="min-h-[72px] sm:min-h-[88px] p-1.5 rounded-xl bg-stone-50/50 text-slate-300 text-xs font-bold border border-stone-100/60">${d}</div>`;
    }

    const contestEvents = (this.allEvents || []).filter((e) => {
      if (e.boardType !== 'contests') return false;
      if (this.contestsRegion !== 'all' && e.region !== this.contestsRegion) return false;
      return true;
    });

    for (let d = 1; d <= totalDays; d++) {
      const dayStr = `${this.contestsCalendarYear}-${String(this.contestsCalendarMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = this.selectedContestsDate === dayStr;
      const isSunday = (firstDay + d - 1) % 7 === 0;
      const isSaturday = (firstDay + d - 1) % 7 === 6;

      const dayEvents = contestEvents.filter((evt) => {
        const inEventRange = evt.startDate && evt.endDate && dayStr >= evt.startDate && dayStr <= evt.endDate;
        const inApplyRange = evt.applyStartDate && evt.applyEndDate && dayStr >= evt.applyStartDate && dayStr <= evt.applyEndDate;
        return inEventRange || inApplyRange;
      });

      const dayColor = isSunday ? 'text-rose-600' : isSaturday ? 'text-blue-600' : 'text-slate-800';

      let eventBadgesHtml = '';
      if (dayEvents.length > 0) {
        eventBadgesHtml = dayEvents
          .slice(0, 2)
          .map((evt) => {
            let badgeBg = 'bg-indigo-100 text-indigo-800 border-indigo-200';
            if (evt.category === 'contest_art') badgeBg = 'bg-rose-100 text-rose-800 border-rose-200';
            if (evt.category === 'contest_reading') badgeBg = 'bg-amber-100 text-amber-800 border-amber-200';
            if (evt.category === 'contest_stem') badgeBg = 'bg-sky-100 text-sky-800 border-sky-200';
            return `<div class="truncate text-[9px] sm:text-[10px] px-1 py-0.5 rounded border ${badgeBg} font-black mt-0.5" title="${evt.title}">${evt.title}</div>`;
          })
          .join('');
        if (dayEvents.length > 2) {
          eventBadgesHtml += `<div class="text-[9px] text-slate-400 font-bold mt-0.5">+${dayEvents.length - 2}개 더보기</div>`;
        }
      }

      cellsHtml += `
        <div
          onclick="app.selectContestsDate('${dayStr}')"
          class="min-h-[72px] sm:min-h-[88px] p-1.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
            isSelected
              ? 'bg-indigo-100/70 border-indigo-400 ring-2 ring-indigo-300'
              : dayEvents.length > 0
              ? 'bg-white border-indigo-200 hover:border-indigo-400 hover:shadow-sm'
              : 'bg-white border-stone-200 hover:bg-stone-50'
          }"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-black ${dayColor}">${d}</span>
            ${dayEvents.length > 0 ? `<span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>` : ''}
          </div>
          <div class="overflow-hidden flex-1">${eventBadgesHtml}</div>
        </div>
      `;
    }

    grid.innerHTML = cellsHtml;
  }

  setContestsSort(sortType) {
    this.contestsSort = sortType;
    this.contestsPage = 1;
    this.renderContestsView();
  }

  setContestsPage(page) {
    this.contestsPage = page;
    this.renderContestsView();
    const el = document.getElementById('view-contests');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderContestsView() {
    const listEl = document.getElementById('contests-list-container');
    const countBadge = document.getElementById('contests-count-badge');
    const paginationEl = document.getElementById('contests-pagination');
    if (!listEl) return;

    let filtered = (this.allEvents || []).filter((evt) => {
      if (evt.boardType !== 'contests') return false;

      // Category filter
      if (this.contestsCategory !== 'all' && evt.category !== this.contestsCategory) return false;

      // Region filter
      if (this.contestsRegion !== 'all') {
        if (evt.region !== this.contestsRegion) return false;
      } else if (this.contestsRegionGroup !== 'all') {
        const allowed = REGION_GROUPS[this.contestsRegionGroup];
        if (allowed && !allowed.includes(evt.region)) return false;
      }

      // Status filter
      if (this.contestsStatus !== 'all' && evt.status !== this.contestsStatus) return false;

      // Keyword search
      if (this.contestsSearchKeyword) {
        const titleMatch = evt.title.toLowerCase().includes(this.contestsSearchKeyword);
        const orgMatch = evt.organizer.toLowerCase().includes(this.contestsSearchKeyword);
        const locMatch = evt.location.toLowerCase().includes(this.contestsSearchKeyword);
        const descMatch = (evt.description || '').toLowerCase().includes(this.contestsSearchKeyword);
        const tagMatch = (evt.tags || []).some((t) => t.toLowerCase().includes(this.contestsSearchKeyword));
        if (!titleMatch && !orgMatch && !locMatch && !descMatch && !tagMatch) return false;
      }

      // Selected calendar date
      if (this.selectedContestsDate) {
        const inEventRange = evt.startDate && evt.endDate && this.selectedContestsDate >= evt.startDate && this.selectedContestsDate <= evt.endDate;
        const inApplyRange = evt.applyStartDate && evt.applyEndDate && this.selectedContestsDate >= evt.applyStartDate && this.selectedContestsDate <= evt.applyEndDate;
        if (!inEventRange && !inApplyRange) return false;
      }
      return true;
    });

    if (countBadge) countBadge.textContent = filtered.length.toLocaleString();

    // Sort
    if (this.contestsSort === 'closing') {
      filtered.sort((a, b) => {
        if (a.status === 'applying' && b.status !== 'applying') return -1;
        if (a.status !== 'applying' && b.status === 'applying') return 1;
        return (a.applyEndDate || '').localeCompare(b.applyEndDate || '');
      });
    } else if (this.contestsSort === 'latest') {
      filtered.sort((a, b) => (b.applyStartDate || '').localeCompare(a.applyStartDate || ''));
    } else if (this.contestsSort === 'startDate') {
      filtered.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
    }

    // Update sort buttons active state
    ['closing', 'latest', 'startDate'].forEach((st) => {
      const btn = document.getElementById(`btn-cont-sort-${st}`);
      if (!btn) return;
      if (st === this.contestsSort) {
        btn.className = 'w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white font-extrabold shadow-sm transition text-center text-[11px] sm:text-xs';
      } else {
        btn.className = 'w-full sm:w-auto px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-center text-[11px] sm:text-xs';
      }
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="col-span-full community-card p-10 text-center space-y-2">
          <div class="text-2xl">🏆</div>
          <div class="text-sm font-extrabold text-slate-700">해당 지역·조건에 맞는 대회 일정이 없습니다.</div>
          <p class="text-xs text-slate-400">다른 지역을 선택하거나 '전국 전체'로 확인해보세요.</p>
          <button onclick="app.selectContestsRegion('all'); app.setContestsCategory('all'); app.clearContestsDayFilter();" class="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
            지역·필터 초기화
          </button>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    // Pagination slice
    const totalPages = Math.ceil(filtered.length / this.contestsPageSize);
    if (this.contestsPage > totalPages) this.contestsPage = 1;
    const startIdx = (this.contestsPage - 1) * this.contestsPageSize;
    const pageItems = filtered.slice(startIdx, startIdx + this.contestsPageSize);

    listEl.innerHTML = pageItems.map((evt) => this.renderEventCardHtml(evt, 'indigo')).join('');

    if (paginationEl) {
      paginationEl.innerHTML = this.renderPaginationHtml(
        filtered.length,
        this.contestsPage,
        this.contestsPageSize,
        'setContestsPage',
        'indigo'
      );
    }
  }

  renderPaginationHtml(totalCount, currentPage, pageSize, setPageMethodName, themeColor = 'indigo') {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (totalPages <= 1) return '';

    let html = `<div class="flex items-center gap-1.5 flex-wrap justify-center text-xs font-bold py-3">`;

    // First button
    if (currentPage > 1) {
      html += `<button onclick="app.${setPageMethodName}(1)" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition flex items-center justify-center" title="처음"><i class="fa-solid fa-angles-left text-[10px]"></i></button>`;
      html += `<button onclick="app.${setPageMethodName}(${currentPage - 1})" class="px-2.5 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center justify-center gap-1"><i class="fa-solid fa-chevron-left text-[10px]"></i><span>이전</span></button>`;
    } else {
      html += `<button disabled class="w-8 h-8 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed flex items-center justify-center"><i class="fa-solid fa-angles-left text-[10px]"></i></button>`;
      html += `<button disabled class="px-2.5 h-8 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed flex items-center justify-center gap-1"><i class="fa-solid fa-chevron-left text-[10px]"></i><span>이전</span></button>`;
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    const activeBg = themeColor === 'amber' ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white';

    for (let p = startPage; p <= endPage; p++) {
      if (p === currentPage) {
        html += `<button class="w-8 h-8 rounded-xl ${activeBg} font-black shadow-sm flex items-center justify-center">${p}</button>`;
      } else {
        html += `<button onclick="app.${setPageMethodName}(${p})" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center justify-center">${p}</button>`;
      }
    }

    // Next button
    if (currentPage < totalPages) {
      html += `<button onclick="app.${setPageMethodName}(${currentPage + 1})" class="px-2.5 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition flex items-center justify-center gap-1"><span>다음</span><i class="fa-solid fa-chevron-right text-[10px]"></i></button>`;
      html += `<button onclick="app.${setPageMethodName}(${totalPages})" class="w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition flex items-center justify-center" title="맨끝"><i class="fa-solid fa-angles-right text-[10px]"></i></button>`;
    } else {
      html += `<button disabled class="px-2.5 h-8 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed flex items-center justify-center gap-1"><span>다음</span><i class="fa-solid fa-chevron-right text-[10px]"></i></button>`;
      html += `<button disabled class="w-8 h-8 rounded-xl border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed flex items-center justify-center"><i class="fa-solid fa-angles-right text-[10px]"></i></button>`;
    }

    html += `<span class="ml-2 text-[11px] text-slate-400 font-medium">(${currentPage} / ${totalPages} 페이지)</span>`;
    html += `</div>`;
    return html;
  }

  // 공통 이벤트 카드 렌더러
  renderEventCardHtml(evt, themeColor) {
    const isContest = evt.boardType === 'contests';
    const activeColor = isContest ? 'indigo' : 'amber';
    const defaultImg = isContest
      ? 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&auto=format&fit=crop&q=80';
    const imgUrl = evt.imageUrl || defaultImg;

    let ddayBadge = '';
    if (evt.dday === '접수마감') {
      ddayBadge = '<span class="px-2 py-0.5 rounded-lg bg-stone-100 text-slate-400 text-[11px] font-bold">마감</span>';
    } else if (evt.dday && evt.dday.startsWith('D-')) {
      const num = parseInt(evt.dday.replace('D-', ''), 10);
      const isUrgent = !isNaN(num) && num <= 7;
      const bgClass = isUrgent
        ? 'bg-rose-500 text-white animate-pulse shadow-sm'
        : 'bg-rose-50 text-rose-600 border border-rose-200';
      ddayBadge = `<span class="px-2.5 py-0.5 rounded-lg ${bgClass} text-[11px] font-black">${evt.dday}</span>`;
    } else {
      ddayBadge = `<span class="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">${evt.dday || '진행중'}</span>`;
    }

    const sourceLabel = evt.sourceLabel || (isContest ? '공모전 공식' : '한국관광공사');
    const directUrl = this.getEventUrl(evt);

    return `
      <div class="bg-white rounded-2xl border border-slate-200/90 hover:border-${activeColor}-400 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3 group">
        <!-- 상단 뱃지 라인 -->
        <div class="flex items-center justify-between gap-1.5 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="px-2 py-0.5 rounded-lg text-xs font-black bg-slate-900 text-white">
              ${evt.badge || (isContest ? '🏆 전국대회' : '🎪 지역축제')}
            </span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-slate-700">
              📍 ${evt.regionName}
            </span>
            <span class="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 font-medium border border-slate-200">
              ${sourceLabel}
            </span>
          </div>
          <div>
            ${ddayBadge}
          </div>
        </div>

        <!-- 본문: 썸네일 + 제목 + 주최/일정 (모바일 컴팩트 크기) -->
        <div class="flex gap-2.5 sm:gap-3 items-start">
          <img
            src="${imgUrl}"
            alt="${evt.title}"
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-100 shadow-inner bg-slate-50 group-hover:scale-105 transition"
            onerror="this.src='${defaultImg}'"
          />
          <div class="flex-1 min-w-0 space-y-1">
            <h4
              onclick="app.openEventDetailModal('${evt.id}')"
              class="text-sm font-black text-slate-900 leading-snug line-clamp-2 hover:text-${activeColor}-600 cursor-pointer transition"
              title="${evt.title}"
            >
              ${evt.title}
            </h4>
            <div class="text-[11px] text-slate-500 truncate">
              <i class="fa-solid fa-building-columns text-slate-400 mr-1"></i>${evt.organizer || '주최기관 공식 안내'}
            </div>
            <div class="text-[11px] font-bold text-slate-700">
              <i class="fa-regular fa-calendar-check text-${activeColor}-500 mr-1"></i>접수: <span class="text-${activeColor}-700 font-black">${evt.applyStartDate} ~ ${evt.applyEndDate}</span>
            </div>
          </div>
        </div>

        <!-- 하단: 대상 + 바로가기 버튼 -->
        <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <div class="text-[11px] text-slate-500 truncate max-w-[140px] sm:max-w-[200px]" title="${evt.targetAudience}">
            <i class="fa-solid fa-children text-slate-400 mr-1"></i>${evt.targetAudience || '전국 유·초·중·고'}
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button
              onclick="app.openEventDetailModal('${evt.id}')"
              class="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition"
            >
              상세보기
            </button>
            <a
              href="${directUrl}"
              target="_blank"
              rel="noopener"
              class="px-3 py-1.5 rounded-xl bg-${activeColor}-600 hover:bg-${activeColor}-700 text-white font-black text-[11px] shadow-sm flex items-center gap-1 transition"
            >
              <span>공식 신청</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // 모달 제어 (지역행사 & 대회일정 공용)
  openEventDetailModal(eventId) {
    const evt = (this.allEvents || []).find((e) => e.id === eventId);
    if (!evt) return;
    this.activeEventDetailId = eventId;

    const modal = document.getElementById('event-detail-modal');
    if (!modal) return;

    document.getElementById('evt-modal-badge').textContent = evt.badge;
    document.getElementById('evt-modal-source').textContent = evt.sourceLabel;
    document.getElementById('evt-modal-dday').textContent = evt.dday;
    document.getElementById('evt-modal-region').textContent = `📍 ${evt.regionName}`;
    document.getElementById('evt-modal-title').textContent = evt.title;
    document.getElementById('evt-modal-img').src = evt.imageUrl;

    document.getElementById('evt-modal-date').textContent = `${evt.startDate} ${evt.endDate !== evt.startDate ? `~ ${evt.endDate}` : ''}`;
    document.getElementById('evt-modal-apply').textContent = `${evt.applyStartDate} ~ ${evt.applyEndDate}`;
    document.getElementById('evt-modal-location').textContent = evt.location;
    document.getElementById('evt-modal-target').textContent = evt.targetAudience;
    document.getElementById('evt-modal-fee').textContent = evt.fee;
    document.getElementById('evt-modal-organizer').textContent = evt.organizer;
    document.getElementById('evt-modal-desc').textContent = evt.description;

    const tagsEl = document.getElementById('evt-modal-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (evt.tags || [])
        .map((t) => `<span class="px-2 py-0.5 rounded-lg bg-stone-100 text-slate-600 text-xs font-semibold">#${t}</span>`)
        .join('');
    }

    const resolvedUrl = this.getEventUrl(evt);
    const linkEl = document.getElementById('evt-modal-link');
    if (linkEl) {
      linkEl.href = resolvedUrl;
    }

    const naverEl = document.getElementById('evt-modal-naver-link');
    if (naverEl) {
      const cleanTitle = (evt.title || '').replace(/\[.*?\]/g, '').trim();
      naverEl.href = `https://search.naver.com/search.naver?query=${encodeURIComponent(cleanTitle)}`;
    }

    modal.classList.remove('hidden');
  }

  getEventUrl(evt) {
    if (!evt || !evt.url) {
      return `https://search.naver.com/search.naver?query=${encodeURIComponent(evt?.title || '지역행사')}`;
    }
    // 대한민국 구석구석 과거 URL 파라미터(fes_detail.do, ms_detail.do) 비정상 접근 404 원천 차단
    if (evt.url.includes('fes_detail.do') || evt.url.includes('ms_detail.do')) {
      const cleanTitle = (evt.title || '').replace(/\[.*?\]/g, '').trim();
      return `https://search.naver.com/search.naver?query=${encodeURIComponent(cleanTitle)}`;
    }
    return evt.url;
  }

  closeEventDetailModal() {
    this.activeEventDetailId = null;
    const modal = document.getElementById('event-detail-modal');
    if (modal) modal.classList.add('hidden');
  }

  renderSidebarWidgets() {
    const hotListEl = document.getElementById('sidebar-hot-posts');
    if (hotListEl) {
      const topPosts = [...this.data.posts]
        .sort((a, b) => b.reactions.like - a.reactions.like)
        .slice(0, 5);

      hotListEl.innerHTML = topPosts
        .map(
          (p, i) => `
          <div onclick="app.openPostDetailModal('${p.id}')" class="flex items-start gap-2.5 cursor-pointer group">
            <span class="w-5 h-5 rounded-lg ${
              i === 0 ? 'bg-rose-500 text-white' : i === 1 ? 'bg-amber-400 text-white' : 'bg-stone-100 text-slate-600'
            } flex items-center justify-center font-black text-xs shrink-0">${i + 1}</span>
            <div class="flex-1">
              <h4 class="text-xs font-extrabold text-slate-800 group-hover:text-rose-600 transition truncate">${p.title}</h4>
              <div class="flex items-center gap-2 text-[10px] text-slate-400 font-bold mt-0.5">
                <span>공감 ${p.reactions.like}</span>
                <span>· 댓글 ${p.comments.length}</span>
              </div>
            </div>
          </div>
        `
        )
        .join('');
    }

    const tagEl = document.getElementById('sidebar-trending-tags');
    if (tagEl) {
      const allTags = {};
      this.data.posts.forEach((p) => {
        (p.tags || []).forEach((t) => {
          allTags[t] = (allTags[t] || 0) + 1;
        });
      });
      const topTags = Object.entries(allTags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

      tagEl.innerHTML = topTags
        .map(
          ([t, cnt]) => `
          <button
            onclick="app.onSearchKeyword('${t}')"
            class="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-[11px] font-bold transition flex items-center gap-1"
          >
            <span>#${t}</span>
            <span class="text-[9px] text-slate-400">${cnt}</span>
          </button>
        `
        )
        .join('');
    }
  }

  // ==========================================
  // 8. 스크랩북 & 토스트 알림 관리
  // ==========================================
  loadScraps() {
    try {
      const raw = localStorage.getItem(this.scrapsKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return ['post-01'];
  }

  toggleScrap(postId) {
    const idx = this.scraps.indexOf(postId);
    if (idx > -1) {
      this.scraps.splice(idx, 1);
      this.showToast('스크랩북에서 삭제되었습니다.');
    } else {
      this.scraps.push(postId);
      this.showToast('나의 육아 스크랩북에 저장되었습니다!');
    }
    localStorage.setItem(this.scrapsKey, JSON.stringify(this.scraps));
    this.updateScrapBadge();
    this.renderProfileWidget();
    this.renderBoardView();
  }

  updateScrapBadge() {
    const b = document.getElementById('scrap-count-badge');
    if (b) b.textContent = this.scraps.length;
  }

  openScrapModal() {
    const modal = document.getElementById('scrap-modal');
    const listEl = document.getElementById('scrap-list-container');
    if (!modal || !listEl) return;

    const scrappedPosts = this.data.posts.filter((p) => this.scraps.includes(p.id));
    if (scrappedPosts.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">스크랩한 게시글이 없습니다.</div>`;
    } else {
      listEl.innerHTML = scrappedPosts
        .map(
          (p) => `
          <div onclick="app.openPostDetailModal('${p.id}'); app.document.getElementById('scrap-modal').classList.add('hidden')" class="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 cursor-pointer hover:border-amber-300">
            <div class="text-xs font-extrabold text-slate-900">${p.title}</div>
            <div class="text-[11px] text-slate-500">작성자: ${p.author.nickname} · 공감 ${p.reactions.like} · 댓글 ${p.comments.length}</div>
          </div>
        `
        )
        .join('');
    }
    modal.classList.remove('hidden');
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className =
      'bg-slate-900/95 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transition-all';
    toast.innerHTML = `<i class="fa-solid fa-heart text-rose-400"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

// ==========================================
  initFoodMap() {
    if (this.foodMap) return;
    const mapEl = document.getElementById('food-map');
    if (!mapEl) return;

    this.foodMap = L.map('food-map', {
      center: [36.2, 127.8],
      zoom: 7,
      zoomControl: true
    });

    // Clean OpenStreetMap standard tiles (No "API Key Required" watermark)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.foodMap);

    // Initialize MarkerClusterGroup for 5,000+ pins
    if (typeof L.markerClusterGroup === 'function') {
      this.foodMarkersLayer = L.markerClusterGroup({
        maxClusterRadius: 40,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        disableClusteringAtZoom: 16
      });
      this.foodMap.addLayer(this.foodMarkersLayer);
    } else {
      this.foodMarkersLayer = L.layerGroup().addTo(this.foodMap);
    }

    this.updateFoodMapMarkers();
  }

  getCleanRestaurantQuery(r) {
    const rawName = (r.name || '').trim();
    if (/(본점|DCC점|노형점|용산아이파크몰점|강남점|여의도점|안지랑본점|성산본점|보문로점|한옥마을점)$/.test(rawName)) {
      return rawName;
    }
    let clean = rawName
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/\s+[^\s]+\/[^\s]+/g, '')
      .replace(/\s+[가-힣0-9A-Za-z·/]+(?:호점|점)$/, '')
      .replace(/\s*\/.*$/, '')
      .trim();
    return clean || rawName;
  }

  getRestaurantSources(r) {
    const cleanName = this.getCleanRestaurantQuery(r);
    const query = encodeURIComponent(cleanName);
    const kakaoDirectUrl = `https://map.kakao.com/link/to/${query},${r.lat},${r.lng}`;

    if (r.sources && r.sources.naver && r.sources.kakao && r.sources.google) {
      const currentNaver = r.sources.naver.url || '';
      const updatedNaver = currentNaver.includes(query)
        ? currentNaver.replace('/v5/search/', '/p/search/')
        : `https://map.naver.com/p/search/${query}`;

      const updatedKakao = (r.sources.kakao.url && r.sources.kakao.url.includes(query))
        ? r.sources.kakao.url
        : `https://map.kakao.com/?q=${query}`;

      const updatedGoogle = (r.sources.google.url && r.sources.google.url.includes(query))
        ? r.sources.google.url
        : `https://www.google.com/maps/search/?api=1&query=${query}`;

      return {
        naver: {
          ...r.sources.naver,
          url: updatedNaver
        },
        kakao: {
          ...r.sources.kakao,
          url: updatedKakao,
          directionsUrl: r.sources.kakao.directionsUrl || kakaoDirectUrl
        },
        google: {
          ...r.sources.google,
          url: updatedGoogle
        }
      };
    }

    const baseRating = Number(r.overallRating) || 4.5;
    const totalReviews = Number(r.reviewCount) || 5200;

    const naverRev = Math.round(totalReviews * 0.6);
    const kakaoRev = Math.round(totalReviews * 0.25);
    const googleRev = Math.max(80, totalReviews - naverRev - kakaoRev);

    const naverRate = Math.min(5.0, Math.max(4.0, (baseRating + 0.05).toFixed(2)));
    const kakaoRate = Math.min(5.0, Math.max(3.9, (baseRating - 0.1).toFixed(2)));
    const googleRate = Math.min(5.0, Math.max(4.0, Number(baseRating).toFixed(2)));

    return {
      naver: {
        rating: Number(naverRate),
        reviewCount: naverRev,
        url: `https://map.naver.com/p/search/${query}`,
        name: '네이버 플레이스'
      },
      kakao: {
        rating: Number(kakaoRate),
        reviewCount: kakaoRev,
        url: `https://map.kakao.com/?q=${query}`,
        directionsUrl: kakaoDirectUrl,
        name: '카카오맵'
      },
      google: {
        rating: Number(googleRate),
        reviewCount: googleRev,
        url: `https://www.google.com/maps/search/?api=1&query=${query}`,
        name: '구글 지도'
      }
    };
  }

  getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  setQuickFoodRegion(regionId) {
    const regFilter = document.getElementById('food-region-filter');
    if (regFilter) {
      regFilter.value = regionId;
    }
    const globalSelect = document.getElementById('global-region-select');
    if (globalSelect && globalSelect.querySelector(`option[value="${regionId}"]`)) {
      globalSelect.value = regionId;
    }
    this.updateQuickPillState(regionId);
    this.onFoodFilterChange();
  }

  updateQuickPillState(regionId) {
    document.querySelectorAll('.food-quick-pill').forEach((btn) => {
      const isMatch = btn.getAttribute('data-region') === regionId;
      if (isMatch) {
        btn.className = 'food-quick-pill px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold shrink-0 shadow-sm';
      } else {
        btn.className = 'food-quick-pill px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-[11px] font-bold shrink-0 transition';
      }
    });
  }

  locateUserAndFindRestaurants() {
    if (!navigator.geolocation) {
      this.showToast('사용 중인 브라우저가 위치 정보(GPS)를 지원하지 않습니다.');
      return;
    }

    this.showToast('📍 현재 위치(GPS)를 수신 중입니다...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.userLocation = { lat: latitude, lng: longitude };

        if (this.currentView !== 'food') {
          this.switchMainView('food');
        }
        this.initFoodMap();

        if (this.foodMap) {
          if (this.userBeaconMarker) {
            this.foodMap.removeLayer(this.userBeaconMarker);
          }
          const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: '<div class="relative flex items-center justify-center w-7 h-7"><div class="absolute w-7 h-7 rounded-full bg-blue-500/40 animate-ping"></div><div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white text-[8px] font-black"><i class="fa-solid fa-location-dot"></i></div></div>',
            iconAnchor: [14, 14]
          });
          this.userBeaconMarker = L.marker([latitude, longitude], { icon: userIcon }).addTo(this.foodMap);
          this.userBeaconMarker.bindPopup('<strong class="text-xs">📍 현재 나의 위치</strong>').openPopup();
        }

        const sortFilter = document.getElementById('food-sort-filter');
        if (sortFilter) {
          if (!sortFilter.querySelector("option[value='distance']")) {
            const opt = document.createElement('option');
            opt.value = 'distance';
            opt.textContent = '📍 내 위치에서 가까운순';
            sortFilter.prepend(opt);
          }
          sortFilter.value = 'distance';
        }

        const regFilter = document.getElementById('food-region-filter');
        if (regFilter) regFilter.value = 'all';
        this.updateQuickPillState('all');

        this.renderFoodView();
        this.updateFoodMapMarkers();
        this.showToast('📍 현재 위치 기준 가장 가까운 맛집 순으로 정렬되었습니다!');
      },
      (err) => {
        this.showToast('위치 권한이 차단되었거나 위치를 찾을 수 없습니다. 지역 필터를 이용해 주세요.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  getFilteredRestaurants() {
    const regionVal = document.getElementById('food-region-filter')?.value || 'all';
    const categoryVal = document.getElementById('food-category-filter')?.value || 'all';
    const sortVal = document.getElementById('food-sort-filter')?.value || 'overall';

    const needChair = document.getElementById('amenity-chair')?.checked ?? false;
    const needPlayroom = document.getElementById('amenity-playroom')?.checked ?? false;
    const needRoom = document.getElementById('amenity-room')?.checked ?? false;
    const needParking = document.getElementById('amenity-parking')?.checked ?? false;
    const needStroller = document.getElementById('amenity-stroller')?.checked ?? false;
    const searchKeyword = (document.getElementById('food-portal-query')?.value || '').trim().toLowerCase();

    let list = (this.data.restaurants || []).filter((r) => {
      // Region filter
      if (regionVal !== 'all') {
        if (regionVal === 'pangyo') {
          if (!(r.region === 'gyeonggi' && (r.district?.includes('판교') || r.district?.includes('분당')))) return false;
        } else if (regionVal === 'songpa') {
          if (!(r.region === 'seoul' && (r.district?.includes('송파') || r.district?.includes('강남')))) return false;
        } else if (regionVal === 'dongtan') {
          if (!(r.region === 'gyeonggi' && r.district?.includes('동탄'))) return false;
        } else if (regionVal === 'mapo') {
          if (!(r.region === 'seoul' && (r.district?.includes('마포') || r.district?.includes('용산') || r.district?.includes('영등포')))) return false;
        } else {
          if (r.region !== regionVal) return false;
        }
      }

      if (categoryVal !== 'all' && r.category !== categoryVal) return false;
      if (needChair && !r.amenities.some((a) => a.includes('아기의자'))) return false;
      if (needPlayroom && !r.amenities.some((a) => a.includes('놀이방') || a.includes('키즈룸') || a.includes('키즈존'))) return false;
      if (needRoom && !r.amenities.some((a) => a.includes('룸'))) return false;
      if (needParking && !r.amenities.some((a) => a.includes('주차'))) return false;
      if (needStroller && !r.amenities.some((a) => a.includes('유모차'))) return false;

      if (searchKeyword) {
        const textToSearch = [
          r.name,
          r.address,
          r.district || '',
          r.categoryName,
          r.regionName,
          r.representativeMenu,
          r.reviewSummary,
          r.amenities.join(' ')
        ].join(' ').toLowerCase();
        if (!textToSearch.includes(searchKeyword)) return false;
      }

      return true;
    });

    // Distance calculation
    if (this.userLocation) {
      list.forEach((r) => {
        r.distanceKm = this.getDistanceKm(this.userLocation.lat, this.userLocation.lng, r.lat, r.lng);
      });
    }

    if (sortVal === 'distance' && this.userLocation) {
      list.sort((a, b) => (a.distanceKm ?? 99999) - (b.distanceKm ?? 99999));
    } else if (sortVal === 'naver') {
      list.sort((a, b) => this.getRestaurantSources(b).naver.rating - this.getRestaurantSources(a).naver.rating);
    } else if (sortVal === 'kakao') {
      list.sort((a, b) => this.getRestaurantSources(b).kakao.rating - this.getRestaurantSources(a).kakao.rating);
    } else if (sortVal === 'google') {
      list.sort((a, b) => this.getRestaurantSources(b).google.rating - this.getRestaurantSources(a).google.rating);
    } else if (sortVal === 'reviews') {
      list.sort((a, b) => {
        const revB = b.reviewCount || (this.getRestaurantSources(b).naver.reviewCount + this.getRestaurantSources(b).kakao.reviewCount);
        const revA = a.reviewCount || (this.getRestaurantSources(a).naver.reviewCount + this.getRestaurantSources(a).kakao.reviewCount);
        return revB - revA;
      });
    } else {
      list.sort((a, b) => b.overallRating - a.overallRating);
    }

    return list;
  }

  onFoodFilterChange() {
    this.foodCurrentPage = 1;
    this.renderFoodView();
    this.updateFoodMapMarkers();
  }

  updateFoodMapMarkers() {
    if (!this.foodMap || !this.foodMarkersLayer) return;

    this.foodMarkersLayer.clearLayers();
    this.foodMarkersMap = {};

    const restaurants = this.getFilteredRestaurants();
    if (restaurants.length === 0) return;

    const bounds = [];
    const markerBatch = [];

    restaurants.forEach((r) => {
      const sources = this.getRestaurantSources(r);

      // Compact Pin for clean, cluster-ready nationwide viewing
      const iconHtml = `
        <div class="food-compact-pin" id="pin-${r.id}" title="${r.name} (★${r.overallRating})">
          <i class="fa-solid fa-utensils"></i>
          <span>${r.overallRating}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'food-compact-div-icon',
        html: iconHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const popupContent = `
        <div class="space-y-2 text-xs">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-100 text-rose-700">${r.categoryName}</span>
            <span class="text-xs font-black text-slate-900">${r.name}</span>
          </div>
          <p class="text-slate-600 text-[11px]">${r.address}</p>
          <div class="grid grid-cols-3 gap-1 text-center py-1.5 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <span class="text-[9px] font-bold text-emerald-700 block">네이버</span>
              <span class="font-black text-slate-800 text-[11px]">★ ${sources.naver.rating}</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-amber-600 block">카카오</span>
              <span class="font-black text-slate-800 text-[11px]">★ ${sources.kakao.rating}</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-blue-600 block">구글</span>
              <span class="font-black text-slate-800 text-[11px]">★ ${sources.google.rating}</span>
            </div>
          </div>
          <div class="flex flex-wrap gap-1">
            ${r.amenities.map(a => `<span class="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-bold text-slate-600">${a}</span>`).join('')}
          </div>
          <div class="pt-1 grid grid-cols-3 gap-1">
            <a href="${sources.naver.url}" target="_blank" rel="noopener" class="py-1 rounded-lg badge-naver text-[10px] font-extrabold text-center hover:opacity-90">네이버 ↗</a>
            <a href="${sources.kakao.url}" target="_blank" rel="noopener" class="py-1 rounded-lg badge-kakao text-[10px] font-extrabold text-center hover:opacity-90">카카오 ↗</a>
            <a href="${sources.google.url}" target="_blank" rel="noopener" class="py-1 rounded-lg badge-google text-[10px] font-extrabold text-center hover:opacity-90">구글 ↗</a>
          </div>
        </div>
      `;

      const marker = L.marker([r.lat, r.lng], { icon: customIcon });
      marker.bindPopup(popupContent, { maxWidth: 280 });

      markerBatch.push(marker);
      this.foodMarkersMap[r.id] = marker;
      bounds.push([r.lat, r.lng]);
    });

    // High performance bulk add to cluster layer
    if (typeof this.foodMarkersLayer.addLayers === 'function') {
      this.foodMarkersLayer.addLayers(markerBatch);
    } else {
      markerBatch.forEach(m => this.foodMarkersLayer.addLayer(m));
    }

    if (bounds.length > 0) {
      if (bounds.length === 1) {
        this.foodMap.setView(bounds[0], 14);
      } else if (bounds.length > 800) {
        // Nationwide overview
        this.foodMap.setView([36.2, 127.8], 7);
      } else {
        this.foodMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }
  }

  focusRestaurantOnMap(restId) {
    const restaurant = (this.data.restaurants || []).find((r) => r.id === restId);
    if (!restaurant) return;

    this.initFoodMap();
    if (this.foodMap) {
      const marker = this.foodMarkersMap[restId];
      if (marker && this.foodMarkersLayer && typeof this.foodMarkersLayer.zoomToShowLayer === 'function') {
        this.foodMarkersLayer.zoomToShowLayer(marker, () => {
          marker.openPopup();
        });
      } else if (marker) {
        this.foodMap.setView([restaurant.lat, restaurant.lng], 15, { duration: 0.6 });
        marker.openPopup();
      } else {
        this.foodMap.setView([restaurant.lat, restaurant.lng], 15, { duration: 0.6 });
      }

      const mapCard = document.getElementById('food-map');
      if (mapCard) {
        mapCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  searchExternalPortal(portal) {
    const input = document.getElementById('food-portal-query');
    const userQuery = input ? input.value.trim() : '';
    const regionFilter = document.getElementById('food-region-filter')?.value || 'all';
    const regionName = regionFilter === 'all' ? '' : (document.getElementById('food-region-filter')?.selectedOptions[0]?.text.replace('📍 지역: ', '') || '');

    const query = userQuery || (regionName ? `${regionName} 아이와 맛집` : '가족외식 아기의자 맛집');

    let url = '';
    let portalName = '';
    if (portal === 'naver') {
      url = `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
      portalName = '네이버 플레이스';
    } else if (portal === 'kakao') {
      url = `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
      portalName = '카카오맵';
    } else if (portal === 'google') {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      portalName = '구글 지도';
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      this.showToast(`[${portalName}] '${query}' 실시간 검색 창을 열었습니다!`);
    }
  }

  renderFoodView() {
    const listEl = document.getElementById('food-restaurants-list');
    const badgeEl = document.getElementById('food-count-badge');
    const paginationContainer = document.getElementById('food-load-more-container');
    if (!listEl) return;

    // 하이브리드 수집 통계 위젯 업데이트
    const meta = window.DODAM_CRAWL_METADATA || {
      lastUpdated: '2026-10-29',
      todayCount: 810,
      totalCount: 5000,
      targetCount: 5000
    };
    const statDate = document.getElementById('crawl-stat-date');
    const statToday = document.getElementById('crawl-stat-today');
    const statTotal = document.getElementById('crawl-stat-total');
    const statTarget = document.getElementById('crawl-stat-target');
    if (statDate) statDate.textContent = meta.lastUpdated;
    if (statToday) statToday.textContent = (meta.todayCount || 810).toLocaleString();
    if (statTotal) statTotal.textContent = (meta.totalCount || 5000).toLocaleString();
    const totalRestaurantsCount = window.DODAM_NATIONWIDE_RESTAURANTS ? window.DODAM_NATIONWIDE_RESTAURANTS.length : (meta.targetCount || 5000);
    if (statTarget) statTarget.textContent = totalRestaurantsCount.toLocaleString();

    const filtered = this.getFilteredRestaurants();
    if (badgeEl) badgeEl.textContent = filtered.length.toLocaleString();

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="community-card p-10 text-center space-y-2">
          <div class="text-2xl">🍽️</div>
          <div class="text-sm font-extrabold text-slate-700">선택하신 조건에 맞는 맛집이 없습니다.</div>
          <p class="text-xs text-slate-400">다른 지역을 선택하거나 포털 사이트 실시간 검색을 이용해보세요.</p>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    const pageSize = this.foodPageSize || 15;
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    this.foodCurrentPage = Math.max(1, Math.min(this.foodCurrentPage || 1, totalPages));
    const currentPage = this.foodCurrentPage;

    const startIdx = (currentPage - 1) * pageSize;
    const visibleItems = filtered.slice(startIdx, startIdx + pageSize);

    listEl.innerHTML = visibleItems
      .map((r) => {
        const sources = this.getRestaurantSources(r);
        const totalReviews = r.reviewCount || (sources.naver.reviewCount + sources.kakao.reviewCount);
        const kakaoNavUrl = sources.kakao.directionsUrl || sources.kakao.url;

        return `
        <article class="community-card p-5 space-y-3.5 hover:border-rose-300 transition">
          <!-- 상단: 이름, 카테고리, 지역, 종합 평점 -->
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-50 text-rose-600 border border-rose-200">
                  📍 ${r.regionName} ${r.district ? `· ${r.district}` : ''}
                </span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-slate-700">
                  ${r.categoryName}
                </span>
                ${r.isCrawled ? `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <i class="fa-solid fa-circle-check text-emerald-500"></i>실데이터 검증
                </span>` : `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-500 border border-stone-200">
                  통계추정치 (순차수집)
                </span>`}
                ${r.distanceKm !== undefined ? `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <i class="fa-solid fa-person-walking text-[9px]"></i>${r.distanceKm}km
                </span>` : ''}
              </div>
              <h3 class="text-base font-black text-slate-900 mt-1">${r.name}</h3>
              <p class="text-xs text-slate-500 mt-0.5">
                <i class="fa-solid fa-location-dot text-rose-400 mr-1"></i>${r.address}
                ${r.phone ? `· 📞 ${r.phone}` : ''}
              </p>
            </div>

            <!-- 종합 평점 뱃지 -->
            <div class="text-right shrink-0">
              <span class="inline-block px-3 py-1 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 font-black text-xs">
                ★ 종합 ${r.overallRating}
              </span>
              <div class="text-[10px] text-slate-400 font-bold mt-1">방문자 리뷰 ${totalReviews.toLocaleString()}건</div>
            </div>
          </div>

          <!-- 3대 포털 실시간 출처 링크 & 평점 비교 바 (핵심 기능) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/70">
            <!-- 네이버 플레이스 -->
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-extrabold text-emerald-600 block">🟢 네이버 플레이스</span>
                <span class="font-black text-xs text-slate-800">★ ${sources.naver.rating} <span class="text-[10px] text-slate-400 font-normal">(${sources.naver.reviewCount.toLocaleString()}개)</span></span>
              </div>
              <a
                href="${sources.naver.url}"
                target="_blank"
                rel="noopener"
                class="px-2 py-1 rounded-lg badge-naver text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 transition"
                title="네이버 플레이스 바로가기"
              >
                <span>네이버</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>

            <!-- 카카오맵 -->
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-extrabold text-amber-600 block">🟡 카카오맵</span>
                <span class="font-black text-xs text-slate-800">★ ${sources.kakao.rating} <span class="text-[10px] text-slate-400 font-normal">(${sources.kakao.reviewCount.toLocaleString()}개)</span></span>
              </div>
              <a
                href="${sources.kakao.url}"
                target="_blank"
                rel="noopener"
                class="px-2 py-1 rounded-lg badge-kakao text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 transition"
                title="카카오맵 바로가기"
              >
                <span>카카오</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>

            <!-- 구글 지도 -->
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-extrabold text-blue-600 block">🔵 구글 지도</span>
                <span class="font-black text-xs text-slate-800">★ ${sources.google.rating} <span class="text-[10px] text-slate-400 font-normal">(${sources.google.reviewCount.toLocaleString()}개)</span></span>
              </div>
              <a
                href="${sources.google.url}"
                target="_blank"
                rel="noopener"
                class="px-2 py-1 rounded-lg badge-google text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 transition"
                title="구글 지도 바로가기"
              >
                <span>구글</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>
          </div>

          <!-- 편의시설 태그 & 대표 메뉴 -->
          <div class="space-y-1.5 text-xs">
            <div class="flex flex-wrap gap-1">
              ${r.amenities
                .map(
                  (a) => `
                <span class="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 font-bold text-[11px]">
                  ${a}
                </span>
              `
                )
                .join('')}
            </div>

            <div class="text-slate-600 pt-0.5">
              🍽️ <strong>대표 메뉴:</strong> ${r.representativeMenu}
              ${r.hours ? `<span class="ml-2 text-slate-400">| ⏰ ${r.hours}</span>` : ''}
            </div>

            <div class="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-[12px] text-slate-700 leading-relaxed">
              💬 <strong>육아맘·대디 한줄평:</strong> "${r.reviewSummary}"
            </div>
          </div>

          <!-- 액션 버튼 바 -->
          <div class="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
            <button
              onclick="app.focusRestaurantOnMap('${r.id}')"
              class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <i class="fa-solid fa-location-crosshairs text-rose-400"></i>
              <span>지도에서 위치 보기</span>
            </button>

            <div class="flex items-center gap-1.5">
              <a
                href="${sources.naver.url}"
                target="_blank"
                rel="noopener"
                class="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-extrabold transition flex items-center gap-1"
              >
                <span>네이버 상세</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
              <a
                href="${kakaoNavUrl}"
                target="_blank"
                rel="noopener"
                class="px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 text-[11px] font-extrabold transition flex items-center gap-1"
              >
                <span>카카오 길찾기</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
              <a
                href="${sources.google.url}"
                target="_blank"
                rel="noopener"
                class="px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 text-[11px] font-extrabold transition flex items-center gap-1"
              >
                <span>구글 리뷰</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>
          </div>
        </article>
      `;
      })
      .join('');

    // Pagination Component
    if (paginationContainer) {
      paginationContainer.innerHTML = this.renderFoodPagination(currentPage, totalPages, totalCount, startIdx, pageSize);
    }
  }

  renderFoodPagination(currentPage, totalPages, totalCount, startIdx, pageSize) {
    if (totalPages <= 1) {
      return `
        <div class="py-4 text-center text-xs font-bold text-slate-400">
          전체 ${totalCount.toLocaleString()}곳의 맛집이 표시되었습니다.
        </div>
      `;
    }

    const pageButtons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageButtons.push(`
        <button
          onclick="app.setFoodPage(1)"
          class="w-8 h-8 rounded-xl border border-stone-200 text-xs font-bold hover:bg-stone-50 text-slate-700 transition"
          title="첫 페이지"
        >1</button>
      `);
      if (startPage > 2) {
        pageButtons.push(`<span class="px-1 text-slate-300 text-xs">...</span>`);
      }
    }

    for (let p = startPage; p <= endPage; p++) {
      const isCurrent = p === currentPage;
      pageButtons.push(`
        <button
          onclick="app.setFoodPage(${p})"
          class="w-8 h-8 rounded-xl text-xs font-black transition ${
            isCurrent
              ? 'bg-rose-500 text-white shadow-xs'
              : 'border border-stone-200 hover:bg-stone-50 text-slate-700'
          }"
        >${p}</button>
      `);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(`<span class="px-1 text-slate-300 text-xs">...</span>`);
      }
      pageButtons.push(`
        <button
          onclick="app.setFoodPage(${totalPages})"
          class="px-2 h-8 rounded-xl border border-stone-200 text-xs font-bold hover:bg-stone-50 text-slate-700 transition"
          title="마지막 페이지"
        >${totalPages}</button>
      `);
    }

    const startNum = (startIdx + 1).toLocaleString();
    const endNum = Math.min(startIdx + pageSize, totalCount).toLocaleString();

    return `
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs mt-2">
        <div class="text-xs text-slate-500 font-bold text-center sm:text-left">
          전체 <strong class="text-slate-900 font-black">${totalCount.toLocaleString()}</strong>곳 중 
          <span class="text-rose-600 font-black">${startNum} ~ ${endNum}곳</span> 
          (페이지 <strong class="text-slate-900">${currentPage}</strong> / ${totalPages})
        </div>

        <div class="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            onclick="app.setFoodPage(${currentPage - 1})"
            ${currentPage <= 1 ? 'disabled' : ''}
            class="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold transition flex items-center gap-1 ${
              currentPage <= 1
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-stone-50'
                : 'hover:bg-stone-50 text-slate-700'
            }"
          >
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
            <span>이전</span>
          </button>

          ${pageButtons.join('')}

          <button
            onclick="app.setFoodPage(${currentPage + 1})"
            ${currentPage >= totalPages ? 'disabled' : ''}
            class="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold transition flex items-center gap-1 ${
              currentPage >= totalPages
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-stone-50'
                : 'hover:bg-stone-50 text-slate-700'
            }"
          >
            <span>다음</span>
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </div>
    `;
  }

  setFoodPage(page) {
    const filtered = this.getFilteredRestaurants();
    const pageSize = this.foodPageSize || 15;
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    this.foodCurrentPage = Math.max(1, Math.min(page, totalPages));
    this.renderFoodView();

    const listEl = document.getElementById('food-restaurants-list');
    if (listEl) {
      listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  loadMoreRestaurants() {
    this.setFoodPage((this.foodCurrentPage || 1) + 1);
  }

  // ==========================================
  // 7. 대한민국 육아 정책 & 정부 지원금 모아보기 컨트롤러
  // ==========================================
  initPolicyView() {
    this.renderPolicyCategories();
    this.renderPolicyPortals();
    this.renderPolicyCalculator();
    this.renderPolicyList();
    this.renderPolicyFaqs();
  }

  renderPolicyPortals() {
    const container = document.getElementById('policy-portals-container');
    if (!container) return;
    const portals = window.DODAM_POLICIES_DATA?.portals || [];
    container.innerHTML = portals
      .map(
        (p) => `
        <a
          href="${p.url}"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2.5 rounded-xl border ${p.bgColor} hover:shadow-sm hover:scale-[1.01] transition flex flex-col justify-between gap-1.5 group"
        >
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-xs flex items-center gap-1.5 truncate">
              <i class="fa-solid ${p.icon} text-xs"></i>
              <span class="truncate">${p.name}</span>
            </span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-60 group-hover:opacity-100"></i>
          </div>
          <p class="text-[10px] opacity-80 line-clamp-2 leading-tight">${p.desc}</p>
        </a>
      `
      )
      .join('');
  }

  renderPolicyCategories() {
    const container = document.getElementById('policy-category-chips');
    if (!container) return;
    const categories = window.DODAM_POLICIES_DATA?.categories || [];
    container.innerHTML = categories
      .map((c) => {
        const active = this.policyCategory === c.id;
        return `
          <button
            type="button"
            onclick="app.selectPolicyCategory('${c.id}')"
            class="px-3 py-1.5 rounded-xl font-extrabold whitespace-nowrap transition flex items-center gap-1.5 text-xs ${
              active
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }"
          >
            <i class="fa-solid ${c.icon} ${active ? 'text-emerald-400' : 'text-slate-400'}"></i>
            <span>${c.name}</span>
          </button>
        `;
      })
      .join('');
  }

  selectPolicyCategory(catId) {
    this.policyCategory = catId;
    this.renderPolicyCategories();
    this.renderPolicyList();
  }

  setPolicyAgeFilter(age) {
    this.policyAgeGroup = age;
    this.renderPolicyList();
  }

  setPolicyRegionFilter(region) {
    this.policyRegion = region;
    this.renderPolicyList();
  }

  onPolicySearch(keyword) {
    this.policySearchKeyword = (keyword || '').trim().toLowerCase();
    const clearBtn = document.getElementById('policy-search-clear');
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', !this.policySearchKeyword);
    }
    this.renderPolicyList();
  }

  clearPolicySearch() {
    this.policySearchKeyword = '';
    const input = document.getElementById('policy-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('policy-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
    this.renderPolicyList();
  }

  setCalcChildren(num) {
    this.calcChildrenCount = parseInt(num, 10);
    document.querySelectorAll('.calc-child-btn').forEach((btn) => {
      const val = parseInt(btn.getAttribute('data-value'), 10);
      const active = val === this.calcChildrenCount;
      btn.className = active
        ? 'calc-child-btn px-2 py-2 rounded-xl text-xs font-extrabold border border-emerald-500 bg-emerald-500 text-white shadow-sm transition'
        : 'calc-child-btn px-2 py-2 rounded-xl text-xs font-extrabold border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition';
    });
    this.renderPolicyCalculator();
  }

  setCalcAge(age) {
    this.calcYoungestAge = age;
    this.renderPolicyCalculator();
  }

  setCalcRegion(region) {
    this.calcRegion = region;
    this.renderPolicyCalculator();
  }

  renderPolicyCalculator() {
    const resBox = document.getElementById('calc-result-box');
    if (!resBox) return;

    const children = this.calcChildrenCount || 2;
    const age = this.calcYoungestAge || '0';
    const region = this.calcRegion || 'all';

    let monthlyCash = 0;
    const breakdown = [];
    const vouchers = [];
    const discounts = [];

    // Monthly cash calculation
    if (age === 'pregnant') {
      monthlyCash = 0;
      vouchers.push('임신·출산 진료비 바우처 100만~140만 원 (국민행복카드)');
      vouchers.push(`첫만남이용권 ${children >= 2 ? '300만 원 (둘째 이상)' : '200만 원 (첫째)'}`);
    } else if (age === '0') {
      monthlyCash += 100; // 부모급여 100만
      monthlyCash += 10;  // 아동수당 10만
      breakdown.push('만 0세 부모급여: 월 100만 원');
      breakdown.push('아동수당: 월 10만 원');
      vouchers.push(`첫만남이용권 ${children >= 2 ? '300만 원' : '200만 원'} (출생 1년 내)`);
      discounts.push('한전 출산가구 전기요금 30% 감면 (월 최대 16,000원, 출생 3년)');
      discounts.push('에너지바우처 (기초수급 영유아 포함 가구 연 최대 70만원)');
    } else if (age === '1') {
      monthlyCash += 50; // 부모급여 50만
      monthlyCash += 10; // 아동수당 10만
      breakdown.push('만 1세 부모급여: 월 50만 원');
      breakdown.push('아동수당: 월 10만 원');
      discounts.push('한전 출산가구 전기요금 30% 감면 (출생 후 3년까지)');
      discounts.push('에너지바우처 냉·난방비 지원');
    } else if (age === 'toddler') {
      monthlyCash += 10; // 아동수당
      breakdown.push('아동수당 (만 8세 미만): 월 10만 원');
    } else {
      breakdown.push('아동수당 연령 초과 (초등학생 이상)');
    }

    // Additional child allowances if multiple children
    if (children >= 2) {
      discounts.push('🎉 다자녀 혜택 대상 (2자녀 이상 기준 완화 적용)');
      discounts.push('KTX & SRT 다자녀 행복 열차 30~50% 할인');
      discounts.push('공공분양·청약 다자녀 특별공급 신청 자격 부여 (2자녀 이상)');
      discounts.push('어린이집 1순위 우선 입소');
      if (children >= 3) {
        discounts.push('다자녀 자동차 취득세 감면 (7~9인승 전액, 승용차 140만원)');
        discounts.push('도시가스 요금 동절기 월 최대 18,000원 감면');
      }
    }

    // Local regional subsidies
    if (region === 'seoul') {
      vouchers.push('서울형 산후조리경비 100만 원 (서울 거주 산모)');
      vouchers.push('서울시 임산부 교통비 70만 원 (대중교통/택시/주유비)');
      if (age === 'toddler' || age === '1') {
        discounts.push('서울형 아이돌봄비 (조부모 친인척 돌봄 시 월 30만 원, 최대 13개월 390만 원)');
      }
    } else if (region === 'gyeonggi') {
      vouchers.push('경기도 산후조리비 50만 원 (경기지역화폐 지급)');
    } else if (region === 'incheon') {
      vouchers.push('인천 1억 플러스 아이드림 (1~7세 천사지원금 매년 120만 원)');
    } else if (region === 'busan') {
      if (children >= 2) {
        discounts.push(`부산시 다자녀 교육지원포인트 (${children === 2 ? '연 30만 원' : '연 50만 원'} 동백전)`);
      }
    }

    // Child Tax Credit mention
    discounts.push('국세청 자녀장려금 (소득 7천만원 미만 시 자녀 1인당 최대 100만 원, 5월 신청)');

    resBox.innerHTML = `
      <div class="space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-700">
          <div>
            <span class="text-[11px] font-extrabold text-emerald-400">💡 우리 가족 월 예상 기본 현금 수당</span>
            <div class="text-xl font-black text-white mt-0.5">
              ${
                monthlyCash > 0
                  ? `<span class="text-emerald-400 font-black">월 ${monthlyCash}만 원</span> <span class="text-xs text-slate-300 font-normal">(${breakdown.join(' + ')})</span>`
                  : `<span class="text-slate-300 font-bold text-sm">월 기본수당 대상 외 (일시금 바우처 및 감면 혜택 집중)</span>`
              }
            </div>
          </div>
          <div class="text-right">
            <span class="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-black">
              ${children}자녀 가구 맞춤
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <!-- 일시금 바우처 -->
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
            <div class="font-extrabold text-pink-300 flex items-center gap-1.5">
              <i class="fa-solid fa-gift"></i>
              <span>추천 일시금 바우처 & 포인트</span>
            </div>
            <ul class="space-y-1 text-slate-300 text-[11px]">
              ${vouchers.map((v) => `<li class="flex items-start gap-1.5"><span class="text-pink-400 font-bold">•</span><span>${v}</span></li>`).join('')}
            </ul>
          </div>

          <!-- 요금감면 및 정책 -->
          <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1.5">
            <div class="font-extrabold text-amber-300 flex items-center gap-1.5">
              <i class="fa-solid fa-bolt"></i>
              <span>요금 감면 & 다자녀·세제 추천 혜택</span>
            </div>
            <ul class="space-y-1 text-slate-300 text-[11px]">
              ${discounts.slice(0, 4).map((d) => `<li class="flex items-start gap-1.5"><span class="text-amber-400 font-bold">•</span><span>${d}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  filterPolicies() {
    const data = window.DODAM_POLICIES_DATA?.policies || [];
    return data.filter((p) => {
      // Category filter
      if (this.policyCategory !== 'all' && p.category !== this.policyCategory) {
        return false;
      }
      // Age group filter
      if (this.policyAgeGroup !== 'all') {
        if (this.policyAgeGroup === 'multi') {
          if (p.category !== 'multi_child' && p.ageGroup !== 'multi') return false;
        } else if (p.ageGroup !== 'all' && p.ageGroup !== this.policyAgeGroup) {
          return false;
        }
      }
      // Region filter
      if (this.policyRegion !== 'all') {
        if (p.region !== 'all' && p.region !== this.policyRegion) {
          return false;
        }
      }
      // Keyword filter
      if (this.policySearchKeyword) {
        const kw = this.policySearchKeyword;
        const text = (
          p.title +
          ' ' +
          p.summary +
          ' ' +
          (p.targetGroup || '') +
          ' ' +
          (p.amountHighlight || '') +
          ' ' +
          (p.details || []).join(' ')
        ).toLowerCase();
        if (!text.includes(kw)) return false;
      }
      return true;
    });
  }

  renderPolicyList() {
    const grid = document.getElementById('policy-cards-grid');
    const badge = document.getElementById('policy-filtered-count-badge');
    const totalCountEl = document.getElementById('policy-stat-total');
    if (!grid) return;

    const allPolicies = window.DODAM_POLICIES_DATA?.policies || [];
    if (totalCountEl) totalCountEl.textContent = `${allPolicies.length}+`;

    const filtered = this.filterPolicies();
    if (badge) {
      badge.textContent = `검색 결과 ${filtered.length}건`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
          <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl mb-3">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <p class="text-sm font-bold text-slate-700">선택하신 조건에 일치하는 지원금 정책이 없습니다.</p>
          <p class="text-xs text-slate-400 mt-1">검색어를 변경하시거나 카테고리/지역 필터를 '전체'로 설정해 보세요.</p>
          <button
            onclick="app.clearPolicySearch(); app.selectPolicyCategory('all'); document.getElementById('policy-age-filter').value='all'; document.getElementById('policy-region-filter').value='all'; app.setPolicyAgeFilter('all'); app.setPolicyRegionFilter('all');"
            class="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition"
          >
            전체 필터 초기화
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map((p) => {
        const isExpanded = this.expandedPolicyIds.has(p.id);
        const color = p.categoryColor || 'emerald';

        const colorClasses = {
          emerald: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', highlight: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
          rose: { badge: 'bg-rose-50 text-rose-700 border-rose-200', highlight: 'bg-rose-50 text-rose-800 border-rose-200' },
          blue: { badge: 'bg-blue-50 text-blue-700 border-blue-200', highlight: 'bg-blue-50 text-blue-800 border-blue-200' },
          amber: { badge: 'bg-amber-50 text-amber-700 border-amber-200', highlight: 'bg-amber-50 text-amber-800 border-amber-200' },
          purple: { badge: 'bg-purple-50 text-purple-700 border-purple-200', highlight: 'bg-purple-50 text-purple-800 border-purple-200' },
          indigo: { badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', highlight: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
          pink: { badge: 'bg-pink-50 text-pink-700 border-pink-200', highlight: 'bg-pink-50 text-pink-800 border-pink-200' }
        }[color] || { badge: 'bg-slate-100 text-slate-700 border-slate-200', highlight: 'bg-slate-50 text-slate-800 border-slate-200' };

        return `
          <article class="community-card p-4 bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
            <div class="space-y-3">
              <!-- 상단 뱃지 라인 -->
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="px-2 py-0.5 rounded-full font-black text-[10px] border ${colorClasses.badge}">
                    ${p.categoryName}
                  </span>
                  ${
                    p.badge
                      ? `<span class="px-2 py-0.5 rounded-full font-black text-[10px] bg-rose-500 text-white shadow-2xs">${p.badge}</span>`
                      : ''
                  }
                  <span class="px-2 py-0.5 rounded-full font-bold text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                    ${p.regionName}
                  </span>
                </div>
                <span class="text-[10px] text-slate-400 font-bold truncate max-w-[150px]">
                  <i class="fa-solid fa-users mr-1"></i>${p.targetGroup}
                </span>
              </div>

              <!-- 제목 및 요약 -->
              <div>
                <h4 class="text-sm font-black text-slate-900 hover:text-emerald-700 transition cursor-pointer" onclick="app.togglePolicyDetail('${p.id}')">
                  ${p.title}
                </h4>
                <p class="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  ${p.summary}
                </p>
              </div>

              <!-- 지원 금액 하이라이트 박스 -->
              <div class="p-2.5 rounded-xl border ${colorClasses.highlight} flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="text-sm font-black shrink-0">💰</span>
                  <div class="min-w-0">
                    <div class="text-[10px] text-slate-500 font-bold">지원 혜택 & 금액</div>
                    <div class="text-xs font-black truncate">${p.amountHighlight}</div>
                  </div>
                </div>
              </div>

              <!-- 아코디언 상세 정보 -->
              <div id="policy-detail-${p.id}" class="${isExpanded ? '' : 'hidden'} pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div class="font-extrabold text-[11px] text-slate-900 flex items-center gap-1.5">
                    <i class="fa-solid fa-circle-info text-emerald-600"></i>
                    <span>상세 지원 요건 & 이용 안내</span>
                  </div>
                  <ul class="space-y-1 text-[11px] text-slate-600 pl-1">
                    ${(p.details || []).map((d) => `<li class="flex items-start gap-1.5"><span class="text-emerald-500 font-bold">•</span><span>${d}</span></li>`).join('')}
                  </ul>
                </div>

                <div class="flex items-start gap-2 text-[11px] text-slate-600 pt-0.5">
                  <strong class="font-bold text-slate-900 shrink-0"><i class="fa-solid fa-location-dot text-slate-400 mr-1"></i>신청처:</strong>
                  <span>${p.applyMethod}</span>
                </div>
              </div>
            </div>

            <!-- 카드 하단 액션 버튼 -->
            <div class="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100">
              <button
                type="button"
                onclick="app.togglePolicyDetail('${p.id}')"
                class="text-xs font-extrabold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                <span>${isExpanded ? '상세 접기' : '자세히 보기'}</span>
                <i class="fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]"></i>
              </button>

              <a
                href="${p.applyUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-black text-xs shadow-2xs transition"
              >
                <span>${p.applySiteName || '공식 신청 바로가기'}</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
          </article>
        `;
      })
      .join('');
  }

  togglePolicyDetail(policyId) {
    if (this.expandedPolicyIds.has(policyId)) {
      this.expandedPolicyIds.delete(policyId);
    } else {
      this.expandedPolicyIds.add(policyId);
    }
    this.renderPolicyList();
  }

  renderPolicyFaqs() {
    const container = document.getElementById('policy-faqs-container');
    if (!container) return;
    const faqs = window.DODAM_POLICIES_DATA?.faqs || [];
    container.innerHTML = faqs
      .map((faq, idx) => {
        const isOpen = this.expandedFaqIndexes.has(idx);
        return `
          <div class="border border-slate-200 rounded-xl overflow-hidden transition">
            <button
              type="button"
              onclick="app.togglePolicyFaq(${idx})"
              class="w-full p-3.5 text-left bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs font-black text-slate-800 transition"
            >
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-[10px] shrink-0">Q</span>
                <span>${faq.q}</span>
              </div>
              <i class="fa-solid ${isOpen ? 'fa-minus text-rose-500' : 'fa-plus text-slate-400'} text-xs shrink-0"></i>
            </button>
            <div class="${isOpen ? '' : 'hidden'} p-3.5 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
              <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">A</span>
              <div>${faq.a}</div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  togglePolicyFaq(idx) {
    if (this.expandedFaqIndexes.has(idx)) {
      this.expandedFaqIndexes.delete(idx);
    } else {
      this.expandedFaqIndexes.add(idx);
    }
    this.renderPolicyFaqs();
  }

  // ==========================================
  // 8. 전국 학교 정보 & 리치고(RichGo) 학군 순위 포털 컨트롤러
  // ==========================================
  initSchoolView() {
    this.renderSchoolLevelChips();
    this.renderSchoolRichGoHeader();
    this.renderSchoolSidoPills();
    this.renderSchoolSigunguTable();
    this.renderSchoolList();
    this.renderSchoolDistricts();
    this.renderSchoolAdmissions();

    // 통계 위젯 숫자 실시간 반영 (15,000개 순위 DB)
    const totalCountEl = document.getElementById('school-stat-total');
    const todayCountEl = document.getElementById('school-stat-today');
    const dateEl = document.getElementById('school-stat-date');
    const schools = window.DODAM_SCHOOLS_DATA?.schools || [];
    const districts = window.DODAM_SCHOOLS_DATA?.districts || [];
    if (totalCountEl) totalCountEl.textContent = (schools.length + districts.length).toLocaleString();
    if (todayCountEl) todayCountEl.textContent = schools.length.toLocaleString();
    if (dateEl && window.DODAM_SCHOOLS_DATA?.updatedAt) {
      dateEl.textContent = window.DODAM_SCHOOLS_DATA.updatedAt.replace(/-/g, '.');
    }
  }

  renderSchoolRichGoHeader() {
    const titleEl = document.getElementById('school-richgo-title');
    const subtitleEl = document.getElementById('school-richgo-subtitle');
    const breadcrumbCurrent = document.getElementById('school-breadcrumb-current');
    if (!titleEl) return;

    const levelNames = {
      all: '전체 학교',
      elementary: '초등학교',
      middle: '중학교',
      high: '고등학교'
    };
    const levelName = levelNames[this.schoolLevel] || '초등학교';

    const sidos = window.DODAM_SCHOOLS_DATA?.sidos || [];
    const activeSido = sidos.find((s) => s.id === this.schoolSido) || { name: '전국' };
    const isNationwide = this.schoolSido === 'all';
    const regionPrefix = isNationwide ? '전국' : activeSido.name;

    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = `${regionPrefix} ${levelName} 순위`;
    }

    titleEl.textContent = `${regionPrefix} ${levelName} 순위 2026`;

    // 서브타이틀: 리치고 실제 화면 문구 미러링
    if (subtitleEl) {
      if (isNationwide) {
        if (this.schoolLevel === 'elementary') {
          subtitleEl.textContent = '1위는 서울잠원초등학교(서초구, 39.47%)입니다. 2위는 서울신구초등학교(강남구, 38.54%)입니다.';
        } else if (this.schoolLevel === 'middle') {
          subtitleEl.textContent = '1위는 대청중학교(강남구, 29.80%)입니다. 2위는 목운중학교(양천구, 26.50%)입니다.';
        } else if (this.schoolLevel === 'high') {
          subtitleEl.textContent = '1위는 외대부고(용인, 서울대 66명)입니다. 2위는 상산고(전주, 의대 142명)입니다.';
        } else {
          subtitleEl.textContent = '대한민국 교육부 공식 공시 전국 초·중·고 12,014개 학교 순위와 특목·자사고 진학률 및 대입 실적 공시입니다.';
        }
      } else {
        const sigungus = window.DODAM_SCHOOLS_DATA?.sigunguRankings?.[this.schoolSido] || [];
        if (sigungus.length >= 2) {
          subtitleEl.textContent = `1위는 ${sigungus[0].sigungu}(${sigungus[0].avg})입니다. 2위는 ${sigungus[1].sigungu}(${sigungus[1].avg})입니다.`;
        } else if (sigungus.length === 1) {
          subtitleEl.textContent = `1위는 ${sigungus[0].sigungu}(${sigungus[0].avg})입니다.`;
        } else {
          subtitleEl.textContent = `${activeSido.name} 지역 ${levelName} 순위 및 학군 분석 공시입니다.`;
        }
      }
    }
  }

  renderSchoolSidoPills() {
    const container = document.getElementById('school-sido-pills');
    if (!container) return;
    const sidos = window.DODAM_SCHOOLS_DATA?.sidos || [];
    const levelNames = {
      all: '학교',
      elementary: '초등학교',
      middle: '중학교',
      high: '고등학교'
    };
    const lvl = levelNames[this.schoolLevel] || '초등학교';

    container.innerHTML = sidos
      .map((s) => {
        const active = this.schoolSido === s.id;
        const label = s.id === 'all' ? '전국' : `${s.name} ${lvl} 순위`;
        return `
          <button
            type="button"
            onclick="app.setSchoolSido('${s.id}')"
            class="px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition border shrink-0 ${
              active
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
            }"
          >
            ${label}
          </button>
        `;
      })
      .join('');
  }

  setSchoolSido(sidoId) {
    this.schoolSido = sidoId;
    this.schoolPage = 1;
    this.renderSchoolRichGoHeader();
    this.renderSchoolSidoPills();
    this.renderSchoolSigunguTable();
    this.renderSchoolList();
  }

  renderSchoolSigunguTable() {
    const section = document.getElementById('school-sigungu-section');
    const tableWrap = document.getElementById('school-sigungu-table-wrap');
    const titleEl = document.getElementById('school-sigungu-title');
    const subtitleEl = document.getElementById('school-sigungu-subtitle');
    const toggleBtn = document.getElementById('school-sigungu-toggle-btn');
    if (!section || !tableWrap) return;

    const sidos = window.DODAM_SCHOOLS_DATA?.sidos || [];
    const activeSido = sidos.find((s) => s.id === this.schoolSido) || { name: '전국' };
    const levelNames = {
      all: '학교',
      elementary: '초등학교',
      middle: '중학교',
      high: '고등학교'
    };
    const lvl = levelNames[this.schoolLevel] || '초등학교';

    let rawList = [];
    if (this.schoolSido === 'all') {
      rawList = window.DODAM_SCHOOLS_DATA?.sigunguRankings?.all || [];
      if (this.schoolLevel === 'middle') {
        if (titleEl) titleEl.textContent = '📊 전국 주요 시군구별 중학교 학군 순위';
        if (subtitleEl) subtitleEl.textContent = '전국 주요 학군 시군구별 특목고·자사고 평균 진학률 및 1위 학교 공시';
      } else if (this.schoolLevel === 'high') {
        if (titleEl) titleEl.textContent = '📊 전국 주요 시군구별 고등학교 학군 순위';
        if (subtitleEl) subtitleEl.textContent = '전국 주요 명문 학군 시군구별 대입(서울대·의약학) 합격 실적 및 1위 학교 공시';
      } else {
        if (titleEl) titleEl.textContent = `📊 전국 주요 시군구별 ${lvl} 학군 순위`;
        if (subtitleEl) subtitleEl.textContent = '전국 주요 학군 시군구별 평균 진학률 및 1위 학교 공시';
      }
    } else {
      rawList = window.DODAM_SCHOOLS_DATA?.sigunguRankings?.[this.schoolSido] || [];
      if (titleEl) titleEl.textContent = `📊 ${activeSido.name} 시군구별 ${lvl} 순위`;
      if (subtitleEl) subtitleEl.textContent = `${activeSido.name} 내 시군구별 평균·중앙값 진학률과 1위 학교 공시`;
    }

    // Dynamic sort by active schoolLevel
    let sigungus = rawList.map((item) => ({ ...item }));
    if (this.schoolLevel === 'middle') {
      sigungus.sort((a, b) => (b.scoreMid ?? parseFloat(b.avg || '0')) - (a.scoreMid ?? parseFloat(a.avg || '0')));
    } else if (this.schoolLevel === 'high') {
      sigungus.sort((a, b) => (b.scoreHigh ?? 0) - (a.scoreHigh ?? 0));
    } else {
      sigungus.sort((a, b) => (b.scoreElem ?? parseFloat(b.avg || '0')) - (a.scoreElem ?? parseFloat(a.avg || '0')));
    }

    // Re-assign 1..N ranks based on sorted order
    sigungus.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    if (sigungus.length === 0) {
      section.classList.add('hidden');
      return;
    }
    section.classList.remove('hidden');

    const totalRows = sigungus.length;
    const limit = this.sigunguTableExpanded ? totalRows : 10;
    const displayList = sigungus.slice(0, limit);

    if (toggleBtn) {
      if (totalRows <= 10) {
        toggleBtn.classList.add('hidden');
      } else {
        toggleBtn.classList.remove('hidden');
        toggleBtn.textContent = this.sigunguTableExpanded ? '접기' : `더보기 (전체 ${totalRows}개)`;
      }
    }

    const getTopSchool = (r) => {
      if (this.schoolLevel === 'middle') {
        return r.topSchoolMid || r.topSchool || '';
      } else if (this.schoolLevel === 'high') {
        return r.topSchoolHigh || r.topSchool || '';
      } else {
        return r.topSchoolElem || r.topSchool || '';
      }
    };

    tableWrap.innerHTML = `
      <!-- 모바일 전용 시군구 순위 리스트 (sm:hidden) -->
      <div class="sm:hidden divide-y divide-slate-100">
        ${displayList
          .map((r) => {
            const topSchool = getTopSchool(r);
            const rankBadge =
              r.rank === 1
                ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-[11px] shadow-2xs">1</span>'
                : r.rank === 2
                ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-300 text-slate-900 font-black text-[11px] shadow-2xs">2</span>'
                : r.rank === 3
                ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white font-black text-[11px] shadow-2xs">3</span>'
                : `<span class="inline-flex items-center justify-center min-w-4 font-black text-slate-500 text-[11px]">${r.rank}</span>`;
            return `
              <div class="py-2.5 px-1 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 active:bg-indigo-50/40 transition rounded-xl" onclick="app.onSigunguRowClick('${r.sigungu}')">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    ${rankBadge}
                    <span class="font-black text-slate-900 text-xs">${r.sigungu}</span>
                    <span class="text-[10px] text-slate-400 font-medium">${r.count}</span>
                  </div>
                  <div class="flex items-center gap-1 text-right">
                    <span class="text-[10px] text-slate-400 font-medium">평균</span>
                    <span class="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">${r.avg}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between text-[11px] pl-7">
                  <div class="flex items-center gap-1 text-slate-700 font-bold truncate">
                    <span class="text-amber-500 font-black text-[10px]">👑 1위</span>
                    <span class="truncate text-slate-800">${topSchool}</span>
                  </div>
                  <span class="text-slate-400 whitespace-nowrap ml-2 text-[10px]">중앙값 ${r.median}</span>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>

      <!-- 데스크톱 테이블 뷰 (hidden sm:block) -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-extrabold text-[11px]">
              <th class="py-2.5 px-3 w-14 text-center">순위</th>
              <th class="py-2.5 px-3">시군구</th>
              <th class="py-2.5 px-3 text-right">평균</th>
              <th class="py-2.5 px-3 text-right">중앙값</th>
              <th class="py-2.5 px-3 text-right">학교 수</th>
              <th class="py-2.5 px-4 text-right">1위 학교</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${displayList
              .map((r) => {
                const topSchool = getTopSchool(r);
                const rankBadge =
                  r.rank === 1
                    ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-[11px] shadow-2xs">1</span>'
                    : r.rank === 2
                    ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-300 text-slate-900 font-black text-[11px] shadow-2xs">2</span>'
                    : r.rank === 3
                    ? '<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white font-black text-[11px] shadow-2xs">3</span>'
                    : `<span class="font-extrabold text-slate-500 text-[11px]">${r.rank}</span>`;
                return `
                  <tr class="hover:bg-slate-50/80 transition cursor-pointer" onclick="app.onSigunguRowClick('${r.sigungu}')">
                    <td class="py-2.5 px-3 text-center">${rankBadge}</td>
                    <td class="py-2.5 px-3 font-black text-slate-900 hover:text-indigo-600 transition flex items-center gap-1">
                      <span>${r.sigungu}</span>
                      <i class="fa-solid fa-magnifying-glass text-[9px] text-slate-300"></i>
                    </td>
                    <td class="py-2.5 px-3 text-right font-extrabold text-indigo-700">${r.avg}</td>
                    <td class="py-2.5 px-3 text-right font-bold text-slate-600">${r.median}</td>
                    <td class="py-2.5 px-3 text-right text-slate-500 font-medium">${r.count}</td>
                    <td class="py-2.5 px-4 text-right font-bold text-slate-800 text-[11px]">${topSchool}</td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  toggleSigunguTableExpand() {
    this.sigunguTableExpanded = !this.sigunguTableExpanded;
    this.renderSchoolSigunguTable();
  }

  onSigunguRowClick(sigunguName) {
    let cleanName = sigunguName.replace(/서울 |경기 |대구 |부산 |인천 |광주 |대전 |울산 |세종 |강원 |충북 |충남 |전북 |전남 |경북 |경남 |제주 /g, '').trim();
    let searchTarget = cleanName;
    if (cleanName.includes('(')) {
      const match = cleanName.match(/\((.+?)\)/);
      if (match && match[1]) {
        searchTarget = match[1].split('·')[0].trim();
      } else {
        searchTarget = cleanName.split('(')[0].trim();
      }
    }
    this.schoolSearchKeyword = searchTarget;
    const input = document.getElementById('school-search-input');
    if (input) input.value = searchTarget;
    const clearBtn = document.getElementById('school-search-clear');
    if (clearBtn) clearBtn.classList.remove('hidden');
    this.schoolPage = 1;
    this.renderSchoolList();
    const listSec = document.getElementById('school-list-section');
    if (listSec) listSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.showToast(`'${cleanName}' 학군 학교 순위로 검색되었습니다.`);
  }

  setSchoolViewMode(mode) {
    this.schoolViewMode = mode;
    const btnTable = document.getElementById('school-view-mode-table');
    const btnCards = document.getElementById('school-view-mode-cards');
    const tableCont = document.getElementById('school-table-container');
    const cardsCont = document.getElementById('school-cards-grid');

    if (mode === 'table') {
      if (btnTable) {
        btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 bg-white text-slate-900 shadow-2xs';
      }
      if (btnCards) {
        btnCards.className = 'px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
      }
      if (tableCont) tableCont.classList.remove('hidden');
      if (cardsCont) cardsCont.classList.add('hidden');
    } else {
      if (btnTable) {
        btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900';
      }
      if (btnCards) {
        btnCards.className = 'px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 bg-white text-slate-900 shadow-2xs';
      }
      if (tableCont) tableCont.classList.add('hidden');
      if (cardsCont) cardsCont.classList.remove('hidden');
    }
    this.renderSchoolList();
  }

  renderSchoolLevelChips() {
    const container = document.getElementById('school-level-chips');
    if (!container) return;
    const levels = window.DODAM_SCHOOLS_DATA?.levels || [];
    container.innerHTML = levels
      .map((lvl) => {
        const active = this.schoolLevel === lvl.id;
        return `
          <button
            type="button"
            onclick="app.selectSchoolLevel('${lvl.id}')"
            class="px-3 py-1.5 rounded-xl font-extrabold whitespace-nowrap transition flex items-center gap-1.5 text-xs ${
              active
                ? 'bg-slate-900 text-white shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }"
          >
            <i class="fa-solid ${lvl.icon} ${active ? 'text-sky-400' : 'text-slate-400'}"></i>
            <span>${lvl.name}</span>
          </button>
        `;
      })
      .join('');
  }

  selectSchoolLevel(levelId) {
    this.schoolLevel = levelId;
    this.schoolPage = 1;
    this.renderSchoolLevelChips();
    this.renderSchoolRichGoHeader();
    this.renderSchoolSidoPills();
    this.renderSchoolSigunguTable();

    const listSec = document.getElementById('school-list-section');
    const filterBar = document.getElementById('school-filter-bar');
    const richgoHeader = document.getElementById('school-richgo-header-box');
    const sigunguSec = document.getElementById('school-sigungu-section');
    const distSec = document.getElementById('school-districts-section');
    const admSec = document.getElementById('school-admissions-section');

    if (levelId === 'districts') {
      if (listSec) listSec.classList.add('hidden');
      if (filterBar) filterBar.classList.add('hidden');
      if (richgoHeader) richgoHeader.classList.add('hidden');
      if (sigunguSec) sigunguSec.classList.add('hidden');
      if (distSec) distSec.classList.remove('hidden');
      if (admSec) admSec.classList.add('hidden');
      distSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (levelId === 'admissions') {
      if (listSec) listSec.classList.add('hidden');
      if (filterBar) filterBar.classList.add('hidden');
      if (richgoHeader) richgoHeader.classList.add('hidden');
      if (sigunguSec) sigunguSec.classList.add('hidden');
      if (distSec) distSec.classList.add('hidden');
      if (admSec) admSec.classList.remove('hidden');
      admSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      if (listSec) listSec.classList.remove('hidden');
      if (filterBar) filterBar.classList.remove('hidden');
      if (richgoHeader) richgoHeader.classList.remove('hidden');
      if (sigunguSec) sigunguSec.classList.remove('hidden');
      if (distSec) distSec.classList.toggle('hidden', levelId !== 'all');
      if (admSec) admSec.classList.toggle('hidden', levelId !== 'all');
      this.renderSchoolList();
    }
  }

  setSchoolRegionFilter(reg) {
    this.schoolRegion = reg;
    this.schoolPage = 1;
    this.renderSchoolList();
  }

  setSchoolTypeFilter(type) {
    this.schoolType = type;
    this.schoolPage = 1;
    this.renderSchoolList();
  }

  onSchoolSearch(kw) {
    this.schoolSearchKeyword = (kw || '').trim().toLowerCase();
    this.schoolPage = 1;
    const clearBtn = document.getElementById('school-search-clear');
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', !this.schoolSearchKeyword);
    }
    this.renderSchoolList();
  }

  clearSchoolSearch() {
    this.schoolSearchKeyword = '';
    this.schoolPage = 1;
    const input = document.getElementById('school-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('school-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');
    this.renderSchoolList();
  }

  filterSchools() {
    const schools = window.DODAM_SCHOOLS_DATA?.schools || [];
    return schools.filter((s) => {
      // 1. Level filter
      if (this.schoolLevel !== 'all' && this.schoolLevel !== 'districts' && this.schoolLevel !== 'admissions') {
        if (s.level !== this.schoolLevel) return false;
      }
      // 2. Sido Pill filter (리치고 17개 시도 선택 알약 연동)
      if (this.schoolSido !== 'all') {
        if (s.region !== this.schoolSido) return false;
      }
      // 3. Region dropdown filter (보조)
      if (this.schoolRegion !== 'all') {
        if (s.region !== 'all' && s.region !== this.schoolRegion) return false;
      }
      // 4. Type filter
      if (this.schoolType !== 'all') {
        const pubPriv = s.publicPrivate || '';
        const features = (s.features || []).join(' ');
        const summary = s.summary || '';
        const name = s.name || '';
        const aptNotes = (s.apartments || []).map((a) => a.note || '').join(' ');
        const isMatch =
          pubPriv.includes(this.schoolType) ||
          features.includes(this.schoolType) ||
          summary.includes(this.schoolType) ||
          name.includes(this.schoolType) ||
          (this.schoolType === '초품아' && (features.includes('초품아') || aptNotes.includes('초품아'))) ||
          (this.schoolType === '의대' && (features.includes('의대') || summary.includes('의대') || !!s.collegeResults?.medicalTotal));
        if (!isMatch) return false;
      }
      // 5. Keyword search filter
      if (this.schoolSearchKeyword) {
        const kw = this.schoolSearchKeyword;
        const aptText = (s.apartments || []).map((a) => a.name + ' ' + (a.note || '')).join(' ');
        const acadText =
          (s.academies?.mainDistrict || '') +
          ' ' +
          (s.academies?.distanceDaechi || '') +
          ' ' +
          (s.academies?.popularFields || []).join(' ');
        const text = (
          s.name +
          ' ' +
          (s.publicPrivate || '') +
          ' ' +
          (s.regionName || '') +
          ' ' +
          (s.districtName || '') +
          ' ' +
          (s.districtRank || '') +
          ' ' +
          (s.grade || '') +
          ' ' +
          (s.rankNation || '') +
          ' ' +
          (s.rankRegion || '') +
          ' ' +
          (s.summary || '') +
          ' ' +
          (s.features || []).join(' ') +
          ' ' +
          aptText +
          ' ' +
          acadText
        ).toLowerCase();
        if (!text.includes(kw)) return false;
      }
      return true;
    });
  }

  setSchoolCardTab(schoolId, tabName) {
    this.schoolCardSubTabs[schoolId] = tabName;
    this.renderSchoolList();
  }

  openSchoolGradeModal() {
    const modal = document.getElementById('school-grade-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeSchoolGradeModal() {
    const modal = document.getElementById('school-grade-modal');
    if (modal) modal.classList.add('hidden');
  }

  filterByDistrict(region, districtHint) {
    if (region && region !== 'all') {
      this.schoolRegion = region;
      const regSelect = document.getElementById('school-region-filter');
      if (regSelect) regSelect.value = region;
    }
    this.renderSchoolList();
    const grid = document.getElementById('school-cards-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.showToast(`'${districtHint || region}' 학군 정보로 정렬되었습니다.`);
  }

  renderSchoolList() {
    const grid = document.getElementById('school-cards-grid');
    const tableCont = document.getElementById('school-table-container');
    const tbody = document.getElementById('school-table-body');
    const badge = document.getElementById('school-filtered-count-badge');
    const listHeading = document.getElementById('school-list-heading');
    const paginationEl = document.getElementById('school-pagination-container');
    if (!grid && !tbody) return;

    const filtered = this.filterSchools();
    const totalCount = filtered.length;

    const levelNames = {
      all: '학교',
      elementary: '초등학교',
      middle: '중학교',
      high: '고등학교'
    };
    const lvlName = levelNames[this.schoolLevel] || '학교';
    const sidos = window.DODAM_SCHOOLS_DATA?.sidos || [];
    const activeSido = sidos.find((s) => s.id === this.schoolSido) || { name: '전국' };
    const regName = this.schoolSido === 'all' ? '전국' : activeSido.name;

    if (listHeading) {
      listHeading.textContent = `📋 ${regName} ${lvlName} 상위 순위 리스트`;
    }

    if (totalCount === 0) {
      if (badge) badge.textContent = '검색 결과 0곳';
      if (paginationEl) paginationEl.innerHTML = '';
      const mobileListEl = document.getElementById('school-mobile-list');
      if (mobileListEl) {
        mobileListEl.innerHTML = `
          <div class="text-center py-12 text-slate-500 font-bold text-xs">
            선택하신 지역/조건에 일치하는 학교 정보가 없습니다.
          </div>
        `;
      }
      if (tbody) {
        tbody.innerHTML = `
          <tr>
            <td colspan="4" class="text-center py-12 text-slate-500 font-bold">
              선택하신 지역/조건에 일치하는 학교 정보가 없습니다.
            </td>
          </tr>
        `;
      }
      if (grid) {
        grid.innerHTML = `
          <div class="col-span-1 md:col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xl mb-3">
              <i class="fa-solid fa-school-circle-xmark"></i>
            </div>
            <p class="text-sm font-bold text-slate-700">선택하신 조건에 일치하는 학교 정보가 없습니다.</p>
            <p class="text-xs text-slate-400 mt-1">검색어를 변경하시거나 지역/유형 필터를 '전체'로 설정해 보세요.</p>
            <button
              onclick="app.clearSchoolSearch(); app.setSchoolSido('all'); document.getElementById('school-type-filter').value='all'; app.setSchoolTypeFilter('all');"
              class="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition"
            >
              전체 필터 초기화
            </button>
          </div>
        `;
      }
      return;
    }

    const totalPages = Math.ceil(totalCount / this.schoolPageSize) || 1;
    if (this.schoolPage > totalPages) this.schoolPage = 1;
    if (this.schoolPage < 1) this.schoolPage = 1;

    const startIdx = (this.schoolPage - 1) * this.schoolPageSize;
    const pageSchools = filtered.slice(startIdx, startIdx + this.schoolPageSize);

    if (badge) {
      badge.textContent = `순위 ${totalCount.toLocaleString()}곳 중 ${(startIdx + 1).toLocaleString()}~${Math.min(startIdx + this.schoolPageSize, totalCount).toLocaleString()}위`;
    }

    // 1. 리치고 순위표 테이블 뷰 렌더링
    this.renderSchoolRankingTable(pageSchools, startIdx, totalCount);

    // 2. 리치고 상세 카드 그리드 뷰 렌더링
    if (grid) {
      grid.innerHTML = pageSchools
        .map((s) => {
          const isExpanded = this.expandedSchoolIds.has(s.id);
          const activeTab = this.schoolCardSubTabs[s.id] || 'nearby';

          const levelInfo = {
            elementary: { label: '초등학교', icon: 'fa-school', color: 'text-amber-600', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
            middle: { label: '중학교', icon: 'fa-book-open', color: 'text-emerald-600', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            high: { label: '고등학교', icon: 'fa-graduation-cap', color: 'text-indigo-600', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' }
          }[s.level] || { label: '학교', icon: 'fa-school', color: 'text-slate-600', bg: 'bg-slate-50 text-slate-700 border-slate-200' };

          const firstTabTitle = {
            elementary: '주변중학교',
            middle: '주변고교·진학',
            high: '대입실적'
          }[s.level] || '주변학교';

          const tabContent = this.generateSchoolSubTabContent(s, activeTab);

          return `
            <article class="community-card p-4 bg-white border border-slate-200/90 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
              <div class="space-y-2.5">
                <!-- 카드 상단 -->
                <div>
                  <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <div class="flex items-center gap-1.5">
                      <i class="fa-solid ${levelInfo.icon} ${levelInfo.color}"></i>
                      <span class="font-bold text-slate-500">${s.publicPrivate}</span>
                    </div>
                    <span class="text-[11px] text-slate-400 font-medium">
                      <i class="fa-solid fa-location-dot mr-1"></i>${s.districtName}
                    </span>
                  </div>
                  <h3 class="text-base font-black text-slate-900 flex items-center justify-between cursor-pointer group" onclick="app.openSchoolModal('${s.id}')">
                    <span class="group-hover:text-indigo-600 transition flex items-center gap-1.5">
                      <span>${s.name}</span>
                      <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-300 group-hover:text-indigo-500"></i>
                    </span>
                    <span class="text-[11px] font-bold text-slate-400 font-normal">${s.regionName}</span>
                  </h3>
                </div>

                <!-- 리치고 시그니처 뱃지 바 -->
                <div class="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-900 text-white shadow-2xs">
                    #${s.rank ? s.rank.toLocaleString() + '위' : s.districtRank}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-600 text-white shadow-2xs">
                    ${s.grade}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                    ${s.rankNation}
                  </span>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
                    ${s.rankRegion}
                  </span>
                  <button
                    type="button"
                    onclick="app.openSchoolGradeModal()"
                    class="text-[11px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition ml-auto py-1"
                  >
                    <i class="fa-solid fa-circle-info text-[10px]"></i>
                    <span>등급 기준 보기</span>
                  </button>
                </div>

                <!-- 한 줄 요약 -->
                <p class="text-xs text-slate-600 leading-relaxed pt-0.5">
                  ${s.summary}
                </p>

                <!-- 서브탭 네비게이션 바 -->
                <div class="flex items-center border-b border-slate-200 text-xs font-bold pt-1">
                  <button
                    type="button"
                    onclick="app.setSchoolCardTab('${s.id}', 'nearby')"
                    class="px-2.5 py-2 -mb-px border-b-2 transition ${
                      activeTab === 'nearby'
                        ? 'border-indigo-600 text-indigo-600 font-black'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }"
                  >
                    ${firstTabTitle}
                  </button>
                  <button
                    type="button"
                    onclick="app.setSchoolCardTab('${s.id}', 'info')"
                    class="px-2.5 py-2 -mb-px border-b-2 transition ${
                      activeTab === 'info'
                        ? 'border-indigo-600 text-indigo-600 font-black'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }"
                  >
                    기본정보
                  </button>
                  <button
                    type="button"
                    onclick="app.setSchoolCardTab('${s.id}', 'apartments')"
                    class="px-2.5 py-2 -mb-px border-b-2 transition ${
                      activeTab === 'apartments'
                        ? 'border-indigo-600 text-indigo-600 font-black'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }"
                  >
                    배정아파트
                  </button>
                  <button
                    type="button"
                    onclick="app.setSchoolCardTab('${s.id}', 'academies')"
                    class="px-2.5 py-2 -mb-px border-b-2 transition ${
                      activeTab === 'academies'
                        ? 'border-indigo-600 text-indigo-600 font-black'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }"
                  >
                    학원가
                  </button>
                </div>

                <!-- 서브탭 바디 -->
                <div class="min-h-[170px]">
                  ${tabContent}
                </div>

                <!-- 특징 태그 리스트 -->
                <div class="flex flex-wrap items-center gap-1 pt-1">
                  ${(s.features || [])
                    .map(
                      (f) => `
                    <span class="px-2 py-0.5 rounded-md bg-stone-100 text-slate-600 text-[10px] font-bold">
                      #${f}
                    </span>
                  `
                    )
                    .join('')}
                </div>
              </div>

              <!-- 카드 하단 바로가기 버튼 바 -->
              <div class="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100">
                <button
                  type="button"
                  onclick="app.openSchoolModal('${s.id}')"
                  class="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-indigo-50"
                >
                  <i class="fa-solid fa-magnifying-glass-chart text-[11px]"></i>
                  <span>상세 심층 분석창</span>
                </button>

                <div class="flex items-center gap-1.5">
                  <a
                    href="${s.schoolInfoUrl || 'https://www.schoolinfo.go.kr'}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-black text-xs hover:bg-slate-50 transition shadow-2xs"
                  >
                    <span>학교알리미</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
                  </a>
                  <a
                    href="${s.linkUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-black text-xs shadow-2xs transition"
                  >
                    <span>홈페이지</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                  </a>
                </div>
              </div>
            </article>
          `;
        })
        .join('');
    }

    // 페이지네이션 바 렌더링
    if (paginationEl) {
      paginationEl.innerHTML = this.renderSchoolPaginationHtml(totalCount, totalPages, startIdx);
    }
  }

  renderSchoolRankingTable(pageSchools, startIdx, totalCount) {
    const tbody = document.getElementById('school-table-body');
    const mobileList = document.getElementById('school-mobile-list');
    const rateHeader = document.getElementById('school-table-rate-header');
    if (!tbody && !mobileList) return;

    let rateColTitle = '가까운 중학교 과고·외고·자사고 진학률';
    let rateMobileLabel = '주변 진학률';
    if (this.schoolLevel === 'middle') {
      rateColTitle = '특목고·자사고 합산 진학률';
      rateMobileLabel = '특목·자사고';
    } else if (this.schoolLevel === 'high') {
      rateColTitle = '서울대·의약학 대입 합격 실적';
      rateMobileLabel = '대입 실적';
    }
    if (rateHeader) rateHeader.textContent = rateColTitle;

    const getRateInfo = (s) => {
      if (s.level === 'elementary') {
        const rateVal = s.rate || '30.00%';
        return {
          desktop: `<span class="font-black text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">${rateVal}</span>`,
          mobile: `<span class="font-black text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">${rateVal}</span>`
        };
      } else if (s.level === 'middle') {
        const rateVal = s.admissionRates?.totalSpecial || s.rate || '25.00%';
        return {
          desktop: `<span class="font-black text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">${rateVal}</span>`,
          mobile: `<span class="font-black text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">${rateVal}</span>`
        };
      } else {
        const snu = s.collegeResults?.snuTotal || '10명';
        const med = s.collegeResults?.medicalTotal || '15명';
        return {
          desktop: `
            <div class="inline-flex items-center gap-1.5 justify-end text-[11px]">
              <span class="font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">서울대 ${snu}</span>
              <span class="font-extrabold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">의대 ${med}</span>
            </div>
          `,
          mobile: `
            <div class="flex flex-col items-end gap-0.5 text-[10px]">
              <span class="font-extrabold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">서울대 ${snu}</span>
              <span class="font-extrabold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">의대 ${med}</span>
            </div>
          `
        };
      }
    };

    // 1. 모바일 전용 순위 리스트 렌더링 (< sm)
    if (mobileList) {
      mobileList.innerHTML = pageSchools
        .map((s) => {
          const rank = s.rank || 1;
          const rankBadge =
            rank === 1
              ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-black text-xs shadow-2xs">1</span>'
              : rank === 2
              ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs shadow-2xs">2</span>'
              : rank === 3
              ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs shadow-2xs">3</span>'
              : `<span class="inline-flex items-center justify-center min-w-5 font-black text-slate-500 text-xs">${rank.toLocaleString()}</span>`;

          const rateInfo = getRateInfo(s);

          return `
            <div class="p-3.5 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-slate-50 active:bg-indigo-50/40 transition group" onclick="app.openSchoolModal('${s.id}')">
              <div class="flex items-start gap-2.5 min-w-0 flex-1">
                <div class="pt-0.5 shrink-0">
                  ${rankBadge}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-black text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition truncate">${s.name}</span>
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${s.publicPrivate === '사립' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}">${s.publicPrivate}</span>
                    <span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-extrabold">${s.grade}</span>
                  </div>
                  <div class="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500 font-medium">
                    <span class="truncate"><i class="fa-solid fa-location-dot text-slate-400 mr-1 text-[10px]"></i>${s.districtName}</span>
                    <span class="text-slate-300">·</span>
                    <span class="text-slate-400 whitespace-nowrap text-[10px]">${s.rankNation || ''}</span>
                  </div>
                </div>
              </div>
              <div class="shrink-0 text-right pl-1">
                ${rateInfo.mobile}
                <div class="text-[10px] text-slate-400 mt-0.5 font-semibold">${rateMobileLabel}</div>
              </div>
            </div>
          `;
        })
        .join('');
    }

    // 2. 데스크톱 테이블 뷰 렌더링 (>= sm)
    if (tbody) {
      tbody.innerHTML = pageSchools
        .map((s) => {
          const rank = s.rank || 1;
          const rankBadge =
            rank === 1
              ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-black text-xs shadow-2xs">1</span>'
              : rank === 2
              ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs shadow-2xs">2</span>'
              : rank === 3
              ? '<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs shadow-2xs">3</span>'
              : `<span class="font-extrabold text-slate-500 text-xs">${rank.toLocaleString()}</span>`;

          const rateInfo = getRateInfo(s);

          return `
            <tr class="hover:bg-indigo-50/40 transition cursor-pointer group" onclick="app.openSchoolModal('${s.id}')">
              <td class="py-3 px-3 text-center">${rankBadge}</td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-black text-slate-900 group-hover:text-indigo-600 text-xs transition flex items-center gap-1">
                    <span>${s.name}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-300 group-hover:text-indigo-500 transition"></i>
                  </span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${s.publicPrivate === '사립' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}">${s.publicPrivate}</span>
                  <span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-extrabold">${s.grade}</span>
                </div>
              </td>
              <td class="py-3 px-4 text-xs font-bold text-slate-600 whitespace-nowrap">
                <i class="fa-solid fa-location-dot text-[10px] text-slate-400 mr-1"></i>${s.districtName}
              </td>
              <td class="py-3 px-4 text-right whitespace-nowrap">
                <div class="inline-flex items-center gap-1.5 justify-end">
                  ${rateInfo.desktop}
                </div>
              </td>
            </tr>
          `;
        })
        .join('');
    }
  }

  generateSchoolSubTabContent(s, activeTab) {
    if (activeTab === 'nearby') {
      if (s.level === 'elementary') {
        const nearbyRows = (s.nearbyMiddle || [])
          .map((m) => `
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-indigo-50/30 transition border border-slate-100 text-xs">
              <div class="w-5/12 min-w-0 pr-1">
                <div class="font-black text-slate-800 truncate">${m.name}</div>
                <div class="text-[10px] text-slate-400 font-medium">${m.type}</div>
              </div>
              <div class="w-5/12 flex items-center justify-center gap-1 flex-wrap">
                ${(m.rates || [])
                  .map((r) => {
                    const badgeStyle = r.type.includes('자사')
                      ? 'bg-indigo-100 text-indigo-700'
                      : r.type.includes('과학')
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700';
                    return `<span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-extrabold ${badgeStyle}">
                      <strong class="font-black">${r.type[0]}</strong> ${r.type} ${r.percent}
                    </span>`;
                  })
                  .join('')}
              </div>
              <div class="w-2/12 text-right">
                <span class="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-black text-[11px] shadow-2xs">${m.grade}</span>
              </div>
            </div>
          `)
          .join('');

        return `
          <div class="space-y-2.5 pt-3">
            <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-400 px-2 pb-0.5 border-b border-slate-100">
              <span class="w-5/12">주변중학교</span>
              <span class="w-5/12 text-center">특목·자사고 진학률</span>
              <span class="w-2/12 text-right">등급</span>
            </div>
            <div class="space-y-1.5">
              ${nearbyRows || '<p class="text-xs text-slate-400 py-3 text-center">주변 중학교 정보 준비 중입니다.</p>'}
            </div>
          </div>
        `;
      } else if (s.level === 'middle') {
        const nearbyHighRows = (s.nearbyHigh || [])
          .map((h) => `
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-emerald-50/30 transition border border-slate-100 text-xs">
              <div class="w-5/12 min-w-0 pr-1">
                <div class="font-black text-slate-800 truncate">${h.name}</div>
                <div class="text-[10px] text-slate-400 font-medium">${h.type}</div>
              </div>
              <div class="w-5/12 text-center">
                <span class="inline-block px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-extrabold">
                  ${h.rate || '상위 진학'}
                </span>
              </div>
              <div class="w-2/12 text-right">
                <span class="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-black text-[11px] shadow-2xs">${h.grade}</span>
              </div>
            </div>
          `)
          .join('');

        return `
          <div class="space-y-2.5 pt-3">
            ${
              s.admissionRates
                ? `
              <div class="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-100 text-xs space-y-1">
                <div class="flex items-center justify-between font-black text-emerald-900 text-[11px]">
                  <span>🏆 특목·자사고 합산 진학률</span>
                  <strong class="text-emerald-700 font-black">${s.admissionRates.totalSpecial}</strong>
                </div>
                <div class="flex items-center gap-1.5 text-[10px] text-slate-600 flex-wrap pt-0.5">
                  <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200">${s.admissionRates.privateHigh}</span>
                  <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200">${s.admissionRates.scienceHigh}</span>
                  <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200">${s.admissionRates.foreignHigh}</span>
                </div>
              </div>
            `
                : ''
            }
            <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-400 px-2 pb-0.5 border-b border-slate-100">
              <span class="w-5/12">진학 고등학교</span>
              <span class="w-5/12 text-center">진학 규모</span>
              <span class="w-2/12 text-right">등급</span>
            </div>
            <div class="space-y-1.5">
              ${nearbyHighRows || '<p class="text-xs text-slate-400 py-3 text-center">진학 고등학교 정보 준비 중입니다.</p>'}
            </div>
          </div>
        `;
      } else {
        return `
          <div class="space-y-2.5 pt-3">
            <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/50 border border-indigo-100 text-xs space-y-2.5">
              <div class="flex items-center justify-between font-black text-indigo-950 text-xs">
                <span>🎓 2024~2025학년도 최상위 대입 합격 실적</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold shadow-2xs">학교알리미 공시</span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <div class="text-[10px] text-slate-500 font-bold">서울대 합격</div>
                  <div class="text-sm font-black text-indigo-600 mt-0.5">${s.collegeResults?.snuTotal || '18명'}</div>
                </div>
                <div class="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <div class="text-[10px] text-slate-500 font-bold">의·치·한·약</div>
                  <div class="text-sm font-black text-rose-600 mt-0.5">${s.collegeResults?.medicalTotal || '24명'}</div>
                </div>
                <div class="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-2xs">
                  <div class="text-[10px] text-slate-500 font-bold">연세대·고려대</div>
                  <div class="text-sm font-black text-slate-900 mt-0.5">${s.collegeResults?.skyTotal || '58명'}</div>
                </div>
              </div>
              ${
                s.collegeResults?.foreignTotal
                  ? `
                <div class="text-[11px] text-indigo-800 font-semibold bg-white/80 p-2 rounded-lg border border-indigo-50">
                  📌 <strong>특화 진학:</strong> ${s.collegeResults.foreignTotal}
                </div>
              `
                  : ''
              }
            </div>
          </div>
        `;
      }
    }

    if (activeTab === 'info') {
      const stats = s.stats || {};
      const benchC = stats.benchClass || { school: 23, district: 22, nation: 20 };
      const benchT = stats.benchTeacher || { school: 18, district: 16, nation: 14 };

      const isElem = s.level === 'elementary';
      const thirdTitle = isElem ? '고학년 비율' : '학업 성취도';
      const thirdUnit = '%';
      const bench3 = isElem
        ? stats.benchSenior || { school: 51, district: 49, nation: 47 }
        : stats.benchAchievement || { school: 92, district: 83, nation: 78 };

      const calcBarH = (val, maxVal) => {
        const ratio = Math.min(1, Math.max(0.18, (val || 0) / (maxVal || 1)));
        return Math.round(ratio * 42) + 8;
      };

      const cMax = Math.max(benchC.school, benchC.district, benchC.nation, 1);
      const tMax = Math.max(benchT.school, benchT.district, benchT.nation, 1);
      const sMax = Math.max(bench3.school, bench3.district, bench3.nation, 1);

      return `
        <div class="space-y-3 pt-3">
          <div class="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
            <!-- 학급당 학생 수 -->
            <div class="flex flex-col items-center justify-between text-center">
              <div class="text-[11px] font-black text-slate-600 mb-1">학급당 학생 수</div>
              <div class="flex items-end justify-center gap-2 h-24 w-full pb-1">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-black text-indigo-700 leading-none">${benchC.school}명</span>
                  <div style="height: ${calcBarH(benchC.school, cMax)}px" class="w-4 rounded-t-md bg-indigo-600 shadow-2xs"></div>
                  <span class="text-[10px] font-black text-indigo-800">학교</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-bold text-slate-600 leading-none">${benchC.district}</span>
                  <div style="height: ${calcBarH(benchC.district, cMax)}px" class="w-4 rounded-t-md bg-slate-400"></div>
                  <span class="text-[10px] font-bold text-slate-500">지역</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-medium text-slate-400 leading-none">${benchC.nation}</span>
                  <div style="height: ${calcBarH(benchC.nation, cMax)}px" class="w-4 rounded-t-md bg-slate-300"></div>
                  <span class="text-[10px] font-medium text-slate-400">전국</span>
                </div>
              </div>
            </div>

            <!-- 교사당 학생 수 -->
            <div class="flex flex-col items-center justify-between text-center border-x border-slate-200/80 px-1">
              <div class="text-[11px] font-black text-slate-600 mb-1">교사당 학생 수</div>
              <div class="flex items-end justify-center gap-2 h-24 w-full pb-1">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-black text-indigo-700 leading-none">${benchT.school}명</span>
                  <div style="height: ${calcBarH(benchT.school, tMax)}px" class="w-4 rounded-t-md bg-indigo-600 shadow-2xs"></div>
                  <span class="text-[10px] font-black text-indigo-800">학교</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-bold text-slate-600 leading-none">${benchT.district}</span>
                  <div style="height: ${calcBarH(benchT.district, tMax)}px" class="w-4 rounded-t-md bg-slate-400"></div>
                  <span class="text-[10px] font-bold text-slate-500">지역</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-medium text-slate-400 leading-none">${benchT.nation}</span>
                  <div style="height: ${calcBarH(benchT.nation, tMax)}px" class="w-4 rounded-t-md bg-slate-300"></div>
                  <span class="text-[10px] font-medium text-slate-400">전국</span>
                </div>
              </div>
            </div>

            <!-- 고학년 비율 / 학업 성취도 -->
            <div class="flex flex-col items-center justify-between text-center">
              <div class="text-[11px] font-black text-slate-600 mb-1">${thirdTitle}</div>
              <div class="flex items-end justify-center gap-2 h-24 w-full pb-1">
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-black text-indigo-700 leading-none">${bench3.school}${thirdUnit}</span>
                  <div style="height: ${calcBarH(bench3.school, sMax)}px" class="w-4 rounded-t-md bg-indigo-600 shadow-2xs"></div>
                  <span class="text-[10px] font-black text-indigo-800">학교</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-bold text-slate-600 leading-none">${bench3.district}${thirdUnit}</span>
                  <div style="height: ${calcBarH(bench3.district, sMax)}px" class="w-4 rounded-t-md bg-slate-400"></div>
                  <span class="text-[10px] font-bold text-slate-500">지역</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <span class="text-[10px] font-medium text-slate-400 leading-none">${bench3.nation}${thirdUnit}</span>
                  <div style="height: ${calcBarH(bench3.nation, sMax)}px" class="w-4 rounded-t-md bg-slate-300"></div>
                  <span class="text-[10px] font-medium text-slate-400">전국</span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-slate-500">전체 학생 수:</span>
              <span class="font-black text-slate-800">${(stats.totalStudents || 0).toLocaleString()}명</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-slate-500">설립 형태:</span>
              <span class="font-bold text-slate-700">${s.publicPrivate}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-slate-500">소재지 관할:</span>
              <span class="font-bold text-slate-700">${s.districtName}</span>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'apartments') {
      const aptRows = (s.apartments || [])
        .map(
          (a) => `
          <div class="p-2.5 rounded-xl bg-slate-50/90 hover:bg-indigo-50/40 transition border border-slate-100 flex items-center justify-between text-xs">
            <div class="min-w-0 pr-2">
              <div class="font-black text-slate-900 truncate flex items-center gap-1.5">
                <i class="fa-solid fa-building text-indigo-500 text-[10px]"></i>
                <span>${a.name}</span>
              </div>
              <div class="text-[10px] text-slate-500 mt-0.5 pl-4">${a.note}</div>
            </div>
            <span class="px-2 py-1 rounded-lg bg-white border border-slate-200 font-black text-slate-700 text-[11px] shrink-0 shadow-2xs">
              ${a.households}
            </span>
          </div>
        `
        )
        .join('');

      return `
        <div class="space-y-2 pt-3">
          <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-500 px-1 pb-1">
            <span class="flex items-center gap-1">
              <i class="fa-solid fa-map-pin text-indigo-500"></i>
              <span>배정 주요 아파트 단지 & 통학권</span>
            </span>
            <span class="text-[10px] text-slate-400">총 ${(s.apartments || []).length}개 단지 공시</span>
          </div>
          <div class="space-y-1.5">
            ${aptRows || '<p class="text-xs text-slate-400 py-3 text-center">배정 아파트 단지 정보 준비 중입니다.</p>'}
          </div>
        </div>
      `;
    }

    if (activeTab === 'academies') {
      const popularBadges = (s.academies?.popularFields || [])
        .map(
          (p) => `
          <span class="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 text-[10px] font-bold">
            #${p}
          </span>
        `
        )
        .join('');

      return `
        <div class="space-y-2.5 pt-3 text-xs">
          <div class="p-3 rounded-xl bg-gradient-to-r from-amber-50/70 via-orange-50/40 to-white border border-amber-100 space-y-2">
            <div class="font-black text-amber-950 flex items-center gap-1.5">
              <i class="fa-solid fa-graduation-cap text-amber-600"></i>
              <span>인근 학원가 밀집도 및 셔틀 연계</span>
            </div>
            <div class="space-y-1.5 text-[11px]">
              <div class="flex items-start gap-1.5">
                <span class="font-extrabold text-slate-700 shrink-0">📍 주요 학원가:</span>
                <span class="text-slate-900 font-bold">${s.academies?.mainDistrict || '인근 학원가 밀집'}</span>
              </div>
              <div class="flex items-start gap-1.5">
                <span class="font-extrabold text-slate-700 shrink-0">🚌 대치동 접근성:</span>
                <span class="text-slate-900 font-bold">${s.academies?.distanceDaechi || '대치동 셔틀 운행'}</span>
              </div>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-[10px] font-extrabold text-slate-400 px-1">주요 인기 학원 및 선호 과목</div>
            <div class="flex flex-wrap gap-1">
              ${popularBadges}
            </div>
          </div>
        </div>
      `;
    }
    return '';
  }

  // ==========================================
  // 리치고 학교 상세 심층 모달 컨트롤러
  // ==========================================
  openSchoolModal(schoolId) {
    const schools = window.DODAM_SCHOOLS_DATA?.schools || [];
    const school = schools.find((s) => String(s.id) === String(schoolId));
    if (!school) return;

    this.activeModalSchoolId = schoolId;
    this.modalSubTab = 'nearby';

    const modal = document.getElementById('school-detail-modal');
    if (!modal) return;

    this.renderSchoolModalContent(school);
    modal.classList.remove('hidden');
  }

  closeSchoolModal() {
    const modal = document.getElementById('school-detail-modal');
    if (modal) modal.classList.add('hidden');
    this.activeModalSchoolId = null;
  }

  setModalSchoolTab(tabName) {
    this.modalSubTab = tabName;
    const schools = window.DODAM_SCHOOLS_DATA?.schools || [];
    const school = schools.find((s) => String(s.id) === String(this.activeModalSchoolId));
    if (school) {
      this.renderSchoolModalContent(school);
    }
  }

  renderSchoolModalContent(school) {
    const headerEl = document.getElementById('school-modal-header');
    const subtabsEl = document.getElementById('school-modal-subtabs');
    const bodyEl = document.getElementById('school-modal-body');
    const linksEl = document.getElementById('school-modal-links');
    if (!headerEl || !subtabsEl || !bodyEl) return;

    const levelInfo = {
      elementary: { label: '초등학교', icon: 'fa-school', color: 'text-amber-600' },
      middle: { label: '중학교', icon: 'fa-book-open', color: 'text-emerald-600' },
      high: { label: '고등학교', icon: 'fa-graduation-cap', color: 'text-indigo-600' }
    }[school.level] || { label: '학교', icon: 'fa-school', color: 'text-slate-600' };

    const firstTabTitle = {
      elementary: '주변중학교',
      middle: '주변고교·진학',
      high: '대입실적'
    }[school.level] || '주변학교';

    // 1. 헤더 렌더링
    headerEl.innerHTML = `
      <div class="flex items-center gap-1.5 text-xs text-slate-400">
        <i class="fa-solid ${levelInfo.icon} ${levelInfo.color}"></i>
        <span class="font-bold text-slate-600">${school.publicPrivate} ${levelInfo.label}</span>
        <span class="text-slate-300">·</span>
        <span>${school.districtName}</span>
      </div>
      <h2 class="text-xl font-black text-slate-900 mt-1">${school.name}</h2>
      <div class="flex items-center gap-1.5 flex-wrap pt-1">
        <span class="px-2.5 py-0.5 rounded-lg text-xs font-black bg-slate-900 text-white shadow-2xs">
          전국 #${school.rank ? school.rank.toLocaleString() + '위' : school.districtRank}
        </span>
        <span class="px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-600 text-white shadow-2xs">
          학군 ${school.grade}
        </span>
        <span class="px-2.5 py-0.5 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
          ${school.rankNation}
        </span>
        <span class="px-2.5 py-0.5 rounded-lg text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
          ${school.rankRegion}
        </span>
      </div>
      <p class="text-xs text-slate-600 mt-1 leading-relaxed">${school.summary}</p>
    `;

    // 2. 서브탭 바 렌더링
    const tabs = [
      { id: 'nearby', label: firstTabTitle },
      { id: 'info', label: '기본정보 (3단 바차트)' },
      { id: 'apartments', label: '배정아파트' },
      { id: 'academies', label: '학원가' }
    ];

    subtabsEl.innerHTML = tabs
      .map((t) => {
        const active = this.modalSubTab === t.id;
        return `
          <button
            type="button"
            onclick="app.setModalSchoolTab('${t.id}')"
            class="px-3 py-2.5 -mb-px border-b-2 transition ${
              active
                ? 'border-indigo-600 text-indigo-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }"
          >
            ${t.label}
          </button>
        `;
      })
      .join('');

    // 3. 서브탭 본문 렌더링
    bodyEl.innerHTML = this.generateSchoolSubTabContent(school, this.modalSubTab);

    // 4. 하단 외부 바로가기 링크 렌더링
    if (linksEl) {
      linksEl.innerHTML = `
        <a
          href="${school.schoolInfoUrl || 'https://www.schoolinfo.go.kr'}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-black text-xs hover:bg-slate-50 transition shadow-2xs"
        >
          <span>학교알리미 공시</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
        </a>
        <a
          href="${school.linkUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-xs shadow-2xs transition"
        >
          <span>학교 공식 홈페이지</span>
          <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
        </a>
      `;
    }
  }

  renderSchoolPaginationHtml(totalCount, totalPages, startIdx) {
    if (totalCount <= this.schoolPageSize && this.schoolPage === 1) {
      return '';
    }

    const maxVisibleButtons = 5;
    let startPage = Math.max(1, this.schoolPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    const pageButtons = [];
    if (startPage > 1) {
      pageButtons.push(`
        <button onclick="app.setSchoolPage(1)" class="w-8 h-8 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 text-slate-700 transition">1</button>
      `);
      if (startPage > 2) {
        pageButtons.push(`<span class="px-1 text-slate-300 text-xs">...</span>`);
      }
    }

    for (let p = startPage; p <= endPage; p++) {
      const isCurrent = p === this.schoolPage;
      pageButtons.push(`
        <button
          onclick="app.setSchoolPage(${p})"
          class="w-8 h-8 rounded-xl text-xs font-black transition ${
            isCurrent
              ? 'bg-indigo-600 text-white shadow-2xs'
              : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
          }"
        >${p}</button>
      `);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(`<span class="px-1 text-slate-300 text-xs">...</span>`);
      }
      pageButtons.push(`
        <button onclick="app.setSchoolPage(${totalPages})" class="px-2.5 h-8 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50 text-slate-700 transition">${totalPages}</button>
      `);
    }

    const hasMore = startIdx + this.schoolPageSize < totalCount;

    return `
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
        <div class="text-xs text-slate-500 font-bold text-center sm:text-left">
          전체 <strong class="text-slate-900 font-black">${totalCount.toLocaleString()}</strong>개 순위 중 
          <span class="text-indigo-600 font-black">${(startIdx + 1).toLocaleString()} ~ ${Math.min(startIdx + this.schoolPageSize, totalCount).toLocaleString()}위</span> 
          (페이지 <strong class="text-slate-900">${this.schoolPage}</strong> / ${totalPages})
        </div>

        <div class="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            onclick="app.setSchoolPage(${this.schoolPage - 1})"
            ${this.schoolPage <= 1 ? 'disabled' : ''}
            class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold transition flex items-center gap-1 ${
              this.schoolPage <= 1
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-50'
                : 'hover:bg-slate-50 text-slate-700'
            }"
          >
            <i class="fa-solid fa-chevron-left text-[10px]"></i>
            <span>이전</span>
          </button>

          ${pageButtons.join('')}

          <button
            onclick="app.setSchoolPage(${this.schoolPage + 1})"
            ${this.schoolPage >= totalPages ? 'disabled' : ''}
            class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold transition flex items-center gap-1 ${
              this.schoolPage >= totalPages
                ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-50'
                : 'hover:bg-slate-50 text-slate-700'
            }"
          >
            <span>다음</span>
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>

          ${
            hasMore
              ? `
            <button
              onclick="app.loadMoreSchools()"
              class="ml-1 sm:ml-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-black text-xs transition flex items-center gap-1 shadow-2xs"
            >
              <span>+20개 더보기</span>
            </button>
          `
              : ''
          }
        </div>
      </div>
    `;
  }

  setSchoolPage(page) {
    this.schoolPage = Math.max(1, page);
    this.renderSchoolList();
    const section = document.getElementById('school-list-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  loadMoreSchools() {
    this.schoolPageSize += 20;
    this.renderSchoolList();
  }

  toggleSchoolDetail(schoolId) {
    if (this.expandedSchoolIds.has(schoolId)) {
      this.expandedSchoolIds.delete(schoolId);
    } else {
      this.expandedSchoolIds.add(schoolId);
    }
    this.renderSchoolList();
  }

  renderSchoolDistricts() {
    const container = document.getElementById('school-districts-grid');
    if (!container) return;
    const districts = window.DODAM_SCHOOLS_DATA?.districts || [];
    container.innerHTML = districts
      .map(
        (d) => `
        <div class="community-card p-4 bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div class="flex items-center justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-full font-black text-[10px] bg-rose-50 text-rose-600 border border-rose-200">
                  ${d.tag}
                </span>
                <span class="text-xs text-slate-400 font-bold">${d.regionName}</span>
              </div>
              <h4 class="text-sm font-black text-slate-900 mt-1">${d.name}</h4>
            </div>
          </div>

          <p class="text-xs text-slate-700 leading-relaxed">${d.analysis}</p>

          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
            <div class="text-[11px] text-slate-600"><strong class="text-slate-900">📍 핵심 학원가:</strong> ${d.hotSpots}</div>
            <div class="text-[11px] text-slate-600"><strong class="text-slate-900">🎓 초·중·고 테크트리:</strong> ${d.feederLine}</div>
            <div class="text-[11px] text-emerald-700 font-bold pt-1 border-t border-slate-200/60"><i class="fa-solid fa-lightbulb mr-1"></i>진입 팁: ${d.tips}</div>
          </div>
        </div>
      `
      )
      .join('');
  }

  renderSchoolAdmissions() {
    const container = document.getElementById('school-admissions-grid');
    if (!container) return;
    const admissions = window.DODAM_SCHOOLS_DATA?.admissions || [];
    container.innerHTML = admissions
      .map(
        (a) => `
        <div class="community-card p-4 bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div class="flex items-center justify-between gap-2">
            <span class="px-2 py-0.5 rounded-full font-black text-[10px] bg-blue-50 text-blue-700 border border-blue-200">
              ${a.category}
            </span>
            <span class="px-2 py-0.5 rounded-full font-black text-[10px] bg-slate-900 text-white">
              ${a.badge}
            </span>
          </div>

          <div>
            <h4 class="text-sm font-black text-slate-900">${a.title}</h4>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">${a.summary}</p>
          </div>

          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
            <div class="font-extrabold text-[11px] text-slate-900 flex items-center gap-1.5">
              <i class="fa-solid fa-check-circle text-blue-600"></i>
              <span>핵심 대비 포인트</span>
            </div>
            <ul class="space-y-1 text-[11px] text-slate-600 pl-1">
              ${(a.points || []).map((pt) => `<li class="flex items-start gap-1.5"><span class="text-blue-500 font-bold">•</span><span>${pt}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      `
      )
      .join('');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new DodamCommunityApp();
  window.app.init();
});
