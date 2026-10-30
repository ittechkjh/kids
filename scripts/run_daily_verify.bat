@echo off
rem 안심식당 일일 검증 배치 (이 PC 공인 IP가 MAFRA API에 등록되어 있음)
rem MAFRA_API_KEY 는 사용자 환경변수로 설정할 것 (파일에 키를 쓰지 않음)
cd /d E:\kids
set PYTHONUTF8=1
if not exist scripts\data\mafra_raw.json uv run python scripts\pipeline_restaurants.py fetch
uv run python scripts\pipeline_restaurants.py verify --limit 2000
uv run python scripts\pipeline_restaurants.py build
git add -f js/restaurants_data.js scripts/data/verify_cache.json scripts/data/mafra_raw.json
git commit -m "chore(restaurants): daily verified batch" 
git push origin main
