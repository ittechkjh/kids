// 도담톡 (DodamTalk) - 올인원 육아 커뮤니티 메인 애플리케이션 컨트롤러
class DodamCommunityApp {
  constructor() {
    this.data = window.DODAM_COMMUNITY_DATA;

    this.currentView = 'feed'; // 'feed' | 'cohort' | 'clubs' | 'market' | 'tools'
    this.currentCategory = 'all';
    this.currentRegion = 'all';
    this.searchKeyword = '';
    this.feedSort = 'latest'; // 'latest' | 'popular' | 'comments'
    this.activePollIndex = 0;
    this.activeCohortId = 'cohort-7-15';
    this.marketFilter = 'all';

    // LocalStorage Keys
    this.profileKey = 'dodam_profile_v1';
    this.scrapsKey = 'dodam_scraps_v1';
    this.customPostsKey = 'dodam_custom_posts_v1';

    this.profile = this.loadProfile();
    this.scraps = this.loadScraps();
    this.loadSavedPosts();
  }

  init() {
    this.renderProfileWidget();
    this.renderCategoryNavigation();
    this.renderActivePoll();
    this.renderFeed();
    this.renderSidebarWidgets();
    this.renderCohortSection();
    this.renderClubsSection();
    this.renderMarketSection();
    this.calculateGrowthPercentile();
    this.calculateFeverDose();
    this.updateScrapBadge();
  }

  // ==========================================
  // 1. 내 프로필 & 출석체크 관리
  // ==========================================
  loadProfile() {
    try {
      const raw = localStorage.getItem(this.profileKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return {
      nickname: '판교도담맘',
      babyName: '도담이',
      ageBadge: '11개월 아기',
      region: '분당·판교',
      points: 450,
      level: 'Lv.4 열정맘',
      checkedInToday: false
    };
  }

  saveProfileData() {
    localStorage.setItem(this.profileKey, JSON.stringify(this.profile));
  }

  renderProfileWidget() {
    const el = document.getElementById('my-profile-widget');
    if (!el) return;

    el.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl coral-badge-gradient text-white flex items-center justify-center font-black text-lg shadow-sm">
          ${this.profile.nickname.slice(0, 1)}
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-black text-sm text-slate-900">${this.profile.nickname}</span>
            <span class="px-2 py-0.2 rounded-full bg-rose-50 text-rose-600 text-[10px] font-extrabold border border-rose-200">${this.profile.level}</span>
          </div>
          <p class="text-xs text-slate-500 mt-0.5">👶 ${this.profile.babyName} (${this.profile.ageBadge}) · ${this.profile.region}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-2 pt-2 text-center bg-stone-50 rounded-2xl p-2.5 border border-stone-200/60">
        <div>
          <div class="text-[10px] text-slate-400 font-bold">육아 포인트</div>
          <div class="text-xs font-black text-rose-600">${this.profile.points.toLocaleString()} P</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 font-bold">스크랩</div>
          <div class="text-xs font-black text-slate-800">${this.scraps.length}개</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-400 font-bold">소속 동기방</div>
          <div class="text-xs font-black text-indigo-600">돌아기방</div>
        </div>
      </div>
    `;

    const attBtn = document.getElementById('attendance-btn');
    if (attBtn && this.profile.checkedInToday) {
      attBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i><span>출석 완료 (+50P)</span>`;
      attBtn.className = 'py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold flex items-center justify-center gap-1.5';
    }
  }

  checkInAttendance() {
    if (this.profile.checkedInToday) {
      this.showToast('오늘은 이미 출석체크를 완료하셨어요! 내일 또 만나요 😊');
      return;
    }
    this.profile.checkedInToday = true;
    this.profile.points += 50;
    this.saveProfileData();
    this.renderProfileWidget();
    this.showToast('🎉 오늘의 육아 출석체크 완료! +50 포인트가 적립되었습니다.');
  }

  openProfileModal() {
    document.getElementById('prof-nickname').value = this.profile.nickname;
    document.getElementById('prof-babyname').value = this.profile.babyName;
    document.getElementById('prof-agebadge').value = this.profile.ageBadge;
    document.getElementById('prof-region').value = this.profile.region;
    document.getElementById('profile-modal').classList.remove('hidden');
  }

  closeProfileModal() {
    document.getElementById('profile-modal').classList.add('hidden');
  }

  saveProfile(e) {
    e.preventDefault();
    this.profile.nickname = document.getElementById('prof-nickname').value.trim();
    this.profile.babyName = document.getElementById('prof-babyname').value.trim();
    this.profile.ageBadge = document.getElementById('prof-agebadge').value.trim();
    this.profile.region = document.getElementById('prof-region').value.trim();
    this.saveProfileData();
    this.renderProfileWidget();
    this.closeProfileModal();
    this.showToast('내 육아 프로필 정보가 업데이트되었습니다!');
  }

  // ==========================================
  // 2. 메인 뷰 전환 & 카테고리/동네/검색 필터
  // ==========================================
  switchMainView(viewId) {
    this.currentView = viewId;
    document.querySelectorAll('.view-section').forEach((sec) => sec.classList.add('hidden'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-view-btn').forEach((btn) => {
      const active = btn.getAttribute('data-view') === viewId;
      btn.className = active
        ? 'nav-view-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition bg-rose-500 text-white shadow-sm'
        : 'nav-view-btn flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition text-slate-600 hover:bg-stone-100';
    });
  }

  renderCategoryNavigation() {
    const sideEl = document.getElementById('sidebar-category-list');
    const mobEl = document.getElementById('mobile-category-chips');

    if (sideEl) {
      sideEl.innerHTML = this.data.categories
        .map((c) => {
          const active = c.id === this.currentCategory;
          return `
            <button
              onclick="app.selectCategory('${c.id}')"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                active
                  ? 'bg-rose-50 text-rose-600 font-extrabold'
                  : 'text-slate-600 hover:bg-stone-50 hover:text-slate-900'
              }"
            >
              <span class="flex items-center gap-2">
                <i class="fa-solid ${c.icon} w-4 text-center ${active ? 'text-rose-500' : 'text-slate-400'}"></i>
                <span>${c.name}</span>
              </span>
              ${active ? '<i class="fa-solid fa-chevron-right text-[10px] text-rose-400"></i>' : ''}
            </button>
          `;
        })
        .join('');
    }

    if (mobEl) {
      mobEl.innerHTML = this.data.categories
        .map((c) => {
          const active = c.id === this.currentCategory;
          return `
            <button
              onclick="app.selectCategory('${c.id}')"
              class="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${
                active
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-slate-600 border-stone-200'
              }"
            >
              ${c.name}
            </button>
          `;
        })
        .join('');
    }
  }

  selectCategory(catId) {
    this.currentCategory = catId;
    if (this.currentView !== 'feed') {
      this.switchMainView('feed');
    }
    this.renderCategoryNavigation();
    this.renderFeed();
  }

  onChangeRegion(regionId) {
    this.currentRegion = regionId;
    this.renderFeed();
    this.renderClubsSection();
  }

  onSearchKeyword(keyword) {
    this.searchKeyword = keyword.trim().toLowerCase();
    if (this.currentView !== 'feed') {
      this.switchMainView('feed');
    }
    this.renderFeed();
  }

  setFeedSort(sortMode) {
    this.feedSort = sortMode;
    document.querySelectorAll('.feed-sort-btn').forEach((btn) => {
      const active = btn.getAttribute('data-sort') === sortMode;
      btn.className = active
        ? 'feed-sort-btn px-2.5 py-1 rounded-lg font-extrabold bg-slate-900 text-white'
        : 'feed-sort-btn px-2.5 py-1 rounded-lg font-bold text-slate-500 hover:text-slate-800';
    });
    this.renderFeed();
  }

  // ==========================================
  // 3. 실시간 육아 밸런스 투표 위젯
  // ==========================================
  renderActivePoll() {
    const container = document.getElementById('active-poll-card');
    if (!container) return;

    const poll = this.data.polls[this.activePollIndex];
    const total = poll.totalVotes;

    container.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold text-[11px]">${poll.tag}</span>
        <div class="flex items-center gap-2 text-xs text-slate-400 font-bold">
          <span>참여 ${total.toLocaleString()}명</span>
          <button onclick="app.nextPoll()" class="text-rose-500 hover:underline text-[11px]">다음 투표 ↻</button>
        </div>
      </div>
      <h3 class="text-sm sm:text-base font-black text-slate-900 mb-3">Q. ${poll.question}</h3>
      <div class="space-y-2">
        ${poll.options
          .map((opt, idx) => {
            const pct = Math.round((opt.votes / total) * 100);
            const isPicked = poll.userVotedIndex === idx;
            return `
              <button
                onclick="app.votePoll(${idx})"
                class="w-full text-left relative overflow-hidden rounded-xl border ${
                  isPicked ? 'border-rose-400 bg-rose-50/40' : 'border-stone-200 bg-white hover:border-rose-200'
                } p-3 transition"
              >
                <div class="poll-bar-fill absolute left-0 top-0 bottom-0 ${
                  isPicked ? 'bg-rose-200/50' : 'bg-stone-100'
                }" style="width: ${pct}%"></div>
                <div class="relative flex items-center justify-between text-xs font-bold">
                  <span class="${isPicked ? 'text-rose-900 font-extrabold' : 'text-slate-700'}">
                    ${isPicked ? '✔ ' : ''}${opt.label}
                  </span>
                  <span class="${isPicked ? 'text-rose-600 font-black' : 'text-slate-500'}">${pct}% (${opt.votes}명)</span>
                </div>
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  }

  votePoll(optionIndex) {
    const poll = this.data.polls[this.activePollIndex];
    if (poll.userVotedIndex !== null) {
      poll.options[poll.userVotedIndex].votes -= 1;
      poll.totalVotes -= 1;
    }
    poll.userVotedIndex = optionIndex;
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    this.renderActivePoll();
    this.showToast('투표가 반영되었습니다! 육아 동지들의 생각도 확인해 보세요.');
  }

  nextPoll() {
    this.activePollIndex = (this.activePollIndex + 1) % this.data.polls.length;
    this.renderActivePoll();
  }

  // ==========================================
  // 4. 커뮤니티 피드 & 공감 리액션 & 댓글 작성
  // ==========================================
  renderFeed() {
    const listEl = document.getElementById('community-feed-list');
    const titleEl = document.getElementById('current-feed-title');
    const countEl = document.getElementById('current-feed-count');
    if (!listEl) return;

    const catObj = this.data.categories.find((c) => c.id === this.currentCategory);
    if (titleEl && catObj) titleEl.textContent = catObj.name;

    let filtered = this.data.posts.filter((p) => {
      if (this.currentCategory === 'hot' && !p.isHot) return false;
      if (this.currentCategory !== 'all' && this.currentCategory !== 'hot' && p.category !== this.currentCategory) return false;
      if (this.currentRegion !== 'all' && p.region !== 'all' && p.region !== this.currentRegion) return false;
      if (this.searchKeyword) {
        const matchTitle = p.title.toLowerCase().includes(this.searchKeyword);
        const matchBody = p.content.toLowerCase().includes(this.searchKeyword);
        const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(this.searchKeyword));
        if (!matchTitle && !matchBody && !matchTags) return false;
      }
      return true;
    });

    if (this.feedSort === 'popular') {
      filtered.sort(
        (a, b) =>
          b.reactions.like + b.reactions.hug + b.reactions.tip -
          (a.reactions.like + a.reactions.hug + a.reactions.tip)
      );
    } else if (this.feedSort === 'comments') {
      filtered.sort((a, b) => b.comments.length - a.comments.length);
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    if (countEl) countEl.textContent = `${filtered.length}개의 이야기`;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="community-card p-10 text-center space-y-2">
          <div class="text-2xl">🌱</div>
          <div class="text-sm font-extrabold text-slate-700">조건에 맞는 게시글이 아직 없어요.</div>
          <p class="text-xs text-slate-400">첫 번째로 고민이나 육아 일상을 남겨보세요!</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered
      .map((post) => {
        const cat = this.data.categories.find((c) => c.id === post.category);
        const isScrapped = this.scraps.includes(post.id);
        return `
          <article class="community-card p-5 space-y-3.5">
            <!-- 작성자 & 카테고리 헤더 -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full ${post.author.avatarBg} flex items-center justify-center font-black text-xs">
                  ${post.author.nickname.slice(0, 1)}
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-extrabold text-xs text-slate-900">${post.author.nickname}</span>
                    <span class="text-[10px] font-bold text-slate-400">${post.author.level}</span>
                  </div>
                  <div class="text-[11px] text-rose-500 font-bold">${post.author.childBadge} · <span class="text-slate-400 font-normal">${post.createdAt}</span></div>
                </div>
              </div>

              <div class="flex items-center gap-1.5">
                ${post.isHot ? '<span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-extrabold text-[10px] border border-rose-200">🔥 인기</span>' : ''}
                <span class="px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-600 font-bold text-[11px]">${cat ? cat.name : ''}</span>
                <button
                  onclick="app.toggleScrap('${post.id}')"
                  title="스크랩"
                  class="w-8 h-8 rounded-xl border ${
                    isScrapped ? 'bg-amber-50 border-amber-300 text-amber-500' : 'border-stone-200 text-slate-400 hover:text-slate-600'
                  } flex items-center justify-center transition"
                >
                  <i class="fa-solid fa-bookmark text-xs"></i>
                </button>
              </div>
            </div>

            <!-- 제목 & 본문 -->
            <div class="space-y-2">
              <h3 class="text-base font-black text-slate-900 leading-snug">${post.title}</h3>
              <p class="text-xs sm:text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">${post.content}</p>
            </div>

            <!-- 해시태그 -->
            <div class="flex flex-wrap gap-1.5">
              ${(post.tags || [])
                .map(
                  (tag) => `
                  <button onclick="app.onSearchKeyword('${tag}')" class="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-[11px] transition">
                    #${tag}
                  </button>
                `
                )
                .join('')}
            </div>

            <!-- 3종 공감 리액션 바 & 조회수 -->
            <div class="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <button
                  onclick="app.reactToPost('${post.id}', 'like')"
                  class="px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                    post.userReaction === 'like'
                      ? 'bg-rose-50 border-rose-300 text-rose-600 reaction-active'
                      : 'bg-white border-stone-200 text-slate-600 hover:bg-stone-50'
                  }"
                >
                  <span>❤️ 공감</span>
                  <span class="font-extrabold">${post.reactions.like}</span>
                </button>
                <button
                  onclick="app.reactToPost('${post.id}', 'hug')"
                  class="px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                    post.userReaction === 'hug'
                      ? 'bg-amber-50 border-amber-300 text-amber-700 reaction-active'
                      : 'bg-white border-stone-200 text-slate-600 hover:bg-stone-50'
                  }"
                >
                  <span>🫂 토닥토닥</span>
                  <span class="font-extrabold">${post.reactions.hug}</span>
                </button>
                <button
                  onclick="app.reactToPost('${post.id}', 'tip')"
                  class="px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                    post.userReaction === 'tip'
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-600 reaction-active'
                      : 'bg-white border-stone-200 text-slate-600 hover:bg-stone-50'
                  }"
                >
                  <span>💡 꿀팁</span>
                  <span class="font-extrabold">${post.reactions.tip}</span>
                </button>
              </div>

              <div class="text-[11px] text-slate-400 font-semibold">
                조회 ${post.views.toLocaleString()} · 댓글 ${post.comments.length}
              </div>
            </div>

            <!-- 댓글 목록 & 실시간 댓글 입력창 -->
            <div class="bg-stone-50/90 rounded-2xl p-3.5 space-y-2.5 border border-stone-200/60">
              <div class="space-y-2">
                ${post.comments
                  .map(
                    (c) => `
                    <div class="text-xs bg-white p-2.5 rounded-xl border border-stone-200/60">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-extrabold text-slate-800">${c.author}</span>
                        <span class="text-[10px] text-slate-400">${c.time}</span>
                      </div>
                      <p class="text-slate-600 leading-relaxed">${c.text}</p>
                    </div>
                  `
                  )
                  .join('')}
              </div>

              <form onsubmit="app.submitComment(event, '${post.id}')" class="flex items-center gap-2 pt-1">
                <input
                  id="comment-input-${post.id}"
                  type="text"
                  required
                  placeholder="따뜻한 공감이나 육아 경험담 댓글을 남겨주세요..."
                  class="flex-1 text-xs bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <button type="submit" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shrink-0">
                  댓글 등록
                </button>
              </form>
            </div>
          </article>
        `;
      })
      .join('');
  }

  reactToPost(postId, type) {
    const post = this.data.posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.userReaction === type) {
      post.reactions[type] -= 1;
      post.userReaction = null;
    } else {
      if (post.userReaction) {
        post.reactions[post.userReaction] -= 1;
      }
      post.reactions[type] += 1;
      post.userReaction = type;
    }
    this.renderFeed();
    this.renderSidebarWidgets();
  }

  submitComment(event, postId) {
    event.preventDefault();
    const input = document.getElementById(`comment-input-${postId}`);
    if (!input || !input.value.trim()) return;

    const post = this.data.posts.find((p) => p.id === postId);
    if (!post) return;

    post.comments.push({
      id: 'c-' + Date.now(),
      author: `${this.profile.nickname} (${this.profile.ageBadge})`,
      time: '방금 전',
      text: input.value.trim()
    });

    this.profile.points += 10;
    this.saveProfileData();
    this.saveCustomPosts();
    this.renderProfileWidget();
    this.renderFeed();
    this.showToast('댓글이 등록되었습니다! (+10 육아포인트 적립)');
  }

  // 새 게시글 작성 모달
  openWritePostModal() {
    document.getElementById('write-post-modal').classList.remove('hidden');
  }

  closeWritePostModal() {
    document.getElementById('write-post-modal').classList.add('hidden');
  }

  submitNewPost(event) {
    event.preventDefault();
    const category = document.getElementById('post-form-category').value;
    const region = document.getElementById('post-form-region').value;
    const title = document.getElementById('post-form-title').value.trim();
    const content = document.getElementById('post-form-content').value.trim();
    const rawTags = document.getElementById('post-form-tags').value.trim();
    const tags = rawTags
      ? rawTags.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean)
      : ['육아소통', '도담톡'];

    const newPost = {
      id: 'post-' + Date.now(),
      category,
      region,
      isHot: false,
      title,
      content,
      author: {
        nickname: this.profile.nickname,
        childBadge: `${this.profile.ageBadge} · ${this.profile.region}`,
        avatarBg: 'bg-rose-100 text-rose-600',
        level: this.profile.level
      },
      createdAt: '방금 전',
      timestamp: Math.floor(Date.now() / 1000),
      views: 1,
      reactions: { like: 1, hug: 0, tip: 0 },
      userReaction: 'like',
      tags,
      comments: []
    };

    this.data.posts.unshift(newPost);
    this.profile.points += 30;
    this.saveProfileData();
    this.saveCustomPosts();

    document.getElementById('post-form-title').value = '';
    document.getElementById('post-form-content').value = '';
    document.getElementById('post-form-tags').value = '';
    this.closeWritePostModal();

    this.currentCategory = 'all';
    this.switchMainView('feed');
    this.renderProfileWidget();
    this.renderCategoryNavigation();
    this.renderFeed();
    this.renderSidebarWidgets();
    this.showToast('새 게시글이 등록되었습니다! (+30 육아포인트 적립)');
  }

  saveCustomPosts() {
    try {
      localStorage.setItem(this.customPostsKey, JSON.stringify(this.data.posts));
    } catch {}
  }

  loadSavedPosts() {
    try {
      const raw = localStorage.getItem(this.customPostsKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.data.posts = parsed;
        }
      }
    } catch {}
  }

  // ==========================================
  // 5. 우측 사이드바 (베스트글 & 트렌딩 태그)
  // ==========================================
  renderSidebarWidgets() {
    const hotEl = document.getElementById('sidebar-hot-posts');
    if (hotEl) {
      const top5 = [...this.data.posts]
        .sort(
          (a, b) =>
            b.reactions.like + b.reactions.hug + b.reactions.tip -
            (a.reactions.like + a.reactions.hug + a.reactions.tip)
        )
        .slice(0, 5);

      hotEl.innerHTML = top5
        .map((p, i) => {
          const totalReact = p.reactions.like + p.reactions.hug + p.reactions.tip;
          return `
            <button
              onclick="app.onSearchKeyword('${p.tags[0] || ''}')"
              class="w-full text-left group flex items-start gap-2.5 py-1.5 border-b border-stone-100 last:border-0"
            >
              <span class="w-5 h-5 rounded-md ${
                i < 3 ? 'bg-rose-500 text-white' : 'bg-stone-100 text-slate-600'
              } font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">${i + 1}</span>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-800 group-hover:text-rose-600 truncate">${p.title}</div>
                <div class="text-[10px] text-slate-400">공감 ${totalReact} · 댓글 ${p.comments.length}</div>
              </div>
            </button>
          `;
        })
        .join('');
    }

    const tagsEl = document.getElementById('sidebar-trending-tags');
    if (tagsEl) {
      const popularTags = [
        '밤중수유단유',
        '초1입학준비',
        '해열제교차복용',
        '두돌춘기',
        '워킹맘육아휴직',
        '어린이집적응',
        '자유부인',
        '한글떼기'
      ];
      tagsEl.innerHTML = popularTags
        .map(
          (t) => `
          <button
            onclick="app.onSearchKeyword('${t}')"
            class="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs transition"
          >
            #${t}
          </button>
        `
        )
        .join('');
    }
  }

  // ==========================================
  // 6. 개월수·출생연도 동기방 (VIEW 2)
  // ==========================================
  renderCohortSection() {
    const tabsEl = document.getElementById('cohort-room-tabs');
    const contentEl = document.getElementById('cohort-room-content');
    if (!tabsEl || !contentEl) return;

    tabsEl.innerHTML = this.data.cohortRooms
      .map((room) => {
        const active = room.id === this.activeCohortId;
        return `
          <button
            onclick="app.selectCohortRoom('${room.id}')"
            class="p-3 rounded-2xl text-left border transition ${
              active
                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                : 'bg-white/90 text-slate-700 border-stone-200 hover:bg-white'
            }"
          >
            <div class="text-xs font-black truncate">${room.title}</div>
            <div class="text-[10px] ${active ? 'text-rose-300' : 'text-slate-400'} font-bold mt-0.5">
              참여 동기 ${room.memberCount.toLocaleString()}명
            </div>
          </button>
        `;
      })
      .join('');

    const room = this.data.cohortRooms.find((r) => r.id === this.activeCohortId) || this.data.cohortRooms[0];

    contentEl.innerHTML = `
      <!-- 동기방 헤더 & 발달 체크리스트 -->
      <div class="community-card p-5 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <h3 class="text-base font-black text-slate-900">${room.title}</h3>
            <p class="text-xs text-slate-500 mt-0.5">${room.subtitle}</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-extrabold text-xs border border-rose-200">
            📏 ${room.avgPhysical}
          </span>
        </div>

        <!-- 시기별 발달 체크리스트 -->
        <div>
          <div class="text-xs font-extrabold text-slate-800 mb-2">✅ 이 시기 우리 아기 발달 & 건강 체크리스트 (클릭하여 체크)</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${room.milestones
              .map(
                (m, idx) => `
                <label class="flex items-start gap-2 p-2.5 rounded-xl border ${
                  m.done ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-stone-50 border-stone-200 text-slate-700'
                } text-xs font-bold cursor-pointer">
                  <input type="checkbox" ${m.done ? 'checked' : ''} onchange="app.toggleMilestone('${room.id}', ${idx})" class="mt-0.5 accent-emerald-600" />
                  <span>${m.label}</span>
                </label>
              `
              )
              .join('')}
          </div>
        </div>

        <!-- 이 시기 선배맘 추천 필수템 -->
        <div class="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5">
          <div class="text-xs font-extrabold text-amber-900 mb-1.5">🎁 이 개월수 동기들이 가장 많이 쓰는 육아 필수템</div>
          <div class="flex flex-wrap gap-1.5">
            ${room.mustHaveItems
              .map((item) => `<span class="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-bold text-xs">${item}</span>`)
              .join('')}
          </div>
        </div>
      </div>

      <!-- 동기방 실시간 수다톡 -->
      <div class="community-card p-5 space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-black text-slate-900">💬 실시간 동기방 한줄 수다톡</h4>
          <span class="text-[11px] font-bold text-emerald-600">● 지금 ${Math.floor(room.memberCount / 9)}명 접속 중</span>
        </div>

        <div class="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          ${room.messages
            .map(
              (msg) => `
              <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-slate-900">${msg.author}</span>
                  <span class="text-[10px] text-slate-400">${msg.time}</span>
                </div>
                <p class="text-slate-700 leading-relaxed">${msg.text}</p>
              </div>
            `
            )
            .join('')}
        </div>

        <form onsubmit="app.sendCohortMessage(event, '${room.id}')" class="flex gap-2">
          <input
            id="cohort-chat-input"
            type="text"
            required
            placeholder="동기들에게 지금 아기 낮잠, 이유식, 수유 현황을 공유해보세요!"
            class="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button type="submit" class="px-4 py-2.5 rounded-xl coral-badge-gradient text-white font-extrabold text-xs shrink-0">
            전송
          </button>
        </form>
      </div>
    `;
  }

  selectCohortRoom(roomId) {
    this.activeCohortId = roomId;
    this.renderCohortSection();
  }

  toggleMilestone(roomId, idx) {
    const room = this.data.cohortRooms.find((r) => r.id === roomId);
    if (!room) return;
    room.milestones[idx].done = !room.milestones[idx].done;
    this.renderCohortSection();
  }

  sendCohortMessage(event, roomId) {
    event.preventDefault();
    const input = document.getElementById('cohort-chat-input');
    if (!input || !input.value.trim()) return;

    const room = this.data.cohortRooms.find((r) => r.id === roomId);
    if (!room) return;

    room.messages.unshift({
      author: `${this.profile.nickname} (${this.profile.ageBadge})`,
      time: '방금 전',
      text: input.value.trim()
    });
    input.value = '';
    this.renderCohortSection();
    this.showToast('동기방에 메시지가 등록되었습니다!');
  }

  // ==========================================
  // 7. 우리동네 공동육아 & 품앗이 소모임 (VIEW 3)
  // ==========================================
  renderClubsSection() {
    const container = document.getElementById('clubs-list-container');
    if (!container) return;

    let clubs = this.data.clubs;
    if (this.currentRegion !== 'all') {
      clubs = clubs.filter((c) => c.region === this.currentRegion);
    }

    container.innerHTML = clubs
      .map(
        (club) => `
        <div class="community-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[11px]">📍 ${club.regionName}</span>
              <span class="px-2 py-0.5 rounded-md bg-stone-100 text-slate-700 font-bold text-[11px]">${club.category}</span>
              <span class="text-[11px] font-bold text-rose-500">👶 ${club.targetAge}</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900">${club.title}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">${club.desc}</p>
            <div class="text-[11px] text-slate-400 font-semibold pt-1">
              🗓️ 일정: <strong class="text-slate-700">${club.schedule}</strong> · 모임장: ${club.leader}
            </div>
          </div>

          <div class="sm:text-right shrink-0 space-y-2">
            <div class="text-xs font-extrabold text-slate-700">
              참여 <span class="text-rose-600">${club.currentMembers}</span> / ${club.maxMembers}명
            </div>
            <button
              onclick="app.toggleJoinClub('${club.id}')"
              class="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                club.joined
                  ? 'bg-stone-200 text-slate-700 hover:bg-stone-300'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm'
              }"
            >
              ${club.joined ? '✔ 참여 신청됨 (취소)' : '🤝 모임 함께하기'}
            </button>
          </div>
        </div>
      `
      )
      .join('');
  }

  toggleJoinClub(clubId) {
    const club = this.data.clubs.find((c) => c.id === clubId);
    if (!club) return;

    if (club.joined) {
      club.joined = false;
      club.currentMembers = Math.max(1, club.currentMembers - 1);
      this.showToast('소모임 참여 신청이 취소되었습니다.');
    } else {
      club.joined = true;
      club.currentMembers += 1;
      this.showToast(`'${club.title}' 모임에 참여 신청되었습니다!`);
    }
    this.renderClubsSection();
  }

  openCreateClubModal() {
    document.getElementById('create-club-modal').classList.remove('hidden');
  }

  submitNewClub(event) {
    event.preventDefault();
    const title = document.getElementById('club-form-title').value.trim();
    const regionName = document.getElementById('club-form-region').value.trim();
    const targetAge = document.getElementById('club-form-age').value.trim();
    const schedule = document.getElementById('club-form-schedule').value.trim();
    const maxMembers = parseInt(document.getElementById('club-form-max').value, 10) || 6;
    const desc = document.getElementById('club-form-desc').value.trim();

    this.data.clubs.unshift({
      id: 'club-' + Date.now(),
      region: this.currentRegion === 'all' ? 'pangyo' : this.currentRegion,
      regionName,
      category: '신규모임',
      title,
      schedule,
      targetAge,
      leader: this.profile.nickname,
      currentMembers: 1,
      maxMembers,
      joined: true,
      desc
    });

    document.getElementById('create-club-modal').classList.add('hidden');
    this.renderClubsSection();
    this.showToast('새로운 우리 동네 공동육아 소모임이 개설되었습니다!');
  }

  // ==========================================
  // 8. 육아템 나눔장터 & 내돈내산 랭킹 (VIEW 4)
  // ==========================================
  setMarketFilter(filter) {
    this.marketFilter = filter;
    document.querySelectorAll('.mkt-tab-btn').forEach((btn) => {
      const active = btn.getAttribute('data-mkt') === filter;
      btn.className = active
        ? 'mkt-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold bg-slate-900 text-white'
        : 'mkt-tab-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-stone-200 text-slate-700';
    });
    this.renderMarketSection();
  }

  renderMarketSection() {
    const container = document.getElementById('market-content-container');
    if (!container) return;

    if (this.marketFilter === 'ranking') {
      container.innerHTML = this.data.gearReviews
        .map(
          (g) => `
          <div class="community-card p-5 space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">${g.rank}위</span>
                <div>
                  <span class="text-[11px] font-bold text-rose-500">${g.category} · 권장 ${g.recommendAge}</span>
                  <h3 class="text-sm sm:text-base font-black text-slate-900">${g.name}</h3>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-black text-amber-500">★ ${g.rating}</div>
                <div class="text-[10px] text-slate-400">솔직리뷰 ${g.reviewCount}개</div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div class="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                <div class="font-extrabold text-emerald-900 mb-0.5">👍 내돈내산 장점</div>
                <p class="text-slate-700 leading-relaxed">${g.pros}</p>
              </div>
              <div class="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                <div class="font-extrabold text-slate-700 mb-0.5">📌 구매 전 참고할 점</div>
                <p class="text-slate-600 leading-relaxed">${g.cons}</p>
              </div>
            </div>
          </div>
        `
        )
        .join('');
      return;
    }

    let items = this.data.marketItems;
    if (this.marketFilter === 'free') {
      items = items.filter((i) => i.type === 'free');
    }

    container.innerHTML = items
      .map(
        (item) => `
        <div class="community-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                item.type === 'free' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-900'
              }">${item.typeBadge}</span>
              <span class="text-xs font-bold text-slate-500">📍 ${item.regionName}</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">${item.status}</span>
            </div>
            <h3 class="text-sm sm:text-base font-black text-slate-900">${item.title}</h3>
            <p class="text-xs text-slate-600">${item.desc}</p>
            <div class="text-[11px] text-slate-400 font-semibold">
              상태: <strong class="text-slate-700">${item.condition}</strong> · 작성자: ${item.seller}
            </div>
          </div>

          <div class="sm:text-right shrink-0 space-y-2">
            <div class="text-sm font-black text-rose-600">${item.price}</div>
            <button
              onclick="app.requestMarketItem('${item.id}')"
              class="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold transition"
            >
              💬 채팅으로 나눔/구매 신청
            </button>
          </div>
        </div>
      `
      )
      .join('');
  }

  requestMarketItem(itemId) {
    const item = this.data.marketItems.find((i) => i.id === itemId);
    if (!item) return;
    this.showToast(`'${item.seller}'님에게 나눔/거래 채팅 요청을 보냈습니다!`);
  }

  openCreateMarketModal() {
    document.getElementById('create-market-modal').classList.remove('hidden');
  }

  submitNewMarketItem(event) {
    event.preventDefault();
    const type = document.getElementById('mkt-form-type').value;
    const regionName = document.getElementById('mkt-form-region').value.trim();
    const title = document.getElementById('mkt-form-title').value.trim();
    const price = document.getElementById('mkt-form-price').value.trim();
    const condition = document.getElementById('mkt-form-cond').value.trim();
    const desc = document.getElementById('mkt-form-desc').value.trim();

    this.data.marketItems.unshift({
      id: 'item-' + Date.now(),
      type,
      typeBadge: type === 'free' ? '💝 무료나눔' : '🥕 육아당근',
      regionName,
      title,
      price,
      condition,
      seller: `${this.profile.nickname} (${this.profile.ageBadge})`,
      status: type === 'free' ? '나눔중' : '판매중',
      likes: 1,
      desc
    });

    document.getElementById('create-market-modal').classList.add('hidden');
    this.setMarketFilter('all');
    this.showToast('장터에 물품이 등록되었습니다!');
  }

  // ==========================================
  // 9. 소아 성장 백분위 계산기 & 해열제 계산기 (VIEW 5)
  // ==========================================
  calculateGrowthPercentile() {
    const gender = document.getElementById('growth-gender')?.value || 'm';
    const months = parseInt(document.getElementById('growth-months')?.value || '12', 10);
    const height = parseFloat(document.getElementById('growth-height')?.value || '76.8');
    const weight = parseFloat(document.getElementById('growth-weight')?.value || '10.1');
    const out = document.getElementById('growth-result-box');
    if (!out) return;

    const std = this.data.growthStandards[months] || this.data.growthStandards[12];
    const avgH = gender === 'm' ? std.mHeight : std.fHeight;
    const avgW = gender === 'm' ? std.mWeight : std.fWeight;

    // 표준편차 근사치로 백분위 산출 (키 SD 약 3.5%, 몸무게 SD 약 11%)
    const zH = (height - avgH) / (avgH * 0.036);
    const zW = (weight - avgW) / (avgW * 0.11);

    const zToPercentile = (z) => {
      const clamped = Math.max(-2.5, Math.min(2.5, z));
      const pct = Math.round(50 + clamped * 34);
      return Math.max(1, Math.min(99, pct));
    };

    const pctH = zToPercentile(zH);
    const pctW = zToPercentile(zW);

    out.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="font-bold text-indigo-900">📏 키(신장) 성장 백분위</span>
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-black">상위 ${100 - pctH}% (${pctH}백분위)</span>
          </div>
          <p class="text-slate-600">동월령 평균 키 <strong>${avgH}cm</strong> 대비 <strong>${(height - avgH >= 0 ? '+' : '') + (height - avgH).toFixed(1)}cm</strong></p>
          <div class="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div class="h-full bg-indigo-600 rounded-full" style="width: ${pctH}%"></div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="font-bold text-emerald-900">⚖️ 몸무게(체중) 성장 백분위</span>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black">상위 ${100 - pctW}% (${pctW}백분위)</span>
          </div>
          <p class="text-slate-600">동월령 평균 체중 <strong>${avgW}kg</strong> 대비 <strong>${(weight - avgW >= 0 ? '+' : '') + (weight - avgW).toFixed(1)}kg</strong></p>
          <div class="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-600 rounded-full" style="width: ${pctW}%"></div>
          </div>
        </div>
      </div>
    `;
  }

  calculateFeverDose() {
    const kg = parseFloat(document.getElementById('fever-weight-kg')?.value || '11.5');
    const temp = parseFloat(document.getElementById('fever-temp-c')?.value || '38.9');
    const out = document.getElementById('fever-dose-result');
    if (!out) return;

    const acetMl = (kg * 0.4).toFixed(1);
    const ibuMl = (kg * 0.4).toFixed(1);
    const dexMl = (kg * 0.45).toFixed(1);

    out.innerHTML = `
      <div class="p-3 rounded-xl ${
        temp >= 38.5 ? 'bg-rose-50 border border-rose-200 text-rose-900' : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
      } font-bold">
        ${
          temp >= 38.5
            ? `🌡️ 현재 ${temp}℃ 고열 상태입니다. 해열제 1회 정량 복용 후 2시간 뒤에도 38.5℃ 이상이면 다른 계열로 교차복용하세요.`
            : `✅ 현재 ${temp}℃ 미열 상태입니다. 수분을 충분히 보충하며 컨디션을 지켜보세요.`
        }
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <div class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
          <div>
            <div class="font-extrabold text-slate-900">① 아세트아미노펜 (챔프빨강·타이레놀)</div>
            <div class="text-[11px] text-slate-500">4~6시간 간격 · 생후 4개월 이상</div>
          </div>
          <span class="px-3 py-1 rounded-xl bg-rose-500 text-white font-black text-sm">${acetMl} mL</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
          <div>
            <div class="font-extrabold text-slate-900">② 이부프로펜·덱시부프로펜 (챔프파랑·맥시부펜)</div>
            <div class="text-[11px] text-slate-500">6~8시간 간격 · 생후 6개월 이상</div>
          </div>
          <span class="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm">${ibuMl}~${dexMl} mL</span>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 10. 스크랩북 & 토스트 알림
  // ==========================================
  loadScraps() {
    try {
      const raw = localStorage.getItem(this.scrapsKey);
      return raw ? JSON.parse(raw) : ['post-103'];
    } catch {
      return ['post-103'];
    }
  }

  toggleScrap(postId) {
    if (this.scraps.includes(postId)) {
      this.scraps = this.scraps.filter((id) => id !== postId);
      this.showToast('스크랩북에서 제거되었습니다.');
    } else {
      this.scraps.push(postId);
      this.showToast('나의 육아 스크랩북에 저장되었습니다!');
    }
    localStorage.setItem(this.scrapsKey, JSON.stringify(this.scraps));
    this.updateScrapBadge();
    this.renderProfileWidget();
    this.renderFeed();
  }

  updateScrapBadge() {
    const b = document.getElementById('scrap-count-badge');
    if (b) b.textContent = this.scraps.length;
  }

  openScrapModal() {
    const modal = document.getElementById('scrap-modal');
    const listEl = document.getElementById('scrap-list-container');
    if (!modal || !listEl) return;

    const scrappedPosts = this.data.posts.filter((p) => this.scraps.includes(p.id));
    if (scrappedPosts.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">스크랩한 게시글이 없습니다.</div>`;
    } else {
      listEl.innerHTML = scrappedPosts
        .map(
          (p) => `
          <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div class="text-xs font-extrabold text-slate-900">${p.title}</div>
            <div class="text-[11px] text-slate-500">작성자: ${p.author.nickname} · 공감 ${p.reactions.like + p.reactions.tip}</div>
          </div>
        `
        )
        .join('');
    }
    modal.classList.remove('hidden');
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className =
      'bg-slate-900/95 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transition-all';
    toast.innerHTML = `<i class="fa-solid fa-heart text-rose-400"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new DodamCommunityApp();
  window.app.init();
});
