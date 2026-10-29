# -*- coding: utf-8 -*-

# 1. Clean index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<!-- A. 리치고 지표 테이블 뷰 (Default) -->', '<!-- A. 공식 학군 순위 지표 테이블 뷰 (Default) -->')
html = html.replace('MODAL 6: 리치고(RichGo) 학교 등급 산출 기준 모달', 'MODAL 6: 공식 학교 학군 등급 산출 기준 모달')
html = html.replace('리치고(RichGo) 학교 등급 산출 기준</h3>', '공식 학교 학군 등급 산출 기준</h3>')
html = html.replace('리치고(RichGo) 전국 학교 학군 등급표', '공식 공시 전국 학교 학군 등급표')
html = html.replace('리치고(RichGo)', '공식 학군')
html = html.replace('리치고', '공식 학군')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Clean js/app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

app_js = app_js.replace('>리치고</span>', '>공식인증</span>')
app_js = app_js.replace('// 6. Schools & Admissions State (리치고 학군 순위 & 입시 데이터)', '// 6. Schools & Admissions State (공식 학군 순위 & 입시 데이터)')
app_js = app_js.replace('// 8. 전국 학교 정보 & 리치고(RichGo) 학군 랭킹 통합 컨트롤러', '// 8. 전국 학교 정보 & 공식 학군 랭킹 통합 컨트롤러')
app_js = app_js.replace('// 2. Sido Pill filter (리치고 17개 시도 선택 알약 버튼)', '// 2. Sido Pill filter (공식 17개 시도 선택 알약 버튼)')
app_js = app_js.replace('// 1. 리치고 지표 테이블 뷰 렌더링', '// 1. 공식 학군 지표 테이블 뷰 렌더링')
app_js = app_js.replace('// 2. 리치고형 카드 그리드 뷰 렌더링', '// 2. 공식 학군 카드 그리드 뷰 렌더링')
app_js = app_js.replace('<!-- 리치고 시그니처 배지 바 -->', '<!-- 공식 학군 배지 바 -->')
app_js = app_js.replace('<!-- 리치고 인증 카드 -->', '<!-- 공식 학군 인증 카드 -->')
app_js = app_js.replace('// 리치고 학교 등급 산출 기준 모달 컨트롤러', '// 공식 학교 학군 등급 산출 기준 모달 컨트롤러')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Cleaned all occurrences!")
