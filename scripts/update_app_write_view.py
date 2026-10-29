# -*- coding: utf-8 -*-
import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update routing array to include 'write'
code = code.replace(
    "['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions'].includes(initHash)",
    "['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions', 'write'].includes(initHash)"
)
code = code.replace(
    "['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions'].includes(h)",
    "['board', 'festivals', 'contests', 'food', 'policy', 'school', 'apartments', 'admissions', 'write'].includes(h)"
)

# 2. Add 'write' branch to switchMainView(viewId)
old_switch_branch = "} else if (viewId === 'admissions') {\n      this.initAdmissionsView();\n    }"
new_switch_branch = """} else if (viewId === 'admissions') {
      this.initAdmissionsView();
    } else if (viewId === 'write') {
      this.initWritePage();
    }"""
assert old_switch_branch in code, "switchMainView admissions branch not found"
code = code.replace(old_switch_branch, new_switch_branch, 1)

# 3. Update empty state in renderBoardView
with open('empty_snippet.txt', 'r', encoding='utf-8') as f:
    old_empty = f.read()

new_empty = """if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="p-12 text-center space-y-3 bg-white rounded-2xl border border-stone-200 shadow-2xs">
          <div class="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-[#03C75A] flex items-center justify-center text-2xl shadow-2xs">
            <i class="fa-solid fa-pen-nib"></i>
          </div>
          <div class="text-base font-black text-slate-800">등록된 게시글이 아직 없습니다.</div>
          <p class="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">첫 번째 주인공이 되어 이웃 육아맘·대디들과 따뜻한 육아 이야기와 유용한 정보를 나누어보세요!</p>
          <div class="pt-2">
            <button onclick="app.openWritePage()" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white text-xs font-black shadow-sm transition cursor-pointer">
              <i class="fa-solid fa-feather-pointed"></i>
              <span>첫 글 작성하기</span>
            </button>
          </div>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }"""

assert old_empty in code, "old_empty state not found"
code = code.replace(old_empty, new_empty, 1)

# 4. Replace openWritePostModal with openWritePage and initWritePage
old_write_controller = """  // ==========================================
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
  }"""

new_write_controller = """  // ==========================================
  // [네이버 스마트에디터 스타일 카페 글쓰기 컨트롤러 (풀페이지)]
  // ==========================================
  openWritePage(catId) {
    if (catId && document.getElementById('post-form-category')) {
      document.getElementById('post-form-category').value = catId;
    } else if (this.currentCategory && this.currentCategory !== 'all' && this.currentCategory !== 'hot') {
      const catSelect = document.getElementById('post-form-category');
      if (catSelect) catSelect.value = this.currentCategory;
    }
    this.switchMainView('write');
  }

  openWritePostModal(catId) {
    this.openWritePage(catId);
  }

  closeWritePostModal() {
    this.switchMainView('board');
  }

  initWritePage() {
    // 1. 작성자 프로필 정보 동기화
    const authorNameEl = document.getElementById('write-author-name');
    const authorBadgeEl = document.getElementById('write-author-badge');
    const authorAvatarEl = document.getElementById('write-author-avatar');
    if (authorNameEl) authorNameEl.textContent = this.profile.nickname || '도담맘';
    if (authorBadgeEl) authorBadgeEl.textContent = `${this.profile.babyName || '도담이'} (${this.profile.ageBadge || '육아맘'})`;
    if (authorAvatarEl) {
      const firstChar = (this.profile.nickname || '도담맘').charAt(0);
      authorAvatarEl.textContent = firstChar;
    }

    // 2. 임시저장 내역 확인
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }"""

assert old_write_controller in code, "old_write_controller not found"
code = code.replace(old_write_controller, new_write_controller, 1)

# 5. Update submitNewPost to handle prefix and switch to board view
old_submit_start = """  submitNewPost(e) {
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
      ? rawTags.split(/[,\s]+/).map((t) => t.replace(/^#/, '').trim()).filter(Boolean)
      : [];

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category,
      region,
      title,"""

new_submit_start = """  submitNewPost(e) {
    if (e) e.preventDefault();
    const titleEl = document.getElementById('post-form-title');
    const contentEl = document.getElementById('post-form-content');
    const categoryEl = document.getElementById('post-form-category');
    const prefixEl = document.getElementById('post-form-prefix');
    const regionEl = document.getElementById('post-form-region');
    const tagsEl = document.getElementById('post-form-tags');

    const rawTitle = titleEl ? titleEl.value.trim() : '';
    const content = contentEl ? contentEl.value.trim() : '';
    if (!rawTitle || !content) {
      this.showToast('제목과 내용을 모두 입력해 주세요!');
      return;
    }

    const prefix = prefixEl ? prefixEl.value.trim() : '';
    const title = prefix ? `[${prefix}] ${rawTitle}` : rawTitle;

    const category = categoryEl ? categoryEl.value : 'newborn';
    const region = regionEl ? regionEl.value : 'all';
    const rawTags = tagsEl ? tagsEl.value.trim() : '';
    const tags = rawTags
      ? rawTags.split(/[,\s]+/).map((t) => t.replace(/^#/, '').trim()).filter(Boolean)
      : [];

    const newPost = {
      id: `custom-post-${Date.now()}`,
      category,
      region,
      title,"""

assert old_submit_start in code, "old_submit_start not found"
code = code.replace(old_submit_start, new_submit_start, 1)

old_submit_end = """    if (titleEl) titleEl.value = '';
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
  }"""

new_submit_end = """    if (titleEl) titleEl.value = '';
    if (contentEl) contentEl.value = '';
    if (tagsEl) tagsEl.value = '';
    if (prefixEl) prefixEl.value = '';
    this.attachedImages = [];
    this.renderAttachedImages();

    // Clear draft
    localStorage.removeItem(this.draftKey);
    const draftBadge = document.getElementById('draft-count-badge');
    if (draftBadge) draftBadge.textContent = '0';
    const loadBtn = document.getElementById('btn-draft-load');
    if (loadBtn) loadBtn.classList.add('hidden');

    this.switchMainView('board');
    this.renderBoardView();
    this.showToast('🎉 게시글이 성공적으로 등록되었습니다!');
  }"""

assert old_submit_end in code, "old_submit_end not found"
code = code.replace(old_submit_end, new_submit_end, 1)

# 6. Update loadSavedPosts to purge any lingering legacy dummy posts
old_load = """  loadSavedPosts() {
    try {
      const raw = localStorage.getItem(this.customPostsKey);
      if (raw) {
        const posts = JSON.parse(raw);
        this.data.posts.unshift(...posts);
      }
    } catch {}
  }"""

new_load = """  loadSavedPosts() {
    try {
      const raw = localStorage.getItem(this.customPostsKey);
      if (raw) {
        let posts = JSON.parse(raw);
        // Clean out any legacy mock/dummy posts that might have been saved in localStorage
        posts = (posts || []).filter((p) => p && p.id && !p.id.startsWith('post-10') && !p.id.startsWith('post-mock'));
        this.data.posts.unshift(...posts);
      }
    } catch {}
  }"""

assert old_load in code, "old_load not found"
code = code.replace(old_load, new_load, 1)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully updated js/app.js!")
