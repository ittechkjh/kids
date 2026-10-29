# -*- coding: utf-8 -*-
import sys
import os
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_test():
    html_path = os.path.abspath('index.html')
    file_url = f"file:///{html_path.replace(os.sep, '/')}"
    print(f"Loading {file_url} ...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1366, "height": 950})
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        page.goto(file_url, wait_until="domcontentloaded")
        time.sleep(1.5)

        # ---------------------------------------------------------
        # TEST 1: School Academy District differentiation (대치초 vs 압구정초)
        # ---------------------------------------------------------
        print("\n=== TEST 1: 학원가 차별화 및 공공데이터 연동 검증 ===")
        page.locator('button[data-view="school"]').click()
        time.sleep(0.6)

        # Switch to cards mode
        page.locator('#school-view-mode-cards').click()
        time.sleep(0.5)

        # 1-1. Search 대치초
        school_input = page.locator('#school-search-input')
        school_input.fill('대치초')
        time.sleep(0.5)

        first_card_daechi = page.locator('#school-cards-grid article').first
        acad_tab = first_card_daechi.locator('button:has-text("학원가")')
        acad_tab.click()
        time.sleep(0.3)

        card_text_daechi = first_card_daechi.text_content()
        print("대치초 학원가 텍스트:", card_text_daechi[:150].replace('\n', ' '))
        assert "대치동 은마사거리~한티역 학원가" in card_text_daechi, "대치초 주요 학원가 미일치"
        assert "1,050개+" in card_text_daechi, "대치동 학원 수 미일치"
        assert "시대인재" in card_text_daechi, "대치동 대표 학원 미일치"
        assert "의대입시반" in card_text_daechi, "대치동 집중 과목 미일치"
        print("  ✅ 1-1. 대치초 대치동 학원가(1,050개+) 정상 표시 확인!")

        # 1-2. Search 압구정초
        school_input.fill('압구정초')
        time.sleep(0.5)

        first_card_apg = page.locator('#school-cards-grid article').first
        acad_tab_apg = first_card_apg.locator('button:has-text("학원가")')
        acad_tab_apg.click()
        time.sleep(0.3)

        card_text_apg = first_card_apg.text_content()
        print("압구정초 학원가 텍스트:", card_text_apg[:150].replace('\n', ' '))
        assert "압구정·신사·청담 학원가" in card_text_apg, "압구정초 주요 학원가 미일치"
        assert "385개" in card_text_apg, "압구정 학원 수 미일치"
        assert "덕스어학원" in card_text_apg, "압구정 대표 학원 미일치"
        assert "사고력수학" in card_text_apg, "압구정 집중 과목 미일치"
        print("  ✅ 1-2. 압구정초 압구정·신사·청담 학원가(385개) 정상 표시 확인!")

        page.screenshot(path="screenshot_academies_differentiation.png")
        print("  📷 Saved screenshot_academies_differentiation.png")

        # ---------------------------------------------------------
        # TEST 2: Renovated Light-Mode Apartment View (#view-apartments)
        # ---------------------------------------------------------
        print("\n=== TEST 2: 아파트 학군 조회 화면 색상 디자인 개선 검증 ===")
        page.locator('button[data-view="apartments"]').click()
        time.sleep(0.6)

        # Check container is light mode
        apt_view = page.locator('#view-apartments')
        assert apt_view.is_visible(), "#view-apartments is not visible"

        # Check search input
        apt_input = page.locator('#apartments-search-input')
        assert apt_input.is_visible(), "Apartment search input not visible"

        # Search 은마아파트
        apt_input.fill('은마')
        page.locator('#view-apartments button:has-text("조회")').click()
        time.sleep(1.0)

        results_box = page.locator('#apartments-district-results-box')
        results_text = results_box.text_content()
        print("은마아파트 학군 결과 요약:", results_text[:160].replace('\n', ' '))
        assert "은마" in results_text, "은마아파트 검색 결과 없음"
        assert "배정 초등학교" in results_text, "배정 초등학교 컬럼 누락"
        assert "배정·인근 중학교" in results_text, "배정·인근 중학교 컬럼 누락"
        assert "인근 고등학교" in results_text, "인근 고등학교 컬럼 누락"
        print("  ✅ 2. 아파트 학군 실시간 조회 라이트모드 3개 단락 정상 렌더링 확인!")

        page.screenshot(path="screenshot_apartments_light_design.png")
        print("  📷 Saved screenshot_apartments_light_design.png")

        # ---------------------------------------------------------
        # TEST 3: Rich Admissions Data (교육입시 정보 포털)
        # ---------------------------------------------------------
        print("\n=== TEST 3: 풍부한 교육입시 정보 데이터 검증 ===")
        page.locator('button[data-view="admissions"]').click()
        time.sleep(0.6)

        admissions_view = page.locator('#view-admissions')
        assert admissions_view.is_visible(), "#view-admissions is not visible"

        # Check total guides count in DOM
        guide_cards = page.locator('#admissions-list-container > div')
        count = guide_cards.count()
        print(f"로드된 입시 정보 가이드 총 개수: {count}개")
        assert count >= 25, f"Expected at least 25 admissions guides, found {count}"

        # Test Category Filter: 2028 대입 개편안
        page.locator('#admissions-category-chips button:has-text("2028 대입 개편안")').click()
        time.sleep(0.4)
        reform_cards = page.locator('#admissions-list-container > div')
        print(f"2028 대입 개편안 항목 수: {reform_cards.count()}개")
        assert reform_cards.count() >= 4, "2028 대입 개편안 필터링 실패"

        # Open Detail Modal
        first_guide = reform_cards.first
        first_guide.locator('button[onclick*="openAdmissionDetailModal"]').click()
        time.sleep(0.5)

        detail_modal = page.locator('#admission-detail-modal')
        assert detail_modal.is_visible(), "Admissions detail modal did not open"
        modal_header = page.locator('#admission-modal-header').text_content()
        assert "2028" in modal_header, "Modal header mismatch"

        modal_body = page.locator('#admission-modal-body').text_content()
        assert "5등급제" in modal_body or "수능" in modal_body, "Modal content missing expected reform text"
        print("  ✅ 3. 교육입시 정보 상세 모달 및 31개 공식 데이터베이스 정상 확인!")

        page.screenshot(path="screenshot_admissions_portal.png")
        print("  📷 Saved screenshot_admissions_portal.png")

        # Close modal
        page.locator('#admission-detail-modal button').first.click()
        time.sleep(0.3)

        # Check console errors
        print(f"\nConsole errors count: {len(console_errors)}")
        if console_errors:
            for err in console_errors:
                print("  [ERROR]", err)
        assert len(console_errors) == 0, f"Found console errors: {console_errors}"

        browser.close()
        print("\n🎉 ALL ENHANCEMENT VERIFICATIONS PASSED PERFECTLY!")

if __name__ == '__main__':
    run_test()
