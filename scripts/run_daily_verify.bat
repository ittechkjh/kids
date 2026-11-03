@echo off
rem 안심식당 일일 검증 & 전국 행사/대회 데이터 동기화 배치 (새벽 03:00 자동 실행)
cd /d E:\kids
set PYTHONUTF8=1
set PATH=C:\Users\Administrator\.local\bin;%PATH%
set LOGFILE=E:\kids\scripts\daily_verify.log

echo ======================================================== >> %LOGFILE%
echo [검증 배치 시작] %DATE% %TIME% >> %LOGFILE%

rem 1. 원격 GitHub Actions 변경사항 먼저 동기화 (오류 발생 시에도 로컬 검증 중단 방지)
git pull origin main --rebase >> %LOGFILE% 2>&1

rem 2. 전국 축제/행사 및 학생 대회 데이터 최신 갱신
uv run python scripts/build_events_data.py >> %LOGFILE% 2>&1

rem 3. 안심식당 공공데이터 수집 및 카카오/포털 실존 검증 + 빌드
if not exist scripts\data\mafra_raw.json (
  uv run python scripts\pipeline_restaurants.py fetch >> %LOGFILE% 2>&1
)
uv run python scripts\pipeline_restaurants.py verify --limit 4000 --workers 8 >> %LOGFILE% 2>&1
uv run python scripts\pipeline_restaurants.py heal --limit 150 >> %LOGFILE% 2>&1
uv run python scripts\pipeline_restaurants.py build >> %LOGFILE% 2>&1

rem 4. 갱신 결과 커밋 및 원격 푸시
git add -f js/restaurants_data.js js/events_data.js scripts/data/verify_cache.json scripts/data/mafra_raw.json >> %LOGFILE% 2>&1
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "chore(batch): 일일 맛집 검증 및 전국 대회·행사 데이터 자동 갱신 [skip ci]" >> %LOGFILE% 2>&1
  git push origin main >> %LOGFILE% 2>&1
)

echo [검증 배치 종료] %DATE% %TIME% >> %LOGFILE%
exit /b 0
