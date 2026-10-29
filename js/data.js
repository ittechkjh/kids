// 도담톡 (DodamTalk) - 우리 동네 · 아이 개월수 맞춤 올인원 육아 커뮤니티 데이터셋
window.DODAM_COMMUNITY_DATA = {
  categories: [
    { id: 'all', name: '전체글', icon: 'fa-layer-group', badgeColor: 'slate' },
    { id: 'hot', name: '🔥 실시간 베스트', icon: 'fa-fire', badgeColor: 'rose' },
    { id: 'newborn', name: '🍼 출산·영아(0~24m)', icon: 'fa-baby-carriage', badgeColor: 'pink' },
    { id: 'toddler', name: '🧒 유아·어린이집(3~7세)', icon: 'fa-shapes', badgeColor: 'amber' },
    { id: 'school', name: '🎒 초등맘 라운지', icon: 'fa-school', badgeColor: 'emerald' },
    { id: 'working', name: '💼 워킹맘·대디', icon: 'fa-briefcase', badgeColor: 'indigo' },
    { id: 'talk', name: '🗣️ 속풀이·부부토크', icon: 'fa-comments', badgeColor: 'purple' },
    { id: 'tips', name: '💡 육아꿀팁·레시피', icon: 'fa-lightbulb', badgeColor: 'blue' }
  ],

  regions: [
    { id: 'all', name: '전국 전체' },
    { id: 'seoul', name: '서울특별시' },
    { id: 'gyeonggi', name: '경기도' },
    { id: 'incheon', name: '인천광역시' },
    { id: 'gangwon', name: '강원특별자치도' },
    { id: 'daejeon', name: '대전광역시' },
    { id: 'sejong', name: '세종특별자치시' },
    { id: 'chungnam', name: '충청남도' },
    { id: 'chungbuk', name: '충청북도' },
    { id: 'gwangju', name: '광주광역시' },
    { id: 'jeonbuk', name: '전북특별자치도' },
    { id: 'jeonnam', name: '전라남도' },
    { id: 'daegu', name: '대구광역시' },
    { id: 'gyeongbuk', name: '경상북도' },
    { id: 'busan', name: '부산광역시' },
    { id: 'ulsan', name: '울산광역시' },
    { id: 'gyeongnam', name: '경상남도' },
    { id: 'jeju', name: '제주특별자치도' }
  ],

  polls: [
    {
      id: 'poll-1',
      tag: '🔥 오늘의 육아 밸런스 투표',
      question: '어린이집·유치원 첫 입소 시기, 언제 보내는 게 가장 만족스러우셨나요?',
      totalVotes: 1842,
      userVotedIndex: null,
      options: [
        { label: '생후 6~11개월 (0세반 조기 복직·돌봄)', votes: 312 },
        { label: '생후 12~18개월 (걸음마 시작 후 0~1세반)', votes: 684 },
        { label: '생후 24개월 전후 (두돌 무렵 의사소통 가능 시)', votes: 621 },
        { label: '36개월 이후 (세돌 이후 유치원·어린이집)', votes: 225 }
      ]
    },
    {
      id: 'poll-2',
      tag: '💬 부부 육아 공감 투표',
      question: '평일 퇴근 후 육아 분담, 우리 집에서 가장 갈등이 생기는 순간은?',
      totalVotes: 1290,
      userVotedIndex: null,
      options: [
        { label: '아이 재우기 (육퇴 후 자유시간 눈치게임)', votes: 510 },
        { label: '저녁 유아식 차리기 & 뒷정리·설거지', votes: 340 },
        { label: '아침 등원 준비 전쟁 (옷 입히기·가방 챙기기)', votes: 280 },
        { label: '주말 독박육아 vs 교대 자유시간 조율', votes: 160 }
      ]
    },
    {
      id: 'poll-3',
      tag: '📱 미디어 육아 고민',
      question: '식당이나 이동 중 아이 유튜브/영상 시청, 어디까지 허용하시나요?',
      totalVotes: 965,
      userVotedIndex: null,
      options: [
        { label: '외식·장거리 이동 시에만 30분 이내 허용', votes: 520 },
        { label: '하루 정해진 시간(30분~1시간) 집에서도 허용', votes: 295 },
        { label: '절대 보여주지 않는다 (색칠공부·스티커북 대체)', votes: 150 }
      ]
    }
  ],

  posts: [],

  growthStandards: {
    3: { mHeight: 61.4, mWeight: 6.4, fHeight: 59.8, fWeight: 5.8 },
    6: { mHeight: 67.6, mWeight: 7.9, fHeight: 65.7, fWeight: 7.3 },
    9: { mHeight: 72.0, mWeight: 8.9, fHeight: 70.1, fWeight: 8.2 },
    12: { mHeight: 75.7, mWeight: 9.6, fHeight: 74.0, fWeight: 8.9 },
    18: { mHeight: 82.3, mWeight: 10.9, fHeight: 80.7, fWeight: 10.2 },
    24: { mHeight: 87.8, mWeight: 12.2, fHeight: 86.4, fWeight: 11.5 },
    36: { mHeight: 96.1, mWeight: 14.3, fHeight: 95.1, fWeight: 13.9 },
    48: { mHeight: 103.3, mWeight: 16.3, fHeight: 102.7, fWeight: 16.1 },
    60: { mHeight: 110.0, mWeight: 18.3, fHeight: 109.4, fWeight: 18.2 },
    72: { mHeight: 116.0, mWeight: 20.7, fHeight: 115.1, fWeight: 20.2 }
  },

  // 네이버 · 카카오 · 구글 맛집 큐레이션 데이터셋 (출처 링크, 평점, 가족/키즈 편의시설 포함)
  // 전국 17개 시도 5,000+ 맛집 데이터셋 연동 (js/restaurants_data.js)
  restaurants: (typeof window !== 'undefined' && Array.isArray(window.DODAM_NATIONWIDE_RESTAURANTS) && window.DODAM_NATIONWIDE_RESTAURANTS.length > 0)
    ? window.DODAM_NATIONWIDE_RESTAURANTS
    : []
};
