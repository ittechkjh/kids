// 아이키움 맵 (KidsInfra) - 핵심 거점 신도시 공공데이터 하이브리드 프리셋 & 스키마
window.KIDS_INFRA_DATA = {
  regions: [
    {
      id: 'pangyo',
      name: '분당·판교 신도시',
      shortName: '분당·판교',
      badge: '맞벌이 최선호',
      center: [37.3947, 127.1112],
      zoom: 14,
      description: 'IT 맞벌이 부부 비중이 높고 국공립·직장 어린이집 및 혁신초 학군이 밀집된 대표 거점'
    },
    {
      id: 'songpa',
      name: '송파·위례 권역',
      shortName: '송파·위례',
      badge: '대단지 초품아',
      center: [37.4979, 127.1076],
      zoom: 14,
      description: '초대형 평지 초품아 단지와 서울아산·삼성서울 등 상급 소아응급 의료망 접근성 최상위 지역'
    },
    {
      id: 'dongtan',
      name: '화성 동탄2신도시',
      shortName: '동탄2신도시',
      badge: '영유아 비율 1위',
      center: [37.2005, 127.0985],
      zoom: 14,
      description: '전국 영유아 인구 비중 최상위권으로 달빛어린이병원·유아숲·신설 초품아가 특화된 육아 특구'
    },
    {
      id: 'sejong',
      name: '세종특별자치시 (새롬·나성)',
      shortName: '세종시',
      badge: '국공립 보육 1위',
      center: [36.4852, 127.2535],
      zoom: 14,
      description: '보행자 전용 데크형 안심 통학로와 전국 최고 수준의 국공립 어린이집·공공도서관 인프라'
    },
    {
      id: 'gangnam',
      name: '강남 대치·개포 권역',
      shortName: '강남·개포',
      badge: '명문 학군·신축',
      center: [37.4882, 127.0615],
      zoom: 14,
      description: '개포 신축 대단지 초품아와 대치동 사교육·주말 과학/독서 문화 인프라가 결합된 교육 1번지'
    }
  ],

  apartments: [
    {
      id: 'apt-pangyo-1',
      code: 'PG-101',
      regionId: 'pangyo',
      name: '판교 푸르지오 그랑블',
      address: '경기도 성남시 분당구 동판교로 123 (백현동)',
      lat: 37.3928,
      lng: 127.1126,
      households: 948,
      builtYear: 2011,
      recommendedAges: ['infant', 'toddler', 'elem_low', 'elem_high'],
      school: {
        name: '보평초등학교',
        lat: 37.3941,
        lng: 127.1145,
        distanceM: 190,
        walkMin: 3,
        isChopuma: true,
        crosswalkCount: 0,
        hasMajorRoadCrossing: false,
        studentsPerClass: 24.2,
        afterSchoolCareRate: 94,
        schoolZoneCctvCount: 14,
        accidentHistoryCount: 0,
        routeDesc: '단지 북측 보행전용 육교·공원 산책로를 통해 차도 횡단 없이 교문 직결',
        routeCoords: [
          [37.3928, 127.1126],
          [37.3934, 127.1135],
          [37.3941, 127.1145]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '24억 8,000만',
        sale84Num: 248000,
        jeonse84: '11억 5,000만',
        jeonse84Num: 115000,
        recentDate: '2026.10 실거래',
        trend: '+2.4% (전분기 대비)'
      },
      scores: {
        safety: 98,
        medical: 91,
        childcare: 95,
        culture: 94,
        total: 95,
        grade: 'S',
        summaryTag: '차도 없는 완전 초품아 & 판교역 맞벌이 최강 인프라'
      },
      commute: {
        pangyoMin: 7,
        gangnamMin: 22,
        gwanghwamunMin: 48
      },
      academyCount: 142,
      tags: ['#완전초품아', '#보평초배정', '#판교역도보권', '#국공립단지내2곳', '#탄천유아숲'],
      reviews: [
        { author: '7세·초2 워킹맘', rating: 5.0, text: '보평초까지 횡단보도 하나도 안 건너고 공원길로 3분이면 가요. 맞벌이에게 천국입니다.', date: '2026.10.18' },
        { author: '4세 남아 아빠', rating: 4.8, text: '단지 내 국공립어린이집과 판교어린이도서관이 코앞이라 주말마다 도서관 출첵합니다.', date: '2026.10.09' }
      ]
    },
    {
      id: 'apt-pangyo-2',
      code: 'PG-102',
      regionId: 'pangyo',
      name: '판교 원마을 9단지 한림풀에버',
      address: '경기도 성남시 분당구 판교로 50 (판교동)',
      lat: 37.3982,
      lng: 127.0968,
      households: 1045,
      builtYear: 2009,
      recommendedAges: ['toddler', 'elem_low', 'elem_high'],
      school: {
        name: '판교초등학교',
        lat: 37.3995,
        lng: 127.0951,
        distanceM: 280,
        walkMin: 5,
        isChopuma: false,
        crosswalkCount: 1,
        hasMajorRoadCrossing: false,
        studentsPerClass: 22.8,
        afterSchoolCareRate: 91,
        schoolZoneCctvCount: 11,
        accidentHistoryCount: 1,
        routeDesc: '단지 정문 스마트 횡단보도(바닥 신호등+음성안내) 1회 횡단 후 스쿨존 보행로 진입',
        routeCoords: [
          [37.3982, 127.0968],
          [37.3989, 127.0960],
          [37.3995, 127.0951]
        ],
        accidentSpots: [
          { lat: 37.3989, lng: 127.0960, desc: '2024년 우회전 차량 경미 접촉 1건 (스마트 바닥신호등 설치 완료)' }
        ]
      },
      prices: {
        sale84: '17억 9,000만',
        sale84Num: 179000,
        jeonse84: '8억 8,000만',
        jeonse84Num: 88000,
        recentDate: '2026.10 실거래',
        trend: '+1.5% (전분기 대비)'
      },
      scores: {
        safety: 88,
        medical: 89,
        childcare: 90,
        culture: 93,
        total: 90,
        grade: 'A+',
        summaryTag: '판교도서관·청소년수련관 인접 독서·생태 교육 특화 단지'
      },
      commute: {
        pangyoMin: 14,
        gangnamMin: 31,
        gwanghwamunMin: 55
      },
      academyCount: 98,
      tags: ['#서판교가성비', '#판교도서관인접', '#생태학습원', '#스마트스쿨존'],
      reviews: [
        { author: '초1·초4 학부모', rating: 4.7, text: '판교도서관과 공원이 바로 뒤라 아이 정서에 최고예요. 학원가도 셔틀이 다 옵니다.', date: '2026.10.12' }
      ]
    },
    {
      id: 'apt-songpa-1',
      code: 'SP-201',
      regionId: 'songpa',
      name: '송파 헬리오시티',
      address: '서울특별시 송파구 송파대로 345 (가락동)',
      lat: 37.4979,
      lng: 127.1076,
      households: 9510,
      builtYear: 2018,
      recommendedAges: ['infant', 'toddler', 'elem_low', 'elem_high'],
      school: {
        name: '서울가락초등학교 / 해누리초 (단지내)',
        lat: 37.4991,
        lng: 127.1062,
        distanceM: 150,
        walkMin: 2,
        isChopuma: true,
        crosswalkCount: 0,
        hasMajorRoadCrossing: false,
        studentsPerClass: 25.4,
        afterSchoolCareRate: 92,
        schoolZoneCctvCount: 22,
        accidentHistoryCount: 0,
        routeDesc: '9,510세대 지상 차 없는 공원형 단지 내부 산책로로 해누리초·가락초 완벽 직결',
        routeCoords: [
          [37.4979, 127.1076],
          [37.4985, 127.1068],
          [37.4991, 127.1062]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '22억 9,000만',
        sale84Num: 229000,
        jeonse84: '10억 6,000만',
        jeonse84Num: 106000,
        recentDate: '2026.10 실거래',
        trend: '+3.1% (전분기 대비)'
      },
      scores: {
        safety: 99,
        medical: 97,
        childcare: 94,
        culture: 92,
        total: 96,
        grade: 'S',
        summaryTag: '단지 내 초·중 품은 9,510세대 공원형 단지 + 상급 소아응급 10분권'
      },
      commute: {
        pangyoMin: 25,
        gangnamMin: 18,
        gwanghwamunMin: 44
      },
      academyCount: 215,
      tags: ['#초품아끝판왕', '#지상차없는단지', '#단지내어린이집7곳', '#서울아산소아응급10분'],
      reviews: [
        { author: '5세·초3 맞벌이맘', rating: 5.0, text: '단지 안에 초등학교 2곳, 어린이집 7곳, 단지 상가에 소아과만 4곳이라 단지 밖으로 나갈 일이 없어요.', date: '2026.10.21' },
        { author: '2세 영아 대디', rating: 4.9, text: '유모차 끌고 단지 한 바퀴 도는 데만 40분 걸리는 평지 공원이라 영아 키우기 정말 좋습니다.', date: '2026.10.14' }
      ]
    },
    {
      id: 'apt-songpa-2',
      code: 'SP-202',
      regionId: 'songpa',
      name: '잠실 엘스 (Jamsil Els)',
      address: '서울특별시 송파구 올림픽로 99 (잠실동)',
      lat: 37.5131,
      lng: 127.0816,
      households: 5678,
      builtYear: 2008,
      recommendedAges: ['toddler', 'elem_low', 'elem_high'],
      school: {
        name: '서울잠일초등학교',
        lat: 37.5142,
        lng: 127.0804,
        distanceM: 180,
        walkMin: 3,
        isChopuma: true,
        crosswalkCount: 0,
        hasMajorRoadCrossing: false,
        studentsPerClass: 24.8,
        afterSchoolCareRate: 90,
        schoolZoneCctvCount: 18,
        accidentHistoryCount: 0,
        routeDesc: '단지 내부 보행자 전용 광장을 통해 잠일초·신천중·잠일고 모두 차도 없이 통학 가능',
        routeCoords: [
          [37.5131, 127.0816],
          [37.5137, 127.0810],
          [37.5142, 127.0804]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '26억 7,000만',
        sale84Num: 267000,
        jeonse84: '11억 9,000만',
        jeonse84Num: 119000,
        recentDate: '2026.10 실거래',
        trend: '+2.8% (전분기 대비)'
      },
      scores: {
        safety: 98,
        medical: 96,
        childcare: 91,
        culture: 95,
        total: 95,
        grade: 'S',
        summaryTag: '초·중·고 모두 품은 한강공원 인접 정통 엘리트 육아 단지'
      },
      commute: {
        pangyoMin: 32,
        gangnamMin: 14,
        gwanghwamunMin: 42
      },
      academyCount: 188,
      tags: ['#초중고품아', '#잠실한강공원', '#어린이도서관단지내', '#2호선9호선더블역세권'],
      reviews: [
        { author: '초2·초5 학부모', rating: 4.9, text: '초중고가 다 단지 안에 있어서 고등학교 졸업할 때까지 이사 걱정이 없습니다.', date: '2026.10.15' }
      ]
    },
    {
      id: 'apt-dongtan-1',
      code: 'DT-301',
      regionId: 'dongtan',
      name: '동탄역 롯데캐슬',
      address: '경기도 화성시 동탄역로 150 (오산동)',
      lat: 37.2005,
      lng: 127.0985,
      households: 940,
      builtYear: 2021,
      recommendedAges: ['infant', 'toddler', 'elem_low'],
      school: {
        name: '청계초등학교',
        lat: 37.2028,
        lng: 127.1018,
        distanceM: 380,
        walkMin: 6,
        isChopuma: false,
        crosswalkCount: 1,
        hasMajorRoadCrossing: false,
        studentsPerClass: 25.9,
        afterSchoolCareRate: 93,
        schoolZoneCctvCount: 16,
        accidentHistoryCount: 0,
        routeDesc: '동탄여울공원 보행 육교 및 어린이보호구역 녹색 어머니회 상시 배치 횡단보도 1회 이용',
        routeCoords: [
          [37.2005, 127.0985],
          [37.2016, 127.1001],
          [37.2028, 127.1018]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '15억 4,000만',
        sale84Num: 154000,
        jeonse84: '6억 9,000만',
        jeonse84Num: 69000,
        recentDate: '2026.10 실거래',
        trend: '+1.9% (전분기 대비)'
      },
      scores: {
        safety: 90,
        medical: 96,
        childcare: 94,
        culture: 92,
        total: 93,
        grade: 'S',
        summaryTag: 'GTX-A 수서 20분 출퇴근 + 달빛어린이병원 도보 5분권'
      },
      commute: {
        pangyoMin: 18,
        gangnamMin: 24,
        gwanghwamunMin: 50
      },
      academyCount: 164,
      tags: ['#GTX동탄역직결', '#달빛어린이병원인접', '#롯데백화점문화센터', '#여울공원'],
      reviews: [
        { author: '3세·6세 맞벌이 부부', rating: 4.9, text: 'GTX-A 타면 강남 출퇴근이 20분대라 저녁 있는 삶이 가능해졌어요. 달빛병원도 바로 앞이라 안심!', date: '2026.10.22' }
      ]
    },
    {
      id: 'apt-dongtan-2',
      code: 'DT-302',
      regionId: 'dongtan',
      name: '동탄 시범 더샵 센트럴시티',
      address: '경기도 화성시 동탄순환대로22길 42 (청계동)',
      lat: 37.2038,
      lng: 127.1068,
      households: 874,
      builtYear: 2015,
      recommendedAges: ['infant', 'toddler', 'elem_low', 'elem_high'],
      school: {
        name: '동탄중앙초등학교',
        lat: 37.2047,
        lng: 127.1082,
        distanceM: 140,
        walkMin: 2,
        isChopuma: true,
        crosswalkCount: 0,
        hasMajorRoadCrossing: false,
        studentsPerClass: 24.5,
        afterSchoolCareRate: 96,
        schoolZoneCctvCount: 15,
        accidentHistoryCount: 0,
        routeDesc: '센트럴파크 녹지축과 연결된 보행 전용 통학로로 차도 횡단 전혀 없이 중앙초 직결',
        routeCoords: [
          [37.2038, 127.1068],
          [37.2043, 127.1075],
          [37.2047, 127.1082]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '13억 2,000만',
        sale84Num: 132000,
        jeonse84: '6억 1,000만',
        jeonse84Num: 61000,
        recentDate: '2026.10 실거래',
        trend: '+1.6% (전분기 대비)'
      },
      scores: {
        safety: 99,
        medical: 94,
        childcare: 95,
        culture: 93,
        total: 95,
        grade: 'S',
        summaryTag: '차 없는 청계센트럴파크 초품아 & 북광장 학원가 도보권'
      },
      commute: {
        pangyoMin: 23,
        gangnamMin: 29,
        gwanghwamunMin: 56
      },
      academyCount: 190,
      tags: ['#시범단지대장초품아', '#청계센트럴파크', '#동탄중앙초', '#북광장학원가'],
      reviews: [
        { author: '초1·초3 엄마', rating: 5.0, text: '아이 혼자 등하교 시켜도 차도를 단 한 번도 안 건너서 마음이 정말 편합니다.', date: '2026.10.17' }
      ]
    },
    {
      id: 'apt-sejong-1',
      code: 'SJ-401',
      regionId: 'sejong',
      name: '새롬동 새뜸마을 10단지 (더샵힐스테이트)',
      address: '세종특별자치시 새롬중앙로 63 (새롬동)',
      lat: 36.4852,
      lng: 127.2535,
      households: 1116,
      builtYear: 2017,
      recommendedAges: ['infant', 'toddler', 'elem_low', 'elem_high'],
      school: {
        name: '새롬초등학교',
        lat: 36.4864,
        lng: 127.2519,
        distanceM: 160,
        walkMin: 2,
        isChopuma: true,
        crosswalkCount: 0,
        hasMajorRoadCrossing: false,
        studentsPerClass: 21.6,
        afterSchoolCareRate: 98,
        schoolZoneCctvCount: 16,
        accidentHistoryCount: 0,
        routeDesc: '세종시 특화 입체 보행 데크를 통해 유·초·중·고 통합 캠퍼스로 무횡단 직결',
        routeCoords: [
          [36.4852, 127.2535],
          [36.4858, 127.2527],
          [36.4864, 127.2519]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '8억 6,000만',
        sale84Num: 86000,
        jeonse84: '3억 9,000만',
        jeonse84Num: 39000,
        recentDate: '2026.10 실거래',
        trend: '+1.2% (전분기 대비)'
      },
      scores: {
        safety: 99,
        medical: 92,
        childcare: 99,
        culture: 96,
        total: 97,
        grade: 'S',
        summaryTag: '전국 최고 수준 국공립 보육·늘봄학교 수용률 98% 육아 특화 단지'
      },
      commute: {
        pangyoMin: 65,
        gangnamMin: 75,
        gwanghwamunMin: 80
      },
      academyCount: 135,
      tags: ['#세종대장초품아', '#국공립어린이집대기짧음', '#늘봄학교98%', '#복합커뮤니티센터'],
      reviews: [
        { author: '4세·7세 공무원 부부', rating: 5.0, text: '복합커뮤니티센터 도서관, 공동육아나눔터, 국공립어린이집이 모두 걸어서 3분 이내입니다.', date: '2026.10.19' }
      ]
    },
    {
      id: 'apt-gangnam-1',
      code: 'GN-501',
      regionId: 'gangnam',
      name: '개포 자이 프레지던스',
      address: '서울특별시 강남구 삼성로 14 (개포동)',
      lat: 37.4882,
      lng: 127.0615,
      households: 3375,
      builtYear: 2023,
      recommendedAges: ['toddler', 'elem_low', 'elem_high'],
      school: {
        name: '서울개포초등학교',
        lat: 37.4893,
        lng: 127.0628,
        distanceM: 130,
        walkMin: 2,
        isChopuma: true,
        crosswalkCount: 0,
        hasMajorRoadCrossing: false,
        studentsPerClass: 25.1,
        afterSchoolCareRate: 91,
        schoolZoneCctvCount: 19,
        accidentHistoryCount: 0,
        routeDesc: '단지 내부 커뮤니티 가든에서 신축 개포초 후문으로 바로 이어지는 100% 안심 초품아',
        routeCoords: [
          [37.4882, 127.0615],
          [37.4888, 127.0622],
          [37.4893, 127.0628]
        ],
        accidentSpots: []
      },
      prices: {
        sale84: '31억 5,000만',
        sale84Num: 315000,
        jeonse84: '13억 8,000만',
        jeonse84Num: 138000,
        recentDate: '2026.10 실거래',
        trend: '+3.5% (전분기 대비)'
      },
      scores: {
        safety: 99,
        medical: 94,
        childcare: 95,
        culture: 96,
        total: 96,
        grade: 'S',
        summaryTag: '신축 개포초품아 + 대치동 학원가 셔틀·인접 최상위 교육 인프라'
      },
      commute: {
        pangyoMin: 22,
        gangnamMin: 12,
        gwanghwamunMin: 39
      },
      academyCount: 340,
      tags: ['#강남신축초품아', '#개포초신축캠퍼스', '#대치학원가인접', '#대모산유아숲'],
      reviews: [
        { author: '초2·초4 학부모', rating: 5.0, text: '개포초가 새로 지어져서 시설이 최고고, 대치동 학원 라이딩도 차로 5~7분이면 충분합니다.', date: '2026.10.20' }
      ]
    }
  ],

  daycares: [
    // 판교
    { id: 'dc-1', regionId: 'pangyo', aptId: 'apt-pangyo-1', name: '시립 백현그랑블 어린이집', type: '국공립', lat: 37.3924, lng: 127.1121, distanceM: 60, capacity: 78, enrolled: 76, waiting: 19, teacherRatio: '1 : 4.2', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '031-709-1234', openHours: '07:30 ~ 21:30 (야간연장)' },
    { id: 'dc-2', regionId: 'pangyo', aptId: 'apt-pangyo-1', name: '보평 병설유치원', type: '공립유치원', lat: 37.3942, lng: 127.1147, distanceM: 195, capacity: 90, enrolled: 88, waiting: 12, teacherRatio: '1 : 8.8', grade: '교육청 우수', hasNightCare: true, hasInfantClass: false, phone: '031-8016-2200', openHours: '08:00 ~ 19:30 (온종일돌봄)' },
    { id: 'dc-3', regionId: 'pangyo', aptId: 'apt-pangyo-2', name: '시립 판교원마을 어린이집', type: '국공립', lat: 37.3980, lng: 127.0972, distanceM: 80, capacity: 65, enrolled: 61, waiting: 9, teacherRatio: '1 : 4.1', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '031-708-4511', openHours: '07:30 ~ 21:00 (야간연장)' },
    // 송파
    { id: 'dc-4', regionId: 'songpa', aptId: 'apt-songpa-1', name: '구립 헬리오별빛 어린이집', type: '국공립', lat: 37.4982, lng: 127.1079, distanceM: 75, capacity: 110, enrolled: 108, waiting: 28, teacherRatio: '1 : 4.5', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '02-403-8812', openHours: '07:30 ~ 21:30 (야간연장+시간제)' },
    { id: 'dc-5', regionId: 'songpa', aptId: 'apt-songpa-1', name: '구립 가락해누리 어린이집', type: '국공립', lat: 37.4974, lng: 127.1069, distanceM: 110, capacity: 95, enrolled: 91, waiting: 16, teacherRatio: '1 : 4.3', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '02-407-5521', openHours: '07:30 ~ 20:30' },
    { id: 'dc-6', regionId: 'songpa', aptId: 'apt-songpa-2', name: '구립 잠실엘스 어린이집', type: '국공립', lat: 37.5128, lng: 127.0820, distanceM: 65, capacity: 85, enrolled: 83, waiting: 21, teacherRatio: '1 : 4.4', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '02-415-3309', openHours: '07:30 ~ 21:00' },
    // 동탄
    { id: 'dc-7', regionId: 'dongtan', aptId: 'apt-dongtan-1', name: '시립 동탄역롯데캐슬 어린이집', type: '국공립', lat: 37.2002, lng: 127.0982, distanceM: 50, capacity: 80, enrolled: 78, waiting: 14, teacherRatio: '1 : 4.0', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '031-376-9012', openHours: '07:30 ~ 21:30 (야간연장)' },
    { id: 'dc-8', regionId: 'dongtan', aptId: 'apt-dongtan-2', name: '시립 시범더샵 어린이집', type: '국공립', lat: 37.2036, lng: 127.1065, distanceM: 55, capacity: 72, enrolled: 69, waiting: 8, teacherRatio: '1 : 3.9', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '031-375-4410', openHours: '07:30 ~ 21:30' },
    // 세종
    { id: 'dc-9', regionId: 'sejong', aptId: 'apt-sejong-1', name: '시립 새뜸마을10단지 어린이집', type: '국공립', lat: 36.4850, lng: 127.2538, distanceM: 45, capacity: 90, enrolled: 84, waiting: 4, teacherRatio: '1 : 3.6', grade: 'A등급 (최우수)', hasNightCare: true, hasInfantClass: true, phone: '044-862-1090', openHours: '07:00 ~ 22:00 (세종안심야간)' },
    // 강남
    { id: 'dc-10', regionId: 'gangnam', aptId: 'apt-gangnam-1', name: '구립 개포프레지던스 어린이집', type: '국공립', lat: 37.4880, lng: 127.0618, distanceM: 50, capacity: 98, enrolled: 95, waiting: 22, teacherRatio: '1 : 4.2', grade: 'A등급 (우수)', hasNightCare: true, hasInfantClass: true, phone: '02-574-8210', openHours: '07:30 ~ 21:30' }
  ],

  medicalFacilities: [
    // 판교
    {
      id: 'med-1',
      regionId: 'pangyo',
      name: '분당차여성병원 소아전문응급의료센터',
      category: 'hospital',
      subType: '소아전문응급실 (24시)',
      isMoonlight: true,
      is24h: true,
      lat: 37.4102,
      lng: 127.1254,
      address: '경기도 성남시 분당구 야탑로 59',
      phone: '031-780-5000',
      hoursDesc: '365일 24시간 소아전담 응급전문의 상주',
      weekdayClose: 24,
      satClose: 24,
      sunClose: 24,
      waitStatus: '여유 (소아전담 병상 4개 가용)',
      waitLevel: 'good'
    },
    {
      id: 'med-2',
      regionId: 'pangyo',
      name: '판교연세소아청소년과의원 (달빛어린이병원)',
      category: 'hospital',
      subType: '달빛어린이병원',
      isMoonlight: true,
      is24h: false,
      lat: 37.3956,
      lng: 127.1108,
      address: '경기도 성남시 분당구 분당내곡로 117 (백현동)',
      phone: '031-8017-7582',
      hoursDesc: '평일 09:00~23:00 / 토·일·공휴일 09:00~18:00',
      weekdayClose: 23,
      satClose: 18,
      sunClose: 18,
      waitStatus: '보통 (예상 대기 약 15분)',
      waitLevel: 'normal'
    },
    {
      id: 'med-3',
      regionId: 'pangyo',
      name: '판교역 365 올데이 온누리약국',
      category: 'pharmacy',
      subType: '심야·공휴일 지킴이 약국',
      isMoonlight: false,
      is24h: false,
      lat: 37.3952,
      lng: 127.1114,
      address: '경기도 성남시 분당구 대왕판교로606번길 45',
      phone: '031-702-3650',
      hoursDesc: '연중무휴 08:30~01:00 (새벽 1시까지 소아 시럽 조제)',
      weekdayClose: 25,
      satClose: 25,
      sunClose: 25,
      waitStatus: '즉시 조제 가능 (해열제·항생제 시럽 보유)',
      waitLevel: 'good'
    },
    // 송파
    {
      id: 'med-4',
      regionId: 'songpa',
      name: '서울아산병원 소아전문응급의료센터',
      category: 'hospital',
      subType: '소아전문응급실 (24시)',
      isMoonlight: true,
      is24h: true,
      lat: 37.5266,
      lng: 127.1082,
      address: '서울특별시 송파구 올림픽로43길 88',
      phone: '02-3010-3333',
      hoursDesc: '365일 24시간 중증·응급 소아환자 전담 진료',
      weekdayClose: 24,
      satClose: 24,
      sunClose: 24,
      waitStatus: '보통 (경증은 달빛병원 권장)',
      waitLevel: 'normal'
    },
    {
      id: 'med-5',
      regionId: 'songpa',
      name: '송파 365 튼튼소아청소년과의원 (달빛어린이병원)',
      category: 'hospital',
      subType: '달빛어린이병원',
      isMoonlight: true,
      is24h: false,
      lat: 37.4994,
      lng: 127.1105,
      address: '서울특별시 송파구 송파대로 367 (석촌역·가락시장역 인근)',
      phone: '02-419-3651',
      hoursDesc: '평일 09:00~23:00 / 토·일·공휴일 09:00~22:00',
      weekdayClose: 23,
      satClose: 22,
      sunClose: 22,
      waitStatus: '여유 (예상 대기 약 10분)',
      waitLevel: 'good'
    },
    {
      id: 'med-6',
      regionId: 'songpa',
      name: '헬리오 24시 중앙약국',
      category: 'pharmacy',
      subType: '심야·공휴일 공공심야약국',
      isMoonlight: false,
      is24h: true,
      lat: 37.4988,
      lng: 127.1098,
      address: '서울특별시 송파구 송파대로 345 상가 1동 1층',
      phone: '02-401-2475',
      hoursDesc: '365일 08:00~02:00 (서울시 지정 공공심야약국)',
      weekdayClose: 26,
      satClose: 26,
      sunClose: 26,
      waitStatus: '즉시 조제 가능',
      waitLevel: 'good'
    },
    // 동탄
    {
      id: 'med-7',
      regionId: 'dongtan',
      name: '동탄성심병원 소아응급실 & 야간소아과',
      category: 'hospital',
      subType: '소아응급실 (24시)',
      isMoonlight: true,
      is24h: true,
      lat: 37.2165,
      lng: 127.0792,
      address: '경기도 화성시 큰재봉길 7 (석우동)',
      phone: '031-8086-3000',
      hoursDesc: '24시간 소아응급 진료 가동',
      weekdayClose: 24,
      satClose: 24,
      sunClose: 24,
      waitStatus: '여유',
      waitLevel: 'good'
    },
    {
      id: 'med-8',
      regionId: 'dongtan',
      name: '동탄 굿모닝소아청소년과의원 (달빛어린이병원)',
      category: 'hospital',
      subType: '달빛어린이병원',
      isMoonlight: true,
      is24h: false,
      lat: 37.2012,
      lng: 127.1004,
      address: '경기도 화성시 동탄대로 537 (동탄역 도보 4분)',
      phone: '031-378-7588',
      hoursDesc: '평일 08:30~23:00 / 토·일·공휴일 09:00~21:00',
      weekdayClose: 23,
      satClose: 21,
      sunClose: 21,
      waitStatus: '여유 (예상 대기 8분)',
      waitLevel: 'good'
    },
    {
      id: 'med-9',
      regionId: 'dongtan',
      name: '동탄역 밤샘안심약국',
      category: 'pharmacy',
      subType: '공공심야약국',
      isMoonlight: false,
      is24h: false,
      lat: 37.2010,
      lng: 127.1008,
      address: '경기도 화성시 동탄대로 537 1층',
      phone: '031-378-0911',
      hoursDesc: '연중무휴 08:30~01:00',
      weekdayClose: 25,
      satClose: 25,
      sunClose: 25,
      waitStatus: '즉시 조제 가능',
      waitLevel: 'good'
    },
    // 세종
    {
      id: 'med-10',
      regionId: 'sejong',
      name: '세종충남대학교병원 소아전문응급의료센터',
      category: 'hospital',
      subType: '소아전문응급실 (24시)',
      isMoonlight: true,
      is24h: true,
      lat: 36.5192,
      lng: 127.2584,
      address: '세종특별자치시 보듬7로 20 (도담동)',
      phone: '044-995-3000',
      hoursDesc: '365일 24시간 소아전문응급센터 운영',
      weekdayClose: 24,
      satClose: 24,
      sunClose: 24,
      waitStatus: '여유',
      waitLevel: 'good'
    },
    {
      id: 'med-11',
      regionId: 'sejong',
      name: '세종 웰키즈소아청소년과의원 (달빛어린이병원)',
      category: 'hospital',
      subType: '달빛어린이병원',
      isMoonlight: true,
      is24h: false,
      lat: 36.4841,
      lng: 127.2552,
      address: '세종특별자치시 새롬중앙로 47 (새롬동)',
      phone: '044-868-1275',
      hoursDesc: '평일 08:30~23:00 / 주말·공휴일 09:00~18:00',
      weekdayClose: 23,
      satClose: 18,
      sunClose: 18,
      waitStatus: '여유 (예상 대기 5분)',
      waitLevel: 'good'
    },
    {
      id: 'med-12',
      regionId: 'sejong',
      name: '새롬 365 공공심야약국',
      category: 'pharmacy',
      subType: '공공심야약국',
      isMoonlight: false,
      is24h: false,
      lat: 36.4843,
      lng: 127.2555,
      address: '세종특별자치시 새롬중앙로 47 1층',
      phone: '044-868-3659',
      hoursDesc: '연중무휴 09:00~01:00',
      weekdayClose: 25,
      satClose: 25,
      sunClose: 25,
      waitStatus: '즉시 조제 가능',
      waitLevel: 'good'
    },
    // 강남
    {
      id: 'med-13',
      regionId: 'gangnam',
      name: '강남세브란스병원 소아응급진료실',
      category: 'hospital',
      subType: '응급의료센터 (24시)',
      isMoonlight: true,
      is24h: true,
      lat: 37.4928,
      lng: 127.0463,
      address: '서울특별시 강남구 언주로 211 (도곡동)',
      phone: '02-2019-2222',
      hoursDesc: '365일 24시간 응급진료',
      weekdayClose: 24,
      satClose: 24,
      sunClose: 24,
      waitStatus: '보통',
      waitLevel: 'normal'
    },
    {
      id: 'med-14',
      regionId: 'gangnam',
      name: '대치 우리아이소아청소년과의원 (달빛어린이병원)',
      category: 'hospital',
      subType: '달빛어린이병원',
      isMoonlight: true,
      is24h: false,
      lat: 37.4945,
      lng: 127.0608,
      address: '서울특별시 강남구 삼성로 212 (대치동)',
      phone: '02-557-7582',
      hoursDesc: '평일 09:00~23:00 / 토·일·공휴일 09:00~21:00',
      weekdayClose: 23,
      satClose: 21,
      sunClose: 21,
      waitStatus: '여유 (예상 대기 12분)',
      waitLevel: 'good'
    },
    {
      id: 'med-15',
      regionId: 'gangnam',
      name: '대치 한티역 365 심야약국',
      category: 'pharmacy',
      subType: '공공심야약국',
      isMoonlight: false,
      is24h: false,
      lat: 37.4951,
      lng: 127.0589,
      address: '서울특별시 강남구 도곡로 405',
      phone: '02-562-0365',
      hoursDesc: '연중무휴 08:30~01:30',
      weekdayClose: 25,
      satClose: 25,
      sunClose: 25,
      waitStatus: '즉시 조제 가능',
      waitLevel: 'good'
    }
  ],

  libraries: [
    { id: 'lib-1', regionId: 'pangyo', name: '성남시 판교어린이도서관', lat: 37.3912, lng: 127.1152, address: '경기도 성남시 분당구 판교역로 75', hours: '09:00~18:00 (월 휴관)', distanceM: 320, specialFeature: '로봇 스토리텔링 체험관 & 영유아 그림책방' },
    { id: 'lib-2', regionId: 'songpa', name: '송파어린이도서관 & 헬리오 책박물관', lat: 37.4961, lng: 127.1055, address: '서울특별시 송파구 양재대로 925', hours: '09:00~20:00 (화 휴관)', distanceM: 240, specialFeature: '전국 최초 공립 책박물관 & 북스타트 꾸러미 배포' },
    { id: 'lib-3', regionId: 'dongtan', name: '화성시 동탄중앙이음터도서관', lat: 37.2049, lng: 127.1088, address: '경기도 화성시 동탄순환대로 21길', hours: '09:00~22:00', distanceM: 190, specialFeature: 'AR 동화책 체험존 & 초등 코딩 메이커스페이스' },
    { id: 'lib-4', regionId: 'sejong', name: '국립세종도서관 (어린이 자료실)', lat: 36.4988, lng: 127.2681, address: '세종특별자치시 다솜3로 48', hours: '09:00~21:00', distanceM: 450, specialFeature: '호수공원 조망 가족열람실 & 연령별 독서코칭' },
    { id: 'lib-5', regionId: 'gangnam', name: '강남구립 개포하늘꿈도서관', lat: 37.4898, lng: 127.0642, address: '서울특별시 강남구 개포로 110길', hours: '09:00~22:00', distanceM: 260, specialFeature: '영어원서 특화 코너 & 초등 독서토론 동아리' }
  ],

  popularBooks: [
    {
      id: 'book-1',
      ageGroup: 'toddler',
      ageLabel: '영유아 (0~6세)',
      rank: 1,
      title: '알사탕 (백희나 그림책)',
      author: '백희나 지음 / 책읽는곰',
      isbn: '9791158360375',
      loanCount30d: 4820,
      tags: ['공감능력', '아스트리드린드그렌상', '잠자리독서'],
      stockByRegion: {
        pangyo: { available: true, copiesLeft: 3, shelf: '유아자료실 813.8-백97알' },
        songpa: { available: true, copiesLeft: 2, shelf: '어린이1층 그림책코너' },
        dongtan: { available: false, copiesLeft: 0, shelf: '대출중 (예약 대기 1명)' },
        sejong: { available: true, copiesLeft: 4, shelf: '지하1층 유아방' },
        gangnam: { available: true, copiesLeft: 1, shelf: '유아열람실 A-12' }
      }
    },
    {
      id: 'book-2',
      ageGroup: 'toddler',
      ageLabel: '영유아 (0~6세)',
      rank: 2,
      title: '수박 수영장',
      author: '안녕달 지음 / 창비',
      isbn: '9788936454784',
      loanCount30d: 4310,
      tags: ['상상력', '오감발달', '누리과정연계'],
      stockByRegion: {
        pangyo: { available: true, copiesLeft: 2, shelf: '유아자료실 813.8-안211수' },
        songpa: { available: true, copiesLeft: 3, shelf: '어린이1층 그림책코너' },
        dongtan: { available: true, copiesLeft: 2, shelf: '유아열람실 B-04' },
        sejong: { available: true, copiesLeft: 5, shelf: '지하1층 유아방' },
        gangnam: { available: false, copiesLeft: 0, shelf: '대출중 (반납예정 10/26)' }
      }
    },
    {
      id: 'book-3',
      ageGroup: 'elem_low',
      ageLabel: '초등 저학년 (7~9세)',
      rank: 1,
      title: '만복이네 떡집 (1학년 권장도서 1위)',
      author: '김리리 지음 / 비룡소',
      isbn: '9788949161341',
      loanCount30d: 6190,
      tags: ['초1교과수록', '바른인성', '문해력향상'],
      stockByRegion: {
        pangyo: { available: true, copiesLeft: 4, shelf: '어린이자료실 813.8-김298만' },
        songpa: { available: false, copiesLeft: 0, shelf: '대출중 (상호대차 신청 가능)' },
        dongtan: { available: true, copiesLeft: 3, shelf: '초등자료실 C-11' },
        sejong: { available: true, copiesLeft: 6, shelf: '어린이자료실 2층' },
        gangnam: { available: true, copiesLeft: 2, shelf: '초등권장도서 서가' }
      }
    },
    {
      id: 'book-4',
      ageGroup: 'elem_low',
      ageLabel: '초등 저학년 (7~9세)',
      rank: 2,
      title: '푸른 사자 와니니 1',
      author: '이현 지음 / 창비',
      isbn: '9788936442804',
      loanCount30d: 5490,
      tags: ['모험동화', '우정과성장', '초등베스트'],
      stockByRegion: {
        pangyo: { available: true, copiesLeft: 2, shelf: '어린이자료실 813.8-이94푸' },
        songpa: { available: true, copiesLeft: 3, shelf: '어린이2층 문학서가' },
        dongtan: { available: true, copiesLeft: 4, shelf: '초등자료실 C-18' },
        sejong: { available: true, copiesLeft: 3, shelf: '어린이자료실 2층' },
        gangnam: { available: true, copiesLeft: 2, shelf: '초등권장도서 서가' }
      }
    },
    {
      id: 'book-5',
      ageGroup: 'elem_high',
      ageLabel: '초등 고학년 (10~12세)',
      rank: 1,
      title: '긴긴밤 (제21회 문학동네어린이문학상 대상)',
      author: '루리 지음 / 문학동네',
      isbn: '9788954677158',
      loanCount30d: 7120,
      tags: ['생명존중', '독서토론필독서', '한우리선정'],
      stockByRegion: {
        pangyo: { available: true, copiesLeft: 3, shelf: '어린이자료실 813.8-루298긴' },
        songpa: { available: true, copiesLeft: 2, shelf: '어린이2층 문학서가' },
        dongtan: { available: true, copiesLeft: 1, shelf: '초등자료실 D-02' },
        sejong: { available: true, copiesLeft: 5, shelf: '어린이자료실 2층' },
        gangnam: { available: true, copiesLeft: 3, shelf: '초등토론필독서 코너' }
      }
    },
    {
      id: 'book-6',
      ageGroup: 'elem_high',
      ageLabel: '초등 고학년 (10~12세)',
      rank: 2,
      title: '어린이를 위한 세상을 바꾼 과학 이야기',
      author: '권기균 지음 / 주니어김영사',
      isbn: '9788934991234',
      loanCount30d: 4680,
      tags: ['융합과학', '비문학독해', '탐구보고서'],
      stockByRegion: {
        pangyo: { available: true, copiesLeft: 5, shelf: '어린이과학 400-권18세' },
        songpa: { available: true, copiesLeft: 2, shelf: '어린이2층 자연과학' },
        dongtan: { available: true, copiesLeft: 3, shelf: '초등자료실 E-09' },
        sejong: { available: true, copiesLeft: 4, shelf: '어린이자료실 과학코너' },
        gangnam: { available: true, copiesLeft: 4, shelf: 'STEAM 융합서가' }
      }
    }
  ],

  cultureEvents: [
    {
      id: 'ev-1',
      regionId: 'pangyo',
      title: '판교 환경생태학습원 주말 어린이 숲해설 & 곤충 탐험대',
      place: '성남 판교환경생태학습원 / 화랑공원',
      dateStr: '매주 토·일 10:30 / 14:00',
      fee: '무료 (지자체 지원)',
      isFree: true,
      ageGroup: 'toddler',
      ageBadge: '4~9세 권장',
      status: '예약 가능 (잔여 6가족)',
      url: 'https://seongnam.go.kr'
    },
    {
      id: 'ev-2',
      regionId: 'pangyo',
      title: '성남시 육아종합지원센터 오감발달 영아 놀이교실',
      place: '성남시 육아종합지원센터 판교점',
      dateStr: '매주 토요일 11:00',
      fee: '무료 (장난감도서관 연계)',
      isFree: true,
      ageGroup: 'infant',
      ageBadge: '0~3세 영아',
      status: '마감 임박 (잔여 2팀)',
      url: 'https://sneducare.or.kr'
    },
    {
      id: 'ev-3',
      regionId: 'songpa',
      title: '송파 책박물관 어린이 팝업북 만들기 & 동화구연 워크숍',
      place: '송파책박물관 1층 키즈스튜디오',
      dateStr: '이번 주말 토·일 13:30',
      fee: '무료 (재료비 3,000원)',
      isFree: true,
      ageGroup: 'elem_low',
      ageBadge: '6~10세 권장',
      status: '예약 가능 (잔여 9명)',
      url: 'https://www.bookmuseum.go.kr'
    },
    {
      id: 'ev-4',
      regionId: 'songpa',
      title: '올림픽공원 유아숲체험원 가을 도토리 생태 놀이터',
      place: '송파구 올림픽공원 유아숲체험원',
      dateStr: '상시 및 주말 숲해설 10:00 / 15:00',
      fee: '무료',
      isFree: true,
      ageGroup: 'toddler',
      ageBadge: '3~7세 유아',
      status: '현장 선착순 & 사전접수',
      url: 'https://www.songpa.go.kr'
    },
    {
      id: 'ev-5',
      regionId: 'dongtan',
      title: '동탄복합문화센터 어린이 천문과학관 별자리 관측교실',
      place: '화성시 어린이문화센터 과학관',
      dateStr: '매주 금·토 야간 19:30',
      fee: '어린이 2,000원 (화성시민 50% 할인)',
      isFree: false,
      ageGroup: 'elem_high',
      ageBadge: '7~12세 초등',
      status: '예약 가능 (잔여 5석)',
      url: 'https://www.hcf.or.kr'
    },
    {
      id: 'ev-6',
      regionId: 'sejong',
      title: '국립세종수목원 사계절 전시온실 꼬마 식물학자 스탬프 투어',
      place: '국립세종수목원 어린이정원',
      dateStr: '주말 상시 운영 (09:00~18:00)',
      fee: '미취학 무료 / 초등 1,500원',
      isFree: true,
      ageGroup: 'elem_low',
      ageBadge: '전 연령 추천',
      status: '현장 발권 가능',
      url: 'https://www.sjna.or.kr'
    },
    {
      id: 'ev-7',
      regionId: 'gangnam',
      title: '대모산 유아숲체험원 주말 가족 목공예 & 밧줄놀이',
      place: '강남구 대모산 자연학습장',
      dateStr: '매주 토요일 10:00 / 14:00',
      fee: '무료 (강남구청 공원녹지과 운영)',
      isFree: true,
      ageGroup: 'toddler',
      ageBadge: '4~8세 권장',
      status: '예약 가능 (잔여 4가족)',
      url: 'https://www.gangnam.go.kr'
    }
  ],

  emergencyGuides: [
    {
      id: 'sym-fever-infant',
      title: '생후 100일 미만 영아의 38.0℃ 이상 발열',
      urgency: 'critical',
      badge: '119 / 소아전문응급실 즉시 이동',
      color: 'rose',
      action: '생후 3개월(100일) 미만 신생아·영아가 38.0℃ 이상 열이 나면 해열제를 임의로 먹이지 말고 즉시 소아전문응급의료센터로 이동해야 합니다.',
      checklist: ['체온 측정 시각 및 최고 체온 기록', '마지막 수유 시각 및 수유량 확인', '기저귀 소변 횟수 확인 후 즉시 출발']
    },
    {
      id: 'sym-seizure',
      title: '열성 경련 / 호흡 곤란 (갈비뼈 아래 함몰·청색증)',
      urgency: 'critical',
      badge: '119 신고 & 소아응급실 즉시 이동',
      color: 'rose',
      action: '아이를 평평한 곳에 눕히고 고개를 옆으로 돌려 기도 막힘을 예방하세요. 입안에 손이나 물건을 절대 넣지 마시고 경련 시작 시각과 양상을 동영상으로 촬영해 응급실 의료진에게 보여주세요.',
      checklist: ['경련 지속 시간 측정 (5분 이상 시 119 구급대 필수)', '옷의 단추를 풀고 주변 위험 물건 치우기', '해열제나 물을 억지로 먹이지 않기']
    },
    {
      id: 'sym-night-fever',
      title: '생후 6개월 이상 소아의 야간 고열 (38.5℃~39.5℃) & 중이염·인후통',
      urgency: 'moonlight',
      badge: '달빛어린이병원 / 야간소아과 방문 권장',
      color: 'amber',
      action: '아이가 축 늘어지지 않고 수분 섭취가 가능하다면 체중에 맞는 해열제를 복용한 뒤, 대형 응급실(대기 3~4시간) 대신 인근 달빛어린이병원이나 야간 소아청소년과 진료를 받으세요.',
      checklist: ['최근 복용한 해열제 성분명(아세트아미노펜/이부프로펜) 및 복용 시각 메모', '미지근한 물수건 마사지 및 얇은 옷 착용', '소변량 감소 등 탈수 징후 체크']
    },
    {
      id: 'sym-croup',
      title: '밤중 강아지 짖는 듯한 컹컹 기침 (크루프 / 급성 후두염)',
      urgency: 'moonlight',
      badge: '달빛어린이병원 방문 (숨소리가 거칠면 응급실)',
      color: 'amber',
      action: '욕실에 따뜻한 물을 틀어 수증기를 15분간 마시게 하거나 차가운 밤공기를 잠깐 쐬어주면 후두 부종 완화에 도움이 됩니다. 가만히 있어도 쌕쌕거리거나 숨쉬기 힘들어하면 즉시 소아응급실로 이동하세요.',
      checklist: ['가습기 틀어주기 및 상체 살짝 높여 안아주기', '아이가 울면 기도가 더 좁아지므로 달래주기']
    }
  ]
};
