import os
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(BASE_URL)
    page.wait_for_timeout(3000)
    
    # 1. Test "내 활동글" for Kakao user who wrote 0 posts
    activity_res = page.evaluate('''() => {
      const kakaoUser = (window.app.users || []).find(u => u.id === 'kakao_5171001975');
      window.app.currentUser = kakaoUser;
      window.app.profile.nickname = kakaoUser.nickname;
      window.app.renderProfileWidget();
      
      const widget = document.getElementById('my-profile-widget');
      const widgetHtml = widget ? widget.innerHTML : '';
      const myPostsCount = window.app.getMyWrittenPosts().length;
      
      return {
        myPostsCount: myPostsCount,
        hasZeroPosts: widgetHtml.includes('0 건'),
        has19Posts: widgetHtml.includes('19 건')
      };
    }''')
    print("1. User Activity Posts Test:", activity_res)
    assert activity_res['myPostsCount'] == 0, f"Expected 0 posts, got {activity_res['myPostsCount']}"
    assert activity_res['hasZeroPosts'] is True, "Expected '0 건' in profile widget"
    assert activity_res['has19Posts'] is False, "Should NOT show '19 건' in profile widget"
    print("   -> '내 활동글' correctly shows 0 건 instead of 19 건! PASS")
    
    # 2. Test Middle School Modal Admission Rates (Sincheon Middle School - '신천중학교')
    school_res = page.evaluate('''() => {
      const schools = window.DODAM_SCHOOLS_DATA?.schools || window.DODAM_SCHOOLS_RANKING || [];
      const middleSchool = schools.find(s => s.name === '신천중학교') || schools.find(s => s.level === 'middle');
      
      window.app.openSchoolModal(middleSchool.id);
      
      const modal = document.getElementById('school-detail-modal');
      const text = modal ? modal.textContent : '';
      
      const hasUndefined = text.includes('undefined');
      
      return {
        schoolName: middleSchool.name,
        hasUndefined: hasUndefined,
        hasScience: text.includes('과학·영재고') || text.includes('과학고'),
        hasForeign: text.includes('외고·국제고'),
        hasAutonomous: text.includes('자율사립고') || text.includes('자사고')
      };
    }''')
    print("2. School Detail Admission Rates Test:", school_res)
    assert school_res['hasUndefined'] is False, "Modal should NOT contain 'undefined'!"
    assert school_res['hasScience'] is True, "Modal should contain science rate!"
    assert school_res['hasForeign'] is True, "Modal should contain foreign rate!"
    assert school_res['hasAutonomous'] is True, "Modal should contain autonomous rate!"
    print("   -> Admission rates correctly formatted without 'undefined'! PASS")

    browser.close()
    print("\nALL VERIFICATIONS PASSED!")
