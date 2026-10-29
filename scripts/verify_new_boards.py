# -*- coding: utf-8 -*-
import sys
import os
import time
from playwright.sync_api import sync_playwright

def run_verification():
    html_path = os.path.abspath('index.html')
    file_url = f"file:///{html_path.replace(os.sep, '/')}"
    print(f"Loading {file_url} ...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        page.goto(file_url, wait_until="networkidle")
        time.sleep(1)

        # 1. Check window.app
        app_exists = page.evaluate("() => typeof window.app !== 'undefined'")
        print(f"1. window.app exists: {app_exists}")
        assert app_exists, "window.app is undefined!"

        # 2. Check 8 nav buttons
        nav_buttons = page.locator("nav .nav-view-btn")
        nav_count = nav_buttons.count()
        print(f"2. Navigation buttons count: {nav_count} (expected 8)")
        assert nav_count == 8, f"Expected 8 nav buttons, got {nav_count}"

        # 3. Test Apartment tab (#view-apartments)
        print("3. Testing Apartments board...")
        apt_btn = page.locator('nav button[data-view="apartments"]')
        apt_btn.click()
        time.sleep(0.5)

        apt_view = page.locator('#view-apartments')
        assert apt_view.is_visible(), "#view-apartments is not visible after click"

        # Check preset chips
        preset_chips = page.locator('#apartments-preset-chips button')
        print(f"   Apartment preset chips count: {preset_chips.count()}")
        assert preset_chips.count() >= 5, "Preset chips not rendered"

        # Wait a moment for default auto-search or click a preset
        page.locator('#apartments-preset-chips button:has-text("은마")').click()
        time.sleep(1.5)

        results_box = page.locator('#apartments-district-results-box')
        results_text = results_box.text_content()
        print(f"   Results loaded for apartment search (len: {len(results_text)})")
        assert "선택 단지" in results_text or "배정 초등학교" in results_text, "Apartment results not rendered"
        print("   ✅ Apartments board verified successfully!")

        # 4. Test Admissions tab (#view-admissions)
        print("4. Testing Admissions board...")
        adm_btn = page.locator('nav button[data-view="admissions"]')
        adm_btn.click()
        time.sleep(0.5)

        adm_view = page.locator('#view-admissions')
        assert adm_view.is_visible(), "#view-admissions is not visible after click"

        # Check categories
        cat_chips = page.locator('#admissions-category-chips button')
        print(f"   Admissions category chips count: {cat_chips.count()}")
        assert cat_chips.count() >= 6, "Admissions categories not rendered"

        # Check guide cards
        guide_cards = page.locator('#admissions-list-container .community-card')
        guide_count = guide_cards.count()
        print(f"   Admissions guide cards count: {guide_count} (expected 8)")
        assert guide_count == 8, f"Expected 8 guides, got {guide_count}"

        # 5. Test Category filter (e.g., 2028 대입개편)
        print("5. Testing Category filter...")
        page.locator('#admissions-category-chips button:has-text("2028")').click()
        time.sleep(0.3)
        filtered_cards = page.locator('#admissions-list-container .community-card').count()
        print(f"   Filtered cards for 2028: {filtered_cards}")
        assert 1 <= filtered_cards < 8, "Category filter did not work properly"

        # Reset to all
        page.locator('#admissions-category-chips button:has-text("전체")').click()
        time.sleep(0.3)
        assert page.locator('#admissions-list-container .community-card').count() == 8

        # 6. Test Keyword search
        print("6. Testing Admissions keyword search...")
        search_input = page.locator('#admissions-search-input')
        search_input.fill("5등급")
        time.sleep(0.3)
        search_count = page.locator('#admissions-list-container .community-card').count()
        print(f"   Search results for '5등급': {search_count}")
        assert search_count >= 1, "Keyword search returned 0 results"

        # Clear search
        page.locator('#admissions-search-clear').click()
        time.sleep(0.3)
        assert page.locator('#admissions-list-container .community-card').count() == 8

        # 7. Test Admission Detail Modal
        print("7. Testing Admission detail modal...")
        first_detail_btn = page.locator('#admissions-list-container button:has-text("상세 분석 & 비교표 보기")').first
        first_detail_btn.click()
        time.sleep(0.5)

        modal = page.locator('#admission-detail-modal')
        assert modal.is_visible(), "Admission modal is not visible after click"
        modal_body = page.locator('#admission-modal-body').text_content()
        print(f"   Modal body loaded (len: {len(modal_body)})")
        assert len(modal_body) > 100, "Modal body is too short or empty"

        # Close modal
        page.locator('#admission-detail-modal button:has-text("닫기")').first.click()
        time.sleep(0.3)
        assert not modal.is_visible(), "Modal did not close"
        print("   ✅ Admissions board and modal verified successfully!")

        # 8. Check for user-visible '리치고'
        body_text = page.locator('body').inner_text()
        richgo_occurrences = body_text.count("리치고")
        print(f"8. User-visible occurrences of '리치고': {richgo_occurrences}")
        assert richgo_occurrences == 0, f"Found {richgo_occurrences} visible occurrences of '리치고'!"

        # 9. Verify zero critical console errors
        critical_errors = [e for e in console_errors if "Failed to load resource" not in e]
        print(f"9. Console errors: {len(critical_errors)}")
        for err in critical_errors:
            print("   Error:", err)
        assert len(critical_errors) == 0, f"Critical console errors detected: {critical_errors}"

        browser.close()
        print("\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉")

if __name__ == '__main__':
    run_verification()
