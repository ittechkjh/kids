// 도담톡 (DodamTalk) - 통합 관리자 센터 기본 설정
// ※ 모든 방문자·트래픽·기기·기능 이용 통계는 고정값 없이 Cloud Firestore 실측 데이터로 집계됩니다.
(function () {
  const DEFAULT_USERS = [
    {
      id: 'admin',
      username: 'admin',
      passwordHash: 'admin1234',
      nickname: '도담 공식 관리자',
      email: 'admin@dodamtalk.kr',
      role: 'admin',
      roleName: 'SUPER ADMIN',
      avatar: 'fa-shield-halved',
      avatarBg: 'from-purple-600 to-indigo-600',
      createdAt: '2026-10-01',
      lastLogin: '2026-11-09',
      status: 'active',
      statusLabel: '정상 승인'
    }
  ];

  // 과거 버전에 포함되어 있던 샘플(가짜) 회원 계정 식별자 — DB에 남아 있어도 자동 제외
  const LEGACY_SAMPLE_USER_IDS = ['user_1', 'user_2'];
  const LEGACY_SAMPLE_USERNAMES = ['dodam_mom', 'daechi_papa'];

  window.DODAM_ADMIN_DATA = {
    defaultUsers: DEFAULT_USERS,
    legacySampleUserIds: LEGACY_SAMPLE_USER_IDS,
    legacySampleUsernames: LEGACY_SAMPLE_USERNAMES,
    dailyTraffic14Days: [],
    featureUsageStats: {
      today: { totalCalls: 0, items: [] },
      cumulative: { totalCalls: 0, items: [] }
    },
    deviceBrowserStats: {
      today: {
        totalVisitors: 0,
        devices: {
          mobile: { percent: 0, count: 0, cumPercent: 0 },
          desktop: { percent: 0, count: 0, cumPercent: 0 }
        },
        browsers: []
      },
      cumulative: {
        totalVisitors: 0,
        devices: {
          mobile: { percent: 0, count: 0, cumPercent: 0 },
          desktop: { percent: 0, count: 0, cumPercent: 0 }
        },
        browsers: []
      }
    },
    apiStatus: []
  };
})();
