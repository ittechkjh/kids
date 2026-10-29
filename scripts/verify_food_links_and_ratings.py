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

        # Switch to food view
        page.evaluate("app.switchMainView('food')")
        time.sleep(1.5)

        # 1. Search for '동화가든' using #food-portal-query
        search_input = page.locator("#food-portal-query")
        search_input.fill("동화가든")
        page.evaluate("app.onFoodFilterChange()")
        time.sleep(1)

        # 2. Inspect restaurant card in list (#food-restaurants-list > article)
        card = page.locator("#food-restaurants-list > article").first
        card_text = card.inner_text()
        print("Restaurant card text snippet:\n", card_text[:300].encode('utf-8', 'ignore').decode('utf-8'))

        # Verify fake star numbers are removed
        assert "★ 4.4" not in card_text, "Fake rating ★ 4.4 should be removed!"
        assert "★ 3.6" not in card_text, "Fake rating ★ 3.6 should be removed!"
        assert "060-472-6017" not in card_text, "Fake 060 phone number should be removed!"
        assert "실데이터 검증" not in card_text, "Deceptive 실데이터 검증 label should be removed!"

        # 3. Check portal links
        naver_link = card.locator('a[title*="네이버"]').get_attribute("href")
        kakao_link = card.locator('a[title*="카카오"]').get_attribute("href")
        google_link = card.locator('a[title*="구글"]').get_attribute("href")

        print("Naver Link:", naver_link)
        print("Kakao Link:", kakao_link)
        print("Google Link:", google_link)

        # Kakao Map link must use link/search with clean query '강릉 동화가든'
        assert "map.kakao.com/link/search" in kakao_link, f"Kakao link should use link/search! Got: {kakao_link}"
        assert "%EA%B0%95%EB%A6%89%20%EB%8F%99%ED%99%94%EA%B0%80%EB%93%A0" in kakao_link, f"Kakao link should use clean query '강릉 동화가든'! Got: {kakao_link}"

        # 4. Test opening popup on map via focusRestaurantOnMap
        page.evaluate("app.focusRestaurantOnMap('rest-0015')")
        time.sleep(1.5)

        popup = page.locator(".leaflet-popup-content")
        popup_text = popup.inner_text()
        print("Popup text snippet:\n", popup_text[:300].encode('utf-8', 'ignore').decode('utf-8'))

        assert "★ 4.4" not in popup_text, "Popup should not have fake rating ★ 4.4!"
        assert "★ 3.6" not in popup_text, "Popup should not have fake rating ★ 3.6!"
        assert "네이버는 별점 폐지" in popup_text, "Popup should inform user about Naver review system"

        # Take screenshot of clean, truthful popup
        page.screenshot(path="scripts/screenshot_food_popup_fixed.png")
        print("Saved screenshot to scripts/screenshot_food_popup_fixed.png")

        # 5. Open Kakao link directly in a new page to verify it loads with real places!
        kakao_page = browser.new_page()
        kakao_page.goto(kakao_link, wait_until="domcontentloaded")
        kakao_page.wait_for_timeout(3500)
        places = kakao_page.locator(".PlaceItem, .link_name, .tit_name")
        places_count = places.count()
        print(f"Kakao Map returned {places_count} places for '강릉 동화가든'!")
        assert places_count > 0, "Kakao Map must find places for '강릉 동화가든'!"
        print("SUCCESS: Kakao Map loaded real results for 동화가든 without error!")
        kakao_page.screenshot(path="scripts/screenshot_kakao_fixed_donghwa.png")
        kakao_page.close()

        browser.close()

    if errors:
        print(f"FAILED with errors: {errors}")
        sys.exit(1)
    else:
        print("\nALL RESTAURANT LINK & RATING FIXES VERIFIED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
