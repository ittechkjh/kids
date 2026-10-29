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
        page = browser.new_page(viewport={"width": 1280, "height": 900})

        page.on("console", lambda msg: print(f"[BROWSER CONSOLE {msg.type}]: {msg.text}") if msg.type in ["error"] else None)
        page.on("pageerror", lambda err: errors.append(f"Page error: {err}"))

        page.goto(file_url, wait_until="domcontentloaded")
        time.sleep(2)

        # 1. Verify #board-category-chips styling
        chips_container = page.locator("#board-category-chips")
        container_class = chips_container.get_attribute("class") or ""
        print(f"Container classes: {container_class}")
        assert "flex-wrap" in container_class, "Container must have flex-wrap!"
        assert "overflow-x-auto" not in container_class, "Container must NOT have overflow-x-auto!"

        # 2. Verify all 10 chips exist
        expected_categories = ['all', 'hot', 'newborn', 'toddler', 'school', 'middle', 'high', 'working', 'talk', 'tips']
        chips = chips_container.locator("button")
        chip_count = chips.count()
        print(f"Total chips rendered: {chip_count}")
        assert chip_count == 10, f"Expected 10 chips, found {chip_count}"

        for cat_id in expected_categories:
            btn = chips_container.locator(f'button[data-category="{cat_id}"]')
            count = btn.count()
            assert count == 1, f"Chip for category '{cat_id}' not found!"
            text = btn.text_content()
            print(f" - [{cat_id}]: {text.strip()}")

        # 3. Test clicking 'middle' (중딩맘 라운지)
        middle_btn = chips_container.locator('button[data-category="middle"]')
        middle_btn.click()
        time.sleep(0.5)
        board_title = page.locator("#current-board-title").text_content()
        print(f"Board title after clicking 'middle': {board_title}")
        assert "중딩맘" in board_title, f"Expected '중딩맘' in title, got: {board_title}"

        # 4. Test clicking 'high' (고딩맘 라운지)
        high_btn = chips_container.locator('button[data-category="high"]')
        high_btn.click()
        time.sleep(0.5)
        board_title = page.locator("#current-board-title").text_content()
        print(f"Board title after clicking 'high': {board_title}")
        assert "고딩맘" in board_title, f"Expected '고딩맘' in title, got: {board_title}"

        # 5. Check Write Page dropdown options
        cat_select = page.locator("#post-form-category")
        middle_option = cat_select.locator('option[value="middle"]')
        high_option = cat_select.locator('option[value="high"]')
        assert middle_option.count() == 1, "Write dropdown missing 'middle' option"
        assert high_option.count() == 1, "Write dropdown missing 'high' option"

        # 6. Click '카페 글쓰기' while 'high' is active
        write_btn = page.locator('button:has-text("카페 글쓰기")').first
        write_btn.click()
        time.sleep(0.5)

        # Check write view visible and selected category
        write_view = page.locator("#view-write")
        assert write_view.is_visible(), "Write view should be visible!"
        selected_cat = cat_select.input_value()
        print(f"Write page selected category: {selected_cat}")
        assert selected_cat == "high", f"Expected 'high' preselected in write page, got {selected_cat}"

        # Return to board view
        page.evaluate("app.switchMainView('board')")
        time.sleep(0.5)

        # 7. Take desktop screenshot
        page.screenshot(path="scripts/desktop_categories.png")
        print("Desktop screenshot saved to scripts/desktop_categories.png")

        # 8. Test mobile viewport
        page.set_viewport_size({"width": 390, "height": 844})
        time.sleep(0.5)

        # Verify scrollWidth <= clientWidth (no horizontal scrollbar on chips container)
        overflow_check = page.evaluate("""() => {
            const el = document.getElementById('board-category-chips');
            return {
                scrollWidth: el.scrollWidth,
                clientWidth: el.clientWidth,
                hasHorizontalScroll: el.scrollWidth > el.clientWidth + 2
            };
        }""")
        print(f"Mobile overflow check: {overflow_check}")
        assert not overflow_check["hasHorizontalScroll"], f"Horizontal scroll detected on mobile! {overflow_check}"

        page.screenshot(path="scripts/mobile_categories.png")
        print("Mobile screenshot saved to scripts/mobile_categories.png")

        browser.close()

    if errors:
        print(f"FAILED with errors: {errors}")
        sys.exit(1)
    else:
        print("\nALL CATEGORY TESTS PASSED SUCCESSFULLY! ZERO ERRORS.")

if __name__ == "__main__":
    main()
