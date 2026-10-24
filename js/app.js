// 아이키움 맵 (KidsInfra) - 메인 프론트엔드 애플리케이션 컨트롤러
class KidsInfraApp {
  constructor() {
    this.data = window.KIDS_INFRA_DATA;
    this.api = window.kidsInfraApi;

    this.currentRegionId = 'pangyo';
    this.selectedAptId = 'apt-pangyo-1';
    this.activeTab = 'map';
    this.childAgeFilter = 'all';
    this.medicalCategoryFilter = 'all';
    this.bookAgeFilter = 'all';

    this.favoritesKey = 'kidsinfra_favorites_v1';
    this.reviewsKey = 'kidsinfra_custom_reviews_v1';
    this.favorites = this.loadFavorites();
    this.customReviews = this.loadCustomReviews();

    this.map = null;
    this.mapLayers = {
      apartments: null,
      schools: null,
      daycares: null,
      medical: null,
      libraries: null
    };
  }

  init() {
    this.loadCustomReviewsIntoData();
    this.handleUrlDeepLink();
    this.renderRegionSelector();
    this.initMap();
    this.populateSelectBoxes();
    this.refreshAllViews();
    this.calculateAntipyretic();
    this.renderEmergencyGuides();
    this.runTimelineSimulation();
    this.updateFavBadges();
    this.updateApiStatusBadge();

    // 검색 드롭다운 외부 클릭 닫기
    document.addEventListener('click', (e) => {
      const input = document.getElementById('apt-search-input');
      const dropdown = document.getElementById('apt-search-dropdown');
      if (input && dropdown && !input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  // URL Deep Link (?apt=PG-101 또는 #/apartment/PG-101) 파싱
  handleUrlDeepLink() {
    const params = new URLSearchParams(window.location.search);
    const aptParam = params.get('apt');
    const hashMatch = window.location.hash.match(/\/apartment\/([A-Za-z0-9-_]+)/);
    const targetKey = aptParam || (hashMatch && hashMatch[1]);

    if (targetKey) {
      const found = this.data.apartments.find(
        (a) => a.id === targetKey || a.code.toLowerCase() === targetKey.toLowerCase()
      );
      if (found) {
        this.currentRegionId = found.regionId;
        this.selectedAptId = found.id;
      }
    }
  }

  // 거점 선택 버튼 렌더링
  renderRegionSelector() {
    const container = document.getElementById('region-selector-buttons');
    if (!container) return;

    container.innerHTML = this.data.regions
      .map((r) => {
        const active = r.id === this.currentRegionId;
        return `
          <button
            onclick="app.selectRegion('${r.id}')"
            class="px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              active
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }"
          >
            ${r.shortName}
          </button>
        `;
      })
      .join('');
  }

  selectRegion(regionId) {
    this.currentRegionId = regionId;
    const regionApts = this.getRegionApartments(regionId);
    if (regionApts.length > 0) {
      this.selectedAptId = regionApts[0].id;
    }
    this.renderRegionSelector();
    this.populateSelectBoxes();
    this.refreshAllViews();

    const region = this.data.regions.find((r) => r.id === regionId);
    if (region && this.map) {
      this.map.flyTo(region.center, region.zoom, { duration: 0.7 });
    }
  }

  selectApartment(aptId, focusMap = true) {
    const apt = this.data.apartments.find((a) => a.id === aptId);
    if (!apt) return;

    const regionChanged = this.currentRegionId !== apt.regionId;
    this.currentRegionId = apt.regionId;
    this.selectedAptId = apt.id;

    // URL 쿼리 업데이트 (딥링크 지원)
    const url = new URL(window.location.href);
    url.searchParams.set('apt', apt.code);
    window.history.replaceState({}, '', url.toString());

    if (regionChanged) {
      this.renderRegionSelector();
      this.populateSelectBoxes();
    }

    const indexSelect = document.getElementById('index-apt-select');
    if (indexSelect) indexSelect.value = apt.id;
    const simSelect = document.getElementById('sim-apt-select');
    if (simSelect) simSelect.value = apt.id;

    this.refreshAllViews();

    if (focusMap && this.map) {
      this.map.flyTo([apt.lat, apt.lng], 15, { duration: 0.6 });
    }
  }

  getRegionApartments(regionId = this.currentRegionId) {
    return this.data.apartments.filter((a) => a.regionId === regionId);
  }

  getSelectedApartment() {
    return (
      this.data.apartments.find((a) => a.id === this.selectedAptId) ||
      this.data.apartments[0]
    );
  }

  // 탭 전환
  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.tab-section').forEach((sec) => {
      sec.classList.add('hidden');
    });
    const targetSec = document.getElementById(`tab-${tabId}`);
    if (targetSec) targetSec.classList.remove('hidden');

    document.querySelectorAll('.main-tab-btn').forEach((btn) => {
      const isMatch = btn.getAttribute('data-tab') === tabId;
      if (isMatch) {
        btn.className =
          'main-tab-btn flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition bg-blue-600 text-white shadow-sm';
      } else {
        btn.className =
          'main-tab-btn flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition text-slate-600 hover:bg-slate-100';
      }
    });

    if (tabId === 'map' && this.map) {
      setTimeout(() => this.map.invalidateSize(), 150);
    }
  }

  // 자녀 연령 필터 변경
  onAgeFilterChange(ageValue) {
    this.childAgeFilter = ageValue;
    const pill = document.getElementById('active-age-pill');
    const ageNames = {
      infant: '🍼 영아(0~2세) 맞춤 추천 중',
      toddler: '🧒 유아(3~6세) 맞춤 추천 중',
      elem_low: '🎒 초등 저학년(7~9세) 맞춤 추천 중',
      elem_high: '📚 초등 고학년(10~12세) 맞춤 추천 중'
    };

    if (ageValue === 'all') {
      pill.classList.add('hidden');
      this.bookAgeFilter = 'all';
    } else {
      pill.textContent = ageNames[ageValue] || '';
      pill.classList.remove('hidden');
      this.bookAgeFilter = ageValue === 'infant' ? 'toddler' : ageValue;
    }

    this.refreshAllViews();
    if (ageValue !== 'all') {
      this.showToast(`${ageNames[ageValue]} 기준으로 보육·도서·행사 데이터를 최적화했습니다.`);
    }
  }

  // 검색 자동완성
  onSearchInput(query) {
    const dropdown = document.getElementById('apt-search-dropdown');
    if (!dropdown) return;

    const q = query.trim().toLowerCase();
    const matches = this.data.apartments.filter((a) => {
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.school.name.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    if (matches.length === 0) {
      dropdown.innerHTML = `<div class="p-3 text-xs text-slate-500">검색 결과가 없습니다.</div>`;
    } else {
      dropdown.innerHTML = matches
        .map((a) => {
          const region = this.data.regions.find((r) => r.id === a.regionId);
          return `
            <button
              type="button"
              onclick="app.onPickSearchApt('${a.id}')"
              class="w-full text-left px-3.5 py-2.5 hover:bg-blue-50/80 flex items-center justify-between border-b border-slate-100 last:border-0 transition"
            >
              <div>
                <div class="text-xs font-extrabold text-slate-900">${a.name}</div>
                <div class="text-[11px] text-slate-500">🏫 ${a.school.name} (도보 ${a.school.walkMin}분) · ${region ? region.shortName : ''}</div>
              </div>
              <span class="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-xs">
                ${a.scores.total}점 (${a.scores.grade})
              </span>
            </button>
          `;
        })
        .join('');
    }
    dropdown.classList.remove('hidden');
  }

  onPickSearchApt(aptId) {
    const dropdown = document.getElementById('apt-search-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    const apt = this.data.apartments.find((a) => a.id === aptId);
    const input = document.getElementById('apt-search-input');
    if (input && apt) input.value = apt.name;
    this.selectApartment(aptId, true);
  }

  // Leaflet 지도 초기화
  initMap() {
    const region = this.data.regions.find((r) => r.id === this.currentRegionId);
    this.map = L.map('main-map', {
      center: region.center,
      zoom: region.zoom,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    // 깔끔한 한글/도로 시인성 높은 CartoDB Voyager 타일
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.mapLayers.apartments = L.layerGroup().addTo(this.map);
    this.mapLayers.schools = L.layerGroup().addTo(this.map);
    this.mapLayers.daycares = L.layerGroup().addTo(this.map);
    this.mapLayers.medical = L.layerGroup().addTo(this.map);
    this.mapLayers.libraries = L.layerGroup().addTo(this.map);

    this.refreshMapLayers();
  }

  refreshMapLayers() {
    if (!this.map) return;

    Object.values(this.mapLayers).forEach((lg) => lg && lg.clearLayers());

    const showSchool = document.getElementById('layer-school')?.checked ?? true;
    const showDaycare = document.getElementById('layer-daycare')?.checked ?? true;
    const showMedical = document.getElementById('layer-medical')?.checked ?? true;
    const showLibrary = document.getElementById('layer-library')?.checked ?? true;

    const regionApts = this.getRegionApartments();
    const selectedApt = this.getSelectedApartment();

    // 1. 아파트 단지 마커
    regionApts.forEach((apt) => {
      const isSelected = apt.id === selectedApt.id;
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="map-pin-badge map-pin-apt ${isSelected ? 'selected' : ''}">
            <i class="fa-solid fa-building"></i>
            <span>${apt.name}</span>
            <span class="px-1.5 py-0.2 rounded-full bg-white/25 text-[10px]">${apt.scores.total}점</span>
          </div>
        `,
        iconAnchor: [60, 20]
      });

      const marker = L.marker([apt.lat, apt.lng], { icon });
      marker.on('click', () => this.selectApartment(apt.id, true));
      marker.addTo(this.mapLayers.apartments);
    });

    // 2. 배정 초등학교 + 어린이보호구역(스쿨존 300m) + 안심 통학로 폴리라인 + 사고이력
    if (showSchool && selectedApt) {
      const sch = selectedApt.school;

      // 스쿨존 반경 300m 원형 오버레이
      L.circle([sch.lat, sch.lng], {
        radius: 260,
        color: '#f59e0b',
        weight: 2,
        dashArray: '6, 4',
        fillColor: '#fbbf24',
        fillOpacity: 0.16
      })
        .bindPopup(
          `<div class="text-xs font-bold text-amber-800">🚸 ${sch.name} 어린이보호구역 (스쿨존)</div>
           <div class="text-[11px] text-slate-600 mt-1">방범·과속 CCTV ${sch.schoolZoneCctvCount}대 가동 중 · 제한속도 30km/h</div>`
        )
        .addTo(this.mapLayers.schools);

      // 안심 통학로 경로 폴리라인
      if (sch.routeCoords && sch.routeCoords.length > 1) {
        L.polyline(sch.routeCoords, {
          color: '#10b981',
          weight: 6,
          opacity: 0.9,
          dashArray: '10, 8',
          className: 'safe-route-line'
        })
          .bindPopup(
            `<div class="text-xs font-extrabold text-emerald-800">🛡️ 초품아 안심 통학 경로</div>
             <div class="text-[11px] text-slate-600 mt-1">${sch.routeDesc}</div>`
          )
          .addTo(this.mapLayers.schools);
      }

      // 초등학교 마커
      const schIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="map-pin-badge map-pin-school">
            <i class="fa-solid fa-school"></i>
            <span>${sch.name} (도보 ${sch.walkMin}분)</span>
          </div>
        `,
        iconAnchor: [55, 18]
      });
      L.marker([sch.lat, sch.lng], { icon: schIcon })
        .bindPopup(
          `<div class="text-xs space-y-1">
            <div class="font-extrabold text-emerald-900 text-sm">🏫 ${sch.name} (배정 학구도)</div>
            <div class="text-slate-600">통학 거리: <strong>${sch.distanceM}m (도보 ${sch.walkMin}분)</strong></div>
            <div class="text-slate-600">횡단보도: <strong>${sch.crosswalkCount}회</strong> / 학급당 인원: <strong>${sch.studentsPerClass}명</strong></div>
            <div class="text-slate-600">늘봄·돌봄교실 수용률: <strong class="text-emerald-700">${sch.afterSchoolCareRate}%</strong></div>
          </div>`
        )
        .addTo(this.mapLayers.schools);

      // 보행자 사고 다발/주의 지점 마커
      (sch.accidentSpots || []).forEach((spot) => {
        const accIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="map-pin-badge map-pin-accident"><i class="fa-solid fa-triangle-exclamation"></i> 보행주의</div>`,
          iconAnchor: [35, 15]
        });
        L.marker([spot.lat, spot.lng], { icon: accIcon })
          .bindPopup(`<div class="text-xs font-bold text-rose-700">⚠️ 통학로 주의 지점</div><div class="text-[11px] text-slate-600 mt-1">${spot.desc}</div>`)
          .addTo(this.mapLayers.schools);
      });
    }

    // 3. 어린이집·유치원 마커
    if (showDaycare) {
      const regionDaycares = this.data.daycares.filter((d) => d.regionId === this.currentRegionId);
      regionDaycares.forEach((dc) => {
        const dcIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div class="map-pin-badge map-pin-daycare">
              <i class="fa-solid fa-shapes"></i>
              <span>${dc.name}</span>
            </div>
          `,
          iconAnchor: [50, 16]
        });
        L.marker([dc.lat, dc.lng], { icon: dcIcon })
          .bindPopup(
            `<div class="text-xs space-y-1">
              <span class="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">${dc.type}</span>
              <div class="font-extrabold text-slate-900 text-sm">${dc.name}</div>
              <div class="text-slate-600">정원 ${dc.capacity}명 / 현원 ${dc.enrolled}명 (<strong class="text-rose-600">대기 ${dc.waiting}명</strong>)</div>
              <div class="text-slate-600">교사 1인당 아동: <strong>${dc.teacherRatio}</strong></div>
              <div class="text-slate-600">운영시간: ${dc.openHours}</div>
            </div>`
          )
          .addTo(this.mapLayers.daycares);
      });
    }

    // 4. 달빛어린이병원 & 심야약국 마커
    if (showMedical) {
      const regionMed = this.data.medicalFacilities.filter((m) => m.regionId === this.currentRegionId);
      regionMed.forEach((med) => {
        const status = this.api.evaluateMedicalStatus(med);
        const nav = this.api.getNavigationLinks(med);
        const isHosp = med.category === 'hospital';
        const medIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div class="map-pin-badge ${isHosp ? 'map-pin-hospital' : 'map-pin-pharmacy'}">
              <i class="fa-solid ${isHosp ? 'fa-Suitcase-medical fa-kit-medical' : 'fa-capsules'}"></i>
              <span>${med.name.split(' ')[0]} ${med.subType.split(' ')[0]}</span>
            </div>
          `,
          iconAnchor: [55, 16]
        });
        L.marker([med.lat, med.lng], { icon: medIcon })
          .bindPopup(
            `<div class="text-xs space-y-1.5">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.badgeClass}">${status.statusText}</span>
              <div class="font-extrabold text-slate-900 text-sm">${med.name}</div>
              <div class="text-slate-600">${med.hoursDesc}</div>
              <div class="text-emerald-700 font-semibold">${med.waitStatus}</div>
              <div class="flex items-center gap-1.5 pt-1">
                <a href="${nav.telUrl}" class="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px]">📞 전화</a>
                <a href="${nav.kakaoMapUrl}" target="_blank" class="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-900 font-bold text-[11px]">카카오 길안내</a>
              </div>
            </div>`
          )
          .addTo(this.mapLayers.medical);
      });
    }

    // 5. 공공 어린이도서관 마커
    if (showLibrary) {
      const regionLibs = this.data.libraries.filter((l) => l.regionId === this.currentRegionId);
      regionLibs.forEach((lib) => {
        const libIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div class="map-pin-badge map-pin-library">
              <i class="fa-solid fa-book-open"></i>
              <span>${lib.name}</span>
            </div>
          `,
          iconAnchor: [55, 16]
        });
        L.marker([lib.lat, lib.lng], { icon: libIcon })
          .bindPopup(
            `<div class="text-xs space-y-1">
              <div class="font-extrabold text-purple-900 text-sm">📚 ${lib.name}</div>
              <div class="text-slate-600">${lib.specialFeature}</div>
              <div class="text-slate-500">${lib.hours}</div>
            </div>`
          )
          .addTo(this.mapLayers.libraries);
      });
    }
  }

  // 전체 화면 갱신
  refreshAllViews() {
    const region = this.data.regions.find((r) => r.id === this.currentRegionId);
    if (region) {
      document.getElementById('current-region-title').textContent = `${region.name} 육아 인프라 맵`;
      document.getElementById('current-region-badge').textContent = region.badge;
      document.getElementById('current-region-desc').textContent = region.description;
    }

    this.renderMapQuickChips();
    this.refreshMapLayers();
    this.renderSelectedApartmentPanel();
    this.renderDaycareTable();
    this.renderIndexAndViralCard();
    this.renderBattleComparison();
    this.renderMedicalSection();
    this.renderCultureSection();
    this.runTimelineSimulation();
  }

  // 지도 상단 아파트 빠른 선택 칩
  renderMapQuickChips() {
    const container = document.getElementById('map-apt-quick-chips');
    if (!container) return;

    const apts = this.getRegionApartments();
    container.innerHTML = apts
      .map((apt) => {
        const active = apt.id === this.selectedAptId;
        return `
          <button
            onclick="app.selectApartment('${apt.id}', true)"
            class="px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap shadow-md transition flex items-center gap-1.5 ${
              active
                ? 'bg-indigo-600 text-white ring-2 ring-white'
                : 'bg-white/95 text-slate-800 hover:bg-indigo-50'
            }"
          >
            <span>${apt.name}</span>
            <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
              active ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
            }">${apt.scores.total}점</span>
          </button>
        `;
      })
      .join('');
  }

  // 우측 선택 아파트 상세 분석 패널 렌더링
  renderSelectedApartmentPanel() {
    const panel = document.getElementById('selected-apt-panel');
    if (!panel) return;

    const apt = this.getSelectedApartment();
    const sch = apt.school;
    const isFav = this.favorites.includes(apt.id);

    panel.innerHTML = `
      <!-- 단지 헤더 -->
      <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-extrabold text-[11px]">${
              sch.isChopuma ? '✨ 초품아 인증 단지' : '안심통학권 단지'
            }</span>
            <span class="text-xs text-slate-400 font-semibold">${apt.builtYear}년 준공 · ${apt.households.toLocaleString()}세대</span>
          </div>
          <h2 class="text-lg font-extrabold text-slate-900 mt-1">${apt.name}</h2>
          <p class="text-xs text-slate-500">${apt.address}</p>
        </div>

        <!-- 종합 등급 배지 & 관심단지 버튼 -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            onclick="app.toggleFavorite('${apt.id}')"
            title="관심단지 저장"
            class="w-9 h-9 rounded-xl border ${
              isFav ? 'bg-amber-50 border-amber-300 text-amber-500' : 'border-slate-200 text-slate-400 hover:text-slate-600'
            } flex items-center justify-center transition"
          >
            <i class="fa-solid fa-bookmark"></i>
          </button>
          <div class="text-center px-3 py-1.5 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-sm">
            <div class="text-[10px] font-bold opacity-85">아이키움 지수</div>
            <div class="text-base font-black leading-tight">${apt.scores.total}점 <span class="text-amber-300">${apt.scores.grade}</span></div>
          </div>
        </div>
      </div>

      <!-- ① 배정 초등학교 & 안심 통학로 스쿨존 분석 -->
      <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
            <i class="fa-solid fa-person-walking-luggage text-emerald-600"></i>
            배정초: ${sch.name} (도보 ${sch.walkMin}분 · ${sch.distanceM}m)
          </span>
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${
            sch.crosswalkCount === 0
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-100 text-amber-800'
          }">
            ${sch.crosswalkCount === 0 ? '차도 횡단 0회 (완전안심)' : `횡단보도 ${sch.crosswalkCount}회`}
          </span>
        </div>
        <p class="text-xs text-emerald-950/80 leading-relaxed">${sch.routeDesc}</p>

        <div class="grid grid-cols-3 gap-2 pt-1 text-center">
          <div class="bg-white rounded-xl p-2 border border-emerald-100">
            <div class="text-[10px] text-slate-500">스쿨존 CCTV</div>
            <div class="text-xs font-extrabold text-slate-800">${sch.schoolZoneCctvCount}대</div>
          </div>
          <div class="bg-white rounded-xl p-2 border border-emerald-100">
            <div class="text-[10px] text-slate-500">늘봄·돌봄 수용률</div>
            <div class="text-xs font-extrabold text-emerald-700">${sch.afterSchoolCareRate}%</div>
          </div>
          <div class="bg-white rounded-xl p-2 border border-emerald-100">
            <div class="text-[10px] text-slate-500">보행 사고이력</div>
            <div class="text-xs font-extrabold ${sch.accidentHistoryCount === 0 ? 'text-emerald-700' : 'text-amber-600'}">
              ${sch.accidentHistoryCount}건
            </div>
          </div>
        </div>
      </div>

      <!-- 4대 아이키움 인덱스 미니 바 -->
      <div class="grid grid-cols-2 gap-2.5 text-xs">
        <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70">
          <div class="flex justify-between font-bold text-slate-700 mb-1">
            <span>🛡️ 통학 안전성</span>
            <span class="text-blue-600">${apt.scores.safety}점</span>
          </div>
          <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-blue-600 rounded-full" style="width:${apt.scores.safety}%"></div>
          </div>
        </div>
        <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70">
          <div class="flex justify-between font-bold text-slate-700 mb-1">
            <span>🏥 야간 소아의료</span>
            <span class="text-rose-600">${apt.scores.medical}점</span>
          </div>
          <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-rose-500 rounded-full" style="width:${apt.scores.medical}%"></div>
          </div>
        </div>
        <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70">
          <div class="flex justify-between font-bold text-slate-700 mb-1">
            <span>🧸 보육·학원 접근성</span>
            <span class="text-amber-600">${apt.scores.childcare}점</span>
          </div>
          <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-amber-500 rounded-full" style="width:${apt.scores.childcare}%"></div>
          </div>
        </div>
        <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-200/70">
          <div class="flex justify-between font-bold text-slate-700 mb-1">
            <span>📚 도서관·숲 문화</span>
            <span class="text-purple-600">${apt.scores.culture}점</span>
          </div>
          <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-purple-600 rounded-full" style="width:${apt.scores.culture}%"></div>
          </div>
        </div>
      </div>

      <!-- 국토부 실거래가 & 주요 업무지구 출퇴근 요약 -->
      <div class="bg-slate-900 text-white rounded-2xl p-3.5 flex items-center justify-between text-xs">
        <div>
          <span class="text-[10px] text-slate-400 font-semibold block">국토부 전용 84㎡ 실거래 참고 (${apt.prices.recentDate})</span>
          <div class="font-extrabold text-sm mt-0.5">
            매매 <span class="text-amber-300">${apt.prices.sale84}</span> · 전세 <span class="text-emerald-300">${apt.prices.jeonse84}</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-[10px] text-slate-400 block">판교 / 강남 출퇴근</span>
          <span class="font-bold text-xs text-blue-300">${apt.commute.pangyoMin}분 / ${apt.commute.gangnamMin}분</span>
        </div>
      </div>

      <!-- 키워드 태그 & 액션 버튼 -->
      <div class="flex flex-wrap gap-1.5">
        ${apt.tags
          .map(
            (t) => `<span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">${t}</span>`
          )
          .join('')}
      </div>

      <div class="grid grid-cols-2 gap-2 pt-1">
        <button
          onclick="app.switchTab('index')"
          class="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
        >
          <i class="fa-solid fa-share-nodes"></i>
          <span>맘카페 공유 카드뉴스 보기</span>
        </button>
        <button
          onclick="app.switchTab('timeline')"
          class="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <i class="fa-solid fa-clock"></i>
          <span>맞벌이 등하원 시뮬레이션</span>
        </button>
      </div>
    `;
  }

  // 어린이집·유치원 비교 테이블 렌더링
  renderDaycareTable() {
    const tbody = document.getElementById('daycare-table-body');
    if (!tbody) return;

    const nightOnly = document.getElementById('filter-nightcare-only')?.checked ?? false;
    let list = this.data.daycares.filter((d) => d.regionId === this.currentRegionId);
    if (nightOnly) {
      list = list.filter((d) => d.hasNightCare);
    }
    if (this.childAgeFilter === 'infant') {
      list = list.filter((d) => d.hasInfantClass);
    }

    tbody.innerHTML = list
      .map((dc) => {
        const fillRate = Math.round((dc.enrolled / dc.capacity) * 100);
        const nav = this.api.getNavigationLinks(dc);
        return `
          <tr class="hover:bg-slate-50/90 transition">
            <td class="py-3 px-3">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                  dc.type.includes('국공립')
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }">${dc.type}</span>
                <span class="font-bold text-slate-900">${dc.name}</span>
              </div>
            </td>
            <td class="py-3 px-3 font-semibold text-slate-600">도보 ${Math.max(1, Math.round(dc.distanceM / 65))}분 (${dc.distanceM}m)</td>
            <td class="py-3 px-3">
              <div class="font-bold text-slate-800">${dc.enrolled}명 / ${dc.capacity}명 (${fillRate}%)</div>
            </td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-extrabold border border-rose-200">
                대기 ${dc.waiting}명
              </span>
            </td>
            <td class="py-3 px-3 font-extrabold text-indigo-700">${dc.teacherRatio}</td>
            <td class="py-3 px-3">
              <span class="text-slate-600 font-medium">${dc.openHours}</span>
            </td>
            <td class="py-3 px-3 text-right space-x-1">
              <a href="${nav.telUrl}" class="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">
                <i class="fa-solid fa-phone mr-1 text-[10px]"></i>전화
              </a>
              <a href="${nav.kakaoMapUrl}" target="_blank" class="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold">
                길찾기
              </a>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  // 셀렉트 박스 채우기
  populateSelectBoxes() {
    const allApts = this.data.apartments;
    const optionsHtml = allApts
      .map((a) => `<option value="${a.id}" ${a.id === this.selectedAptId ? 'selected' : ''}>[${this.getRegionShortName(a.regionId)}] ${a.name}</option>`)
      .join('');

    const indexSelect = document.getElementById('index-apt-select');
    if (indexSelect) indexSelect.innerHTML = optionsHtml;

    const simSelect = document.getElementById('sim-apt-select');
    if (simSelect) simSelect.innerHTML = optionsHtml;

    const battleA = document.getElementById('battle-apt-a');
    const battleB = document.getElementById('battle-apt-b');
    if (battleA && battleB && !battleA.innerHTML) {
      battleA.innerHTML = allApts
        .map((a, i) => `<option value="${a.id}" ${i === 0 ? 'selected' : ''}>[${this.getRegionShortName(a.regionId)}] ${a.name}</option>`)
        .join('');
      battleB.innerHTML = allApts
        .map((a, i) => `<option value="${a.id}" ${i === 2 ? 'selected' : ''}>[${this.getRegionShortName(a.regionId)}] ${a.name}</option>`)
        .join('');
    }
  }

  getRegionShortName(regionId) {
    const r = this.data.regions.find((x) => x.id === regionId);
    return r ? r.shortName : '';
  }

  // ==========================================
  // TAB 2: 아이키움 인덱스 & 바이럴 카드뉴스 + 레이더 차트 + 학부모 후기
  // ==========================================
  renderIndexAndViralCard() {
    const apt = this.getSelectedApartment();
    const sch = apt.school;
    const regionMed = this.data.medicalFacilities.filter((m) => m.regionId === apt.regionId);
    const regionDc = this.data.daycares.filter((d) => d.regionId === apt.regionId);

    // 1. 바이럴 리포트 카드뉴스 렌더링
    const cardEl = document.getElementById('viral-report-card');
    if (cardEl) {
      cardEl.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px]">
              아이키움 맵 (KidsInfra) 공식 인증 리포트
            </span>
            <h3 class="text-2xl font-black mt-2 tracking-tight">${apt.name}</h3>
            <p class="text-xs text-indigo-200">${apt.address}</p>
          </div>
          <div class="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/25 flex flex-col items-center justify-center shrink-0">
            <span class="text-[10px] text-indigo-200 font-bold">종합 등급</span>
            <span class="text-3xl font-black text-amber-300 leading-none mt-0.5">${apt.scores.grade}</span>
            <span class="text-xs font-extrabold text-white mt-0.5">${apt.scores.total} / 100</span>
          </div>
        </div>

        <p class="mt-4 text-sm font-bold text-amber-200 bg-white/10 rounded-xl px-3.5 py-2.5 border border-white/10">
          “${apt.scores.summaryTag}”
        </p>

        <!-- 3대 핵심 섹션 요약 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
          <div class="bg-white/10 rounded-2xl p-3.5 border border-white/10">
            <div class="text-indigo-200 font-bold mb-1">🏫 통학 안전성 (${apt.scores.safety}점)</div>
            <div class="font-extrabold text-sm text-white">${sch.name}</div>
            <div class="text-emerald-300 font-bold mt-1">도보 ${sch.walkMin}분 (${sch.distanceM}m)</div>
            <div class="text-[11px] text-indigo-100 mt-0.5">차도 횡단 ${sch.crosswalkCount}회 · CCTV ${sch.schoolZoneCctvCount}대</div>
          </div>

          <div class="bg-white/10 rounded-2xl p-3.5 border border-white/10">
            <div class="text-indigo-200 font-bold mb-1">🏥 소아의료 편의 (${apt.scores.medical}점)</div>
            <div class="font-extrabold text-sm text-white">반경 2km 야간의료 ${regionMed.length}곳</div>
            <div class="text-rose-300 font-bold mt-1">달빛병원·24시응급 인접</div>
            <div class="text-[11px] text-indigo-100 mt-0.5">심야 조제약국 즉시 연동</div>
          </div>

          <div class="bg-white/10 rounded-2xl p-3.5 border border-white/10">
            <div class="text-indigo-200 font-bold mb-1">🧸 보육·사교육 (${apt.scores.childcare}점)</div>
            <div class="font-extrabold text-sm text-white">국공립·유치원 ${regionDc.length}곳</div>
            <div class="text-amber-300 font-bold mt-1">늘봄 수용률 ${sch.afterSchoolCareRate}%</div>
            <div class="text-[11px] text-indigo-100 mt-0.5">인근 학원가 ${apt.academyCount}개 밀집</div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-indigo-200">
          <span>공공데이터 출처: 학교알리미 · 심평원 · 보건복지부 · 행안부 · 국토부</span>
          <span class="font-bold text-white">ittechkjh.github.io/kids/?apt=${apt.code}</span>
        </div>
      `;
    }

    // 2. SVG 레이더 차트 렌더링
    this.renderRadarChart(apt.scores);

    // 3. 지표 산출 근거 렌더링
    const breakdownEl = document.getElementById('index-metrics-breakdown');
    if (breakdownEl) {
      const items = [
        { label: '통학 안전성 (초품아·스쿨존)', score: apt.scores.safety, desc: `${sch.name} ${sch.distanceM}m, 횡단보도 ${sch.crosswalkCount}개, 스쿨존 사고 ${sch.accidentHistoryCount}건` },
        { label: '야간·응급 소아의료 접근성', score: apt.scores.medical, desc: `달빛어린이병원 및 24시 소아응급센터, 심야약국 10분 내 도달` },
        { label: '보육 충족도 & 학원 밀집도', score: apt.scores.childcare, desc: `단지 내외 국공립 야간연장 어린이집 및 학원 ${apt.academyCount}곳` },
        { label: '주말 독서·생태문화 인프라', score: apt.scores.culture, desc: `어린이도서관 도보권 및 유아숲체험원·생태공원 연결` }
      ];
      breakdownEl.innerHTML = items
        .map(
          (it) => `
          <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div class="flex items-center justify-between text-xs font-extrabold text-slate-900">
              <span>${it.label}</span>
              <span class="text-indigo-600">${it.score}점</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">${it.desc}</p>
          </div>
        `
        )
        .join('');
    }

    // 4. 학부모 한 줄 후기 렌더링
    this.renderParentReviews(apt);
  }

  renderRadarChart(scores) {
    const container = document.getElementById('radar-chart-container');
    if (!container) return;

    const size = 210;
    const cx = size / 2;
    const cy = size / 2;
    const r = 72;

    const axes = [
      { label: '통학안전', val: scores.safety, angle: -Math.PI / 2 },
      { label: '소아의료', val: scores.medical, angle: 0 },
      { label: '보육·학군', val: scores.childcare, angle: Math.PI / 2 },
      { label: '도서관·숲', val: scores.culture, angle: Math.PI }
    ];

    const calcPoint = (val, angle) => {
      const dist = (val / 100) * r;
      return `${cx + dist * Math.cos(angle)},${cy + dist * Math.sin(angle)}`;
    };

    const aptPoly = axes.map((a) => calcPoint(a.val, a.angle)).join(' ');
    const avgPoly = axes.map((a) => calcPoint(80, a.angle)).join(' ');

    container.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <!-- 배경 가이드 원 -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
        <circle cx="${cx}" cy="${cy}" r="${r * 0.75}" fill="none" stroke="#e2e8f0" stroke-dasharray="3,3" />
        <circle cx="${cx}" cy="${cy}" r="${r * 0.5}" fill="none" stroke="#e2e8f0" stroke-dasharray="3,3" />
        <line x1="${cx}" y1="${cy - r}" x2="${cx}" y2="${cy + r}" stroke="#cbd5e1" />
        <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="#cbd5e1" />

        <!-- 권역 평균 폴리곤 (80점 기준) -->
        <polygon points="${avgPoly}" fill="rgba(148, 163, 184, 0.15)" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3" />

        <!-- 선택 단지 폴리곤 -->
        <polygon points="${aptPoly}" fill="rgba(79, 70, 229, 0.28)" stroke="#4f46e5" stroke-width="2.5" />

        <!-- 꼭짓점 라벨 -->
        <text x="${cx}" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#1e293b">통학안전(${scores.safety})</text>
        <text x="${size - 6}" y="${cy + 4}" text-anchor="end" font-size="11" font-weight="800" fill="#1e293b">의료(${scores.medical})</text>
        <text x="${cx}" y="${size - 6}" text-anchor="middle" font-size="11" font-weight="800" fill="#1e293b">보육(${scores.childcare})</text>
        <text x="6" y="${cy + 4}" text-anchor="start" font-size="11" font-weight="800" fill="#1e293b">문화(${scores.culture})</text>
      </svg>
    `;
  }

  renderParentReviews(apt) {
    const listEl = document.getElementById('parent-reviews-list');
    if (!listEl) return;

    const reviews = apt.reviews || [];
    listEl.innerHTML = reviews
      .map(
        (rv) => `
        <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
          <div class="flex items-center justify-between text-xs">
            <span class="font-extrabold text-slate-800">${rv.author}</span>
            <span class="text-amber-500 font-bold">★ ${rv.rating} <span class="text-slate-400 font-normal ml-1">${rv.date}</span></span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${rv.text}</p>
        </div>
      `
      )
      .join('');
  }

  submitParentReview(event) {
    event.preventDefault();
    const authorInput = document.getElementById('review-author-input');
    const ratingInput = document.getElementById('review-rating-input');
    const textInput = document.getElementById('review-text-input');

    const apt = this.getSelectedApartment();
    const newReview = {
      author: authorInput.value.trim(),
      rating: parseFloat(ratingInput.value).toFixed(1),
      text: textInput.value.trim(),
      date: '방금 전'
    };

    apt.reviews.unshift(newReview);
    if (!this.customReviews[apt.id]) this.customReviews[apt.id] = [];
    this.customReviews[apt.id].unshift(newReview);
    localStorage.setItem(this.reviewsKey, JSON.stringify(this.customReviews));

    authorInput.value = '';
    textInput.value = '';
    this.renderParentReviews(apt);
    this.showToast('학부모 한 줄 통학·보육 후기가 등록되었습니다!');
  }

  loadCustomReviews() {
    try {
      const raw = localStorage.getItem(this.reviewsKey);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  loadCustomReviewsIntoData() {
    Object.entries(this.customReviews).forEach(([aptId, rvs]) => {
      const apt = this.data.apartments.find((a) => a.id === aptId);
      if (apt && Array.isArray(rvs)) {
        apt.reviews = [...rvs, ...apt.reviews];
      }
    });
  }

  // 딥링크 복사
  copyApartmentDeepLink() {
    const apt = this.getSelectedApartment();
    const shareUrl = `${window.location.origin}${window.location.pathname}?apt=${apt.code}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        this.showToast(`우리 단지 고유 리포트 링크가 복사되었습니다! (${shareUrl})`);
      });
    } else {
      this.showToast(`공유 URL: ${shareUrl}`);
    }
  }

  // HTML5 Canvas를 활용한 고해상도 카드뉴스 PNG 다운로드
  downloadReportCardPng() {
    const apt = this.getSelectedApartment();
    const sch = apt.school;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    // 배경 그라데이션
    const grad = ctx.createLinearGradient(0, 0, 1080, 720);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.55, '#1e3a8a');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 720);

    // 헤더 배지
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(60, 55, 340, 38);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('아이키움 맵 (KidsInfra) 공식 리포트', 78, 81);

    // 아파트명 & 주소
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px sans-serif';
    ctx.fillText(apt.name, 60, 155);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '22px sans-serif';
    ctx.fillText(`${apt.address} (${apt.households.toLocaleString()}세대 · ${apt.builtYear}년)`, 60, 195);

    // 종합 점수 박스
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(800, 60, 220, 140);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText(`${apt.scores.total}점 (${apt.scores.grade})`, 820, 145);
    ctx.fillStyle = '#e0e7ff';
    ctx.font = '18px sans-serif';
    ctx.fillText('아이키움 종합 인덱스', 828, 90);

    // 한줄 요약
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(60, 230, 960, 64);
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`“${apt.scores.summaryTag}”`, 85, 270);

    // 4대 영역 상세 카드
    const boxes = [
      { title: '1. 초품아 통학 안전성', score: `${apt.scores.safety}점`, line1: `배정초: ${sch.name} (도보 ${sch.walkMin}분 / ${sch.distanceM}m)`, line2: `차도 횡단 ${sch.crosswalkCount}회 · 스쿨존 CCTV ${sch.schoolZoneCctvCount}대` },
      { title: '2. 야간·응급 소아의료', score: `${apt.scores.medical}점`, line1: `반경 2km 달빛어린이병원 & 소아응급실 인접`, line2: `심야·공휴일 지킴이 약국 실시간 연동` },
      { title: '3. 보육 & 학원가 접근성', score: `${apt.scores.childcare}점`, line1: `늘봄학교 수용률 ${sch.afterSchoolCareRate}% · 국공립 야간연장`, line2: `인근 학원가 ${apt.academyCount}개 · 전용84㎡ ${apt.prices.sale84}` },
      { title: '4. 공공도서관 & 생태문화', score: `${apt.scores.culture}점`, line1: `어린이도서관 도보권 & 유아숲체험원 인접`, line2: `판교 ${apt.commute.pangyoMin}분 / 강남 ${apt.commute.gangnamMin}분 출퇴근` }
    ];

    boxes.forEach((b, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 60 + col * 490;
      const y = 325 + row * 155;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
      ctx.fillRect(x, y, 470, 135);

      ctx.fillStyle = '#93c5fd';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`${b.title} — ${b.score}`, x + 24, y + 40);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(b.line1, x + 24, y + 78);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '18px sans-serif';
      ctx.fillText(b.line2, x + 24, y + 110);
    });

    // 하단 푸터
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px sans-serif';
    ctx.fillText(`공공데이터 기반 육아 인프라 리포트 | https://ittechkjh.github.io/kids/?apt=${apt.code}`, 60, 680);

    const link = document.createElement('a');
    link.download = `아이키움리포트_${apt.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.showToast('맘카페·단톡방 공유용 고화질 리포트 카드(PNG)가 저장되었습니다!');
  }

  // ==========================================
  // TAB 3: 단지 1:1 비교 배틀
  // ==========================================
  renderBattleComparison() {
    const container = document.getElementById('battle-comparison-content');
    const selA = document.getElementById('battle-apt-a');
    const selB = document.getElementById('battle-apt-b');
    if (!container || !selA || !selB) return;

    const aptA = this.data.apartments.find((a) => a.id === selA.value) || this.data.apartments[0];
    const aptB = this.data.apartments.find((a) => a.id === selB.value) || this.data.apartments[2];

    const metrics = [
      {
        label: '아이키움 종합 점수',
        valA: `${aptA.scores.total}점 (${aptA.scores.grade})`,
        valB: `${aptB.scores.total}점 (${aptB.scores.grade})`,
        win: aptA.scores.total >= aptB.scores.total ? (aptA.scores.total === aptB.scores.total ? 'draw' : 'A') : 'B'
      },
      {
        label: '배정 초등학교 도보 거리',
        valA: `${aptA.school.name} (${aptA.school.distanceM}m · ${aptA.school.walkMin}분)`,
        valB: `${aptB.school.name} (${aptB.school.distanceM}m · ${aptB.school.walkMin}분)`,
        win: aptA.school.distanceM <= aptB.school.distanceM ? (aptA.school.distanceM === aptB.school.distanceM ? 'draw' : 'A') : 'B'
      },
      {
        label: '통학로 횡단보도 갯수 (적어야 안전)',
        valA: `${aptA.school.crosswalkCount}회 (${aptA.school.isChopuma ? '초품아' : '일반'})`,
        valB: `${aptB.school.crosswalkCount}회 (${aptB.school.isChopuma ? '초품아' : '일반'})`,
        win: aptA.school.crosswalkCount <= aptB.school.crosswalkCount ? (aptA.school.crosswalkCount === aptB.school.crosswalkCount ? 'draw' : 'A') : 'B'
      },
      {
        label: '초등학교 늘봄·돌봄교실 수용률',
        valA: `${aptA.school.afterSchoolCareRate}%`,
        valB: `${aptB.school.afterSchoolCareRate}%`,
        win: aptA.school.afterSchoolCareRate >= aptB.school.afterSchoolCareRate ? 'A' : 'B'
      },
      {
        label: '야간·응급 소아의료 점수',
        valA: `${aptA.scores.medical}점`,
        valB: `${aptB.scores.medical}점`,
        win: aptA.scores.medical >= aptB.scores.medical ? 'A' : 'B'
      },
      {
        label: '인근 학원가 규모',
        valA: `${aptA.academyCount}개 학원`,
        valB: `${aptB.academyCount}개 학원`,
        win: aptA.academyCount >= aptB.academyCount ? 'A' : 'B'
      },
      {
        label: '강남역 기준 출퇴근 소요시간',
        valA: `약 ${aptA.commute.gangnamMin}분`,
        valB: `약 ${aptB.commute.gangnamMin}분`,
        win: aptA.commute.gangnamMin <= aptB.commute.gangnamMin ? 'A' : 'B'
      },
      {
        label: '전용 84㎡ 실거래가 (가성비 우위)',
        valA: `매매 ${aptA.prices.sale84} / 전세 ${aptA.prices.jeonse84}`,
        valB: `매매 ${aptB.prices.sale84} / 전세 ${aptB.prices.jeonse84}`,
        win: aptA.prices.sale84Num <= aptB.prices.sale84Num ? 'A' : 'B'
      }
    ];

    const winsA = metrics.filter((m) => m.win === 'A').length;
    const winsB = metrics.filter((m) => m.win === 'B').length;

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="p-4 rounded-2xl bg-blue-50/70 border-2 ${winsA >= winsB ? 'border-blue-500' : 'border-blue-100'} flex items-center justify-between">
          <div>
            <span class="text-[11px] font-bold text-blue-700">${this.getRegionShortName(aptA.regionId)}</span>
            <h3 class="text-base font-black text-slate-900">${aptA.name}</h3>
            <p class="text-xs text-slate-600 mt-0.5">${aptA.scores.summaryTag}</p>
          </div>
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs">${winsA}개 지표 우위</span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-indigo-50/70 border-2 ${winsB >= winsA ? 'border-indigo-500' : 'border-indigo-100'} flex items-center justify-between">
          <div>
            <span class="text-[11px] font-bold text-indigo-700">${this.getRegionShortName(aptB.regionId)}</span>
            <h3 class="text-base font-black text-slate-900">${aptB.name}</h3>
            <p class="text-xs text-slate-600 mt-0.5">${aptB.scores.summaryTag}</p>
          </div>
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs">${winsB}개 지표 우위</span>
          </div>
        </div>
      </div>

      <div class="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
        ${metrics
          .map(
            (m) => `
          <div class="grid grid-cols-12 items-center py-3 px-4 bg-white hover:bg-slate-50/80">
            <div class="col-span-4 font-bold ${m.win === 'A' ? 'text-blue-700' : 'text-slate-600'} flex items-center gap-1.5">
              ${m.win === 'A' ? '<span class="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-black">WIN</span>' : ''}
              <span>${m.valA}</span>
            </div>
            <div class="col-span-4 text-center font-extrabold text-slate-800 bg-slate-100/80 py-1.5 rounded-xl px-2">
              ${m.label}
            </div>
            <div class="col-span-4 text-right font-bold ${m.win === 'B' ? 'text-indigo-700' : 'text-slate-600'} flex items-center justify-end gap-1.5">
              <span>${m.valB}</span>
              ${m.win === 'B' ? '<span class="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-black">WIN</span>' : ''}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  // ==========================================
  // TAB 4: 긴급 소아의료 & 응급 대처 가이드 & 해열제 계산기
  // ==========================================
  setMedicalTimeSim(mode) {
    this.api.timeSimMode = mode;
    document.querySelectorAll('.med-sim-btn').forEach((btn) => {
      const active = btn.getAttribute('data-sim') === mode;
      btn.className = active
        ? 'med-sim-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-rose-900 shadow'
        : 'med-sim-btn px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:bg-white/15';
    });
    this.renderMedicalSection();
    this.refreshMapLayers();
  }

  setMedicalCategoryFilter(cat) {
    this.medicalCategoryFilter = cat;
    document.querySelectorAll('.med-cat-btn').forEach((btn) => {
      const active = btn.getAttribute('data-medcat') === cat;
      btn.className = active
        ? 'med-cat-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white'
        : 'med-cat-btn px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700';
    });
    this.renderMedicalSection();
  }

  renderMedicalSection() {
    const timeInfo = this.api.getSimulatedTimeInfo();
    const clockBadge = document.getElementById('medical-sim-clock-badge');
    if (clockBadge) clockBadge.textContent = `⏱️ ${timeInfo.label}`;

    const openOnly = document.getElementById('med-open-now-only')?.checked ?? true;
    const container = document.getElementById('medical-list-container');
    if (!container) return;

    // 현재 거점 우선 정렬 + 전체 거점 표시
    let list = [...this.data.medicalFacilities].sort((a, b) => {
      const aReg = a.regionId === this.currentRegionId ? 0 : 1;
      const bReg = b.regionId === this.currentRegionId ? 0 : 1;
      return aReg - bReg;
    });

    if (this.medicalCategoryFilter !== 'all') {
      list = list.filter((m) => m.category === this.medicalCategoryFilter);
    }

    const evaluated = list
      .map((m) => ({ ...m, status: this.api.evaluateMedicalStatus(m) }))
      .filter((m) => (!openOnly ? true : m.status.isOpen));

    if (evaluated.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl p-6 text-center border border-slate-200 text-xs text-slate-500">
          선택한 시각 조건에 영업 중인 기관이 없습니다. '현재 진료/영업 중인 곳만 표시' 체크를 해제해 보세요.
        </div>
      `;
      return;
    }

    container.innerHTML = evaluated
      .map((med) => {
        const nav = this.api.getNavigationLinks(med);
        const isCurrentRegion = med.regionId === this.currentRegionId;
        return `
          <div class="bg-white rounded-2xl p-4 border ${
            isCurrentRegion ? 'border-rose-200 shadow-sm' : 'border-slate-200'
          } flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                  isCurrentRegion ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                }">${this.getRegionShortName(med.regionId)}</span>
                <span class="px-2 py-0.5 rounded-full text-[11px] font-bold border ${med.status.badgeClass}">
                  ${med.status.statusText}
                </span>
                <span class="text-[11px] font-bold text-indigo-700">${med.subType}</span>
              </div>
              <h4 class="text-sm font-extrabold text-slate-900">${med.name}</h4>
              <p class="text-xs text-slate-500">${med.address} · <strong class="text-slate-700">${med.hoursDesc}</strong></p>
              <p class="text-xs font-bold text-emerald-700"><i class="fa-solid fa-circle-check mr-1"></i>${med.waitStatus}</p>
            </div>

            <div class="flex sm:flex-col gap-1.5 shrink-0">
              <a
                href="${nav.telUrl}"
                class="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <i class="fa-solid fa-phone-volume"></i>
                <span>${med.phone}</span>
              </a>
              <div class="grid grid-cols-2 gap-1.5">
                <a
                  href="${nav.kakaoMapUrl}"
                  target="_blank"
                  class="px-2.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-[11px] text-center"
                >
                  카카오맵 길안내
                </a>
                <a
                  href="${nav.naverMapUrl}"
                  target="_blank"
                  class="px-2.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[11px] text-center"
                >
                  네이버지도
                </a>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 체중별 해열제 1회 정량 및 교차복용 계산기
  calculateAntipyretic() {
    const weightEl = document.getElementById('calc-weight-kg');
    const tempEl = document.getElementById('calc-temp-c');
    const box = document.getElementById('antipyretic-result-box');
    if (!weightEl || !tempEl || !box) return;

    const kg = Math.max(3, Math.min(50, parseFloat(weightEl.value) || 12));
    const temp = parseFloat(tempEl.value) || 38.5;

    // 소아과 표준 용량 기준:
    // 1) 아세트아미노펜 (챔프시럽/타이레놀현탁액 32mg/mL 기준): 1회 10~15mg/kg -> mL로는 약 0.38 ~ 0.45 mL/kg (보통 체중 * 0.4mL)
    // 2) 이부프로펜 (부루펜/챔프이부펜 20mg/mL 기준): 1회 5~10mg/kg -> 체중 * 0.4mL
    // 3) 덱시부프로펜 (맥시부펜 12mg/mL 기준): 1회 5~7mg/kg -> 체중 * 0.45mL
    const acetMl = (kg * 0.4).toFixed(1);
    const ibuMl = (kg * 0.4).toFixed(1);
    const dexMl = (kg * 0.45).toFixed(1);

    let tempAlert = '';
    if (temp >= 39.5) {
      tempAlert = `<div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-bold">🚨 39.5℃ 이상 고열입니다. 해열제 복용 후에도 아이가 처지거나 1시간 내 열이 떨어지지 않으면 즉시 달빛병원/응급실을 방문하세요.</div>`;
    } else if (temp >= 38.5) {
      tempAlert = `<div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold">🌡️ 38.5℃ 이상 발열로 해열제 정량 복용이 권장됩니다. 복용 2시간 후에도 38.5℃ 이상이면 다른 계열로 교차복용이 가능합니다.</div>`;
    } else {
      tempAlert = `<div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">✅ 38.5℃ 미만의 미열은 아이가 보채지 않으면 미온수 수분 보충 후 경과를 지켜볼 수 있습니다.</div>`;
    }

    box.innerHTML = `
      ${tempAlert}
      <div class="grid grid-cols-1 gap-2 pt-1">
        <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
          <div>
            <div class="font-extrabold text-blue-950">① 아세트아미노펜 계열 (챔프빨강·타이레놀현탁액)</div>
            <div class="text-[11px] text-slate-500">생후 4개월 이상 · 4~6시간 간격 (일 최대 5회)</div>
          </div>
          <span class="text-sm font-black text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">1회 ${acetMl} mL</span>
        </div>

        <div class="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
          <div>
            <div class="font-extrabold text-indigo-950">② 이부프로펜 / 덱시부프로펜 (챔프파랑·맥시부펜)</div>
            <div class="text-[11px] text-slate-500">생후 6개월 이상 · 6~8시간 간격 (①번과 2시간 간격 교차 가능)</div>
          </div>
          <span class="text-sm font-black text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200">1회 ${ibuMl} ~ ${dexMl} mL</span>
        </div>
      </div>
      <p class="text-[11px] text-slate-400">* 제품별 농도(mg/mL)가 다를 수 있으므로 포장지의 체중별 용량표를 반드시 함께 확인하세요.</p>
    `;
  }

  renderEmergencyGuides() {
    const container = document.getElementById('emergency-guides-list');
    if (!container) return;

    container.innerHTML = this.data.emergencyGuides
      .map(
        (g) => `
        <div class="p-3.5 rounded-2xl border ${
          g.urgency === 'critical' ? 'bg-rose-50/50 border-rose-200' : 'bg-amber-50/50 border-amber-200'
        } space-y-1.5">
          <div class="flex items-center justify-between gap-2">
            <span class="font-extrabold text-xs text-slate-900">${g.title}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
              g.urgency === 'critical' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
            }">${g.badge}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${g.action}</p>
          <div class="flex flex-wrap gap-1 pt-1">
            ${g.checklist
              .map(
                (c) => `<span class="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">✓ ${c}</span>`
              )
              .join('')}
          </div>
        </div>
      `
      )
      .join('');
  }

  // ==========================================
  // TAB 5: 주말 나들이 & 도서관 인기도서 큐레이션
  // ==========================================
  setBookAgeFilter(age) {
    this.bookAgeFilter = age;
    document.querySelectorAll('.book-age-btn').forEach((btn) => {
      const active = btn.getAttribute('data-bookage') === age;
      btn.className = active
        ? 'book-age-btn px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-sm'
        : 'book-age-btn px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600';
    });
    this.renderCultureSection();
  }

  renderCultureSection() {
    const region = this.data.regions.find((r) => r.id === this.currentRegionId);
    const libRegionEl = document.getElementById('library-region-name');
    if (libRegionEl && region) libRegionEl.textContent = `· ${region.shortName} 거점 도서관 실시간 연동`;

    // 거점 대표 도서관 카드
    const lib = this.data.libraries.find((l) => l.regionId === this.currentRegionId) || this.data.libraries[0];
    const libCard = document.getElementById('featured-library-card');
    if (libCard && lib) {
      const nav = this.api.getNavigationLinks(lib);
      libCard.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div class="text-xs font-extrabold text-purple-950 flex items-center gap-1.5">
              <i class="fa-solid fa-building-columns text-purple-600"></i>
              <span>내 주변 거점 도서관: ${lib.name} (단지에서 ${lib.distanceM}m)</span>
            </div>
            <p class="text-xs text-purple-800 mt-0.5">${lib.specialFeature} · 운영: ${lib.hours}</p>
          </div>
          <a href="${nav.kakaoMapUrl}" target="_blank" class="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shrink-0 text-center">
            도서관 위치 보기
          </a>
        </div>
      `;
    }

    // 인기도서 리스트
    const bookListEl = document.getElementById('popular-books-list');
    if (bookListEl) {
      let books = this.data.popularBooks;
      if (this.bookAgeFilter !== 'all') {
        books = books.filter((b) => b.ageGroup === this.bookAgeFilter);
      }

      bookListEl.innerHTML = books
        .map((book) => {
          const stock = book.stockByRegion[this.currentRegionId] || { available: true, copiesLeft: 2, shelf: '어린이자료실' };
          return `
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="space-y-1">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-extrabold text-[10px]">${book.ageLabel} ${book.rank}위</span>
                  <span class="text-[11px] text-slate-400 font-semibold">최근 30일 대출 ${book.loanCount30d.toLocaleString()}회</span>
                </div>
                <h4 class="text-sm font-extrabold text-slate-900">📖 ${book.title}</h4>
                <p class="text-xs text-slate-500">${book.author} · ISBN ${book.isbn}</p>
                <div class="flex flex-wrap gap-1 pt-0.5">
                  ${book.tags
                    .map((t) => `<span class="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-bold text-slate-600">#${t}</span>`)
                    .join('')}
                </div>
              </div>

              <div class="sm:text-right shrink-0 space-y-1">
                <span class="inline-block px-2.5 py-1 rounded-full text-xs font-extrabold ${
                  stock.available
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }">
                  ${stock.available ? `✅ 대출 가능 (잔여 ${stock.copiesLeft}권)` : '⏳ 대출중 (예약 가능)'}
                </span>
                <div class="text-[11px] text-slate-500 font-medium">${stock.shelf}</div>
              </div>
            </div>
          `;
        })
        .join('');
    }

    // 주말 나들이 행사 캘린더
    const eventsEl = document.getElementById('culture-events-list');
    if (eventsEl) {
      const sortedEvents = [...this.data.cultureEvents].sort((a, b) => {
        const aReg = a.regionId === this.currentRegionId ? 0 : 1;
        const bReg = b.regionId === this.currentRegionId ? 0 : 1;
        return aReg - bReg;
      });

      eventsEl.innerHTML = sortedEvents
        .map((ev) => {
          const isCurr = ev.regionId === this.currentRegionId;
          return `
            <div class="p-4 rounded-2xl border ${
              isCurr ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200/80'
            } space-y-1.5">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]">${this.getRegionShortName(ev.regionId)}</span>
                  <span class="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold text-[10px]">${ev.ageBadge}</span>
                </div>
                <span class="text-[11px] font-extrabold text-emerald-700">${ev.fee}</span>
              </div>
              <h4 class="text-sm font-extrabold text-slate-900">${ev.title}</h4>
              <p class="text-xs text-slate-600"><i class="fa-solid fa-location-dot text-slate-400 mr-1"></i>${ev.place} · ${ev.dateStr}</p>
              <div class="flex items-center justify-between pt-1">
                <span class="text-[11px] font-bold text-indigo-700">${ev.status}</span>
                <a href="${ev.url}" target="_blank" rel="noopener" class="text-xs font-extrabold text-blue-600 hover:underline">
                  지자체 예약 안내 →
                </a>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // ==========================================
  // TAB 6: 맞벌이 육아 타임라인 시뮬레이터
  // ==========================================
  runTimelineSimulation() {
    const out = document.getElementById('timeline-simulation-output');
    if (!out) return;

    const aptId = document.getElementById('sim-apt-select')?.value || this.selectedAptId;
    const stage = document.getElementById('sim-child-stage')?.value || 'daycare';
    const departHour = parseFloat(document.getElementById('sim-morning-depart')?.value || '8.5');
    const arriveHour = parseFloat(document.getElementById('sim-evening-arrive')?.value || '19.5');
    const workHub = document.getElementById('sim-work-hub')?.value || 'pangyo';

    const apt = this.data.apartments.find((a) => a.id === aptId) || this.getSelectedApartment();
    const dc = this.data.daycares.find((d) => d.aptId === apt.id) || this.data.daycares[0];

    const commuteMin =
      workHub === 'pangyo'
        ? apt.commute.pangyoMin
        : workHub === 'gangnam'
        ? apt.commute.gangnamMin
        : apt.commute.gwanghwamunMin;

    // 기관 기본/연장 운영 종료 시각
    const regularEndHour = stage === 'daycare' ? 16.0 : 14.5; // 어린이집 기본보육 16시, 초등 정규수업 14:30
    const extendedEndHour = stage === 'daycare' ? 21.5 : 20.0; // 야간연장 어린이집 21:30, 초등 늘봄학교 20:00

    const careGapHours = Math.max(0, arriveHour - extendedEndHour);
    const needExtendedHours = Math.max(0, arriveHour - regularEndHour);

    const formatH = (h) => {
      const hh = Math.floor(h);
      const mm = Math.round((h - hh) * 60);
      return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    };

    out.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div class="lg:col-span-8 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-extrabold text-slate-900">
              📅 ${apt.name} 맞벌이 하루 돌봄 타임라인 (07:30 ~ 22:00)
            </h3>
            <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${
              careGapHours === 0
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }">
              ${careGapHours === 0 ? '✅ 돌봄 공백 없음 (단지 내 인프라 100% 커버)' : `⚠️ 저녁 돌봄 공백 ${careGapHours * 60}분 발생`}
            </span>
          </div>

          <!-- 타임라인 바 -->
          <div class="space-y-2 text-xs">
            <div class="grid grid-cols-12 gap-1 text-[10px] font-bold text-slate-400 text-center">
              <div class="col-span-2">07:30~09:00</div>
              <div class="col-span-4">09:00~${formatH(regularEndHour)}</div>
              <div class="col-span-4">${formatH(regularEndHour)}~${formatH(arriveHour)}</div>
              <div class="col-span-2">${formatH(arriveHour)}~22:00</div>
            </div>

            <div class="grid grid-cols-12 gap-1.5 h-12">
              <div class="col-span-2 rounded-xl bg-blue-600 text-white font-bold flex flex-col items-center justify-center p-1 text-[11px]">
                <span>안심 등원·출근</span>
                <span class="text-[10px] opacity-85">${formatH(departHour)} 출발</span>
              </div>
              <div class="col-span-4 rounded-xl bg-emerald-600 text-white font-bold flex flex-col items-center justify-center p-1 text-[11px]">
                <span>${stage === 'daycare' ? '어린이집 정규보육' : '초등학교 정규수업'}</span>
                <span class="text-[10px] opacity-85">${stage === 'daycare' ? dc.name : apt.school.name}</span>
              </div>
              <div class="col-span-4 rounded-xl ${
                careGapHours === 0 ? 'bg-indigo-600' : 'bg-rose-600'
              } text-white font-bold flex flex-col items-center justify-center p-1 text-[11px]">
                <span>${stage === 'daycare' ? '🌙 국공립 야간연장 보육' : '🏫 초등 늘봄교실·돌봄'}</span>
                <span class="text-[10px] opacity-85">연장돌봄 ${needExtendedHours.toFixed(1)}시간 활용</span>
              </div>
              <div class="col-span-2 rounded-xl bg-amber-500 text-white font-bold flex flex-col items-center justify-center p-1 text-[11px]">
                <span>하원 & 가족저녁</span>
                <span class="text-[10px] opacity-85">${formatH(arriveHour)} 픽업</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-slate-400 font-bold text-[11px]">출근 전 등원 소요시간</div>
              <div class="text-sm font-black text-slate-900 mt-0.5">도보 ${apt.school.walkMin}분 (차도횡단 ${apt.school.crosswalkCount}회)</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-slate-400 font-bold text-[11px]">선택 업무지구 편도 통근</div>
              <div class="text-sm font-black text-blue-700 mt-0.5">약 ${commuteMin}분 소요</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-slate-400 font-bold text-[11px]">연장돌봄 가용 시각</div>
              <div class="text-sm font-black text-emerald-700 mt-0.5">${formatH(extendedEndHour)}까지 안심 케어</div>
            </div>
          </div>
        </div>

        <!-- 우측 맞춤 솔루션 박스 -->
        <div class="lg:col-span-4 bg-indigo-950 text-white rounded-2xl p-5 flex flex-col justify-between space-y-3">
          <div class="space-y-2">
            <span class="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">맞벌이 맞춤 솔루션</span>
            <h4 class="text-base font-extrabold">${apt.name} 돌봄 매칭</h4>
            <p class="text-xs text-indigo-200 leading-relaxed">
              ${
                stage === 'daycare'
                  ? `단지 인근 <strong>${dc.name}</strong>(${dc.openHours})에서 저녁 식사 제공 및 야간연장 보육을 운영하여 ${formatH(arriveHour)} 귀가 시에도 추가 시터 비용 없이 하원이 가능합니다.`
                  : `배정학교인 <strong>${apt.school.name}</strong>의 늘봄·돌봄교실 수용률이 <strong>${apt.school.afterSchoolCareRate}%</strong>에 달하며, 단지 내 도보 ${apt.school.walkMin}분 초품아 동선으로 학원 셔틀 및 하교 안전성이 매우 높습니다.`
              }
            </p>
          </div>
          <button onclick="app.switchTab('map')" class="w-full py-2.5 rounded-xl bg-white text-indigo-950 font-extrabold text-xs hover:bg-amber-300 transition">
            지도에서 등하원 동선 확인하기 →
          </button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 관심단지 즐겨찾기 & API 설정 모달 관리
  // ==========================================
  loadFavorites() {
    try {
      const raw = localStorage.getItem(this.favoritesKey);
      return raw ? JSON.parse(raw) : ['apt-pangyo-1', 'apt-songpa-1'];
    } catch {
      return ['apt-pangyo-1'];
    }
  }

  toggleFavorite(aptId) {
    if (this.favorites.includes(aptId)) {
      this.favorites = this.favorites.filter((id) => id !== aptId);
      this.showToast('관심단지 알림장에서 제외되었습니다.');
    } else {
      this.favorites.push(aptId);
      this.showToast('관심단지 알림장에 저장되었습니다!');
    }
    localStorage.setItem(this.favoritesKey, JSON.stringify(this.favorites));
    this.updateFavBadges();
    this.renderSelectedApartmentPanel();
  }

  updateFavBadges() {
    const b1 = document.getElementById('fav-count-badge');
    const b2 = document.getElementById('fav-count-badge-mobile');
    if (b1) b1.textContent = this.favorites.length;
    if (b2) b2.textContent = this.favorites.length;
  }

  toggleFavoritesModal() {
    const modal = document.getElementById('favorites-modal');
    if (!modal) return;
    modal.classList.toggle('hidden');

    if (!modal.classList.contains('hidden')) {
      const listEl = document.getElementById('favorites-list-container');
      const favApts = this.data.apartments.filter((a) => this.favorites.includes(a.id));
      if (favApts.length === 0) {
        listEl.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">저장된 관심 단지가 없습니다.</div>`;
      } else {
        listEl.innerHTML = favApts
          .map(
            (a) => `
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
              <div>
                <div class="text-xs font-extrabold text-slate-900">${a.name}</div>
                <div class="text-[11px] text-slate-500">🏫 ${a.school.name} (도보 ${a.school.walkMin}분) · 매매 ${a.prices.sale84}</div>
              </div>
              <div class="flex items-center gap-1.5">
                <button onclick="app.selectApartment('${a.id}', true); app.toggleFavoritesModal();" class="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs">이동</button>
                <button onclick="app.toggleFavorite('${a.id}'); app.toggleFavoritesModal();" class="p-1.5 text-slate-400 hover:text-rose-600"><i class="fa-solid fa-trash-can text-xs"></i></button>
              </div>
            </div>
          `
          )
          .join('');
      }
    }
  }

  toggleApiModal() {
    const modal = document.getElementById('api-config-modal');
    if (!modal) return;
    modal.classList.toggle('hidden');

    if (!modal.classList.contains('hidden')) {
      const cfg = this.api.config;
      document.getElementById('cfg-proxy-url').value = cfg.proxyUrl || '';
      document.getElementById('cfg-datagokr-key').value = cfg.dataGoKrKey || '';
      document.getElementById('cfg-library-key').value = cfg.data4LibraryKey || '';
      document.getElementById('cfg-kakao-key').value = cfg.kakaoJsKey || '';
    }
  }

  saveApiModalConfig() {
    this.api.saveConfig({
      proxyUrl: document.getElementById('cfg-proxy-url').value.trim(),
      dataGoKrKey: document.getElementById('cfg-datagokr-key').value.trim(),
      data4LibraryKey: document.getElementById('cfg-library-key').value.trim(),
      kakaoJsKey: document.getElementById('cfg-kakao-key').value.trim()
    });
    this.updateApiStatusBadge();
    this.toggleApiModal();
    this.showToast('하이브리드 API 및 프록시 설정이 저장되었습니다.');
  }

  updateApiStatusBadge() {
    const dot = document.getElementById('api-mode-dot');
    if (!dot) return;
    if (this.api.isLiveApiConfigured()) {
      dot.className = 'w-2 h-2 rounded-full bg-blue-400 animate-ping';
    } else {
      dot.className = 'w-2 h-2 rounded-full bg-emerald-400';
    }
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className =
      'bg-slate-900/95 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 transition-all';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new KidsInfraApp();
  window.app.init();
});
