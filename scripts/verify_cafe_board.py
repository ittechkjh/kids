# -*- coding: utf-8 -*-
import sys
import os
import time
from playwright.sync_api import sync_playwright

def run_test():
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
        assert page.evaluate("() => typeof window.app !== 'undefined'"), "window.app is undefined"
        print("1. window.app ready")

        # 2. Check Board view is visible
        board_view = page.locator('#view-board')
        assert board_view.is_visible(), "#view-board is not visible"
        print("2. #view-board visible")

        # 3. Check Category chips
        cat_chips = page.locator('#board-category-chips button')
        cat_count = cat_chips.count()
        print(f"3. Category chips count: {cat_count}")
        assert cat_count >= 6, "Expected at least 6 category chips"

        # 4. Check Post table rows
        rows = page.locator('#board-posts-list .hidden.sm\\:grid')
        print(f"4. Table rows count (PC): {rows.count()}")
        assert rows.count() >= 5, "Expected at least 5 rows in cafe board table"

        # 5. Test Cafe Writing (SmartEditor modal)
        print("5. Testing Naver Cafe SmartEditor 글쓰기...")
        write_btn = page.locator('#view-board button:has-text("카페 글쓰기")').first
        write_btn.click()
        time.sleep(0.5)

        modal = page.locator('#write-post-modal')
        assert modal.is_visible(), "#write-post-modal did not open"

        # Test Template insertion
        page.locator('#write-post-modal button:has-text("질문 템플릿")').click()
        time.sleep(0.3)
        content_val = page.locator('#post-form-content').input_value()
        print(f"   Template inserted: {len(content_val)} chars")
        assert "육아 질문 내용" in content_val, "Template was not inserted"

        # Test photo preset addition
        page.locator('#write-post-modal button:has-text("육아 사진 템플릿")').click()
        time.sleep(0.2)
        page.locator('#write-post-modal button:has-text("이유식·식판 사진")').click()
        time.sleep(0.3)
        attached_photos = page.locator('#post-attached-photos-container img')
        print(f"   Attached photos count: {attached_photos.count()}")
        assert attached_photos.count() >= 1, "Photo was not attached"

        # Test Draft save
        page.locator('#post-form-title').fill("[질문] 10개월 아기 유아식 시작 시기 및 식단 조언 부탁드려요")
        page.locator('#btn-draft-save').click()
        time.sleep(0.3)
        draft_badge = page.locator('#draft-count-badge').text_content()
        print(f"   Draft badge count: {draft_badge}")
        assert draft_badge == "1", "Draft was not saved"

        # Test Post Submit
        page.locator('#write-post-modal button:has-text("게시글 등록하기")').click()
        time.sleep(0.5)
        assert not modal.is_visible(), "Modal did not close after submit"

        # Check that new post is at the top of the table
        first_row_title = page.locator('#board-posts-list .hidden.sm\\:grid span.font-bold').first.text_content()
        print(f"   First row title: {first_row_title}")
        assert "10개월 아기 유아식" in first_row_title, "Newly created post not found at top"
        print("   ✅ Writing post with photo and template verified successfully!")

        # 6. Test Post Detail Viewer
        print("6. Testing Naver Cafe Post Viewer...")
        first_row = page.locator('#board-posts-list .hidden.sm\\:grid').first
        first_row.click()
        time.sleep(0.5)

        detail_modal = page.locator('#post-detail-modal')
        assert detail_modal.is_visible(), "#post-detail-modal did not open"

        detail_title = page.locator('#post-detail-title').text_content()
        print(f"   Detail title: {detail_title}")
        assert "10개월 아기 유아식" in detail_title, "Detail modal title mismatch"

        # Check attached image in detail modal
        detail_images = page.locator('#post-detail-images-box img')
        print(f"   Detail modal image count: {detail_images.count()}")
        assert detail_images.count() >= 1, "Attached image not displayed in detail modal"

        # Test Comment submission
        comment_input = page.locator('#post-comment-input')
        comment_input.fill("저희 아기도 10개월에 무른밥으로 시작했어요! 천천히 적응시키시면 잘 먹을 거예요 화이팅!")
        page.locator('#post-detail-modal button:has-text("등록")').click()
        time.sleep(0.3)

        comment_count = page.locator('#post-detail-comments-count').text_content()
        print(f"   Comment count after submit: {comment_count}")
        assert int(comment_count) >= 1, "Comment was not added"

        # Test Next / Prev post
        page.locator('#post-detail-modal button:has-text("다음글")').click()
        time.sleep(0.3)
        next_title = page.locator('#post-detail-title').text_content()
        print(f"   Next post title: {next_title}")
        assert next_title != detail_title, "Next post navigation failed"

        # Close detail modal
        page.locator('#post-detail-modal button i.fa-xmark').click()
        time.sleep(0.3)
        assert not detail_modal.is_visible(), "Detail modal did not close"
        print("   ✅ Post Detail Viewer, comments, and navigation verified successfully!")

        # 7. Check console errors
        critical_errors = [e for e in console_errors if "Failed to load resource" not in e]
        print(f"7. Critical console errors: {len(critical_errors)}")
        for err in critical_errors:
            print("   Error:", err)
        assert len(critical_errors) == 0, f"Critical console errors detected: {critical_errors}"

        browser.close()
        print("\n🎉 ALL NAVER CAFE BOARD & SMARTEDITOR TESTS PASSED! 🎉")

if __name__ == '__main__':
    run_test()
