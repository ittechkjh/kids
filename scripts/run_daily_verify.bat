@echo off
rem 안심식당 일일 검증 & 전국 행사/대회 데이터 동기화 배치
rem 이 PC 공인 IP가 MAFRA API에 등록되어 있음
rem MAFRA_API_KEY 는 사용자 환경변수로 설정할 것 (파일에 키를 쓰지 않음)
cd /d E:\kids
set PYTHONUTF8=1

rem 1. 원격 GitHub Actions 변경사항 먼저 동기화
git pull origin main --rebase

rem 2. 전국 축제/행사 및 학생 대회 데이터 최신 갱신
uv run python scripts/build_events_data.py

rem 3. 안심식당 공공데이터 수집 및 카카오/포털 실존 검증 + 빌드
if not exist scripts\data\mafra_raw.json uv run python scripts\pipeline_restaurants.py fetch
uv run python scripts\pipeline_restaurants.py verify --limit 2000
uv run python scripts\pipeline_restaurants.py build

rem 4. 갱신 결과 커밋 및 원격 푸시
git add -f js/restaurants_data.js js/events_data.js scripts/data/verify_cache.json scripts/data/mafra_raw.json
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "chore(batch): 일일 맛집 검증 및 전국 대회·행사 데이터 자동 갱신"
  git pull origin main --rebase
  git push origin main
)
