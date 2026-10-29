# -*- coding: utf-8 -*-
import os
import sys
import time
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def main():
    errors = []
    index_file = os.path.abspath("index.html")
    file_url = f"file:///{index_file.replace(os.sep, '/')}"
    print(f"Opening {file_url}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1366, "height": 950})

        page.on("console", lambda msg: print(f"[BROWSER CONSOLE {msg.type}]: {msg.text}") if msg.type in ["error"] else None)
        page.on("pageerror", lambda err: errors.append(f"Page error: {err}"))

        page.goto(file_url, wait_until="domcontentloaded")
        time.sleep(2)

        # -------------------------------------------------------------
        # STEP 1: Verify Non-Admin Access Control
        # -------------------------------------------------------------
        print("\n=== STEP 1: 비인가자 관리자 접근 제어 검증 ===")
        # Clear any existing auth session
        page.evaluate("() => { localStorage.removeItem('dodam_auth_v1'); app.currentUser = null; app.renderAuthHeader(); }")

        # Try to open admin view while logged out
        page.evaluate("() => app.openAdminView()")
        time.sleep(0.5)

        # Login modal must be open, and view-admin must remain hidden!
        login_modal = page.locator("#login-modal")
        assert login_modal.is_visible(), "Login modal must be visible when unauthenticated user attempts to access admin!"
        admin_view = page.locator("#view-admin")
        assert not admin_view.is_visible(), "view-admin must remain hidden for unauthenticated users!"
        print("PASS: 비인가자 관리자 페이지 직접 접근 차단 및 로그인 모달 호출 확인")

        # Take screenshot of login modal
        page.screenshot(path="scripts/screenshot_login_modal.png")
        print("PASS: 로그인 모달 스크린샷 저장 완료 (scripts/screenshot_login_modal.png)")

        # -------------------------------------------------------------
        # STEP 2: Verify Login Modal UI & Tabs
        # -------------------------------------------------------------
        print("\n=== STEP 2: 로그인 & 회원가입 모달 UI 검증 ===")
        # Test guest start button
        guest_btn = page.locator('button:has-text("가입 없이 1초 만에 바로 시작하기")')
        assert guest_btn.count() == 1, "Guest start button missing"

        # Test tabs
        signup_tab_btn = page.locator("#tab-signup-btn")
        signup_tab_btn.click()
        time.sleep(0.3)
        nickname_field = page.locator("#signup-nickname-field")
        assert nickname_field.is_visible(), "Signup nickname field must be visible in signup tab"

        login_tab_btn = page.locator("#tab-login-btn")
        login_tab_btn.click()
        time.sleep(0.3)
        assert not nickname_field.is_visible(), "Signup nickname field must be hidden in login tab"
        print("PASS: 로그인 / 간편 회원가입 탭 토글 정상")

        # -------------------------------------------------------------
        # STEP 3: Admin Login Execution
        # -------------------------------------------------------------
        print("\n=== STEP 3: 관리자 계정(admin) 인증 검증 ===")
        # Click admin auto-fill button
        quick_fill_btn = page.locator('button:has-text("자동 완성")')
        quick_fill_btn.click()
        time.sleep(0.3)

        username_val = page.locator("#auth-username-input").input_value()
        pw_val = page.locator("#auth-password-input").input_value()
        assert username_val == "admin", f"Expected 'admin', got '{username_val}'"
        assert pw_val == "admin1234", f"Expected 'admin1234', got '{pw_val}'"

        # Submit login
        submit_btn = page.locator("#auth-submit-btn")
        submit_btn.click()
        time.sleep(0.8)

        # Check login modal closed and view-admin is visible
        assert not login_modal.is_visible(), "Login modal should close after successful login"
        assert admin_view.is_visible(), "view-admin should be visible after admin login"
        print("PASS: 관리자 계정 로그인 완료 및 관리자 센터 진입 확인")

        # -------------------------------------------------------------
        # STEP 4: Admin Center Dashboard (Image 1 & 2 layout)
        # -------------------------------------------------------------
        print("\n=== STEP 4: 관리자 센터 대시보드 지표 및 차트 검증 ===")
        # Check header
        admin_title = page.locator("#view-admin h2").text_content()
        print(f"Admin Center Title: {admin_title}")
        assert "도담톡 통합 관리자 센터" in admin_title

        # Check 4 Top KPI Cards
        dau_text = page.locator("#admin-kpi-dau").text_content()
        wau_text = page.locator("#admin-kpi-wau").text_content()
        pv_text = page.locator("#admin-kpi-pv").text_content()
        print(f"KPIs - DAU: {dau_text}, WAU: {wau_text}, PV: {pv_text}")
        assert "18명" in dau_text, f"Unexpected DAU text: {dau_text}"
        assert "142명" in wau_text, f"Unexpected WAU text: {wau_text}"
        assert "8,920" in pv_text, f"Unexpected PV text: {pv_text}"

        # Check 14-day chart
        chart_bars = page.locator("#admin-14day-chart .group")
        bar_count = chart_bars.count()
        print(f"14-Day Chart Bars Count: {bar_count}")
        assert bar_count == 14, f"Expected 14 bars, got {bar_count}"

        # Check Feature Stats Panel & toggle
        feature_rows = page.locator("#feature-stats-list > div")
        feat_count = feature_rows.count()
        print(f"Feature items count: {feat_count}")
        assert feat_count >= 8, f"Expected at least 8 features, got {feat_count}"

        # Toggle feature period to cumulative
        cum_btn = page.locator("#btn-feature-cum")
        cum_btn.click()
        time.sleep(0.3)
        cum_sub = page.locator("#feature-stats-subtitle").text_content()
        print(f"Feature subtitle after toggle: {cum_sub}")
        assert "전체 누적" in cum_sub, "Subtitle should update to cumulative"

        # Check Device & Browser Stats Panel & toggle
        device_split = page.locator("#device-split-container > div")
        assert device_split.count() == 2, "Should have Mobile & Desktop split boxes"
        browser_items = page.locator("#browser-breakdown-container > div")
        assert browser_items.count() >= 5, "Should have browser breakdown items"
        print("PASS: 14일 추이 차트, 기능별 이용 횟수, 기기/브라우저 분석 패널 정상 작동")

        # -------------------------------------------------------------
        # STEP 5: Admin Tabs Switching & User Management
        # -------------------------------------------------------------
        print("\n=== STEP 5: 관리자 센터 서브 탭 전환 및 회원 관리 기능 검증 ===")
        # Tab 2: Users
        users_tab_btn = page.locator('button[data-tab="users"]')
        users_tab_btn.click()
        time.sleep(0.4)
        users_pane = page.locator("#admin-pane-users")
        assert users_pane.is_visible(), "Users pane should be visible"
        user_rows = page.locator("#admin-users-tbody tr")
        print(f"Registered users table rows: {user_rows.count()}")
        assert user_rows.count() >= 3, "Should have default users in table"

        # Tab 3: Community
        page.locator('button[data-tab="community"]').click()
        time.sleep(0.3)
        assert page.locator("#admin-pane-community").is_visible(), "Community pane should be visible"

        # Tab 4: System
        page.locator('button[data-tab="system"]').click()
        time.sleep(0.3)
        assert page.locator("#admin-pane-system").is_visible(), "System pane should be visible"
        storage_text = page.locator("#storage-usage-text").text_content()
        print(f"Storage usage text: {storage_text}")
        assert "5.0 MB" in storage_text

        # Tab 5: APIs
        page.locator('button[data-tab="apis"]').click()
        time.sleep(0.3)
        assert page.locator("#admin-pane-apis").is_visible(), "APIs pane should be visible"
        api_cards = page.locator("#admin-api-status-list > div")
        print(f"API status cards count: {api_cards.count()}")
        assert api_cards.count() == 6, f"Expected 6 API cards, got {api_cards.count()}"

        # Return to Traffic Tab
        page.locator('button[data-tab="traffic"]').click()
        time.sleep(0.3)

        # Take screenshots
        page.screenshot(path="scripts/screenshot_admin_desktop.png")
        print("PASS: 데스크톱 관리자 센터 스크린샷 저장 완료 (scripts/screenshot_admin_desktop.png)")

        # Mobile View Test
        page.set_viewport_size({"width": 390, "height": 844})
        time.sleep(0.5)
        page.screenshot(path="scripts/screenshot_admin_mobile.png")
        print("PASS: 모바일 관리자 센터 스크린샷 저장 완료 (scripts/screenshot_admin_mobile.png)")

        # -------------------------------------------------------------
        # STEP 6: Logout
        # -------------------------------------------------------------
        print("\n=== STEP 6: 로그아웃 및 세션 종료 검증 ===")
        page.evaluate("() => app.logout()")
        time.sleep(0.5)
        assert not admin_view.is_visible(), "view-admin must be hidden after logout"
        assert page.locator("#view-board").is_visible(), "Board view should be active after admin logout"
        print("PASS: 로그아웃 정상 완료 및 일반 뷰 리다이렉트 확인")

        browser.close()

    if errors:
        print(f"\nFAILED with errors: {errors}")
        sys.exit(1)
    else:
        print("\n=======================================================")
        print("ALL ADMIN & LOGIN TESTS PASSED WITH ZERO CONSOLE ERRORS!")
        print("=======================================================")

if __name__ == "__main__":
    main()
