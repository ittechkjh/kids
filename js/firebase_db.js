/**
 * 도담도담 (DodamTalk) - Cloud Firestore 실시간 데이터베이스 서비스 레이어
 *
 * LocalStorage를 사용하지 않고 모든 영구 데이터를 Cloud Firestore 데이터베이스에 저장·조회·동기화합니다.
 * 컬렉션 구조:
 * 1) community_posts  - 커뮤니티 게시글, AI 리포트, 댓글, 공감/응원/꿀팁 반응
 * 2) deleted_posts    - 삭제된 게시글 ID 기록 (시드 게시글 영구 삭제 동기화)
 * 3) post_drafts      - 게시글 임시저장 보관함
 * 4) user_profiles    - 회원 프로필, 아이 정보, 성장 다이어리, 활동 점수/등급
 * 5) user_scraps      - 회원 스크랩북 (북마크)
 * 6) users            - 전체 등록 회원 계정 목록
 * 7) user_sessions    - 현재 로그인 세션 정보
 * 8) user_events      - 사용자 제보 지역행사/대회
 * 9) user_restaurants - 사용자 제보 안심 키즈맛집
 * 10) app_config      - 소셜 로그인 API 키 및 공공데이터 설정
 */

class DodamFirebaseService {
  constructor() {
    this.isConnected = false;
    this.db = null;
    this.unsubscribers = [];
    this.collectionsStatus = {
      community_posts: 0,
      deleted_posts: 0,
      user_profiles: 0,
      user_scraps: 0,
      users: 0,
      post_drafts: 0
    };
    this.init();
  }

  init() {
    try {
      // 기존 브라우저에 남아있던 LocalStorage 잔여 데이터 일괄 정리 (DB 전용 모드)
      this.purgeLegacyLocalStorage();

      const cfg = window.DODAM_FIREBASE_CONFIG;
      if (!cfg || !cfg.enabled || !cfg.apiKey || cfg.apiKey.includes('YOUR_')) {
        console.warn('[Dodam Firestore] Firebase 설정을 확인해주세요.');
        return;
      }

      if (typeof firebase === 'undefined') {
        console.warn('[Dodam Firestore] Firebase SDK 스크립트가 로드되지 않았습니다.');
        return;
      }

      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: cfg.apiKey,
          authDomain: cfg.authDomain,
          projectId: cfg.projectId,
          storageBucket: cfg.storageBucket,
          messagingSenderId: cfg.messagingSenderId,
          appId: cfg.appId
        });
      }

      this.db = firebase.firestore();
      this.isConnected = true;
      console.log('🔥 [Dodam Firestore] Cloud Firestore 실시간 데이터베이스 전용 모드 연결 완료! (Project:', cfg.projectId, ')');
      this.updateSyncBadge(true);
    } catch (err) {
      console.error('[Dodam Firestore] 초기화 오류:', err);
      this.isConnected = false;
    }
  }

  purgeLegacyLocalStorage() {
    try {
      const legacyKeys = [
        'dodam_profile_v1',
        'dodam_scraps_v1',
        'dodam_custom_posts_v1',
        'dodam_deleted_posts_v1',
        'dodam_post_draft_v1',
        'dodam_custom_restaurants_v1',
        'dodam_auth_v1',
        'dodam_users_v1',
        'dodam_social_custom_keys',
        'dodam_user_profile',
        'dodam_growth_records',
        'dodam_checked_in_date',
        'kidsinfra_api_config_v1'
      ];
      legacyKeys.forEach((k) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {}
  }

  updateSyncBadge(isLive) {
    const updateDOM = () => {
      const badges = document.querySelectorAll('.firebase-sync-badge');
      badges.forEach((el) => {
        if (isLive) {
          el.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>Cloud Firestore 실시간 DB 연동중</span>`;
          el.className = 'firebase-sync-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200';
        }
      });
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateDOM);
    } else {
      updateDOM();
    }
  }

  // =========================================================
  // 1. 커뮤니티 게시글 & 삭제 기록 (community_posts / deleted_posts)
  // =========================================================
  subscribePosts(onUpdate) {
    if (!this.isConnected || !this.db) return;

    try {
      const unsub = this.db
        .collection('community_posts')
        .orderBy('timestamp', 'desc')
        .limit(200)
        .onSnapshot(
          (snapshot) => {
            const posts = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              posts.push({
                ...data,
                id: data.id || doc.id
              });
            });
            this.collectionsStatus.community_posts = posts.length;
            if (onUpdate) onUpdate(posts);
          },
          (err) => {
            console.warn('[Dodam Firestore] 게시글 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribePosts 실패:', e);
    }
  }

  subscribeDeletedPosts(onUpdate) {
    if (!this.isConnected || !this.db) return;

    try {
      const unsub = this.db
        .collection('deleted_posts')
        .onSnapshot(
          (snapshot) => {
            const deletedIds = [];
            snapshot.forEach((doc) => {
              deletedIds.push(doc.id);
            });
            this.collectionsStatus.deleted_posts = deletedIds.length;
            if (onUpdate) onUpdate(deletedIds);
          },
          (err) => {
            console.warn('[Dodam Firestore] 삭제 게시글 목록 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribeDeletedPosts 실패:', e);
    }
  }

  sanitizePostPayload(post) {
    return {
      id: String(post.id || `post-${Date.now()}`),
      title: String(post.title || '').slice(0, 290),
      content: String(post.content || '').slice(0, 490000),
      contentHtml: post.contentHtml ? String(post.contentHtml).slice(0, 490000) : '',
      rawTextContent: post.rawTextContent ? String(post.rawTextContent).slice(0, 490000) : String(post.content || '').slice(0, 490000),
      category: post.category || 'free',
      guideType: post.guideType || 'all',
      ageStage: post.ageStage || post.category || 'all',
      region: post.region || 'all',
      localHub: post.localHub || 'all',
      localHubName: post.localHubName || '전국 전체',
      localTopic: post.localTopic || 'all',
      localTopicName: post.localTopicName || '💬 육아소통',
      isQuestion: Boolean(post.isQuestion),
      isSolved: Boolean(post.isSolved),
      isHot: Boolean(post.isHot),
      isAiReport: Boolean(post.isAiReport),
      isEdited: Boolean(post.isEdited),
      images: Array.isArray(post.images) ? post.images : [],
      author: post.author || {
        nickname: '도담맘',
        level: '🌱 새싹맘',
        childBadge: '👶 도담이',
        avatarBg: 'bg-emerald-600 text-white'
      },
      createdAt: post.createdAt || '방금 전',
      updatedAt: new Date().toISOString(),
      timestamp: Number(post.timestamp) || Date.now(),
      views: Number(post.views) || 1,
      reactions: post.reactions || { like: 0, hug: 0, tip: 0 },
      tags: Array.isArray(post.tags) ? post.tags : [],
      comments: Array.isArray(post.comments) ? post.comments : []
    };
  }

  async createPost(post) {
    if (!this.isConnected || !this.db || !post) return false;
    try {
      const payload = this.sanitizePostPayload(post);
      await this.db.collection('community_posts').doc(payload.id).set(payload, { merge: true });
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 게시글 DB 저장 실패:', err);
      return false;
    }
  }

  async updatePost(post) {
    if (!this.isConnected || !this.db || !post || !post.id) return false;
    try {
      const payload = this.sanitizePostPayload(post);
      await this.db.collection('community_posts').doc(payload.id).set(payload, { merge: true });
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 게시글 DB 수정 실패:', err);
      return false;
    }
  }

  async deletePost(postId) {
    if (!this.isConnected || !this.db || !postId) return false;
    try {
      const docId = String(postId);
      await Promise.all([
        this.db.collection('community_posts').doc(docId).delete(),
        this.db.collection('deleted_posts').doc(docId).set({
          id: docId,
          deletedAt: Date.now()
        })
      ]);
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 게시글 DB 삭제 실패:', err);
      return false;
    }
  }

  async addComment(postId, comment, fullPostFallback = null) {
    if (!this.isConnected || !this.db || !postId) return false;
    try {
      const docRef = this.db.collection('community_posts').doc(String(postId));
      const snap = await docRef.get();
      if (snap.exists) {
        await docRef.update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
          updatedAt: new Date().toISOString()
        });
      } else if (fullPostFallback) {
        const payload = this.sanitizePostPayload(fullPostFallback);
        await docRef.set(payload, { merge: true });
      }
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 댓글 DB 저장 실패:', err);
      return false;
    }
  }

  async incrementReaction(postId, type = 'like', fullPostFallback = null) {
    if (!this.isConnected || !this.db || !postId) return false;
    try {
      const docRef = this.db.collection('community_posts').doc(String(postId));
      const snap = await docRef.get();
      if (snap.exists) {
        await docRef.update({
          [`reactions.${type}`]: firebase.firestore.FieldValue.increment(1),
          updatedAt: new Date().toISOString()
        });
      } else if (fullPostFallback) {
        const payload = this.sanitizePostPayload(fullPostFallback);
        await docRef.set(payload, { merge: true });
      }
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 공감 DB 업데이트 실패:', err);
      return false;
    }
  }

  async incrementLike(postId, fullPostFallback = null) {
    return this.incrementReaction(postId, 'like', fullPostFallback);
  }

  // =========================================================
  // 2. 게시글 임시저장 (post_drafts)
  // =========================================================
  async saveDraft(draftId, draftData) {
    if (!this.isConnected || !this.db) return false;
    try {
      const docId = String(draftId || 'default_draft');
      await this.db.collection('post_drafts').doc(docId).set({
        ...draftData,
        id: docId,
        updatedAt: Date.now()
      });
      this.collectionsStatus.post_drafts = 1;
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 임시글 DB 저장 실패:', err);
      return false;
    }
  }

  async getDraft(draftId = 'default_draft') {
    if (!this.isConnected || !this.db) return null;
    try {
      const snap = await this.db.collection('post_drafts').doc(String(draftId)).get();
      if (snap.exists) {
        this.collectionsStatus.post_drafts = 1;
        return snap.data();
      }
      this.collectionsStatus.post_drafts = 0;
      return null;
    } catch (err) {
      console.warn('[Dodam Firestore] 임시글 DB 조회 실패:', err);
      return null;
    }
  }

  async deleteDraft(draftId = 'default_draft') {
    if (!this.isConnected || !this.db) return false;
    try {
      await this.db.collection('post_drafts').doc(String(draftId)).delete();
      this.collectionsStatus.post_drafts = 0;
      return true;
    } catch (err) {
      console.warn('[Dodam Firestore] 임시글 DB 삭제 실패:', err);
      return false;
    }
  }

  // =========================================================
  // 3. 내 프로필 & 성장 다이어리 (user_profiles)
  // =========================================================
  subscribeProfile(profileId = 'active_profile', onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('user_profiles')
        .doc(String(profileId))
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              this.collectionsStatus.user_profiles = 1;
              if (onUpdate) onUpdate(doc.data());
            }
          },
          (err) => {
            console.warn('[Dodam Firestore] 프로필 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribeProfile 실패:', e);
    }
  }

  async saveProfile(profileData, profileId = 'active_profile') {
    if (!this.isConnected || !this.db || !profileData) return false;
    try {
      const docId = String(profileId);
      await this.db.collection('user_profiles').doc(docId).set(
        {
          ...profileData,
          id: docId,
          updatedAt: Date.now()
        },
        { merge: true }
      );
      this.collectionsStatus.user_profiles = 1;
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 프로필 DB 저장 실패:', err);
      return false;
    }
  }

  async deleteProfile(profileId = 'active_profile') {
    if (!this.isConnected || !this.db) return false;
    try {
      await this.db.collection('user_profiles').doc(String(profileId)).delete();
      return true;
    } catch (err) {
      console.warn('[Dodam Firestore] 프로필 DB 삭제 실패:', err);
      return false;
    }
  }

  // =========================================================
  // 4. 스크랩북 북마크 (user_scraps)
  // =========================================================
  subscribeScraps(scrapId = 'active_scraps', onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('user_scraps')
        .doc(String(scrapId))
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const data = doc.data();
              const items = Array.isArray(data?.items) ? data.items : [];
              this.collectionsStatus.user_scraps = items.length;
              if (onUpdate) onUpdate(items);
            }
          },
          (err) => {
            console.warn('[Dodam Firestore] 스크랩 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribeScraps 실패:', e);
    }
  }

  async saveScraps(itemsArray, scrapId = 'active_scraps') {
    if (!this.isConnected || !this.db) return false;
    try {
      const docId = String(scrapId);
      const cleanItems = Array.isArray(itemsArray) ? itemsArray : [];
      await this.db.collection('user_scraps').doc(docId).set({
        id: docId,
        items: cleanItems,
        updatedAt: Date.now()
      });
      this.collectionsStatus.user_scraps = cleanItems.length;
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 스크랩 DB 저장 실패:', err);
      return false;
    }
  }

  async deleteScraps(scrapId = 'active_scraps') {
    if (!this.isConnected || !this.db) return false;
    try {
      await this.db.collection('user_scraps').doc(String(scrapId)).delete();
      this.collectionsStatus.user_scraps = 0;
      return true;
    } catch (err) {
      console.warn('[Dodam Firestore] 스크랩 DB 삭제 실패:', err);
      return false;
    }
  }

  // =========================================================
  // 5. 회원 계정 & 로그인 세션 (users / user_sessions)
  // =========================================================
  subscribeUsers(onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('users')
        .onSnapshot(
          (snapshot) => {
            const users = [];
            snapshot.forEach((doc) => {
              users.push({ ...doc.data(), id: doc.id });
            });
            this.collectionsStatus.users = users.length;
            if (onUpdate) onUpdate(users);
          },
          (err) => {
            console.warn('[Dodam Firestore] 회원 목록 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribeUsers 실패:', e);
    }
  }

  async saveUsers(usersArray) {
    if (!this.isConnected || !this.db || !Array.isArray(usersArray)) return false;
    try {
      const batch = this.db.batch();
      usersArray.forEach((u) => {
        if (u && (u.id || u.username)) {
          const docId = String(u.id || u.username);
          const ref = this.db.collection('users').doc(docId);
          batch.set(ref, { ...u, id: docId, updatedAt: Date.now() }, { merge: true });
        }
      });
      await batch.commit();
      this.collectionsStatus.users = usersArray.length;
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 회원 목록 DB 저장 실패:', err);
      return false;
    }
  }

  async deleteUser(userId) {
    if (!this.isConnected || !this.db || !userId) return false;
    try {
      await this.db.collection('users').doc(String(userId)).delete();
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 회원 DB 삭제 실패:', err);
      return false;
    }
  }

  subscribeSession(sessionId = 'active_session', onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('user_sessions')
        .doc(String(sessionId))
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              const data = doc.data();
              if (onUpdate) onUpdate(data?.user || null);
            } else {
              if (onUpdate) onUpdate(null);
            }
          },
          (err) => {
            console.warn('[Dodam Firestore] 세션 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribeSession 실패:', e);
    }
  }

  async saveSession(userObj, sessionId = 'active_session') {
    if (!this.isConnected || !this.db) return false;
    try {
      const docId = String(sessionId);
      if (!userObj) {
        await this.db.collection('user_sessions').doc(docId).delete();
      } else {
        await this.db.collection('user_sessions').doc(docId).set({
          id: docId,
          user: userObj,
          updatedAt: Date.now()
        });
      }
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 세션 DB 저장 실패:', err);
      return false;
    }
  }

  async clearSession(sessionId = 'active_session') {
    return this.saveSession(null, sessionId);
  }

  // =========================================================
  // 6. 앱 설정 & 소셜 API 키 (app_config)
  // =========================================================
  subscribeAppConfig(onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('app_config')
        .doc('social_keys')
        .onSnapshot(
          (doc) => {
            if (doc.exists && onUpdate) {
              onUpdate(doc.data());
            }
          },
          (err) => {
            console.warn('[Dodam Firestore] 앱 설정 구독 경고:', err.message);
          }
        );
      this.unsubscribers.push(unsub);
    } catch (e) {
      console.warn('[Dodam Firestore] subscribeAppConfig 실패:', e);
    }
  }

  async saveSocialConfig(configData) {
    if (!this.isConnected || !this.db || !configData) return false;
    try {
      await this.db.collection('app_config').doc('social_keys').set(
        {
          kakaoJavascriptKey: configData.kakaoJavascriptKey || '',
          naverClientId: configData.naverClientId || '',
          updatedAt: Date.now()
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 소셜 설정 DB 저장 실패:', err);
      return false;
    }
  }

  async saveApiConfig(configData) {
    if (!this.isConnected || !this.db || !configData) return false;
    try {
      await this.db.collection('app_config').doc('kidsinfra_api').set(
        {
          ...configData,
          updatedAt: Date.now()
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] API 설정 DB 저장 실패:', err);
      return false;
    }
  }

  // =========================================================
  // 7. 사용자 제보 행사 & 맛집 (user_events / user_restaurants)
  // =========================================================
  subscribeUserEvents(onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('user_events')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .onSnapshot((snapshot) => {
          const events = [];
          snapshot.forEach((doc) => events.push({ ...doc.data(), id: doc.id }));
          if (onUpdate) onUpdate(events);
        });
      this.unsubscribers.push(unsub);
    } catch (e) {}
  }

  async createUserEvent(evt) {
    if (!this.isConnected || !this.db) return false;
    try {
      const docId = evt.id || 'user_evt_' + Date.now();
      await this.db.collection('user_events').doc(docId).set({
        ...evt,
        id: docId,
        isUserCreated: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  subscribeUserRestaurants(onUpdate) {
    if (!this.isConnected || !this.db) return;
    try {
      const unsub = this.db
        .collection('user_restaurants')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .onSnapshot((snapshot) => {
          const places = [];
          snapshot.forEach((doc) => places.push({ ...doc.data(), id: doc.id }));
          if (onUpdate) onUpdate(places);
        });
      this.unsubscribers.push(unsub);
    } catch (e) {}
  }

  async createUserRestaurant(place) {
    if (!this.isConnected || !this.db) return false;
    try {
      const docId = place.id || 'user_rest_' + Date.now();
      await this.db.collection('user_restaurants').doc(docId).set({
        ...place,
        id: docId,
        isUserCreated: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}

window.DodamFirebase = new DodamFirebaseService();
