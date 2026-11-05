/**
 * 도담도담 (DodamTalk) - 카카오 / 네이버 소셜 로그인 설정
 * 
 * [카카오 연동 방법 (100% 무료)]
 * 1. 카카오 개발자센터 (https://developers.kakao.com) 로그인
 * 2. [내 애플리케이션] > [애플리케이션 추가하기] (앱 이름: 도담도담)
 * 3. [플랫폼] > [Web]에 사이트 도메인 등록:
 *    - https://ittechkjh.github.io
 *    - http://localhost:8000
 *    - http://127.0.0.1:8000
 * 4. [카카오 로그인] > [활성화 설정] ON, [동의항목]에서 '닉네임', '프로필 사진' 설정
 * 5. [앱 키]의 [JavaScript 키]를 아래 kakaoJavascriptKey에 입력하거나,
 *    웹 화면의 [API 키 직접 등록/관리] 버튼을 통해 언제든 직접 입력하실 수 있습니다.
 * 
 * [네이버 연동 방법 (100% 무료)]
 * 1. 네이버 개발자센터 (https://developers.naver.com) 로그인
 * 2. [Application] > [애플리케이션 등록]
 *    - 사용 API: 네이버 로그인 (회원이름, 별명, 프로필 사진 체크)
 *    - 서비스 환경: PC웹 / Mobile웹
 *    - 서비스 URL: https://ittechkjh.github.io/kids
 *    - Callback URL: https://ittechkjh.github.io/kids
 * 3. [Client ID]를 아래 naverClientId에 입력하세요.
 */

window.DODAM_SOCIAL_CONFIG = {
  kakaoJavascriptKey: "", // 카카오 JavaScript 키 (예: "7f8a12bc90e45...")
  naverClientId: "",      // 네이버 Client ID (예: "aBcDeFg12345...")
  naverCallbackUrl: (function() {
    try {
      return window.location.origin + window.location.pathname;
    } catch (e) {
      return "https://ittechkjh.github.io/kids/";
    }
  })()
};

// 사용자가 화면(모달)에서 직접 저장한 키가 LocalStorage에 있다면 자동 우선 로드
(function() {
  try {
    const saved = localStorage.getItem('dodam_social_custom_keys');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.kakaoJavascriptKey) window.DODAM_SOCIAL_CONFIG.kakaoJavascriptKey = parsed.kakaoJavascriptKey;
      if (parsed.naverClientId) window.DODAM_SOCIAL_CONFIG.naverClientId = parsed.naverClientId;
    }
  } catch (e) {}
})();
