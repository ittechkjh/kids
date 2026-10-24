/**
 * 아이키움 맵 (KidsInfra) - Cloudflare Workers 경량 API 게이트웨이 & 프록시
 * 역할:
 *  1) 공공데이터포털 / 도서관 정보나루 / 보육포털 API Key 은닉
 *  2) 공공 API XML 응답 -> JSON 일괄 변환
 *  3) Cloudflare KV Edge Cache 적용 (일일 트래픽 제한 방지 및 응답 속도 개선)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

// 엔드포인트별 캐시 TTL (초)
const CACHE_TTL = {
  medical: 600,       // 실시간 병의원/달빛어린이병원/약국: 10분
  daycare: 86400,     // 어린이집 정원/현원/교사비율: 24시간
  schoolzone: 604800, // 어린이보호구역/스쿨존: 7일
  library: 3600,      // 도서관 정보나루 인기도서/소장정보: 1시간
  aptTrade: 86400     // 국토교통부 아파트 실거래가: 24시간
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, '');

    try {
      if (path === 'health') {
        return jsonResponse({ ok: true, service: 'KidsInfra Edge Gateway', timestamp: new Date().toISOString() });
      }

      // KV 캐시 키 생성
      const cacheKey = `cache:${path}:${url.searchParams.toString()}`;
      if (env.KIDS_INFRA_KV) {
        const cached = await env.KIDS_INFRA_KV.get(cacheKey, 'json');
        if (cached) {
          return jsonResponse({ ...cached, cached: true });
        }
      }

      let upstreamUrl = '';
      let ttl = 3600;

      switch (path) {
        // 1. 국립중앙의료원 전국 병·의원 및 달빛어린이병원 실시간 운영정보
        case 'medical/hospitals': {
          ttl = CACHE_TTL.medical;
          const q0 = url.searchParams.get('sido') || '경기도';
          const q1 = url.searchParams.get('sigungu') || '성남시 분당구';
          upstreamUrl = `http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey=${encodeURIComponent(env.DATA_GO_KR_API_KEY)}&Q0=${encodeURIComponent(q0)}&Q1=${encodeURIComponent(q1)}&QD=D002&pageNo=1&numOfRows=50`;
          break;
        }

        // 2. 국립중앙의료원 전국 약국 실시간 운영정보
        case 'medical/pharmacies': {
          ttl = CACHE_TTL.medical;
          const q0 = url.searchParams.get('sido') || '경기도';
          const q1 = url.searchParams.get('sigungu') || '성남시 분당구';
          upstreamUrl = `http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=${encodeURIComponent(env.DATA_GO_KR_API_KEY)}&Q0=${encodeURIComponent(q0)}&Q1=${encodeURIComponent(q1)}&pageNo=1&numOfRows=50`;
          break;
        }

        // 3. 보건복지부 어린이집 기본정보 및 교직원·대기 현황
        case 'childcare/daycares': {
          ttl = CACHE_TTL.daycare;
          const arcode = url.searchParams.get('arcode') || '41135';
          upstreamUrl = `http://api.childcare.go.kr/mediate/rest/cpmsapi030/cpmsapi030/request?key=${encodeURIComponent(env.CHILDCARE_API_KEY || env.DATA_GO_KR_API_KEY)}&arcode=${encodeURIComponent(arcode)}`;
          break;
        }

        // 4. 도서관 정보나루 연령별 인기도서 & 도서관별 대출 가능 여부
        case 'culture/popular-books': {
          ttl = CACHE_TTL.library;
          const age = url.searchParams.get('age') || '0'; // 0: 영유아, 6: 초등저, 8: 초등고
          upstreamUrl = `http://data4library.kr/api/loanItemSrch?authKey=${encodeURIComponent(env.DATA4LIBRARY_API_KEY)}&age=${encodeURIComponent(age)}&pageNo=1&pageSize=20&format=json`;
          break;
        }

        // 5. 국토교통부 아파트 매매 실거래가 상세 자료
        case 'realestate/apt-trades': {
          ttl = CACHE_TTL.aptTrade;
          const lawdCd = url.searchParams.get('lawdCd') || '41135';
          const dealYmd = url.searchParams.get('dealYmd') || '202610';
          upstreamUrl = `http://apis.data.go.kr/1613000/RTMSDataSvcAptTradeDev/getRTMSDataSvcAptTradeDev?serviceKey=${encodeURIComponent(env.DATA_GO_KR_API_KEY)}&LAWD_CD=${encodeURIComponent(lawdCd)}&DEAL_YMD=${encodeURIComponent(dealYmd)}&pageNo=1&numOfRows=50`;
          break;
        }

        default:
          return jsonResponse({ error: 'Unknown endpoint', path }, 404);
      }

      const upstreamRes = await fetch(upstreamUrl);
      const rawText = await upstreamRes.text();

      const parsedData = rawText.trim().startsWith('{')
        ? JSON.parse(rawText)
        : xmlToJsonLite(rawText);

      const payload = {
        ok: true,
        endpoint: path,
        updatedAt: new Date().toISOString(),
        data: parsedData
      };

      if (env.KIDS_INFRA_KV) {
        ctx.waitUntil(
          env.KIDS_INFRA_KV.put(cacheKey, JSON.stringify(payload), { expirationTtl: ttl })
        );
      }

      return jsonResponse(payload);
    } catch (err) {
      return jsonResponse({ ok: false, error: err.message }, 500);
    }
  }
};

// 경량 XML -> JSON 파서 (공공데이터포털 표준 <item> 배열 추출)
function xmlToJsonLite(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemBlock = match[1];
    const obj = {};
    const tagRegex = /<([A-Za-z0-9_]+)>([\s\S]*?)<\/\1>/g;
    let tagMatch;
    while ((tagMatch = tagRegex.exec(itemBlock)) !== null) {
      obj[tagMatch[1]] = tagMatch[2].replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    }
    items.push(obj);
  }
  return { totalCount: items.length, items };
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS
    }
  });
}
