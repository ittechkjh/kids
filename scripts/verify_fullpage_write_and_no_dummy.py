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
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda err: console_errors.append(str(err)))

        page.goto(file_url, wait_until="domcontentloaded")
        time.sleep(1.5)

        # 1. Check window.app and verify NO dummy posts exist
        assert page.evaluate("() => typeof window.app !== 'undefined'"), "window.app is undefined"
        posts = page.evaluate("() => window.app.data.posts")
        print(f"1. Current posts count in app: {len(posts)}")
        dummy_posts = [p for p in posts if not p.get('id', '').startswith('custom-post-')]
        assert len(dummy_posts) == 0, f"Found unexpected dummy posts: {dummy_posts}"
        print("   ✅ Verified 0 dummy/mock posts exist in system!")

        # 2. Check Board view is visible
        board_view = page.locator('#view-board')
        assert board_view.is_visible(), "#view-board is not visible"
        print("2. Verified board view is active")

        # 3. Click '카페 글쓰기' to open full-page write view
        write_btn = page.locator('#view-board button:has-text("카페 글쓰기")').first
        write_btn.click()
        time.sleep(0.5)

        # Check full-page write view is visible, board view is hidden, no popup modal
        write_view = page.locator('#view-write')
        assert write_view.is_visible(), "#view-write is not visible"
        assert not board_view.is_visible(), "#view-board should be hidden"
        assert page.locator('#write-post-modal').count() == 0, "Obsolete #write-post-modal should not exist in DOM"
        print("3. Verified full-page write view (#view-write) navigation (no popup modal)!")

        # 4. Fill in full-page write view
        page.select_option('#post-form-category', 'toddler')
        page.select_option('#post-form-prefix', '정보')
        unique_id = int(time.time())
        test_title = f"3세 어린이집 낮잠 이불 준비물 체크리스트 {unique_id}"
        page.locator('#post-form-title').fill(test_title)

        # Insert review template
        page.locator('#view-write button:has-text("꿀팁템플릿")').click()
        time.sleep(0.2)
        content_val = page.locator('#post-form-content').input_value()
        assert len(content_val) > 20, "Tip template not inserted"
        print("4. Verified template insertion")

        # Insert preset photo
        page.locator('#view-write button:has-text("육아 사진 템플릿")').click()
        time.sleep(0.2)
        page.locator('#view-write button:has-text("장난감·놀이")').click()
        time.sleep(0.3)
        attached_photos = page.locator('#post-attached-photos-container img')
        assert attached_photos.count() >= 1, "Photo preset was not attached"
        print("5. Verified photo attachment")

        # Add tag
        page.locator('#post-form-tags').fill('어린이집, 낮잠이불, 육아팁')

        # Test draft saving
        page.locator('#btn-draft-save').click()
        time.sleep(0.3)
        draft_badge = page.locator('#draft-count-badge').text_content()
        assert draft_badge == "1", f"Draft badge expected 1, got {draft_badge}"
        print("6. Verified draft saving")

        # Take screenshot of full-page write view
        page.screenshot(path="screenshot_fullpage_write.png")
        print("7. Saved screenshot_fullpage_write.png")

        # 8. Submit post using #btn-post-submit-top
        page.locator('#btn-post-submit-top').click()
        time.sleep(0.8)

        # 9. Verify redirection back to #view-board and new post rendered in table
        assert not write_view.is_visible(), "#view-write should be hidden after submit"
        assert board_view.is_visible(), "#view-board should be visible after submit"

        first_user_row = page.locator('#board-posts-list .group').first
        first_row_title = first_user_row.locator('span.text-sm.font-bold').text_content()
        print(f"8. First user row title on board: {repr(first_row_title)}")
        assert f"{unique_id}" in first_row_title, "Newly submitted post title not found in first user row"

        # 10. Open Detail Viewer
        first_user_row.click()
        time.sleep(0.5)

        detail_modal = page.locator('#post-detail-modal')
        assert detail_modal.is_visible(), "Detail modal not opened"
        detail_title = page.locator('#post-detail-title').text_content()
        assert f"{unique_id}" in detail_title, "Detail modal title mismatch"
        print("9. Verified post detail view!")

        page.screenshot(path="screenshot_post_detail.png")
        print("10. Saved screenshot_post_detail.png")

        # Close detail modal
        page.locator('#post-detail-modal button').first.click()
        time.sleep(0.3)

        # Check console errors
        print(f"Console errors: {len(console_errors)}")
        if console_errors:
            for err in console_errors:
                print("  [ERROR]", err)
        assert len(console_errors) == 0, f"Found console errors: {console_errors}"

        browser.close()
        print("\n🎉 ALL TESTS PASSED SUCCESSFULLY!")

if __name__ == '__main__':
    run_test()
