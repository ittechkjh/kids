import os
import json
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:8080")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(BASE_URL, wait_until="domcontentloaded")
    page.wait_for_timeout(3000)

    # 1. Accounts verification (only real accounts admin and kakao_5171001975 remain)
    acc_res = page.evaluate('''() => {
        const users = window.app.users || [];
        return {
            count: users.length,
            ids: users.map(u => u.id),
            nicknames: users.map(u => u.nickname)
        };
    }''')
    print("1. Accounts Verification:", acc_res)
    assert acc_res['count'] == 2, f"Expected 2 accounts, got {acc_res['count']}"
    assert 'admin' in acc_res['ids'], "admin must exist"
    assert 'kakao_5171001975' in acc_res['ids'], "kakao_5171001975 must exist"
    print("   -> Test accounts successfully cleaned up. Only real accounts remain! PASS")

    # 2. Visitor log member badge verification
    log_res = page.evaluate('''() => {
        const app = window.app;
        const testUser = app.users.find(u => u.id === 'kakao_5171001975');
        app.currentUser = testUser;

        // Simulate visitor log with member
        const mockEvents = [
            { t: 'view', sid: app.sessionId, view: 'board', device: 'desktop', user: testUser.nickname, timestamp: Date.now() },
            { t: 'view', sid: 'sess_guest_9999', view: 'food', device: 'mobile', user: null, timestamp: Date.now() - 60000 }
        ];
        app.renderVisitorLogs(mockEvents);

        const tbody = document.getElementById('admin-visitor-logs-table-body');
        const html = tbody ? tbody.innerHTML : '';
        return {
            hasMemberCrown: html.includes('👑 ' + testUser.nickname) || html.includes('👑 카카오회원'),
            hasGuest: html.includes('게스트 #'),
            htmlSnippet: html.slice(0, 400)
        };
    }''')
    print("2. Visitor Log Member Identification:", log_res)
    assert log_res['hasMemberCrown'] is True, "Visitor logs must show member crown badge for logged in users!"
    assert log_res['hasGuest'] is True, "Visitor logs must differentiate guests!"
    print("   -> Logged-in user correctly displays member badge with crown! PASS")

    # 3. AI report post restoration in [가이드] -> [훈육]
    guide_res = page.evaluate('''() => {
        const app = window.app;
        app.switchMainView('board');
        app.setBoardLoungeMode('guide');
        app.filterGuideCategory('growth');

        const titleEl = document.getElementById('current-board-title');
        const countEl = document.getElementById('current-board-count');
        const posts = (app.data.posts || []).filter(p => p.guideType === 'growth');

        return {
            title: titleEl ? titleEl.textContent : '',
            count: countEl ? countEl.textContent : '',
            growthPostsCount: posts.length,
            titles: posts.map(p => p.title)
        };
    }''')
    print("3. AI Report Restoration in [가이드] -> [훈육]:", guide_res)
    assert guide_res['growthPostsCount'] >= 2, f"Expected at least 2 growth posts, got {guide_res['growthPostsCount']}"
    assert any('이성교제' in t for t in guide_res['titles']), "Restored AI report must be present"
    assert any('3~7세' in t for t in guide_res['titles']), "Seed guide 2 must be present"
    print("   -> Both 훈육 AI reports are restored and visible! PASS")

    # 4. Detail view 5 infographic cards action buttons
    detail_res = page.evaluate('''() => {
        const app = window.app;
        const post = (app.data.posts || []).find(p => p.id === 'official-ai-report-growth-1');
        if (!post) return { error: 'post not found' };

        app.openPostDetailModal(post.id);

        const contentEl = document.getElementById('post-detail-content');
        const actionBars = contentEl ? Array.from(contentEl.querySelectorAll('.post-image-action-bar')) : [];
        const copyBtns = contentEl ? Array.from(contentEl.querySelectorAll('.post-image-action-bar button:first-child')) : [];
        const dlBtns = contentEl ? Array.from(contentEl.querySelectorAll('.post-image-action-bar button:last-child')) : [];

        return {
            imagesCount: app.currentPostDetailImages.length,
            actionBarsCount: actionBars.length,
            copyButtonsCount: copyBtns.length,
            dlButtonsCount: dlBtns.length,
            copyBtnText: copyBtns[0] ? copyBtns[0].textContent.trim() : '',
            dlBtnText: dlBtns[0] ? dlBtns[0].textContent.trim() : ''
        };
    }''')
    print("4. Infographic Image Action Buttons:", detail_res)
    assert detail_res['imagesCount'] == 5, f"Expected 5 images, got {detail_res['imagesCount']}"
    assert detail_res['actionBarsCount'] == 5, f"Expected 5 action bars under images, got {detail_res['actionBarsCount']}"
    assert '이 사진 복사' in detail_res['copyBtnText'], "Copy button must be labeled '이 사진 복사'"
    assert 'PNG 다운로드' in detail_res['dlBtnText'], "Download button must be labeled 'PNG 다운로드'"
    print("   -> All 5 infographic images have individual [이 사진 복사] & [PNG 다운로드] buttons! PASS")

    # 5. Middle school admission rates (no undefined)
    school_res = page.evaluate('''() => {
        const schools = window.DODAM_SCHOOLS_DATA?.schools || window.DODAM_SCHOOLS_RANKING || [];
        const middleSchool = schools.find(s => s.name === '신천중학교') || schools.find(s => s.level === 'middle');
        window.app.openSchoolModal(middleSchool.id);

        const modal = document.getElementById('school-detail-modal');
        const text = modal ? modal.textContent : '';

        return {
            schoolName: middleSchool.name,
            hasUndefined: text.includes('undefined')
        };
    }''')
    print("5. Middle School Modal Check:", school_res)
    assert school_res['hasUndefined'] is False, "Modal must not contain 'undefined'!"
    print("   -> Middle school rates cleanly formatted with 0 'undefined'! PASS")

    browser.close()
    print("\n🎉 ALL 5 USER VERIFICATIONS PASSED SUCCESSFULLY!")
