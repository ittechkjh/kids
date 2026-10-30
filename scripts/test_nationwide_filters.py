# -*- coding: utf-8 -*-
import sys
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')

def test_nationwide_filter():
    print("Testing nationwide region filters and rendering...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})

        errors = []
        page.on("pageerror", lambda err: errors.append(f"PageError: {err}"))
        page.on("console", lambda msg: errors.append(f"ConsoleError: {msg.text}") if msg.type == "error" else None)

        page.goto("file:///E:/kids/index.html")
        page.wait_for_timeout(2000)

        # Switch to Food tab
        page.evaluate("app.switchMainView('food')")
        page.wait_for_timeout(1000)

        # Test Regions: 부산, 제주, 강원, 대전, 경기
        test_regions = [
            ("busan", "부산광역시", "이재모피자 본점"),
            ("jeju", "제주특별자치도", "제주 연돈"),
            ("gangwon", "강원특별자치도", "강릉 동화가든 짬뽕순두부 본점"),
            ("daejeon", "대전광역시", "성심당 본점"),
            ("gyeonggi", "경기도", "가보정 인계본점")
        ]

        for reg_code, reg_name, expected_shop in test_regions:
            page.evaluate(f"app.onChangeRegion('{reg_code}')")
            page.wait_for_timeout(500)

            badge = page.locator("#food-count-badge").inner_text()
            card_text = page.locator("#food-restaurants-list").inner_text()
            print(f"Region '{reg_name}' ({reg_code}): {badge} restaurants found.")
            assert expected_shop in card_text, f"Expected shop '{expected_shop}' not found in {reg_name} view!"
            print(f" -> Successfully found '{expected_shop}' in {reg_name}!")

        # Reset to all
        page.evaluate("app.onChangeRegion('all')")
        page.wait_for_timeout(500)
        total = page.locator("#food-count-badge").inner_text()
        print(f"Reset filter to all: {total} total verified restaurants.")

        assert len(errors) == 0, f"Found console errors: {errors}"
        browser.close()
        print("\n=======================================================")
        print("NATIONWIDE REGION FILTER TESTS PASSED 100%!")
        print("=======================================================")

if __name__ == '__main__':
    test_nationwide_filter()
