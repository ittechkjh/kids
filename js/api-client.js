// 아이키움 맵 (KidsInfra) - 하이브리드 공공데이터 API 클라이언트 & 시간 시뮬레이션 엔진
class KidsInfraApiClient {
  constructor() {
    this.storageKey = 'kidsinfra_api_config_v1';
    this.config = this.loadConfig();
    this.timeSimMode = 'realtime'; // 'realtime' | 'weekday_night' | 'sunday_afternoon' | 'midnight'
  }

  loadConfig() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('API 설정 로드 실패:', e);
    }
    return {
      proxyUrl: '',
      dataGoKrKey: '',
      data4LibraryKey: '',
      kakaoJsKey: ''
    };
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem(this.storageKey, JSON.stringify(this.config));
    return this.config;
  }

  isLiveApiConfigured() {
    return Boolean(this.config.proxyUrl || this.config.dataGoKrKey || this.config.data4LibraryKey);
  }

  // 현재 시뮬레이션 또는 실시간 시각 기준 요일·시각 반환
  getSimulatedTimeInfo() {
    const now = new Date();
    if (this.timeSimMode === 'weekday_night') {
      return {
        label: '평일 야간 22:30 기준 (시뮬레이션)',
        dayType: 'weekday', // 평일
        hour: 22.5,
        displayTime: '수요일 22:30'
      };
    }
    if (this.timeSimMode === 'sunday_afternoon') {
      return {
        label: '일요일·공휴일 16:00 기준 (시뮬레이션)',
        dayType: 'sunday',
        hour: 16.0,
        displayTime: '일요일 16:00'
      };
    }
    if (this.timeSimMode === 'midnight') {
      return {
        label: '심야 응급 00:30 기준 (시뮬레이션)',
        dayType: 'weekday',
        hour: 24.5,
        displayTime: '심야 00:30'
      };
    }

    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayType = day === 0 ? 'sunday' : day === 6 ? 'saturday' : 'weekday';
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    // 새벽 0시~2시는 심야 연장영업 판단을 위해 24+hour 보조값 제공
    const effectiveHour = hour < 3 ? hour + 24 : hour;

    return {
      label: `현재 실시간 (${dayNames[day]}요일 ${hh}:${mm})`,
      dayType,
      hour: effectiveHour,
      displayTime: `${dayNames[day]}요일 ${hh}:${mm}`
    };
  }

  // 병·의원 및 약국 실시간 영업 상태 판별
  evaluateMedicalStatus(facility) {
    const t = this.getSimulatedTimeInfo();
    if (facility.is24h) {
      return {
        isOpen: true,
        statusText: '24시간 진료중',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      };
    }

    let closeHour = facility.weekdayClose;
    if (t.dayType === 'saturday') closeHour = facility.satClose;
    if (t.dayType === 'sunday') closeHour = facility.sunClose;

    const isOpen = t.hour >= 8.5 && t.hour <= closeHour;
    if (isOpen) {
      const remainHours = Math.max(0, closeHour - t.hour);
      const closeDisplay = closeHour > 24 ? `새벽 0${closeHour - 24}:00` : `${closeHour}:00`;
      return {
        isOpen: true,
        statusText: remainHours <= 1.2 ? `곧 마감 (${closeDisplay}까지)` : `영업중 (${closeDisplay}까지)`,
        badgeClass: remainHours <= 1.2
          ? 'bg-amber-100 text-amber-800 border-amber-300'
          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
      };
    }

    return {
      isOpen: false,
      statusText: '진료 종료',
      badgeClass: 'bg-slate-100 text-slate-500 border-slate-200'
    };
  }

  // 카카오맵 / 네이버지도 길찾기 딥링크 생성
  getNavigationLinks(place) {
    const encodedName = encodeURIComponent(place.name);
    return {
      kakaoMapUrl: `https://map.kakao.com/link/to/${encodedName},${place.lat},${place.lng}`,
      naverMapUrl: `https://map.naver.com/p/search/${encodedName}`,
      telUrl: place.phone ? `tel:${place.phone.replace(/[^0-9]/g, '')}` : '#'
    };
  }

  // Cloudflare Worker 프록시 경유 공공데이터 조회 (설정 시 실시간 호출, 미설정 시 프리셋 즉시 반환)
  async fetchPublicData(endpoint, params = {}) {
    if (!this.config.proxyUrl) {
      return { source: 'preset', data: null };
    }
    try {
      const url = new URL(this.config.proxyUrl.replace(/\/$/, '') + '/' + endpoint);
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
      const res = await fetch(url.toString(), { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return { source: 'live-worker', data: json };
    } catch (err) {
      console.warn(`[KidsInfraAPI] 실시간 프록시 호출 실패(${endpoint}), 내장 검증 데이터로 폴백합니다:`, err.message);
      return { source: 'preset-fallback', data: null };
    }
  }
}

window.kidsInfraApi = new KidsInfraApiClient();
