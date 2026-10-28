/**
 * 도담 도담 (DodamTalk) - Firebase Firestore 연동 매니저
 * 
 * 기능:
 * 1. Firebase Firestore 실시간 동기화 (커뮤니티 글, 댓글, 공감, 사용자 등록 행사/맛집)
 * 2. 미설정 시 안전한 로컬스토리지 및 시드 데이터 폴백 (Offline-First)
 * 3. 실시간 리스너(onSnapshot)를 통한 다중 사용자 변경사항 즉시 반영
 */

class DodamFirebaseService {
  constructor() {
    this.db = null;
    this.isOnline = false;
    this.init();
  }

  init() {
    try {
      if (typeof window.firebase !== 'undefined' && window.isFirebaseConfigured && window.isFirebaseConfigured()) {
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp(window.FIREBASE_CONFIG);
        }
        this.db = firebase.firestore();
        this.isOnline = true;
        console.log('[Dodam Firebase] Cloud Firestore가 성공적으로 연결되었습니다.');
      } else {
        this.isOnline = false;
        console.info('[Dodam Firebase] Firebase 설정이 기본값이므로 로컬 시드 및 LocalStorage 캐시 모드로 동작합니다.');
      }
    } catch (err) {
      console.warn('[Dodam Firebase] 초기화 중 오류 발생 (로컬 모드로 전환):', err);
      this.isOnline = false;
    }
  }

  // ==========================================
  // [1] 커뮤니티 게시글 (community_posts)
  // ==========================================

  /**
   * 커뮤니티 게시글 실시간 구독
   * @param {Function} onUpdate - 새 데이터 수신 시 호출될 콜백 함수
   */
  subscribePosts(onUpdate) {
    if (!this.isOnline || !this.db) {
      return null;
    }

    try {
      return this.db.collection('community_posts')
        .orderBy('timestamp', 'desc')
        .limit(60)
        .onSnapshot((snapshot) => {
          const remotePosts = [];
          snapshot.forEach((doc) => {
            remotePosts.push({ id: doc.id, ...doc.data() });
          });
          if (typeof onUpdate === 'function') {
            onUpdate(remotePosts);
          }
        }, (error) => {
          console.warn('[Dodam Firebase] posts 구독 오류:', error);
        });
    } catch (e) {
      console.warn('[Dodam Firebase] posts 구독 예외:', e);
      return null;
    }
  }

  /**
   * 커뮤니티 새 글 등록
   * @param {Object} post 
   */
  async createPost(post) {
    if (!this.isOnline || !this.db) {
      return { success: true, mode: 'local' };
    }

    try {
      const docRef = this.db.collection('community_posts').doc(post.id);
      await docRef.set({
        ...post
      });
      return { success: true, mode: 'firestore' };
    } catch (err) {
      console.error('[Dodam Firebase] createPost 실패:', err);
      return { success: false, error: err };
    }
  }

  /**
   * 게시글에 댓글 등록
   * @param {String} postId 
   * @param {Object} comment 
   */
  async addComment(postId, comment) {
    if (!this.isOnline || !this.db) {
      return { success: true, mode: 'local' };
    }

    try {
      const docRef = this.db.collection('community_posts').doc(postId);
      await docRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
      });
      return { success: true, mode: 'firestore' };
    } catch (err) {
      console.error('[Dodam Firebase] addComment 실패:', err);
      return { success: false, error: err };
    }
  }

  /**
   * 게시글 공감(좋아요) 1 증가
   * @param {String} postId 
   */
  async incrementLike(postId) {
    if (!this.isOnline || !this.db) {
      return { success: true, mode: 'local' };
    }

    try {
      const docRef = this.db.collection('community_posts').doc(postId);
      await docRef.update({
        'reactions.like': firebase.firestore.FieldValue.increment(1)
      });
      return { success: true, mode: 'firestore' };
    } catch (err) {
      console.error('[Dodam Firebase] incrementLike 실패:', err);
      return { success: false, error: err };
    }
  }

  // ==========================================
  // [2] 사용자 등록 전국 행사 및 대회 (user_events)
  // ==========================================

  /**
   * 사용자 등록 행사 실시간 구독
   * @param {Function} onUpdate 
   */
  subscribeUserEvents(onUpdate) {
    if (!this.isOnline || !this.db) {
      return null;
    }

    try {
      return this.db.collection('user_events')
        .orderBy('createdAt', 'desc')
        .limit(100)
        .onSnapshot((snapshot) => {
          const events = [];
          snapshot.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() });
          });
          if (typeof onUpdate === 'function') {
            onUpdate(events);
          }
        }, (error) => {
          console.warn('[Dodam Firebase] user_events 구독 오류:', error);
        });
    } catch (e) {
      console.warn('[Dodam Firebase] user_events 구독 예외:', e);
      return null;
    }
  }

  /**
   * 사용자 새 행사 등록
   * @param {Object} eventItem 
   */
  async createUserEvent(eventItem) {
    if (!this.isOnline || !this.db) {
      return { success: true, mode: 'local' };
    }

    try {
      const docRef = this.db.collection('user_events').doc(eventItem.id);
      await docRef.set({
        ...eventItem
      });
      return { success: true, mode: 'firestore' };
    } catch (err) {
      console.error('[Dodam Firebase] createUserEvent 실패:', err);
      return { success: false, error: err };
    }
  }

  // ==========================================
  // [3] 사용자 등록 맛집 (user_restaurants)
  // ==========================================

  /**
   * 사용자 등록 맛집 실시간 구독
   * @param {Function} onUpdate 
   */
  subscribeUserRestaurants(onUpdate) {
    if (!this.isOnline || !this.db) {
      return null;
    }

    try {
      return this.db.collection('user_restaurants')
        .orderBy('createdAt', 'desc')
        .limit(100)
        .onSnapshot((snapshot) => {
          const rests = [];
          snapshot.forEach((doc) => {
            rests.push({ id: doc.id, ...doc.data() });
          });
          if (typeof onUpdate === 'function') {
            onUpdate(rests);
          }
        }, (error) => {
          console.warn('[Dodam Firebase] user_restaurants 구독 오류:', error);
        });
    } catch (e) {
      console.warn('[Dodam Firebase] user_restaurants 구독 예외:', e);
      return null;
    }
  }

  /**
   * 사용자 새 맛집 등록
   * @param {Object} restItem 
   */
  async createUserRestaurant(restItem) {
    if (!this.isOnline || !this.db) {
      return { success: true, mode: 'local' };
    }

    try {
      const docRef = this.db.collection('user_restaurants').doc(restItem.id);
      await docRef.set({
        ...restItem
      });
      return { success: true, mode: 'firestore' };
    } catch (err) {
      console.error('[Dodam Firebase] createUserRestaurant 실패:', err);
      return { success: false, error: err };
    }
  }
}

// 전역 인스턴스 초기화
window.DodamFirebase = new DodamFirebaseService();
