// 도담톡 (DodamTalk) - 전국 유치원·초·중·고 학교 정보 & 지역별 학군·입시 순위 데이터셋
// 특목고·자사고 진학률, 서울대·의대 합격 랭킹, 7대 명문 학군지, 2028 대입 개편안 가이드
window.DODAM_SCHOOLS_DATA = {
  updatedAt: '2026-10-28',
  levels: [
    { id: 'all', name: '전체 모아보기', icon: 'fa-layer-group', color: 'slate' },
    { id: 'high', name: '🏛️ 고등학교 (서울대·의대 랭킹)', icon: 'fa-graduation-cap', color: 'indigo' },
    { id: 'middle', name: '📚 중학교 (특목·자사고 순위)', icon: 'fa-book-open', color: 'emerald' },
    { id: 'elementary', name: '🎒 초등학교 (명문·사립초)', icon: 'fa-school', color: 'amber' },
    { id: 'kindergarten', name: '🧸 유치원 (공·사립·영유)', icon: 'fa-shapes', color: 'pink' },
    { id: 'districts', name: '🗺️ 전국 7대 명문 학군지', icon: 'fa-map-location-dot', color: 'rose' },
    { id: 'admissions', name: '🎯 2028 대입 & 고입 가이드', icon: 'fa-bullseye', color: 'blue' }
  ],

  // 1. 고등학교 데이터 (서울대/의대 합격자 수, 전국/지역 랭킹)
  schools: [
    {
      id: 'high-hufs',
      level: 'high',
      name: '용인한국외국어대학교부설고등학교 (외대부고)',
      type: '전국단위 자사고',
      typeBadge: '자사고',
      typeColor: 'indigo',
      region: 'gyeonggi',
      regionName: '경기 용인',
      rankHighlight: '전국 1위 (자사고 종합)',
      statPrimary: '서울대 66명 (수시 30 / 정시 36)',
      statSecondary: '의·치·한·약 84명 합격',
      features: ['전국 최고 대입 실적', '수시·정시 완벽 균형', '전원 기숙사제', '자율연구(R&E)'],
      tuition: '연간 약 1,200~1,400만 원 (수업료·기숙사비 포함)',
      admissionType: '전국단위 선발 (1단계 교과+출결 / 2단계 서류+면접)',
      summary: '문·이과를 가리지 않고 서울대와 의약학계열 합격자 수에서 전국 정상을 지키고 있는 명실상부 대한민국 최고 전국단위 자율형사립고입니다.',
      details: [
        '입시 전형: 전국선발(자연/인문) 및 용인지역우수자 선발, 1단계 내신(국·영·수·사·과 성취도 B 배제 필요), 2단계 개별 면접 100점',
        '진학 성과: 서울대 연간 60~70명대, 의·치·한·약·수 80명 이상, 연세대·고려대 150명 이상 합격',
        '교육과정: 국제과정 운영(아이비리그 다수 합격), 고교학점제 선도 AP 및 심화선택과목 풍부',
        '추천 대상: 자기주도학습능력이 뛰어나고 기숙사 단체생활에 적극적인 최상위권 학생'
      ],
      linkUrl: 'http://www.hafs.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-hana',
      level: 'high',
      name: '하나고등학교',
      type: '전국단위 자사고',
      typeBadge: '자사고',
      typeColor: 'indigo',
      region: 'seoul',
      regionName: '서울 은평',
      rankHighlight: '서울 수시 1위',
      statPrimary: '서울대 57명 (수시 42 / 정시 15)',
      statSecondary: '서울대 수시 합격 전국 최다',
      features: ['수시 학생부종합 최강', '무학년 무계열제', '1인 2기(체육·예술)', '전원 기숙사'],
      tuition: '연간 약 1,300~1,500만 원',
      admissionType: '서울 소재 중학교 졸업자 및 하나금융그룹 임직원 자녀',
      summary: '학생 개개인의 잠재력을 극대화하는 학생부종합전형의 최고 명문으로, 서울대 수시 합격자 수에서 매년 전국 1위를 다투는 학교입니다.',
      details: [
        '전형 방식: 1단계 내신 교과성적(수·국·영·사·과), 2단계 서류평가 및 체력검사(오래달리기/윗몸일으키기) + 심층 면접',
        '교육 특장점: 1인 2기 프로그램으로 3년간 악기 1개와 운동 1종목을 필수 이수하여 균형 잡힌 인성 함양',
        '학종 경쟁력: 발표, 토론, 소논문 기반 수업으로 학생부 기재 수준이 전국 최고 수준'
      ],
      linkUrl: 'http://www.hana.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-sangsan',
      level: 'high',
      name: '상산고등학교',
      type: '전국단위 자사고',
      typeBadge: '자사고',
      typeColor: 'indigo',
      region: 'jeonbuk',
      regionName: '전북 전주',
      rankHighlight: '전국 의대 합격 1위',
      statPrimary: '의·치·한·약 142명 합격',
      statSecondary: '서울대 43명 합격 (정시 강세)',
      features: ['수학의 정석 홍성대 설립', '전국 의대 최다 배출', '수학 심화특화', '남녀공학(기숙사)'],
      tuition: '연간 약 1,100~1,300만 원',
      admissionType: '전국단위 선발 (수학·과학 창의융합 면접)',
      summary: '전국에서 의대·치대·한의대·약대를 가장 많이 보내는 자연계열 최강 자사고로, 남다른 수학교육 시스템과 막강한 정시 파워를 자랑합니다.',
      details: [
        '진학 특징: 매년 의약학계열 합격자 수가 130~150명에 달해 "의대 사관학교"로 불림',
        '면접 방식: 2단계 창의융합 면접(수학적 문제해결력 및 독서 논리력 집중 평가)',
        '학습 환경: 자습실 1인 1좌석 완비, 기숙사 중심의 철저한 몰입 학습 분위기'
      ],
      linkUrl: 'http://www.sangsan.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-seoul-sci',
      level: 'high',
      name: '서울과학고등학교',
      type: '영재학교',
      typeBadge: '영재학교',
      typeColor: 'purple',
      region: 'seoul',
      regionName: '서울 종로',
      rankHighlight: '전국 영재학교 1위',
      statPrimary: '서울대 75명 (등록자 기준)',
      statSecondary: '카이스트·포스텍 40명+',
      features: ['국내 1호 과학영재학교', '국제올림피아드 국가대표 산실', '무학년 졸업학점제'],
      tuition: '공립 (일반 공립고 수준 수업료 + 연구활동비)',
      admissionType: '전국 영재선발 (1단계 서류 / 2단계 영재성검사 / 3단계 캠프)',
      summary: '수학·과학 분야 대한민국 최정상 영재들이 모이는 학교로, 국제올림피아드 금메달과 서울대·이공계 특성화대 진학률이 압도적입니다.',
      details: [
        '전형 시기: 매년 5~7월 (영재학교 간 중복지원 불가, 단 1곳만 지원 가능)',
        '선발 과정: 1단계 학생기록물 평가 ➡️ 2단계 영재성 및 창의적 문제해결력 평가(지필) ➡️ 3단계 과학영재캠프',
        '유의사항: 의약학계열 진학 시 장학금 회수 및 교육비 환수 조치 적용 (순수 이공계 R&D 육성 목적)'
      ],
      linkUrl: 'http://sshs.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-daewon',
      level: 'high',
      name: '대원외국어고등학교',
      type: '외국어고',
      typeBadge: '특목고',
      typeColor: 'blue',
      region: 'seoul',
      regionName: '서울 광진',
      rankHighlight: '전국 외고 1위',
      statPrimary: '서울대 45명 (수시 28 / 정시 17)',
      statSecondary: 'SKY 및 명문대 200명+',
      features: ['대한민국 외고의 원조', '인문사회 최고 학종 경쟁력', '법조·금융계 동문 최다'],
      tuition: '연간 약 900~1,100만 원 (통학형)',
      admissionType: '서울시 거주 중학생 자기주도학습전형 (중2~3 영어내신+면접)',
      summary: '인문계열과 어문·상경계열 진학에서 대한민국 최고봉을 유지하는 외고로, 탄탄한 어학 교육과 막강한 동문 네트워크를 보유하고 있습니다.',
      details: [
        '학과 구성: 독일어과, 프랑스어과, 스페인어과, 일본어과, 중국어과',
        '선발 방식: 1단계 중2~3학년 영어 내신성적(절대평가 성취도) + 출결 감점 ➡️ 2단계 자기소개서 기반 면접(40점)',
        '대입 전략: 2028 대입 개편안(내신 5등급제) 도입으로 외고의 내신 불리함이 해소되어 선호도 재상승'
      ],
      linkUrl: 'http://www.daewon.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-dandaebugo',
      level: 'high',
      name: '단국대학교사범대학부속고등학교 (단대부고)',
      type: '일반고 (명문)',
      typeBadge: '명문일반고',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 강남(대치)',
      rankHighlight: '전국 일반고 1위',
      statPrimary: '서울대 35명 합격',
      statSecondary: '의·치·한·약 71명 합격',
      features: ['대치동 학원가 인접', '남고 정시 파워 최강', '의대 대량 합격', '내신 상위권 치열'],
      tuition: '일반고 (무상교육 지원)',
      admissionType: '후기 일반고 배정 (서울 강남서초학군)',
      summary: '대치동 중심부에 위치해 최고의 학원가 인프라와 남학생 특유의 정시 몰입 학습으로 매년 일반고 전국 1위의 서울대 및 의대 합격 실적을 냅니다.',
      details: [
        '배정 방식: 서울시 교육청 후기 일반고 1·2단계 지망 배정 (강남·서초 거주자 우선 배정)',
        '학습 분위기: 이공계 중심 남고로 수능 중심의 정시 경쟁력이 극도로 강하며 수능 만점자 다수 배출',
        '학부모 팁: 내신 따기는 대치동 최상위권이 몰려 매우 빡빡하므로, 수능형 정시 전략에 최적화된 학생에게 추천'
      ],
      linkUrl: 'http://dankook.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-naksaeng',
      level: 'high',
      name: '낙생고등학교',
      type: '일반고 (명문)',
      typeBadge: '명문일반고',
      typeColor: 'emerald',
      region: 'gyeonggi',
      regionName: '경기 성남(분당)',
      rankHighlight: '경기 일반고 1위',
      statPrimary: '서울대 28명 합격',
      statSecondary: '의·치·한·약 63명 합격',
      features: ['분당 1위 명문일반고', '자연계열 극강', '정시 수능 전국 상위권', '과학중점'],
      tuition: '일반고 (무상교육 지원)',
      admissionType: '경기 성남 분당학군 평준화 배정',
      summary: '분당 학군을 대표하는 일반고등학교로, 과학중점과정과 탄탄한 자율학습 문화를 바탕으로 강남 명문고 못지않은 의대와 서울대 합격생을 배출합니다.',
      details: [
        '배정 방식: 경기도 성남시 고교평준화 지역 지망 순위 컴퓨터 추첨 배정',
        '실적 포인트: 재수생 포함 정시에서 막강한 화력을 자랑하며, 의치한약학 계열 합격자 수가 경기도 일반고 압도적 1위',
        '학교 분위기: 남녀공학이지만 이과반 비중이 70% 이상으로 수학·과학 분위기가 고도로 조성됨'
      ],
      linkUrl: 'http://naksaeng.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-gangseo',
      level: 'high',
      name: '강서고등학교',
      type: '일반고 (명문)',
      typeBadge: '명문일반고',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 양천(목동)',
      rankHighlight: '목동 학군 1위',
      statPrimary: '서울대 27명 합격',
      statSecondary: '의·치·한·약 58명 합격',
      features: ['목동 뒷단지 명문남고', '수능 수학 만점 최다', '정시 수능 절대강자'],
      tuition: '일반고 (무상교육 지원)',
      admissionType: '서울 양천 강서학군 후기 일반고 배정',
      summary: '목동 학원가의 강력한 수학 인프라를 바탕으로 수능 정시에서 전국 최상위 성적을 내는 목동의 자존심 남학교입니다.',
      details: [
        '배정 지역: 서울 양천구 목동 신정동 일대 거주 남학생 지망 배정',
        '특징: 시험 난이도가 수능 고난도 킬러 문항 수준으로 출제되어 내신 공부가 곧 수능 1등급 대비로 연결됨'
      ],
      linkUrl: 'http://gangseo.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'high-gyeongshin',
      level: 'high',
      name: '경신고등학교',
      type: '자율형사립고',
      typeBadge: '광역자사고',
      typeColor: 'indigo',
      region: 'daegu',
      regionName: '대구 수성',
      rankHighlight: '지방 의대 합격 1위',
      statPrimary: '의·치·한·약 73명 합격',
      statSecondary: '한 해 수능 만점자 4명 배출 신화',
      features: ['대구 수성구 범어동', '영남 최고 의대 산실', '정시 수능 극강 남고'],
      tuition: '연간 약 700~900만 원',
      admissionType: '대구시 광역단위 선발 (추첨 후 면접)',
      summary: '대구 수성구 범어동 학원가 한복판에 자리 잡아 지방에서 가장 많은 의대 합격자를 쏟아내는 수성의 상징입니다.',
      details: [
        '실적: 지방 사립고임에도 매년 의대 60~80명 이상을 합격시키며 수도권 자사고와 어깨를 나란히 함',
        '학군 파워: 범어동 범어4동 학원가 밀접, 의대 지망 상위권 남학생들이 집중 지원'
      ],
      linkUrl: 'http://www.kyungshin.hs.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },

    // 2. 중학교 데이터 (특목고·자사고 진학률 및 학업성취도)
    {
      id: 'mid-daecheong',
      level: 'middle',
      name: '대청중학교',
      type: '공립 중학교',
      typeBadge: '명문중학',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 강남(개포·대치)',
      rankHighlight: '전국 특목·자사고 진학 1위',
      statPrimary: '특목·자사고 92명 진학 (과고·영재 14명, 외고·국제 21명, 자사고 57명)',
      statSecondary: '학업성취도 A등급 비율 92.4%',
      features: ['대치동 학원가 도보권', '영재교·과고 최다 합격', '단대부고·중동고 연계 학군'],
      admissionType: '강남서초 제1학군 근거리 추첨 배정',
      summary: '대치동·개포동의 우수한 학업 분위기를 흡수하여 매년 전국에서 가장 많은 영재학교, 과학고, 자사고 합격생을 배출하는 대한민국 대표 공립중학교입니다.',
      details: [
        '학군 특성: 대치동 학원가를 라이딩 없이 이용 가능한 핵심 입지로, 학부모 교육열이 전국 최고 수준',
        '학업 분위기: 전교생 대부분이 중1~2 시기에 고교 과정을 선행할 정도로 학구열이 뜨거움',
        '주요 진학 고교: 단대부고, 중동고, 휘문고, 숙명여고, 경기여고, 외대부고, 하나고, 서울과고'
      ],
      linkUrl: 'https://daecheong.sen.ms.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'mid-mokun',
      level: 'middle',
      name: '목운중학교',
      type: '공립 중학교',
      typeBadge: '명문중학',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 양천(목동)',
      rankHighlight: '목동 학군 1위',
      statPrimary: '특목·자사고 86명 진학 (과고 9명, 외고·국제 32명, 자사고 45명)',
      statSecondary: '전교생 학업성취도 A비율 91.8%',
      features: ['목동 하이페리온·트라팰리스 학군', '목동 중심 학원가', '강서고·목동고 연계'],
      admissionType: '서울 강서양천 제2학군 배정 (목동 7단지 등)',
      summary: '목동 중심 학원가에 위치해 학급당 학생 수가 30명을 넘나드는 과밀학급임에도 불구하고 전국 최고의 특목고 및 명문고 진학률을 기록합니다.',
      details: [
        '배정 아파트: 목동신시가지 7단지, 현대하이페리온, 목동트라팰리스 거주자 우선 배정',
        '진학 성과: 외고·국제고 진학자가 서울시 전체 중학교 중 최상위권이며, 강서고·양천고 등 명문 일반고 진학 비율도 압도적'
      ],
      linkUrl: 'https://mokun.sen.ms.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'mid-wolchon',
      level: 'middle',
      name: '월촌중학교',
      type: '공립 중학교',
      typeBadge: '명문중학',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 양천(목동 앞단지)',
      rankHighlight: '목동 앞단지 1위',
      statPrimary: '특목·자사고 78명 진학 (과고·영재 12명, 외고 26명, 자사고 40명)',
      statSecondary: '국·영·수 A등급 비율 90.5%',
      features: ['목동 1~6단지 앞단지 맹주', '과학탐구·올림피아드 강세', '한가람고·신목고 연계'],
      admissionType: '서울 강서양천 학군 배정',
      summary: '목동 앞단지를 대표하는 전통의 명문 중학교로, 차분하고 면학 분위기가 잘 잡혀 있어 남학생과 여학생 모두 상위권 대입까지 안정적인 경로를 밟습니다.',
      details: [
        '특징: 목동 신시가지 2·5·6단지 거주 학생들이 주로 배정되며, 수학·과학 내신 시험 수준이 매우 높음'
      ],
      linkUrl: 'https://wolchon.sen.ms.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'mid-naejeong',
      level: 'middle',
      name: '내정중학교',
      type: '공립 중학교',
      typeBadge: '명문중학',
      typeColor: 'emerald',
      region: 'gyeonggi',
      regionName: '경기 성남(분당 수내)',
      rankHighlight: '경기 분당 1위',
      statPrimary: '특목·자사고 65명 진학 (외대부고·과고 다수)',
      statSecondary: '학업성취도 A등급 89.6%',
      features: ['분당 최고 학군 수내동', '양지마을 파크타운 학군', '낙생고·분당대진고 연계'],
      admissionType: '경기 성남 분당중학군 배정',
      summary: '분당 신도시 학원가와 주거 환경이 가장 이상적으로 결합된 수내동의 핵심 중학교로, 경기 남부에서 특목고 및 외대부고 합격자를 가장 많이 냅니다.',
      details: [
        '학군 환경: 수내동 양지마을과 파크타운 아파트 단지에 둘러싸여 유해시설이 전무하고 중앙공원이 인접해 쾌적함',
        '진학 연계: 낙생고, 분당고, 대진고, 서현고 등 분당 명문고 진학의 베이스캠프'
      ],
      linkUrl: 'https://naejeong-m.goesn.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'mid-eulji',
      level: 'middle',
      name: '을지중학교',
      type: '공립 중학교',
      typeBadge: '명문중학',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 노원(중계)',
      rankHighlight: '강북 노원 1위',
      statPrimary: '특목·자사고 58명 진학 (과고 7명, 외고 24명, 자사고 27명)',
      statSecondary: '중계동 은행사거리 학업성취도 1위',
      features: ['은행사거리 학원가 중심', '대진고·서라벌고 연계', '가성비 최고 학군지'],
      admissionType: '서울 북부교육지원청 중계학군 배정',
      summary: '강북의 대치동이라 불리는 노원구 중계동 은행사거리 학원가를 품고 있어, 강북권에서 가장 강력한 학업 성취도를 나타내는 중학교입니다.',
      details: [
        '위치적 장점: 은행사거리 학원가 도보 3분 거리로 방과 후 학원 동선이 완벽함'
      ],
      linkUrl: 'https://eulji.sen.ms.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'mid-dongdo',
      level: 'middle',
      name: '동도중학교',
      type: '공립 중학교',
      typeBadge: '명문중학',
      typeColor: 'emerald',
      region: 'daegu',
      regionName: '대구 수성(범어)',
      rankHighlight: '대구 수성구 1위',
      statPrimary: '특목·자사고 54명 진학 (대구과고·경신고 연계)',
      statSecondary: '수성구 수학 성취도 최상위',
      features: ['범어동 명문학군', '경신고·대륜고 남고 라인', '의대 진학 로드맵'],
      admissionType: '대구 동부교육지원청 수성학군 배정',
      summary: '대구 수성구 범어4동 학원가에 위치하여 지역 의대 열풍의 출발점이 되는 대표 명문 중학교입니다.',
      details: [
        '학군 특징: 경신중, 정화중과 함께 수성구 3대 명문으로 꼽히며 범어동 아파트 시세를 견인하는 핵심 학교'
      ],
      linkUrl: 'http://dongdo.ms.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },

    // 3. 초등학교 데이터 (명문 공립 학군초 & 전국 명문 사립초)
    {
      id: 'elem-younghoon',
      level: 'elementary',
      name: '영훈초등학교',
      type: '사립 초등학교',
      typeBadge: '사립초 명문',
      typeColor: 'amber',
      region: 'seoul',
      regionName: '서울 강북(미아)',
      rankHighlight: '사립초 선호도 1위',
      statPrimary: '이머전(영어몰입) 수업 50% 편성',
      statSecondary: '입학 경쟁률 평균 8.5:1 ~ 12:1',
      features: ['한국 최초 영어몰입교육', '원어민 담임 더블티칭', '영훈국제중 연계', '서울 전역 셔틀'],
      tuition: '분기당 약 250~300만 원 (연간 약 1,100~1,300만 원)',
      admissionType: '전국 단위 추첨 선발 (매년 11월 원서접수 및 비대면 공개추첨)',
      summary: '수학, 과학, 사회 과목을 원어민 교사와 한국인 교사가 공동으로 영어 몰입 수업을 진행하는 대한민국 최고 인기의 명문 사립초등학교입니다.',
      details: [
        '선발 방식: 매년 11월 진학사어플라이를 통해 지원하며, 남·여 분리 무작위 전산 추첨으로 선발',
        '교육과정: 1학년부터 정규 교과 수업의 절반을 영어로 진행하여 초등 졸업 시 원어민 수준의 바이링구얼 능력 습득',
        '통학 버스: 강북, 성북, 노원뿐 아니라 종로, 서초, 강남 일부까지 총 20여 개 스쿨버스 노선 운영'
      ],
      linkUrl: 'http://www.younghoon.es.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'elem-gyeseong',
      level: 'elementary',
      name: '계성초등학교',
      type: '사립 초등학교',
      typeBadge: '사립초 명문',
      typeColor: 'amber',
      region: 'seoul',
      regionName: '서울 서초(반포)',
      rankHighlight: '강남·서초 선호도 1위',
      statPrimary: '140년 전통 가톨릭 명문',
      statSecondary: '서초 반포 아크로·래미안 학군',
      features: ['반포 원베일리 인접', '인성·예체능 특화', '1인 1악기 오케스트라', '최신 스마트캠퍼스'],
      tuition: '분기당 약 260~320만 원',
      admissionType: '추첨 선발 (강남·서초 학부모 경쟁률 치열)',
      summary: '명동에서 반포로 이전한 대한민국 최초의 사립초등학교로, 반포 최고급 주거 단지 한가운데 위치해 정·재계 및 전문직 자녀들이 많이 찾는 명문입니다.',
      details: [
        '특징: 가톨릭 영성 교육을 바탕으로 한 철저한 인성 지도와 전교생 오케스트라, 수영장 완비 체육 교육',
        '인프라: 반포 아크로리버파크, 래미안원베일리 맞은편에 위치하여 도보 통학 및 강남권 스쿨버스망 발달'
      ],
      linkUrl: 'http://www.gyeseong.es.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'elem-lila',
      level: 'elementary',
      name: '리라초등학교',
      type: '사립 초등학교',
      typeBadge: '사립초 명문',
      typeColor: 'amber',
      region: 'seoul',
      regionName: '서울 중구(남산)',
      rankHighlight: '예체능·빙상 특화 1위',
      statPrimary: '피겨·쇼트트랙 빙상장 보유',
      statSecondary: '노란 스쿨버스 & 교복 상징',
      features: ['수영·빙상·스키 전교생 마스터', '플루트·바이올린 1인 1악기', '남산 생태환경'],
      tuition: '분기당 약 240~280만 원',
      admissionType: '전국 지원 전산 추첨 선발',
      summary: '남산 자락에 자리 잡아 전교생 빙상, 수영, 스키, 골프 등 독보적인 예체능 엘리트 교육과 꼼꼼한 기초학력 지도로 유명한 전통의 명문 사립초입니다.',
      details: [
        '특색 교육: 교내 자체 아이스링크와 수영장을 보유하여 계절 스포츠를 마스터하도록 지도',
        '동문 네트워크: 유명 연예인 및 스포츠 스타, 각계 리더 동문 다수 배출'
      ],
      linkUrl: 'http://www.lila.es.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'elem-daecheong',
      level: 'elementary',
      name: '서울대청초등학교',
      type: '공립 초등학교',
      typeBadge: '학군 명문',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 강남(대치)',
      rankHighlight: '대치동 대표 공립초',
      statPrimary: '학급당 학생수 26.8명',
      statSecondary: '대치동 은마·우성 아파트 학군',
      features: ['대치동 학원가 도보 5분', '대청중 직결 배정', '늘봄학교 선도 운영'],
      admissionType: '주소지 기반 근거리 배정',
      summary: '대치동 학원가 바로 옆에 위치하여 취학 전부터 전국 각지에서 명문 중·고교 진학을 염두에 두고 전입해 오는 대치동의 대표 초등학교입니다.',
      details: [
        '학군 파워: 졸업생 대다수가 명문 대청중학교나 단대부중으로 배정되어 조기 학군 정착에 이상적'
      ],
      linkUrl: 'https://daecheong.sen.es.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'elem-mokun',
      level: 'elementary',
      name: '서울목운초등학교',
      type: '공립 초등학교',
      typeBadge: '학군 명문',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 양천(목동)',
      rankHighlight: '목동 최고 과밀 명문초',
      statPrimary: '전교생 1,800명+ 대규모',
      statSecondary: '목운중 100% 진학 배정',
      features: ['목동 핵심 상업·학원가', '목운중 연계 학군', '높은 기초학력'],
      admissionType: '목동 7단지 거주자 주소지 배정',
      summary: '목동 7단지 주민들만 배정받을 수 있는 초등학교로, 목운중학교로 직결되는 프리미엄 때문에 전국에서 초등 입학을 위해 가장 많이 몰려드는 곳 중 하나입니다.',
      details: [
        '특징: 전교생이 방과 후 대형 어학원 및 수학 전문학원으로 이동하기 쉬운 최적의 동선'
      ],
      linkUrl: 'https://mokun.sen.es.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },
    {
      id: 'elem-gyeongdong',
      level: 'elementary',
      name: '대구경동초등학교',
      type: '공립 초등학교',
      typeBadge: '학군 명문',
      typeColor: 'emerald',
      region: 'daegu',
      regionName: '대구 수성(범어)',
      rankHighlight: '대구 수성구 1위 초등',
      statPrimary: '전교생 1,900명+ 영남 최대',
      statSecondary: '범어4동 힐스테이트·두산위브 학군',
      features: ['범어동 학원가 도보권', '동도중·정화중 연계', '높은 교육열'],
      admissionType: '대구 수성구 주소지 배정',
      summary: '지방 아파트 시장과 학군을 논할 때 빠지지 않는 대구 수성구 범어4동의 대표 초등학교로, 탄탄한 기초 교육과 학원가 시너지로 유명합니다.',
      details: [
        '배정 아파트: 범어동 두산위브더제니스, 범어 힐스테이트 등 대구 최고가 주거지 밀집'
      ],
      linkUrl: 'http://kyungdong.es.kr',
      schoolInfoUrl: 'https://www.schoolinfo.go.kr'
    },

    // 4. 유치원 데이터 (공립단설/사립/영어유치원)
    {
      id: 'k-gate',
      level: 'kindergarten',
      name: 'GATE (게이트) 영어유치원 대치/압구정/서초',
      type: '영어유치원 (어학원 유치부)',
      typeBadge: '영유 명문',
      typeColor: 'pink',
      region: 'seoul',
      regionName: '서울 강남·서초',
      rankHighlight: '영어유치원 1티어',
      statPrimary: '7세 고시(입학테스트) 경쟁률 5:1+',
      statSecondary: '미국 초등 2~3학년 리딩레벨 달성',
      features: ['영재식 언어몰입 교육', '입학 레벨테스트 필수', '사립초·국제학교 진학 최다'],
      tuition: '월 약 250~300만 원 (급식·교재·셔틀 포함)',
      admissionType: '자체 지필평가 및 원어민 1:1 구술테스트',
      summary: '강남·서초 학부모들 사이에서 이른바 "4세·5세·7세 고시"로 불리는 까다로운 입학테스트를 거쳐야 들어갈 수 있는 최상위권 영어유치원입니다.',
      details: [
        '커리큘럼: 미국 원어민 담임 전담제, 미국 교과서 기반 파닉스, 리딩, 롸이팅, 과학·사회 융합 토론 수업',
        '원아 수준: 7세 졸업 시점에 미국 초등 2~3학년 수준의 챕터북(아서, 매직트리하우스) 자율 독서 가능',
        '추천 경로: 영훈초, 계성초 등 명문 사립초 진학이나 대치동 유명 대형 어학원(ILE, PEAI 등) 상위 레벨 직결'
      ],
      linkUrl: 'https://www.gate.co.kr',
      schoolInfoUrl: 'https://e-childschoolinfo.moe.go.kr'
    },
    {
      id: 'k-rise',
      level: 'kindergarten',
      name: '라이즈어학원 (Rise Korea) 유치부',
      type: '영어유치원 (프랜차이즈)',
      typeBadge: '영유 인기',
      typeColor: 'pink',
      region: 'all',
      regionName: '전국 주요 학군 (목동/분당/수지/해운대 등)',
      rankHighlight: '전국 영유 선호도 최상위',
      statPrimary: '체계적인 미국 몰입 커리큘럼',
      statSecondary: '5~7세 1년차·2년차·3년차 반 편성',
      features: ['글로벌 교육 브랜드', '리터러시(독서) 집중', '통학 셔틀버스 운영'],
      tuition: '월 약 180~230만 원',
      admissionType: '원수접수 및 구술 인터뷰',
      summary: '미국 현지 교재와 체계적인 리터러시 프로그램으로 전국 주요 학군지마다 높은 인기를 누리는 글로벌 영어유치원 브랜드입니다.',
      details: [
        '특장점: 체계화된 본사 커리큘럼 관리로 지점별 교육 퀄리티 편차가 적고 원아 적응도가 높음'
      ],
      linkUrl: 'http://www.risekorea.com',
      schoolInfoUrl: 'https://e-childschoolinfo.moe.go.kr'
    },
    {
      id: 'k-public-seoul',
      level: 'kindergarten',
      name: '서울포이초등학교병설유치원 (공립)',
      type: '공립 병설유치원',
      typeBadge: '국공립',
      typeColor: 'emerald',
      region: 'seoul',
      regionName: '서울 강남',
      rankHighlight: '국공립 만족도 최우수',
      statPrimary: '교육비 전액 무상 (학부모 부담금 0원)',
      statSecondary: '방과후과정 100% 전원 수용',
      features: ['초등학교 시설 연계', '친환경 영양교사 급식', '저녁 돌봄 운영', '처음학교로 추첨'],
      tuition: '0원 (정부 무상지원)',
      admissionType: '처음학교로 온라인 추첨 (우선모집 / 일반모집)',
      summary: '넓은 초등학교 운동장과 강당, 완벽한 친환경 급식, 무상 교육 혜택으로 맞벌이 학부모들의 신뢰도가 매우 높은 대표 공립 유치원입니다.',
      details: [
        '신청 방법: 교육부 처음학교로(go-firstschool.go.kr) 시스템에서 11월 접수',
        '우선모집 대상: 법정저소득층, 국가보훈대상자, 북한이탈주민, 다자녀(2자녀 이상) 가구'
      ],
      linkUrl: 'https://poi.sen.kg.kr',
      schoolInfoUrl: 'https://e-childschoolinfo.moe.go.kr'
    }
  ],

  // 2. 대한민국 7대 명문 학군지 심층 분석
  districts: [
    {
      id: 'dist-daechi',
      name: '서울 강남 대치동 학군',
      regionName: '서울 강남구',
      tag: '대한민국 사교육 1번지',
      badgeColor: 'rose',
      keyStrengths: '전국 최강 학원가 1,000곳+ 밀집, 수능 정시 및 의대 진학 전국 1위',
      hotSpots: '한티역~대치역 사거리, 은마아파트 사거리',
      feederLine: '대청초/대곡초 ➡️ 대청중/도곡중/단대부중 ➡️ 단대부고/중동고/휘문고/숙명여고',
      analysis: '대치동은 대한민국에서 가장 촘촘한 레벨별 단과학원과 스타강사진이 포진해 있습니다. 초등 고학년부터 의대반 선행이 활성화되어 있으며, 남학생의 경우 단대부고·중동고·휘문고 등 정시 파워가 막강한 고교 라인업이 완비되어 있습니다.',
      tips: '대치동 진입은 초등 3~4학년 무렵 수학 학원 레벨테스트를 고려해 전입하는 경우가 가장 많습니다.'
    },
    {
      id: 'dist-mokdong',
      name: '서울 양천 목동 학군',
      regionName: '서울 양천구',
      tag: '서부권 최고 교육 특구',
      badgeColor: 'amber',
      keyStrengths: '중학교 학업성취도 전국 1위, 특목·자사고 진학률 최다, 앞단지·뒷단지 탄탄한 공교육',
      hotSpots: '목동 앞단지(1~6단지), 뒷단지(7~14단지), 오목교역 중심상업지구',
      feederLine: '목운초/서정초/월촌초 ➡️ 목운중/월촌중/신목중 ➡️ 강서고/양천고/목동고/한가람고',
      analysis: '목동은 평지 대단지 아파트에 유해시설이 없고, 특목고·자사고를 가장 많이 보내는 중학교들이 즐비합니다. 수학과 영어 전문학원이 촘촘하며, 대치동에 비해 실수요자 중심의 면학 분위기가 굳건합니다.',
      tips: '앞단지(1~6단지)는 차분한 분위기와 초·중학교 접근성이 좋고, 뒷단지(7~14단지)는 목운중 학군 및 대형 학원가 이동이 편리합니다.'
    },
    {
      id: 'dist-junggye',
      name: '서울 노원 중계동 학군',
      regionName: '서울 노원구',
      tag: '강북 최고 은행사거리 학군',
      badgeColor: 'emerald',
      keyStrengths: '가성비 최고 학군지, 은행사거리 400여 개 학원 밀집, 명문 일반고 다수 포진',
      hotSpots: '을지초·중 사거리, 은행사거리 메인 상권',
      feederLine: '을지초/중계초 ➡️ 을지중/중계중/상명중 ➡️ 대진고/서라벌고/대진여고/영신여고',
      analysis: '강북권 학부모들의 종착역으로, 대치·목동 대비 주거비용 부담이 덜하면서도 대치동 대형 학원 직영 분원들이 은행사거리에 집결해 있어 우수한 입시 실적을 꾸준히 냅니다.',
      tips: '초등 고학년 때 강북·동대문·성북·의정부 등 인근 지역에서 중계동으로 갈아타는 수요가 꾸준합니다.'
    },
    {
      id: 'dist-bundang',
      name: '경기 성남 분당 학군',
      regionName: '경기 성남시',
      tag: '경기 1등 명문 신도시 학군',
      badgeColor: 'blue',
      keyStrengths: '낙생고·분당대진고 등 전국구 일반고, 수내·정자역 학원가, 쾌적한 주거',
      hotSpots: '수내동 학원가, 정자역 카페거리 주변, 서현동 로데오',
      feederLine: '내정초/수내초/서현초 ➡️ 내정중/수내중/서현중 ➡️ 낙생고/분당고/대진고/중앙고',
      analysis: '판교 테크노밸리 IT·연구직 부모들의 높은 교육열과 쾌적한 분당 인프라가 결합되어 경기 남부 최고의 대입 실적을 유지합니다. 일반고의 수능 파워가 강남권에 필적합니다.',
      tips: '수내동 양지마을, 파크타운 라인이 전통의 선호 1순위이며, 판교 보평초·중·고 라인도 신흥 명문으로 자리 잡았습니다.'
    },
    {
      id: 'dist-pyeongchon',
      name: '경기 안양 평촌 학군',
      regionName: '경기 안양시 동안구',
      tag: '수도권 남부 핵심 학원가',
      badgeColor: 'indigo',
      keyStrengths: '귀인동 평촌대로변 300+ 학원가, 경기남부 광역 학원 셔틀망, 신기·귀인중',
      hotSpots: '귀인중 사거리, 평촌 먹자골목 맞은편 학원 밀집대로',
      feederLine: '귀인초/민백초 ➡️ 귀인중/평촌중/범계중 ➡️ 백영고/평촌고/안양외고/동안고',
      analysis: '안양, 군포(산본), 의왕, 과천 학부모들까지 모두 흡수하는 대형 학원가가 완비되어 있어 초·중·고 학업을 평촌 내에서 원스톱으로 끝낼 수 있습니다.',
      tips: '귀인동 꿈마을, 향촌마을 라인이 귀인초·귀인중 배정으로 가장 선호도가 높습니다.'
    },
    {
      id: 'dist-suseong',
      name: '대구 수성구 범어동 학군',
      regionName: '대구 수성구',
      tag: '지방 최고의 의대 불패 학군',
      badgeColor: 'purple',
      keyStrengths: '전국 의대 합격률 최상위, 범어네거리 대형 학원가, 경신·대륜·정화 라인업',
      hotSpots: '범어4동 로데오 사거리, 만촌3동 만촌역 일대',
      feederLine: '경동초/동도초 ➡️ 동도중/정화중/경신중 ➡️ 경신고/대륜고/정화여고/대구여고',
      analysis: '지방에서 유일하게 서울 강남과 직접 비교되는 학군으로, 경북대·영남대·계명대·대구가톨릭대 등 영남권 의대 정원을 흡수하는 강력한 정시 경쟁력을 자랑합니다.',
      tips: '의대 진학을 목표로 하는 지방 상위권 학부모들의 최종 종착지로 꼽힙니다.'
    },
    {
      id: 'dist-haeundae',
      name: '부산 해운대 센텀·우동 학군',
      regionName: '부산 해운대구',
      tag: '부산·경남 최고 부촌 교육특구',
      badgeColor: 'pink',
      keyStrengths: '센텀시티 마린시티 최고 주거 인프라, 해운대중·고, 부산외고·과학고 연계',
      hotSpots: '센텀시티 학원가, 우동 마린시티 상권, 좌동 신시가지 학원가',
      feederLine: '해동초/센텀초 ➡️ 센텀중/해운대중/동백중 ➡️ 해운대고/부산외고/해운대여고',
      analysis: '해운대 센텀시티와 마린시티 일대의 전문직 종사자들이 대거 유입되면서 전통의 동래 학군을 넘어 부산 최고 학군지로 부상했습니다.',
      tips: '해운대고(자사고)와 부산국제고, 한국과학영재학교(부산 당감동) 등 특목고 진학률이 우수합니다.'
    }
  ],

  // 3. 2028 대입 개편안 & 고입/대입 핵심 가이드
  admissions: [
    {
      id: 'guide-2028-csat',
      title: '2028 대입 개편안 핵심 총정리 (현 중3·중2 필독)',
      category: '2028 대입 개편',
      badge: '대입 대변화',
      badgeColor: 'rose',
      summary: '고교 내신 9등급제가 5등급제로 완화되고, 수능 국어·수학·탐구 선택과목이 폐지되어 모든 수험생이 동일한 시험을 치릅니다.',
      points: [
        '내신 5등급제 전환: 1등급(10%), 2등급(누적 34%), 3등급(누적 66%), 4등급(누적 90%), 5등급(하위 10%)으로 단순화',
        '특목·자사고 유리: 종전 9등급제에서 내신 4% 들기가 매우 어렵던 특목고·자사고가 10%까지 1등급을 받게 되어 선호도 급상승',
        '수능 통합형 개편: 문·이과 구분 없이 [통합사회]와 [통합과학]을 모든 학생이 공통 응시 (수학 심화 미적분Ⅱ/기하는 제외)',
        '대학별 고사 강화 전망: 내신 변별력 약화로 인해 서울 주요 대학들이 심층 면접, 논술, 정시 학생부 정성평가를 확대할 가능성 높음'
      ]
    },
    {
      id: 'guide-high-choice',
      title: '일반고 vs 자사고 vs 특목고: 내 아이 성향별 선택 가이드',
      category: '고교 선택 전략',
      badge: '고교 선택',
      badgeColor: 'indigo',
      summary: '2028 대입 개편안 하에서 내 아이의 학습 역량과 멘탈에 맞는 최적의 고등학교 유형을 분석합니다.',
      points: [
        '자사고(외대부고/상산고/하나고) 추천: 수학·과학 기본기가 탄탄하고, 치열한 경쟁 속에서도 쉽게 위축되지 않는 승부욕이 있는 학생',
        '외고·국제고 추천: 어학 및 인문사회 토론, 독서 역량이 뛰어나며, 문과 최상위권 로스쿨·상경계열 진학을 희망하는 학생',
        '명문 일반고 추천: 지역 학원가 인프라를 활용해 수능 정시와 내신 관리를 안정적으로 병행하고 싶은 실속형 학생',
        '영재학교·과학고 추천: 수학·과학에 대한 순수 지적 호기심과 몰입력이 남달라 R&D 연구자 및 이공계 리더를 꿈꾸는 학생'
      ]
    },
    {
      id: 'guide-first-school',
      title: '처음학교로 유치원 입학 완벽 가이드 & 우선모집 팁',
      category: '유치원 입학',
      badge: '처음학교로',
      badgeColor: 'emerald',
      summary: '국·공립 및 사립 유치원에 입학하기 위해 전국 유치원이 참여하는 교육부 공식 온라인 입학관리시스템 이용 전략입니다.',
      points: [
        '모집 일정: 매년 11월 초 [우선모집] 접수 ➡️ 11월 중순 [일반모집] 3개원 희망 순위 접수 ➡️ 추첨 발표',
        '우선모집 자격: 법정저소득층, 국가보훈대상자, 북한이탈주민 및 [다자녀(2자녀 이상) 가구] 혜택 전면 적용',
        '희망 순위 배분 팁: 1희망은 가장 가고 싶은 소신 지원, 2·3희망은 선발 인원이 많거나 안정권인 곳으로 분산 지원 권장'
      ]
    },
    {
      id: 'guide-private-elem',
      title: '전국 사립초등학교 입학 추첨 전략 & 인터뷰 가이드',
      category: '사립초 입학',
      badge: '사립초 입학',
      badgeColor: 'amber',
      summary: '경쟁률이 치열한 사립초등학교(영훈, 계성, 리라 등)의 원서 접수 일정과 전산 추첨, 입학 준비 체크리스트입니다.',
      points: [
        '추첨 방식: 서울 사립초는 진학사어플라이 시스템을 통한 비대면 무작위 전산 추첨으로 공정하게 진행',
        '중복 지원 전략: 최대 3~4개 학교까지 중복 접수가 가능하므로 셔틀버스 노선이 집 앞을 지나는지 사전 확인 필수',
        '주요 체크 포인트: 연간 1,000~1,500만 원 선의 학비 부담 능력, 방과후 돌봄 운영 시간, 통학 소요 시간 점검'
      ]
    }
  ]
};
