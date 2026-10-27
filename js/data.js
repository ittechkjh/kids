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

  posts: [
    {
      id: 'post-101',
      category: 'newborn',
      region: 'pangyo',
      isHot: true,
      title: '생후 9개월 아기 밤중수유 끊기(단유)... 3일째인데 눈물 나네요 성공하신 분 팁 좀 주세요 😭',
      content: `지금 9개월 막 들어선 아기 키우고 있어요. 새벽 2시, 5시에 습관적으로 깨서 쪽쪽이 물려도 울고 분유 120ml를 꼭 먹어야 다시 자는데, 소아과 영유아검진 갔더니 이제 치아 우식증 때문에라도 밤수 끊어야 한다고 하시더라고요.\n\n어제부터 물로 대체하면서 토닥이는데 40분씩 자지러지게 우니까 옆집 눈치도 보이고 제 마음도 찢어지네요. 다들 며칠 만에 밤수 단유 성공하셨나요? 보리차나 백색소음 같은 꿀팁 있으시면 제발 공유 부탁드려요!`,
      author: {
        nickname: '판교도담맘',
        childBadge: '9개월 아기 · 분당·판교',
        avatarBg: 'bg-rose-100 text-rose-600',
        level: 'Lv.4 열정맘'
      },
      createdAt: '18분 전',
      timestamp: 1730000900,
      views: 1420,
      reactions: { like: 64, hug: 89, tip: 42 },
      userReaction: null,
      tags: ['밤중수유단유', '9개월아기', '수면교육', '통잠기원'],
      comments: [
        {
          id: 'c-1',
          author: '송파꿀잠대디 (16개월 아기)',
          time: '12분 전',
          text: '저희도 딱 9개월 때 끊었는데 4일째 되는 날 거짓말처럼 통잠 잤어요! 핵심은 새벽에 절대 불 켜지 마시고, 안아서 달래주되 분유 대신 미지근한 물 한 모금만 주는 걸 일관되게 유지하는 거였어요. 오늘 밤만 더 버텨보세요 화이팅!!'
        },
        {
          id: 'c-2',
          author: '동탄둥이맘 (22개월 쌍둥이)',
          time: '7분 전',
          text: '자기 직전 막수(마지막 수유) 양을 평소보다 30~40ml 늘려주시고, 이유식 저녁 타임을 오후 5시 반 이후로 조금 늦춰보세요! 배가 든든하면 새벽에 깨는 횟수가 확 줄어듭니다 🫂'
        },
        {
          id: 'c-3',
          author: '목동초보맘 (10개월 아기)',
          time: '3분 전',
          text: '저도 지금 똑같이 단유 2일차인데 댓글 보고 힘 얻고 갑니다 ㅠㅠ 우리 오늘 밤 무사히 넘겨봐요!'
        }
      ]
    },
    {
      id: 'post-102',
      category: 'working',
      region: 'songpa',
      isHot: true,
      title: '[현실조언 부탁] 초등학교 1학년 입학 앞둔 맞벌이 부부, 육아휴직 언제 쓰는 게 가장 현명할까요?',
      content: `어린이집·유치원 때는 야간연장반이랑 시댁 도움으로 어떻게든 버텼는데, 내년에 큰애가 초등학교 1학년 입학합니다.\n\n주변 선배 워킹맘들 말로는 "어린이집 때보다 초1 입학 첫 학기(3~7월)가 진짜 고비다, 늘봄학교 있어도 적응 기간이랑 알림장·준비물 챙기기가 장난 아니다"라고 하시는데, 남편이랑 저 둘 중 한 명이 3월에 맞춰 6개월 휴직을 쓰는 게 맞을지, 아니면 학원 셔틀+하원시터 조합으로 버티고 초2~3학년 때 쓰는 게 나을지 고민입니다. 경험담 들려주세요!`,
      author: {
        nickname: '가락동커피수혈',
        childBadge: '7세 예비초등 · 강남·서초·송파',
        avatarBg: 'bg-indigo-100 text-indigo-600',
        level: 'Lv.6 프로워킹맘'
      },
      createdAt: '42분 전',
      timestamp: 1730000800,
      views: 2380,
      reactions: { like: 118, hug: 54, tip: 96 },
      userReaction: null,
      tags: ['워킹맘육아휴직', '초1입학준비', '늘봄학교', '맞벌이돌봄'],
      comments: [
        {
          id: 'c-4',
          author: '판교IT워킹맘 (초2·5세)',
          time: '30분 전',
          text: '무조건 초1 1학기(3월~8월)에 쓰시는 거 강추합니다!! 3월 첫 한 달은 12시 반이면 하교하고, 학교생활 루틴 잡아주는 시기에 부모 중 한 명이 옆에 있어주면 아이 정서 안정감이 완전히 달라요.'
        },
        {
          id: 'c-5',
          author: '세종공무원대디 (초3·초1)',
          time: '19분 전',
          text: '엄마가 1학기 휴직, 아빠가 여름방학 포함 2학기 휴직으로 바통터치하면 1년 공백 없이 초등 적응 완벽하게 끝낼 수 있습니다!'
        }
      ]
    },
    {
      id: 'post-103',
      category: 'tips',
      region: 'all',
      isHot: true,
      title: '아이 열날 때 당황하지 마세요! 소아과 의사쌤이 알려준 해열제 교차복용 & 미온수 마사지 총정리 📋',
      content: `어제 둘째가 밤 11시에 갑자기 39.2도까지 올라서 달빛어린이병원 다녀오면서 원장님께 들은 핵심 지침 정리해 공유해요!\n\n1️⃣ 해열제 첫 복용 기준: 보통 38.5℃ 이상이거나, 38.0℃라도 아이가 힘들어하고 보채면 정량 복용\n2️⃣ 교차복용 골든룰: 아세트아미노펜(챔프빨강/타이레놀) 복용 후 2시간이 지났는데도 열이 38.5℃ 이상으로 안 떨어질 때 이부프로펜/덱시부프로펜(챔프파랑/맥시부펜)으로 교차 복용!\n3️⃣ 오한(손발이 차갑고 몸을 부르르 떨 때)이 있을 때는 절대 물수건 마사지 금지! 열이 오르는 중이라 아이가 더 힘들어해요. 손발이 따뜻해지고 땀이 날 때만 미지근한 물로 닦아주세요.\n\n다들 저장해두시고 야간 열감기 때 참고하세요!`,
      author: {
        nickname: '동탄소아과단골',
        childBadge: '3세·5세 연년생 · 동탄·수원·광교',
        avatarBg: 'bg-emerald-100 text-emerald-600',
        level: 'Lv.7 육아멘토'
      },
      createdAt: '1시간 전',
      timestamp: 1730000700,
      views: 3890,
      reactions: { like: 215, hug: 19, tip: 310 },
      userReaction: null,
      tags: ['해열제교차복용', '야간고열대처', '소아과꿀팁', '육아필독'],
      comments: [
        {
          id: 'c-6',
          author: '일산밤샘맘 (14개월 아기)',
          time: '45분 전',
          text: '와 오한 있을 때 물수건 마사지 하면 안 된다는 거 처음 알았어요! 바로 스크랩해둡니다 감사합니다 🙏'
        }
      ]
    },
    {
      id: 'post-104',
      category: 'toddler',
      region: 'dongtan',
      isHot: false,
      title: '28개월 두돌춘기 아기... 모든 말에 "싫어! 안 해! 내가 할 거야!" 무한반복 중입니다 😇',
      content: `어린이집에서는 선생님 말씀도 잘 듣고 친구들한테 양보도 잘하는 모범생이라는데, 하원하고 집에 오면 신발 벗는 것부터 손 씻기, 밥 먹기, 양치하기까지 전부 "싫어!! 내가!!" 하면서 바닥에 드러눕네요.\n\n밖에서 긴장하고 와서 집에서 푸는 거라고 머리로는 이해하면서도 매일 저녁 7시만 되면 제 인내심이 바닥을 칩니다. 두돌춘기 지혜롭게 넘기신 선배님들 마인드컨트롤 비법 좀 알려주세요.`,
      author: {
        nickname: '시범단지율무맘',
        childBadge: '28개월 아기 · 동탄·수원·광교',
        avatarBg: 'bg-amber-100 text-amber-600',
        level: 'Lv.3 성장맘'
      },
      createdAt: '2시간 전',
      timestamp: 1730000600,
      views: 840,
      reactions: { like: 52, hug: 78, tip: 29 },
      userReaction: null,
      tags: ['두돌춘기', '미운세살', '훈육고민', '자율성발달'],
      comments: [
        {
          id: 'c-7',
          author: '세종하늘맘 (4세 여아)',
          time: '1시간 전',
          text: '선택권을 2개만 주는 방법이 진짜 잘 먹혀요! "양치할래?" 대신 "공룡 치약으로 할까, 딸기 치약으로 할까?" 물어보면 자기가 골랐다고 신나서 입 벌리더라고요 ㅎㅎ'
        }
      ]
    },
    {
      id: 'post-105',
      category: 'talk',
      region: 'mapo',
      isHot: true,
      title: '주말에 남편 혼자 애 데리고 시댁 1박 2일 다녀오게 했더니 광명을 찾았습니다 ✨',
      content: `결혼하고 애 낳은 뒤로 시댁 갈 때마다 항상 다 같이 가서 제가 밥 차리는 거 돕고 애 뒤치다꺼리하느라 월요일마다 몸살이 났었거든요.\n\n이번에 큰맘 먹고 남편한테 "어머님 아버님도 손주랑 아들이랑 오붓하게 시간 보내고 싶으실 테니 둘이 다녀와~" 하고 토요일 아침에 과일 한 박스 들려 보냈습니다. 결과는요? 시부모님은 손주 실컷 보셔서 좋아하시고, 남편은 혼자 애 보느라 시댁에서 어머님께 육아 고충 체감하고 오고, 저는 1년 만에 집에서 배달음식 시켜 먹고 넷플릭스 정주행했어요! 분기별로 정기 행사로 만들려고요 ㅋㅋㅋ`,
      author: {
        nickname: '마포자유부인',
        childBadge: '4세 남아 · 마포·목동·용산',
        avatarBg: 'bg-purple-100 text-purple-600',
        level: 'Lv.5 지혜맘'
      },
      createdAt: '3시간 전',
      timestamp: 1730000500,
      views: 4510,
      reactions: { like: 342, hug: 41, tip: 185 },
      userReaction: null,
      tags: ['자유부인', '부부육아', '시댁효도원정대', '주말육아'],
      comments: [
        {
          id: 'c-8',
          author: '위례현실맘 (5세·2세)',
          time: '2시간 전',
          text: '이거 진짜 윈윈 전략이에요!! 저희도 3살 넘어가면서부터 아빠+아이 시댁 효도원정대 보내는데 평화가 찾아왔습니다 👍'
        }
      ]
    },
    {
      id: 'post-106',
      category: 'school',
      region: 'songpa',
      isHot: false,
      title: '예비초등 7세 한글 떼기 & 수학 연산, 입학 전 어디까지 하고 가야 학교 수업 안 힘들까요?',
      content: `주변에서는 요즘 애들 입학 전에 받침 있는 글자 받아쓰기랑 두 자리 수 덧셈뺄셈까지 다 끝내고 간다고 겁을 주는데, 저희 아이는 아직 책 읽기는 더듬더듬 읽고 쓰기는 자기 이름이랑 간단한 단어 정도만 쓰는 수준이에요.\n\n무리하게 학습지 시키자니 아이가 공부에 질릴까 봐 걱정이고, 그냥 보내자니 1학년 때 주눅 들까 봐 걱정입니다. 현재 초1~2학년 보내고 계신 학부모님들 현실 조언 부탁드려요!`,
      author: {
        nickname: '잠실도토리맘',
        childBadge: '7세 예비초등 · 강남·서초·송파',
        avatarBg: 'bg-blue-100 text-blue-600',
        level: 'Lv.4 열정맘'
      },
      createdAt: '4시간 전',
      timestamp: 1730000400,
      views: 1120,
      reactions: { like: 67, hug: 24, tip: 83 },
      userReaction: null,
      tags: ['예비초등', '7세한글떼기', '초1입학준비', '초등문해력'],
      comments: [
        {
          id: 'c-9',
          author: '현직초등교사맘 (초3 아기)',
          time: '3시간 전',
          text: '1학년 담임 맡아보면 연산 선행보다 훨씬 중요한 게 "선생님 지시문(문제)을 스스로 읽고 이해하는 힘"이에요! 받침 있는 동화책을 소리 내어 읽을 수 있는 정도면 충분하고, 대신 매일 그림책 2권씩 읽어주며 이야기 나누는 습관을 들여주세요.'
        }
      ]
    }
  ],

  cohortRooms: [
    {
      id: 'cohort-0-6',
      title: '🍼 0~6개월 신생아·백일 동기방',
      subtitle: '수유텀 잡기 · 등센서 졸업 · 백일의 기적 · 뒤집기 시작',
      memberCount: 1420,
      avgPhysical: '남아 평균 6.4~7.9kg / 여아 평균 5.8~7.3kg (3~6개월 기준)',
      milestones: [
        { id: 'm1', label: '생후 50일~100일 밤낮 구분 및 밤잠 5~6시간 연속 수면', done: true },
        { id: 'm2', label: '목 가누기 완성 및 터미타임(Tummy Time) 하루 20분', done: true },
        { id: 'm3', label: '옹알이 주고받기 및 손발 탐색(주먹고기 촵촵)', done: false },
        { id: 'm4', label: '생후 4~6개월 초기 미음 이유식 준비 및 로타바이러스/폐렴구균 접종', done: false }
      ],
      mustHaveItems: ['역류방지쿠션', '스와들업/모로반사 이불', '분유포트/브레짜', '타이니러브 모빌', '아기체육관'],
      messages: [
        { author: '판교용띠맘 (112일)', time: '방금 전', text: '오늘 드디어 밤 9시 막수하고 아침 6시까지 한 번도 안 깨고 백일의 기적 왔어요 ㅠㅠ 다들 희망을 가지세요!!' },
        { author: '송파초보아빠 (68일)', time: '4분 전', text: '원더윅스 기간인지 어제부터 등센서가 다시 켜졌네요 ㅎㅎ 오늘도 짐볼 위에서 바운스 타는 중입니다.' },
        { author: '세종복숭아맘 (145일)', time: '11분 전', text: '초기 이유식 쌀미음 내일 첫 시작인데 냄비이유식 vs 마스터기 중에 뭐가 더 편하셨나요?' }
      ]
    },
    {
      id: 'cohort-7-15',
      title: '🥣 7~15개월 중후기 이유식·돌아기 동기방',
      subtitle: '중기·후기 토핑이유식 · 배밀이/걸음마 · 돌잔치 · 첫 어린이집 입소',
      memberCount: 1890,
      avgPhysical: '남아 평균 8.9~10.3kg / 여아 평균 8.2~9.6kg (9~12개월 기준)',
      milestones: [
        { id: 'm5', label: '혼자 허리 펴고 앉기 및 가구 잡고 일어서기(잡고 걷기)', done: true },
        { id: 'm6', label: '철분 보충을 위한 소고기 매일 섭취 & 하루 3끼 이유식 정착', done: true },
        { id: 'm7', label: '엄마·아빠·만세·짝짜꿍 모방 행동 및 호명 반응 확인', done: false },
        { id: 'm8', label: '돌 전후 MMR·수두·일본뇌염 예방접종 및 영유아 구강검진', done: false }
      ],
      mustHaveItems: ['흡착식판 & 실리콘턱받이', '빨대컵(추빨대)', '베이비룸 & 안전문', '걸음마 보조기', '회전책장'],
      messages: [
        { author: '동탄별이맘 (11개월)', time: '2분 전', text: '자기주도 유아식 슬슬 연습 중인데 밥알이 식탁 밑에 반, 얼굴에 반이네요 ㅋㅋㅋ 언제쯤 깔끔해질까요?' },
        { author: '마포튼튼맘 (13개월)', time: '9분 전', text: '돌 지나자마자 우유(생우유)로 바로 갈아타셨나요? 베비언스 킨더밀쉬 거쳐가셨나요?' }
      ]
    },
    {
      id: 'cohort-16-36',
      title: '🧸 16~36개월 어린이집 적응·두돌 동기방',
      subtitle: '어린이집 등원 적응 · 어휘 폭발기 · 배변훈련 · 두돌춘기 훈육',
      memberCount: 2150,
      avgPhysical: '남아 평균 11.5~13.8kg / 여아 평균 10.8~13.2kg (24개월 전후)',
      milestones: [
        { id: 'm9', label: '두 단어 이상 연결 문장 말하기 ("엄마 물 줘", "이거 뭐야?")', done: true },
        { id: 'm10', label: '어린이집 낮잠까지 적응 완료 및 숟가락·포크 스스로 사용하기', done: true },
        { id: 'm11', label: '기저귀 떼기(배변훈련) 신호 인지 및 유아변기 친해지기', done: false }
      ],
      mustHaveItems: ['어린이집 낮잠이불 세트', '네임스티커/방수스탬프', '세이펜 & 자연관찰 전집', '밸런스바이크/킥보드'],
      messages: [
        { author: '위례감자맘 (26개월)', time: '5분 전', text: '세이펜 호환되는 자연관찰 전집 당근으로 들였는데 하루 종일 콕콕 찍으면서 노네요 육아효자템 인정입니다!' },
        { author: '분당구름대디 (31개월)', time: '14분 전', text: '주말에 비 소식 있던데 경기 남부권 실내 아기랑 갈만한 곳 추천 부탁드려요!' }
      ]
    },
    {
      id: 'cohort-4-7',
      title: '🎒 4~7세 유치원·예비초등 학부모방',
      subtitle: '유치원 선택 · 사회성 발달 · 한글/수 감각 · 초등학교 입학 준비',
      memberCount: 1640,
      avgPhysical: '또래 친구 관계 형성 및 독서 습관·자기조절력 완성 시기',
      milestones: [
        { id: 'm12', label: '친구와 규칙 있는 게임하기 및 감정 언어로 표현하기', done: true },
        { id: 'm13', label: '하루 20분 그림책 읽기 루틴 & 자기 이름/생활 한글 읽기', done: false },
        { id: 'm14', label: '스스로 옷 입고 정리하기 및 화장실 뒤처리 연습', done: false }
      ],
      mustHaveItems: ['유아 책상·의자 세트', '한글 자석교구/보드게임', '어린이 수영/발레/태권도', '초등 입학 책가방'],
      messages: [
        { author: '개포햇살맘 (6세)', time: '8분 전', text: '유치원 친구 생일파티 답례품 3천원~5천원 선에서 센스 있었던 아이템 뭐가 있을까요?' },
        { author: '판교초등준비 (7세)', time: '21분 전', text: '보드게임(할리갈리, 루미큐브 키즈, 고피쉬)으로 수 감각 익히니까 학습지보다 훨씬 좋아하네요!' }
      ]
    }
  ],

  clubs: [
    {
      id: 'club-1',
      region: 'pangyo',
      regionName: '분당·판교',
      category: '산책·놀이터',
      title: '판교 화랑공원·운중천 평일 오전 유모차 산책 & 커피 모임 ☕',
      schedule: '매주 화·목 오전 10:30',
      targetAge: '6~20개월 영아 동반',
      leader: '백현동봄이맘',
      currentMembers: 5,
      maxMembers: 8,
      joined: false,
      desc: '집에만 있으면 답답한 육아휴직/전업맘들 모여요! 유모차 끌고 산책로 한 바퀴 돌고 테라스 카페에서 이유식 먹이며 수다 떨어요.'
    },
    {
      id: 'club-2',
      region: 'songpa',
      regionName: '강남·송파',
      category: '독서·품앗이',
      title: '송파 책박물관·올림픽공원 주말 아빠와 숲체험 & 그림책 품앗이 🌳',
      schedule: '격주 토요일 오전 10:30',
      targetAge: '4~7세 유아 가족',
      leader: '잠실하준아빠',
      currentMembers: 6,
      maxMembers: 6,
      joined: true,
      desc: '주말에 아빠들이 돌아가며 생태 탐험 리더를 맡아 도토리·곤충 관찰하고 비눗방울 놀이하는 건전한 가족 모임입니다.'
    },
    {
      id: 'club-3',
      region: 'dongtan',
      regionName: '동탄·광교',
      category: '등하원·긴급품앗이',
      title: '동탄 시범단지 맞벌이 부부 야근 시 긴급 하원·놀이터 품앗이 크루 🤝',
      schedule: '평일 저녁 긴급 상호지원',
      targetAge: '5~9세 (유치원·초등저)',
      leader: '청계동워킹맘',
      currentMembers: 4,
      maxMembers: 6,
      joined: false,
      desc: '같은 단지·같은 초등학교 보내는 맞벌이 가정끼리 갑작스러운 야근이나 학원 공백 때 서로 1~2시간 아이 돌봐주는 든든한 이웃 모임!'
    },
    {
      id: 'club-4',
      region: 'sejong',
      regionName: '세종·대전',
      category: '엄마표영어·놀이',
      title: '새롬동 복합커뮤니티센터 유아 영어그림책(ORT) 함께 읽기 모임 📚',
      schedule: '매주 수요일 오후 4:30 (하원 후)',
      targetAge: '5~7세 유아',
      leader: '새뜸마을지우맘',
      currentMembers: 4,
      maxMembers: 8,
      joined: false,
      desc: '비싼 영어유치원 대신 동네 친구들과 하원 후 복컴 도서관에서 영어 그림책 읽고 독후 미술놀이 함께해요.'
    }
  ],

  marketItems: [
    {
      id: 'item-1',
      type: 'free',
      typeBadge: '💝 무료나눔',
      regionName: '분당·판교',
      title: '[무료나눔] 타이니러브 모빌 + 수유시트 + 신생아 배냇저고리 일괄 나눔해요',
      price: '무료나눔 (기운 받아가세요!)',
      condition: 'A급 (세탁·소독 완료)',
      seller: '판교졸업맘 (14개월)',
      status: '나눔중',
      likes: 18,
      desc: '저희 아기는 이제 걸어 다녀서 졸업합니다! 모빌 정상 작동하고 소리도 잘 나요. 문고리 비대면 나눔 가능합니다.'
    },
    {
      id: 'item-2',
      type: 'sale',
      typeBadge: '🥕 육아당근',
      regionName: '강남·송파',
      title: '부가부 버터플라이 휴대용 유모차 (베이지, 레인커버·방풍커버 포함)',
      price: '360,000원',
      condition: 'S급 (실사용 10회 미만)',
      seller: '헬리오유모차맘',
      status: '판매중',
      likes: 29,
      desc: '해외여행 때 쓰려고 샀는데 아이가 유모차를 거부해서 지하주차장 산책만 몇 번 한 특A급입니다.'
    },
    {
      id: 'item-3',
      type: 'free',
      typeBadge: '💝 무료나눔',
      regionName: '동탄·수원',
      title: '[무료나눔] 블루래빗 시작전집 보드북 32권 + 사운드북 (돌아기 추천)',
      price: '무료나눔',
      condition: '사용감 있음 (찢김 없음)',
      seller: '동탄책육아맘',
      status: '나눔중',
      likes: 24,
      desc: '돌 전후 아기들이 정말 잘 보는 보드북 전집입니다. 필요한 동네 후배맘님께 나눔해요!'
    },
    {
      id: 'item-4',
      type: 'sale',
      typeBadge: '🥕 육아당근',
      regionName: '마포·목동',
      title: '스토케 트립트랩 하이체어 내추럴 + 베이비세트 & 트레이 일괄',
      price: '280,000원',
      condition: 'A급 (정품 시리얼 등록 가능)',
      seller: '목동이유식장인',
      status: '판매중',
      likes: 35,
      desc: '이유식 시기에 정말 잘 썼고 찍힘 거의 없이 깨끗하게 관리했습니다.'
    }
  ],

  gearReviews: [
    {
      id: 'gear-1',
      rank: 1,
      category: '신생아·수유 필수템',
      name: '베이비브레짜 자동 분유제조기 Pro',
      rating: 4.9,
      reviewCount: 412,
      recommendAge: '0~12개월 완분·혼합수유',
      pros: '새벽 3시에 눈 감고 버튼 하나로 7초 만에 적정 온도 분유 완성! 손목과 수면시간을 구원해 준 육아 신세계 아이템',
      cons: '깔때기 세척을 4회마다 해줘야 하므로 예비 깔때기 1개 추가 구매 필수'
    },
    {
      id: 'gear-2',
      rank: 2,
      category: '이유식·식탁의자',
      name: '스토케 트립트랩 아기식탁의자',
      rating: 4.8,
      reviewCount: 389,
      recommendAge: '6개월 이유식 ~ 초등학생',
      pros: '발판 높이 조절이 세밀해서 아기가 바른 자세로 이유식을 먹고, 초등학교 입학 후에도 공부 의자로 쭉 사용 가능',
      cons: '본체 외에 베이비세트·트레이 별도 구매 시 초기 비용이 높음 (중고 방어율은 최고)'
    },
    {
      id: 'gear-3',
      rank: 3,
      category: '책육아·어휘폭발',
      name: '세이펜 레인보우 + 돌잡이 풀패키지 (명화·수학·한글)',
      rating: 4.9,
      reviewCount: 356,
      recommendAge: '10개월 ~ 36개월',
      pros: '돌 전후 아기들이 스스로 펜으로 찍으며 노래 듣고 말문이 트이는 국민 첫 전집',
      cons: '인기가 많아 새 상품 품절이 잦음'
    }
  ],

  // 월령별 남/여 평균 키(cm) 및 몸무게(kg) 기준표 (질병관리청 소아청소년 성장도표 50백분위 기준)
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
  restaurants: [
    {
          "id": "rest-seoul-01",
          "name": "삼원가든 본점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "강남구 신사동",
          "address": "서울특별시 강남구 언주로 835",
          "phone": "02-548-3030",
          "lat": 37.5256,
          "lng": 127.0315,
          "hours": "11:30 ~ 22:00 (연중무휴)",
          "representativeMenu": "삼원 양념갈비 (52,000원), 어린이 갈비탕 (18,000원)",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 주차장",
                "유모차 진입 수월",
                "야외 정원",
                "발렛파킹"
          ],
          "reviewSummary": "물레방아와 연못이 있는 아름다운 대형 야외 정원이 있어 아이들이 구경하기 좋고, 전용 룸과 아기의자, 유아식기가 잘 갖춰진 가족 모임 명소입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3840,
                      "url": "https://map.naver.com/v5/search/%EC%82%BC%EC%9B%90%EA%B0%80%EB%93%A0%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1120,
                      "url": "https://map.kakao.com/?q=%EC%82%BC%EC%9B%90%EA%B0%80%EB%93%A0%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 950,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%82%BC%EC%9B%90%EA%B0%80%EB%93%A0%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-02",
          "name": "딘타이펑 강남점",
          "category": "chinese",
          "categoryName": "중식 · 딤섬",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "서초구 서초동",
          "address": "서울특별시 서초구 서초대로73길 12 세계빌딩 2층",
          "phone": "02-569-2778",
          "lat": 37.4996,
          "lng": 127.0252,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "샤오롱바오 (14,500원), 새우볶음밥 (13,000원), 멘보샤 (22,000원)",
          "amenities": [
                "아기의자 완비",
                "유아식기 제공",
                "유모차 진입 수월",
                "주차 가능",
                "어린이 메뉴"
          ],
          "reviewSummary": "육즙 가득한 딤섬과 간이 세지 않은 새우볶음밥이 있어 어린 아이 동반 식사에 최적입니다. 유아 식판과 컵을 친절히 먼저 챙겨줍니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4120,
                      "url": "https://map.naver.com/v5/search/%EB%94%98%ED%83%80%EC%9D%B4%ED%8E%91%20%EA%B0%95%EB%82%A8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 890,
                      "url": "https://map.kakao.com/?q=%EB%94%98%ED%83%80%EC%9D%B4%ED%8E%91%20%EA%B0%95%EB%82%A8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%94%98%ED%83%80%EC%9D%B4%ED%8E%91%20%EA%B0%95%EB%82%A8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-03",
          "name": "더플레이스 잠실롯데백화점",
          "category": "western",
          "categoryName": "양식 · 이탈리안",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "송파구 잠실동",
          "address": "서울특별시 송파구 올림픽로 240 롯데백화점 잠실점 11층",
          "phone": "02-2143-7080",
          "lat": 37.5115,
          "lng": 127.0982,
          "hours": "10:30 ~ 21:00",
          "representativeMenu": "폭탄피자 (26,000원), 까르보나라 페투치네 (22,000원)",
          "amenities": [
                "아기의자 완비",
                "유모차 진입 수월",
                "백화점 수유실 인접",
                "넓은 주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "불쇼가 펼쳐지는 시그니처 폭탄피자에 아이들이 환호해요. 롯데백화점 유아휴게실과 수유실이 같은 층에 있어 돌 전후 아기와 방문하기 매우 편합니다.",
          "overallRating": 4.6,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1850,
                      "url": "https://map.naver.com/v5/search/%EB%8D%94%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4%20%EC%9E%A0%EC%8B%A4%EB%A1%AF%EB%8D%B0%EB%B0%B1%ED%99%94%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.2,
                      "reviewCount": 380,
                      "url": "https://map.kakao.com/?q=%EB%8D%94%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4%20%EC%9E%A0%EC%8B%A4%EB%A1%AF%EB%8D%B0%EB%B0%B1%ED%99%94%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8D%94%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4%20%EC%9E%A0%EC%8B%A4%EB%A1%AF%EB%8D%B0%EB%B0%B1%ED%99%94%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-04",
          "name": "벽제갈비 방이본점 / 봉피양",
          "category": "korean",
          "categoryName": "한식 · 한우구이/평양냉면",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "송파구 방이동",
          "address": "서울특별시 송파구 양재대로71길 1-4",
          "phone": "02-415-5522",
          "lat": 37.5082,
          "lng": 127.1268,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "설화생갈비 (125,000원), 봉피양 돼지갈비 (36,000원), 한우불고기 (45,000원)",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 주차장",
                "발렛파킹",
                "유아식기 제공"
          ],
          "reviewSummary": "부모님 환갑, 칠순이나 가족 생일 모임 1순위. 고기가 입에서 살살 녹아 이가 약한 유아들도 잘 먹고, 전좌석 독립 룸이 쾌적합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2900,
                      "url": "https://map.naver.com/v5/search/%EB%B2%BD%EC%A0%9C%EA%B0%88%EB%B9%84%20%EB%B0%A9%EC%9D%B4%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 910,
                      "url": "https://map.kakao.com/?q=%EB%B2%BD%EC%A0%9C%EA%B0%88%EB%B9%84%20%EB%B0%A9%EC%9D%B4%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 820,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B2%BD%EC%A0%9C%EA%B0%88%EB%B9%84%20%EB%B0%A9%EC%9D%B4%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-05",
          "name": "한와담 대치점",
          "category": "korean",
          "categoryName": "한식 · 숙성한우",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "강남구 대치동",
          "address": "서울특별시 강남구 역삼로 415",
          "phone": "02-568-7905",
          "lat": 37.5008,
          "lng": 127.0545,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "숙성 안심 (58,000원), 차돌깍두기볶음밥 (16,000원), 한우 구이",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "발렛파킹",
                "콜키지 프리",
                "유아식기 제공"
          ],
          "reviewSummary": "직원분이 고기를 처음부터 끝까지 정성껏 구워주셔서 아이 케어하면서 우아하게 식사할 수 있습니다. 룸이 방음이 잘 되어 편안합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1420,
                      "url": "https://map.naver.com/v5/search/%ED%95%9C%EC%99%80%EB%8B%B4%20%EB%8C%80%EC%B9%98%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 410,
                      "url": "https://map.kakao.com/?q=%ED%95%9C%EC%99%80%EB%8B%B4%20%EB%8C%80%EC%B9%98%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%9C%EC%99%80%EB%8B%B4%20%EB%8C%80%EC%B9%98%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-06",
          "name": "세상의 모든 아침 여의도점",
          "category": "brunch",
          "categoryName": "브런치 · 올데이다이닝",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "영등포구 여의도동",
          "address": "서울특별시 영등포구 여의대로 24 전경련회관 50층",
          "phone": "02-2055-4442",
          "lat": 37.5215,
          "lng": 126.9245,
          "hours": "10:00 ~ 22:00 (브레이크타임 16:00~17:00)",
          "representativeMenu": "바게트 프렌치토스트 (27,000원), 트러플 블랙 리조또 (29,000원)",
          "amenities": [
                "아기의자 완비",
                "유모차 진입 수월",
                "파노라마 한강뷰",
                "주차 가능",
                "유아식기 제공"
          ],
          "reviewSummary": "50층 초고층에서 내려다보는 여의도 한강뷰가 장관입니다. 통창 채광이 좋아 돌잔치나 가족 기념일 사진이 그림처럼 나옵니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 5210,
                      "url": "https://map.naver.com/v5/search/%EC%84%B8%EC%83%81%EC%9D%98%20%EB%AA%A8%EB%93%A0%20%EC%95%84%EC%B9%A8%20%EC%97%AC%EC%9D%98%EB%8F%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.1,
                      "reviewCount": 1480,
                      "url": "https://map.kakao.com/?q=%EC%84%B8%EC%83%81%EC%9D%98%20%EB%AA%A8%EB%93%A0%20%EC%95%84%EC%B9%A8%20%EC%97%AC%EC%9D%98%EB%8F%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 1690,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%B8%EC%83%81%EC%9D%98%20%EB%AA%A8%EB%93%A0%20%EC%95%84%EC%B9%A8%20%EC%97%AC%EC%9D%98%EB%8F%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-07",
          "name": "송추가마골 인 어반 여의도점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "영등포구 여의도동",
          "address": "서울특별시 영등포구 국제금융로8길 31 SK증권빌딩 지하1층",
          "phone": "02-3290-7000",
          "lat": 37.5218,
          "lng": 126.9288,
          "hours": "11:15 ~ 21:45",
          "representativeMenu": "가마골갈비 (45,000원), 갈비탕 (16,000원), 어린이 불고기",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 주차장",
                "유모차 진입 수월",
                "유아식기 제공"
          ],
          "reviewSummary": "부드러운 양념갈비와 진한 갈비탕 국물 덕분에 아이 밥 한 공기 뚝딱 비워요. 대형 룸과 아기의자가 여유로워 주말 가족모임으로 인기입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2340,
                      "url": "https://map.naver.com/v5/search/%EC%86%A1%EC%B6%94%EA%B0%80%EB%A7%88%EA%B3%A8%20%EC%9D%B8%20%EC%96%B4%EB%B0%98%20%EC%97%AC%EC%9D%98%EB%8F%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 520,
                      "url": "https://map.kakao.com/?q=%EC%86%A1%EC%B6%94%EA%B0%80%EB%A7%88%EA%B3%A8%20%EC%9D%B8%20%EC%96%B4%EB%B0%98%20%EC%97%AC%EC%9D%98%EB%8F%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 460,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%A1%EC%B6%94%EA%B0%80%EB%A7%88%EA%B3%A8%20%EC%9D%B8%20%EC%96%B4%EB%B0%98%20%EC%97%AC%EC%9D%98%EB%8F%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-08",
          "name": "하이디라오 용산아이파크몰점",
          "category": "chinese",
          "categoryName": "중식 · 훠궈",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "용산구 한강로동",
          "address": "서울특별시 용산구 한강대로23길 55 현대아이파크몰 리빙파크 7층",
          "phone": "02-2012-0700",
          "lat": 37.5298,
          "lng": 126.9647,
          "hours": "10:00 ~ 03:00 (새벽 영업)",
          "representativeMenu": "토마토탕 & 삼선탕 (순한맛), 우삼겹, 키즈 전용 계란찜 및 과일 무료",
          "amenities": [
                "어린이 놀이방 완비",
                "아기의자 완비",
                "유아식기 제공",
                "키즈 장난감 선물",
                "유모차 진입 수월",
                "수유실 인접"
          ],
          "reviewSummary": "아이 친화 서비스의 끝판왕! 입장하자마자 어린이용 자동차 식판과 장난감을 선물해주고, 놀이방과 전담 직원이 있어 부모가 편안히 식사합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 4520,
                      "url": "https://map.naver.com/v5/search/%ED%95%98%EC%9D%B4%EB%94%94%EB%9D%BC%EC%98%A4%20%EC%9A%A9%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 930,
                      "url": "https://map.kakao.com/?q=%ED%95%98%EC%9D%B4%EB%94%94%EB%9D%BC%EC%98%A4%20%EC%9A%A9%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 880,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%98%EC%9D%B4%EB%94%94%EB%9D%BC%EC%98%A4%20%EC%9A%A9%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-09",
          "name": "토끼정 용산아이파크몰점",
          "category": "japanese",
          "categoryName": "일식 · 퓨전 가정식",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "용산구 한강로동",
          "address": "서울특별시 용산구 한강대로23길 55 HDC아이파크몰 테이스트파크 6층",
          "phone": "02-2012-0640",
          "lat": 37.5295,
          "lng": 126.9642,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "토끼정 크림카레우동 (14,500원), 함밤 스테-끼 밥 (17,800원), 치즈카츠 (15,500원)",
          "amenities": [
                "아기의자 완비",
                "유모차 진입 수월",
                "유아식기 제공",
                "주차 지원"
          ],
          "reviewSummary": "달콤 부드러운 감자크림 카레우동과 두툼한 수제 함박스테이크가 아이들에게 인기 만점입니다. 아이파크몰 쇼핑 후 동선이 매우 편리합니다.",
          "overallRating": 4.6,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.6,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%ED%86%A0%EB%81%BC%EC%A0%95%20%EC%9A%A9%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.1,
                      "reviewCount": 490,
                      "url": "https://map.kakao.com/?q=%ED%86%A0%EB%81%BC%EC%A0%95%20%EC%9A%A9%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 560,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%86%A0%EB%81%BC%EC%A0%95%20%EC%9A%A9%EC%82%B0%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-10",
          "name": "조박집 본점 (마포돼지갈비)",
          "category": "korean",
          "categoryName": "한식 · 돼지갈비",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "마포구 용강동",
          "address": "서울특별시 마포구 토정로 313-1",
          "phone": "02-712-7462",
          "lat": 37.5412,
          "lng": 126.9445,
          "hours": "11:30 ~ 22:00 (일요일 휴무)",
          "representativeMenu": "국내산 돼지갈비 (19,000원), 동치미국수 (3,000원), 된장찌개",
          "amenities": [
                "아기의자 완비",
                "유아식기 제공",
                "포장 가능",
                "공영주차장 지원"
          ],
          "reviewSummary": "수요미식회에 소개된 40년 전통 양념갈비 명가. 너무 달지 않고 부드러워 아이들도 폭풍 흡입하고 후식 식혜까지 온 가족이 만족합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4890,
                      "url": "https://map.naver.com/v5/search/%EB%A7%88%ED%8F%AC%20%EC%A1%B0%EB%B0%95%EC%A7%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1620,
                      "url": "https://map.kakao.com/?q=%EB%A7%88%ED%8F%AC%20%EC%A1%B0%EB%B0%95%EC%A7%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 1250,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A7%88%ED%8F%AC%20%EC%A1%B0%EB%B0%95%EC%A7%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-11",
          "name": "닥터로빈 공덕점",
          "category": "western",
          "categoryName": "양식 · 헬시 이탈리안",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "마포구 공덕동",
          "address": "서울특별시 마포구 마포대로 92 효성해링턴스퀘어 B동 2층",
          "phone": "02-2197-1888",
          "lat": 37.5435,
          "lng": 126.9515,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "통단호박 콩크림스프 (19,800원), 매콤버섯크림파스타 (18,500원), 키즈 리조또",
          "amenities": [
                "아기의자 완비",
                "설탕/버터/MSG 무첨가",
                "유아식기 제공",
                "유모차 진입 수월",
                "지하주차장"
          ],
          "reviewSummary": "No설탕, No버터, No인공조미료의 콩크림 베이스라 이유식 뗀 아기들에게 안심하고 먹일 수 있는 건강 레스토랑. 통단호박스프는 온가족 필수 메뉴!",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1940,
                      "url": "https://map.naver.com/v5/search/%EB%8B%A5%ED%84%B0%EB%A1%9C%EB%B9%88%20%EA%B3%B5%EB%8D%95%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 410,
                      "url": "https://map.kakao.com/?q=%EB%8B%A5%ED%84%B0%EB%A1%9C%EB%B9%88%20%EA%B3%B5%EB%8D%95%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8B%A5%ED%84%B0%EB%A1%9C%EB%B9%88%20%EA%B3%B5%EB%8D%95%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-12",
          "name": "석파랑 (전통한옥 한정식)",
          "category": "korean",
          "categoryName": "한식 · 궁중한정식",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "종로구 홍지동",
          "address": "서울특별시 종로구 자하문로 309",
          "phone": "02-395-2500",
          "lat": 37.5992,
          "lng": 126.9575,
          "hours": "12:00 ~ 21:30",
          "representativeMenu": "수복 코스 (95,000원), 석파랑 궁중 수라상, 어린이 한식상",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "전통 한옥 정원",
                "발렛파킹",
                "돌잔치 전문"
          ],
          "reviewSummary": "흥선대원군 별채 유적지와 소나무 숲이 어우러진 서울 최고의 한옥 공간. 돌잔치 스냅사진 명소이자 3대 대가족 외식에 품격을 더해줍니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1680,
                      "url": "https://map.naver.com/v5/search/%EC%84%9D%ED%8C%8C%EB%9E%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 380,
                      "url": "https://map.kakao.com/?q=%EC%84%9D%ED%8C%8C%EB%9E%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 520,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%9D%ED%8C%8C%EB%9E%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-13",
          "name": "몽중헌 페럼타워점",
          "category": "chinese",
          "categoryName": "중식 · 고급 딤섬/코스",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "중구 수하동",
          "address": "서울특별시 중구 을지로5길 19 페럼타워 지하2층",
          "phone": "02-6353-8585",
          "lat": 37.5672,
          "lng": 126.9842,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "구채교 (14,000원), 하교 (14,000원), 탕수육 (38,000원)",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 주차장",
                "유모차 진입 수월",
                "유아식기 제공"
          ],
          "reviewSummary": "홍콩 현지 셰프가 빚어내는 최고급 수제 딤섬. 룸이 고급스럽고 조용하여 아이 동반 가족 모임이나 부모님 생신 식사로 예약 필수인 곳입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2750,
                      "url": "https://map.naver.com/v5/search/%EB%AA%BD%EC%A4%91%ED%97%8C%20%ED%8E%98%EB%9F%BC%ED%83%80%EC%9B%8C%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 620,
                      "url": "https://map.kakao.com/?q=%EB%AA%BD%EC%A4%91%ED%97%8C%20%ED%8E%98%EB%9F%BC%ED%83%80%EC%9B%8C%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%AA%BD%EC%A4%91%ED%97%8C%20%ED%8E%98%EB%9F%BC%ED%83%80%EC%9B%8C%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-14",
          "name": "오목집 목동본점",
          "category": "korean",
          "categoryName": "한식 · 족발/보쌈",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "양천구 목동",
          "address": "서울특별시 양천구 목동서로 155-23 목동파라곤 지하1층",
          "phone": "02-6737-6692",
          "lat": 37.5285,
          "lng": 126.8745,
          "hours": "11:00 ~ 23:00",
          "representativeMenu": "HACCP 족발 (42,000원), 쟁반막국수 (16,000원), 무료 꽃게탕",
          "amenities": [
                "아기의자 완비",
                "유모차 진입 수월",
                "아이스크림 무료 제공",
                "파라곤 주차장"
          ],
          "reviewSummary": "목동 학부모들의 검증된 외식 성지. 족발 주문 시 시원한 꽃게탕이 기본 제공되고, 후식 1등급 원유 소프트아이스크림에 아이들이 열광합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EC%98%A4%EB%AA%A9%EC%A7%91%20%EB%AA%A9%EB%8F%99%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 790,
                      "url": "https://map.kakao.com/?q=%EC%98%A4%EB%AA%A9%EC%A7%91%20%EB%AA%A9%EB%8F%99%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%98%A4%EB%AA%A9%EC%A7%91%20%EB%AA%A9%EB%8F%99%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-15",
          "name": "서초 소나무언덕 한정식",
          "category": "korean",
          "categoryName": "한식 · 보리굴비/한정식",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "서초구 우면동",
          "address": "서울특별시 서초구 식유촌길 71",
          "phone": "02-579-9952",
          "lat": 37.4615,
          "lng": 127.0215,
          "hours": "11:30 ~ 21:00",
          "representativeMenu": "소나무 정식 (32,000원), 보리굴비 정식 (35,000원), 떡갈비 정식",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 잔디마당",
                "주차 완비",
                "유아식기 제공"
          ],
          "reviewSummary": "서울 도심 속 시골 외갓집에 온 듯한 아늑한 잔디마당과 정갈한 반찬. 자극적이지 않고 떡갈비와 잡채가 맛있어 영유아 동반 가족이 참 좋아합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1420,
                      "url": "https://map.naver.com/v5/search/%EC%86%8C%EB%82%98%EB%AC%B4%EC%96%B8%EB%8D%95%20%EC%84%9C%EC%B4%88",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://map.kakao.com/?q=%EC%86%8C%EB%82%98%EB%AC%B4%EC%96%B8%EB%8D%95%20%EC%84%9C%EC%B4%88",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 290,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%8C%EB%82%98%EB%AC%B4%EC%96%B8%EB%8D%95%20%EC%84%9C%EC%B4%88",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-seoul-16",
          "name": "빕스 프리미어 미아점",
          "category": "western",
          "categoryName": "양식 · 패밀리 레스토랑/뷔페",
          "region": "seoul",
          "regionName": "서울특별시",
          "district": "강북구 미아동",
          "address": "서울특별시 강북구 도봉로 52 와이스퀘어 3층",
          "phone": "02-945-1997",
          "lat": 37.6138,
          "lng": 127.0305,
          "hours": "10:30 ~ 22:00",
          "representativeMenu": "샐러드바 성인 (47,900원), 미취학 아동 (10,900원), 스테이크",
          "amenities": [
                "어린이 놀이방 완비",
                "수유실 완비",
                "아기의자 완비",
                "유모차 진입 수월",
                "유아전용 식기구"
          ],
          "reviewSummary": "대형 어린이 놀이방과 유아 전용 식기, 이유식 데우기용 전자레인지, 수유실까지 완벽 구비! 강북권 부모들의 단골 가족 외식 뷔페입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%B9%95%EC%8A%A4%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%96%B4%20%EB%AF%B8%EC%95%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.2,
                      "reviewCount": 610,
                      "url": "https://map.kakao.com/?q=%EB%B9%95%EC%8A%A4%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%96%B4%20%EB%AF%B8%EC%95%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 530,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B9%95%EC%8A%A4%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%96%B4%20%EB%AF%B8%EC%95%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-01",
          "name": "서현궁 (분당 율동공원점)",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비/한정식",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "성남시 분당구 서현동",
          "address": "경기도 성남시 분당구 안골로 24",
          "phone": "031-708-5900",
          "lat": 37.3824,
          "lng": 127.1428,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "양념 본갈비 (45,000원), 통보리굴비 밥상 (33,000원)",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 주차장",
                "발렛파킹",
                "유아식기 제공",
                "한옥 정원"
          ],
          "reviewSummary": "한옥 기와집의 멋스러운 분위기와 정갈한 반찬. 분당 율동공원 산책 후 가족 외식으로 제격이며 직원이 직접 고기를 구워주어 아이 돌보기 편합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3210,
                      "url": "https://map.naver.com/v5/search/%EC%84%9C%ED%98%84%EA%B6%81%20%EB%B6%84%EB%8B%B9",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 870,
                      "url": "https://map.kakao.com/?q=%EC%84%9C%ED%98%84%EA%B6%81%20%EB%B6%84%EB%8B%B9",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 620,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%9C%ED%98%84%EA%B6%81%20%EB%B6%84%EB%8B%B9",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-02",
          "name": "가보정 인계본점",
          "category": "korean",
          "categoryName": "한식 · 수원왕갈비",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "수원시 팔달구 인계동",
          "address": "경기도 수원시 팔달구 장다리로 282",
          "phone": "1600-3883",
          "lat": 37.2764,
          "lng": 127.0289,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "국내산 한우 양념갈비 (67,000원), 미국산 생갈비 (69,000원), 갈비탕 (17,000원)",
          "amenities": [
                "아기의자 완비",
                "프라이빗 룸",
                "전용 주차빌딩",
                "유모차 진입 수월",
                "유아식기 제공"
          ],
          "reviewSummary": "전국 3대 갈비 명가! 1~4관 초대형 규모에 전용 주차빌딩까지 갖췄습니다. 양념게장, 단호박전 등 한정식 수준의 밑반찬이 푸짐하고 갈비가 매우 부드럽습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 8920,
                      "url": "https://map.naver.com/v5/search/%EA%B0%80%EB%B3%B4%EC%A0%95%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 2810,
                      "url": "https://map.kakao.com/?q=%EA%B0%80%EB%B3%B4%EC%A0%95%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3450,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%80%EB%B3%B4%EC%A0%95%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-03",
          "name": "어반리st 동탄점",
          "category": "brunch",
          "categoryName": "브런치 · 초대형 키즈존 베이커리",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "화성시 장지동",
          "address": "경기도 화성시 장지로 60-12",
          "phone": "031-378-0115",
          "lat": 37.1645,
          "lng": 127.1128,
          "hours": "10:00 ~ 22:00",
          "representativeMenu": "어반리 소금빵 (3,800원), 수제버거 플레이트 (16,000원), 어린이 오가닉 주스",
          "amenities": [
                "키즈존 & 오락실 완비",
                "아기의자 완비",
                "유모차 진입 수월",
                "대형 주차장 300대",
                "수유실 완비"
          ],
          "reviewSummary": "동탄 부모들의 구원투수! 실내 아케이드존, 레고 테이블, 볼풀 포토존이 있고 매장이 축구장만 해서 유모차 끌고 다니기 최고로 편안합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6420,
                      "url": "https://map.naver.com/v5/search/%EC%96%B4%EB%B0%98%EB%A6%ACst%20%EB%8F%99%ED%83%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1420,
                      "url": "https://map.kakao.com/?q=%EC%96%B4%EB%B0%98%EB%A6%ACst%20%EB%8F%99%ED%83%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%96%B4%EB%B0%98%EB%A6%ACst%20%EB%8F%99%ED%83%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-04",
          "name": "카페 드 단아한 광교앨리웨이점",
          "category": "brunch",
          "categoryName": "브런치 · 파스타/오믈렛",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "수원시 영통구 원천동",
          "address": "경기도 수원시 영통구 광교호수공원로 80 앨리웨이 2층",
          "phone": "031-213-9177",
          "lat": 37.2805,
          "lng": 127.0605,
          "hours": "10:00 ~ 21:00",
          "representativeMenu": "단아한 브런치 플레이트 (18,000원), 명란오일파스타 (17,500원)",
          "amenities": [
                "아기의자 완비",
                "광교호수공원뷰",
                "유모차 진입 수월",
                "앨리웨이 주차",
                "유아식기 제공"
          ],
          "reviewSummary": "광교호수공원이 시원하게 내려다보이는 뷰맛집. 앨리웨이 잔디광장에서 아이들 뛰어놀게 하고 여유롭게 브런치와 커피를 즐기기 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2450,
                      "url": "https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%20%EB%93%9C%20%EB%8B%A8%EC%95%84%ED%95%9C%20%EC%95%A8%EB%A6%AC%EC%9B%A8%EC%9D%B4",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 560,
                      "url": "https://map.kakao.com/?q=%EC%B9%B4%ED%8E%98%20%EB%93%9C%20%EB%8B%A8%EC%95%84%ED%95%9C%20%EC%95%A8%EB%A6%AC%EC%9B%A8%EC%9D%B4",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B9%B4%ED%8E%98%20%EB%93%9C%20%EB%8B%A8%EC%95%84%ED%95%9C%20%EC%95%A8%EB%A6%AC%EC%9B%A8%EC%9D%B4",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-05",
          "name": "플랩잭팬트리 판교본점",
          "category": "brunch",
          "categoryName": "브런치 · 팬케이크/버거",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "성남시 분당구 백현동",
          "address": "경기도 성남시 분당구 판교역로10번길 14-3",
          "phone": "031-709-0168",
          "lat": 37.3872,
          "lng": 127.1142,
          "hours": "10:30 ~ 20:30",
          "representativeMenu": "더 버거팬 (18,900원), 올데이브런치 (16,900원), 키즈 팬케이크 (12,000원)",
          "amenities": [
                "아기의자 완비",
                "어린이 메뉴",
                "유모차 진입 수월",
                "포장 가능"
          ],
          "reviewSummary": "얼굴보다 큰 폭신폭신한 수제 팬케이크와 스크램블 에그가 일품. 아이들이 정말 잘 먹고 판교 백현동 카페거리 산책 코스로 딱입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%ED%94%8C%EB%9E%A9%EC%9E%AD%ED%8C%AC%ED%8A%B8%EB%A6%AC%20%ED%8C%90%EA%B5%90%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 720,
                      "url": "https://map.kakao.com/?q=%ED%94%8C%EB%9E%A9%EC%9E%AD%ED%8C%AC%ED%8A%B8%EB%A6%AC%20%ED%8C%90%EA%B5%90%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 510,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%94%8C%EB%9E%A9%EC%9E%AD%ED%8C%AC%ED%8A%B8%EB%A6%AC%20%ED%8C%90%EA%B5%90%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-06",
          "name": "우에노 421 판교점",
          "category": "western",
          "categoryName": "양식 · 화덕피자/파스타",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "성남시 분당구 판교동",
          "address": "경기도 성남시 분당구 판교공원로1길 63 1층",
          "phone": "031-708-0421",
          "lat": 37.3945,
          "lng": 127.0985,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "콰트로 포르마지 피자 (23,000원), 트러플 뇨끼 (22,000원), 아마트리치아나 (19,000원)",
          "amenities": [
                "아기의자 완비",
                "유아식기 제공",
                "공원 인접",
                "주차 가능"
          ],
          "reviewSummary": "판교공원 숲세권에 자리잡아 한적하고 따뜻한 원목 인테리어. 쫄깃한 나폴리 화덕피자와 부드러운 뇨끼가 아이들 입맛을 사로잡습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1420,
                      "url": "https://map.naver.com/v5/search/%EC%9A%B0%EC%97%90%EB%85%B8%20421%20%ED%8C%90%EA%B5%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 380,
                      "url": "https://map.kakao.com/?q=%EC%9A%B0%EC%97%90%EB%85%B8%20421%20%ED%8C%90%EA%B5%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 290,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9A%B0%EC%97%90%EB%85%B8%20421%20%ED%8C%90%EA%B5%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-07",
          "name": "긴자 판교점",
          "category": "japanese",
          "categoryName": "일식 · 정통 코스요리",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "성남시 분당구 백현동",
          "address": "경기도 성남시 분당구 판교백현로 57 SFG푸드빌리지 3층",
          "phone": "031-702-9405",
          "lat": 37.3855,
          "lng": 127.1185,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "주말가족특선 (48,000원), 어린이 수제치즈돈까스 세트 (15,000원)",
          "amenities": [
                "전좌석 독립 룸",
                "아기의자 완비",
                "발렛파킹",
                "어린이 메뉴",
                "유아식기 제공"
          ],
          "reviewSummary": "아이들이 시끄럽게 굴까 봐 걱정할 필요 없이 전좌석이 독립 룸으로 되어 있습니다. 어린이 돈까스 정식이 알차게 나와서 어른도 아이도 편안한 식사가 가능합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2340,
                      "url": "https://map.naver.com/v5/search/%EA%B8%B4%EC%9E%90%20%ED%8C%90%EA%B5%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 610,
                      "url": "https://map.kakao.com/?q=%EA%B8%B4%EC%9E%90%20%ED%8C%90%EA%B5%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 430,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B8%B4%EC%9E%90%20%ED%8C%90%EA%B5%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-08",
          "name": "바른고기 엘베요타 동탄호수공원점",
          "category": "korean",
          "categoryName": "한식 · 이베리코 흑돼지구이",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "화성시 송동",
          "address": "경기도 화성시 동탄대로 181 레이크꼬모 2층",
          "phone": "031-375-9233",
          "lat": 37.1712,
          "lng": 127.0988,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "베요타 100% 꽃목살 (18,000원), 날치알주먹밥 (5,000원)",
          "amenities": [
                "직접 구워주는 서비스",
                "아기의자 완비",
                "레이크꼬모 대형 주차장",
                "유모차 진입 수월"
          ],
          "reviewSummary": "직원분들이 아이 먹기 좋은 굽기와 크기로 고기를 정성껏 잘라주어 부모 손이 편안합니다. 식사 후 호수공원 루나쇼 분수 구경하기 딱 좋습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1920,
                      "url": "https://map.naver.com/v5/search/%EB%B0%94%EB%A5%B8%EA%B3%A0%EA%B8%B0%20%EC%97%98%EB%B2%A0%EC%9A%94%ED%83%80%20%EB%8F%99%ED%83%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 490,
                      "url": "https://map.kakao.com/?q=%EB%B0%94%EB%A5%B8%EA%B3%A0%EA%B8%B0%20%EC%97%98%EB%B2%A0%EC%9A%94%ED%83%80%20%EB%8F%99%ED%83%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%94%EB%A5%B8%EA%B3%A0%EA%B8%B0%20%EC%97%98%EB%B2%A0%EC%9A%94%ED%83%80%20%EB%8F%99%ED%83%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-09",
          "name": "어로프슬라이스피스 용인처인점",
          "category": "brunch",
          "categoryName": "브런치 · 대형 가든베이커리",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "용인시 처인구 유방동",
          "address": "경기도 용인시 처인구 백옥대로 256번길 47",
          "phone": "031-339-1488",
          "lat": 37.2612,
          "lng": 127.2185,
          "hours": "10:00 ~ 21:00",
          "representativeMenu": "뜀틀빵 (7,300원), 밧줄빵 (7,500원), 감자스프 브런치세트 (16,000원)",
          "amenities": [
                "초대형 야외정원 & 온실",
                "아기의자 완비",
                "베이킹 클래스",
                "대형 주차장",
                "수유실 완비"
          ],
          "reviewSummary": "동화책에 나올 것 같은 넓은 정원과 온실 정원. 에버랜드 가는 길목에 들르기 좋고 시그니처 뜀틀빵과 달콤한 빵들이 가득해 아이들에게 천국입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 7810,
                      "url": "https://map.naver.com/v5/search/%EC%96%B4%EB%A1%9C%ED%94%84%EC%8A%AC%EB%9D%BC%EC%9D%B4%EC%8A%A4%ED%94%BC%EC%8A%A4%20%EC%9A%A9%EC%9D%B8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 2190,
                      "url": "https://map.kakao.com/?q=%EC%96%B4%EB%A1%9C%ED%94%84%EC%8A%AC%EB%9D%BC%EC%9D%B4%EC%8A%A4%ED%94%BC%EC%8A%A4%20%EC%9A%A9%EC%9D%B8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 1850,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%96%B4%EB%A1%9C%ED%94%84%EC%8A%AC%EB%9D%BC%EC%9D%B4%EC%8A%A4%ED%94%BC%EC%8A%A4%20%EC%9A%A9%EC%9D%B8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-10",
          "name": "고기리막국수",
          "category": "korean",
          "categoryName": "한식 · 원조 들기름막국수",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "용인시 수지구 고기동",
          "address": "경기도 용인시 수지구 이종무로 157",
          "phone": "0507-1334-1107",
          "lat": 37.3592,
          "lng": 127.0545,
          "hours": "11:00 ~ 21:00 (화요일 휴무)",
          "representativeMenu": "원조 들기름막국수 (10,000원), 어린이 막국수 무료제공, 수육 (16,000원)",
          "amenities": [
                "어린이 막국수 무료",
                "아기의자 완비",
                "좌식/입식 룸",
                "전용 주차장 4곳"
          ],
          "reviewSummary": "어린 아이에게는 간장 베이스의 순한 어린이 막국수와 아기 육수를 무료로 대접해주는 감동의 식당. 고소한 들기름막국수와 수육은 남녀노소 극찬합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 12400,
                      "url": "https://map.naver.com/v5/search/%EA%B3%A0%EA%B8%B0%EB%A6%AC%EB%A7%89%EA%B5%AD%EC%88%98",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 4210,
                      "url": "https://map.kakao.com/?q=%EA%B3%A0%EA%B8%B0%EB%A6%AC%EB%A7%89%EA%B5%AD%EC%88%98",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B3%A0%EA%B8%B0%EB%A6%AC%EB%A7%89%EA%B5%AD%EC%88%98",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-11",
          "name": "일산칼국수 본점",
          "category": "korean",
          "categoryName": "한식 · 닭칼국수",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "고양시 일산동구 정발산동",
          "address": "경기도 고양시 일산동구 경의로 467",
          "phone": "031-903-2208",
          "lat": 37.6698,
          "lng": 126.7825,
          "hours": "10:00 ~ 19:30 (연중무휴)",
          "representativeMenu": "닭칼국수 (10,000원), 공기밥 (1,000원)",
          "amenities": [
                "좌식 온돌룸 완비",
                "아기의자 완비",
                "넓은 전용 주차장",
                "주차안내요원 상주"
          ],
          "reviewSummary": "깊고 진한 닭육수에 부드러운 칼국수 면발! 밥 말아주면 아이들이 한 그릇 뚝딱 비웁니다. 좌식 온돌방이 있어 영아 데리고 가기 편합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 9820,
                      "url": "https://map.naver.com/v5/search/%EC%9D%BC%EC%82%B0%EC%B9%BC%EA%B5%AD%EC%88%98%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 3420,
                      "url": "https://map.kakao.com/?q=%EC%9D%BC%EC%82%B0%EC%B9%BC%EA%B5%AD%EC%88%98%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2810,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9D%BC%EC%82%B0%EC%B9%BC%EA%B5%AD%EC%88%98%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-12",
          "name": "뱀부포레스트 김포본점",
          "category": "western",
          "categoryName": "양식 · 실내 대나무숲 테마 레스토랑",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "김포시 하성면 전류리",
          "address": "경기도 김포시 하성면 월하로 912",
          "phone": "031-984-7140",
          "lat": 37.6745,
          "lng": 126.6542,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "안심스테이크 (48,000원), 게살크림파스타 (21,000원), 팬더 대나무빵 (7,500원)",
          "amenities": [
                "실내 대나무숲 600평",
                "판다 인형 포토존",
                "아기의자 완비",
                "대형 주차장",
                "유모차 진입 수월"
          ],
          "reviewSummary": "실내에 수천 그루의 진짜 대나무가 자라고 귀여운 판다 인형들이 가득해요! 피톤치드 마시며 식사하고 아이들 인생샷 찍어주기 최고입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5120,
                      "url": "https://map.naver.com/v5/search/%EB%B1%80%EB%B6%80%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%20%EA%B9%80%ED%8F%AC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1480,
                      "url": "https://map.kakao.com/?q=%EB%B1%80%EB%B6%80%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%20%EA%B9%80%ED%8F%AC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 1120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B1%80%EB%B6%80%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%20%EA%B9%80%ED%8F%AC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-13",
          "name": "레드파이프 파주출판단지본점",
          "category": "brunch",
          "categoryName": "브런치 · 복합문화 다이닝카페",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "파주시 문발동",
          "address": "경기도 파주시 지목로 17-7",
          "phone": "031-944-0999",
          "lat": 37.7125,
          "lng": 126.7025,
          "hours": "08:30 ~ 22:00",
          "representativeMenu": "레드버거 (16,300원), 파스타 & 피자 플레이트, 키즈 오렌지 에이드",
          "amenities": [
                "5층 규모 초대형 매장",
                "루프탑 한강뷰",
                "키즈존 & 좌식 평상",
                "엘리베이터",
                "대형 주차장"
          ],
          "reviewSummary": "파주 롯데아울렛과 출판단지 바로 옆. 계단식 좌식 평상과 키즈존이 있어 아이들이 뒹굴거리며 편하게 쉴 수 있는 초대형 패밀리 플레이스입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6210,
                      "url": "https://map.naver.com/v5/search/%EB%A0%88%EB%93%9C%ED%8C%8C%EC%9D%B4%ED%94%84%20%ED%8C%8C%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1690,
                      "url": "https://map.kakao.com/?q=%EB%A0%88%EB%93%9C%ED%8C%8C%EC%9D%B4%ED%94%84%20%ED%8C%8C%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1340,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A0%88%EB%93%9C%ED%8C%8C%EC%9D%B4%ED%94%84%20%ED%8C%8C%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-14",
          "name": "목향원 (남양주 수락산점)",
          "category": "korean",
          "categoryName": "한식 · 유기농 석쇠불고기 쌈밥",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "남양주시 별내동",
          "address": "경기도 남양주시 덕릉로1071번길 34-11",
          "phone": "031-527-2255",
          "lat": 37.6742,
          "lng": 127.0982,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "유기농 석쇠불고기 쌈밥정식 (18,000원 - 삼색 찰밥 포함)",
          "amenities": [
                "아름다운 정원 & 연못",
                "초가집 테마",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "동글동글 귀여운 삼색 찰밥(조밥, 흑미밥, 백미밥)에 숯불향 은은한 불고기! 마당에 비단잉어 연못과 산책로가 있어 아이들이 너무 좋아합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 8140,
                      "url": "https://map.naver.com/v5/search/%EB%AA%A9%ED%96%A5%EC%9B%90%20%EB%82%A8%EC%96%91%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 2650,
                      "url": "https://map.kakao.com/?q=%EB%AA%A9%ED%96%A5%EC%9B%90%20%EB%82%A8%EC%96%91%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2190,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%AA%A9%ED%96%A5%EC%9B%90%20%EB%82%A8%EC%96%91%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-15",
          "name": "훈장골 하남미사점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "하남시 망월동",
          "address": "경기도 하남시 미사강변한강로 154",
          "phone": "031-795-0010",
          "lat": 37.5685,
          "lng": 127.1895,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "훈장소갈비 (42,000원), 프리미엄 돼지갈비 (24,000원), 냉면",
          "amenities": [
                "어린이 놀이방 완비",
                "아기의자 완비",
                "프라이빗 룸",
                "지하 전용 주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "미사강변신도시에서 아이 키우는 집치고 안 가본 집이 없을 정도로 인기! 대형 통유리 놀이방이 식사 자리에서 훤히 보여 안심하고 고기 먹을 수 있습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%ED%9B%88%EC%9E%A5%EA%B3%A8%20%ED%95%98%EB%82%A8%EB%AF%B8%EC%82%AC%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 710,
                      "url": "https://map.kakao.com/?q=%ED%9B%88%EC%9E%A5%EA%B3%A8%20%ED%95%98%EB%82%A8%EB%AF%B8%EC%82%AC%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%9B%88%EC%9E%A5%EA%B3%A8%20%ED%95%98%EB%82%A8%EB%AF%B8%EC%82%AC%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-16",
          "name": "포레스트아웃팅스 송도점 (인천경계)",
          "category": "brunch",
          "categoryName": "브런치 · 초대형 온실 식물원카페",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "인천 연수구 옥련동",
          "address": "인천광역시 연수구 청량로 145",
          "phone": "032-831-7767",
          "lat": 37.4235,
          "lng": 126.6582,
          "hours": "10:00 ~ 22:00",
          "representativeMenu": "소시지 베이커리 (6,800원), 새우크림파스타 (22,000원), 화덕피자 (24,000원)",
          "amenities": [
                "초대형 식물원 & 분수대",
                "수유실 & 기저귀교환대 완비",
                "유모차 통로 완비",
                "지하/지상 대형 주차장"
          ],
          "reviewSummary": "백화점 수준의 호텔식 수유실과 기저귀 교환대 구비! 웅장한 실내 식물원과 분수대를 보며 아이들과 피자, 파스타를 즐기기 최적입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 10200,
                      "url": "https://map.naver.com/v5/search/%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%EC%95%84%EC%9B%83%ED%8C%85%EC%8A%A4%20%EC%86%A1%EB%8F%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 3120,
                      "url": "https://map.kakao.com/?q=%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%EC%95%84%EC%9B%83%ED%8C%85%EC%8A%A4%20%EC%86%A1%EB%8F%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 2410,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8%EC%95%84%EC%9B%83%ED%8C%85%EC%8A%A4%20%EC%86%A1%EB%8F%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-17",
          "name": "산사랑 (용인 고기리 산채한정식)",
          "category": "korean",
          "categoryName": "한식 · 산채나물한정식",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "용인시 수지구 고기동",
          "address": "경기도 용인시 수지구 샘말로 89번길 9",
          "phone": "031-263-6080",
          "lat": 37.3485,
          "lng": 127.0425,
          "hours": "11:00 ~ 20:30",
          "representativeMenu": "산사랑 산채정식 (20,000원 - 20가지 제철 나물, 생선구이, 돌솥밥)",
          "amenities": [
                "야외 숲속 산책로",
                "아기의자 완비",
                "넓은 주차장",
                "가족 외식 최적"
          ],
          "reviewSummary": "광교산 숲자락 끝에 위치한 힐링 맛집. 정갈한 20여 가지 나물과 생선구이, 구수한 돌솥밥 누룽지까지 온 가족이 건강한 밥상을 즐길 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5420,
                      "url": "https://map.naver.com/v5/search/%EC%82%B0%EC%82%AC%EB%9E%91%20%EC%9A%A9%EC%9D%B8%20%EA%B3%A0%EA%B8%B0%EB%A6%AC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1890,
                      "url": "https://map.kakao.com/?q=%EC%82%B0%EC%82%AC%EB%9E%91%20%EC%9A%A9%EC%9D%B8%20%EA%B3%A0%EA%B8%B0%EB%A6%AC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 1310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%82%B0%EC%82%AC%EB%9E%91%20%EC%9A%A9%EC%9D%B8%20%EA%B3%A0%EA%B8%B0%EB%A6%AC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-18",
          "name": "정원오리구이 분당점",
          "category": "korean",
          "categoryName": "한식 · 생오리로스/주물럭",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "성남시 분당구 야탑동",
          "address": "경기도 성남시 분당구 쪽제비길 45",
          "phone": "031-707-5292",
          "lat": 37.4085,
          "lng": 127.1495,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "생오리로스 한마리 (58,000원), 어린이 오리죽 무료제공, 볶음밥",
          "amenities": [
                "야외 정원 & 미니 놀이공간",
                "아기의자 완비",
                "넓은 주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "야탑 안쪽에 위치해 숲속 펜션에 놀러 온 분위기! 마당에 흙놀이와 그네가 있어 아이들이 밥 먹고 신나게 놀 수 있어 엄마 모임으로 핫합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1840,
                      "url": "https://map.naver.com/v5/search/%EC%A0%95%EC%9B%90%EC%98%A4%EB%A6%AC%EA%B5%AC%EC%9D%B4%20%EB%B6%84%EB%8B%B9",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 420,
                      "url": "https://map.kakao.com/?q=%EC%A0%95%EC%9B%90%EC%98%A4%EB%A6%AC%EA%B5%AC%EC%9D%B4%20%EB%B6%84%EB%8B%B9",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 340,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%A0%95%EC%9B%90%EC%98%A4%EB%A6%AC%EA%B5%AC%EC%9D%B4%20%EB%B6%84%EB%8B%B9",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-19",
          "name": "로빈의숲 (파주 통나무 바비큐)",
          "category": "western",
          "categoryName": "양식 · 참나무 훈제 바비큐",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "파주시 탄현면 갈현리",
          "address": "경기도 파주시 탄현면 장릉로102번길 45-8",
          "phone": "031-945-1999",
          "lat": 37.7495,
          "lng": 126.7082,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "킹세트 바비큐 (바비큐삼겹+소시지+새우+오리구이 95,000원), 잔치국수 무료",
          "amenities": [
                "솔숲 야외 산책로",
                "잉어 연못 & 물레방아",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "참나무 장작불에 초벌구이해 기름기 쏙 빠진 바비큐. 울창한 소나무 숲길과 분수 연못이 있어 아이들이 밥 먹고 솔방울 주우며 뛰어놀기 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3450,
                      "url": "https://map.naver.com/v5/search/%EB%A1%9C%EB%B9%88%EC%9D%98%EC%88%B2%20%ED%8C%8C%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 940,
                      "url": "https://map.kakao.com/?q=%EB%A1%9C%EB%B9%88%EC%9D%98%EC%88%B2%20%ED%8C%8C%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 620,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A1%9C%EB%B9%88%EC%9D%98%EC%88%B2%20%ED%8C%8C%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-20",
          "name": "나인블럭 남양주북한강점",
          "category": "brunch",
          "categoryName": "브런치 · 리버뷰 베이커리카페",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "남양주시 조안면 삼봉리",
          "address": "경기도 남양주시 조안면 북한강로 914",
          "phone": "031-521-9700",
          "lat": 37.6085,
          "lng": 127.3482,
          "hours": "09:00 ~ 22:00",
          "representativeMenu": "크루아상 브런치 플레이트 (19,000원), 파니니 (14,000원), 베이비 베이커리",
          "amenities": [
                "북한강 파노라마 뷰",
                "넓은 야외 잔디 테라스",
                "아기의자 완비",
                "유모차 진입 수월"
          ],
          "reviewSummary": "반짝이는 북한강을 바라보며 마시는 커피와 갓 구운 빵! 야외 잔디 테라스가 탁 트여 있어 유모차 동반 가족들에게 최고의 주말 나들이 명소입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4820,
                      "url": "https://map.naver.com/v5/search/%EB%82%98%EC%9D%B8%EB%B8%94%EB%9F%AD%20%EB%B6%81%ED%95%9C%EA%B0%95%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1340,
                      "url": "https://map.kakao.com/?q=%EB%82%98%EC%9D%B8%EB%B8%94%EB%9F%AD%20%EB%B6%81%ED%95%9C%EA%B0%95%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%82%98%EC%9D%B8%EB%B8%94%EB%9F%AD%20%EB%B6%81%ED%95%9C%EA%B0%95%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-21",
          "name": "몽촌토성 보리밥손칼국수 하남",
          "category": "korean",
          "categoryName": "한식 · 바지락칼국수/보리밥",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "하남시 창우동",
          "address": "경기도 하남시 검단산로 279",
          "phone": "031-796-0636",
          "lat": 37.5312,
          "lng": 127.2345,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "바지락칼국수 (10,000원), 보리밥정식 (11,000원), 해물파전 (16,000원)",
          "amenities": [
                "아기의자 완비",
                "좌식 온돌룸",
                "넓은 주차장",
                "아이용 맑은 육수"
          ],
          "reviewSummary": "검단산 등산로나 스타필드 하남 들렀다 가기 좋은 곳. 바지락이 산더미처럼 들어가 국물이 맑고 시원해 아이들이 국수 호로록 잘 먹습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2890,
                      "url": "https://map.naver.com/v5/search/%EB%AA%BD%EC%B4%8C%ED%86%A0%EC%84%B1%20%EB%B3%B4%EB%A6%AC%EB%B0%A5%EC%86%90%EC%B9%BC%EA%B5%AD%EC%88%98%20%ED%95%98%EB%82%A8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EB%AA%BD%EC%B4%8C%ED%86%A0%EC%84%B1%20%EB%B3%B4%EB%A6%AC%EB%B0%A5%EC%86%90%EC%B9%BC%EA%B5%AD%EC%88%98%20%ED%95%98%EB%82%A8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%AA%BD%EC%B4%8C%ED%86%A0%EC%84%B1%20%EB%B3%B4%EB%A6%AC%EB%B0%A5%EC%86%90%EC%B9%BC%EA%B5%AD%EC%88%98%20%ED%95%98%EB%82%A8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-22",
          "name": "서삼릉 보리밥 일산점",
          "category": "korean",
          "categoryName": "한식 · 털레기수제비/옛날보리밥",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "고양시 덕양구 원당동",
          "address": "경기도 고양시 덕양구 서삼릉길 124",
          "phone": "031-968-5678",
          "lat": 37.6612,
          "lng": 126.8582,
          "hours": "11:00 ~ 20:30",
          "representativeMenu": "옛날보리밥 (10,000원), 털레기수제비 2인 (20,000원), 떡갈비 (13,000원)",
          "amenities": [
                "원당 종마목장 인접",
                "자연 속 야외 쉼터",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "서삼릉과 렛츠런팜 원당 종마목장에서 말 구경하고 들르기 좋은 코스. 달콤한 수제 떡갈비가 있어 아이들 밥반찬으로 아주 훌륭합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4310,
                      "url": "https://map.naver.com/v5/search/%EC%84%9C%EC%82%BC%EB%A6%89%EB%B3%B4%EB%A6%AC%EB%B0%A5",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1220,
                      "url": "https://map.kakao.com/?q=%EC%84%9C%EC%82%BC%EB%A6%89%EB%B3%B4%EB%A6%AC%EB%B0%A5",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%82%BC%EB%A6%89%EB%B3%B4%EB%A6%AC%EB%B0%A5",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-23",
          "name": "훈장골 평택점",
          "category": "korean",
          "categoryName": "한식 · 대형놀이방 갈비구이",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "평택시 비전동",
          "address": "경기도 평택시 비전2로 19",
          "phone": "031-653-6000",
          "lat": 36.9985,
          "lng": 127.1125,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "소양념갈비 (42,000원), 한돈양념구이 (23,000원), 영양갈비탕 (15,000원)",
          "amenities": [
                "초대형 정글짐 놀이방 완비",
                "아기의자 완비",
                "프라이빗 룸",
                "대형 주차장"
          ],
          "reviewSummary": "평택 소사벌 인근에서 놀이방 시설이 가장 잘 되어 있는 고깃집! 정글짐 미끄럼틀과 게임기가 있어 아이들이 밥 먹기 전후로 신나게 뜁니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2120,
                      "url": "https://map.naver.com/v5/search/%ED%9B%88%EC%9E%A5%EA%B3%A8%20%ED%8F%89%ED%83%9D%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 490,
                      "url": "https://map.kakao.com/?q=%ED%9B%88%EC%9E%A5%EA%B3%A8%20%ED%8F%89%ED%83%9D%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%9B%88%EC%9E%A5%EA%B3%A8%20%ED%8F%89%ED%83%9D%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gg-24",
          "name": "경복궁 & 삿포로 수원영통점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비 코스",
          "region": "gyeonggi",
          "regionName": "경기도",
          "district": "수원시 영통구 영통동",
          "address": "경기도 수원시 영통구 봉영로 1612 보보스프라자 3층",
          "phone": "031-202-7777",
          "lat": 37.2512,
          "lng": 127.0715,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "양념갈비 코스 (65,000원), 패밀리 한정식 (48,000원), 어린이 갈비 반상",
          "amenities": [
                "전좌석 프라이빗 룸",
                "아기의자 완비",
                "유아식기 제공",
                "주차 완비"
          ],
          "reviewSummary": "전실이 단독 룸으로 분리되어 있어 돌잡이나 백일잔치, 부모님 생신에 최적. 갈비가 부드럽고 아이용 국과 식기를 세심하게 챙겨줍니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%88%98%EC%9B%90%EC%98%81%ED%86%B5%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 840,
                      "url": "https://map.kakao.com/?q=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%88%98%EC%9B%90%EC%98%81%ED%86%B5%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 620,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%88%98%EC%9B%90%EC%98%81%ED%86%B5%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-01",
          "name": "백제원 송도본점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비/코스한정식",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "연수구 송도동",
          "address": "인천광역시 연수구 해돋이로 157",
          "phone": "032-831-2222",
          "lat": 37.3915,
          "lng": 126.6578,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "양념갈비 코스 (55,000원), 보리굴비 정식 (35,000원), 어린이 불고기 반상",
          "amenities": [
                "프라이빗 룸 완비",
                "아기의자 완비",
                "발렛파킹",
                "유아식기 제공",
                "돌잔치/백일 상차림 무료지원"
          ],
          "reviewSummary": "송도 센트럴파크 인근 최고의 가족 모임 장소. 전 좌석 프라이빗 룸이라 아이가 잠들거나 보채도 눈치 보이지 않고 고기를 직원이 완벽하게 구워줍니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%B0%B1%EC%A0%9C%EC%9B%90%20%EC%86%A1%EB%8F%84%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 910,
                      "url": "https://map.kakao.com/?q=%EB%B0%B1%EC%A0%9C%EC%9B%90%20%EC%86%A1%EB%8F%84%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%B1%EC%A0%9C%EC%9B%90%20%EC%86%A1%EB%8F%84%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-02",
          "name": "풀사이드 228 송도점",
          "category": "western",
          "categoryName": "양식 · 수영장뷰 이탈리안",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "연수구 옥련동",
          "address": "인천광역시 연수구 해돋이로 157 2층",
          "phone": "032-817-0000",
          "lat": 37.3912,
          "lng": 126.6582,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "수제 리코타 치즈 샐러드 (17,900원), 스테이크 플래터 (49,000원), 키즈 까르보나라",
          "amenities": [
                "야외 풀장 뷰",
                "아기의자 완비",
                "포토존 가득",
                "넓은 주차장",
                "유모차 진입 수월"
          ],
          "reviewSummary": "발리 리조트에 온 듯 에메랄드빛 야외 수영장이 테라스에 펼쳐져 있어 아이들이 너무 좋아합니다. 채광이 좋아 사진이 예쁘게 나옵니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2890,
                      "url": "https://map.naver.com/v5/search/%ED%92%80%EC%82%AC%EC%9D%B4%EB%93%9C%20228%20%EC%86%A1%EB%8F%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 760,
                      "url": "https://map.kakao.com/?q=%ED%92%80%EC%82%AC%EC%9D%B4%EB%93%9C%20228%20%EC%86%A1%EB%8F%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 610,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%92%80%EC%82%AC%EC%9D%B4%EB%93%9C%20228%20%EC%86%A1%EB%8F%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-03",
          "name": "피에프창 송도트리플스트리트점",
          "category": "chinese",
          "categoryName": "중식 · 아시안 비스트로",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "연수구 송도동",
          "address": "인천광역시 연수구 송도과학로16번길 33-2 트리플스트리트 B동 지하3층",
          "phone": "032-310-9466",
          "lat": 37.3802,
          "lng": 126.6612,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "창스 치킨 레터스랩 (21,900원), 몽골리안 비프 (32,900원), 키즈 볶음밥 세트 (8,500원)",
          "amenities": [
                "키즈 전용 메뉴 완비",
                "키즈 컬러링북 & 색연필 제공",
                "아기의자 완비",
                "트리플스트리트 대형주차 무료"
          ],
          "reviewSummary": "입장하면 아이에게 컬러링 색칠놀이 북과 크레용을 먼저 선물해줍니다! 키즈 볶음밥 세트도 훌륭하고 양상추에 싸먹는 치킨 레터스랩이 별미입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3810,
                      "url": "https://map.naver.com/v5/search/%ED%94%BC%EC%97%90%ED%94%84%EC%B0%BD%20%EC%86%A1%EB%8F%84%ED%8A%B8%EB%A6%AC%ED%94%8C%EC%8A%A4%ED%8A%B8%EB%A6%AC%ED%8A%B8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 820,
                      "url": "https://map.kakao.com/?q=%ED%94%BC%EC%97%90%ED%94%84%EC%B0%BD%20%EC%86%A1%EB%8F%84%ED%8A%B8%EB%A6%AC%ED%94%8C%EC%8A%A4%ED%8A%B8%EB%A6%AC%ED%8A%B8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 710,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%94%BC%EC%97%90%ED%94%84%EC%B0%BD%20%EC%86%A1%EB%8F%84%ED%8A%B8%EB%A6%AC%ED%94%8C%EC%8A%A4%ED%8A%B8%EB%A6%AC%ED%8A%B8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-04",
          "name": "풀사이드 228 청라점",
          "category": "western",
          "categoryName": "양식 · 루프탑 수영장 패밀리레스토랑",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "서구 청라동",
          "address": "인천광역시 서구 중봉대로586번길 22 2층",
          "phone": "032-569-0228",
          "lat": 37.5345,
          "lng": 126.6512,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "쉬림프 로제 파스타 (19,800원), 마르게리따 피자 (18,900원), 키즈 세트",
          "amenities": [
                "루프탑 수영장 테라스",
                "아기의자 완비",
                "유모차 진입 수월",
                "건물 주차장"
          ],
          "reviewSummary": "청라 커넬웨이 근처 핫플레이스. 테라스에 수영장이 펼쳐져 있어 아이들이 신기해하고 파스타와 화덕피자 간이 세지 않아 아이 먹이기 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2410,
                      "url": "https://map.naver.com/v5/search/%ED%92%80%EC%82%AC%EC%9D%B4%EB%93%9C%20228%20%EC%B2%AD%EB%9D%BC%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 620,
                      "url": "https://map.kakao.com/?q=%ED%92%80%EC%82%AC%EC%9D%B4%EB%93%9C%20228%20%EC%B2%AD%EB%9D%BC%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%92%80%EC%82%AC%EC%9D%B4%EB%93%9C%20228%20%EC%B2%AD%EB%9D%BC%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-05",
          "name": "청라 꽃갈비 청라본점",
          "category": "korean",
          "categoryName": "한식 · 돼지꽃갈비/이베리코",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "서구 연희동",
          "address": "인천광역시 서구 청라루비로42번길 6",
          "phone": "032-564-9592",
          "lat": 37.5385,
          "lng": 126.6542,
          "hours": "12:00 ~ 23:00",
          "representativeMenu": "돼지왕갈비 (18,000원), 이베리코 꽃목살 (17,000원), 김치찌개 무료",
          "amenities": [
                "어린이 놀이방 완비",
                "슬러시 & 아이스크림 무료",
                "아기의자 완비",
                "주차 가능"
          ],
          "reviewSummary": "식사 후 무료 슬러시와 아이스크림 코너가 있어 아이들에게 최고의 인기. 고기가 부드럽고 잡내가 없어 온 가족 만족도가 높습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2980,
                      "url": "https://map.naver.com/v5/search/%EC%B2%AD%EB%9D%BC%20%EA%BD%83%EA%B0%88%EB%B9%84%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 710,
                      "url": "https://map.kakao.com/?q=%EC%B2%AD%EB%9D%BC%20%EA%BD%83%EA%B0%88%EB%B9%84%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 520,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B2%AD%EB%9D%BC%20%EA%BD%83%EA%B0%88%EB%B9%84%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-06",
          "name": "해송쌈밥 영종도본점",
          "category": "korean",
          "categoryName": "한식 · 우렁쌈밥/돌솥밥 무한리필",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "중구 남북동",
          "address": "인천광역시 중구 공항서로 177",
          "phone": "032-747-0073",
          "lat": 37.4512,
          "lng": 126.3985,
          "hours": "10:30 ~ 20:30 (월요일 휴무)",
          "representativeMenu": "우렁쌈밥 정식 1인 (19,000원 - 제육볶음, 간장게장, 8종쌈채소, 우렁쌈장 무한리필)",
          "amenities": [
                "인천공항 비행기 이착륙 뷰 4층 전망대",
                "아기의자 완비",
                "대형 주차장 150대",
                "엘리베이터"
          ],
          "reviewSummary": "짜지 않은 견과류 우렁쌈장과 생선구이, 돌솥밥 누룽지까지 아이들이 폭풍 흡입! 4층 전망대에서 인천공항 비행기 뜨는 모습을 가까이 볼 수 있어 아이들이 열광합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 7920,
                      "url": "https://map.naver.com/v5/search/%ED%95%B4%EC%86%A1%EC%8C%88%EB%B0%A5%20%EC%98%81%EC%A2%85%EB%8F%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 2810,
                      "url": "https://map.kakao.com/?q=%ED%95%B4%EC%86%A1%EC%8C%88%EB%B0%A5%20%EC%98%81%EC%A2%85%EB%8F%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%B4%EC%86%A1%EC%8C%88%EB%B0%A5%20%EC%98%81%EC%A2%85%EB%8F%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-07",
          "name": "동백식당 영종하늘도시점",
          "category": "korean",
          "categoryName": "한식 · 해물칼국수/해물파전",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "중구 중산동",
          "address": "인천광역시 중구 은하수로 29 2층",
          "phone": "032-752-5888",
          "lat": 37.4912,
          "lng": 126.5625,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "통문어 해물칼국수 (16,000원), 수제 해물파전 (18,000원), 어린이 주먹밥 (4,000원)",
          "amenities": [
                "영종 구읍뱃터 바다뷰",
                "아기의자 완비",
                "유아식기 제공",
                "건물 주차장"
          ],
          "reviewSummary": "통창 너머로 서해 바다와 갈매기가 날아다니는 풍경을 보며 먹는 칼국수. 싱싱한 조개와 문어가 푸짐하고 아기 주먹밥이 있어 식사하기 편합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2140,
                      "url": "https://map.naver.com/v5/search/%EC%98%81%EC%A2%85%EB%8F%84%20%EB%8F%99%EB%B0%B1%EC%8B%9D%EB%8B%B9",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 580,
                      "url": "https://map.kakao.com/?q=%EC%98%81%EC%A2%85%EB%8F%84%20%EB%8F%99%EB%B0%B1%EC%8B%9D%EB%8B%B9",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 410,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%98%81%EC%A2%85%EB%8F%84%20%EB%8F%99%EB%B0%B1%EC%8B%9D%EB%8B%B9",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-08",
          "name": "삿포로 청라점",
          "category": "japanese",
          "categoryName": "일식 · 코스 정식",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "서구 연희동",
          "address": "인천광역시 서구 청라커낼로 260번길 11 2층",
          "phone": "032-566-0770",
          "lat": 37.5325,
          "lng": 126.6535,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "주말가족스페셜 (45,000원), 어린이 수제돈까스 (13,000원)",
          "amenities": [
                "전실 프라이빗 룸",
                "아기의자 완비",
                "유아식기 제공",
                "주차 완비"
          ],
          "reviewSummary": "조용한 개별 룸이라 아이 동반 대가족 식사에 최적. 회가 싱싱하고 아이용 돈까스와 우동이 깔끔하게 잘 나옵니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1890,
                      "url": "https://map.naver.com/v5/search/%EC%82%BF%ED%8F%AC%EB%A1%9C%20%EC%B2%AD%EB%9D%BC%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://map.kakao.com/?q=%EC%82%BF%ED%8F%AC%EB%A1%9C%20%EC%B2%AD%EB%9D%BC%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%82%BF%ED%8F%AC%EB%A1%9C%20%EC%B2%AD%EB%9D%BC%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-09",
          "name": "원조꽃게탕 강화본점",
          "category": "korean",
          "categoryName": "한식 · 꽃게탕/간장게장",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "강화군 내가면 외포리",
          "address": "인천광역시 강화군 내가면 중앙로 1222",
          "phone": "032-933-9377",
          "lat": 37.7052,
          "lng": 126.3812,
          "hours": "09:30 ~ 20:00",
          "representativeMenu": "단호박 꽃게탕 (65,000원), 꽃게찜, 어린이 갈비만두 (6,000원)",
          "amenities": [
                "단호박 달콤한 꽃게국물",
                "아기의자 완비",
                "넓은 주차장",
                "좌식/입식 테이블"
          ],
          "reviewSummary": "달콤한 강화 단호박이 듬뿍 들어가 국물이 맵지 않고 진해 아이들도 게살 발라 국물에 밥 비벼 잘 먹습니다. 강화도 여행 필수 코스!",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EA%B0%95%ED%99%94%20%EC%9B%90%EC%A1%B0%EA%BD%83%EA%B2%8C%ED%83%95",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 890,
                      "url": "https://map.kakao.com/?q=%EA%B0%95%ED%99%94%20%EC%9B%90%EC%A1%B0%EA%BD%83%EA%B2%8C%ED%83%95",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 620,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%95%ED%99%94%20%EC%9B%90%EC%A1%B0%EA%BD%83%EA%B2%8C%ED%83%95",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-incheon-10",
          "name": "바다쏭 베이커리 & 송도갈비",
          "category": "brunch",
          "categoryName": "브런치 · 오션뷰 한옥 베이커리카페",
          "region": "incheon",
          "regionName": "인천광역시",
          "district": "연수구 옥련동",
          "address": "인천광역시 연수구 능허대로 16",
          "phone": "032-831-7770",
          "lat": 37.4195,
          "lng": 126.6492,
          "hours": "09:00 ~ 22:00",
          "representativeMenu": "소금빵 (3,500원), 에그타르트, 바다쏭 시그니처 라떼, 아이용 유기농우유",
          "amenities": [
                "서해 오션뷰 & 갯벌",
                "넓은 한옥 정원 & 로봇 조형물",
                "아기의자 완비",
                "대형 주차장"
          ],
          "reviewSummary": "송도갈비에서 식사 후 바로 옆 한옥 베이커리로 이동하는 완벽한 외식 코스. 마당에 거대한 로봇 조형물과 연못이 있어 아이들이 정말 좋아합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6120,
                      "url": "https://map.naver.com/v5/search/%EB%B0%94%EB%8B%A4%EC%8F%AD%20%EB%B2%A0%EC%9D%B4%EC%BB%A4%EB%A6%AC%20%EC%86%A1%EB%8F%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1780,
                      "url": "https://map.kakao.com/?q=%EB%B0%94%EB%8B%A4%EC%8F%AD%20%EB%B2%A0%EC%9D%B4%EC%BB%A4%EB%A6%AC%20%EC%86%A1%EB%8F%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%94%EB%8B%A4%EC%8F%AD%20%EB%B2%A0%EC%9D%B4%EC%BB%A4%EB%A6%AC%20%EC%86%A1%EB%8F%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-01",
          "name": "테라로사 강릉본점 (커피공장)",
          "category": "brunch",
          "categoryName": "브런치 · 스페셜티 베이커리",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "강릉시 구정면 어단리",
          "address": "강원특별자치도 강릉시 구정면 현천길 7",
          "phone": "033-648-2760",
          "lat": 37.6965,
          "lng": 128.8785,
          "hours": "09:00 ~ 21:00 (연중무휴)",
          "representativeMenu": "하우스 브런치 플레이트 (19,000원), 크루아상 (4,500원), 베이비 베이비치노 (어린이우유)",
          "amenities": [
                "초대형 잔디마당 & 아트뮤지엄",
                "아기의자 완비",
                "유모차 진입 수월",
                "대형 주차장 300대",
                "키즈친화"
          ],
          "reviewSummary": "대한민국 커피의 성지. 빨간 벽돌 건물과 야외 잔디마당, 뮤지엄이 함께 있어 유모차 끌고 아이와 산책하기 최적이며 빵과 브런치도 매우 훌륭합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 15400,
                      "url": "https://map.naver.com/v5/search/%ED%85%8C%EB%9D%BC%EB%A1%9C%EC%82%AC%20%EA%B0%95%EB%A6%89%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 5120,
                      "url": "https://map.kakao.com/?q=%ED%85%8C%EB%9D%BC%EB%A1%9C%EC%82%AC%20%EA%B0%95%EB%A6%89%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 4890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%85%8C%EB%9D%BC%EB%A1%9C%EC%82%AC%20%EA%B0%95%EB%A6%89%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-02",
          "name": "강릉 동화가든 초당본점",
          "category": "korean",
          "categoryName": "한식 · 원조 초당순두부",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "강릉시 초당동",
          "address": "강원특별자치도 강릉시 초당원길 78번길 15",
          "phone": "033-652-9885",
          "lat": 37.7912,
          "lng": 128.9152,
          "hours": "07:00 ~ 19:00 (수요일 휴무)",
          "representativeMenu": "원조 짬순 (13,000원), 초당순두부 백반 (순한맛 - 11,000원), 모두부 (10,000원)",
          "amenities": [
                "어린이용 순한 백반 구비",
                "아기의자 완비",
                "전용 주차장",
                "순두부 젤라또 디저트"
          ],
          "reviewSummary": "어른은 얼큰한 짬뽕순두부, 아이는 고소하고 부드러운 하얀 초당순두부 백반과 모두부를 먹을 수 있어 온 가족 필수 맛집! 식후 순두부 젤라또까지 완벽합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 18900,
                      "url": "https://map.naver.com/v5/search/%EA%B0%95%EB%A6%89%20%EB%8F%99%ED%99%94%EA%B0%80%EB%93%A0%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 6420,
                      "url": "https://map.kakao.com/?q=%EA%B0%95%EB%A6%89%20%EB%8F%99%ED%99%94%EA%B0%80%EB%93%A0%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 5120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%95%EB%A6%89%20%EB%8F%99%ED%99%94%EA%B0%80%EB%93%A0%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-03",
          "name": "토담숯불닭갈비 춘천본점",
          "category": "korean",
          "categoryName": "한식 · 소양강 야외가든 닭갈비",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "춘천시 신북읍 천전리",
          "address": "강원특별자치도 춘천시 신북읍 신샘밭로 662",
          "phone": "033-241-5999",
          "lat": 37.9352,
          "lng": 127.7682,
          "hours": "11:00 ~ 21:40",
          "representativeMenu": "간장/소금 닭갈비 (아이 안 매운맛 - 15,000원), 어린이 주먹밥 (4,000원), 막국수",
          "amenities": [
                "야외 모닥불 & 소양강 정원",
                "아기의자 완비",
                "넓은 주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "매운 양념뿐 아니라 달콤 짭조름한 간장닭갈비와 담백한 소금닭갈비가 있어 아이들이 너무 잘 먹습니다. 야외 정원에서 모닥불 피우고 밤 구워 먹는 재미가 쏠쏠합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 12800,
                      "url": "https://map.naver.com/v5/search/%ED%86%A0%EB%8B%B4%EC%88%AF%EB%B6%88%EB%8B%AD%EA%B0%88%EB%B9%84%20%EC%B6%98%EC%B2%9C",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 4120,
                      "url": "https://map.kakao.com/?q=%ED%86%A0%EB%8B%B4%EC%88%AF%EB%B6%88%EB%8B%AD%EA%B0%88%EB%B9%84%20%EC%B6%98%EC%B2%9C",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%86%A0%EB%8B%B4%EC%88%AF%EB%B6%88%EB%8B%AD%EA%B0%88%EB%B9%84%20%EC%B6%98%EC%B2%9C",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-04",
          "name": "청초수물회 속초본점",
          "category": "korean",
          "categoryName": "한식 · 해전물회/섭국/어린이죽",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "속초시 조양동",
          "address": "강원특별자치도 속초시 엑스포로 12-36",
          "phone": "033-635-5050",
          "lat": 38.1925,
          "lng": 128.5845,
          "hours": "10:00 ~ 20:50",
          "representativeMenu": "해전물회 (27,000원), 어린이 영양전복죽 (8,000원), 붉은대게살비빔밥 (19,000원)",
          "amenities": [
                "청초호 파노라마 뷰",
                "서빙로봇 운영",
                "어린이 메뉴 완비",
                "대형 주차장 & 주차요원",
                "엘리베이터"
          ],
          "reviewSummary": "청초호 호수뷰가 한눈에 들어오는 4층 대형 빌딩. 서빙 로봇이 음식을 배달해 아이들이 신기해하고, 고소한 어린이 전복죽과 게살비빔밥이 있어 온 가족 대만족!",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 16200,
                      "url": "https://map.naver.com/v5/search/%EC%B2%AD%EC%B4%88%EC%88%98%EB%AC%BC%ED%9A%8C%20%EC%86%8D%EC%B4%88%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 5210,
                      "url": "https://map.kakao.com/?q=%EC%B2%AD%EC%B4%88%EC%88%98%EB%AC%BC%ED%9A%8C%20%EC%86%8D%EC%B4%88%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4810,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B2%AD%EC%B4%88%EC%88%98%EB%AC%BC%ED%9A%8C%20%EC%86%8D%EC%B4%88%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-05",
          "name": "평창한우마을 대관령점",
          "category": "korean",
          "categoryName": "한식 · 대관령 평창한우 정육식당",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "평창군 대관령면 횡계리",
          "address": "강원특별자치도 평창군 대관령면 경강로 5195-25",
          "phone": "033-335-5930",
          "lat": 37.6742,
          "lng": 128.7082,
          "hours": "10:30 ~ 21:30",
          "representativeMenu": "대관령 한우 꽃등심, 안심구이, 한우 맑은 곰탕 (13,000원), 어린이 주먹밥",
          "amenities": [
                "어린이 놀이방 완비",
                "뻥튀기 무료 무제한",
                "아기의자 완비",
                "초대형 주차장",
                "정육식당"
          ],
          "reviewSummary": "대관령 양떼목장과 알펜시아 스키장 들렀다 가기 좋은 곳. 무료 즉석 뻥튀기를 들고 아이들이 좋아하고, 부드러운 평창 한우와 놀이방이 있어 매우 편합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 7420,
                      "url": "https://map.naver.com/v5/search/%ED%8F%89%EC%B0%BD%ED%95%9C%EC%9A%B0%EB%A7%88%EC%9D%84%20%EB%8C%80%EA%B4%80%EB%A0%B9%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 2190,
                      "url": "https://map.kakao.com/?q=%ED%8F%89%EC%B0%BD%ED%95%9C%EC%9A%B0%EB%A7%88%EC%9D%84%20%EB%8C%80%EA%B4%80%EB%A0%B9%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%8F%89%EC%B0%BD%ED%95%9C%EC%9A%B0%EB%A7%88%EC%9D%84%20%EB%8C%80%EA%B4%80%EB%A0%B9%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-06",
          "name": "칠성조선소 속초",
          "category": "brunch",
          "categoryName": "브런치 · 폐조선소 문화카페",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "속초시 교동",
          "address": "강원특별자치도 속초시 중앙로46번길 45",
          "phone": "033-633-2309",
          "lat": 38.2045,
          "lng": 128.5895,
          "hours": "11:00 ~ 20:00",
          "representativeMenu": "칠성 바닐라빈 라떼 (7,000원), 소금빵 (3,800원), 유기농 키즈주스",
          "amenities": [
                "청초호 오션뷰 잔디마당",
                "야외 배 조형물 & 놀이터",
                "아기의자 완비",
                "유모차 진입 수월"
          ],
          "reviewSummary": "실제 배를 만들던 옛 조선소를 리모델링한 이색 복합문화공간. 청초호를 마주한 넓은 마당에서 아이들이 배 구경도 하고 뛰어놀 수 있어 속초 여행 핫플입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 8920,
                      "url": "https://map.naver.com/v5/search/%EC%B9%A0%EC%84%B1%EC%A1%B0%EC%84%A0%EC%86%8C%20%EC%86%8D%EC%B4%88",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 2980,
                      "url": "https://map.kakao.com/?q=%EC%B9%A0%EC%84%B1%EC%A1%B0%EC%84%A0%EC%86%8C%20%EC%86%8D%EC%B4%88",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 2340,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B9%A0%EC%84%B1%EC%A1%B0%EC%84%A0%EC%86%8C%20%EC%86%8D%EC%B4%88",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-07",
          "name": "통나무집닭갈비 춘천본점",
          "category": "korean",
          "categoryName": "한식 · 백년가게 닭갈비",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "춘천시 신북읍 천전리",
          "address": "강원특별자치도 춘천시 신북읍 신샘밭로 763",
          "phone": "033-241-5999",
          "lat": 37.9395,
          "lng": 127.7712,
          "hours": "10:30 ~ 21:30",
          "representativeMenu": "통나무집 닭갈비 (15,000원), 아기밥 (3,000원 - 김가루+참기름), 막국수 (8,500원)",
          "amenities": [
                "어린이 아기밥 제공",
                "아기의자 완비",
                "넓은 주차장 & 안내요원",
                "대기공간 완비"
          ],
          "reviewSummary": "백종원의 3대천왕과 맛있는녀석들에 방영된 전통의 강자. 김가루와 참기름이 듬뿍 들어간 아기밥이 있어 매운 것 못 먹는 아이들도 맛있게 한 끼 해결합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%ED%86%B5%EB%82%98%EB%AC%B4%EC%A7%91%EB%8B%AD%EA%B0%88%EB%B9%84%20%EC%B6%98%EC%B2%9C",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 4890,
                      "url": "https://map.kakao.com/?q=%ED%86%B5%EB%82%98%EB%AC%B4%EC%A7%91%EB%8B%AD%EA%B0%88%EB%B9%84%20%EC%B6%98%EC%B2%9C",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%86%B5%EB%82%98%EB%AC%B4%EC%A7%91%EB%8B%AD%EA%B0%88%EB%B9%84%20%EC%B6%98%EC%B2%9C",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-08",
          "name": "사니다 베이커리카페 원주",
          "category": "brunch",
          "categoryName": "브런치 · 마운틴뷰 루프탑카페",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "원주시 호저면 칠봉로",
          "address": "강원특별자치도 원주시 호저면 칠봉로 109-128",
          "phone": "070-7776-4422",
          "lat": 37.4012,
          "lng": 127.8945,
          "hours": "10:00 ~ 21:00",
          "representativeMenu": "사니다 수제버거 (16,000원), 화덕 고르곤졸라피자 (22,000원), 키즈 젤라또",
          "amenities": [
                "자연 속 산림욕 산책로",
                "루프탑 전망대",
                "아기의자 완비",
                "대형 주차장"
          ],
          "reviewSummary": "드라마 '사이코지만 괜찮아' 촬영지. 산 정상에 자리 잡아 뷰가 예술이고 잔디밭과 숲길 산책로가 잘 정비되어 있어 아이들과 나들이하기 최고입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4120,
                      "url": "https://map.naver.com/v5/search/%EC%82%AC%EB%8B%88%EB%8B%A4%EC%B9%B4%ED%8E%98%20%EC%9B%90%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1180,
                      "url": "https://map.kakao.com/?q=%EC%82%AC%EB%8B%88%EB%8B%A4%EC%B9%B4%ED%8E%98%20%EC%9B%90%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 820,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%82%AC%EB%8B%88%EB%8B%A4%EC%B9%B4%ED%8E%98%20%EC%9B%90%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-09",
          "name": "이상원미술관 뮤지엄스테이 레스토랑",
          "category": "western",
          "categoryName": "양식 · 숲속 계곡 이탈리안",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "춘천시 사북면 지암리",
          "address": "강원특별자치도 춘천시 사북면 화악지암길 99",
          "phone": "033-255-9001",
          "lat": 37.9512,
          "lng": 127.6185,
          "hours": "11:30 ~ 20:00 (월요일 휴무)",
          "representativeMenu": "단호박 뇨끼 (22,000원), 안심 스테이크 (49,000원), 마르게리따 피자 (21,000원)",
          "amenities": [
                "미술관 관람 연계",
                "맑은 계곡 & 숲속 자연",
                "아기의자 완비",
                "유모차 진입 수월"
          ],
          "reviewSummary": "화악산 청정 계곡 속에 미술관과 레스토랑이 함께 있어 아이와 전시 관람, 계곡 산책, 숲속 이탈리안 다이닝까지 힐링 코스로 완벽합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1890,
                      "url": "https://map.naver.com/v5/search/%EC%9D%B4%EC%83%81%EC%9B%90%EB%AF%B8%EC%88%A0%EA%B4%80%20%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 420,
                      "url": "https://map.kakao.com/?q=%EC%9D%B4%EC%83%81%EC%9B%90%EB%AF%B8%EC%88%A0%EA%B4%80%20%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9D%B4%EC%83%81%EC%9B%90%EB%AF%B8%EC%88%A0%EA%B4%80%20%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gangwon-10",
          "name": "소담오향족발 원주기업도시점",
          "category": "korean",
          "categoryName": "한식 · 놀이방완비 족발/보쌈",
          "region": "gangwon",
          "regionName": "강원특별자치도",
          "district": "원주시 지정면 가곡리",
          "address": "강원특별자치도 원주시 지정면 신지정로 181",
          "phone": "033-731-5588",
          "lat": 37.3785,
          "lng": 127.8682,
          "hours": "16:00 ~ 23:00",
          "representativeMenu": "오향족발 대 (42,000원 - 떡만두국 기본서비스), 어린이 참치주먹밥 (4,500원)",
          "amenities": [
                "어린이 대형 놀이방",
                "아기의자 완비",
                "떡만두국 무한리필",
                "지하주차장"
          ],
          "reviewSummary": "원주 기업도시 부모들의 단골 회식 장소. 놀이방이 매장 안쪽에 널찍하게 마련되어 있고 맑은 떡만두국이 서비스로 나와 아이 밥 먹이기 편합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1420,
                      "url": "https://map.naver.com/v5/search/%EC%86%8C%EB%8B%B4%EC%98%A4%ED%96%A5%EC%A1%B1%EB%B0%9C%20%EC%9B%90%EC%A3%BC%EA%B8%B0%EC%97%85%EB%8F%84%EC%8B%9C%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://map.kakao.com/?q=%EC%86%8C%EB%8B%B4%EC%98%A4%ED%96%A5%EC%A1%B1%EB%B0%9C%20%EC%9B%90%EC%A3%BC%EA%B8%B0%EC%97%85%EB%8F%84%EC%8B%9C%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 290,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%8C%EB%8B%B4%EC%98%A4%ED%96%A5%EC%A1%B1%EB%B0%9C%20%EC%9B%90%EC%A3%BC%EA%B8%B0%EC%97%85%EB%8F%84%EC%8B%9C%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-01",
          "name": "성심당 DCC점 (대전 빵지순례 & 브런치)",
          "category": "brunch",
          "categoryName": "브런치 · 대전 베이커리카페",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "유성구 도룡동",
          "address": "대전광역시 유성구 엑스포로 107 대전컨벤션센터 제1전시장 1층",
          "phone": "1588-8069",
          "lat": 36.3745,
          "lng": 127.3892,
          "hours": "08:00 ~ 22:00",
          "representativeMenu": "튀김소보로 (1,700원), 부추빵 (2,000원), 2층 브런치 오믈렛 (11,000원)",
          "amenities": [
                "2층 넓은 카페 & 브런치존",
                "수유실 & 유아휴게실 인접",
                "엑스포과학공원 인접",
                "DCC 대형주차장 무료1시간"
          ],
          "reviewSummary": "대전 본점보다 주차와 유모차 이동이 훨씬 수월한 DCC점! 엑스포과학공원과 한빛탑 음악분수 구경하고 들르기 최적이며 2층 브런치 카페가 쾌적합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%EC%84%B1%EC%8B%AC%EB%8B%B9%20DCC%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.7,
                      "reviewCount": 4980,
                      "url": "https://map.kakao.com/?q=%EC%84%B1%EC%8B%AC%EB%8B%B9%20DCC%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 4120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%B1%EC%8B%AC%EB%8B%B9%20DCC%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-02",
          "name": "솔가숯불갈비 대전도안점",
          "category": "korean",
          "categoryName": "한식 · 무연 참숯불갈비",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "유성구 원신흥동",
          "address": "대전광역시 유성구 원신흥로40번길 71",
          "phone": "042-825-9285",
          "lat": 36.3452,
          "lng": 127.3385,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "수제 돼지갈비 (18,000원), 한우 육회 (25,000원), 갈비탕 (14,000원)",
          "amenities": [
                "특허받은 하향식 무연 로스터",
                "개별 룸 완비",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "연기가 밑으로 빠지는 하향식 무연 시스템이라 냄새와 연기가 나지 않아 아기 데리고 고기 먹기 최고! 부드러운 양념갈비 맛에 아이들이 밥 한 그릇 순삭합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3810,
                      "url": "https://map.naver.com/v5/search/%EC%86%94%EA%B0%80%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EB%8C%80%EC%A0%84%EB%8F%84%EC%95%88%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 920,
                      "url": "https://map.kakao.com/?q=%EC%86%94%EA%B0%80%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EB%8C%80%EC%A0%84%EB%8F%84%EC%95%88%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%94%EA%B0%80%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EB%8C%80%EC%A0%84%EB%8F%84%EC%95%88%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-03",
          "name": "만나 반석본점",
          "category": "korean",
          "categoryName": "한식 · 상추쌈샤브샤브",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "유성구 반석동",
          "address": "대전광역시 유성구 반석로 136",
          "phone": "042-825-2001",
          "lat": 36.3912,
          "lng": 127.3145,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "상추쌈샤브샤브 (18,000원), 어린이 오므라이스 (8,000원), 떡갈비",
          "amenities": [
                "개별 가족 룸",
                "아기의자 완비",
                "유아식기 제공",
                "넓은 주차장"
          ],
          "reviewSummary": "예쁜 상추쌈 위에 고기를 얹어 먹는 정갈한 샤브샤브. 국물이 자극적이지 않아 아이와 어른 모두 편안하고 어린이 오므라이스 메뉴도 알찹니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2450,
                      "url": "https://map.naver.com/v5/search/%EB%A7%8C%EB%82%98%20%EB%B0%98%EC%84%9D%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 580,
                      "url": "https://map.kakao.com/?q=%EB%A7%8C%EB%82%98%20%EB%B0%98%EC%84%9D%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 430,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A7%8C%EB%82%98%20%EB%B0%98%EC%84%9D%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-04",
          "name": "바질리코 파스타 유성본점",
          "category": "western",
          "categoryName": "양식 · 이탈리안 바베큐",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "유성구 봉명동",
          "address": "대전광역시 유성구 온천로 53",
          "phone": "042-824-3388",
          "lat": 36.3565,
          "lng": 127.3412,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "바베큐 플레이트 (38,000원), 몽골리안 파스타 (17,000원), 고르곤졸라 피자",
          "amenities": [
                "아기의자 완비",
                "유아식기 제공",
                "온천공원 인접",
                "주차 완비"
          ],
          "reviewSummary": "유성온천 족욕체험 후 가족 외식으로 많이 찾는 이탈리안 레스토랑. 푸짐한 바베큐 플래터와 달콤한 꿀피자가 아이들에게 인기입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2120,
                      "url": "https://map.naver.com/v5/search/%EB%B0%94%EC%A7%88%EB%A6%AC%EC%BD%94%20%EC%9C%A0%EC%84%B1",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 510,
                      "url": "https://map.kakao.com/?q=%EB%B0%94%EC%A7%88%EB%A6%AC%EC%BD%94%20%EC%9C%A0%EC%84%B1",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%94%EC%A7%88%EB%A6%AC%EC%BD%94%20%EC%9C%A0%EC%84%B1",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-05",
          "name": "경복궁 대전만년점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비 코스",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "서구 만년동",
          "address": "대전광역시 서구 대덕대로 366",
          "phone": "042-487-7711",
          "lat": 36.3685,
          "lng": 127.3852,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "생갈비 코스 (68,000원), 양념갈비 정식 (38,000원), 아이 갈비탕",
          "amenities": [
                "전좌석 프라이빗 룸",
                "아기의자 완비",
                "한밭수목원 인접",
                "주차 완비"
          ],
          "reviewSummary": "대전 둔산/만년동 한밭수목원 나들이 후 들르기 좋은 최고급 룸식당. 부모님 환갑이나 아이 백일/돌잔치 모임으로 대전 1순위 추천지입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2980,
                      "url": "https://map.naver.com/v5/search/%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EB%A7%8C%EB%85%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EB%A7%8C%EB%85%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 520,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EB%A7%8C%EB%85%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-06",
          "name": "테라스키친 (성심당 본점 2층)",
          "category": "western",
          "categoryName": "양식 · 성심당 패밀리 레스토랑",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "중구 은행동",
          "address": "대전광역시 중구 대종로480번길 15 성심당 본점 2층",
          "phone": "042-220-4128",
          "lat": 36.3275,
          "lng": 127.4272,
          "hours": "10:00 ~ 21:30",
          "representativeMenu": "전설의 치킨가스 (9,500원), 베이컨 김치볶음밥 (8,500원), 메아리 빙수",
          "amenities": [
                "가성비 최고 패밀리 레스토랑",
                "아기의자 완비",
                "성심당 빵 동시 취식",
                "지하철역 인접"
          ],
          "reviewSummary": "성심당 본점에서 빵 사서 2층 테라스키친에서 바로 먹을 수 있고, 1만원 이하의 돈까스와 오므라이스가 맛있고 양도 푸짐해 아이들과 방문하기 부담 없습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6810,
                      "url": "https://map.naver.com/v5/search/%ED%85%8C%EB%9D%BC%EC%8A%A4%ED%82%A4%EC%B9%9C%20%EB%8C%80%EC%A0%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 2120,
                      "url": "https://map.kakao.com/?q=%ED%85%8C%EB%9D%BC%EC%8A%A4%ED%82%A4%EC%B9%9C%20%EB%8C%80%EC%A0%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%85%8C%EB%9D%BC%EC%8A%A4%ED%82%A4%EC%B9%9C%20%EB%8C%80%EC%A0%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-07",
          "name": "귀빈한정식 대전",
          "category": "korean",
          "categoryName": "한식 · 전통 궁중한정식",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "서구 만년동",
          "address": "대전광역시 서구 만년로67번길 33",
          "phone": "042-488-3388",
          "lat": 36.3672,
          "lng": 127.3825,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "귀빈 수라상 (45,000원), 궁중 갈비찜, 어린이 잡채/떡갈비",
          "amenities": [
                "프라이빗 룸",
                "아기의자 완비",
                "돌잔치 소품 지원",
                "주차 완비"
          ],
          "reviewSummary": "대전에서 30년 넘게 사랑받은 한정식 명가. 갈비찜, 전유화, 삼색나물 등 아이들이 먹을 반찬이 풍성하고 조용한 방에서 편안히 식사할 수 있습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1890,
                      "url": "https://map.naver.com/v5/search/%EA%B7%80%EB%B9%88%ED%95%9C%EC%A0%95%EC%8B%9D%20%EB%8C%80%EC%A0%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 420,
                      "url": "https://map.kakao.com/?q=%EA%B7%80%EB%B9%88%ED%95%9C%EC%A0%95%EC%8B%9D%20%EB%8C%80%EC%A0%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 340,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B7%80%EB%B9%88%ED%95%9C%EC%A0%95%EC%8B%9D%20%EB%8C%80%EC%A0%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daejeon-08",
          "name": "진로집 (대전 순한 두부두루치기)",
          "category": "korean",
          "categoryName": "한식 · 대전 명물 두부요리",
          "region": "daejeon",
          "regionName": "대전광역시",
          "district": "중구 대흥동",
          "address": "대전광역시 중구 중교로 45-10",
          "phone": "042-226-0914",
          "lat": 36.3262,
          "lng": 127.4245,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "두부두루치기 순한맛 (13,000원), 수육 (20,000원), 칼국수사리 (2,500원)",
          "amenities": [
                "순한맛 맵지 않은 두부",
                "아이용 수육 & 칼국수사리",
                "백년가게 선정"
          ],
          "reviewSummary": "50년 전통의 백년가게. 두부두루치기를 순한맛으로 주문하면 맵지 않고 몽글몽글 부드러워 아이들도 두부와 쫄깃한 수육, 면사리를 잘 먹습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 5420,
                      "url": "https://map.naver.com/v5/search/%EB%8C%80%EC%A0%84%20%EC%A7%84%EB%A1%9C%EC%A7%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 1690,
                      "url": "https://map.kakao.com/?q=%EB%8C%80%EC%A0%84%20%EC%A7%84%EB%A1%9C%EC%A7%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 1280,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8C%80%EC%A0%84%20%EC%A7%84%EB%A1%9C%EC%A7%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-01",
          "name": "산장가든 (조치원 원조 숯불갈비)",
          "category": "korean",
          "categoryName": "한식 · 원조 숯불돼지갈비",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "연서면 기룡리",
          "address": "세종특별자치시 연서면 도신고복로 1131-7",
          "phone": "044-867-3333",
          "lat": 36.5682,
          "lng": 127.2795,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "원조 숯불갈비 (19,000원 - 구워져 나옴), 매운갈비, 동치미메밀국수 (7,000원)",
          "amenities": [
                "직접 다 구워져 나옴",
                "넓은 야외 정원",
                "아기의자 완비",
                "대형 주차장 200대"
          ],
          "reviewSummary": "세종/대전/충청 학부모 원픽! 주방에서 숯불에 완벽히 다 구워져 따뜻한 돌판에 나오기 때문에 연기도 없고 굽느라 고생할 일 없이 아이와 편하게 식사합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 9820,
                      "url": "https://map.naver.com/v5/search/%EC%84%B8%EC%A2%85%20%EC%82%B0%EC%9E%A5%EA%B0%80%EB%93%A0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 3120,
                      "url": "https://map.kakao.com/?q=%EC%84%B8%EC%A2%85%20%EC%82%B0%EC%9E%A5%EA%B0%80%EB%93%A0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 2680,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%B8%EC%A2%85%20%EC%82%B0%EC%9E%A5%EA%B0%80%EB%93%A0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-02",
          "name": "메리골드 보람점",
          "category": "western",
          "categoryName": "양식 · 금강수변공원뷰 레스토랑",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "보람동",
          "address": "세종특별자치시 시청대로 219 시청앞 금강베네치아 3층",
          "phone": "044-867-3533",
          "lat": 36.4852,
          "lng": 127.2912,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "수제 리코타 샐러드 (16,000원), 안심 스테이크 (42,000원), 까르보나라 (17,000원)",
          "amenities": [
                "금강 수변공원 파노라마 뷰",
                "아기의자 완비",
                "유모차 진입 수월",
                "수변공원 산책로 인접"
          ],
          "reviewSummary": "세종 이응다리(금강보행교)와 수변공원이 시원하게 내려다보이는 뷰맛집. 식사 후 유모차 끌고 이응다리 산책하기 최적의 코스입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1940,
                      "url": "https://map.naver.com/v5/search/%EB%A9%94%EB%A6%AC%EA%B3%A8%EB%93%9C%20%EC%84%B8%EC%A2%85",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 450,
                      "url": "https://map.kakao.com/?q=%EB%A9%94%EB%A6%AC%EA%B3%A8%EB%93%9C%20%EC%84%B8%EC%A2%85",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A9%94%EB%A6%AC%EA%B3%A8%EB%93%9C%20%EC%84%B8%EC%A2%85",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-03",
          "name": "뜨레 아름본점",
          "category": "western",
          "categoryName": "양식 · 가든 테라스 화덕피자/파스타",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "아름동",
          "address": "세종특별자치시 바른3길 44",
          "phone": "044-868-8090",
          "lat": 36.5185,
          "lng": 127.2482,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "고르곤졸라 피자 (19,000원), 비프스테이크 샐러드 (23,000원), 해산물 토마토 파스타",
          "amenities": [
                "야외 테라스 & 분수 정원",
                "아기의자 완비",
                "넓은 전용 주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "세종 1생활권 맘들의 단골 브런치&패밀리 레스토랑. 마당 정원에 예쁜 조형물이 있어 아이들이 좋아하고 고르곤졸라 피자 도우가 쫄깃합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%9C%A8%EB%A0%88%20%EC%95%84%EB%A6%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 820,
                      "url": "https://map.kakao.com/?q=%EB%9C%A8%EB%A0%88%20%EC%95%84%EB%A6%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 610,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9C%A8%EB%A0%88%20%EC%95%84%EB%A6%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-04",
          "name": "란콰이펑 세종고운점",
          "category": "chinese",
          "categoryName": "중식 · 홍콩식 딤섬/우육탕면",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "고운동",
          "address": "세종특별자치시 마음로 70 스마트큐브 2층",
          "phone": "044-866-5882",
          "lat": 36.5245,
          "lng": 127.2395,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "수제 하가우 딤섬 (8,500원), 맑은 홍콩식 우육탕면 (9,500원), 군만두 (7,500원)",
          "amenities": [
                "어린이 우육탕면 맑은육수",
                "아기의자 완비",
                "지하주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "고운동 학원가 인근 딤섬 맛집. 맑은 우육탕면 국물이 담백해 아이들에게 면과 밥 말아주기 좋고 갓 찐 새우 딤섬이 탱글탱글합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1820,
                      "url": "https://map.naver.com/v5/search/%EB%9E%80%EC%BD%B0%EC%9D%B4%ED%8E%91%20%EC%84%B8%EC%A2%85%EA%B3%A0%EC%9A%B4%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 410,
                      "url": "https://map.kakao.com/?q=%EB%9E%80%EC%BD%B0%EC%9D%B4%ED%8E%91%20%EC%84%B8%EC%A2%85%EA%B3%A0%EC%9A%B4%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 320,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9E%80%EC%BD%B0%EC%9D%B4%ED%8E%91%20%EC%84%B8%EC%A2%85%EA%B3%A0%EC%9A%B4%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-05",
          "name": "우사 세종나성점",
          "category": "korean",
          "categoryName": "한식 · 한우 짝갈비/전실 프라이빗룸",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "나성동",
          "address": "세종특별자치시 나성북1로 22 디펠리체 2층",
          "phone": "044-862-8292",
          "lat": 36.4895,
          "lng": 127.2612,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "한우 짝갈비살 (38,000원), 한우 불고기 전골 (24,000원), 어린이 된장찌개",
          "amenities": [
                "전좌석 독립 룸",
                "직접 고기 구워줌",
                "아기의자 완비",
                "지하주차장"
          ],
          "reviewSummary": "나성동 어반아트리움 인근. 전 좌석이 고급 룸으로 되어 있어 어린 아이 동반 가족이나 조부모님 모시고 가기에 가장 프라이빗하고 안락합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1680,
                      "url": "https://map.naver.com/v5/search/%EC%9A%B0%EC%82%AC%20%EC%84%B8%EC%A2%85%EB%82%98%EC%84%B1%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 380,
                      "url": "https://map.kakao.com/?q=%EC%9A%B0%EC%82%AC%20%EC%84%B8%EC%A2%85%EB%82%98%EC%84%B1%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 290,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9A%B0%EC%82%AC%20%EC%84%B8%EC%A2%85%EB%82%98%EC%84%B1%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-06",
          "name": "세종중앙공원 카페앤레스토랑",
          "category": "brunch",
          "categoryName": "브런치 · 호수공원 전망 패밀리다이닝",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "연기면 세종리",
          "address": "세종특별자치시 중앙공원로 212 세종중앙공원 복합체육시설 2층",
          "phone": "044-868-2022",
          "lat": 36.4985,
          "lng": 127.2785,
          "hours": "10:30 ~ 20:30",
          "representativeMenu": "피크닉 수제돈까스 세트 (14,000원), 토마토 스파게티 (15,000원), 키즈 아이스크림",
          "amenities": [
                "세종호수공원 & 국립세종수목원 인접",
                "야외 잔디밭",
                "아기의자 완비",
                "유모차 이동 최적"
          ],
          "reviewSummary": "세종호수공원과 국립세종수목원 바로 앞! 킥보드, 유모차 태우고 주말 나들이 온 부모들에게 오아시스 같은 곳으로 아이들 돈까스와 파스타가 맛있습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2410,
                      "url": "https://map.naver.com/v5/search/%EC%84%B8%EC%A2%85%EC%A4%91%EC%95%99%EA%B3%B5%EC%9B%90%20%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 560,
                      "url": "https://map.kakao.com/?q=%EC%84%B8%EC%A2%85%EC%A4%91%EC%95%99%EA%B3%B5%EC%9B%90%20%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 410,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%B8%EC%A2%85%EC%A4%91%EC%95%99%EA%B3%B5%EC%9B%90%20%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-07",
          "name": "바르미샤브샤브 세종청사점",
          "category": "korean",
          "categoryName": "한식 · 샤브샤브 & 키즈놀이방 뷔페",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "어진동",
          "address": "세종특별자치시 갈매로 353 에비뉴힐 3층",
          "phone": "044-868-3920",
          "lat": 36.5025,
          "lng": 127.2652,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "소고기 샤브샤브 뷔페 성인 (17,800원), 미취학 아동 (6,000원), 칼국수 & 죽 무한",
          "amenities": [
                "어린이 놀이방 완비",
                "아기의자 완비",
                "샐러드바 뷔페",
                "대형 주차장"
          ],
          "reviewSummary": "어진동 뽀로로파크 에비뉴힐 건물에 위치! 놀이방이 있고 샤브샤브 맑은 육수에 쇠고기, 어묵, 칼국수, 죽까지 아이가 원하는 대로 먹일 수 있어 최고입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2850,
                      "url": "https://map.naver.com/v5/search/%EB%B0%94%EB%A5%B4%EB%AF%B8%EC%83%A4%EB%B8%8C%EC%83%A4%EB%B8%8C%20%EC%84%B8%EC%A2%85",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 620,
                      "url": "https://map.kakao.com/?q=%EB%B0%94%EB%A5%B4%EB%AF%B8%EC%83%A4%EB%B8%8C%EC%83%A4%EB%B8%8C%20%EC%84%B8%EC%A2%85",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%94%EB%A5%B4%EB%AF%B8%EC%83%A4%EB%B8%8C%EC%83%A4%EB%B8%8C%20%EC%84%B8%EC%A2%85",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-sejong-08",
          "name": "도담갈비 세종도담본점",
          "category": "korean",
          "categoryName": "한식 · 숯불돼지갈비/놀이방",
          "region": "sejong",
          "regionName": "세종특별자치시",
          "district": "도담동",
          "address": "세종특별자치시 보듬3로 8-20 도담동 카라카라빌딩 2층",
          "phone": "044-865-9252",
          "lat": 36.5145,
          "lng": 127.2612,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "수제 양념갈비 (17,000원), 차돌된장찌개 (5,000원), 어린이 계란찜",
          "amenities": [
                "통유리 어린이 놀이방",
                "아기의자 완비",
                "프라이빗 룸",
                "지하주차장"
          ],
          "reviewSummary": "도담동 먹자골목에서 아이 있는 집들이 가장 많이 찾는 식당. 통유리로 놀이방 내부가 보여서 부모들이 안심하고 식사할 수 있습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1920,
                      "url": "https://map.naver.com/v5/search/%EC%84%B8%EC%A2%85%20%EB%8F%84%EB%8B%B4%EA%B0%88%EB%B9%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 430,
                      "url": "https://map.kakao.com/?q=%EC%84%B8%EC%A2%85%20%EB%8F%84%EB%8B%B4%EA%B0%88%EB%B9%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%B8%EC%A2%85%20%EB%8F%84%EB%8B%B4%EA%B0%88%EB%B9%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-01",
          "name": "뚜쥬루 과자점 빵돌가마마을",
          "category": "brunch",
          "categoryName": "브런치 · 동화 테마 베이커리파크",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "천안시 동남구 풍세로",
          "address": "충청남도 천안시 동남구 풍세로 706",
          "phone": "041-578-0036",
          "lat": 36.7812,
          "lng": 127.1345,
          "hours": "08:00 ~ 22:00",
          "representativeMenu": "돌가마 만주 (2,300원), 거북이빵 (2,500원), 빵마을 어린이 브런치 (13,000원)",
          "amenities": [
                "동화속 호빗마을 테마파크",
                "어린이 체험관",
                "아기의자 완비",
                "초대형 주차장 300대"
          ],
          "reviewSummary": "동화 '반지의 제왕' 호빗 마을처럼 아기자기한 건물들이 모여 있는 테마파크형 빵집! 아이들이 잔디 언덕을 뛰놀며 맛있는 빵을 맛볼 수 있는 천안 최고의 명소입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 13400,
                      "url": "https://map.naver.com/v5/search/%EB%9A%9C%EC%A5%AC%EB%A3%A8%20%EB%B9%B5%EB%8F%8C%EA%B0%80%EB%A7%88%EB%A7%88%EC%9D%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.7,
                      "reviewCount": 4210,
                      "url": "https://map.kakao.com/?q=%EB%9A%9C%EC%A5%AC%EB%A3%A8%20%EB%B9%B5%EB%8F%8C%EA%B0%80%EB%A7%88%EB%A7%88%EC%9D%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 3890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9A%9C%EC%A5%AC%EB%A3%A8%20%EB%B9%B5%EB%8F%8C%EA%B0%80%EB%A7%88%EB%A7%88%EC%9D%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-02",
          "name": "숟가락반상 마실 천안본점",
          "category": "korean",
          "categoryName": "한식 · 퓨전 한정식 코스",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "천안시 서북구 쌍용동",
          "address": "충청남도 천안시 서북구 월봉로 130",
          "phone": "041-571-7007",
          "lat": 36.8045,
          "lng": 127.1215,
          "hours": "11:30 ~ 21:00",
          "representativeMenu": "기본정식 (18,000원), 마실정식 (23,000원), 떡갈비 & 치즈돈까스",
          "amenities": [
                "개별 룸 완비",
                "아기의자 완비",
                "유아식기 제공",
                "주차장 완비"
          ],
          "reviewSummary": "화학조미료를 쓰지 않고 계절마다 바뀌는 제철 퓨전 한정식. 달콤한 떡갈비와 잡채, 누룽지 된장국이 아이들 먹기에 딱 좋습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4120,
                      "url": "https://map.naver.com/v5/search/%EC%88%9F%EA%B0%80%EB%9D%BD%EB%B0%98%EC%83%81%20%EB%A7%88%EC%8B%A4%20%EC%B2%9C%EC%95%88",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 980,
                      "url": "https://map.kakao.com/?q=%EC%88%9F%EA%B0%80%EB%9D%BD%EB%B0%98%EC%83%81%20%EB%A7%88%EC%8B%A4%20%EC%B2%9C%EC%95%88",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%88%9F%EA%B0%80%EB%9D%BD%EB%B0%98%EC%83%81%20%EB%A7%88%EC%8B%A4%20%EC%B2%9C%EC%95%88",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-03",
          "name": "화덕으로간고등어 천안본점",
          "category": "korean",
          "categoryName": "한식 · 화덕 생선구이/잡채 무한리필",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "천안시 서북구 백석동",
          "address": "충청남도 천안시 서북구 한들3로 77-17",
          "phone": "041-553-3392",
          "lat": 36.8295,
          "lng": 127.1245,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "화덕 고등어구이 (14,000원), 삼치구이 (15,000원), 화덕 제육볶음 (15,000원)",
          "amenities": [
                "500도 화덕 생선구이",
                "잡채 & 반찬 무한리필 뷔페",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "500도 화덕에 구워 비린내 없이 겉바속촉 짭짤한 생선구이! 잡채와 연근조림 등 반찬 셀프바가 무한리필이라 아이 밥 두 공기 비우는 곳입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5120,
                      "url": "https://map.naver.com/v5/search/%ED%99%94%EB%8D%95%EC%9C%BC%EB%A1%9C%EA%B0%84%EA%B3%A0%EB%93%B1%EC%96%B4%20%EC%B2%9C%EC%95%88",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 1420,
                      "url": "https://map.kakao.com/?q=%ED%99%94%EB%8D%95%EC%9C%BC%EB%A1%9C%EA%B0%84%EA%B3%A0%EB%93%B1%EC%96%B4%20%EC%B2%9C%EC%95%88",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%99%94%EB%8D%95%EC%9C%BC%EB%A1%9C%EA%B0%84%EA%B3%A0%EB%93%B1%EC%96%B4%20%EC%B2%9C%EC%95%88",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-04",
          "name": "승지원 천안신불당점",
          "category": "korean",
          "categoryName": "한식 · 프리미엄 한정식/갈비",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "천안시 서북구 불당동",
          "address": "충청남도 천안시 서북구 불당26로 80",
          "phone": "041-567-7888",
          "lat": 36.8192,
          "lng": 127.1085,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "프리미엄 갈비 코스 (65,000원), 점심 한정식 특선 (35,000원), 키즈 반상",
          "amenities": [
                "전실 프라이빗 룸",
                "돌상 무료 대여",
                "아기의자 완비",
                "발렛파킹"
          ],
          "reviewSummary": "신불당에서 가장 고급스러운 한정식 전문점. 돌잔치나 환갑 등 가족 행사 시 무료 돌상/상차림을 지원해주며 직원들의 아이 케어 응대가 매우 친절합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2890,
                      "url": "https://map.naver.com/v5/search/%EC%8A%B9%EC%A7%80%EC%9B%90%20%EC%B2%9C%EC%95%88",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EC%8A%B9%EC%A7%80%EC%9B%90%20%EC%B2%9C%EC%95%88",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 520,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%8A%B9%EC%A7%80%EC%9B%90%20%EC%B2%9C%EC%95%88",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-05",
          "name": "로드1950카페 당진",
          "category": "brunch",
          "categoryName": "브런치 · 서해대교 오션뷰 대형카페",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "당진시 신평면 매산리",
          "address": "충청남도 당진시 신평면 매산해변길 144",
          "phone": "041-363-1950",
          "lat": 36.9385,
          "lng": 126.7812,
          "hours": "10:30 ~ 21:00",
          "representativeMenu": "로드 수제버거 (19,500원), 해물파스타 (21,000원), 모래놀이터 & 키즈존",
          "amenities": [
                "야외 백사장 모래놀이터 완비",
                "서해대교 오션뷰",
                "기차 & 로봇 조형물",
                "아기의자 완비",
                "초대형 주차장"
          ],
          "reviewSummary": "야외에 진짜 모래놀이터와 트랜스포머 로봇, 철길 조형물이 있어 아이들이 지루할 틈이 없습니다. 서해대교 바다를 보며 힐링하는 당진 최고의 핫플!",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 11200,
                      "url": "https://map.naver.com/v5/search/%EB%A1%9C%EB%93%9C1950%EC%B9%B4%ED%8E%98%20%EB%8B%B9%EC%A7%84",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 3420,
                      "url": "https://map.kakao.com/?q=%EB%A1%9C%EB%93%9C1950%EC%B9%B4%ED%8E%98%20%EB%8B%B9%EC%A7%84",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 2890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A1%9C%EB%93%9C1950%EC%B9%B4%ED%8E%98%20%EB%8B%B9%EC%A7%84",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-06",
          "name": "꽁당보리밥 아산배방점",
          "category": "korean",
          "categoryName": "한식 · 고르곤졸라피자 주는 보리밥집",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "아산시 배방읍 공수리",
          "address": "충청남도 아산시 배방읍 북수동로 27",
          "phone": "041-546-3669",
          "lat": 36.7785,
          "lng": 127.0545,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "옹기보리밥정식 (12,000원 - 화덕 고르곤졸라 피자 or 고등어구이 무료선택), 미숫가루 슬러시",
          "amenities": [
                "화덕 고르곤졸라 피자 무료",
                "보리강정 & 슬러시 무한제공",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "보리밥을 시키면 갓 구운 화덕 고르곤졸라 피자를 무료로 주는 신기한 식당! 어른은 푸짐한 나물보리밥을, 아이는 달콤한 꿀피자를 배부르게 먹을 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4820,
                      "url": "https://map.naver.com/v5/search/%EA%BD%81%EB%8B%B9%EB%B3%B4%EB%A6%AC%EB%B0%A5%20%EC%95%84%EC%82%B0%EB%B0%B0%EB%B0%A9%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1280,
                      "url": "https://map.kakao.com/?q=%EA%BD%81%EB%8B%B9%EB%B3%B4%EB%A6%AC%EB%B0%A5%20%EC%95%84%EC%82%B0%EB%B0%B0%EB%B0%A9%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 950,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%BD%81%EB%8B%B9%EB%B3%B4%EB%A6%AC%EB%B0%A5%20%EC%95%84%EC%82%B0%EB%B0%B0%EB%B0%A9%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-07",
          "name": "고마나루 1999 공주본점",
          "category": "korean",
          "categoryName": "한식 · 백제 으뜸 한정식 쌈밥",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "공주시 신관동",
          "address": "충청남도 공주시 백미고을길 5-9",
          "phone": "041-857-9999",
          "lat": 36.4682,
          "lng": 127.1215,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "고마나루 밥상 (17,000원 - 숯불돼지불고기, 황태구이, 돌솥밥)",
          "amenities": [
                "공산성 인접",
                "전통 한옥 마당",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "공주 유네스코 공산성과 무령왕릉 관람 후 들르는 필수 맛집. 숯불에 구운 돼지불고기와 잡채, 돌솥밥이 아이들 먹기에 간이 딱 맞습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3620,
                      "url": "https://map.naver.com/v5/search/%EA%B3%A0%EB%A7%88%EB%82%98%EB%A3%A8%201999%20%EA%B3%B5%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 890,
                      "url": "https://map.kakao.com/?q=%EA%B3%A0%EB%A7%88%EB%82%98%EB%A3%A8%201999%20%EA%B3%B5%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 710,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B3%A0%EB%A7%88%EB%82%98%EB%A3%A8%201999%20%EA%B3%B5%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungnam-08",
          "name": "간월도 별미영양굴밥 서산본점",
          "category": "korean",
          "categoryName": "한식 · 간월암 오션뷰 영양밥",
          "region": "chungnam",
          "regionName": "충청남도",
          "district": "서산시 부석면 간월도리",
          "address": "충청남도 서산시 부석면 간월도1길 11",
          "phone": "041-662-3392",
          "lat": 36.5912,
          "lng": 126.4285,
          "hours": "09:00 ~ 20:00",
          "representativeMenu": "영양굴밥 (16,000원 - 청국장+어리굴젓+달래간장), 바지락영양밥 (16,000원 - 아이추천)",
          "amenities": [
                "간월암 바다뷰",
                "생선구이 & 달래간장",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "간월암 물때 맞춰 바다 건너보고 식사하기 좋은 코스. 굴을 못 먹는 아이들을 위해 바지락영양밥과 고소한 생선구이가 제공되어 온 가족이 든든합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EA%B0%84%EC%9B%94%EB%8F%84%20%EB%B3%84%EB%AF%B8%EC%98%81%EC%96%91%EA%B5%B4%EB%B0%A5%20%EC%84%9C%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EA%B0%84%EC%9B%94%EB%8F%84%20%EB%B3%84%EB%AF%B8%EC%98%81%EC%96%91%EA%B5%B4%EB%B0%A5%20%EC%84%9C%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 560,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%84%EC%9B%94%EB%8F%84%20%EB%B3%84%EB%AF%B8%EC%98%81%EC%96%91%EA%B5%B4%EB%B0%A5%20%EC%84%9C%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-01",
          "name": "본궁석갈비 청주가경점",
          "category": "korean",
          "categoryName": "한식 · 다 구워 나오는 명품 석갈비",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "청주시 흥덕구 가경동",
          "address": "충청북도 청주시 흥덕구 2순환로 1084",
          "phone": "043-233-0006",
          "lat": 36.6215,
          "lng": 127.4285,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "소석갈비 (28,000원), 돼지석갈비 (15,000원), 영양돌솥밥 (5,000원)",
          "amenities": [
                "구워져 나오는 석갈비",
                "넓은 룸 완비",
                "아기의자 완비",
                "초대형 주차장 100대"
          ],
          "reviewSummary": "청주 부모님들이 아이 데리고 외식할 때 1순위로 찾는 곳! 뜨거운 돌판에 다 구워진 갈비가 양파와 함께 나와서 연기 없이 아이에게 바로 먹일 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6210,
                      "url": "https://map.naver.com/v5/search/%EB%B3%B8%EA%B6%81%EC%84%9D%EA%B0%88%EB%B9%84%20%EC%B2%AD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1780,
                      "url": "https://map.kakao.com/?q=%EB%B3%B8%EA%B6%81%EC%84%9D%EA%B0%88%EB%B9%84%20%EC%B2%AD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1340,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B3%B8%EA%B6%81%EC%84%9D%EA%B0%88%EB%B9%84%20%EC%B2%AD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-02",
          "name": "트리브링 청주남이면본점",
          "category": "brunch",
          "categoryName": "브런치 · 초대형 식물원 호수카페",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "청주시 서원구 남이면 청오리",
          "address": "충청북도 청주시 서원구 남이면 청남로 1388-36",
          "phone": "043-267-7778",
          "lat": 36.5685,
          "lng": 127.4412,
          "hours": "10:00 ~ 22:00",
          "representativeMenu": "소시지페이스트리 (6,500원), 부라타치즈 샐러드 (16,000원), 트리브링 에이드",
          "amenities": [
                "실내 인공 연못 & 징검다리",
                "초대형 열대식물원",
                "수유실 완비",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "청주 최고의 뷰를 자랑하는 식물원 카페. 실내에 졸졸 흐르는 인공 하천과 비단잉어, 징검다리가 있어 아이들이 자연 속에서 신나게 힐링합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 9420,
                      "url": "https://map.naver.com/v5/search/%ED%8A%B8%EB%A6%AC%EB%B8%8C%EB%A7%81%20%EC%B2%AD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 2980,
                      "url": "https://map.kakao.com/?q=%ED%8A%B8%EB%A6%AC%EB%B8%8C%EB%A7%81%20%EC%B2%AD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 2410,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%8A%B8%EB%A6%AC%EB%B8%8C%EB%A7%81%20%EC%B2%AD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-03",
          "name": "수암골 풀문 청주본점",
          "category": "brunch",
          "categoryName": "브런치 · 세계최초 치즈빙수 & 전망",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "청주시 상당구 수동",
          "address": "충청북도 청주시 상당구 수암로 36번길 21-4",
          "phone": "043-224-5152",
          "lat": 36.6452,
          "lng": 127.4985,
          "hours": "10:30 ~ 23:00",
          "representativeMenu": "원조 세계최초 치즈빙수 (1인 8,000원, 2인 15,000원), 파니니 브런치 (13,000원)",
          "amenities": [
                "수암골 벽화마을 인접",
                "청주 시내 파노라마 뷰",
                "아기의자 완비",
                "테라스 정원"
          ],
          "reviewSummary": "수암골 벽화마을에서 아이와 귀여운 벽화 사진 찍고 올라가기 좋은 곳. 달콤 짭조름한 원조 치즈빙수에 아이들이 반하고 시원한 전망이 훌륭합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4310,
                      "url": "https://map.naver.com/v5/search/%EC%88%98%EC%95%94%EA%B3%A8%20%ED%92%80%EB%AC%B8%20%EC%B2%AD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 1120,
                      "url": "https://map.kakao.com/?q=%EC%88%98%EC%95%94%EA%B3%A8%20%ED%92%80%EB%AC%B8%20%EC%B2%AD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%88%98%EC%95%94%EA%B3%A8%20%ED%92%80%EB%AC%B8%20%EC%B2%AD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-04",
          "name": "율량동 마실 한정식 청주점",
          "category": "korean",
          "categoryName": "한식 · 퓨전 한정식 룸식당",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "청주시 청원구 율량동",
          "address": "충청북도 청주시 청원구 율량로190번길 53",
          "phone": "043-211-5363",
          "lat": 36.6712,
          "lng": 127.4985,
          "hours": "11:30 ~ 21:00",
          "representativeMenu": "점심특선 (16,000원), 스페셜정식 (26,000원), 어린이 돈까스 정식",
          "amenities": [
                "개별 룸 완비",
                "아기의자 완비",
                "유아식기 제공",
                "지하주차장"
          ],
          "reviewSummary": "율량동에서 아기 데리고 프라이빗하게 식사할 수 있는 최고의 룸 한정식. 잡채와 단호박 튀김, 떡갈비가 나와서 아이들 밥반찬으로 아주 훌륭합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2420,
                      "url": "https://map.naver.com/v5/search/%EB%A7%88%EC%8B%A4%20%EC%9C%A8%EB%9F%89%EB%8F%99%20%EC%B2%AD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 580,
                      "url": "https://map.kakao.com/?q=%EB%A7%88%EC%8B%A4%20%EC%9C%A8%EB%9F%89%EB%8F%99%20%EC%B2%AD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 430,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A7%88%EC%8B%A4%20%EC%9C%A8%EB%9F%89%EB%8F%99%20%EC%B2%AD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-05",
          "name": "숲속의장수촌 충주본점",
          "category": "korean",
          "categoryName": "한식 · 누룽지 닭백숙/오리백숙",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "충주시 용산동",
          "address": "충청북도 충주시 용정1길 35",
          "phone": "043-843-2525",
          "lat": 36.9585,
          "lng": 127.9412,
          "hours": "11:30 ~ 21:00",
          "representativeMenu": "누룽지 닭백숙 (45,000원 - 쫄깃한 누룽지죽 포함), 쟁반막국수 (14,000원)",
          "amenities": [
                "넓은 정원 & 야외 쉼터",
                "좌식/입식 룸",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "고기가 뼈에서 스르륵 분리될 정도로 부드러워 영유아 보양식으로 최고! 뚝배기 가득 나오는 쫄깃한 누룽지 닭죽은 아이들이 한 그릇 더 달라고 조릅니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3820,
                      "url": "https://map.naver.com/v5/search/%EC%88%B2%EC%86%8D%EC%9D%98%EC%9E%A5%EC%88%98%EC%B4%8C%20%EC%B6%A9%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 940,
                      "url": "https://map.kakao.com/?q=%EC%88%B2%EC%86%8D%EC%9D%98%EC%9E%A5%EC%88%98%EC%B4%8C%20%EC%B6%A9%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 710,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%88%B2%EC%86%8D%EC%9D%98%EC%9E%A5%EC%88%98%EC%B4%8C%20%EC%B6%A9%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-06",
          "name": "갈마가든 충주 (수안보온천)",
          "category": "korean",
          "categoryName": "한식 · 백년가게 칡냉면 & 해물만두전골",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "충주시 살미면 용천리",
          "address": "충청북도 충주시 살미면 용천갈마길 45",
          "phone": "043-851-8026",
          "lat": 36.8912,
          "lng": 127.9745,
          "hours": "10:00 ~ 20:00 (수요일 휴무)",
          "representativeMenu": "해물만두전골 (13,000원), 칡물냉면 (9,000원), 어린이 수제만두 (7,000원)",
          "amenities": [
                "백년가게",
                "넓은 잔디마당 & 그네",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "수안보온천 가족탕 다녀오며 들르기 좋은 중소벤처기업부 인증 백년가게. 자극적이지 않고 담백한 만두전골과 야외 잔디마당이 아이 동반에 참 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EA%B0%88%EB%A7%88%EA%B0%80%EB%93%A0%20%EC%B6%A9%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 760,
                      "url": "https://map.kakao.com/?q=%EA%B0%88%EB%A7%88%EA%B0%80%EB%93%A0%20%EC%B6%A9%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 580,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%88%EB%A7%88%EA%B0%80%EB%93%A0%20%EC%B6%A9%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-07",
          "name": "대보명가 제천본점",
          "category": "korean",
          "categoryName": "한식 · 제천 명물 약초밥상",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "제천시 신월동",
          "address": "충청북도 제천시 용두대로 287",
          "phone": "043-643-3050",
          "lat": 37.1512,
          "lng": 128.1895,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "제천약초밥상 (18,000원 - 남자밥/여자밥 돌솥밥+제철약초나물), 떡갈비 (25,000원)",
          "amenities": [
                "약초나물 건강밥상",
                "부드러운 한우 떡갈비",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "의림지 관광 후 들르는 제천 1등 한정식. 한약재 냄새 없이 구수한 돌솥밥과 수제 한우 떡갈비가 있어 아이와 조부모님 3대가 모두 감탄하는 밥상입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5420,
                      "url": "https://map.naver.com/v5/search/%EB%8C%80%EB%B3%B4%EB%AA%85%EA%B0%80%20%EC%A0%9C%EC%B2%9C%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1580,
                      "url": "https://map.kakao.com/?q=%EB%8C%80%EB%B3%B4%EB%AA%85%EA%B0%80%20%EC%A0%9C%EC%B2%9C%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1210,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8C%80%EB%B3%B4%EB%AA%85%EA%B0%80%20%EC%A0%9C%EC%B2%9C%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-chungbuk-08",
          "name": "청남대반점 청주본점",
          "category": "chinese",
          "categoryName": "중식 · 청남대 인근 가족중식당",
          "region": "chungbuk",
          "regionName": "충청북도",
          "district": "청주시 상당구 문의면 미천리",
          "address": "충청북도 청주시 상당구 문의면 문의시내로 23",
          "phone": "043-297-7755",
          "lat": 36.5215,
          "lng": 127.4912,
          "hours": "11:00 ~ 20:00 (월요일 휴무)",
          "representativeMenu": "찹쌀탕수육 (24,000원), 옛날짜장면 (7,000원), 어린이 볶음밥 (8,000원)",
          "amenities": [
                "청남대 & 대청호 인접",
                "아기의자 완비",
                "유아식기 제공",
                "공영주차장 인접"
          ],
          "reviewSummary": "대통령 별장 청남대와 대청호 나들이 후 아이들과 짜장면, 탕수육 먹으러 들르는 코스. 바삭하고 달콤한 찹쌀탕수육은 아이들이 게 눈 감추듯 먹습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2190,
                      "url": "https://map.naver.com/v5/search/%EC%B2%AD%EB%82%A8%EB%8C%80%EB%B0%98%EC%A0%90%20%EC%B2%AD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 510,
                      "url": "https://map.kakao.com/?q=%EC%B2%AD%EB%82%A8%EB%8C%80%EB%B0%98%EC%A0%90%20%EC%B2%AD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B2%AD%EB%82%A8%EB%8C%80%EB%B0%98%EC%A0%90%20%EC%B2%AD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-01",
          "name": "꽃담우 한우 수완점",
          "category": "korean",
          "categoryName": "한식 · 한우구이/키즈놀이방",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "광산구 수완동",
          "address": "광주광역시 광산구 수완로74번길 11-2",
          "phone": "062-956-6692",
          "lat": 35.1912,
          "lng": 126.8215,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "한우 안심/생등심, 떡갈비 정식 (18,000원), 어린이 사골곰탕 (8,000원)",
          "amenities": [
                "어린이 대형 놀이방 완비",
                "개별 룸 완비",
                "아기의자 완비",
                "수완지구 주차장"
          ],
          "reviewSummary": "수완지구 학부모들 모임 1순위 식당! 놀이방에 미끄럼틀과 놀이기구가 있고 소고기가 입에서 녹아 아이들 먹이기 참 좋습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EA%BD%83%EB%8B%B4%EC%9A%B0%20%ED%95%9C%EC%9A%B0%20%EC%88%98%EC%99%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EA%BD%83%EB%8B%B4%EC%9A%B0%20%ED%95%9C%EC%9A%B0%20%EC%88%98%EC%99%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 590,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%BD%83%EB%8B%B4%EC%9A%B0%20%ED%95%9C%EC%9A%B0%20%EC%88%98%EC%99%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-02",
          "name": "송학한정식 상무본점",
          "category": "korean",
          "categoryName": "한식 · 남도 전통 한정식",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "서구 치평동",
          "address": "광주광역시 서구 상무자유로 143-1",
          "phone": "062-385-3333",
          "lat": 35.1525,
          "lng": 126.8512,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "송학 수라상 코스 (45,000원), 보리굴비 정식 (30,000원), 갈비찜 & 잡채",
          "amenities": [
                "프라이빗 룸",
                "아기의자 완비",
                "유아식기 제공",
                "넓은 주차장"
          ],
          "reviewSummary": "상무지구에서 돌잔치, 상견례, 가족 모임으로 명성 높은 한정식. 갈비찜과 굴비, 육전 등 아이들이 잘 먹는 반찬이 줄지어 나옵니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2890,
                      "url": "https://map.naver.com/v5/search/%EC%86%A1%ED%95%99%ED%95%9C%EC%A0%95%EC%8B%9D%20%EA%B4%91%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EC%86%A1%ED%95%99%ED%95%9C%EC%A0%95%EC%8B%9D%20%EA%B4%91%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 510,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%A1%ED%95%99%ED%95%9C%EC%A0%95%EC%8B%9D%20%EA%B4%91%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-03",
          "name": "보이저 첨단 시리단길 본촌",
          "category": "western",
          "categoryName": "양식 · 수변정원 복합 다이닝",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "광산구 쌍암동",
          "address": "광주광역시 광산구 임방울대로826번길 19-20 보이저 첨단",
          "phone": "062-972-0050",
          "lat": 35.2185,
          "lng": 126.8482,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "화덕 피자 (22,000원), 트러플 크림 파스타 (19,000원), 키즈 젤라또",
          "amenities": [
                "실내외 분수 & 수변정원 포토존",
                "아기의자 완비",
                "유모차 통로 완비",
                "지하 대형 주차장"
          ],
          "reviewSummary": "첨단지구 핫플 시리단길의 랜드마크! 인공 폭포와 수변정원이 아름다워 아이들 사진 찍기 좋고 다양한 키즈 프렌들리 레스토랑이 입점해 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5810,
                      "url": "https://map.naver.com/v5/search/%EB%B3%B4%EC%9D%B4%EC%A0%80%20%EC%B2%A8%EB%8B%A8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1620,
                      "url": "https://map.kakao.com/?q=%EB%B3%B4%EC%9D%B4%EC%A0%80%20%EC%B2%A8%EB%8B%A8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1280,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B3%B4%EC%9D%B4%EC%A0%80%20%EC%B2%A8%EB%8B%A8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-04",
          "name": "차차룸 일곡점",
          "category": "brunch",
          "categoryName": "브런치 · 유러피안 베이커리 다이닝",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "북구 일곡동",
          "address": "광주광역시 북구 일곡택지로 99번길 33",
          "phone": "062-574-8848",
          "lat": 35.2045,
          "lng": 126.8985,
          "hours": "10:30 ~ 21:00",
          "representativeMenu": "차차룸 브런치 플래터 (18,000원), 잠봉뵈르 샌드위치 (11,000원), 감자스프 (7,500원)",
          "amenities": [
                "아기의자 완비",
                "유기농 천연발효 빵",
                "유모차 진입 수월",
                "근린공원 인접"
          ],
          "reviewSummary": "일곡 자연마을 카페거리의 인기 브런치. 갓 구운 바게트와 치아바타, 부드러운 감자스프가 아이들 건강한 식사로 손색없습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2410,
                      "url": "https://map.naver.com/v5/search/%EC%B0%A8%EC%B0%A8%EB%A3%B8%20%EC%9D%BC%EA%B3%A1%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 580,
                      "url": "https://map.kakao.com/?q=%EC%B0%A8%EC%B0%A8%EB%A3%B8%20%EC%9D%BC%EA%B3%A1%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B0%A8%EC%B0%A8%EB%A3%B8%20%EC%9D%BC%EA%B3%A1%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-05",
          "name": "어센틱 화덕피자 봉선점",
          "category": "western",
          "categoryName": "양식 · 참나무 화덕피자/파스타",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "남구 봉선동",
          "address": "광주광역시 남구 봉선중앙로 47번길 12",
          "phone": "062-671-5588",
          "lat": 35.1285,
          "lng": 126.9082,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "마르게리따 피자 (19,000원), 볼로네제 라구파스타 (18,000원), 치킨텐더 샐러드",
          "amenities": [
                "참나무 장작 화덕",
                "아기의자 완비",
                "유아식기 제공",
                "주차 가능"
          ],
          "reviewSummary": "봉선동 학원가 부모들이 아이들과 가장 즐겨 찾는 화덕피자 전문점. 도우가 담백하고 고기 듬뿍 볼로네제 파스타는 아이들 최애 메뉴입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1980,
                      "url": "https://map.naver.com/v5/search/%EC%96%B4%EC%84%BC%ED%8B%B1%20%EB%B4%89%EC%84%A0%EB%8F%99",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 420,
                      "url": "https://map.kakao.com/?q=%EC%96%B4%EC%84%BC%ED%8B%B1%20%EB%B4%89%EC%84%A0%EB%8F%99",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%96%B4%EC%84%BC%ED%8B%B1%20%EB%B4%89%EC%84%A0%EB%8F%99",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-06",
          "name": "칠우대패삼겹살 수완점",
          "category": "korean",
          "categoryName": "한식 · 대패삼겹살/유기농 쌈채소",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "광산구 장덕동",
          "address": "광주광역시 광산구 풍영로200번길 81",
          "phone": "062-959-7770",
          "lat": 35.1945,
          "lng": 126.8145,
          "hours": "12:00 ~ 23:00",
          "representativeMenu": "국내산 대패삼겹 한판 (32,000원), 날치알 볶음밥 (3,000원), 들깨가루 소스",
          "amenities": [
                "빨리 익는 부드러운 고기",
                "아기의자 완비",
                "가족 단체석",
                "주차 완비"
          ],
          "reviewSummary": "광주 전통의 대패삼겹살. 얇고 부드러워 불판에 올리자마자 금방 익어 배고파 보채는 아이들에게 바로바로 먹이기 최고입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2680,
                      "url": "https://map.naver.com/v5/search/%EC%B9%A0%EC%9A%B0%EB%8C%80%ED%8C%A8%EC%82%BC%EA%B2%B9%EC%82%B4%20%EC%88%98%EC%99%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 610,
                      "url": "https://map.kakao.com/?q=%EC%B9%A0%EC%9A%B0%EB%8C%80%ED%8C%A8%EC%82%BC%EA%B2%B9%EC%82%B4%20%EC%88%98%EC%99%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B9%A0%EC%9A%B0%EB%8C%80%ED%8C%A8%EC%82%BC%EA%B2%B9%EC%82%B4%20%EC%88%98%EC%99%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-07",
          "name": "르한스 레스토랑 상무점",
          "category": "western",
          "categoryName": "양식 · 잔디마당 가든 레스토랑",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "서구 유촌동",
          "address": "광주광역시 서구 유덕로 161",
          "phone": "062-383-7776",
          "lat": 35.1685,
          "lng": 126.8425,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "채끝 등심 스테이크 (46,000원), 명란크림파스타 (19,000원), 키즈 뽀로로주스",
          "amenities": [
                "넓은 야외 잔디마당",
                "아기의자 완비",
                "유모차 진입 수월",
                "넓은 주차장"
          ],
          "reviewSummary": "초록빛 야외 잔디정원이 시원하게 펼쳐진 숲속 힐링 레스토랑. 아이들이 마당에서 뛰어놀기 좋고 음식 비주얼과 맛이 훌륭합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%EB%A5%B4%ED%95%9C%EC%8A%A4%20%EA%B4%91%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EB%A5%B4%ED%95%9C%EC%8A%A4%20%EA%B4%91%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 520,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A5%B4%ED%95%9C%EC%8A%A4%20%EA%B4%91%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gwangju-08",
          "name": "황솔촌 상무점 (광주 숯불돼지갈비)",
          "category": "korean",
          "categoryName": "한식 · 마늘돼지갈비/냉면수육쟁반",
          "region": "gwangju",
          "regionName": "광주광역시",
          "district": "서구 치평동",
          "address": "광주광역시 서구 운천로 253",
          "phone": "062-376-9233",
          "lat": 35.1585,
          "lng": 126.8582,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "마늘갈비 (18,000원), 양념갈비 (17,000원), 쟁반냉면 (15,000원)",
          "amenities": [
                "어린이 놀이방 완비",
                "대형 룸 완비",
                "아기의자 완비",
                "초대형 주차장"
          ],
          "reviewSummary": "광주 대표 갈비 브랜드 황솔촌. 놀이방과 샐러드바가 잘 갖춰져 있고 맵지 않고 달짝지근한 갈비 양념이 아이들 입맛에 딱 맞습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5420,
                      "url": "https://map.naver.com/v5/search/%ED%99%A9%EC%86%94%EC%B4%8C%20%EC%83%81%EB%AC%B4%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1420,
                      "url": "https://map.kakao.com/?q=%ED%99%A9%EC%86%94%EC%B4%8C%20%EC%83%81%EB%AC%B4%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%99%A9%EC%86%94%EC%B4%8C%20%EC%83%81%EB%AC%B4%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-01",
          "name": "고궁 전주본점 (전주비빔밥 & 떡갈비)",
          "category": "korean",
          "categoryName": "한식 · 전주전통비빔밥/떡갈비",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "전주시 덕진구 덕진동2가",
          "address": "전북특별자치도 전주시 덕진구 송천중앙로 33",
          "phone": "063-251-3211",
          "lat": 35.8485,
          "lng": 127.1245,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "전주전통비빔밥 (12,000원), 어린이 떡갈비 비빔밥 (10,000원), 숯불떡갈비 (16,000원)",
          "amenities": [
                "2층 비빔밥 미니 박물관",
                "어린이 안 매운 비빔밥 구비",
                "아기의자 완비",
                "대형 주차장 80대"
          ],
          "reviewSummary": "대한민국 비빔밥 명가! 2층에 대형 비빔밥 모형 박물관이 있어 아이들이 재미있어하고, 맵지 않은 어린이 떡갈비 비빔밥이 있어 온 가족이 만족합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 8920,
                      "url": "https://map.naver.com/v5/search/%EA%B3%A0%EA%B6%81%20%EC%A0%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 2980,
                      "url": "https://map.kakao.com/?q=%EA%B3%A0%EA%B6%81%20%EC%A0%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2410,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B3%A0%EA%B6%81%20%EC%A0%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-02",
          "name": "한일옥 군산 (원조 소고기뭇국)",
          "category": "korean",
          "categoryName": "한식 · 80년 고택 맑은 소고기뭇국",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "군산시 신창동",
          "address": "전북특별자치도 군산시 구영3길 63 (초원사진관 바로 앞)",
          "phone": "063-446-5491",
          "lat": 35.9862,
          "lng": 126.7085,
          "hours": "06:00 ~ 21:30",
          "representativeMenu": "소고기뭇국 (10,000원 - 맑고 깊은 국물), 비빔밥 (10,000원), 닭국",
          "amenities": [
                "어린이 국물 무료 추가",
                "초원사진관 바로 앞",
                "아기의자 완비",
                "2층 옛날골동품 박물관"
          ],
          "reviewSummary": "맑고 진한 소고기 뭇국에 밥 말아주면 아이들이 감탄하며 그릇째 마십니다. 2층에 옛날 타자기와 전화기 등 골동품 전시가 있어 아이들 구경거리도 풍성합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%ED%95%9C%EC%9D%BC%EC%98%A5%20%EA%B5%B0%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 4890,
                      "url": "https://map.kakao.com/?q=%ED%95%9C%EC%9D%BC%EC%98%A5%20%EA%B5%B0%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%9C%EC%9D%BC%EC%98%A5%20%EA%B5%B0%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-03",
          "name": "솔가숯불갈비 전주아중본점",
          "category": "korean",
          "categoryName": "한식 · 무연 수제 돼지갈비",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "전주시 덕진구 인후동1가",
          "address": "전북특별자치도 전주시 덕진구 아중로 125",
          "phone": "063-245-1116",
          "lat": 35.8285,
          "lng": 127.1685,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "수제 돼지갈비 (18,000원), 함흥 물냉면 (9,000원), 갈비탕 (14,000원)",
          "amenities": [
                "무연 하향식 로스터 (연기 없음)",
                "개별 룸 완비",
                "아기의자 완비",
                "대형 주차장"
          ],
          "reviewSummary": "영화 '기생충' 회식 장소로 유명한 전주 1등 갈비집. 연기가 전혀 안 나 아기 데리고 가기 안심되고, 갈비가 입에서 살살 녹아 아이들 최애 맛집입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 7420,
                      "url": "https://map.naver.com/v5/search/%EC%86%94%EA%B0%80%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EC%A0%84%EC%A3%BC%EC%95%84%EC%A4%91%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 2340,
                      "url": "https://map.kakao.com/?q=%EC%86%94%EA%B0%80%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EC%A0%84%EC%A3%BC%EC%95%84%EC%A4%91%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 1890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%94%EA%B0%80%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EC%A0%84%EC%A3%BC%EC%95%84%EC%A4%91%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-04",
          "name": "이성당 신관 베이커리카페 군산",
          "category": "brunch",
          "categoryName": "브런치 · 1945 대한민국 최고령 빵집",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "군산시 중앙로1가",
          "address": "전북특별자치도 군산시 중앙로 177",
          "phone": "063-445-2772",
          "lat": 35.9875,
          "lng": 126.7112,
          "hours": "08:00 ~ 21:30",
          "representativeMenu": "단팥빵 (2,000원), 야채빵 (2,500원), 2층 모닝세트 (7,000원)",
          "amenities": [
                "2층 넓고 쾌적한 카페 공간",
                "아기의자 완비",
                "유모차 진입 수월",
                "선물용 포장"
          ],
          "reviewSummary": "본점 옆 신관 2층은 줄 서지 않고 여유롭게 빵과 커피, 아이들 음료를 즐길 수 있습니다. 갓 구운 야채빵과 달콤한 팥빵에 온 가족이 미소 짓습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 16800,
                      "url": "https://map.naver.com/v5/search/%EC%9D%B4%EC%84%B1%EB%8B%B9%20%EA%B5%B0%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 5920,
                      "url": "https://map.kakao.com/?q=%EC%9D%B4%EC%84%B1%EB%8B%B9%20%EA%B5%B0%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9D%B4%EC%84%B1%EB%8B%B9%20%EA%B5%B0%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-05",
          "name": "궁 전주본점 (조선왕조 궁중음식)",
          "category": "korean",
          "categoryName": "한식 · 국가무형문화재 궁중한정식",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "전주시 완산구 중화산동2가",
          "address": "전북특별자치도 전주시 완산구 천잠로 337",
          "phone": "063-227-0844",
          "lat": 35.8115,
          "lng": 127.1082,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "진찬 코스 (65,000원), 수라상 (95,000원), 궁중 떡갈비 & 너비아니",
          "amenities": [
                "품격 있는 한옥 룸",
                "아기의자 완비",
                "돌잔치 소품 지원",
                "주차 완비"
          ],
          "reviewSummary": "황혜성 선생의 손맛을 잇는 국가무형문화재 궁중음식 전수 기관. 격식 있는 가족 행사나 부모님 모시고 아이들과 조용하게 대접받는 최고의 식사처입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 1920,
                      "url": "https://map.naver.com/v5/search/%EA%B6%81%20%EC%A0%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 480,
                      "url": "https://map.kakao.com/?q=%EA%B6%81%20%EC%A0%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B6%81%20%EC%A0%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-06",
          "name": "올소 에코시티점 (대형키즈룸 고깃집)",
          "category": "korean",
          "categoryName": "한식 · 소갈비살/대형키즈룸",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "전주시 덕진구 송천동2가",
          "address": "전북특별자치도 전주시 덕진구 세병서로 43 2층",
          "phone": "063-255-9292",
          "lat": 35.8712,
          "lng": 127.1315,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "양념 소갈비살 (18,000원), 생삼겹살 (15,000원), 셀프 볶음밥",
          "amenities": [
                "초대형 정글짐 키즈카페급 놀이방",
                "통유리 관전석",
                "아기의자 완비",
                "지하주차장"
          ],
          "reviewSummary": "에코시티 세병호 인근 신도시 부모들의 천국! 키즈카페 수준의 정글짐 놀이방이 있어 아이들은 신나게 뛰놀고 부모는 여유롭게 소갈비살을 즐깁니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2410,
                      "url": "https://map.naver.com/v5/search/%EC%98%AC%EC%86%8C%20%EC%97%90%EC%BD%94%EC%8B%9C%ED%8B%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 590,
                      "url": "https://map.kakao.com/?q=%EC%98%AC%EC%86%8C%20%EC%97%90%EC%BD%94%EC%8B%9C%ED%8B%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%98%AC%EC%86%8C%20%EC%97%90%EC%BD%94%EC%8B%9C%ED%8B%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-07",
          "name": "본토갈비 익산본점",
          "category": "korean",
          "categoryName": "한식 · 수제 돼지갈비/놀이방",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "익산시 영등동",
          "address": "전북특별자치도 익산시 고봉로32길 11",
          "phone": "063-833-9285",
          "lat": 35.9585,
          "lng": 126.9712,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "양념 수제갈비 (16,000원), 차돌된장찌개 (6,000원), 어린이 계란찜",
          "amenities": [
                "어린이 실내 놀이방",
                "아기의자 완비",
                "프라이빗 룸",
                "넓은 주차장"
          ],
          "reviewSummary": "익산 영등동에서 가족 외식으로 가장 손꼽히는 갈비집. 아이들을 위한 실내 놀이방이 있고 양념갈비 간이 자극적이지 않아 유아들이 먹기 참 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2190,
                      "url": "https://map.naver.com/v5/search/%EB%B3%B8%ED%86%A0%EA%B0%88%EB%B9%84%20%EC%9D%B5%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://map.kakao.com/?q=%EB%B3%B8%ED%86%A0%EA%B0%88%EB%B9%84%20%EC%9D%B5%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B3%B8%ED%86%A0%EA%B0%88%EB%B9%84%20%EC%9D%B5%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonbuk-08",
          "name": "다가포가든 익산 (갈매기살구이)",
          "category": "korean",
          "categoryName": "한식 · 통갈매기살 숯불구이",
          "region": "jeonbuk",
          "regionName": "전북특별자치도",
          "district": "익산시 현영동",
          "address": "전북특별자치도 익산시 현영길 40-7",
          "phone": "063-854-5504",
          "lat": 35.9412,
          "lng": 126.9245,
          "hours": "11:30 ~ 21:00 (월요일 휴무)",
          "representativeMenu": "갈매기살구이 (16,000원), 김치찌개 (9,000원), 시골 된장찌개",
          "amenities": [
                "시골 외갓집 감성 정원",
                "아기의자 완비",
                "넓은 마당 주차",
                "유아식기 제공"
          ],
          "reviewSummary": "초벌구이해 나와서 기름 튈 염려 없이 촉촉하고 부드러운 갈매기살. 시골 마당에 백구와 꽃밭이 있어 아이들이 밥 먹고 시골 정취를 만끽합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EB%8B%A4%EA%B0%80%ED%8F%AC%EA%B0%80%EB%93%A0%20%EC%9D%B5%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EB%8B%A4%EA%B0%80%ED%8F%AC%EA%B0%80%EB%93%A0%20%EC%9D%B5%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 590,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8B%A4%EA%B0%80%ED%8F%AC%EA%B0%80%EB%93%A0%20%EC%9D%B5%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-01",
          "name": "꽃돌게장1번가 여수본점",
          "category": "korean",
          "categoryName": "한식 · 여수 명물 게장정식 & 어린이돈까스",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "여수시 봉산동",
          "address": "전라남도 여수시 봉산2로 36",
          "phone": "061-644-0003",
          "lat": 34.7315,
          "lng": 127.7285,
          "hours": "10:00 ~ 21:30",
          "representativeMenu": "꽃게정식 (35,000원 - 돌게장 무한리필바), 어린이 돈까스 (9,000원), 꽃게탕",
          "amenities": [
                "어린이 전용 수제돈까스 구비",
                "돌게장 & 어묵 무한리필 셀프바",
                "아기의자 완비",
                "엘리베이터",
                "초대형 전용주차장"
          ],
          "reviewSummary": "여수 가족 여행 필수 코스! 어른은 살 꽉 찬 꽃게장과 돌게장을, 아이는 바삭한 수제 돈까스와 따끈한 어묵꼬치를 먹을 수 있어 온 가족이 행복합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 18900,
                      "url": "https://map.naver.com/v5/search/%EA%BD%83%EB%8F%8C%EA%B2%8C%EC%9E%A51%EB%B2%88%EA%B0%80%20%EC%97%AC%EC%88%98",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 6120,
                      "url": "https://map.kakao.com/?q=%EA%BD%83%EB%8F%8C%EA%B2%8C%EC%9E%A51%EB%B2%88%EA%B0%80%20%EC%97%AC%EC%88%98",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 4980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%BD%83%EB%8F%8C%EA%B2%8C%EC%9E%A51%EB%B2%88%EA%B0%80%20%EC%97%AC%EC%88%98",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-02",
          "name": "쌍교숯불갈비 담양본점",
          "category": "korean",
          "categoryName": "한식 · 다 구워 나오는 명품 떡갈비",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "담양군 봉산면 양지리",
          "address": "전라남도 담양군 봉산면 송강정로 212",
          "phone": "061-382-0012",
          "lat": 35.2785,
          "lng": 126.9682,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "한우 떡갈비 (24,000원), 돼지갈비 (18,000원), 들깨수제비 (10,000원)",
          "amenities": [
                "완벌 구이 서빙",
                "수유실 & 기저귀교환대 완비",
                "넓은 야외 분수 정원",
                "초대형 주차장 300대"
          ],
          "reviewSummary": "호텔급 수유실과 기저귀 교환대가 있는 전국구 갈비 명가! 숯불에 완벽히 구워져 나오며, 고소한 들깨수제비와 부드러운 떡갈비는 아이들 최애 밥도둑입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 16200,
                      "url": "https://map.naver.com/v5/search/%EC%8C%8D%EA%B5%90%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EB%8B%B4%EC%96%91%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 5420,
                      "url": "https://map.kakao.com/?q=%EC%8C%8D%EA%B5%90%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EB%8B%B4%EC%96%91%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 4310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%8C%8D%EA%B5%90%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84%20%EB%8B%B4%EC%96%91%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-03",
          "name": "순천만 들마루 (순천 꼬막정식)",
          "category": "korean",
          "categoryName": "한식 · 순천만 꼬막정식/짱뚱어탕",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "순천시 순천만길",
          "address": "전라남도 순천시 순천만길 496",
          "phone": "061-741-5233",
          "lat": 34.9085,
          "lng": 127.5085,
          "hours": "09:00 ~ 20:30",
          "representativeMenu": "들마루 꼬막정식 (20,000원 - 꼬막전, 꼬막구이, 꼬막무침), 어린이 치즈돈까스 (9,000원)",
          "amenities": [
                "순천만국가정원 인접",
                "어린이 돈까스 구비",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "순천만 갈대밭과 국가정원 관람 후 들르기 좋은 곳. 꼬막전과 치즈돈까스가 있어 해산물 못 먹는 아이들도 배부르게 먹을 수 있습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4120,
                      "url": "https://map.naver.com/v5/search/%EC%88%9C%EC%B2%9C%EB%A7%8C%20%EB%93%A4%EB%A7%88%EB%A3%A8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 980,
                      "url": "https://map.kakao.com/?q=%EC%88%9C%EC%B2%9C%EB%A7%8C%20%EB%93%A4%EB%A7%88%EB%A3%A8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 760,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%88%9C%EC%B2%9C%EB%A7%8C%20%EB%93%A4%EB%A7%88%EB%A3%A8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-04",
          "name": "라피크 여수 (돌산 오션뷰 절벽카페)",
          "category": "brunch",
          "categoryName": "브런치 · 여수 바다 절벽 뷰카페",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "여수시 돌산읍 평사리",
          "address": "전라남도 여수시 돌산읍 무술목길 142-1",
          "phone": "061-642-2022",
          "lat": 34.6985,
          "lng": 127.7682,
          "hours": "09:00 ~ 21:00",
          "representativeMenu": "라피크 수제 베이커리 (6,000원~), 바다소금라떼, 유기농 착즙 과일주스",
          "amenities": [
                "몽돌해변 직통 연결 계단",
                "엘리베이터 완비",
                "아기의자 완비",
                "예술랜드 연계 대형주차장"
          ],
          "reviewSummary": "여수 예술랜드 바로 옆 절벽 위에 세워진 초대형 오션뷰 카페. 통창 너머 남해 바다가 장관이며 카페 아래 몽돌해변으로 내려가 아이와 돌멩이 놀이하기 좋습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 9820,
                      "url": "https://map.naver.com/v5/search/%EB%9D%BC%ED%94%BC%ED%81%AC%20%EC%97%AC%EC%88%98",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 3120,
                      "url": "https://map.kakao.com/?q=%EB%9D%BC%ED%94%BC%ED%81%AC%20%EC%97%AC%EC%88%98",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 2480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9D%BC%ED%94%BC%ED%81%AC%20%EC%97%AC%EC%88%98",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-05",
          "name": "승일식당 (담양 숯불돼지갈비)",
          "category": "korean",
          "categoryName": "한식 · 백년가게 담양 숯불갈비",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "담양군 담양읍 객사리",
          "address": "전라남도 담양군 담양읍 중앙로 98-1",
          "phone": "061-382-9011",
          "lat": 35.3215,
          "lng": 126.9852,
          "hours": "09:30 ~ 21:00",
          "representativeMenu": "숯불돼지갈비 (19,000원 - 석쇠 직화구이), 물냉면 (6,000원), 공기밥",
          "amenities": [
                "직화 완벌 구이",
                "죽녹원 도보 5분",
                "아기의자 완비",
                "대형 전용 주차장"
          ],
          "reviewSummary": "한식대첩과 백종원의 3대천왕에 방영된 명소. 연탄 숯불에 노릇하게 구워져 나와 가위로 쏙쏙 잘라주면 아이들이 밥 한 그릇 순식간에 비웁니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 12400,
                      "url": "https://map.naver.com/v5/search/%EC%8A%B9%EC%9D%BC%EC%8B%9D%EB%8B%B9%20%EB%8B%B4%EC%96%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 4120,
                      "url": "https://map.kakao.com/?q=%EC%8A%B9%EC%9D%BC%EC%8B%9D%EB%8B%B9%20%EB%8B%B4%EC%96%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 3210,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%8A%B9%EC%9D%BC%EC%8B%9D%EB%8B%B9%20%EB%8B%B4%EC%96%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-06",
          "name": "해빔 목포평화광장본점",
          "category": "korean",
          "categoryName": "한식 · 꽃게살비빔밥/바다분수뷰",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "목포시 상동",
          "address": "전라남도 목포시 미항로 83",
          "phone": "061-282-2770",
          "lat": 34.7912,
          "lng": 126.4285,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "꽃게살비빔밥 (14,000원), 멍게비빔밥, 바지락전 (15,000원), 보리굴비 정식",
          "amenities": [
                "평화광장 바다뷰 & 춤추는 바다분수",
                "어린이용 맑은 미역국 제공",
                "아기의자 완비",
                "공영주차장"
          ],
          "reviewSummary": "손으로 게살을 다 발라내어 부드러운 양념에 비벼 먹는 목포 명물. 맑은 소고기 미역국이 나와 어린 아이 밥 먹이기 좋고 평화광장 분수쇼 보기 편합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4820,
                      "url": "https://map.naver.com/v5/search/%ED%95%B4%EB%B9%94%20%EB%AA%A9%ED%8F%AC%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1280,
                      "url": "https://map.kakao.com/?q=%ED%95%B4%EB%B9%94%20%EB%AA%A9%ED%8F%AC%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%B4%EB%B9%94%20%EB%AA%A9%ED%8F%AC%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-07",
          "name": "인동주마을 목포본점",
          "category": "korean",
          "categoryName": "한식 · 꽃게장 & 홍어삼합 한상",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "목포시 옥암동",
          "address": "전라남도 목포시 복룡로34번길 6",
          "phone": "061-284-4770",
          "lat": 34.8085,
          "lng": 126.4385,
          "hours": "10:00 ~ 21:00",
          "representativeMenu": "인동주마을 한상 (4인 70,000원 - 간장게장+새우장+수육보쌈+홍어)",
          "amenities": [
                "푸짐한 수육보쌈 아이동반",
                "좌식/입식 가족룸",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "4인 한상에 간장게장과 돼지수육보쌈이 푸짐하게 차려져 나와 어른도 아이도 배터지게 먹을 수 있는 목포 가성비 최강의 가족 한상집입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3910,
                      "url": "https://map.naver.com/v5/search/%EC%9D%B8%EB%8F%99%EC%A3%BC%EB%A7%88%EC%9D%84%20%EB%AA%A9%ED%8F%AC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 980,
                      "url": "https://map.kakao.com/?q=%EC%9D%B8%EB%8F%99%EC%A3%BC%EB%A7%88%EC%9D%84%20%EB%AA%A9%ED%8F%AC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 760,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9D%B8%EB%8F%99%EC%A3%BC%EB%A7%88%EC%9D%84%20%EB%AA%A9%ED%8F%AC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-08",
          "name": "솔가숯불갈비 순천신대점",
          "category": "korean",
          "categoryName": "한식 · 하향식 무연 돼지갈비",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "순천시 해룡면 신대리",
          "address": "전라남도 순천시 해룡면 신대1길 6-25",
          "phone": "061-725-1123",
          "lat": 34.9385,
          "lng": 127.5512,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "수제 돼지갈비 (18,000원), 함흥냉면 (9,000원), 차돌된장찌개",
          "amenities": [
                "연기 없는 하향식 로스터",
                "개별 룸 완비",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "순천 신대지구 학부모들의 안심 외식 성지. 환기 시스템이 완벽해 냄새가 옷에 배지 않고 고기가 달콤 부드러워 아이들이 매우 좋아합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2980,
                      "url": "https://map.naver.com/v5/search/%EC%86%94%EA%B0%80%20%EC%88%9C%EC%B2%9C%EC%8B%A0%EB%8C%80%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 690,
                      "url": "https://map.kakao.com/?q=%EC%86%94%EA%B0%80%20%EC%88%9C%EC%B2%9C%EC%8B%A0%EB%8C%80%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 510,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%94%EA%B0%80%20%EC%88%9C%EC%B2%9C%EC%8B%A0%EB%8C%80%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-09",
          "name": "낙안읍성 미향식당",
          "category": "korean",
          "categoryName": "한식 · 낙안읍성 꼬막백반",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "순천시 낙안면 동내리",
          "address": "전라남도 순천시 낙안면 삼일로 63",
          "phone": "061-754-0497",
          "lat": 34.9045,
          "lng": 127.3412,
          "hours": "08:30 ~ 20:00",
          "representativeMenu": "꼬막정식 (18,000원), 불고기백반 (14,000원), 어린이 생선구이 (10,000원)",
          "amenities": [
                "낙안읍성 민속마을 정문 앞",
                "불고기 & 생선구이 아이식사",
                "아기의자 완비",
                "공영주차장"
          ],
          "reviewSummary": "조선시대 초가집이 살아 숨쉬는 낙안읍성 관람 전후 식사처. 달콤한 불고기와 노릇한 생선구이가 있어 전통마을 체험 후 아이 밥 먹이기 편합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%EB%82%99%EC%95%88%EC%9D%8D%EC%84%B1%20%EB%AF%B8%ED%96%A5%EC%8B%9D%EB%8B%B9",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 620,
                      "url": "https://map.kakao.com/?q=%EB%82%99%EC%95%88%EC%9D%8D%EC%84%B1%20%EB%AF%B8%ED%96%A5%EC%8B%9D%EB%8B%B9",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%82%99%EC%95%88%EC%9D%8D%EC%84%B1%20%EB%AF%B8%ED%96%A5%EC%8B%9D%EB%8B%B9",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeonnam-10",
          "name": "나폴리횟집 여수돌산점",
          "category": "korean",
          "categoryName": "한식 · 오션뷰 룸 하모샤브샤브/활어회",
          "region": "jeonnam",
          "regionName": "전라남도",
          "district": "여수시 돌산읍 우두리",
          "address": "전라남도 여수시 돌산읍 하멜로 80",
          "phone": "061-644-8899",
          "lat": 34.7385,
          "lng": 127.7485,
          "hours": "11:00 ~ 22:30",
          "representativeMenu": "활어회 모둠 코스, 하모 갯장어 샤브샤브, 어린이 전복죽 & 튀김",
          "amenities": [
                "거북선대교 & 여수밤바다 뷰",
                "프라이빗 오션뷰 룸",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "통창으로 여수 케이블카와 하멜등대 밤바다가 한눈에 보이는 독립 룸. 싱싱한 해산물과 아이용 튀김, 죽, 생선구이가 알차게 나옵니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EC%97%AC%EC%88%98%20%EB%82%98%ED%8F%B4%EB%A6%AC%ED%9A%9F%EC%A7%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EC%97%AC%EC%88%98%20%EB%82%98%ED%8F%B4%EB%A6%AC%ED%9A%9F%EC%A7%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 610,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%97%AC%EC%88%98%20%EB%82%98%ED%8F%B4%EB%A6%AC%ED%9A%9F%EC%A7%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-01",
          "name": "용지봉 대구들안길점",
          "category": "korean",
          "categoryName": "한식 · 한식대첩4 우승 한정식 갈비코스",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "수성구 상동",
          "address": "대구광역시 수성구 들안로 9",
          "phone": "053-768-7707",
          "lat": 35.8312,
          "lng": 128.6185,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "용지봉 코스 (65,000원 - 숯불갈비+해물전복+궁중한정식), 한우 갈비살 (38,000원)",
          "amenities": [
                "전좌석 독립 룸",
                "아기의자 완비",
                "발렛파킹 무료",
                "유아식기 제공"
          ],
          "reviewSummary": "OliveTV 한식대첩4 최종 우승 명인의 집! 격조 높은 개별 룸에서 부드러운 숯불갈비와 잡채, 전복요리를 아이들과 우아하게 맛볼 수 있습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 4120,
                      "url": "https://map.naver.com/v5/search/%EC%9A%A9%EC%A7%80%EB%B4%89%20%EB%8C%80%EA%B5%AC%EB%93%A4%EC%95%88%EA%B8%B8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 1180,
                      "url": "https://map.kakao.com/?q=%EC%9A%A9%EC%A7%80%EB%B4%89%20%EB%8C%80%EA%B5%AC%EB%93%A4%EC%95%88%EA%B8%B8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 920,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%9A%A9%EC%A7%80%EB%B4%89%20%EB%8C%80%EA%B5%AC%EB%93%A4%EC%95%88%EA%B8%B8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-02",
          "name": "서민갈비 대구들안길본점",
          "category": "korean",
          "categoryName": "한식 · 구워주는 돼지갈비",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "수성구 두산동",
          "address": "대구광역시 수성구 들안로 8-1",
          "phone": "053-761-2268",
          "lat": 35.8305,
          "lng": 128.6192,
          "hours": "11:30 ~ 23:00",
          "representativeMenu": "김재동 갈비 (13,000원 - 직원이 다 구워줌), 해물뚝배기 된장찌개",
          "amenities": [
                "전담 직원이 고기 전량 구워줌",
                "어린이 놀이방 완비",
                "초대형 주차장 & 주차요원 5명",
                "아기의자 완비"
          ],
          "reviewSummary": "들안길 먹거리타운의 전설! 직원이 고기를 처음부터 끝까지 구워주어 아이 동반 부모들이 손 하나 까딱 안 하고 편하게 식사할 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 9210,
                      "url": "https://map.naver.com/v5/search/%EC%84%9C%EB%AF%BC%EA%B0%88%EB%B9%84%20%EB%93%A4%EC%95%88%EA%B8%B8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 3120,
                      "url": "https://map.kakao.com/?q=%EC%84%9C%EB%AF%BC%EA%B0%88%EB%B9%84%20%EB%93%A4%EC%95%88%EA%B8%B8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 2480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EB%AF%BC%EA%B0%88%EB%B9%84%20%EB%93%A4%EC%95%88%EA%B8%B8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-03",
          "name": "풍국면 침산본점",
          "category": "korean",
          "categoryName": "한식 · 1933 국수종가",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "북구 침산동",
          "address": "대구광역시 북구 침산로 168",
          "phone": "053-351-3377",
          "lat": 35.8895,
          "lng": 128.5885,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "별표국수 (7,000원 - 5시간 우린 통영 멸치육수), 마늘불고기 (11,000원), 주먹밥 (4,000원)",
          "amenities": [
                "아이 먹기 딱 좋은 미지근한 온도 육수",
                "아기의자 완비",
                "유아식기 제공",
                "건물 주차장"
          ],
          "reviewSummary": "대한민국 국수의 원조. 뜨겁지 않고 먹기 좋은 최적의 온도로 나와 아이들이 후루룩 바로 먹을 수 있고, 달콤한 마늘불고기와 주먹밥 조합이 최고입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4820,
                      "url": "https://map.naver.com/v5/search/%ED%92%8D%EA%B5%AD%EB%A9%B4%20%EC%B9%A8%EC%82%B0%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1420,
                      "url": "https://map.kakao.com/?q=%ED%92%8D%EA%B5%AD%EB%A9%B4%20%EC%B9%A8%EC%82%B0%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%92%8D%EA%B5%AD%EB%A9%B4%20%EC%B9%A8%EC%82%B0%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-04",
          "name": "라라코스트 대구월성점",
          "category": "western",
          "categoryName": "양식 · 대형키즈존 패밀리레스토랑",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "달서구 월성동",
          "address": "대구광역시 달서구 조암로 38 2층",
          "phone": "053-638-3230",
          "lat": 35.8285,
          "lng": 128.5285,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "불고기 필라프 (10,900원), 베이컨 토마토 파스타 (9,900원), 탄산음료 & 커피 무료",
          "amenities": [
                "초대형 트램펄린 & 미끄럼틀 놀이방",
                "탄산음료 무한리필 무료",
                "아기의자 완비",
                "지하주차장"
          ],
          "reviewSummary": "달서구 월성동에서 놀이방 시설이 가장 잘 갖춰진 패밀리 레스토랑. 가격 착하고 양 많으며 아이들이 놀이방에서 땀 흘리며 놀 수 있어 단체 모임에 최고!",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EB%8C%80%EA%B5%AC%EC%9B%94%EC%84%B1%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 890,
                      "url": "https://map.kakao.com/?q=%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EB%8C%80%EA%B5%AC%EC%9B%94%EC%84%B1%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 620,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EB%8C%80%EA%B5%AC%EC%9B%94%EC%84%B1%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-05",
          "name": "바르미스시뷔페 수성못점",
          "category": "japanese",
          "categoryName": "일식 · 수성못 오션뷰 스시 & 키즈뷔페",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "수성구 두산동",
          "address": "대구광역시 수성구 무학로 78 호텔수성 신관 2층",
          "phone": "053-764-0029",
          "lat": 35.8245,
          "lng": 128.6185,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "평일런치 (29,800원), 주말디너 (35,800원 - 이베리코 스테이크, 새우튀김, 메밀소바)",
          "amenities": [
                "수성못 파노라마 호수뷰",
                "실내 흐르는 시냇물 연못",
                "아기의자 완비",
                "호텔수성 대형주차 무료"
          ],
          "reviewSummary": "매장 한가운데 진짜 개울물이 흐르고 수성못 뷰가 환상적입니다. 즉석에서 구워주는 이베리코 스테이크와 새우튀김, 우동이 있어 아이들도 배부르게 즐깁니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 8420,
                      "url": "https://map.naver.com/v5/search/%EB%B0%94%EB%A5%B4%EB%AF%B8%EC%8A%A4%EC%8B%9C%EB%B7%94%ED%8E%98%20%EC%88%98%EC%84%B1%EB%AA%BB",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 2890,
                      "url": "https://map.kakao.com/?q=%EB%B0%94%EB%A5%B4%EB%AF%B8%EC%8A%A4%EC%8B%9C%EB%B7%94%ED%8E%98%20%EC%88%98%EC%84%B1%EB%AA%BB",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2190,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%94%EB%A5%B4%EB%AF%B8%EC%8A%A4%EC%8B%9C%EB%B7%94%ED%8E%98%20%EC%88%98%EC%84%B1%EB%AA%BB",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-06",
          "name": "청기와뼈다귀해장국 대구칠곡점",
          "category": "korean",
          "categoryName": "한식 · 감자탕 & 대형놀이방",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "북구 동천동",
          "address": "대구광역시 북구 팔거천동로 222",
          "phone": "053-324-8848",
          "lat": 35.9412,
          "lng": 128.5585,
          "hours": "24시간 영업 (연중무휴)",
          "representativeMenu": "뼈다귀전골 (32,000원), 어린이 돈까스 (8,000원), 볶음밥",
          "amenities": [
                "초대형 실내 놀이방 완비",
                "24시간 운영",
                "어린이 메뉴",
                "아기의자 완비",
                "전용 주차장"
          ],
          "reviewSummary": "대구 칠곡 3지구 엄마들의 성지! 2층 규모의 대형 놀이방이 있어 아이들이 밥 다 먹고 놀기 좋고 바삭한 어린이 돈까스가 있어 안심입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EC%B2%AD%EA%B8%B0%EC%99%80%EB%BC%88%EB%8B%A4%EA%B7%80%20%EC%B9%A0%EA%B3%A1%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 790,
                      "url": "https://map.kakao.com/?q=%EC%B2%AD%EA%B8%B0%EC%99%80%EB%BC%88%EB%8B%A4%EA%B7%80%20%EC%B9%A0%EA%B3%A1%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 580,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B2%AD%EA%B8%B0%EC%99%80%EB%BC%88%EB%8B%A4%EA%B7%80%20%EC%B9%A0%EA%B3%A1%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-07",
          "name": "대구근대골목단팥빵 본점",
          "category": "brunch",
          "categoryName": "브런치 · 근대역사거리 베이커리카페",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "중구 남성로",
          "address": "대구광역시 중구 남성로 7-1",
          "phone": "053-424-0000",
          "lat": 35.8675,
          "lng": 128.5895,
          "hours": "09:00 ~ 21:00",
          "representativeMenu": "생크림단팥빵 (3,500원), 콩떡콩떡 (3,800원), 아이스 모나카 아이스크림",
          "amenities": [
                "근대골목 투어 연계",
                "테라스 정원",
                "아기의자 완비",
                "유모차 진입 수월"
          ],
          "reviewSummary": "대구 근대역사문화골목 투어하며 아이와 들르기 좋은 곳. 동물성 생크림이 꽉 찬 생크림단팥빵과 아이스크림 모나카는 남녀노소 행복해지는 맛입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6210,
                      "url": "https://map.naver.com/v5/search/%EA%B7%BC%EB%8C%80%EA%B3%A8%EB%AA%A9%EB%8B%A8%ED%8C%A5%EB%B9%B5%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1890,
                      "url": "https://map.kakao.com/?q=%EA%B7%BC%EB%8C%80%EA%B3%A8%EB%AA%A9%EB%8B%A8%ED%8C%A5%EB%B9%B5%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B7%BC%EB%8C%80%EA%B3%A8%EB%AA%A9%EB%8B%A8%ED%8C%A5%EB%B9%B5%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-daegu-08",
          "name": "가야산생고기 달서점",
          "category": "korean",
          "categoryName": "한식 · 한우구이/프라이빗룸",
          "region": "daegu",
          "regionName": "대구광역시",
          "district": "달서구 본리동",
          "address": "대구광역시 달서구 대구공대로 39",
          "phone": "053-525-6692",
          "lat": 35.8395,
          "lng": 128.5412,
          "hours": "11:30 ~ 22:30",
          "representativeMenu": "한우 갈비살 (28,000원), 한우 맑은 곰탕 (11,000원), 소고기 버섯된장찌개",
          "amenities": [
                "프라이빗 온돌룸 완비",
                "아기의자 완비",
                "넓은 주차장",
                "유아식기 제공"
          ],
          "reviewSummary": "온돌방 개별 룸이 잘 되어 있어 갓난아기 눕혀놓고 식사하기 편한 곳. 맑고 진한 한우 곰탕 국물에 밥 말아주면 아이가 정말 잘 먹습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1820,
                      "url": "https://map.naver.com/v5/search/%EA%B0%80%EC%95%BC%EC%82%B0%EC%83%9D%EA%B3%A0%EA%B8%B0%20%EB%8B%AC%EC%84%9C%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 450,
                      "url": "https://map.kakao.com/?q=%EA%B0%80%EC%95%BC%EC%82%B0%EC%83%9D%EA%B3%A0%EA%B8%B0%20%EB%8B%AC%EC%84%9C%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 320,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%80%EC%95%BC%EC%82%B0%EC%83%9D%EA%B3%A0%EA%B8%B0%20%EB%8B%AC%EC%84%9C%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-01",
          "name": "경주 함양집 보문본점 (90년 전통)",
          "category": "korean",
          "categoryName": "한식 · 한우물회 & 어린이 치즈떡갈비",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "경주시 북군동 (보문단지)",
          "address": "경상북도 경주시 북군1길 10-1",
          "phone": "054-777-6947",
          "lat": 35.8585,
          "lng": 129.2512,
          "hours": "10:00 ~ 21:00 (수/목 휴무)",
          "representativeMenu": "전통비빔밥 (13,000원), 한우물회 (14,000원), 어린이 치즈불고기 (16,000원), 곰탕",
          "amenities": [
                "서빙 로봇 배달",
                "어린이 전용 치즈불고기",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "경주 보문단지 1등 맛집! 4대째 이어온 손맛으로 어른은 시원한 한우물회를, 아이는 치즈 듬뿍 올라간 달콤한 치즈불고기와 곰탕을 먹을 수 있어 온 가족 최고입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 14800,
                      "url": "https://map.naver.com/v5/search/%ED%95%A8%EC%96%91%EC%A7%91%20%EA%B2%BD%EC%A3%BC%EB%B3%B4%EB%AC%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 4920,
                      "url": "https://map.kakao.com/?q=%ED%95%A8%EC%96%91%EC%A7%91%20%EA%B2%BD%EC%A3%BC%EB%B3%B4%EB%AC%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4210,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%A8%EC%96%91%EC%A7%91%20%EA%B2%BD%EC%A3%BC%EB%B3%B4%EB%AC%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-02",
          "name": "교리김밥 보문단지점",
          "category": "korean",
          "categoryName": "한식 · 원조 달걀지단김밥 & 잔치국수",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "경주시 신평동",
          "address": "경상북도 경주시 보문로 424-11",
          "phone": "054-774-5130",
          "lat": 35.8545,
          "lng": 129.2785,
          "hours": "08:30 ~ 19:00 (화요일 휴무)",
          "representativeMenu": "교리김밥 2줄 (11,000원 - 푹신한 계란지단 듬뿍), 잔치국수 (7,500원)",
          "amenities": [
                "푹신한 계란지단 아이 원픽",
                "보문호수 산책로 인접",
                "아기의자 완비",
                "전용 주차장"
          ],
          "reviewSummary": "김밥 속이 부드러운 달걀지단으로 가득 차서 씹기 편하고 담백해 유아들이 정말 잘 먹습니다. 따끈한 잔치국수와 함께 가볍고 든든하게 먹기 좋습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 11200,
                      "url": "https://map.naver.com/v5/search/%EA%B5%90%EB%A6%AC%EA%B9%80%EB%B0%A5%20%EB%B3%B4%EB%AC%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 3420,
                      "url": "https://map.kakao.com/?q=%EA%B5%90%EB%A6%AC%EA%B9%80%EB%B0%A5%20%EB%B3%B4%EB%AC%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 2890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B5%90%EB%A6%AC%EA%B9%80%EB%B0%A5%20%EB%B3%B4%EB%AC%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-03",
          "name": "벤자마스 경주 (초대형 가든카페)",
          "category": "brunch",
          "categoryName": "브런치 · 리조트형 브런치 테마카페",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "경주시 동천동",
          "address": "경상북도 경주시 알천북로 368-11",
          "phone": "010-3805-6964",
          "lat": 35.8512,
          "lng": 129.2415,
          "hours": "10:00 ~ 24:00",
          "representativeMenu": "벤자마스 브런치 (16,000원), 프렌치토스트 (14,000원), 키즈 딸기요거트",
          "amenities": [
                "초대형 잔디광장 & 수영장 뷰 테라스",
                "아기의자 완비",
                "유모차 산책로",
                "대형 주차장 200대"
          ],
          "reviewSummary": "경주 3대 카페 중 가장 큰 규모! 야외 잔디밭에서 아이들이 비눗방울 불며 뛰어놀기 좋고 4개 동마다 분위기가 달라 온 가족 주말 쉼터로 최고입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 9420,
                      "url": "https://map.naver.com/v5/search/%EB%B2%A4%EC%9E%90%EB%A7%88%EC%8A%A4%20%EA%B2%BD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 3120,
                      "url": "https://map.kakao.com/?q=%EB%B2%A4%EC%9E%90%EB%A7%88%EC%8A%A4%20%EA%B2%BD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 2340,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B2%A4%EC%9E%90%EB%A7%88%EC%8A%A4%20%EA%B2%BD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-04",
          "name": "환여횟집 포항본점",
          "category": "korean",
          "categoryName": "한식 · 영일대 오션뷰 물회 & 어린이 전복죽",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "포항시 북구 두호동",
          "address": "경상북도 포항시 북구 해안로 189-1",
          "phone": "054-251-8847",
          "lat": 36.0585,
          "lng": 129.3782,
          "hours": "10:00 ~ 20:30",
          "representativeMenu": "물회국수 (17,000원 - 매운탕+소면+공기밥 포함), 어린이 전복죽 (7,000원)",
          "amenities": [
                "영일대 해수욕장 바다뷰",
                "어린이 전복죽 구비",
                "아기의자 완비",
                "공영주차장 인접"
          ],
          "reviewSummary": "포항 영일대 해수욕장의 독보적 1등 물회집. 과일 베이스의 깔끔한 육수와 함께 갓 끓여낸 고소한 어린이 전복죽이 있어 아이 동반 가족 필수 코스입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 15400,
                      "url": "https://map.naver.com/v5/search/%ED%99%98%EC%97%AC%ED%9A%9F%EC%A7%91%20%ED%8F%AC%ED%95%AD%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 5120,
                      "url": "https://map.kakao.com/?q=%ED%99%98%EC%97%AC%ED%9A%9F%EC%A7%91%20%ED%8F%AC%ED%95%AD%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%99%98%EC%97%AC%ED%9A%9F%EC%A7%91%20%ED%8F%AC%ED%95%AD%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-05",
          "name": "토함혜 경주보문점",
          "category": "korean",
          "categoryName": "한식 · 청국장 & 갈비찜 정식",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "경주시 하동",
          "address": "경상북도 경주시 보불로 262",
          "phone": "054-745-0445",
          "lat": 35.8112,
          "lng": 129.2895,
          "hours": "10:30 ~ 21:00",
          "representativeMenu": "청·갈·보 특선 (22,000원 - 청국장+매운/안매운갈비찜+보리밥), 떡갈비 (12,000원)",
          "amenities": [
                "안 매운 간장갈비찜 선택",
                "전통 한옥 온돌룸",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "불국사 가는 길목에 위치한 한옥 한정식. 냄새 없는 구수한 청국장과 아이 먹기 좋은 달콤한 간장갈비찜, 떡갈비가 일품이라 부모님과 아이 모두 만족합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%ED%86%A0%ED%95%A8%ED%98%9C%20%EA%B2%BD%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 890,
                      "url": "https://map.kakao.com/?q=%ED%86%A0%ED%95%A8%ED%98%9C%20%EA%B2%BD%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 680,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%86%A0%ED%95%A8%ED%98%9C%20%EA%B2%BD%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-06",
          "name": "솔가숯불갈비 포항이동점",
          "category": "korean",
          "categoryName": "한식 · 무연 수제 돼지갈비",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "포항시 남구 대이동",
          "address": "경상북도 포항시 남구 대이로 159",
          "phone": "054-277-1123",
          "lat": 36.0145,
          "lng": 129.3412,
          "hours": "11:00 ~ 22:00",
          "representativeMenu": "수제 돼지갈비 (18,000원), 함흥 물냉면 (9,000원), 소양념갈비",
          "amenities": [
                "연기 없는 하향식 환기 시스템",
                "프라이빗 룸",
                "아기의자 완비",
                "전용 주차장"
          ],
          "reviewSummary": "포항 이동에서 가족 모임으로 가장 깔끔한 고깃집. 연기가 전혀 안 올라와 아기 호흡기 걱정 없이 맛있는 숯불갈비를 즐길 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%EC%86%94%EA%B0%80%20%ED%8F%AC%ED%95%AD%EC%9D%B4%EB%8F%99%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EC%86%94%EA%B0%80%20%ED%8F%AC%ED%95%AD%EC%9D%B4%EB%8F%99%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%94%EA%B0%80%20%ED%8F%AC%ED%95%AD%EC%9D%B4%EB%8F%99%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-07",
          "name": "안동 종가찜닭 (안동구시장)",
          "category": "korean",
          "categoryName": "한식 · 원조 안동찜닭 골목",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "안동시 서부동",
          "address": "경상북도 안동시 번영1길 47 안동구시장 찜닭골목",
          "phone": "054-856-1313",
          "lat": 36.5645,
          "lng": 128.7285,
          "hours": "10:00 ~ 21:30",
          "representativeMenu": "안동찜닭 중 (32,000원 - 아이용 안 맵게 조절가능), 쪼림닭, 공기밥",
          "amenities": [
                "고추 뺀 순한맛 주문 가능",
                "쫄깃한 당면 아이들 인기",
                "아기의자 완비",
                "공영주차장 지원"
          ],
          "reviewSummary": "주문 시 '아이 먹게 고추 빼주세요' 하면 달짝지근한 간장 베이스로 조리해 줍니다. 부드러운 닭고기와 감자, 쫄깃한 당면에 밥 비벼주면 아이들이 환호합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 5420,
                      "url": "https://map.naver.com/v5/search/%EC%95%88%EB%8F%99%20%EC%A2%85%EA%B0%80%EC%B0%9C%EB%8B%AD",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1690,
                      "url": "https://map.kakao.com/?q=%EC%95%88%EB%8F%99%20%EC%A2%85%EA%B0%80%EC%B0%9C%EB%8B%AD",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 1280,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%95%88%EB%8F%99%20%EC%A2%85%EA%B0%80%EC%B0%9C%EB%8B%AD",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-08",
          "name": "까치구멍집 (안동 월영교 헛제사밥)",
          "category": "korean",
          "categoryName": "한식 · 50년 전통 헛제사밥 & 안동간고등어",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "안동시 상아동",
          "address": "경상북도 안동시 석주로 203 (월영교 바로 앞)",
          "phone": "054-855-1056",
          "lat": 36.5785,
          "lng": 128.7582,
          "hours": "11:00 ~ 20:30",
          "representativeMenu": "헛제사밥 (13,000원 - 탕국+나물+삼색전), 안동간고등어구이 (13,000원)",
          "amenities": [
                "맵지 않은 맑은 소고기 탕국",
                "월영교 야경 산책로 인접",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "고추장 대신 간장에 비벼 먹는 담백한 나물비빔밥과 맑은 탕국, 짭조름한 간고등어구이가 아이들 밥반찬으로 최고! 식후 월영교 산책하기도 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4310,
                      "url": "https://map.naver.com/v5/search/%EA%B9%8C%EC%B9%98%EA%B5%AC%EB%A9%8D%EC%A7%91%20%EC%95%88%EB%8F%99",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1280,
                      "url": "https://map.kakao.com/?q=%EA%B9%8C%EC%B9%98%EA%B5%AC%EB%A9%8D%EC%A7%91%20%EC%95%88%EB%8F%99",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B9%8C%EC%B9%98%EA%B5%AC%EB%A9%8D%EC%A7%91%20%EC%95%88%EB%8F%99",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-09",
          "name": "에스루프탑 포항효자점",
          "category": "western",
          "categoryName": "양식 · 형산강변 루프탑 패밀리레스토랑",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "포항시 남구 효자동",
          "address": "경상북도 포항시 남구 효자동길 10번길 33",
          "phone": "054-278-8880",
          "lat": 36.0085,
          "lng": 129.3312,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "안심스테이크 (45,000원), 게살크림파스타 (18,000원), 고르곤졸라 피자",
          "amenities": [
                "형산강 리버뷰 테라스",
                "아기의자 완비",
                "유모차 진입 수월",
                "강변 주차장"
          ],
          "reviewSummary": "포항 효자동 강변 뷰가 탁 트여 시원하고 파스타와 스테이크 맛이 훌륭합니다. 직원이 아이 식기와 의자를 친절하게 세팅해 줍니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 1980,
                      "url": "https://map.naver.com/v5/search/%EC%97%90%EC%8A%A4%EB%A3%A8%ED%94%84%ED%83%91%20%ED%8F%AC%ED%95%AD",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://map.kakao.com/?q=%EC%97%90%EC%8A%A4%EB%A3%A8%ED%94%84%ED%83%91%20%ED%8F%AC%ED%95%AD",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%97%90%EC%8A%A4%EB%A3%A8%ED%94%84%ED%83%91%20%ED%8F%AC%ED%95%AD",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongbuk-10",
          "name": "풀하우스 구미금오산점",
          "category": "korean",
          "categoryName": "한식 · 금오산 올레길 해물파전/수제비",
          "region": "gyeongbuk",
          "regionName": "경상북도",
          "district": "구미시 남통동",
          "address": "경상북도 구미시 금오산상가길 9-12",
          "phone": "054-453-2949",
          "lat": 36.1085,
          "lng": 128.3185,
          "hours": "11:00 ~ 23:00",
          "representativeMenu": "들깨수제비 (9,000원 - 아이추천), 해물파전 (16,000원), 닭볶음탕",
          "amenities": [
                "금오산 도립공원 & 올레길 인접",
                "야외 평상 테라스",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "금오산 저수지 올레길 산책 후 필수 코스. 고소하고 부드러운 들깨수제비 국물이 끝내주어 아이들이 그릇째 싹싹 비워냅니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%ED%92%80%ED%95%98%EC%9A%B0%EC%8A%A4%20%EA%B5%AC%EB%AF%B8%EA%B8%88%EC%98%A4%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 820,
                      "url": "https://map.kakao.com/?q=%ED%92%80%ED%95%98%EC%9A%B0%EC%8A%A4%20%EA%B5%AC%EB%AF%B8%EA%B8%88%EC%98%A4%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 610,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%92%80%ED%95%98%EC%9A%B0%EC%8A%A4%20%EA%B5%AC%EB%AF%B8%EA%B8%88%EC%98%A4%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-01",
          "name": "해운대 암소갈비집",
          "category": "korean",
          "categoryName": "한식 · 원조 한우 생갈비/감자사리",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "해운대구 중동",
          "address": "부산광역시 해운대구 중동2로10번길 32-10",
          "phone": "051-746-0033",
          "lat": 35.1632,
          "lng": 129.1654,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "한우 생갈비 (58,000원), 한우 양념갈비 (52,000원), 감자사리 (3,000원)",
          "amenities": [
                "전통 기와 한옥 독채 룸",
                "감자사리 아이 최애메뉴",
                "아기의자 완비",
                "넓은 전용 주차장"
          ],
          "reviewSummary": "부산을 대표하는 전설적인 한우 갈비. 고기가 살살 녹고 갈비 양념 국물에 졸여 먹는 쫄깃한 감자사리는 아이들이 환장하고 먹습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 16800,
                      "url": "https://map.naver.com/v5/search/%ED%95%B4%EC%9A%B4%EB%8C%80%20%EC%95%94%EC%86%8C%EA%B0%88%EB%B9%84%EC%A7%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 5420,
                      "url": "https://map.kakao.com/?q=%ED%95%B4%EC%9A%B4%EB%8C%80%20%EC%95%94%EC%86%8C%EA%B0%88%EB%B9%84%EC%A7%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 4890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%B4%EC%9A%B4%EB%8C%80%20%EC%95%94%EC%86%8C%EA%B0%88%EB%B9%84%EC%A7%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-02",
          "name": "바릇식당 기장본점",
          "category": "korean",
          "categoryName": "한식 · 기장 오션뷰 꼬막육전대판",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "기장군 일광읍 문오성길",
          "address": "부산광역시 기장군 일광읍 문오성길 61",
          "phone": "0507-1440-2366",
          "lat": 35.2715,
          "lng": 129.2585,
          "hours": "11:00 ~ 20:00",
          "representativeMenu": "꼬막육전대판 (37,000원 - 꼬막비빔밥+소고기육전+꼬막무침), 맑은 미역국",
          "amenities": [
                "2층 파노라마 기장 오션뷰",
                "부드러운 소고기육전 아이식사",
                "아기의자 완비",
                "해변 산책로"
          ],
          "reviewSummary": "눈앞에 펼쳐지는 푸른 동해 바다를 보며 먹는 꼬막대판! 고소한 소고기 육전과 따뜻한 미역국이 나와 어린 아이와 함께 오기 참 좋습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 13400,
                      "url": "https://map.naver.com/v5/search/%EA%B8%B0%EC%9E%A5%20%EB%B0%94%EB%A6%87%EC%8B%9D%EB%8B%B9",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 4120,
                      "url": "https://map.kakao.com/?q=%EA%B8%B0%EC%9E%A5%20%EB%B0%94%EB%A6%87%EC%8B%9D%EB%8B%B9",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 3820,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B8%B0%EC%9E%A5%20%EB%B0%94%EB%A6%87%EC%8B%9D%EB%8B%B9",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-03",
          "name": "칠암사계 (이흥용 베이커리 기장)",
          "category": "brunch",
          "categoryName": "브런치 · 바다전망 명장 베이커리카페",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "기장군 일광읍 칠암리",
          "address": "부산광역시 기장군 일광읍 칠암1길 7-10",
          "phone": "051-727-4900",
          "lat": 35.3012,
          "lng": 129.2645,
          "hours": "10:00 ~ 21:00",
          "representativeMenu": "칠암소금빵 (2개 4,500원), 명란바게트, 키즈 바닐라베어 케이크",
          "amenities": [
                "대한민국 제과명장 빵집",
                "야외 아트 가든 & 바다 산책로",
                "수유실 완비",
                "대형 주차타워"
          ],
          "reviewSummary": "기장 칠암 앞바다와 아트 가든이 어우러진 초대형 베이커리. 갓 구운 바삭 쫄깃한 소금빵이 나오는 시간마다 줄을 서며 수유실과 유모차 통로가 완벽합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%EC%B9%A0%EC%95%94%EC%82%AC%EA%B3%84%20%EA%B8%B0%EC%9E%A5",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 4680,
                      "url": "https://map.kakao.com/?q=%EC%B9%A0%EC%95%94%EC%82%AC%EA%B3%84%20%EA%B8%B0%EC%9E%A5",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 3910,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B9%A0%EC%95%94%EC%82%AC%EA%B3%84%20%EA%B8%B0%EC%9E%A5",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-04",
          "name": "풍원장 미역국정찬 마린시티점",
          "category": "korean",
          "categoryName": "한식 · 해운대 광안대교뷰 명품 미역국",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "해운대구 우동",
          "address": "부산광역시 해운대구 마린시티3로 51 더샵해운대아델리스 1층",
          "phone": "051-747-5115",
          "lat": 35.1552,
          "lng": 129.1442,
          "hours": "08:00 ~ 22:00",
          "representativeMenu": "조개미역국정찬 (17,000원), 소고기미역국정찬 (18,000원 - 12가지 반찬+가자미구이)",
          "amenities": [
                "광안대교 오션뷰",
                "아침 식사 가능 (08:00~)",
                "아기의자 완비",
                "아델리스 지하주차장"
          ],
          "reviewSummary": "뽀얗게 우러난 진국 소고기 미역국에 노릇한 생선구이, 잡채까지! 아침부터 오픈해서 영유아 아이 든든한 첫 끼 먹이기에 부산 최고의 식당입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 8920,
                      "url": "https://map.naver.com/v5/search/%ED%92%8D%EC%9B%90%EC%9E%A5%20%EB%AF%B8%EC%97%AD%EA%B5%AD%EC%A0%95%EC%B0%AC%20%EB%A7%88%EB%A6%B0%EC%8B%9C%ED%8B%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 2810,
                      "url": "https://map.kakao.com/?q=%ED%92%8D%EC%9B%90%EC%9E%A5%20%EB%AF%B8%EC%97%AD%EA%B5%AD%EC%A0%95%EC%B0%AC%20%EB%A7%88%EB%A6%B0%EC%8B%9C%ED%8B%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2190,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%92%8D%EC%9B%90%EC%9E%A5%20%EB%AF%B8%EC%97%AD%EA%B5%AD%EC%A0%95%EC%B0%AC%20%EB%A7%88%EB%A6%B0%EC%8B%9C%ED%8B%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-05",
          "name": "대게만찬 기장힐튼본점",
          "category": "korean",
          "categoryName": "한식 · 기장 오시리아 대게/킹크랩 코스",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "기장군 기장읍 시랑리",
          "address": "부산광역시 기장군 기장읍 기장해안로 266 더이스트인부산 3층",
          "phone": "051-722-2000",
          "lat": 35.1985,
          "lng": 129.2285,
          "hours": "11:00 ~ 21:50",
          "representativeMenu": "대게/킹크랩 찜 싯가, 기본 상차림 (생선회, 유린기, 버섯게살죽), 게장볶음밥",
          "amenities": [
                "전용 프라이빗 룸",
                "롯데월드 부산 & 힐튼 인접",
                "수유실 완비",
                "초대형 주차빌딩 500대"
          ],
          "reviewSummary": "오시리아 관광단지(롯데월드 부산, 루지) 바로 옆 더이스트 건물. 대게 껍질을 다 손질해 주어 아이들 먹이기 편하고 게살죽과 게장볶음밥이 꿀맛입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 7810,
                      "url": "https://map.naver.com/v5/search/%EB%8C%80%EA%B2%8C%EB%A7%8C%EC%B0%AC%20%EA%B8%B0%EC%9E%A5",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 2340,
                      "url": "https://map.kakao.com/?q=%EB%8C%80%EA%B2%8C%EB%A7%8C%EC%B0%AC%20%EA%B8%B0%EC%9E%A5",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8C%80%EA%B2%8C%EB%A7%8C%EC%B0%AC%20%EA%B8%B0%EC%9E%A5",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-06",
          "name": "더파티 해운대 프리미엄점",
          "category": "western",
          "categoryName": "양식 · 프리미엄 키즈친화 뷔페",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "해운대구 중동",
          "address": "부산광역시 해운대구 해운대해변로 298번길 24 팔레드시즈 지하1층",
          "phone": "051-744-7711",
          "lat": 35.1612,
          "lng": 129.1685,
          "hours": "12:00 ~ 21:30",
          "representativeMenu": "평일런치 뷔페 (38,000원), 주말디너 (53,000원), 유아전용 이유식 코너",
          "amenities": [
                "어린이 키즈시네마 & 놀이방",
                "유아 전용 이유식 & 식기 완비",
                "수유실 완비",
                "팔레드시즈 대형주차장"
          ],
          "reviewSummary": "부산 맘들이 돌잔치와 가족 모임으로 가장 선호하는 1등 뷔페. 놀이방과 키즈 시네마, 개월수별 유기농 이유식이 완비되어 부모 만족도가 압도적입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6420,
                      "url": "https://map.naver.com/v5/search/%EB%8D%94%ED%8C%8C%ED%8B%B0%20%ED%95%B4%EC%9A%B4%EB%8C%80%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1890,
                      "url": "https://map.kakao.com/?q=%EB%8D%94%ED%8C%8C%ED%8B%B0%20%ED%95%B4%EC%9A%B4%EB%8C%80%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1520,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8D%94%ED%8C%8C%ED%8B%B0%20%ED%95%B4%EC%9A%B4%EB%8C%80%ED%94%84%EB%A6%AC%EB%AF%B8%EC%97%84%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-07",
          "name": "쌍둥이돼지국밥 대연본점",
          "category": "korean",
          "categoryName": "한식 · 부산 원조 돼지국밥 & 수육백반",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "남구 대연동",
          "address": "부산광역시 남구 유엔평화로 35-1",
          "phone": "051-628-7020",
          "lat": 35.1325,
          "lng": 129.0912,
          "hours": "09:00 ~ 22:00",
          "representativeMenu": "수육백반 (11,000원 - 뽀얀 사골육수+항정수육), 돼지국밥 (9,000원)",
          "amenities": [
                "아이용 다대기 뺀 맑은 국물 무료",
                "부드러운 항정살 수육",
                "아기의자 완비",
                "전용 주차장"
          ],
          "reviewSummary": "부산 여행 온 가족들의 필수 코스. 다대기(양념장)를 빼고 주문하면 냄새 하나 없는 뽀얀 사골 국물에 부드러운 항정살 수육이 나와 아이들이 밥 한 그릇 말아 뚝딱합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 11800,
                      "url": "https://map.naver.com/v5/search/%EC%8C%8D%EB%91%A5%EC%9D%B4%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 3890,
                      "url": "https://map.kakao.com/?q=%EC%8C%8D%EB%91%A5%EC%9D%B4%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%8C%8D%EB%91%A5%EC%9D%B4%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-08",
          "name": "마담에뽀또 광안리본점",
          "category": "western",
          "categoryName": "양식 · 광안대교 뷰 프렌치 비스트로",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "수영구 민락동",
          "address": "부산광역시 수영구 광안해변로 295 2층",
          "phone": "051-755-1233",
          "lat": 35.1545,
          "lng": 129.1245,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "쉬림프 라따뚜이 파스타 (22,000원), 트러플 감자튀김 (12,000원), 어린이 오렌지에이드",
          "amenities": [
                "광안대교 파노라마 오션뷰",
                "아기의자 완비",
                "유모차 진입 수월",
                "건물 주차장"
          ],
          "reviewSummary": "광안리 해변 드론쇼와 광안대교 야경을 명당에서 볼 수 있는 곳. 바삭한 감자튀김과 자극적이지 않은 파스타가 있어 아이들과 분위기 내기 좋습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EB%A7%88%EB%8B%B4%EC%97%90%EB%BD%80%EB%98%90%20%EA%B4%91%EC%95%88%EB%A6%AC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EB%A7%88%EB%8B%B4%EC%97%90%EB%BD%80%EB%98%90%20%EA%B4%91%EC%95%88%EB%A6%AC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 620,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A7%88%EB%8B%B4%EC%97%90%EB%BD%80%EB%98%90%20%EA%B4%91%EC%95%88%EB%A6%AC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-09",
          "name": "정원오리구이 명지국제신도시점",
          "category": "korean",
          "categoryName": "한식 · 생오리로스 & 대형놀이방",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "강서구 명지동",
          "address": "부산광역시 강서구 명지국제8로 266 2층",
          "phone": "051-293-5292",
          "lat": 35.0985,
          "lng": 128.9185,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "생오리로스 한판 (48,000원), 어린이 오리죽 무료, 볶음밥",
          "amenities": [
                "대형 어린이 정글짐 놀이방",
                "통유리 테이블",
                "아기의자 완비",
                "지하주차장"
          ],
          "reviewSummary": "부산 강서구/명지국제신도시 부모들의 모임 명소! 놀이방이 매장 한가운데 통유리로 되어 있어 부모들이 안심하고 오리고기를 즐길 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%EC%A0%95%EC%9B%90%EC%98%A4%EB%A6%AC%EA%B5%AC%EC%9D%B4%20%EB%AA%85%EC%A7%80",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EC%A0%95%EC%9B%90%EC%98%A4%EB%A6%AC%EA%B5%AC%EC%9D%B4%20%EB%AA%85%EC%A7%80",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 510,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%A0%95%EC%9B%90%EC%98%A4%EB%A6%AC%EA%B5%AC%EC%9D%B4%20%EB%AA%85%EC%A7%80",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-10",
          "name": "예이제 한정식 해운대점",
          "category": "korean",
          "categoryName": "한식 · 고품격 전통 궁중한정식",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "해운대구 중동",
          "address": "부산광역시 해운대구 해운대해변로 298번길 29 2층",
          "phone": "051-746-1101",
          "lat": 35.1615,
          "lng": 129.1692,
          "hours": "12:00 ~ 21:30",
          "representativeMenu": "예찬 코스 (55,000원), 궁중 갈비찜, 어린이 잡채 & 미역국 반상",
          "amenities": [
                "개별 고급 한옥 룸",
                "아기의자 완비",
                "돌상 지원",
                "발렛파킹"
          ],
          "reviewSummary": "부산에서 격식 있는 가족 행사나 조부모님 칠순/팔순에 가장 많이 찾는 한정식. 정갈하고 자극 없는 궁중 요리로 아이들도 거부감 없이 잘 먹습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2450,
                      "url": "https://map.naver.com/v5/search/%EC%98%88%EC%9D%B4%EC%A0%9C%20%ED%95%9C%EC%A0%95%EC%8B%9D%20%ED%95%B4%EC%9A%B4%EB%8C%80",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 590,
                      "url": "https://map.kakao.com/?q=%EC%98%88%EC%9D%B4%EC%A0%9C%20%ED%95%9C%EC%A0%95%EC%8B%9D%20%ED%95%B4%EC%9A%B4%EB%8C%80",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%98%88%EC%9D%B4%EC%A0%9C%20%ED%95%9C%EC%A0%95%EC%8B%9D%20%ED%95%B4%EC%9A%B4%EB%8C%80",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-11",
          "name": "로빈뮤지엄 명지본점",
          "category": "brunch",
          "categoryName": "브런치 · 빈티지 키즈 토이카페",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "강서구 명지동",
          "address": "부산광역시 강서구 신호산단1로72번길 61",
          "phone": "051-271-4402",
          "lat": 35.0885,
          "lng": 128.8785,
          "hours": "11:00 ~ 18:00 (월요일 휴무)",
          "representativeMenu": "수제 핫도그 세트 (12,000원), 팬케이크 플레이트 (14,000원), 키즈 슬러시",
          "amenities": [
                "미국 빈티지 장난감 박물관",
                "클래식 자동차 포토존",
                "아기의자 완비",
                "주차 가능"
          ],
          "reviewSummary": "코카콜라, 디즈니, 레트로 장난감과 클래식 미니버스가 가득한 감성 카페! 아이들 인생 사진 찍어주기에 부산에서 가장 예쁜 곳입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%A1%9C%EB%B9%88%EB%AE%A4%EC%A7%80%EC%97%84%20%EB%AA%85%EC%A7%80",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 890,
                      "url": "https://map.kakao.com/?q=%EB%A1%9C%EB%B9%88%EB%AE%A4%EC%A7%80%EC%97%84%20%EB%AA%85%EC%A7%80",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 690,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A1%9C%EB%B9%88%EB%AE%A4%EC%A7%80%EC%97%84%20%EB%AA%85%EC%A7%80",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-12",
          "name": "롯데호텔부산 라세느 뷔페",
          "category": "western",
          "categoryName": "양식 · 5성급 호텔 최고급 뷔페",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "부산진구 부전동",
          "address": "부산광역시 부산진구 가야대로 772 롯데호텔부산 5층",
          "phone": "051-810-6390",
          "lat": 35.1565,
          "lng": 129.0552,
          "hours": "06:30 ~ 21:30",
          "representativeMenu": "주말 디너 뷔페 (155,000원), 양갈비구이, 랍스터, 어린이 키즈존 디저트",
          "amenities": [
                "호텔 최고급 수유실 & 기저귀교환대",
                "유아 식기 & 전용 컵",
                "아기의자 완비",
                "호텔 무료발렛"
          ],
          "reviewSummary": "특별한 날 가족 기념일에 최고의 선택! 최고급 랍스터와 양갈비부터 아이들을 위한 초콜릿 분수와 젤라또까지 호텔리어들의 완벽한 키즈 케어가 돋보입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 5810,
                      "url": "https://map.naver.com/v5/search/%EB%A1%AF%EB%8D%B0%ED%98%B8%ED%85%94%EB%B6%80%EC%82%B0%20%EB%9D%BC%EC%84%B8%EB%8A%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 1780,
                      "url": "https://map.kakao.com/?q=%EB%A1%AF%EB%8D%B0%ED%98%B8%ED%85%94%EB%B6%80%EC%82%B0%20%EB%9D%BC%EC%84%B8%EB%8A%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 1420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A1%AF%EB%8D%B0%ED%98%B8%ED%85%94%EB%B6%80%EC%82%B0%20%EB%9D%BC%EC%84%B8%EB%8A%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-13",
          "name": "튼튼식당 기장일광점",
          "category": "korean",
          "categoryName": "한식 · 샤브샤브 & 와규구이/오션뷰",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "기장군 일광읍 삼성리",
          "address": "부산광역시 기장군 일광읍 기장해안로 1284",
          "phone": "051-722-5554",
          "lat": 35.2612,
          "lng": 129.2385,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "와규 모둠구이 + 샤브샤브 세트 (28,000원), 칼국수 & 영양죽",
          "amenities": [
                "일광 해수욕장 바다뷰",
                "샤브샤브 + 소고기구이 동시 불판",
                "아기의자 완비",
                "전용 주차장"
          ],
          "reviewSummary": "특수 제작된 불판에서 한쪽은 소고기 구이를, 한쪽은 따끈한 샤브샤브를 동시에 즐기는 곳! 일광 바다가 보여 아이들이 좋아하고 칼국수와 죽까지 배부릅니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2190,
                      "url": "https://map.naver.com/v5/search/%ED%8A%BC%ED%8A%BC%EC%8B%9D%EB%8B%B9%20%EA%B8%B0%EC%9E%A5",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 520,
                      "url": "https://map.kakao.com/?q=%ED%8A%BC%ED%8A%BC%EC%8B%9D%EB%8B%B9%20%EA%B8%B0%EC%9E%A5",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 390,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%8A%BC%ED%8A%BC%EC%8B%9D%EB%8B%B9%20%EA%B8%B0%EC%9E%A5",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-busan-14",
          "name": "빕스 프리미어 서면점",
          "category": "western",
          "categoryName": "양식 · 패밀리 레스토랑 & 샐러드바",
          "region": "busan",
          "regionName": "부산광역시",
          "district": "부산진구 전포동",
          "address": "부산광역시 부산진구 동천로 4 2층",
          "phone": "051-806-1997",
          "lat": 35.1485,
          "lng": 129.0645,
          "hours": "10:30 ~ 22:00",
          "representativeMenu": "샐러드바 (47,900원), 얌스톤 안심스테이크 (59,000원), 와플 & 아이스크림",
          "amenities": [
                "어린이 키즈 놀이방 완비",
                "수유실 완비",
                "아기의자 완비",
                "대형 주차장"
          ],
          "reviewSummary": "서면에서 가장 넓은 실내 놀이방과 수유실을 갖춘 패밀리 레스토랑. 아이들이 좋아하는 즉석 와플 굽기와 초코퐁듀가 있어 가족 외식으로 든든합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4120,
                      "url": "https://map.naver.com/v5/search/%EB%B9%95%EC%8A%A4%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%96%B4%20%EC%84%9C%EB%A9%B4%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 980,
                      "url": "https://map.kakao.com/?q=%EB%B9%95%EC%8A%A4%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%96%B4%20%EC%84%9C%EB%A9%B4%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 760,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B9%95%EC%8A%A4%20%ED%94%84%EB%A6%AC%EB%AF%B8%EC%96%B4%20%EC%84%9C%EB%A9%B4%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-ulsan-01",
          "name": "언양 진미불고기 (수요미식회 언양석쇠불고기)",
          "category": "korean",
          "categoryName": "한식 · 한우 암소 언양불고기",
          "region": "ulsan",
          "regionName": "울산광역시",
          "district": "울주군 언양읍 동부리",
          "address": "울산광역시 울주군 언양읍 동문길 47",
          "phone": "052-262-5559",
          "lat": 35.5685,
          "lng": 129.1245,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "언양불고기 (22,000원 - 숯불석쇠구이), 된장찌개 (3,000원), 공기밥",
          "amenities": [
                "석쇠 완벌 구이 서빙",
                "야외 정원 & 분수대",
                "아기의자 완비",
                "넓은 전용 주차장 80대"
          ],
          "reviewSummary": "수요미식회와 1박2일 방영! 달콤 짭조름한 한우 암소 불고기를 숯불 석쇠에 바싹 구워내어 부드럽고 불향 가득해 아이들이 게 눈 감추듯 밥을 먹습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 9420,
                      "url": "https://map.naver.com/v5/search/%EC%96%B8%EC%96%91%20%EC%A7%84%EB%AF%B8%EB%B6%88%EA%B3%A0%EA%B8%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 3120,
                      "url": "https://map.kakao.com/?q=%EC%96%B8%EC%96%91%20%EC%A7%84%EB%AF%B8%EB%B6%88%EA%B3%A0%EA%B8%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 2680,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%96%B8%EC%96%91%20%EC%A7%84%EB%AF%B8%EB%B6%88%EA%B3%A0%EA%B8%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-ulsan-02",
          "name": "기와집 언양불고기 (100년 한옥)",
          "category": "korean",
          "categoryName": "한식 · 100년 전통 한옥 언양불고기",
          "region": "ulsan",
          "regionName": "울산광역시",
          "district": "울주군 언양읍 서부리",
          "address": "울산광역시 울주군 언양읍 헌양길 86",
          "phone": "052-262-4884",
          "lat": 35.5672,
          "lng": 129.1192,
          "hours": "11:00 ~ 20:50",
          "representativeMenu": "언양불고기 (22,000원), 육회 (30,000원), 비빔막국수 (6,000원)",
          "amenities": [
                "100년 고즈넉한 전통 한옥 정원",
                "아기의자 완비",
                "대기실 완비",
                "초대형 주차장 150대"
          ],
          "reviewSummary": "고풍스러운 100년 고택에서 즐기는 언양불고기. 정원 연못에 비단잉어가 헤엄쳐 아이들이 구경하기 좋고 석쇠에 구워 나와 연기 없이 깔끔하게 먹습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 12800,
                      "url": "https://map.naver.com/v5/search/%EA%B8%B0%EC%99%80%EC%A7%91%20%EC%96%B8%EC%96%91%EB%B6%88%EA%B3%A0%EA%B8%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 4210,
                      "url": "https://map.kakao.com/?q=%EA%B8%B0%EC%99%80%EC%A7%91%20%EC%96%B8%EC%96%91%EB%B6%88%EA%B3%A0%EA%B8%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B8%B0%EC%99%80%EC%A7%91%20%EC%96%B8%EC%96%91%EB%B6%88%EA%B3%A0%EA%B8%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-ulsan-03",
          "name": "경복궁 울산점",
          "category": "korean",
          "categoryName": "한식 · 숯불갈비 코스 & 프라이빗룸",
          "region": "ulsan",
          "regionName": "울산광역시",
          "district": "남구 달동",
          "address": "울산광역시 남구 번영로 167",
          "phone": "052-274-7777",
          "lat": 35.5395,
          "lng": 129.3245,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "생갈비 코스 (65,000원), 양념갈비 정식 (35,000원), 어린이 갈비탕",
          "amenities": [
                "전좌석 독립 룸",
                "돌상/환갑상 무료 대여",
                "아기의자 완비",
                "발렛파킹"
          ],
          "reviewSummary": "울산 삼산/달동에서 가족 모임 1순위. 전 객실이 독립 룸이라 아이가 돌아다녀도 편안하고 친절한 직원이 고기를 정성껏 구워줍니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3120,
                      "url": "https://map.naver.com/v5/search/%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%9A%B8%EC%82%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%9A%B8%EC%82%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 610,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%9A%B8%EC%82%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-ulsan-04",
          "name": "라라코스트 울산삼산점",
          "category": "western",
          "categoryName": "양식 · 대형키즈존 패밀리레스토랑",
          "region": "ulsan",
          "regionName": "울산광역시",
          "district": "남구 삼산동",
          "address": "울산광역시 남구 삼산로 277 3층",
          "phone": "052-260-3230",
          "lat": 35.5385,
          "lng": 129.3382,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "목살 필라프 (11,900원), 까르보나라 (10,900원), 마르게리따 피자 (13,900원)",
          "amenities": [
                "초대형 키즈존 & 볼풀 놀이방",
                "탄산음료 무한리필 무료",
                "아기의자 완비",
                "지하주차장"
          ],
          "reviewSummary": "삼산동 롯데백화점 인근. 볼풀장과 미끄럼틀이 있는 대형 놀이방이 식사 자리 옆에 있어 아이들 데리고 맘 편하게 파스타와 피자를 즐기기 최고입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EC%9A%B8%EC%82%B0%EC%82%BC%EC%82%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 820,
                      "url": "https://map.kakao.com/?q=%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EC%9A%B8%EC%82%B0%EC%82%BC%EC%82%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 610,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EC%9A%B8%EC%82%B0%EC%82%BC%EC%82%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-ulsan-05",
          "name": "태화강국가정원 만리장성",
          "category": "chinese",
          "categoryName": "중식 · 태화강 뷰 가족 중식코스",
          "region": "ulsan",
          "regionName": "울산광역시",
          "district": "중구 태화동",
          "address": "울산광역시 중구 신기길 115 2층",
          "phone": "052-246-8800",
          "lat": 35.5512,
          "lng": 129.2985,
          "hours": "11:00 ~ 21:00",
          "representativeMenu": "찹쌀 안심 탕수육 (28,000원), 삼선짜장면 (8,500원), 게살볶음밥 (10,000원)",
          "amenities": [
                "태화강 십리대숲 오션뷰",
                "프라이빗 룸",
                "아기의자 완비",
                "공영주차장 인접"
          ],
          "reviewSummary": "태화강 십리대숲과 국가정원 산책 후 들르기 좋은 중식당. 바삭하고 달콤한 탕수육과 고소한 게살볶음밥이 아이들에게 인기입니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2190,
                      "url": "https://map.naver.com/v5/search/%EB%A7%8C%EB%A6%AC%EC%9E%A5%EC%84%B1%20%ED%83%9C%ED%99%94%EA%B0%95",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 480,
                      "url": "https://map.kakao.com/?q=%EB%A7%8C%EB%A6%AC%EC%9E%A5%EC%84%B1%20%ED%83%9C%ED%99%94%EA%B0%95",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 380,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%A7%8C%EB%A6%AC%EC%9E%A5%EC%84%B1%20%ED%83%9C%ED%99%94%EA%B0%95",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-ulsan-06",
          "name": "삿포로 울산삼산점",
          "category": "japanese",
          "categoryName": "일식 · 정통 코스 & 어린이 치즈돈까스",
          "region": "ulsan",
          "regionName": "울산광역시",
          "district": "남구 달동",
          "address": "울산광역시 남구 번영로 167 2층",
          "phone": "052-267-7711",
          "lat": 35.5398,
          "lng": 129.3248,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "주말가족정식 (45,000원), 어린이 수제돈까스 세트 (14,000원), 모둠초밥",
          "amenities": [
                "전좌석 프라이빗 룸",
                "어린이 돈까스 세트",
                "아기의자 완비",
                "주차 완비"
          ],
          "reviewSummary": "조용하고 고급스러운 개별 룸 구조로 백일이나 생일 가족 모임에 최적. 바삭한 어린이 치즈돈까스와 우동이 나와 아이 식사 걱정이 없습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 2410,
                      "url": "https://map.naver.com/v5/search/%EC%82%BF%ED%8F%AC%EB%A1%9C%20%EC%9A%B8%EC%82%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 590,
                      "url": "https://map.kakao.com/?q=%EC%82%BF%ED%8F%AC%EB%A1%9C%20%EC%9A%B8%EC%82%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%82%BF%ED%8F%AC%EB%A1%9C%20%EC%9A%B8%EC%82%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-01",
          "name": "귀산동 플로팅717 (마창대교 오션뷰)",
          "category": "western",
          "categoryName": "양식 · 마창대교 바다전망 복합다이닝",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "창원시 성산구 귀산동",
          "address": "경상남도 창원시 성산구 삼귀로 193-6",
          "phone": "055-263-0001",
          "lat": 35.1685,
          "lng": 128.6185,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "화덕 고르곤졸라 피자 (21,000원), 안심 스테이크 (48,000원), 키즈 까르보나라",
          "amenities": [
                "마창대교 파노라마 오션뷰",
                "아기의자 완비",
                "유모차 진입 수월",
                "대형 주차장"
          ],
          "reviewSummary": "창원 귀산동 해안도로 랜드마크! 바다 바로 위에 떠 있는 듯한 환상적인 마창대교 뷰와 함께 화덕피자와 파스타를 아이들과 즐기기 최고입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4820,
                      "url": "https://map.naver.com/v5/search/%ED%94%8C%EB%A1%9C%ED%8C%85717%20%EC%B0%BD%EC%9B%90%EA%B7%80%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1280,
                      "url": "https://map.kakao.com/?q=%ED%94%8C%EB%A1%9C%ED%8C%85717%20%EC%B0%BD%EC%9B%90%EA%B7%80%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%94%8C%EB%A1%9C%ED%8C%85717%20%EC%B0%BD%EC%9B%90%EA%B7%80%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-02",
          "name": "하연옥 진주본점 (진주냉면 & 육전)",
          "category": "korean",
          "categoryName": "한식 · 80년 전통 진주냉면 & 쇠고기육전",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "진주시 이현동",
          "address": "경상남도 진주시 진주대로 1317-20",
          "phone": "055-746-0525",
          "lat": 35.2012,
          "lng": 128.0645,
          "hours": "10:00 ~ 20:30",
          "representativeMenu": "진주물냉면 (11,000원 - 육전고명 듬뿍), 소고기육전 (24,000원), 어린이 맑은 곰탕 무료",
          "amenities": [
                "어린이 사골곰탕 무료 제공",
                "부드러운 소고기육전 아이들 원픽",
                "아기의자 완비",
                "초대형 주차장"
          ],
          "reviewSummary": "해물육수에 육전이 듬뿍 올라간 진주냉면의 명가! 고소하고 부드러운 소고기육전과 무료로 제공되는 맑은 곰탕에 밥 말아주면 아이들이 감탄합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%ED%95%98%EC%97%B0%EC%98%A5%20%EC%A7%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 4890,
                      "url": "https://map.kakao.com/?q=%ED%95%98%EC%97%B0%EC%98%A5%20%EC%A7%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%98%EC%97%B0%EC%98%A5%20%EC%A7%84%EC%A3%BC%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-03",
          "name": "카사벨라 (김해 장유 율하 가든레스토랑)",
          "category": "western",
          "categoryName": "양식 · 3000평 비밀의 화원 스테이크/파스타",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "김해시 율하동",
          "address": "경상남도 김해시 율하2로11번길 45-12",
          "phone": "055-325-1188",
          "lat": 35.1785,
          "lng": 128.8085,
          "hours": "11:30 ~ 21:30",
          "representativeMenu": "안심스테이크 코스 (49,000원), 명란크림파스타 (19,000원), 키즈 오렌지주스",
          "amenities": [
                "3000평 야외 정원 & 산책로",
                "분수대 & 조각공원",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "숲속 동화나라에 온 듯 잘 가꿔진 대형 정원과 분수대! 아이들이 정원에서 꽃과 나무를 보며 산책하고 품격 있는 파스타를 맛볼 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3810,
                      "url": "https://map.naver.com/v5/search/%EC%B9%B4%EC%82%AC%EB%B2%A8%EB%9D%BC%20%EA%B9%80%ED%95%B4%EC%9C%A8%ED%95%98",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 940,
                      "url": "https://map.kakao.com/?q=%EC%B9%B4%EC%82%AC%EB%B2%A8%EB%9D%BC%20%EA%B9%80%ED%95%B4%EC%9C%A8%ED%95%98",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B9%B4%EC%82%AC%EB%B2%A8%EB%9D%BC%20%EA%B9%80%ED%95%B4%EC%9C%A8%ED%95%98",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-04",
          "name": "촌놈고기집 창원상남본점",
          "category": "korean",
          "categoryName": "한식 · 삼겹살/대형놀이방",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "창원시 성산구 상남동",
          "address": "경상남도 창원시 성산구 마디미로 3번길 10",
          "phone": "055-264-9292",
          "lat": 35.2215,
          "lng": 128.6812,
          "hours": "11:30 ~ 23:00",
          "representativeMenu": "숙성 삼겹살 (11,000원 - 구워주는 서비스), 돼지갈비 (11,000원), 차돌된장찌개",
          "amenities": [
                "대형 어린이 놀이방 완비",
                "직접 고기 구워줌",
                "아기의자 완비",
                "지하주차장"
          ],
          "reviewSummary": "창원 상남동에서 아이 있는 가족들이 가장 많이 찾는 식당. 놀이방 시설이 잘 되어 있고 직원이 고기를 처음부터 끝까지 구워주어 손이 편합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2890,
                      "url": "https://map.naver.com/v5/search/%EC%B4%8C%EB%86%88%EA%B3%A0%EA%B8%B0%EC%A7%91%20%EC%B0%BD%EC%9B%90%EC%83%81%EB%82%A8",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 690,
                      "url": "https://map.kakao.com/?q=%EC%B4%8C%EB%86%88%EA%B3%A0%EA%B8%B0%EC%A7%91%20%EC%B0%BD%EC%9B%90%EC%83%81%EB%82%A8",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 510,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B4%8C%EB%86%88%EA%B3%A0%EA%B8%B0%EC%A7%91%20%EC%B0%BD%EC%9B%90%EC%83%81%EB%82%A8",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-05",
          "name": "동피랑 통영명가",
          "category": "korean",
          "categoryName": "한식 · 굴코스요리 & 어린이 생선구이",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "통영시 동호동 (동피랑벽화마을 앞)",
          "address": "경상남도 통영시 동망산로 22",
          "phone": "055-649-0106",
          "lat": 34.8452,
          "lng": 128.4285,
          "hours": "09:30 ~ 20:30",
          "representativeMenu": "굴코스세트 (25,000원 - 굴전, 굴무침, 굴탕수, 굴밥), 어린이 생선구이 백반 (12,000원)",
          "amenities": [
                "동피랑 벽화마을 도보 3분",
                "어린이 생선구이 & 잡채",
                "아기의자 완비",
                "공영주차장"
          ],
          "reviewSummary": "동피랑 벽화마을 구경 전후 들르기 좋은 통영 1등 식당. 굴을 못 먹는 아이들을 위해 바삭한 굴탕수육과 노릇한 생선구이가 나와 온 가족이 만족합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 6210,
                      "url": "https://map.naver.com/v5/search/%ED%86%B5%EC%98%81%EB%AA%85%EA%B0%80%20%EB%8F%99%ED%94%BC%EB%9E%91",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1890,
                      "url": "https://map.kakao.com/?q=%ED%86%B5%EC%98%81%EB%AA%85%EA%B0%80%20%EB%8F%99%ED%94%BC%EB%9E%91",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%86%B5%EC%98%81%EB%AA%85%EA%B0%80%20%EB%8F%99%ED%94%BC%EB%9E%91",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-06",
          "name": "소노캄 거제 셰프스키친 (오션뷰 뷔페)",
          "category": "western",
          "categoryName": "양식 · 대명리조트 오션뷰 프리미엄 뷔페",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "거제시 일운면 소동리",
          "address": "경상남도 거제시 일운면 거제대로 2660 소노캄 거제 지하2층",
          "phone": "055-680-0230",
          "lat": 34.8512,
          "lng": 128.7185,
          "hours": "07:00 ~ 21:00",
          "representativeMenu": "조식 뷔페 (39,000원), 디너 뷔페 (75,000원), 키즈 전용 핑거푸드 코너",
          "amenities": [
                "오션베이 워터파크 연계",
                "남해 바다 파노라마 뷰",
                "수유실 완비",
                "리조트 대형 주차장"
          ],
          "reviewSummary": "거제 소노캄 오션베이 물놀이 후 가족 외식으로 완벽한 선택! 어린이 전용 식판과 키즈 메뉴, 디저트 코너가 화려해 아이들이 무척 신나합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 4820,
                      "url": "https://map.naver.com/v5/search/%EC%86%8C%EB%85%B8%EC%BA%84%20%EA%B1%B0%EC%A0%9C%20%EC%85%B0%ED%94%84%EC%8A%A4%ED%82%A4%EC%B9%9C",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 1340,
                      "url": "https://map.kakao.com/?q=%EC%86%8C%EB%85%B8%EC%BA%84%20%EA%B1%B0%EC%A0%9C%20%EC%85%B0%ED%94%84%EC%8A%A4%ED%82%A4%EC%B9%9C",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%86%8C%EB%85%B8%EC%BA%84%20%EA%B1%B0%EC%A0%9C%20%EC%85%B0%ED%94%84%EC%8A%A4%ED%82%A4%EC%B9%9C",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-07",
          "name": "뽀로로빌리지 신세계김해점 식당가",
          "category": "brunch",
          "categoryName": "브런치 · 옥상 테마파크 & 키즈푸드코트",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "김해시 외동",
          "address": "경상남도 김해시 김해대로 2232 신세계백화점 김해점 5층",
          "phone": "055-272-1114",
          "lat": 35.2285,
          "lng": 128.8712,
          "hours": "10:30 ~ 20:30",
          "representativeMenu": "돈까스 오므라이스 세트 (13,000원), 함박스테이크 (14,000원), 뽀로로 와플 (6,000원)",
          "amenities": [
                "옥상 뽀로로빌리지 테마파크",
                "백화점 유아휴게실 & 수유실",
                "아기의자 완비",
                "백화점 대형 주차장"
          ],
          "reviewSummary": "신세계백화점 옥상에 뽀로로빌리지 테마파크가 있어 아이들의 성지! 신나게 뽀로로 기차 타고 맛있는 식사와 디저트를 원스톱으로 즐길 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 7120,
                      "url": "https://map.naver.com/v5/search/%EB%BD%80%EB%A1%9C%EB%A1%9C%EB%B9%8C%EB%A6%AC%EC%A7%80%20%EA%B9%80%ED%95%B4%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 2190,
                      "url": "https://map.kakao.com/?q=%EB%BD%80%EB%A1%9C%EB%A1%9C%EB%B9%8C%EB%A6%AC%EC%A7%80%20%EA%B9%80%ED%95%B4%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1680,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%BD%80%EB%A1%9C%EB%A1%9C%EB%B9%8C%EB%A6%AC%EC%A7%80%20%EA%B9%80%ED%95%B4%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-08",
          "name": "바람의언덕 해금강회센터 거제",
          "category": "korean",
          "categoryName": "한식 · 해물뚝배기 & 생선구이",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "거제시 남부면 갈곶리",
          "address": "경상남도 거제시 남부면 해금강로 132",
          "phone": "055-633-1456",
          "lat": 34.7245,
          "lng": 128.6685,
          "hours": "09:00 ~ 20:30",
          "representativeMenu": "거제 해물뚝배기 (15,000원 - 딱새우, 전복, 가리비), 생선구이 정식 (15,000원)",
          "amenities": [
                "바람의언덕 & 신선대 인접",
                "맑은 조개탕 & 생선구이",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "거제도 명소 바람의언덕과 신선대 둘러보고 식사하기 딱 좋은 곳. 딱새우와 전복이 듬뿍 들어간 해물뚝배기와 짭조름한 생선구이가 아이들 밥반찬으로 훌륭합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 3420,
                      "url": "https://map.naver.com/v5/search/%EB%B0%94%EB%9E%8C%EC%9D%98%EC%96%B8%EB%8D%95%20%ED%95%B4%EA%B8%88%EA%B0%95%ED%9A%8C%EC%84%BC%ED%84%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.3,
                      "reviewCount": 780,
                      "url": "https://map.kakao.com/?q=%EB%B0%94%EB%9E%8C%EC%9D%98%EC%96%B8%EB%8D%95%20%ED%95%B4%EA%B8%88%EA%B0%95%ED%9A%8C%EC%84%BC%ED%84%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.3,
                      "reviewCount": 560,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%B0%94%EB%9E%8C%EC%9D%98%EC%96%B8%EB%8D%95%20%ED%95%B4%EA%B8%88%EA%B0%95%ED%9A%8C%EC%84%BC%ED%84%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-09",
          "name": "통영 해물천지",
          "category": "korean",
          "categoryName": "한식 · 푸짐한 해물조개전골",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "통영시 무전동",
          "address": "경상남도 통영시 무전6길 20-4",
          "phone": "055-643-8854",
          "lat": 34.8612,
          "lng": 128.4315,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "해물조개전골 3인 (55,000원 - 키조개, 문어, 전복), 칼국수 사리 (3,000원)",
          "amenities": [
                "맑고 맵지 않은 조개육수",
                "칼국수 사리 아이들 인기",
                "아기의자 완비",
                "주차 가능"
          ],
          "reviewSummary": "청양고추를 빼고 주문하면 맑고 시원한 천연 조개 육수가 완성됩니다. 전복과 조갯살을 잘라주고 칼국수 사리를 넣으면 아이들이 국물까지 싹 비웁니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2810,
                      "url": "https://map.naver.com/v5/search/%ED%86%B5%EC%98%81%20%ED%95%B4%EB%AC%BC%EC%B2%9C%EC%A7%80",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 620,
                      "url": "https://map.kakao.com/?q=%ED%86%B5%EC%98%81%20%ED%95%B4%EB%AC%BC%EC%B2%9C%EC%A7%80",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 480,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%86%B5%EC%98%81%20%ED%95%B4%EB%AC%BC%EC%B2%9C%EC%A7%80",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-gyeongnam-10",
          "name": "라라코스트 진주평거점",
          "category": "western",
          "categoryName": "양식 · 놀이방완비 패밀리레스토랑",
          "region": "gyeongnam",
          "regionName": "경상남도",
          "district": "진주시 평거동",
          "address": "경상남도 진주시 진양호로 266 2층",
          "phone": "055-748-3230",
          "lat": 35.1785,
          "lng": 128.0585,
          "hours": "11:00 ~ 21:30",
          "representativeMenu": "포크 스테이크 (14,900원), 불고기 피자 (13,900원), 음료 무료 무한",
          "amenities": [
                "대형 어린이 놀이방 완비",
                "진양호 호반공원 인접",
                "아기의자 완비",
                "주차 완비"
          ],
          "reviewSummary": "진양호 동물원 나들이 다녀오며 들르기 좋은 평거동 패밀리 레스토랑. 놀이방이 깨끗하고 가성비 좋은 스테이크와 피자가 있어 부모님들이 선호합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2410,
                      "url": "https://map.naver.com/v5/search/%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EC%A7%84%EC%A3%BC%ED%8F%89%EA%B1%B0%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 580,
                      "url": "https://map.kakao.com/?q=%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EC%A7%84%EC%A3%BC%ED%8F%89%EA%B1%B0%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 410,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%9D%BC%EB%9D%BC%EC%BD%94%EC%8A%A4%ED%8A%B8%20%EC%A7%84%EC%A3%BC%ED%8F%89%EA%B1%B0%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-01",
          "name": "숙성도 노형본점 (제주 흑돼지)",
          "category": "korean",
          "categoryName": "한식 · 720시간 교차숙성 흑돼지",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 노형동",
          "address": "제주특별자치도 제주시 원노형로 41",
          "phone": "064-711-5212",
          "lat": 33.4885,
          "lng": 126.4812,
          "hours": "11:30 ~ 22:00",
          "representativeMenu": "720 숙성 흑뼈목살 (38,000원), 교차숙성 흑돼지 (22,000원), 날치알볶음밥 (8,000원)",
          "amenities": [
                "직원이 고기 완벽 구워줌",
                "아기의자 완비",
                "유아식기 제공",
                "공영주차장 지원"
          ],
          "reviewSummary": "제주도 흑돼지 1티어 성지! 전문 그릴러가 아이 먹기 좋은 굽기와 크기로 육즙 가득하게 잘라주어 질기지 않고 연해 아이들이 감탄하며 폭풍 흡입합니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 17800,
                      "url": "https://map.naver.com/v5/search/%EC%88%99%EC%84%B1%EB%8F%84%20%EB%85%B8%ED%98%95%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 5890,
                      "url": "https://map.kakao.com/?q=%EC%88%99%EC%84%B1%EB%8F%84%20%EB%85%B8%ED%98%95%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 5120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%88%99%EC%84%B1%EB%8F%84%20%EB%85%B8%ED%98%95%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-02",
          "name": "춘심이네 서귀포본점 (원조 통갈치구이)",
          "category": "korean",
          "categoryName": "한식 · 제주 통갈치구이 해체쇼",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "서귀포시 안덕면 창천리",
          "address": "제주특별자치도 서귀포시 안덕면 창천중앙로24번길 16",
          "phone": "064-794-4010",
          "lat": 33.2785,
          "lng": 126.3685,
          "hours": "10:30 ~ 21:00",
          "representativeMenu": "통갈치구이 2인 (88,000원 - 직원이 가시 완벽 해체), 은갈치조림, 마끼 & 튀김",
          "amenities": [
                "직원이 숟가락으로 가시 완벽 제거",
                "어린이 마끼 & 잡채 반찬",
                "아기의자 완비",
                "대형 주차장 100대"
          ],
          "reviewSummary": "식탁을 가득 채우는 거대한 통갈치! 직원이 숟가락 두 개로 가시를 마술처럼 순식간에 발라주어 뽀얀 순살 갈칫살을 아이 밥 위에 듬뿍 얹어줄 수 있습니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%EC%B6%98%EC%8B%AC%EC%9D%B4%EB%84%A4%20%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 4890,
                      "url": "https://map.kakao.com/?q=%EC%B6%98%EC%8B%AC%EC%9D%B4%EB%84%A4%20%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 4310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B6%98%EC%8B%AC%EC%9D%B4%EB%84%A4%20%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-03",
          "name": "고집돌묵호 제주공항점",
          "category": "korean",
          "categoryName": "한식 · 돌우럭조림 & 어린이 무료 식판식",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 건입동",
          "address": "제주특별자치도 제주시 임항로 30",
          "phone": "0507-1436-1008",
          "lat": 33.5185,
          "lng": 126.5312,
          "hours": "10:00 ~ 21:30",
          "representativeMenu": "런치 셋트 A (24,000원 - 돌우럭조림+옥돔구이+낭푼밥), 어린이 전용 식판 무료제공",
          "amenities": [
                "어린이 특식 무료 식판 제공 (뽀로로식판)",
                "아기의자 완비",
                "공항 차로 7분",
                "넓은 전용 주차장"
          ],
          "reviewSummary": "아이 데려가면 뽀로로 자동차 식판에 계란말이, 미역국, 옥돔구이, 과일이 담긴 어린이 특식을 무료로 선물해주는 감동 식당! 제주 가족여행 1등 추천지입니다.",
          "overallRating": 4.9,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.9,
                      "reviewCount": 13800,
                      "url": "https://map.naver.com/v5/search/%EA%B3%A0%EC%A7%91%EB%8F%8C%EB%AC%B5%ED%98%B8%20%EC%A0%9C%EC%A3%BC%EA%B3%B5%ED%95%AD%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.7,
                      "reviewCount": 4620,
                      "url": "https://map.kakao.com/?q=%EA%B3%A0%EC%A7%91%EB%8F%8C%EB%AC%B5%ED%98%B8%20%EC%A0%9C%EC%A3%BC%EA%B3%B5%ED%95%AD%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.6,
                      "reviewCount": 3980,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B3%A0%EC%A7%91%EB%8F%8C%EB%AC%B5%ED%98%B8%20%EC%A0%9C%EC%A3%BC%EA%B3%B5%ED%95%AD%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-04",
          "name": "늘봄흑돼지 제주시내본점",
          "category": "korean",
          "categoryName": "한식 · 에스컬레이터 & 놀이방 초대형 흑돼지",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 노형동",
          "address": "제주특별자치도 제주시 한라대학로 12",
          "phone": "064-744-9001",
          "lat": 33.4812,
          "lng": 126.4745,
          "hours": "11:00 ~ 23:00",
          "representativeMenu": "늘봄 흑돼지 삼겹살 (22,000원), 점심특선 흑돼지정식 (15,000원 - 돌솥밥+된장찌개)",
          "amenities": [
                "어린이 실내 놀이방 완비",
                "매장 내 에스컬레이터 완비",
                "프라이빗 룸",
                "초대형 주차타워"
          ],
          "reviewSummary": "건물 안에 에스컬레이터가 있고 대형 어린이 놀이방과 수많은 룸이 완비된 제주시 최대 규모 고깃집. 점심특선 가성비가 훌륭하고 아이들이 편안해합니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 11200,
                      "url": "https://map.naver.com/v5/search/%EB%8A%98%EB%B4%84%ED%9D%91%EB%8F%BC%EC%A7%80%20%EC%A0%9C%EC%A3%BC",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 3420,
                      "url": "https://map.kakao.com/?q=%EB%8A%98%EB%B4%84%ED%9D%91%EB%8F%BC%EC%A7%80%20%EC%A0%9C%EC%A3%BC",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 2810,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8A%98%EB%B4%84%ED%9D%91%EB%8F%BC%EC%A7%80%20%EC%A0%9C%EC%A3%BC",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-05",
          "name": "하이엔드제주 애월본점",
          "category": "brunch",
          "categoryName": "브런치 · 애월 한담해변 오션뷰 베이커리카페",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 애월읍 애월리",
          "address": "제주특별자치도 제주시 애월읍 애월북서길 56",
          "phone": "070-4548-4433",
          "lat": 33.4612,
          "lng": 126.3112,
          "hours": "09:00 ~ 22:00",
          "representativeMenu": "용암식빵 (8,500원), 현무암쌀빵, 한라봉 젤라또 아이스크림, 키즈 감귤주스",
          "amenities": [
                "야외 백사장 빈백 쇼파",
                "한담해변 산책로 직결",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "에메랄드빛 애월 바다가 바로 코앞! 야외 하얀 빈백에 누워 아이들과 파도 소리 들으며 시원한 한라봉 젤라또와 빵을 즐기기에 최고로 이국적인 명소입니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 12400,
                      "url": "https://map.naver.com/v5/search/%ED%95%98%EC%9D%B4%EC%97%94%EB%93%9C%EC%A0%9C%EC%A3%BC%20%EC%95%A0%EC%9B%94",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 4120,
                      "url": "https://map.kakao.com/?q=%ED%95%98%EC%9D%B4%EC%97%94%EB%93%9C%EC%A0%9C%EC%A3%BC%20%EC%95%A0%EC%9B%94",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3420,
                      "url": "https://www.google.com/maps/search/?api=1&query=%ED%95%98%EC%9D%B4%EC%97%94%EB%93%9C%EC%A0%9C%EC%A3%BC%20%EC%95%A0%EC%9B%94",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-06",
          "name": "명진전복 구좌본점 (세화해변)",
          "category": "korean",
          "categoryName": "한식 · 수요미식회 전복돌솥밥 & 고등어구이",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 구좌읍 평대리",
          "address": "제주특별자치도 제주시 구좌읍 해맞이해안로 1282",
          "phone": "064-782-9944",
          "lat": 33.5385,
          "lng": 126.8512,
          "hours": "09:30 ~ 21:30 (화요일 휴무)",
          "representativeMenu": "전복돌솥밥 (15,000원), 전복구이 (30,000원), 전복죽 (12,000원 - 고등어구이 서비스)",
          "amenities": [
                "세화 평대 바다 파노라마 뷰",
                "기본 고등어구이 한마리 서비스",
                "아기의자 완비",
                "해안도로 주차"
          ],
          "reviewSummary": "수요미식회 전복 명가. 얇게 썬 전복이 가득 얹힌 돌솥밥과 서비스로 나오는 큼직한 노르웨이 고등어구이, 전복죽 누룽지가 있어 아이들이 한 그릇 뚝딱 비웁니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 15800,
                      "url": "https://map.naver.com/v5/search/%EB%AA%85%EC%A7%84%EC%A0%84%EB%B3%B5%20%EA%B5%AC%EC%A2%8C%EB%B3%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 5210,
                      "url": "https://map.kakao.com/?q=%EB%AA%85%EC%A7%84%EC%A0%84%EB%B3%B5%20%EA%B5%AC%EC%A2%8C%EB%B3%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 4310,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%AA%85%EC%A7%84%EC%A0%84%EB%B3%B5%20%EA%B5%AC%EC%A2%8C%EB%B3%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-07",
          "name": "착한전복 서귀포중문점",
          "category": "korean",
          "categoryName": "한식 · 전복샤브샤브 & 키즈놀이방",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "서귀포시 색달동 (중문관광단지)",
          "address": "제주특별자치도 서귀포시 일주서로 982",
          "phone": "064-738-8455",
          "lat": 33.2545,
          "lng": 126.4185,
          "hours": "08:00 ~ 21:30",
          "representativeMenu": "전복 소고기샤브샤브 (22,000원), 전복죽 (14,000원), 어린이 돈까스 (10,000원)",
          "amenities": [
                "어린이 실내 놀이방 완비",
                "중문관광단지 인접",
                "아기의자 완비",
                "넓은 주차장 60대"
          ],
          "reviewSummary": "중문관광단지에서 놀이방이 있는 귀한 식당! 신선한 활전복과 쇠고기 샤브샤브에 칼국수와 죽을 끓여 아이에게 먹일 수 있고 놀이방이 있어 아주 편안합니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 4310,
                      "url": "https://map.naver.com/v5/search/%EC%B0%A9%ED%95%9C%EC%A0%84%EB%B3%B5%20%EC%A4%91%EB%AC%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 1120,
                      "url": "https://map.kakao.com/?q=%EC%B0%A9%ED%95%9C%EC%A0%84%EB%B3%B5%20%EC%A4%91%EB%AC%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%B0%A9%ED%95%9C%EC%A0%84%EB%B3%B5%20%EC%A4%91%EB%AC%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-08",
          "name": "가시아방국수 성산본점",
          "category": "korean",
          "categoryName": "한식 · 수요미식회 고기국수 & 돔베고기",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "서귀포시 성산읍 고성리",
          "address": "제주특별자치도 서귀포시 성산읍 섭지코지로 10",
          "phone": "064-783-0987",
          "lat": 33.4512,
          "lng": 126.9185,
          "hours": "10:00 ~ 20:30 (수요일 휴무)",
          "representativeMenu": "고기국수 (9,000원 - 진한 사골육수), 돔베고기 (32,000원 - 부드러운 수육), 비빔국수",
          "amenities": [
                "아이용 양념장 뺀 사골국수",
                "돔베고기 아이들 원픽",
                "아기의자 완비",
                "넓은 전용 주차장"
          ],
          "reviewSummary": "섭지코지와 아쿠아플라넷 제주 관람 후 들르는 국수 명가. 깊고 진한 사골 육수에 도톰한 돔베고기가 듬뿍 올라가 아이들이 후루룩 한 그릇을 맛있게 비웁니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 14200,
                      "url": "https://map.naver.com/v5/search/%EA%B0%80%EC%8B%9C%EC%95%84%EB%B0%A9%EA%B5%AD%EC%88%98%20%EC%84%B1%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 4680,
                      "url": "https://map.kakao.com/?q=%EA%B0%80%EC%8B%9C%EC%95%84%EB%B0%A9%EA%B5%AD%EC%88%98%20%EC%84%B1%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 3820,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B0%80%EC%8B%9C%EC%95%84%EB%B0%A9%EA%B5%AD%EC%88%98%20%EC%84%B1%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-09",
          "name": "돈사돈 중문점",
          "category": "korean",
          "categoryName": "한식 · 연탄 직화 흑돼지 근고기",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "서귀포시 대포동",
          "address": "제주특별자치도 서귀포시 이어도로 168",
          "phone": "064-739-9592",
          "lat": 33.2412,
          "lng": 126.4385,
          "hours": "12:00 ~ 22:00 (목요일 휴무)",
          "representativeMenu": "제주산 흑돼지 근고기 600g (66,000원), 김치찌개 (8,000원)",
          "amenities": [
                "직원이 육즙 가득 구워줌",
                "아기의자 완비",
                "유아식기 제공",
                "넓은 주차장"
          ],
          "reviewSummary": "두툼한 목살을 육즙 터지게 완벽히 구워주는 직원의 스킬! 소금 살짝 찍어주면 어린 아이들도 질겨하지 않고 맛있다고 더 달라고 보챕니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 7810,
                      "url": "https://map.naver.com/v5/search/%EB%8F%88%EC%82%AC%EB%8F%88%20%EC%A4%91%EB%AC%B8%EC%A0%90",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 2340,
                      "url": "https://map.kakao.com/?q=%EB%8F%88%EC%82%AC%EB%8F%88%20%EC%A4%91%EB%AC%B8%EC%A0%90",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 1890,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%8F%88%EC%82%AC%EB%8F%88%20%EC%A4%91%EB%AC%B8%EC%A0%90",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-10",
          "name": "노티드도넛 제주애월점",
          "category": "brunch",
          "categoryName": "브런치 · 애월 야외정원 도넛 테마파크",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 애월읍 애월리",
          "address": "제주특별자치도 제주시 애월읍 애월로1길 24-9",
          "phone": "070-4415-9377",
          "lat": 33.4625,
          "lng": 126.3105,
          "hours": "10:00 ~ 20:00",
          "representativeMenu": "우유생크림 도넛 (3,900원), 제주 녹차도넛, 슈가베어 젤라또, 키즈 스티커 무료",
          "amenities": [
                "야외 야자수 정원 & 슈가베어 포토존",
                "어린이 색칠놀이 & 스티커 무료",
                "한담해변 인접",
                "유모차 진입 수월"
          ],
          "reviewSummary": "야자수 정원과 거대한 슈가베어 곰인형이 있어 아이들 천국! 입장하면 귀여운 컬러링 종이와 스티커를 무료로 나눠주어 아이들이 신나게 즐깁니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 11800,
                      "url": "https://map.naver.com/v5/search/%EB%85%B8%ED%8B%B0%EB%93%9C%20%EC%A0%9C%EC%A3%BC%EC%95%A0%EC%9B%94",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.5,
                      "reviewCount": 3890,
                      "url": "https://map.kakao.com/?q=%EB%85%B8%ED%8B%B0%EB%93%9C%20%EC%A0%9C%EC%A3%BC%EC%95%A0%EC%9B%94",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 3120,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EB%85%B8%ED%8B%B0%EB%93%9C%20%EC%A0%9C%EC%A3%BC%EC%95%A0%EC%9B%94",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-11",
          "name": "곽지국시 애월곽지점",
          "category": "korean",
          "categoryName": "한식 · 곽지과물해변 보말칼국수 & 만두",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "제주시 애월읍 곽지리",
          "address": "제주특별자치도 제주시 애월읍 일주서로 6027",
          "phone": "064-799-7942",
          "lat": 33.4485,
          "lng": 126.3082,
          "hours": "09:00 ~ 19:30",
          "representativeMenu": "보말칼국수 (10,000원 - 찐한 미역보말국물), 고기국수 (9,000원), 갈비만두 (6,000원)",
          "amenities": [
                "곽지과물해변 도보 5분",
                "달콤한 갈비만두 아이들 최애",
                "아기의자 완비",
                "주차 가능"
          ],
          "reviewSummary": "곽지해수욕장에서 아이와 모래놀이하고 들르기 좋은 따뜻한 국수집. 미역과 보말이 들어가 맵지 않고 진한 칼국수와 달콤한 갈비만두 조합이 참 좋습니다.",
          "overallRating": 4.7,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.7,
                      "reviewCount": 2890,
                      "url": "https://map.naver.com/v5/search/%EA%B3%BD%EC%A7%80%EA%B5%AD%EC%8B%9C%20%EC%95%A0%EC%9B%94",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.4,
                      "reviewCount": 680,
                      "url": "https://map.kakao.com/?q=%EA%B3%BD%EC%A7%80%EA%B5%AD%EC%8B%9C%20%EC%95%A0%EC%9B%94",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.4,
                      "reviewCount": 490,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EA%B3%BD%EC%A7%80%EA%B5%AD%EC%8B%9C%20%EC%95%A0%EC%9B%94",
                      "name": "구글 지도"
                }
          }
    },
    {
          "id": "rest-jeju-12",
          "name": "섭지코지로 성산점 (딱새우 & 고등어회)",
          "category": "korean",
          "categoryName": "한식 · 성산일출봉 가족 횟집 & 돔베고기",
          "region": "jeju",
          "regionName": "제주특별자치도",
          "district": "서귀포시 성산읍 고성리",
          "address": "제주특별자치도 서귀포시 성산읍 섭지코지로 26",
          "phone": "064-782-3450",
          "lat": 33.4525,
          "lng": 126.9212,
          "hours": "12:00 ~ 22:30",
          "representativeMenu": "딱새우회 + 고등어회 세트 (75,000원), 옥돔구이 (15,000원), 어린이 전복해물라면",
          "amenities": [
                "섭지코지 & 아쿠아플라넷 차로 3분",
                "노릇한 옥돔구이 아이식사",
                "아기의자 완비",
                "넓은 주차장"
          ],
          "reviewSummary": "아쿠아플라넷 제주 관람 후 들르는 가족 친화 횟집. 달달한 딱새우회와 함께 아이가 먹을 수 있는 노릇한 옥돔구이와 계란찜이 나와 편안하게 식사할 수 있습니다.",
          "overallRating": 4.8,
          "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
          "sources": {
                "naver": {
                      "rating": 4.8,
                      "reviewCount": 3810,
                      "url": "https://map.naver.com/v5/search/%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80%EB%A1%9C%20%EC%84%B1%EC%82%B0",
                      "name": "네이버 플레이스"
                },
                "kakao": {
                      "rating": 4.6,
                      "reviewCount": 920,
                      "url": "https://map.kakao.com/?q=%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80%EB%A1%9C%20%EC%84%B1%EC%82%B0",
                      "name": "카카오맵"
                },
                "google": {
                      "rating": 4.5,
                      "reviewCount": 780,
                      "url": "https://www.google.com/maps/search/?api=1&query=%EC%84%AD%EC%A7%80%EC%BD%94%EC%A7%80%EB%A1%9C%20%EC%84%B1%EC%82%B0",
                      "name": "구글 지도"
                }
          }
    }
  ]
};
