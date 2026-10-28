/**
 * 도담 도담 (DodamTalk) - Firebase 환경 설정 파일
 * 
 * [Firebase 연동 안내]
 * 1. Firebase 콘솔(https://console.firebase.google.com/)에 접속하여 무료 프로젝트 생성
 * 2. [빌드] > [Firestore Database] 생성 (위치: asia-northeast3 서울 권장, 프로덕션 모드)
 * 3. [프로젝트 개요 옆 톱니바퀴(프로젝트 설정)] > [일반] > 하단 '내 앱'에서 웹 앱(</>) 추가
 * 4. 발급받은 firebaseConfig 객체 값을 아래 window.FIREBASE_CONFIG에 붙여넣으시면 즉시 연동됩니다.
 * 
 * * API 키가 비어있거나 기본값인 경우, 자동으로 로컬 시드 및 LocalStorage 캐시 모드로 안전하게 작동합니다.
 */
window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/**
 * Firebase 설정 유효성 검사 헬퍼
 */
window.isFirebaseConfigured = function () {
  return (
    typeof window.FIREBASE_CONFIG === 'object' &&
    window.FIREBASE_CONFIG !== null &&
    window.FIREBASE_CONFIG.apiKey &&
    window.FIREBASE_CONFIG.apiKey !== 'YOUR_API_KEY' &&
    window.FIREBASE_CONFIG.projectId &&
    window.FIREBASE_CONFIG.projectId !== 'YOUR_PROJECT_ID'
  );
};
