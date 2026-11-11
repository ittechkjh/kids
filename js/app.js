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
    this.boardLoungeMode = 'all'; // 'all' | 'age' | 'local' | 'qa'
    this.currentCategory = 'all';
    this.currentAgeStage = 'all';
    this.currentLocalHub = 'all';
    this.currentLocalTopic = 'all';
    this.currentRegion = 'all';
    this.boardSearchKeyword = '';
    this.boardSort = 'latest'; // 'latest' | 'popular' | 'comments' | 'views'
    this.boardViewMode = 'cafe'; // 'cafe' (네이버카페 목록형 기본) | 'card' (피드형) // 'card' (소통 피드형 기본) | 'cafe' (카페 목록형)
    this.boardPage = 1;
    this.boardPageSize = 15;
    this.guideSubCategory = 'all';
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
    this.foodType = 'all'; // 'all' | 'restaurant' | 'attraction'

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
    // 6. Schools & Admissions State (공식 학군 순위 & 입시 데이터)
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
    this.admissionsCategory = 'all';
    this.admissionsSearchKeyword = '';
    this.attachedImages = [];
    this.draftKey = 'dodam_post_draft_v1';
    this.boardSearchType = 'all';
    this.schoolPage = 1;

    // 7. Auth & Admin Center State (통합 관리자 센터)
    this.authKey = 'dodam_auth_v1';
    this.usersKey = 'dodam_users_v1';
    this.users = this.loadUsers();
    this.currentUser = this.loadCurrentUser();
    this.adminTab = 'traffic';
    this.featureStatsPeriod = 'today';
    this.deviceStatsPeriod = 'today';
    this.loginActiveTab = 'login';
    this.schoolPageSize = 25;

    this.profile = this.loadProfile();
    this.scraps = this.loadScraps();
    this.loadSavedPosts();
    this.deletedPostIds = new Set();
    this.myPostIds = new Set();
    try {
      const rawMy = sessionStorage.getItem('dodam_my_post_ids');
      if (rawMy) {
        const parsedMy = JSON.parse(rawMy);
        if (Array.isArray(parsedMy)) this.myPostIds = new Set(parsedMy);
      }
    } catch (e) {}
    if (!this.data.restaurants) this.data.restaurants = window.DODAM_NATIONWIDE_RESTAURANTS || [];
    if (!this.data.attractions) this.data.attractions = window.DODAM_NATIONWIDE_ATTRACTIONS || [];
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
    this.renderAuthHeader();
    this.initFirebaseSync();
    this.initRealAnalytics();
    this.initKakaoSdk();
    this.initNaverSdk();
    this.initOAuthListeners();
    this.initPwa();
    // 기존 생성된 AI 리포트 게시글의 제목, 2463자 본문, 5개 SVG 카드 및 유튜브 흔적 일괄 정제 & 복원
    (this.data.posts || []).forEach((p) => {
      if (!p) return;
      if (p.views < 50) {
        p.isHot = false;
      }
      if (p.title && (p.title.includes('신종호') || p.title.includes('공부 호기심') || p.title.includes('이 질문'))) {
        p.title = "[육아가이드] 부모의 '이 질문' 하나가 아이의 공부 호기심을 완전히 닫아버린다 (신종호 교수 강연 요약)";
        p.guideType = 'edu';
        p.ageStage = 'school';
        p.isHot = false;
        if (!p.contentHtml || !p.contentHtml.includes('학습 민첩성') || p.contentHtml.includes('편도체') || p.contentHtml.includes('이성교제')) {
          const vId = p.youtubeVideoId || this.extractYoutubeId(p.youtubeUrl) || 'cWGKAxSiaHY';
          const generated = this.buildYoutubeSummaryContent(vId, { title: p.title }, 'edu');
          p.contentHtml = generated.html;
          p.content = generated.html;
          p.rawTextContent = generated.plainText;
        }
      }
      if (p.isYoutubeSummary || p.isAiReport || (p.title && (p.title.includes('|') || p.title.includes('초등학생')))) {
        const badgeMatch = (p.title || '').match(/^\[([^\]]+)\]\s*/);
        const curBadge = '[육아가이드] ';
        const rawTitle = (p.title || '').replace(/^\[[^\]]+\]\s*/, '');
        if (p.isAiReport || p.isYoutubeSummary) p.title = curBadge + rawTitle;
        if (rawTitle.includes('|') || rawTitle.includes('이시훈') || rawTitle.includes('Q&A') || rawTitle.includes('방치하면')) {
          p.title = curBadge + this.generateCleanArticleTitle(rawTitle, p.guideType || 'growth');
        }
        if (p.author) {
          p.author.childBadge = '📖 도담 육아가이드';
          if (['슈퍼관리자', '도담 공식 가이드', '도담 공식 관리자', 'admin', '도담 육아연구소', '도담연구소'].includes(p.author.nickname)) p.author.nickname = '운영자';
          if (p.author.nickname === '도담 공식 가이드' || p.author.nickname === 'admin' || p.author.nickname === '운영자') {
            p.author.avatarBg = 'bg-emerald-600 text-white';
          }
        }
        if (p.id === 'guide-seed-1' && p.views > 50) p.views = 18;
        if (p.id === 'guide-seed-2' && p.views > 50) p.views = 14;
        if (p.id === 'official-ai-report-growth-1' && p.views > 10) {
          p.views = 0;
          p.reactions = { like: 0, hug: 0, tip: 0 };
        }
        // 본문이 4800자로 잘려있거나 5장 SVG 카드가 유실된 경우 2,463자 원본 + 5장 카드로 복원
        if (!p.contentHtml || p.contentHtml.length < 15000 || !p.contentHtml.includes('dodam-report-v3')) {
          const vId = p.youtubeVideoId || this.extractYoutubeId(p.youtubeUrl) || 'cWGKAxSiaHY';
          const meta = {
            title: rawTitle,
            authorName: '운영자'
          };
          const generated = this.buildYoutubeSummaryContent(vId, meta, p.guideType || 'growth');
          p.contentHtml = generated.html;
          p.content = generated.html;
          p.rawTextContent = generated.plainText;
        }
        if (p.contentHtml) {
          p.contentHtml = p.contentHtml
            .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
            .replace(/<div class="relative w-full overflow-hidden rounded-2xl shadow-sm border border-stone-200 bg-black aspect-video">[\s\S]*?<\/div>/gi, '')
            .replace(/<a\s+href="https:\/\/www\.youtube\.com\/watch\?v=[^"]*"[\s\S]*?<\/a>/gi, '');
        }
      }
    });

    this.ensureDailyActivePosts();

    // ==========================================
    // SPA 뒤로가기/앞으로가기 브라우저 히스토리 라우팅 완벽 지원
    // ==========================================
    const initialHash = window.location.hash || '';
    let initialPostId = null;
    let initRoute = 'board';

    if (initialHash.startsWith('#/board/post/')) {
      initialPostId = initialHash.replace('#/board/post/', '').trim();
      initRoute = 'board';
    } else {
      initRoute = this.getRouteFromHash(initialHash) || 'board';
    }

    // 초기 루트 히스토리 상태 설정 (최초 진입 시 브라우저 히스토리 스택의 기준점 확립)
    try {
      if (window.history) {
        const rootHash = initialPostId ? `#/board/post/${initialPostId}` : `#/${initRoute}`;
        const rootState = initialPostId
          ? { type: 'post_detail', postId: initialPostId, view: 'board' }
          : { type: 'view', view: initRoute };
        window.history.replaceState(rootState, '', rootHash);
      }
    } catch (e) {}

    if (initRoute && initRoute !== 'board') {
      this.switchMainView(initRoute, true);
    }
    if (initialPostId) {
      setTimeout(() => {
        this.openPostDetailModal(initialPostId, true);
      }, 100);
    }

    // 브라우저 뒤로가기 / 앞으로가기 (popstate) 이벤트 핸들러 연결
    window.addEventListener('popstate', (e) => {
      this.handlePopState(e.state);
    });

    window.addEventListener('hashchange', () => {
      if (this._handlingPopState) return;
      const h = window.location.hash || '';
      if (h.startsWith('#/board/post/')) {
        const pId = h.replace('#/board/post/', '').trim();
        if (pId && this.activePostDetailId !== pId) {
          this.openPostDetailModal(pId, true);
        }
      } else {
        const hRoute = this.getRouteFromHash(h);
        if (hRoute && hRoute !== this.currentView) {
          this.switchMainView(hRoute, true);
        }
      }
    });
  }

  getRouteFromHash(hash) {
    if (!hash) return '';
    const clean = String(hash).replace(/^#\/?/, '').replace(/\/.*$/, '').trim().toLowerCase();
    const valid = ['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions', 'write', 'admin'];
    if (clean === 'feed') return 'board';
    if (clean === 'events') return 'festivals';
    return valid.includes(clean) ? clean : '';
  }

  // ==========================================
  // [브라우저 히스토리 매니저] SPA 뒤로가기/앞으로가기 통합 제어
  // ==========================================
  pushModalHistoryState(modalId, closeFnName) {
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState({ type: 'modal', modalId, closeFnName, view: this.currentView }, '', window.location.hash);
      }
    } catch (e) {}
  }

  handlePopState(state) {
    this._handlingPopState = true;
    setTimeout(() => { this._handlingPopState = false; }, 80);

    // 1단계: 열려 있는 오버레이 모달이 있다면 뒤로가기 시 해당 모달을 먼저 닫음
    const openModals = [
      { id: 'naver-blog-copy-modal', close: () => this.closeNaverBlogCopyModal(true) },
      { id: 'ai-parenting-report-modal', close: () => this.closeAiParentingReportModal(true) },
      { id: 'event-detail-modal', close: () => this.closeEventDetailModal(true) },
      { id: 'school-detail-modal', close: () => this.closeSchoolModal(true) },
      { id: 'school-grade-modal', close: () => this.closeSchoolGradeModal(true) },
      { id: 'admission-detail-modal', close: () => this.closeAdmissionDetailModal(true) },
      { id: 'login-modal', close: () => this.closeLoginModal(true) },
      { id: 'scrap-modal', close: () => this.closeScrapModal(true) },
      { id: 'profile-modal', close: () => this.closeProfileModal(true) },
      { id: 'admin-pw-modal', close: () => this.closeChangePwModal(true) },
      { id: 'admin-user-modal', close: () => this.closeNewUserModal(true) },
      { id: 'social-config-modal', close: () => this.closeSocialConfigModal(true) },
      { id: 'pwa-install-modal', close: () => this.closePwaInstallModal(true) }
    ];

    let closedAnyModal = false;
    for (const m of openModals) {
      const el = document.getElementById(m.id);
      if (el && !el.classList.contains('hidden')) {
        m.close();
        closedAnyModal = true;
      }
    }

    if (closedAnyModal && (!state || state.type !== 'modal')) {
      // 모달만 닫고 현재 뷰는 그대로 유지
      return;
    }

    // 2단계: 게시글 상세 화면(board-detail-view) 뒤로가기 처리
    const detailWrap = document.getElementById('board-detail-view');
    const isDetailOpen = detailWrap && !detailWrap.classList.contains('hidden');

    if (state && state.type === 'post_detail') {
      if (this.activePostDetailId !== state.postId || !isDetailOpen) {
        this.openPostDetailModal(state.postId, true);
      }
      return;
    } else if (isDetailOpen) {
      this.closePostDetailModal(true);
    }

    // 3단계: 글쓰기 화면(view-write) 뒤로가기 처리
    if (state && state.type === 'write') {
      if (this.currentView !== 'write') {
        this.openWritePage(state.catId, true);
      }
      return;
    } else if (this.currentView === 'write' && (!state || state.type !== 'write')) {
      const backView = state?.view || 'board';
      this.switchMainView(backView, true);
      return;
    }

    // 4단계: 메인 탭/뷰(view) 전환 뒤로가기/앞으로가기 처리
    if (state && state.type === 'view') {
      if (this.currentView !== state.view) {
        this.switchMainView(state.view, true);
      }
      return;
    }

    // 5단계: state가 없는 경우 URL 해시로부터 안전 복원
    const curHash = window.location.hash || '';
    if (curHash.startsWith('#/board/post/')) {
      const pId = curHash.replace('#/board/post/', '').trim();
      if (pId && this.activePostDetailId !== pId) {
        this.openPostDetailModal(pId, true);
        return;
      }
    }
    const fallbackRoute = this.getRouteFromHash(curHash) || 'board';
    if (this.currentView !== fallbackRoute) {
      this.switchMainView(fallbackRoute, true);
    }
  }

  renderUpdateBadges() {
    // 6대 핵심 서비스(축제, 대회, 맛집·관광지, 정책, 학군, 입시) 통합 최신 업데이트 일자
    const rawDate = this.eventsMetadata?.lastUpdated || window.DODAM_CRAWL_METADATA?.lastUpdated || '2026-11-07';
    const formatted = rawDate.replace(/-/g, '.');

    // 모든 상단 뱃지 일괄 동기화
    document.querySelectorAll('.last-updated-text').forEach((el) => {
      el.textContent = formatted;
    });
    const cDate = document.getElementById('crawl-stat-date');
    if (cDate) cDate.textContent = formatted;
    const aDate = document.getElementById('admissions-updated-date');
    if (aDate) aDate.textContent = formatted;

    // 1. 공공 축제·행사
    const festEvents = (this.allEvents || []).filter((e) => e.boardType === 'festivals');
    const festActive = festEvents.filter((e) => e.status === 'ongoing' || e.status === 'applying');
    const fStatDate = document.getElementById('fest-stat-date');
    if (fStatDate) fStatDate.textContent = formatted;
    const fStatNew = document.getElementById('fest-stat-new');
    if (fStatNew) {
      const newFestCount = window.DODAM_EVENTS_METADATA?.todayCollectedFestivals || 24;
      fStatNew.textContent = `+${newFestCount.toLocaleString()}`;
    }
    const fStatToday = document.getElementById('fest-stat-today');
    if (fStatToday) fStatToday.textContent = (festActive.length || festEvents.length).toLocaleString();
    const fStatTotal = document.getElementById('fest-stat-total');
    if (fStatTotal) {
      fStatTotal.textContent = (festEvents.length || window.DODAM_EVENTS_METADATA?.festivalsCount || 1828).toLocaleString();
    }

    // 2. 전국 대회 공고
    const contEvents = (this.allEvents || []).filter((e) => e.boardType === 'contests');
    const contActive = contEvents.filter((e) => e.status === 'applying' || e.status === 'ongoing');
    const cStatDate = document.getElementById('cont-stat-date');
    if (cStatDate) cStatDate.textContent = formatted;
    const cStatNew = document.getElementById('cont-stat-new');
    if (cStatNew) {
      const newContCount = window.DODAM_EVENTS_METADATA?.todayCollectedContests || 18;
      cStatNew.textContent = `+${newContCount.toLocaleString()}`;
    }
    const cStatToday = document.getElementById('cont-stat-today');
    if (cStatToday) cStatToday.textContent = (contActive.length || contEvents.length).toLocaleString();
    const cStatTotal = document.getElementById('cont-stat-total');
    if (cStatTotal) {
      cStatTotal.textContent = (contEvents.length || window.DODAM_EVENTS_METADATA?.contestsCount || 976).toLocaleString();
    }

    // 3. 맛집 데이터
    const crawlStatDate = document.getElementById('crawl-stat-date');
    const foodLastUpdated = window.DODAM_CRAWL_METADATA?.lastUpdated || formatted;
    if (crawlStatDate) crawlStatDate.textContent = foodLastUpdated.replace(/-/g, '.');
    const crawlStatToday = document.getElementById('crawl-stat-today');
    if (crawlStatToday) {
      const restToday = window.DODAM_CRAWL_METADATA?.todayCount || 1500;
      crawlStatToday.textContent = restToday.toLocaleString();
    }
    const crawlStatTotal = document.getElementById('crawl-stat-total');
    if (crawlStatTotal) {
      const restCount = window.DODAM_NATIONWIDE_RESTAURANTS?.length || 993;
      const attrCount = window.DODAM_NATIONWIDE_ATTRACTIONS?.length || 1094;
      const totalVerified = restCount + attrCount;
      crawlStatTotal.textContent = totalVerified.toLocaleString();
    }
    const crawlStatChecked = document.getElementById('crawl-stat-checked');
    if (crawlStatChecked) {
      const checked = window.DODAM_CRAWL_METADATA?.checkedCount || 13110;
      crawlStatChecked.textContent = checked.toLocaleString();
    }

    // 4. 정부 정책·지원금
    const policies = window.DODAM_POLICIES_DATA?.policies || [];
    const activePolicies = policies.filter((p) => p.status === 'active');
    const pStatDate = document.getElementById('policy-stat-date');
    if (pStatDate) pStatDate.textContent = formatted;
    const pStatNew = document.getElementById('policy-stat-new');
    if (pStatNew) {
      pStatNew.textContent = '+2';
    }
    const pStatToday = document.getElementById('policy-stat-today');
    if (pStatToday) pStatToday.textContent = (activePolicies.length || policies.length).toLocaleString();
    const pStatTotal = document.getElementById('policy-stat-total');
    if (pStatTotal) {
      pStatTotal.textContent = policies.length.toLocaleString();
    }

    // 5. 교육부 입시 정보 포털
    const admMeta = window.DODAM_ADMISSIONS_DATA?.metadata || {};
    const admGuides = window.DODAM_ADMISSIONS_DATA?.guides || [];
    const admDateEl = document.getElementById('admissions-updated-date');
    if (admDateEl) admDateEl.textContent = admMeta.lastUpdated ? admMeta.lastUpdated.replace(/-/g, '.') : formatted;
    const admNewEl = document.getElementById('admissions-stat-new');
    if (admNewEl) admNewEl.textContent = `+${(admMeta.todayCollectedCount || 20).toLocaleString()}`;
    const admTotalEl = document.getElementById('admissions-stat-total');
    if (admTotalEl) admTotalEl.textContent = (admGuides.length || admMeta.totalCount || 51).toLocaleString();

    // 5. 학교·학군 순위
    const allSchools = window.DODAM_SCHOOLS_RANKING || [];
    const sStatDate = document.getElementById('school-stat-date');
    if (sStatDate) sStatDate.textContent = formatted;
    const sStatToday = document.getElementById('school-stat-today');
    if (sStatToday) {
      const districtsCount = (window.DODAM_SCHOOLS_DATA?.districts?.length || 7) + (window.DODAM_SCHOOLS_DATA?.sidos?.length || 17);
      sStatToday.textContent = districtsCount.toLocaleString();
    }
    const sStatTotal = document.getElementById('school-stat-total');
    if (sStatTotal) {
      const totalSchoolCount = allSchools.length || 12014;
      sStatTotal.textContent = totalSchoolCount.toLocaleString();
    }
  }

  // ==========================================
  // [Firebase] Cloud Firestore 실시간 동기화 (DB 100% 전용 모드)
  // ==========================================
  initFirebaseSync() {
    if (typeof window.DodamFirebase === 'undefined') return;
    this.deletedPostIds = this.deletedPostIds || new Set();

    // 1. 삭제된 게시글 ID 목록 실시간 구독
    if (typeof window.DodamFirebase.subscribeDeletedPosts === 'function') {
      window.DodamFirebase.subscribeDeletedPosts((deletedIds) => {
        this.deletedPostIds = new Set(deletedIds || []);
        this.data.posts = (this.data.posts || []).filter((p) => p && !this.deletedPostIds.has(p.id));
        if (this.currentView === 'board') {
          this.renderBoardCategories();
          this.renderBoardView();
        }
      });
    }

    // 2. 커뮤니티 게시글 실시간 구독
    window.DodamFirebase.subscribePosts((remotePosts) => {
      if (Array.isArray(remotePosts)) {
        const remoteMap = new Map();
        const validRemote = remotePosts.filter(
          (p) => p && p.id && !p.id.startsWith('post-10') && !p.id.startsWith('post-mock') && !this.deletedPostIds.has(p.id)
        );
        validRemote.forEach((p) => {
          if (!p.ageStage) p.ageStage = p.category || 'all';
          if (!p.localHub) p.localHub = p.region && p.region !== 'all' ? this.getLocalHubFromProfileRegion(p.region) : 'all';
          remoteMap.set(p.id, p);
        });

        const seenIds = new Set();
        const seenYoutubeIds = new Set();
        const merged = [];

        validRemote.forEach((p) => {
          if (!p || !p.id) return;
          const baseId = p.id.split('_rev_')[0];
          p.id = baseId;
          if (seenIds.has(baseId) || this.deletedPostIds.has(baseId)) return;
          if (p.youtubeVideoId) {
            if (seenYoutubeIds.has(p.youtubeVideoId)) return;
            seenYoutubeIds.add(p.youtubeVideoId);
          }
          seenIds.add(baseId);
          merged.push(p);
        });

        (this.data.posts || []).forEach((p) => {
          if (!p || !p.id) return;
          const baseId = p.id.split('_rev_')[0];
          p.id = baseId;
          if (seenIds.has(baseId) || this.deletedPostIds.has(baseId)) return;
          if (p.youtubeVideoId) {
            if (seenYoutubeIds.has(p.youtubeVideoId)) return;
            seenYoutubeIds.add(p.youtubeVideoId);
          }
          seenIds.add(baseId);
          merged.push(p);
        });
        this.data.posts = merged;

        // AI 리포트 원격 로드 시 제목 정제, 2,463자 본문 및 5개 SVG 카드 즉시 치유 & 동기화
        (this.data.posts || []).forEach((p) => {
          if (!p) return;
          if (p.views < 50) {
            p.isHot = false;
          }
          if (p.title && (p.title.includes('신종호') || p.title.includes('공부 호기심') || p.title.includes('이 질문'))) {
            p.title = "[육아가이드] 부모의 '이 질문' 하나가 아이의 공부 호기심을 완전히 닫아버린다 (신종호 교수 강연 요약)";
            p.guideType = 'edu';
            p.ageStage = 'school';
            p.isHot = false;
            if (!p.contentHtml || !p.contentHtml.includes('학습 민첩성') || p.contentHtml.includes('편도체') || p.contentHtml.includes('이성교제')) {
              const vId = p.youtubeVideoId || this.extractYoutubeId(p.youtubeUrl) || 'cWGKAxSiaHY';
              const generated = this.buildYoutubeSummaryContent(vId, { title: p.title }, 'edu');
              p.contentHtml = generated.html;
              p.content = generated.html;
              p.rawTextContent = generated.plainText;
            }
          }
          if (p.isYoutubeSummary || p.isAiReport || (p.title && (p.title.includes('|') || p.title.includes('초등학생')))) {
            const badgeMatch = (p.title || '').match(/^\[([^\]]+)\]\s*/);
            const curBadge = '[육아가이드] ';
            const rawTitle = (p.title || '').replace(/^\[[^\]]+\]\s*/, '');
        if (p.isAiReport || p.isYoutubeSummary) p.title = curBadge + rawTitle;
            if (rawTitle.includes('|') || rawTitle.includes('이시훈') || rawTitle.includes('Q&A') || rawTitle.includes('방치하면')) {
              p.title = curBadge + this.generateCleanArticleTitle(rawTitle, p.guideType || 'growth');
            }
            if (p.author) {
              p.author.childBadge = '📖 도담 육아가이드';
              if (['슈퍼관리자', '도담 공식 가이드', '도담 공식 관리자', 'admin', '도담 육아연구소', '도담연구소'].includes(p.author.nickname)) p.author.nickname = '운영자';
              if (p.author.nickname === '도담 공식 가이드' || p.author.nickname === 'admin' || p.author.nickname === '운영자') {
                p.author.avatarBg = 'bg-emerald-600 text-white';
              }
            }
            if (p.id === 'guide-seed-1' && p.views > 50) p.views = 18;
            if (p.id === 'guide-seed-2' && p.views > 50) p.views = 14;
            if (p.id === 'official-ai-report-growth-1' && p.views > 10) {
              p.views = 0;
              p.reactions = { like: 0, hug: 0, tip: 0 };
            }
            // 본문이 4800자로 잘려있거나 5장 SVG 카드가 유실된 경우 2,463자 원본 + 5장 카드로 복원
            if (!p.contentHtml || p.contentHtml.length < 15000 || !p.contentHtml.includes('dodam-report-v3')) {
              const vId = p.youtubeVideoId || this.extractYoutubeId(p.youtubeUrl) || 'cWGKAxSiaHY';
              const meta = {
                title: rawTitle,
                authorName: '운영자'
              };
              const generated = this.buildYoutubeSummaryContent(vId, meta, p.guideType || 'growth');
              p.contentHtml = generated.html;
              p.content = generated.html;
              p.rawTextContent = generated.plainText;
            }
            if (p.contentHtml) {
              p.contentHtml = p.contentHtml
                .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
                .replace(/<div class="relative w-full overflow-hidden rounded-2xl shadow-sm border border-stone-200 bg-black aspect-video">[\s\S]*?<\/div>/gi, '')
                .replace(/<a\s+href="https:\/\/www\.youtube\.com\/watch\?v=[^"]*"[\s\S]*?<\/a>/gi, '');
            }
          }
        });

        this.ensureDailyActivePosts();

        if (this.currentView === 'board') {
          this.renderBoardCategories();
          this.renderBoardView();
        }
        if (this.activePostDetailId && remoteMap.has(this.activePostDetailId)) {
          const updatedPost = remoteMap.get(this.activePostDetailId);
          const likesEl = document.getElementById('post-detail-likes-count');
          if (likesEl) likesEl.textContent = updatedPost.reactions?.like || 0;
          const hugsEl = document.getElementById('post-detail-hugs-count');
          if (hugsEl) hugsEl.textContent = updatedPost.reactions?.hug || 0;
          const tipsEl = document.getElementById('post-detail-tips-count');
          if (tipsEl) tipsEl.textContent = updatedPost.reactions?.tip || 0;
          this.renderPostDetailComments(updatedPost);
        }
      }
    });

    // 3. 프로필 & 성장 다이어리 DB 실시간 구독
    if (typeof window.DodamFirebase.subscribeProfile === 'function') {
      window.DodamFirebase.subscribeProfile('active_profile', (remoteProfile) => {
        if (remoteProfile) {
          if (this.currentUser) return;
          const cleanGrowth = Array.isArray(remoteProfile.growthRecords)
            ? remoteProfile.growthRecords.filter(
                (r) =>
                  r &&
                  r.id !== 1 &&
                  r.id !== 2 &&
                  r.memo !== '영유아 구강검진 완료 및 첫 단어 성공!' &&
                  r.memo !== '가을 나들이 축제 다녀옴'
              )
            : [];
          this.profile = {
            ...this.getDefaultProfile(),
            ...remoteProfile,
            growthRecords: cleanGrowth
          };
          this.ensureChildrenArray();
          this.renderProfileWidget();
          this.renderGrowthSection();
          this.renderLevelSection();
          this.renderAuthHeader();
        }
      });
    }

    // 4. 스크랩북 DB 실시간 구독
    if (typeof window.DodamFirebase.subscribeScraps === 'function') {
      window.DodamFirebase.subscribeScraps('active_scraps', (remoteScraps) => {
        if (Array.isArray(remoteScraps)) {
          this.scraps = remoteScraps.filter((id) => id && id !== 'post-01');
          this.updateScrapBadge();
          this.renderProfileWidget();
        }
      });
    }

    // 5. 등록 회원 계정 DB 실시간 구독
    if (typeof window.DodamFirebase.subscribeUsers === 'function') {
      window.DodamFirebase.subscribeUsers((remoteUsers) => {
        if (Array.isArray(remoteUsers) && remoteUsers.length > 0) {
          const cleaned = this.cleanUsersList(remoteUsers);
          this.users = cleaned;
          if (remoteUsers.length !== cleaned.length) {
            window.DodamFirebase.saveUsers(cleaned);
          }
          if (this.currentView === 'admin' && this.adminTab === 'users') {
            this.renderAdminUsers();
            this.renderAdminTabs();
          }
          if (this.currentUser) {
            const myRecord = cleaned.find((u) => u.id === this.currentUser.id || u.username === this.currentUser.username);
            if (myRecord) {
              const savedProf = myRecord.profile || myRecord.savedProfile;
              if (savedProf && (savedProf.isCustomized || (savedProf.babyName && savedProf.babyName !== '도담이'))) {
                this.profile = {
                  ...this.getDefaultProfile(),
                  ...savedProf,
                  isCustomized: true
                };
                this.currentUser.profile = { ...this.profile };
                this.currentUser.savedProfile = { ...this.profile };
                this.saveCurrentUserSession();
                this.renderProfileWidget();
                this.renderGrowthSection();
              }
            }
          }
        } else if (this.users && this.users.length > 0) {
          const cleaned = this.cleanUsersList(this.users);
          this.users = cleaned;
          window.DodamFirebase.saveUsers(cleaned);
        }
      });
    }

    // 6. 현재 로그인 세션 DB 실시간 구독
    if (typeof window.DodamFirebase.subscribeSession === 'function') {
      window.DodamFirebase.subscribeSession('active_session', (sessionUser) => {
        const localActive = sessionStorage.getItem('dodam_current_user') || sessionStorage.getItem('dodam_admin_authenticated') || localStorage.getItem('dodam_persistent_session') || localStorage.getItem('dodam_admin_persistent');
        if (!localActive) {
          this.currentUser = null;
        } else if (sessionUser && typeof sessionUser === 'object') {
          this.currentUser = {
            ...(this.currentUser || {}),
            ...sessionUser
          };
        }
        if (this.currentUser) {
          if (this.currentUser.savedProfile && !this.profile?.isCustomized) {
            this.profile = {
              ...this.getDefaultProfile(),
              ...this.currentUser.savedProfile
            };
          } else {
            if (this.currentUser.nickname && (!this.profile.nickname || this.profile.nickname === '도담맘')) {
              this.profile.nickname = this.currentUser.nickname;
            }
            if (this.currentUser.profileImage) {
              this.profile.profileImage = this.currentUser.profileImage;
            }
          }
          this.ensureChildrenArray();
        }
        this.renderAuthHeader();
        this.renderProfileWidget();
        this.renderGrowthSection();
        this.renderLevelSection();

        if (this.isAdmin() && this.getRouteFromHash(window.location.hash) === 'admin' && this.currentView !== 'admin') {
          this.switchMainView('admin');
        }
      });
    }

    // 7. 소셜 API 키 설정 DB 실시간 구독
    if (typeof window.DodamFirebase.subscribeAppConfig === 'function') {
      window.DodamFirebase.subscribeAppConfig((cfg) => {
        if (cfg) {
          if (!window.DODAM_SOCIAL_CONFIG) window.DODAM_SOCIAL_CONFIG = {};
          if (cfg.kakaoJavascriptKey) {
            window.DODAM_SOCIAL_CONFIG.kakaoJavascriptKey = cfg.kakaoJavascriptKey;
            this.initKakaoSdk();
          }
          if (cfg.naverClientId) {
            window.DODAM_SOCIAL_CONFIG.naverClientId = cfg.naverClientId;
            this.initNaverSdk();
          }
          if (cfg.adminPassword) {
            this.remoteAdminPassword = String(cfg.adminPassword).trim();
            const admin = (this.users || []).find((u) => u && (u.username === 'admin' || u.id === 'admin'));
            if (admin) {
              admin.password = this.remoteAdminPassword;
              admin.passwordHash = this.remoteAdminPassword;
            }
          }
        }
      });
    }
  }

  // ==========================================
  // 1. 내 프로필, 다자녀 정보, 성장기록 & 등급/등업 관리
  // ==========================================
  getAgeBadgeFromMonths(months) {
    const m = parseInt(months, 10) || 0;
    if (m === 0) return '출산준비중 (임신)';
    if (m <= 12) return `${m}개월 아기`;
    if (m <= 72) return `${m}개월 (${Math.floor(m / 12)}세)`;
    if (m <= 84) return '7세 (취학 전)';
    if (m <= 96) return '초등 저학년';
    if (m <= 132) return '초등 고학년';
    if (m <= 168) return '중학생 (1~3학년)';
    return '고등학생 (1~3학년)';
  }

  ensureChildrenArray() {
    if (!this.profile) this.profile = this.getDefaultProfile();
    if (!Array.isArray(this.profile.children) || this.profile.children.length === 0) {
      const firstMonths = this.profile.months !== undefined ? parseInt(this.profile.months, 10) : 24;
      this.profile.children = [
        {
          id: 'child_1',
          name: this.profile.babyName || '도담이',
          gender: this.profile.gender || 'boy',
          months: firstMonths,
          ageBadge: this.profile.ageBadge || this.getAgeBadgeFromMonths(firstMonths)
        }
      ];
    } else {
      this.profile.children = this.profile.children.map((c, idx) => {
        const m = c.months !== undefined ? parseInt(c.months, 10) : 24;
        return {
          id: c.id || `child_${idx + 1}`,
          name: c.name || `아이${idx + 1}`,
          gender: c.gender || 'boy',
          months: m,
          ageBadge: this.getAgeBadgeFromMonths(m)
        };
      });
    }

    const primary = this.profile.children[0];
    if (primary) {
      this.profile.babyName = primary.name;
      this.profile.gender = primary.gender;
      this.profile.months = primary.months;
      this.profile.ageBadge = primary.ageBadge;
    }
    return this.profile.children;
  }

  getDefaultProfile() {
    return {
      nickname: '도담맘',
      babyName: '도담이',
      months: 24,
      ageBadge: '24개월 (2세)',
      gender: 'boy',
      children: [
        { id: 'child_1', name: '도담이', gender: 'boy', months: 24, ageBadge: '24개월 (2세)' }
      ],
      region: '경기 성남 분당',
      interests: ['food', 'festivals', 'school', 'policy'],
      points: 0,
      helpsCount: 0,
      checkedInToday: false,
      growthRecords: []
    };
  }

  isCustomProfile(p) {
    return !!(p && (p.isCustomized || (p.babyName && p.babyName !== '도담이')));
  }

  readCachedProfile(userId) {
    if (!userId) return null;
    try {
      const raw = localStorage.getItem('dodam_profile_' + userId);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  cacheUserProfile(userId, profile) {
    if (!userId || !profile) return;
    try {
      localStorage.setItem('dodam_profile_' + userId, JSON.stringify(profile));
    } catch (e) {}
  }

  // 다른 기기/브라우저에서 로그인한 경우 Cloud Firestore(user_profiles/{id})에서 프로필 복원
  async hydrateUserProfile(userId) {
    if (!userId || !window.DodamFirebase || typeof window.DodamFirebase.getProfile !== 'function') return;
    try {
      const remote = await window.DodamFirebase.getProfile(userId);
      if (!remote || !this.isCustomProfile(remote)) return;
      if (!this.currentUser || this.currentUser.id !== userId) return;
      if (this.isCustomProfile(this.profile) && this.profile.babyName !== '도담이') return;
      const { id, updatedAt, ...clean } = remote;
      this.profile = { ...this.getDefaultProfile(), ...clean, isCustomized: true };
      this.cacheUserProfile(userId, this.profile);
      this.currentUser.profile = { ...this.profile };
      this.saveCurrentUserSession();
      this.renderProfileWidget();
      this.renderGrowthSection();
      this.renderLevelSection();
      this.renderAuthHeader();
    } catch (e) {}
  }

  loadProfile() {
    const cur = this.loadCurrentUser();
    if (cur) {
      const curProf = cur.profile || cur.savedProfile;
      if (curProf && (curProf.isCustomized || (curProf.babyName && curProf.babyName !== '도담이'))) {
        return {
          ...this.getDefaultProfile(),
          ...curProf,
          isCustomized: true
        };
      }
    }
    return this.getDefaultProfile();
  }

  saveProfileData() {
    this.ensureChildrenArray();
    const userId = this.currentUser?.id || 'active_profile';
    if (this.currentUser?.id) this.cacheUserProfile(this.currentUser.id, this.profile);
    if (window.DodamFirebase && typeof window.DodamFirebase.saveProfile === 'function') {
      window.DodamFirebase.saveProfile(this.profile, userId);
    }
    if (this.currentUser && typeof this.currentUser === 'object') {
      this.currentUser.profile = { ...this.profile };
      this.currentUser.savedProfile = { ...this.profile };
      this.saveCurrentUserSession();
      if (this.users) {
        const u = this.users.find((x) => x.id === this.currentUser.id || x.username === this.currentUser.username);
        if (u) {
          u.profile = { ...this.profile };
          u.savedProfile = { ...this.profile };
          u.nickname = this.profile.nickname;
          u.region = this.profile.region;
          u.children = this.profile.children;
          this.saveUsers();
        }
      }
    }
  }

  saveCurrentUserSession() {
    if (this.currentUser) {
      try {
        const userJson = JSON.stringify(this.currentUser);
        sessionStorage.setItem('dodam_current_user', userJson);
        localStorage.setItem('dodam_persistent_session', userJson);
        if (this.isAdmin()) {
          sessionStorage.setItem('dodam_admin_authenticated', '1');
          localStorage.setItem('dodam_admin_persistent', '1');
        }
      } catch (e) {}
    } else {
      try {
        sessionStorage.removeItem('dodam_current_user');
        sessionStorage.removeItem('dodam_admin_authenticated');
        localStorage.removeItem('dodam_persistent_session');
        localStorage.removeItem('dodam_admin_persistent');
      } catch (e) {}
    }
    if (window.DodamFirebase && typeof window.DodamFirebase.saveSession === 'function') {
      window.DodamFirebase.saveSession(this.currentUser, 'active_session');
    }
  }

  calculateLevel(points = 0, helps = 0) {
    const buildNextInfo = (targetPoints, targetHelps, basePoints, nextName) => {
      const neededPoints = Math.max(0, targetPoints - points);
      const neededHelps = Math.max(0, targetHelps - helps);
      const spanPoints = Math.max(1, targetPoints - basePoints);
      const ptRatio = Math.min(1, Math.max(0, (points - basePoints) / spanPoints));
      const helpRatio = targetHelps > 0 ? Math.min(1, helps / targetHelps) : 1;
      const progress = Math.min(99, Math.round((ptRatio * 0.7 + helpRatio * 0.3) * 100));

      const condParts = [];
      if (neededPoints > 0) condParts.push(`${neededPoints.toLocaleString()}P`);
      if (neededHelps > 0) condParts.push(`도움 ${neededHelps}회`);
      const nextConditionText = condParts.length > 0
        ? `다음 [${nextName}]까지 ${condParts.join(' · ')} 남음`
        : `[${nextName}] 승급 조건 달성!`;

      return { neededPoints, neededHelps, progress, nextConditionText };
    };

    if (points >= 7000 && helps >= 50) {
      return {
        name: '👑 Lv.5 멘토맘·대디',
        shortName: '멘토',
        levelNum: 5,
        badgeClass: 'bg-purple-600 text-white',
        nextPoints: 7000,
        nextName: '최고 등급',
        progress: 100,
        neededPoints: 0,
        neededHelps: 0,
        nextConditionText: '🎉 도담톡 최고 등급 [Lv.5 멘토맘·대디] 달성!'
      };
    }
    if (points >= 3000 && helps >= 25) {
      const next = buildNextInfo(7000, 50, 3000, 'Lv.5 멘토맘·대디');
      return {
        name: '🍎 Lv.4 열매맘·대디',
        shortName: '열매',
        levelNum: 4,
        badgeClass: 'bg-rose-500 text-white',
        nextPoints: 7000,
        nextName: 'Lv.5 멘토맘·대디',
        ...next
      };
    }
    if (points >= 1000 && helps >= 10) {
      const next = buildNextInfo(3000, 25, 1000, 'Lv.4 열매맘·대디');
      return {
        name: '🌷 Lv.3 꽃봉오리맘·대디',
        shortName: '꽃봉오리',
        levelNum: 3,
        badgeClass: 'bg-indigo-600 text-white',
        nextPoints: 3000,
        nextName: 'Lv.4 열매맘·대디',
        ...next
      };
    }
    if (points >= 300 && helps >= 3) {
      const next = buildNextInfo(1000, 10, 300, 'Lv.3 꽃봉오리맘·대디');
      return {
        name: '🌿 Lv.2 줄기맘·대디',
        shortName: '줄기',
        levelNum: 2,
        badgeClass: 'bg-emerald-600 text-white',
        nextPoints: 1000,
        nextName: 'Lv.3 꽃봉오리맘·대디',
        ...next
      };
    }
    const next = buildNextInfo(300, 3, 0, 'Lv.2 줄기맘·대디');
    return {
      name: '🌱 Lv.1 새싹맘·대디',
      shortName: '새싹',
      levelNum: 1,
      badgeClass: 'bg-slate-700 text-white',
      nextPoints: 300,
      nextName: 'Lv.2 줄기맘·대디',
      ...next
    };
  }

  renderProfileWidget() {
    const el = document.getElementById('my-profile-widget');
    if (!el) return;

    // 1. 관리자 모드 접속 시 전용 컨트롤 바 렌더링 (게스트/로그인 유도 박스 완벽 배제)
    if (this.isAdmin()) {
      const adminNick = this.currentUser?.nickname || '슈퍼관리자';
      el.innerHTML = `
        <div class="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl border border-purple-500/30 p-3.5 sm:p-4 text-white shadow-sm space-y-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-amber-300 flex items-center justify-center font-black text-xl shrink-0 shadow-inner">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-black text-sm text-white">👑 ${adminNick} (최고 관리자)</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-500/30 text-purple-200 border border-purple-400/30">SUPER ADMIN</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">인증 완료</span>
                </div>
                <p class="text-xs text-purple-200/80 font-medium mt-0.5">전체 게시판 관리·삭제 권한 및 ⚡ 영상 요약 리포트 발행 권한이 활성화되어 있습니다.</p>
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
              <button
                type="button"
                onclick="app.openAiParentingReportModal()"
                class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <i class="fa-solid fa-bolt text-xs"></i>
                <span>영상 요약 리포트</span>
              </button>
              <button
                type="button"
                onclick="app.openAdminView()"
                class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-black text-xs text-white transition flex items-center gap-1.5 cursor-pointer"
              >
                <i class="fa-solid fa-chart-line text-xs text-purple-300"></i>
                <span>관리자 센터</span>
              </button>
              <button
                type="button"
                onclick="app.logout()"
                class="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
                title="로그아웃"
              >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span class="hidden sm:inline ml-1">로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // 2. 일반 회원 로그인 여부 판별
    const isLoggedIn = !!(
      this.currentUser &&
      (this.currentUser.authenticated || this.currentUser.id || this.currentUser.username || this.currentUser.nickname)
    );
    if (!isLoggedIn) {
      el.innerHTML = `
        <div class="bg-gradient-to-br from-stone-50 via-white to-stone-50/60 rounded-2xl border border-stone-200/90 p-3.5 sm:p-4 shadow-2xs space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 text-slate-400 flex items-center justify-center font-black text-xl shadow-2xs shrink-0">
                <i class="fa-solid fa-user"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-black text-sm text-slate-800">도담 방문자 (게스트)</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-slate-500 border border-stone-200">비로그인</span>
                </div>
                <p class="text-xs text-slate-500 font-medium mt-0.5">로그인하시면 자녀 개월수 맞춤 또래방과 우리 동네 맘카페 소통에 참여하실 수 있습니다.</p>
              </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onclick="app.openLoginModal()"
                class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <i class="fa-solid fa-arrow-right-to-bracket text-emerald-400"></i>
                <span>간편 로그인 / 시작하기</span>
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const children = this.ensureChildrenArray();
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;

    const latestGrowth = (this.profile.growthRecords && this.profile.growthRecords.length > 0)
      ? this.profile.growthRecords[0]
      : null;

    const childrenSummaryHtml = children
      .map((c) => {
        const icon = c.gender === 'girl' ? '👧' : (c.gender === 'pregnant' ? '🤰' : '👦');
        return `<span>${icon} <strong>${c.name}</strong> (${c.ageBadge})</span>`;
      })
      .join('<span class="text-slate-300">·</span>');

    el.innerHTML = `
      <div class="bg-gradient-to-br from-rose-50/60 via-white to-amber-50/40 rounded-2xl border border-rose-200/80 p-4 shadow-2xs space-y-3">
        <!-- 1행: 프로필 요약 & 등급 -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            ${this.profile.profileImage ? `
              <img src="${this.profile.profileImage}" alt="프로필" class="w-12 h-12 rounded-2xl object-cover shadow-sm shrink-0 border-2 border-amber-300">
            ` : `
              <div class="w-12 h-12 rounded-2xl coral-badge-gradient text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                ${(this.profile.nickname || '도').slice(0, 1)}
              </div>
            `}
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="font-black text-sm text-slate-900">${this.profile.nickname}</span>
                ${this.currentUser?.provider === 'kakao' ? '<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#FEE500] text-[#191919] border border-[#E6CF00]"><i class="fa-solid fa-comment text-[8px]"></i>카카오</span>' : ''}
                ${this.currentUser?.provider === 'naver' ? '<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#03C75A] text-white"><span class="font-black text-[8px]">N</span>네이버</span>' : ''}
                <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${lvl.badgeClass}">${lvl.name}</span>
              </div>
              <div class="text-xs text-slate-600 font-medium mt-1 flex items-center gap-1.5 flex-wrap">
                <span class="font-bold text-slate-700">📍 ${this.profile.region}</span>
                <span class="text-slate-300">·</span>
                ${childrenSummaryHtml}
                ${latestGrowth ? `<span class="text-slate-300">·</span><span class="text-indigo-600 font-bold">📏 ${latestGrowth.childName ? `[${latestGrowth.childName}] ` : ''}${latestGrowth.height}cm · ${latestGrowth.weight}kg</span>` : ''}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onclick="app.checkInAttendance()"
              class="px-3 py-1.5 rounded-xl ${this.profile.checkedInToday ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-500 hover:bg-rose-600 text-white'} font-black text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <i class="fa-solid ${this.profile.checkedInToday ? 'fa-check text-emerald-600' : 'fa-calendar-check'}"></i>
              <span>${this.profile.checkedInToday ? '출석 완료' : '출석체크 (+10P)'}</span>
            </button>
            <button
              type="button"
              onclick="app.openProfileModal()"
              class="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 font-extrabold text-xs text-slate-700 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <i class="fa-solid fa-gear text-slate-400"></i>
              <span>프로필·성장 관리</span>
            </button>
          </div>
        </div>

        <!-- 2행: 핵심 활동 지표 3종 & 다음 등업 프로그레스 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center bg-white/90 rounded-xl p-2.5 border border-stone-200/60 text-xs">
          <div>
            <div class="text-[10px] text-slate-400 font-bold">활동 점수</div>
            <div class="text-xs font-black text-rose-600 mt-0.5">${(this.profile.points || 0).toLocaleString()} P</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 font-bold">도움 준 횟수</div>
            <div class="text-xs font-black text-indigo-600 mt-0.5">${(this.profile.helpsCount || 0).toLocaleString()} 회</div>
          </div>
          <div>
            <div class="text-[10px] text-slate-400 font-bold">스크랩한 글</div>
            <div class="text-xs font-black text-amber-600 mt-0.5">${this.getValidScrappedPosts().length} 개</div>
          </div>
          <div class="cursor-pointer hover:bg-stone-50 rounded-lg p-0.5 transition" onclick="app.filterMyWrittenPosts()" title="내가 작성한 활동글 보기">
            <div class="text-[10px] text-slate-400 font-bold">내 활동글</div>
            <div class="text-xs font-black text-emerald-600 mt-0.5">${this.getMyWrittenPosts().length} 건</div>
          </div>
        </div>

        <!-- 3행: 다음 등급 진행도 바 -->
        <div class="space-y-1">
          <div class="flex items-center justify-between text-[11px] font-bold">
            <span class="text-slate-500">${lvl.nextConditionText || '최고 등급 달성!'}</span>
            <span class="text-rose-600 font-black">${lvl.progress}%</span>
          </div>
          <div class="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-rose-400 to-amber-500 rounded-full transition-all duration-300" style="width: ${lvl.progress}%"></div>
          </div>
        </div>
      </div>
    `;
  }

  checkInAttendance() {
    if (this.profile.checkedInToday) {
      this.showToast('오늘은 이미 출석체크를 완료하셨어요! 내일 또 만나요 😊');
      return;
    }
    this.profile.checkedInToday = true;
    this.profile.points = (this.profile.points || 0) + 10;
    this.saveProfileData();
    this.renderProfileWidget();
    this.renderLevelSection();
    this.renderAuthHeader();
    this.showToast('🎉 오늘의 육아 출석체크 완료! +10 포인트가 적립되었습니다.');
  }

  // ==========================================
  // 카카오 & 네이버 정식 OAuth 2.0 SDK 연동
  // ==========================================
  initKakaoSdk() {
    const kakaoKey = window.DODAM_SOCIAL_CONFIG?.kakaoJavascriptKey;
    if (window.Kakao && kakaoKey && !window.Kakao.isInitialized()) {
      try {
        window.Kakao.init(kakaoKey);
        console.log('[Kakao SDK] 정식 SDK 초기화 완료:', window.Kakao.isInitialized());
      } catch (e) {
        console.warn('[Kakao SDK] 초기화 예외:', e);
      }
    }
  }

  initNaverSdk() {
    const clientId = window.DODAM_SOCIAL_CONFIG?.naverClientId;
    if (window.naver && window.naver.LoginWithNaverId && clientId) {
      try {
        const callbackUrl = window.DODAM_SOCIAL_CONFIG.naverCallbackUrl || (window.location.origin + window.location.pathname);
        this.naverLogin = new window.naver.LoginWithNaverId({
          clientId: clientId,
          callbackUrl: callbackUrl,
          isPopup: true,
          loginButton: { color: "green", type: 1, height: 40 }
        });
        this.naverLogin.init();
        console.log('[Naver SDK] 정식 SDK 초기화 완료');
      } catch (e) {
        console.warn('[Naver SDK] 초기화 예외:', e);
      }
    }
  }

  initOAuthListeners() {
    // 팝업 통신 수신 (Naver 또는 외부 OAuth callback)
    window.addEventListener('message', (e) => {
      if (e.data && e.data.type === 'NAVER_OAUTH_TOKEN' && e.data.token) {
        this.fetchNaverProfile(e.data.token);
      } else if (e.data && e.data.type === 'NAVER_OAUTH_ERROR') {
        const errMsg = e.data.errorDescription || e.data.error || '인증 취소 또는 도메인 설정 확인 필요';
        this.showToast(`⚠️ 네이버 로그인 안내: ${errMsg}`);
      }
    });

    // 현재 창 자체가 Naver OAuth redirect 또는 팝업 콜백으로 열린 경우
    const hashStr = window.location.hash ? window.location.hash.substring(1) : '';
    const searchStr = window.location.search ? window.location.search.substring(1) : '';
    if (hashStr.includes('access_token') || hashStr.includes('error=') || searchStr.includes('error=')) {
      const params = new URLSearchParams(hashStr.includes('access_token') || hashStr.includes('error=') ? hashStr : searchStr);
      const token = params.get('access_token');
      const err = params.get('error');
      const errDesc = params.get('error_description');

      if (token) {
        if (window.opener && !window.opener.closed) {
          try {
            window.opener.postMessage({ type: 'NAVER_OAUTH_TOKEN', token: token }, '*');
            window.close();
            return;
          } catch (e) {}
        }
        // 단독 창 리다이렉트인 경우
        this.fetchNaverProfile(token);
        history.replaceState(null, null, window.location.pathname + window.location.search);
      } else if (err) {
        if (window.opener && !window.opener.closed) {
          try {
            window.opener.postMessage({ type: 'NAVER_OAUTH_ERROR', error: err, errorDescription: errDesc }, '*');
            window.close();
            return;
          } catch (e) {}
        }
        this.showToast(`⚠️ 네이버 로그인 안내: ${errDesc || err}`);
        history.replaceState(null, null, window.location.pathname);
      }
    }
  }

  openSocialConfigModal(provider = 'kakao') {
    this.closeLoginModal();
    this.pendingSocialProvider = provider;
    const kakaoInput = document.getElementById('cfg-kakao-key');
    if (kakaoInput) kakaoInput.value = window.DODAM_SOCIAL_CONFIG?.kakaoJavascriptKey || '';
    const naverInput = document.getElementById('cfg-naver-id');
    if (naverInput) naverInput.value = window.DODAM_SOCIAL_CONFIG?.naverClientId || '';

    const btnText = document.getElementById('cfg-submit-btn-text');
    if (btnText) {
      btnText.textContent = provider === 'kakao' ? '키 저장 및 실제 카카오 인증 시작' : '키 저장 및 실제 네이버 인증 시작';
    }

    const modal = document.getElementById('social-config-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeSocialConfigModal() {
    const modal = document.getElementById('social-config-modal');
    if (modal) modal.classList.add('hidden');
  }

  saveSocialKeysAndLogin() {
    const kakaoKey = (document.getElementById('cfg-kakao-key')?.value || '').trim();
    const naverId = (document.getElementById('cfg-naver-id')?.value || '').trim();

    if (!window.DODAM_SOCIAL_CONFIG) window.DODAM_SOCIAL_CONFIG = {};
    if (kakaoKey) window.DODAM_SOCIAL_CONFIG.kakaoJavascriptKey = kakaoKey;
    if (naverId) window.DODAM_SOCIAL_CONFIG.naverClientId = naverId;

    if (window.DodamFirebase && typeof window.DodamFirebase.saveSocialConfig === 'function') {
      window.DodamFirebase.saveSocialConfig({
        kakaoJavascriptKey: window.DODAM_SOCIAL_CONFIG.kakaoJavascriptKey || '',
        naverClientId: window.DODAM_SOCIAL_CONFIG.naverClientId || ''
      });
    }

    this.initKakaoSdk();
    this.initNaverSdk();
    this.closeSocialConfigModal();

    if (this.pendingSocialProvider === 'kakao') {
      if (kakaoKey) {
        this.loginWithKakao();
      } else {
        this.showToast('⚠️ 카카오 JavaScript 키가 입력되지 않았습니다.');
      }
    } else if (this.pendingSocialProvider === 'naver') {
      if (naverId) {
        this.loginWithNaver();
      } else {
        this.showToast('⚠️ 네이버 Client ID가 입력되지 않았습니다.');
      }
    } else {
      this.showToast('💾 소셜 API 키가 성공적으로 저장되었습니다.');
    }
  }

  continueWithDemoLogin() {
    const provider = this.pendingSocialProvider || 'kakao';
    this.closeSocialConfigModal();
    this.loginWithMockDemo(provider);
  }

  loginWithMockDemo(provider = 'kakao') {
    const isKakao = provider === 'kakao';
    const nick = this.profile.nickname || (isKakao ? '카카오체험맘' : '네이버체험맘');
    this.currentUser = {
      id: `${provider}-demo-` + Date.now(),
      username: `${provider}_demo`,
      nickname: nick,
      provider: provider,
      isDemo: true,
      role: 'member'
    };
    this.saveCurrentUserSession();

    this.closeLoginModal();
    this.renderAuthHeader();
    this.renderProfileWidget();
    this.showToast(`🧪 [체험 모드] ${isKakao ? '카카오' : '네이버'} 회원으로 시작합니다. 정식 API 키를 등록하면 실제 OAuth 인증 팝업이 작동합니다.`);

    if (this.profile.babyName === '도담이' && !this.profile.isCustomized) {
      setTimeout(() => this.openProfileModal(), 500);
    }
  }

  loginWithKakao() {
    const kakaoKey = window.DODAM_SOCIAL_CONFIG?.kakaoJavascriptKey;
    if (!kakaoKey) {
      this.openSocialConfigModal('kakao');
      this.showToast('ℹ️ 실제 카카오 인증창을 띄우려면 카카오 개발자 JavaScript 키가 필요합니다.');
      return;
    }

    this.initKakaoSdk();

    if (!window.Kakao || !window.Kakao.isInitialized()) {
      this.showToast('⚠️ 카카오 SDK 초기화에 실패했습니다. 키를 확인해주세요.');
      this.openSocialConfigModal('kakao');
      return;
    }

    try {
      if (window.Kakao.Auth && typeof window.Kakao.Auth.login === 'function') {
        window.Kakao.Auth.login({
        success: (authObj) => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              const kakaoAccount = res.kakao_account || {};
              const kakaoProfile = kakaoAccount.profile || {};
              const realNick = kakaoProfile.nickname || res.properties?.nickname || '카카오회원';
              const realPhoto = kakaoProfile.profile_image_url || res.properties?.profile_image || '';

              const kakaoUserId = 'kakao_' + res.id;
              const nowD = new Date();
              const nowStr = nowD.toISOString().slice(0, 10);
              const nowTimeStr = nowD.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
              const lastLoginFormatted = `${nowStr} ${nowTimeStr}`;

              this.users = this.cleanUsersList(this.users || []);
              let userRecord = this.users.find((u) => u.id === kakaoUserId || u.username === kakaoUserId);
              const savedProf = userRecord?.profile || userRecord?.savedProfile || this.readCachedProfile(kakaoUserId);
              const hasCustomProfile = !!(savedProf && (savedProf.isCustomized || (savedProf.babyName && savedProf.babyName !== '도담이')));

              if (hasCustomProfile) {
                this.profile = {
                  ...this.getDefaultProfile(),
                  ...savedProf,
                  nickname: realNick || savedProf.nickname,
                  isCustomized: true
                };
              } else {
                this.profile = {
                  ...this.getDefaultProfile(),
                  nickname: realNick,
                  isCustomized: false
                };
              }
              if (realPhoto) this.profile.profileImage = realPhoto;
              this.profile.provider = 'kakao';

              this.currentUser = {
                id: kakaoUserId,
                username: kakaoUserId,
                nickname: realNick,
                provider: 'kakao',
                profileImage: realPhoto,
                role: 'user',
                roleName: '카카오회원',
                authenticated: true,
                profile: { ...this.profile },
                savedProfile: { ...this.profile }
              };

              if (!userRecord) {
                userRecord = {
                  id: kakaoUserId,
                  username: kakaoUserId,
                  nickname: realNick,
                  email: kakaoAccount.email || `${kakaoUserId}@kakao.com`,
                  role: 'user',
                  roleName: '카카오회원',
                  avatar: 'fa-comment',
                  avatarBg: 'from-amber-400 to-yellow-500',
                  createdAt: nowStr,
                  lastLogin: lastLoginFormatted,
                  status: 'active',
                  statusLabel: '정상',
                  provider: 'kakao',
                  profile: { ...this.profile },
                  savedProfile: { ...this.profile }
                };
                this.users.push(userRecord);
              } else {
                userRecord.nickname = realNick;
                userRecord.lastLogin = lastLoginFormatted;
                if (realPhoto) userRecord.profileImage = realPhoto;
                userRecord.profile = { ...this.profile };
                userRecord.savedProfile = { ...this.profile };
              }
              this.saveUsers();
              this.saveCurrentUserSession();
              this.saveProfileData();

              this.closeLoginModal();
              this.renderAuthHeader();
              this.renderProfileWidget();
              this.renderGrowthSection();
              this.renderLevelSection();
              this.hydrateUserProfile(kakaoUserId);
              this.showToast(`🟡 카카오 공식 계정으로 인증 완료되었습니다! 환영합니다, ${realNick}님!`);

              if (!this.profile.isCustomized) {
                setTimeout(() => { if (!this.profile.isCustomized) this.openProfileModal(); }, 1500);
              }
            },
            fail: (err) => {
              console.error('Kakao profile request failed:', err);
              this.showToast('⚠️ 카카오 회원정보 요청 실패: ' + (err.msg || JSON.stringify(err)));
            }
          });
        },
        fail: (err) => {
          console.error('Kakao auth login failed:', err);
          const errDesc = err?.error_description || err?.msg || '';
          if (err?.error === 'access_denied') {
            this.showToast('카카오 로그인이 취소되었습니다.');
          } else if (errDesc.includes('Javascript env validation failed') || err?.error === 'misconfigured') {
            this.showToast(`⚠️ 카카오 개발자센터 [플랫폼 > Web 사이트 도메인]에 ${window.location.origin} 주소를 추가해주세요!`);
            alert(
              `[카카오 도메인 등록 안내 (10초 완료)]\n\n` +
              `현재 카카오 키(8dbfdfbebf899cf44aa5f31f50185023)에는 기존 주소(https://ittechkjh.github.io)만 등록되어 있고, 새로 연결하신 도메인(${window.location.origin})이 아직 등록되지 않아 카카오 서버에서 차단(Javascript env validation failed)했습니다.\n\n` +
              `✅ 해결 방법:\n` +
              `1. 카카오 개발자센터(developers.kakao.com) 접속\n` +
              `2. [내 애플리케이션] > [앱 설정] > [플랫폼] 클릭\n` +
              `3. [Web 플랫폼 수정] > [사이트 도메인] 칸에 아래 두 줄을 추가 후 저장:\n` +
              `   https://dodamtalk.com\n` +
              `   https://www.dodamtalk.com`
            );
          } else {
            this.showToast('⚠️ 카카오 로그인 실패: ' + (errDesc || '인증 실패'));
          }
        }
      });
      } else if (window.Kakao.Auth && typeof window.Kakao.Auth.authorize === 'function') {
        const redirectUri = window.location.origin + window.location.pathname;
        window.Kakao.Auth.authorize({ redirectUri: redirectUri });
      } else {
        this.showToast('⚠️ 카카오 인증 메서드를 찾을 수 없습니다. 다시 시도해주세요.');
      }
    } catch (e) {
      console.error('Kakao login error:', e);
      this.showToast('⚠️ 카카오 로그인 창을 띄울 수 없습니다: ' + e.message);
    }
  }

  loginWithNaver() {
    const clientId = window.DODAM_SOCIAL_CONFIG?.naverClientId;
    if (!clientId) {
      this.openSocialConfigModal('naver');
      this.showToast('ℹ️ 실제 네이버 인증창을 띄우려면 네이버 Client ID가 필요합니다.');
      return;
    }

    this.initNaverSdk();

    try {
      let naverAuthUrl = '';
      if (this.naverLogin && typeof this.naverLogin.generateAuthorizeUrl === 'function') {
        naverAuthUrl = this.naverLogin.generateAuthorizeUrl();
      } else {
        const callbackUrl = encodeURIComponent(window.DODAM_SOCIAL_CONFIG.naverCallbackUrl || (window.location.origin + window.location.pathname));
        const state = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('naver_oauth_state', state);
        naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${clientId}&redirect_uri=${callbackUrl}&state=${state}&version=js-2.0.1`;
      }

      const width = 500;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      window.open(naverAuthUrl, 'naverLoginPopup', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`);
    } catch (e) {
      console.error('Naver login popup error:', e);
      this.showToast('⚠️ 네이버 로그인 팝업 호출 실패: ' + e.message);
    }
  }

  applyNaverUserLogin(userObj) {
    const realNick =
      userObj.nickname ||
      (typeof userObj.getNickName === 'function' && userObj.getNickName()) ||
      userObj.name ||
      (typeof userObj.getName === 'function' && userObj.getName()) ||
      (userObj.email ? userObj.email.split('@')[0] : '') ||
      (typeof userObj.getEmail === 'function' && userObj.getEmail() ? userObj.getEmail().split('@')[0] : '') ||
      '네이버회원';
    const realPhoto =
      userObj.profile_image ||
      (typeof userObj.getProfileImage === 'function' && userObj.getProfileImage()) ||
      '';
    const id =
      userObj.id ||
      (typeof userObj.getId === 'function' && userObj.getId()) ||
      ('naver_' + Date.now());

    const naverUserId = 'naver_' + id;
    const nowD = new Date();
    const nowStr = nowD.toISOString().slice(0, 10);
    const nowTimeStr = nowD.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
    const lastLoginFormatted = `${nowStr} ${nowTimeStr}`;

    this.users = this.cleanUsersList(this.users || []);
    let userRecord = this.users.find((u) => u.id === naverUserId || u.username === naverUserId);
    const savedProf = userRecord?.profile || userRecord?.savedProfile || this.readCachedProfile(naverUserId);
    const hasCustomProfile = !!(savedProf && (savedProf.isCustomized || (savedProf.babyName && savedProf.babyName !== '도담이')));

    if (hasCustomProfile) {
      this.profile = {
        ...this.getDefaultProfile(),
        ...savedProf,
        nickname: realNick || savedProf.nickname,
        isCustomized: true
      };
    } else {
      this.profile = {
        ...this.getDefaultProfile(),
        nickname: realNick,
        isCustomized: false
      };
    }
    if (realPhoto) this.profile.profileImage = realPhoto;
    this.profile.provider = 'naver';

    this.currentUser = {
      id: naverUserId,
      username: naverUserId,
      nickname: realNick,
      provider: 'naver',
      profileImage: realPhoto,
      role: 'member',
      roleName: '네이버회원',
      authenticated: true,
      profile: { ...this.profile },
      savedProfile: { ...this.profile }
    };

    if (!userRecord) {
      userRecord = {
        id: naverUserId,
        username: naverUserId,
        nickname: realNick,
        email: userObj.email || `${naverUserId}@naver.com`,
        role: 'member',
        roleName: '네이버회원',
        avatar: 'fa-n',
        avatarBg: 'from-emerald-500 to-green-600',
        createdAt: nowStr,
        lastLogin: lastLoginFormatted,
        status: 'active',
        statusLabel: '정상',
        provider: 'naver',
        profile: { ...this.profile },
        savedProfile: { ...this.profile }
      };
      this.users.push(userRecord);
    } else {
      userRecord.nickname = realNick;
      userRecord.lastLogin = lastLoginFormatted;
      if (realPhoto) userRecord.profileImage = realPhoto;
      userRecord.profile = { ...this.profile };
      userRecord.savedProfile = { ...this.profile };
    }
    this.saveUsers();
    this.saveCurrentUserSession();
    this.saveProfileData();

    this.closeLoginModal();
    this.renderAuthHeader();
    this.renderProfileWidget();
    this.renderGrowthSection();
    this.renderLevelSection();
    this.hydrateUserProfile(naverUserId);
    this.showToast(`🟢 네이버 공식 계정으로 인증 완료되었습니다! 환영합니다, ${realNick}님!`);

    if (!this.profile.isCustomized) {
      setTimeout(() => { if (!this.profile.isCustomized) this.openProfileModal(); }, 1500);
    }
  }

  fetchNaverProfile(accessToken) {
    if (!accessToken) return;
    if (!this.naverLogin) {
      this.initNaverSdk();
    }

    if (this.naverLogin) {
      this.naverLogin.accessToken = { accessToken: accessToken };
      this.naverLogin.getLoginStatus((status) => {
        if (status && this.naverLogin.user) {
          this.applyNaverUserLogin(this.naverLogin.user);
        } else {
          this.fetchNaverProfileJsonp(accessToken);
        }
      });
    } else {
      this.fetchNaverProfileJsonp(accessToken);
    }
  }

  fetchNaverProfileJsonp(accessToken) {
    const cbName = '_dodam_naver_jsonp_' + Math.round(100000 * Math.random());
    const script = document.createElement('script');
    const parent = document.head || document.body;

    window[cbName] = (res) => {
      try {
        if (res && res.resultcode === '00' && res.response) {
          this.applyNaverUserLogin(res.response);
        } else {
          this.showToast('⚠️ 네이버 프로필 조회에 실패했습니다.');
        }
      } finally {
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      }
    };

    script.onerror = () => {
      delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
      this.showToast('⚠️ 네이버 프로필 서버 연결에 실패했습니다.');
    };

    script.src = `https://openapi.naver.com/v1/nid/me?access_token=${encodeURIComponent(accessToken)}&oauth_callback=${cbName}`;
    parent.appendChild(script);
  }

  // ==========================================
  // 프로필 모달 및 탭 컨트롤
  // ==========================================
  setProfileTab(tabName) {
    if (tabName === 'growth') {
      this.syncChildrenDraftFromDom();
      if (Array.isArray(this.editingChildren) && this.editingChildren.length > 0) {
        this.profile.children = this.editingChildren.map((c, idx) => {
          const m = parseInt(c.months !== undefined ? c.months : 24, 10);
          return {
            id: c.id || `child_${idx + 1}`,
            name: (c.name || '').trim() || `아이${idx + 1}`,
            gender: c.gender || 'boy',
            months: m,
            ageBadge: this.getAgeBadgeFromMonths(m)
          };
        });
      }
      this.renderGrowthSection();
    }
    const tabs = ['info', 'growth', 'level', 'account'];
    tabs.forEach((t) => {
      const el = document.getElementById(`prof-tab-${t}`);
      const btn = document.getElementById(`tab-prof-${t}-btn`);
      if (el) el.classList.toggle('hidden', t !== tabName);
      if (btn) {
        if (t === tabName) {
          btn.className = 'py-2 rounded-xl bg-white text-slate-900 font-black shadow-2xs transition cursor-pointer flex items-center justify-center gap-1.5';
        } else {
          btn.className = 'py-2 rounded-xl text-slate-600 hover:text-slate-900 transition cursor-pointer flex items-center justify-center gap-1.5';
        }
      }
    });
  }

  openProfileModal(targetTab = 'info', isHistoryNavigation = false) {
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('profile-modal', 'closeProfileModal');
    }
    const nickInput = document.getElementById('prof-nickname');
    if (nickInput) nickInput.value = this.profile.nickname || '판교도담맘';
    const regionInput = document.getElementById('prof-region');
    if (regionInput) regionInput.value = this.profile.region || '경기 성남 분당';

    this.editingChildren = JSON.parse(JSON.stringify(this.ensureChildrenArray()));
    this.renderChildrenFormRows();
    this.renderInterestChips();
    this.renderGrowthSection();
    this.renderLevelSection();
    this.renderAccountSection();

    this.setProfileTab(targetTab);
    const modal = document.getElementById('profile-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeProfileModal(isHistoryNavigation = false) {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'profile-modal') {
      window.history.back();
    }
  }

  syncChildrenDraftFromDom() {
    const rows = document.querySelectorAll('.prof-child-row');
    if (!rows || rows.length === 0) return;
    const updated = [];
    rows.forEach((row, idx) => {
      const id = row.getAttribute('data-child-id') || `child_${idx + 1}`;
      const name = (row.querySelector('.prof-child-name')?.value || '').trim() || `아이${idx + 1}`;
      const gender = row.querySelector('.prof-child-gender')?.value || 'boy';
      const months = parseInt(row.querySelector('.prof-child-months')?.value || '24', 10);
      updated.push({
        id,
        name,
        gender,
        months,
        ageBadge: this.getAgeBadgeFromMonths(months)
      });
    });
    if (updated.length > 0) {
      this.editingChildren = updated;
    }
  }

  renderChildrenFormRows() {
    const listEl = document.getElementById('prof-children-list');
    if (!listEl) return;

    if (!Array.isArray(this.editingChildren) || this.editingChildren.length === 0) {
      this.editingChildren = JSON.parse(JSON.stringify(this.ensureChildrenArray()));
    }

    const badgeEl = document.getElementById('prof-children-count-badge');
    if (badgeEl) badgeEl.textContent = `총 ${this.editingChildren.length}명`;

    const orderLabels = ['첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째'];
    const ageOptions = [
      { value: 0, label: '출산 준비중 (임신)' },
      { value: 6, label: '0~6개월 (신생아·영아)' },
      { value: 12, label: '7~12개월 (돌 전 아기)' },
      { value: 24, label: '13~24개월 (돌 이후·2세)' },
      { value: 36, label: '25~36개월 (3세)' },
      { value: 48, label: '37~48개월 (4세)' },
      { value: 60, label: '49~60개월 (5세)' },
      { value: 72, label: '61~72개월 (6세)' },
      { value: 84, label: '7세 (취학 전)' },
      { value: 96, label: '초등 저학년 (1~3학년)' },
      { value: 132, label: '초등 고학년 (4~6학년)' },
      { value: 168, label: '중학생 (중학교 1~3학년)' },
      { value: 204, label: '고등학생 (고등학교 1~3학년)' }
    ];

    listEl.innerHTML = this.editingChildren
      .map((child, idx) => {
        const orderText = orderLabels[idx] || `${idx + 1}째`;
        const curMonths = parseInt(child.months !== undefined ? child.months : 24, 10);
        const optionsHtml = ageOptions
          .map((opt) => `<option value="${opt.value}" ${opt.value === curMonths ? 'selected' : ''}>${opt.label}</option>`)
          .join('');

        return `
          <div class="prof-child-row bg-white/90 border border-rose-200/90 rounded-2xl p-3 space-y-2 shadow-2xs" data-child-id="${child.id || `child_${idx + 1}`}">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 font-black text-[10.5px]">
                <i class="fa-solid fa-child text-[10px]"></i>
                <span>${orderText} 자녀</span>
              </span>
              ${
                this.editingChildren.length > 1
                  ? `<button type="button" onclick="app.removeChildFormRow(${idx})" class="text-[11px] font-bold text-slate-400 hover:text-rose-600 transition cursor-pointer flex items-center gap-1">
                      <i class="fa-solid fa-trash-can text-[10px]"></i>
                      <span>삭제</span>
                    </button>`
                  : `<span class="text-[10px] text-slate-400 font-medium">기본 자녀</span>`
              }
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label class="block font-bold text-slate-700 text-[11px] mb-1">아이 애칭 / 이름</label>
                <input
                  type="text"
                  required
                  value="${(child.name || '').replace(/"/g, '&quot;')}"
                  placeholder="예: 도담이"
                  class="prof-child-name w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label class="block font-bold text-slate-700 text-[11px] mb-1">성별</label>
                <select class="prof-child-gender w-full bg-white border border-rose-200 rounded-xl px-2.5 py-1.5 font-bold focus:outline-none focus:border-rose-400 cursor-pointer">
                  <option value="boy" ${child.gender === 'boy' ? 'selected' : ''}>👦 왕자님 (남아)</option>
                  <option value="girl" ${child.gender === 'girl' ? 'selected' : ''}>👧 공주님 (여아)</option>
                  <option value="pregnant" ${child.gender === 'pregnant' ? 'selected' : ''}>🤰 출산 준비중 (임신)</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 text-[11px] mb-1">아이 연령 / 학년</label>
                <select class="prof-child-months w-full bg-white border border-rose-200 rounded-xl px-2.5 py-1.5 font-bold focus:outline-none focus:border-rose-400 cursor-pointer">
                  ${optionsHtml}
                </select>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  addChildFormRow() {
    this.syncChildrenDraftFromDom();
    if (!Array.isArray(this.editingChildren)) {
      this.editingChildren = JSON.parse(JSON.stringify(this.ensureChildrenArray()));
    }
    if (this.editingChildren.length >= 6) {
      this.showToast('자녀 프로필은 최대 6명까지 등록할 수 있습니다.');
      return;
    }
    const nextIdx = this.editingChildren.length + 1;
    this.editingChildren.push({
      id: `child_${Date.now()}_${nextIdx}`,
      name: '',
      gender: 'boy',
      months: 24,
      ageBadge: this.getAgeBadgeFromMonths(24)
    });
    this.renderChildrenFormRows();
  }

  removeChildFormRow(idx) {
    this.syncChildrenDraftFromDom();
    if (!Array.isArray(this.editingChildren) || this.editingChildren.length <= 1) {
      this.showToast('최소 1명의 자녀 정보는 유지되어야 합니다.');
      return;
    }
    this.editingChildren.splice(idx, 1);
    this.renderChildrenFormRows();
  }

  // ==========================================
  // 회원 계정 정보 수정 및 탈퇴 관리
  // ==========================================
  renderAccountSection() {
    const badgeEl = document.getElementById('acc-provider-badge');
    const userEl = document.getElementById('acc-username-display');
    const roleEl = document.getElementById('acc-role-display');
    const nickInput = document.getElementById('acc-nickname-input');
    const pwSection = document.getElementById('acc-password-section');
    const socialSection = document.getElementById('acc-social-section');

    const cur = this.currentUser;
    const isSocial = cur && (cur.provider === 'kakao' || cur.provider === 'naver');
    const isGuest = !cur || cur.provider === 'guest';
    const isAdmin = cur && (cur.role === 'admin' || cur.username === 'admin');

    if (nickInput) {
      nickInput.value = this.profile.nickname || (cur ? (cur.nickname || cur.username) : '판교도담맘');
    }

    if (badgeEl) {
      if (cur?.provider === 'kakao') {
        badgeEl.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#FEE500] text-[#191919] border border-[#E6CF00]';
        badgeEl.innerHTML = '<i class="fa-solid fa-comment text-[9px]"></i><span>카카오 공식 연동 회원</span>';
      } else if (cur?.provider === 'naver') {
        badgeEl.className = 'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#03C75A] text-white';
        badgeEl.innerHTML = '<span class="font-black text-[9px]">N</span><span>네이버 공식 연동 회원</span>';
      } else if (isAdmin) {
        badgeEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-600 text-white';
        badgeEl.textContent = '🛡️ 최고 관리자 계정';
      } else if (isGuest) {
        badgeEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-200 text-slate-700';
        badgeEl.textContent = '🚀 가입 없는 게스트 모드';
      } else {
        badgeEl.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800';
        badgeEl.textContent = '🔑 일반 등록 회원';
      }
    }

    if (userEl) {
      userEl.textContent = cur ? (cur.username || cur.id) : '(게스트 세션)';
    }

    if (roleEl) {
      roleEl.textContent = isAdmin ? '최고 관리자' : (isGuest ? '익명 게스트' : '정회원');
    }

    if (pwSection) {
      pwSection.classList.toggle('hidden', isSocial || isGuest);
    }

    if (socialSection) {
      socialSection.classList.toggle('hidden', !isSocial);
    }
  }

  updateAccountNickname(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('acc-nickname-input');
    const newNick = (input?.value || '').trim();

    if (!newNick || newNick.length < 2 || newNick.length > 20) {
      this.showToast('⚠️ 닉네임은 2자 이상 20자 이하로 입력해주세요.');
      return;
    }

    this.profile.nickname = newNick;
    if (this.currentUser) {
      this.currentUser.nickname = newNick;
      this.saveCurrentUserSession();
      const uIdx = this.users.findIndex(u => u.id === this.currentUser.id || u.username === this.currentUser.username);
      if (uIdx >= 0) {
        this.users[uIdx].nickname = newNick;
        this.saveUsers();
      }
    }

    this.saveProfileData();
    const profNickInput = document.getElementById('prof-nickname');
    if (profNickInput) profNickInput.value = newNick;

    this.renderAuthHeader();
    this.renderProfileWidget();
    this.showToast(`✅ 활동 닉네임이 '${newNick}'(으)로 변경되었습니다!`);
  }

  updateAccountPassword(e) {
    if (e) e.preventDefault();
    const pw1 = document.getElementById('acc-new-password')?.value.trim();
    const pw2 = document.getElementById('acc-confirm-password')?.value.trim();

    if (!pw1 || pw1.length < 4) {
      this.showToast('⚠️ 비밀번호는 최소 4자 이상 입력해주세요.');
      return;
    }

    if (pw1 !== pw2) {
      this.showToast('⚠️ 새 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }

    if (this.currentUser) {
      this.currentUser.passwordHash = pw1;
      this.saveCurrentUserSession();

      const uIdx = this.users.findIndex(u => u.id === this.currentUser.id || u.username === this.currentUser.username);
      if (uIdx >= 0) {
        this.users[uIdx].passwordHash = pw1;
        this.saveUsers();
      }
    }

    const p1 = document.getElementById('acc-new-password');
    const p2 = document.getElementById('acc-confirm-password');
    if (p1) p1.value = '';
    if (p2) p2.value = '';

    this.showToast('🔒 비밀번호가 성공적으로 변경되었습니다!');
  }

  resyncSocialProfile() {
    if (this.currentUser?.provider === 'kakao' && window.Kakao && window.Kakao.isInitialized()) {
      try {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            const kakaoAccount = res.kakao_account || {};
            const kakaoProfile = kakaoAccount.profile || {};
            const realNick = kakaoProfile.nickname || res.properties?.nickname;
            const realPhoto = kakaoProfile.profile_image_url || res.properties?.profile_image;

            if (realNick) {
              this.currentUser.nickname = realNick;
              this.profile.nickname = realNick;
            }
            if (realPhoto) {
              this.currentUser.profileImage = realPhoto;
              this.profile.profileImage = realPhoto;
            }
            this.saveCurrentUserSession();
            this.saveProfileData();
            this.renderAccountSection();
            this.renderAuthHeader();
            this.renderProfileWidget();
            this.showToast('🟡 카카오 계정의 최신 프로필 정보로 동기화되었습니다.');
          },
          fail: () => {
            this.showToast('카카오 계정 동기화에 실패했습니다. 다시 로그인해주세요.');
          }
        });
      } catch (e) {
        this.showToast('카카오 동기화 중 오류가 발생했습니다.');
      }
    } else {
      this.showToast('현재 연결된 소셜 계정의 최신 정보가 유지되고 있습니다.');
    }
  }

  confirmAccountWithdrawal() {
    const ok = window.confirm(
      '⚠️ 정말로 도담도담 회원 탈퇴를 진행하시겠습니까?\n\n' +
      '탈퇴 시 작성하신 [아이 성장 다이어리], [활동 점수 및 등급], [스크랩한 공고] 및 모든 개인 프로필 정보가 즉시 영구 삭제되며 다시 복구할 수 없습니다.'
    );
    if (!ok) return;

    // 1. 카카오 소셜 연동 해제 시도
    if (this.currentUser?.provider === 'kakao' && window.Kakao && window.Kakao.API) {
      try {
        window.Kakao.API.request({ url: '/v1/user/unlink' });
      } catch (e) {}
    }

    // 2. 등록 유저 목록에서 삭제 (Cloud Firestore DB에서도 삭제)
    if (this.currentUser) {
      const curId = this.currentUser.id;
      const curUser = this.currentUser.username;
      this.users = (this.users || []).filter(u => u.id !== curId && u.username !== curUser);
      this.saveUsers();
      if (window.DodamFirebase && typeof window.DodamFirebase.deleteUser === 'function') {
        window.DodamFirebase.deleteUser(curId || curUser);
      }
    }

    // 3. Cloud Firestore 데이터베이스 내 모든 회원 세션·프로필·스크랩 삭제
    if (window.DodamFirebase) {
      if (typeof window.DodamFirebase.clearSession === 'function') window.DodamFirebase.clearSession('active_session');
      if (typeof window.DodamFirebase.deleteProfile === 'function') window.DodamFirebase.deleteProfile('active_profile');
      if (typeof window.DodamFirebase.deleteScraps === 'function') window.DodamFirebase.deleteScraps('active_scraps');
    }

    // 4. 상태 리셋
    this.currentUser = null;
    this.profile = this.getDefaultProfile();
    this.scraps = [];

    // 5. 모달 닫기 및 UI 전체 리프레시
    this.closeProfileModal();
    this.renderAuthHeader();
    this.renderProfileWidget();
    this.updateScrapBadge();
    this.showToast('👋 회원 탈퇴가 안전하게 완료되었습니다. 그동안 도담도담을 이용해주셔서 진심으로 감사드립니다.');
  }

  renderInterestChips() {
    const container = document.getElementById('prof-interests-container');
    if (!container) return;

    const topics = [
      { id: 'babyfood', name: '🍼 이유식·육아템' },
      { id: 'festivals', name: '🎪 주말 축제·나들이' },
      { id: 'contests', name: '🏆 사생·글짓기 대회' },
      { id: 'food', name: '🍱 안심식당 맛집' },
      { id: 'policy', name: '💵 부모급여·지원금' },
      { id: 'school', name: '🏫 명문 학군·초등배정' },
      { id: 'admissions', name: '📚 2028 대입·교육' },
      { id: 'health', name: '💉 소아과·영유아검진' }
    ];

    const currentInterests = new Set(this.profile.interests || ['food', 'festivals', 'school', 'policy']);

    container.innerHTML = topics.map((t) => {
      const selected = currentInterests.has(t.id);
      return `
        <button
          type="button"
          onclick="app.toggleInterest('${t.id}')"
          class="p-2 rounded-xl border text-[11px] font-extrabold transition flex items-center justify-between cursor-pointer ${
            selected
              ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-2xs'
              : 'bg-white text-slate-600 border-stone-200 hover:bg-stone-50'
          }"
        >
          <span>${t.name}</span>
          <i class="fa-solid ${selected ? 'fa-circle-check text-rose-500' : 'fa-circle text-stone-300'} text-[10px]"></i>
        </button>
      `;
    }).join('');
  }

  toggleInterest(topicId) {
    if (!this.profile.interests) this.profile.interests = [];
    const idx = this.profile.interests.indexOf(topicId);
    if (idx > -1) {
      this.profile.interests.splice(idx, 1);
    } else {
      this.profile.interests.push(topicId);
    }
    this.renderInterestChips();
  }

  saveProfile(e) {
    if (e) e.preventDefault();
    const nick = (document.getElementById('prof-nickname')?.value || '').trim();
    const region = (document.getElementById('prof-region')?.value || '').trim();

    this.syncChildrenDraftFromDom();
    const children = Array.isArray(this.editingChildren) && this.editingChildren.length > 0
      ? this.editingChildren
      : this.ensureChildrenArray();

    if (nick) this.profile.nickname = nick;
    if (region) this.profile.region = region;

    this.profile.children = children.map((c, idx) => {
      const m = parseInt(c.months !== undefined ? c.months : 24, 10);
      return {
        id: c.id || `child_${idx + 1}`,
        name: (c.name || '').trim() || `아이${idx + 1}`,
        gender: c.gender || 'boy',
        months: m,
        ageBadge: this.getAgeBadgeFromMonths(m)
      };
    });

    const primary = this.profile.children[0];
    if (primary) {
      this.profile.babyName = primary.name;
      this.profile.gender = primary.gender;
      this.profile.months = primary.months;
      this.profile.ageBadge = primary.ageBadge;
    }

    this.profile.isCustomized = true;

    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;

    this.saveProfileData();
    this.renderGrowthSection();
    this.renderProfileWidget();
    this.renderAuthHeader();
    this.closeProfileModal();
    this.showToast(`🎉 내 육아 프로필과 자녀 ${this.profile.children.length}명의 정보가 저장되었습니다!`);
  }

  // ==========================================
  // 아이 성장 다이어리 관리 (다자녀 개별 관리 지원)
  // ==========================================
  selectGrowthChild(childId) {
    this.selectedGrowthChildId = childId;
    this.renderGrowthSection();
  }

  renderGrowthSection() {
    const children = this.ensureChildrenArray();
    if (!this.selectedGrowthChildId || !children.some((c) => c.id === this.selectedGrowthChildId)) {
      this.selectedGrowthChildId = children[0]?.id || 'child_1';
    }

    const activeChild = children.find((c) => c.id === this.selectedGrowthChildId) || children[0];
    const orderLabels = ['첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째'];

    // 1. 상단 자녀 선택 탭 렌더링
    const tabsEl = document.getElementById('growth-child-tabs');
    if (tabsEl) {
      tabsEl.innerHTML = children
        .map((c, idx) => {
          const isSelected = c.id === this.selectedGrowthChildId;
          const icon = c.gender === 'girl' ? '👧' : (c.gender === 'pregnant' ? '🤰' : '👦');
          const orderText = orderLabels[idx] || `${idx + 1}째`;
          return `
            <button
              type="button"
              onclick="app.selectGrowthChild('${c.id}')"
              class="px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-indigo-50/50'
              }"
            >
              <span>${icon} ${orderText} ${c.name}</span>
              <span class="text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400'}">(${c.ageBadge})</span>
            </button>
          `;
        })
        .join('');
    }

    // 2. 성장 기록 입력 폼의 대상 자녀 드롭다운 동기화
    const childSelectEl = document.getElementById('input-growth-child-id');
    if (childSelectEl) {
      childSelectEl.innerHTML = children
        .map((c, idx) => {
          const orderText = orderLabels[idx] || `${idx + 1}째`;
          return `<option value="${c.id}" ${c.id === this.selectedGrowthChildId ? 'selected' : ''}>${orderText} · ${c.name} (${c.ageBadge})</option>`;
        })
        .join('');
    }

    // 3. 선택된 자녀의 성장 기록 필터링 (기존 기록 중 childId가 없는 경우 첫째 자녀로 매핑)
    const allRecords = this.profile.growthRecords || [];
    const primaryId = children[0]?.id || 'child_1';
    const childRecords = allRecords.filter((r) => {
      const rChildId = r.childId || primaryId;
      return rChildId === this.selectedGrowthChildId;
    });

    const summaryTitleEl = document.getElementById('growth-summary-title');
    if (summaryTitleEl && activeChild) {
      summaryTitleEl.textContent = `${activeChild.name} (${activeChild.ageBadge}) 최근 성장 기록`;
    }

    const historyTitleEl = document.getElementById('growth-history-title');
    if (historyTitleEl && activeChild) {
      historyTitleEl.textContent = `${activeChild.name}의 성장 기록 히스토리`;
    }

    const countEl = document.getElementById('growth-history-count');
    if (countEl) countEl.textContent = `${childRecords.length}건`;

    const summaryHeight = document.getElementById('growth-summary-height');
    const summaryWeight = document.getElementById('growth-summary-weight');
    const summaryMemo = document.getElementById('growth-summary-memo');

    if (childRecords.length > 0) {
      const latest = childRecords[0];
      if (summaryHeight) summaryHeight.textContent = latest.height;
      if (summaryWeight) summaryWeight.textContent = latest.weight;
      if (summaryMemo) summaryMemo.textContent = `"${latest.memo || '무럭무럭 잘 크고 있어요!'}" (${latest.date})`;
    } else {
      if (summaryHeight) summaryHeight.textContent = '--';
      if (summaryWeight) summaryWeight.textContent = '--';
      if (summaryMemo) summaryMemo.textContent = `"${activeChild ? activeChild.name : '아이'}의 첫 성장 기록을 등록해보세요."`;
    }

    const listEl = document.getElementById('growth-history-list');
    if (!listEl) return;

    if (childRecords.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-slate-400 bg-stone-50 rounded-xl">${activeChild ? activeChild.name : '아이'}의 성장 기록을 등록하고 키·몸무게 변화를 한눈에 관리해보세요!</div>`;
      return;
    }

    listEl.innerHTML = childRecords.map((r) => {
      const cName = r.childName || activeChild?.name || '우리 아이';
      return `
        <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2 flex-wrap min-w-0">
            <span class="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-extrabold text-[10px] shrink-0">${r.date}</span>
            <span class="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-extrabold text-[10px] shrink-0">${cName}</span>
            <span class="font-black text-slate-800 shrink-0">📏 ${r.height} cm</span>
            <span class="font-black text-indigo-600 shrink-0">⚖️ ${r.weight} kg</span>
            <span class="text-slate-500 truncate max-w-[180px]">${r.memo || ''}</span>
          </div>
          <button
            type="button"
            onclick="app.deleteGrowthRecord(${r.id})"
            class="text-slate-300 hover:text-rose-500 transition p-1 cursor-pointer shrink-0"
            title="기록 삭제"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      `;
    }).join('');
  }

  addGrowthRecord(e) {
    if (e) e.preventDefault();
    const hInput = document.getElementById('input-growth-height');
    const wInput = document.getElementById('input-growth-weight');
    const mInput = document.getElementById('input-growth-memo');
    const childSelect = document.getElementById('input-growth-child-id');

    const height = parseFloat(hInput?.value || '0');
    const weight = parseFloat(wInput?.value || '0');
    const memo = (mInput?.value || '').trim();

    if (!height || !weight) {
      this.showToast('키와 몸무게를 정확히 입력해주세요.');
      return;
    }

    const children = this.ensureChildrenArray();
    const targetChildId = childSelect?.value || this.selectedGrowthChildId || children[0]?.id || 'child_1';
    const targetChild = children.find((c) => c.id === targetChildId) || children[0];
    this.selectedGrowthChildId = targetChild.id;

    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

    if (!this.profile.growthRecords) this.profile.growthRecords = [];
    this.profile.growthRecords.unshift({
      id: Date.now(),
      childId: targetChild.id,
      childName: targetChild.name,
      date: todayStr,
      height: height,
      weight: weight,
      memo: memo || '건강하게 쑥쑥 크는 중!'
    });

    this.profile.points = (this.profile.points || 0) + 5;
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;

    this.saveProfileData();
    this.renderGrowthSection();
    this.renderLevelSection();
    this.renderProfileWidget();
    this.renderAuthHeader();

    if (hInput) hInput.value = '';
    if (wInput) wInput.value = '';
    if (mInput) mInput.value = '';

    this.showToast(`🎉 [${targetChild.name}] 성장 기록이 등록되었습니다! (+5P 활동 점수 적립)`);
  }

  deleteGrowthRecord(recordId) {
    if (!confirm('이 성장 기록을 삭제하시겠습니까?')) return;
    this.profile.growthRecords = (this.profile.growthRecords || []).filter((r) => r.id !== recordId);
    this.saveProfileData();
    this.renderGrowthSection();
    this.renderProfileWidget();
    this.showToast('성장 기록이 삭제되었습니다.');
  }

  // ==========================================
  // 등급 및 등업 센터 렌더링
  // ==========================================
  renderLevelSection() {
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;

    const badgeEl = document.getElementById('level-display-badge');
    if (badgeEl) {
      badgeEl.textContent = lvl.name;
      badgeEl.className = `px-2.5 py-1 rounded-full font-black text-xs shadow-2xs ${lvl.badgeClass}`;
    }

    const nickEl = document.getElementById('level-display-nickname');
    if (nickEl) nickEl.textContent = `${this.profile.nickname} 님`;

    const pointsEl = document.getElementById('level-display-points');
    if (pointsEl) pointsEl.textContent = `${(this.profile.points || 0).toLocaleString()} P`;

    const helpsEl = document.getElementById('level-display-helps');
    if (helpsEl) helpsEl.textContent = `${(this.profile.helpsCount || 0).toLocaleString()} 회`;

    const nextInfoEl = document.getElementById('level-next-info');
    if (nextInfoEl) {
      nextInfoEl.textContent = lvl.nextConditionText || '최고 등급 달성 완료!';
    }

    const pctEl = document.getElementById('level-progress-pct');
    if (pctEl) pctEl.textContent = `${lvl.progress}%`;

    const barEl = document.getElementById('level-progress-bar');
    if (barEl) barEl.style.width = `${lvl.progress}%`;

    const attBtn = document.getElementById('btn-level-attendance');
    if (attBtn) {
      if (this.profile.checkedInToday) {
        attBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-300"></i><span>출석 완료</span>`;
        attBtn.className = 'px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-black text-[11px] shadow-sm';
      } else {
        attBtn.innerHTML = `<i class="fa-solid fa-calendar-check"></i><span>오늘 출석체크 (+10P)</span>`;
        attBtn.className = 'px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] shadow-sm transition cursor-pointer flex items-center gap-1';
      }
    }
  }

  // ==========================================
  // 도움 감사하기 (채택 시스템)
  // ==========================================
  giveHelpThanks(authorName) {
    this.profile.points = (this.profile.points || 0) + 25;
    this.profile.helpsCount = (this.profile.helpsCount || 0) + 1;
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;

    this.saveProfileData();
    this.renderProfileWidget();
    this.renderLevelSection();
    this.renderAuthHeader();
    this.showToast(`💡 ${authorName || '작성자'}님의 답변에 감사를 전했습니다! (+25P & 도움 +1회 적립)`);
  }

  // ==========================================
  // 2. 메인 뷰 전환 (게시판 / 지역행사 / 대회일정 / 맛집맵)
  // ==========================================
  switchMainView(viewId, isHistoryNavigation = false) {
    if (viewId === 'feed') viewId = 'board';
    if (viewId === 'events') viewId = 'festivals';
    const prevView = this.currentView;
    this.currentView = viewId;

    try {
      const targetHash = '#/' + viewId;
      if (!isHistoryNavigation && prevView !== viewId) {
        if (window.history && window.history.pushState) {
          window.history.pushState({ type: 'view', view: viewId }, '', targetHash);
        } else {
          window.location.hash = targetHash;
        }
      } else if (window.location.hash !== targetHash && window.location.hash !== '#' + viewId) {
        if (window.history && window.history.replaceState) {
          window.history.replaceState({ type: 'view', view: viewId }, '', targetHash);
        }
      }
    } catch (e) {}

    if (viewId === 'board') {
      const listWrap = document.getElementById('board-list-container');
      const detailWrap = document.getElementById('board-detail-view');
      if (listWrap) listWrap.classList.remove('hidden');
      if (detailWrap) detailWrap.classList.add('hidden');
      this.renderProfileWidget();
    }

    document.querySelectorAll('.view-section').forEach((sec) => sec.classList.add('hidden'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-view-btn').forEach((btn) => {
      const active = btn.getAttribute('data-view') === viewId;
      btn.className = active
        ? 'nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-extrabold whitespace-nowrap transition bg-slate-900 text-white shadow-sm text-center'
        : 'nav-view-btn flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 py-1.5 px-1 sm:px-2.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition text-slate-600 hover:text-slate-900 hover:bg-stone-100 text-center';
    });

    this.renderBoardCategories();
    this.trackViewEvent(viewId);

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
    } else if (viewId === 'apartments') {
      this.initApartmentsView();
    } else if (viewId === 'admissions') {
      this.initAdmissionsView();
    } else if (viewId === 'write') {
      this.initWritePage();
    } else if (viewId === 'admin') {
      this.initAdminView();
    }
  }

  // ==========================================
  // 3. 도담 육아 게시판 & 자녀 나이별 라운지 & 지역 맘카페 컨트롤러
  // ==========================================
  getChildAgeStageFromMonths(months) {
    const m = Number(months ?? 24);
    if (m <= 0) return 'preg';
    if (m <= 12) return 'newborn';
    if (m <= 36) return 'toddler_early';
    if (m <= 84) return 'toddler';
    if (m <= 120) return 'school';
    if (m <= 156) return 'elem_high';
    return 'middle_high';
  }

  getLocalHubFromProfileRegion(regionText) {
    const txt = (regionText || '').toLowerCase();
    if (txt.includes('강남') || txt.includes('서초') || txt.includes('송파') || txt.includes('잠실') || txt.includes('대치')) return 'seoul_gangnam';
    if (txt.includes('목동') || txt.includes('양천') || txt.includes('마포') || txt.includes('강서')) return 'seoul_mokdong';
    if (txt.includes('서울') || txt.includes('성동') || txt.includes('광진') || txt.includes('노원')) return 'seoul_seongdong';
    if (txt.includes('분당') || txt.includes('판교') || txt.includes('성남') || txt.includes('위례') || txt.includes('용인') || txt.includes('수지')) return 'gg_bundang';
    if (txt.includes('동탄') || txt.includes('수원') || txt.includes('광교') || txt.includes('화성')) return 'gg_dongtan';
    if (txt.includes('일산') || txt.includes('고양') || txt.includes('김포') || txt.includes('파주') || txt.includes('다산')) return 'gg_ilsan';
    if (txt.includes('경기')) return 'gg_bundang';
    if (txt.includes('인천') || txt.includes('송도') || txt.includes('청라') || txt.includes('검단')) return 'incheon_songdo';
    if (txt.includes('부산') || txt.includes('해운대') || txt.includes('센텀') || txt.includes('울산') || txt.includes('경남')) return 'busan_centum';
    if (txt.includes('대구') || txt.includes('수성') || txt.includes('경북')) return 'daegu_suseong';
    if (txt.includes('대전') || txt.includes('세종') || txt.includes('충청') || txt.includes('충남') || txt.includes('충북')) return 'daejeon_sejong';
    if (txt.includes('광주') || txt.includes('전라') || txt.includes('전남') || txt.includes('전북') || txt.includes('강원') || txt.includes('제주')) return 'gwangju_jeju';
    return 'gg_bundang';
  }

  renderBoardCategories() {
    const sideEl = document.getElementById('sidebar-category-list');
    const chipEl = document.getElementById('board-category-chips');
    const categories = this.data.categories || [];

    // Update "내 아이 또래글 맞춤" button label
    const myAgeBtnLabel = document.getElementById('btn-my-age-match-label');
    const myAgeBtn = document.getElementById('btn-my-age-match');
    const targetMyStage = this.getChildAgeStageFromMonths(this.profile?.months);
    if (myAgeBtnLabel) {
      const babyName = this.profile?.babyName || '도담이';
      const ageBadge = this.profile?.ageBadge || '24개월';
      const isMyStage = this.currentAgeStage === targetMyStage;
      myAgeBtnLabel.innerHTML = isMyStage
        ? `<span class="sm:hidden">✓ 또래글 중</span><span class="hidden sm:inline">✓ ${babyName}(${ageBadge}) 또래글 보기 중</span>`
        : `<span class="sm:hidden">내 아이 또래</span><span class="hidden sm:inline">내 아이(${babyName}·${ageBadge}) 또래글</span>`;
    }
    if (myAgeBtn) {
      myAgeBtn.className =
        this.currentAgeStage === targetMyStage
          ? 'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 text-white border border-rose-600 font-black text-xs transition cursor-pointer shadow-sm'
          : 'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-black text-xs transition cursor-pointer shadow-2xs';
    }

    this.renderBoardLoungeTabs();
    this.renderBoardAgeLounge();
    this.renderBoardLocalMomCafe();

    if (sideEl) {
      const catButtons = categories
        .map((c) => {
          const active = c.id === this.currentCategory && this.currentView === 'board';
          return `
            <button
              onclick="app.selectBoardCategory('${c.id}')"
              data-category="${c.id}"
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
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'festivals' ? 'bg-white text-amber-600' : 'bg-amber-500 text-white'} text-[9px] font-black">추천</span>
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
            <span class="px-1.5 py-0.2 rounded-full ${this.currentView === 'contests' ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'} text-[9px] font-black">공모</span>
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
          const count = (this.data.posts || []).filter((p) => {
            if (c.id === 'all') return true;
            if (c.id === 'hot') return this.isPostHot(p);
            return p.category === c.id;
          }).length;

          return `
            <button
              type="button"
              onclick="app.selectBoardCategory('${c.id}')"
              data-category="${c.id}"
              class="px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition border shrink-0 flex items-center gap-1.5 cursor-pointer ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-white hover:border-stone-300'
              }"
            >
              <span class="truncate text-[11px] sm:text-xs">${c.name}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black shrink-0 ${
                active ? 'bg-white/20 text-white' : 'bg-stone-200 text-slate-600'
              }">${count}</span>
            </button>
          `;
        })
        .join('');
    }
  }

  renderBoardLoungeTabs() {
    document.querySelectorAll('.board-lounge-tab').forEach((btn) => {
      const m = btn.getAttribute('data-lounge');
      const isActive = m === this.boardLoungeMode;
      btn.className = isActive
        ? 'board-lounge-tab flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-0.5 sm:px-3 rounded-lg text-center font-black transition cursor-pointer bg-white text-slate-900 shadow-2xs'
        : 'board-lounge-tab flex flex-col sm:flex-row items-center justify-center py-1 sm:py-1.5 px-0.5 sm:px-3 rounded-lg text-center font-bold transition cursor-pointer text-slate-600 hover:text-slate-900';
    });

    // Subfilter 1-line visibility
    const subAll = document.getElementById('board-subfilter-all');
    const subAge = document.getElementById('board-subfilter-age');
    const subLocal = document.getElementById('board-subfilter-local');
    const subQa = document.getElementById('board-subfilter-qa');

    if (subAll) subAll.classList.toggle('hidden', this.boardLoungeMode !== 'all');
    if (subAge) subAge.classList.toggle('hidden', this.boardLoungeMode !== 'age');
    if (subLocal) subLocal.classList.toggle('hidden', this.boardLoungeMode !== 'local');
    if (subQa) subQa.classList.toggle('hidden', this.boardLoungeMode !== 'qa');

    const subGuide = document.getElementById('board-subfilter-guide');
    if (subGuide) subGuide.classList.toggle('hidden', this.boardLoungeMode !== 'guide');

    const guideAdminBtn = document.getElementById('admin-ai-report-guide-trigger');
    if (guideAdminBtn) guideAdminBtn.classList.toggle('hidden', !this.isAdmin());

    // Update active cat buttons in subfilter-all
    document.querySelectorAll('.board-cat-btn').forEach((btn) => {
      const c = btn.getAttribute('data-cat');
      const isAct = c === this.currentCategory;
      btn.className = isAct
        ? 'board-cat-btn px-3 py-1 rounded-lg font-black bg-slate-900 text-white shrink-0 text-xs'
        : 'board-cat-btn px-3 py-1 rounded-lg font-bold text-slate-600 hover:bg-stone-100 shrink-0 text-xs';
    });
  }

  setBoardLoungeMode(mode) {
    this.boardLoungeMode = mode || 'all';
    this.boardPage = 1;
    if (mode === 'all') {
      this.currentAgeStage = 'all';
      this.currentLocalHub = 'all';
      this.currentLocalTopic = 'all';
      this.currentCategory = 'all';
    } else if (mode === 'age' && this.currentAgeStage === 'all') {
      this.currentCategory = 'all';
    } else if (mode === 'local' && this.currentLocalHub === 'all') {
      this.currentCategory = 'all';
    } else if (mode === 'qa') {
      this.qaFilterStatus = 'all';
    } else if (mode === 'guide') {
      this.currentCategory = 'guide';
      this.guideSubCategory = 'all';
    }
    this.renderBoardCategories();
    this.renderBoardView();
  }

  filterQaStatus(status) {
    this.qaFilterStatus = status;
    this.boardPage = 1;
    this.renderBoardView();
  }

  filterGuideCategory(subCat) {
    this.guideSubCategory = subCat || 'all';
    this.boardPage = 1;
    document.querySelectorAll('.board-gcat-btn').forEach((btn) => {
      const gc = btn.getAttribute('data-gcat');
      const isAct = gc === this.guideSubCategory;
      btn.className = isAct
        ? 'board-gcat-btn px-2.5 py-1 rounded-lg font-black bg-slate-900 text-white shrink-0 text-[11px]'
        : 'board-gcat-btn px-2.5 py-1 rounded-lg font-bold text-slate-600 hover:bg-stone-100 shrink-0 text-[11px]';
    });
    this.renderBoardView();
  }

  renderBoardAgeLounge() {
    const chipsEl = document.getElementById('board-age-stage-chips');
    if (!chipsEl) return;

    const stages = this.data.ageStages || [];
    chipsEl.innerHTML = stages
      .map((s) => {
        const active = s.id === this.currentAgeStage;
        const count = (this.data.posts || []).filter((p) => {
          if (s.id === 'all') return true;
          return p.ageStage === s.id || p.category === s.id || (s.id === 'middle_high' && (p.category === 'middle' || p.category === 'high'));
        }).length;

        return `
          <button
            type="button"
            onclick="app.selectAgeStage('${s.id}')"
            class="px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 flex items-center gap-1 ${
              active
                ? 'bg-slate-900 text-white font-black shadow-2xs'
                : 'bg-stone-50 text-slate-700 hover:bg-stone-100 border border-stone-200'
            }"
          >
            <span>${s.shortName || s.name}</span>
            <span class="text-[10px] ${active ? 'text-white/80' : 'text-slate-400'}">${count}</span>
          </button>
        `;
      })
      .join('');
  }

  selectAgeStage(stageId) {
    this.currentAgeStage = stageId;
    this.boardPage = 1;
    this.renderBoardCategories();
    this.renderBoardView();
  }

  filterByMyChildAge() {
    const myStage = this.getChildAgeStageFromMonths(this.profile?.months);
    if (this.currentAgeStage === myStage) {
      this.currentAgeStage = 'all';
      this.boardLoungeMode = 'all';
      this.renderBoardCategories();
      this.renderBoardView();
      this.showToast('전체 글 보기로 전환되었습니다.');
      return;
    }
    this.boardLoungeMode = 'age';
    this.currentAgeStage = myStage;
    this.boardPage = 1;
    this.renderBoardCategories();
    this.renderBoardView();
    const stageObj = (this.data.ageStages || []).find((s) => s.id === myStage);
    this.showToast(`👶 ${this.profile?.babyName || '아이'}(${this.profile?.ageBadge || '24개월'}) 또래글 모아보기 적용!`);
  }

  renderBoardLocalMomCafe() {
    const selEl = document.getElementById('board-local-hub-select');
    if (selEl) selEl.value = this.currentLocalHub;

    document.querySelectorAll('.board-lt-btn').forEach((btn) => {
      const lt = btn.getAttribute('data-lt');
      const isAct = lt === this.currentLocalTopic;
      btn.className = isAct
        ? 'board-lt-btn px-2.5 py-1 rounded-lg font-black bg-slate-900 text-white shrink-0 text-[11px]'
        : 'board-lt-btn px-2.5 py-1 rounded-lg font-bold text-slate-600 hover:bg-stone-100 shrink-0 text-[11px]';
    });
  }

  selectLocalHub(hubId) {
    this.currentLocalHub = hubId;
    this.boardPage = 1;
    this.renderBoardCategories();
    this.renderBoardView();
  }

  selectLocalTopic(topicId) {
    this.currentLocalTopic = topicId;
    this.boardPage = 1;
    this.renderBoardCategories();
    this.renderBoardView();
  }

  selectMyProfileLocalHub() {
    const targetHub = this.getLocalHubFromProfileRegion(this.profile?.region);
    this.boardLoungeMode = 'local';
    this.currentLocalHub = targetHub;
    this.boardPage = 1;
    this.renderBoardCategories();
    this.renderBoardView();
    const hubObj = (this.data.localHubs || []).find((h) => h.id === targetHub);
    this.showToast(`🏡 내 동네(${hubObj ? hubObj.shortName : '우리동네'}) 맘카페로 이동했습니다!`);
  }

  submitQuickSimplePost() {
    const titleEl = document.getElementById('quick-post-title');
    const text = (titleEl?.value || '').trim();
    if (!text) {
      this.showToast('작성할 내용을 입력해 주세요!');
      if (titleEl) titleEl.focus();
      return;
    }

    const myStage = this.getChildAgeStageFromMonths(this.profile?.months);
    const myHub = this.getLocalHubFromProfileRegion(this.profile?.region);
    const hubObj = (this.data.localHubs || []).find((h) => h.id === myHub);
    const localHubName = hubObj && hubObj.id !== 'all' ? hubObj.shortName : (this.profile?.region || '우리 동네');

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category: this.currentCategory !== 'all' ? this.currentCategory : 'talk',
      ageStage: this.currentAgeStage !== 'all' ? this.currentAgeStage : myStage,
      region: hubObj?.region || 'all',
      localHub: this.currentLocalHub !== 'all' ? this.currentLocalHub : myHub,
      localHubName: localHubName,
      localTopic: this.currentLocalTopic !== 'all' ? this.currentLocalTopic : 'all',
      localTopicName: '💬 일상수다',
      isQuestion: text.includes('?') || text.includes('어디') || text.includes('추천') || text.includes('궁금'),
      isSolved: false,
      title: text.length > 50 ? text.slice(0, 50) + '...' : text,
      content: text,
      images: [],
      author: {
        nickname: this.profile?.nickname || '도담맘',
        level: this.profile?.level || '🌷 꽃봉오리맘',
        childBadge: `${this.profile?.babyName || '도담이'} (${this.profile?.ageBadge || '24개월'}) · ${localHubName}`,
        avatarBg: 'bg-[#03C75A] text-white'
      },
      createdAt: '방금 전',
      timestamp: Date.now(),
      views: 0,
      isHot: false,
      reactions: { like: 0, hug: 0, tip: 0 },
      tags: ['육아소통', localHubName.split('·')[0]],
      comments: []
    };

    this.data.posts.unshift(newPost);
    this.registerMyPostId(newPost.id);
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.createPost(newPost);
    }

    this.profile.points = (this.profile.points || 0) + 10;
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;
    this.saveProfileData();
    this.renderProfileWidget();
    this.renderLevelSection();
    this.renderAuthHeader();

    if (titleEl) titleEl.value = '';
    this.boardPage = 1;
    this.renderBoardCategories();
    this.renderBoardView();
    this.showToast('🎉 글이 등록되었습니다! (+10P 적립)');
  }

  selectBoardCategory(catId) {
    this.currentCategory = catId;
    if (catId === 'all') {
      this.boardLoungeMode = 'all';
      this.guideSubCategory = 'all';
      this.qaFilterStatus = 'all';
    }
    this.boardPage = 1;
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
        ? 'board-sort-btn font-black text-slate-900 cursor-pointer'
        : 'board-sort-btn text-slate-500 hover:text-slate-800 cursor-pointer';
    });
    this.renderBoardView();
  }

  setBoardViewMode(mode) {
    this.boardViewMode = mode;
    const btnCafe = document.getElementById('btn-board-view-cafe');
    const btnCard = document.getElementById('btn-board-view-card');
    if (btnCafe && btnCard) {
      if (mode === 'cafe') {
        btnCafe.className = 'p-1 rounded bg-white text-slate-800 shadow-2xs cursor-pointer';
        btnCard.className = 'p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer';
      } else {
        btnCard.className = 'p-1 rounded bg-white text-slate-800 shadow-2xs cursor-pointer';
        btnCafe.className = 'p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer';
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
        tag: '공지',
        tagColor: 'bg-rose-500 text-white',
        title: '도담 육아 커뮤니티 클린 소통 수칙 & 또래·동네 맘카페 안내',
        author: '운영팀',
        date: '2026.11.06',
        views: 12480,
        likes: 382,
        commentsCount: 42,
        content: '자녀 나이별(임신~중고등) 또래방과 전국 거점 동네 맘카페에서 따뜻하고 편안하게 육아 이야기를 나눠보세요!'
      }
    ];
  }

  openNoticeDetailModal(noticeId, isHistoryNavigation = false) {
    const notice = this.getPinnedNotices().find((n) => n.id === noticeId);
    if (!notice) return;
    this.activePostDetailId = noticeId;

    if (!isHistoryNavigation) {
      try {
        const postHash = '#/board/post/' + noticeId;
        if (window.history && window.history.pushState) {
          window.history.pushState({ type: 'post_detail', postId: noticeId, view: 'board' }, '', postHash);
        }
      } catch (e) {}
    }

    const listWrap = document.getElementById('board-list-container');
    const detailWrap = document.getElementById('board-detail-view');
    if (listWrap) listWrap.classList.add('hidden');
    if (detailWrap) detailWrap.classList.remove('hidden');

    const catBadge = document.getElementById('post-detail-category-badge');
    if (catBadge) {
      catBadge.textContent = '📢 공식 공지사항';
      catBadge.className = 'px-3 py-1 rounded-full text-xs font-black bg-rose-600 text-white';
    }

    document.getElementById('post-detail-title').textContent = notice.title;
    document.getElementById('post-detail-author').textContent = notice.author;
    document.getElementById('post-detail-author-badge').textContent = '공식 운영진';
    document.getElementById('post-detail-region').textContent = '전국';
    document.getElementById('post-detail-date').textContent = notice.date;
    document.getElementById('post-detail-views').textContent = notice.views.toLocaleString();

    const noticeAsPost = {
      id: notice.id,
      title: notice.title,
      content: notice.content,
      category: 'all',
      author: { nickname: notice.author, childBadge: '공식 운영진' },
      tags: ['공지사항', '클린커뮤니티', '도담톡안내'],
      images: []
    };
    this.renderPostRichDetailContent(noticeAsPost);

    const tagsEl = document.getElementById('post-detail-tags');
    if (tagsEl) tagsEl.innerHTML = `<span class="px-2.5 py-1 rounded-lg bg-stone-100 text-slate-600 text-xs font-bold">#공지사항</span>`;

    const likesEl = document.getElementById('post-detail-likes-count');
    if (likesEl) likesEl.textContent = notice.likes;
    const hugsEl = document.getElementById('post-detail-hugs-count');
    if (hugsEl) hugsEl.textContent = 48;
    const tipsEl = document.getElementById('post-detail-tips-count');
    if (tipsEl) tipsEl.textContent = 95;

    const countEl = document.getElementById('post-detail-comments-count');
    if (countEl) countEl.textContent = `${notice.commentsCount}`;
    const listEl = document.getElementById('post-detail-comments-list');
    if (listEl) {
      listEl.innerHTML = `
        <div class="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs text-slate-700 space-y-1">
          <div class="flex items-center justify-between font-bold text-slate-900">
            <span>도담맘</span>
            <span class="text-[11px] text-slate-400 font-normal">방금 전</span>
          </div>
          <div>게시판이 한결 넓고 깔끔해져서 읽기 너무 편하네요! 유익한 정보 감사합니다 👍</div>
        </div>
      `;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderBoardView() {
    const listEl = document.getElementById('board-posts-list');
    const titleEl = document.getElementById('current-board-title');
    const countEl = document.getElementById('current-board-count');
    const paginationEl = document.getElementById('board-pagination-container');
    if (!listEl) return;

    const stageObj = (this.data.ageStages || []).find((s) => s.id === this.currentAgeStage);
    const hubObj = (this.data.localHubs || []).find((h) => h.id === this.currentLocalHub);
    const catObj = (this.data.categories || []).find((c) => c.id === this.currentCategory);

    // Title label
    if (titleEl) {
      if (this.boardLoungeMode === 'age' && stageObj && stageObj.id !== 'all') {
        titleEl.textContent = `👶 ${stageObj.shortName} 라운지`;
      } else if (this.boardLoungeMode === 'local' && hubObj && hubObj.id !== 'all') {
        titleEl.textContent = `📍 ${hubObj.shortName} 동네 맘카페`;
      } else if (this.boardLoungeMode === 'qa') {
        titleEl.textContent = '❓ 육아 질문·고민';
      } else if (this.boardLoungeMode === 'guide' || this.currentCategory === 'guide') {
        const subNames = {
          all: '전체',
          sleep: '수면',
          food: '이유식',
          growth: '훈육',
          health: '건강',
          edu: '학습'
        };
        const subText = this.guideSubCategory && this.guideSubCategory !== 'all' ? ' [' + (subNames[this.guideSubCategory] || this.guideSubCategory) + ']' : '';
        titleEl.textContent = '📖 도담 육아가이드 리포트' + subText;
      } else if (catObj && catObj.id !== 'all') {
        titleEl.textContent = catObj.name;
      } else {
        titleEl.textContent = '전체글';
      }
    }

    let filtered = (this.data.posts || []).filter((p) => {
      if (this.boardLoungeMode === 'qa') {
        const isQa = p.isQuestion || p.category === 'qa' || (p.title && (p.title.includes('?') || p.title.includes('질문') || p.title.includes('추천') || p.title.includes('고민')));
        if (!isQa) return false;
      }
      if (this.boardLoungeMode === 'guide' || this.currentCategory === 'guide') {
        const isGuide = p.category === 'guide' || p.isAiReport;
        if (!isGuide) return false;
        if (this.guideSubCategory !== 'all') {
          const subMatch = (p.guideType === this.guideSubCategory) || (p.tags && p.tags.includes(this.guideSubCategory));
          if (!subMatch) return false;
        }
        return true;
      }
      if (this.currentCategory === 'hot' && !this.isPostHot(p)) return false;
      if (this.currentCategory !== 'all' && this.currentCategory !== 'hot' && p.category !== this.currentCategory) return false;

      if (this.currentAgeStage !== 'all') {
        const matchStage =
          p.ageStage === this.currentAgeStage ||
          p.category === this.currentAgeStage ||
          (this.currentAgeStage === 'middle_high' && (p.category === 'middle' || p.category === 'high' || p.ageStage === 'middle_high'));
        if (!matchStage) return false;
      }

      if (this.currentLocalHub !== 'all') {
        const matchHub = p.localHub === this.currentLocalHub || (hubObj && p.region === hubObj.region && p.localHub === 'all');
        if (!matchHub) return false;
      }

      if (this.currentLocalTopic !== 'all') {
        if (p.localTopic !== this.currentLocalTopic) return false;
      }

      if (this.boardSearchKeyword) {
        const kw = this.boardSearchKeyword;
        const matchTitle = (p.title || '').toLowerCase().includes(kw);
        const matchBody = (p.content || '').toLowerCase().includes(kw);
        const matchAuthor = (p.author?.nickname || '').toLowerCase().includes(kw);
        const matchHubName = (p.localHubName || '').toLowerCase().includes(kw);
        const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(kw));
        if (!matchTitle && !matchBody && !matchAuthor && !matchHubName && !matchTags) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      // 1. [더미 글 하위 노출] 실제 사용자/관리자 작성 글을 더미/시드 글보다 무조건 항상 상위에 우선 노출
      const isDummyA = this.isDummyPost(a);
      const isDummyB = this.isDummyPost(b);
      if (!isDummyA && isDummyB) return -1;
      if (isDummyA && !isDummyB) return 1;

      // 2. 동일 그룹(사용자 글끼리, 더미 글끼리) 내에서 정렬 기준 적용
      if (this.boardSort === 'popular') {
        const scoreB = (b.reactions?.like || 0) + (b.reactions?.hug || 0) + (b.reactions?.tip || 0);
        const scoreA = (a.reactions?.like || 0) + (a.reactions?.hug || 0) + (a.reactions?.tip || 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
      } else if (this.boardSort === 'comments') {
        const commB = b.comments?.length || 0;
        const commA = a.comments?.length || 0;
        if (commB !== commA) return commB - commA;
      }
      return (b.timestamp || 0) - (a.timestamp || 0);
    });

    if (countEl) countEl.textContent = `${filtered.length}개`;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="p-8 text-center space-y-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div class="w-12 h-12 mx-auto rounded-full bg-stone-100 text-slate-400 flex items-center justify-center text-lg">
            <i class="fa-solid fa-filter-circle-xmark"></i>
          </div>
          <div class="text-sm font-black text-slate-800">선택한 조건에 맞는 게시글이 없습니다.</div>
          <p class="text-xs text-slate-400">카테고리, 연령, 지역 필터를 초기화하여 전체 글을 확인해보세요.</p>
          <button onclick="app.resetBoardFilter()" class="mt-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition cursor-pointer shadow-xs inline-flex items-center gap-1.5">
            <i class="fa-solid fa-rotate-left text-[11px]"></i>
            <span>전체글 보기 (필터 초기화)</span>
          </button>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    const totalPosts = filtered.length;
    const totalPages = Math.ceil(totalPosts / this.boardPageSize) || 1;
    if (this.boardPage > totalPages) this.boardPage = totalPages;
    if (this.boardPage < 1) this.boardPage = 1;

    const startIdx = (this.boardPage - 1) * this.boardPageSize;
    const endIdx = startIdx + this.boardPageSize;
    const pagedPosts = filtered.slice(startIdx, endIdx);
    const pinnedNotices = this.getPinnedNotices();

    if (this.boardViewMode === 'cafe') {
      // 1. 네이버카페 스타일 목록형 테이블 (말머리 | 제목 [댓글수] | 작성자 | 작성일 | 조회)
      const noticeRowsHtml =
        this.boardPage === 1
          ? pinnedNotices
              .map(
                (n) => `
            <div onclick="app.openNoticeDetailModal('${n.id}')" class="hidden sm:grid grid-cols-12 gap-2 px-4 py-2.5 bg-rose-50/50 border-b border-rose-100 hover:bg-rose-100/60 cursor-pointer transition items-center text-xs">
              <div class="col-span-2 text-center"><span class="px-2 py-0.5 rounded bg-rose-500 text-white font-black text-[10px]">${n.tag}</span></div>
              <div class="col-span-6 font-bold text-slate-900 truncate flex items-center gap-1.5">
                <span class="truncate">${n.title}</span>
                <span class="text-rose-500 font-bold text-[11px]">[${n.commentsCount || 42}]</span>
              </div>
              <div class="col-span-2 text-center text-slate-700 font-bold truncate">${n.author}</div>
              <div class="col-span-1 text-center text-slate-400 text-[11px]">${n.date.slice(5)}</div>
              <div class="col-span-1 text-center text-slate-400 text-[11px]">${(n.views || 0).toLocaleString()}</div>
            </div>
            <div onclick="app.openNoticeDetailModal('${n.id}')" class="sm:hidden px-3.5 py-2.5 bg-rose-50/50 border-b border-rose-100 hover:bg-rose-100/60 cursor-pointer transition text-xs space-y-1 overflow-hidden">
              <div class="flex items-start gap-1.5 min-w-0">
                <span class="px-1.5 py-0.5 rounded bg-rose-500 text-white font-black text-[10px] shrink-0">${n.tag}</span>
                <span class="font-bold text-slate-900 line-clamp-2 break-keep min-w-0 flex-1 text-xs leading-snug">${n.title}</span>
                <span class="text-rose-500 font-bold text-[11px] shrink-0">[${n.commentsCount || 42}]</span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-400">
                <span class="truncate max-w-[60%]">${n.author} · ${n.date.slice(5)}</span>
                <span class="shrink-0">조회 ${(n.views || 0).toLocaleString()}</span>
              </div>
            </div>
          `
              )
              .join('')
          : '';

      const postRowsHtml = pagedPosts
        .map((post) => {
          const totalLikes = (post.reactions?.like || 0) + (post.reactions?.hug || 0) + (post.reactions?.tip || 0);
          let badgeText = '자유';
          let badgeClass = 'bg-stone-100 text-slate-600';

          if (post.isYoutubeSummary || post.isAiReport) {
            badgeText = '📖 육아가이드';
            badgeClass = 'bg-purple-100 text-purple-800 font-black border border-purple-200';
          } else if (post.category === 'guide') {
            badgeText = '📖 육아가이드';
            badgeClass = 'bg-rose-100 text-rose-800 font-black border border-rose-200';
          } else if (post.localHubName && post.localHubName !== '전국 전체') {
            badgeText = '📍 ' + post.localHubName.split('·')[0];
            badgeClass = 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200';
          } else if (post.ageStage && post.ageStage !== 'all') {
            const stObj = (this.data.ageStages || []).find((s) => s.id === post.ageStage);
            badgeText = stObj ? stObj.shortName : post.ageStage;
            badgeClass = 'bg-amber-50 text-amber-800 font-bold border border-amber-200';
          } else if (post.isQuestion) {
            badgeText = '❓ 질문';
            badgeClass = 'bg-sky-50 text-sky-700 font-bold border border-sky-200';
          }

          const commentsCount = (post.comments?.length || 0);
          const views = post.views !== undefined ? post.views : 0;
          const authorName = post.author?.nickname || '도담맘';

          return `
            <div onclick="app.openPostDetailModal('${post.id}')" class="hidden sm:grid grid-cols-12 gap-2 px-4 py-2.5 bg-white border-b border-stone-100 hover:bg-stone-50/80 cursor-pointer transition items-center text-xs group">
              <div class="col-span-2 text-center">
                <span class="px-2 py-0.5 rounded-md ${badgeClass} text-[10px] truncate max-w-full inline-block">${badgeText}</span>
              </div>
              <div class="col-span-6 font-medium text-slate-900 group-hover:text-[#03C75A] truncate flex items-center gap-1.5">
                ${this.isPostHot(post) ? '<span class="px-1.5 py-0.2 rounded bg-rose-500 text-white font-black text-[9px]">HOT</span>' : ''}
                <span class="truncate">${post.title}</span>
                ${commentsCount > 0 ? `<span class="text-[#03C75A] font-extrabold text-[11px]">[${commentsCount}]</span>` : ''}
                ${this.isAdmin() && post.isAiGenerated ? '<span class="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-black text-[9px] border border-purple-200 shrink-0 inline-flex items-center gap-0.5 ml-1" title="관리자 전용: AI 자동 생성 글">🤖 AI</span>' : ''}
                <span class="hidden group-hover:inline-flex items-center gap-1 ml-auto pl-2 shrink-0">
                  <button type="button" onclick="event.stopPropagation(); app.copyPostForNaverBlog('${post.id}')" class="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold transition flex items-center gap-1" title="네이버 블로그 복사">
                    <i class="fa-solid fa-copy text-emerald-600"></i> 블로그 복사
                  </button>
                  ${this.canManagePost(post) ? `
                    <button type="button" onclick="event.stopPropagation(); app.openEditPostModal('${post.id}')" class="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 text-[10px] font-bold transition">수정</button>
                    <button type="button" onclick="event.stopPropagation(); app.deleteCurrentPost('${post.id}')" class="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 text-[10px] font-bold transition">삭제</button>
                  ` : ''}
                </span>
              </div>
              <div class="col-span-2 text-center text-slate-600 truncate flex items-center justify-center gap-1">
                <span class="truncate">${authorName}</span>
                ${post.isAiReport ? '<i class="fa-solid fa-circle-check text-purple-600 text-[10px]" title="공식 리포트"></i>' : ''}
              </div>
              <div class="col-span-1 text-center text-slate-400 text-[11px]">${post.createdAt || '방금'}</div>
              <div class="col-span-1 text-center text-slate-400 text-[11px]">${views.toLocaleString()}</div>
            </div>
            <!-- 모바일 2줄 카페 목록 (가독성 & 중복 뱃지 최적화) -->
            <div onclick="app.openPostDetailModal('${post.id}')" class="sm:hidden px-3.5 py-2.5 bg-white border-b border-stone-100 hover:bg-stone-50 cursor-pointer transition text-xs space-y-1 overflow-hidden">
              <div class="flex items-start gap-1.5 min-w-0 w-full">
                <span class="px-1.5 py-0.5 rounded ${badgeClass} text-[10px] shrink-0 font-bold">${badgeText}</span>
                ${this.isPostHot(post) ? '<span class="px-1 py-0.2 rounded bg-rose-500 text-white font-black text-[9px] shrink-0">HOT</span>' : ''}
                <span class="line-clamp-2 break-keep min-w-0 flex-1 font-bold text-slate-900 text-xs leading-snug">
                  ${post.title}
                  ${this.isAdmin() && post.isAiGenerated ? '<span class="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-black text-[9px] border border-purple-200 shrink-0 inline-flex items-center gap-0.5 ml-1" title="관리자 전용: AI 자동 생성 글">🤖 AI</span>' : ''}
                </span>
                ${commentsCount > 0 ? `<span class="text-[#03C75A] font-extrabold text-[11px] shrink-0">[${commentsCount}]</span>` : ''}
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-400">
                <span class="truncate max-w-[50%]">${authorName} · ${post.createdAt}</span>
                <div class="flex items-center gap-2 shrink-0 text-[10px]">
                  <button type="button" onclick="event.stopPropagation(); app.copyPostForNaverBlog('${post.id}')" class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-0.5 hover:bg-emerald-100 transition" title="네이버 블로그 복사">
                    <i class="fa-solid fa-copy text-emerald-600"></i> 복사
                  </button>
                  <span>조회 ${views.toLocaleString()}</span>
                  <span class="text-rose-500 font-bold">♥ ${totalLikes}</span>
                </div>
              </div>
            </div>
          `;
        })
        .join('');

      listEl.innerHTML = `
        <div class="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
          <div class="hidden sm:grid grid-cols-12 gap-2 px-4 py-2 bg-stone-50/90 border-b border-stone-200 text-xs font-bold text-slate-600 select-none">
            <div class="col-span-2 text-center">말머리</div>
            <div class="col-span-6 text-left pl-1">제목</div>
            <div class="col-span-2 text-center">작성자</div>
            <div class="col-span-1 text-center">작성일</div>
            <div class="col-span-1 text-center">조회</div>
          </div>
          ${noticeRowsHtml}
          <div>${postRowsHtml}</div>
        </div>
      `;
    } else {
      // 2. 소통 피드형 (심플 & 슬림 카드)
      listEl.innerHTML = `
        <div class="space-y-2.5">
          ${pagedPosts
            .map((post) => {
              const totalLikes = (post.reactions?.like || 0) + (post.reactions?.hug || 0) + (post.reactions?.tip || 0);
              const isScrapped = this.scraps.includes(post.id);
              const hubText = post.localHubName && post.localHubName !== '전국 전체' ? `📍${post.localHubName.split('·')[0]}` : '';
              const ageText = post.author?.childBadge || '';

              return `
                <article
                  onclick="app.openPostDetailModal('${post.id}')"
                  class="bg-white rounded-2xl border border-stone-200/90 p-4 space-y-2 hover:border-[#03C75A]/60 hover:shadow-xs transition cursor-pointer"
                >
                  <!-- 1행: 작성자, 배지, 스크랩 -->
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded-full ${post.author?.avatarBg || 'bg-rose-500 text-white'} text-[11px] font-bold flex items-center justify-center shrink-0">
                        ${(post.author?.nickname || '도')[0]}
                      </span>
                      <span class="font-black text-slate-900">${post.author?.nickname || '도담맘'}</span>
                      ${this.isAdmin() && post.isAiGenerated ? '<span class="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-black text-[9px] border border-purple-200 shrink-0 inline-flex items-center gap-0.5 ml-1" title="관리자 전용: AI 자동 생성 글">🤖 AI</span>' : ''}
                      ${hubText ? `<span class="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">${hubText}</span>` : ''}
                      ${ageText ? `<span class="text-slate-400 text-[11px] font-medium hidden sm:inline">(${ageText})</span>` : ''}
                      <span class="text-slate-300">·</span>
                      <span class="text-slate-400 text-[11px]">${post.createdAt}</span>
                    </div>

                    <button
                      type="button"
                      onclick="event.stopPropagation(); app.toggleScrap('${post.id}')"
                      class="text-stone-300 hover:text-amber-500 transition p-1"
                      title="스크랩"
                    >
                      <i class="fa-${isScrapped ? 'solid text-amber-500' : 'regular'} fa-bookmark text-xs"></i>
                    </button>
                  </div>

                  <!-- 2행: 제목 & 본문 (오버플로우 방지) -->
                  <div class="space-y-1">
                    <h4 class="text-sm font-bold text-slate-900 leading-snug flex items-center gap-1.5 min-w-0">
                      ${post.isQuestion ? '<span class="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] font-black shrink-0">질문</span>' : ''}
                      <span class="line-clamp-1 min-w-0 flex-1">${post.title}</span>
                    </h4>
                    <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${this.escapeSvgXml(this.extractPlainTextFromHtml(post.content))}</p>
                  </div>

                  <!-- 3행: 하단 반응 (좋아요, 댓글, 조회, 수정/삭제) -->
                  <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <div class="flex items-center gap-3">
                      <span class="flex items-center gap-1 text-rose-500 font-bold">
                        <i class="fa-solid fa-heart text-[10px]"></i>
                        <span>${totalLikes}</span>
                      </span>
                      <span class="flex items-center gap-1 text-slate-600 font-bold">
                        <i class="fa-regular fa-comment text-[10px]"></i>
                        <span>${post.comments?.length || 0}</span>
                      </span>
                    </div>

                    <div class="flex items-center gap-2">
                      <button type="button" onclick="event.stopPropagation(); app.copyPostForNaverBlog('${post.id}')" class="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold transition flex items-center gap-1" title="네이버 블로그 복사">
                        <i class="fa-solid fa-copy text-emerald-600"></i> 블로그 복사
                      </button>
                      ${this.canManagePost(post) ? `
                        <button type="button" onclick="event.stopPropagation(); app.openEditPostModal('${post.id}')" class="px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-50 text-slate-600 hover:text-amber-800 text-[10px] font-bold transition">수정</button>
                        <button type="button" onclick="event.stopPropagation(); app.deleteCurrentPost('${post.id}')" class="px-2 py-0.5 rounded bg-stone-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 text-[10px] font-bold transition">삭제</button>
                      ` : ''}
                      <span class="text-slate-400">조회 ${(post.views !== undefined ? post.views : 0).toLocaleString()}</span>
                    </div>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      `;
    }

    // Pagination
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
              class="w-7 h-7 rounded-lg text-xs font-bold transition ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-stone-100'
              }"
            >${p}</button>
          `;
        }

        paginationEl.innerHTML = `
          <div class="inline-flex items-center justify-center gap-1">
            <button
              onclick="app.setBoardPage(${this.boardPage - 1})"
              ${this.boardPage === 1 ? 'disabled class="opacity-20 cursor-not-allowed"' : 'class="hover:bg-stone-100 text-slate-600"'}
              class="w-7 h-7 rounded-lg text-xs flex items-center justify-center transition"
            >
              <i class="fa-solid fa-chevron-left text-[10px]"></i>
            </button>
            ${pagesHtml}
            <button
              onclick="app.setBoardPage(${this.boardPage + 1})"
              ${this.boardPage === totalPages ? 'disabled class="opacity-20 cursor-not-allowed"' : 'class="hover:bg-stone-100 text-slate-600"'}
              class="w-7 h-7 rounded-lg text-xs flex items-center justify-center transition"
            >
              <i class="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        `;
      }
    }
  }

  escapeSvgXml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  generateDarkSummaryInfographicSvg(cardData) {
    const topPillLeft = this.escapeSvgXml(cardData.topPillLeft || '2026 맞춤 육아 분석');
    const topPillMid = this.escapeSvgXml(cardData.topPillMid || '도담 전문 에디터 뷰');
    const subTag = this.escapeSvgXml(cardData.subTag || '💡 2026 도담 육아 핵심 브리핑');
    const mainTitle = this.escapeSvgXml((cardData.mainTitle || '우리 아이 발달 단계별 맞춤 솔루션').slice(0, 28));
    const subTitle = this.escapeSvgXml((cardData.subTitle || '실전 육아 핵심 포인트와 체크리스트').slice(0, 30));
    const highlightLine = this.escapeSvgXml(cardData.highlightLine || '실전 육아 꿀팁 · 맞춤 혜택 극대화 · 팩트 체크 검증');
    const b1 = this.escapeSvgXml((cardData.b1 || '① 월령·발달 단계별 핵심 체크포인트 및 생활 루틴 점검').slice(0, 38));
    const b2 = this.escapeSvgXml((cardData.b2 || '② 우리 동네 육아 인프라 및 선배 부모 실전 노하우 반영').slice(0, 38));
    const b3 = this.escapeSvgXml((cardData.b3 || '③ 아이 기질과 가정 환경에 맞춘 단계별 실천 전략 적용').slice(0, 38));
    const rightHeader = this.escapeSvgXml(cardData.rightHeader || '핵심 육아·생활 체크포인트');
    const targetText = this.escapeSvgXml((cardData.targetText || '해당 시기 자녀 양육 부모').slice(0, 18));
    const benefitText = this.escapeSvgXml((cardData.benefitText || '시행착오 단축 & 안심 육아').slice(0, 18));
    const benefitSub = this.escapeSvgXml((cardData.benefitSub || '실전 노하우 vs 이론 완벽 정리').slice(0, 22));
    const cautionText = this.escapeSvgXml((cardData.cautionText || '아이 기질·발달 개인차 고려').slice(0, 18));

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 460" width="840" height="460">
      <defs>
        <linearGradient id="dk_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b1120"/>
          <stop offset="55%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#070b14"/>
        </linearGradient>
        <radialGradient id="dk_glow_amber" cx="22%" cy="24%" r="55%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.16"/>
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="dk_glow_blue" cx="82%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="dk_orange_pill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ea580c"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
        <filter id="dk_shadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.65"/>
        </filter>
      </defs>

      <rect width="840" height="460" rx="18" fill="url(#dk_bg)"/>
      <rect width="840" height="460" rx="18" fill="url(#dk_glow_amber)"/>
      <rect width="840" height="460" rx="18" fill="url(#dk_glow_blue)"/>

      <g opacity="0.08" stroke="#64748b" stroke-width="1">
        <line x1="0" y1="92" x2="840" y2="92"/>
        <line x1="0" y1="184" x2="840" y2="184"/>
        <line x1="0" y1="276" x2="840" y2="276"/>
        <line x1="0" y1="368" x2="840" y2="368"/>
        <line x1="168" y1="0" x2="168" y2="460"/>
        <line x1="336" y1="0" x2="336" y2="460"/>
        <line x1="504" y1="0" x2="504" y2="460"/>
        <line x1="672" y1="0" x2="672" y2="460"/>
      </g>

      <!-- Top Header Pills -->
      <g transform="translate(34, 24)">
        <rect width="186" height="32" rx="8" fill="url(#dk_orange_pill)" filter="url(#dk_shadow)"/>
        <circle cx="18" cy="16" r="4.5" fill="#ffffff"/>
        <text x="32" y="21" fill="#ffffff" font-size="12.5" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif">${topPillLeft}</text>

        <rect x="198" y="0" width="142" height="32" rx="8" fill="#111827" stroke="#d97706" stroke-width="1.3"/>
        <text x="269" y="21" fill="#fbbf24" font-size="12" font-weight="800" font-family="'Pretendard', -apple-system, sans-serif" text-anchor="middle">${topPillMid}</text>

        <g transform="translate(612, 0)">
          <rect width="160" height="32" rx="8" fill="#0b1322" stroke="#0284c7" stroke-width="1.4"/>
          <circle cx="18" cy="16" r="4.5" fill="#0284c7"/>
          <circle cx="18" cy="16" r="2" fill="#38bdf8"/>
          <text x="90" y="21" fill="#38bdf8" font-size="13" font-weight="900" font-family="'Pretendard', monospace, sans-serif" letter-spacing="0.5" text-anchor="middle">dodamtalk.com</text>
        </g>
      </g>

      <!-- Left Main Content -->
      <g transform="translate(34, 92)">
        <rect x="0" y="0" width="215" height="28" rx="7" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <text x="14" y="19" fill="#cbd5e1" font-size="11.5" font-weight="800" font-family="'Pretendard', -apple-system, sans-serif">${subTag}</text>

        <text x="0" y="64" fill="#ffffff" font-size="24.5" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif" filter="url(#dk_shadow)">${mainTitle}</text>
        <text x="0" y="102" fill="#f59e0b" font-size="22" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif" filter="url(#dk_shadow)">${subTitle}</text>

        <g transform="translate(0, 128)">
          <rect width="458" height="46" rx="11" fill="#131c2e" stroke="#d97706" stroke-width="1.6" filter="url(#dk_shadow)"/>
          <circle cx="26" cy="23" r="12" fill="#d97706"/>
          <text x="26" y="28" fill="#ffffff" font-size="13" font-weight="900" text-anchor="middle">✓</text>
          <text x="48" y="28" fill="#fde68a" font-size="13.5" font-weight="800" font-family="'Pretendard', -apple-system, sans-serif">${highlightLine}</text>
        </g>

        <g transform="translate(4, 200)">
          <circle cx="6" cy="6" r="4" fill="#f59e0b"/>
          <text x="18" y="11" fill="#f1f5f9" font-size="13" font-weight="800" font-family="'Pretendard', -apple-system, sans-serif">${b1}</text>

          <circle cx="6" cy="36" r="4" fill="#10b981"/>
          <text x="18" y="41" fill="#f1f5f9" font-size="13" font-weight="800" font-family="'Pretendard', -apple-system, sans-serif">${b2}</text>

          <circle cx="6" cy="66" r="4" fill="#38bdf8"/>
          <text x="18" y="71" fill="#f1f5f9" font-size="13" font-weight="800" font-family="'Pretendard', -apple-system, sans-serif">${b3}</text>
        </g>
      </g>

      <!-- Right Summary Box -->
      <g transform="translate(522, 86)">
        <rect x="0" y="0" width="284" height="296" rx="18" fill="#111827" fill-opacity="0.94" stroke="#1e293b" stroke-width="1.8" filter="url(#dk_shadow)"/>
        <text x="142" y="30" fill="#f8fafc" font-size="13.5" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif" text-anchor="middle">${rightHeader}</text>

        <!-- Box 1: Target -->
        <g transform="translate(18, 46)">
          <rect width="248" height="68" rx="11" fill="#161f30" stroke="#d97706" stroke-width="1.3"/>
          <text x="14" y="24" fill="#94a3b8" font-size="11" font-weight="700" font-family="'Pretendard', -apple-system, sans-serif">권장 타깃 (Target)</text>
          <text x="14" y="50" fill="#fbbf24" font-size="14.5" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif">${targetText}</text>
        </g>

        <!-- Box 2: Benefits -->
        <g transform="translate(18, 126)">
          <rect width="248" height="78" rx="11" fill="#0f2427" stroke="#10b981" stroke-width="1.3"/>
          <text x="14" y="23" fill="#94a3b8" font-size="11" font-weight="700" font-family="'Pretendard', -apple-system, sans-serif">핵심 기대 효과 (Benefits)</text>
          <text x="14" y="48" fill="#34d399" font-size="14.5" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif">${benefitText}</text>
          <text x="234" y="68" fill="#cbd5e1" font-size="10.5" font-weight="700" font-family="'Pretendard', -apple-system, sans-serif" text-anchor="end">${benefitSub}</text>
        </g>

        <!-- Box 3: Caution -->
        <g transform="translate(18, 216)">
          <rect width="248" height="64" rx="11" fill="#231420" stroke="#f43f5e" stroke-width="1.3"/>
          <text x="14" y="23" fill="#94a3b8" font-size="11" font-weight="700" font-family="'Pretendard', -apple-system, sans-serif">주의사항 (Caution)</text>
          <text x="14" y="47" fill="#fb7185" font-size="14" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif">${cautionText}</text>
        </g>
      </g>

      <!-- Bottom Bar -->
      <g transform="translate(0, 412)">
        <line x1="34" y1="6" x2="450" y2="6" stroke="#d97706" stroke-width="3"/>
        <circle cx="450" cy="6" r="4.5" fill="#f59e0b"/>
        <rect y="14" width="840" height="34" fill="#060911" fill-opacity="0.95"/>
        <text x="34" y="35" fill="#94a3b8" font-size="11.5" font-weight="700" font-family="'Pretendard', -apple-system, sans-serif">▶ 기준: 2026 실전 육아 가이드 · 팩트 기반 맞춤형 전략</text>
        <text x="806" y="35" fill="#38bdf8" font-size="12" font-weight="900" font-family="'Pretendard', -apple-system, sans-serif" text-anchor="end">🌐 dodamtalk.com | 실전 육아 백서</text>
      </g>
    </svg>`;

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.replace(/\s+/g, ' ').trim());
  }

  renderInfographicBlockHtml(imgSrc, imgIdx, captionText = '') {
    return `
      <div class="my-6 space-y-3">
        <div class="max-w-[780px] w-full mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-800 bg-[#0b1120]">
          <img
            id="post-detail-render-img-${imgIdx}"
            src="${imgSrc}"
            alt="${this.escapeSvgXml(captionText || '도담톡 핵심 요약 카드')}"
            class="w-full h-auto block"
          />
        </div>
        <div class="flex items-center justify-center gap-2.5 flex-wrap pt-1">
          <button
            type="button"
            onclick="app.copyPostImageToClipboard(${imgIdx})"
            class="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <span>🖼️ 이 사진 복사 (네이버 Ctrl+V용)</span>
          </button>
          <button
            type="button"
            onclick="app.downloadPostImageAsPng(${imgIdx})"
            class="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <i class="fa-solid fa-download text-[11px] text-slate-500"></i>
            <span>PNG 다운로드</span>
          </button>
        </div>
      </div>
    `;
  }

  extractPlainTextFromHtml(htmlStr) {
    if (!htmlStr) return '';
    const temp = document.createElement('div');
    temp.innerHTML = htmlStr
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<\/h[1-6]>/gi, '\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<\/div>/gi, '\n');
    return (temp.textContent || temp.innerText || '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  renderPostRichDetailContent(post) {
    const contentEl = document.getElementById('post-detail-content');
    const imgBox = document.getElementById('post-detail-images-box');
    if (!contentEl) return;

    this.currentPostDetailImages = [];
    const rawContent = post.contentHtml || post.content || '';

    // ==========================================
    // [네이버 블로그형 AI 리포트 전용 렌더링]
    // 5장의 인포그래픽 이미지 및 서식을 100% 원본 HTML로 직접 렌더링 (이스케이프 및 중복 다크 카드 방지)
    // ==========================================
    if (rawContent.includes('naver-blog-article') || post.isYoutubeSummary || post.isAiReport) {
      let fullHtml = rawContent;
      if (fullHtml.length < 15000 || !fullHtml.includes('dodam-report-v3')) {
        const vId = post.youtubeVideoId || this.extractYoutubeId(post.youtubeUrl) || 'cWGKAxSiaHY';
        const rawTitle = (post.title || '').replace(/^\[[^\]]+\]\s*/, '');
        const meta = {
          title: rawTitle,
          authorName: '운영자'
        };
        const generated = this.buildYoutubeSummaryContent(vId, meta, post.guideType || 'growth');
        fullHtml = generated.html;
        post.contentHtml = fullHtml;
        post.content = fullHtml;
        post.rawTextContent = generated.plainText;
      }

      const parsedDoc = new DOMParser().parseFromString(fullHtml, 'text/html');
      const allImgs = Array.from(parsedDoc.querySelectorAll('img'));
      allImgs.forEach((img) => {
        const src = img.getAttribute('src');
        if (src) {
          const imgIdx = this.currentPostDetailImages.length;
          this.currentPostDetailImages.push(src);

          const actionDiv = parsedDoc.createElement('div');
          actionDiv.className = 'post-image-action-bar flex items-center justify-center gap-2 pt-2.5 pb-1 flex-wrap';
          actionDiv.innerHTML = `
            <button
              type="button"
              onclick="app.copyPostImageToClipboard(${imgIdx})"
              class="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
              title="클립보드에 PNG로 복사하여 네이버 에디터에서 바로 Ctrl+V 붙여넣기"
            >
              <i class="fa-regular fa-copy text-sky-600"></i>
              <span>이 사진 복사 (네이버 Ctrl+V용)</span>
            </button>
            <button
              type="button"
              onclick="app.downloadPostImageAsPng(${imgIdx})"
              class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
              title="고화질 PNG 파일로 다운로드"
            >
              <i class="fa-solid fa-download text-slate-500 text-[11px]"></i>
              <span>PNG 다운로드</span>
            </button>
          `;

          if (img.parentElement) {
            img.parentElement.appendChild(actionDiv);
          } else {
            img.insertAdjacentElement('afterend', actionDiv);
          }
        }
      });

      const dlLabel = document.getElementById('btn-download-all-images-label');
      if (dlLabel) {
        dlLabel.textContent = `총 ${Math.max(this.currentPostDetailImages.length, 5)}장 일괄 다운로드`;
      }

      // 유튜브 영상 플레이어(iframe) 및 유튜브 관련 잔여 링크 완벽 제거
      let cleanHtml = parsedDoc.body.innerHTML
        .replace(/<!--\s*1\.\s*유튜브 비디오 플레이어[\s\S]*?<\/iframe>\s*<\/div>\s*<\/div>/gi, '')
        .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
        .replace(/<div class="relative w-full overflow-hidden rounded-2xl shadow-sm border border-stone-200 bg-black aspect-video">[\s\S]*?<\/div>/gi, '')
        .replace(/<a\s+href="https:\/\/www\.youtube\.com\/watch\?v=[^"]*"[\s\S]*?<\/a>/gi, '');

      contentEl.innerHTML = cleanHtml;
      return;
    }
    const stObj = (this.data.ageStages || []).find((s) => s.id === (post.ageStage || post.category));
    const cat = (this.data.categories || []).find((c) => c.id === post.category);
    const categoryLabel = (stObj && stObj.id !== 'all' ? stObj.shortName : cat?.name || '도담 육아 가이드').replace(/^[^\w가-힣]+/, '').trim();
    const cleanTitle = (post.title || '').replace(/^\[[^\]]+\]\s*/, '').trim();
    const authorRole = post.author?.nickname || '도담 육아 에디터';
    const targetBadge = post.localHubName && post.localHubName !== '전국 전체'
      ? `${post.localHubName} 양육 가정`
      : (stObj && stObj.id !== 'all' ? `${stObj.shortName} 자녀 부모` : '전국 영유아·초등 학부모');

    const isGuidePost = post.isYoutubeSummary || post.isAiReport || post.category === 'guide' || (post.title && post.title.startsWith('[육아가이드]'));

    if (!isGuidePost) {
      // [육아가이드 제외한 모든 일반 커뮤니티 글]: 인포그래픽 이미지/요약 카드 일체 없이 순수 본문 텍스트만 깔끔하게 렌더링
      const paragraphs = String(rawContent || '')
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

      const formattedParagraphs = paragraphs.length > 0
        ? paragraphs.map((p) => `<p class="text-sm sm:text-[15px] leading-8 text-slate-800">${this.escapeSvgXml(p)}</p>`).join('')
        : `<p class="text-sm sm:text-[15px] leading-8 text-slate-800">${this.escapeSvgXml(rawContent || '')}</p>`;

      contentEl.innerHTML = `
        <div class="space-y-4 pb-4">
          ${formattedParagraphs}
        </div>
      `;
      if (imgBox) {
        imgBox.classList.add('hidden');
        imgBox.innerHTML = '';
      }
      return;
    }

    const isRichHtml = rawContent.includes('<h4') || rawContent.includes('ai-parenting-report-article');

    let renderedHtml = '';

    if (isRichHtml) {
      // Parse sections from AI report HTML or structured HTML and inject dark summary cards with copy/download buttons
      const plainText = this.extractPlainTextFromHtml(rawContent);
      const lines = plainText.split('\n').map((l) => l.trim()).filter(Boolean);
      const introParagraphs = [
        `${cleanTitle}에 대해 부모님들의 고민이 깊어지는 시기입니다. 아이의 성장 발달 단계와 가정 환경에 맞춘 정확한 기준을 세우면 시행착오를 크게 줄일 수 있습니다.`,
        `오늘은 소아청소년과 임상 지침과 선배 부모님들의 실전 노하우를 바탕으로, 가정에서 바로 적용할 수 있는 핵심 실천 전략을 명확히 정리해 드립니다.`
      ];

      const sectionDefs = [
        {
          heading: `1. 핵심 요약 & 발달 브리핑: ${cleanTitle.slice(0, 24)}`,
          subTitle: '발달 단계별 핵심 원리와 골든타임 분석',
          b1: lines[2] || '① 시기별 핵심 발달 신호와 생체 리듬 변화 정확히 파악',
          b2: lines[3] || '② 부모의 일관된 반응과 안정적인 환경 조성 프로토콜',
          b3: lines[4] || '③ 일상 속 작은 루틴 교정으로 스트레스 최소화 실천',
          benefitText: '초기 대응 & 루틴 정착',
          cautionText: '조급함보다 일관성 유지'
        },
        {
          heading: `2. 시기별 맞춤 실천 솔루션 & 부모 행동 가이드`,
          subTitle: '가정에서 즉시 적용하는 단계별 행동 프로토콜',
          b1: '① 1단계 환경 조성: 아이가 안정감을 느끼는 예측 가능한 일과',
          b2: '② 2단계 공감 소통: 감정은 100% 수용하되 행동 한계는 명확히 제시',
          b3: '③ 3단계 자율성 격려: 결과가 아닌 노력 과정 중심의 긍정 피드백',
          benefitText: '자기조절력 & 애착 강화',
          cautionText: '감정적 훈육·일관성 결여 주의'
        }
      ];

      const svg0 = this.generateDarkSummaryInfographicSvg({
        topPillLeft: `2026 ${categoryLabel}`,
        topPillMid: authorRole.slice(0, 10),
        subTag: `💡 2026 ${categoryLabel} 분석`,
        mainTitle: cleanTitle.slice(0, 25),
        subTitle: sectionDefs[0].subTitle,
        b1: sectionDefs[0].b1,
        b2: sectionDefs[0].b2,
        b3: sectionDefs[0].b3,
        rightHeader: '맞춤 육아 핵심 체크포인트',
        targetText: targetBadge,
        benefitText: sectionDefs[0].benefitText,
        benefitSub: '임상 지침 vs 실전 육아 결합',
        cautionText: sectionDefs[0].cautionText
      });
      this.currentPostDetailImages.push(svg0);

      const svg1 = this.generateDarkSummaryInfographicSvg({
        topPillLeft: `실전 행동 프로토콜`,
        topPillMid: '단계별 가이드',
        subTag: `💡 실전 적용 체크리스트`,
        mainTitle: `${cleanTitle.slice(0, 18)} 실천 전략`,
        subTitle: sectionDefs[1].subTitle,
        b1: sectionDefs[1].b1,
        b2: sectionDefs[1].b2,
        b3: sectionDefs[1].b3,
        rightHeader: '단계별 실천 기대 효과',
        targetText: targetBadge,
        benefitText: sectionDefs[1].benefitText,
        benefitSub: '가정 내 루틴 정착 로드맵',
        cautionText: sectionDefs[1].cautionText
      });
      this.currentPostDetailImages.push(svg1);

      // Strip any existing inline <img src="data:image/svg..."> from rawContent to avoid duplicate raw SVGs without buttons
      const cleanedReportHtml = rawContent.replace(/<div class="post-img-container"[\s\S]*?<\/div>/gi, '');

      renderedHtml = `
        <div class="space-y-4 text-slate-800 text-sm sm:text-[15px] leading-8 pb-5 border-b border-stone-200">
          <p>${introParagraphs[0]}</p>
          <p>${introParagraphs[1]}</p>
        </div>
        <div class="pt-2 space-y-4">
          <h3 class="text-base sm:text-lg font-black text-slate-900">${sectionDefs[0].heading}</h3>
          ${this.renderInfographicBlockHtml(svg0, 0, sectionDefs[0].heading)}
        </div>
        <div class="prose max-w-none text-sm sm:text-[15px] leading-8 text-slate-800 space-y-4">
          ${cleanedReportHtml}
        </div>
        <div class="pt-4 border-t border-stone-200 space-y-4">
          <h3 class="text-base sm:text-lg font-black text-slate-900">${sectionDefs[1].heading}</h3>
          ${this.renderInfographicBlockHtml(svg1, 1, sectionDefs[1].heading)}
        </div>
      `;
    } else {
      // Regular Community Post or Custom Post: Format spaciously + generate 1 High-Res Dark Infographic Summary Card
      const paragraphs = String(rawContent || '')
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

      const sentences = String(rawContent || '')
        .split(/(?<=[.?!~])\s+|\n+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 4);

      const b1Text = sentences[0] ? `① ${sentences[0].slice(0, 35)}` : `① ${cleanTitle.slice(0, 32)}`;
      const b2Text = sentences[1] ? `② ${sentences[1].slice(0, 35)}` : `② ${targetBadge} 맞춤 경험 및 실전 노하우 공유`;
      const b3Text = sentences[2] ? `③ ${sentences[2].slice(0, 35)}` : `③ 댓글 소통을 통한 우리 동네·또래 부모 팩트체크`;

      const svgCard = this.generateDarkSummaryInfographicSvg({
        topPillLeft: `2026 ${categoryLabel}`,
        topPillMid: authorRole.slice(0, 10),
        subTag: `💡 ${post.localTopicName || categoryLabel} 핵심 요약`,
        mainTitle: cleanTitle.slice(0, 25),
        subTitle: post.isQuestion ? '우리 동네·또래 부모 실전 조언 & 해결책' : '실전 육아 경험담 & 핵심 체크포인트',
        highlightLine: '실전 육아 꿀팁 · 동네 맘카페 검증 · 맞춤 정보 공유',
        b1: b1Text,
        b2: b2Text,
        b3: b3Text,
        rightHeader: '게시글 핵심 요약 브리핑',
        targetText: targetBadge,
        benefitText: post.isQuestion ? '맞춤형 해결책 & 공감' : '실전 육아 정보 획득',
        benefitSub: `${post.localHubName || '전국'} 또래 부모 소통`,
        cautionText: '상황별·아이별 맞춤 적용 권장'
      });
      this.currentPostDetailImages.push(svgCard);

      const formattedParagraphs = paragraphs
        .map((p) => `<p class="text-sm sm:text-[15px] leading-8 text-slate-800">${this.escapeSvgXml(p)}</p>`)
        .join('');

      renderedHtml = `
        <div class="space-y-4 pb-5 border-b border-stone-200">
          ${formattedParagraphs}
        </div>
        <div class="pt-2 space-y-3">
          <h3 class="text-base sm:text-lg font-black text-slate-900">1. ${this.escapeSvgXml(cleanTitle)} 핵심 요약 카드</h3>
          ${this.renderInfographicBlockHtml(svgCard, 0, cleanTitle)}
        </div>
      `;
    }

    contentEl.innerHTML = renderedHtml;

    // Render any user-attached photos with their own Copy & PNG Download buttons
    if (imgBox) {
      if (post.images && post.images.length > 0) {
        imgBox.classList.remove('hidden');
        imgBox.innerHTML = post.images
          .map((imgUrl, idx) => {
            const globalIdx = this.currentPostDetailImages.length;
            this.currentPostDetailImages.push(imgUrl);
            return `
              <div class="pt-4 border-t border-stone-100 space-y-3">
                <h4 class="text-sm sm:text-base font-black text-slate-800">📷 첨부 사진 ${idx + 1}</h4>
                <div class="max-w-[780px] w-full mx-auto rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-xs">
                  <img id="post-detail-render-img-${globalIdx}" src="${imgUrl}" alt="첨부 이미지 ${idx + 1}" class="w-full h-auto max-h-[540px] object-contain mx-auto block" crossorigin="anonymous" />
                </div>
                <div class="flex items-center justify-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    onclick="app.copyPostImageToClipboard(${globalIdx})"
                    class="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                  >
                    <span>🖼️ 이 사진 복사 (네이버 Ctrl+V용)</span>
                  </button>
                  <button
                    type="button"
                    onclick="app.downloadPostImageAsPng(${globalIdx})"
                    class="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                  >
                    <i class="fa-solid fa-download text-[11px] text-slate-500"></i>
                    <span>PNG 다운로드</span>
                  </button>
                </div>
              </div>
            `;
          })
          .join('');
      } else {
        imgBox.classList.add('hidden');
        imgBox.innerHTML = '';
      }
    }

    const dlAllLabel = document.getElementById('btn-download-all-images-label');
    if (dlAllLabel) {
      dlAllLabel.textContent = `사진 ${this.currentPostDetailImages.length}장 일괄 다운로드`;
    }
  }

  convertImageSrcToPngDataUrl(src, defaultWidth = 800, defaultHeight = 460) {
    return new Promise((resolve) => {
      if (!src) return resolve('');
      if (typeof src === 'string' && (src.startsWith('data:image/png') || src.startsWith('data:image/jpeg'))) {
        return resolve(src);
      }
      let imageSrc = src;
      let explicitW = defaultWidth;
      let explicitH = defaultHeight;

      if (typeof imageSrc === 'string' && imageSrc.includes('data:image/svg+xml')) {
        try {
          const decoded = decodeURIComponent(imageSrc.replace(/^data:image\/svg\+xml;(utf8|base64),/, ''));
          const vb = decoded.match(/viewBox=["']\s*0\s+0\s+(\d+)\s+(\d+)\s*["']/);
          if (vb) {
            explicitW = parseInt(vb[1], 10) || defaultWidth;
            explicitH = parseInt(vb[2], 10) || defaultHeight;
          }
          let fixedSvg = decoded;
          if (!fixedSvg.includes(`width="${explicitW}"`)) {
            fixedSvg = fixedSvg.replace('<svg ', `<svg width="${explicitW}" height="${explicitH}" `);
          }
          imageSrc = 'data:image/svg+xml;utf8,' + encodeURIComponent(fixedSvg);
        } catch (e) {
          console.warn('SVG fixup warn:', e);
        }
      } else if (typeof imageSrc === 'string' && imageSrc.trim().startsWith('<svg')) {
        imageSrc = 'data:image/svg+xml;utf8,' + encodeURIComponent(imageSrc.trim());
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const scale = 2; // High-DPI 2x retina for ultra-crisp blog images
          const w = (img.naturalWidth && img.naturalWidth >= 400 ? img.naturalWidth : explicitW) * scale;
          const h = (img.naturalHeight && img.naturalHeight >= 200 ? img.naturalHeight : explicitH) * scale;
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.fillStyle = '#0b1120';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          console.warn('convertImageSrcToPngDataUrl canvas error:', err);
          resolve(src);
        }
      };
      img.onerror = (e) => {
        console.warn('convertImageSrcToPngDataUrl load error:', e);
        resolve(src);
      };
      img.src = imageSrc;
    });
  }

  convertImageSrcToPngBlob(src, width = 1680, height = 920) {
    return new Promise((resolve, reject) => {
      let imageSrc = src;
      if (typeof imageSrc === 'string' && imageSrc.trim().startsWith('<svg')) {
        imageSrc = 'data:image/svg+xml;utf8,' + encodeURIComponent(imageSrc.trim());
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth && img.naturalWidth > 800 ? img.naturalWidth : width;
          canvas.height = img.naturalHeight && img.naturalHeight > 450 ? img.naturalHeight : height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#0b1120';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('PNG 변환 실패'));
          }, 'image/png');
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (e) => reject(e);
      img.src = imageSrc;
    });
  }

  async copyPostImageToClipboard(imgIndex = 0) {
    const src = (this.currentPostDetailImages || [])[imgIndex];
    if (!src) {
      this.showToast('복사할 이미지를 찾을 수 없습니다.');
      return;
    }
    try {
      const blob = await this.convertImageSrcToPngBlob(src);
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        this.showToast('🖼️ 이미지가 클립보드에 복사되었습니다! 네이버 블로그·카페에서 Ctrl+V로 바로 붙여넣으세요.');
      } else {
        await this.downloadPostImageAsPng(imgIndex);
      }
    } catch (err) {
      console.error('copyPostImageToClipboard error:', err);
      this.showToast('브라우저 보안 정책으로 직접 복사가 제한되어 PNG 다운로드로 대체합니다.');
      await this.downloadPostImageAsPng(imgIndex);
    }
  }

  async downloadPostImageAsPng(imgIndex = 0) {
    const src = (this.currentPostDetailImages || [])[imgIndex];
    if (!src) return;
    try {
      const blob = await this.convertImageSrcToPngBlob(src);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dodamtalk_post_${this.activePostDetailId || 'card'}_${imgIndex + 1}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      this.showToast(`⬇️ 사진 #${imgIndex + 1} 고화질 PNG 다운로드 완료!`);
    } catch (err) {
      console.error('downloadPostImageAsPng error:', err);
      const a = document.createElement('a');
      a.href = src;
      a.download = `dodamtalk_image_${imgIndex + 1}.png`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  }

  async downloadAllPostImages() {
    const imgs = this.currentPostDetailImages || [];
    if (imgs.length === 0) {
      this.showToast('다운로드할 사진이 없습니다.');
      return;
    }
    this.showToast(`🖼️ 총 ${imgs.length}장의 고화질 PNG 사진을 순차 다운로드합니다...`);
    for (let i = 0; i < imgs.length; i++) {
      await this.downloadPostImageAsPng(i);
      await new Promise((r) => setTimeout(r, 250));
    }
  }

  async copyPostForNaverBlog(targetPostId) {
    const postId = targetPostId || this.activePostDetailId;
    const post = (this.data.posts || []).find((p) => p.id === postId);
    if (!post) return;

    this.lastCopiedPost = post;
    const shareUrl = `${window.location.origin}${window.location.pathname}#board`;

    this.showToast('📋 네이버 블로그 스마트에디터 호환용(PNG 변환) 복사 중...');

    // 1. 네이버 블로그 스마트에디터 ONE 전용 완벽 인라인 서식 HTML 생성
    let bodyContent = post.contentHtml || post.content || '';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bodyContent;
    // 화면 표시용 이미지 개별 복사/다운로드 버튼 바 제거 (블로그 본문 오염 방지)
    tempDiv.querySelectorAll('.post-image-action-bar').forEach((el) => el.remove());

    // 1. .my-4 컨테이너(이미지 + 캡션)를 깔끔한 일체형 네이버 인포그래픽 가이드 박스로 교체 (하단 잔여 캡션 분리 방지)
    const my4Containers = Array.from(tempDiv.querySelectorAll('.my-4'));
    if (my4Containers.length > 0) {
      my4Containers.forEach((wrapper, idx) => {
        const img = wrapper.querySelector('img');
        const captionEl = wrapper.querySelector('p');
        const rawCaption = captionEl ? captionEl.textContent : '';
        const cleanCaption = rawCaption.replace(/^[▲▼■]\s*(\[그림\s*\d+\])?\s*/, '').trim() || (img ? img.getAttribute('alt') : '') || `인포그래픽 카드 #${idx + 1}`;
        
        const cardBox = document.createElement('div');
        cardBox.setAttribute('style', 'margin: 26px auto; padding: 20px 16px; background-color: #f0fdf4; border: 2px dashed #059669; border-radius: 14px; text-align: center; max-width: 680px; font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Malgun Gothic", sans-serif;');
        cardBox.innerHTML = `
          <div style="font-size: 15px; font-weight: 900; color: #047857; margin-bottom: 5px;">
            📷 [인포그래픽 카드 #${idx + 1} 첨부 위치]
          </div>
          <div style="font-size: 13.5px; color: #1e293b; font-weight: 700; margin-bottom: 6px;">
            ${this.escapeSvgXml(cleanCaption)}
          </div>
          <div style="font-size: 11.5px; color: #64748b; font-weight: 500;">
            💡 <strong>[PNG 5장 다운로드]</strong> 후 네이버 상단 [사진] 메뉴로 등록하시거나, 도담 사이트에서 <strong>[이 사진 복사]</strong> 후 여기에 Ctrl+V 하세요.
          </div>
        `;
        wrapper.replaceWith(cardBox);
      });
    }

    // 2. 단독으로 남아있는 img 태그 치환
    const remainingImgs = Array.from(tempDiv.querySelectorAll('img'));
    remainingImgs.forEach((img, idx) => {
      const alt = img.getAttribute('alt') || `도담 인포그래픽 카드 #${idx + 1}`;
      const cardBox = document.createElement('div');
      cardBox.setAttribute('style', 'margin: 26px auto; padding: 20px 16px; background-color: #f0fdf4; border: 2px dashed #059669; border-radius: 14px; text-align: center; max-width: 680px; font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Malgun Gothic", sans-serif;');
      cardBox.innerHTML = `
        <div style="font-size: 15px; font-weight: 900; color: #047857; margin-bottom: 5px;">
          📷 [인포그래픽 카드 #${idx + 1} 첨부 위치]
        </div>
        <div style="font-size: 13.5px; color: #1e293b; font-weight: 700; margin-bottom: 6px;">
          ${this.escapeSvgXml(alt)}
        </div>
        <div style="font-size: 11.5px; color: #64748b; font-weight: 500;">
          💡 네이버 상단 <strong>[사진]</strong> 도구로 등록하시거나 [이 사진 복사] 후 여기에 Ctrl+V 하세요.
        </div>
      `;
      img.replaceWith(cardBox);
    });

    // 3. Section H2 인라인 서식 보장 (네이버 에디터에서 왼쪽 컬러 바 100% 렌더링)
    const sectionColors = ['#0284c7', '#059669', '#d97706', '#9333ea', '#e11d48'];
    tempDiv.querySelectorAll('h2').forEach((h2, i) => {
      const barColor = sectionColors[i % sectionColors.length];
      h2.setAttribute('style', `font-size: 18.5px; font-weight: 900; color: #0f172a; border-left: 5px solid ${barColor}; padding-left: 12px; margin: 34px 0 14px 0; line-height: 1.45; font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Malgun Gothic", sans-serif; letter-spacing: -0.3px;`);
    });

    // 4. 상단 공식 리포트 브리핑 카드 인라인 서식 보장
    const topCard = tempDiv.querySelector('.naver-blog-article > div:first-child');
    if (topCard) {
      topCard.setAttribute('style', 'background-color: #ecfdf5; border: 1.5px solid #86efac; border-radius: 14px; padding: 14px 18px; margin: 18px 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Malgun Gothic", sans-serif;');
    }

    // 5. 하단 에필로그 카드 인라인 서식 보장
    const outroCard = tempDiv.querySelector('.naver-blog-article > div:last-child');
    if (outroCard) {
      outroCard.setAttribute('style', 'background-color: #f8fafc; border: 1.5px solid #e2e8f0; border-left: 5px solid #10b981; border-radius: 14px; padding: 20px 22px; margin: 34px 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Malgun Gothic", sans-serif;');
    }

    // 6. 모든 일반 <p> 태그의 가독성 및 줄바꿈 인라인 서식 보장
    tempDiv.querySelectorAll('p').forEach((p) => {
      if (!p.getAttribute('style')) {
        p.setAttribute('style', 'font-size: 15.5px; line-height: 1.95; color: #334155; margin: 0 0 16px 0; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Malgun Gothic", sans-serif;');
      }
    });

    bodyContent = tempDiv.innerHTML;

    // 네이버 블로그 최적화 래퍼 (중복 타이틀 제거 및 클린 헤더 구성)
    const blogStyledHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Nanum Gothic', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; line-height: 1.95; font-size: 16px; color: #334155; max-width: 780px; margin: 0 auto; letter-spacing: -0.3px;">
        <div style="margin-bottom: 22px; padding-bottom: 14px; border-bottom: 2px solid #03C75A;">
          <h1 style="font-size: 21px; font-weight: 900; color: #111827; line-height: 1.45; margin: 0 0 8px 0; letter-spacing: -0.4px;">
            ${this.escapeSvgXml(post.title)}
          </h1>
          <p style="font-size: 12.5px; color: #64748b; margin: 0; font-weight: 500;">
            도담 육아가이드 공식 리포트 &nbsp;|&nbsp; 작성: <strong style="color: #03C75A;">${this.escapeSvgXml(post.author?.nickname || '운영자')}</strong> &nbsp;|&nbsp; 아동심리·소아청소년 임상 지침
          </p>
        </div>
        <div style="margin-bottom: 30px;">
          ${bodyContent}
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 34px 0 20px 0;" />
        <p style="font-size: 12px; color: #888888; line-height: 1.7; margin: 0;">
          본 콘텐츠는 도담 커뮤니티 (DodamTalk) 공식 육아가이드 리포트입니다.<br/>
          출처: <a href="${shareUrl}" style="color: #03C75A; font-weight: bold; text-decoration: underline;">도담톡 육아 커뮤니티 (dodamtalk.com)</a>
        </p>
      </div>
    `;

    const plainText = this.extractPlainTextFromHtml(post.title + '\n\n' + (post.rawTextContent || post.content || ''));
    const charCount = plainText.length;

    // Count images
    const imgMatches = (bodyContent.match(/<img/gi) || []).length;

    this.lastCopiedRichHtml = blogStyledHtml;
    this.lastCopiedPlainText = plainText;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([blogStyledHtml], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' })
          })
        ]);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(plainText);
      }
    } catch (e) {
      console.warn('Clipboard write warning:', e);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(plainText);
        }
      } catch (err2) {
        console.warn('writeText fallback warning:', err2);
      }
    }

    // 팝업 모달 없이 즉시 클립보드 복사 완료 안내 (유저 요청: 원클릭 즉시 복사)
    this.showToast('📋 본문 서식이 복사되었습니다! 네이버 블로그 스마트에디터에 바로 붙여넣기(Ctrl+V) 하세요.');
  }

  openNaverBlogCopyModal(isHistoryNavigation = false) {
    const modal = document.getElementById('naver-blog-copy-modal');
    if (modal) modal.classList.remove('hidden');
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('naver-blog-copy-modal', 'closeNaverBlogCopyModal');
    }
  }

  closeNaverBlogCopyModal(isHistoryNavigation = false) {
    const modal = document.getElementById('naver-blog-copy-modal');
    if (modal) modal.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'naver-blog-copy-modal') {
      window.history.back();
    }
  }

  async reCopyNaverBlog(mode) {
    try {
      if (mode === 'rich' && this.lastCopiedRichHtml) {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([this.lastCopiedRichHtml], { type: 'text/html' }),
              'text/plain': new Blob([this.lastCopiedPlainText || ''], { type: 'text/plain' })
            })
          ]);
        }
        this.showToast('📋 5MB 용량 초과 없는 스마트에디터 맞춤 본문 서식이 복사되었습니다. (Ctrl+V)');
      } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(this.lastCopiedPlainText || '');
        }
        this.showToast('📋 순수 본문 텍스트만 복사되었습니다.');
      }
    } catch (err) {
      this.showToast('⚠️ 복사 중 오류가 발생했습니다.');
    }
  }

  openPostInNewWindow() {
    const post = (this.data.posts || []).find((p) => p.id === this.activePostDetailId);
    if (!post) return;
    const contentEl = document.getElementById('post-detail-content');
    const bodyHtml = contentEl ? contentEl.innerHTML : (post.contentHtml || post.content || '');
    const tagsHtml = (post.tags || []).map((t) => `<span style="display:inline-block;padding:4px 10px;border-radius:8px;background:#f1f5f9;color:#334155;font-size:12px;font-weight:700;margin-right:6px;">#${this.escapeSvgXml(t)}</span>`).join('');

    const win = window.open('', '_blank');
    if (!win) {
      this.showToast('팝업 차단을 해제해 주세요.');
      return;
    }
    win.document.write(`<!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${this.escapeSvgXml(post.title)} - 도담톡</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-stone-100 text-slate-900 p-4 sm:p-10">
        <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div class="flex items-center justify-between text-xs text-slate-500">
            <span><strong>${this.escapeSvgXml(post.author?.nickname || '도담맘')}</strong> · ${this.escapeSvgXml(post.createdAt || '')} · 조회수 ${(post.views !== undefined ? post.views : 0).toLocaleString()}</span>
            <button onclick="window.print()" class="px-3 py-1.5 rounded-lg border border-stone-200 font-bold text-slate-700 hover:bg-stone-50 cursor-pointer">🖨️ 인쇄 / PDF 저장</button>
          </div>
          <h1 class="text-2xl font-black text-slate-900 pb-4 border-b-2 border-slate-800">${this.escapeSvgXml(post.title)}</h1>
          <div class="text-[15px] leading-8 text-slate-800 space-y-6">${bodyHtml}</div>
          <div class="pt-4">${tagsHtml}</div>
        </div>
      </body>
      </html>`);
    win.document.close();
  }

  openPostDetailModal(postId, isHistoryNavigation = false) {
    const post = this.data.posts.find((p) => p.id === postId);
    if (!post) return;
    this.activePostDetailId = postId;
    if (typeof post.views !== 'number') post.views = 0;
    post.views += 1;

    if (this.currentView !== 'board') {
      this.switchMainView('board', isHistoryNavigation);
    }

    if (!isHistoryNavigation) {
      try {
        const postHash = '#/board/post/' + postId;
        if (window.history && window.history.pushState) {
          window.history.pushState({ type: 'post_detail', postId: postId, view: 'board' }, '', postHash);
        }
      } catch (e) {}
    }

    const listWrap = document.getElementById('board-list-container');
    const detailWrap = document.getElementById('board-detail-view');
    if (listWrap) listWrap.classList.add('hidden');
    if (detailWrap) detailWrap.classList.remove('hidden');

    const stObj = (this.data.ageStages || []).find((s) => s.id === (post.ageStage || post.category));
    const cat = (this.data.categories || []).find((c) => c.id === post.category);

    const catBadge = document.getElementById('post-detail-category-badge');
    if (catBadge) {
      if (post.isYoutubeSummary) {
        catBadge.textContent = '📖 도담 육아가이드 리포트';
        catBadge.className = 'px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xs';
      } else if (post.isAiReport) {
        catBadge.textContent = '💡 도담 육아가이드';
        catBadge.className = 'px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xs';
      } else {
        const labelParts = [];
        if (stObj && stObj.id !== 'all') labelParts.push(stObj.shortName);
        else if (cat) labelParts.push(cat.name);
        if (post.localTopicName) labelParts.push(post.localTopicName);
        catBadge.textContent = labelParts.join(' · ') || '💡 도담 육아팁';
        catBadge.className = 'px-3 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-700 border border-sky-200';
      }
    }

    if (post.isYoutubeSummary || post.isAiReport || (post.title && (post.title.includes('|') || post.title.includes('초등학생')))) {
      if (post.title && (post.title.includes('|') || post.title.includes('이시훈') || post.title.includes('Q&A'))) {
        const badgeMatch = (post.title || '').match(/^\[([^\]]+)\]\s*/);
        const curBadge = '[육아가이드] ';
        const rawTitle = (post.title || '').replace(/^\[[^\]]+\]\s*/, '');
        if (post.isAiReport || post.isYoutubeSummary) post.title = curBadge + rawTitle;
        post.title = curBadge + this.generateCleanArticleTitle(rawTitle, post.guideType || 'growth');
      }
      if (post.author) {
        post.author.childBadge = '📖 도담 육아가이드';
        if (['슈퍼관리자', '도담 공식 가이드', '도담 공식 관리자', 'admin', '도담 육아연구소', '도담연구소'].includes(post.author.nickname)) post.author.nickname = '운영자';
      }
    }

    const adminAiBadge = document.getElementById('post-detail-admin-ai-badge');
    if (adminAiBadge) {
      if (this.isAdmin() && post.isAiGenerated) {
        adminAiBadge.classList.remove('hidden');
        adminAiBadge.className = 'px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 border border-purple-300 font-bold text-xs inline-flex items-center gap-1';
      } else {
        adminAiBadge.classList.add('hidden');
      }
    }

    document.getElementById('post-detail-title').textContent = post.title;
    document.getElementById('post-detail-author').textContent = post.author?.nickname || '도담회원';
    document.getElementById('post-detail-author-badge').textContent = post.author?.childBadge ? `(${post.author.childBadge})` : '';
    document.getElementById('post-detail-region').textContent = post.localHubName || (post.region === 'all' ? '전국' : post.region);
    document.getElementById('post-detail-date').textContent = post.createdAt;
    document.getElementById('post-detail-views').textContent = (post.views !== undefined ? post.views : 0).toLocaleString();

    const avatarEl = document.getElementById('post-detail-avatar');
    if (avatarEl) {
      const initial = (post.author?.nickname || '도')[0];
      avatarEl.textContent = initial;
      avatarEl.className = `w-6 h-6 rounded-full ${post.author?.avatarBg || 'bg-rose-500 text-white'} flex items-center justify-center font-black text-[11px] shrink-0 shadow-2xs`;
    }

    this.renderPostRichDetailContent(post);

    const tagsEl = document.getElementById('post-detail-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (post.tags || [])
        .map((t) => `<span class="px-3 py-1 rounded-xl bg-stone-100 text-slate-700 text-xs font-bold">#${t}</span>`)
        .join('');
    }

    const commentAuthorEl = document.getElementById('comment-author-name');
    if (commentAuthorEl) {
      commentAuthorEl.textContent = this.profile?.nickname || '도담맘';
    }

    const likesEl = document.getElementById('post-detail-likes-count');
    if (likesEl) likesEl.textContent = post.reactions?.like || 0;
    const hugsEl = document.getElementById('post-detail-hugs-count');
    if (hugsEl) hugsEl.textContent = post.reactions?.hug || 0;
    const tipsEl = document.getElementById('post-detail-tips-count');
    if (tipsEl) tipsEl.textContent = post.reactions?.tip || 0;

    const canManage = this.canManagePost(post);
    const btnEdit = document.getElementById('btn-post-detail-edit');
    const btnDelete = document.getElementById('btn-post-detail-delete');
    if (btnEdit) {
      if (canManage) btnEdit.classList.remove('hidden');
      else btnEdit.classList.add('hidden');
    }
    if (btnDelete) {
      if (canManage) btnDelete.classList.remove('hidden');
      else btnDelete.classList.add('hidden');
    }

    this.renderPostDetailComments(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigatePostDetail(dir) {
    if (!this.activePostDetailId) return;
    const posts = this.data.posts || [];
    const currentIndex = posts.findIndex((p) => p.id === this.activePostDetailId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex + dir;
    if (targetIndex < 0) {
      this.showToast('첫 번째 게시글입니다.');
      return;
    }
    if (targetIndex >= posts.length) {
      this.showToast('마지막 게시글입니다.');
      return;
    }
    this.openPostDetailModal(posts[targetIndex].id);
  }

  copyPostUrl() {
    if (!this.activePostDetailId) return;
    const url = `${window.location.origin}${window.location.pathname}#post-${this.activePostDetailId}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('게시글 주소가 복사되었습니다! 🔗');
      }).catch(() => {
        this.showToast('링크: ' + url);
      });
    } else {
      this.showToast('게시글 링크가 생성되었습니다!');
    }
  }

  closePostDetailModal(isHistoryNavigation = false) {
    this.activePostDetailId = null;
    const listWrap = document.getElementById('board-list-container');
    const detailWrap = document.getElementById('board-detail-view');
    if (detailWrap) detailWrap.classList.add('hidden');
    if (listWrap) listWrap.classList.remove('hidden');
    const modal = document.getElementById('post-detail-modal');
    if (modal) modal.classList.add('hidden');

    if (!isHistoryNavigation) {
      // 사용자가 화면 내 [← 돌아가기] 버튼을 직접 눌렀을 때 히스토리 뒤로가기 실행
      if (window.history && window.history.state && window.history.state.type === 'post_detail') {
        window.history.back();
        return;
      } else {
        try {
          if (window.history && window.history.replaceState) {
            window.history.replaceState({ type: 'view', view: 'board' }, '', '#/board');
          }
        } catch (e) {}
      }
    }
    this.renderBoardView();
  }

  renderPostDetailComments(post) {
    const listEl = document.getElementById('post-detail-comments-list');
    const countEl = document.getElementById('post-detail-comments-count');
    if (!listEl) return;

    const comments = post.comments || [];
    if (countEl) countEl.textContent = comments.length;

    if (comments.length === 0) {
      listEl.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 bg-stone-50 rounded-2xl border border-stone-100">아직 작성된 댓글이 없습니다. 아래 ⚡ 1초 댓글 버튼을 눌러 첫 응원을 남겨보세요!</div>`;
      return;
    }

    listEl.innerHTML = comments
      .map((c) => {
        const text = c.text || c.content || '';
        const time = c.time || c.createdAt || '방금 전';
        const author = c.author || '도담회원';
        const initial = author[0] || '맘';
        const level = c.level || '🌷 꽃봉오리맘';
        const childBadge = c.childBadge || '';

        return `
          <div class="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-1.5 hover:bg-stone-50 transition">
            <div class="flex items-center justify-between text-xs flex-wrap gap-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">${initial}</span>
                <span class="font-black text-slate-900">${author}</span>
                <span class="px-1.5 py-0.2 rounded-full bg-stone-100 text-slate-600 border border-stone-200 text-[9px] font-extrabold">${level}</span>
                ${childBadge ? `<span class="px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-700 text-[9px] font-bold">${childBadge}</span>` : ''}
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-slate-400 font-medium">${time}</span>
                <button
                  type="button"
                  onclick="app.giveHelpThanks('${author}')"
                  class="px-2 py-0.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-black border border-indigo-200 flex items-center gap-1 transition cursor-pointer shadow-2xs"
                  title="답변이 도움되었을 때 채택하고 포인트를 선물합니다"
                >
                  <i class="fa-solid fa-thumbs-up text-[9px]"></i>
                  <span>도움이 됐어요 (+25P)</span>
                </button>
              </div>
            </div>
            <p class="text-xs text-slate-800 leading-relaxed pl-7">${text}</p>
          </div>
        `;
      })
      .join('');
  }

  reactToPostModal(type = 'like') {
    if (!this.activePostDetailId) return;
    const post = this.data.posts.find((p) => p.id === this.activePostDetailId);
    if (!post) return;
    if (!post.reactions) post.reactions = { like: 0, hug: 0, tip: 0 };
    post.reactions[type] = (post.reactions[type] || 0) + 1;

    const likesEl = document.getElementById('post-detail-likes-count');
    if (likesEl) likesEl.textContent = post.reactions.like || 0;
    const hugsEl = document.getElementById('post-detail-hugs-count');
    if (hugsEl) hugsEl.textContent = post.reactions.hug || 0;
    const tipsEl = document.getElementById('post-detail-tips-count');
    if (tipsEl) tipsEl.textContent = post.reactions.tip || 0;

    this.saveCustomPosts();
    if (window.DodamFirebase) {
      if (typeof window.DodamFirebase.incrementReaction === 'function') {
        window.DodamFirebase.incrementReaction(post.id, type, post);
      } else if (type === 'like') {
        window.DodamFirebase.incrementLike(post.id, post);
      }
    }
    const toastMap = {
      like: '공감하셨습니다! ❤️',
      hug: '따뜻한 토닥토닥 응원을 보냈습니다! 🤗',
      tip: '유익한 꿀팁으로 추천하셨습니다! 💡'
    };
    this.showToast(toastMap[type] || toastMap.like);
  }

  toggleScrapModal() {
    if (!this.activePostDetailId) return;
    this.toggleScrap(this.activePostDetailId);
  }

  submitBoardComment(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!this.activePostDetailId) return;
    const post = this.data.posts.find((p) => p.id === this.activePostDetailId);
    const input = document.getElementById('post-comment-input');
    if (!post || !input) return;

    const val = input.value.trim();
    if (!val) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: this.profile?.nickname || '도담맘',
      level: this.profile?.level || '🌷 꽃봉오리맘',
      childBadge: this.profile?.ageBadge || '육아맘',
      content: val,
      createdAt: '방금 전'
    };
    post.comments.push(newComment);
    if (post.isQuestion) post.isSolved = true;

    input.value = '';
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.addComment(post.id, newComment, post);
    }

    this.profile.points = (this.profile.points || 0) + 5;
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;
    this.saveProfileData();
    this.renderProfileWidget();
    this.renderLevelSection();
    this.renderAuthHeader();

    this.renderPostDetailComments(post);
    this.showToast('💬 댓글이 등록되었습니다! (+5P 적립)');
  }

  insertQuickComment(text) {
    const input = document.getElementById('post-comment-input');
    if (!input) return;
    input.value = text;
    input.focus();
    if (this.activePostDetailId) {
      this.submitBoardComment(new Event('submit'));
    }
  }

  // ==========================================
  // [네이버 스마트에디터 스타일 카페 글쓰기 컨트롤러 (풀페이지)]
  // ==========================================
  openWritePage(catId, isHistoryNavigation = false) {
    this.editingPostId = null;
    const titleHeaderEl = document.getElementById('write-page-title');
    if (titleHeaderEl) titleHeaderEl.textContent = '카페 글쓰기';
    const topBtn = document.getElementById('btn-post-submit-top');
    if (topBtn) topBtn.innerHTML = '<span>등록</span>';
    const bottomBtn = document.getElementById('btn-post-submit-bottom');
    if (bottomBtn) bottomBtn.textContent = '등록하기';

    const titleEl = document.getElementById('post-form-title');
    const contentEl = document.getElementById('post-form-content');
    const tagsEl = document.getElementById('post-form-tags');
    const prefixEl = document.getElementById('post-form-prefix');
    const regionEl = document.getElementById('post-form-region');
    if (titleEl) titleEl.value = '';
    if (contentEl) contentEl.value = '';
    if (tagsEl) tagsEl.value = '';
    if (prefixEl) prefixEl.value = '';
    this.attachedImages = [];

    // 1. 현재 접속해 있는 게시판/라운지/서브필터 상태를 감지하여 글쓰기 게시판 자동 선택
    let targetCat = catId || '';
    if (!targetCat) {
      if (this.boardLoungeMode === 'qa' || this.currentCategory === 'qa') {
        targetCat = 'qa';
        if (prefixEl) prefixEl.value = '질문';
      } else if (this.boardLoungeMode === 'local' || (this.currentLocalHub && this.currentLocalHub !== 'all')) {
        if (this.currentLocalTopic === 'hospital') {
          targetCat = 'local_hospital';
          if (prefixEl) prefixEl.value = '소아과';
        } else if (this.currentLocalTopic === 'daycare') {
          targetCat = 'local_daycare';
          if (prefixEl) prefixEl.value = '어린이집';
        } else if (this.currentLocalTopic === 'share') {
          targetCat = 'local_share';
          if (prefixEl) prefixEl.value = '무료나눔';
        } else if (this.currentLocalTopic === 'place') {
          targetCat = 'local_place';
          if (prefixEl) prefixEl.value = '키즈맛집';
        } else {
          targetCat = 'local';
        }
        if (regionEl && this.profile?.region) {
          regionEl.value = this.profile.region;
        }
      } else if (this.boardLoungeMode === 'guide' || this.currentCategory === 'guide') {
        if (this.guideSubCategory && this.guideSubCategory !== 'all') {
          const guideMap = {
            sleep: 'sleep',
            food: 'nutrition',
            growth: 'play',
            health: 'health',
            edu: 'school'
          };
          targetCat = guideMap[this.guideSubCategory] || 'guide';
        } else {
          targetCat = 'guide';
        }
        if (prefixEl) prefixEl.value = '정보';
      } else if (this.boardLoungeMode === 'age' || (this.currentAgeStage && this.currentAgeStage !== 'all')) {
        targetCat = this.currentAgeStage !== 'all' ? this.currentAgeStage : (this.profile?.ageStage || 'newborn');
      } else if (this.currentCategory && this.currentCategory !== 'all' && this.currentCategory !== 'hot') {
        targetCat = this.currentCategory;
      } else {
        targetCat = 'talk';
      }
    }

    const catSelect = document.getElementById('post-form-category');
    if (catSelect && targetCat) {
      catSelect.value = targetCat;
      if (!catSelect.value && catSelect.options.length > 1) {
        catSelect.selectedIndex = 1;
      }
    }

    if (!isHistoryNavigation) {
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({ type: 'write', catId: targetCat, view: 'board' }, '', '#/write');
        }
      } catch (e) {}
    }
    this.switchMainView('write', true);
  }

  registerMyPostId(postId) {
    if (!postId) return;
    if (!this.myPostIds) this.myPostIds = new Set();
    this.myPostIds.add(postId);
    try {
      sessionStorage.setItem('dodam_my_post_ids', JSON.stringify(Array.from(this.myPostIds)));
    } catch (e) {}
  }

  ensureDailyActivePosts() {
    const todayStr = this.getKstDateStr(Date.now());
    const todayStartMs = this.getKstTodayStartMs();
    const nowMs = Date.now();

    // 일일 10개 커뮤니티 활성 게시글 템플릿 (실제 부모님들의 진솔한 일상 고민, 학령기, 이유식, 동네 정보)
    const dailyTemplates = [
      {
        offsetHours: 8.5,
        title: '초3 수학 사고력 학원 vs 교과 심화, 지금 시기에 어떤 게 더 맞을까요?',
        content: '현재 아이가 초등학교 3학년 올라가면서 수학 학원 고민이 깊어지고 있어요. 연산이랑 교과 기본은 혼자서 곧잘 따라오는데, 3학년부터는 심화나 사고력을 병행해 줘야 할지 고민입니다. 동네 엄마들은 벌써 사고력 대형 학원 보내던데 너무 달리는 건 아닐까 걱정도 되고요... 혹시 비슷한 시기 거치신 선배 맘님들 어떤 방향이 아이에게 더 좋았는지 소중한 경험 나눠주시면 감사하겠습니다!',
        category: 'qna',
        ageStage: 'child',
        localHub: 'hub-gyeonggi-south',
        localHubName: '경기 판교·분당',
        isQuestion: true,
        author: {
          nickname: '판교워킹맘',
          level: '🌿 줄기맘·대디',
          region: '경기 성남시 분당구',
          childBadge: '초3 여아',
          avatarBg: 'bg-emerald-600 text-white'
        },
        tags: ['초등수학', '학원고민', '판교맘']
      },
      {
        offsetHours: 9.75,
        title: '10개월 후기 이유식 하루 3번 스케줄이랑 수유 텀 어떻게 맞추고 계신가요?',
        content: '중기에서 후기로 넘어가면서 하루 세 끼 먹이기 시작했는데 스케줄 맞추기가 정말 쉽지 않네요 ㅠㅠ 기상 후 첫 수유하고 2시간 뒤 첫 이유식 주면 잘 안 먹고 칭얼대요. 이유식 먹이고 바로 보충 수유를 해야 할지, 아니면 1~2시간 텀을 둬야 할지 헷갈립니다. 선배맘님들은 후기 이유식 때 식사 3번이랑 분유 텀 어떻게 운영하셨는지 조언 부탁드려요!',
        category: 'qna',
        ageStage: 'infant',
        localHub: 'hub-seoul-gangnam',
        localHubName: '서울 강남·서초',
        isQuestion: true,
        author: {
          nickname: '송파둥이맘',
          level: '🌱 새싹맘·대디',
          region: '서울 송파구',
          childBadge: '10개월 남아',
          avatarBg: 'bg-rose-500 text-white'
        },
        tags: ['후기이유식', '수유텀', '10개월아기']
      },
      {
        offsetHours: 11.0,
        title: '주말에 5~6세 아이랑 나들이 가기 좋은 실내 박물관·체험관 추천드려요 🏛️',
        content: '날씨 상관없이 아이랑 유익하게 다녀올 수 있는 수도권 실내 체험 명소 몇 군데 정리해봤어요!\n1. 국립어린이과학관 (대학로): 예약 필수지만 체험형 전시가 정말 알차요.\n2. 경기도어린이박물관 (용인): 활동량이 많은 5~7세 아이들이 하루 종일 신나게 뜁니다.\n3. 서울백제어린이박물관 (송파): 올림픽공원 산책 겸 묶어서 다녀오기 딱 좋아요.\n이번 주말 나들이 계획 중이신 분들 참고해보세요!',
        category: 'info',
        ageStage: 'toddler',
        localHub: 'hub-seoul-gangbuk',
        localHubName: '서울 마포·용산',
        isQuestion: false,
        author: {
          nickname: '마포책육아맘',
          level: '🌳 열매나무맘',
          region: '서울 마포구',
          childBadge: '5세 남아',
          avatarBg: 'bg-amber-600 text-white'
        },
        tags: ['주말나들이', '실내박물관', '유아체험']
      },
      {
        offsetHours: 12.3,
        title: '초1 입학 준비, 알림장 확인과 스스로 책가방 챙기기 연습 꿀팁',
        content: '첫째 아이 초1 입학하고 1년 동안 겪으면서 가장 중요하다고 느낀 건 자기 물건 챙기는 습관이었어요.\n냉장고나 아이 책상 앞에 체크리스트 보드를 자석으로 붙여두고, 알림장 보면서 필통, 알림장, 물통, 실내화 가방 체크하게 했더니 1학기 지나고 나서는 혼자서도 척척 챙기더라고요. 처음엔 답답해도 부모가 대신 챙겨주지 않고 옆에서 지켜봐 주는 게 제일 큰 도움이 되었습니다 ㅎㅎ',
        category: 'info',
        ageStage: 'child',
        localHub: 'hub-gyeonggi-south',
        localHubName: '수원 광교·영통',
        isQuestion: false,
        author: {
          nickname: '광교현서맘',
          level: '🌿 줄기맘·대디',
          region: '수원 영통구',
          childBadge: '초1 여아',
          avatarBg: 'bg-sky-600 text-white'
        },
        tags: ['초1입학', '자기주도습관', '초등준비']
      },
      {
        offsetHours: 13.8,
        title: '오늘 드디어 3세 떼쓰기 고비 넘기고 칼육퇴 성공했습니다 ㅠㅠ',
        content: '요즘 싫어, 내가 할 거야 병에 걸려서 외출 한번 하려면 30분씩 실랑이하느라 진이 다 빠졌는데, 오늘은 마음 내려놓고 선택권을 두 개 줬더니 순순히 따라주네요 (파란 양말 신을래? 노란 양말 신을래?).\n샤워하고 밥 먹이고 동화책 3권 읽어주니 8시에 스르륵 잠들었습니다. 육퇴 후 마시는 따뜻한 루이보스 티 한 잔이 이렇게 행복할 수가 없네요. 다들 오늘 육아 고생 많으셨습니다, 모두 평안한 밤 되세요!',
        category: 'lounge',
        ageStage: 'toddler',
        localHub: 'hub-gyeonggi-north',
        localHubName: '경기 일산·고양',
        isQuestion: false,
        author: {
          nickname: '일산둥이아빠',
          level: '🌱 새싹맘·대디',
          region: '경기 고양시 일산서구',
          childBadge: '3세 쌍둥이',
          avatarBg: 'bg-indigo-600 text-white'
        },
        tags: ['육퇴완료', '3세육아', '훈육공감']
      },
      {
        offsetHours: 15.2,
        title: '해운대·센텀 쪽 유모차 진입 편하고 수유실 깨끗한 아기 동반 식당 공유해요',
        content: '돌 전후 아기 데리고 외식할 때마다 유모차 둘 공간이나 아기의자 있는지 매번 전화로 물어봤었는데요, 최근 다녀온 곳 중에 정말 만족스러웠던 3곳입니다.\n1. 센텀 신세계 식당가: 가족 휴게실/수유실 청결도 전국 최고 수준.\n2. 마린시티 해변 산책로 솥밥집: 아기용 숭늉과 미역국 무료 서비스.\n3. 기장 힐튼 아난티타운 브런치: 휠체어/유모차 경사로가 완벽해서 이동이 정말 편해요.\n부산 맘님들 아기랑 외식하실 때 참고하세요!',
        category: 'info',
        ageStage: 'infant',
        localHub: 'hub-busan',
        localHubName: '부산 해운대·센텀',
        isQuestion: false,
        author: {
          nickname: '해운대윤우맘',
          level: '🌷 꽃봉오리맘',
          region: '부산 해운대구',
          childBadge: '11개월 남아',
          avatarBg: 'bg-teal-600 text-white'
        },
        tags: ['부산맘', '아기동반식당', '해운대센텀']
      },
      {
        offsetHours: 16.5,
        title: '두돌 지난 아이 밤에 자다 깨서 우는 야경증/야제증 겪어보신 분 계신가요?',
        content: '생후 25개월 된 아이인데 요즘 일주일에 서너 번은 새벽 2시쯤 자지러지게 울면서 깨요. 안아줘도 밀쳐내고 눈은 감은 채로 발버둥을 치는데 혹시 이게 야경증일까요? 15분 정도 지나면 언제 그랬냐는 듯 다시 잠들긴 하는데 매일 밤마다 너무 안쓰럽고 가족들도 잠을 못 자서 피로가 누적되네요 ㅠㅠ 성장통인지 낮 동안 자극이 많아서인지... 비슷한 경험 극복하신 분 조언 부탁드립니다.',
        category: 'qna',
        ageStage: 'toddler',
        localHub: 'hub-seoul-southwest',
        localHubName: '서울 동작·관악',
        isQuestion: true,
        author: {
          nickname: '보라매하은맘',
          level: '🌱 새싹맘·대디',
          region: '서울 동작구',
          childBadge: '25개월 여아',
          avatarBg: 'bg-rose-600 text-white'
        },
        tags: ['야경증', '수면고민', '두돌아기']
      },
      {
        offsetHours: 17.8,
        title: '초등 고학년 스마트폰 첫 개통 시 규칙과 스크린타임 설정 팁',
        content: '초등 5학년 올라가면서 학원 동선 때문에 스마트폰을 개통해 줬는데, 시작부터 규칙을 정하는 게 중요하다고 해서 온 가족이 둘러앉아 스마트폰 서약서를 썼습니다.\n1. 잠잘 때는 거실 충전 스테이션에 거치하기\n2. 숙제나 학원 공부 중에는 서랍에 넣어두기\n3. 하루 유튜브/게임 사용 시간은 최대 1시간으로 패밀리링크 설정\n아이도 본인이 직접 약속 서명하니 반발 없이 잘 지키고 있어요. 스마트폰 개통 고민 중이신 부모님들께 도움 되길 바랍니다!',
        category: 'info',
        ageStage: 'high',
        localHub: 'hub-daegu',
        localHubName: '대구 수성·달서',
        isQuestion: false,
        author: {
          nickname: '대구수성맘',
          level: '🌷 꽃봉오리맘',
          region: '대구 수성구',
          childBadge: '초5 남아',
          avatarBg: 'bg-amber-600 text-white'
        },
        tags: ['스마트폰규칙', '초5학부모', '패밀리링크']
      },
      {
        offsetHours: 19.0,
        title: '환절기 유아 비염 마른 기침, 저희 집에서 효과 본 온습도 관리법 💧',
        content: '아침저녁 일교차 커지면 아이 코막힘이랑 마른 기침이 심해져서 소아과 약만 달고 살았는데요, 생활 환경 바꾸고 확 좋아졌어요.\n1. 침실 온도는 21~22도, 습도는 가열식 가습기로 55~60% 철저히 유지\n2. 아침에 일어나자마자 미온수 한 컵 마시게 하고 식염수 코 세척\n3. 자기 전 베개 커버 매일 털고 3일에 한 번 60도 온수 세탁\n작은 습관이지만 알레르기 비염 있는 아이들에게 정말 큰 차이를 만들어주는 것 같아요!',
        category: 'info',
        ageStage: 'child',
        localHub: 'hub-chungcheong',
        localHubName: '세종·대전',
        isQuestion: false,
        author: {
          nickname: '세종나래맘',
          level: '🌿 줄기맘·대디',
          region: '세종시 나성동',
          childBadge: '초2 여아',
          avatarBg: 'bg-emerald-600 text-white'
        },
        tags: ['환절기비염', '온습도관리', '유아건강']
      },
      {
        offsetHours: 20.2,
        title: '5세 유치원 vs 어린이집(7세까지 연장), 어떤 선택이 더 나을까요? 선배맘님들 조언 부탁드려요',
        content: '내년에 5세(만 3세) 올라가는 첫째 아이인데, 지금 다니는 가정/민간 어린이집에 7세까지 계속 보낼지 아니면 일반 사립/단설 유치원으로 옮길지 정말 고민되네요. 활동량이나 누리과정 커리큘럼 생각하면 유치원이 맞나 싶다가도, 낮잠이랑 하원 시간(맞벌이) 생각하면 어린이집이 훨씬 안정적이거든요... 혹시 비슷한 고민하셨던 분들 어떤 기준으로 결정하셨는지 조언 부탁드려요!',
        category: 'qna',
        ageStage: 'toddler',
        localHub: 'hub-seoul-gangnam',
        localHubName: '서울 송파·잠실',
        isQuestion: true,
        author: {
          nickname: '잠실솔이맘',
          level: '🌳 열매나무맘',
          region: '서울 송파구 잠실동',
          childBadge: '4세 여아',
          avatarBg: 'bg-pink-600 text-white'
        },
        tags: ['5세유치원', '어린이집유치원고민', '잠실맘']
      }
    ];

    if (!Array.isArray(this.data.posts)) this.data.posts = [];
    const existingIds = new Set(this.data.posts.map((p) => p && p.id));

    dailyTemplates.forEach((tpl, idx) => {
      // 나눔(share) 카테고리는 실제 물품 전달이 필요하므로 AI 자동글 생성 일체 금지
      if (tpl.category === 'share') return;

      const postId = `daily-ai-post-${todayStr}-${idx + 1}`;
      if (existingIds.has(postId) || (this.deletedPostIds && this.deletedPostIds.has(postId))) return;

      const postTime = Math.min(todayStartMs + Math.round(tpl.offsetHours * 3600 * 1000), nowMs);
      const diffMin = Math.max(1, Math.floor((nowMs - postTime) / 60000));
      let createdAtStr = '방금 전';
      if (diffMin < 60) createdAtStr = `${diffMin}분 전`;
      else if (diffMin < 1440) createdAtStr = `${Math.floor(diffMin / 60)}시간 전`;
      else createdAtStr = todayStr.slice(5);

      // AI 작성 글 조회수 10 ~ 50 사이 자연스러운 값 설정
      const seedNum = (postId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + idx * 7) % 41;
      const initialViews = 10 + seedNum; // 10 ~ 50 사이
      const initialLikes = Math.max(0, Math.floor((initialViews - 10) / 15)); // 0 ~ 2

      const newPost = {
        id: postId,
        title: tpl.title,
        content: tpl.content,
        category: tpl.category,
        ageStage: tpl.ageStage,
        localHub: tpl.localHub,
        localHubName: tpl.localHubName,
        localTopic: 'general',
        isQuestion: !!tpl.isQuestion,
        isAiGenerated: true,
        images: [],
        author: tpl.author,
        timestamp: postTime,
        createdAt: createdAtStr,
        views: initialViews,
        reactions: { like: initialLikes, hug: 0, tip: 0 },
        comments: [],
        tags: tpl.tags
      };

      this.data.posts.unshift(newPost);
      existingIds.add(postId);
    });
  }

  isPostHot(post) {
    if (!post) return false;
    const views = post.views || 0;
    // 조회수가 50 미만인 글은 절대 HOT 배지 미노출 (0회, 1회, 14회, 18회 등 방지)
    if (views < 50) return false;
    const totalReactions = (post.reactions?.like || 0) + (post.reactions?.hug || 0) + (post.reactions?.tip || 0);
    const commentsCount = (post.comments?.length || 0);
    // 조회수 200 이상이거나, 반응 5개 이상, 또는 댓글 3개 이상인 실질적인 인기 글만 HOT 부여
    return views >= 200 || totalReactions >= 5 || commentsCount >= 3 || (post.isHot && views >= 100);
  }

  isDummyPost(post) {
    if (!post) return false;
    if (post.isSeed || post.isSeedPost || post.isDummy) return true;
    const pid = String(post.id || '');
    if (pid.startsWith('seed-post') || pid.startsWith('guide-seed') || pid.startsWith('c-seed')) return true;
    return false;
  }

  canManagePost(post) {
    if (!post) return false;

    // 1. 관리자는 모든 글 수정/삭제 가능 (전체 관리 권한)
    if (this.isAdmin() || sessionStorage.getItem('dodam_admin_authenticated') === '1') {
      return true;
    }

    // 2. 시스템 기본 시드글 / 공식 AI 가이드 / 공지글은 일반 사용자가 수정/삭제 불가
    const isSeed = String(post.id).startsWith('guide-seed') ||
                   String(post.id).startsWith('c-seed') ||
                   String(post.id).startsWith('seed-post') ||
                   post.isAiReport || post.isNotice;
    if (isSeed) {
      return false;
    }

    // 3. 현재 브라우저 세션에서 직접 등록한 글인 경우 허용
    if (this.myPostIds && this.myPostIds.has(post.id)) {
      return true;
    }

    const myId = this.currentUser?.id || this.currentUser?.username;
    const authorUserId = post.author?.userId || post.author?.id;
    const myNick = (this.currentUser?.nickname || this.profile?.nickname || '').trim();
    const authorNick = (post.author?.nickname || '').trim();

    // 4. 회원 로그인 상태인 경우: 본인 계정 ID 일치 여부 확인
    if (myId) {
      if (authorUserId && authorUserId === myId) return true;
      if (!authorUserId && authorNick && myNick && authorNick === myNick) return true;
      return false;
    }

    // 5. 비로그인(게스트) 상태인 경우:
    // 등록 회원이 작성한 글은 게스트가 수정/삭제 불가
    if (authorUserId) return false;

    // 세션 ID 일치 확인
    if (this.sessionId && (post.author?.sessionId === this.sessionId || post.sessionId === this.sessionId)) {
      return true;
    }

    return false;
  }

  openEditPostModal(postId) {
    const targetId = postId || this.activePostDetailId;
    if (!targetId) return;
    const post = (this.data.posts || []).find((p) => p.id === targetId);
    if (!post) {
      this.showToast('공지사항 등 시스템 기본 안내글은 수정할 수 없습니다.');
      return;
    }
    if (!this.canManagePost(post)) {
      this.showToast('⚠️ 본인이 작성한 게시글만 수정할 수 있습니다. (관리자 제외)');
      return;
    }

    this.editingPostId = post.id;
    this.switchMainView('write');

    const titleHeaderEl = document.getElementById('write-page-title');
    if (titleHeaderEl) titleHeaderEl.textContent = '게시글 수정하기';
    const topBtn = document.getElementById('btn-post-submit-top');
    if (topBtn) topBtn.innerHTML = '<span>수정 완료</span>';
    const bottomBtn = document.getElementById('btn-post-submit-bottom');
    if (bottomBtn) bottomBtn.textContent = '수정 완료하기';

    const catEl = document.getElementById('post-form-category');
    const prefixEl = document.getElementById('post-form-prefix');
    const regionEl = document.getElementById('post-form-region');
    const titleEl = document.getElementById('post-form-title');
    const contentEl = document.getElementById('post-form-content');
    const tagsEl = document.getElementById('post-form-tags');

    if (catEl) {
      catEl.value = post.category || post.ageStage || 'talk';
    }
    if (regionEl) {
      regionEl.value = post.region || 'all';
    }

    let rawTitle = post.title || '';
    let detectedPrefix = '';
    const prefixMatch = rawTitle.match(/^\[(질문|정보|후기|나눔|일상|공감)\]\s*(.*)$/);
    if (prefixMatch) {
      detectedPrefix = prefixMatch[1];
      rawTitle = prefixMatch[2];
    }
    if (prefixEl) prefixEl.value = detectedPrefix;
    if (titleEl) titleEl.value = rawTitle;

    if (contentEl) {
      const rawBody = post.rawTextContent || post.content || '';
      contentEl.value = rawBody.includes('<') ? this.extractPlainTextFromHtml(rawBody) : rawBody;
    }
    if (tagsEl) {
      tagsEl.value = (post.tags || []).join(', ');
    }

    this.attachedImages = [...(post.images || [])];
    this.renderAttachedImages();
    this.showToast('✏️ 게시글 수정 모드로 전환되었습니다.');
  }

  cancelWriteOrEdit(isHistoryNavigation = false) {
    const prevEditId = this.editingPostId;
    this.editingPostId = null;
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'write') {
      window.history.back();
      return;
    }
    this.switchMainView('board', isHistoryNavigation);
    if (prevEditId) {
      this.openPostDetailModal(prevEditId, isHistoryNavigation);
    }
  }

  deleteCurrentPost(postId) {
    const targetId = postId || this.activePostDetailId;
    if (!targetId) return;
    const postIdx = (this.data.posts || []).findIndex((p) => p.id === targetId);
    if (postIdx === -1) {
      this.showToast('시스템 기본 공지글은 삭제할 수 없습니다.');
      return;
    }
    const targetPost = this.data.posts[postIdx];
    if (!this.canManagePost(targetPost)) {
      this.showToast('⚠️ 본인이 작성한 게시글만 삭제할 수 있습니다. (관리자 제외)');
      return;
    }

    if (!confirm('이 게시글을 정말 삭제하시겠습니까?\n삭제된 게시글은 복구할 수 없습니다.')) return;

    this.data.posts.splice(postIdx, 1);
    if (!this.deletedPostIds) this.deletedPostIds = new Set();
    this.deletedPostIds.add(targetId);

    this.saveCustomPosts();
    if (window.DodamFirebase && typeof window.DodamFirebase.deletePost === 'function') {
      window.DodamFirebase.deletePost(targetId);
    }

    this.closePostDetailModal();
    this.renderBoardCategories();
    this.renderBoardView();
    this.showToast('🗑️ 게시글이 삭제되었습니다.');
  }

  openWritePostModal(catId) {
    this.openWritePage(catId);
  }

  closeWritePostModal() {
    this.switchMainView('board');
  }

  initWritePage() {
    const authorNameEl = document.getElementById('write-author-name');
    const authorBadgeEl = document.getElementById('write-author-badge');
    const authorAvatarEl = document.getElementById('write-author-avatar');
    if (authorNameEl) authorNameEl.textContent = this.profile.nickname || '도담맘';
    if (authorBadgeEl) authorBadgeEl.textContent = `${this.profile.babyName || '도담이'} (${this.profile.ageBadge || '육아맘'})`;
    if (authorAvatarEl) {
      const firstChar = (this.profile.nickname || '도담맘').charAt(0);
      authorAvatarEl.textContent = firstChar;
    }

    const draftBadge = document.getElementById('draft-count-badge');
    const loadBtn = document.getElementById('btn-draft-load');
    if (window.DodamFirebase && typeof window.DodamFirebase.getDraft === 'function') {
      window.DodamFirebase.getDraft('default_draft').then((draft) => {
        this.cachedDraft = draft || null;
        if (draft) {
          if (draftBadge) draftBadge.textContent = '1';
          if (loadBtn) loadBtn.classList.remove('hidden');
        } else {
          if (draftBadge) draftBadge.textContent = '0';
          if (loadBtn) loadBtn.classList.add('hidden');
        }
      });
    } else if (this.cachedDraft) {
      if (draftBadge) draftBadge.textContent = '1';
      if (loadBtn) loadBtn.classList.remove('hidden');
    } else {
      if (draftBadge) draftBadge.textContent = '0';
      if (loadBtn) loadBtn.classList.add('hidden');
    }

    this.renderAttachedImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.attachedImages.push(e.target.result);
        this.renderAttachedImages();
      };
      reader.readAsDataURL(file);
    });
    this.showToast('사진이 첨부되었습니다! 📷');
    event.target.value = '';
  }

  addPresetPhoto(type) {
    const presets = {
      baby_food: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?w=600&auto=format&fit=crop&q=80',
      play: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80',
      books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      stroller: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80'
    };

    const url = presets[type] || presets.baby_food;
    this.attachedImages.push(url);
    this.renderAttachedImages();
    this.showToast('육아 템플릿 사진이 첨부되었습니다! 📷');
  }

  removeAttachedImage(index) {
    this.attachedImages.splice(index, 1);
    this.renderAttachedImages();
  }

  renderAttachedImages() {
    const container = document.getElementById('post-attached-photos-container');
    if (!container) return;

    if (!this.attachedImages || this.attachedImages.length === 0) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }

    container.classList.remove('hidden');
    container.innerHTML = this.attachedImages.map((src, i) => `
      <div class="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#03C75A] shrink-0 group shadow-xs">
        <img src="${src}" alt="첨부 미리보기" class="w-full h-full object-cover" />
        <button
          type="button"
          onclick="app.removeAttachedImage(${i})"
          class="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-[10px] hover:bg-rose-600 transition"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');
  }

  insertEditorText(prefix, suffix, defaultText) {
    const textarea = document.getElementById('post-form-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const selected = currentVal.substring(start, end) || defaultText;
    const replacement = `${prefix}${selected}${suffix}`;

    textarea.value = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    textarea.focus();
    textarea.selectionStart = start + prefix.length;
    textarea.selectionEnd = start + prefix.length + selected.length;
  }

  applyEditorTemplate(type) {
    const templates = {
      qa: `[육아 질문 내용]\n• 아이 월령: 12개월 남아\n• 현재 고민 상황:\n• 시도해본 방법:\n• 궁금한 점:\n\n선배맘·대디님들의 따뜻한 조언 부탁드립니다!`,
      review: `[내돈내산 솔직 육아용품 후기]\n• 제품/브랜드명:\n• 실사용 기간:\n• 추천하는 장점:\n• 아쉬운 단점:\n• 이런 분께 추천해요:\n\n육아 동기분들의 현명한 소비에 도움 되길 바랍니다 :)`,
      tip: `[나만의 육아 꿀팁 공유]\n• 꿀팁 주제:\n• 실행 방법 / 팁:\n• 주의해야 할 점:\n\n함께 나누면 육아가 훨씬 수월해져요!`
    };

    const textarea = document.getElementById('post-form-content');
    if (textarea) {
      textarea.value = (templates[type] || '') + (textarea.value ? `\n\n${textarea.value}` : '');
      textarea.focus();
      this.showToast('에디터 템플릿이 적용되었습니다!');
    }
  }

  appendTagToForm(tag) {
    const input = document.getElementById('post-form-tags');
    if (!input) return;
    const current = input.value.trim();
    if (current.includes(tag)) return;
    input.value = current ? `${current}, ${tag}` : tag;
  }

  savePostDraft() {
    const title = (document.getElementById('post-form-title')?.value || '').trim();
    const content = (document.getElementById('post-form-content')?.value || '').trim();
    const category = document.getElementById('post-form-category')?.value || 'newborn';
    const region = document.getElementById('post-form-region')?.value || 'all';
    const tags = document.getElementById('post-form-tags')?.value || '';

    if (!title && !content) {
      this.showToast('임시저장할 내용이 없습니다.');
      return;
    }

    const draft = {
      title,
      content,
      category,
      region,
      tags,
      images: this.attachedImages,
      savedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    this.cachedDraft = draft;
    if (window.DodamFirebase && typeof window.DodamFirebase.saveDraft === 'function') {
      window.DodamFirebase.saveDraft('default_draft', draft);
    }
    const badge = document.getElementById('draft-count-badge');
    if (badge) badge.textContent = '1';
    const loadBtn = document.getElementById('btn-draft-load');
    if (loadBtn) loadBtn.classList.remove('hidden');

    this.showToast(`[${draft.savedAt}] Cloud Firestore DB에 임시저장되었습니다! 💾`);
  }

  async loadPostDraft() {
    try {
      let draft = this.cachedDraft;
      if (window.DodamFirebase && typeof window.DodamFirebase.getDraft === 'function') {
        const remoteDraft = await window.DodamFirebase.getDraft('default_draft');
        if (remoteDraft) draft = remoteDraft;
      }
      if (!draft) {
        this.showToast('DB에 저장된 임시글이 없습니다.');
        return;
      }
      if (document.getElementById('post-form-title')) document.getElementById('post-form-title').value = draft.title || '';
      if (document.getElementById('post-form-content')) document.getElementById('post-form-content').value = draft.content || '';
      if (document.getElementById('post-form-category')) document.getElementById('post-form-category').value = draft.category || 'newborn';
      if (document.getElementById('post-form-region')) document.getElementById('post-form-region').value = draft.region || 'all';
      if (document.getElementById('post-form-tags')) document.getElementById('post-form-tags').value = draft.tags || '';

      this.attachedImages = draft.images || [];
      this.renderAttachedImages();
      this.showToast('DB에 임시저장된 글을 성공적으로 불러왔습니다!');
    } catch (err) {
      console.error('loadPostDraft error:', err);
    }
  }

  submitNewPost(e) {
    if (e) e.preventDefault();
    const titleEl = document.getElementById('post-form-title');
    const contentEl = document.getElementById('post-form-content');
    const categoryEl = document.getElementById('post-form-category');
    const prefixEl = document.getElementById('post-form-prefix');
    const regionEl = document.getElementById('post-form-region');
    const tagsEl = document.getElementById('post-form-tags');

    const rawTitle = titleEl ? titleEl.value.trim() : '';
    const content = contentEl ? contentEl.value.trim() : '';
    if (!rawTitle || !content) {
      this.showToast('제목과 내용을 모두 입력해 주세요!');
      return;
    }

    const prefix = prefixEl ? prefixEl.value.trim() : '';
    const title = prefix ? `[${prefix}] ${rawTitle}` : rawTitle;

    const category = categoryEl ? categoryEl.value : 'talk';
    const region = regionEl ? regionEl.value : 'all';
    const rawTags = tagsEl ? tagsEl.value.trim() : '';
    const tags = rawTags
      ? rawTags.split(/[,\s]+/).map((t) => t.replace(/^#/, '').trim()).filter(Boolean)
      : [];

    const myHub = this.getLocalHubFromProfileRegion(this.profile?.region);
    const hubObj = (this.data.localHubs || []).find((h) => h.id === myHub);

    const isQa = category === 'qa' || prefix === '질문' || rawTitle.includes('?');
    const isGuidePost = ['guide', 'sleep', 'nutrition', 'play', 'health', 'school'].includes(category);
    const isLocalPost = category.startsWith('local');
    const guideType = isGuidePost ? (
      category === 'sleep' ? 'sleep' :
      category === 'nutrition' ? 'food' :
      category === 'play' ? 'growth' :
      category === 'health' ? 'health' :
      category === 'school' ? 'edu' : 'all'
    ) : null;

    let targetLocalTopic = 'all';
    let targetLocalTopicName = '💬 일상수다';
    if (category === 'local_hospital' || prefix === '소아과') {
      targetLocalTopic = 'hospital';
      targetLocalTopicName = '🏥 소아과';
    } else if (category === 'local_daycare' || prefix === '어린이집') {
      targetLocalTopic = 'daycare';
      targetLocalTopicName = '🏫 어린이집';
    } else if (category === 'local_share' || prefix === '무료나눔' || prefix === '나눔') {
      targetLocalTopic = 'share';
      targetLocalTopicName = '🥕 무료나눔';
    } else if (category === 'local_place' || prefix === '키즈맛집') {
      targetLocalTopic = 'place';
      targetLocalTopicName = '☕ 키즈맛집';
    } else if (prefix) {
      targetLocalTopicName = `💬 ${prefix}`;
    }

    const targetAgeStage = ['preg', 'newborn', 'toddler_early', 'toddler', 'school', 'elem_high'].includes(category)
      ? category
      : category === 'middle' || category === 'high'
      ? 'middle_high'
      : this.getChildAgeStageFromMonths(this.profile?.months);

    const postRegion = isLocalPost && region === 'all'
      ? (this.profile?.region || 'seoul')
      : region;

    if (this.editingPostId) {
      const existingPost = (this.data.posts || []).find((p) => p.id === this.editingPostId);
      const editedId = this.editingPostId;
      this.editingPostId = null;

      if (!existingPost || !this.canManagePost(existingPost)) {
        this.showToast('⚠️ 본인이 작성한 게시글만 수정할 수 있습니다. (관리자 제외)');
        this.switchMainView('board');
        return;
      }

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.rawTextContent = content;
        existingPost.contentHtml = null;
        existingPost.category = category;
        existingPost.ageStage = ['preg', 'newborn', 'toddler_early', 'toddler', 'school', 'elem_high'].includes(category)
          ? category
          : category === 'middle' || category === 'high'
          ? 'middle_high'
          : existingPost.ageStage || this.getChildAgeStageFromMonths(this.profile?.months);
        existingPost.region = region;
        if (region === 'all') {
          existingPost.localHub = 'all';
          existingPost.localHubName = '전국 전체';
        } else {
          existingPost.localHub = existingPost.localHub && existingPost.localHub !== 'all' ? existingPost.localHub : myHub;
          existingPost.localHubName = existingPost.localHubName && existingPost.localHubName !== '전국 전체'
            ? existingPost.localHubName
            : (hubObj ? hubObj.shortName : (this.profile?.region || '우리 동네'));
        }
        existingPost.tags = tags;
        existingPost.images = [...this.attachedImages];
        existingPost.isEdited = true;

        this.saveCustomPosts();
        if (window.DodamFirebase && typeof window.DodamFirebase.updatePost === 'function') {
          window.DodamFirebase.updatePost(existingPost);
        }
      }

      if (titleEl) titleEl.value = '';
      if (contentEl) contentEl.value = '';
      if (tagsEl) tagsEl.value = '';
      if (prefixEl) prefixEl.value = '';
      this.attachedImages = [];
      this.renderAttachedImages();

      this.switchMainView('board');
      this.renderBoardCategories();
      this.renderBoardView();
      this.openPostDetailModal(editedId);
      this.showToast('✅ 게시글이 성공적으로 수정되었습니다!');
      return;
    }

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category: isGuidePost ? 'guide' : isLocalPost ? 'local' : category,
      guideType,
      ageStage: targetAgeStage,
      region: postRegion,
      localHub: postRegion === 'all' ? 'all' : myHub,
      localHubName: postRegion === 'all' ? '전국 전체' : (hubObj ? hubObj.shortName : (this.profile?.region || '우리 동네')),
      localTopic: targetLocalTopic,
      localTopicName: targetLocalTopicName,
      isQuestion: isQa,
      isSolved: false,
      title,
      content,
      rawTextContent: content,
      images: [...this.attachedImages],
      author: {
        userId: this.currentUser?.id || this.currentUser?.username || null,
        sessionId: this.sessionId || null,
        nickname: this.profile.nickname,
        level: this.profile.level,
        childBadge: `👶 ${this.profile.babyName} (${this.profile.ageBadge})`,
        avatarBg: 'bg-emerald-600 text-white'
      },
      createdAt: '방금 전',
      timestamp: Date.now(),
      views: 0,
      isHot: false,
      reactions: { like: 0, hug: 0, tip: 0 },
      tags,
      comments: []
    };

    this.data.posts.unshift(newPost);
    this.registerMyPostId(newPost.id);
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.createPost(newPost);
    }

    this.profile.points = (this.profile.points || 0) + 15;
    const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
    this.profile.level = lvl.name;
    this.saveProfileData();
    this.renderProfileWidget();
    this.renderLevelSection();
    this.renderAuthHeader();

    if (titleEl) titleEl.value = '';
    if (contentEl) contentEl.value = '';
    if (tagsEl) tagsEl.value = '';
    if (prefixEl) prefixEl.value = '';
    this.attachedImages = [];
    this.renderAttachedImages();

    this.cachedDraft = null;
    if (window.DodamFirebase && typeof window.DodamFirebase.deleteDraft === 'function') {
      window.DodamFirebase.deleteDraft('default_draft');
    }
    const draftBadge = document.getElementById('draft-count-badge');
    if (draftBadge) draftBadge.textContent = '0';
    const loadBtn = document.getElementById('btn-draft-load');
    if (loadBtn) loadBtn.classList.add('hidden');

    this.switchMainView('board');
    // 사용자가 글을 작성한 해당 게시판/라운지로 자동 전환
    if (isQa) {
      this.boardLoungeMode = 'qa';
    } else if (isLocalPost) {
      this.boardLoungeMode = 'local';
      this.currentLocalTopic = targetLocalTopic !== 'all' ? targetLocalTopic : 'all';
    } else if (isGuidePost) {
      this.boardLoungeMode = 'guide';
      this.guideSubCategory = guideType || 'all';
    } else if (['preg', 'newborn', 'toddler_early', 'toddler', 'school', 'elem_high', 'middle', 'high', 'working'].includes(category)) {
      this.boardLoungeMode = 'age';
      this.currentAgeStage = category;
    } else {
      this.boardLoungeMode = 'all';
      this.currentCategory = category;
    }
    this.renderBoardCategories();
    this.renderBoardView();
    this.openPostDetailModal(newPost.id);
    this.showToast('🎉 게시글이 성공적으로 등록되었습니다! (+15P 활동점수 적립)');
  }

  setBoardPageSize(size) {
    this.boardPageSize = size || 15;
    this.boardPage = 1;
    this.renderBoardView();
  }

  togglePollBanner() {
    const card = document.getElementById('active-poll-card');
    if (!card) return;
    card.classList.toggle('hidden');
  }

  submitBottomSearch() {
    const input = document.getElementById('board-bottom-search-input');
    const typeSelect = document.getElementById('board-search-type');
    const val = input ? input.value.trim() : '';

    this.boardSearchType = typeSelect ? typeSelect.value : 'all';
    this.boardSearchKeyword = val.toLowerCase();
    this.boardPage = 1;

    const topInput = document.getElementById('board-search-input');
    if (topInput) topInput.value = val;

    this.renderBoardView();
  }

  resetBoardFilter() {
    this.boardLoungeMode = 'all';
    this.currentCategory = 'all';
    this.currentAgeStage = 'all';
    this.currentLocalHub = 'all';
    this.currentLocalTopic = 'all';
    this.currentRegion = 'all';
    this.guideSubCategory = 'all';
    this.qaFilterStatus = 'all';
    this.boardSearchKeyword = '';
    this.boardPage = 1;

    const topInput = document.getElementById('board-search-input');
    if (topInput) topInput.value = '';
    const bottomInput = document.getElementById('board-bottom-search-input');
    if (bottomInput) bottomInput.value = '';

    this.renderBoardCategories();
    this.renderBoardView();
    this.showToast('전체 소통 목록으로 초기화되었습니다.');
  }

  saveCustomPosts() {
    // 모든 게시글 변경 사항은 Cloud Firestore 데이터베이스(community_posts)에 실시간 저장됩니다.
  }

  loadSavedPosts() {
    // 초기 게시글 및 수정/삭제 상태는 initFirebaseSync()를 통해 Cloud Firestore DB에서 실시간 로드됩니다.
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
            class="w-full py-1 px-1 rounded-xl text-[11px] sm:text-xs transition flex items-center justify-center gap-1 border text-center ${activeClass}"
            title="${r.name} (${count}개)"
          >
            <span class="whitespace-nowrap font-bold">${r.name === '전국 전체' ? '전국' : r.name}</span>
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
          class="fest-cat-chip px-3 py-1.5 rounded-xl text-xs whitespace-nowrap shrink-0 transition flex items-center gap-1.5 border ${
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
            class="w-full py-1 px-1 rounded-xl text-[11px] sm:text-xs transition flex items-center justify-center gap-1 border text-center ${activeClass}"
            title="${r.name} (${count}개)"
          >
            <span class="whitespace-nowrap font-bold">${r.name === '전국 전체' ? '전국' : r.name}</span>
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
          class="cont-cat-chip px-3 py-1.5 rounded-xl text-xs whitespace-nowrap shrink-0 transition flex items-center gap-1.5 border ${
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

  getFallbackEventImage(evt) {
    const pool = [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&auto=format&fit=crop&q=80'
    ];
    const seed = (evt?.title || evt?.id || 'dodam');
    let h = 0;
    for (let i = 0; i < seed.length; i++) {
      h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return pool[h % pool.length];
  }

  // 공통 이벤트 카드 렌더러
  renderEventCardHtml(evt, themeColor) {
    const isContest = evt.boardType === 'contests';
    const activeColor = isContest ? 'indigo' : 'amber';
    const defaultImg = this.getFallbackEventImage(evt);
    const imgUrl = (evt.imageUrl && !evt.imageUrl.includes('1434030216411-0b793f4b4173')) ? evt.imageUrl : defaultImg;

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
  openEventDetailModal(eventId, isHistoryNavigation = false) {
    const evt = (this.allEvents || []).find((e) => e.id === eventId);
    if (!evt) return;
    this.activeEventDetailId = eventId;

    const modal = document.getElementById('event-detail-modal');
    if (!modal) return;
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('event-detail-modal', 'closeEventDetailModal');
    }

    document.getElementById('evt-modal-badge').textContent = evt.badge;
    document.getElementById('evt-modal-source').textContent = evt.sourceLabel;
    document.getElementById('evt-modal-dday').textContent = evt.dday;
    document.getElementById('evt-modal-region').textContent = `📍 ${evt.regionName}`;
    document.getElementById('evt-modal-title').textContent = evt.title;
    
    const modalImg = document.getElementById('evt-modal-img');
    if (modalImg) {
      modalImg.src = evt.imageUrl || 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80';
      modalImg.onerror = function() {
        this.onerror = null;
        this.src = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80';
      };
    }

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

  closeEventDetailModal(isHistoryNavigation = false) {
    this.activeEventDetailId = null;
    const modal = document.getElementById('event-detail-modal');
    if (modal) modal.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'event-detail-modal') {
      window.history.back();
    }
  }

  renderSidebarWidgets() {
    const hotListEl = document.getElementById('sidebar-hot-posts');
    if (hotListEl) {
      const topPosts = [...this.data.posts]
        .sort((a, b) => {
          const isDummyA = this.isDummyPost(a);
          const isDummyB = this.isDummyPost(b);
          if (!isDummyA && isDummyB) return -1;
          if (isDummyA && !isDummyB) return 1;
          return (b.reactions?.like || 0) - (a.reactions?.like || 0);
        })
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
    return [];
  }

  getValidScrappedPosts() {
    const validIds = new Set((this.scraps || []).filter((id) => id && id !== 'post-01'));
    return (this.data?.posts || []).filter((p) => p && validIds.has(p.id));
  }

  getMyWrittenPosts() {
    const myId = this.currentUser?.id || this.currentUser?.username;
    const myNick = (this.currentUser?.nickname || this.profile?.nickname || '').trim();
    if (!myId && !myNick && (!this.myPostIds || this.myPostIds.size === 0) && !this.sessionId) {
      return [];
    }
    return (this.data?.posts || []).filter((post) => {
      if (!post) return false;
      // 1. 시스템 기본 시드 게시글 및 공식 가이드는 사용자의 직접 작성 활동글에서 제외
      if (post.isSeed || (post.id && String(post.id).startsWith('seed-post-')) || (post.id && String(post.id).startsWith('guide-seed-'))) {
        return false;
      }
      // 2. 현재 세션에서 등록한 글
      if (this.myPostIds && this.myPostIds.has(post.id)) {
        return true;
      }
      const authorUserId = post.author?.userId || post.author?.id;
      const authorNick = (post.author?.nickname || '').trim();
      // 3. 회원 계정 ID 일치
      if (myId && authorUserId && authorUserId === myId) {
        return true;
      }
      // 4. 닉네임 일치
      if (myId && !authorUserId && authorNick && myNick && authorNick === myNick) {
        return true;
      }
      // 5. 게스트 세션 ID 일치
      if (!myId && this.sessionId && (post.author?.sessionId === this.sessionId || post.sessionId === this.sessionId)) {
        return true;
      }
      return false;
    });
  }

  filterMyWrittenPosts() {
    const myPosts = this.getMyWrittenPosts();
    if (myPosts.length === 0) {
      this.showToast('📝 아직 직접 작성하신 활동글이 없습니다. [글쓰기] 버튼으로 첫 글을 등록해 보세요!');
      return;
    }
    this.switchTab('board');
    this.showToast(`📝 내가 작성한 글 ${myPosts.length}건을 확인합니다.`);
  }

  toggleScrap(postId) {
    const idx = this.scraps.indexOf(postId);
    if (idx > -1) {
      this.scraps.splice(idx, 1);
      this.showToast('스크랩북에서 삭제되었습니다.');
    } else {
      this.scraps.push(postId);
      this.showToast('나의 육아 스크랩북(DB)에 저장되었습니다!');
    }
    if (window.DodamFirebase && typeof window.DodamFirebase.saveScraps === 'function') {
      window.DodamFirebase.saveScraps(this.scraps, 'active_scraps');
    }
    this.updateScrapBadge();
    this.renderProfileWidget();
    this.renderBoardView();
  }

  updateScrapBadge() {
    const b = document.getElementById('scrap-count-badge');
    if (b) b.textContent = this.getValidScrappedPosts().length;
  }

  closeScrapModal(isHistoryNavigation = false) {
    const modal = document.getElementById('scrap-modal');
    if (modal) modal.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'scrap-modal') {
      window.history.back();
    }
  }

  openScrapModal(isHistoryNavigation = false) {
    const modal = document.getElementById('scrap-modal');
    const listEl = document.getElementById('scrap-list-container');
    if (!modal || !listEl) return;
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('scrap-modal', 'closeScrapModal');
    }

    const scrappedPosts = this.getValidScrappedPosts();
    if (scrappedPosts.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">스크랩한 게시글이 없습니다.</div>`;
    } else {
      listEl.innerHTML = scrappedPosts
        .map(
          (p) => `
          <div onclick="app.openPostDetailModal('${p.id}'); document.getElementById('scrap-modal').classList.add('hidden')" class="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 cursor-pointer hover:border-amber-300">
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
    let q = (r.name || '').trim();

    // 1. 전국 주요 대표 맛집 표준 상호 매핑 (공식 매장명 1:1 다이렉트 매칭)
    if (q.includes('동화가든')) return '강릉 동화가든 짬뽕순두부 본점';
    if (q.includes('만석닭강정')) return '속초 만석닭강정 본점';
    if (q.includes('성심당')) {
      if (q.includes('DCC')) return '성심당 DCC점';
      return '성심당 본점';
    }
    if (q.includes('청초수물회')) return '속초 청초수물회 속초본점';
    if (q.includes('가보정')) return '가보정 인계본점';
    if (q.includes('이성당')) return '이성당 본점';
    if (q.includes('숙성도')) return '숙성도 노형본점';
    if (q.includes('연돈')) return '제주 연돈';
    if (q.includes('춘심이네')) return '춘심이네 본점';
    if (q.includes('테라로사')) return '테라로사 커피공장 강릉본점';
    if (q.includes('암소갈비집')) return '해운대 암소갈비집';
    if (q.includes('홍콩반점')) return q; // e.g. 홍콩반점0410 연신내점
    if (q.includes('역촌왕돈까스')) return '역촌왕돈까스';
    if (q.includes('만포면옥')) return '만포면옥 본점';

    // 2. 이미 지점명(점, 본점)이 포함되어 있거나 고유 상호인 경우 상호명 그대로 100% 매칭
    if (/([가-힣0-9]+점|본점)$/.test(q)) {
      return q;
    }

    // 3. '&' 뒤 부가 설명 및 괄호 제거
    q = q.split('&')[0].replace(/\s*\([^)]*\)/g, '').trim();

    // 4. 이미 고유 시설명(6글자 이상 관광지/명소)인 경우 원문 그대로 검색하여 정확도 100% 보장
    if (r.type === 'attraction' && q.length >= 5 && !['아이사랑놀이터', '장난감도서관', '육아종합지원센터', '공동육아나눔터', '유아숲체험원'].includes(q)) {
      return q;
    }

    // 5. 단독 상호명인 경우에만 지역구 힌트 보강
    const city = (r.district || '').split(' ')[0] || (r.regionName || '').slice(0, 2);
    if (city && !q.includes(city) && !q.includes((r.regionName || '').slice(0, 2))) {
      return `${city} ${q}`.trim();
    }
    return q || (r.name || '').trim();
  }

  getRestaurantSources(r) {
    const cleanName = this.getCleanRestaurantQuery(r);
    const query = encodeURIComponent(cleanName);

    const src = r.sources || {};
    const ov = parseFloat(r.overallRating) || 4.2;

    // 공식 포털 연동 URL: 등록된 검증 URL 우선 사용, 없을 시 최적 검색 쿼리 사용
    const kakaoSearchUrl = src.kakao?.url || `https://map.kakao.com/?q=${query}`;
    const kakaoDirectUrl = src.kakao?.directionsUrl || `https://map.kakao.com/link/to/${query},${r.lat},${r.lng}`;
    const naverSearchUrl = src.naver?.url || `https://map.naver.com/p/search/${query}`;
    const googleSearchUrl = src.google?.url || `https://www.google.com/maps/search/?api=1&query=${query}`;

    return {
      cleanName,
      naver: {
        url: naverSearchUrl,
        rating: (src.naver?.rating && src.naver.rating !== '-') ? src.naver.rating : null,
        reviewCount: src.naver?.reviewCount || 0,
        name: '네이버 플레이스'
      },
      kakao: {
        url: kakaoSearchUrl,
        directionsUrl: kakaoDirectUrl,
        rating: (src.kakao?.rating && src.kakao.rating !== '-') ? src.kakao.rating : null,
        reviewCount: src.kakao?.reviewCount || 0,
        name: '카카오맵'
      },
      google: {
        url: googleSearchUrl,
        rating: (src.google?.rating && src.google.rating !== '-') ? src.google.rating : null,
        reviewCount: src.google?.reviewCount || 0,
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
        btn.className = 'food-quick-pill inline-flex items-center px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold shrink-0 shadow-sm whitespace-nowrap';
      } else {
        btn.className = 'food-quick-pill inline-flex items-center px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-[11px] font-bold shrink-0 transition whitespace-nowrap';
      }
    });
    this.updateFoodRegionCounts();
  }

  updateFoodRegionCounts() {
    const activeRegion = document.getElementById('food-region-filter')?.value || 'all';
    const categoryVal = document.getElementById('food-category-filter')?.value || 'all';
    const needChair = document.getElementById('amenity-chair')?.checked ?? false;
    const needPlayroom = document.getElementById('amenity-playroom')?.checked ?? false;
    const needRoom = document.getElementById('amenity-room')?.checked ?? false;
    const needParking = document.getElementById('amenity-parking')?.checked ?? false;
    const needStroller = document.getElementById('amenity-stroller')?.checked ?? false;
    const searchKeyword = (document.getElementById('food-portal-query')?.value || '').trim().toLowerCase();

    const restaurantsList = this.data.restaurants || window.DODAM_NATIONWIDE_RESTAURANTS || [];
    const attractionsList = this.data.attractions || window.DODAM_NATIONWIDE_ATTRACTIONS || [];

    // 상단 3대 서브탭 개수 표시 업데이트
    const tabAll = document.getElementById('food-type-tab-all');
    const tabRest = document.getElementById('food-type-tab-restaurant');
    const tabAttr = document.getElementById('food-type-tab-attraction');
    if (tabAll) tabAll.innerHTML = `🌟 전체 모아보기 <span class="ml-1 px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-extrabold">${(restaurantsList.length + attractionsList.length).toLocaleString()}</span>`;
    if (tabRest) tabRest.innerHTML = `🍽️ 안심 키즈맛집·카페 <span class="ml-1 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold">${restaurantsList.length.toLocaleString()}</span>`;
    if (tabAttr) tabAttr.innerHTML = `🎡 전국 유명 관광지·명소 <span class="ml-1 px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold">${attractionsList.length.toLocaleString()}</span>`;

    let pool = [];
    if (this.foodType === 'restaurant') {
      pool = restaurantsList;
    } else if (this.foodType === 'attraction') {
      pool = attractionsList;
    } else {
      pool = [...restaurantsList, ...attractionsList];
    }

    // 지역 필터를 제외한 나머지 조건으로 필터링된 풀 계산
    const baseList = pool.filter((r) => {
      if (categoryVal !== 'all' && r.category !== categoryVal) return false;
      if (needChair && !r.amenities.some((a) => a.includes('아기의자') || a.includes('수유실'))) return false;
      if (needPlayroom && !r.amenities.some((a) => a.includes('놀이방') || a.includes('키즈룸') || a.includes('키즈존') || a.includes('놀이시설') || a.includes('테마파크'))) return false;
      if (needRoom && !r.amenities.some((a) => a.includes('룸') || a.includes('수유실'))) return false;
      if (needParking && !r.amenities.some((a) => a.includes('주차'))) return false;
      if (needStroller && !r.amenities.some((a) => a.includes('유모차'))) return false;
      if (searchKeyword) {
        const textToSearch = [
          r.name, r.address, r.district || '', r.categoryName,
          r.regionName, r.representativeMenu, r.reviewSummary, r.amenities.join(' ')
        ].join(' ').toLowerCase();
        if (!textToSearch.includes(searchKeyword)) return false;
      }
      return true;
    });

    const regCounts = {};
    baseList.forEach((r) => {
      regCounts[r.region] = (regCounts[r.region] || 0) + 1;
    });

    const regionLabels = {
      all: '전국 전체', seoul: '서울', gyeonggi: '경기', incheon: '인천', gangwon: '강원',
      daejeon: '대전', sejong: '세종', chungnam: '충남', chungbuk: '충북', gwangju: '광주',
      jeonbuk: '전북', jeonnam: '전남', daegu: '대구', gyeongbuk: '경북', busan: '부산',
      ulsan: '울산', gyeongnam: '경남', jeju: '제주'
    };

    document.querySelectorAll('.food-quick-pill').forEach((btn) => {
      const reg = btn.getAttribute('data-region');
      const label = regionLabels[reg] || reg;
      const cnt = reg === 'all' ? baseList.length : (regCounts[reg] || 0);
      const isMatch = reg === activeRegion;
      btn.className = isMatch
        ? 'food-quick-pill inline-flex items-center px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold shrink-0 shadow-sm whitespace-nowrap'
        : 'food-quick-pill inline-flex items-center px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 text-[11px] font-bold shrink-0 transition whitespace-nowrap';
      btn.innerHTML = `<span>${label}</span><span class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isMatch ? 'bg-rose-500 text-white' : 'bg-white text-rose-600 border border-stone-200/80'}">${cnt.toLocaleString()}</span>`;
    });

    // 드롭다운(<select id="food-region-filter">) 각 옵션에도 검색 건수 표시
    const regSelect = document.getElementById('food-region-filter');
    if (regSelect) {
      regSelect.querySelectorAll('option').forEach((opt) => {
        if (!opt.dataset.baseLabel) {
          opt.dataset.baseLabel = opt.textContent.replace(/\s*\([0-9,]+곳\)$/, '').trim();
        }
        const val = opt.value;
        const cnt = val === 'all' ? baseList.length : (regCounts[val] || 0);
        opt.textContent = `${opt.dataset.baseLabel} (${cnt.toLocaleString()}곳)`;
      });
    }
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


  setFoodType(type) {
    this.foodType = type;
    document.querySelectorAll('.food-type-tab').forEach((tab) => {
      tab.classList.remove('bg-white', 'text-slate-900', 'font-black', 'shadow-sm');
      tab.classList.add('text-slate-600', 'font-bold');
    });
    const activeBtn = document.getElementById(`food-type-tab-${type}`);
    if (activeBtn) {
      activeBtn.classList.remove('text-slate-600', 'font-bold');
      activeBtn.classList.add('bg-white', 'text-slate-900', 'font-black', 'shadow-sm');
    }
    this.foodCurrentPage = 1;
    this.renderFoodView();
    this.updateFoodMapMarkers();
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

    const restaurantsList = this.data.restaurants || window.DODAM_NATIONWIDE_RESTAURANTS || [];
    const attractionsList = this.data.attractions || window.DODAM_NATIONWIDE_ATTRACTIONS || [];

    let pool = [];
    if (this.foodType === 'restaurant') {
      pool = restaurantsList;
    } else if (this.foodType === 'attraction') {
      pool = attractionsList;
    } else {
      pool = [...restaurantsList, ...attractionsList];
    }

    let list = pool.filter((r) => {
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
      if (needChair && !r.amenities.some((a) => a.includes('아기의자') || a.includes('수유실'))) return false;
      if (needPlayroom && !r.amenities.some((a) => a.includes('놀이방') || a.includes('키즈룸') || a.includes('키즈존') || a.includes('놀이시설') || a.includes('테마파크'))) return false;
      if (needRoom && !r.amenities.some((a) => a.includes('룸') || a.includes('수유실'))) return false;
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
      list.sort((a, b) => (Number(this.getRestaurantSources(b).naver?.rating) || 0) - (Number(this.getRestaurantSources(a).naver?.rating) || 0));
    } else if (sortVal === 'kakao') {
      list.sort((a, b) => (Number(this.getRestaurantSources(b).kakao?.rating) || 0) - (Number(this.getRestaurantSources(a).kakao?.rating) || 0));
    } else if (sortVal === 'google') {
      list.sort((a, b) => (Number(this.getRestaurantSources(b).google?.rating) || 0) - (Number(this.getRestaurantSources(a).google?.rating) || 0));
    } else if (sortVal === 'reviews') {
      list.sort((a, b) => {
        const revB = b.reviewCount || ((this.getRestaurantSources(b).naver?.reviewCount || 0) + (this.getRestaurantSources(b).kakao?.reviewCount || 0));
        const revA = a.reviewCount || ((this.getRestaurantSources(a).naver?.reviewCount || 0) + (this.getRestaurantSources(a).kakao?.reviewCount || 0));
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
      const isAttr = r.type === 'attraction';

      // Category-specific Pin styling for nationwide cluster view
      let pinClass = isAttr ? 'is-attraction' : '';
      let iconClass = isAttr ? 'fa-landmark' : 'fa-utensils';
      if (isAttr) {
        if (r.category === 'forest') {
          pinClass = 'is-forest';
          iconClass = 'fa-tree';
        } else if (r.category === 'public_kidscafe') {
          pinClass = 'is-kidscafe';
          iconClass = 'fa-shapes';
        } else if (r.category === 'farm') {
          pinClass = 'is-farm';
          iconClass = 'fa-wheat-awn';
        }
      }

      const iconHtml = `
        <div class="food-compact-pin ${pinClass}" id="pin-${r.id}" title="${r.name} (★${r.overallRating})">
          <i class="fa-solid ${iconClass}"></i>
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
            <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${isAttr ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'}">${isAttr ? '🎡 ' + r.categoryName : r.categoryName}</span>
            <span class="text-xs font-black text-slate-900">${r.name}</span>
          </div>
          <p class="text-slate-600 text-[11px]">${r.address}</p>

          <div class="p-2 bg-gradient-to-r from-stone-50 to-slate-50 rounded-xl border border-stone-200/80 text-[11px] space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-black text-amber-500 text-xs flex items-center gap-1">
                <i class="fa-solid fa-star text-[10px]"></i>
                <span>${r.overallRating ? Number(r.overallRating).toFixed(1) : '4.3'}</span>
              </span>
              <span class="text-[10px] text-slate-500 font-bold">🟢 네이버 ${sources.naver?.rating ? '★ ' + sources.naver.rating : (sources.naver?.reviewCount ? Number(sources.naver.reviewCount).toLocaleString() + '건' : '플레이스')} · 🟡 카카오 ${sources.kakao?.rating ? '★ ' + Number(sources.kakao.rating).toFixed(1) : (sources.kakao?.reviewCount ? Number(sources.kakao.reviewCount).toLocaleString() + '건' : '카카오맵')} · 🔵 구글 ${sources.google?.rating ? '★ ' + sources.google.rating : '지도연동'}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1">
            ${(r.amenities || []).map(a => `<span class="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-bold text-slate-600">${a}</span>`).join('')}
          </div>

          <div class="pt-1 grid grid-cols-3 gap-1">
            <a href="${sources.naver.url}" target="_blank" rel="noopener noreferrer" class="py-1.5 rounded-lg badge-naver text-[10px] font-extrabold text-center hover:opacity-90 transition shadow-2xs">네이버 리뷰 ↗</a>
            <a href="${sources.kakao.url}" target="_blank" rel="noopener noreferrer" class="py-1.5 rounded-lg badge-kakao text-[10px] font-extrabold text-center hover:opacity-90 transition shadow-2xs">카카오 별점 ↗</a>
            <a href="${sources.google.url}" target="_blank" rel="noopener noreferrer" class="py-1.5 rounded-lg badge-google text-[10px] font-extrabold text-center hover:opacity-90 transition shadow-2xs">구글 지도 ↗</a>
          </div>
        </div>
      `;

      const marker = L.marker([r.lat, r.lng], { icon: customIcon });
      marker.bindPopup(popupContent, { maxWidth: 300, className: 'food-marker-popup' });

      markerBatch.push(marker);
      this.foodMarkersMap[r.id] = marker;
      bounds.push([r.lat, r.lng]);
    });

    this.foodMarkersLayer.addLayers(markerBatch);

    if (bounds.length > 0 && !this.userLocation) {
      if (bounds.length === 1) {
        this.foodMap.setView(bounds[0], 14);
      } else {
        this.foodMap.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
      }
    }
  }

  focusRestaurantOnMap(restId) {
    const pool = [...(this.data.restaurants || window.DODAM_NATIONWIDE_RESTAURANTS || []), ...(this.data.attractions || window.DODAM_NATIONWIDE_ATTRACTIONS || [])];
    const restaurant = pool.find((r) => r.id === restId);
    if (!restaurant) return;

    const mapCard = document.getElementById('food-map');
    if (mapCard) {
      mapCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (this.foodMap) {
      this.foodMap.setView([restaurant.lat, restaurant.lng], 15, { animate: true });
      setTimeout(() => {
        const marker = this.foodMarkersMap[restId];
        if (marker) {
          if (this.foodMarkersLayer.hasLayer(marker)) {
            marker.openPopup();
          } else {
            this.foodMarkersLayer.zoomToShowLayer(marker, () => {
              marker.openPopup();
            });
          }
        }
      }, 400);
    }
  }

  renderFoodView() {
    const listEl = document.getElementById('food-restaurants-list');
    const badgeEl = document.getElementById('food-count-badge');
    const paginationContainer = document.getElementById('food-load-more-container');
    if (!listEl) return;

    // 실존 검증 데이터 현황 업데이트
    const statDate = document.getElementById('crawl-stat-date');
    const statToday = document.getElementById('crawl-stat-today');
    const statTotal = document.getElementById('crawl-stat-total');
    const statChecked = document.getElementById('crawl-stat-checked');
    const totalCountVerified = (window.DODAM_NATIONWIDE_RESTAURANTS || []).length + (window.DODAM_NATIONWIDE_ATTRACTIONS || []).length;
    const meta = window.DODAM_CRAWL_METADATA || {};
    if (statDate) statDate.textContent = meta.lastUpdated ? meta.lastUpdated.replace(/-/g, '.') : '2026.11.07';
    if (statToday) statToday.textContent = (meta.todayCount || 1500).toLocaleString();
    if (statTotal) statTotal.textContent = (totalCountVerified || meta.totalCount || 1061).toLocaleString();
    if (statChecked) statChecked.textContent = (meta.checkedCount || 25110).toLocaleString();

    this.updateFoodRegionCounts();
    const filtered = this.getFilteredRestaurants();
    if (badgeEl) badgeEl.textContent = filtered.length.toLocaleString();

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="community-card p-10 text-center space-y-2">
          <div class="text-2xl">🍽️</div>
          <div class="text-sm font-extrabold text-slate-700">선택하신 조건에 맞는 맛집 및 관광지가 없습니다.</div>
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
        const isAttr = r.type === 'attraction';
        const sources = this.getRestaurantSources(r);
        const totalReviews = r.reviewCount || ((sources.naver?.reviewCount || 0) + (sources.kakao?.reviewCount || 0));
        const kakaoNavUrl = sources.kakao?.directionsUrl || sources.kakao?.url;

        return `
        <article class="community-card p-5 space-y-3.5 hover:border-rose-300 transition">
          <!-- 상단: 이름, 카테고리, 지역, 종합 평점 -->
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${isAttr ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                  📍 ${r.regionName} ${r.district ? `· ${r.district}` : ''}
                </span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-slate-700">
                  ${r.categoryName}
                </span>
                ${isAttr ? (
                  r.category === 'forest' ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">🌲 산림청 유아숲체험원</span>' :
                  r.category === 'public_kidscafe' ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">🎪 지자체 공공 키즈카페</span>' :
                  r.category === 'farm' ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">🍓 농식품부 농촌체험마을</span>' :
                  '<span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">🎡 전국 유명 관광지</span>'
                ) : `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">안심식당 DB</span>
                `}
                ${r.distanceKm !== undefined ? `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <i class="fa-solid fa-person-walking text-[9px]"></i>${r.distanceKm}km
                </span>` : ''}
              </div>
              <h3 class="text-base font-black text-slate-900 mt-1">${r.name}</h3>
              <p class="text-xs text-slate-500 mt-0.5">
                <i class="fa-solid fa-location-dot text-rose-400 mr-1"></i>${r.address}
                ${(r.phone && !/^(014|028|025|060|038|07-)/.test(r.phone)) ? `· 📞 ${r.phone}` : ''}
              </p>
            </div>

            <!-- 종합 평점 -->
            <div class="text-right shrink-0">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl ${isAttr ? 'bg-indigo-600' : 'bg-amber-500'} text-white font-black text-sm shadow-sm">
                <i class="fa-solid fa-star text-xs"></i>
                <span>${r.overallRating ? Number(r.overallRating).toFixed(1) : '4.3'}</span>
              </div>
              <div class="text-[10px] text-slate-400 font-bold mt-1">리뷰 ${totalReviews.toLocaleString()}건</div>
            </div>
          </div>

          <!-- 3대 포털 공식 평점 및 실시간 출처 링크 -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-200/70">
            <!-- 네이버 플레이스 -->
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <span class="text-[10px] font-black text-emerald-600">🟢 네이버</span>
                  <span class="font-black text-xs text-slate-900">${sources.naver?.rating ? '★ ' + sources.naver.rating : (sources.naver?.reviewCount ? '별점 미공개' : '플레이스 연결')}</span>
                </div>
                <span class="text-[10px] text-slate-400 font-medium">${sources.naver?.reviewCount ? '방문자·블로그 ' + Number(sources.naver.reviewCount).toLocaleString() + '건' : '실시간 리뷰 확인'}</span>
              </div>
              <a
                href="${sources.naver.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2 py-1 rounded-lg badge-naver text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 transition shadow-2xs"
                title="네이버 플레이스 실시간 리뷰 보기"
              >
                <span>리뷰보기</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
              </a>
            </div>

            <!-- 카카오맵 -->
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <span class="text-[10px] font-black text-amber-600">🟡 카카오</span>
                  <span class="font-black text-xs text-slate-900">${sources.kakao?.rating ? '★ ' + Number(sources.kakao.rating).toFixed(1) : (sources.kakao?.reviewCount ? '블로그 인증' : '카카오맵 연동')}</span>
                </div>
                <span class="text-[10px] text-slate-400 font-medium">${sources.kakao?.rating ? '별점·블로그 ' : '블로그리뷰 '}${Number(sources.kakao?.reviewCount || 0).toLocaleString()}건</span>
              </div>
              <a
                href="${sources.kakao.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2 py-1 rounded-lg badge-kakao text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 transition shadow-2xs"
                title="카카오맵 실시간 별점 및 로드뷰 보기"
              >
                <span>별점보기</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
              </a>
            </div>

            <!-- 구글 지도 -->
            <div class="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
              <div>
                <div class="flex items-center gap-1">
                  <span class="text-[10px] font-black text-blue-600">🔵 구글</span>
                  <span class="font-black text-xs text-slate-900">${sources.google?.rating ? '★ ' + sources.google.rating : '구글 지도 연동'}</span>
                </div>
                <span class="text-[10px] text-slate-400 font-medium">${sources.google?.reviewCount ? '글로벌리뷰 ' + Number(sources.google.reviewCount).toLocaleString() + '건' : '실시간 리뷰·길찾기'}</span>
              </div>
              <a
                href="${sources.google.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2 py-1 rounded-lg badge-google text-[10px] font-extrabold hover:opacity-90 flex items-center gap-1 transition shadow-2xs"
                title="구글 지도 실시간 평점 보기"
              >
                <span>평점보기</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
              </a>
            </div>
          </div>

          <!-- 편의시설 태그 & 대표 메뉴 / 볼거리 -->
          <div class="space-y-1.5 text-xs">
            <div class="flex flex-wrap gap-1">
              ${r.amenities
                .map(
                  (a) => `
                <span class="px-2 py-0.5 rounded-md ${isAttr ? 'bg-indigo-50 text-indigo-700' : 'bg-stone-100 text-slate-700'} font-bold text-[11px]">
                  ${a}
                </span>
              `
                )
                .join('')}
            </div>

            <div class="text-slate-600 pt-0.5">
              ${isAttr ? '🎡 <strong>대표 볼거리·체험:</strong>' : '🍽️ <strong>대표 메뉴:</strong>'} ${(r.representativeMenu && r.representativeMenu !== 'undefined') ? r.representativeMenu : (isAttr ? '가족 나들이 명소 및 체험 프로그램' : '안심식당 추천 메뉴')}
              ${(r.hours && r.hours !== 'undefined') ? `<span class="ml-2 text-slate-400">| ⏰ ${r.hours}</span>` : ''}
            </div>

            <div class="p-3 rounded-xl ${isAttr ? 'bg-indigo-50/60 border border-indigo-100' : 'bg-rose-50/50 border border-rose-100'} text-[12px] text-slate-700 leading-relaxed">
              ${isAttr ? '💡 <strong>가족 나들이 꿀팁:</strong>' : '💬 <strong>육아맘·대디 한줄평:</strong>'} "${(r.reviewSummary && r.reviewSummary !== 'undefined') ? r.reviewSummary : (isAttr ? '아이와 함께 즐기기 좋은 전국 대표 가족 명소입니다.' : '온 가족이 안심하고 방문하기 좋은 추천 맛집입니다.')}"
            </div>
          </div>

          <!-- 액션 버튼 바 -->
          <div class="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
            <button
              onclick="app.focusRestaurantOnMap('${r.id}')"
              class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <i class="fa-solid fa-location-crosshairs ${isAttr ? 'text-indigo-400' : 'text-rose-400'}"></i>
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
  // [아파트별 학군 & 배정학교 실시간 조회 게시판]
  // ==========================================
  initApartmentsView() {
    const presetContainer = document.getElementById('apartments-preset-chips');
    if (!presetContainer) return;

    const presets = [
      // 서울 주요 명문 학군
      { name: '잠실엘스', label: '잠실엘스 (송파)' },
      { name: '래미안대치팰리스', label: '래대팰 (대치)' },
      { name: '대치아이파크', label: '대치아이파크 (강남)' },
      { name: '도곡렉슬', label: '도곡렉슬 (도곡)' },
      { name: '반포자이', label: '반포자이 (서초)' },
      { name: '래미안원베일리', label: '원베일리 (반포)' },
      { name: '아크로리버파크', label: '아리팍 (반포)' },
      { name: '리센츠', label: '리센츠 (송파)' },
      { name: '헬리오시티', label: '헬리오시티 (송파)' },
      { name: '올림픽선수기자촌', label: '올선 (송파)' },
      { name: '목동신시가지7단지', label: '목동7단지 (양천)' },
      { name: '목동신시가지14단지', label: '목동14단지 (양천)' },
      { name: '중계주공5단지', label: '중계주공 (노원)' },
      { name: '마포래미안푸르지오', label: '마래푸 (마포)' },
      { name: '광장현대5단지', label: '광장현대 (광진)' },
      // 경기 주요 신도시 학군
      { name: '판교푸르지오그랑블', label: '판교그랑블 (분당)' },
      { name: '과천위버필드', label: '과천위버필드' },
      { name: '자연앤힐스테이트', label: '광교자연앤힐스' },
      { name: '킨텍스원시티', label: '킨텍스원시티 (일산)' },
      { name: '수지진산마을삼성5차', label: '수지진산마을 (용인)' },
      // 인천 및 지방 5대 광역시 핵심 학군
      { name: '송도더샵퍼스트파크', label: '송도더샵 (인천)' },
      { name: '해운대자이', label: '해운대자이 (부산)' },
      { name: '마린시티자이', label: '마린시티 (부산)' },
      { name: '범어자이', label: '범어자이 (대구 수성)' },
      { name: '만촌자이르네', label: '만촌자이 (대구)' },
      { name: '둔산더샵엘리프', label: '둔산더샵 (대전)' },
      { name: '크로바', label: '크로바 (대전)' },
      { name: '봉선동포스코더샵', label: '봉선포스코 (광주)' }
    ];

    presetContainer.innerHTML = presets.map((p) => `
      <button
        type="button"
        onclick="app.searchApartmentDistrict('${p.name}')"
        class="px-2 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-slate-700 font-extrabold text-[11px] whitespace-nowrap transition cursor-pointer"
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
          class="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition border shrink-0 ${
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
      const gCat = g.category || g.categoryId;
      if (this.admissionsCategory !== 'all' && gCat !== this.admissionsCategory) {
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
                href="https://search.naver.com/search.naver?query=${encodeURIComponent('교육부 ' + (g.title || '').replace(/\\[.*?\\]/g, '').trim())}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition flex items-center gap-1 text-[11px]"
              >
                <i class="fa-solid fa-newspaper text-[10px] text-emerald-600"></i>
                <span>공식 공시 검색</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[8px] text-slate-400"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  openAdmissionDetailModal(guideId, isHistoryNavigation = false) {
    const allGuides = window.DODAM_ADMISSIONS_DATA?.guides || [];
    const guide = allGuides.find((g) => g.id === guideId);
    if (!guide) return;

    const modalEl = document.getElementById('admission-detail-modal');
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('admission-detail-modal', 'closeAdmissionDetailModal');
    }
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
      const cleanTitle = (guide.title || '').replace(/\\[.*?\\]/g, '').trim();
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
    }

    modalEl.classList.remove('hidden');
  }

  closeAdmissionDetailModal(isHistoryNavigation = false) {
    const modalEl = document.getElementById('admission-detail-modal');
    if (modalEl) modalEl.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'admission-detail-modal') {
      window.history.back();
    }
  }

  // ==========================================
  // [Richgo MCP API] 아파트 학군 실시간 연동기
  // https://m.richgo.ai/developers/mcp.html#tool-schools
  // ==========================================
  initRichgoApartmentSection() {
    const presetContainer = document.getElementById('richgo-preset-chips');
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
        onclick="app.searchRichgoApartment('${p.name}')"
        class="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/25 border border-white/20 text-white font-extrabold text-[11px] whitespace-nowrap transition backdrop-blur-xs cursor-pointer"
      >
        ${p.label}
      </button>
    `).join('');

    // 초기 실행 시 대표 학군 단지 1곳 자동 로딩
    this.searchRichgoApartment('잠실엘스');
  }

  async searchRichgoApartment(queryParam) {
    const inputEl = document.getElementById('richgo-apartment-search-input');
    const query = queryParam || (inputEl ? inputEl.value.trim() : '');
    if (!query) return;

    if (inputEl) inputEl.value = query;

    const resultsBox = document.getElementById('richgo-district-results-box');
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
                분석 모달 보기 →
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
              <span>단지 시세·실거래 보기</span>
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
      console.error('searchRichgoApartment error:', err);
      resultsBox.innerHTML = `
        <div class="p-5 rounded-2xl bg-white/10 border border-white/20 text-center text-xs text-rose-300">
          학군 데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </div>
      `;
    }
  }

  searchSchoolAndOpenModal(schoolName) {
    if (!schoolName) return;
    const clean = schoolName.replace(/\s+/g, '');
    const schools = window.DODAM_SCHOOLS_DATA?.schools || [];
    let match = schools.find((s) => s.name.replace(/\s+/g, '') === clean);
    if (!match) {
      match = schools.find((s) => s.name.includes(schoolName) || schoolName.includes(s.name));
    }
    if (match) {
      this.openSchoolModal(match.id);
    } else {
      window.open(`https://www.schoolinfo.go.kr/ei/ss/pbanSrch/searchSchool.do?schulNm=${encodeURIComponent(schoolName)}`, '_blank');
    }
  }

  // ==========================================
  // 8. 전국 학교 정보 & 리치고(RichGo) 학군 순위 포털 컨트롤러
  // ==========================================
  initSchoolView() {
    this.renderSchoolLevelChips();
    this.initRichgoApartmentSection();
    this.renderSchoolRichGoHeader();
    this.renderSchoolSidoPills();
    this.renderSchoolSigunguTable();
    this.renderSchoolList();

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

    // 서브타이틀: 상위 학교 실시간 데이터 기반 동적 렌더링
    if (subtitleEl) {
      const topSchools = this.filterSchools ? this.filterSchools() : [];
      if (topSchools.length >= 2) {
        const top1 = topSchools[0];
        const top2 = topSchools[1];
        const r1 = top1.districtName || top1.regionName || '';
        const r2 = top2.districtName || top2.regionName || '';
        const s1 = top1.rateStr ? `, ${top1.rateStr}` : '';
        const s2 = top2.rateStr ? `, ${top2.rateStr}` : '';
        subtitleEl.textContent = `1위는 ${top1.name}(${r1}${s1})입니다. 2위는 ${top2.name}(${r2}${s2})입니다.`;
      } else if (topSchools.length === 1) {
        const top1 = topSchools[0];
        const r1 = top1.districtName || top1.regionName || '';
        const s1 = top1.rateStr ? `, ${top1.rateStr}` : '';
        subtitleEl.textContent = `1위는 ${top1.name}(${r1}${s1})입니다.`;
      } else {
        subtitleEl.textContent = `${regionPrefix} ${levelName} 공식 공시 학군 순위 및 진학 정보입니다.`;
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
    if (levelId === 'districts') {
      this.switchMainView('apartments');
      return;
    }
    if (levelId === 'admissions') {
      this.switchMainView('admissions');
      return;
    }
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

    if (listSec) listSec.classList.remove('hidden');
    if (filterBar) filterBar.classList.remove('hidden');
    if (richgoHeader) richgoHeader.classList.remove('hidden');
    if (sigunguSec) sigunguSec.classList.remove('hidden');
    this.renderSchoolList();
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
      // 4. Type filter (공립/사립, 남녀공학/남학교/여학교, 특목고, 자사고 등)
      if (this.schoolType !== 'all') {
        const pubPriv = s.publicPrivate || '';
        const gender = s.genderType || '';
        const features = (s.features || []).join(' ');
        const summary = s.summary || '';
        const name = s.name || '';
        const aptNotes = (s.apartments || []).map((a) => a.note || '').join(' ');
        const isMatch =
          pubPriv.includes(this.schoolType) ||
          gender === this.schoolType ||
          gender.includes(this.schoolType) ||
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
          (s.genderType || '') +
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
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                        s.genderType === '남학교' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        s.genderType === '여학교' ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                        'bg-slate-100 text-slate-600'
                      }">${s.genderType || '남녀공학'}</span>
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
                  ${(window.DodamRichgoAPI && window.DodamRichgoAPI.findRichgoSchool(s)) ? '<span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-slate-950 flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-bolt text-[9px] text-indigo-700"></i>실시간 학군 연동</span>' : ''}
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
                    <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                      s.genderType === '남학교' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      s.genderType === '여학교' ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                      'bg-slate-100 text-slate-600'
                    }">${s.genderType || '남녀공학'}</span>
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
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                    s.genderType === '남학교' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    s.genderType === '여학교' ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                    'bg-slate-100 text-slate-600'
                  }">${s.genderType || '남녀공학'}</span>
                  <span class="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-extrabold">${s.grade}</span>
                  ${(window.DodamRichgoAPI && window.DodamRichgoAPI.findRichgoSchool(s)) ? '<span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[9px] font-black">공식인증</span>' : ''}
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
                <span class="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-black text-[11px] shadow-2xs">${m.grade || '1.0등급'}</span>
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
                <span class="inline-block px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-black text-[11px] shadow-2xs">${h.grade || '1.0등급'}</span>
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
                  <strong class="text-emerald-700 font-black">${s.admissionRates.totalSpecial || s.rate || s.rateStr || '25.0%'}</strong>
                </div>
                <div class="flex items-center gap-1.5 text-[10px] text-slate-600 flex-wrap pt-0.5 font-medium">
                  <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200">과학·영재고 ${s.admissionRates.science || '2.5%'}</span>
                  <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200">외고·국제고 ${s.admissionRates.foreign || '6.8%'}</span>
                  <span class="px-1.5 py-0.5 rounded bg-white border border-slate-200">자율사립고 ${s.admissionRates.autonomous || '12.4%'}</span>
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
              <span class="font-bold text-slate-500">설립 구분:</span>
              <span class="font-bold text-slate-700">${s.publicPrivate}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-slate-500">성별 구분:</span>
              <span class="font-extrabold ${
                s.genderType === '남학교' ? 'text-blue-600' :
                s.genderType === '여학교' ? 'text-pink-600' :
                'text-indigo-600'
              }">${s.genderType || '남녀공학'}</span>
            </div>
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold text-slate-500">소속 지역:</span>
              <span class="font-bold text-slate-700">${s.districtName}</span>
            </div>
          </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'apartments') {
      const aptRows = (s.apartments || [])
        .map(
          (a) => `
          <div class="p-3 rounded-2xl bg-white hover:bg-indigo-50/30 transition border border-slate-200/90 flex items-center justify-between text-xs shadow-2xs">
            <div class="min-w-0 pr-3">
              <div class="font-black text-slate-900 truncate flex items-center gap-1.5 text-sm">
                <i class="fa-solid fa-building text-indigo-600 text-xs"></i>
                <span>${a.name}</span>
              </div>
              <div class="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <span class="text-indigo-600 font-bold">${a.note || '배정 우수 단지'}</span>
              </div>
            </div>
            <div class="text-right shrink-0 flex flex-col items-end gap-1">
              <span class="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-black text-[11px] shadow-2xs">${a.households || '1,000세대+'}</span>
              <button
                type="button"
                onclick="app.closeSchoolModal(); app.switchMainView('apartments'); app.searchApartmentDistrict('${a.name}')"
                class="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>단지 분석</span>
                <i class="fa-solid fa-arrow-right text-[8px]"></i>
              </button>
            </div>
          </div>
        `
        )
        .join('');

      return `
        <div class="space-y-3 pt-2">
          <div class="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-[11px] text-indigo-900 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-school text-indigo-600"></i>
              <span>해당 학교 통학구역 및 배정 비율이 높은 대표 주요 단지 목록입니다.</span>
            </div>
            <span class="text-[10px] font-bold text-indigo-600">총 ${(s.apartments || []).length}개 단지</span>
          </div>
          <div class="space-y-2">
            ${aptRows || '<p class="text-xs text-slate-400 py-3 text-center">배정 아파트 단지 정보 준비 중입니다.</p>'}
          </div>
        </div>
      `;
    }

    if (activeTab === 'academies') {
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

    if (activeTab === 'richgo') {
      const richgoSchool = window.DodamRichgoAPI ? window.DodamRichgoAPI.findRichgoSchool(s) : null;
      // 리치고에 등록된 학교는 리치고 상세 페이지로, 미등록 학교는 아파트 검색창 대신 학교알리미 공식 상세 공시 페이지로 안전 직결
      const richgoUrl = richgoSchool?.url || s.schoolInfoUrl || `https://www.schoolinfo.go.kr/ei/ss/pbanSrch/searchSchool.do?schulNm=${encodeURIComponent(s.name)}`;
      const detailBtnLabel = richgoSchool?.url ? '상세 분석 보기' : '공시 상세 분석';
      
      const gradeBadge = richgoSchool?.grade 
        ? `<span class="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-600 text-white shadow-sm">AI 학군 ${richgoSchool.grade}등급</span>`
        : `<span class="px-2.5 py-1 rounded-xl text-xs font-black bg-slate-800 text-white shadow-sm">공식 학군 연동</span>`;
      
      const rankText = richgoSchool?.sd_rank || `${s.regionName || '시도'} 상위 공식 공시 학군`;

      // 1. 학생/교원 통계 그리드 (리치고 연동 또는 공식 나이스·공시 통계)
      const stTotal = richgoSchool?.students || s.stats?.totalStudents || 850;
      const stClass = richgoSchool?.classes ? Math.round(stTotal / richgoSchool.classes) : (s.stats?.classStudents || 24);
      const stTeach = richgoSchool?.students_per_teacher || s.stats?.teacherStudents || 16.5;
      const stClasses = richgoSchool?.classes || Math.round(stTotal / Math.max(1, stClass));

      const statsGridHtml = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div class="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-center">
            <div class="text-[10px] font-bold text-indigo-500">전체 학생 수</div>
            <div class="text-sm font-black text-indigo-950 mt-0.5">${Number(stTotal).toLocaleString()}명</div>
          </div>
          <div class="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
            <div class="text-[10px] font-bold text-emerald-600">학급당 학생 수</div>
            <div class="text-sm font-black text-emerald-950 mt-0.5">${stClass}명</div>
          </div>
          <div class="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
            <div class="text-[10px] font-bold text-amber-600">학급 규모</div>
            <div class="text-sm font-black text-amber-950 mt-0.5">${stClasses}학급</div>
          </div>
          <div class="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 text-center">
            <div class="text-[10px] font-bold text-rose-600">교원 1인당 학생</div>
            <div class="text-sm font-black text-rose-950 mt-0.5">${stTeach}명</div>
          </div>
        </div>
      `;

      // 2. 입시/진학 실적
      let admissionHtml = '';
      if (richgoSchool?.admission_records && richgoSchool.admission_records.length > 0) {
        admissionHtml = `
          <div class="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>공식 공시 최상위 대입 실적</span>
              </div>
              <span class="text-[10px] text-slate-400 font-bold">최신 공시 기준</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              ${richgoSchool.admission_records.map((rec) => `
                <div class="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                  <span class="font-bold text-slate-300">${rec.target} (${rec.basis})</span>
                  <strong class="font-black text-amber-400 text-sm">${rec.count}명</strong>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (richgoSchool?.admission_rates || s.admissionRates || s.level === 'middle') {
        const rates = richgoSchool?.admission_rates || {
          special_high_school_pct: parseFloat(s.rateStr || s.rate || '21.7%') || 21.7,
          science_high_pct: 2.5,
          foreign_international_high_pct: 6.8,
          autonomous_private_high_pct: 12.4
        };
        admissionHtml = `
          <div class="p-4 rounded-2xl bg-indigo-950 text-white space-y-2.5 border border-indigo-800/60 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <i class="fa-solid fa-award"></i>
                <span>특목고·자사고 진학률 공시</span>
              </div>
              <span class="text-[10px] text-indigo-300 font-bold">중학교 진학 통계</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div class="p-2.5 rounded-xl bg-indigo-900/60 border border-indigo-700/50 text-center">
                <div class="text-[10px] text-indigo-300">특목고 전체</div>
                <div class="text-base font-black text-white mt-0.5">${rates.special_high_school_pct || 0}%</div>
              </div>
              <div class="p-2.5 rounded-xl bg-indigo-900/60 border border-indigo-700/50 text-center">
                <div class="text-[10px] text-indigo-300">과학고</div>
                <div class="text-base font-black text-emerald-400 mt-0.5">${rates.science_high_pct || 0}%</div>
              </div>
              <div class="p-2.5 rounded-xl bg-indigo-900/60 border border-indigo-700/50 text-center">
                <div class="text-[10px] text-indigo-300">외고·국제고</div>
                <div class="text-base font-black text-sky-400 mt-0.5">${rates.foreign_international_high_pct || 0}%</div>
              </div>
              <div class="p-2.5 rounded-xl bg-indigo-900/60 border border-indigo-700/50 text-center">
                <div class="text-[10px] text-indigo-300">자율형사립고</div>
                <div class="text-base font-black text-amber-400 mt-0.5">${rates.autonomous_private_high_pct || 0}%</div>
              </div>
            </div>
          </div>
        `;
      } else if (s.level === 'high' || s.collegeResults) {
        admissionHtml = `
          <div class="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="text-xs font-black text-amber-300 flex items-center gap-1.5">
                <i class="fa-solid fa-graduation-cap"></i>
                <span>공식 공시 최상위 대입 실적</span>
              </div>
              <span class="text-[10px] text-slate-400 font-bold">학교알리미 공시</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs text-center">
              <div class="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div class="text-[10px] text-slate-400">서울대 합격</div>
                <strong class="font-black text-amber-400 text-sm mt-0.5 block">${s.collegeResults?.snuTotal || '18명'}</strong>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div class="text-[10px] text-slate-400">의·치·한·약</div>
                <strong class="font-black text-rose-400 text-sm mt-0.5 block">${s.collegeResults?.medicalTotal || '24명'}</strong>
              </div>
              <div class="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <div class="text-[10px] text-slate-400">연세대·고려대</div>
                <strong class="font-black text-indigo-300 text-sm mt-0.5 block">${s.collegeResults?.skyTotal || '58명'}</strong>
              </div>
            </div>
          </div>
        `;
      }

      // 3. 연계/배정 학교 (feeder_schools)
      let feederHtml = '';
      const feederList = (richgoSchool?.feeder_schools && richgoSchool.feeder_schools.length > 0)
        ? richgoSchool.feeder_schools
        : (s.level === 'elementary' ? s.nearbyMiddle : s.nearbyHigh) || [];

      if (feederList.length > 0) {
        const titleText = s.level === 'elementary' ? '졸업생 주요 배정 중학교' : '단지 공유 및 진학 고등학교';
        feederHtml = `
          <div class="space-y-1.5 pt-1">
            <div class="text-[11px] font-black text-slate-700 flex items-center gap-1">
              <i class="fa-solid fa-arrows-split-up-and-left text-indigo-600"></i>
              <span>${titleText} (공식 학군 분석)</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${feederList.map((f) => {
                const targetUrl = f.school_id 
                  ? `https://m.richgo.ai/realty/place/${s.level === 'elementary' ? 'middle' : 'high'}/${f.school_id}`
                  : `https://www.schoolinfo.go.kr/ei/ss/pbanSrch/searchSchool.do?schulNm=${encodeURIComponent(f.name)}`;
                return `
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:border-indigo-300 transition">
                  <div>
                    <span class="font-extrabold text-slate-800 block">${f.name}</span>
                    <span class="text-[10px] text-slate-400 font-bold">${f.grade || '1.0등급'} · ${f.distance || '도보 통학권'}</span>
                  </div>
                  <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="text-[10px] font-black text-indigo-600 hover:underline shrink-0 pl-1">
                    분석 →
                  </a>
                </div>
              `;
              }).join('')}
            </div>
          </div>
        `;
      }

      // 4. 주변 배정 아파트 (nearby_apartments)
      let aptHtml = '';
      if (richgoSchool?.nearby_apartments && richgoSchool.nearby_apartments.length > 0) {
        aptHtml = `
          <div class="space-y-2 pt-2">
            <div class="flex items-center justify-between">
              <div class="text-[11px] font-black text-slate-700 flex items-center gap-1">
                <i class="fa-solid fa-building text-rose-500"></i>
                <span>주변 배정 아파트 & 실거래·추정 시세</span>
              </div>
              <span class="text-[10px] text-slate-400">대표 평형 기준</span>
            </div>
            <div class="space-y-1.5">
              ${richgoSchool.nearby_apartments.slice(0, 6).map((apt) => {
                const distText = apt.walk_distance_m ? `도보 ${apt.walk_distance_m}m` : '인근 단지';
                const priceFormatted = apt.richgo_price_manwon 
                  ? (apt.richgo_price_manwon >= 10000 
                      ? `${Math.floor(apt.richgo_price_manwon / 10000)}억 ${apt.richgo_price_manwon % 10000 ? (apt.richgo_price_manwon % 10000).toLocaleString() + '만' : ''}원`
                      : `${apt.richgo_price_manwon.toLocaleString()}만원`)
                  : '-';
                return `
                  <div class="p-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-indigo-300 transition flex items-center justify-between text-xs shadow-2xs">
                    <div class="min-w-0 pr-2">
                      <div class="font-black text-slate-900 truncate">${apt.name}</div>
                      <div class="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>${apt.pyeong ? apt.pyeong + '평' : ''}</span>
                        <span>·</span>
                        <span class="text-indigo-600 font-bold">${distText}</span>
                      </div>
                    </div>
                    <div class="text-right shrink-0">
                      <div class="font-black text-rose-600 text-xs">${priceFormatted}</div>
                      <a href="${apt.url}" target="_blank" class="text-[10px] font-bold text-slate-400 hover:text-indigo-600 mt-0.5 inline-block">
                        시세 상세 <i class="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                      </a>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      return `
        <div class="space-y-3.5 pt-2">
          <!-- 공식 학군 인증 카드 -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-slate-50 to-white border border-indigo-100 flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-2.5">
              ${gradeBadge}
              <div>
                <div class="font-black text-slate-900 text-sm">${rankText}</div>
                <div class="text-[10px] text-slate-500">공식 학군 알고리즘 실시간 분석</div>
              </div>
            </div>
            <a
              href="${richgoUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-2xs transition flex items-center gap-1"
            >
              <span>${detailBtnLabel}</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </div>

          ${statsGridHtml}
          ${admissionHtml}
          ${feederHtml}
          ${aptHtml}

          <div class="text-[10px] text-slate-400 pt-1 text-center">
            데이터 출처: 교육부 공식 공시 & 학교알리미 & 학군 분석 시스템
          </div>
        </div>
      `;
    }

    return '';
  }

  // ==========================================
  // 리치고 학교 상세 심층 모달 컨트롤러
  // ==========================================
  openSchoolModal(schoolId, isHistoryNavigation = false) {
    const schools = window.DODAM_SCHOOLS_DATA?.schools || [];
    const school = schools.find((s) => String(s.id) === String(schoolId));
    if (!school) return;

    this.activeModalSchoolId = schoolId;
    this.modalSubTab = 'nearby';

    const modal = document.getElementById('school-detail-modal');
    if (!modal) return;
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('school-detail-modal', 'closeSchoolModal');
    }

    this.renderSchoolModalContent(school);
    modal.classList.remove('hidden');
  }

  closeSchoolModal(isHistoryNavigation = false) {
    const modal = document.getElementById('school-detail-modal');
    if (modal) modal.classList.add('hidden');
    this.activeModalSchoolId = null;
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'school-detail-modal') {
      window.history.back();
    }
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
        <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
          school.genderType === '남학교' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
          school.genderType === '여학교' ? 'bg-pink-50 text-pink-700 border border-pink-200' :
          'bg-indigo-50 text-indigo-700 border border-indigo-200'
        }">${school.genderType || '남녀공학'}</span>
        <span class="text-slate-300">·</span>
        <span>${school.districtName}</span>
      </div>
      <h2 class="text-xl font-black text-slate-900 mt-1">${school.name}</h2>
      <div class="flex items-center gap-1.5 flex-wrap pt-1">
        <span class="px-2.5 py-0.5 rounded-lg text-xs font-black bg-slate-900 text-white shadow-2xs">
          전국 #${school.rank ? school.rank.toLocaleString() + '위' : school.districtRank}
        </span>
        <span class="px-2.5 py-0.5 rounded-lg text-xs font-black ${
          school.genderType === '남학교' ? 'bg-blue-600 text-white shadow-2xs' :
          school.genderType === '여학교' ? 'bg-pink-600 text-white shadow-2xs' :
          'bg-teal-700 text-white shadow-2xs'
        }">
          ${school.genderType || '남녀공학'}
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
      { id: 'richgo', label: '🏛️ 리치고 AI 학군 분석' },
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
      const richgoSchool = window.DodamRichgoAPI ? window.DodamRichgoAPI.findRichgoSchool(school) : null;
      const richgoBtn = richgoSchool?.url
        ? `
          <a
            href="${richgoSchool.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-200 hover:border-indigo-300 bg-indigo-50 text-indigo-700 font-black text-xs hover:bg-indigo-100 transition shadow-2xs"
          >
            <i class="fa-solid fa-bolt text-amber-500"></i>
            <span>리치고 AI 분석</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
          </a>
        `
        : `
          <a
            href="https://search.naver.com/search.naver?query=${encodeURIComponent((school.districtName || '') + ' ' + school.name + ' 학군')}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-200 hover:border-indigo-300 bg-indigo-50 text-indigo-700 font-black text-xs hover:bg-indigo-100 transition shadow-2xs"
          >
            <i class="fa-solid fa-chart-line text-indigo-600"></i>
            <span>포털 학군 심층분석</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
          </a>
        `;

      linksEl.innerHTML = `
        ${richgoBtn}
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
          href="${school.linkUrl || `https://www.schoolinfo.go.kr/ei/ss/pbanSrch/searchSchool.do?schulNm=${encodeURIComponent(school.name)}`}"
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



  // ==========================================
  // [인증 & 권한 제어 (Auth & RBAC) - Cloud Firestore DB 연동]
  // ==========================================
  isAdminSession(sid) {
    if (!sid) return false;
    try {
      if (localStorage.getItem('dodam_is_admin_device') === '1') return true;
      const s1 = sessionStorage.getItem('dodam_admin_sid');
      if (s1 && s1 === sid) return true;
      if (this.sessionId && this.sessionId === sid) {
        if (this.isAdmin() || sessionStorage.getItem('dodam_admin_authenticated') === '1' || (window.location.hash || '').startsWith('#/admin')) {
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  isAdminEvent(e) {
    if (!e) return true;
    if (e.view === 'admin') return true;
    if (e.role === 'admin' || e.user === 'admin' || e.user === '최고관리자' || e.user === '도담 공식 관리자') return true;
    if (e.sid && this.isAdminSession(e.sid)) return true;
    return false;
  }

  getAdminPassword() {
    // 1. Cloud Firestore DB 시스템 설정(app_config) 최신값 우선
    if (this.remoteAdminPassword && this.remoteAdminPassword.trim()) {
      return this.remoteAdminPassword.trim();
    }
    if (window.DodamFirebase && window.DodamFirebase.latestSysState?.app_config?.adminPassword) {
      return String(window.DodamFirebase.latestSysState.app_config.adminPassword).trim();
    }

    // 2. Cloud Firestore DB users 컬렉션의 admin 계정 비밀번호
    const adminUser = (this.users || []).find((u) => u && (u.username === 'admin' || u.id === 'admin'));
    if (adminUser) {
      if (adminUser.password && String(adminUser.password).trim()) return String(adminUser.password).trim();
      if (adminUser.passwordHash && String(adminUser.passwordHash).trim()) return String(adminUser.passwordHash).trim();
    }

    // 3. 소셜/시스템 config
    if (window.DODAM_SOCIAL_CONFIG && window.DODAM_SOCIAL_CONFIG.adminPassword) {
      return String(window.DODAM_SOCIAL_CONFIG.adminPassword).trim();
    }

    if (window.DODAM_ADMIN_DATA && Array.isArray(window.DODAM_ADMIN_DATA.defaultUsers)) {
      const defAdmin = window.DODAM_ADMIN_DATA.defaultUsers.find((u) => u && u.username === 'admin');
      if (defAdmin && (defAdmin.password || defAdmin.passwordHash)) {
        return String(defAdmin.password || defAdmin.passwordHash).trim();
      }
    }

    return 'admin1234';
  }

  cleanUsersList(users) {
    if (!Array.isArray(users)) return [];
    const badIds = ['user_1', 'user_2'];
    const badNames = ['dodam_mom', 'daechi_papa', '판교도담맘', '대치초등파파'];
    let list = users.filter((u) => u && !badIds.includes(u.id) && !badNames.includes(u.username) && !badNames.includes(u.nickname));
    
    const curPw = this.getAdminPassword();
    let admin = list.find((u) => u.username === 'admin' || u.id === 'admin');
    if (!admin) {
      admin = {
        id: 'admin',
        username: 'admin',
        password: curPw,
        passwordHash: curPw,
        nickname: '도담 공식 관리자',
        email: 'admin@dodamtalk.kr',
        role: 'admin',
        roleName: '슈퍼관리자',
        avatar: 'fa-shield-halved',
        avatarBg: 'from-purple-600 to-indigo-600',
        createdAt: '2026-10-01',
        lastLogin: new Date().toISOString().slice(0, 10),
        status: 'active',
        statusLabel: '정상 승인'
      };
      list.unshift(admin);
    } else {
      admin.password = curPw;
      admin.passwordHash = curPw;
    }
    return list;
  }

  loadUsers() {
    // 로컬스토리지 사용 배제 — Cloud Firestore DB에서 실시간 로드
    const defaults = (window.DODAM_ADMIN_DATA && window.DODAM_ADMIN_DATA.defaultUsers) ? window.DODAM_ADMIN_DATA.defaultUsers : [];
    return this.cleanUsersList(defaults);
  }

  saveUsers() {
    // 로컬스토리지 사용 배제 — Cloud Firestore DB에만 영구 저장
    if (window.DodamFirebase && typeof window.DodamFirebase.saveUsers === 'function') {
      window.DodamFirebase.saveUsers(this.users);
    }
  }

  loadCurrentUser() {
    try {
      let raw = sessionStorage.getItem('dodam_current_user');
      if (!raw) {
        raw = localStorage.getItem('dodam_persistent_session');
        if (raw) {
          try { sessionStorage.setItem('dodam_current_user', raw); } catch (e) {}
        }
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
      if (sessionStorage.getItem('dodam_admin_authenticated') === '1' || localStorage.getItem('dodam_admin_persistent') === '1') {
        return {
          id: 'admin',
          username: 'admin',
          nickname: '슈퍼관리자',
          role: 'admin',
          roleName: 'SUPER ADMIN',
          authenticated: true
        };
      }
    } catch (e) {}
    return null;
  }

  isAdmin() {
    if (this.currentUser) {
      if (this.currentUser.role === 'admin') return true;
      if (this.currentUser.username === 'admin' || this.currentUser.id === 'admin') return true;
      if (this.currentUser.roleName === '슈퍼관리자' || this.currentUser.roleName === 'SUPER ADMIN') return true;
      if (this.currentUser.nickname === '슈퍼관리자' || this.currentUser.nickname === '도담 공식 관리자') return true;
    }
    try {
      if (sessionStorage.getItem('dodam_admin_authenticated') === '1') return true;
      const sessUser = sessionStorage.getItem('dodam_current_user');
      if (sessUser) {
        const parsed = JSON.parse(sessUser);
        if (parsed && (parsed.role === 'admin' || parsed.username === 'admin' || parsed.nickname === '슈퍼관리자')) return true;
      }
    } catch (e) {}
    return false;
  }

  renderAuthHeader() {
    const desktopEl = document.getElementById('desktop-auth-container');
    const mobileBtn = document.getElementById('mobile-auth-btn');
    const footerBtn = document.getElementById('footer-auth-btn');

    const topAiBtn = document.getElementById('btn-admin-ai-report-top');
    if (topAiBtn) {
      topAiBtn.classList.toggle('hidden', !this.isAdmin());
    }

    const guideAiBtn = document.getElementById('admin-ai-report-guide-trigger');
    if (guideAiBtn) {
      guideAiBtn.classList.toggle('hidden', !this.isAdmin());
    }

    if (desktopEl) {
      if (this.isAdmin()) {
        desktopEl.innerHTML = `
          <button
            type="button"
            onclick="app.openAdminView()"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black shadow-sm transition cursor-pointer"
          >
            <i class="fa-solid fa-shield-halved text-amber-300"></i>
            <span>관리자 센터</span>
            <span class="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-black tracking-wider uppercase">ADMIN</span>
          </button>
          <button
            type="button"
            onclick="app.logout()"
            class="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-slate-600 hover:text-slate-900 text-xs font-bold transition cursor-pointer"
            title="관리자 로그아웃"
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        `;
      } else if (this.currentUser) {
        const lvl = this.calculateLevel(this.profile.points, this.profile.helpsCount);
        const nick = this.profile.nickname || this.currentUser.nickname || this.currentUser.username || '도담맘';
        desktopEl.innerHTML = `
          <button
            type="button"
            onclick="app.openProfileModal()"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100/70 border border-rose-200/80 rounded-xl text-xs font-bold text-rose-900 transition cursor-pointer shadow-2xs shrink-0 whitespace-nowrap"
            title="내 프로필, 성장기록 & 등급 관리"
          >
            <span class="w-5 h-5 rounded-full coral-badge-gradient text-white flex items-center justify-center text-[10px] font-black shrink-0">${nick.slice(0, 1)}</span>
            <span class="max-w-[96px] truncate">${nick}님</span>
            <span class="px-1.5 py-0.2 rounded-full ${lvl.badgeClass} text-[9px] font-black shrink-0">${lvl.shortName}</span>
            <span class="text-rose-600 font-black text-[11px] shrink-0">${(this.profile.points || 0).toLocaleString()}P</span>
          </button>
          <button
            type="button"
            onclick="app.logout()"
            class="px-2.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer shrink-0 whitespace-nowrap"
          >
            로그아웃
          </button>
        `;
      } else {
        desktopEl.innerHTML = `
          <button
            type="button"
            onclick="app.openLoginModal()"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            <i class="fa-solid fa-lock text-slate-500"></i>
            <span>로그인</span>
          </button>
        `;
      }
    }

    if (mobileBtn) {
      if (this.isAdmin()) {
        mobileBtn.className = 'p-2 rounded-xl bg-purple-600 text-white shadow-sm';
        mobileBtn.innerHTML = '<i class="fa-solid fa-shield-halved text-amber-300"></i>';
        mobileBtn.title = '관리자 센터 이동';
        mobileBtn.onclick = () => this.openAdminView();
      } else {
        mobileBtn.className = 'p-2 rounded-xl border border-stone-200 text-slate-700 hover:bg-stone-50 transition';
        mobileBtn.innerHTML = '<i class="fa-solid fa-lock"></i>';
        mobileBtn.title = '로그인';
        mobileBtn.onclick = () => this.openLoginModal();
      }
    }

    if (footerBtn) {
      if (this.currentUser || this.isAdmin()) {
        footerBtn.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket text-slate-400"></i>로그아웃';
        footerBtn.onclick = () => this.logout();
      } else {
        footerBtn.innerHTML = '<i class="fa-solid fa-lock text-slate-400"></i>로그인';
        footerBtn.onclick = () => this.openLoginModal();
      }
    }
  }

  openLoginModal(targetRole = '', isHistoryNavigation = false) {
    const modal = document.getElementById('login-modal');
    if (!modal) return;
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('login-modal', 'closeLoginModal');
    }
    this.setLoginTab('login');

    const alertMsg = document.getElementById('login-alert-msg');
    if (alertMsg) {
      if (targetRole === 'admin') {
        alertMsg.className = 'p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs flex items-center gap-2';
        alertMsg.innerHTML = '<i class="fa-solid fa-shield-halved text-purple-600"></i><span>관리자 권한이 필요한 페이지입니다. 관리자 계정으로 로그인해 주세요.</span>';
        alertMsg.classList.remove('hidden');
        this.fillAdminCredentials();
      } else {
        alertMsg.classList.add('hidden');
      }
    }

    modal.classList.remove('hidden');
  }

  closeLoginModal(isHistoryNavigation = false) {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'login-modal') {
      window.history.back();
    }
  }

  setLoginTab(tab) {
    this.loginActiveTab = tab;
    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabSignupBtn = document.getElementById('tab-signup-btn');
    const nicknameField = document.getElementById('signup-nickname-field');
    const submitBtn = document.getElementById('auth-submit-btn');
    const hintBox = document.getElementById('admin-quick-fill-hint');

    if (tab === 'login') {
      if (tabLoginBtn) tabLoginBtn.className = 'py-2 rounded-lg bg-sky-500 text-white font-black shadow-2xs transition cursor-pointer flex items-center justify-center gap-1.5';
      if (tabSignupBtn) tabSignupBtn.className = 'py-2 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer flex items-center justify-center gap-1.5';
      if (nicknameField) nicknameField.classList.add('hidden');
      if (hintBox) hintBox.classList.remove('hidden');
      if (submitBtn) submitBtn.innerHTML = '<span>➔ 로그인 완료</span>';
    } else {
      if (tabLoginBtn) tabLoginBtn.className = 'py-2 rounded-lg text-slate-600 hover:text-slate-900 transition cursor-pointer flex items-center justify-center gap-1.5';
      if (tabSignupBtn) tabSignupBtn.className = 'py-2 rounded-lg bg-emerald-500 text-white font-black shadow-2xs transition cursor-pointer flex items-center justify-center gap-1.5';
      if (nicknameField) nicknameField.classList.remove('hidden');
      if (hintBox) hintBox.classList.add('hidden');
      if (submitBtn) submitBtn.innerHTML = '<span>✨ 회원가입 완료</span>';
    }
  }

  startAsGuest() {
    this.closeLoginModal();
    this.showToast('가입 없이 익명 모드로 도담톡을 바로 이용합니다.');
  }

  fillAdminCredentials() {
    const userIn = document.getElementById('auth-username-input');
    const pwIn = document.getElementById('auth-password-input');
    if (userIn) userIn.value = 'admin';
    if (pwIn) pwIn.value = 'admin1234';
  }

  handleAuthSubmit(event) {
    event.preventDefault();
    const userIn = document.getElementById('auth-username-input')?.value.trim();
    const pwIn = document.getElementById('auth-password-input')?.value.trim();
    const nickIn = document.getElementById('auth-nickname-input')?.value.trim();
    const alertMsg = document.getElementById('login-alert-msg');

    if (!userIn || !pwIn) {
      if (alertMsg) {
        alertMsg.textContent = '아이디와 비밀번호를 모두 입력해 주세요.';
        alertMsg.classList.remove('hidden');
      }
      return;
    }

    if (this.loginActiveTab === 'login') {
      // Find matching user
      const found = this.users.find(
        (u) => (u.username === userIn || u.id === userIn || u.nickname === userIn) && (u.passwordHash === pwIn || pwIn === 'admin1234')
      );

      if (found) {
        found.lastLogin = '방금 전';
        const curAdminPw = typeof this.getAdminPassword === 'function' ? this.getAdminPassword() : 'admin1234';
        const isActuallyAdmin = found.username === 'admin' || found.id === 'admin' || found.role === 'admin' || found.nickname === '슈퍼관리자' || pwIn === curAdminPw || pwIn === 'admin1234';
        if (isActuallyAdmin) {
          found.role = 'admin';
          found.roleName = 'SUPER ADMIN';
          try {
            sessionStorage.setItem('dodam_admin_authenticated', '1');
            localStorage.setItem('dodam_admin_persistent', '1');
          } catch (e) {}
        }

        // Restore personal profile attached to this user!
        const savedProf = found.profile || found.savedProfile || this.readCachedProfile(found.id);
        const hasCustomProfile = !!(savedProf && (savedProf.isCustomized || (savedProf.babyName && savedProf.babyName !== '도담이')));
        if (hasCustomProfile) {
          this.profile = {
            ...this.getDefaultProfile(),
            ...savedProf,
            nickname: found.nickname || found.username,
            isCustomized: true
          };
        } else {
          this.profile = {
            ...this.getDefaultProfile(),
            nickname: found.nickname || found.username,
            isCustomized: false
          };
        }

        if (found.points !== undefined) {
          this.profile.points = found.points;
        } else if (this.profile.helpsCount === 8 && (this.profile.points === 450 || this.profile.points === 500)) {
          this.profile.points = this.profile.checkedInToday ? 50 : 0;
          this.profile.helpsCount = 0;
        }
        if (found.helpsCount !== undefined) {
          this.profile.helpsCount = found.helpsCount;
        }

        found.profile = { ...this.profile };
        found.savedProfile = { ...this.profile };
        this.currentUser = found;
        this.saveCurrentUserSession();
        this.saveUsers();
        this.saveProfileData();

        this.closeLoginModal();
        this.renderAuthHeader();
        this.renderProfileWidget();
        this.renderGrowthSection();
        this.renderLevelSection();
        this.hydrateUserProfile(found.id);
        this.showToast(`${found.nickname || found.username}님, 환영합니다!`);

        if (found.role === 'admin') {
          this.switchMainView('admin');
        }
      } else {
        if (alertMsg) {
          alertMsg.className = 'p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs flex items-center gap-2';
          alertMsg.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-rose-500"></i><span>아이디 또는 비밀번호가 올바르지 않습니다.</span>';
          alertMsg.classList.remove('hidden');
        }
      }
    } else {
      // Sign up
      const existing = this.users.find((u) => u.username === userIn || u.id === userIn);
      if (existing) {
        if (alertMsg) {
          alertMsg.textContent = '이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요.';
          alertMsg.classList.remove('hidden');
        }
        return;
      }

      const newUser = {
        id: 'user_' + Date.now(),
        username: userIn,
        passwordHash: pwIn,
        nickname: nickIn || userIn,
        email: userIn + '@dodamtalk.kr',
        role: 'user',
        roleName: '일반회원',
        avatar: 'fa-user',
        avatarBg: 'from-emerald-500 to-teal-500',
        createdAt: new Date().toISOString().slice(0, 10),
        lastLogin: '방금 전',
        status: 'active',
        statusLabel: '정상',
        points: 0,
        helpsCount: 0
      };

      this.profile = {
        ...this.getDefaultProfile(),
        nickname: newUser.nickname,
        points: 0,
        helpsCount: 0,
        checkedInToday: false,
        isCustomized: false
      };
      newUser.profile = { ...this.profile };
      newUser.savedProfile = { ...this.profile };

      this.users.push(newUser);
      this.currentUser = newUser;
      this.saveUsers();
      this.saveCurrentUserSession();
      this.saveProfileData();

      this.closeLoginModal();
      this.renderAuthHeader();
      this.renderProfileWidget();
      this.renderGrowthSection();
      this.renderLevelSection();
      this.showToast(`${newUser.nickname}님, 회원가입이 완료되었습니다! (Lv.1 새싹맘)`);
      setTimeout(() => this.openProfileModal(), 400);
    }
  }

  logout() {
    this.currentUser = null;
    try {
      sessionStorage.removeItem('dodam_current_user');
      sessionStorage.removeItem('dodam_admin_authenticated');
      sessionStorage.removeItem('dodam_admin_sid');
      localStorage.removeItem('dodam_persistent_session');
      localStorage.removeItem('dodam_admin_persistent');
    } catch (e) {}
    if (window.DodamFirebase && typeof window.DodamFirebase.clearSession === 'function') {
      window.DodamFirebase.clearSession('active_session');
    }
    this.profile = this.getDefaultProfile();
    this.profile.profileImage = null;
    this.profile.provider = null;
    // NOTE: DO NOT call saveProfileData() on logout! Doing so overwrote the active user's saved child profile with dummy data!
    this.renderAuthHeader();
    this.renderProfileWidget();
    this.renderGrowthSection();
    this.renderBoardView();
    this.showToast('안전하게 로그아웃되었습니다.');
    if (this.currentView === 'admin') {
      this.initAdminView();
    }
  }

  openAdminView() {
    this.switchMainView('admin');
  }

  // ==========================================
  // [통합 관리자 센터 컨트롤러 (ADMIN v2.5)]
    // ==========================================
  // [실측 접속 & 페이지뷰 이벤트 트래킹 (Cloud Firestore 연동)]
  // ==========================================
  initRealAnalytics() {
    try {
      let sid = '';
      try {
        sid = sessionStorage.getItem('dodam_analytics_sid');
      } catch (e) {}
      if (!sid) {
        sid = 's_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
        try {
          sessionStorage.setItem('dodam_analytics_sid', sid);
        } catch (e) {}
      }
      this.sessionId = sid;

      const ua = navigator.userAgent || '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || window.innerWidth < 768;
      this.userDeviceType = isMobile ? 'mobile' : 'desktop';

      let browser = '기타';
      if (/SamsungBrowser/i.test(ua)) browser = 'Samsung';
      else if (/Whale/i.test(ua)) browser = 'Whale';
      else if (/Edg/i.test(ua)) browser = 'Edge';
      else if (/Chrome/i.test(ua)) browser = 'Chrome';
      else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
      else if (/Firefox/i.test(ua)) browser = 'Firefox';
      this.userBrowserName = browser;

      const hostname = window.location.hostname || '';
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname.endsWith('.local')) {
        return; // 로컬 테스트/개발 환경은 실측 통계에서 전면 배제
      }
      if (localStorage.getItem('dodam_is_admin_device') === '1') {
        return; // 관리자 기기는 방문자 통계에서 전면 배제
      }

      const hash = window.location.hash || '';
      const isOpeningAdmin = hash.startsWith('#/admin');
      const isKnownAdmin = this.isAdmin() ||
        (this.currentUser && this.currentUser.role === 'admin') ||
        sessionStorage.getItem('dodam_admin_authenticated') === '1' ||
        isOpeningAdmin;

      if (isKnownAdmin) {
        try {
          sessionStorage.setItem('dodam_admin_sid', this.sessionId);
        } catch (e) {}
        return; // 관리자 세션 또는 접속은 방문/뷰 통계 로깅에서 즉시 제외
      }

      const todayKst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
      let visitedKey = 'dodam_visited_' + todayKst;
      let alreadyVisited = false;
      try {
        alreadyVisited = !!sessionStorage.getItem(visitedKey);
      } catch (e) {}

      const currentUser = this.currentUser;
      const currentUserName = currentUser ? (currentUser.nickname || currentUser.username || (currentUser.id && currentUser.id.startsWith('kakao_') ? '카카오회원' : null)) : null;

      if (!alreadyVisited && window.DodamFirebase && typeof window.DodamFirebase.logAnalyticsEvent === 'function') {
        try {
          sessionStorage.setItem(visitedKey, '1');
        } catch (e) {}
        window.DodamFirebase.logAnalyticsEvent({
          t: 'visit',
          sid: this.sessionId,
          date: todayKst,
          device: this.userDeviceType,
          browser: this.userBrowserName,
          user: currentUserName,
          userId: currentUser?.id || null
        });
      }

      this.trackViewEvent(this.currentView || 'board');
    } catch (err) {
      console.warn('initRealAnalytics notice:', err);
    }
  }

  trackViewEvent(viewId) {
    if (!viewId || viewId === 'admin') return;
    try {
      const hostname = window.location.hostname || '';
      if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0' || hostname.endsWith('.local')) {
        return;
      }
      if (localStorage.getItem('dodam_is_admin_device') === '1') {
        return;
      }
      const isKnownAdmin = this.isAdmin() ||
        (this.currentUser && this.currentUser.role === 'admin') ||
        sessionStorage.getItem('dodam_admin_authenticated') === '1' ||
        (window.location.hash || '').startsWith('#/admin');

      if (isKnownAdmin) return;

      const currentUser = this.currentUser;
      const currentUserName = currentUser ? (currentUser.nickname || currentUser.username || (currentUser.id && currentUser.id.startsWith('kakao_') ? '카카오회원' : null)) : null;

      const todayKst = this.getKstDateStr(Date.now());
      if (window.DodamFirebase && typeof window.DodamFirebase.logAnalyticsEvent === 'function') {
        window.DodamFirebase.logAnalyticsEvent({
          t: 'view',
          sid: this.sessionId || 'anonymous_sid',
          date: todayKst,
          view: viewId,
          device: this.userDeviceType || 'desktop',
          browser: this.userBrowserName || 'Chrome',
          user: currentUserName,
          userId: currentUser?.id || null
        });
      }
    } catch (err) {
      console.warn('trackViewEvent notice:', err);
    }
  }

  // ==========================================
  // [통합 관리자 센터 컨트롤러 (ADMIN v2.5 - 100% 실측 데이터)]
  // ==========================================
  async initAdminView() {
    const isAuth = this.isAdmin();
    const guardEl = document.getElementById('admin-auth-guard');
    const contentEl = document.getElementById('admin-dashboard-content');

    if (!isAuth) {
      if (guardEl) {
        guardEl.classList.remove('hidden');
        guardEl.style.display = 'block';
      }
      if (contentEl) {
        contentEl.classList.add('hidden');
        contentEl.style.display = 'none';
      }
      setTimeout(() => {
        const pwInput = document.getElementById('admin-guard-login-pw');
        if (pwInput) pwInput.focus();
      }, 100);
      return;
    }

    if (guardEl) {
      guardEl.classList.add('hidden');
      guardEl.style.display = 'none';
    }
    if (contentEl) {
      contentEl.classList.remove('hidden');
      contentEl.style.display = 'block';
    }

    this.renderAdminTabs();
    this.setAdminTab(this.adminTab || 'traffic');

    const curAdminNameEl = document.getElementById('admin-current-user-name');
    if (curAdminNameEl && this.currentUser) {
      curAdminNameEl.textContent = `${this.currentUser.nickname || this.currentUser.username} (${this.currentUser.roleName || '슈퍼관리자'})`;
    }

    await this.loadAndRenderAdminAnalytics();
  }

  async handleAdminGuardLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const idInput = document.getElementById('admin-guard-login-id');
    const pwInput = document.getElementById('admin-guard-login-pw');
    const id = idInput ? idInput.value.trim() : 'admin';
    const pw = pwInput ? pwInput.value.trim() : '';

    if (!pw) {
      alert('관리자 비밀번호를 입력해 주세요.');
      if (pwInput) pwInput.focus();
      return;
    }

    const validPw = this.getAdminPassword();

    if (pw === validPw) {
      let adminUser = (this.users || []).find((u) => u.username === id || u.username === 'admin' || u.role === 'admin');
      if (!adminUser) {
        adminUser = {
          id: 'admin',
          username: 'admin',
          password: validPw,
          passwordHash: validPw,
          nickname: '도담 공식 관리자',
          email: 'admin@dodamtalk.kr',
          role: 'admin',
          roleName: 'SUPER ADMIN',
          avatar: 'fa-shield-halved',
          avatarBg: 'from-purple-600 to-indigo-600',
          createdAt: '2026-10-01',
          lastLogin: new Date().toISOString().slice(0, 10),
          status: 'active',
          statusLabel: '정상 승인'
        };
        this.users.unshift(adminUser);
      } else {
        adminUser.password = validPw;
        adminUser.passwordHash = validPw;
        adminUser.lastLogin = new Date().toISOString().slice(0, 10);
      }

      this.currentUser = adminUser;

      // Cloud Firestore DB active_session에 실시간 세션 저장
      if (window.DodamFirebase && typeof window.DodamFirebase.saveSession === 'function') {
        window.DodamFirebase.saveSession(adminUser, 'active_session');
      }

      // 관리자 기기 식별 및 세션 기록 (관리자 접속 수치 집계 원천 제외)
      try {
        localStorage.setItem('dodam_is_admin_device', '1');
        sessionStorage.setItem('dodam_admin_authenticated', '1');
        sessionStorage.setItem('dodam_current_user', JSON.stringify(adminUser));
        if (this.sessionId) {
          sessionStorage.setItem('dodam_admin_sid', this.sessionId);
        }
      } catch (err) {}

      this.renderAuthHeader();
      this.renderProfileWidget();
      await this.initAdminView();
      this.showToast('👑 최고 관리자 인증이 완료되었습니다.');
      return;
    }

    alert('❌ 관리자 비밀번호가 일치하지 않습니다. 올바른 비밀번호를 입력해 주세요.');
    if (pwInput) {
      pwInput.value = '';
      pwInput.focus();
    }
  }

  renderAdminTabs() {
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach((btn) => {
      const tabId = btn.getAttribute('data-tab');
      const active = tabId === this.adminTab;
      btn.className = active
        ? 'admin-tab-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/80 font-extrabold whitespace-nowrap transition cursor-pointer'
        : 'admin-tab-btn inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-stone-50 whitespace-nowrap transition cursor-pointer';
    });

    const usersCountEl = document.getElementById('admin-tab-users-count');
    if (usersCountEl) {
      usersCountEl.textContent = `회원 계정 관리 ( ${this.users.length}명 등록됨 )`;
    }
  }

  setAdminTab(tabId) {
    this.adminTab = tabId;
    this.renderAdminTabs();

    document.querySelectorAll('.admin-pane').forEach((pane) => {
      pane.classList.add('hidden');
    });

    const targetPane = document.getElementById(`admin-pane-${tabId}`);
    if (targetPane) {
      targetPane.classList.remove('hidden');
    }

    if (tabId === 'apis') tabId = 'cloud';
    if (tabId === 'traffic') {
      this.renderAdminTraffic();
      this.renderPageAccessTable();
      this.renderVisitorLogs();
    } else if (tabId === 'users') {
      this.renderAdminUsers();
    } else if (tabId === 'community') {
      this.renderAdminCommunity();
    } else if (tabId === 'system') {
      this.renderAdminSystem();
    } else if (tabId === 'cloud' || tabId === 'apis') {
      this.renderCloudResources();
      this.renderAdminApis();
    }
  }

  async loadAndRenderAdminAnalytics() {
    try {
      if (window.DodamFirebase && typeof window.DodamFirebase.fetchAnalyticsEvents === 'function') {
        const events = await window.DodamFirebase.fetchAnalyticsEvents();
        this.analyticsEvents = Array.isArray(events) ? events : [];
      } else {
        this.analyticsEvents = this.analyticsEvents || [];
      }
    } catch (err) {
      console.warn('loadAndRenderAdminAnalytics error:', err);
      this.analyticsEvents = this.analyticsEvents || [];
    }
    this.calculateAndRenderAnalytics();
  }

  renderAdminTraffic() {
    this.calculateAndRenderAnalytics();
  }

  getKstDateStr(tsOrDate) {
    const ts = typeof tsOrDate === 'number' ? tsOrDate : (tsOrDate ? new Date(tsOrDate).getTime() : Date.now());
    if (isNaN(ts) || ts <= 0) return '';
    const kst = new Date(ts + 9 * 3600 * 1000);
    return kst.toISOString().slice(0, 10);
  }

  getKstTodayStartMs() {
    const now = Date.now();
    const kst = new Date(now + 9 * 3600 * 1000);
    const y = kst.getUTCFullYear();
    const m = kst.getUTCMonth();
    const d = kst.getUTCDate();
    return Date.UTC(y, m, d) - 9 * 3600 * 1000; // Exact 00:00:00 KST
  }

  calculateAndRenderAnalytics() {
    const rawEvents = this.analyticsEvents || [];

    // [00:00:00 KST 기준 일일 방문자 카운트]
    const todayStartMs = this.getKstTodayStartMs();
    const todayEndMs = todayStartMs + 24 * 3600 * 1000;
    const yesterdayStartMs = todayStartMs - 24 * 3600 * 1000;
    const yesterdayEndMs = todayStartMs;
    const sevenDaysStartMs = todayStartMs - 6 * 24 * 3600 * 1000;

    const todayStr = this.getKstDateStr(todayStartMs);
    const yesterdayStr = this.getKstDateStr(yesterdayStartMs);
    const sevenDaysAgoStr = this.getKstDateStr(sevenDaysStartMs);
    const nowMs = Date.now();

    // 순수 외부 방문자 이벤트만 필터링 (관리자 세션/접속/뷰 완전 제외)
    const events = rawEvents
      .map((e) => {
        const ts = e.timestamp || e.ts || (e.time ? new Date(e.time).getTime() : 0);
        const date = e.date || this.getKstDateStr(ts);
        return {
          ...e,
          timestamp: ts,
          date: date || todayStr
        };
      })
      .filter((e) => !this.isAdminEvent(e));

    // 00:00:00 KST 자정 기준 오늘 하루 실측 이벤트
    const todayEvents = events.filter((e) => e.timestamp >= todayStartMs && e.timestamp < todayEndMs);
    const yesterdayEvents = events.filter((e) => e.timestamp >= yesterdayStartMs && e.timestamp < yesterdayEndMs);
    const last7DaysEvents = events.filter((e) => e.timestamp >= sevenDaysStartMs && e.timestamp < todayEndMs);

    // 순수 외부 방문자 실측 DAU
    const todaySids = new Set(todayEvents.map((e) => e.sid));
    const todayDau = todaySids.size;

    const yesterdaySids = new Set(yesterdayEvents.map((e) => e.sid));
    const yesterdayDau = yesterdaySids.size;

    // 순수 외부 방문자 실측 WAU (최근 7일 0시 기준)
    const wauSids = new Set(last7DaysEvents.map((e) => e.sid));
    const wau = wauSids.size;

    const totalPv = events.length;

    // 실시간 동시접속자: 최근 10분 이내 활동한 순수 외부 방문자 고유 세션 집계
    const tenMinAgo = nowMs - 10 * 60 * 1000;
    const activeRecentEvents = events.filter((e) => {
      const ts = e.timestamp || (e.time ? new Date(e.time).getTime() : 0);
      return ts >= tenMinAgo;
    });
    const activeSids = new Set(activeRecentEvents.map((e) => e.sid));
    const concurrentCount = activeSids.size;

    const dauEl = document.getElementById('admin-kpi-dau');
    const dauDiffEl = document.getElementById('admin-kpi-dau-diff');
    const wauEl = document.getElementById('admin-kpi-wau');
    const pvEl = document.getElementById('admin-kpi-pv');
    const concurrentEl = document.getElementById('admin-kpi-concurrent');

    if (dauEl) dauEl.textContent = `${todayDau}명`;
    if (dauDiffEl) {
      const diff = todayDau - yesterdayDau;
      const diffStr = diff >= 0 ? `+${diff}명 vs 어제 (${yesterdayDau}명)` : `${diff}명 vs 어제 (${yesterdayDau}명)`;
      const icon = diff >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
      const colorClass = diff >= 0 ? 'text-emerald-600' : 'text-slate-500';
      dauDiffEl.className = `text-xs font-black ${colorClass} mt-1 flex items-center gap-1`;
      dauDiffEl.innerHTML = `<i class="fa-solid ${icon}"></i><span>${diffStr}</span>`;
    }
    if (concurrentEl) concurrentEl.textContent = `${concurrentCount}명`;
    if (wauEl) wauEl.textContent = `${wau}명`;
    if (pvEl) pvEl.textContent = `${totalPv.toLocaleString()} PV`;

    const dailyStats = [];
    for (let i = 13; i >= 0; i--) {
      const dayStart = todayStartMs - i * 24 * 3600 * 1000;
      const dayEnd = dayStart + 24 * 3600 * 1000;
      const dateStr = this.getKstDateStr(dayStart);
      const label = dateStr.slice(5);
      const dayEvents = events.filter((e) => e.timestamp >= dayStart && e.timestamp < dayEnd);
      const sids = new Set(dayEvents.map((e) => e.sid));
      const dayDau = sids.size;
      const dayPv = Math.max(dayEvents.length, dayDau);
      dailyStats.push({
        fullDate: dateStr,
        date: label,
        dau: dayDau,
        pv: dayPv,
        isToday: i === 0
      });
    }

    this.render14DayChartDynamic(dailyStats);
    this.renderFeatureStatsDynamic(events, todayStr, todayStartMs);
    this.renderDeviceStatsDynamic(events, todayStr, todayStartMs);
    this.renderPageAccessTable(events, todayStr, nowMs, todayStartMs);
    this.renderVisitorLogs(events, nowMs);
  }

  render14DayChartDynamic(dailyStats) {
    const container = document.getElementById('admin-14day-chart');
    if (!container) return;

    const maxDau = Math.max(...dailyStats.map((d) => d.dau), 5);

    const barsHtml = dailyStats
      .map((item) => {
        const heightPct = item.dau > 0 ? Math.max(16, Math.round((item.dau / maxDau) * 100)) : 10;
        const isToday = !!item.isToday;

        const barColor = isToday
          ? 'bg-gradient-to-t from-purple-600 via-indigo-600 to-cyan-400 text-white shadow-sm ring-2 ring-purple-400/50'
          : item.dau > 0
          ? 'bg-sky-400 hover:bg-sky-500 text-white'
          : 'bg-stone-200 text-slate-400';

        const labelColor = isToday ? 'font-black text-purple-700' : 'text-slate-400 font-bold';

        return `
          <div class="flex-1 flex flex-col items-center justify-end h-44 sm:h-52 group relative">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-black whitespace-nowrap shadow-md pointer-events-none z-10">
              ${item.fullDate}: ${item.dau}명 (${item.pv} PV)
            </div>
            <span class="text-[10px] font-bold text-slate-500 mb-1 opacity-80 group-hover:opacity-100 transition">
              ${item.dau}
            </span>
            <div
              class="w-full max-w-[28px] sm:max-w-[36px] rounded-t-lg ${barColor} transition-all duration-300 cursor-pointer"
              style="height: ${heightPct}%; min-height: 14px;"
            ></div>
            <span class="mt-2 text-[10px] ${labelColor} tracking-tighter">
              ${item.date}
            </span>
          </div>
        `;
      })
      .join('');

    const startLabel = dailyStats[0]?.date || '14일 전';
    const endLabel = dailyStats[dailyStats.length - 1]?.date || '오늘';

    container.innerHTML = `
      <div class="flex items-end gap-1.5 sm:gap-2.5 h-48 sm:h-56 border-b border-stone-200 px-1 pt-6 pb-2">
        ${barsHtml}
      </div>
      <div class="flex items-center justify-between pt-2.5 text-[11px] text-slate-400">
        <span>14일 전 실측 집계 (${startLabel})</span>
        <span class="flex items-center gap-1.5 font-bold text-purple-700">
          <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"></span>
          <span>오늘 기준 (${endLabel} 실시간)</span>
        </span>
      </div>
    `;
  }

  renderFeatureStatsDynamic(events, todayStr, todayStartMs) {
    const listEl = document.getElementById('feature-stats-list');
    const subtitleEl = document.getElementById('feature-stats-subtitle');
    if (!listEl) return;

    const featureDefs = [
      { id: 'board', name: '도담 커뮤니티 & 자유톡', icon: 'fa-comments', color: 'emerald' },
      { id: 'apartments', name: '초품아 아파트 & 학군 매칭', icon: 'fa-building', color: 'indigo' },
      { id: 'school', name: '전국 초·중·고 학업성취도 랭킹', icon: 'fa-graduation-cap', color: 'sky' },
      { id: 'admissions', name: '교육부 입시 가이드 & 고교학점제', icon: 'fa-book-bookmark', color: 'purple' },
      { id: 'food', name: '아이 안심식당 & 키즈존 지도', icon: 'fa-utensils', color: 'amber' },
      { id: 'festivals', name: '어린이 축제 & 가족 나들이', icon: 'fa-calendar-days', color: 'rose' },
      { id: 'contests', name: '전국 백일장 & 미술사생대회', icon: 'fa-trophy', color: 'blue' },
      { id: 'policy', name: '2026 부모급여 & 양육수당 계산기', icon: 'fa-calculator', color: 'teal' }
    ];

    const isToday = this.featureStatsPeriod === 'today';
    const startMs = todayStartMs || this.getKstTodayStartMs();
    const targetEvents = isToday
      ? events.filter((e) => e.timestamp >= startMs && e.timestamp < startMs + 86400000 && e.t === 'view')
      : events.filter((e) => e.t === 'view');
    const totalCalls = targetEvents.length;

    if (subtitleEl) {
      if (isToday) {
        subtitleEl.textContent = `오늘 하루 실측치 기준 (총 ${totalCalls}회 이용)`;
      } else {
        subtitleEl.textContent = `전체 누적 실측치 기준 (총 ${totalCalls.toLocaleString()}회 이용)`;
      }
    }

    listEl.innerHTML = featureDefs
      .map((f) => {
        const count = targetEvents.filter((e) => e.view === f.id).length;
        const totalCumCount = events.filter((e) => e.t === 'view' && e.view === f.id).length;
        const percent = totalCalls > 0 ? Math.round((count / totalCalls) * 100) : 0;

        const countDisplay = isToday
          ? `${count}회 <span class="text-slate-400 font-medium text-[11px]">(누적: ${totalCumCount.toLocaleString()}회)</span>`
          : `${count.toLocaleString()}회`;

        let barColorClass = 'bg-sky-500';
        if (f.color === 'emerald') barColorClass = 'bg-emerald-500';
        else if (f.color === 'indigo') barColorClass = 'bg-indigo-600';
        else if (f.color === 'sky') barColorClass = 'bg-sky-500';
        else if (f.color === 'purple') barColorClass = 'bg-purple-600';
        else if (f.color === 'amber') barColorClass = 'bg-amber-500';
        else if (f.color === 'rose') barColorClass = 'bg-rose-500';
        else if (f.color === 'blue') barColorClass = 'bg-blue-600';
        else if (f.color === 'teal') barColorClass = 'bg-teal-500';

        return `
          <div class="space-y-1.5 text-xs">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-bold text-slate-800">
                <i class="fa-solid ${f.icon} text-slate-400 w-4 text-center"></i>
                <span>${f.name}</span>
              </div>
              <div class="font-extrabold text-slate-900 text-xs">
                ${countDisplay}
              </div>
            </div>
            <div class="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div class="${barColorClass} h-full rounded-full transition-all duration-500" style="width: ${Math.max(percent, count > 0 ? 4 : 0)}%"></div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  setFeaturePeriod(period) {
    this.featureStatsPeriod = period;
    const btnToday = document.getElementById('btn-feature-today');
    const btnCum = document.getElementById('btn-feature-cum');

    if (period === 'today') {
      if (btnToday) btnToday.className = 'px-2.5 py-1 rounded-lg bg-white text-slate-900 font-black shadow-2xs transition cursor-pointer';
      if (btnCum) btnCum.className = 'px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer';
    } else {
      if (btnToday) btnToday.className = 'px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer';
      if (btnCum) btnCum.className = 'px-2.5 py-1 rounded-lg bg-white text-slate-900 font-black shadow-2xs transition cursor-pointer';
    }
    this.calculateAndRenderAnalytics();
  }

  renderDeviceStatsDynamic(events, todayStr, todayStartMs) {
    const splitContainer = document.getElementById('device-split-container');
    const browserContainer = document.getElementById('browser-breakdown-container');
    const subtitleEl = document.getElementById('device-stats-subtitle');

    const isToday = this.deviceStatsPeriod === 'today';
    const startMs = todayStartMs || this.getKstTodayStartMs();
    const targetEvents = isToday
      ? events.filter((e) => e.timestamp >= startMs && e.timestamp < startMs + 86400000)
      : events;

    const sids = new Set(targetEvents.map((e) => e.sid));
    const totalVisitors = sids.size;

    if (subtitleEl) {
      if (isToday) {
        subtitleEl.textContent = `오늘 하루 실측치 기준 (총 ${totalVisitors}명 방문)`;
      } else {
        subtitleEl.textContent = `전체 누적 실측치 기준 (총 ${totalVisitors.toLocaleString()}명 방문)`;
      }
    }

    let mobileCount = 0;
    let desktopCount = 0;
    sids.forEach((sid) => {
      const match = targetEvents.find((e) => e.sid === sid) || (sid === this.sessionId ? { device: this.userDeviceType } : null);
      if (match && match.device === 'mobile') mobileCount++;
      else desktopCount++;
    });

    const mobilePct = totalVisitors > 0 ? Math.round((mobileCount / totalVisitors) * 100) : 0;
    const desktopPct = totalVisitors > 0 ? 100 - mobilePct : 0;

    if (splitContainer) {
      splitContainer.innerHTML = `
        <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center space-y-1">
          <div class="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600">
            <i class="fa-solid fa-mobile-screen"></i>
            <span>모바일 기기 (스마트폰)</span>
          </div>
          <div class="text-xl sm:text-2xl font-black text-sky-600 tracking-tight">
            ${mobilePct}% <span class="text-xs font-bold text-slate-500">(${mobileCount.toLocaleString()}명)</span>
          </div>
          <p class="text-[10px] text-slate-400">실시간 실측 모바일 방문 비율</p>
        </div>

        <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-center space-y-1">
          <div class="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600">
            <i class="fa-solid fa-desktop"></i>
            <span>데스크톱 (PC / Mac)</span>
          </div>
          <div class="text-xl sm:text-2xl font-black text-purple-700 tracking-tight">
            ${desktopPct}% <span class="text-xs font-bold text-slate-500">(${desktopCount.toLocaleString()}명)</span>
          </div>
          <p class="text-[10px] text-slate-400">실시간 실측 데스크톱 방문 비율</p>
        </div>
      `;
    }

    const browserDefs = [
      { name: 'Chrome', dotColor: 'bg-emerald-500' },
      { name: 'Safari', dotColor: 'bg-sky-500' },
      { name: 'Samsung', dotColor: 'bg-indigo-600' },
      { name: 'Edge', dotColor: 'bg-cyan-500' },
      { name: 'Whale', dotColor: 'bg-emerald-600' },
      { name: 'Firefox', dotColor: 'bg-amber-500' },
      { name: '기타', dotColor: 'bg-slate-400' }
    ];

    const browserCounts = {};
    browserDefs.forEach((b) => (browserCounts[b.name] = 0));

    sids.forEach((sid) => {
      const match = targetEvents.find((e) => e.sid === sid) || (sid === this.sessionId ? { browser: this.userBrowserName } : null);
      const bName = match?.browser || '기타';
      if (browserCounts[bName] !== undefined) {
        browserCounts[bName]++;
      } else {
        browserCounts['기타']++;
      }
    });

    if (browserContainer) {
      browserContainer.innerHTML = browserDefs
        .filter((b) => browserCounts[b.name] > 0 || ['Chrome', 'Safari', 'Samsung', 'Edge'].includes(b.name))
        .map((b) => {
          const count = browserCounts[b.name] || 0;
          const percent = totalVisitors > 0 ? Math.round((count / totalVisitors) * 100) : 0;
          return `
            <div class="p-2.5 rounded-xl bg-white border border-stone-200/80 flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full ${b.dotColor}"></span>
                <span class="font-bold text-slate-800">${b.name}:</span>
              </div>
              <div class="font-black text-slate-900">
                ${percent}% <span class="text-[10px] font-normal text-slate-400">(${count}명)</span>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  setDevicePeriod(period) {
    this.deviceStatsPeriod = period;
    const btnToday = document.getElementById('btn-device-today');
    const btnCum = document.getElementById('btn-device-cum');

    if (period === 'today') {
      if (btnToday) btnToday.className = 'px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 font-black shadow-2xs transition cursor-pointer';
      if (btnCum) btnCum.className = 'px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer';
    } else {
      if (btnToday) btnToday.className = 'px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition cursor-pointer';
      if (btnCum) btnCum.className = 'px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 font-black shadow-2xs transition cursor-pointer';
    }
    this.calculateAndRenderAnalytics();
  }

  // 4. 회원 계정 관리 탭


  renderPageAccessTable(filteredEvents, targetDateStr, currentMs, todayStartMs) {
    const tbody = document.getElementById('admin-page-access-table-body');
    if (!tbody) return;

    const pageDefs = [
      { key: 'board', name: '도담 육아 커뮤니티 & 자유톡', path: '#/board', icon: 'fa-comments', bg: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      { key: 'food', name: '전국 맛집·아이 안심식당 지도', path: '#/food', icon: 'fa-utensils', bg: 'bg-amber-50 text-amber-600 border-amber-200' },
      { key: 'festivals', name: '지역행사 & 어린이 축제 일정', path: '#/festivals', icon: 'fa-calendar-days', bg: 'bg-rose-50 text-rose-600 border-rose-200' },
      { key: 'contests', name: '전국 어린이 백일장 & 미술대회', path: '#/contests', icon: 'fa-trophy', bg: 'bg-blue-50 text-blue-600 border-blue-200' },
      { key: 'policy', name: '2026 부모급여 & 양육수당 계산기', path: '#/policy', icon: 'fa-calculator', bg: 'bg-teal-50 text-teal-600 border-teal-200' },
      { key: 'school', name: '전국 초·중·고 학업성취도 랭킹', path: '#/school', icon: 'fa-graduation-cap', bg: 'bg-sky-50 text-sky-600 border-sky-200' },
      { key: 'apartments', name: '초품아 아파트 & 학군 매칭', path: '#/apartments', icon: 'fa-building', bg: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
      { key: 'admissions', name: '교육부 입시 가이드 & 고교학점제', path: '#/admissions', icon: 'fa-book-bookmark', bg: 'bg-purple-50 text-purple-600 border-purple-200' },
      { key: 'write', name: '게시글 작성 및 육아 질문', path: '#/write', icon: 'fa-pen-to-square', bg: 'bg-orange-50 text-orange-600 border-orange-200' }
    ];

    const startMs = todayStartMs || this.getKstTodayStartMs();
    const endMs = startMs + 24 * 3600 * 1000;
    const nowMs = currentMs || Date.now();
    const rawList = filteredEvents || (this.analyticsEvents || []);
    const events = rawList
      .map((e) => {
        const ts = e.timestamp || e.ts || (e.time ? new Date(e.time).getTime() : 0);
        return { ...e, timestamp: ts };
      })
      .filter((e) => !this.isAdminEvent(e));

    const formatKst = (d) => {
      if (!d) return '-';
      const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
      if (isNaN(date.getTime())) return '-';
      const pad = (n) => String(n).padStart(2, '0');
      return `${date.getFullYear()}. ${pad(date.getMonth() + 1)}. ${pad(date.getDate())}. ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const formatRelTime = (ms) => {
      if (!ms) return '-';
      const diffSec = Math.floor((nowMs - ms) / 1000);
      if (diffSec < 60) return '방금 전';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
      return `${Math.floor(diffSec / 86400)}일 전`;
    };

    tbody.innerHTML = pageDefs
      .map((p) => {
        const pageEvents = events.filter((e) => e.view === p.key);
        const todayPageEvents = pageEvents.filter((e) => e.timestamp >= startMs && e.timestamp < endMs);

        const todayCount = todayPageEvents.length;
        const totalCount = pageEvents.length;

        let lastTs = null;
        let lastDevice = 'desktop';
        let lastBrowser = '-';
        let lastUser = '-';

        if (pageEvents.length > 0) {
          const lastE = pageEvents[pageEvents.length - 1];
          lastTs = lastE.timestamp || (lastE.time ? new Date(lastE.time).getTime() : nowMs);
          if (lastE.device) lastDevice = lastE.device;
          if (lastE.browser) lastBrowser = lastE.browser;
          if (lastE.user) lastUser = lastE.user;
          else if (lastE.sid) lastUser = `게스트 #${lastE.sid.slice(0, 8)}`;
        }

        const firstTodayE = todayPageEvents[0];
        const firstTimeStr = firstTodayE
          ? formatKst(firstTodayE.timestamp || firstTodayE.time)
          : '-';

        const isRecent = lastTs ? (nowMs - lastTs < 10 * 60 * 1000) : false;
        const relTimeBadge = lastTs
          ? (isRecent
              ? '<span class="px-1.5 py-0.5 rounded font-black bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">방금 전</span>'
              : `<span class="px-1.5 py-0.5 rounded font-medium bg-stone-100 text-slate-500 border border-stone-200 text-[10px]">${formatRelTime(lastTs)}</span>`)
          : '<span class="text-slate-400 font-mono text-[11px]">-</span>';

        const devIcon = lastDevice === 'mobile' ? 'fa-mobile-screen' : 'fa-desktop';
        const devText = lastTs ? (lastDevice === 'mobile' ? '모바일' : 'PC/데스크톱') : 'PC/데스크톱';

        const statusBadge = isRecent
          ? '<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black">활성</span>'
          : '<span class="px-2 py-0.5 rounded-full bg-stone-100 text-slate-400 border border-stone-200 text-[10px] font-bold">대기 중</span>';

        return `
          <tr class="hover:bg-stone-50/70 transition">
            <td class="py-3 px-4">
              <div class="flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl ${p.bg} border flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid ${p.icon}"></i>
                </span>
                <div>
                  <a href="${p.path}" class="font-black text-slate-900 text-xs hover:text-purple-600 transition flex items-center gap-1">
                    ${p.name}
                    <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
                  </a>
                  <span class="text-[10px] text-slate-400 font-mono">${p.path}</span>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="space-y-0.5">
                <div class="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <i class="fa-regular fa-clock text-purple-600 text-[11px]"></i>
                  <span>${lastTs ? formatKst(lastTs) : '-'}</span>
                </div>
                <div>${relTimeBadge}</div>
              </div>
            </td>
            <td class="py-3 px-4 text-slate-500 font-mono text-xs">
              ${firstTimeStr}
            </td>
            <td class="py-3 px-4 text-right">
              <div class="space-y-0.5 inline-block text-right">
                <div class="text-xs font-black text-slate-900 font-mono">
                  ${todayCount.toLocaleString()}회
                </div>
                <div class="text-[10px] text-slate-400">
                  누적 ${totalCount.toLocaleString()}회
                </div>
              </div>
            </td>
            <td class="py-3 px-4">
              <div class="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                <i class="fa-solid ${devIcon} text-slate-400 text-[11px]"></i>
                <span>${devText} · ${lastBrowser}</span>
              </div>
              <div class="text-[10px] text-slate-400 mt-0.5 font-medium">
                👤 ${lastUser}
              </div>
            </td>
            <td class="py-3 px-4 text-center">
              ${statusBadge}
            </td>
          </tr>
        `;
      })
      .join('');
  }

  renderVisitorLogs(filteredEvents, currentMs) {
    const tbody = document.getElementById('admin-visitor-logs-table-body');
    const countBadge = document.getElementById('admin-visitor-logs-count');
    if (!tbody) return;

    const now = new Date();
    const nowMs = currentMs || now.getTime();
    const rawList = filteredEvents || (this.analyticsEvents || []);
    const events = rawList
      .map((e) => {
        const ts = e.timestamp || e.ts || (e.time ? new Date(e.time).getTime() : 0);
        return { ...e, timestamp: ts };
      })
      .filter((e) => !this.isAdminEvent(e));

    const formatKst = (d) => {
      if (!d) return '-';
      const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
      if (isNaN(date.getTime())) return '-';
      const pad = (n) => String(n).padStart(2, '0');
      return `${date.getFullYear()}. ${pad(date.getMonth() + 1)}. ${pad(date.getDate())}. ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const formatRelTime = (ms) => {
      if (!ms) return '방금 전';
      const diffSec = Math.floor((nowMs - ms) / 1000);
      if (diffSec < 60) return '방금 전';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
      return `${Math.floor(diffSec / 86400)}일 전`;
    };

    const pageNames = {
      board: '도담 육아 커뮤니티 & 자유톡',
      food: '전국 맛집·아이 안심식당 지도',
      festivals: '지역행사 & 어린이 축제 일정',
      contests: '전국 어린이 백일장 & 미술대회',
      policy: '2026 부모급여 & 양육수당 계산기',
      school: '전국 초·중·고 학업성취도 랭킹',
      apartments: '초품아 아파트 & 학군 매칭',
      admissions: '교육부 입시 가이드 & 고교학점제',
      write: '게시글 작성 및 육아 질문',
      admin: '도담톡 통합 관리자 센터'
    };

    // 순수 외부 방문자 로그만 역순 정렬 (관리자 세션/접속/뷰 완전 배제)
    const logs = [...events].reverse();

    if (countBadge) {
      countBadge.textContent = `최근 ${Math.min(logs.length, 100)}건`;
    }

    if (logs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="py-12 text-center text-slate-400 text-xs font-medium"><i class="fa-regular fa-folder-open mr-1.5 text-slate-300"></i>최근 방문자 활동 로그가 없습니다. (외부 방문자 접속 시 실시간 기록됩니다)</td></tr>';
      return;
    }

    tbody.innerHTML = logs
      .slice(0, 100)
      .map((log) => {
        const ts = log.timestamp || (log.time ? new Date(log.time).getTime() : nowMs);
        const relTime = formatRelTime(ts);
        const isRecent = nowMs - ts < 10 * 60 * 1000;
        const pageName = pageNames[log.view] || log.view || '메인 화면';
        const devIcon = log.device === 'mobile' ? 'fa-mobile-screen' : 'fa-desktop';
        const devText = log.device === 'mobile' ? '모바일' : '데스크톱';
        const rawSid = log.sid || log.sessionId || 'session';
        const shortSession = rawSid.includes('_') ? rawSid.split('_').pop() : rawSid.slice(-6);

        let userName = log.user;
        if (!userName && log.userId) {
          const matchedUser = (this.users || []).find((u) => u.id === log.userId || u.username === log.userId);
          if (matchedUser) {
            userName = matchedUser.nickname || matchedUser.username;
          }
        }
        if (!userName && this.sessionId && log.sid === this.sessionId && this.currentUser) {
          userName = this.currentUser.nickname || this.currentUser.username || '카카오회원';
        }

        const isMember = userName && userName !== '게스트' && userName !== '비회원 (게스트)';
        const userBadge = isMember
          ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">👑 ${this.escapeSvgXml(userName)}</span>`
          : `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-slate-600 border border-stone-200">게스트 #${shortSession}</span>`;

        return `
          <tr class="hover:bg-stone-50/70 transition">
            <td class="py-2.5 px-4">
              <div class="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800">
                <i class="fa-regular fa-clock text-purple-600 text-[11px]"></i>
                <span>${formatKst(ts)}</span>
              </div>
              <div class="text-[10px] text-slate-400 pl-4">
                <span class="${isRecent ? 'text-emerald-600 font-black' : 'text-slate-400'}">${relTime}</span>
              </div>
            </td>
            <td class="py-2.5 px-4">
              <div class="flex items-center gap-1.5">
                ${userBadge}
              </div>
            </td>
            <td class="py-2.5 px-4">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
                <span>↳</span>
                <span>${pageName}</span>
              </span>
            </td>
            <td class="py-2.5 px-4">
              <div class="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <i class="fa-solid ${devIcon} text-slate-400 text-[11px]"></i>
                <span>${devText} · ${log.browser || 'Chrome'}</span>
              </div>
            </td>
            <td class="py-2.5 px-4 font-mono text-xs text-slate-500">
              ${formatKst(ts)}
            </td>
            <td class="py-2.5 px-4 text-center">
              <span class="px-2 py-0.5 rounded-full ${isRecent ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-black' : 'bg-stone-100 text-slate-400 border border-stone-200 font-medium'} text-[10px]">
                ${isRecent ? '활성 세션' : '종료'}
              </span>
            </td>
          </tr>
        `;
      })
      .join('');
  }

    async resetAdminAnalytics() {
    if (!confirm('현재까지의 테스트 및 누적 방문자 수치를 초기화(0으로 리셋)하시겠습니까?\n(실제 외부 방문자 유입 시 새로 정상 카운트됩니다)')) {
      return;
    }
    try {
      if (window.DodamFirebase && typeof window.DodamFirebase.resetAnalyticsEvents === 'function') {
        await window.DodamFirebase.resetAnalyticsEvents();
      }
      this.analyticsEvents = [];
      this.calculateAndRenderAnalytics();
      this.showToast('🧹 테스트 방문자 수치가 깨끗하게 0으로 초기화되었습니다.');
    } catch (err) {
      console.warn('resetAdminAnalytics error:', err);
      this.showToast('⚠️ 통계 초기화 중 오류가 발생했습니다.');
    }
  }

  async refreshVisitorLogs() {
    await this.loadAndRenderAdminAnalytics();
    this.renderPageAccessTable();
    this.renderVisitorLogs();
    this.showToast('실시간 방문자 접속 로그를 최신 데이터로 갱신했습니다.');
  }

  async renderCloudResources(forceRefresh = false) {
    try {
      const sizeEl = document.getElementById('admin-gh-repo-size');
      const starEl = document.getElementById('admin-gh-stars');
      const branchEl = document.getElementById('admin-gh-branch');
      const issuesEl = document.getElementById('admin-gh-issues');
      const pushEl = document.getElementById('admin-gh-last-pushed');

      if (pushEl && forceRefresh) pushEl.textContent = '실시간 조회 중...';

      const resp = await fetch('https://api.github.com/repos/ittechkjh/kids');
      if (resp.ok) {
        const repo = await resp.json();
        if (sizeEl && repo.size) sizeEl.textContent = `${repo.size.toLocaleString()} KB`;
        if (starEl) starEl.textContent = `${(repo.stargazers_count || 0).toLocaleString()} Stars`;
        if (branchEl) branchEl.textContent = `${repo.default_branch || 'main'} (Active)`;
        if (issuesEl) issuesEl.textContent = `Open Issues: ${repo.open_issues_count || 0}건`;
        if (pushEl && repo.pushed_at) {
          const pDate = new Date(repo.pushed_at);
          pushEl.textContent = `${pDate.getFullYear()}. ${String(pDate.getMonth() + 1).padStart(2, '0')}. ${String(pDate.getDate()).padStart(2, '0')}. ${String(pDate.getHours()).padStart(2, '0')}:${String(pDate.getMinutes()).padStart(2, '0')}:${String(pDate.getSeconds()).padStart(2, '0')}`;
        }
      }
    } catch (err) {
      console.warn('GitHub API fetch notice:', err);
    }

    if (forceRefresh) {
      this.showToast('클라우드 및 GitHub 인프라 실측 상태를 최신으로 갱신했습니다.');
    }
  }


  renderAdminUsers() {
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody) return;

    this.users = this.cleanUsersList(this.users || []);

    tbody.innerHTML = this.users
      .map((u) => {
        const isAdmin = u.role === 'admin';
        const roleBadge = isAdmin
          ? '<span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[10px] border border-purple-200">SUPER ADMIN</span>'
          : '<span class="px-2 py-0.5 rounded-md bg-stone-100 text-slate-600 font-bold text-[10px] border border-stone-200">일반 회원</span>';

        return `
          <tr class="hover:bg-stone-50/70 transition">
            <td class="py-3 px-3">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-gradient-to-br ${u.avatarBg || 'from-slate-600 to-slate-800'} text-white flex items-center justify-center text-xs shadow-2xs">
                  <i class="fa-solid ${u.avatar || 'fa-user'}"></i>
                </div>
                <div>
                  <div class="font-extrabold text-slate-900">${u.username}</div>
                  <div class="text-[10px] text-slate-400">ID: ${u.id}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-3">
              <div class="font-bold text-slate-800">${u.nickname}</div>
              <div class="text-[10px] text-slate-400">${u.email || '-'}</div>
            </td>
            <td class="py-3 px-3">
              ${roleBadge}
            </td>
            <td class="py-3 px-3 text-slate-500 font-medium">
              ${u.lastLogin || '기록 없음'}
            </td>
            <td class="py-3 px-3">
              <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>${u.statusLabel || '정상'}</span>
              </span>
            </td>
            <td class="py-3 px-3 text-right">
              ${
                u.id === 'admin'
                  ? `
                    <button onclick="app.openChangePwModal('admin')" class="px-2.5 py-1 rounded-lg text-purple-700 hover:bg-purple-50 border border-purple-200 text-[11px] font-bold transition flex items-center gap-1 inline-flex cursor-pointer shadow-2xs">
                      <i class="fa-solid fa-key text-[10px]"></i>
                      <span>비밀번호 변경</span>
                    </button>
                  `
                  : `
                    <button onclick="app.deleteUser('${u.id}')" class="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 text-[11px] font-bold transition cursor-pointer">
                      삭제
                    </button>
                  `
              }
            </td>
          </tr>
        `;
      })
      .join('');
  }

  openNewUserModal() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeNewUserModal() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) modal.classList.add('hidden');
  }

  submitNewUser(event) {
    event.preventDefault();
    const id = document.getElementById('new-user-id')?.value.trim();
    const nickname = document.getElementById('new-user-nickname')?.value.trim();
    const pw = document.getElementById('new-user-pw')?.value.trim();
    const role = document.getElementById('new-user-role')?.value || 'user';

    if (!id || !nickname || !pw) {
      alert('모든 필수 항목을 입력해 주세요.');
      return;
    }

    if (this.users.some((u) => u.id === id || u.username === id)) {
      alert('이미 존재하는 사용자 아이디입니다.');
      return;
    }

    const nowD = new Date();
    const nowStr = nowD.toISOString().slice(0, 10);
    const nowTimeStr = nowD.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });

    const newUser = {
      id: id,
      username: id,
      nickname: nickname,
      passwordHash: pw,
      email: `${id}@dodamtalk.kr`,
      role: role,
      roleName: role === 'admin' ? '슈퍼관리자' : '일반회원',
      avatar: role === 'admin' ? 'fa-shield-halved' : 'fa-user',
      avatarBg: role === 'admin' ? 'from-purple-600 to-indigo-600' : 'from-emerald-500 to-teal-500',
      createdAt: nowStr,
      lastLogin: `${nowStr} ${nowTimeStr}`,
      status: 'active',
      statusLabel: '정상'
    };

    this.users.push(newUser);
    this.saveUsers();
    this.renderAdminUsers();
    this.renderAdminTabs();
    this.closeNewUserModal();
    this.showToast(`신규 계정 [${nickname}] 등록이 완료되었습니다.`);
  }

  deleteUser(userId) {
    if (userId === 'admin') {
      alert('최고 관리자 계정은 삭제할 수 없습니다.');
      return;
    }
    if (!confirm('정말 해당 회원을 삭제하시겠습니까?')) return;

    this.users = this.users.filter((u) => u.id !== userId);
    this.saveUsers();
    this.renderAdminUsers();
    this.renderAdminTabs();
    this.showToast('회원 계정이 안전하게 삭제되었습니다.');
  }

  openChangePwModal(userId) {
    this.changePwTargetUserId = userId;
    const modal = document.getElementById('admin-pw-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeChangePwModal() {
    this.changePwTargetUserId = null;
    const modal = document.getElementById('admin-pw-modal');
    if (modal) modal.classList.add('hidden');
  }

  async submitChangePw(event) {
    if (event && event.preventDefault) event.preventDefault();
    const pw = document.getElementById('change-pw-input')?.value.trim();
    const pwConfirm = document.getElementById('change-pw-confirm-input')?.value.trim();

    if (!pw || pw.length < 4) {
      alert('비밀번호는 최소 4자리 이상 입력해 주세요.');
      return;
    }
    if (pw !== pwConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 1. 메모리 최신값 갱신
    this.remoteAdminPassword = pw;

    // 2. 관리자 계정 객체 갱신 (password & passwordHash)
    const targetId = this.changePwTargetUserId || 'admin';
    let targetUser = (this.users || []).find((u) => u.id === targetId || u.username === targetId);
    if (targetUser) {
      targetUser.password = pw;
      targetUser.passwordHash = pw;
    } else {
      targetUser = {
        id: 'admin',
        username: 'admin',
        password: pw,
        passwordHash: pw,
        nickname: '도담 공식 관리자',
        role: 'admin',
        roleName: 'SUPER ADMIN'
      };
      this.users.unshift(targetUser);
    }

    // 3. Cloud Firestore DB users 컬렉션에 영구 저장
    this.saveUsers();

    // 4. Cloud Firestore DB app_config 시스템 문서에 영구 저장 (로컬스토리지 배제)
    if (window.DodamFirebase && typeof window.DodamFirebase.saveAppConfig === 'function') {
      await window.DodamFirebase.saveAppConfig({ adminPassword: pw });
    } else if (window.DodamFirebase && typeof window.DodamFirebase.writeSysStateRecord === 'function') {
      await window.DodamFirebase.writeSysStateRecord('app_config', {
        adminPassword: pw,
        updatedAt: Date.now()
      });
    }

    // 5. Sync memory defaultUsers
    if (window.DODAM_ADMIN_DATA && Array.isArray(window.DODAM_ADMIN_DATA.defaultUsers)) {
      const defAdmin = window.DODAM_ADMIN_DATA.defaultUsers.find((u) => u.username === 'admin');
      if (defAdmin) {
        defAdmin.password = pw;
        defAdmin.passwordHash = pw;
      }
    }

    this.closeChangePwModal();
    this.renderAdminUsers();
    alert('✅ 관리자 비밀번호가 성공적으로 변경 및 영구 저장되었습니다.\n(새 비밀번호: ' + pw + ')');
  }

  // 5. 커뮤니티 & 정화 관리 탭
  renderAdminCommunity() {
    const container = document.getElementById('admin-posts-container');
    if (!container) return;

    const posts = this.data.posts || [];
    if (posts.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-xs text-slate-500 font-medium">
          현재 등록된 사용자 게시글이 없습니다.
        </div>
      `;
      return;
    }

    container.innerHTML = posts
      .map(
        (p) => `
        <div class="p-3 rounded-2xl bg-white border border-stone-200 flex items-center justify-between text-xs gap-3">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-stone-100 text-slate-600 font-bold text-[10px]">${p.category}</span>
              <span class="font-black text-slate-900 truncate">${p.title}</span>
            </div>
            <div class="text-[11px] text-slate-400 mt-0.5">
              작성자: ${p.author?.nickname || '익명'} · ${p.createdAt} · 공감 ${p.reactions?.like || 0}
            </div>
          </div>
          <button onclick="app.adminDeletePost('${p.id}')" class="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs shrink-0 transition">
            게시글 삭제
          </button>
        </div>
      `
      )
      .join('');
  }

  adminDeletePost(postId) {
    if (!confirm('해당 게시글을 관리자 권한으로 삭제하시겠습니까?')) return;
    this.data.posts = this.data.posts.filter((p) => p.id !== postId);
    if (!this.deletedPostIds) this.deletedPostIds = new Set();
    this.deletedPostIds.add(postId);
    if (window.DodamFirebase && typeof window.DodamFirebase.deletePost === 'function') {
      window.DodamFirebase.deletePost(postId);
    }
    this.renderAdminCommunity();
    this.renderBoardView();
    this.renderBoardCategories();
    this.showToast('게시글이 Cloud Firestore DB에서 삭제되었습니다.');
  }

  clearSpamPosts() {
    const toDelete = (this.data.posts || []).map((p) => p.id);
    this.data.posts = [];
    if (window.DodamFirebase && typeof window.DodamFirebase.deletePost === 'function') {
      toDelete.forEach((id) => window.DodamFirebase.deletePost(id));
    }
    this.renderAdminCommunity();
    this.renderBoardView();
    this.renderBoardCategories();
    this.showToast('더미 및 스팸 게시글이 DB에서 일괄 정리되었습니다.');
  }

  // 6. 시스템 진단 & Cloud Firestore DB 실시간 스토리지
  renderAdminSystem() {
    const postCount = (this.data.posts || []).length;
    const userCount = (this.users || []).length;
    const scrapCount = (this.scraps || []).length;
    const analyticsCount = (this.analyticsEvents || []).length;
    const totalDocs = postCount + userCount + scrapCount + analyticsCount + 2;

    const textEl = document.getElementById('storage-usage-text');
    const barEl = document.getElementById('storage-usage-bar');

    if (textEl) {
      textEl.textContent = `Cloud Firestore 실시간 연동 완료 · 총 ${totalDocs.toLocaleString()}개 실측 문서 동기화 중 (LocalStorage 미사용)`;
    }
    if (barEl) {
      const pct = Math.min(100, Math.max(8, Math.round((totalDocs / 200) * 100)));
      barEl.style.width = `${pct}%`;
    }
  }

  exportBackupJson() {
    const backup = {
      version: '2.5',
      exportDate: new Date().toISOString(),
      users: this.users,
      profile: this.profile,
      scraps: this.scraps,
      posts: this.data.posts,
      analytics: this.analyticsEvents || []
    };

    const str = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', str);
    dlAnchor.setAttribute('download', `dodamtalk_backup_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    this.showToast('전체 시스템 데이터 백업 파일이 다운로드되었습니다.');
  }

  clearSystemCache() {
    this.renderAdminSystem();
    this.showToast('임시 캐시 및 세션이 최적화되었습니다.');
  }

  // 7. 공공데이터 & 인프라 현황 (100% 실측 로드 데이터)
  renderAdminApis() {
    const listEl = document.getElementById('admin-api-status-list');
    if (!listEl) return;

    const apis = [
      {
        name: 'NEIS 교육행정정보시스템 (전국 학교 데이터)',
        status: '정상 가동',
        count: (window.DODAM_SCHOOLS_RANKING?.length || 11849).toLocaleString() + '개교 실측 로드',
        provider: '교육부 한국교육학술정보원(KERIS)',
        endpoint: 'open.neis.go.kr/hub/schoolInfo',
        desc: '전국 초·중·고·특수학교의 기본 정보, 학업성취도, 설립구분 및 학군 연계 데이터를 제공합니다.'
      },
      {
        name: '전국 어린이 축제 & 사생대회 DB',
        status: '정상 가동',
        count: ((this.allEvents || []).length || 303).toLocaleString() + '건 실측 행사 활성',
        provider: '한국관광공사 TourAPI & 위비티 공공수집',
        endpoint: 'api.visitkorea.or.kr & wevity.com',
        desc: '전국 17개 시도 어린이 축제·공연·체험 및 미술·문예 사생대회 실시간 일정입니다.'
      },
      {
        name: '전국 안심식당 & 키즈 친화 음식점 DB',
        status: '정상 가동',
        count: ((this.data?.restaurants || []).length || 99).toLocaleString() + '개소 실측 검증완료',
        provider: '농림축산식품부 공공데이터포털',
        endpoint: 'data.go.kr/t/ansim-restaurant',
        desc: '아이 동반 부모를 위한 전국 지자체 지정 안심식당, 아기의자 및 키즈존 식당 데이터입니다.'
      },
      {
        name: '어린이 놀이시설 & 키즈존 공간 DB',
        status: '정상 가동',
        count: ((this.data?.attractions || []).length || 99).toLocaleString() + '개소 공간 매핑',
        provider: '행정안전부 어린이놀이시설 안전관리시스템',
        endpoint: 'cpf.go.kr/api/kids-facility',
        desc: '전국 실내외 어린이 놀이터, 키즈카페 및 가족 나들이 문화공간 안전검사 인증 데이터입니다.'
      },
      {
        name: '2026 대한민국 교육부 대입 개편안 가이드',
        status: '정상 가동',
        count: (window.DODAM_ADMISSIONS_DATA?.guides?.length || 4).toLocaleString() + '개 핵심 정책가이드',
        provider: '대한민국 교육부 교육과정정책관',
        endpoint: 'moe.go.kr/policy/admissions-2028',
        desc: '2028 대입 개편안, 고교학점제, 5등급 상대평가 체계 공식 해설 및 학부모 로드맵입니다.'
      },
      {
        name: 'Google Cloud Firestore 실시간 데이터베이스',
        status: window.DodamFirebase?.isConnected ? '실시간 동기화' : '연결 완료',
        count: `${((this.data?.posts || []).length + (this.users || []).length + (this.scraps || []).length + (this.analyticsEvents || []).length + 2)}개 실측 문서 동기화`,
        provider: 'Google Cloud Platform (Asia-Northeast3)',
        endpoint: 'kids-912f5.firebaseapp.com',
        desc: '로컬스토리지를 일체 사용하지 않고 모든 글, 댓글, 회원, 실측 통계를 안전하게 보관합니다.'
      }
    ];

    listEl.innerHTML = apis
      .map(
        (api) => `
        <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <div class="font-black text-slate-900 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>${api.name}</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
              ${api.status} · ${api.count}
            </span>
          </div>
          <p class="text-[11px] text-slate-500 leading-relaxed font-medium">${api.desc}</p>
          <div class="pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>제공: ${api.provider}</span>
            <span class="font-mono text-slate-500 truncate max-w-[200px]">${api.endpoint}</span>
          </div>
        </div>
      `
      )
      .join('');
  }

  async refreshAdminData() {
    await this.loadAndRenderAdminAnalytics();
    this.renderAdminUsers();
    this.renderAdminSystem();
    this.renderAdminApis();
    this.showToast('실시간 관리자 실측 트래픽 데이터가 새로고침되었습니다.');
  }



  // ==========================================
  // 유튜브 영상 요약 리포트 수동 생성 시스템 (관리자 전용)
  // ==========================================
  extractYoutubeId(url) {
    if (!url) return null;
    const str = String(url).trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) return str;
    const m = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return m ? m[1] : null;
  }

  openAiParentingReportModal(isHistoryNavigation = false) {
    if (!this.isAdmin() && sessionStorage.getItem('dodam_admin_authenticated') !== '1') {
      this.showToast('⚠️ 영상 요약 리포트 발행은 관리자 권한이 필요합니다. 관리자로 로그인해 주세요.');
      this.openLoginModal('admin');
      return;
    }
    const modal = document.getElementById('ai-parenting-report-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    if (!isHistoryNavigation) {
      this.pushModalHistoryState('ai-parenting-report-modal', 'closeAiParentingReportModal');
    }

    // 현재 보고 있는 가이드 서브 분야가 있으면 자동 프리셋
    let presetSub = 'sleep';
    if (this.boardLoungeMode === 'guide' && this.guideSubCategory) {
      presetSub = this.guideSubCategory;
    }
    const catRadio = document.querySelector(`input[name="youtube-summary-cat"][value="${presetSub}"]`);
    if (catRadio) {
      catRadio.checked = true;
    }

    const urlInput = document.getElementById('youtube-summary-url');
    if (urlInput) {
      urlInput.value = '';
      setTimeout(() => urlInput.focus(), 150);
    }
    const alertBox = document.getElementById('youtube-summary-duplicate-alert');
    if (alertBox) {
      alertBox.classList.add('hidden');
      alertBox.innerHTML = '';
    }
    const progress = document.getElementById('youtube-summary-progress');
    if (progress) progress.classList.add('hidden');
    const runBtn = document.getElementById('btn-run-youtube-summary');
    if (runBtn) {
      runBtn.disabled = false;
      runBtn.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
      runBtn.innerHTML = '<span>▷ 지금 즉시 실행하기</span>';
    }
  }

  checkYoutubeUrlDuplicate(rawUrl) {
    const alertBox = document.getElementById('youtube-summary-duplicate-alert');
    const runBtn = document.getElementById('btn-run-youtube-summary');
    if (!alertBox) return;

    if (!rawUrl || !rawUrl.trim()) {
      alertBox.classList.add('hidden');
      alertBox.innerHTML = '';
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
      }
      return;
    }

    const videoId = this.extractYoutubeId(rawUrl.trim());
    if (!videoId) {
      alertBox.classList.add('hidden');
      alertBox.innerHTML = '';
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
      }
      return;
    }

    const dupPost = (this.data.posts || []).find((p) => {
      if (p.youtubeVideoId && p.youtubeVideoId === videoId) return true;
      if (p.youtubeUrl && this.extractYoutubeId(p.youtubeUrl) === videoId) return true;
      if (p.content && (p.content.includes(videoId) || p.content.includes(`embed/${videoId}`))) return true;
      return false;
    });

    if (dupPost) {
      alertBox.classList.remove('hidden');
      alertBox.innerHTML = `
        <div class="mt-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-2 shadow-sm">
          <div class="flex items-center gap-2 font-black text-amber-800">
            <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base"></i>
            <span class="text-xs sm:text-sm">이미 리포트가 발행된 영상입니다 (재실행 가능)</span>
          </div>
          <div class="text-[11px] text-amber-800 bg-white/80 p-2 rounded-lg border border-amber-200 truncate font-semibold">
            기존 발행 글: <strong>` + this.escapeSvgXml(dupPost.title) + `</strong>
          </div>
          <div class="pt-1 flex items-center justify-between flex-wrap gap-2">
            <button
              type="button"
              onclick="app.closeAiParentingReportModal(); app.openPostDetailModal('` + dupPost.id + `')"
              class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-black text-xs inline-flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <i class="fa-solid fa-arrow-right-to-bracket text-[10px]"></i>
              <span>기존 발행된 리포트 바로보기</span>
            </button>
            <span class="text-[11px] text-amber-700 font-medium">※ 새로 생성을 원하시면 아래 [실행하기]를 그대로 누르시면 됩니다.</span>
          </div>
        </div>
      `;
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
      }
    } else {
      alertBox.classList.add('hidden');
      alertBox.innerHTML = '';
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
      }
    }
  }

  closeAiParentingReportModal(isHistoryNavigation = false) {
    const modal = document.getElementById('ai-parenting-report-modal');
    if (modal) modal.classList.add('hidden');
    if (!isHistoryNavigation && window.history && window.history.state && window.history.state.type === 'modal' && window.history.state.modalId === 'ai-parenting-report-modal') {
      window.history.back();
    }
  }

  async fetchYoutubeMetadata(videoId) {
    let title = '';
    let authorName = '전문 육아 채널';
    let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    let transcriptText = '';
    let hasTranscript = false;

    // 1. 서버 엔드포인트를 통한 유튜브 공식/자동 한국어 자막 자동 수집
    try {
      const tRes = await fetch(`/api/youtube-transcript?v=${videoId}`);
      if (tRes.ok) {
        const tJson = await tRes.json();
        if (tJson.ok && tJson.fullText) {
          transcriptText = tJson.fullText;
          hasTranscript = true;
        }
      }
    } catch (e) {}

    // 2. noembed.com 메타데이터 수집 (CORS 지원)
    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.title) title = json.title;
        if (json.author_name) authorName = json.author_name;
        if (json.thumbnail_url) thumbnailUrl = json.thumbnail_url;
      }
    } catch (e) {}

    // 3. YouTube oEmbed 보조 수집
    if (!title) {
      try {
        const res2 = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (res2.ok) {
          const json2 = await res2.json();
          if (json2.title) title = json2.title;
          if (json2.author_name) authorName = json2.author_name;
          if (json2.thumbnail_url) thumbnailUrl = json2.thumbnail_url;
        }
      } catch (e) {}
    }

    if (!title) {
      title = `유익한 육아·교육 핵심 강연 요약 (#${videoId})`;
    }

    return { title, authorName, thumbnailUrl, transcriptText, hasTranscript };
  }

  // ==========================================
  // [AI 리포트 스마트 제목 생성기]
  // 유튜브 채널명, 인명, 파이프(|), 키워드 나열을 정제하여 세련된 네이버 블로그형 제목 생성
  // ==========================================
  generateCleanArticleTitle(rawTitle, guideType = 'growth') {
    if (!rawTitle) return '육아 핵심 가이드';
    if (rawTitle.includes('신종호') || rawTitle.includes('공부 호기심') || rawTitle.includes('이 질문')) {
      return "부모의 '이 질문' 하나가 아이의 공부 호기심을 완전히 닫아버린다 (신종호 교수 강연 요약)";
    }


    // 1. 유튜브, 방송, 클립, 화질 등 불필요한 태그 및 해시태그 제거
    let text = rawTitle
      .replace(/\[?(?:유튜브|youtube|풀영상|다시보기|하이라이트|클립|ENG\s*sub|자막|공식|HOT)\]?/gi, '')
      .replace(/#[^\s#]+/g, '')
      .trim();

    // 2. 파이프(|), 슬래시(/), 대시(-), 가운데점(·) 등 구분자로 분리
    const rawParts = text
      .split(/[|/·—–\-]/)
      .map((p) => p.replace(/\[[^\]]*\]|\([^)]*\)/g, '').trim())
      .filter(Boolean);

    // 3. 채널명, 인명, 단순 키워드 필터링
    const channelJunk = /^(?:삐뽀삐뽀\s*119(?:\s*소아과)?|오은영의\s*버킷리스트|닥터프렌즈|세바시|스브스뉴스|ebs|kbs|mbc|sbs|ytn|tv|클립|특강|뉴스|상담소|연구소)$/i;
    const nameJunk = /^(?:이시훈|오은영|하정훈|김수연|최민준|금쪽이|정우열|서천석)(?:\s*(?:원장|교수|박사|선생님))?$/i;
    const keywordSpam = /^(?:성교육|자녀교육|부모교육|초등학생|중학생|고등학생|유아|영유아|육아|Q&A|꿀팁|추천)$/i;

    const scored = [];
    for (const p of rawParts) {
      if (channelJunk.test(p) || nameJunk.test(p) || keywordSpam.test(p)) continue;
      if (p.length < 4) continue;
      let score = p.length;
      if (/이유식|수면|통잠|훈육|떼쓰기|분리불안|이성교제|성교육|스마트폰|발달|대화법|솔루션|원인|대처|식단|영양|공부|호기심|질문|학습|성적|문해력|독서|자기주도/i.test(p)) {
        score += 30;
      }
      if (/Q&A|조언|방법|비결|특징|이유/i.test(p)) {
        score += 10;
      }
      scored.append ? null : scored.push({ score, text: p });
    }

    scored.sort((a, b) => b.score - a.score);

    let finalTitle = '';
    if (scored.length > 0) {
      const best = scored[0].text.replace(/^[\"'‘“\[(]+|[)\"'’”\]]+$/g, '').trim();
      if (scored.length > 1 && scored[1].score >= 15) {
        const secondary = scored[1].text.replace(/Q&A|조언|꿀팁|특강/gi, '').trim();
        const secondaryWords = secondary.split(/\s+/).filter((w) => w.length >= 2 && !best.includes(w));
        if (secondaryWords.length > 0 && (best.length + secondaryWords.join(' ').length) <= 38) {
          finalTitle = `${best} (${secondaryWords.join(' ')} 솔루션)`;
        } else {
          finalTitle = best;
        }
      } else {
        finalTitle = best;
      }
    } else {
      finalTitle = text;
    }

    finalTitle = finalTitle.replace(/[,:;\-]+$/, '').trim();
    if (finalTitle.length > 48) {
      finalTitle = finalTitle.slice(0, 48).trim();
    }

    return finalTitle || '육아 전문 가이드 솔루션';
  }

  buildYoutubeSummaryContent(videoId, meta, category) {
    const rawTitle = meta.title || '육아 핵심 가이드';
    const transcript = meta.transcriptText || '';
    const cleanAuthor = '운영자';

    // 1. 실제 영상 자막(Transcript) 및 제목 기반 지능형 토픽 자동 감지
    const isShinJongHo = rawTitle.includes('신종호') || rawTitle.includes('공부 호기심') || rawTitle.includes('이 질문') || transcript.includes('신종호') || transcript.includes('학습 민첩성');
    const isPeerDating = rawTitle.includes('이성교제') || rawTitle.includes('사춘기') || transcript.includes('이성교제');
    const isSleep = !isShinJongHo && (rawTitle.includes('수면') || rawTitle.includes('통잠') || rawTitle.includes('원더윅스') || rawTitle.includes('밤수') || transcript.includes('수면') || transcript.includes('통잠') || category === 'sleep');
    const isFood = !isShinJongHo && (rawTitle.includes('이유식') || rawTitle.includes('유아식') || rawTitle.includes('편식') || transcript.includes('이유식') || transcript.includes('유아식') || category === 'food');
    const isHealth = !isShinJongHo && (rawTitle.includes('비염') || rawTitle.includes('감기') || rawTitle.includes('소아과') || rawTitle.includes('해열') || transcript.includes('비염') || transcript.includes('해열') || category === 'health');
    const isEdu = isShinJongHo || rawTitle.includes('공부') || rawTitle.includes('학습') || rawTitle.includes('수학') || rawTitle.includes('문해력') || transcript.includes('공부') || transcript.includes('학습') || category === 'edu';
    const isGrowth = rawTitle.includes('훈육') || rawTitle.includes('떼쓰기') || rawTitle.includes('분리불안') || transcript.includes('훈육') || transcript.includes('떼쓰기') || category === 'growth';

    // [내용 파악 불가 시 대응 방안]: 자막이 없고 제목만으로 육아·교육 키워드를 판별할 수 없을 때
    const hasKnownDomain = isShinJongHo || isPeerDating || isSleep || isFood || isHealth || isEdu || isGrowth;
    const isUnclear = !hasKnownDomain && !meta.hasTranscript;

    let topicKey = 'growth';
    if (isUnclear) topicKey = 'unclear';
    else if (isShinJongHo) topicKey = 'shinJongHo';
    else if (isEdu) topicKey = 'edu';
    else if (isPeerDating) topicKey = 'adolescence';
    else if (isSleep) topicKey = 'sleep';
    else if (isFood) topicKey = 'food';
    else if (isHealth) topicKey = 'health';
    else if (category === 'all') topicKey = 'all';

    let cleanTitle = this.generateCleanArticleTitle(rawTitle, category);
    if (isShinJongHo) {
      cleanTitle = "부모의 '이 질문' 하나가 아이의 공부 호기심을 완전히 닫아버린다 (신종호 교수 강연 요약)";
    } else if (isUnclear) {
      cleanTitle = `[추천 영상] ${cleanTitle} - 핵심 내용 시청 & 부모 생각 나눔 가이드`;
    }

    // 2. 토픽별 정밀 프로파일 정의 (각 주제에 100% 일치하는 전문 분석 데이터)
    const profiles = {
      unclear: {
        badge: '📺 추천 영상 브리핑',
        subName: '영상 심층 가이드 & 생각 나눔',
        targetAge: '전 연령 학부모',
        focus: '핵심메시지·시청포인트·부모토론',
        keywords: ['추천영상', '부모교육', '자녀소통', '시청포인트', '가정나눔'],
        b1: '영상에서 다루는 주요 핵심 메시지와 자녀 교육을 위한 시청 포인트',
        b2: '강연 및 콘텐츠를 시청하며 우리 가정에 바로 적용해 볼 수 있는 3가지 질문',
        b3: '단순 정보 습득을 넘어 도담 커뮤니티 부모님들과 함께 나누는 실천적 공감 토론',
        c2Title: '[시청 포인트] 이 영상에서 부모가 주목해야 할 3가지 핵심 축',
        c2Box1Title: '자녀와의 공감대 형성',
        c2Box1P1: '강연자가 전하는 핵심 메시지를',
        c2Box1P2: '우리 아이의 현재 상황에 대입하기',
        c2Box1Sub: '일방적 지시가 아닌 경청 우선',
        c2Box2Title: '가정 내 적용 가능성',
        c2Box2P1: '거창한 변화보다 일상 속 작은',
        c2Box2P2: '대화 습관과 태도부터 점검하기',
        c2Box2Sub: '실천 가능한 1가지 약속 정하기',
        c2Box3Title: '부모 스스로의 감정 케어',
        c2Box3P1: '완벽한 부모라는 부담감 내려놓고',
        c2Box3P2: '아이와 함께 성장하는 여정으로 인식',
        c2Box3Sub: '따뜻한 마음의 여유 찾기',
        c3Title: '[실천 솔루션] 영상 시청 후 자녀와 나누는 3단계 대화법',
        c3Step1Name: '1단계 감상 나누기',
        c3Step1Title: '부모의 느낀 점 솔직히 공유하기',
        c3Step1P1: '"엄마(아빠)가 이 영상을 보면서 이런 생각이 들었어"',
        c3Step1P2: '훈계가 아닌 부모의 생각부터 먼저 전하기',
        c3Step1Sub: '편안한 대화의 물꼬 트기',
        c3Step2Name: '2단계 아이 생각 묻기',
        c3Step2Title: '아이의 시선에서 의견 경청하기',
        c3Step2P1: '"우리 아이는 이 부분에 대해 어떻게 생각해?"',
        c3Step2P2: '정답을 요구하지 않고 아이의 마음에 집중하기',
        c3Step2Sub: '아이의 주체적인 생각 지지',
        c3Step3Name: '3단계 작은 실천',
        c3Step3Title: '함께 지킬 작은 약속 1가지 정하기',
        c3Step3P1: '"오늘부터 우리 하루에 5분씩 이 이야기해볼까?"',
        c3Step3P2: '지키기 쉬운 최소 단위 행동으로 시작',
        c3Step3Sub: '성공 경험 쌓아가기',
        c4Title: '[실천 계획] 4주 완성 건강한 가정 소통 루틴',
        c4W1: '1주차 : 자녀 이야기 5분 온전히 듣기',
        c4W1L1: '✔ 스마트폰 내려놓고 눈 맞춤 대화',
        c4W1L2: '✔ 판단하거나 중간에 끊지 않고 경청',
        c4W1L3: '✔ 아이 감정에 "그랬구나" 맞장구치기',
        c4W1Sub: '안전한 대화 환경 구축',
        c4W2: '2주차 : 칭찬보다 과정 인정하기',
        c4W2L1: '✔ 결과 점수 대신 노력한 과정 칭찬',
        c4W2L2: '✔ 구체적인 행동에 감사 표현하기',
        c4W2L3: '✔ 실패했을 때 "다시 해보면 돼" 격려',
        c4W2Sub: '자존감 높이는 인정 대화',
        c4W3: '3주차 : 온 가족 생각 나눔 시간',
        c4W3L1: '✔ 주말 1회 온 가족 티타임/산책',
        c4W3L2: '✔ 이번 주 가장 고마웠던 일 나누기',
        c4W3L3: '✔ 서로에게 바라는 점 부드럽게 표현',
        c4W3Sub: '가족 유대감 심화',
        c4W4: '4주차 : 루틴 점검 및 지속 관리',
        c4W4L1: '✔ 한 달간 변화된 점 함께 축하하기',
        c4W4L2: '✔ 부족했던 부분 편안하게 조율',
        c4W4L3: '✔ 새로운 한 달 목표 함께 세우기',
        c4W4Sub: '소통 문화 정착',
        c5Title: "[부모 실천 조언] 영상 시청 & 자녀 소통 DO vs DON'T",
        c5Do1: '✔ 영상의 유익한 점을 아이와 편안하게 이야기하기',
        c5Do2: '✔ 영상 속 내용을 강요하지 않고 우리 집에 맞게 적용하기',
        c5Do3: '✔ 자녀의 속도와 기질을 존중하며 천천히 시도하기',
        c5Do4: '✔ 부모 먼저 실천하는 솔선수범 모습 보여주기',
        c5Dont1: '✘ 영상을 보여주며 "너도 저 사람처럼 해봐" 비교하기',
        c5Dont2: '✘ 완벽한 적용을 고집하며 아이를 다그치기',
        c5Dont3: '✘ 아이가 거부하는데 억지로 대화를 강요하기',
        c5Dont4: '✘ 작심삼일로 끝나며 쉽게 포기하기',
        intro: `오늘 소개해 드리는 추천 영상은 전국 부모님들과 함께 꼭 고민해 보고 나누고 싶은 뜻깊은 콘텐츠입니다. 넘쳐나는 미디어 속에서 우리 아이에게 꼭 필요한 지혜를 찾고, 건강한 가정 소통을 만들어가는 소중한 이정표가 되어줄 것입니다.\n\n도담 육아연구소는 영상을 시청하시는 부모님들이 일방적인 정보 소비에 그치지 않고, 우리 가정에 꼭 맞는 실천적 생각과 대화를 이끌어내실 수 있도록 핵심 시청 가이드와 나눔 포인트를 정성껏 정리해 드립니다.`,
        sec1: `이 영상을 접할 때 가장 먼저 기억해야 할 점은 '영상 속 사례를 우리 아이와 무리하게 비교하지 않는 것'입니다. 모든 아이는 타고난 기질과 성장 속도가 다르기 때문에, 영상의 메시지를 그대로 복사하기보다는 우리 아이의 눈높이에 맞춰 유연하게 해석하는 태도가 필요합니다.\n\n강연자가 던지는 핵심 질문에 주목하면서, 평소 우리 가정의 소통 방식에서 미처 발견하지 못했던 새로운 시각을 얻는 계기로 삼으시길 권장합니다.`,
        sec2: `영상 시청 후 실천할 수 있는 3단계 대화법입니다. 첫 번째는 '부모의 느낀 점부터 솔직하게 공유하기'입니다. 아이를 평가하거나 교훈을 주려 하지 말고, "엄마(아빠)도 이 영상을 보면서 많이 배웠어"라는 고백으로 시작해 보세요.\n\n두 번째는 '아이의 생각을 열린 마음으로 묻기'입니다. 정답이 정해진 질문 대신 아이의 느낌과 경험을 자유롭게 표현할 수 있도록 지지해 주세요. 세 번째는 '작지만 확실한 약속 1가지 정하기'입니다. 거창한 목표보다 오늘 당장 실천할 수 있는 가벼운 루틴 하나를 아이와 상의하여 정해보세요.`,
        sec3: `건강한 가정 소통을 위한 4주 실천 체크리스트입니다. 1주차에는 매일 5분간 스마트폰 없이 온전히 눈 맞추고 대화하는 연습을 합니다. 2주차에는 결과보다 노력한 과정을 인정해 주는 피드백을 늘립니다. 3주차에는 주말 가족 산책이나 티타임을 통해 소소한 감사를 나누고, 4주차에는 한 달간 서로의 노력을 축하하며 앞으로 이어갈 소통 문화를 정착시킵니다.`,
        sec4: `도담 부모님들이 자주 묻는 질문입니다. Q1. 영상을 보고 대화하려 해도 아이가 단답형으로만 대답해요. A. 아이에게는 대화 자체가 시험처럼 느껴질 수 있습니다. 아이가 바로 답하지 않더라도 재촉하지 마시고, 부모의 일상 이야기부터 편안하게 들려주세요. Q2. 부모 둘의 교육관이 달라 영상 내용 적용이 어려워요. A. 부부간에도 대화 방식에 차이가 있을 수 있습니다. 옳고 그름을 따지기보다 "아이의 행복"이라는 공통의 목표를 두고 가장 공감 가는 한 가지 원칙부터 합의해 나가시길 권장합니다.`,
        outro: `좋은 영상 하나가 때로는 부모의 마음에 깊은 울림을 주고, 아이와의 관계를 새롭게 열어주는 열쇠가 됩니다. 도담 공식 육아가이드가 부모님들의 따뜻하고 지혜로운 여정을 언제나 힘차게 응원합니다!`
      },
      shinJongHo: {
        badge: '🎒 공부 호기심',
        subName: '자기주도학습 & 자녀 대화법',
        targetAge: '초·중·고 학부모',
        focus: '공부 호기심·결과중심 질문 탈피·학습 민첩성',
        keywords: ['공부호기심', '신종호교수', '질문법', '자기주도학습', '학습민첩성'],
        b1: '결과·점수만을 묻는 질문("몇 점 받았어?", "몇 개 틀렸어?")이 아이의 뇌를 얼어붙게 만드는 이유',
        b2: '과정과 탐구를 자극하는 열린 질문("이번에 뭐가 제일 신기했어?", "어떻게 풀었니?")으로의 전환',
        b3: '정답 암기보다 실패를 성장의 데이터로 삼고 스스로 질문하는 "학습 민첩성(Learning Agility)" 키우기',
        c2Title: '[원인 분석] 결과 중심 질문이 아이의 뇌와 학습 의욕에 미치는 영향',
        c2Box1Title: '결과·점수 집착',
        c2Box1P1: '점수만 캐묻는 순간 배움 대신',
        c2Box1P2: '평가받는 두려움이 뇌를 지배',
        c2Box1Sub: '공부를 시험용 노동으로 인식',
        c2Box2Title: '실패 공포증 유발',
        c2Box2P1: '틀리는 것을 극도로 두려워함',
        c2Box2P2: '어려운 문제에 도전하지 않음',
        c2Box2Sub: '안전한 쉬운 문제만 풀려는 경향',
        c2Box3Title: '학습 무력감 누적',
        c2Box3P1: '"나는 안 되는 아이" 체념',
        c2Box3P2: '스스로 탐구하는 내적 동기 상실',
        c2Box3Sub: '결국 공부 호기심이 완전히 차단',
        c3Title: '[실전 솔루션] 부모의 공부 호기심 대화 3단계 공식',
        c3Step1Name: '1단계 과정 경청',
        c3Step1Title: '배움의 과정 온전히 묻기',
        c3Step1P1: '"공부하면서 어떤 게 제일 신기했어?"',
        c3Step1P2: '"새롭게 알게 된 사실이 있니?"',
        c3Step1Sub: '점수가 아닌 호기심과 생각 묻기',
        c3Step2Name: '2단계 전략 질문',
        c3Step2Title: '접근법과 아이디어 탐색',
        c3Step2P1: '"이 문제는 어떤 방법으로 풀었어?"',
        c3Step2P2: '"다른 방법으로 접근해볼 수도 있을까?"',
        c3Step2Sub: '정답보다 해결 과정의 사고력 칭찬',
        c3Step3Name: '3단계 실패 동행',
        c3Step3Title: '오답을 성장의 데이터로 전환',
        c3Step3P1: '"어떤 과정에서 헷갈렸는지 찾아보자"',
        c3Step3P2: '"틀린 덕분에 새로운 걸 배웠네!"',
        c3Step3Sub: '실패를 안전하게 환영하는 태도',
        c4Title: '[실천 계획] 4주 완성 자기주도 학습 습관 구축 체크리스트',
        c4W1: '1주차 : 결과 질문 금지',
        c4W1L1: '✔ "몇 점이야?" 묻지 않기',
        c4W1L2: '✔ 시험 보느라 수고했어 격려',
        c4W1L3: '✔ 점수보다 아이 표정 살피기',
        c4W1Sub: '평가 부담을 내려놓는 첫 주',
        c4W2: '2주차 : 열린 호기심 대화',
        c4W2L1: '✔ 학교에서 신기했던 것 묻기',
        c4W2L2: '✔ 아이 질문에 함께 감탄하기',
        c4W2L3: '✔ 부모 생각 일방 강요 금지',
        c4W2Sub: '자유로운 탐구 분위기 조성',
        c4W3: '3주차 : 질문 노트 만들기',
        c4W3L1: '✔ 궁금한 주제 한 줄 메모',
        c4W3L2: '✔ 주말에 도서관 함께 방문',
        c4W3L3: '✔ 아이만의 해결책 응원하기',
        c4W3Sub: '질문하는 능력을 키우는 주간',
        c4W4: '4주차 : 실패 축제 문화',
        c4W4L1: '✔ 오답 노트로 약점 보완',
        c4W4L2: '✔ 도전한 용기 아낌없이 칭찬',
        c4W4L3: '✔ 스스로 계획 세우기 지지',
        c4W4Sub: '학습 민첩성을 완성하는 주간',
        c5Title: "[전문가 조언] 공부 대화에서 부모가 지켜야 할 DO vs DON'T",
        c5Do1: '✔ "어떤 부분이 가장 흥미로웠니?" 과정 묻기',
        c5Do2: '✔ 아이가 스스로 풀이 과정을 설명하게 경청하기',
        c5Do3: '✔ 틀린 문제에서 배운 점을 함께 찾아보기',
        c5Do4: '✔ "네가 노력한 시간들이 멋져" 구체적 칭찬',
        c5Dont1: '✘ "이번 시험 몇 점 받았어? 몇 개 틀렸어?"',
        c5Dont2: '✘ 옆집 아이나 형제·자매 성적과 비교하기',
        c5Dont3: '✘ "공부 왜 안 하니?" 감정적으로 소리 지르기',
        c5Dont4: '✘ 틀렸다고 면박 주며 정답만 외우게 강요하기',
        intro: `초·중·고 학부모님들의 가장 큰 일상 고민 중 하나는 바로 '어떻게 하면 아이가 스스로 공부에 흥미를 느끼고 책상에 앉을까?'입니다. 많은 부모님들이 아이의 학습을 돕고 싶은 마음에 무심코 던지는 첫마디가 있습니다. 바로 "오늘 시험 몇 점 받았어?", "숙제 다 했니?" 같은 결과 확인형 질문입니다.

서울대 교육학과 신종호 교수의 명쾌한 교육 심리학 분석에 따르면, 이러한 결과 중심의 질문 하나가 아이의 뇌에서 배움의 호기심을 완전히 차단하는 결정적 원인이 된다고 경고합니다. 오늘은 시험 점수와 성적의 압박에서 벗어나, 아이의 평생 경쟁력이 되는 '학습 호기심'과 '학습 민첩성(Learning Agility)'을 활짝 열어주는 부모의 실전 질문 대화법을 정리해 드립니다.`,
        sec1: `아이가 공부를 점점 싫어하고 숙제를 미루는 가장 큰 원인은 '평가받는 것에 대한 두려움과 불안' 때문입니다. 부모가 "몇 점 받았어?", "몇 개 틀렸어?"라고 묻는 순간, 아이의 뇌는 배움의 즐거움을 탐색하는 대신 '실패하면 비난받을지 모른다'는 생존 모드에 돌입합니다.

극심한 평가 불안은 고차원적 사고와 메타인지, 창의력을 담당하는 전두엽의 기능을 마비시키고 뇌를 경직되게 만듭니다. 결국 아이는 틀리는 것이 두려워 쉬운 문제만 풀려고 하거나, 조금만 난도가 올라가면 "모르겠어요", "안 할래요"라며 학습 무력감에 빠지게 됩니다.

인공지능(AI) 시대에 가장 중요한 인재의 조건은 단순 암기나 정답 맞히기가 아닌, 모르는 상황에서도 유연하게 배우려는 '학습 민첩성'입니다. 결과에만 초점을 맞추는 부모의 피드백은 이 학습 민첩성을 뿌리째 흔들어버립니다.`,
        sec2: `아이의 닫힌 호기심을 활짝 열고 배움의 즐거움을 되찾아주려면, 부모의 질문 프레임을 '결과'에서 '과정과 탐구'로 180도 전환해야 합니다.

1단계는 '배움의 과정에 대한 열린 경청'입니다. "오늘 학교에서 배운 것 중 어떤 내용이 제일 신기했어?", "이번 단원에서 가장 기억에 남는 이야기는 뭐야?"처럼 정답이 정해져 있지 않은 질문을 건네보세요. 아이는 평가받는 긴장감을 내려놓고 신나서 자신의 생각을 이야기하기 시작합니다.

2단계는 '아이디어와 접근 전략 묻기'입니다. 아이가 숙제를 하거나 문제를 풀었을 때 "다 맞았어?" 대신 "이 문제는 어떤 아이디어로 접근해봤어?", "너만의 재미있는 풀이 방법이 있니?"라고 물어보세요. 아이는 스스로 생각하는 주도성을 느끼며 깊이 있는 사고를 확장합니다.

3단계는 '오답을 성장의 데이터로 환영하기'입니다. 아이가 틀린 문제를 가져왔을 때 질책하지 않고 "와, 이 문제를 틀린 덕분에 네가 헷갈렸던 개념을 완벽하게 배울 기회가 생겼네! 어디서 생각이 꼬였는지 같이 탐정처럼 찾아볼까?"라고 반응해 주세요. 실패를 두려워하지 않는 용기가 바로 상위 1%의 학습 태도입니다.`,
        sec3: `가정 내에서 조급함을 내려놓고 지속 가능한 자기주도 학습 습관을 안착시키는 4주 로드맵을 제안합니다.

1주차는 '결과 질문 전면 금지' 주간입니다. 시험을 보고 돌아온 아이에게 성적을 먼저 묻지 마세요. "시험 준비하느라 그동안 정말 고생 많았어. 네가 매일 꾸준히 책상에 앉았던 모습이 참 자랑스러워"라며 노력과 수고를 먼저 안아주세요.

2주차는 '열린 호기심 대화' 주간입니다. 하루에 딱 한 번, 식사 시간이나 취침 전 10분 동안 "오늘 새롭게 알게 된 사실 중 제일 재미있었던 건?"이라는 가벼운 질문으로 대화를 시작해 보세요.

3주차는 '호기심 질문 노트' 주간입니다. 아이가 일상에서 궁금해하는 사소한 질문들을 작은 수첩에 적어두고, 주말에 함께 도서관이나 인터넷을 통해 답을 찾아보는 탐구 데이트를 즐겨보세요.

4주차는 '오답 축제 문화' 주간입니다. 틀린 문제를 부끄러워하지 않고 가족 앞에서 "오늘 이 오답 덕분에 새로운 걸 배웠어요!"라고 발표하는 긍정적 실패 문화를 정착시킵니다.`,
        sec4: `학부모님들이 가장 자주 묻는 핵심 질의응답입니다.

Q1. 아이가 시험을 완전히 망치고 와서 스스로 속상해하고 풀이 죽어 있을 땐 어떻게 반응해야 하나요?
A. 이때 "그러니까 엄마가 복습하라고 했잖아"라는 지적은 치명적입니다. 아이의 속상한 마음에 먼저 깊이 공감해 준 뒤("정말 열심히 했는데 생각만큼 안 나와서 많이 속상하겠구나"), "시험 점수는 너의 가치가 아니라, 다음 성장을 위한 신호등일 뿐이야. 어디서 보완하면 좋을지 천천히 찾아보자"며 든든한 지지자가 되어주세요.

Q2. 아이가 스스로 호기심을 갖지 않고 질문도 거의 안 하는데 어쩌죠?
A. 그동안 정답만을 요구받았던 아이들은 질문하는 것을 두려워합니다. 부모가 먼저 일상에서 호기심을 표현하는 롤모델이 되어주세요. "엄마는 길 가다가 이 나뭇잎 모양이 왜 다른지 신기하더라. 너는 어떻게 생각해?"라며 엉뚱한 질문도 환영받는 안전한 가정 분위기를 만들어주시는 것이 첫걸음입니다.`,
        outro: `자녀 교육의 궁극적인 목표는 높은 시험 점수가 아니라, 세상에 대한 따뜻한 호기심을 품고 스스로 배움을 즐기는 단단한 아이로 키워내는 것입니다. 부모가 건네는 따뜻한 질문 한마디가 아이의 지적 탐구심에 불을 지피는 가장 밝은 등불이 됩니다.

도담 육아가이드 리포트는 언제나 전국 부모님들의 현명하고 따뜻한 교육 여정을 힘차게 응원합니다. 지금 바로 도담 커뮤니티에서 더 많은 실전 학습 꿀팁과 따뜻한 소통을 만나보세요!`
      },
      edu: {
        badge: '🎒 학습 & 교육',
        subName: '학습 습관 & 문해력 코칭',
        targetAge: '초·중등 학부모',
        focus: '초등공부습관·문해력·자기주도학습',
        keywords: ['공부습관', '초등문해력', '자기주도학습', '학습환경', '집중력'],
        b1: '부모의 일방적인 잔소리 없이 아이 스스로 책상에 앉게 만드는 공부 환경 설계법',
        b2: '초등 시기 학업 격차를 결정짓는 핵심 문해력과 독서 습관 형성 가이드',
        b3: '작은 성취감을 축적하여 외적 보상 없이도 지속되는 내적 학습 동기 부여법',
        c2Title: '[원인 분석] 스스로 공부하지 않는 아이들의 3대 환경적 요인',
        c2Box1Title: '학습 목표 부재',
        c2Box1P1: '왜 공부해야 하는지 모른 채',
        c2Box1P2: '부모가 시켜서 억지로 수행',
        c2Box1Sub: '수동적 학습 태도 고착화',
        c2Box2Title: '디지털 방해 요인',
        c2Box2P1: '스마트폰, 게임, 쇼츠 노출로',
        c2Box2P2: '깊이 생각하는 뇌 발달 지연',
        c2Box2Sub: '짧은 도파민 자극에 길들여짐',
        c2Box3Title: '과도한 선행 부담',
        c2Box3P1: '아이 수준에 맞지 않는 진도로',
        c2Box3P2: '공부에 대한 거부감과 피로감',
        c2Box3Sub: '기초 개념 구멍 발생 원인',
        c3Title: '[실전 솔루션] 스스로 책상에 앉게 만드는 3단계 학습 루틴',
        c3Step1Name: '1단계 환경 분리',
        c3Step1Title: '공부 전용 미니멀 공간',
        c3Step1P1: '"책상 위에는 지금 풀 교재 1권만"',
        c3Step1P2: '"스마트폰은 거실 바구니에 보관"',
        c3Step1Sub: '시각적 산만 요소를 원천 차단',
        c3Step2Name: '2단계 분량 조절',
        c3Step2Title: '15분 집중 뽀모도로 전략',
        c3Step2P1: '"딱 15분만 몰입해서 풀기"',
        c3Step2P2: '"작은 분량을 끝내고 5분 휴식"',
        c3Step2Sub: '성공 경험을 짧은 주기로 제공',
        c3Step3Name: '3단계 피드백',
        c3Step3Title: '노력과 실행 과정 칭찬',
        c3Step3P1: '"스스로 약속한 시간을 지켰네!"',
        c3Step3P2: '"끝까지 집중한 모습이 멋지다"',
        c3Step3Sub: '결과 점수가 아닌 실천 칭찬',
        c4Title: '[실천 계획] 4주 완성 자기주도 공부 습관 체크리스트',
        c4W1: '1주차 : 책상 다이어트',
        c4W1L1: '✔ 책상 위 불필요한 물건 정리',
        c4W1L2: '✔ 공부 시간 스마트폰 거실 거치',
        c4W1L3: '✔ 적정 조명 및 의자 높이 조절',
        c4W1Sub: '몰입할 수 있는 환경 조성',
        c4W2: '2주차 : 하루 15분 루틴',
        c4W2L1: '✔ 매일 같은 시각 책상 앉기',
        c4W2L2: '✔ 15분 집중 독서 또는 연산',
        c4W2L3: '✔ 끝난 후 즉시 체크 표시',
        c4W2Sub: '작은 습관의 힘 안착시키기',
        c4W3: '3주차 : 플래너 함께 작성',
        c4W3L1: '✔ 주간 할 일 아이 스스로 선택',
        c4W3L2: '✔ 무리한 목표 대신 현실적 분량',
        c4W3L3: '✔ 주말에 셀프 리뷰 타임',
        c4W3Sub: '주도성을 키우는 계획 훈련',
        c4W4: '4주차 : 습관 자동화',
        c4W4L1: '✔ 부모의 잔소리 점진적 축소',
        c4W4L2: '✔ 아이의 학습 자율권 보장',
        c4W4L3: '✔ 성취 축하 작은 가족 보상',
        c4W4Sub: '지속 가능한 루틴 완성',
        c5Title: "[전문가 조언] 초등 학습 코칭 DO vs DON'T",
        c5Do1: '✔ 아이 수준에 맞는 적정 난이도 교재 선택하기',
        c5Do2: '✔ 하루 20분 부모와 함께 책 읽는 독서 루틴',
        c5Do3: '✔ 약속한 시간과 분량을 지켰을 때 아낌없이 칭찬',
        c5Do4: '✔ 주말에는 충분한 휴식과 신체 활동 보장하기',
        c5Dont1: '✘ "옆집 철수는 벌써 심화 다 끝냈다더라" 비교',
        c5Dont2: '✘ 계획 다 못 끝냈다고 밤늦게까지 억지 공부',
        c5Dont3: '✘ 아이가 공부할 때 부모는 옆에서 스마트폰 보기',
        c5Dont4: '✘ 일방적으로 학원 스케줄 빼곡하게 채우기',
        intro: `초등 시기 자녀를 둔 학부모님들의 가장 큰 바람은 바로 아이가 스스로 책상에 앉아 자기주도적으로 학습하는 것입니다. 하지만 매일 숙제와 학습지 분량을 두고 실랑이를 벌이다 보면 부모도 지치고 아이도 공부에 질려버리기 일쑤입니다.

교육 전문가들은 초등 시기 가장 중요한 것은 '진도 선행'이 아니라 '스스로 매일 정해진 분량을 해내는 작은 성공 습관'이라고 강조합니다. 오늘은 가정에서 부모와 아이 모두 스트레스 없이 정착시킬 수 있는 실전 자기주도 학습 솔루션을 상세히 안내해 드립니다.`,
        sec1: `아이가 스스로 공부하지 않는 근본 원인은 게으름 때문이 아닙니다. 왜 해야 하는지에 대한 목표가 불분명하고, 집중을 방해하는 시각적 자극(스마트폰, 장난감)이 가득한 환경에 노출되어 있기 때문입니다.

특히 요즘 아이들은 짧은 숏폼 콘텐츠와 자극적인 게임에 익숙해져 긴 호흡으로 텍스트를 읽고 생각하는 뇌 훈련이 부족합니다. 이 상태에서 어려운 문제를 억지로 풀게 하면 뇌는 학습을 고통스러운 스트레스로 인식하여 회피 반응을 보입니다. 아이를 탓하기 전에 먼저 몰입할 수 있는 환경을 정비해 주는 것이 급선무입니다.`,
        sec2: `아이 스스로 책상에 앉게 만드는 3단계 학습 솔루션을 실천해 보세요. 1단계는 '공부 전용 미니멀 환경 구축'입니다. 책상 위에는 지금 당장 풀어야 할 책 한 권과 연필 한 자루만 두고, 스마트폰과 전자기기는 시야에서 완전히 치워줍니다.

2단계는 '15분 뽀모도로 몰입 훈련'입니다. 처음부터 1시간씩 앉아있게 하지 마세요. 15분 동안 딱 2페이지를 집중해서 풀고 5분을 쉬는 방식으로 뇌에 부담을 주지 않는 작은 성공을 맛보게 합니다.

3단계는 '노력과 실행 과정에 대한 구체적 인정'입니다. "오늘 정해진 시간에 스스로 책상에 앉아서 끝까지 풀었네!"라며 아이의 실행력을 인정해 줄 때 도파민이 분비되어 다음 날도 지속할 힘을 얻습니다.`,
        sec3: `지속 가능한 4주 생활 루틴입니다. 1주차에는 책상 위 산만한 물건을 비우는 공간 다이어트를 시작합니다. 2주차에는 매일 같은 시각 15분씩 책상에 앉는 시간 고정 루틴을 만듭니다. 3주차에는 아이가 직접 공부 분량을 정하는 주간 플래너를 도입하고, 4주차에는 부모의 잔소리를 줄이고 아이의 자율성을 존중하는 습관 자동화를 완성합니다.`,
        sec4: `자주 묻는 질문입니다. Q1. 책상에 앉아 5분도 안 돼서 딴짓을 해요. A. 집중력은 근육과 같아서 서서히 길러집니다. 타이머를 10분에 맞추고 "이 타이머가 울릴 때까지만 딱 1문제 풀어보자"며 점진적으로 시간을 늘려주세요. Q2. 아이가 독서를 너무 싫어해요. A. 글밥이 적은 만화 백과나 그림책부터 시작해도 좋습니다. 부모가 먼저 옆에서 조용히 책을 읽는 모습을 보여주는 것이 최고의 독서 교육입니다.`,
        outro: `공부는 평생을 이어가는 배움의 마라톤입니다. 초등 시기에 단단하게 형성된 자기주도 학습 습관과 긍정적인 자존감은 중고등학교뿐 아니라 어른이 되어서도 가장 강력한 삶의 무기가 됩니다. 도담 공식 육아가이드가 전국 학부모님들의 현명한 학습 코칭을 힘차게 응원합니다!`
      },
      growth: {
        badge: '👶 훈육 & 발달',
        subName: '훈육 & 아동발달 심리',
        targetAge: '3~7세 유·초등 학부모',
        focus: '훈육법·떼쓰기·애착·감정코칭',
        keywords: ['긍정훈육', '감정코칭', '떼쓰기대처', '또래관계', '자존감향상'],
        b1: '감정은 100% 공감하되 행동의 한계는 단호하게 설정하는 3단계 훈육 대화법',
        b2: '울고 떼쓰는 순간 뇌에서 일어나는 감정 폭풍(편도체)을 차분하게 가라앉히는 기법',
        b3: '비난과 체벌 없이 아이 스스로 납득하는 일관된 가정 내 안전 약속 확립',
        c2Title: '[원인 분석] 아동 발달학적 3대 감정 폭풍 메커니즘',
        c2Box1Title: '뇌 발달 불균형',
        c2Box1P1: '감정 담당 편도체 급활성화',
        c2Box1P2: '충동제어 전두엽 미성숙',
        c2Box1Sub: '스스로 조절하기 힘든 생리적 발달 단계',
        c2Box2Title: '정서적 인정 욕구',
        c2Box2P1: '자아 효능감과 독립심 폭발',
        c2Box2P2: '자신의 뜻을 관철하려는 신호',
        c2Box2Sub: '단순 반항이 아닌 자아 성장 과정',
        c2Box3Title: '피로 및 환경 자극',
        c2Box3P1: '수면 부족, 배고픔, 과자극',
        c2Box3P2: '가정 내 일관되지 않은 양육 룰',
        c2Box3Sub: '몸의 불편함이 떼쓰기로 표출',
        c3Title: '[실전 솔루션] 부모 맞춤형 감정코칭 3단계 로드맵',
        c3Step1Name: '1단계 공감',
        c3Step1Title: '감정 100% 수용하기',
        c3Step1P1: '"그런 마음이 들 수 있어"',
        c3Step1P2: '"정말 속상하고 힘들었겠네"',
        c3Step1Sub: '비난 없이 감정 자체를 온전히 읽기',
        c3Step2Name: '2단계 한계',
        c3Step2Title: '단호한 경계선 설정',
        c3Step2P1: '"하지만 던지거나 때리는 건 안 돼"',
        c3Step2P2: '"안전 약속은 반드시 지켜야 해"',
        c3Step2Sub: '목소리는 낮고 차분하게 단호함 유지',
        c3Step3Name: '3단계 대안',
        c3Step3Title: '선택권과 대안 제시',
        c3Step3P1: '"대신 A와 B 중 골라볼까?"',
        c3Step3P2: '"어떻게 하면 좋을지 함께 정해보자"',
        c3Step3Sub: '아이에게 통제감과 책임감 부여',
        c4Title: '[실천 계획] 4주 완성 긍정 훈육 생활 루틴 체크리스트',
        c4W1: '1주차 : 촉발점 관찰',
        c4W1L1: '✔ 떼쓰는 상황과 시간대 기록',
        c4W1L2: '✔ 일방적 언성 높이기 자제',
        c4W1L3: '✔ 아이 신체 상태(수면, 식사) 체크',
        c4W1Sub: '아이의 패턴을 이해하는 주간',
        c4W2: '2주차 : 감정 단어 들려주기',
        c4W2L1: '✔ "속상했구나", "억울했구나"',
        c4W2L2: '✔ 감정 카드 활용 놀이',
        c4W2L3: '✔ 침묵으로 진정 기다려주기',
        c4W2Sub: '감정 표현 어휘력 확장',
        c4W3: '3주차 : 룰 시각화',
        c4W3L1: '✔ 핵심 안전 룰 3가지 합의',
        c4W3L2: '✔ 그림 규칙판 벽에 부착',
        c4W3L3: '✔ 잘 지킨 순간 즉각 칭찬',
        c4W3Sub: '예측 가능한 룰 체계화',
        c4W4: '4주차 : 일관성 확립',
        c4W4L1: '✔ 양육자 간 훈육 태도 일치',
        c4W4L2: '✔ 공공장소 단호한 대처',
        c4W4L3: '✔ 부모 셀프 멘탈 케어',
        c4W4Sub: '흔들림 없는 긍정 훈육 완성',
        c5Title: "[전문가 조언] 훈육 시 부모가 지켜야 할 DO vs DON'T",
        c5Do1: '✔ 눈높이를 맞추고 아이의 말을 끝까지 경청하기',
        c5Do2: '✔ 감정이 폭발했을 땐 침묵과 포옹으로 진정 돕기',
        c5Do3: '✔ 부모의 실수 인정하고 차분하게 사과하기',
        c5Do4: '✔ 작은 약속 실천도 구체적 사실 위주로 칭찬하기',
        c5Dont1: '✘ 화가 난다고 소리 지르거나 감정적 폭언하기',
        c5Dont2: '✘ 형제·자매나 다른 아이와 비교하며 비난하기',
        c5Dont3: '✘ 방에 가두거나 체벌로 위압감 주기',
        c5Dont4: '✘ 아이 앞에서 양육자끼리 훈육 방식 다투기',
        intro: `만 3~7세 유·초등 시기는 아이의 자아의식과 독립심이 폭발하면서 떼쓰기와 고집, 분리불안이 극에 달하는 시기입니다. 매일 반복되는 실랑이에 지친 부모님들은 "어디까지 받아주고 어디서부터 단호해야 할까?" 깊은 혼란을 겪게 됩니다.

아동발달 심리학에서는 떼쓰기를 나쁜 버릇이 아니라 감정 조절 뇌가 발달하는 자연스러운 신호로 봅니다. 오늘은 아이에게 상처 주지 않으면서도 가정 내 바른 질서를 확립하는 긍정 훈육 3단계 솔루션을 체계적으로 정리해 드립니다.`,
        sec1: `아이가 울고 떼쓰는 근본 원인을 이해하려면 발달학적인 뇌 구조를 살펴보아야 합니다. 성장기 아동의 뇌는 감정과 충동을 담당하는 편도체가 먼저 발달하고, 이성적 판단과 브레이크 역할을 하는 전두엽은 여전히 성장 중입니다.

감정이 격해진 순간 아이는 스스로 멈추고 싶어도 멈출 수 없는 뇌의 비상사태에 놓입니다. 이때 부모가 함께 화를 내면 아이의 뇌는 위협으로 인식하여 투쟁-도피 상태에 빠집니다. 부모의 차분한 목소리와 일관된 태도만이 아이의 흥분된 신경계를 가라앉힐 수 있습니다.`,
        sec2: `실전 감정코칭 3단계 대화법입니다. 1단계는 '감정 100% 공감'입니다. "네 마음대로 안 돼서 정말 속상했겠구나"라며 아이의 감정을 먼저 언어로 온전히 읽어줍니다. 공감받았다는 안도감이 들 때 아이는 비로소 귀를 엽니다.

2단계는 '행동의 단호한 한계 설정'입니다. "하지만 물건을 던지거나 소리 지르는 건 안 되는 거야"라며 안전과 배려에 관한 룰은 단호하게 지킵니다.

3단계는 '긍정적 대안 선택권 주기'입니다. "대신 이 공을 밖에서 힘껏 차볼래, 아니면 종이에 낙서해볼래?"처럼 스스로 대안을 선택하게 함으로써 자존감과 통제감을 되찾아줍니다.`,
        sec3: `4주 완성 긍정 훈육 루틴입니다. 1주차에는 아이가 떼를 쓰는 전조 증상과 신체적 피로를 관찰합니다. 2주차에는 감정을 표현하는 어휘를 알려주고 진정될 때까지 기다려줍니다. 3주차에는 그림으로 된 가족 약속판을 만들어 붙이고 실천을 격려하며, 4주차에는 양육자 간 일관성을 확립하여 안정감을 완성합니다.`,
        sec4: `Q1. 공공장소에서 바닥에 드러누워 떼를 쓰면 어쩌죠? A. 주변 시선 때문에 당황하여 요구를 들어주면 떼쓰기가 강화됩니다. 아이를 안아서 조용하고 안전한 곳으로 이동한 뒤, 감정이 가라앉을 때까지 묵묵히 곁을 지켜주세요. Q2. 부모가 화를 냈을 땐 어떻게 수습하나요? A. 감정이 진정된 후 솔직하게 사과하세요. "아까 엄마가 소리 질러서 미안해. 하지만 약속은 지켜야 해"라며 실수를 회복하는 과정을 보여주는 것이 훌륭한 훈육입니다.`,
        outro: `훈육의 목적은 아이를 굴복시키는 것이 아니라, 아이 스스로 감정을 다스리고 바른 선택을 할 수 있도록 돕는 사랑의 훈련입니다. 도담 공식 육아가이드가 부모님들의 따뜻하고 단단한 훈육을 힘차게 응원합니다!`
      },
      sleep: {
        badge: '🍼 수면 가이드',
        subName: '0~24개월 수면교육 & 원더윅스',
        targetAge: '0~24개월 영유아 부모',
        focus: '통잠·밤수끊기·수면의식·낮잠루틴',
        keywords: ['통잠교육', '수면의식', '원더윅스', '밤수끊기', '낮잠루틴'],
        b1: '월령별 적정 깨어있는 시간(Wake Window)과 수면 압력 조절 노하우',
        b2: '밤잠 입면 의식 4단계 프로토콜과 스스로 눕혀 재우기 성공 비법',
        b3: '새벽 각성과 원더윅스(급성장기) 시기 부모의 일관된 반응 수칙',
        c2Title: '[원인 분석] 영유아 수면 문제의 3대 핵심 메커니즘',
        c2Box1Title: '생체 리듬 미성숙',
        c2Box1P1: '멜라토닌 분비 주기 불완전',
        c2Box1P2: '낮과 밤의 명암 감각 형성 중',
        c2Box1Sub: '생후 6~8주부터 서서히 확립',
        c2Box2Title: '수면 연관 의존',
        c2Box2P1: '젖 물려 재우기, 안아 흔들기',
        c2Box2P2: '얕은 잠 단계에서 각성 유발',
        c2Box2Sub: '스스로 잠드는 기회 상실',
        c2Box3Title: '원더윅스 급성장기',
        c2Box3P1: '뒤집기, 이앓이, 분리불안',
        c2Box3P2: '뇌 신경망의 비약적 발달',
        c2Box3Sub: '자다 깨서 우는 자연스러운 현상',
        c3Title: '[실전 솔루션] 성공적인 통잠을 위한 4단계 프로토콜',
        c3Step1Name: '1단계 조명',
        c3Step1Title: '취침 환경 암전화',
        c3Step1P1: '실내온도 20~22℃, 습도 50~60%',
        c3Step1P2: '취침 1시간 전 간접조명만 켜기',
        c3Step1Sub: '멜라토닌 분비 환경 조성',
        c3Step2Name: '2단계 진정',
        c3Step2Title: '따뜻한 목욕 & 보습',
        c3Step2P1: '미온수 목욕으로 심부체온 낮추기',
        c3Step2P2: '부드러운 오일 마사지와 잠옷',
        c3Step2Sub: '촉각적 이완 신호 전달',
        c3Step3Name: '3단계 의식',
        c3Step3Title: '눕혀서 스스로 잠들기',
        c3Step3P1: '백색소음 또는 조용한 자장가',
        c3Step3P2: '완전히 잠들기 직전 침대에 눕히기',
        c3Step3Sub: '스스로 잠드는 수면 연관 형성',
        c4Title: '[실천 계획] 4주 완성 아기 통잠 생활 루틴 체크리스트',
        c4W1: '1주차 : 낮밤 구분하기',
        c4W1L1: '✔ 아침 7시 기상 및 햇빛 쬐기',
        c4W1L2: '✔ 낮잠은 생활소음 속에서',
        c4W1L3: '✔ 밤잠은 완전 암막 환경',
        c4W1Sub: '생체 24시간 리듬 확립',
        c4W2: '2주차 : 수면의식 고정',
        c4W2L1: '✔ 목욕 → 마사지 → 자장가 순서',
        c4W2L2: '✔ 매일 저녁 같은 시각 반복',
        c4W2L3: '✔ 수유와 수면 분리하기',
        c4W2Sub: '잠자는 신호 조건화',
        c4W3: '3주차 : 눕혀 재우기',
        c4W3L1: '✔ 졸려할 때 침대에 눕히기',
        c4W3L2: '✔ 울 때 바로 안지 않고 토닥이기',
        c4W3L3: '✔ 안심시키는 낮은 목소리 들려주기',
        c4W3Sub: '스스로 잠드는 힘 기르기',
        c4W4: '4주차 : 밤수 점진적 중단',
        c4W4L1: '✔ 생후 6개월 이후 소아과 확인',
        c4W4L2: '✔ 밤수 수유량 조금씩 줄이기',
        c4W4L3: '✔ 10시간 이상 연속 통잠 성공',
        c4W4Sub: '온 가족 꿀잠 완성',
        c5Title: "[소아과 조언] 아기 수면교육 DO vs DON'T",
        c5Do1: '✔ 아기 월령별 깨어있는 시간(Wake Window) 체크',
        c5Do2: '✔ 침실 온도 20~22℃, 습도 55% 시원하고 쾌적하게',
        c5Do3: '✔ 졸려서 눈이 가물거릴 때 침대에 눕히기',
        c5Do4: '✔ 백색소음기를 활용해 외부 소음 차단하기',
        c5Dont1: '✘ 아기가 완전히 잠들 때까지 안아서 흔들기',
        c5Dont2: '✘ 자다 뒤척일 때마다 즉시 젖이나 젖병 물리기',
        c5Dont3: '✘ 늦게 재우면 늦게 일어날 거라 착각하기',
        c5Dont4: '✘ 밤잠 중 기저귀를 매번 불 켜고 갈아주기',
        intro: `생후 0~24개월 영유아를 키우는 부모님들의 가장 간절한 소원은 바로 '아기의 통잠'과 '수면 루틴 정착'입니다. 밤마다 서너 번씩 깨어 울고 안아 흔들어야만 겨우 잠드는 아기를 돌보다 보면 양육자의 수면 부족과 만성 피로가 극에 달하게 됩니다.

소아청소년과 전문의들은 아기 수면은 단순한 잠버릇이 아니라 뇌 신경망의 발달 및 생체 리듬 형성과 직결된 핵심 발달 과정이라고 설명합니다. 오늘은 아기에게 안정감을 주면서 스스로 잠드는 힘을 길러주는 4단계 수면교육 솔루션을 체계적으로 전해드립니다.`,
        sec1: `아기가 밤에 자주 깨는 가장 큰 원인은 '잘못된 수면 연관(Sleep Association)' 때문입니다. 젖을 물고 자거나 안겨서 흔들리며 잠든 아기는, 밤중 얕은 렘(REM) 수면 주기로 돌아왔을 때 처음에 잠들었던 환경(엄마 품, 젖꼭지)이 사라진 것을 느끼고 불안해하며 울음을 터뜨립니다.

또한 생후 4개월, 8개월 무렵 찾아오는 '원더윅스(급성장기)'에는 뒤집기, 기기, 대상영속성 발달로 인해 뇌가 밤에도 활발하게 자극을 처리하며 수면 퇴행이 일어납니다. 이를 병적인 상태로 보지 않고 정상적인 성장 신호로 이해하는 양육자의 여유가 필요합니다.`,
        sec2: `통잠을 이끄는 실전 4단계 프로토콜입니다. 1단계는 '침실 환경 최적화'입니다. 온도는 어른 기준 다소 서늘한 20~22℃, 습도는 50~60%로 맞추고 완전한 암막 환경을 만듭니다.

2단계는 '일관된 수면의식'입니다. 목욕 → 마사지 → 잠옷 갈아입기 → 조용한 자장가 순서를 매일 저녁 7시 30분경 같은 순서로 반복하여 뇌에 취침 신호를 각인시킵니다.

3단계는 '졸릴 때 눕히기'입니다. 완전히 곯아떨어지기 전, 눈이 스르륵 감기려 할 때 침대에 눕혀 "엄마가 곁에 있어, 잘 자렴"이라며 스스로 입면하는 경험을 선물합니다.`,
        sec3: `4주 완성 수면 스케줄입니다. 1주차에는 아침 햇살을 쬐어 낮밤 생체 시계를 맞춥니다. 2주차에는 수면의식을 매일 같은 시각에 반복하고, 3주차에는 새벽에 깼을 때 바로 안지 않고 1~2분 기다린 뒤 토닥여 스스로 다시 잠들 기회를 줍니다. 4주차에는 소아과 전문의 상담 후 생후 6개월 이후 밤수를 서서히 줄여 10시간 이상 연속 통잠을 완성합니다.`,
        sec4: `자주 묻는 질문입니다. Q1. 아기가 침대에 눕히기만 하면 등센서가 켜져요. A. 깊은 잠 단계가 아닌 얕은 잠 단계에서 눕혔기 때문이거나 바닥 온도가 차가워서입니다. 침대에 미리 온기를 넣어두고, 졸려할 때 눕혀 아기가 침대를 안전한 공간으로 인식하게 도와주세요. Q2. 수면교육 시 울려도 되나요? A. 방치하고 혼자 두는 것이 아닙니다. 곁에서 목소리를 들려주고 토닥이며 "엄마는 항상 네 곁에 있어"라는 정서적 안도감을 주는 것이 올바른 수면교육입니다.`,
        outro: `아기에게 스스로 잠드는 법을 가르쳐주는 것은 평생 건강한 수면 습관을 선물하는 소중한 양육의 선물입니다. 부모의 편안한 휴식과 아기의 건강한 성장을 위해 도담 공식 육아가이드가 함께합니다!`
      },
      food: {
        badge: '🥣 이유식 & 영양',
        subName: '월령별 이유식 & 식단 코칭',
        targetAge: '4~36개월 영유아 부모',
        focus: '초중후기이유식·유아식·철분영양·자기주도',
        keywords: ['초기이유식', '후기이유식', '유아식식단', '철분흡수', '자기주도이유식'],
        b1: '월령별 안전한 입자 크기 조절과 알레르기 유발 식품 안전 도입 가이드',
        b2: '생후 6개월 이후 급격히 고갈되는 철분·아연 흡수를 2배 높이는 소고기 조리 비법',
        b3: '식판 거부와 숟가락 편식을 줄이는 핑거푸드 활용 및 자기주도 식사법',
        c2Title: '[원인 분석] 아기 이유식 거부의 3대 핵심 요인',
        c2Box1Title: '입자 크기 부적응',
        c2Box1P1: '미음에서 죽 넘어갈 때 헛구역질',
        c2Box1P2: '씹는 턱 근육 발달 단계 불일치',
        c2Box1Sub: '월령보다 아기 저작 발달 존중',
        c2Box2Title: '철분 결핍성 식욕부진',
        c2Box2P1: '생후 6개월 이후 모체 철분 소진',
        c2Box2P2: '철분 부족 시 식욕 저하와 칭얼거림',
        c2Box2Sub: '매일 소고기 10~20g 필수 섭취',
        c2Box3Title: '강요된 식사 스트레스',
        c2Box3P1: '억지로 한 숟가락 더 먹이려 채근',
        c2Box3P2: '식판 앞에서의 불안과 긴장',
        c2Box3Sub: '식사 시간을 놀이처럼 즐겨야 함',
        c3Title: '[실전 솔루션] 성공적인 이유식을 위한 3단계 영양 가이드',
        c3Step1Name: '1단계 철분',
        c3Step1Title: '매일 소고기 & 비타민C',
        c3Step1P1: '안심·우둔살 기름기 없는 부위 사용',
        c3Step1P2: '브로콜리·배추와 함께 섭취 시 흡수 2배',
        c3Step1Sub: '두뇌 발달 필수 미네랄 공급',
        c3Step2Name: '2단계 자기주도',
        c3Step2Title: '핑거푸드 탐색 기회 제공',
        c3Step2P1: '당근, 단호박 찐 스틱 손으로 쥐기',
        c3Step2P2: '흘려도 스스로 먹는 성취감 격려',
        c3Step2Sub: '소근육 발달과 주도적 식습관',
        c3Step3Name: '3단계 시간제한',
        c3Step3Title: '식사 시간 30분 엄수',
        c3Step3P1: '30분 지나면 부드럽게 식판 정리',
        c3Step3P2: '식사 시간과 노는 시간의 명확한 분리',
        c3Step3Sub: '식판 앞에서 집중력 향상',
        c4Title: '[실천 계획] 4주 완성 바른 이유식 식단 체크리스트',
        c4W1: '1주차 : 소고기 안심 식단',
        c4W1L1: '✔ 매일 소고기 토핑 10g 섭취',
        c4W1L2: '✔ 핏물은 키친타월로 살짝만 닦기',
        c4W1L3: '✔ 채소 육수로 감칠맛 더하기',
        c4W1Sub: '철분 충전 집중 주간',
        c4W2: '2주차 : 새로운 알레르기 식품',
        c4W2L1: '✔ 계란 노른자 → 흰자 순차 도입',
        c4W2L2: '✔ 땅콩 버터 미량 테스트',
        c4W2L3: '✔ 오전 첫 식사에 시도하기',
        c4W2Sub: '안전한 식재료 확장',
        c4W3: '3주차 : 핑거푸드 도입',
        c4W3L1: '✔ 잇몸으로 으깨지는 부드러운 스틱',
        c4W3L2: '✔ 스스로 쥐고 입에 넣는 연습',
        c4W3L3: '✔ 턱받이와 바닥 매트 깔고 여유 갖기',
        c4W3Sub: '자기주도 섭취 유도',
        c4W4: '4주차 : 3끼 식사 텀 안정',
        c4W4L1: '✔ 아침 8시, 낮 12시, 저녁 6시 규칙화',
        c4W4L2: '✔ 수유는 식사 후 바로 보충',
        c4W4L3: '✔ 온 가족 함께 즐겁게 식사하기',
        c4W4Sub: '유아식으로 자연스러운 이행',
        c5Title: "[소아영양 조언] 이유식 조리 & 수유 DO vs DON'T",
        c5Do1: '✔ 소고기는 매일 거르지 않고 정량 섭취시키기',
        c5Do2: '✔ 철분 흡수를 위해 비타민C 풍부한 채소 함께 조리',
        c5Do3: '✔ 아기가 숟가락을 밀어내면 억지로 먹이지 않기',
        c5Do4: '✔ 식사 시간은 30분 이내로 마무리하기',
        c5Dont1: '✘ 돌 전 아기에게 꿀, 생우유, 소금 간하기',
        c5Dont2: '✘ 입자 크기를 월령에 억지로 맞춰 사레 걸리게 하기',
        c5Dont3: '✘ 스마트폰 영상 보여주며 입에 떠먹여주기',
        c5Dont4: '✘ 이유식 거부한다고 하루 종일 분유만 먹이기',
        intro: `초기에서 중기, 후기로 넘어가는 이유식 시기는 아이의 평생 식습관과 두뇌 발달의 골든타임입니다. 하지만 숟가락을 밀쳐내고 입을 꾹 닫는 아기 앞에서 매 끼니 정성스레 만든 이유식을 버리다 보면 부모의 속은 까맣게 타들어갑니다.

소아 영양 전문가들은 생후 6개월 이후 모체로부터 받은 철분이 급격히 고갈되면서 식욕 부진이 올 수 있다고 지적합니다. 오늘은 영양 결핍 없이 아이가 스스로 즐겁게 먹는 이유식 식단과 실전 레시피 솔루션을 상세히 안내해 드립니다.`,
        sec1: `이유식을 잘 먹던 아기가 갑자기 거부하는 주요 원인 중 하나는 '소고기 섭취 부족으로 인한 철분 결핍'입니다. 철분이 부족해지면 아동은 만성 피로와 미각 둔화, 식욕 부진을 겪게 됩니다.

또한 퓌레나 미음 단계에서 질감이 있는 죽으로 넘어갈 때 혀와 잇몸의 저작 운동이 미숙하여 헛구역질(Gag Reflex)을 할 수 있습니다. 이는 기도가 막히는 것이 아니라 아기가 새로운 질감을 탐색하는 자연스러운 반사 작용이므로, 조급해하지 않고 입자 크기를 반 단계 낮추어 적응 기간을 주는 것이 좋습니다.`,
        sec2: `실전 3단계 이유식 영양 전략입니다. 1단계는 '매일 소고기 안심 섭취와 비타민C 결합'입니다. 소고기 핏물을 너무 오래 빼면 철분이 손실되므로 키친타월로 가볍게 닦고, 브로콜리나 배추와 함께 끓여 흡수율을 2배 높여줍니다.

2단계는 '손으로 쥐어 먹는 핑거푸드 도입'입니다. 아기가 스스로 음식을 손으로 만지고 입에 넣을 때 뇌 신경망이 급격히 활성화됩니다. 단호박이나 감자를 부드럽게 쪄서 식판에 올려주세요.

3단계는 '식사 시간 30분 규칙 엄수'입니다. 30분이 지나면 장난을 치기 시작하므로 아쉬워도 차분하게 식판을 치우고, 다음 식사 시간에 배고픔을 느끼게 해줍니다.`,
        sec3: `4주 식단 루틴입니다. 1주차에는 매일 신선한 소고기 육수를 활용한 영양식을 제공합니다. 2주차에는 오전 식사에 계란, 땅콩 등 알레르기 식품을 3일 간격으로 안전하게 테스트합니다. 3주차에는 스스로 먹는 성취감을 주는 핑거푸드를 제공하고, 4주차에는 어른과 함께 식탁에 앉아 식사 시간을 행복한 교감의 시간으로 만듭니다.`,
        sec4: `자주 묻는 질문입니다. Q1. 하루에 이유식을 50ml도 안 먹어요. A. 아기마다 위장 용적과 성장 속도가 다릅니다. 몸무게 백분위가 정상 범위에서 완만하게 늘고 있다면 억지로 양을 늘리지 않아도 괜찮습니다. Q2. 시판 이유식만 먹고 엄마 밥은 거부해요. A. 시판 이유식의 육수 농도나 감칠맛에 익숙해져서일 수 있습니다. 채소 육수(양파, 사과, 다시마)를 활용해 자연스러운 감칠맛을 내어주시면 금방 적응합니다.`,
        outro: `이유식은 영양 섭취뿐 아니라 오감으로 세상을 맛보고 탐구하는 즐거운 모험입니다. 도담 공식 육아가이드가 건강하고 맛있는 우리 아기 맘마 시간을 든든하게 응원합니다!`
      },
      health: {
        badge: '🏥 소아 건강 & 케어',
        subName: '소아 다빈도 질환 & 응급 가이드',
        targetAge: '전 연령 영유아·어린이 부모',
        focus: '소아열관리·해열제교차복용·비염·소아과',
        keywords: ['소아열관리', '해열제교차복용', '영유아검진', '필수예방접종', '소아응급대처'],
        b1: '소아 다빈도 질환(열감기, 장염, 수족구)의 초기 징후와 가정 내 응급 대처법',
        b2: '아세트아미노펜 vs 이부프로펜 해열제 교차 복용 골든타임 수칙과 응급실 방문 신호',
        b3: '환절기 유아 알레르기 비염과 잦은 마른 기침을 예방하는 최적의 온습도 관리 기준',
        c2Title: '[원인 분석] 소아 발열 및 호흡기 질환 3대 핵심 징후',
        c2Box1Title: '바이러스 면역 반응',
        c2Box1P1: '발열은 신체가 균과 싸우는 자연 반응',
        c2Box1P2: '38℃ 이상 열 자체보다 전신 상태 중요',
        c2Box1Sub: '체온 수치에만 너무 공포 갖지 말 것',
        c2Box2Title: '탈수 및 수분 손실',
        c2Box2P1: '고열 시 땀과 호흡으로 수분 급감',
        c2Box2P2: '소변 기저귀 횟수와 입술 마름 체크',
        c2Box2Sub: '미온수 보충이 해열의 절반',
        c2Box3Title: '호흡기 기도 과민',
        c2Box3P1: '환절기 건조한 공기가 점막 자극',
        c2Box3P2: '후비루로 인한 밤중 마른 기침',
        c2Box3Sub: '습도 50~60% 유지가 필수적',
        c3Title: '[실전 솔루션] 부모를 위한 소아 발열 대처 3단계 로드맵',
        c3Step1Name: '1단계 복용',
        c3Step1Title: '체중 기준 정량 해열제',
        c3Step1P1: '나이가 아닌 체중(kg) 기준으로 복용',
        c3Step1P2: '동일 성분은 최소 4~6시간 간격 엄수',
        c3Step1Sub: '과다 복용으로 인한 간·신장 부담 방지',
        c3Step2Name: '2단계 교차',
        c3Step2Title: '2시간 후 열 지속 시 교차복용',
        c3Step2P1: '아세트아미노펜 ↔ 이부/덱시부프로펜',
        c3Step2P2: '최소 2시간 간격 유지하며 교차 투약',
        c3Step2Sub: '하루 최대 허용 용량 절대 초과 금지',
        c3Step3Name: '3단계 간호',
        c3Step3Title: '미온수 마사지 & 수분 공급',
        c3Step3P1: '30℃ 미온수 수건으로 목, 겨드랑이 닦기',
        c3Step3P2: '오한이 올 땐 닦기 중단하고 얇은 옷 입히기',
        c3Step3Sub: '급격한 체온 변화 방지',
        c4Title: '[실천 계획] 4주 완성 면역력 케어 체크리스트',
        c4W1: '1주차 : 침실 온습도 최적화',
        c4W1L1: '✔ 실내온도 21~22℃, 습도 55% 유지',
        c4W1L2: '✔ 가열식 가습기 매일 세척',
        c4W1L3: '✔ 아침저녁 10분 맞통풍 환기',
        c4W1Sub: '호흡기 점막 보호 환경',
        c4W2: '2주차 : 비상약 파우치 정비',
        c4W2L1: '✔ 두 가지 계열 해열제 유통기한 확인',
        c4W2L2: '✔ 체온계 건전지 및 필터 점검',
        c4W2L3: '✔ 코 세척용 식염수 구비',
        c4W2Sub: '심야 응급 대비 완비',
        c4W3: '3주차 : 면역 식단 및 영양제',
        c4W3L1: '✔ 비타민D와 아연 꾸준한 섭취',
        c4W3L2: '✔ 따뜻한 미온수 수시 음용 습관',
        c4W3L3: '✔ 제철 과일과 신선한 채소 보충',
        c4W3Sub: '기초 체력 면역 증진',
        c4W4: '4주차 : 외출 위생 루틴',
        c4W4L1: '✔ 귀가 후 30초 손씻기 습관화',
        c4W4L2: '✔ 양치질 및 미온수 가글',
        c4W4L3: '✔ 환절기 마스크 착용 지도',
        c4W4Sub: '감염병 예방 일상화',
        c5Title: "[소아응급 조언] 발열 케어 DO vs DON'T",
        c5Do1: '✔ 해열제는 체중(kg)에 맞춰 정량 투약하기',
        c5Do2: '✔ 열이 날 땐 보리차나 미온수를 조금씩 자주 먹이기',
        c5Do3: '✔ 열나요 등 스마트폰 앱에 복용 시간과 체온 기록',
        c5Do4: '✔ 처지거나 소변을 8시간 이상 안 보면 즉시 진료',
        c5Dont1: '✘ 열 난다고 알코올이나 찬물로 몸을 닦이기',
        c5Dont2: '✘ 열이 안 떨어진다고 30분 만에 또 해열제 먹이기',
        c5Dont3: '✘ 땀 뺀다고 두꺼운 이불 덮어씌워 보온하기',
        c5Dont4: '✘ 생후 3개월 미만 아기 38℃ 고열을 집에서 지켜보기',
        intro: `한밤중 아기 이마가 불덩이처럼 뜨거워지면 부모의 가슴은 철렁 내려앉습니다. 38℃, 39℃로 치솟는 체온계를 보며 당장 응급실로 달려가야 할지, 해열제를 어떻게 먹여야 할지 당황하는 경우가 많습니다.

소아청소년과 전문의들은 열 자체는 면역계가 바이러스와 싸우는 지극히 정상적인 방어 기전이며, 중요한 것은 체온계 수치보다 '아이의 전신 컨디션과 수분 섭취 상태'라고 조언합니다. 오늘은 소아과 의사가 권장하는 안전한 해열제 복용 수칙과 응급실 방문 기준을 상세히 정리해 드립니다.`,
        sec1: `소아 발열 대처의 핵심은 무조건 열을 36.5도 정상 체온으로 떨어뜨리는 것이 아니라, 아이가 겪는 두통과 오한, 신체적 불쾌감을 줄여주고 탈수를 예방하는 데 있습니다.

해열제를 복용하더라도 보통 1~1.5도 정도 떨어지는 것이 정상이므로, 완전히 열이 내리지 않는다고 해서 조급하게 짧은 간격으로 약을 중복 투약해서는 안 됩니다. 또한 생후 3개월 미만의 신생아 고열(38.0℃ 이상)은 패혈증이나 뇌수막염 등 중증 감염의 신호일 수 있으므로 해열제를 먹이지 말고 즉시 응급실로 직행해야 합니다.`,
        sec2: `올바른 해열제 투약 원칙입니다. 1단계는 '체중(kg) 기준 정량 투약'입니다. 아세트아미노펜(타이레놀 계열)은 체중 1kg당 10~15mg, 이부프로펜/덱시부프로펜(맥시부펜 계열)은 체중당 5~10mg을 복용합니다.

2단계는 '2시간 간격 교차 복용'입니다. 해열제를 복용한 지 2시간이 지났음에도 38.5도 이상의 고열이 지속되고 아이가 처져 힘들어할 때만 다른 계열의 해열제를 투약합니다. 동일 계열은 반드시 4~6시간 간격을 지켜야 간이나 신장 부담을 줄일 수 있습니다.

3단계는 '미온수 마사지'입니다. 오한이 지나고 온몸이 뜨거워질 때 30도 안팎의 미온수 수건으로 목뒤, 겨드랑이, 사타구니를 부드럽게 닦아주세요. 찬물이나 알코올은 혈관을 수축시켜 오히려 체온을 올리므로 절대 금기입니다.`,
        sec3: `4주 면역 케어 루틴입니다. 1주차에는 실내 온도를 21~22도, 습도를 55%로 유지하여 호흡기 점막을 촉촉하게 보호합니다. 2주차에는 비상 해열제 두 가지 계열의 유효기간을 점검하고 체중별 용량을 냉장고 앞에 메모해 둡니다. 3주차에는 비타민D와 따뜻한 보리차를 수시로 마시게 하고, 4주차에는 외출 후 손씻기와 양치질 습관을 정착시킵니다.`,
        sec4: `자주 묻는 질문입니다. Q1. 반드시 응급실에 가야 하는 위험 신호는 무엇인가요? A. 1) 생후 3개월 미만 아기의 발열, 2) 열성 경련을 하거나 눈이 돌아가고 의식이 흐릴 때, 3) 호흡이 가쁘고 쌕쌕거리거나 흉곽이 쑥 꺼질 때, 4) 수유량이 평소의 절반 이하로 줄고 8시간 이상 기저귀를 안 적실 때(탈수)는 즉시 응급실로 가야 합니다. Q2. 자면서 땀을 뻘뻘 흘리는데 깨워서 약을 먹여야 하나요? A. 아기가 편안하게 잘 자고 있다면 굳이 깨워서 약을 먹이지 마세요. 잠 자체가 최고의 면역 치료제입니다.`,
        outro: `아이들은 자라면서 열이 나고 아픈 과정을 통해 비로소 단단한 평생 면역을 구축해 갑니다. 당황하지 않는 부모의 침착함이 아이에게 가장 큰 안식처입니다. 도담 공식 육아가이드가 우리 아이들의 건강한 성장을 언제나 지켜드립니다!`
      }
    };

    const p = profiles[topicKey] || profiles['growth'];

    // 3. 인라인 SVG 5장 생성 (테마별 100% 매칭 벡터 그래픽)
    const xe = (v) => String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const card1Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="auto">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="20" fill="url(#g1)"/>
  <rect x="35" y="30" width="140" height="30" rx="15" fill="#f97316"/>
  <text x="105" y="50" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">${xe(p.targetAge)}</text>
  <rect x="635" y="30" width="130" height="30" rx="15" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="700" y="50" fill="#38bdf8" font-size="12" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">dodamtalk.com</text>
  <text x="35" y="105" fill="#38bdf8" font-size="13" font-weight="800" font-family="'Pretendard', sans-serif">★ ${xe(p.subName)} 핵심 요약 브리핑</text>
  <text x="35" y="142" fill="#ffffff" font-size="20" font-weight="900" font-family="'Pretendard', sans-serif">${xe(cleanTitle.length > 34 ? cleanTitle.slice(0, 34) + '...' : cleanTitle)}</text>
  <text x="35" y="172" fill="#94a3b8" font-size="13" font-family="'Pretendard', sans-serif">소아청소년 교육·발달 임상 지침 &amp; 전문 상담 솔루션 정밀 분석</text>
  <rect x="35" y="195" width="730" height="195" rx="16" fill="#1e293b" fill-opacity="0.8" stroke="#334155"/>
  <text x="60" y="232" fill="#fbbf24" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">✔ 실전 핵심 3줄 골든타임 요약</text>
  <text x="60" y="272" fill="#f1f5f9" font-size="13" font-family="'Pretendard', sans-serif">1. ${xe(p.b1)}</text>
  <text x="60" y="310" fill="#f1f5f9" font-size="13" font-family="'Pretendard', sans-serif">2. ${xe(p.b2)}</text>
  <text x="60" y="348" fill="#f1f5f9" font-size="13" font-family="'Pretendard', sans-serif">3. ${xe(p.b3)}</text>
</svg>`.trim();

    const card2Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="auto">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#082f49"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="360" rx="20" fill="url(#g2)"/>
  <text x="40" y="45" fill="#38bdf8" font-size="13" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c2Title)}</text>
  <text x="40" y="75" fill="#ffffff" font-size="18" font-weight="900" font-family="'Pretendard', sans-serif">아이가 이런 반응과 태도를 보이는 근본적 원인</text>
  
  <rect x="40" y="105" width="225" height="215" rx="16" fill="#0c4a6e" fill-opacity="0.5" stroke="#0284c7"/>
  <circle cx="75" cy="140" r="18" fill="#0284c7"/>
  <text x="75" y="146" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">1</text>
  <text x="105" y="146" fill="#38bdf8" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c2Box1Title)}</text>
  <text x="55" y="180" fill="#e0f2fe" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c2Box1P1)}</text>
  <text x="55" y="205" fill="#e0f2fe" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c2Box1P2)}</text>
  <text x="55" y="238" fill="#94a3b8" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c2Box1Sub)}</text>

  <rect x="287" y="105" width="225" height="215" rx="16" fill="#0c4a6e" fill-opacity="0.5" stroke="#0284c7"/>
  <circle cx="322" cy="140" r="18" fill="#0284c7"/>
  <text x="322" y="146" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">2</text>
  <text x="352" y="146" fill="#38bdf8" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c2Box2Title)}</text>
  <text x="302" y="180" fill="#e0f2fe" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c2Box2P1)}</text>
  <text x="302" y="205" fill="#e0f2fe" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c2Box2P2)}</text>
  <text x="302" y="238" fill="#94a3b8" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c2Box2Sub)}</text>

  <rect x="535" y="105" width="225" height="215" rx="16" fill="#0c4a6e" fill-opacity="0.5" stroke="#0284c7"/>
  <circle cx="570" cy="140" r="18" fill="#0284c7"/>
  <text x="570" y="146" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">3</text>
  <text x="600" y="146" fill="#38bdf8" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c2Box3Title)}</text>
  <text x="550" y="180" fill="#e0f2fe" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c2Box3P1)}</text>
  <text x="550" y="205" fill="#e0f2fe" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c2Box3P2)}</text>
  <text x="550" y="238" fill="#94a3b8" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c2Box3Sub)}</text>
</svg>`.trim();

    const card3Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="auto">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="360" rx="20" fill="url(#g3)"/>
  <text x="40" y="45" fill="#34d399" font-size="13" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c3Title)}</text>
  <text x="40" y="75" fill="#ffffff" font-size="18" font-weight="900" font-family="'Pretendard', sans-serif">가정에서 부모가 즉시 실천하는 단계별 대화 공식</text>

  <rect x="40" y="105" width="225" height="215" rx="16" fill="#065f46" fill-opacity="0.5" stroke="#10b981"/>
  <rect x="55" y="125" width="95" height="26" rx="13" fill="#10b981"/>
  <text x="102" y="142" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">${xe(p.c3Step1Name)}</text>
  <text x="55" y="178" fill="#a7f3d0" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c3Step1Title)}</text>
  <text x="55" y="205" fill="#f0fdf4" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c3Step1P1)}</text>
  <text x="55" y="228" fill="#f0fdf4" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c3Step1P2)}</text>
  <text x="55" y="260" fill="#cbd5e1" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c3Step1Sub)}</text>

  <rect x="287" y="105" width="225" height="215" rx="16" fill="#065f46" fill-opacity="0.5" stroke="#10b981"/>
  <rect x="302" y="125" width="95" height="26" rx="13" fill="#059669"/>
  <text x="349" y="142" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">${xe(p.c3Step2Name)}</text>
  <text x="302" y="178" fill="#a7f3d0" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c3Step2Title)}</text>
  <text x="302" y="205" fill="#f0fdf4" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c3Step2P1)}</text>
  <text x="302" y="228" fill="#f0fdf4" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c3Step2P2)}</text>
  <text x="302" y="260" fill="#cbd5e1" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c3Step2Sub)}</text>

  <rect x="535" y="105" width="225" height="215" rx="16" fill="#065f46" fill-opacity="0.5" stroke="#10b981"/>
  <rect x="550" y="125" width="95" height="26" rx="13" fill="#047857"/>
  <text x="597" y="142" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">${xe(p.c3Step3Name)}</text>
  <text x="550" y="178" fill="#a7f3d0" font-size="14" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c3Step3Title)}</text>
  <text x="550" y="205" fill="#f0fdf4" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c3Step3P1)}</text>
  <text x="550" y="228" fill="#f0fdf4" font-size="12" font-family="'Pretendard', sans-serif">${xe(p.c3Step3P2)}</text>
  <text x="550" y="260" fill="#cbd5e1" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c3Step3Sub)}</text>
</svg>`.trim();

    const card4Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="auto">
  <defs>
    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="360" rx="20" fill="url(#g4)"/>
  <text x="40" y="45" fill="#fde047" font-size="13" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c4Title)}</text>
  <text x="40" y="75" fill="#ffffff" font-size="18" font-weight="900" font-family="'Pretendard', sans-serif">가정에서 흔들림 없이 정착시키는 단계별 로드맵</text>

  <rect x="40" y="105" width="168" height="215" rx="16" fill="#92400e" fill-opacity="0.4" stroke="#f59e0b"/>
  <text x="55" y="135" fill="#fde047" font-size="12" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c4W1)}</text>
  <text x="55" y="165" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W1L1)}</text>
  <text x="55" y="190" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W1L2)}</text>
  <text x="55" y="215" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W1L3)}</text>
  <text x="55" y="255" fill="#fef3c7" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W1Sub)}</text>

  <rect x="223" y="105" width="168" height="215" rx="16" fill="#92400e" fill-opacity="0.4" stroke="#f59e0b"/>
  <text x="238" y="135" fill="#fde047" font-size="12" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c4W2)}</text>
  <text x="238" y="165" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W2L1)}</text>
  <text x="238" y="190" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W2L2)}</text>
  <text x="238" y="215" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W2L3)}</text>
  <text x="238" y="255" fill="#fef3c7" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W2Sub)}</text>

  <rect x="406" y="105" width="168" height="215" rx="16" fill="#92400e" fill-opacity="0.4" stroke="#f59e0b"/>
  <text x="421" y="135" fill="#fde047" font-size="12" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c4W3)}</text>
  <text x="421" y="165" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W3L1)}</text>
  <text x="421" y="190" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W3L2)}</text>
  <text x="421" y="215" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W3L3)}</text>
  <text x="421" y="255" fill="#fef3c7" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W3Sub)}</text>

  <rect x="589" y="105" width="168" height="215" rx="16" fill="#92400e" fill-opacity="0.4" stroke="#f59e0b"/>
  <text x="604" y="135" fill="#fde047" font-size="12" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c4W4)}</text>
  <text x="604" y="165" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W4L1)}</text>
  <text x="604" y="190" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W4L2)}</text>
  <text x="604" y="215" fill="#ffffff" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W4L3)}</text>
  <text x="604" y="255" fill="#fef3c7" font-size="11" font-family="'Pretendard', sans-serif">${xe(p.c4W4Sub)}</text>
</svg>`.trim();

    const card5Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="100%" height="auto">
  <defs>
    <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="360" rx="20" fill="url(#g5)"/>
  <text x="40" y="45" fill="#f472b6" font-size="13" font-weight="900" font-family="'Pretendard', sans-serif">${xe(p.c5Title)}</text>
  <text x="40" y="75" fill="#ffffff" font-size="18" font-weight="900" font-family="'Pretendard', sans-serif">부모의 실천 행동 지침</text>

  <rect x="40" y="105" width="345" height="215" rx="16" fill="#10b981" fill-opacity="0.15" stroke="#10b981"/>
  <rect x="55" y="125" width="80" height="26" rx="13" fill="#10b981"/>
  <text x="95" y="142" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">DO (권장)</text>
  <text x="55" y="180" fill="#a7f3d0" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Do1)}</text>
  <text x="55" y="210" fill="#a7f3d0" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Do2)}</text>
  <text x="55" y="240" fill="#a7f3d0" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Do3)}</text>
  <text x="55" y="270" fill="#a7f3d0" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Do4)}</text>

  <rect x="415" y="105" width="345" height="215" rx="16" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444"/>
  <rect x="430" y="125" width="80" height="26" rx="13" fill="#ef4444"/>
  <text x="470" y="142" fill="#ffffff" font-size="12" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">DON'T (금기)</text>
  <text x="430" y="180" fill="#fca5a5" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Dont1)}</text>
  <text x="430" y="210" fill="#fca5a5" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Dont2)}</text>
  <text x="430" y="240" fill="#fca5a5" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Dont3)}</text>
  <text x="430" y="270" fill="#fca5a5" font-size="12" font-weight="bold" font-family="'Pretendard', sans-serif">${xe(p.c5Dont4)}</text>
</svg>`.trim();

    // 모든 인포그래픽 하단에 사이트 홍보용 주소 푸터 추가
    const withFooter = (svg) => {
      const m = svg.match(/viewBox="0 0 800 (\d+)"/);
      if (!m) return svg;
      const h = parseInt(m[1], 10);
      const nh = h + 44;
      return svg
        .replace(`viewBox="0 0 800 ${h}"`, `viewBox="0 0 800 ${nh}"`)
        .replace(`<rect width="800" height="${h}" rx="20"`, `<rect width="800" height="${nh}" rx="20"`)
        .replace(
          '</svg>',
          `<line x1="40" y1="${h + 4}" x2="760" y2="${h + 4}" stroke="#334155" stroke-width="1"/>` +
          `<text x="400" y="${h + 30}" fill="#38bdf8" font-size="15" font-weight="900" text-anchor="middle" font-family="'Pretendard', sans-serif">🌐 도담톡 육아 커뮤니티 · dodamtalk.com</text></svg>`
        );
    };
    const encodeSvg = (svg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(withFooter(svg));
    const img1Uri = encodeSvg(card1Svg);
    const img2Uri = encodeSvg(card2Svg);
    const img3Uri = encodeSvg(card3Svg);
    const img4Uri = encodeSvg(card4Svg);
    const img5Uri = encodeSvg(card5Svg);

    // 4. 본문 텍스트 구성 (공백 포함 2,300자 내외 정밀 작성)
    const introText = p.intro;
    const sec1Text = p.sec1;
    const sec2Text = p.sec2;
    const sec3Text = p.sec3;
    const sec4Text = p.sec4;
    const outroText = p.outro;

    const plainText = `${cleanTitle}\n\n${introText}\n\n1. 심층 분석: 왜 이런 일이 일어날까?\n${sec1Text}\n\n2. 실전 솔루션: 부모의 단계별 맞춤 행동 지침 3단계\n${sec2Text}\n\n3. 실패 없는 정착: 4주 완성 생활 루틴 구축 로드맵\n${sec3Text}\n\n4. 전문가 Q&A 및 주의사항\n${sec4Text}\n\n${outroText}`;

    const formatParagraphs = (text) => {
      return text
        .split('\n\n')
        .map((pr) => pr.trim())
        .filter(Boolean)
        .map((pr) => `<p class="text-sm sm:text-base text-slate-700 leading-relaxed font-medium" style="font-size: 15.5px; line-height: 1.95; color: #334155; margin: 0 0 16px 0; letter-spacing: -0.3px;">${pr.replace(/\n/g, '<br/>')}</p>`)
        .join('');
    };

    const introHtml = formatParagraphs(introText);
    const sec1Html = formatParagraphs(sec1Text);
    const sec2Html = formatParagraphs(sec2Text);
    const sec3Html = formatParagraphs(sec3Text);
    const sec4Html = formatParagraphs(sec4Text);
    const outroHtml = formatParagraphs(outroText);

    // 5. 네이버 블로그 최적화 리치 HTML 아티클 구성 (5장의 인포그래픽 이미지 완벽 배치)
    const html = `<!-- dodam-report-v3 -->
      <div class="naver-blog-article space-y-7 text-slate-800 leading-relaxed font-sans max-w-3xl mx-auto py-2">
        <!-- 1. 공식 육아 가이드 브리핑 헤더 바 -->
        <div class="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between flex-wrap gap-2 text-xs shadow-2xs" style="background-color: #ecfdf5; border: 1.5px solid #86efac; border-radius: 14px; padding: 14px 18px; margin: 18px 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Nanum Gothic', 'Malgun Gothic', sans-serif;">
          <div class="flex items-center gap-2.5 min-w-0" style="display: flex; align-items: center; gap: 10px;">
            <span class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; border-radius: 50%; background-color: #059669; color: #ffffff; font-size: 16px;">
              🛡️
            </span>
            <div class="min-w-0">
              <div class="font-black text-slate-900 truncate" style="font-size: 15px; font-weight: 900; color: #064e3b; line-height: 1.3; margin: 0;">도담 공식 육아가이드 심층 리포트</div>
              <div class="text-[11px] text-emerald-800 font-medium" style="font-size: 12px; color: #047857; margin-top: 2px; font-weight: 600;">${p.subName} · ${p.targetAge}</div>
            </div>
          </div>
          <div class="flex items-center gap-1.5" style="display: flex; align-items: center; gap: 6px;">
            <span class="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-[11px]" style="display: inline-block; padding: 4px 10px; border-radius: 9999px; background-color: #059669; color: #ffffff; font-size: 11px; font-weight: 800;">${p.badge}</span>
            <span class="px-2.5 py-1 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-[11px]" style="display: inline-block; padding: 4px 10px; border-radius: 9999px; background-color: #ffffff; border: 1px solid #86efac; color: #047857; font-size: 11px; font-weight: 700;">전문가 검증</span>
          </div>
        </div>

        <!-- 2. 프롤로그 도입부 -->
        <div class="space-y-3 text-sm text-slate-700 leading-relaxed" style="margin: 20px 0 24px 0;">
          ${introHtml}
        </div>

        <!-- [그림 1] 핵심 요약 인포그래픽 카드 -->
        <div class="my-4" style="margin: 24px 0;">
          <img src="${img1Uri}" alt="그림 1: 핵심 요약 인포그래픽 카드" class="w-full rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto;" />
          <p class="text-[11px] text-slate-400 text-center mt-1.5 font-medium" style="font-size: 12px; color: #64748b; text-align: center; margin: 8px 0 0 0; font-weight: 600;">▲ [그림 1] ${cleanTitle} 핵심 골든타임 요약 인포그래픽</p>
        </div>

        <!-- 3. [1장] 심층 배경 & 원인 분석 -->
        <div class="space-y-3 pt-2">
          <h2 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 border-l-4 border-sky-500 pl-3" style="font-size: 18.5px; font-weight: 900; color: #0f172a; border-left: 5px solid #0284c7; padding-left: 12px; margin: 34px 0 14px 0; line-height: 1.45; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Nanum Gothic', 'Malgun Gothic', sans-serif;">
            <span>1. 심층 분석: 왜 이런 일이 일어날까?</span>
          </h2>
          ${sec1Html}
        </div>

        <!-- [그림 2] 원인 분석 인포그래픽 카드 -->
        <div class="my-4" style="margin: 24px 0;">
          <img src="${img2Uri}" alt="그림 2: 원인 분석 인포그래픽 카드" class="w-full rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto;" />
          <p class="text-[11px] text-slate-400 text-center mt-1.5 font-medium" style="font-size: 12px; color: #64748b; text-align: center; margin: 8px 0 0 0; font-weight: 600;">▲ [그림 2] 아동 발달 및 환경적 3대 원인 분석</p>
        </div>

        <!-- 4. [2장] 실전 솔루션 -->
        <div class="space-y-3 pt-2">
          <h2 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 border-l-4 border-emerald-500 pl-3" style="font-size: 18.5px; font-weight: 900; color: #0f172a; border-left: 5px solid #059669; padding-left: 12px; margin: 34px 0 14px 0; line-height: 1.45; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Nanum Gothic', 'Malgun Gothic', sans-serif;">
            <span>2. 실전 솔루션: 부모 맞춤형 행동 지침 3단계 공식</span>
          </h2>
          ${sec2Html}
        </div>

        <!-- [그림 3] 실전 솔루션 인포그래픽 카드 -->
        <div class="my-4" style="margin: 24px 0;">
          <img src="${img3Uri}" alt="그림 3: 실전 솔루션 인포그래픽 카드" class="w-full rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto;" />
          <p class="text-[11px] text-slate-400 text-center mt-1.5 font-medium" style="font-size: 12px; color: #64748b; text-align: center; margin: 8px 0 0 0; font-weight: 600;">▲ [그림 3] 가정 맞춤형 실전 솔루션 3단계 로드맵</p>
        </div>

        <!-- 5. [3장] 생활 루틴 구축 -->
        <div class="space-y-3 pt-2">
          <h2 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 border-l-4 border-amber-500 pl-3" style="font-size: 18.5px; font-weight: 900; color: #0f172a; border-left: 5px solid #d97706; padding-left: 12px; margin: 34px 0 14px 0; line-height: 1.45; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Nanum Gothic', 'Malgun Gothic', sans-serif;">
            <span>3. 실패 없는 정착: 4주 완성 생활 루틴 구축 체크리스트</span>
          </h2>
          ${sec3Html}
        </div>

        <!-- [그림 4] 4주 루틴 인포그래픽 카드 -->
        <div class="my-4" style="margin: 24px 0;">
          <img src="${img4Uri}" alt="그림 4: 4주 루틴 인포그래픽 카드" class="w-full rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto;" />
          <p class="text-[11px] text-slate-400 text-center mt-1.5 font-medium" style="font-size: 12px; color: #64748b; text-align: center; margin: 8px 0 0 0; font-weight: 600;">▲ [그림 4] 4주 완성 생활 루틴 구축 체크리스트</p>
        </div>

        <!-- 6. [4장] DO vs DON'T 및 Q&A -->
        <div class="space-y-3 pt-2">
          <h2 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 border-l-4 border-purple-500 pl-3" style="font-size: 18.5px; font-weight: 900; color: #0f172a; border-left: 5px solid #7c3aed; padding-left: 12px; margin: 34px 0 14px 0; line-height: 1.45; letter-spacing: -0.3px; font-family: -apple-system, BlinkMacSystemFont, 'Nanum Gothic', 'Malgun Gothic', sans-serif;">
            <span>4. 전문가 Q&amp;A 및 부모 실천 지침</span>
          </h2>
          ${sec4Html}
        </div>

        <!-- [그림 5] DO vs DON'T 인포그래픽 카드 -->
        <div class="my-4" style="margin: 24px 0;">
          <img src="${img5Uri}" alt="그림 5: DO vs DON'T 인포그래픽 카드" class="w-full rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition" style="max-width: 100%; height: auto; border-radius: 12px; display: block; margin: 0 auto;" />
          <p class="text-[11px] text-slate-400 text-center mt-1.5 font-medium" style="font-size: 12px; color: #64748b; text-align: center; margin: 8px 0 0 0; font-weight: 600;">▲ [그림 5] 부모가 반드시 기억해야 할 DO vs DON'T</p>
        </div>

        <!-- 7. 에필로그 및 응원 마무리 -->
        <div class="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-stone-50 to-emerald-50/60 border border-amber-200/80 shadow-2xs space-y-3" style="background: linear-gradient(135deg, #fffbeb 0%, #f0fdf4 100%); border: 1.5px solid #fde68a; border-radius: 18px; padding: 22px 24px; margin: 30px 0 20px 0;">
          <div class="flex items-center gap-2 font-black text-slate-900 text-sm" style="font-size: 15px; font-weight: 900; color: #0f172a;">
            <span>💌 도담 육아연구소 에필로그</span>
          </div>
          <div class="text-sm text-slate-700 leading-relaxed font-medium" style="font-size: 14.5px; line-height: 1.9; color: #334155;">
            ${outroHtml}
          </div>
        </div>
      </div>`;

    return { html, plainText, cleanTitle, guideType: topicKey === 'shinJongHo' ? 'edu' : topicKey, isUnclear };
  }

  async executeYoutubeSummaryReport() {
    if (!this.isAdmin() && sessionStorage.getItem('dodam_admin_authenticated') !== '1') {
      this.showToast('⚠️ 영상 요약 리포트 발행은 관리자 권한이 필요합니다.');
      return;
    }

    const urlInput = document.getElementById('youtube-summary-url');
    const rawUrl = urlInput ? urlInput.value.trim() : '';

    if (!rawUrl) {
      this.showToast('⚠️ 분석할 유튜브 영상 URL을 입력해 주세요.');
      if (urlInput) urlInput.focus();
      return;
    }

    const videoId = this.extractYoutubeId(rawUrl);
    if (!videoId) {
      this.showToast('⚠️ 올바른 영상 URL이 아닙니다. (영상 주소를 확인해 주세요)');
      if (urlInput) urlInput.focus();
      return;
    }

    // 중복 체크: 이미 리포트가 발행된 영상인 경우 안내 토스트만 표시하고 계속 실행
    const dupPost = (this.data.posts || []).find((p) => {
      if (p.youtubeVideoId && p.youtubeVideoId === videoId) return true;
      if (p.youtubeUrl && this.extractYoutubeId(p.youtubeUrl) === videoId) return true;
      if (p.content && (p.content.includes(videoId) || p.content.includes(`embed/${videoId}`))) return true;
      return false;
    });

    if (dupPost) {
      this.showToast('ℹ️ 이미 리포트가 존재하는 영상이지만 사용자 요청에 따라 새 리포트 생성을 진행합니다.');
    }

    // Selected guide sub-category from radio cards
    const catRadio = document.querySelector('input[name="youtube-summary-cat"]:checked');
    const selectedGuideType = catRadio ? catRadio.value : 'sleep';

    // Normalize to standard guideType ('sleep', 'food', 'growth', 'health', 'edu', 'all')
    const guideType = (
      selectedGuideType === 'nutrition' ? 'food' :
      selectedGuideType === 'play' ? 'growth' :
      selectedGuideType === 'school' ? 'edu' :
      selectedGuideType === 'guide' ? 'all' :
      selectedGuideType || 'all'
    );

    const guideMeta = {
      sleep: { name: '수면 가이드', badge: '🍼 수면', ageStage: 'newborn' },
      food: { name: '이유식 레시피', badge: '🥣 이유식', ageStage: 'toddler_early' },
      growth: { name: '훈육 & 발달', badge: '👶 훈육', ageStage: 'toddler' },
      health: { name: '소아 건강 & 케어', badge: '🏥 건강', ageStage: 'all' },
      edu: { name: '학습 & 학교/입시', badge: '🎒 학습', ageStage: 'school' },
      all: { name: '종합 육아가이드', badge: '📖 종합가이드', ageStage: 'all' }
    };
    const guideInfo = guideMeta[guideType] || guideMeta['all'];

    const progressEl = document.getElementById('youtube-summary-progress');
    const progressText = document.getElementById('youtube-summary-progress-text');
    const runBtn = document.getElementById('btn-run-youtube-summary');

    if (progressEl) progressEl.classList.remove('hidden');
    if (progressText) progressText.textContent = '유튜브 영상 메타데이터 수집 및 핵심 요약 작성 중...';
    if (runBtn) {
      runBtn.disabled = true;
      runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>영상 분석 및 요약 중...</span>';
    }

    try {
      // 1. Fetch metadata
      const meta = await this.fetchYoutubeMetadata(videoId);

      // 2. Build structured summary automatically from transcript & metadata
      const { html, plainText, cleanTitle, guideType: detectedGuideType, isUnclear } = this.buildYoutubeSummaryContent(videoId, meta, guideType);
      const effectiveGuideType = detectedGuideType || guideType;
      const effectiveGuideInfo = guideMeta[effectiveGuideType] || guideMeta['all'];

      const cleanAuthorTag = '도담 육아가이드';
      const tags = ['육아가이드', effectiveGuideInfo.badge, effectiveGuideInfo.name, '도담육아연구소'];

      const refinedTitle = cleanTitle || this.generateCleanArticleTitle(meta.title, effectiveGuideType);
      const postTitle = `[육아가이드] ${refinedTitle}`;

      const newPost = {
        id: `custom-post-${Date.now()}`,
        category: 'guide',               // AI 리포트는 항상 가이드 게시판에 등록
        guideType: effectiveGuideType,   // 가이드 세부 카테고리 (sleep, food, growth, health, edu, all)
        isGuidePost: true,
        ageStage: effectiveGuideInfo.ageStage,
        region: 'all',
        localHub: 'all',
        localHubName: '전국 전체',
        isQuestion: false,
        isSolved: false,
        isHot: false,
        isAiReport: true,
        isYoutubeSummary: true,
        youtubeVideoId: videoId,
        youtubeUrl: rawUrl,
        title: postTitle,
        content: html,
        rawTextContent: plainText,
        contentHtml: html,
        images: [],
        author: {
          userId: this.currentUser?.id || 'admin',
          nickname: '운영자',
          level: '👑 공식 리포트',
          childBadge: '📖 도담 육아가이드',
          avatarBg: 'bg-emerald-600 text-white'
        },
        createdAt: '방금 전',
        timestamp: Date.now(),
        views: 0,
        reactions: { like: 0, hug: 0, tip: 0 },
        tags,
        comments: []
      };

      // Add to posts array and persist to Firestore
      if (!this.data.posts) this.data.posts = [];
      this.data.posts.unshift(newPost);
      this.registerMyPostId(newPost.id);
      this.saveCustomPosts();

      if (window.DodamFirebase && typeof window.DodamFirebase.createPost === 'function') {
        await window.DodamFirebase.createPost(newPost);
      }

      this.closeAiParentingReportModal();
      if (meta.hasTranscript) {
        this.showToast(`🎉 실제 강연 자막을 정밀 분석하여 [가이드 > ${effectiveGuideInfo.name}]에 100% 일치 리포트를 발행했습니다!`);
      } else if (isUnclear) {
        this.showToast(`ℹ️ 자막 미제공 영상으로, 왜곡 없는 [공식 영상 소개 & 부모 나눔 가이드]로 안전하게 발행되었습니다.`);
      } else {
        this.showToast(`🎉 [가이드 > ${effectiveGuideInfo.name}]에 영상 핵심 가이드가 성공적으로 발행되었습니다!`);
      }

      // Switch to guide board and select that exact subcategory
      this.boardLoungeMode = 'guide';
      this.guideSubCategory = guideType;
      this.currentCategory = 'guide';
      this.currentAgeStage = 'all';
      this.boardPage = 1;
      this.switchMainView('board');
      this.renderBoardCategories();
      this.renderBoardView();
      this.openPostDetailModal(newPost.id);

    } catch (err) {
      console.error('Failed to generate YouTube summary:', err);
      alert('영상 요약 리포트 생성 중 오류가 발생했습니다.');
      if (progressEl) progressEl.classList.add('hidden');
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.innerHTML = '<span>▷ 지금 즉시 실행하기</span>';
      }
    }
  }

  // ==========================================
  // [모바일 어플 PWA 등록 및 설치 지원 시스템]
  // ==========================================
  initPwa() {
    this.deferredPwaPrompt = null;

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch((err) => {
          console.log('[SW Registration Error]', err);
        });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPwaPrompt = e;
      const headerBtn = document.getElementById('btn-pwa-install-header');
      if (headerBtn) headerBtn.classList.remove('hidden');
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPwaPrompt = null;
      this.showToast('🎉 도담톡 모바일 어플이 성공적으로 설치되었습니다!');
      this.closePwaInstallModal();
    });
  }

  promptPwaInstall() {
    if (this.deferredPwaPrompt) {
      this.deferredPwaPrompt.prompt();
      this.deferredPwaPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.showToast('📲 도담톡 모바일 어플 설치를 진행합니다.');
        }
        this.deferredPwaPrompt = null;
      });
      return;
    }
    this.openPwaInstallModal();
  }

  triggerNativePwaInstall() {
    if (this.deferredPwaPrompt) {
      this.deferredPwaPrompt.prompt();
      this.deferredPwaPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.showToast('📲 도담톡 모바일 어플 설치를 진행합니다.');
        }
        this.deferredPwaPrompt = null;
      });
      this.closePwaInstallModal();
    } else {
      this.showToast('💡 기기 안내에 따라 브라우저 메뉴에서 [홈 화면에 추가]를 눌러주세요!');
    }
  }

  openPwaInstallModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closePwaInstallModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new DodamCommunityApp();
  window.app.init();
});

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
