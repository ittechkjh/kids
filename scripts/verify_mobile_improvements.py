# -*- coding: utf-8 -*-
"""
Verification of mobile UI/UX improvements using Playwright.
Tests viewports (390x844 iPhone 14 and 375x667 iPhone SE).
"""
import sys
import os
from playwright.sync_api import sync_playwright

def verify_mobile():
    html_path = os.path.abspath('index.html')
    url = f"file:///{html_path.replace(os.sep, '/')}"

    errors = []
    
    with sync_playwright() as p:
        # 1. iPhone 14 (390 x 844)
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        page = context.new_page()

        page.on("pageerror", lambda err: errors.append(f"JS PageError: {err}"))
        page.on("console", lambda msg: errors.append(f"Console error: {msg.text}") if msg.type == "error" else None)

        print(f"Loading {url} in mobile viewport (390x844)...")
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(1000)

        # 1. Measure header height (reduced from 350px to ~200-230px, and relative on mobile)
        header_box = page.locator('header').bounding_box()
        print(f"Mobile Header Box: {header_box}")
        assert header_box['height'] <= 235, f"Header height too large: {header_box['height']}px"

        # 2. Measure category chips height
        chips_box = page.locator('#board-category-chips').bounding_box()
        print(f"Mobile Category Chips Box: {chips_box}")
        assert chips_box['height'] <= 210, f"Category chips height too large: {chips_box['height']}px"

        # 3. Check mobile action button '글쓰기' bounding box
        write_btn = page.locator('header .coral-badge-gradient span:has-text("글쓰기")').first
        write_box = write_btn.bounding_box()
        print(f"Mobile Write Button Text Box: {write_box}")
        # Height should be <= 25px (single line, not stacked)
        assert write_box['height'] <= 26, f"Write button text wrapped vertically! height={write_box['height']}"

        # 4. Check bottom search button '검색'
        search_btn = page.locator('#view-board button:has-text("검색")').first
        search_box = search_btn.bounding_box()
        print(f"Board Bottom Search Button Box: {search_box}")
        assert search_box['height'] <= 35, f"Search button text wrapped! height={search_box['height']}"

        # 5. Check 8-nav items (4x2 grid)
        nav_box = page.locator('header nav').bounding_box()
        print(f"Mobile Nav Box: {nav_box}")
        assert nav_box['height'] <= 115, f"Nav height too large for 4x2 grid: {nav_box['height']}px"

        # Capture initial board view
        page.screenshot(path="scripts/mobile_improved_board.png")
        print("Captured scripts/mobile_improved_board.png")

        # 6. Test scrolling & mobile-scroll-top-btn
        page.evaluate("window.scrollTo(0, 600)")
        page.wait_for_timeout(500)
        top_btn = page.locator('#mobile-scroll-top-btn')
        is_visible = top_btn.is_visible()
        btn_class = top_btn.get_attribute("class")
        print(f"Top Button visible after scroll: {is_visible}, class: {btn_class}")
        assert 'opacity-100' in btn_class, "Top button did not become opaque on scroll!"

        page.screenshot(path="scripts/mobile_improved_scroll.png")
        print("Captured scripts/mobile_improved_scroll.png")

        # Click top button and verify scroll back to 0
        top_btn.click()
        page.wait_for_timeout(600)
        scroll_y = page.evaluate("window.scrollY")
        print(f"Scroll Y after clicking top button: {scroll_y}")
        assert scroll_y < 50, f"Scroll did not return to top! scrollY={scroll_y}"

        # 7. Test switching views on mobile
        # Food view
        page.locator('header nav button[data-view="food"]').click()
        page.wait_for_timeout(600)
        page.screenshot(path="scripts/mobile_improved_food.png")
        print("Captured scripts/mobile_improved_food.png")

        # School view
        page.locator('header nav button[data-view="school"]').click()
        page.wait_for_timeout(600)
        page.screenshot(path="scripts/mobile_improved_school.png")
        print("Captured scripts/mobile_improved_school.png")

        # Apartments view
        page.locator('header nav button[data-view="apartments"]').click()
        page.wait_for_timeout(600)
        page.screenshot(path="scripts/mobile_improved_apartments.png")
        print("Captured scripts/mobile_improved_apartments.png")

        # Admissions view
        page.locator('header nav button[data-view="admissions"]').click()
        page.wait_for_timeout(600)
        page.screenshot(path="scripts/mobile_improved_admissions.png")
        print("Captured scripts/mobile_improved_admissions.png")

        # 8. Check iPhone SE (375 x 667) for tightest width
        context_se = browser.new_context(
            viewport={'width': 375, 'height': 667},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True
        )
        page_se = context_se.new_page()
        page_se.goto(url, wait_until="networkidle")
        page_se.wait_for_timeout(800)
        header_se = page_se.locator('header').bounding_box()
        print(f"iPhone SE Header Box: {header_se}")
        assert header_se['height'] <= 245, f"iPhone SE Header height too large: {header_se['height']}px"
        page_se.screenshot(path="scripts/mobile_improved_iphonese.png")
        print("Captured scripts/mobile_improved_iphonese.png")

        browser.close()

    if errors:
        print(f"Encountered {len(errors)} errors:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("\nALL MOBILE VERIFICATION TESTS PASSED SUCCESSFULLY! [PASS]")

if __name__ == '__main__':
    verify_mobile()
