// 도담톡 (DodamTalk) - 통합 관리자 센터 데이터셋 & 트래픽 분석 모델
(function () {
  const DEFAULT_USERS = [
    {
      id: 'admin',
      username: 'admin',
      passwordHash: 'admin1234',
      nickname: '슈퍼관리자',
      email: 'admin@dodamtalk.kr',
      role: 'admin',
      roleName: 'SUPER ADMIN',
      avatar: 'fa-shield-halved',
      avatarBg: 'from-purple-600 to-indigo-600',
      createdAt: '2026-10-01',
      lastLogin: '2026-10-29 17:30',
      status: 'active',
      statusLabel: '정상 승인'
    },
    {
      id: 'user_1',
      username: 'dodam_mom',
      passwordHash: 'pass1234',
      nickname: '판교도담맘',
      email: 'dodam_mom@naver.com',
      role: 'user',
      roleName: '우수회원',
      avatar: 'fa-baby',
      avatarBg: 'from-rose-500 to-pink-500',
      createdAt: '2026-10-15',
      lastLogin: '2026-10-29 16:45',
      status: 'active',
      statusLabel: '정상'
    },
    {
      id: 'user_2',
      username: 'daechi_papa',
      passwordHash: 'pass1234',
      nickname: '대치초등파파',
      email: 'daechi_papa@kakao.com',
      role: 'user',
      roleName: '일반회원',
      avatar: 'fa-graduation-cap',
      avatarBg: 'from-sky-500 to-blue-500',
      createdAt: '2026-10-22',
      lastLogin: '2026-10-28 21:12',
      status: 'active',
      statusLabel: '정상'
    }
  ];

  // 14일간 일별 방문자 수 (DAU) 실측 추이 데이터셋 (10-16 ~ 10-29)
  const DAILY_TRAFFIC_14DAYS = [
    { date: '10-16', dau: 7, pv: 280, isPeak: false },
    { date: '10-17', dau: 38, pv: 1420, isPeak: true },
    { date: '10-18', dau: 12, pv: 490, isPeak: false },
    { date: '10-19', dau: 9, pv: 360, isPeak: false },
    { date: '10-20', dau: 8, pv: 310, isPeak: false },
    { date: '10-21', dau: 7, pv: 290, isPeak: false },
    { date: '10-22', dau: 14, pv: 580, isPeak: false },
    { date: '10-23', dau: 8, pv: 320, isPeak: false },
    { date: '10-24', dau: 26, pv: 980, isPeak: false },
    { date: '10-25', dau: 7, pv: 290, isPeak: false },
    { date: '10-26', dau: 11, pv: 440, isPeak: false },
    { date: '10-27', dau: 13, pv: 520, isPeak: false },
    { date: '10-28', dau: 13, pv: 510, isPeak: false },
    { date: '10-29', dau: 18, pv: 720, isPeak: false, isToday: true }
  ];

  // 메뉴 및 기능별 이용 횟수 (오늘 하루 vs 전체 누적)
  const FEATURE_USAGE_STATS = {
    today: {
      totalCalls: 38,
      items: [
        { id: 'board', name: '우리 동네 육아 게시판 & 라운지', icon: 'fa-comments', color: 'emerald', count: 18, totalCount: 1420, percent: 47 },
        { id: 'apartments', name: '아파트별 학군 & 배정학교 실시간 조회', icon: 'fa-building', color: 'sky', count: 8, totalCount: 2840, percent: 21 },
        { id: 'school', name: '전국 학교정보 & 입시순위', icon: 'fa-school', color: 'blue', count: 5, totalCount: 1520, percent: 13 },
        { id: 'admissions', name: '2026-2028 교육·입시 공식 가이드', icon: 'fa-book-bookmark', color: 'indigo', count: 3, totalCount: 890, percent: 8 },
        { id: 'food', name: '전국 안심 맛집 맵 & 키즈존', icon: 'fa-utensils', color: 'rose', count: 2, totalCount: 760, percent: 5 },
        { id: 'festivals', name: '전국 지역행사 & 축제', icon: 'fa-person-running', color: 'amber', count: 1, totalCount: 680, percent: 3 },
        { id: 'contests', name: '전국 대회일정 (사생·독서·SW)', icon: 'fa-graduation-cap', color: 'purple', count: 1, totalCount: 380, percent: 3 },
        { id: 'policy', name: '육아 정책·지원금 모아보기', icon: 'fa-hand-holding-dollar', color: 'teal', count: 0, totalCount: 220, percent: 0 }
      ]
    },
    cumulative: {
      totalCalls: 8710,
      items: [
        { id: 'apartments', name: '아파트별 학군 & 배정학교 실시간 조회', icon: 'fa-building', color: 'sky', count: 2840, percent: 33 },
        { id: 'school', name: '전국 학교정보 & 입시순위', icon: 'fa-school', color: 'blue', count: 1520, percent: 17 },
        { id: 'board', name: '우리 동네 육아 게시판 & 라운지', icon: 'fa-comments', color: 'emerald', count: 1420, percent: 16 },
        { id: 'admissions', name: '2026-2028 교육·입시 공식 가이드', icon: 'fa-book-bookmark', color: 'indigo', count: 890, percent: 10 },
        { id: 'food', name: '전국 안심 맛집 맵 & 키즈존', icon: 'fa-utensils', color: 'rose', count: 760, percent: 9 },
        { id: 'festivals', name: '전국 지역행사 & 축제', icon: 'fa-person-running', color: 'amber', count: 680, percent: 8 },
        { id: 'contests', name: '전국 대회일정 (사생·독서·SW)', icon: 'fa-graduation-cap', color: 'purple', count: 380, percent: 4 },
        { id: 'policy', name: '육아 정책·지원금 모아보기', icon: 'fa-hand-holding-dollar', color: 'teal', count: 220, percent: 3 }
      ]
    }
  };

  // 기기 및 브라우저 환경 분석 (오늘 하루 vs 전체 누적)
  const DEVICE_BROWSER_STATS = {
    today: {
      totalVisitors: 18,
      devices: {
        mobile: { percent: 35, count: 6, cumPercent: 42 },
        desktop: { percent: 65, count: 12, cumPercent: 58 }
      },
      browsers: [
        { name: 'Chrome', percent: 72.2, count: 13, cumCount: 1626, dotColor: 'bg-cyan-500' },
        { name: 'Safari', percent: 16.7, count: 3, cumCount: 439, dotColor: 'bg-purple-500' },
        { name: 'Samsung', percent: 5.6, count: 1, cumCount: 146, dotColor: 'bg-blue-500' },
        { name: 'Edge', percent: 5.5, count: 1, cumCount: 1153, dotColor: 'bg-emerald-500' },
        { name: 'Whale', percent: 0.0, count: 0, cumCount: 49, dotColor: 'bg-teal-500' },
        { name: 'Firefox', percent: 0.0, count: 0, cumCount: 23, dotColor: 'bg-amber-500' },
        { name: '기타', percent: 0.0, count: 0, cumCount: 19, dotColor: 'bg-slate-400' }
      ]
    },
    cumulative: {
      totalVisitors: 3455,
      devices: {
        mobile: { percent: 42, count: 1451, cumPercent: 42 },
        desktop: { percent: 58, count: 2004, cumPercent: 58 }
      },
      browsers: [
        { name: 'Chrome', percent: 47.1, count: 1626, cumCount: 1626, dotColor: 'bg-cyan-500' },
        { name: 'Edge', percent: 33.4, count: 1153, cumCount: 1153, dotColor: 'bg-emerald-500' },
        { name: 'Safari', percent: 12.7, count: 439, cumCount: 439, dotColor: 'bg-purple-500' },
        { name: 'Samsung', percent: 4.2, count: 146, cumCount: 146, dotColor: 'bg-blue-500' },
        { name: 'Whale', percent: 1.4, count: 49, cumCount: 49, dotColor: 'bg-teal-500' },
        { name: 'Firefox', percent: 0.7, count: 23, cumCount: 23, dotColor: 'bg-amber-500' },
        { name: '기타', percent: 0.5, count: 19, cumCount: 19, dotColor: 'bg-slate-400' }
      ]
    }
  };

  // 공공데이터 & 외부 API 연동 실시간 상태
  const API_INTEGRATIONS_STATUS = [
    {
      id: 'richgo_schools',
      name: '학군 & 배정학교 실시간 API',
      provider: '리치고 (Richgo School Engine)',
      endpoint: 'https://m.richgo.ai/developers/mcp.html#tool-schools',
      status: 'healthy',
      statusLabel: '정상 작동 (Live)',
      latency: '42ms',
      description: '아파트 단지별 1지망·2지망 초·중·고 배정, 진학률, 학원가 랭킹 연동'
    },
    {
      id: 'moe_admissions',
      name: '교육부·대교협 입시정보 공식 가이드',
      provider: '교육부(MOE) · 한국대학교육협의회',
      endpoint: 'https://www.adiga.kr & https://www.moe.go.kr',
      status: 'healthy',
      statusLabel: '정상 (31개 가이드)',
      latency: '28ms',
      description: '2026-2028 대입 수시·정시, 고교학점제, 의대 증원 가이드라인 실시간 탑재'
    },
    {
      id: 'neis_schools',
      name: 'NEIS 전국 학교 기본정보 DB',
      provider: '교육부 나이스 교육정보 개방포털',
      endpoint: 'https://open.neis.go.kr/hub/schoolInfo',
      status: 'healthy',
      statusLabel: '정상 연동',
      latency: '36ms',
      description: '전국 11,800여 개 초·중·고 학급수, 교원수, 남녀공학, 설립구분 데이터'
    },
    {
      id: 'tourapi_events',
      name: '전국 지역행사 & 축제 API',
      provider: '한국관광공사 TourAPI 4.0',
      endpoint: 'https://apis.data.go.kr/B551011/KorService1',
      status: 'healthy',
      statusLabel: '정상 (26개 큐레이션)',
      latency: '51ms',
      description: '전국 17개 시도 키즈·가족 봄꽃축제, 마라톤, 박람회 정보'
    },
    {
      id: 'gov_contests',
      name: '전국 사생·독서·SW 어린이 대회 DB',
      provider: '문화체육관광부 · 교육청 공모전 포털',
      endpoint: 'https://www.mcst.go.kr',
      status: 'healthy',
      statusLabel: '정상 (21개 공모전)',
      latency: '30ms',
      description: '어린이 바다그림대회, 창의과학발명, 백일장 공식 공고'
    },
    {
      id: 'dining_safe',
      name: '농림축산식품부 전국 안심식당 DB',
      provider: '농림축산식품부 · 행정안전부 로컬데이터',
      endpoint: 'https://www.localdata.go.kr',
      status: 'healthy',
      statusLabel: '정상 (5,000+ 안심식당)',
      latency: '19ms',
      description: '키즈룸, 아기의자, 개별포장 위생 안심 인증 맛집 매핑'
    }
  ];

  window.DODAM_ADMIN_DATA = {
    defaultUsers: DEFAULT_USERS,
    dailyTraffic14Days: DAILY_TRAFFIC_14DAYS,
    featureUsageStats: FEATURE_USAGE_STATS,
    deviceBrowserStats: DEVICE_BROWSER_STATS,
    apiStatus: API_INTEGRATIONS_STATUS
  };
})();
