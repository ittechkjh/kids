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
    { id: 'pangyo', name: '분당·판교·위례' },
    { id: 'songpa', name: '강남·서초·송파' },
    { id: 'dongtan', name: '동탄·수원·광교' },
    { id: 'mapo', name: '마포·목동·용산' },
    { id: 'sejong', name: '세종·대전·충청' },
    { id: 'incheon', name: '인천·김포·일산' }
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
      id: 'rest-1',
      name: '서현궁 (분당 안현점)',
      category: 'korean',
      categoryName: '한식 · 숯불갈비 코스',
      region: 'pangyo',
      regionName: '분당·판교',
      address: '경기도 성남시 분당구 안골로 24 (서현동)',
      phone: '031-703-9133',
      lat: 37.3824,
      lng: 127.1428,
      hours: '매일 11:30 ~ 22:00 (연중무휴)',
      representativeMenu: '본양념갈비 한상 (42,000원), 보리굴비 정식 (31,000원)',
      amenities: ['아기의자 완비', '프라이빗 룸', '넓은 주차장(발렛)', '유모차 진입 수월', '어린이 식기'],
      reviewSummary: '개별 룸이 잘 되어 있어 아이와 함께 방문해도 조용히 식사할 수 있고, 고기를 직원이 직접 구워주셔서 아이 돌보며 먹기 최고입니다.',
      sources: {
        naver: {
          rating: 4.84,
          reviewCount: 3120,
          url: 'https://map.naver.com/v5/search/%EB%B6%84%EB%8B%B9%20%EC%84%9C%ED%98%84%EA%B5%89',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.5,
          reviewCount: 890,
          url: 'https://map.kakao.com/?q=%EB%B6%84%EB%8B%B9+%EC%84%9C%ED%98%84%EA%B5%89',
          name: '카카오맵'
        },
        google: {
          rating: 4.5,
          reviewCount: 640,
          url: 'https://www.google.com/maps/search/?api=1&query=%EB%B6%84%EB%8B%B9+%EC%84%9C%ED%98%84%EA%B5%89',
          name: '구글 지도'
        }
      },
      overallRating: 4.8
    },
    {
      id: 'rest-2',
      name: '플랩잭팬트리 (판교 백현본점)',
      category: 'brunch',
      categoryName: '브런치 · 올데이 팬케이크',
      region: 'pangyo',
      regionName: '분당·판교',
      address: '경기도 성남시 분당구 판교역로10번길 14-3 (백현동 카페거리)',
      phone: '031-709-0168',
      lat: 37.3879,
      lng: 127.1147,
      hours: '매일 10:30 ~ 21:00 (라스트오더 20:00)',
      representativeMenu: '더 버거팬 (18,900원), 올데이 브런치 (17,900원)',
      amenities: ['아기의자 완비', '유모차 진입 수월', '테라스석', '어린이 친화'],
      reviewSummary: '팬케이크 양이 푸짐하고 부드러워서 아이들이 정말 잘 먹어요. 백현동 카페거리 산책 후 들르기 좋은 패밀리 브런치 카페입니다.',
      sources: {
        naver: {
          rating: 4.81,
          reviewCount: 1920,
          url: 'https://map.naver.com/v5/search/%ED%94%8C%EB%9E%8D%EC%9E%AD%ED%8C%AC%ED%8A%B8%EB%A6%AC%20%ED%8C%90%EA%B5%90%EB%B3%B8%EC%A0%90',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.4,
          reviewCount: 530,
          url: 'https://map.kakao.com/?q=%ED%94%8C%EB%9E%8D%EC%9E%AD%ED%8C%AC%ED%8A%B8%EB%A6%AC+%ED%8C%90%EA%B5%90%EB%B3%B8%EC%A0%90',
          name: '카카오맵'
        },
        google: {
          rating: 4.4,
          reviewCount: 410,
          url: 'https://www.google.com/maps/search/?api=1&query=%ED%94%8C%EB%9E%8D%EC%9E%AD%ED%8C%AC%ED%8A%B8%EB%A6%AC+%ED%8C%90%EA%B5%90',
          name: '구글 지도'
        }
      },
      overallRating: 4.7
    },
    {
      id: 'rest-3',
      name: '벽제갈비 · 봉피양 (방이본점)',
      category: 'korean',
      categoryName: '한식 · 명품한우 & 평양냉면',
      region: 'songpa',
      regionName: '강남·서초·송파',
      address: '서울특별시 송파구 양재대로71길 1-4 (방이동)',
      phone: '02-415-5556',
      lat: 37.5085,
      lng: 127.1264,
      hours: '매일 11:30 ~ 22:00',
      representativeMenu: '한우 양념갈비 (62,000원), 봉피양 평양냉면 (16,000원)',
      amenities: ['아기의자 완비', '프라이빗 룸', '넓은 주차장(발렛)', '온돌좌식룸'],
      reviewSummary: '미쉐린 빕 구르망 선정 맛집으로 양념갈비가 연해서 유아들도 잘 먹습니다. 돌잔치나 어르신 모시는 가족 외식에 완벽한 룸 컨디션입니다.',
      sources: {
        naver: {
          rating: 4.88,
          reviewCount: 3650,
          url: 'https://map.naver.com/v5/search/%EB%B4%89%ED%94%BC%EC%96%91%20%EB%B0%A9%EC%9D%B4%EB%B3%B8%EC%A0%90',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.6,
          reviewCount: 1120,
          url: 'https://map.kakao.com/?q=%EB%B4%89%ED%94%BC%EC%96%91+%EB%B0%A9%EC%9D%B4%EB%B3%B8%EC%A0%90',
          name: '카카오맵'
        },
        google: {
          rating: 4.6,
          reviewCount: 1420,
          url: 'https://www.google.com/maps/search/?api=1&query=%EB%B4%89%ED%94%BC%EC%96%91+%EB%B0%A9%EC%9D%B4%EB%B3%B8%EC%A0%90',
          name: '구글 지도'
        }
      },
      overallRating: 4.9
    },
    {
      id: 'rest-4',
      name: '세상의 모든 아침 (여의도 전경련점)',
      category: 'western',
      categoryName: '양식 · 파노라마뷰 브런치 & 다이닝',
      region: 'mapo',
      regionName: '마포·목동·용산',
      address: '서울특별시 영등포구 여의대로 24 전경련회관 50층',
      phone: '02-2055-4442',
      lat: 37.5218,
      lng: 126.9242,
      hours: '매일 10:00 ~ 22:00 (브레이크타임 16:00~17:00)',
      representativeMenu: '트러플 머쉬룸 리조또 (29,000원), 바게트 프렌치토스트 (27,000원)',
      amenities: ['아기의자 완비', '주차 2시간 지원', '유모차 진입 엘리베이터', '수유실 인접'],
      reviewSummary: '50층에서 내려다보는 한강 뷰가 환상적이고 아기의자 배치와 직원 응대가 매우 친절합니다. 아이 생일이나 특별한 가족 기념일에 추천해요.',
      sources: {
        naver: {
          rating: 4.79,
          reviewCount: 4230,
          url: 'https://map.naver.com/v5/search/%EC%84%B8%EC%83%81%EC%9D%98%EB%AA%A8%EB%93%A0%EC%95%84%EC%B9%A8%20%EC%97%AC%EC%9D%98%EB%8F%84',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.3,
          reviewCount: 1450,
          url: 'https://map.kakao.com/?q=%EC%84%B8%EC%83%81%EC%9D%98%EB%AA%A8%EB%93%A0%EC%95%84%EC%B9%A8+%EC%97%AC%EC%9D%98%EB%8F%84',
          name: '카카오맵'
        },
        google: {
          rating: 4.4,
          reviewCount: 1890,
          url: 'https://www.google.com/maps/search/?api=1&query=%EC%84%B8%EC%83%81%EC%9D%98%EB%AA%A8%EB%93%A0%EC%95%84%EC%B9%A8+%EC%97%AC%EC%9D%98%EB%8F%84',
          name: '구글 지도'
        }
      },
      overallRating: 4.7
    },
    {
      id: 'rest-5',
      name: '어반리st (동탄본점)',
      category: 'brunch',
      categoryName: '대형 베이커리 & 키즈존 카페',
      region: 'dongtan',
      regionName: '동탄·수원·광교',
      address: '경기도 화성시 장지로 60-12 (장지동)',
      phone: '031-376-7888',
      lat: 37.1685,
      lng: 127.1215,
      hours: '매일 10:00 ~ 22:00',
      representativeMenu: '소금빵 & 몽블랑 베이커리 (4,500원~), 시그니처 크림라떼 (7,500원)',
      amenities: ['키즈룸/놀이방', '수유실 완비', '300대 대형주차', '유모차 이동 수월', '아기의자 완비'],
      reviewSummary: '실내에 수유실과 기저귀 교환대, 미니 아케이드 키즈존이 완벽하게 갖춰진 경기 남부 최대 베이커리 카페! 주말에 유모차 끌고 오기 1순위입니다.',
      sources: {
        naver: {
          rating: 4.85,
          reviewCount: 5120,
          url: 'https://map.naver.com/v5/search/%EC%96%B4%EB%B0%98%EB%A6%ACst%20%EB%8F%99%ED%83%84',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.6,
          reviewCount: 1410,
          url: 'https://map.kakao.com/?q=%EC%96%B4%EB%B0%98%EB%A6%ACst+%EB%8F%99%ED%83%84',
          name: '카카오맵'
        },
        google: {
          rating: 4.6,
          reviewCount: 980,
          url: 'https://www.google.com/maps/search/?api=1&query=%EC%96%B4%EB%B0%98%EB%A6%ACst+%EB%8F%99%ED%83%84',
          name: '구글 지도'
        }
      },
      overallRating: 4.8
    },
    {
      id: 'rest-6',
      name: '경복궁 & 삿포로 (동탄점)',
      category: 'korean',
      categoryName: '한식 · 숯불갈비 코스 & 일식',
      region: 'dongtan',
      regionName: '동탄·수원·광교',
      address: '경기도 화성시 큰재봉길 31-15 (석우동)',
      phone: '031-8003-8884',
      lat: 37.2152,
      lng: 127.0812,
      hours: '매일 11:30 ~ 22:00 (브레이크타임 15:00~17:00)',
      representativeMenu: '양념갈비 코스 (48,000원), 주말 가족 특선 (39,000원)',
      amenities: ['아기의자 완비', '전실 프라이빗 룸', '넓은 주차장', '어린이 미역국 무료'],
      reviewSummary: '생일이나 백일/돌 때 예약하면 아이용 미역국과 반찬을 정성스럽게 서비스해주셔서 감동받았습니다. 전실 룸이라 방해받지 않아 좋아요.',
      sources: {
        naver: {
          rating: 4.82,
          reviewCount: 1870,
          url: 'https://map.naver.com/v5/search/%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EB%8F%99%ED%83%84%EC%A0%90',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.5,
          reviewCount: 490,
          url: 'https://map.kakao.com/?q=%EA%B2%BD%EB%B3%B5%EA%B6%81+%EB%8F%99%ED%83%84%EC%A0%90',
          name: '카카오맵'
        },
        google: {
          rating: 4.5,
          reviewCount: 360,
          url: 'https://www.google.com/maps/search/?api=1&query=%EA%B2%BD%EB%B3%B5%EA%B6%81+%EB%8F%99%ED%83%84%EC%A0%90',
          name: '구글 지도'
        }
      },
      overallRating: 4.8
    },
    {
      id: 'rest-7',
      name: '산장가든 (세종 조치원)',
      category: 'korean',
      categoryName: '한식 · 30년 전통 숯불갈비',
      region: 'sejong',
      regionName: '세종·대전·충청',
      address: '세종특별자치시 연서면 도신고복로 1131-7',
      phone: '044-867-3333',
      lat: 36.5942,
      lng: 127.2415,
      hours: '매일 11:00 ~ 21:00 (연중무휴)',
      representativeMenu: '원조 숯불갈비 (19,000원), 매운 숯불갈비 (20,000원)',
      amenities: ['아기의자 완비', '넓은 야외 정원', '대형 주차장', '룸 완비'],
      reviewSummary: '고기가 다 구워져 나와 냄새나 연기 걱정 없이 아이와 먹기 너무 편해요. 식사 후 잔디 정원에서 아이 뛰어놀기도 좋습니다.',
      sources: {
        naver: {
          rating: 4.87,
          reviewCount: 4180,
          url: 'https://map.naver.com/v5/search/%EC%82%B0%EC%9E%A5%EA%B0%80%EB%93%A0%20%EC%84%B8%EC%82%AC',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.6,
          reviewCount: 1340,
          url: 'https://map.kakao.com/?q=%EC%82%B0%EC%9E%A5%EA%B0%80%EB%93%A0+%EC%84%B8%EC%A2%85',
          name: '카카오맵'
        },
        google: {
          rating: 4.5,
          reviewCount: 890,
          url: 'https://www.google.com/maps/search/?api=1&query=%EC%82%B0%EC%9E%A5%EA%B0%80%EB%93%A0+%EC%84%B8%EC%82%AC',
          name: '구글 지도'
        }
      },
      overallRating: 4.8
    },
    {
      id: 'rest-8',
      name: '백제원 (인천 송도본점)',
      category: 'korean',
      categoryName: '한식 · 숯불갈비 한정식',
      region: 'incheon',
      regionName: '인천·김포·일산',
      address: '인천광역시 연수구 해돋이로 157 (송도동)',
      phone: '032-831-2222',
      lat: 37.3915,
      lng: 126.6578,
      hours: '매일 11:30 ~ 22:00',
      representativeMenu: '한우 모둠 세트 (59,000원), 평일 점심 숯불구이 정식 (29,000원)',
      amenities: ['아기의자 완비', '독립 룸 완비', '넓은 주차장(발렛)', '어린이 식기'],
      reviewSummary: '송도 센트럴파크 인근 가족모임 성지! 아기 식판과 식기를 먼저 챙겨주시는 센스가 돋보이고 룸 인테리어가 고급스럽습니다.',
      sources: {
        naver: {
          rating: 4.83,
          reviewCount: 2410,
          url: 'https://map.naver.com/v5/search/%EB%B0%B1%EC%A0%9C%EC%9B%90%20%EC%86%A1%EB%8F%84',
          name: '네이버 플레이스'
        },
        kakao: {
          rating: 4.5,
          reviewCount: 780,
          url: 'https://map.kakao.com/?q=%EB%B0%B1%EC%A0%9C%EC%9B%90+%EC%86%A1%EB%8F%84',
          name: '카카오맵'
        },
        google: {
          rating: 4.5,
          reviewCount: 610,
          url: 'https://www.google.com/maps/search/?api=1&query=%EB%B0%B1%EC%A0%9C%EC%9B%90+%EC%86%A1%EB%8F%84',
          name: '구글 지도'
        }
      },
      overallRating: 4.8
    }
  ]
};
