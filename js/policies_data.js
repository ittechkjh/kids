// 도담톡 (DodamTalk) - 대한민국 육아 정책 & 정부 지원금 데이터셋 (2024~2026 최신 개정판)
// 다자녀 혜택, 에너지바우처, 자녀장려금, 부모급여, 아동수당, 지자체별 출산지원금 등
window.DODAM_POLICIES_DATA = {
  updatedAt: '2026-10-28',
  categories: [
    { id: 'all', name: '전체 모아보기', icon: 'fa-layer-group', color: 'slate' },
    { id: 'multi_child', name: '👨‍👩‍👧‍👦 다자녀 혜택', icon: 'fa-people-roof', color: 'amber' },
    { id: 'cash_allowance', name: '💵 부모급여·아동수당', icon: 'fa-money-bill-wave', color: 'emerald' },
    { id: 'energy_living', name: '⚡ 에너지바우처·요금감면', icon: 'fa-bolt', color: 'rose' },
    { id: 'tax_credit', name: '📈 자녀장려금·세제', icon: 'fa-chart-line', color: 'blue' },
    { id: 'birth_voucher', name: '🎁 첫만남이용권·바우처', icon: 'fa-gift', color: 'pink' },
    { id: 'local_gov', name: '🏛️ 지자체별 특화지원금', icon: 'fa-building-columns', color: 'purple' },
    { id: 'childcare_leave', name: '👶 육아휴직·돌봄', icon: 'fa-baby', color: 'indigo' }
  ],

  // 빠른 공식 포털 링크
  portals: [
    {
      name: '복지로 (Bokjiro)',
      desc: '부모급여·아동수당·양육수당 온라인 신청 및 모의계산',
      url: 'https://www.bokjiro.go.kr',
      icon: 'fa-heart-circle-check',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      name: '정부24 (행복출산)',
      desc: '출생신고 시 첫만남이용권·전기요금할인 원스톱 일괄신청',
      url: 'https://www.gov.kr/portal/rcvfvrSvc/dtlEx/000000000001',
      icon: 'fa-building-user',
      bgColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: '에너지바우처 포털',
      desc: '영유아·임산부 포함 수급가구 냉·난방 에너지바우처 신청',
      url: 'https://www.energyv.or.kr',
      icon: 'fa-bolt-lightning',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      name: '국세청 홈택스 (자녀장려금)',
      desc: '소득 7천만원 미만 가구 자녀 1인당 최대 100만원 신청',
      url: 'https://www.hometax.go.kr',
      icon: 'fa-file-invoice-dollar',
      bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      name: '한전ON (전기요금 할인)',
      desc: '출산 3년 미만 영유아가구 전기요금 30% 감면 신청',
      url: 'https://online.kepco.co.kr',
      icon: 'fa-plug-circle-bolt',
      bgColor: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ],

  // 핵심 정책 항목 리스트
  policies: [
    // 1. 에너지바우처 및 요금감면
    {
      id: 'energy-voucher-main',
      title: '영유아·임산부 가구 에너지바우처 (냉·난방비 지원)',
      category: 'energy_living',
      categoryName: '에너지바우처·요금감면',
      categoryColor: 'rose',
      amountHighlight: '연간 가구당 최대 약 30~70만 원 바우처 지급',
      targetGroup: '기초생활수급가구 중 영유아(만 6세 이하) 또는 임산부 포함 가구',
      ageGroup: 'infant',
      region: 'all',
      regionName: '전국 공통',
      badge: '여름/겨울 필수신청',
      summary: '더위와 추위에 취약한 영유아·임산부 가구에 전기, 도시가스, 지역난방, 등유, 연탄 등을 구매할 수 있는 이용권을 지원합니다.',
      details: [
        '지원대상: 국민기초생활보장법상 생계·의료·주거·교육급여 수급자 중 본인 또는 세대원이 영유아(2018.1.1 이후 출생자) 또는 임산부인 가구',
        '지원형태: 실물 국민행복카드 바우처 또는 고지서 자동 요금차감 방식 선택 가능',
        '하절기 지원(7~9월): 전기요금 자동 차감',
        '동절기 지원(10~4월): 전기, 도시가스, 지역난방, 등유, 연탄, LPG 중 선택 결제',
        '잔액 이월: 하절기 바우처 미사용 잔액은 동절기로 자동 이월되어 겨울 난방비로 사용 가능'
      ],
      applyMethod: '주민등록상 거주지 읍·면·동 주민센터 방문 또는 복지로(bokjiro.go.kr) 온라인 신청',
      applyUrl: 'https://www.energyv.or.kr',
      applySiteName: '에너지바우처 포털'
    },
    {
      id: 'kepco-infant-discount',
      title: '한전 출산가구(영유아) 전기요금 30% 감면',
      category: 'energy_living',
      categoryName: '에너지바우처·요금감면',
      categoryColor: 'rose',
      amountHighlight: '월 전기요금의 30% 감면 (월 최대 16,000원 한도)',
      targetGroup: '출생일로부터 3년 미만인 영아가 1인 이상 포함된 모든 가구 (소득 무관)',
      ageGroup: 'infant',
      region: 'all',
      regionName: '전국 공통',
      badge: '소득무관 100% 지원',
      summary: '출생 후 3년이 되는 날까지 매월 전기요금을 30% 감면받아 여름철 에어컨 및 겨울 난방기기 부담을 덜어줍니다.',
      details: [
        '지원대상: 가구원 중 출생일로부터 3년 미만 영아가 1인 이상 포함된 주택용 전기 고객',
        '소득 요건: 소득·재산 기준 없음 (모든 출산 가정 신청 가능)',
        '적용 기간: 신청일이 속한 월부터 영아가 만 3세가 되는 달까지 지속 적용',
        '아파트 거주자: 관리비 고지서에서 차감되도록 한전 고객센터(123) 신청 후 아파트 관리사무소에 동·호수 통보 필요',
        '에너지바우처와 중복 수혜 가능 (단, 실제 청구금액 한도 내 감면)'
      ],
      applyMethod: '한전ON(online.kepco.co.kr), 한전 고객센터(국번없이 123), 또는 정부24 행복출산 원스톱 신청',
      applyUrl: 'https://online.kepco.co.kr',
      applySiteName: '한전ON 바로가기'
    },
    {
      id: 'gas-multichild-discount',
      title: '다자녀 & 출산가구 도시가스 요금 경감',
      category: 'energy_living',
      categoryName: '에너지바우처·요금감면',
      categoryColor: 'rose',
      amountHighlight: '동절기 월 최대 18,000원 / 기타 월 3,300원 할인',
      targetGroup: '만 18세 미만 자녀 3인 이상 다자녀 가구 (또는 지자체별 2자녀 확대 가구)',
      ageGroup: 'multi',
      region: 'all',
      regionName: '전국 공통',
      badge: '동절기 난방비 절감',
      summary: '자녀가 많은 다자녀 가구의 난방비 부담을 줄이기 위해 취사 및 난방용 도시가스 요금을 월 최대 18,000원까지 할인합니다.',
      details: [
        '지원대상: 세대주와의 관계가 자(子) 또는 손(孫)으로 만 18세 미만인 자녀가 3인 이상인 다자녀 가구',
        '경감금액: 동절기(12월~3월) 월 18,000원 / 기타 월(4월~11월) 월 3,300원 요금 차감',
        '신청서류: 도시가스 요금 고지서 납부자번호, 주민등록등본',
        '이사 시 주의: 이사한 경우 관할 도시가스사에 재신청해야 계속 할인 유지'
      ],
      applyMethod: '관할 도시가스사 콜센터, 읍·면·동 주민센터 방문, 또는 정부24 온라인 신청',
      applyUrl: 'https://www.gov.kr',
      applySiteName: '정부24 바로가기'
    },

    // 2. 자녀장려금 및 세제 혜택
    {
      id: 'child-tax-credit-2024',
      title: '국세청 자녀장려금 (Child Tax Credit) 대폭 확대',
      category: 'tax_credit',
      categoryName: '자녀장려금·세제',
      categoryColor: 'blue',
      amountHighlight: '18세 미만 자녀 1인당 최대 100만 원 지급 (자녀수 비례)',
      targetGroup: '부부합산 연 소득 7,000만 원 미만 가구 (재산 2억 4천만원 미만)',
      ageGroup: 'school',
      region: 'all',
      regionName: '전국 공통',
      badge: '소득기준 7천만원 완화',
      summary: '2024년부터 소득 기준이 4,000만 원에서 7,000만 원으로 대폭 상향되었으며, 지급액도 자녀당 최대 100만 원으로 늘어났습니다.',
      details: [
        '소득요건: 부부 총소득 7,000만 원 미만 (홑벌이·맞벌이 공통 적용)',
        '재산요건: 가구원 전원의 전년도 재산 합계액 2억 4,000만 원 미만 (1억 7천만원~2억 4천만원 미만은 산정액의 50% 지급)',
        '부양자녀 요건: 전년도 12월 31일 기준 만 18세 미만(중증장애인은 연령 무관)',
        '신청기간: 정기신청 매년 5월 1일~5월 31일 (8월 말 입금) / 기한 후 신청 6월 1일~11월 30일 (산정액의 95% 지급)',
        '지급방식: 신청 시 입력한 본인 명의 계좌로 현금 일괄 입금'
      ],
      applyMethod: '국세청 홈택스(hometax.go.kr), 손택스(모바일 앱), 또는 ARS 전화(1544-9944)',
      applyUrl: 'https://www.hometax.go.kr',
      applySiteName: '국세청 홈택스'
    },
    {
      id: 'car-tax-exemption-multi',
      title: '다자녀 가구 자동차 취득세 감면',
      category: 'multi_child',
      categoryName: '다자녀 혜택',
      categoryColor: 'amber',
      amountHighlight: '7~9인승 100% 전액 면제 / 6인승 이하 승용차 최대 140만 원 감면',
      targetGroup: '만 18세 미만 자녀 3명 이상 양육 가구 (또는 2자녀 감면 조례 지자체)',
      ageGroup: 'multi',
      region: 'all',
      regionName: '전국 공통',
      badge: '차량 구매 필수혜택',
      summary: '다자녀 가구가 승용·승합차량을 취득할 때 취득세를 전액 면제하거나 최대 140만 원까지 감면해 차량 구매 비용을 아껴줍니다.',
      details: [
        '지원대상: 18세 미만의 직계비속 3명 이상을 양육하는 자 (가족관계등록부 기준)',
        '감면범위: 세대당 1대 (기존 감면 차량 말소 또는 이전 조건)',
        '7~9인승 승용차 & 10~15인승 승합차: 취득세 100% 전액 면제 (상한 없음)',
        '6인승 이하 승용차: 취득세 140만 원까지 전액 면제 (140만 원 초과 시 85% 감면)',
        '유의사항: 차량 취득 후 1년 이내 정당한 사유 없이 소유권을 이전하거나 세대를 분가하면 감면된 세액이 추징될 수 있습니다.'
      ],
      applyMethod: '관할 시·군·구청 세무과 방문 또는 자동차 등록 시 취득세 감면 신청서 제출',
      applyUrl: 'https://www.wetax.go.kr',
      applySiteName: '위택스 (WeTax)'
    },
    {
      id: 'rail-multichild-discount',
      title: 'KTX & SRT 다자녀 행복 열차 할인',
      category: 'multi_child',
      categoryName: '다자녀 혜택',
      categoryColor: 'amber',
      amountHighlight: '부모 및 만 25세 미만 자녀 동승 시 어른 운임 30%~50% 할인',
      targetGroup: '만 25세 미만 자녀가 2명 이상인 다자녀 가구 회원',
      ageGroup: 'multi',
      region: 'all',
      regionName: '전국 공통',
      badge: '2자녀부터 적용',
      summary: '가족 여행이나 명절 이동 시 코레일(KTX)과 SR(SRT) 열차의 어른 운임을 최대 50%까지 할인받을 수 있습니다.',
      details: [
        '대상 자격: 코레일 멤버십 회원 중 만 25세 미만 자녀 2명 이상을 둔 회원 (2자녀 이상으로 요건 완화)',
        '할인율: 코레일(KTX) 어른 운임의 30% 할인 (자녀 3명 이상은 50% 할인) / SRT 어른 운임의 30% 할인',
        '이용조건: 등록된 가족 중 어른 1명을 포함하여 최소 3명 이상(어른+아이)이 편도 이용 시 적용',
        '사전등록: 코레일톡 앱 또는 레츠코레일 홈페이지에서 주민등록등본으로 [다자녀 행복 가족] 1회 인증 완료 후 예매'
      ],
      applyMethod: '레츠코레일(letskorail.com) 또는 코레일톡 앱 > 마이페이지 > 다자녀 행복 등록',
      applyUrl: 'https://www.letskorail.com',
      applySiteName: '레츠코레일 바로가기'
    },
    {
      id: 'housing-multichild-special',
      title: '공공분양·청약 다자녀 특별공급 기준 완화 (2자녀부터)',
      category: 'multi_child',
      categoryName: '다자녀 혜택',
      categoryColor: 'amber',
      amountHighlight: '2자녀 가구도 다자녀 특공 청약 자격 부여 & 배점 우대',
      targetGroup: '입주자모집공고일 기준 만 19세 미만 자녀 2명 이상 무주택세대구성원',
      ageGroup: 'multi',
      region: 'all',
      regionName: '전국 공통',
      badge: '청약 기준 대폭완화',
      summary: '기존 3자녀 이상만 가능했던 공공·민간분양 다자녀 특별공급 청약 자격이 2자녀 가구까지 대폭 확대되었습니다.',
      details: [
        '자격 요건: 만 19세 미만의 자녀 2명 이상(태아, 입양아 포함)을 둔 무주택세대구성원',
        '적용 대상: 공공분양, 뉴:홈, 공공임대주택 및 민영주택 특별공급',
        '배점 기준: 2자녀 25점, 3자녀 35점, 4자녀 이상 40점 등 자녀 수에 따라 차등 배점 적용',
        '소득 및 자산 요건: 공급 유형(공공/민영) 및 전용면적에 따라 도시근로자 월평균소득 160% 이하 등 상이'
      ],
      applyMethod: '한국부동산원 청약홈(applyhome.co.kr) 또는 LH청약플러스(apply.lh.or.kr)',
      applyUrl: 'https://www.applyhome.co.kr',
      applySiteName: '청약홈 바로가기'
    },

    // 3. 부모급여 & 아동수당 & 첫만남이용권
    {
      id: 'parent-allowance-2024',
      title: '2024~2026 대한민국 부모급여 (만 0~1세)',
      category: 'cash_allowance',
      categoryName: '부모급여·아동수당',
      categoryColor: 'emerald',
      amountHighlight: '만 0세 월 100만 원 / 만 1세 월 50만 원 (현금 지급)',
      targetGroup: '만 0~1세(0~23개월) 아동을 양육하는 모든 부모 (소득 무관)',
      ageGroup: 'infant',
      region: 'all',
      regionName: '전국 공통',
      badge: '0세 월 100만원',
      summary: '출산 초기 경제적 부담을 덜어주기 위해 만 0세(0~11개월) 아동은 월 100만 원, 만 1세(12~23개월) 아동은 월 50만 원을 매월 25일 현금으로 지급합니다.',
      details: [
        '지원대상: 2024년 이후 출생아 및 만 2세 미만 전 아동',
        '가정양육 시: 만 0세 월 100만 원, 만 1세 월 50만 원 전액 부모 통장으로 현금 입금',
        '어린이집 이용 시: 보육료 바우처 금액을 제외한 차액을 현금 지급 (0세 보육료 약 54만원 이용 시 차액 약 46만원 현금 수령)',
        '신청기한: 출생일 포함 60일 이내 신청 시 출생달부터 소급 지급 (60일 경과 후 신청 시 신청달부터 지급)',
        '아동수당(월 10만원)과 완전 별개로 중복 수령 가능!'
      ],
      applyMethod: '복지로(bokjiro.go.kr), 정부24 행복출산 원스톱, 또는 읍·면·동 주민센터 방문',
      applyUrl: 'https://www.bokjiro.go.kr',
      applySiteName: '복지로 부모급여'
    },
    {
      id: 'child-allowance-basic',
      title: '아동수당 (만 8세 미만 모든 아동)',
      category: 'cash_allowance',
      categoryName: '부모급여·아동수당',
      categoryColor: 'emerald',
      amountHighlight: '매월 25일 아동 1인당 월 10만 원 현금 지급',
      targetGroup: '만 0세부터 만 8세 미만(0~95개월) 모든 대한민국 아동 (소득 무관)',
      ageGroup: 'toddler',
      region: 'all',
      regionName: '전국 공통',
      badge: '만 8세까지 매월 10만원',
      summary: '아동 양육에 따른 경제적 부담을 줄이고 아동의 기본적 권리와 복지를 증진하기 위해 소득·재산과 상관없이 만 8세 미만까지 매월 10만 원을 지급합니다.',
      details: [
        '지급대상: 대한민국 국적을 보유한 만 8세 생일이 속하는 달의 전 달까지(0~95개월)',
        '지급일: 매월 25일 (토·일·공휴일인 경우 그 전날 지급)',
        '소득기준: 부모의 소득이나 재산에 관계없이 100% 전액 지급',
        '신청기간: 출생 후 60일 이내에 신청하면 출생일이 속한 달부터 소급 지급'
      ],
      applyMethod: '복지로(bokjiro.go.kr) 온라인 또는 주소지 읍·면·동 주민센터',
      applyUrl: 'https://www.bokjiro.go.kr',
      applySiteName: '복지로 아동수당'
    },
    {
      id: 'first-meeting-voucher',
      title: '첫만남이용권 (출산 바우처 지원금)',
      category: 'birth_voucher',
      categoryName: '첫만남이용권·바우처',
      categoryColor: 'pink',
      amountHighlight: '첫째아 200만 원 / 둘째아 이상 300만 원 (국민행복카드 포인트)',
      targetGroup: '대한민국 국적의 모든 출생아 (주민등록번호 부여 아동)',
      ageGroup: 'infant',
      region: 'all',
      regionName: '전국 공통',
      badge: '둘째아부터 300만원',
      summary: '출생 아동에게 초기 육아 부담을 줄이기 위해 첫째는 200만 원, 둘째 이상은 300만 원 상당의 바우처 포인트를 국민행복카드로 지급합니다.',
      details: [
        '지원금액: 첫째아 200만 원, 둘째아 이상 300만 원 (쌍둥이는 첫째 200만+둘째 300만=총 500만원)',
        '사용처: 유흥·사행·레저업소 등을 제외한 전 업종 (산후조리원, 산부인과, 백화점, 대형마트, 전자제품, 육아용품 등 폭넓게 사용 가능)',
        '사용기한: 아동 출생일(주민등록일)로부터 1년 이내 (미사용 잔액은 1년 후 자동 소멸)',
        '지급수단: 부모 명의 국민행복카드 바우처 포인트 자동 충전'
      ],
      applyMethod: '정부24(gov.kr), 복지로(bokjiro.go.kr) 또는 읍·면·동 주민센터 행복출산 원스톱 신청',
      applyUrl: 'https://www.gov.kr/portal/rcvfvrSvc/dtlEx/000000000001',
      applySiteName: '정부24 행복출산'
    },
    {
      id: 'pregnancy-medical-voucher',
      title: '임신·출산 진료비 바우처 (국민행복카드)',
      category: 'birth_voucher',
      categoryName: '첫만남이용권·바우처',
      categoryColor: 'pink',
      amountHighlight: '단태아 100만 원 / 다태아(쌍둥이) 140만 원',
      targetGroup: '임신확인서를 발급받은 모든 임산부 및 2세 미만 영유아',
      ageGroup: 'pregnancy',
      region: 'all',
      regionName: '전국 공통',
      badge: '병원비·약국 전액사용',
      summary: '임산부와 2세 미만 영유아의 건강한 진료와 출산을 지원하기 위해 병의원 및 약국에서 사용할 수 있는 바우처를 제공합니다.',
      details: [
        '지원금액: 1자녀 100만 원, 다태아(쌍둥이 이상) 140만 원 (분만취약지는 20만원 추가 지급)',
        '사용처: 산부인과 검진, 초음파, 기형아검사, 출산 비용, 한의원, 치과, 약국 및 영유아 진료비/처방약제비',
        '사용기한: 출산일(유산·사산일)로부터 2년 이내'
      ],
      applyMethod: '산부인과에서 임신확인서 발급 후 국민행복카드 발급 카드사 또는 국민건강보험공단 신청',
      applyUrl: 'https://www.nhis.or.kr',
      applySiteName: '국민건강보험공단'
    },

    // 4. 지자체별 특화 지원금
    {
      id: 'seoul-postpartum-care',
      title: '서울형 산후조리경비 바우처',
      category: 'local_gov',
      categoryName: '지자체별 특화지원금',
      categoryColor: 'purple',
      amountHighlight: '출생아 1인당 100만 원 (쌍둥이 200만 원, 삼둥이 300만 원)',
      targetGroup: '서울시에 주민등록을 두고 거주하는 모든 산모 (소득 기준 전면 폐지)',
      ageGroup: 'infant',
      region: 'seoul',
      regionName: '서울특별시',
      badge: '서울 산모 필수',
      summary: '산모의 빠른 산후 회복과 건강 관리를 위해 산후도우미, 산후 마사지, 한약 처방, 의약품 구매 등에 쓸 수 있는 바우처 100만 원을 지급합니다.',
      details: [
        '지원대상: 자녀 출생일 기준 서울시에 거주하는 모든 산모 (거주기간 조건 폐지)',
        '지원내용: 산모 전용 신용/체크카드에 100만 원 바우처 포인트 지급',
        '사용처: 산후도우미 정부지원 본인부담금(최대 50만원), 한의원 한약 조제, 산후 운동/체형교정/마사지, 의약품 구매 등',
        '신청기한: 출산일로부터 60일 이내 신청'
      ],
      applyMethod: '서울맘케어 시스템(seoul-momcare.com) 온라인 신청 또는 주소지 동주민센터 방문',
      applyUrl: 'https://www.seoul-momcare.com',
      applySiteName: '서울맘케어 바로가기'
    },
    {
      id: 'seoul-grandparent-care',
      title: '서울형 아이돌봄비 (조부모·친인척 돌봄수당)',
      category: 'local_gov',
      categoryName: '지자체별 특화지원금',
      categoryColor: 'purple',
      amountHighlight: '영아 1인당 월 30만 원 (최대 13개월간 총 390만 원 지급)',
      targetGroup: '만 24개월~36개월 이하 영아를 양육하는 기준중위소득 150% 이하 서울 가구',
      ageGroup: 'toddler',
      region: 'seoul',
      regionName: '서울특별시',
      badge: '조부모 돌봄 월30만',
      summary: '맞벌이 등으로 4촌 이내 친인척(할머니, 할아버지, 이모, 고모 등)이 아이를 돌봐주는 경우 월 30만 원의 돌봄비를 서울시가 지원합니다.',
      details: [
        '대상아동: 신청일 기준 24개월 이상 ~ 36개월 이하 영아 (부모 및 아동 주민등록 서울시)',
        '돌봄조건: 월 40시간 이상 친인척(조부모 등) 아이 돌봄 수행 시 지급',
        '소득기준: 기준중위소득 150% 이하 가구 (3인 가구 기준 약 월 700만원 수준)',
        '민간기관 연계: 친인척 돌봄 대신 서울시 지정 민간 아이돌봄 기관 이용 시 월 30만원 이용권 지원 가능'
      ],
      applyMethod: '몽땅정보 만능키(umppa.seoul.go.kr) 온라인 신청',
      applyUrl: 'https://umppa.seoul.go.kr',
      applySiteName: '서울 몽땅정보 만능키'
    },
    {
      id: 'seoul-pregnant-transport',
      title: '서울시 임산부 교통비 지원',
      category: 'local_gov',
      categoryName: '지자체별 특화지원금',
      categoryColor: 'purple',
      amountHighlight: '임산부 1인당 교통포인트 70만 원 전액 지원',
      targetGroup: '서울시에 거주하는 임신 3개월(12주차) ~ 출산 후 3개월 이내 임산부',
      ageGroup: 'pregnancy',
      region: 'seoul',
      regionName: '서울특별시',
      badge: '택시/대중교통/주유비',
      summary: '임산부의 이동 편의와 산전 진료 이동을 돕기 위해 버스, 지하철뿐만 아니라 택시비와 자가용 주유비까지 결제 가능한 70만 원을 지급합니다.',
      details: [
        '지원대상: 신청일 기준 서울시에 주민등록을 두고 있는 임산부',
        '신청기간: 임신 3개월(12주차)부터 출산 후 3개월 이내',
        '사용처: 지하철, 버스 요금 자동 차감, 택시 결제, 자가용 유류비(주유소/LPG충전소/전기차 충전소)',
        '사용기한: 임신 중 신청 시 출산 후 6개월까지 / 출산 후 신청 시 출산일로부터 6개월까지'
      ],
      applyMethod: '서울맘케어 시스템(seoul-momcare.com) 온라인 신청 또는 주소지 동주민센터',
      applyUrl: 'https://www.seoul-momcare.com',
      applySiteName: '서울맘케어 시스템'
    },
    {
      id: 'gyeonggi-postpartum-care',
      title: '경기도 산후조리비 지원 (경기지역화폐)',
      category: 'local_gov',
      categoryName: '지자체별 특화지원금',
      categoryColor: 'purple',
      amountHighlight: '출생아 1인당 50만 원 (지역화폐 지급, 쌍둥이 100만 원)',
      targetGroup: '경기도에 주민등록을 둔 출산 가정 (소득 기준 없음)',
      ageGroup: 'infant',
      region: 'gyeonggi',
      regionName: '경기도',
      badge: '경기지역화폐 50만원',
      summary: '출산가정의 경제적 부담을 줄이고 지역경제를 활성화하기 위해 시·군 지역화폐로 50만 원의 산후조리비를 지급합니다.',
      details: [
        '지원대상: 부 또는 모가 경기도에 거주하며 경기도에 출생등록을 마친 가정',
        '지원금액: 출생아 1인당 50만 원 (다태아의 경우 출생아 수에 따라 배수 지급)',
        '사용처: 관할 시·군 내 산후조리원 및 동네 마트, 병원, 약국, 전통시장 등 경기지역화폐 가맹점',
        '신청기한: 출생일 기준 12개월 이내'
      ],
      applyMethod: '경기민원24(gg24.gg.go.kr) 온라인 신청 또는 관할 읍·면·동 행정복지센터 방문',
      applyUrl: 'https://gg24.gg.go.kr',
      applySiteName: '경기민원24'
    },
    {
      id: 'incheon-100m-dream',
      title: '인천 1억 플러스 아이드림 (1억+ i dream)',
      category: 'local_gov',
      categoryName: '지자체별 특화지원금',
      categoryColor: 'purple',
      amountHighlight: '태어나서 18세까지 총 1억 원 상당 지원 (천사지원금 연 120만원 등)',
      targetGroup: '인천광역시에 주민등록을 두고 거주하는 영유아 및 학령기 아동',
      ageGroup: 'all',
      region: 'incheon',
      regionName: '인천광역시',
      badge: '인천시 파격지원',
      summary: '인천시가 전국 최초로 추진하는 생애주기별 육아 지원 정책으로, 1~7세 천사지원금과 8~18세 아이꿈수당 등을 신설해 파격 지원합니다.',
      details: [
        '1~7세 천사지원금: 1세부터 7세까지 매년 120만 원씩 총 840만 원 지급 (인천e음 포인트)',
        '8~18세 아이꿈수당: 아동수당이 끝나는 만 8세부터 18세까지 매월 5만~15만 원 단계적 지급',
        '임산부 교통비: 인천 거주 임산부에게 50만 원 교통비 포인트 지급',
        '신청자격: 부모와 아동 모두 인천광역시에 1년 이상 계속 거주 요건'
      ],
      applyMethod: '정부24(gov.kr) 온라인 신청 또는 주소지 읍·면·동 행정복지센터',
      applyUrl: 'https://www.incheon.go.kr',
      applySiteName: '인천광역시청 포털'
    },
    {
      id: 'busan-multichild-edu',
      title: '부산시 다자녀 교육지원포인트 & 출산지원',
      category: 'local_gov',
      categoryName: '지자체별 특화지원금',
      categoryColor: 'purple',
      amountHighlight: '2자녀 가정 연 30만 원 / 3자녀 이상 가정 연 50만 원 동백전 지급',
      targetGroup: '만 19세 미만 자녀 2명 이상인 부산시 거주 다자녀 가정',
      ageGroup: 'multi',
      region: 'busan',
      regionName: '부산광역시',
      badge: '부산 동백전 지급',
      summary: '부산시 다자녀 가구의 학비 및 예체능 학원비, 도서구입비 등 사교육비 부담을 줄여주기 위해 교육지원포인트를 지급합니다.',
      details: [
        '지원대상: 자녀 중 1명 이상이 2006~2017년생에 해당하는 2자녀 이상 다자녀 가정',
        '지급방식: 부산 지역화폐 동백전 정책지원금으로 포인트 충전',
        '사용처: 학원(보습/어학/음악/미술/체육 등), 서점, 독서실, 스터디카페, 문구점 등 교육 관련 업종',
        '임산부 혜택: 마마콜(임산부 콜택시) 이용 시 월 4회 한도 택시요금 65% 할인'
      ],
      applyMethod: '부산광역시 다자녀 교육지원포인트 신청 누리집 또는 동백전 앱',
      applyUrl: 'https://www.busan.go.kr',
      applySiteName: '부산광역시청'
    },

    // 5. 육아휴직 및 돌봄
    {
      id: 'parental-leave-6plus6',
      title: '고용노동부 6+6 부모육아휴직제',
      category: 'childcare_leave',
      categoryName: '육아휴직·돌봄',
      categoryColor: 'indigo',
      amountHighlight: '부모 각각 첫 달 200만 원부터 6개월 차 최대 450만 원 (부부합산 최대 3,900만원)',
      targetGroup: '생후 18개월 이내 자녀를 두고 순차적 또는 동시에 육아휴직을 사용하는 맞벌이 부모',
      ageGroup: 'infant',
      region: 'all',
      regionName: '전국 공통',
      badge: '월 최대 450만원 상향',
      summary: '아빠와 엄마가 함께 아이를 돌볼 수 있도록 생후 18개월 내 부모가 모두 육아휴직 사용 시 6개월간 통상임금의 100%를 단계적으로 인상 지원합니다.',
      details: [
        '적용기간: 부모가 순차적 또는 동시에 육아휴직을 사용하는 최초 6개월',
        '월별 상한액: 1개월차 200만원, 2개월차 250만원, 3개월차 300만원, 4개월차 350만원, 5개월차 400만원, 6개월차 450만원',
        '부부 합산 혜택: 부모 모두 6개월 사용할 경우 부부 합산 최대 3,900만 원 수령 가능',
        '사후지급금 폐지: 6+6 부모육아휴직제 기간에는 사후지급금(25%)을 떼지 않고 휴직 중 100% 전액 지급',
        '7개월차 이후: 일반 육아휴직 급여(통상임금 80%, 상한 150만원)로 전환 지급'
      ],
      applyMethod: '고용보험 홈페이지(ei.go.kr), 고용24(work24.go.kr) 또는 사업장 관할 고용센터',
      applyUrl: 'https://www.work24.go.kr',
      applySiteName: '고용24 (고용노동부)'
    },
    {
      id: 'working-hours-reduction',
      title: '육아기 근로시간 단축 제도 (초등 6학년까지)',
      category: 'childcare_leave',
      categoryName: '육아휴직·돌봄',
      categoryColor: 'indigo',
      amountHighlight: '단축 1시간 통상임금 100% 고용보험 지원 (주당 15~35시간 근무)',
      targetGroup: '만 12세 이하 또는 초등학교 6학년 이하 자녀를 둔 근로자',
      ageGroup: 'school',
      region: 'all',
      regionName: '전국 공통',
      badge: '초등 6학년까지 확대',
      summary: '육아휴직 대신 하루 1~5시간 근로시간을 단축하여 일과 육아를 병행할 수 있으며, 줄어든 시간에 대한 임금 감소분을 정부가 지원합니다.',
      details: [
        '사용기간: 기본 1년 (육아휴직 미사용 기간 가산 시 최대 3년까지 사용 가능)',
        '단축시간: 주당 15시간 이상 35시간 이하로 근로시간 단축',
        '급여지원: 주당 최초 5시간 단축분에 대해 통상임금의 100%(상한 200만원 기준)를 정부가 지원, 나머지 단축분은 통상임금의 80% 지원'
      ],
      applyMethod: '회사 인사과에 신청서 제출 후 고용보험(ei.go.kr) 또는 고용24에서 육아기 근로시간 단축급여 신청',
      applyUrl: 'https://www.work24.go.kr',
      applySiteName: '고용24 육아기단축'
    },
    {
      id: 'gov-idolbom-service',
      title: '여성가족부 정부지원 아이돌봄서비스',
      category: 'childcare_leave',
      categoryName: '육아휴직·돌봄',
      categoryColor: 'indigo',
      amountHighlight: '아이돌보미 이용요금의 15%~85% 정부 차등 지원',
      targetGroup: '생후 3개월 이상 ~ 만 12세 이하 아동을 둔 양육공백 가정',
      ageGroup: 'all',
      region: 'all',
      regionName: '전국 공통',
      badge: '맞벌이·다자녀 필수',
      summary: '부모의 맞벌이나 질병 등으로 양육 공백이 발생한 가정에 전문 교육을 이수한 아이돌보미가 찾아가 1:1로 돌봄을 제공합니다.',
      details: [
        '서비스 유형: 영아종일제(생후 3~36개월, 이유식/기저귀), 시간제(생후 3개월~만 12세, 등·하원/놀이/임시보육)',
        '지원요건: 맞벌이, 다자녀, 한부모, 취학부모 등 양육공백이 입증된 가구',
        '소득구간: 기준중위소득 150% 이하 가구에 정부지원금 비율 차등 지원 (가형 85% ~ 라형 본인부담)',
        '2자녀 이상 다자녀 가구는 본인부담금 10% 추가 감면 혜택 제공'
      ],
      applyMethod: '복지로(소득판정 신청) 완료 후 아이돌봄서비스 홈페이지(idolbom.go.kr)에서 회원가입 및 신청',
      applyUrl: 'https://www.idolbom.go.kr',
      applySiteName: '아이돌봄서비스 누리집'
    }
  ],

  // 자주 묻는 질문 (FAQ)
  faqs: [
    {
      q: '부모급여와 아동수당은 동시에 둘 다 받을 수 있나요?',
      a: '네, 100% 동시에 중복 수령 가능합니다! 부모급여는 만 0~1세 영아를 위한 수당이고, 아동수당은 만 8세 미만 전 아동에게 지급되므로 0세 아이를 가정양육할 경우 [부모급여 100만 원 + 아동수당 10만 원 = 매월 총 110만 원]을 받게 됩니다.'
    },
    {
      q: '2024~2026년에 다자녀 혜택 기준이 2자녀로 바뀐 게 맞나요?',
      a: '네, 맞습니다! 정부의 저출산 대책 가이드라인에 따라 공공분양·청약 다자녀 특별공급, KTX·SRT 다자녀 행복 할인, 어린이집 우선 입소, 각 지자체 다자녀 카드 발급 및 공영주차장·문화시설 감면 기준이 기존 3자녀에서 [2자녀 이상]으로 대폭 완화되었습니다.'
    },
    {
      q: '에너지바우처와 한전 출산가구(30%) 할인은 동시에 받을 수 있나요?',
      a: '네, 동시 신청 가능합니다. 한전 영유아 30% 감면은 소득과 무관하게 출생 후 3년 미만이면 누구나 받을 수 있는 기본 요금 할인이며, 에너지바우처는 기초생활수급 가구 중 영유아/임산부가 있는 경우 추가로 발급되는 가상 카드 바우처입니다. 두 혜택 모두 중복하여 실제 청구되는 전기요금에서 차감받으실 수 있습니다.'
    },
    {
      q: '자녀장려금은 맞벌이도 신청할 수 있나요? 소득 기준이 어떻게 되나요?',
      a: '2024년부터 소득 요건이 기존 4,000만 원에서 [부부합산 연소득 7,000만 원 미만]으로 대폭 상향되었습니다! 따라서 맞벌이 부부라도 합산 소득이 7,000만 원 미만이고 가구원 재산 합계가 2억 4천만 원 미만이라면 18세 미만 부양자녀 1인당 최대 100만 원까지 지급받을 수 있습니다.'
    },
    {
      q: '출생신고할 때 지원금을 한 번에 신청하는 가장 편한 방법은 무엇인가요?',
      a: '정부24의 [행복출산 원스톱 서비스]를 이용하시거나 관할 읍·면·동 주민센터에 출생신고를 하실 때 원스톱 신청서를 함께 제출하시면 됩니다. 첫만남이용권, 부모급여, 아동수당, 한전 전기요금 감면, 지자체 출산지원금이 한 번에 일괄 신청되어 매우 편리합니다.'
    }
  ]
};
