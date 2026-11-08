/**
 * 도담도담 (DodamTalk) - 카카오 / 네이버 소셜 로그인 설정 (Cloud Firestore 연동)
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
 *    웹 화면의 [API 키 직접 등록/관리] 버튼을 통해 Cloud Firestore DB에 직접 저장할 수 있습니다.
 */

window.DODAM_SOCIAL_CONFIG = {
  kakaoJavascriptKey: "", // 카카오 JavaScript 키 (Cloud Firestore app_config/social_keys에서 자동 동기화)
  naverClientId: "",      // 네이버 Client ID (Cloud Firestore app_config/social_keys에서 자동 동기화)
  naverCallbackUrl: (function() {
    try {
      return window.location.origin + window.location.pathname;
    } catch (e) {
      return "https://ittechkjh.github.io/kids/";
    }
  })()
};
