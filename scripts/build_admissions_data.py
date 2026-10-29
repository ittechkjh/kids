# -*- coding: utf-8 -*-
import json, sys, io

admissions_data = {
    "metadata": {
        "title": "교육부(MOE)·대교협·평가원 공식 입시 정보 포털",
        "lastUpdated": "2026-10-29",
        "totalCount": 8,
        "officialSources": [
            {"name": "교육부 (MOE)", "url": "https://www.moe.go.kr"},
            {"name": "대입정보포털 어디가 (ADIGA)", "url": "https://www.adiga.kr"},
            {"name": "한국대학교육협의회 (대교협)", "url": "https://www.kcue.or.kr"},
            {"name": "한국교육과정평가원 (수능)", "url": "https://www.suneung.re.kr"},
            {"name": "학교알리미", "url": "https://www.schoolinfo.go.kr"},
            {"name": "EBSi 입시정보", "url": "https://www.ebsi.co.kr"}
        ]
    },
    "categories": [
        {"id": "all", "name": "전체 입시 정보", "icon": "fa-list-check"},
        {"id": "reform2028", "name": "2028 대입개편", "icon": "fa-bullseye"},
        {"id": "college", "name": "수시·정시 전형", "icon": "fa-graduation-cap"},
        {"id": "highcredit", "name": "고교학점제", "icon": "fa-book-open-reader"},
        {"id": "specialhigh", "name": "특목·자사고 고입", "icon": "fa-award"},
        {"id": "curriculum", "name": "초·중등 교육과정", "icon": "fa-school"},
        {"id": "policy", "name": "교육부 정책 보도", "icon": "fa-newspaper"}
    ],
    "guides": [
        {
            "id": "adm-2028-reform-final",
            "category": "reform2028",
            "categoryName": "2028 대입개편",
            "title": "[교육부 확정] 2028학년도 대학입학제도 개편 확정안 총정리 (수능·내신)",
            "agency": "교육부 대학규제혁신총괄과",
            "date": "2026.10.28",
            "badge": "필독",
            "badgeColor": "bg-rose-500 text-white",
            "target": "현재 중3 ~ 초6 학생 및 학부모",
            "summary": "문·이과 선택과목 완전 폐지 통합형 수능 도입, 고교 전 학년 내신 9등급제 ➔ 5등급제 개편 및 상대·절대평가 병기 확정",
            "keyPoints": [
                "수능 국어·수학·탐구 영역 선택과목 완전 폐지, 공통과목 중심 통합 평가",
                "수능 탐구: 17개 선택과목 폐지 ➔ '통합사회' 및 '통합과학' 전원 공통 응시",
                "고교 전 학년 내신 기존 9등급제 ➔ 5등급제 (1등급 10%, 2등급 24%, 3등급 32%)",
                "고교 내신 성취도(A~E) 절대평가와 석차등급(1~5등급) 상대평가 동시 기재",
                "지식 암기형 평가 지양 ➔ 논·서술형 내신 평가 대폭 확대"
            ],
            "content": """
<h3>1. 2028학년도 대입개편안 추진 배경 및 핵심 방향</h3>
<p>교육부는 과도한 입시 경쟁과 사교육 카르텔을 유발하던 문·이과 유불리 현상을 근본적으로 해소하고, 고교학점제와 2022 개정 교육과정의 취지를 실질적으로 반영하기 위해 2028 대입개편안을 확정 공시하였습니다.</p>

<div class="my-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
  <h4 class="font-black text-indigo-900 text-sm mb-2">📌 2028 수능 개편 핵심 비교표</h4>
  <table class="w-full text-xs text-left border-collapse">
    <thead>
      <tr class="border-b border-indigo-200 text-indigo-900">
        <th class="py-2">영역</th>
        <th class="py-2">기존 수능 (현행)</th>
        <th class="py-2 text-rose-600 font-black">2028 개편 수능 (확정)</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-indigo-100 text-slate-700">
      <tr>
        <td class="py-2 font-bold">국어</td>
        <td>공통(독서·문학) + 선택(화작/언매)</td>
        <td class="font-bold text-indigo-700">공통국어 (선택과목 없음, 동일 시험)</td>
      </tr>
      <tr>
        <td class="py-2 font-bold">수학</td>
        <td>공통(수I·수II) + 선택(확통/미적/기하)</td>
        <td class="font-bold text-indigo-700">대수 + 미적분I + 확률과통계 (공통 응시)</td>
      </tr>
      <tr>
        <td class="py-2 font-bold">사회·탐구</td>
        <td>사회 9과목, 과학 8과목 중 택2</td>
        <td class="font-bold text-rose-600">통합사회 + 통합과학 (전원 공통 응시)</td>
      </tr>
      <tr>
        <td class="py-2 font-bold">한국사/영어</td>
        <td>절대평가 (9등급)</td>
        <td class="font-bold text-indigo-700">절대평가 현행 유지 (9등급)</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>2. 고교 내신 5등급제 개편 상세</h3>
<p>학생 수 급감에 따라 소규모 학교 및 심화과목에서 1등급(4%) 산출이 불가능했던 왜곡을 막기 위해 5등급 체제로 전환됩니다.</p>
<ul class="list-disc pl-5 space-y-1 text-slate-700 my-2">
  <li><strong>1등급:</strong> 상위 10% (기존 9등급제의 1~2등급 상위권 통합)</li>
  <li><strong>2등급:</strong> 10% 초과 ~ 34% (누적 34%)</li>
  <li><strong>3등급:</strong> 34% 초과 ~ 66% (누적 66%)</li>
  <li><strong>4등급:</strong> 66% 초과 ~ 90% (누적 90%)</li>
  <li><strong>5등급:</strong> 90% 초과 ~ 100% (하위 10%)</li>
</ul>
<p class="mt-3 text-slate-600">※ 진로선택과목 및 융합선택과목을 포함한 전 과목에 성취도(A~E)와 석차등급(1~5등급)이 함께 기재됩니다.</p>
            """,
            "officialUrl": "https://www.moe.go.kr/boardCnts/view.do?boardID=294&boardSeq=97445&lev=0&searchType=S&statusYN=W&page=1&s=moe&m=020402&opType=N"
        },
        {
            "id": "adm-high-credit-system",
            "category": "highcredit",
            "categoryName": "고교학점제",
            "title": "[고교학점제] 2025~2028 전면 시행 가이드: 192학점 이수 및 과목 선택 로드맵",
            "agency": "교육부 책임교육정책실",
            "date": "2026.10.25",
            "badge": "공식가이드",
            "badgeColor": "bg-emerald-600 text-white",
            "target": "중2 ~ 고2 학생 및 학부모",
            "summary": "학생이 적성과 진로에 따라 과목을 선택하고 누적 학점(192학점)을 채워 졸업하는 고교학점제 완벽 분석",
            "keyPoints": [
                "총 192학점 이수 (교과 174학점 + 창의적 체험활동 18학점)",
                "수업량 유연화: 1학점 수업량은 16회(기존 17회 대비 1회 감축)",
                "최소 학업성취수준(40% 미만) 미달 시 '미이수(I학점)' 제도 및 예방 지도 운영",
                "공통과목(1학년) + 선택과목(일반선택/진로선택/융합선택, 2~3학년) 체계"
            ],
            "content": """
<h3>1. 고교학점제란?</h3>
<p>고교학점제는 고등학생이 기초 소양과 기본 학력을 바탕으로 진로·적성에 따라 과목을 선택하고, 이수 기준에 도달한 과목에 대해 학점을 취득·누적하여 졸업하는 제도입니다.</p>

<div class="my-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
  <h4 class="font-black text-emerald-900 text-sm">🎒 과목 유형별 특성</h4>
  <p><strong>공통과목 (1학년):</strong> 국어, 수학, 영어, 한국사, 통합사회, 통합과학, 과학탐구실험 등 기본 학력 함양 필수 과목</p>
  <p><strong>일반선택과목 (2~3학년):</strong> 교과별 학문 영역 내 주요 학습 내용으로 대학 진학 기본 교과</p>
  <p><strong>진로선택과목:</strong> 심화 학습 및 진로 관련 전공 기초 과목 (예: 인공지능 수학, 고급 물리학 등)</p>
  <p><strong>융합선택과목:</strong> 교과 내·교과 간 융합 주제 중심 실생활 연계 과목</p>
</div>

<h3>2. 학부모 과목 선택 팁</h3>
<p>주요 대학(서울대, 연세대, 고려대, 성균관대 등)은 학생부종합전형 및 정시 교과평가에서 학생이 지망하는 학과와 관련된 권장 이수 과목을 충실히 들었는지를 매우 중요하게 평가합니다. 대학별 <strong>‘전공 연계 핵심 권장과목’</strong>을 1학년 2학기 과목 선택 조사 전에 반드시 확인하시기 바랍니다.</p>
            """,
            "officialUrl": "https://www.moe.go.kr/sub/info.do?m=030206&s=moe"
        },
        {
            "id": "adm-susi-jungsi-timeline",
            "category": "college",
            "categoryName": "수시·정시 전형",
            "title": "[대교협 공시] 2026~2027학년도 대학입학전형 기본사항 및 전형별 타임라인",
            "agency": "한국대학교육협의회 (대교협)",
            "date": "2026.10.22",
            "badge": "일정안내",
            "badgeColor": "bg-indigo-600 text-white",
            "target": "고1 ~ 고3 수험생 및 학부모",
            "summary": "수시모집 6회 지원, 정시모집 3회(가/나/다군) 지원 원칙 및 수시 원서접수, 수능일정, 충원합격 마감일 총정리",
            "keyPoints": [
                "수시모집 학생부 작성 기준일: 8월 31일",
                "수시모집 원서접수: 매년 9월 초 (대학별 3일 이상 실시)",
                "대학수학능력시험: 매년 11월 셋째 주 목요일 시행",
                "정시모집 원서접수: 12월 말 ~ 1월 초 (군별 1개씩 총 3회 지원 가능)"
            ],
            "content": """
<h3>1. 4대 주요 전형 유형</h3>
<ul class="list-disc pl-5 space-y-2 text-slate-700 my-3">
  <li><strong>학생부교과전형:</strong> 교과 성적(내신)을 50% 이상 정량 반영하는 전형으로 수능 최저학력기준 적용 여부가 핵심 합격선 결정 변수입니다.</li>
  <li><strong>학생부종합전형:</strong> 학교생활기록부의 교과 이수 내용, 세부능력 및 특기사항(세특), 창체 활동을 정성 종합 평가합니다.</li>
  <li><strong>논술위주전형:</strong> 대학별 고사(인문/자연 논술) 성적을 중심으로 선발하며 수능 최저기준 충족이 관건입니다.</li>
  <li><strong>수능위주전형 (정시):</strong> 수능 표준점수, 백분위, 변환표준점수를 바탕으로 가/나/다군 각 1곳씩 선발합니다.</li>
</ul>

<h3>2. 수험생 유의사항</h3>
<p>수시모집에 합격(최초 합격 및 충원 합격 포함)한 자는 정시모집 및 추가모집에 일체 지원할 수 없으므로, 정시 지원 가능 대학 라인을 고려하여 신중하게 수시 6장을 배분해야 합니다.</p>
            """,
            "officialUrl": "https://www.adiga.kr"
        },
        {
            "id": "adm-special-highschool-guide",
            "category": "specialhigh",
            "categoryName": "특목·자사고 고입",
            "title": "[고입 가이드] 전국단위 자사고·외고·국제고·과학고 전형 분석 및 합격 전략",
            "agency": "전국 시·도교육청 입학전형위원회",
            "date": "2026.10.20",
            "badge": "고입전략",
            "badgeColor": "bg-amber-600 text-white",
            "target": "초5 ~ 중3 학생 및 학부모",
            "summary": "외대부고·하나고·상산고·대원외고 등 전국 명문 특목고·자사고 전형 절차 및 중학교 내신·자기소개서·면접 가이드",
            "keyPoints": [
                "전기고(영재학교 5~8월, 과학고 8~11월) 및 후기고(자사고·외고·국제고·일반고 12월) 전형 구분",
                "영재학교: 지필평가(영재성 검사) 및 캠프 전형 운영, 과고와 중복지원 제한",
                "자사고·외고·국제고: 1단계 교과성적+출결 ➔ 2단계 면접(자기주도학습영역+인성영역)",
                "2028 대입 개편에 따른 특목·자사고 진학 유불리 심층 분석"
            ],
            "content": """
<h3>1. 고등학교 전기·후기 선발 구조</h3>
<p>대한민국 고등학교 입학전형은 크게 전기 선발과 후기 선발로 나뉩니다.</p>
<ul class="list-disc pl-5 space-y-1 text-slate-700 my-2">
  <li><strong>전기 선발 (4~11월):</strong> 영재학교, 과학고등학교, 마이스터고, 예·체고, 특성화고</li>
  <li><strong>후기 선발 (12월~1월):</strong> 전국단위 자율형사립고, 광역단위 자사고, 외국어고, 국제고, 일반계 고등학교</li>
</ul>

<div class="my-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
  <h4 class="font-black text-amber-950 text-sm mb-1.5">💡 2028 내신 5등급제 전환 시 특목·자사고의 변화</h4>
  <p class="text-xs text-slate-700 leading-relaxed">
    기존 9등급제에서는 학생 수가 적거나 면학 분위기가 뛰어난 특목·자사고에서 1등급(4%)을 받기가 극도로 어려웠으나, 5등급제 개편으로 1등급(10%), 2등급(34%)까지 상위권 구간이 넓어짐에 따라 <strong>우수한 교육과정 편성과 심화 탐구 역량을 갖춘 자사고·특목고의 입시 경쟁력이 더욱 부각</strong>될 것으로 교육 전문가들은 분석하고 있습니다.
  </p>
</div>
            """,
            "officialUrl": "https://www.schoolinfo.go.kr"
        },
        {
            "id": "adm-medical-school-quota",
            "category": "college",
            "categoryName": "수시·정시 전형",
            "title": "[의약학 입시] 의과대학·치대·한의대·약대 입시 전략 및 지역인재전형 분석",
            "agency": "교육부 대학입학정책과",
            "date": "2026.10.18",
            "badge": "의대이슈",
            "badgeColor": "bg-rose-600 text-white",
            "target": "초등 고학년 ~ 고등 학부모",
            "summary": "비수도권 의대 지역인재전형 60% 이상 선발 기준, 수능 최저기준 충족률 및 주요 대학 전형 요소 총망라",
            "keyPoints": [
                "의대 증원 및 무전공(자율전공) 정원 확대에 따른 전형별 합격선 지각변동",
                "비수도권 의대 '지방대학 및 지역균형인재 육성에 관한 법률'에 따른 지역인재전형 선발",
                "의대 수시모집 학생부교과전형: 내신 올 1등급 및 국·수·영·탐 3~4개합 5 이내 최저기준",
                "다중미니면접(MMI, Multiple Mini Interview)의 중요성 급부상"
            ],
            "content": """
<h3>1. 의약학계열 선발 핵심 특징</h3>
<p>의대, 치대, 한의대, 약대, 수의대는 최상위권 수험생들의 지원이 집중되는 교과목으로, 수시모집에서는 <strong>내신 극상위권(1.0~1.3등급대)</strong>과 높은 수능 최저학력기준이 요구됩니다.</p>
<p>특히 지방 소재 의과대학의 경우 입학정원의 60% 이상을 해당 지역 고교 졸업생으로 선발하는 <strong>'지역인재전형'</strong>이 의무화되어 있어, 충청·호남·영남권 명문 학군(대전 둔산, 대구 수성, 부산 해운대 등)의 입시 전략이 매우 중요해졌습니다.</p>
            """,
            "officialUrl": "https://www.adiga.kr"
        },
        {
            "id": "adm-free-semester-roadmap",
            "category": "curriculum",
            "categoryName": "초·중등 교육과정",
            "title": "[2022 개정 교육과정] 중학교 자유학기제 및 진로연계학기 운영 안내",
            "agency": "교육부 중등교육과정정책과",
            "date": "2026.10.15",
            "badge": "교육과정",
            "badgeColor": "bg-sky-600 text-white",
            "target": "초5 ~ 중1 학부모",
            "summary": "중학교 1학년 1학기(또는 1년) 지필평가 미실시와 진로탐색 활동, 중3 2학기 진로연계학기를 통한 고교 진학 준비",
            "keyPoints": [
                "중학교 자유학기: 1학년 중 1개 학기 또는 1개년 지정 운영 (지필평가 대신 과정중심평가)",
                "진로연계학기: 중3 2학기에 고교 생활 및 과목 선택, 고교학점제 기초 소양 사전 이수",
                "초등 6학년 2학기: 중학교 생활 적응 및 자유학기 준비 진로연계 프로그램 운영"
            ],
            "content": """
<h3>1. 중학교 자유학기제 운영 개요</h3>
<p>자유학기제는 중간·기말고사 등 지필시험 부담에서 벗어나 토론, 실습, 동아리, 예술·체육, 진로탐색 등 학생 참여형 수업과 과정중심평가를 진행하는 제도입니다.</p>
<p>2022 개정 교육과정에 따라 자유학기는 1학년 1개 학기(102시간)로 집중 운영되며, 3학년 2학기에는 고등학교 학습 준비를 지원하는 <strong>'진로연계학기'</strong>가 운영됩니다.</p>
            """,
            "officialUrl": "https://www.moe.go.kr"
        },
        {
            "id": "adm-no-major-expansion",
            "category": "college",
            "categoryName": "수시·정시 전형",
            "title": "[대학 혁신] 주요 대학 '무전공(자율전공)' 선발 확대 및 전공 배정 기준",
            "agency": "교육부 고등교육정책실",
            "date": "2026.10.12",
            "badge": "대학이슈",
            "badgeColor": "bg-teal-600 text-white",
            "target": "중3 ~ 고3 학생 및 학부모",
            "summary": "전공 구분 없이 입학하여 1~2학년 탐색 후 자유롭게 학과를 선택하는 무전공 선발 유형1, 유형2 전형 가이드",
            "keyPoints": [
                "유형1 (자율전공): 보건의료·사범계열 등을 제외한 모든 전공을 100% 자율 선택",
                "유형2 (단과대 자율전공): 단과대학 내 학과 또는 광역 계열 내에서 전공 선택",
                "수도권 주요 73개 대학 기준 전체 모집정원의 약 25% 이상으로 대폭 확대"
            ],
            "content": """
<h3>1. 무전공(전공자율선택제) 확대 취지</h3>
<p>학생들의 전공 선택권을 보장하고 융합형 인재를 양성하기 위해 정부 대학재정지원사업과 연계하여 서울대, 연세대, 고려대, 성균관대, 한양대 등 주요 대학에서 무전공 선발을 대폭 확대하였습니다.</p>
<p>진로가 명확하지 않거나 다양한 융합 분야를 희망하는 수험생에게 매우 유리한 선택지가 될 수 있습니다.</p>
            """,
            "officialUrl": "https://www.kcue.or.kr"
        },
        {
            "id": "adm-private-education-measures",
            "category": "policy",
            "categoryName": "교육부 정책 보도",
            "title": "[사교육 경감] 교육부 공교육 경쟁력 제고 및 킬러문항 완전 배제 공시",
            "agency": "교육부 대변인실",
            "date": "2026.10.08",
            "badge": "정책발표",
            "badgeColor": "bg-slate-700 text-white",
            "target": "전체 학부모 및 학생",
            "summary": "공교육 교육과정 범위 밖 킬러문항 출제 완전 배제 및 EBS 연계 체감도 제고, 사교육 경감 종합 대책 현황",
            "keyPoints": [
                "수능 킬러문항 점검위원회 상설 가동으로 교육과정 외 초고난도 문항 완전 배제",
                "EBS 연계율 50% 유지하되 교재 내 도표·지문 연계 체감도 대폭 상승",
                "방과후 학교, 늘봄학교 전국 초등학교 전면 확대를 통한 돌봄·교육 사교육 경감"
            ],
            "content": """
<h3>1. 공교육 정상화 및 수능 적정 난이도 확보</h3>
<p>교육부는 고등학교 정규 교육과정을 충실히 이수한 학생이라면 사교육의 도움 없이도 충분히 풀 수 있는 '적정 난이도'의 변별력 있는 문항을 출제하는 기조를 확립하였습니다.</p>
<p>불필요한 꼬기 문항 대신 종합적 사고력과 문제 해결력을 측정하는 문항 중심 출제가 정착되고 있습니다.</p>
            """,
            "officialUrl": "https://www.moe.go.kr"
        }
    ]
}

js_content = f"""// 교육부(MOE)·대교협·평가원 공식 입시 정보 포털 데이터베이스
// 2028 대입 개편안, 고교학점제, 수시·정시 전형 가이드, 특목·자사고 고입
window.DODAM_ADMISSIONS_DATA = {json.dumps(admissions_data, ensure_ascii=False, indent=2)};
"""

with open('data/seeds/admissions_official_seed.json', 'w', encoding='utf-8') as f:
    json.dump(admissions_data, f, ensure_ascii=False, indent=2)

with open('js/admissions_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Generated admissions data! File size:", len(js_content))
