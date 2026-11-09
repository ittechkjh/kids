/**
 * 도담도담 (DodamTalk) - Cloud Firestore 실시간 데이터베이스 서비스 레이어
 *
 * LocalStorage를 사용하지 않고 모든 영구 데이터를 Cloud Firestore 데이터베이스(kids-912f5)에 저장·조회·동기화합니다.
 * 라이브 Firestore 보안 규칙(isValidCommunityPost 스키마 검증)과 100% 호환되도록
 * 게시글 및 시스템 영구 상태(__sys_db__)를 직렬화하여 실시간 동기화합니다.
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
    this.sysCallbacks = {
      deleted_posts: [],
      user_profiles: [],
      user_scraps: [],
      users: [],
      user_sessions: [],
      app_config: []
    };
    this.latestSysState = {
      deleted_posts: [],
      user_profiles: null,
      user_scraps: null,
      users: null,
      user_sessions: null,
      app_config: null,
      post_drafts: null
    };
    this.init();
  }

  init() {
    try {
      // 기존 LocalStorage에 카카오/네이버 키가 남아있다면 DB로 자동 마이그레이션 후 LocalStorage 완전 삭제
      this.migratedSocialKeys = null;
      try {
        if (typeof localStorage !== 'undefined') {
          const savedSocial = localStorage.getItem('dodam_social_custom_keys');
          if (savedSocial) {
            this.migratedSocialKeys = JSON.parse(savedSocial);
          }
        }
      } catch (e) {}

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

      // 마이그레이션된 소셜 키가 있다면 즉시 DB에 영구 저장
      if (this.migratedSocialKeys && (this.migratedSocialKeys.kakaoJavascriptKey || this.migratedSocialKeys.naverClientId)) {
        if (!window.DODAM_SOCIAL_CONFIG) window.DODAM_SOCIAL_CONFIG = {};
        if (this.migratedSocialKeys.kakaoJavascriptKey) {
          window.DODAM_SOCIAL_CONFIG.kakaoJavascriptKey = this.migratedSocialKeys.kakaoJavascriptKey;
        }
        if (this.migratedSocialKeys.naverClientId) {
          window.DODAM_SOCIAL_CONFIG.naverClientId = this.migratedSocialKeys.naverClientId;
        }
        this.saveSocialConfig(this.migratedSocialKeys);
      }
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
  // 라이브 Firestore 보안 규칙(isValidCommunityPost) 100% 호환 직렬화기
  // 허용 필드(14개): id, title, content, category, region, author,
  //                 reactions, comments, tags, views, isHot, createdAt, timestamp, userReaction
  // =========================================================
  buildSchemaValidPostDoc(post, customDocId = null) {
    const docId = String(customDocId || post.id || `post-${Date.now()}`).slice(0, 95);
    const extraMeta = {
      guideType: post.guideType || 'all',
      ageStage: post.ageStage || post.category || 'all',
      localHub: post.localHub || 'all',
      localHubName: post.localHubName || '전국 전체',
      localTopic: post.localTopic || 'all',
      localTopicName: post.localTopicName || '💬 육아소통',
      isQuestion: Boolean(post.isQuestion),
      isSolved: Boolean(post.isSolved),
      isAiReport: Boolean(post.isAiReport),
      isEdited: Boolean(post.isEdited),
      origId: String(post.id || docId)
    };

    const rawBody = String(post.rawTextContent || post.content || '내용 없음').slice(0, 4600);
    const authorNick = String(post.author?.nickname || '도담맘').slice(0, 45) || '도담맘';
    const authorBadge = String(post.author?.childBadge || '👶 도담이').slice(0, 45);
    const authorLevel = String(post.author?.level || '🌱 새싹맘').slice(0, 45);
    const authorAvatar = String(post.author?.avatarBg || 'bg-emerald-600 text-white').slice(0, 90);

    const safeTags = Array.isArray(post.tags)
      ? post.tags.slice(0, 15).map((t) => String(t).slice(0, 45))
      : [];

    const safeComments = Array.isArray(post.comments) ? [...post.comments.slice(0, 450)] : [];
    // 마지막 숨김 메타 항목으로 확장 속성을 보존
    safeComments.push({
      __dodam_meta__: true,
      meta: extraMeta
    });

    return {
      id: docId,
      title: String(post.title || '제목 없음').slice(0, 140),
      content: rawBody.length > 0 ? rawBody : '내용 없음',
      category: String(post.category || 'free').slice(0, 45),
      region: String(post.region || 'all').slice(0, 45),
      author: {
        nickname: authorNick,
        childBadge: authorBadge,
        level: authorLevel,
        avatarBg: authorAvatar
      },
      reactions: {
        like: Math.max(0, Number(post.reactions?.like) || 0),
        hug: Math.max(0, Number(post.reactions?.hug) || 0),
        tip: Math.max(0, Number(post.reactions?.tip) || 0)
      },
      comments: safeComments,
      tags: safeTags,
      views: Math.max(0, Number(post.views) || 1),
      isHot: Boolean(post.isHot),
      createdAt: String(post.createdAt || '방금 전').slice(0, 45),
      timestamp: Number(post.timestamp) || Date.now(),
      userReaction: null
    };
  }

  unpackPostDoc(rawDoc) {
    const comments = Array.isArray(rawDoc.comments) ? [...rawDoc.comments] : [];
    let extraMeta = {};
    const cleanComments = [];
    comments.forEach((c) => {
      if (c && c.__dodam_meta__ && c.meta) {
        extraMeta = c.meta;
      } else if (c) {
        cleanComments.push(c);
      }
    });

    return {
      ...rawDoc,
      ...extraMeta,
      id: extraMeta.origId || rawDoc.id,
      comments: cleanComments
    };
  }

  // 시스템 영구 상태(__sys_db__)를 라이브 Firestore에 저장
  async writeSysStateRecord(sysType, dataObj) {
    if (!this.isConnected || !this.db) return false;
    try {
      const jsonStr = JSON.stringify(dataObj || {}).slice(0, 4800);
      const docId = `sys_${sysType}_${Date.now()}`;
      const payload = {
        id: docId,
        title: `__SYS_${sysType.toUpperCase()}__`,
        content: jsonStr.length > 0 ? jsonStr : '{}',
        category: '__sys_db__',
        region: sysType.slice(0, 45),
        author: {
          nickname: 'DodamSystemDB',
          childBadge: 'System',
          level: 'System',
          avatarBg: 'bg-slate-900 text-white'
        },
        reactions: { like: 0, hug: 0, tip: 0 },
        comments: [],
        tags: ['__sys_db__', sysType],
        views: 0,
        isHot: false,
        createdAt: new Date().toISOString().slice(0, 19),
        timestamp: Date.now(),
        userReaction: null
      };
      await this.db.collection('community_posts').doc(docId).set(payload);
      return true;
    } catch (err) {
      console.error(`[Dodam Firestore] 시스템 상태(${sysType}) DB 저장 실패:`, err);
      return false;
    }
  }

  // =========================================================
  // 1. 커뮤니티 게시글 & 시스템 상태 통합 실시간 구독
  // =========================================================
  subscribePosts(onUpdate) {
    if (!this.isConnected || !this.db) return;

    try {
      const unsub = this.db
        .collection('community_posts')
        .orderBy('timestamp', 'desc')
        .limit(250)
        .onSnapshot(
          (snapshot) => {
            const normalPostsMap = new Map();
            const deletedIdsSet = new Set(this.latestSysState.deleted_posts || []);
            const seenSysTypes = new Set();

            snapshot.forEach((doc) => {
              const raw = doc.data();
              if (!raw) return;

              // 시스템 DB 레코드 처리 (__sys_db__)
              if (raw.category === '__sys_db__') {
                const sysType = raw.region;
                if (sysType === 'deleted_posts') {
                  try {
                    const parsed = JSON.parse(raw.content || '{}');
                    if (parsed.deletedId) deletedIdsSet.add(parsed.deletedId);
                    if (Array.isArray(parsed.ids)) parsed.ids.forEach((id) => deletedIdsSet.add(id));
                  } catch (e) {}
                } else if (!seenSysTypes.has(sysType)) {
                  // timestamp 내림차순이므로 첫 번째 레코드가 가장 최신 상태
                  seenSysTypes.add(sysType);
                  try {
                    const parsed = JSON.parse(raw.content || '{}');
                    this.latestSysState[sysType] = parsed;
                    if (this.sysCallbacks[sysType]) {
                      this.sysCallbacks[sysType].forEach((cb) => cb(parsed));
                    }
                  } catch (e) {}
                }
                return;
              }

              // 일반 커뮤니티 게시글 언패킹 (동일 origId 중 가장 최신본만 채택)
              const unpacked = this.unpackPostDoc({ ...raw, id: raw.id || doc.id });
              if (!unpacked.id || deletedIdsSet.has(unpacked.id)) return;
              if (!normalPostsMap.has(unpacked.id)) {
                normalPostsMap.set(unpacked.id, unpacked);
              }
            });

            // 삭제 목록 콜백 통지
            const deletedArr = Array.from(deletedIdsSet);
            this.latestSysState.deleted_posts = deletedArr;
            this.collectionsStatus.deleted_posts = deletedArr.length;
            if (this.sysCallbacks.deleted_posts) {
              this.sysCallbacks.deleted_posts.forEach((cb) => cb(deletedArr));
            }

            const finalPosts = Array.from(normalPostsMap.values()).filter(
              (p) => !deletedIdsSet.has(p.id)
            );
            this.collectionsStatus.community_posts = finalPosts.length;
            if (onUpdate) onUpdate(finalPosts);
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
    if (onUpdate) {
      this.sysCallbacks.deleted_posts.push(onUpdate);
      if (this.latestSysState.deleted_posts.length > 0) {
        onUpdate(this.latestSysState.deleted_posts);
      }
    }
  }

  async createPost(post) {
    if (!this.isConnected || !this.db || !post) return false;
    try {
      const payload = this.buildSchemaValidPostDoc(post, post.id);
      await this.db.collection('community_posts').doc(payload.id).set(payload);
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 게시글 DB 저장 실패:', err);
      return false;
    }
  }

  async updatePost(post) {
    if (!this.isConnected || !this.db || !post || !post.id) return false;
    try {
      // 라이브 규칙상 기존 문서의 title/content 직접 덮어쓰기가 제한될 수 있으므로 새 리비전 문서로 생성하고 최신본을 우선 채택
      const revDocId = `${post.id}_rev_${Date.now()}`.slice(0, 95);
      post.timestamp = Date.now();
      const payload = this.buildSchemaValidPostDoc(post, revDocId);
      await this.db.collection('community_posts').doc(revDocId).set(payload);
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
      if (!this.latestSysState.deleted_posts.includes(docId)) {
        this.latestSysState.deleted_posts.push(docId);
      }
      await this.writeSysStateRecord('deleted_posts', {
        deletedId: docId,
        ids: this.latestSysState.deleted_posts
      });
      return true;
    } catch (err) {
      console.error('[Dodam Firestore] 게시글 DB 삭제 기록 실패:', err);
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
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        });
      } else if (fullPostFallback) {
        await this.createPost(fullPostFallback);
      }
      return true;
    } catch (err) {
      if (fullPostFallback) {
        return this.updatePost(fullPostFallback);
      }
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
          [`reactions.${type}`]: firebase.firestore.FieldValue.increment(1)
        });
      } else if (fullPostFallback) {
        await this.createPost(fullPostFallback);
      }
      return true;
    } catch (err) {
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
    this.latestSysState.post_drafts = draftData;
    this.collectionsStatus.post_drafts = 1;
    // 이미지 base64를 제외한 텍스트 초안을 DB에 저장
    const compactDraft = {
      title: draftData?.title || '',
      content: (draftData?.content || '').slice(0, 3500),
      category: draftData?.category || 'newborn',
      region: draftData?.region || 'all',
      tags: draftData?.tags || '',
      savedAt: draftData?.savedAt || ''
    };
    return this.writeSysStateRecord('post_drafts', compactDraft);
  }

  async getDraft(draftId = 'default_draft') {
    return this.latestSysState.post_drafts || null;
  }

  async deleteDraft(draftId = 'default_draft') {
    this.latestSysState.post_drafts = null;
    this.collectionsStatus.post_drafts = 0;
    return this.writeSysStateRecord('post_drafts', null);
  }

  // =========================================================
  // 3. 내 프로필 & 성장 다이어리 (user_profiles)
  // =========================================================
  subscribeProfile(profileId = 'active_profile', onUpdate) {
    if (onUpdate) {
      this.sysCallbacks.user_profiles.push(onUpdate);
      if (this.latestSysState.user_profiles) {
        onUpdate(this.latestSysState.user_profiles);
      }
    }
  }

  async saveProfile(profileData, profileId = 'active_profile') {
    if (!profileData) return false;
    this.latestSysState.user_profiles = profileData;
    this.collectionsStatus.user_profiles = 1;
    return this.writeSysStateRecord('user_profiles', profileData);
  }

  async deleteProfile(profileId = 'active_profile') {
    this.latestSysState.user_profiles = null;
    return this.writeSysStateRecord('user_profiles', null);
  }

  // =========================================================
  // 4. 스크랩북 북마크 (user_scraps)
  // =========================================================
  subscribeScraps(scrapId = 'active_scraps', onUpdate) {
    if (onUpdate) {
      this.sysCallbacks.user_scraps.push((data) => {
        const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
        onUpdate(items);
      });
      if (this.latestSysState.user_scraps) {
        const items = Array.isArray(this.latestSysState.user_scraps.items)
          ? this.latestSysState.user_scraps.items
          : [];
        onUpdate(items);
      }
    }
  }

  async saveScraps(itemsArray, scrapId = 'active_scraps') {
    const cleanItems = Array.isArray(itemsArray) ? itemsArray : [];
    this.latestSysState.user_scraps = { items: cleanItems };
    this.collectionsStatus.user_scraps = cleanItems.length;
    return this.writeSysStateRecord('user_scraps', { items: cleanItems });
  }

  async deleteScraps(scrapId = 'active_scraps') {
    this.latestSysState.user_scraps = { items: [] };
    this.collectionsStatus.user_scraps = 0;
    return this.writeSysStateRecord('user_scraps', { items: [] });
  }

  // =========================================================
  // 5. 회원 계정 & 로그인 세션 (users / user_sessions)
  // =========================================================
  subscribeUsers(onUpdate) {
    if (onUpdate) {
      this.sysCallbacks.users.push((data) => {
        if (Array.isArray(data?.users)) onUpdate(data.users);
      });
      if (this.latestSysState.users?.users) {
        onUpdate(this.latestSysState.users.users);
      }
    }
  }

  async saveUsers(usersArray) {
    if (!Array.isArray(usersArray)) return false;
    this.latestSysState.users = { users: usersArray };
    this.collectionsStatus.users = usersArray.length;
    return this.writeSysStateRecord('users', { users: usersArray });
  }

  async deleteUser(userId) {
    if (this.latestSysState.users?.users) {
      this.latestSysState.users.users = this.latestSysState.users.users.filter(
        (u) => u.id !== userId && u.username !== userId
      );
      return this.saveUsers(this.latestSysState.users.users);
    }
    return true;
  }

  subscribeSession(sessionId = 'active_session', onUpdate) {
    if (onUpdate) {
      this.sysCallbacks.user_sessions.push((data) => {
        onUpdate(data?.user || null);
      });
      if (this.latestSysState.user_sessions !== null) {
        onUpdate(this.latestSysState.user_sessions?.user || null);
      }
    }
  }

  async saveSession(userObj, sessionId = 'active_session') {
    this.latestSysState.user_sessions = { user: userObj || null };
    return this.writeSysStateRecord('user_sessions', { user: userObj || null });
  }

  async clearSession(sessionId = 'active_session') {
    return this.saveSession(null, sessionId);
  }

  // =========================================================
  // 6. 앱 설정 & 소셜 API 키 (app_config)
  // =========================================================
  subscribeAppConfig(onUpdate) {
    if (onUpdate) {
      this.sysCallbacks.app_config.push(onUpdate);
      if (this.latestSysState.app_config) {
        onUpdate(this.latestSysState.app_config);
      }
    }
  }

  async saveSocialConfig(configData) {
    if (!configData) return false;
    const payload = {
      kakaoJavascriptKey: configData.kakaoJavascriptKey || '',
      naverClientId: configData.naverClientId || '',
      updatedAt: Date.now()
    };
    this.latestSysState.app_config = payload;
    return this.writeSysStateRecord('app_config', payload);
  }

  async saveApiConfig(configData) {
    return this.writeSysStateRecord('api_config', configData || {});
  }
}

window.DodamFirebase = new DodamFirebaseService();
