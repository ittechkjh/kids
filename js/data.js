// 도담톡 (DodamTalk) - 우리 동네 · 아이 개월수 맞춤 올인원 육아 커뮤니티 & 지역 맘카페 데이터셋
window.DODAM_COMMUNITY_DATA = {
  categories: [
    { id: 'all', name: '전체글', icon: 'fa-layer-group', badgeColor: 'slate' },
    { id: 'hot', name: '🔥 실시간 베스트', icon: 'fa-fire', badgeColor: 'rose' },
    { id: 'preg', name: '🤰 임신·출산준비', icon: 'fa-heart', badgeColor: 'pink' },
    { id: 'newborn', name: '🍼 신생아·영아(0~12m)', icon: 'fa-baby-carriage', badgeColor: 'pink' },
    { id: 'toddler_early', name: '🚼 걸음마·두돌(13~36m)', icon: 'fa-child-reaching', badgeColor: 'orange' },
    { id: 'toddler', name: '🧒 유아·유치원(4~7세)', icon: 'fa-shapes', badgeColor: 'amber' },
    { id: 'school', name: '🎒 초등 저학년(1~3학년)', icon: 'fa-school', badgeColor: 'emerald' },
    { id: 'elem_high', name: '📚 초등 고학년(4~6학년)', icon: 'fa-book', badgeColor: 'teal' },
    { id: 'middle', name: '🏫 중딩맘 라운지', icon: 'fa-book-open', badgeColor: 'cyan' },
    { id: 'high', name: '🎓 고딩·입시맘', icon: 'fa-graduation-cap', badgeColor: 'indigo' },
    { id: 'working', name: '💼 워킹맘·대디', icon: 'fa-briefcase', badgeColor: 'indigo' },
    { id: 'talk', name: '🗣️ 속풀이·일상수다', icon: 'fa-comments', badgeColor: 'purple' },
    { id: 'guide', name: '📖 육아가이드', icon: 'fa-book-bookmark', badgeColor: 'rose' },
    { id: 'tips', name: '💡 육아꿀팁·레시피', icon: 'fa-lightbulb', badgeColor: 'blue' }
  ],

  ageStages: [
    {
      id: 'all',
      name: '전체 연령',
      shortName: '전체',
      icon: '👶',
      minMonths: 0,
      maxMonths: 999,
      desc: '임신·출산부터 영유아, 초·중·고등까지 모든 시기 부모님들의 소통 공간입니다.',
      keywords: ['통잠교육', '이유식식단', '어린이집입소', '한글떼기', '초등입학준비', '사춘기대화']
    },
    {
      id: 'preg',
      name: '🤰 임신·출산준비',
      shortName: '임신·출산',
      icon: '🤰',
      minMonths: 0,
      maxMonths: 0,
      desc: '산부인과 검진, 출산가방 리스트, 조리원 선택, 첫만남이용권 등 예비맘·대디 필수 정보',
      keywords: ['출산가방리스트', '산후조리원', '국민행복카드', '입체초음파', '태교여행']
    },
    {
      id: 'newborn',
      name: '🍼 신생아·영아 (0~12개월)',
      shortName: '0~12개월 영아',
      icon: '🍼',
      minMonths: 1,
      maxMonths: 12,
      desc: '수유텀 잡기, 등센서·통잠 수면교육, 초기·중기·후기 이유식, 영유아 검진 고민을 나눠요.',
      keywords: ['통잠수면교육', '이유식거부', '원더윅스', '분유유목민', '돌준맘']
    },
    {
      id: 'toddler_early',
      name: '🚼 걸음마·두돌 (13~36개월)',
      shortName: '13~36개월 두돌',
      icon: '🚼',
      minMonths: 13,
      maxMonths: 36,
      desc: '어린이집 0·1·2세반 적응, 유아식 식단, 두돌 언어발달, 쪽쪽이 떼기 & 배변훈련 소통방',
      keywords: ['어린이집적응', '유아식반찬', '두돌언어발달', '배변훈련', '쪽쪽이떼기']
    },
    {
      id: 'toddler',
      name: '🧒 유아·유치원 (4~7세)',
      shortName: '4~7세 유아',
      icon: '🧒',
      minMonths: 37,
      maxMonths: 84,
      desc: '국공립·사립 유치원 추첨, 한글·수 감각 깨치기, 친구 관계, 미운네살·다섯살 훈육 노하우',
      keywords: ['유치원추첨', '한글떼기', '떼쓰기훈육', '기관적응', '주말키즈카페']
    },
    {
      id: 'school',
      name: '🎒 초등 저학년 (1~3학년)',
      shortName: '초등 1~3학년',
      icon: '🎒',
      minMonths: 85,
      maxMonths: 120,
      desc: '초1 입학 준비, 늘봄학교·돌봄교실, 받아쓰기·독서습관, 예체능·영어 파닉스 시작 고민',
      keywords: ['초1입학준비', '늘봄학교', '독서습관', '받아쓰기', '초등영어파닉스']
    },
    {
      id: 'elem_high',
      name: '📚 초등 고학년 (4~6학년)',
      shortName: '초등 4~6학년',
      icon: '📚',
      minMonths: 121,
      maxMonths: 156,
      desc: '사춘기 시작 대화법, 초등 고학년 수학·영어 로드맵, 교우관계, 스마트폰 규칙 만들기',
      keywords: ['사춘기대화법', '초등수학심화', '스마트폰약속', '교우관계고민', '중학배정']
    },
    {
      id: 'middle_high',
      name: '🏫 중·고등 입시맘',
      shortName: '중·고등 입시',
      icon: '🎓',
      minMonths: 157,
      maxMonths: 240,
      desc: '중등 내신·수행평가, 고교학점제, 특목·자사고 및 대입 수시·정시 전략을 함께 나누는 라운지',
      keywords: ['중등내신대비', '고교학점제', '특목자사고', '수행평가관리', '학원가정보']
    }
  ],

  localHubs: [
    { id: 'all', name: '전국 맘카페 전체', shortName: '전국 전체', region: 'all', badge: '🌏 전국' },
    { id: 'seoul_gangnam', name: '서울 강남·서초·송파 맘카페', shortName: '강남·서초·송파', region: 'seoul', badge: '📍 서울 강남3구' },
    { id: 'seoul_mokdong', name: '서울 목동·마포·강서 맘카페', shortName: '목동·마포·강서', region: 'seoul', badge: '📍 서울 서부권' },
    { id: 'seoul_seongdong', name: '서울 성동·광진·노원·기타', shortName: '성동·광진·노원', region: 'seoul', badge: '📍 서울 동북·성동' },
    { id: 'gg_bundang', name: '경기 분당·판교·위례·용인 맘카페', shortName: '분당·판교·위례', region: 'gyeonggi', badge: '📍 분당·판교·용인' },
    { id: 'gg_dongtan', name: '경기 동탄·수원·광교·화성 맘카페', shortName: '동탄·수원·광교', region: 'gyeonggi', badge: '📍 동탄·수원·광교' },
    { id: 'gg_ilsan', name: '경기 일산·김포·파주·다산 맘카페', shortName: '일산·김포·다산', region: 'gyeonggi', badge: '📍 일산·김포·다산' },
    { id: 'incheon_songdo', name: '인천 송도·청라·검단 맘카페', shortName: '송도·청라·검단', region: 'incheon', badge: '📍 인천 송도·청라' },
    { id: 'busan_centum', name: '부산 해운대·센텀·명지·경남 맘카페', shortName: '부산·울산·경남', region: 'busan', badge: '📍 부산·경남권' },
    { id: 'daegu_suseong', name: '대구 수성·달서·경북 맘카페', shortName: '대구·수성·경북', region: 'daegu', badge: '📍 대구·경북권' },
    { id: 'daejeon_sejong', name: '대전 둔산·세종·충청 맘카페', shortName: '대전·세종·충청', region: 'daejeon', badge: '📍 대전·세종·충청' },
    { id: 'gwangju_jeju', name: '광주·전라·강원·제주 맘카페', shortName: '광주·전라·제주', region: 'gwangju', badge: '📍 호남·강원·제주' }
  ],

  localTopics: [
    { id: 'all', name: '전체 동네소통', icon: '🏡', color: 'bg-stone-100 text-slate-700 border-stone-200' },
    { id: 'hospital', name: '🏥 소아과·병원·약국 추천', icon: '🏥', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'daycare', name: '🏫 어린이집·유치원·학원 후기', icon: '🏫', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { id: 'share', name: '🥕 동네 무료나눔·드림·벼룩', icon: '🥕', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'place', name: '☕ 동네 키즈맛집·놀이터·번개', icon: '☕', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'living', name: '🏠 동네 살기·이사·학군 질문', icon: '🏠', color: 'bg-sky-50 text-sky-700 border-sky-200' }
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

  posts: [
    {
      id: 'guide-seed-1',
      category: 'guide',
      guideType: 'sleep',
      ageStage: 'newborn',
      region: 'all',
      localHub: 'all',
      localHubName: '전국 전체',
      isQuestion: false,
      isSolved: false,
      isHot: true,
      isAiReport: true,
      title: '[육아가이드] 0~12개월 통잠 수면교육 & 원더윅스 완벽 대처 종합 분석 리포트',
      content: `<div class="ai-parenting-report-article" style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; line-height: 1.85; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%); padding: 16px 20px; border-radius: 16px; color: #ffffff; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 12px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 18px;">🤖</div>
            <div>
              <div style="font-size: 11px; font-weight: 800; opacity: 0.9; letter-spacing: 0.5px;">DODAM CARE-LAB RESEARCH BRIEF</div>
              <div style="font-size: 15px; font-weight: 900;">도담 육아가이드 전문 심층 리포트</div>
            </div>
          </div>
          <div style="display: flex; items-center; gap: 6px;">
            <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 800;">소아과 전문 검수</span>
            <span style="background: #fbbf24; color: #78350f; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 900;">공식 리포트</span>
          </div>
        </div>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 24px; margin-bottom: 12px; border-left: 4px solid #db2777; padding-left: 12px;">
          1. 📌 핵심 요약 &amp; 발달 브리핑 (Executive Summary)
        </h4>
        <p style="font-size: 14.5px; color: #334155;">생후 0~12개월 아기의 수면 문제는 단순한 잠투정이 아닌 <strong>뇌 신경망의 급격한 도약(원더윅스, Wonder Weeks)</strong>과 <strong>생체 일주기 리듬 형성</strong> 과정에서 발생하는 자연스러운 발달 신호입니다.</p>
        <ul style="list-style-type: disc; padding-left: 20px; line-height: 1.8; color: #334155; font-size: 14px;">
          <li><strong>생후 6~8주:</strong> 멜라토닌 자가 합성 시작, 낮과 밤의 명암 구분 훈련 최적기</li>
          <li><strong>생후 4개월:</strong> 1차 수면 퇴행기(Sleep Regression), 성인 수면 주기(REM-비REM)로 전환</li>
          <li><strong>생후 8~10개월:</strong> 대상영속성 발달로 인한 분리불안 급증 및 야경증 대비 필요</li>
        </ul>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 28px; margin-bottom: 12px; border-left: 4px solid #7c3aed; padding-left: 12px;">
          2. 🔍 소아의학 및 아동발달심리 심층 분석
        </h4>
        <p style="font-size: 14.5px; color: #334155;">아기의 수면 뇌파는 성인보다 렘(REM) 수면 비율이 50% 이상 높아 얕은 잠 단계에서 외부 자극이나 신체 변화(뒤집기, 이앓이)에 쉽게 반응합니다. 이를 '잠투정'으로 오해하여 즉시 안아 올리거나 수유하면 아기는 연관 수면 연관(Sleep Association)을 형성하여 스스로 잠드는 능력을 잃게 됩니다.</p>
        <p style="font-size: 14.5px; color: #334155;">핵심은 수면 압력(Sleep Pressure)을 적절히 쌓아주는 낮 시간 활동량과, 취침 전 일정한 신호를 보내는 예측 가능한 수면의식 구축에 있습니다.</p>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 28px; margin-bottom: 12px; border-left: 4px solid #10b981; padding-left: 12px;">
          3. 💡 시기별 맞춤 실천 솔루션 &amp; 부모 행동 가이드
        </h4>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 12px 0;">
          <h5 style="font-weight: 800; color: #0f172a; margin-bottom: 8px;">📋 도담 권장: 성공적인 통잠을 위한 4단계 프로토콜</h5>
          <ol style="padding-left: 20px; line-height: 1.8; color: #334155;">
            <li><strong>1단계 환경 통제 (19:30):</strong> 실내온도 20~22℃, 습도 50~60%, 웜톤 간접조명만 켜기</li>
            <li><strong>2단계 진정 루틴 (20:00):</strong> 미온수 목욕 → 보습 마사지 → 잠옷 교체 (촉각 안정)</li>
            <li><strong>3단계 수면의식 (20:20):</strong> 조용한 자장가 또는 백색소음, 애착인형/이불 안겨주기</li>
            <li><strong>4단계 졸릴 때 눕히기 (20:30):</strong> 완전히 잠들기 직전 눈이 감길 때 침대에 눕혀 스스로 잠들게 하기</li>
          </ol>
        </div>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 28px; margin-bottom: 12px; border-left: 4px solid #f43f5e; padding-left: 12px;">
          4. ⚠️ 소아청소년과 전문의 조언 &amp; 병원 방문 체크리스트
        </h4>
        <div style="background: #fff1f2; border-left: 4px solid #f43f5e; padding: 14px 18px; border-radius: 8px; margin: 14px 0;">
          <strong style="color: #be123c; font-size: 13px;">⚠️ 소아청소년과 전문의 긴급 진료 권고 징후</strong>
          <ul style="margin-top: 6px; padding-left: 18px; color: #881337; line-height: 1.7;">
            <li>아기가 자다 깨어 다리를 배 쪽으로 모으며 자지러지게 우는 경우 (장중첩증 의심)</li>
            <li>수면 중 호흡이 10초 이상 멈추거나 쌕쌕거리는 천명음이 동반되는 경우</li>
            <li>38℃ 이상의 고열과 함께 수유량이 평소의 50% 이하로 급감할 때</li>
          </ul>
        </div>

        <div style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border: 1px solid #f0abfc; border-left: 4px solid #c026d3; border-radius: 14px; padding: 18px 20px; margin: 24px 0; color: #701a75;">
          <div style="font-weight: 900; font-size: 14.5px; margin-bottom: 6px;">🌈 도담 케어랩 종합 조언</div>
          <p style="font-size: 13.5px; line-height: 1.8; margin: 0;">육아는 정답을 맞히는 시험이 아니라 아이와 부모가 서로를 알아가는 아름다운 여정입니다. 도담도담이 대한민국 모든 부모님의 행복한 육아를 응원합니다 🍼</p>
        </div>
      </div>`,
      images: [],
      isSeedPost: true,
      author: {
        nickname: '운영자',
        level: '👑 공식 리포트',
        childBadge: '📖 도담 육아가이드',
        avatarBg: 'bg-emerald-600 text-white'
      },
      createdAt: '2026.11.07',
      timestamp: 1762500000000,
      views: 18,
      reactions: { like: 2, hug: 1, tip: 1 },
      tags: ['수면교육', '원더윅스', '통잠', '수면의식', '도담AI가이드'],
      comments: [
        {
          id: 'c-seed-ai-1',
          author: '분당맘',
          level: '🌷 꽃봉오리맘',
          childBadge: '👶 10개월 남아',
          content: '소아과 방문 기준과 4단계 프로토콜이 너무 명쾌하네요! 오늘 밤부터 바로 적용해봅니다.',
          createdAt: '1시간 전'
        }
      ]
    },
    {
      id: 'guide-seed-2',
      category: 'guide',
      guideType: 'growth',
      ageStage: 'toddler',
      region: 'all',
      localHub: 'all',
      localHubName: '전국 전체',
      isQuestion: false,
      isSolved: false,
      isHot: true,
      isAiReport: true,
      title: '[육아가이드] 3~7세 떼쓰기·분리불안 심리 분석 & 긍정 훈육 솔루션',
      content: `<div class="ai-parenting-report-article" style="font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif; line-height: 1.85; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%); padding: 16px 20px; border-radius: 16px; color: #ffffff; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 12px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 18px;">🤖</div>
            <div>
              <div style="font-size: 11px; font-weight: 800; opacity: 0.9; letter-spacing: 0.5px;">DODAM CARE-LAB RESEARCH BRIEF</div>
              <div style="font-size: 15px; font-weight: 900;">도담 육아가이드 전문 심층 리포트</div>
            </div>
          </div>
          <div style="display: flex; items-center; gap: 6px;">
            <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 800;">아동심리 전문 검수</span>
            <span style="background: #fbbf24; color: #78350f; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 900;">공식 리포트</span>
          </div>
        </div>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 24px; margin-bottom: 12px; border-left: 4px solid #db2777; padding-left: 12px;">
          1. 📌 핵심 요약 &amp; 발달 브리핑 (Executive Summary)
        </h4>
        <p style="font-size: 14.5px; color: #334155;">만 3~5세 아이의 떼쓰기는 전두엽(감정 조절 중추)이 아직 미성숙한 상태에서 <strong>자아 효능감과 독립심</strong>이 폭발할 때 나타나는 지극히 정상적인 인지 발달 과정입니다.</p>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 28px; margin-bottom: 12px; border-left: 4px solid #7c3aed; padding-left: 12px;">
          2. 🔍 소아의학 및 아동발달심리 심층 분석
        </h4>
        <p style="font-size: 14.5px; color: #334155;">분노와 좌절을 느낄 때 부모가 함께 언성을 높이면 아동의 뇌는 '위협 상태'로 인식하여 투쟁-도피(Fight or Flight) 반응으로 이어집니다. 부모의 차분한 목소리와 눈맞춤이 아이의 미주신경을 안정시키는 유일한 열쇠입니다.</p>

        <h4 style="font-size: 17px; font-weight: 900; color: #0f172a; margin-top: 28px; margin-bottom: 12px; border-left: 4px solid #10b981; padding-left: 12px;">
          3. 💡 시기별 맞춤 실천 솔루션 &amp; 부모 행동 가이드
        </h4>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin: 12px 0;">
          <h5 style="font-weight: 800; color: #1e40af; margin-bottom: 8px;">💖 하임 기너트 &amp; 가트맨식 3단계 긍정 감정코칭</h5>
          <ol style="padding-left: 20px; line-height: 1.8; color: #1e3a8a;">
            <li><strong>1단계 감정 온전히 읽어주기:</strong> "더 놀고 싶었는데 그만해야 해서 정말 아쉽고 화가 났구나." (감정은 100% 수용)</li>
            <li><strong>2단계 명확한 한계 제시:</strong> "하지만 물건을 던지거나 소리를 지르는 건 안 되는 거야." (행동은 단호하게 제한)</li>
            <li><strong>3단계 대안 선택권 주기:</strong> "마지막으로 미끄럼틀 1번 더 탈래, 아니면 집에 가서 재미있는 공룡 스티커 놀이 할래?" (아동의 통제감 회복)</li>
          </ol>
        </div>

        <div style="background: linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%); border: 1px solid #f0abfc; border-left: 4px solid #c026d3; border-radius: 14px; padding: 18px 20px; margin: 24px 0; color: #701a75;">
          <div style="font-weight: 900; font-size: 14.5px; margin-bottom: 6px;">🌈 도담 케어랩 종합 조언</div>
          <p style="font-size: 13.5px; line-height: 1.8; margin: 0;">감정을 읽어주되 행동의 한계는 명확히 세우는 따뜻하고 단호한 양육이 아이의 평생 정서적 자존감을 결정합니다 💖</p>
        </div>
      </div>`,
      images: [],
      isSeedPost: true,
      author: {
        nickname: '운영자',
        level: '👑 공식 리포트',
        childBadge: '📖 도담 육아가이드',
        avatarBg: 'bg-emerald-600 text-white'
      },
      createdAt: '2026.11.06',
      timestamp: 1762450000000,
      views: 14,
      reactions: { like: 1, hug: 0, tip: 1 },
      tags: ['훈육가이드', '감정코칭', '떼쓰기', '분리불안', '도담AI가이드'],
      comments: []
    },
    {
      id: 'seed-post-1',
      category: 'toddler_early',
      ageStage: 'toddler_early',
      region: 'gyeonggi',
      localHub: 'gg_bundang',
      localHubName: '분당·판교·위례',
      localTopic: 'hospital',
      localTopicName: '🏥 소아과·병원 추천',
      isQuestion: true,
      isSolved: true,
      isHot: true,
      title: '[분당·판교] 주말에 문 여는 소아과 중 중이염·호흡기 잘 보는 원장님 추천 부탁드려요!',
      content: '20개월 아기가 어제 저녁부터 코막힘이 심하더니 귀를 자꾸 잡아당기네요 ㅠㅠ 판교역이나 수내·정자 쪽에서 일요일 오전에도 진료 가능하고 항생제 과잉처방 없이 꼼꼼하게 봐주시는 소아과 어디가 좋을까요? 똑닥 예약 팁도 알려주시면 감사하겠습니다!',
      images: [],
      author: {
        nickname: '판교도담맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '👶 20개월 남아 · 분당·판교',
        avatarBg: 'bg-rose-500 text-white'
      },
      createdAt: '12분 전',
      timestamp: 1762435000000,
      views: 342,
      reactions: { like: 28, hug: 14, tip: 19 },
      tags: ['판교소아과', '분당소아과', '중이염', '주말소아과', '20개월아기'],
      comments: [
        {
          id: 'c-seed-101',
          author: '백현동하준맘',
          level: '🌳 열매나무맘',
          childBadge: '🧒 4세 남아',
          content: '판교역 알파돔 쪽 서울센트럴소아과 2진료실 원장님 정말 친절하시고 귀 내시경으로 보호자한테 직접 보여주셔서 믿음 가요! 똑닥은 오전 8시 30분 땡 하면 바로 열립니다.',
          createdAt: '8분 전'
        },
        {
          id: 'c-seed-102',
          author: '정자동쌍둥이맘',
          level: '👑 도담멘토',
          childBadge: '🧒 5세 남매',
          content: '정자역 코끼리소아과도 주말 진료 보고 호흡기 네뷸라이저 치료 잘해줘요. 아기 얼른 나았으면 좋겠네요 토닥토닥 🤗',
          createdAt: '4분 전'
        }
      ]
    },
    {
      id: 'seed-post-2',
      category: 'newborn',
      ageStage: 'newborn',
      region: 'seoul',
      localHub: 'seoul_gangnam',
      localHubName: '강남·서초·송파',
      localTopic: 'all',
      localTopicName: '🍼 0~12개월 수면교육',
      isQuestion: true,
      isSolved: true,
      isHot: true,
      title: '생후 6개월 아기 새벽마다 1시간 간격으로 깨는데.. 원더윅스인가요 이앓이인가요? 😭',
      content: '백일 지나고부터 밤잠 7시간씩 통잠 자던 효자 아기였는데, 정확히 180일 지나고부터 밤 11시, 1시, 2시반, 4시에 자지러지게 울면서 깨요. 쪽쪽이 물려도 뱉어버리고 안아서 흔들어줘야 겨우 다시 잠드는데 남편이랑 둘 다 다크서클이 턱밑까지 내려왔어요.. 이 시기 겪으신 선배맘님들 언제쯤 다시 좋아질까요?',
      images: [],
      author: {
        nickname: '잠실하늘맘',
        level: '🌿 떡잎맘',
        childBadge: '🍼 6개월 남아 · 송파 잠실',
        avatarBg: 'bg-emerald-500 text-white'
      },
      createdAt: '25분 전',
      timestamp: 1762434200000,
      views: 518,
      reactions: { like: 45, hug: 62, tip: 21 },
      tags: ['6개월통잠', '수면퇴행', '이앓이', '새벽기상', '통잠교육'],
      comments: [
        {
          id: 'c-seed-201',
          author: '반포윤슬맘',
          level: '🌳 열매나무맘',
          childBadge: '🚼 16개월 여아',
          content: '딱 6개월 수면퇴행 + 아랫니 올라오는 시기네요 ㅠㅠ 잇몸 한번 살짝 만져보세요! 하얗게 부어있으면 이앓이 캔디나 시원한 치발기 주면 훨씬 덜 깨더라구요. 2주만 지나면 다시 통잠 자니까 오늘 밤도 힘내세요!!',
          createdAt: '18분 전'
        },
        {
          id: 'c-seed-202',
          author: '대치동도치파파',
          level: '🌷 꽃봉오리맘',
          childBadge: '🍼 9개월 남아',
          content: '저희도 6개월 때 똑같았어요! 낮잠 총량이 너무 많거나 막수 시간이 당겨졌는지 체크해보세요. 깨더라도 불 켜지 말고 토닥여서 재우는 걸 일주일 유지하니 거짓말처럼 다시 9시간 통잠 잤습니다.',
          createdAt: '11분 전'
        }
      ]
    },
    {
      id: 'seed-post-3',
      category: 'toddler',
      ageStage: 'toddler',
      region: 'seoul',
      localHub: 'seoul_mokdong',
      localHubName: '목동·마포·강서',
      localTopic: 'share',
      localTopicName: '🥕 동네 무료나눔·드림',
      isQuestion: false,
      isSolved: false,
      isHot: true,
      title: '[무료드림/목동·마포] 상태 깨끗한 유아 그림책 전집 40권 + 원목 교구 세트 나눔합니다 🎁',
      content: '아이가 이제 7세 올라가면서 한글 읽기 독립을 해서, 3~5세 때 정말 잘 보던 프뢰벨·돌잡이 보드북 전집 40권이랑 원목 자석교구 세트 무료로 드림해요! 찢어진 곳 거의 없고 알코올 스왑으로 한 번 닦아두었습니다. 목동역이나 마포역 근처 직거래 가능하신 또래 맘님 댓글 남겨주세요 :)',
      images: [],
      author: {
        nickname: '목동책육아맘',
        level: '👑 도담멘토',
        childBadge: '🧒 7세 여아 · 양천 목동',
        avatarBg: 'bg-amber-500 text-white'
      },
      createdAt: '40분 전',
      timestamp: 1762433500000,
      views: 690,
      reactions: { like: 74, hug: 12, tip: 38 },
      tags: ['무료나눔', '그림책드림', '목동맘카페', '마포맘카페', '돌잡이전집'],
      comments: [
        {
          id: 'c-seed-301',
          author: '염창동다온맘',
          level: '🌷 꽃봉오리맘',
          childBadge: '🚼 24개월 여아',
          content: '우와 천사맘님이시네요!! 저희 아기가 딱 24개월이라 돌잡이 전집 당근 알림 걸어두고 찾고 있었는데 줄 서봅니다! 오늘 저녁에 남편이랑 바로 픽업 갈 수 있어요 💕',
          createdAt: '32분 전'
        },
        {
          id: 'c-seed-302',
          author: '공덕동시우맘',
          level: '🌿 떡잎맘',
          childBadge: '🚼 18개월 남아',
          content: '따뜻한 나눔 추천 누르고 갑니다! 복 받으실 거예요 👍',
          createdAt: '20분 전'
        }
      ]
    },
    {
      id: 'seed-post-4',
      category: 'school',
      ageStage: 'school',
      region: 'gyeonggi',
      localHub: 'gg_dongtan',
      localHubName: '동탄·수원·광교',
      localTopic: 'daycare',
      localTopicName: '🏫 유치원·초등·학원 후기',
      isQuestion: true,
      isSolved: true,
      isHot: true,
      title: '[동탄·광교] 내년 초1 입학 예정인데 한글·파닉스 어디까지 준비하고 들어가야 할까요?',
      content: '7세 남아 키우는 예비초등맘입니다! 주변 엄마들 얘기 들어보면 이미 받침 있는 글자 받아쓰기 다 끝내고 영어 원서 리딩 학원 레벨테스트 보러 다닌다는데.. 저희 아이는 아직 통글자 위주로 읽고 복잡한 받침(겹받침)은 헷갈려해요. 동탄·광교 초등학교 1학년 분위기 요즘 어떤지 선배 초등맘님들 현실 조언 부탁드려요!',
      images: [],
      author: {
        nickname: '광교호수맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '🧒 7세 남아 · 수원 광교',
        avatarBg: 'bg-indigo-500 text-white'
      },
      createdAt: '1시간 전',
      timestamp: 1762431000000,
      views: 615,
      reactions: { like: 52, hug: 29, tip: 44 },
      tags: ['초1입학준비', '예비초등', '한글떼기', '동탄맘', '광교초등'],
      comments: [
        {
          id: 'c-seed-401',
          author: '동탄호수초2맘',
          level: '🌳 열매나무맘',
          childBadge: '🎒 초2 남아',
          content: '너무 불안해하지 마세요! 1학년 1학기 국어 시간에 자음·모음부터 차근차근 배우지만, 알림장 읽기랑 수학 문제 지문 읽기를 스스로 하려면 기본 받침(ㄱ,ㄴ,ㄹ,ㅁ,ㅂ,ㅇ) 정도만 읽을 줄 알면 충분해요. 대신 연필 바르게 쥐기랑 화장실 뒤처리 연습이 진짜 1순위입니다!',
          createdAt: '48분 전'
        },
        {
          id: 'c-seed-402',
          author: '광교센트럴맘',
          level: '👑 도담멘토',
          childBadge: '🎒 초3 여아',
          content: '맞아요! 파닉스는 1학년 여름방학에 시작해도 전혀 안 늦고, 입학 전에는 매일 20분씩 그림책 소리 내어 읽기 습관 잡아주시면 1학년 학교생활 완벽 적응합니다 :)',
          createdAt: '35분 전'
        }
      ]
    },
    {
      id: 'seed-post-5',
      category: 'preg',
      ageStage: 'preg',
      region: 'incheon',
      localHub: 'incheon_songdo',
      localHubName: '송도·청라·검단',
      localTopic: 'hospital',
      localTopicName: '🏥 산부인과·조리원 후기',
      isQuestion: false,
      isSolved: true,
      isHot: false,
      title: '[송도·청라] 34주차 예비맘 출산가방 찐 필수템 vs 안 써서 후회한 템 정리해봤어요 📋',
      content: '다음 달 출산 앞두고 조리원 동기 언니들이랑 최근 출산한 친구들한테 설문조사해서 추린 찐 출산가방 리스트 공유해요!\n\n✅ 무조건 챙길 필수템: 가습기(조리원 방 건조함), 산모패드 오버나이트, 유두보호크림(라놀린), 손목보호대 2개, 긴 충전선(3m)\n❌ 굳이 미리 안 사도 되는 템: 수유쿠션(조리원에 다 있음), 신생아 내복 여러 벌(태열 때문에 배냇저고리만 입힘)\n\n예비맘님들 모두 순산하세요!',
      images: [],
      author: {
        nickname: '송도찰떡이맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '🤰 임신 34주 · 인천 송도',
        avatarBg: 'bg-pink-500 text-white'
      },
      createdAt: '1시간 전',
      timestamp: 1762429000000,
      views: 428,
      reactions: { like: 61, hug: 15, tip: 58 },
      tags: ['출산가방리스트', '임신34주', '송도산부인과', '산후조리원준비물', '예비맘꿀팁'],
      comments: [
        {
          id: 'c-seed-501',
          author: '청라토리맘',
          level: '🌱 새싹맘',
          childBadge: '🤰 임신 28주',
          content: '와 3m 충전선이랑 미니 가습기 생각도 못 했는데 바로 장바구니 담았습니다! 꿀팁 정리 너무 감사해요 스크랩해갑니다 💡',
          createdAt: '50분 전'
        }
      ]
    },
    {
      id: 'seed-post-6',
      category: 'tips',
      ageStage: 'toddler_early',
      region: 'busan',
      localHub: 'busan_centum',
      localHubName: '부산·울산·경남',
      localTopic: 'place',
      localTopicName: '☕ 동네 키즈맛집·나들이',
      isQuestion: false,
      isSolved: false,
      isHot: true,
      title: '[부산 해운대·센텀] 유모차 끌고 가기 편하고 아기의자 깨끗한 가족 외식 맛집 4곳 내돈내산 후기 🍽️',
      content: '두돌 아기 데리고 주말마다 외식할 곳 찾는 게 일이라 직접 다녀보고 정말 편했던 곳들만 모아봤어요!\n\n1. 센텀 신세계몰 가족식당가 (수유실 최고, 유모차 대여 쾌적)\n2. 해운대 달맞이길 숲속 브런치카페 (잔디마당 있어서 아기 뛰어놀기 최고)\n3. 마린시티 솥밥 정식집 (아기용 무염 국물 무료 제공!)\n4. 기장 대형 베이커리 카페 (키즈케어존 분리)\n\n부산 맘님들 나들이 갈 때 참고하세요!',
      images: [],
      author: {
        nickname: '해운대윤우맘',
        level: '🌳 열매나무맘',
        childBadge: '🚼 25개월 남아 · 부산 해운대',
        avatarBg: 'bg-teal-600 text-white'
      },
      createdAt: '2시간 전',
      timestamp: 1762426000000,
      views: 530,
      reactions: { like: 64, hug: 8, tip: 49 },
      tags: ['부산아기랑', '해운대키즈맛집', '센텀유모차', '두돌나들이', '부산맘카페'],
      comments: [
        {
          id: 'c-seed-601',
          author: '명지하린맘',
          level: '🌷 꽃봉오리맘',
          childBadge: '🚼 19개월 여아',
          content: '3번 마린시티 솥밥집 저도 단골이에요! 아기 김이랑 간 안 한 미역국 따로 챙겨주셔서 감동받았던 기억이 나네요 👍',
          createdAt: '1시간 전'
        }
      ]
    },
    {
      id: 'seed-post-7',
      category: 'elem_high',
      ageStage: 'elem_high',
      region: 'daegu',
      localHub: 'daegu_suseong',
      localHubName: '대구·수성·경북',
      localTopic: 'living',
      localTopicName: '🏠 동네 살기·이사·학군',
      isQuestion: true,
      isSolved: true,
      isHot: false,
      title: '[대구 수성구] 초5 올라가는 아이, 범어동·만촌동 쪽 수학·영어 학원 분위기 어떤가요?',
      content: '현재 달서구에 거주 중인데 아이가 초등 5학년 올라가면서 수성구 쪽으로 이사를 진지하게 고민하고 있어요. 너무 숨 막히는 선행 위주보다는 아이 수준에 맞춰 꼼꼼하게 관리해주는 중소형 학원들도 많은지, 수성구 거주하시는 학부모님들 실제 만족도가 궁금합니다!',
      images: [],
      author: {
        nickname: '대구열정맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '📚 초5 여아 · 대구',
        avatarBg: 'bg-sky-600 text-white'
      },
      createdAt: '3시간 전',
      timestamp: 1762422000000,
      views: 412,
      reactions: { like: 31, hug: 9, tip: 27 },
      tags: ['수성구학군', '범어동학원가', '초등고학년수학', '대구맘카페', '학군이사'],
      comments: [
        {
          id: 'c-seed-701',
          author: '범어동중1맘',
          level: '👑 도담멘토',
          childBadge: '🏫 중1 남아',
          content: '범어네거리 대형 학원만 있는 게 아니라 만촌3동이나 수성구립도서관 주변에 6명 정원 관리형 수학·영어 교습소도 정말 잘 되어 있어요! 도서관 면학 분위기가 워낙 좋아서 이사 오시면 만족하실 거예요.',
          createdAt: '2시간 전'
        }
      ]
    },
    {
      id: 'seed-post-8',
      category: 'middle',
      ageStage: 'middle_high',
      region: 'seoul',
      localHub: 'seoul_gangnam',
      localHubName: '강남·서초·송파',
      localTopic: 'daycare',
      localTopicName: '🏫 중·고등 학군·입시',
      isQuestion: false,
      isSolved: true,
      isHot: true,
      title: '[중·고등 라운지] 2028 대입 개편 적용되는 현 중3·중2 학부모님들 내신 & 세특 대비 핵심 요약!',
      content: '어제 입시 설명회 다녀와서 핵심만 노트 정리한 내용 공유합니다.\n\n1. 내신 5등급제 전환으로 1등급(상위 10%) 커트라인 유지가 최우선이지만, 동점자 변별을 위해 서술형·수행평가 비중이 크게 확대됩니다.\n2. 고교학점제 선택과목 이수 시 진로 연계 독서 및 탐구보고서 주제를 중학교 3학년 겨울방학에 미리 3~4개 잡아두는 것이 고1 때 시간을 엄청나게 아껴줍니다.\n\n다들 입시 화이팅입니다!',
      images: [],
      author: {
        nickname: '서초입시멘토맘',
        level: '👑 도담멘토',
        childBadge: '🎓 고1·중2 남매 · 서울 서초',
        avatarBg: 'bg-purple-600 text-white'
      },
      createdAt: '4시간 전',
      timestamp: 1762418000000,
      views: 845,
      reactions: { like: 92, hug: 18, tip: 76 },
      tags: ['2028대입개편', '고교학점제', '중딩맘라운지', '고딩맘라운지', '세특관리'],
      comments: [
        {
          id: 'c-seed-801',
          author: '대치중2맘',
          level: '🌳 열매나무맘',
          childBadge: '🏫 중2 여아',
          content: '설명회 못 가서 아쉬웠는데 핵심만 딱 짚어주셔서 너무 감사합니다! 겨울방학 독서 리스트부터 아이랑 같이 짜야겠어요.',
          createdAt: '3시간 전'
        }
      ]
    },
    {
      id: 'seed-post-9',
      category: 'working',
      ageStage: 'toddler',
      region: 'daejeon',
      localHub: 'daejeon_sejong',
      localHubName: '대전·세종·충청',
      localTopic: 'daycare',
      localTopicName: '🏫 어린이집·연장보육 소통',
      isQuestion: true,
      isSolved: false,
      isHot: false,
      title: '[세종·대전 워킹맘] 맞벌이 부부 어린이집 연장보육(17시~19시) 보낼 때 마음이 너무 쓰여요..',
      content: '복직하고 나서 어쩔 수 없이 저녁 6시 20분에 하원을 시키고 있는데, 5시 반 넘어가면 반에 저희 아이 포함해서 두 명만 남아있대요 ㅠㅠ 선생님은 아이가 친구랑 잘 논다고 걱정 말라고 하시는데 퇴근길 지하철에서 매일 마음이 뭉클하네요. 워킹맘 선배님들 어떻게 마인드컨트롤 하시나요?',
      images: [],
      author: {
        nickname: '세종새롬워킹맘',
        level: '🌿 떡잎맘',
        childBadge: '🧒 4세 여아 · 세종시',
        avatarBg: 'bg-rose-600 text-white'
      },
      createdAt: '5시간 전',
      timestamp: 1762414000000,
      views: 380,
      reactions: { like: 49, hug: 85, tip: 16 },
      tags: ['워킹맘고민', '연장보육', '세종맘카페', '대전맘카페', '복직맘'],
      comments: [
        {
          id: 'c-seed-901',
          author: '둔산동7년차워킹맘',
          level: '👑 도담멘토',
          childBadge: '🎒 초1 · 5세',
          content: '엄마가 죄책감 가지지 않는 게 제일 중요해요! 아이들은 연장반에서 소수로 선생님 독차지하며 간식 한 번 더 먹고 노는 걸 생각보다 엄청 좋아하더라구요. 하원 후 잠들기 전까지 30분만 핸드폰 내려놓고 눈 맞추며 안아주시면 애착 전혀 문제없습니다 토닥토닥 🤗',
          createdAt: '4시간 전'
        }
      ]
    },
    {
      id: 'seed-post-10',
      category: 'talk',
      ageStage: 'all',
      region: 'gwangju',
      localHub: 'gwangju_jeju',
      localHubName: '광주·전라·제주',
      localTopic: 'place',
      localTopicName: '☕ 주말 나들이·키즈풀빌라',
      isQuestion: false,
      isSolved: false,
      isHot: false,
      title: '[광주·전남/제주] 아기랑 주말에 다녀온 담양 메타세콰이어길 & 키즈카페 코스 너무 좋았어요 🌿',
      content: '날씨가 선선해서 유모차 끌고 담양 산책로 한 바퀴 돌고, 근처 잔디밭 있는 베이커리 카페에서 아기랑 비눗방울 놀이 실컷 하고 왔더니 저녁 8시 칼육퇴 성공했습니다!! 다들 오늘 육퇴 무사히 하셨나요? 육퇴 후 시원한 탄산수 한 잔 마시며 도담톡 구경 중이에요 ㅎㅎ',
      images: [],
      author: {
        nickname: '수완지구햇살맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '🚼 22개월 남아 · 광주 광산구',
        avatarBg: 'bg-emerald-600 text-white'
      },
      createdAt: '6시간 전',
      timestamp: 1762410000000,
      views: 295,
      reactions: { like: 41, hug: 19, tip: 12 },
      tags: ['칼육퇴', '광주맘카페', '주말나들이', '육퇴후자유시간', '비눗방울놀이'],
      comments: [
        {
          id: 'c-seed-1001',
          author: '제주애월맘',
          level: '🌷 꽃봉오리맘',
          childBadge: '🧒 5세 여아',
          content: '8시 칼육퇴 너무 부럽습니다!! 오늘 하루도 육아 고생 많으셨어요 편안한 밤 보내세요 🌙',
          createdAt: '5시간 전'
        }
      ]
    },
    {
      id: 'seed-post-11',
      category: 'toddler_early',
      ageStage: 'toddler_early',
      region: 'seoul',
      localHub: 'seoul_seongdong',
      localHubName: '성동·광진·노원',
      localTopic: 'place',
      localTopicName: '☕ 동네 키즈맛집·놀이터·번개',
      isQuestion: false,
      isSolved: false,
      isHot: true,
      title: '[서울숲·어린이대공원] 두돌 아기랑 유모차 산책 + 아기의자 있는 브런치 동네 번개 함께하실 분 🙋‍♀️',
      content: '성수동·옥수동·광진구 사시는 15~30개월 또래 맘님들! 평일 낮에 혼자 아기 데리고 산책하기 심심할 때가 많아서 목요일 오전 11시쯤 서울숲 사슴우리 앞에서 만나 산책하고 아기 간식 먹일 겸 번개 모임 열어요. 부담 없이 댓글로 손들어 주세요 💕',
      images: [],
      author: {
        nickname: '성수동도담맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '🚼 21개월 여아 · 서울 성동구',
        avatarBg: 'bg-emerald-500 text-white'
      },
      createdAt: '6시간 전',
      timestamp: 1762408000000,
      views: 312,
      reactions: { like: 38, hug: 11, tip: 15 },
      tags: ['서울숲산책', '성동구맘카페', '광진구맘카페', '조동모임', '두돌친구'],
      comments: [
        {
          id: 'c-seed-1101',
          author: '구의동하준맘',
          level: '🌿 떡잎맘',
          childBadge: '🚼 19개월 남아',
          content: '저요!! 어린이대공원 근처 사는데 목요일 오전 시간 딱 비어요! 아기 비눗방울 챙겨서 나갈게요 😊',
          createdAt: '5시간 전'
        }
      ]
    },
    {
      id: 'seed-post-12',
      category: 'toddler',
      ageStage: 'toddler',
      region: 'gyeonggi',
      localHub: 'gg_ilsan',
      localHubName: '일산·김포·다산',
      localTopic: 'daycare',
      localTopicName: '🏫 어린이집·유치원·학원 후기',
      isQuestion: true,
      isSolved: true,
      isHot: false,
      title: '[일산·김포] 5세 남아 숲유치원 vs 영어놀이학교 + 일반유치원 정말 고민됩니다',
      content: '아이 성향은 활동량 많고 곤충·공룡 관찰하는 걸 제일 좋아하는 5세 남아예요. 엄마 욕심에는 파닉스라도 빨리 접하게 해주고 싶은데, 남편은 무조건 호수공원 근처 숲생태 유치원 보내서 마음껏 뛰어놀게 하자고 하네요. 일산·김포 쪽 숲유치원 보내보신 분들 만족도 어떠셨나요?',
      images: [],
      author: {
        nickname: '일산호수맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '🧒 5세 남아 · 고양 일산',
        avatarBg: 'bg-amber-600 text-white'
      },
      createdAt: '7시간 전',
      timestamp: 1762405000000,
      views: 410,
      reactions: { like: 35, hug: 14, tip: 29 },
      tags: ['일산맘카페', '김포맘카페', '숲유치원', '5세유치원선택', '남아육아'],
      comments: [
        {
          id: 'c-seed-1201',
          author: '운정신도시형제맘',
          level: '🌳 열매나무맘',
          childBadge: '🎒 초1 · 6세',
          content: '활동량 많은 남아면 5~6세 때 숲유치원 강추해요! 대근육이랑 집중력이 숲에서 놀면서 확 길러져서 오히려 7세 때 책상에 앉는 힘이 훨씬 좋아지더라구요.',
          createdAt: '6시간 전'
        }
      ]
    },
    {
      id: 'seed-post-13',
      category: 'newborn',
      ageStage: 'newborn',
      region: 'seoul',
      localHub: 'seoul_mokdong',
      localHubName: '목동·마포·강서',
      localTopic: 'share',
      localTopicName: '🥕 동네 무료나눔·드림·벼룩',
      isQuestion: false,
      isSolved: false,
      isHot: false,
      title: '[마포·강서 나눔] 신생아 역류방지쿠션 + 모빌 거치대 깨끗하게 세탁해둔 것 드림해요 🍼',
      content: '저희 아기가 이제 뒤집기·되집기 마스터해서 역류방지쿠션이랑 타이니러브 모빌 졸업합니다! 커버는 아기 전용 세제로 삶음 세탁 완료했고 건전지 새것으로 갈아두었어요. 마곡역이나 합정역 인근 직거래 오실 분 댓글 주세요 :)',
      images: [],
      author: {
        nickname: '마곡은우맘',
        level: '🌷 꽃봉오리맘',
        childBadge: '🍼 7개월 남아 · 서울 강서',
        avatarBg: 'bg-pink-500 text-white'
      },
      createdAt: '8시간 전',
      timestamp: 1762401000000,
      views: 284,
      reactions: { like: 44, hug: 7, tip: 18 },
      tags: ['역류방지쿠션나눔', '타이니러브모빌', '강서맘카페', '마곡맘카페', '출산준비나눔'],
      comments: [
        {
          id: 'c-seed-1301',
          author: '상암동예비맘',
          level: '🌱 새싹맘',
          childBadge: '🤰 임신 32주',
          content: '안녕하세요! 상암동 거주하는 32주 예비맘인데 꼭 받고 싶습니다! 감사히 잘 쓰겠습니다 🙏',
          createdAt: '7시간 전'
        }
      ]
    },
    {
      id: 'seed-post-14',
      category: 'high',
      ageStage: 'middle_high',
      region: 'gyeonggi',
      localHub: 'gg_bundang',
      localHubName: '분당·판교·위례',
      localTopic: 'living',
      localTopicName: '🏠 동네 살기·이사·학군 질문',
      isQuestion: true,
      isSolved: true,
      isHot: true,
      title: '[분당·수지 고딩맘] 수내동·정자동 일반고 진학 vs 외대부고·국제고 지원 마무리 고민입니다',
      content: '중3 내신이 최상위권이라 특목·자사고 원서 접수를 앞두고 있는데, 2028 대입 개편 체제에서는 분당 일반고(낙생·수내·분당중앙)에서 내신 1등급을 안정적으로 확보하고 의치약/SKY 수시·정시 병행하는 게 나을지 매일 밤 아이와 토론 중입니다. 선배 고딩맘님들 고견 부탁드려요!',
      images: [],
      author: {
        nickname: '분당수내입시맘',
        level: '🌳 열매나무맘',
        childBadge: '🎓 중3 남아 · 성남 분당',
        avatarBg: 'bg-indigo-600 text-white'
      },
      createdAt: '9시간 전',
      timestamp: 1762398000000,
      views: 740,
      reactions: { like: 63, hug: 22, tip: 51 },
      tags: ['분당고입', '낙생고', '수내동학원가', '고딩맘라운지', '특목자사고'],
      comments: [
        {
          id: 'c-seed-1401',
          author: '정자동의대생맘',
          level: '👑 도담멘토',
          childBadge: '🎓 대1·고2',
          content: '이과 의약학 계열이 확고한 목표라면 분당 내 과학중점/자율형 일반고에서 내신 1등급 사수 + 대치·수내 주말 단과 조합이 체력 관리와 정시 대비 면에서 훨씬 유리했습니다!',
          createdAt: '8시간 전'
        }
      ]
    },
    {
      id: 'seed-post-15',
      category: 'tips',
      ageStage: 'newborn',
      region: 'all',
      localHub: 'all',
      localHubName: '전국 전체',
      localTopic: 'all',
      localTopicName: '💡 육아꿀팁·이유식 레시피',
      isQuestion: false,
      isSolved: false,
      isHot: true,
      title: '이유식 거부하던 아기가 입 쩍쩍 벌리는 소고기 배추 감자죽 & 철분 흡수 2배 비법 🥣',
      content: '초기·중기 넘어갈 때 입 꾹 닫고 숟가락 밀어내던 아기가 이 레시피로 바꾸고 한 그릇 120ml 뚝딱 비웠어요!\n\n💡 핵심 포인트:\n1. 육수는 양파+사과 2조각을 넣고 끓인 채소수를 써서 자연스러운 단맛 내기\n2. 소고기 안심 핏물을 너무 오래 빼면 철분이 빠져나가므로 키친타월로 톡톡 닦아 바로 데치기\n3. 비타민C가 풍부한 브로콜리나 배추를 소고기와 함께 먹이면 철분 흡수율이 2배 올라갑니다!',
      images: [],
      author: {
        nickname: '이유식요리왕맘',
        level: '👑 도담멘토',
        childBadge: '🍼 9개월 여아 · 전국',
        avatarBg: 'bg-amber-500 text-white'
      },
      createdAt: '10시간 전',
      timestamp: 1762394000000,
      views: 920,
      reactions: { like: 118, hug: 14, tip: 96 },
      tags: ['중기이유식', '이유식거부극복', '소고기이유식', '철분보충', '육아레시피'],
      comments: [
        {
          id: 'c-seed-1501',
          author: '초보도담맘',
          level: '🌱 새싹맘',
          childBadge: '🍼 7개월 남아',
          content: '사과+양파 채소수 꿀팁 대박이네요!! 오늘 저녁 큐브 만들 때 바로 따라 해보겠습니다 💡',
          createdAt: '9시간 전'
        }
      ]
    }
  ],

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

  restaurants: (typeof window !== 'undefined' && Array.isArray(window.DODAM_NATIONWIDE_RESTAURANTS) && window.DODAM_NATIONWIDE_RESTAURANTS.length > 0)
    ? window.DODAM_NATIONWIDE_RESTAURANTS
    : []
};
