// 도담톡 (DodamTalk) - 리치고(RichGo) 스타일 학군·학교 분석 & 2028 대입 개편안 데이터셋
window.DODAM_SCHOOLS_DATA = {
  "updatedAt": "2026-10-28",
  "levels": [
    {
      "id": "all",
      "name": "전체 모아보기",
      "icon": "fa-layer-group",
      "color": "slate"
    },
    {
      "id": "elementary",
      "name": "🎒 초등학교 (명문·사립초)",
      "icon": "fa-school",
      "color": "amber"
    },
    {
      "id": "middle",
      "name": "📚 중학교 (특목·자사고 순위)",
      "icon": "fa-book-open",
      "color": "emerald"
    },
    {
      "id": "high",
      "name": "🏛️ 고등학교 (서울대·의대 랭킹)",
      "icon": "fa-graduation-cap",
      "color": "indigo"
    },
    {
      "id": "kindergarten",
      "name": "🧸 유치원 (공·사립·영유)",
      "icon": "fa-shapes",
      "color": "pink"
    },
    {
      "id": "districts",
      "name": "🗺️ 전국 7대 명문 학군지",
      "icon": "fa-map-location-dot",
      "color": "rose"
    },
    {
      "id": "admissions",
      "name": "🎯 2028 대입 & 고입 가이드",
      "icon": "fa-bullseye",
      "color": "blue"
    }
  ],
  "schools": [
    {
      "id": "elem-haenuri",
      "level": "elementary",
      "name": "서울해누리초등학교",
      "publicPrivate": "공립 7년차",
      "establishedYear": "2019년 설립 (7년차)",
      "districtName": "서울 송파구 가락동",
      "region": "seoul",
      "regionName": "서울 송파",
      "grade": "1.1등급",
      "rankNation": "전국상위 3%",
      "rankRegion": "서울상위 25%",
      "districtRank": "송파구 초등 상위권",
      "summary": "헬리오시티 대단지 신설 명문초등학교로, 깨끗한 신축 스마트 시설과 해누리중학교 연계 진학으로 송파구에서 가장 주목받는 초등학교입니다.",
      "stats": {
        "classStudents": 23,
        "teacherStudents": 18,
        "seniorRatio": 51,
        "totalStudents": 1380,
        "benchClass": {
          "school": 23,
          "district": 22,
          "nation": 20
        },
        "benchTeacher": {
          "school": 18,
          "district": 16,
          "nation": 14
        },
        "benchSenior": {
          "school": 51,
          "district": 49,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "해누리중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "15%"
            },
            {
              "type": "과학고",
              "percent": "2%"
            },
            {
              "type": "외고",
              "percent": "5%"
            }
          ],
          "grade": "1등급"
        },
        {
          "name": "수서중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "5%"
            },
            {
              "type": "과학고",
              "percent": "1%"
            },
            {
              "type": "외고",
              "percent": "1%"
            }
          ],
          "grade": "1.5등급"
        },
        {
          "name": "가락중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "8%"
            },
            {
              "type": "과학고",
              "percent": "1%"
            },
            {
              "type": "외고",
              "percent": "3%"
            }
          ],
          "grade": "1.3등급"
        }
      ],
      "apartments": [
        {
          "name": "헬리오시티 1~5단지",
          "households": "9,510세대",
          "note": "단지 내 도보 통학 3분 (초품아)"
        },
        {
          "name": "가락 금호아파트",
          "households": "915세대",
          "note": "도보 7분"
        },
        {
          "name": "송파 한양1차",
          "households": "576세대",
          "note": "단지 인접"
        }
      ],
      "academies": {
        "mainDistrict": "방이동·가락동 학원가 (148개 밀집)",
        "distanceDaechi": "대치동 학원가 (차량 15분 / 대치 셔틀 다수 운행)",
        "popularFields": [
          "수학 심화·선행 전문",
          "대형 어학원(청담·에이프릴·정상)",
          "사고력 수학(CMS/소마)"
        ]
      },
      "features": [
        "헬리오시티 초품아",
        "신축 스마트스쿨",
        "해누리중 직결",
        "높은 고학년 비율"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://haenuri.sen.es.kr"
    },
    {
      "id": "elem-jamsil",
      "level": "elementary",
      "name": "서울잠실초등학교",
      "publicPrivate": "공립 48년차",
      "establishedYear": "1978년 설립 (재건축 신축)",
      "districtName": "서울 송파구 신천동",
      "region": "seoul",
      "regionName": "서울 송파",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "서울상위 5%",
      "districtRank": "송파구 초등 1위",
      "summary": "잠실 파크리오 대단지를 배후로 둔 송파 최고의 전통 명문초로, 잠실중학교로 연결되는 완벽한 학군 라인을 갖추고 있습니다.",
      "stats": {
        "classStudents": 25,
        "teacherStudents": 19,
        "seniorRatio": 53,
        "totalStudents": 1620,
        "benchClass": {
          "school": 25,
          "district": 22,
          "nation": 20
        },
        "benchTeacher": {
          "school": 19,
          "district": 16,
          "nation": 14
        },
        "benchSenior": {
          "school": 53,
          "district": 49,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "잠실중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "18%"
            },
            {
              "type": "과학고",
              "percent": "3%"
            },
            {
              "type": "외고",
              "percent": "6%"
            }
          ],
          "grade": "1등급"
        },
        {
          "name": "잠신중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "16%"
            },
            {
              "type": "과학고",
              "percent": "2%"
            },
            {
              "type": "외고",
              "percent": "5%"
            }
          ],
          "grade": "1등급"
        }
      ],
      "apartments": [
        {
          "name": "잠실 파크리오 1~3단지",
          "households": "6,864세대",
          "note": "단지 내 도보 통학"
        },
        {
          "name": "잠실 래미안아이파크 (진주재건축)",
          "households": "2,678세대",
          "note": "2025년 입주 예정"
        },
        {
          "name": "잠실 르엘 (미성크로바)",
          "households": "1,865세대",
          "note": "도보권"
        }
      ],
      "academies": {
        "mainDistrict": "잠실 학원사거리 (215개 학원 밀집)",
        "distanceDaechi": "대치동 학원가 (차량 12분 / 학원 셔틀망 완비)",
        "popularFields": [
          "올림피아드 수학",
          "토플/수능형 영어",
          "과학 실험탐구"
        ]
      },
      "features": [
        "파크리오 초품아",
        "잠실중 직결",
        "올림픽공원 쾌적환경",
        "고소득 전문직 학부모"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://jamsil.sen.es.kr"
    },
    {
      "id": "elem-daecheong",
      "level": "elementary",
      "name": "서울대청초등학교",
      "publicPrivate": "공립 34년차",
      "establishedYear": "1992년 설립",
      "districtName": "서울 강남구 개포동/대치동",
      "region": "seoul",
      "regionName": "서울 강남",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "서울상위 1%",
      "districtRank": "강남구 초등 최상위",
      "summary": "대치동 학원가 도보권이자 대청중학교로 배정되는 대한민국 최고 선호도의 공립초등학교로, 조기 학군 정착의 필수 코스로 꼽힙니다.",
      "stats": {
        "classStudents": 27,
        "teacherStudents": 20,
        "seniorRatio": 55,
        "totalStudents": 1150,
        "benchClass": {
          "school": 27,
          "district": 23,
          "nation": 20
        },
        "benchTeacher": {
          "school": 20,
          "district": 17,
          "nation": 14
        },
        "benchSenior": {
          "school": 55,
          "district": 50,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "대청중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "28%"
            },
            {
              "type": "과학고",
              "percent": "5%"
            },
            {
              "type": "외고",
              "percent": "7%"
            }
          ],
          "grade": "1등급 (전국 1위)"
        },
        {
          "name": "단국대학교사범대학부속중학교",
          "type": "사립 남학교",
          "rates": [
            {
              "type": "자사고",
              "percent": "24%"
            },
            {
              "type": "과학고",
              "percent": "3%"
            },
            {
              "type": "외고",
              "percent": "4%"
            }
          ],
          "grade": "1.1등급"
        }
      ],
      "apartments": [
        {
          "name": "디에이치 아너힐즈",
          "households": "1,320세대",
          "note": "도보 5분"
        },
        {
          "name": "개포래미안포레스트",
          "households": "2,296세대",
          "note": "도보 8분"
        },
        {
          "name": "개포자이 프레지던스",
          "households": "3,375세대",
          "note": "단지 인접"
        }
      ],
      "academies": {
        "mainDistrict": "대치동 은마사거리 학원가 (1,020개 밀집 도보 7분)",
        "distanceDaechi": "대치동 학원가 도보권 (라이딩 불필요)",
        "popularFields": [
          "의대 선행반",
          "KMO/영재교 대비반",
          "미국교과서 원서 독서토론"
        ]
      },
      "features": [
        "대치동 학원가 도보권",
        "대청중 직결 배정",
        "개포 신축 대단지",
        "초등 의대반 중심"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://daecheong.sen.es.kr"
    },
    {
      "id": "elem-mokun",
      "level": "elementary",
      "name": "서울목운초등학교",
      "publicPrivate": "공립 17년차",
      "establishedYear": "2009년 설립",
      "districtName": "서울 양천구 목동",
      "region": "seoul",
      "regionName": "서울 양천(목동)",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "서울상위 2%",
      "districtRank": "목동 학군 1위",
      "summary": "목동 7단지와 하이페리온 주민만 배정되는 명문초로, 전교생이 목운중학교로 100% 진학하는 프리미엄 때문에 전국 최고의 과밀 경쟁률을 보입니다.",
      "stats": {
        "classStudents": 31,
        "teacherStudents": 22,
        "seniorRatio": 56,
        "totalStudents": 1860,
        "benchClass": {
          "school": 31,
          "district": 24,
          "nation": 20
        },
        "benchTeacher": {
          "school": 22,
          "district": 18,
          "nation": 14
        },
        "benchSenior": {
          "school": 56,
          "district": 51,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "목운중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "25%"
            },
            {
              "type": "과학고",
              "percent": "4%"
            },
            {
              "type": "외고",
              "percent": "8%"
            }
          ],
          "grade": "1등급 (목동 1위)"
        },
        {
          "name": "신목중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "16%"
            },
            {
              "type": "과학고",
              "percent": "2%"
            },
            {
              "type": "외고",
              "percent": "6%"
            }
          ],
          "grade": "1.2등급"
        }
      ],
      "apartments": [
        {
          "name": "목동신시가지 7단지",
          "households": "2,550세대",
          "note": "목운초·중 직결"
        },
        {
          "name": "목동 현대하이페리온 1·2차",
          "households": "1,030세대",
          "note": "도보 3분"
        },
        {
          "name": "목동 트라팰리스",
          "households": "522세대",
          "note": "도보 2분"
        }
      ],
      "academies": {
        "mainDistrict": "오목교역 목동 중심학원가 (850개 밀집 도보 3분)",
        "distanceDaechi": "목동 자체 대형 학원가 완비 (대치동 갈 필요 없음)",
        "popularFields": [
          "하이스트/로드맵 수학",
          "목동 종로/씨앤씨",
          "청담/에이프릴"
        ]
      },
      "features": [
        "목동 7단지 초품아",
        "목운중 100% 진학",
        "과밀학급 명문",
        "자녀 교육 만족도 1위"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://mokun.sen.es.kr"
    },
    {
      "id": "elem-younghoon",
      "level": "elementary",
      "name": "영훈초등학교",
      "publicPrivate": "사립 61년차",
      "establishedYear": "1965년 설립 (사립)",
      "districtName": "서울 강북구 미아동",
      "region": "seoul",
      "regionName": "서울 강북/전국",
      "grade": "1.0등급",
      "rankNation": "전국 사립초 1위",
      "rankRegion": "사립초 선호도 1위",
      "districtRank": "전국 최상위 사립초",
      "summary": "국내 최초로 정규 교과 50%를 영어로 진행하는 몰입(Immersion) 교육을 도입한 대한민국 최고의 명문 사립초등학교입니다.",
      "stats": {
        "classStudents": 24,
        "teacherStudents": 11,
        "seniorRatio": 50,
        "totalStudents": 860,
        "benchClass": {
          "school": 24,
          "district": 21,
          "nation": 20
        },
        "benchTeacher": {
          "school": 11,
          "district": 15,
          "nation": 14
        },
        "benchSenior": {
          "school": 50,
          "district": 48,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "영훈국제중학교",
          "type": "사립 국제중 (동일 재단)",
          "rates": [
            {
              "type": "외고·국제",
              "percent": "35%"
            },
            {
              "type": "자사고",
              "percent": "28%"
            },
            {
              "type": "과학고",
              "percent": "6%"
            }
          ],
          "grade": "1등급 (전국 1위권)"
        }
      ],
      "apartments": [
        {
          "name": "서울 전역 스쿨버스 20개 노선 운행",
          "households": "성북·강북·노원·종로·강남권",
          "note": "집 앞 셔틀 통학"
        }
      ],
      "academies": {
        "mainDistrict": "교내 방과후 영어 심화 및 음악·체육 완비",
        "distanceDaechi": "졸업생 대다수 대치·목동 대형 어학원 최상위반 직결",
        "popularFields": [
          "바이링구얼 몰입수업",
          "1인 1악기 오케스트라",
          "미국 초등 정규 커리큘럼"
        ]
      },
      "features": [
        "영어몰입(이머전) 50%",
        "원어민 담임 더블티칭",
        "영훈국제중 연계",
        "경쟁률 10:1+"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://www.younghoon.es.kr"
    },
    {
      "id": "elem-naejeong",
      "level": "elementary",
      "name": "분당내정초등학교",
      "publicPrivate": "공립 34년차",
      "establishedYear": "1992년 설립",
      "districtName": "경기 성남시 분당구 수내동",
      "region": "gyeonggi",
      "regionName": "경기 성남(분당)",
      "grade": "1.1등급",
      "rankNation": "전국상위 2%",
      "rankRegion": "경기상위 1%",
      "districtRank": "분당 학군 1위",
      "summary": "분당 신도시 학원가와 쾌적한 주거의 중심인 수내동 파크타운 단지 내에 위치하며, 내정중-낙생고로 이어지는 분당 최고 학군 라인의 시작점입니다.",
      "stats": {
        "classStudents": 26,
        "teacherStudents": 18,
        "seniorRatio": 54,
        "totalStudents": 1280,
        "benchClass": {
          "school": 26,
          "district": 23,
          "nation": 20
        },
        "benchTeacher": {
          "school": 18,
          "district": 16,
          "nation": 14
        },
        "benchSenior": {
          "school": 54,
          "district": 49,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "내정중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "18%"
            },
            {
              "type": "과학고",
              "percent": "3%"
            },
            {
              "type": "외고",
              "percent": "6%"
            }
          ],
          "grade": "1등급 (분당 1위)"
        },
        {
          "name": "수내중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "16%"
            },
            {
              "type": "과학고",
              "percent": "2%"
            },
            {
              "type": "외고",
              "percent": "5%"
            }
          ],
          "grade": "1.1등급"
        }
      ],
      "apartments": [
        {
          "name": "수내동 파크타운 삼익·대림·서안",
          "households": "3,028세대",
          "note": "단지 내 도보 3분"
        },
        {
          "name": "수내동 양지마을 한양·청구",
          "households": "4,392세대",
          "note": "도보 5분"
        },
        {
          "name": "수내동 푸른마을 쌍용·신성",
          "households": "2,450세대",
          "note": "인근"
        }
      ],
      "academies": {
        "mainDistrict": "수내동 동신코아 학원가 (180개 밀집 도보 3분)",
        "distanceDaechi": "정자역 분당 메인 학원가 (차량 5분)",
        "popularFields": [
          "수학 심화학습",
          "KMO/올림피아드",
          "원어민 토론"
        ]
      },
      "features": [
        "파크타운 초품아",
        "내정중 직결",
        "분당 1등 면학분위기",
        "유해시설 제로"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://naejeong-e.goesn.kr"
    },
    {
      "id": "elem-gyeongdong",
      "level": "elementary",
      "name": "대구경동초등학교",
      "publicPrivate": "공립 43년차",
      "establishedYear": "1983년 설립",
      "districtName": "대구 수성구 범어동",
      "region": "daegu",
      "regionName": "대구 수성",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "대구·경북 1위",
      "districtRank": "수성구 초등 1위",
      "summary": "대구 수성구 범어4동 학원가 한가운데 위치하며 전교생이 1,900명을 넘는 영남권 최대 규모의 명문 공립초등학교입니다.",
      "stats": {
        "classStudents": 29,
        "teacherStudents": 20,
        "seniorRatio": 55,
        "totalStudents": 1940,
        "benchClass": {
          "school": 29,
          "district": 23,
          "nation": 20
        },
        "benchTeacher": {
          "school": 20,
          "district": 16,
          "nation": 14
        },
        "benchSenior": {
          "school": 55,
          "district": 49,
          "nation": 47
        }
      },
      "nearbyMiddle": [
        {
          "name": "동도중학교",
          "type": "공립 남녀공학",
          "rates": [
            {
              "type": "자사고",
              "percent": "16%"
            },
            {
              "type": "과학고",
              "percent": "3%"
            },
            {
              "type": "외고",
              "percent": "4%"
            }
          ],
          "grade": "1등급 (수성구 1위)"
        },
        {
          "name": "정화중학교",
          "type": "사립 여자중학",
          "rates": [
            {
              "type": "자사고",
              "percent": "14%"
            },
            {
              "type": "외고",
              "percent": "6%"
            }
          ],
          "grade": "1.1등급"
        },
        {
          "name": "경신중학교",
          "type": "사립 남학교",
          "rates": [
            {
              "type": "자사고",
              "percent": "20%"
            },
            {
              "type": "과학고",
              "percent": "2%"
            }
          ],
          "grade": "1.2등급"
        }
      ],
      "apartments": [
        {
          "name": "두산위브더제니스 범어",
          "households": "1,494세대",
          "note": "도보 5분"
        },
        {
          "name": "힐스테이트 범어",
          "households": "414세대",
          "note": "초품아 도보 2분"
        },
        {
          "name": "범어e편한세상",
          "households": "842세대",
          "note": "도보 6분"
        }
      ],
      "academies": {
        "mainDistrict": "범어4동 로데오·만촌역 학원가 (380개 밀집 도보 3분)",
        "distanceDaechi": "지방 최고의 의대 전문 단과학원 집중",
        "popularFields": [
          "의대 선행 수학",
          "고등수학 조기선행",
          "심화 과학"
        ]
      },
      "features": [
        "영남 최대 초등",
        "범어4동 의대 메카",
        "동도중·경신고 라인",
        "학부모 전문직 80%"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://kyungdong.es.kr"
    },
    {
      "id": "mid-haenuri",
      "level": "middle",
      "name": "해누리중학교",
      "publicPrivate": "공립 7년차",
      "establishedYear": "2019년 설립 (남녀공학)",
      "districtName": "서울 송파구 가락동",
      "region": "seoul",
      "regionName": "서울 송파",
      "grade": "1.0등급",
      "rankNation": "전국상위 2%",
      "rankRegion": "서울상위 5%",
      "districtRank": "송파구 중학 1위권",
      "summary": "헬리오시티 대단지와 함께 개교하여 최신식 시설과 열정적인 학부모층을 바탕으로 송파구에서 특목·자사고 합격률이 가장 가파르게 성장한 명문중입니다.",
      "stats": {
        "classStudents": 28,
        "teacherStudents": 14,
        "achievementRate": 92.4,
        "totalStudents": 920,
        "benchClass": {
          "school": 28,
          "district": 25,
          "nation": 24
        },
        "benchTeacher": {
          "school": 14,
          "district": 14,
          "nation": 13
        },
        "benchAchievement": {
          "school": 92.4,
          "district": 85.0,
          "nation": 78.0
        }
      },
      "nearbyHigh": [
        {
          "name": "보인고등학교",
          "type": "광역자사고 (송파 1위)",
          "rate": "매년 25명+ 진학",
          "grade": "1.1등급"
        },
        {
          "name": "배재고등학교",
          "type": "광역자사고 (강동)",
          "rate": "매년 15명+ 진학",
          "grade": "1.2등급"
        },
        {
          "name": "한영외국어고등학교",
          "type": "특목고 (외고)",
          "rate": "매년 8명+ 진학",
          "grade": "1.0등급"
        },
        {
          "name": "세종과학고등학교",
          "type": "특목고 (과학고)",
          "rate": "매년 3~5명 진학",
          "grade": "1.0등급"
        }
      ],
      "admissionRates": {
        "privateHigh": "자사고 15% (38명)",
        "scienceHigh": "과학고 2% (5명)",
        "foreignHigh": "외고·국제고 5% (12명)",
        "totalSpecial": "특목·자사고 합산 22% (총 55명 진학)"
      },
      "apartments": [
        {
          "name": "헬리오시티 1~5단지",
          "households": "9,510세대",
          "note": "단지 내 도보 3분"
        },
        {
          "name": "가락 금호아파트",
          "households": "915세대",
          "note": "도보 5분"
        }
      ],
      "academies": {
        "mainDistrict": "방이동·가락동 학원가 (148개 밀집)",
        "distanceDaechi": "대치동 학원가 (차량 15분 대치 학원 셔틀)",
        "popularFields": [
          "내신 국영수 만점반",
          "고등 통합과학/물화 선행",
          "자사고 면접대비"
        ]
      },
      "features": [
        "자사고 15% 진학",
        "과학고 2% 배출",
        "헬리오시티 단지내",
        "송파구 학업성취도 최상위"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://haenuri.sen.ms.kr"
    },
    {
      "id": "mid-daecheong",
      "level": "middle",
      "name": "대청중학교",
      "publicPrivate": "공립 39년차",
      "establishedYear": "1987년 설립 (남녀공학)",
      "districtName": "서울 강남구 개포동/대치동",
      "region": "seoul",
      "regionName": "서울 강남",
      "grade": "1.0등급",
      "rankNation": "전국 1위",
      "rankRegion": "서울 1위",
      "districtRank": "전국 특목·자사고 1위",
      "summary": "대치동 학원가의 강력한 학습 인프라를 바탕으로 매년 전국에서 가장 많은 영재학교, 과학고, 자사고 진학자를 배출하는 대한민국 최고 중학교입니다.",
      "stats": {
        "classStudents": 30,
        "teacherStudents": 15,
        "achievementRate": 93.8,
        "totalStudents": 1050,
        "benchClass": {
          "school": 30,
          "district": 26,
          "nation": 24
        },
        "benchTeacher": {
          "school": 15,
          "district": 14,
          "nation": 13
        },
        "benchAchievement": {
          "school": 93.8,
          "district": 87.5,
          "nation": 78.0
        }
      },
      "nearbyHigh": [
        {
          "name": "단국대학교사범대학부속고 (단대부고)",
          "type": "일반고 (의대 1위)",
          "rate": "다수 배정",
          "grade": "1.0등급"
        },
        {
          "name": "중동고등학교",
          "type": "광역자사고 (강남 1위)",
          "rate": "매년 30명+ 진학",
          "grade": "1.0등급"
        },
        {
          "name": "외대부고 / 하나고",
          "type": "전국자사고",
          "rate": "매년 25명+ 진학",
          "grade": "1.0등급"
        },
        {
          "name": "서울과학고 / 한성과고",
          "type": "영재·과학고",
          "rate": "매년 14명 진학",
          "grade": "1.0등급"
        }
      ],
      "admissionRates": {
        "privateHigh": "자사고 28% (72명)",
        "scienceHigh": "과학고·영재 5% (14명)",
        "foreignHigh": "외고·국제고 7% (18명)",
        "totalSpecial": "특목·자사고 합산 40% (총 104명 진학)"
      },
      "apartments": [
        {
          "name": "디에이치 아너힐즈",
          "households": "1,320세대",
          "note": "도보 3분"
        },
        {
          "name": "개포자이 프레지던스",
          "households": "3,375세대",
          "note": "도보 5분"
        },
        {
          "name": "개포래미안포레스트",
          "households": "2,296세대",
          "note": "단지 인접"
        }
      ],
      "academies": {
        "mainDistrict": "대치동 학원가 (1,020개 밀집 도보 5분)",
        "distanceDaechi": "대치동 한복판 도보 통학",
        "popularFields": [
          "올림피아드/KMO",
          "고교 심화미적분",
          "의대 MMI 면접 조기대비"
        ]
      },
      "features": [
        "전국 특목자사고 1위",
        "영재교·과고 14명",
        "대치동 학원가 초밀접",
        "학업성취도 93.8%"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://daecheong.sen.ms.kr"
    },
    {
      "id": "mid-mokun",
      "level": "middle",
      "name": "목운중학교",
      "publicPrivate": "공립 17년차",
      "establishedYear": "2009년 설립 (남녀공학)",
      "districtName": "서울 양천구 목동",
      "region": "seoul",
      "regionName": "서울 양천(목동)",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "서울상위 2%",
      "districtRank": "목동 중학 1위",
      "summary": "목동 중심가에 위치하여 전교생이 1,400명이 넘는 과밀 속에서도 특목고와 자사고에 매년 80명 이상을 진학시키는 목동 대표 명문중입니다.",
      "stats": {
        "classStudents": 32,
        "teacherStudents": 16,
        "achievementRate": 92.8,
        "totalStudents": 1420,
        "benchClass": {
          "school": 32,
          "district": 27,
          "nation": 24
        },
        "benchTeacher": {
          "school": 16,
          "district": 14,
          "nation": 13
        },
        "benchAchievement": {
          "school": 92.8,
          "district": 86.2,
          "nation": 78.0
        }
      },
      "nearbyHigh": [
        {
          "name": "강서고등학교",
          "type": "일반고 (목동 1위)",
          "rate": "매년 40명+ 배정",
          "grade": "1.0등급"
        },
        {
          "name": "양정고등학교",
          "type": "광역자사고 (목동)",
          "rate": "매년 30명+ 진학",
          "grade": "1.1등급"
        },
        {
          "name": "대원·한영외고",
          "type": "특목고 (외고)",
          "rate": "매년 22명 진학",
          "grade": "1.0등급"
        }
      ],
      "admissionRates": {
        "privateHigh": "자사고 25% (65명)",
        "scienceHigh": "과학고 4% (10명)",
        "foreignHigh": "외고·국제고 8% (22명)",
        "totalSpecial": "특목·자사고 합산 37% (총 97명 진학)"
      },
      "apartments": [
        {
          "name": "목동신시가지 7단지",
          "households": "2,550세대",
          "note": "목운초·중 직결"
        },
        {
          "name": "목동 현대하이페리온",
          "households": "1,030세대",
          "note": "도보 3분"
        },
        {
          "name": "목동 트라팰리스",
          "households": "522세대",
          "note": "도보 2분"
        }
      ],
      "academies": {
        "mainDistrict": "목동 오목교 중심학원가 (850개 밀집)",
        "distanceDaechi": "목동 자체 학원가 완비",
        "popularFields": [
          "수학 킬러문항 대비",
          "외고/국제고 자소서",
          "심화 영어"
        ]
      },
      "features": [
        "목동 학군 1위",
        "외고 22명 배출",
        "과밀학급 명문",
        "강서고·양정고 연계"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://mokun.sen.ms.kr"
    },
    {
      "id": "mid-naejeong",
      "level": "middle",
      "name": "내정중학교",
      "publicPrivate": "공립 34년차",
      "establishedYear": "1992년 설립 (남녀공학)",
      "districtName": "경기 성남시 분당구 수내동",
      "region": "gyeonggi",
      "regionName": "경기 성남(분당)",
      "grade": "1.0등급",
      "rankNation": "전국상위 2%",
      "rankRegion": "경기 1위",
      "districtRank": "분당 중학 1위",
      "summary": "분당 신도시 수내동의 청정 주거단지 한가운데에 위치하여 경기 남부에서 특목고 및 외대부고 합격생을 가장 많이 배출하는 학교입니다.",
      "stats": {
        "classStudents": 29,
        "teacherStudents": 15,
        "achievementRate": 91.5,
        "totalStudents": 1120,
        "benchClass": {
          "school": 29,
          "district": 26,
          "nation": 24
        },
        "benchTeacher": {
          "school": 15,
          "district": 14,
          "nation": 13
        },
        "benchAchievement": {
          "school": 91.5,
          "district": 85.8,
          "nation": 78.0
        }
      },
      "nearbyHigh": [
        {
          "name": "낙생고등학교",
          "type": "일반고 (경기 1위)",
          "rate": "매년 45명+ 배정",
          "grade": "1.0등급"
        },
        {
          "name": "용인외대부고",
          "type": "전국자사고 (전국 1위)",
          "rate": "매년 18명+ 진학",
          "grade": "1.0등급"
        },
        {
          "name": "분당대진고",
          "type": "일반고 (분당)",
          "rate": "다수 배정",
          "grade": "1.2등급"
        }
      ],
      "admissionRates": {
        "privateHigh": "자사고 18% (42명)",
        "scienceHigh": "과학고 3% (7명)",
        "foreignHigh": "외고·국제고 6% (16명)",
        "totalSpecial": "특목·자사고 합산 27% (총 65명 진학)"
      },
      "apartments": [
        {
          "name": "수내동 파크타운",
          "households": "3,028세대",
          "note": "도보 3분"
        },
        {
          "name": "수내동 양지마을",
          "households": "4,392세대",
          "note": "도보 5분"
        }
      ],
      "academies": {
        "mainDistrict": "수내동 학원가 & 정자역 학원가 (320개 밀집)",
        "distanceDaechi": "분당 자체 학원 인프라 완비",
        "popularFields": [
          "외대부고 입시대비",
          "낙생고 대비 심화수학",
          "영어 텝스"
        ]
      },
      "features": [
        "외대부고 18명 배출",
        "낙생고 연계 학군",
        "분당 1위 명문",
        "쾌적한 중앙공원"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://naejeong-m.goesn.kr"
    },
    {
      "id": "mid-eulji",
      "level": "middle",
      "name": "을지중학교",
      "publicPrivate": "공립 31년차",
      "establishedYear": "1995년 설립 (남녀공학)",
      "districtName": "서울 노원구 중계동",
      "region": "seoul",
      "regionName": "서울 노원(중계)",
      "grade": "1.1등급",
      "rankNation": "전국상위 4%",
      "rankRegion": "강북 1위",
      "districtRank": "노원구 중학 1위",
      "summary": "강북의 사교육 중심지인 은행사거리 학원가를 바로 옆에 두고 있어, 강북권에서 가장 높은 학업성취도와 특목고 진학률을 기록합니다.",
      "stats": {
        "classStudents": 28,
        "teacherStudents": 14,
        "achievementRate": 90.2,
        "totalStudents": 980,
        "benchClass": {
          "school": 28,
          "district": 25,
          "nation": 24
        },
        "benchTeacher": {
          "school": 14,
          "district": 14,
          "nation": 13
        },
        "benchAchievement": {
          "school": 90.2,
          "district": 82.5,
          "nation": 78.0
        }
      },
      "nearbyHigh": [
        {
          "name": "대진고등학교",
          "type": "일반고 (노원 1위)",
          "rate": "매년 35명 배정",
          "grade": "1.2등급"
        },
        {
          "name": "서라벌고등학교",
          "type": "일반고 (노원)",
          "rate": "매년 30명 배정",
          "grade": "1.3등급"
        },
        {
          "name": "대원·대일외고",
          "type": "특목고 (외고)",
          "rate": "매년 24명 진학",
          "grade": "1.0등급"
        }
      ],
      "admissionRates": {
        "privateHigh": "자사고 14% (32명)",
        "scienceHigh": "과학고 3% (7명)",
        "foreignHigh": "외고·국제고 6% (19명)",
        "totalSpecial": "특목·자사고 합산 23% (총 58명 진학)"
      },
      "apartments": [
        {
          "name": "중계동 청구3차",
          "households": "880세대",
          "note": "도보 2분"
        },
        {
          "name": "중계동 건영3차",
          "households": "948세대",
          "note": "도보 3분"
        }
      ],
      "academies": {
        "mainDistrict": "중계동 은행사거리 학원가 (420개 밀집 도보 2분)",
        "distanceDaechi": "강북 최고 학원가 도보권",
        "popularFields": [
          "수학 심화문제풀이",
          "대진고 내신대비",
          "외고 면접반"
        ]
      },
      "features": [
        "은행사거리 도보 2분",
        "강북 1위 학업성취",
        "외고 24명 배출",
        "가성비 학군지"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "https://eulji.sen.ms.kr"
    },
    {
      "id": "mid-dongdo",
      "level": "middle",
      "name": "동도중학교",
      "publicPrivate": "공립 43년차",
      "establishedYear": "1983년 설립 (남녀공학)",
      "districtName": "대구 수성구 범어동",
      "region": "daegu",
      "regionName": "대구 수성",
      "grade": "1.0등급",
      "rankNation": "전국상위 2%",
      "rankRegion": "대구 1위",
      "districtRank": "수성구 중학 1위",
      "summary": "대구 수성구 범어4동 학원가의 강력한 학습 분위기와 영남권 최고 명문고인 경신고, 대륜고로 이어지는 지방 최강의 중학교입니다.",
      "stats": {
        "classStudents": 29,
        "teacherStudents": 15,
        "achievementRate": 91.8,
        "totalStudents": 1080,
        "benchClass": {
          "school": 29,
          "district": 25,
          "nation": 24
        },
        "benchTeacher": {
          "school": 15,
          "district": 14,
          "nation": 13
        },
        "benchAchievement": {
          "school": 91.8,
          "district": 83.2,
          "nation": 78.0
        }
      },
      "nearbyHigh": [
        {
          "name": "경신고등학교",
          "type": "광역자사고 (의대 1위)",
          "rate": "매년 40명+ 진학",
          "grade": "1.0등급"
        },
        {
          "name": "대륜고등학교",
          "type": "일반고 (명문)",
          "rate": "매년 35명 배정",
          "grade": "1.2등급"
        },
        {
          "name": "대구과학고",
          "type": "영재학교",
          "rate": "매년 5명+ 진학",
          "grade": "1.0등급"
        }
      ],
      "admissionRates": {
        "privateHigh": "자사고 16% (38명)",
        "scienceHigh": "과학고 3% (8명)",
        "foreignHigh": "외고·국제고 4% (10명)",
        "totalSpecial": "특목·자사고 합산 23% (총 56명 진학)"
      },
      "apartments": [
        {
          "name": "두산위브더제니스 범어",
          "households": "1,494세대",
          "note": "도보 5분"
        },
        {
          "name": "범어 힐스테이트",
          "households": "414세대",
          "note": "도보 3분"
        }
      ],
      "academies": {
        "mainDistrict": "범어4동 로데오거리 학원가 (380개 밀집)",
        "distanceDaechi": "지방 의대 진학 특화 학원가",
        "popularFields": [
          "의대 선행 수학",
          "물리/화학 1·2",
          "수능 고난도"
        ]
      },
      "features": [
        "대구 수성구 1위",
        "경신고 직결 라인",
        "의대 진학 1번지",
        "수학 성취도 94%"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://dongdo.ms.kr"
    },
    {
      "id": "high-hufs",
      "level": "high",
      "name": "용인한국외국어대학교부설고 (외대부고)",
      "publicPrivate": "사립 22년차",
      "establishedYear": "2005년 설립 (남녀공학/기숙사)",
      "districtName": "경기 용인시 처인구",
      "region": "gyeonggi",
      "regionName": "경기 용인",
      "grade": "1.0등급",
      "rankNation": "전국 1위 (자사고 종합)",
      "rankRegion": "전국 최상위",
      "districtRank": "전국 자사고 1위",
      "summary": "서울대 합격자 수와 의약학계열 합격자 수에서 모두 전국 정상을 석권하고 있는 대한민국 부동의 1위 전국단위 자율형사립고입니다.",
      "stats": {
        "classStudents": 28,
        "teacherStudents": 9,
        "achievementRate": 99.8,
        "totalStudents": 1050,
        "benchClass": {
          "school": 28,
          "district": 25,
          "nation": 23
        },
        "benchTeacher": {
          "school": 9,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 99.8,
          "district": 88.0,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 66명 (수시 30 / 정시 36)",
        "medicalTotal": "의·치·한·약·수 84명 합격",
        "skyTotal": "연세대·고려대 152명 합격",
        "foreignTotal": "하버드·예일 등 해외 명문대 32명"
      },
      "apartments": [
        {
          "name": "전교생 전원 기숙사 생활",
          "households": "전국 단위 선발",
          "note": "월 1~2회 귀가"
        }
      ],
      "academies": {
        "mainDistrict": "학교 내 자율연구(R&E) 및 교내 심화방과후 완비",
        "distanceDaechi": "주말 귀가 시 대치동/분당 단과 수강",
        "popularFields": [
          "국제 AP/SAT",
          "수능 고난도 모의고사",
          "심화 탐구보고서"
        ]
      },
      "features": [
        "전국 1위 자사고",
        "서울대 66명",
        "의약학 84명",
        "수시·정시 완벽 균형"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://www.hafs.hs.kr"
    },
    {
      "id": "high-sangsan",
      "level": "high",
      "name": "상산고등학교",
      "publicPrivate": "사립 45년차",
      "establishedYear": "1981년 설립 (남녀공학/기숙사)",
      "districtName": "전북 전주시 완산구",
      "region": "jeonbuk",
      "regionName": "전북 전주",
      "grade": "1.0등급",
      "rankNation": "전국 의대 합격 1위",
      "rankRegion": "전국 의대 최다",
      "districtRank": "전국 의대 1위",
      "summary": "수학의 정석 저자 홍성대 박사가 설립한 학교로, 매년 전국에서 의대·치대·한의대·약대를 가장 많이 합격시키는 의대 사관학교입니다.",
      "stats": {
        "classStudents": 27,
        "teacherStudents": 10,
        "achievementRate": 99.5,
        "totalStudents": 1020,
        "benchClass": {
          "school": 27,
          "district": 24,
          "nation": 23
        },
        "benchTeacher": {
          "school": 10,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 99.5,
          "district": 85.0,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 43명 합격",
        "medicalTotal": "의·치·한·약·수 142명 합격 (전국 1위)",
        "skyTotal": "연세대·고려대 110명 합격",
        "foreignTotal": "카이스트·포스텍 25명"
      },
      "apartments": [
        {
          "name": "전국단위 선발 전원 기숙사",
          "households": "1인 1독서실 완비",
          "note": "수학 몰입환경"
        }
      ],
      "academies": {
        "mainDistrict": "교내 자율학습 중심 (수학 집중 지도)",
        "distanceDaechi": "방학 기간 대치동 단과 수강",
        "popularFields": [
          "수학 킬러 완벽대비",
          "과탐 2과목 완성",
          "정시 올인전략"
        ]
      },
      "features": [
        "의대 142명 (전국 1위)",
        "수학의 정석 설립",
        "정시 극강",
        "전국단위 선발"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://www.sangsan.hs.kr"
    },
    {
      "id": "high-boin",
      "level": "high",
      "name": "보인고등학교",
      "publicPrivate": "사립 118년차",
      "establishedYear": "1908년 설립 (광역자사고/남고)",
      "districtName": "서울 송파구 가락동/오금동",
      "region": "seoul",
      "regionName": "서울 송파",
      "grade": "1.1등급",
      "rankNation": "전국상위 3%",
      "rankRegion": "송파구 1위 자사고",
      "districtRank": "송파구 고교 1위",
      "summary": "송파구를 대표하는 명문 자율형사립고등학교로, 남학생 특유의 끈끈한 면학 분위기와 수능 정시 역량으로 매년 송파 최고 실적을 냅니다.",
      "stats": {
        "classStudents": 28,
        "teacherStudents": 11,
        "achievementRate": 96.5,
        "totalStudents": 980,
        "benchClass": {
          "school": 28,
          "district": 25,
          "nation": 23
        },
        "benchTeacher": {
          "school": 11,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 96.5,
          "district": 87.0,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 21명 합격 (수시 8 / 정시 13)",
        "medicalTotal": "의·치·한·약 45명 합격",
        "skyTotal": "연세대·고려대 78명 합격",
        "foreignTotal": "주요 명문대 180명+"
      },
      "apartments": [
        {
          "name": "헬리오시티",
          "households": "9,510세대",
          "note": "도보 10분 통학"
        },
        {
          "name": "올림픽선수기자촌",
          "households": "5,540세대",
          "note": "차량 7분"
        },
        {
          "name": "송파 레미니스",
          "households": "1,200세대",
          "note": "도보권"
        }
      ],
      "academies": {
        "mainDistrict": "방이동 학원가 & 잠실 학원가 (도보·차량 10분)",
        "distanceDaechi": "대치동 학원가 차량 15분",
        "popularFields": [
          "수능 국영수 1등급반",
          "의치한 면접반",
          "정시 킬러집중"
        ]
      },
      "features": [
        "송파 1위 자사고",
        "서울대 21명",
        "의약학 45명",
        "헬리오시티 인접"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://boin.hs.kr"
    },
    {
      "id": "high-dandaebugo",
      "level": "high",
      "name": "단국대학교사범대학부속고 (단대부고)",
      "publicPrivate": "사립 43년차",
      "establishedYear": "1983년 설립 (남학교)",
      "districtName": "서울 강남구 대치동",
      "region": "seoul",
      "regionName": "서울 강남(대치)",
      "grade": "1.0등급",
      "rankNation": "전국 일반고 1위",
      "rankRegion": "강남 일반고 1위",
      "districtRank": "전국 일반고 1위",
      "summary": "대치동 학원가 중심부에 위치하여 일반고등학교 중 전국에서 가장 많은 서울대와 의대 합격자를 쏟아내는 대한민국 일반고의 최정상입니다.",
      "stats": {
        "classStudents": 29,
        "teacherStudents": 11,
        "achievementRate": 97.2,
        "totalStudents": 1120,
        "benchClass": {
          "school": 29,
          "district": 26,
          "nation": 23
        },
        "benchTeacher": {
          "school": 11,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 97.2,
          "district": 89.0,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 35명 합격 (정시 압도적 강세)",
        "medicalTotal": "의·치·한·약 71명 합격 (일반고 1위)",
        "skyTotal": "연세대·고려대 115명 합격",
        "foreignTotal": "수능 만점자 다수 배출"
      },
      "apartments": [
        {
          "name": "대치 래미안대치팰리스",
          "households": "1,608세대",
          "note": "도보 3분"
        },
        {
          "name": "대치 우성·선경·미도",
          "households": "4,500세대",
          "note": "도보 5분"
        },
        {
          "name": "은마아파트",
          "households": "4,424세대",
          "note": "도보 7분"
        }
      ],
      "academies": {
        "mainDistrict": "대치동 학원가 (1,020개 학원 초밀접)",
        "distanceDaechi": "학교 정문 앞이 대치동 학원가",
        "popularFields": [
          "시대인재/강남대성 단과",
          "수능 1등급 킬러",
          "의대 논술/수능"
        ]
      },
      "features": [
        "전국 일반고 1위",
        "서울대 35명",
        "의약학 71명",
        "대치동 중심"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://dankook.hs.kr"
    },
    {
      "id": "high-naksaeng",
      "level": "high",
      "name": "낙생고등학교",
      "publicPrivate": "사립 52년차",
      "establishedYear": "1974년 설립 (남녀공학)",
      "districtName": "경기 성남시 분당구 판교백현",
      "region": "gyeonggi",
      "regionName": "경기 성남(분당)",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "경기 일반고 1위",
      "districtRank": "분당 고교 1위",
      "summary": "과학중점과정을 바탕으로 이과 중심의 강력한 수능 정시 경쟁력을 자랑하며 경기도 일반고 중 압도적 1위의 의대·서울대 합격생을 배출합니다.",
      "stats": {
        "classStudents": 28,
        "teacherStudents": 11,
        "achievementRate": 96.8,
        "totalStudents": 980,
        "benchClass": {
          "school": 28,
          "district": 25,
          "nation": 23
        },
        "benchTeacher": {
          "school": 11,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 96.8,
          "district": 87.5,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 28명 합격",
        "medicalTotal": "의·치·한·약 63명 합격 (경기 1위)",
        "skyTotal": "연세대·고려대 86명 합격",
        "foreignTotal": "카이스트 12명"
      },
      "apartments": [
        {
          "name": "백현마을 판교푸르지오그랑블",
          "households": "948세대",
          "note": "도보 10분"
        },
        {
          "name": "수내동 파크타운·양지마을",
          "households": "7,400세대",
          "note": "분당 배정"
        },
        {
          "name": "정자동 상록마을",
          "households": "1,800세대",
          "note": "버스 10분"
        }
      ],
      "academies": {
        "mainDistrict": "수내역 & 정자역 분당 메인 학원가 (320개 밀집)",
        "distanceDaechi": "대치동 학원 셔틀 분당 전역 운행 (30분 소요)",
        "popularFields": [
          "과학중점 과탐",
          "수능 수학 100점반",
          "의대 수시/정시"
        ]
      },
      "features": [
        "경기 일반고 1위",
        "서울대 28명",
        "의약학 63명",
        "과학중점학교"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://naksaeng.hs.kr"
    },
    {
      "id": "high-gangseo",
      "level": "high",
      "name": "강서고등학교",
      "publicPrivate": "사립 43년차",
      "establishedYear": "1983년 설립 (남학교)",
      "districtName": "서울 양천구 목동",
      "region": "seoul",
      "regionName": "서울 양천(목동)",
      "grade": "1.0등급",
      "rankNation": "전국상위 1%",
      "rankRegion": "목동 일반고 1위",
      "districtRank": "목동 고교 1위",
      "summary": "목동 학원가의 수학 인프라를 바탕으로 수능 수학 만점자를 전국에서 가장 많이 배출하는 정시의 절대강자 남고입니다.",
      "stats": {
        "classStudents": 29,
        "teacherStudents": 12,
        "achievementRate": 96.0,
        "totalStudents": 1050,
        "benchClass": {
          "school": 29,
          "district": 26,
          "nation": 23
        },
        "benchTeacher": {
          "school": 12,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 96.0,
          "district": 86.0,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 27명 합격",
        "medicalTotal": "의·치·한·약 58명 합격 (목동 1위)",
        "skyTotal": "연세대·고려대 92명 합격",
        "foreignTotal": "수능 수학 만점자 매년 배출"
      },
      "apartments": [
        {
          "name": "목동신시가지 3·4단지",
          "households": "2,700세대",
          "note": "도보 통학"
        },
        {
          "name": "목동신시가지 7단지",
          "households": "2,550세대",
          "note": "목동 중심"
        },
        {
          "name": "목동 센트럴푸르지오",
          "households": "850세대",
          "note": "도보 8분"
        }
      ],
      "academies": {
        "mainDistrict": "오목교역 목동 중심학원가 (850개 밀집)",
        "distanceDaechi": "목동 자체 학원가 완비",
        "popularFields": [
          "수학 킬러 만점",
          "수능 정시 집중",
          "과탐 실전"
        ]
      },
      "features": [
        "목동 일반고 1위",
        "수능 수학 최강",
        "서울대 27명",
        "의약학 58명"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://gangseo.hs.kr"
    },
    {
      "id": "high-gyeongshin",
      "level": "high",
      "name": "경신고등학교",
      "publicPrivate": "사립 60년차",
      "establishedYear": "1966년 설립 (광역자사고/남고)",
      "districtName": "대구 수성구 범어동",
      "region": "daegu",
      "regionName": "대구 수성",
      "grade": "1.0등급",
      "rankNation": "지방 의대 합격 1위",
      "rankRegion": "영남 1위",
      "districtRank": "대구 고교 1위",
      "summary": "한 해 수능 만점자 4명을 배출한 신화의 학교로, 대구 수성구 범어4동의 막강한 정시 파워로 지방 최고의 의대 합격률을 지키고 있습니다.",
      "stats": {
        "classStudents": 28,
        "teacherStudents": 11,
        "achievementRate": 97.0,
        "totalStudents": 920,
        "benchClass": {
          "school": 28,
          "district": 25,
          "nation": 23
        },
        "benchTeacher": {
          "school": 11,
          "district": 13,
          "nation": 12
        },
        "benchAchievement": {
          "school": 97.0,
          "district": 86.5,
          "nation": 75.0
        }
      },
      "collegeResults": {
        "snuTotal": "서울대 18명 합격",
        "medicalTotal": "의·치·한·약 73명 합격 (지방 1위)",
        "skyTotal": "연세대·고려대 65명 합격",
        "foreignTotal": "경북대·영남대 의대 최다 진학"
      },
      "apartments": [
        {
          "name": "두산위브더제니스 범어",
          "households": "1,494세대",
          "note": "도보 7분"
        },
        {
          "name": "범어 힐스테이트",
          "households": "414세대",
          "note": "도보 5분"
        },
        {
          "name": "수성 코오롱하늘채",
          "households": "850세대",
          "note": "도보 8분"
        }
      ],
      "academies": {
        "mainDistrict": "범어4동 로데오 학원가 (380개 밀집 초인접)",
        "distanceDaechi": "지방 의대 정시 사관학교",
        "popularFields": [
          "의대 수능 최저",
          "고난도 수학",
          "과탐 실전모의"
        ]
      },
      "features": [
        "지방 의대 1위",
        "의약학 73명",
        "수능 만점 4명 신화",
        "범어4동 중심"
      ],
      "schoolInfoUrl": "https://www.schoolinfo.go.kr",
      "linkUrl": "http://www.kyungshin.hs.kr"
    },
    {
      "id": "k-haenuri-public",
      "level": "kindergarten",
      "name": "서울해누리초등학교병설유치원",
      "publicPrivate": "공립단설/병설 7년차",
      "establishedYear": "2019년 설립 (공립)",
      "districtName": "서울 송파구 가락동",
      "region": "seoul",
      "regionName": "서울 송파",
      "grade": "1.1등급",
      "rankNation": "전국상위 3%",
      "rankRegion": "공립 만족도 최우수",
      "districtRank": "송파구 유치원 최상위",
      "summary": "헬리오시티 단지 내 해누리초등학교와 시설을 공유하며, 친환경 친자연 급식과 무상 교육, 저녁 돌봄 100% 수용으로 맞벌이 학부모 선호 1순위 유치원입니다.",
      "stats": {
        "classStudents": 16,
        "teacherStudents": 8,
        "seniorRatio": 49,
        "totalStudents": 110,
        "benchClass": {
          "school": 16,
          "district": 18,
          "nation": 19
        },
        "benchTeacher": {
          "school": 8,
          "district": 10,
          "nation": 11
        },
        "benchSenior": {
          "school": 49,
          "district": 48,
          "nation": 48
        }
      },
      "nearbyElementary": [
        {
          "name": "서울해누리초등학교",
          "type": "공립 (동일 캠퍼스)",
          "grade": "1.1등급"
        },
        {
          "name": "서울가락초등학교",
          "type": "공립 (헬리오시티 내)",
          "grade": "1.2등급"
        }
      ],
      "apartments": [
        {
          "name": "헬리오시티 1~5단지",
          "households": "9,510세대",
          "note": "단지 내 도보 통학"
        }
      ],
      "academies": {
        "mainDistrict": "방이·가락 유아 발레·음악·창의미술 (60개)",
        "distanceDaechi": "유아 사고력 수학 (소마/시매쓰 셔틀)",
        "popularFields": [
          "처음학교로 우선모집",
          "친환경 안심급식",
          "누리과정 특성화"
        ]
      },
      "features": [
        "교육비 0원 (무상지원)",
        "헬리오시티 초품유",
        "저녁 돌봄 100%",
        "처음학교로 접수"
      ],
      "schoolInfoUrl": "https://e-childschoolinfo.moe.go.kr",
      "linkUrl": "https://haenuri.sen.kg.kr"
    },
    {
      "id": "k-gate",
      "level": "kindergarten",
      "name": "GATE (게이트) 영어유치원 대치/압구정/서초",
      "publicPrivate": "사립 어학원 18년차",
      "establishedYear": "2007년 설립 (영어유치원)",
      "districtName": "서울 강남·서초",
      "region": "seoul",
      "regionName": "서울 강남·서초",
      "grade": "1.0등급",
      "rankNation": "영유 전국 1위",
      "rankRegion": "강남 1티어",
      "districtRank": "영유 최상위 1티어",
      "summary": "이른바 5세·7세 고시로 불리는 입학테스트를 통과해야 들어갈 수 있는 대한민국 최정상 영어유치원으로, 졸업 시 미국 초등 2~3학년 수준을 마스터합니다.",
      "stats": {
        "classStudents": 12,
        "teacherStudents": 6,
        "seniorRatio": 52,
        "totalStudents": 180,
        "benchClass": {
          "school": 12,
          "district": 15,
          "nation": 16
        },
        "benchTeacher": {
          "school": 6,
          "district": 8,
          "nation": 10
        },
        "benchSenior": {
          "school": 52,
          "district": 50,
          "nation": 48
        }
      },
      "nearbyElementary": [
        {
          "name": "영훈초등학교 / 계성초등학교",
          "type": "명문 사립초",
          "grade": "1.0등급"
        },
        {
          "name": "대치초 / 대청초 / 원명초",
          "type": "강남 공립명문초",
          "grade": "1.0등급"
        }
      ],
      "apartments": [
        {
          "name": "강남·서초 전역 셔틀버스 운행",
          "households": "압구정·대치·반포·도곡",
          "note": "스쿨버스 완비"
        }
      ],
      "academies": {
        "mainDistrict": "대치·서초 대형 어학원 (ILE, PEAI, 에디센 직결)",
        "distanceDaechi": "대치동 학원가 중심",
        "popularFields": [
          "미국 원서 챕터북 독서",
          "원어민 1:1 토론",
          "사립초/국제학교 대비"
        ]
      },
      "features": [
        "영유 1티어",
        "미국 초등 3학년 레벨",
        "입학테스트 경쟁률 5:1",
        "원어민 담임제"
      ],
      "schoolInfoUrl": "https://e-childschoolinfo.moe.go.kr",
      "linkUrl": "https://www.gate.co.kr"
    }
  ],
  "districts": [
    {
      "id": "dist-daechi",
      "name": "서울 강남 대치동 학군",
      "regionName": "서울 강남구",
      "tag": "대한민국 사교육 1번지",
      "badgeColor": "rose",
      "keyStrengths": "전국 최강 학원가 1,020곳 밀집, 수능 정시 및 의대 진학 전국 1위",
      "hotSpots": "한티역~대치역 사거리, 은마아파트 사거리",
      "feederLine": "대청초/대곡초 ➡️ 대청중/도곡중/단대부중 ➡️ 단대부고/중동고/휘문고/숙명여고",
      "analysis": "대치동은 대한민국에서 가장 촘촘한 레벨별 단과학원과 1타 강사진이 집결해 있습니다. 초등 3~4학년부터 의대반 선행이 일반화되어 있으며, 남학생의 경우 단대부고·중동고·휘문고 등 의대 정시 파워가 막강한 고교 라인업이 완비되어 있습니다.",
      "tips": "초등 3~4학년 무렵 대형 수학 학원 레벨테스트를 목표로 전입하는 수요가 가장 많습니다."
    },
    {
      "id": "dist-songpa",
      "name": "서울 송파 잠실·가락 학군 (헬리오·엘리트)",
      "regionName": "서울 송파구",
      "tag": "강남 3구 신흥 명문 학군",
      "badgeColor": "sky",
      "keyStrengths": "해누리초·중(헬리오시티 9,510세대), 잠실 엘리트(엘스·리센츠·트리지움), 보인고·잠실중 최상위 진학",
      "hotSpots": "가락동 헬리오시티 학원가, 잠실 학원사거리, 방이동 학원가",
      "feederLine": "해누리초/잠실초/잠신초 ➡️ 해누리중/잠실중/신천중 ➡️ 보인고/보성고/잠실여고/배재고",
      "analysis": "송파구는 헬리오시티와 잠실 엘스·리센츠·트리지움, 파크리오 등 4만 세대 이상의 초대형 고급 아파트촌이 완성되면서 학업열이 강남에 육박합니다. 신설 해누리초·중은 개교 7년 만에 송파구 최고의 특목·자사고 합격률을 기록하며 방이동·대치동 학원가와 직결됩니다.",
      "tips": "헬리오시티 내 해누리초·중 직결 초품아 단지 선호도가 매우 높으며, 고교는 보인고(자사고)와 한영외고 진학률이 우수합니다."
    },
    {
      "id": "dist-mokdong",
      "name": "서울 양천 목동 학군",
      "regionName": "서울 양천구",
      "tag": "서부권 최고 교육 특구",
      "badgeColor": "amber",
      "keyStrengths": "중학교 학업성취도 전국 1위, 특목·자사고 진학률 최다, 앞단지·뒷단지 탄탄한 공교육",
      "hotSpots": "목동 앞단지(1~6단지), 뒷단지(7~14단지), 오목교역 중심상업지구",
      "feederLine": "목운초/서정초/월촌초 ➡️ 목운중/월촌중/신목중 ➡️ 강서고/양천고/목동고/한가람고",
      "analysis": "목동은 평지 대단지 아파트에 유해시설이 없고, 특목고·자사고를 가장 많이 보내는 중학교들이 즐비합니다. 수학과 영어 전문학원이 850곳 이상 촘촘하여 대치동을 갈 필요가 없는 자족형 학군입니다.",
      "tips": "앞단지(1~6단지)는 차분한 분위기와 우수한 초·중 접근성, 뒷단지(7~14단지)는 목운중 학군 및 대형 학원가 이동이 편리합니다."
    },
    {
      "id": "dist-junggye",
      "name": "서울 노원 중계동 학군",
      "regionName": "서울 노원구",
      "tag": "강북 최고 은행사거리 학군",
      "badgeColor": "emerald",
      "keyStrengths": "가성비 최고 학군지, 은행사거리 420개 학원 밀집, 명문 일반고 다수 포진",
      "hotSpots": "을지초·중 사거리, 은행사거리 메인 상권",
      "feederLine": "을지초/중계초 ➡️ 을지중/중계중/상명중 ➡️ 대진고/서라벌고/대진여고/영신여고",
      "analysis": "강북권 학부모들의 종착역으로, 대치·목동 대비 주거비용 부담이 덜하면서도 대치동 대형 학원 직영 분원들이 은행사거리에 집결해 있어 우수한 대입 실적을 꾸준히 냅니다.",
      "tips": "초등 고학년 때 강북·동대문·성북·의정부 등 인근 지역에서 중계동으로 갈아타는 수요가 꾸준합니다."
    },
    {
      "id": "dist-bundang",
      "name": "경기 성남 분당 학군",
      "regionName": "경기 성남시",
      "tag": "경기 1등 명문 신도시 학군",
      "badgeColor": "blue",
      "keyStrengths": "낙생고·분당대진고 등 전국구 일반고, 수내·정자역 학원가, 쾌적한 주거",
      "hotSpots": "수내동 학원가, 정자역 카페거리 주변, 서현동 로데오",
      "feederLine": "내정초/수내초/서현초 ➡️ 내정중/수내중/서현중 ➡️ 낙생고/분당고/대진고/중앙고",
      "analysis": "판교 테크노밸리 IT·연구직 부모들의 높은 교육열과 쾌적한 분당 인프라가 결합되어 경기 남부 최고의 대입 실적을 유지합니다. 일반고의 수능 파워가 강남권에 필적합니다.",
      "tips": "수내동 양지마을, 파크타운 라인이 전통의 선호 1순위이며, 판교 보평초·중·고 라인도 신흥 명문으로 자리 잡았습니다."
    },
    {
      "id": "dist-suseong",
      "name": "대구 수성구 범어동 학군",
      "regionName": "대구 수성구",
      "tag": "지방 최고의 의대 불패 학군",
      "badgeColor": "purple",
      "keyStrengths": "전국 의대 합격률 최상위, 범어네거리 대형 학원가, 경신·대륜·정화 라인업",
      "hotSpots": "범어4동 로데오 사거리, 만촌3동 만촌역 일대",
      "feederLine": "경동초/동도초 ➡️ 동도중/정화중/경신중 ➡️ 경신고/대륜고/정화여고/대구여고",
      "analysis": "지방에서 유일하게 서울 강남과 직접 비교되는 학군으로, 영남권 의대 정원을 흡수하는 강력한 정시 경쟁력을 자랑합니다. 경동초-동도중-경신고 테크트리는 의대 진학의 보증수표로 불립니다.",
      "tips": "의대 진학을 목표로 하는 영남권 상위권 학부모들의 최종 종착지로 꼽힙니다."
    },
    {
      "id": "dist-pyeongchon",
      "name": "경기 안양 평촌 학군",
      "regionName": "경기 안양시 동안구",
      "tag": "수도권 남부 핵심 학원가",
      "badgeColor": "indigo",
      "keyStrengths": "귀인동 평촌대로변 300+ 학원가, 경기남부 광역 학원 셔틀망, 귀인중·백영고",
      "hotSpots": "귀인중 사거리, 평촌 먹자골목 맞은편 학원 밀집대로",
      "feederLine": "귀인초/민백초 ➡️ 귀인중/평촌중/범계중 ➡️ 백영고/평촌고/안양외고/동안고",
      "analysis": "안양, 군포(산본), 의왕, 과천 학부모들까지 모두 흡수하는 대형 학원가가 완비되어 있어 초·중·고 학업을 평촌 내에서 원스톱으로 끝낼 수 있습니다.",
      "tips": "귀인동 꿈마을, 향촌마을 라인이 귀인초·귀인중 배정으로 가장 선호도가 높습니다."
    }
  ],
  "admissions": [
    {
      "id": "guide-2028-csat",
      "title": "2028 대입 개편안 핵심 총정리 (현 중3·중2 필독)",
      "category": "2028 대입 개편",
      "badge": "대입 대변화",
      "badgeColor": "rose",
      "summary": "고교 내신 9등급제가 5등급제로 완화되고, 수능 국어·수학·탐구 선택과목이 폐지되어 모든 수험생이 동일한 시험을 치릅니다.",
      "points": [
        "내신 5등급제 전환: 1등급(상위 10%), 2등급(누적 34%), 3등급(누적 66%), 4등급(누적 90%), 5등급(하위 10%)으로 단순화",
        "특목·자사고 대유리: 종전 9등급제에서 내신 4% 들기가 어렵던 자사고·특목고가 10%까지 1등급을 받게 되어 선호도 급상승",
        "수능 통합형 개편: 문·이과 구분 없이 [통합사회]와 [통합과학]을 모든 학생이 공통 응시 (수학 심화 미적분Ⅱ/기하는 제외)",
        "대학별 고사 강화 전망: 내신 변별력 약화로 인해 서울 주요 대학들이 심층 면접, 논술, 정시 학생부 정성평가를 확대할 가능성 높음"
      ]
    },
    {
      "id": "guide-high-choice",
      "title": "일반고 vs 자사고 vs 특목고: 내 아이 성향별 선택 가이드",
      "category": "고교 선택 전략",
      "badge": "고교 선택",
      "badgeColor": "indigo",
      "summary": "2028 대입 개편안 하에서 내 아이의 학습 역량과 멘탈에 맞는 최적의 고등학교 유형을 분석합니다.",
      "points": [
        "전국자사고(외대부고/상산고/하나고) 추천: 수학·과학 기본기가 탄탄하고, 치열한 경쟁 속에서도 쉽게 위축되지 않는 승부욕이 있는 학생",
        "외고·국제고 추천: 어학 및 인문사회 토론, 독서 역량이 뛰어나며, 문과 최상위권 로스쿨·상경계열 진학을 희망하는 학생",
        "명문 일반고 추천: 지역 학원가 인프라를 활용해 수능 정시와 내신 관리를 안정적으로 병행하고 싶은 실속형 학생",
        "영재학교·과학고 추천: 수학·과학에 대한 순수 지적 호기심과 몰입력이 남달라 R&D 연구자 및 이공계 리더를 꿈꾸는 학생"
      ]
    },
    {
      "id": "guide-first-school",
      "title": "처음학교로 유치원 입학 완벽 가이드 & 우선모집 팁",
      "category": "유치원 입학",
      "badge": "처음학교로",
      "badgeColor": "emerald",
      "summary": "국·공립 및 사립 유치원에 입학하기 위해 전국 유치원이 참여하는 교육부 공식 온라인 입학관리시스템 이용 전략입니다.",
      "points": [
        "모집 일정: 매년 11월 초 [우선모집] 접수 ➡️ 11월 중순 [일반모집] 3개원 희망 순위 접수 ➡️ 추첨 발표",
        "우선모집 자격: 법정저소득층, 국가보훈대상자, 북한이탈주민 및 [다자녀(2자녀 이상) 가구] 혜택 전면 적용",
        "희망 순위 배분 팁: 1희망은 가장 가고 싶은 소신 지원, 2·3희망은 선발 인원이 많거나 안정권인 곳으로 분산 지원 권장"
      ]
    },
    {
      "id": "guide-private-elem",
      "title": "전국 사립초등학교 입학 추첨 전략 & 인터뷰 가이드",
      "category": "사립초 입학",
      "badge": "사립초 입학",
      "badgeColor": "amber",
      "summary": "경쟁률이 치열한 사립초등학교(영훈, 계성, 리라 등)의 원서 접수 일정과 전산 추첨, 입학 준비 체크리스트입니다.",
      "points": [
        "추첨 방식: 서울 사립초는 진학사어플라이 시스템을 통한 비대면 무작위 전산 추첨으로 공정하게 진행",
        "중복 지원 전략: 최대 3~4개 학교까지 중복 접수가 가능하므로 셔틀버스 노선이 집 앞을 지나는지 사전 확인 필수",
        "주요 체크 포인트: 연간 1,000~1,500만 원 선의 학비 부담 능력, 방과후 돌봄 운영 시간, 통학 소요 시간 점검"
      ]
    }
  ]
};
