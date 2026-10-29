# -*- coding: utf-8 -*-
import sys

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Constructor: Add state
ctor_target = "    this.schoolCardSubTabs = {};\n    this.admissionsCategory = 'all';\n    this.admissionsSearchKeyword = '';"
ctor_replacement = """    this.schoolCardSubTabs = {};
    this.admissionsCategory = 'all';
    this.admissionsSearchKeyword = '';
    this.attachedImages = [];
    this.draftKey = 'dodam_post_draft_v1';
    this.boardSearchType = 'all';"""

assert ctor_target in code, "ctor_target not found in js/app.js"
code = code.replace(ctor_target, ctor_replacement, 1)

# 2. Update renderBoardCategories styling
old_chips_render = """      chipEl.innerHTML = categories
        .map((c) => {
          const active = c.id === this.currentCategory;
          return `
            <button
              onclick="app.selectBoardCategory('${c.id}')"
              class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                active
                  ? 'bg-slate-900 text-white border-slate-900 font-black shadow-sm'
                  : 'bg-white text-slate-600 border-stone-200 hover:bg-stone-50'
              }"
            >
              ${c.name}
            </button>
          `;
        })
        .join('');"""

new_chips_render = """      chipEl.innerHTML = categories
        .map((c) => {
          const active = c.id === this.currentCategory;
          const count = (this.data.posts || []).filter((p) => {
            if (c.id === 'all') return true;
            if (c.id === 'hot') return p.isHot;
            return p.category === c.id;
          }).length;

          return `
            <button
              type="button"
              onclick="app.selectBoardCategory('${c.id}')"
              class="px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition border shrink-0 flex items-center gap-1.5 cursor-pointer ${
                active
                  ? 'bg-[#03C75A] text-white border-[#03C75A] shadow-sm'
                  : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-white hover:border-stone-300'
              }"
            >
              <i class="fa-solid ${c.icon || 'fa-tag'} text-[10px] ${active ? 'text-white' : 'text-slate-400'}"></i>
              <span>${c.name}</span>
              <span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                active ? 'bg-white/25 text-white' : 'bg-stone-200 text-slate-600'
              }">${count}</span>
            </button>
          `;
        })
        .join('');"""

assert old_chips_render in code, "old_chips_render not found in js/app.js"
code = code.replace(old_chips_render, new_chips_render, 1)

# 3. Update renderBoardView table rendering to enhance Naver Cafe styling (photo badge, new badge, comments count)
old_post_row = """            <div class=\"col-span-5 flex items-center gap-1.5 min-w-0 pr-2\">
              ${post.isHot ? '<span class=\"px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 font-black text-[10px] border border-rose-200 shrink-0\">HOT</span>' : ''}
              <span class=\"font-bold text-sm text-slate-800 group-hover:text-rose-600 truncate transition\">${post.title}</span>
              ${post.comments.length > 0 ? `<span class=\"text-xs text-rose-500 font-black shrink-0\">[${post.comments.length}]</span>` : ''}
            </div>"""

new_post_row = """            <div class=\"col-span-5 flex items-center gap-1.5 min-w-0 pr-2\">
              ${post.isHot ? '<span class=\"px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 font-black text-[10px] border border-rose-200 shrink-0\">HOT</span>' : ''}
              ${(post.createdAt && (post.createdAt.includes('분') || post.createdAt.includes('방금'))) ? '<span class=\"px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-black text-[9px] border border-emerald-200 shrink-0\">N</span>' : ''}
              ${(post.images && post.images.length > 0) ? '<i class=\"fa-regular fa-image text-emerald-600 text-[11px] shrink-0\" title=\"사진 첨부\"></i>' : ''}
              <span class=\"font-bold text-sm text-slate-900 group-hover:text-[#03C75A] truncate transition\">${post.title}</span>
              ${post.comments.length > 0 ? `<span class=\"text-xs text-rose-500 font-black shrink-0\">[${post.comments.length}]</span>` : ''}
            </div>"""

assert old_post_row in code, "old_post_row not found in js/app.js"
code = code.replace(old_post_row, new_post_row, 1)

# 4. Mobile post row update
old_mobile_row = """            <div class=\"flex items-start gap-1.5\">
              <span class=\"px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-slate-600 shrink-0 mt-0.5\">${catName}</span>
              ${post.isHot ? '<span class=\"px-1 py-0.2 rounded bg-rose-50 text-rose-600 font-black text-[9px] border border-rose-200 shrink-0 mt-0.5\">HOT</span>' : ''}
              <span class=\"font-bold text-sm text-slate-900 leading-snug line-clamp-2 hover:text-rose-600\">${post.title}</span>
              ${post.comments.length > 0 ? `<span class=\"text-xs text-rose-500 font-black shrink-0 mt-0.5\">[${post.comments.length}]</span>` : ''}
            </div>"""

new_mobile_row = """            <div class=\"flex items-start gap-1.5\">
              <span class=\"px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-slate-600 shrink-0 mt-0.5\">${catName}</span>
              ${post.isHot ? '<span class=\"px-1 py-0.2 rounded bg-rose-50 text-rose-600 font-black text-[9px] border border-rose-200 shrink-0 mt-0.5\">HOT</span>' : ''}
              ${(post.createdAt && (post.createdAt.includes('분') || post.createdAt.includes('방금'))) ? '<span class=\"px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-black text-[9px] border border-emerald-200 shrink-0 mt-0.5\">N</span>' : ''}
              ${(post.images && post.images.length > 0) ? '<i class=\"fa-regular fa-image text-emerald-600 text-[11px] shrink-0 mt-0.5\" title=\"사진 첨부\"></i>' : ''}
              <span class=\"font-bold text-sm text-slate-900 leading-snug line-clamp-2 hover:text-[#03C75A]\">${post.title}</span>
              ${post.comments.length > 0 ? `<span class=\"text-xs text-rose-500 font-black shrink-0 mt-0.5\">[${post.comments.length}]</span>` : ''}
            </div>"""

assert old_mobile_row in code, "old_mobile_row not found in js/app.js"
code = code.replace(old_mobile_row, new_mobile_row, 1)

# 5. Replace openPostDetailModal and related methods
old_post_detail_code = """  openPostDetailModal(postId) {
    const post = this.data.posts.find((p) => p.id === postId);
    if (!post) return;
    this.activePostDetailId = postId;
    if (!post.views) post.views = 120;
    post.views += 1;

    const modal = document.getElementById('post-detail-modal');
    const cat = this.data.categories.find((c) => c.id === post.category);

    const catBadge = document.getElementById('post-detail-category-badge');
    if (catBadge) {
      catBadge.textContent = cat ? cat.name : '자유게시판';
      catBadge.className = 'px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-600 border border-rose-200';
    }

    document.getElementById('post-detail-title').textContent = post.title;
    document.getElementById('post-detail-author').textContent = post.author.nickname;
    document.getElementById('post-detail-author-badge').textContent = post.author.childBadge || '육아맘';
    document.getElementById('post-detail-region').textContent = post.region === 'all' ? '전국' : post.region;
    document.getElementById('post-detail-date').textContent = post.createdAt;
    document.getElementById('post-detail-views').textContent = post.views;
    document.getElementById('post-detail-content').textContent = post.content;

    const tagsEl = document.getElementById('post-detail-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (post.tags || [])
        .map((t) => `<span class="px-2 py-0.5 rounded-lg bg-stone-100 text-slate-600 text-xs font-semibold">#${t}</span>`)
        .join('');
    }

    const totalLikes = post.reactions.like + (post.reactions.hug || 0) + (post.reactions.tip || 0);
    document.getElementById('post-detail-likes-count').textContent = totalLikes;

    this.renderPostDetailComments(post);
    modal.classList.remove('hidden');
  }

  closePostDetailModal() {
    this.activePostDetailId = null;
    const modal = document.getElementById('post-detail-modal');
    if (modal) modal.classList.add('hidden');
    this.renderBoardView();
  }

  renderPostDetailComments(post) {
    const listEl = document.getElementById('post-detail-comments-list');
    const countEl = document.getElementById('post-detail-comments-count');
    if (!listEl) return;

    if (countEl) countEl.textContent = post.comments.length;

    if (post.comments.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">아직 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</div>`;
      return;
    }

    listEl.innerHTML = post.comments
      .map(
        (c) => `
        <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
          <div class="flex items-center justify-between text-xs">
            <span class="font-extrabold text-slate-800">${c.author}</span>
            <span class="text-[10px] text-slate-400">${c.createdAt}</span>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">${c.content}</p>
        </div>
      `
      )
      .join('');
  }"""

new_post_detail_code = """  openPostDetailModal(postId) {
    const post = this.data.posts.find((p) => p.id === postId);
    if (!post) return;
    this.activePostDetailId = postId;
    if (!post.views) post.views = 120;
    post.views += 1;

    const modal = document.getElementById('post-detail-modal');
    const cat = this.data.categories.find((c) => c.id === post.category);

    const catBadge = document.getElementById('post-detail-category-badge');
    if (catBadge) {
      catBadge.textContent = cat ? cat.name : '자유게시판';
      catBadge.className = 'px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-[#03C75A] border border-emerald-200';
    }

    document.getElementById('post-detail-title').textContent = post.title;
    document.getElementById('post-detail-author').textContent = post.author?.nickname || '도담회원';
    document.getElementById('post-detail-author-badge').textContent = post.author?.childBadge || '육아회원';
    document.getElementById('post-detail-region').textContent = post.region === 'all' ? '전국' : post.region;
    document.getElementById('post-detail-date').textContent = post.createdAt;
    document.getElementById('post-detail-views').textContent = (post.views || 1).toLocaleString();
    document.getElementById('post-detail-content').textContent = post.content;

    const avatarEl = document.getElementById('post-detail-avatar');
    if (avatarEl) {
      const initial = (post.author?.nickname || '도')[0];
      avatarEl.textContent = initial;
      avatarEl.className = `w-8 h-8 rounded-full ${post.author?.avatarBg || 'bg-rose-500 text-white'} flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`;
    }

    // 사진 렌더링
    const imgBox = document.getElementById('post-detail-images-box');
    if (imgBox) {
      if (post.images && post.images.length > 0) {
        imgBox.classList.remove('hidden');
        imgBox.innerHTML = post.images.map((img) => `
          <div class="rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 max-h-96 flex items-center justify-center">
            <img src="${img}" alt="첨부 이미지" class="w-full h-auto object-contain max-h-96" />
          </div>
        `).join('');
      } else {
        imgBox.classList.add('hidden');
        imgBox.innerHTML = '';
      }
    }

    const tagsEl = document.getElementById('post-detail-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (post.tags || [])
        .map((t) => `<span class="px-2.5 py-1 rounded-lg bg-stone-100 text-slate-700 text-xs font-bold">#${t}</span>`)
        .join('');
    }

    const commentAuthorEl = document.getElementById('comment-author-name');
    if (commentAuthorEl) {
      commentAuthorEl.textContent = this.profile?.nickname || '도담맘';
    }

    const totalLikes = post.reactions.like + (post.reactions.hug || 0) + (post.reactions.tip || 0);
    document.getElementById('post-detail-likes-count').textContent = totalLikes;

    this.renderPostDetailComments(post);
    modal.classList.remove('hidden');
  }

  navigatePostDetail(dir) {
    if (!this.activePostDetailId) return;
    const posts = this.data.posts || [];
    const currentIndex = posts.findIndex((p) => p.id === this.activePostDetailId);
    if (currentIndex === -1) return;

    let targetIndex = currentIndex + dir;
    if (targetIndex < 0) {
      this.showToast('첫 번째 게시글입니다.');
      return;
    }
    if (targetIndex >= posts.length) {
      this.showToast('마지막 게시글입니다.');
      return;
    }
    this.openPostDetailModal(posts[targetIndex].id);
  }

  copyPostUrl() {
    if (!this.activePostDetailId) return;
    const url = `${window.location.origin}${window.location.pathname}#post-${this.activePostDetailId}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('게시글 주소가 복사되었습니다! 🔗');
      }).catch(() => {
        this.showToast('링크: ' + url);
      });
    } else {
      this.showToast('게시글 링크가 생성되었습니다!');
    }
  }

  closePostDetailModal() {
    this.activePostDetailId = null;
    const modal = document.getElementById('post-detail-modal');
    if (modal) modal.classList.add('hidden');
    this.renderBoardView();
  }

  renderPostDetailComments(post) {
    const listEl = document.getElementById('post-detail-comments-list');
    const countEl = document.getElementById('post-detail-comments-count');
    if (!listEl) return;

    const comments = post.comments || [];
    if (countEl) countEl.textContent = comments.length;

    if (comments.length === 0) {
      listEl.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 bg-stone-50 rounded-2xl border border-stone-100">아직 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</div>`;
      return;
    }

    listEl.innerHTML = comments
      .map((c) => {
        const text = c.text || c.content || '';
        const time = c.time || c.createdAt || '방금 전';
        const author = c.author || '도담회원';
        const initial = author[0] || '맘';

        return `
          <div class="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-1.5 hover:bg-stone-50 transition">
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">${initial}</span>
                <span class="font-black text-slate-900">${author}</span>
              </div>
              <span class="text-[11px] text-slate-400 font-medium">${time}</span>
            </div>
            <p class="text-xs text-slate-800 leading-relaxed pl-7">${text}</p>
          </div>
        `;
      })
      .join('');
  }"""

assert old_post_detail_code in code, "old_post_detail_code not found in js/app.js"
code = code.replace(old_post_detail_code, new_post_detail_code, 1)

# 6. Replace openWritePostModal and submitNewPost with full SmartEditor methods
old_write_methods = """  openWritePostModal() {
    document.getElementById('write-post-modal').classList.remove('hidden');
  }

  closeWritePostModal() {
    document.getElementById('write-post-modal').classList.add('hidden');
  }

  submitNewPost(e) {
    e.preventDefault();
    const title = document.getElementById('post-form-title').value.trim();
    const content = document.getElementById('post-form-content').value.trim();
    const category = document.getElementById('post-form-category').value;
    const region = document.getElementById('post-form-region').value;
    const rawTags = document.getElementById('post-form-tags').value.trim();

    const tags = rawTags ? rawTags.split(',').map((t) => t.trim()).filter(Boolean) : [];

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category,
      region,
      title,
      content,
      author: {
        nickname: this.profile.nickname,
        level: this.profile.level,
        childBadge: `${this.profile.babyName} (${this.profile.ageBadge})`,
        avatarBg: 'coral-badge-gradient text-white'
      },
      createdAt: '방금 전',
      timestamp: Date.now(),
      views: 1,
      isHot: false,
      reactions: { like: 1, hug: 0, tip: 0 },
      tags,
      comments: []
    };

    this.data.posts.unshift(newPost);
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.createPost(newPost);
    }
    this.closeWritePostModal();
    this.renderBoardView();
    this.showToast('게시글이 성공적으로 등록되었습니다!');
  }"""

new_write_methods = """  // ==========================================
  // [네이버 스마트에디터 스타일 카페 글쓰기 컨트롤러]
  // ==========================================
  openWritePostModal(catId) {
    const modal = document.getElementById('write-post-modal');
    if (!modal) return;

    if (catId && document.getElementById('post-form-category')) {
      document.getElementById('post-form-category').value = catId;
    } else if (this.currentCategory && this.currentCategory !== 'all' && this.currentCategory !== 'hot') {
      const catSelect = document.getElementById('post-form-category');
      if (catSelect) catSelect.value = this.currentCategory;
    }

    // Check draft
    const rawDraft = localStorage.getItem(this.draftKey);
    const draftBadge = document.getElementById('draft-count-badge');
    const loadBtn = document.getElementById('btn-draft-load');
    if (rawDraft) {
      if (draftBadge) draftBadge.textContent = '1';
      if (loadBtn) loadBtn.classList.remove('hidden');
    } else {
      if (draftBadge) draftBadge.textContent = '0';
      if (loadBtn) loadBtn.classList.add('hidden');
    }

    this.renderAttachedImages();
    modal.classList.remove('hidden');
  }

  closeWritePostModal() {
    const modal = document.getElementById('write-post-modal');
    if (modal) modal.classList.add('hidden');
  }

  handlePhotoUpload(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.attachedImages.push(e.target.result);
        this.renderAttachedImages();
      };
      reader.readAsDataURL(file);
    });
    this.showToast('사진이 첨부되었습니다! 📷');
    event.target.value = '';
  }

  addPresetPhoto(type) {
    const presets = {
      baby_food: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?w=600&auto=format&fit=crop&q=80',
      play: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80',
      books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      stroller: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80'
    };

    const url = presets[type] || presets.baby_food;
    this.attachedImages.push(url);
    this.renderAttachedImages();
    this.showToast('육아 템플릿 사진이 첨부되었습니다! 📷');
  }

  removeAttachedImage(index) {
    this.attachedImages.splice(index, 1);
    this.renderAttachedImages();
  }

  renderAttachedImages() {
    const container = document.getElementById('post-attached-photos-container');
    if (!container) return;

    if (!this.attachedImages || this.attachedImages.length === 0) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }

    container.classList.remove('hidden');
    container.innerHTML = this.attachedImages.map((src, i) => `
      <div class="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#03C75A] shrink-0 group shadow-xs">
        <img src="${src}" alt="첨부 미리보기" class="w-full h-full object-cover" />
        <button
          type="button"
          onclick="app.removeAttachedImage(${i})"
          class="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-[10px] hover:bg-rose-600 transition"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');
  }

  insertEditorText(prefix, suffix, defaultText) {
    const textarea = document.getElementById('post-form-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = textarea.value;

    const selected = currentVal.substring(start, end) || defaultText;
    const replacement = `${prefix}${selected}${suffix}`;

    textarea.value = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    textarea.focus();
    textarea.selectionStart = start + prefix.length;
    textarea.selectionEnd = start + prefix.length + selected.length;
  }

  applyEditorTemplate(type) {
    const templates = {
      qa: `[육아 질문 내용]\\n• 아이 월령: 12개월 남아\\n• 현재 고민 상황:\\n• 시도해본 방법:\\n• 궁금한 점:\\n\\n선배맘·대디님들의 따뜻한 조언 부탁드립니다!`,
      review: `[내돈내산 솔직 육아용품 후기]\\n• 제품/브랜드명:\\n• 실사용 기간:\\n• 추천하는 장점:\\n• 아쉬운 단점:\\n• 이런 분께 추천해요:\\n\\n육아 동기분들의 현명한 소비에 도움 되길 바랍니다 :)`,
      tip: `[나만의 육아 꿀팁 공유]\\n• 꿀팁 주제:\\n• 실행 방법 / 팁:\\n• 주의해야 할 점:\\n\\n함께 나누면 육아가 훨씬 수월해져요!`
    };

    const textarea = document.getElementById('post-form-content');
    if (textarea) {
      textarea.value = (templates[type] || '') + (textarea.value ? `\\n\\n${textarea.value}` : '');
      textarea.focus();
      this.showToast('에디터 템플릿이 적용되었습니다!');
    }
  }

  appendTagToForm(tag) {
    const input = document.getElementById('post-form-tags');
    if (!input) return;
    const current = input.value.trim();
    if (current.includes(tag)) return;
    input.value = current ? `${current}, ${tag}` : tag;
  }

  savePostDraft() {
    const title = (document.getElementById('post-form-title')?.value || '').trim();
    const content = (document.getElementById('post-form-content')?.value || '').trim();
    const category = document.getElementById('post-form-category')?.value || 'newborn';
    const region = document.getElementById('post-form-region')?.value || 'all';
    const tags = document.getElementById('post-form-tags')?.value || '';

    if (!title && !content) {
      this.showToast('임시저장할 내용이 없습니다.');
      return;
    }

    const draft = {
      title,
      content,
      category,
      region,
      tags,
      images: this.attachedImages,
      savedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    localStorage.setItem(this.draftKey, JSON.stringify(draft));
    const badge = document.getElementById('draft-count-badge');
    if (badge) badge.textContent = '1';
    const loadBtn = document.getElementById('btn-draft-load');
    if (loadBtn) loadBtn.classList.remove('hidden');

    this.showToast(`[${draft.savedAt}] 임시저장되었습니다! 💾`);
  }

  loadPostDraft() {
    try {
      const raw = localStorage.getItem(this.draftKey);
      if (!raw) {
        this.showToast('저장된 임시글이 없습니다.');
        return;
      }
      const draft = JSON.parse(raw);
      if (document.getElementById('post-form-title')) document.getElementById('post-form-title').value = draft.title || '';
      if (document.getElementById('post-form-content')) document.getElementById('post-form-content').value = draft.content || '';
      if (document.getElementById('post-form-category')) document.getElementById('post-form-category').value = draft.category || 'newborn';
      if (document.getElementById('post-form-region')) document.getElementById('post-form-region').value = draft.region || 'all';
      if (document.getElementById('post-form-tags')) document.getElementById('post-form-tags').value = draft.tags || '';

      this.attachedImages = draft.images || [];
      this.renderAttachedImages();
      this.showToast('임시저장된 글을 성공적으로 불러왔습니다!');
    } catch (err) {
      console.error('loadPostDraft error:', err);
    }
  }

  submitNewPost(e) {
    if (e) e.preventDefault();
    const titleEl = document.getElementById('post-form-title');
    const contentEl = document.getElementById('post-form-content');
    const categoryEl = document.getElementById('post-form-category');
    const regionEl = document.getElementById('post-form-region');
    const tagsEl = document.getElementById('post-form-tags');

    const title = titleEl ? titleEl.value.trim() : '';
    const content = contentEl ? contentEl.value.trim() : '';
    if (!title || !content) {
      this.showToast('제목과 내용을 모두 입력해 주세요!');
      return;
    }

    const category = categoryEl ? categoryEl.value : 'newborn';
    const region = regionEl ? regionEl.value : 'all';
    const rawTags = tagsEl ? tagsEl.value.trim() : '';
    const tags = rawTags
      ? rawTags.split(/[,\\s]+/).map((t) => t.replace(/^#/, '').trim()).filter(Boolean)
      : [];

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category,
      region,
      title,
      content,
      images: [...this.attachedImages],
      author: {
        nickname: this.profile.nickname,
        level: this.profile.level,
        childBadge: `${this.profile.babyName} (${this.profile.ageBadge})`,
        avatarBg: 'bg-emerald-600 text-white'
      },
      createdAt: '방금 전',
      timestamp: Date.now(),
      views: 1,
      isHot: false,
      reactions: { like: 1, hug: 0, tip: 0 },
      tags,
      comments: []
    };

    this.data.posts.unshift(newPost);
    this.saveCustomPosts();
    if (window.DodamFirebase) {
      window.DodamFirebase.createPost(newPost);
    }

    // Reset inputs
    if (titleEl) titleEl.value = '';
    if (contentEl) contentEl.value = '';
    if (tagsEl) tagsEl.value = '';
    this.attachedImages = [];
    this.renderAttachedImages();

    // Clear draft
    localStorage.removeItem(this.draftKey);
    const draftBadge = document.getElementById('draft-count-badge');
    if (draftBadge) draftBadge.textContent = '0';
    const loadBtn = document.getElementById('btn-draft-load');
    if (loadBtn) loadBtn.classList.add('hidden');

    this.closeWritePostModal();
    this.renderBoardView();
    this.showToast('🎉 게시글이 성공적으로 등록되었습니다!');
  }

  setBoardPageSize(size) {
    this.boardPageSize = size || 15;
    this.boardPage = 1;
    this.renderBoardView();
  }

  togglePollBanner() {
    const card = document.getElementById('active-poll-card');
    if (!card) return;
    card.classList.toggle('hidden');
  }

  submitBottomSearch() {
    const input = document.getElementById('board-bottom-search-input');
    const typeSelect = document.getElementById('board-search-type');
    const val = input ? input.value.trim() : '';

    this.boardSearchType = typeSelect ? typeSelect.value : 'all';
    this.boardSearchKeyword = val.toLowerCase();
    this.boardPage = 1;

    // Sync top input
    const topInput = document.getElementById('board-search-input');
    if (topInput) topInput.value = val;

    this.renderBoardView();
  }

  resetBoardFilter() {
    this.currentCategory = 'all';
    this.currentRegion = 'all';
    this.boardSearchKeyword = '';
    this.boardPage = 1;

    const topInput = document.getElementById('board-search-input');
    if (topInput) topInput.value = '';
    const bottomInput = document.getElementById('board-bottom-search-input');
    if (bottomInput) bottomInput.value = '';

    this.renderBoardCategories();
    this.renderBoardView();
    this.showToast('전체 목록으로 초기화되었습니다.');
  }"""

assert old_write_methods in code, "old_write_methods not found in js/app.js"
code = code.replace(old_write_methods, new_write_methods, 1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully updated js/app.js for Naver Cafe Board and SmartEditor!")
