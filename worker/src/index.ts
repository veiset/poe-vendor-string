/**
 * Cloudflare Worker: PoE Trade API Proxy
 *
 * Endpoints:
 *   POST /search - Create a trade search and return the search ID (cached via KV)
 *   GET  /leagues - Get available leagues
 *
 * Uses Cloudflare Workers KV to cache search results keyed by the regex string.
 * This avoids hitting the PoE Trade API for identical queries.
 */

interface Env {
  ALLOWED_ORIGIN: string;
  TRADE_CACHE: KVNamespace;
}

interface TradeSearchRequest {
  league: string;
  query: TradeQuery;
  regex?: string;
}

interface TradeQuery {
  query: {
    stats?: {
      type: string;
      filters: { id: string }[];
      value?: { min: number };
    }[];
    filters?: {
      map_filters?: {
        filters?: {
          map_iiq?: { min: number };
          map_packsize?: { min: number };
          map_iir?: { min: number };
        };
      };
    };
  };
}

interface TradeSearchResponse {
  id: string;
}

interface CachedResult {
  url: string;
}

const POE_TRADE_API = "https://www.pathofexile.com/api/trade";
const CACHE_TTL_SECONDS = 7 * 24 * 60 * 60; // 1 week

function getAllowedOrigin(
  requestOrigin: string,
  allowedOrigin: string,
): string {
  if (requestOrigin.startsWith("http://localhost:")) return requestOrigin;
  return allowedOrigin;
}

function corsHeaders(
  requestOrigin: string,
  allowedOrigin: string,
): HeadersInit {
  return {
    "Access-Control-Allow-Origin": getAllowedOrigin(
      requestOrigin,
      allowedOrigin,
    ),
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(
  body: object,
  status: number,
  headers: HeadersInit,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

function handleOptions(origin: string, env: Env): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin, env.ALLOWED_ORIGIN),
  });
}

function logSearch(body: TradeSearchRequest, cacheHit: boolean): void {
  const q = body.query?.query;
  const stats = q?.stats ?? [];
  const mapFilters = q?.filters?.map_filters?.filters;

  const notGroup = stats.find((s) => s.type === "not");
  const andGroup = stats.find((s) => s.type === "and");
  const countGroup = stats.find((s) => s.type === "count");

  const toIds = (group?: { filters: { id: string }[] }) =>
    group?.filters.map((f) => f.id) ?? [];

  console.log({
    event: "search",
    league: body.league,
    cache: cacheHit ? "hit" : "miss",
    regex: body.regex ?? null,
    badModCount: notGroup?.filters.length ?? 0,
    badModIds: toIds(notGroup),
    goodModCount: (andGroup ?? countGroup)?.filters.length ?? 0,
    goodModMode: andGroup ? "all" : countGroup ? "any" : null,
    goodModIds: toIds(andGroup ?? countGroup),
    iiq: mapFilters?.map_iiq?.min ?? null,
    packsize: mapFilters?.map_packsize?.min ?? null,
    iir: mapFilters?.map_iir?.min ?? null,
  });
}

function toCacheKey(league: string, regex?: string): string | null {
  return regex ? `${league}:${regex}` : null;
}

async function getCached(
  env: Env,
  cacheKey: string | null,
): Promise<CachedResult | null> {
  if (!cacheKey) return null;
  return env.TRADE_CACHE.get<CachedResult>(cacheKey, "json");
}

async function putCache(
  env: Env,
  cacheKey: string | null,
  result: CachedResult,
): Promise<void> {
  if (!cacheKey) return;
  await env.TRADE_CACHE.put(cacheKey, JSON.stringify(result), {
    expirationTtl: CACHE_TTL_SECONDS,
  });
}

async function handleSearch(
  request: Request,
  origin: string,
  env: Env,
): Promise<Response> {
  const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

  try {
    const body: TradeSearchRequest = await request.json();

    if (!body.league || !body.query) {
      return jsonResponse(
        { error: "Missing 'league' or 'query' in request body" },
        400,
        headers,
      );
    }

    const cacheKey = toCacheKey(body.league, body.regex);

    const cached = await getCached(env, cacheKey);
    if (cached) {
      logSearch(body, true);
      return jsonResponse({ ...cached, cached: true }, 200, headers);
    }

    logSearch(body, false);
    // Query PoE Trade API
    const poeResponse = await fetch(
      `${POE_TRADE_API}/search/${encodeURIComponent(body.league)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "poe-vendor-string/1.0 (https://poe.re)",
        },
        body: JSON.stringify(body.query),
      },
    );

    if (poeResponse.status === 429) {
      const retryAfter = poeResponse.headers.get("Retry-After") || "60";
      return new Response(
        JSON.stringify({
          error: "Rate limited by PoE API",
          retryAfter: parseInt(retryAfter, 10),
        }),
        {
          status: 429,
          headers: {
            ...headers,
            "Content-Type": "application/json",
            "Retry-After": retryAfter,
          },
        },
      );
    }

    if (!poeResponse.ok) {
      return jsonResponse(
        {
          error: `PoE API error: ${poeResponse.status}`,
          status: poeResponse.status,
        },
        poeResponse.status,
        headers,
      );
    }

    const data: TradeSearchResponse = await poeResponse.json();
    const result: CachedResult = {
      url: `https://www.pathofexile.com/trade/search/${encodeURIComponent(body.league)}/${data.id}`,
    };

    await putCache(env, cacheKey, result);

    return jsonResponse(result, 200, headers);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500, headers);
  }
}

async function handleLeagues(origin: string, env: Env): Promise<Response> {
  const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

  try {
    const poeResponse = await fetch(`${POE_TRADE_API}/data/leagues`, {
      headers: {
        "User-Agent": "poe-vendor-string/1.0 (https://poe.re)",
      },
    });

    if (!poeResponse.ok) {
      return jsonResponse(
        { error: `PoE API error: ${poeResponse.status}` },
        poeResponse.status,
        headers,
      );
    }

    const data = await poeResponse.json();
    return jsonResponse(data as object, 200, headers);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return jsonResponse({ error: message }, 500, headers);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return handleOptions(origin, env);
    }

    if (path === "/search" && request.method === "POST") {
      return handleSearch(request, origin, env);
    }

    if (path === "/leagues" && request.method === "GET") {
      return handleLeagues(origin, env);
    }

    if (path === "/" || path === "/health") {
      return jsonResponse(
        { status: "ok", service: "poe-trade-proxy" },
        200,
        {},
      );
    }

    return jsonResponse({ error: "Not found" }, 404, {});
  },
};
