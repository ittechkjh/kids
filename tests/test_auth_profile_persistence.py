import time
import sys
import os
sys.stdout.reconfigure(encoding='utf-8')
BASE_URL = os.environ.get('BASE_URL', 'http://localhost:8080')
from playwright.sync_api import sync_playwright

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        print("1. Opening http://localhost:8080 and clearing storage...")
        page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1)

        # Clear any existing sessions for clean test
        page.evaluate("""() => {
            sessionStorage.clear();
            localStorage.clear();
            window.app.currentUser = null;
            window.app.profile = window.app.getDefaultProfile();
            window.app.renderAuthHeader();
            window.app.renderProfileWidget();
        }""")
        time.sleep(0.5)

        initial_state = page.evaluate("() => ({ user: window.app.currentUser, babyName: window.app.profile.babyName })")
        print("Clean initial state:", initial_state)
        assert initial_state['user'] is None
        assert initial_state['babyName'] == "도담이"

        # ---------------------------------------------------------
        # Scenario A: Simple Sign-up & Profile Persistence
        # ---------------------------------------------------------
        print("\n--- Testing Scenario A: Simple Sign-up & Persistence ---")
        ts = int(time.time())
        test_user = f"mom_{ts}"
        test_pw = "pass1234!"
        test_nick = f"송파맘_{ts}"

        # Sign up
        res_signup = page.evaluate(f"""() => {{
            const app = window.app;
            app.loginActiveTab = 'signup';
            const uIn = document.getElementById('auth-username-input');
            const pIn = document.getElementById('auth-password-input');
            const nIn = document.getElementById('auth-nickname-input');
            if (uIn) uIn.value = '{test_user}';
            if (pIn) pIn.value = '{test_pw}';
            if (nIn) nIn.value = '{test_nick}';
            
            const fakeEvent = {{ preventDefault: () => {{}} }};
            app.handleAuthSubmit(fakeEvent);
            return {{
                currentUser: app.currentUser?.username,
                nickname: app.profile?.nickname
            }};
        }}""")
        print("Sign-up result:", res_signup)
        assert res_signup['currentUser'] == test_user, f"Sign-up failed! {res_signup}"

        # Update profile with child info: 민준이, 10개월, 남아, 서울 송파구
        page.evaluate("""() => {
            const app = window.app;
            app.openProfileModal();
            const nInput = document.getElementById('prof-nickname');
            const rInput = document.getElementById('prof-region');
            if (nInput) nInput.value = '송파민준맘';
            if (rInput) rInput.value = '서울 송파구';

            const cName = document.querySelector('.prof-child-name');
            const cMonths = document.querySelector('.prof-child-months');
            const cGender = document.querySelector('.prof-child-gender');
            if (cName) cName.value = '민준이';
            if (cMonths) cMonths.value = '12';
            if (cGender) cGender.value = 'boy';

            app.saveProfile();
        }""")
        time.sleep(0.5)

        saved_prof = page.evaluate("() => ({ babyName: window.app.profile.babyName, months: window.app.profile.months, region: window.app.profile.region, isCustomized: window.app.profile.isCustomized })")
        print("Saved profile after edit:", saved_prof)
        assert saved_prof['babyName'] == "민준이", f"Baby name not saved: {saved_prof}"
        assert saved_prof['months'] == 12, f"Baby months not saved: {saved_prof}"
        assert saved_prof['region'] == "서울 송파구", f"Region not saved: {saved_prof}"
        assert saved_prof['isCustomized'] == True, f"isCustomized not true: {saved_prof}"

        # Logout
        print("Logging out...")
        page.evaluate("() => window.app.logout()")
        time.sleep(0.5)

        logout_state = page.evaluate("() => ({ currentUser: window.app.currentUser, babyName: window.app.profile.babyName })")
        print("State after logout:", logout_state)
        assert logout_state['currentUser'] is None, "currentUser not cleared on logout"
        assert logout_state['babyName'] == "도담이", "Default babyName not restored in memory on logout"

        # Login again with the same user
        print(f"Logging back in with {test_user}...")
        login_res = page.evaluate(f"""() => {{
            const app = window.app;
            app.loginActiveTab = 'login';
            const uIn = document.getElementById('auth-username-input');
            const pIn = document.getElementById('auth-password-input');
            if (uIn) uIn.value = '{test_user}';
            if (pIn) pIn.value = '{test_pw}';
            
            const fakeEvent = {{ preventDefault: () => {{}} }};
            app.handleAuthSubmit(fakeEvent);
            return {{
                currentUser: app.currentUser?.username,
                babyName: app.profile.babyName,
                months: app.profile.months,
                region: app.profile.region,
                isCustomized: app.profile.isCustomized
            }};
        }}""")
        print("Profile after login:", login_res)
        assert login_res['babyName'] == "민준이", f"Baby name not restored! Got: {login_res['babyName']}"
        assert login_res['months'] == 12, f"Baby months not restored! Got: {login_res['months']}"
        assert login_res['region'] == "서울 송파구", f"Region not restored! Got: {login_res['region']}"
        assert login_res['isCustomized'] == True, f"isCustomized not True! Got: {login_res['isCustomized']}"
        print("✅ Scenario A PASSED!")

        # ---------------------------------------------------------
        # Scenario B: Kakao Login & Persistence
        # ---------------------------------------------------------
        print("\n--- Testing Scenario B: Kakao Login & Persistence ---")
        kakao_id = f"kakao_{ts}"
        
        # 1. First Kakao login
        k_login_1 = page.evaluate(f"""() => {{
            const app = window.app;
            const res = {{
                id: {ts},
                properties: {{ nickname: '카카오맘' }},
                kakao_account: {{ email: '{kakao_id}@kakao.com', profile: {{ nickname: '카카오맘' }} }}
            }};

            const kakaoAccount = res.kakao_account || {{}};
            const kakaoProfile = kakaoAccount.profile || {{}};
            const realNick = kakaoProfile.nickname || '카카오맘';
            const kakaoUserId = '{kakao_id}';
            const nowD = new Date();
            const nowStr = nowD.toISOString().slice(0, 10);
            const nowTimeStr = nowD.toLocaleTimeString('ko-KR', {{ hour: '2-digit', minute: '2-digit', hour12: false }});
            const lastLoginFormatted = `${{nowStr}} ${{nowTimeStr}}`;

            app.users = app.cleanUsersList(app.users || []);
            let userRecord = app.users.find((u) => u.id === kakaoUserId || u.username === kakaoUserId);
            const savedProf = userRecord?.profile || userRecord?.savedProfile || app.readCachedProfile(kakaoUserId);
            const hasCustomProfile = !!(savedProf && (savedProf.isCustomized || (savedProf.babyName && savedProf.babyName !== '도담이')));

            if (hasCustomProfile) {{
                app.profile = {{
                    ...app.getDefaultProfile(),
                    ...savedProf,
                    nickname: realNick || savedProf.nickname,
                    isCustomized: true
                }};
            }} else {{
                app.profile = {{
                    ...app.getDefaultProfile(),
                    nickname: realNick,
                    isCustomized: false
                }};
            }}
            app.profile.provider = 'kakao';

            app.currentUser = {{
                id: kakaoUserId,
                username: kakaoUserId,
                nickname: realNick,
                provider: 'kakao',
                role: 'user',
                roleName: '카카오회원',
                authenticated: true,
                profile: {{ ...app.profile }},
                savedProfile: {{ ...app.profile }}
            }};

            if (!userRecord) {{
                userRecord = {{
                    id: kakaoUserId,
                    username: kakaoUserId,
                    nickname: realNick,
                    email: kakaoAccount.email || `${{kakaoUserId}}@kakao.com`,
                    role: 'user',
                    roleName: '카카오회원',
                    avatar: 'fa-comment',
                    avatarBg: 'from-amber-400 to-yellow-500',
                    createdAt: nowStr,
                    lastLogin: lastLoginFormatted,
                    status: 'active',
                    statusLabel: '정상',
                    provider: 'kakao',
                    profile: {{ ...app.profile }},
                    savedProfile: {{ ...app.profile }}
                }};
                app.users.push(userRecord);
            }} else {{
                userRecord.nickname = realNick;
                userRecord.lastLogin = lastLoginFormatted;
                userRecord.profile = {{ ...app.profile }};
                userRecord.savedProfile = {{ ...app.profile }};
            }}
            app.saveUsers();
            app.saveCurrentUserSession();
            app.saveProfileData();

            return {{
                currentUser: app.currentUser.id,
                babyName: app.profile.babyName,
                isCustomized: app.profile.isCustomized
            }};
        }}""")
        print("First Kakao login result:", k_login_1)
        assert k_login_1['currentUser'] == kakao_id
        assert k_login_1['isCustomized'] == False

        # 2. Register child information: 서연이, 18개월, 여아, 경기 수원 영통
        page.evaluate("""() => {
            const app = window.app;
            app.openProfileModal();
            const nInput = document.getElementById('prof-nickname');
            const rInput = document.getElementById('prof-region');
            if (nInput) nInput.value = '수원서연맘';
            if (rInput) rInput.value = '경기 수원 영통';

            const cName = document.querySelector('.prof-child-name');
            const cMonths = document.querySelector('.prof-child-months');
            const cGender = document.querySelector('.prof-child-gender');
            if (cName) cName.value = '서연이';
            if (cMonths) cMonths.value = '24';
            if (cGender) cGender.value = 'girl';

            app.saveProfile();
        }""")
        time.sleep(0.5)

        k_saved_prof = page.evaluate("() => ({ babyName: window.app.profile.babyName, months: window.app.profile.months, region: window.app.profile.region, isCustomized: window.app.profile.isCustomized })")
        print("Saved Kakao profile:", k_saved_prof)
        assert k_saved_prof['babyName'] == "서연이"
        assert k_saved_prof['months'] == 24
        assert k_saved_prof['region'] == "경기 수원 영통"
        assert k_saved_prof['isCustomized'] == True

        # 3. Logout Kakao User
        print("Logging out Kakao user...")
        page.evaluate("() => window.app.logout()")
        time.sleep(0.5)

        # 4. Re-login with Kakao: verify profile is restored and NOT reset!
        print("Re-logging in with Kakao...")
        k_login_2 = page.evaluate(f"""() => {{
            const app = window.app;
            const realNick = '수원서연맘';
            const kakaoUserId = '{kakao_id}';
            const nowD = new Date();
            const nowStr = nowD.toISOString().slice(0, 10);
            const nowTimeStr = nowD.toLocaleTimeString('ko-KR', {{ hour: '2-digit', minute: '2-digit', hour12: false }});
            const lastLoginFormatted = `${{nowStr}} ${{nowTimeStr}}`;

            app.users = app.cleanUsersList(app.users || []);
            let userRecord = app.users.find((u) => u.id === kakaoUserId || u.username === kakaoUserId);
            const savedProf = userRecord?.profile || userRecord?.savedProfile || app.readCachedProfile(kakaoUserId);
            const hasCustomProfile = !!(savedProf && (savedProf.isCustomized || (savedProf.babyName && savedProf.babyName !== '도담이')));

            if (hasCustomProfile) {{
                app.profile = {{
                    ...app.getDefaultProfile(),
                    ...savedProf,
                    nickname: realNick || savedProf.nickname,
                    isCustomized: true
                }};
            }} else {{
                app.profile = {{
                    ...app.getDefaultProfile(),
                    nickname: realNick,
                    isCustomized: false
                }};
            }}
            app.profile.provider = 'kakao';

            app.currentUser = {{
                id: kakaoUserId,
                username: kakaoUserId,
                nickname: realNick,
                provider: 'kakao',
                role: 'user',
                roleName: '카카오회원',
                authenticated: true,
                profile: {{ ...app.profile }},
                savedProfile: {{ ...app.profile }}
            }};

            if (userRecord) {{
                userRecord.lastLogin = lastLoginFormatted;
                userRecord.profile = {{ ...app.profile }};
                userRecord.savedProfile = {{ ...app.profile }};
            }}
            app.saveUsers();
            app.saveCurrentUserSession();
            app.saveProfileData();

            return {{
                currentUser: app.currentUser.id,
                babyName: app.profile.babyName,
                months: app.profile.months,
                region: app.profile.region,
                isCustomized: app.profile.isCustomized
            }};
        }}""")
        print("Second Kakao login result:", k_login_2)
        assert k_login_2['babyName'] == "서연이", f"Expected 서연이, got {k_login_2['babyName']}"
        assert k_login_2['months'] == 24, f"Expected 24, got {k_login_2['months']}"
        assert k_login_2['region'] == "경기 수원 영통", f"Expected 경기 수원 영통, got {k_login_2['region']}"
        assert k_login_2['isCustomized'] == True, f"Expected True, got {k_login_2['isCustomized']}"
        print("✅ Scenario B PASSED!")

        # ---------------------------------------------------------
        # Scenario C: Page Reload Session & Profile Retention
        # ---------------------------------------------------------
        print("\n--- Testing Scenario C: Page Reload Session & Profile Retention ---")
        page.reload(wait_until="networkidle")
        time.sleep(1)

        reload_state = page.evaluate("() => ({ currentUser: window.app.currentUser?.id, babyName: window.app.profile.babyName, months: window.app.profile.months, region: window.app.profile.region, isCustomized: window.app.profile.isCustomized })")
        print("State after reload:", reload_state)
        assert reload_state['currentUser'] == kakao_id, f"User session lost after reload! Got: {reload_state['currentUser']}"
        assert reload_state['babyName'] == "서연이", f"Baby name lost after reload! Got: {reload_state['babyName']}"
        assert reload_state['months'] == 24, f"Baby months lost after reload! Got: {reload_state['months']}"
        assert reload_state['region'] == "경기 수원 영통", f"Region lost after reload! Got: {reload_state['region']}"
        assert reload_state['isCustomized'] == True, f"isCustomized false after reload! Got: {reload_state['isCustomized']}"
        print("✅ Scenario C PASSED!")

        print("\n🎉 ALL TESTS PASSED COMPLETELY! Page errors:", len(errors))
        browser.close()

if __name__ == '__main__':
    run_tests()

