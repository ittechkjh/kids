import os
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(permissions=['clipboard-read', 'clipboard-write'])
    page = context.new_page()
    page.goto(BASE_URL)
    page.wait_for_function('() => window.app && window.app.data && window.app.data.posts && window.app.data.posts.length > 0')
    page.wait_for_timeout(1000)
    
    # Setup test post with videoId cWGKAxSiaHY
    page.evaluate('''() => {
      const generated = window.app.buildYoutubeSummaryContent('cWGKAxSiaHY', { title: '초등학생 자녀의 이성교제' }, 'growth');
      window.app.data.posts.unshift({
        id: 'test-dup-post-1',
        title: '[육아가이드] 초등학생 자녀의 이성교제 (테스트)',
        youtubeVideoId: 'cWGKAxSiaHY',
        youtubeUrl: 'https://www.youtube.com/watch?v=cWGKAxSiaHY',
        contentHtml: generated.html,
        content: generated.html,
        rawTextContent: generated.plainText,
        isYoutubeSummary: true,
        isAiReport: true
      });
    }''')

    # 1. Test duplicate URL check behavior (should warn, but KEEP button enabled)
    dup_res = page.evaluate('''() => {
      sessionStorage.setItem('dodam_admin_authenticated', '1');
      window.app.currentUser = window.app.users.find(u => u.role === 'admin');
      window.app.openAiParentingReportModal();
      const input = document.getElementById('youtube-summary-url');
      const runBtn = document.getElementById('btn-run-youtube-summary');
      const alertBox = document.getElementById('youtube-summary-duplicate-alert');
      
      input.value = 'https://www.youtube.com/watch?v=cWGKAxSiaHY';
      window.app.checkYoutubeUrlDuplicate(input.value);
      
      return {
        alertShown: !alertBox.classList.contains('hidden'),
        alertText: alertBox.textContent.replace(/\\s+/g, ' ').trim(),
        btnDisabled: runBtn.disabled,
        btnHasDisabledClass: runBtn.classList.contains('cursor-not-allowed')
      };
    }''')
    print("1. Duplicate Check Result:", dup_res)
    assert dup_res['alertShown'] is True
    assert dup_res['btnDisabled'] is False
    assert dup_res['btnHasDisabledClass'] is False
    print("   -> Duplicate check kept run button enabled! PASS")
    
    # 2. Test copyPostForNaverBlog produces clean, <5MB HTML with clear image placeholders
    copy_res = page.evaluate('''async () => {
      await window.app.copyPostForNaverBlog('official-ai-report-growth-1');
      
      const richHtml = window.app.lastCopiedRichHtml || '';
      const placeholderCount = (richHtml.match(/첨부 위치/g) || []).length;
      const hasBase64 = richHtml.includes('data:image/');
      const sizeBytes = new Blob([richHtml]).size;
      
      return {
        sizeBytes: sizeBytes,
        isUnder5MB: sizeBytes < 5 * 1024 * 1024,
        placeholderCount: placeholderCount,
        hasBase64: hasBase64
      };
    }''')
    print("2. Naver Copy Result:", copy_res)
    assert copy_res['isUnder5MB'] is True, f"Must be under 5MB, got {copy_res['sizeBytes']} bytes"
    assert copy_res['placeholderCount'] == 5, f"Must have 5 image placeholders, got {copy_res['placeholderCount']}"
    assert copy_res['hasBase64'] is False, "Must not contain base64 image blobs"
    print(f"   -> Copied HTML is safely under 5MB ({copy_res['sizeBytes']} bytes, 5 placeholders)! PASS")
    
    # 3. Test Kakao account existence
    user_res = page.evaluate('''() => {
      const kakaoUser = (window.app.users || []).find(u => u.id === 'kakao_5171001975');
      return kakaoUser ? {
        id: kakaoUser.id,
        nickname: kakaoUser.nickname,
        region: kakaoUser.region,
        status: kakaoUser.status
      } : null;
    }''')
    print("3. Real Kakao User Verification:", user_res)
    assert user_res is not None
    assert user_res['id'] == 'kakao_5171001975'
    print("   -> Kakao user safely exists in DB! PASS")

    browser.close()
    print("\nALL 3 VERIFICATIONS PASSED SUCCESSFULLY!")
