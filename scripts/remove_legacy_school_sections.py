# -*- coding: utf-8 -*-
"""
Remove legacy broken duplicate school sections (7대 명문 학군지 심층 분석 & 2028 대입 개편안)
from index.html and js/app.js.
"""
import re

def clean_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the 4th quick highlight card to switch directly to admissions view
    old_card = 'onclick="app.selectSchoolLevel(\'admissions\')"'
    new_card = 'onclick="app.switchMainView(\'admissions\')"'
    if old_card in content:
        content = content.replace(old_card, new_card)

    # 2. Remove school-districts-section and school-admissions-section
    pattern = r'\s*<!-- 2\. 전국 7대 명문 학군지 심층 분석 섹션 -->.*?<!-- 3\. 2028 대입 & 고입 입시 가이드 섹션 -->.*?</section>'
    # Let's inspect exact block
    start_tag = '<!-- 2. 전국 7대 명문 학군지 심층 분석 섹션 -->'
    end_tag = '</section>'
    
    idx_start = content.find(start_tag)
    assert idx_start != -1, "Could not find start_tag in index.html"
    idx_end = content.find(end_tag, idx_start)
    assert idx_end != -1, "Could not find end_tag in index.html"

    # Replace the text between start_tag and end_tag
    content = content[:idx_start] + content[idx_end:]

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("index.html cleaned successfully!")


def clean_app_js():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove calls in initSchoolView
    content = content.replace('    this.renderSchoolDistricts();\n', '')
    content = content.replace('    this.renderSchoolAdmissions();\n', '')

    # 2. Replace selectSchoolLevel
    old_select_level = '''  selectSchoolLevel(levelId) {
    this.schoolLevel = levelId;
    this.schoolPage = 1;
    this.renderSchoolLevelChips();
    this.renderSchoolRichGoHeader();
    this.renderSchoolSidoPills();
    this.renderSchoolSigunguTable();

    const listSec = document.getElementById('school-list-section');
    const filterBar = document.getElementById('school-filter-bar');
    const richgoHeader = document.getElementById('school-richgo-header-box');
    const sigunguSec = document.getElementById('school-sigungu-section');
    const distSec = document.getElementById('school-districts-section');
    const admSec = document.getElementById('school-admissions-section');

    if (levelId === 'districts') {
      if (listSec) listSec.classList.add('hidden');
      if (filterBar) filterBar.classList.add('hidden');
      if (richgoHeader) richgoHeader.classList.add('hidden');
      if (sigunguSec) sigunguSec.classList.add('hidden');
      if (distSec) distSec.classList.remove('hidden');
      if (admSec) admSec.classList.add('hidden');
      distSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (levelId === 'admissions') {
      if (listSec) listSec.classList.add('hidden');
      if (filterBar) filterBar.classList.add('hidden');
      if (richgoHeader) richgoHeader.classList.add('hidden');
      if (sigunguSec) sigunguSec.classList.add('hidden');
      if (distSec) distSec.classList.add('hidden');
      if (admSec) admSec.classList.remove('hidden');
      admSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      if (listSec) listSec.classList.remove('hidden');
      if (filterBar) filterBar.classList.remove('hidden');
      if (richgoHeader) richgoHeader.classList.remove('hidden');
      if (sigunguSec) sigunguSec.classList.remove('hidden');
      if (distSec) distSec.classList.toggle('hidden', levelId !== 'all');
      if (admSec) admSec.classList.toggle('hidden', levelId !== 'all');
      this.renderSchoolList();
    }
  }'''

    new_select_level = '''  selectSchoolLevel(levelId) {
    if (levelId === 'districts') {
      this.switchMainView('apartments');
      return;
    }
    if (levelId === 'admissions') {
      this.switchMainView('admissions');
      return;
    }
    this.schoolLevel = levelId;
    this.schoolPage = 1;
    this.renderSchoolLevelChips();
    this.renderSchoolRichGoHeader();
    this.renderSchoolSidoPills();
    this.renderSchoolSigunguTable();

    const listSec = document.getElementById('school-list-section');
    const filterBar = document.getElementById('school-filter-bar');
    const richgoHeader = document.getElementById('school-richgo-header-box');
    const sigunguSec = document.getElementById('school-sigungu-section');

    if (listSec) listSec.classList.remove('hidden');
    if (filterBar) filterBar.classList.remove('hidden');
    if (richgoHeader) richgoHeader.classList.remove('hidden');
    if (sigunguSec) sigunguSec.classList.remove('hidden');
    this.renderSchoolList();
  }'''

    # Normalize CRLF for matching
    content_norm = content.replace('\r\n', '\n')
    old_select_level_norm = old_select_level.replace('\r\n', '\n')
    assert old_select_level_norm in content_norm, "Could not find old_select_level in js/app.js"
    content_norm = content_norm.replace(old_select_level_norm, new_select_level)

    # 3. Remove renderSchoolDistricts and renderSchoolAdmissions functions
    pattern_functions = r'\n  renderSchoolDistricts\(\) \{.*?\n  \}\n\n  renderSchoolAdmissions\(\) \{.*?\n  \}\n'
    content_norm = re.sub(pattern_functions, '\n', content_norm, flags=re.DOTALL)

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content_norm)
    print("js/app.js cleaned successfully!")

if __name__ == '__main__':
    clean_index_html()
    clean_app_js()
