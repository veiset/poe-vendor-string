/**
 * Cloudflare Worker: PoE Trade API Proxy
 *
 * Endpoints:
 *   POST /search - Create a trade search and return the search ID
 *   GET  /leagues - Get available leagues
 */

interface Env {
  ALLOWED_ORIGIN: string;
}

interface TradeSearchRequest {
  league: string;
  query: object;
}

interface TradeSearchResponse {
  id: string;
  result: string[];
  total: number;
}

const POE_TRADE_API = "https://www.pathofexile.com/api/trade";

function corsHeaders(origin: string, allowedOrigin: string): HeadersInit {
  const isAllowed = origin === allowedOrigin;

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function handleOptions(request: Request, env: Env): Response {
  const origin = request.headers.get("Origin") || "";
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin, env.ALLOWED_ORIGIN),
  });
}

async function handleSearch(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") || "";
  const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

  try {
    const body: TradeSearchRequest = await request.json();

    if (!body.league || !body.query) {
      return new Response(
        JSON.stringify({
          error: "Missing 'league' or 'query' in request body",
        }),
        {
          status: 400,
          headers: { ...headers, "Content-Type": "application/json" },
        },
      );
    }

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
      return new Response(
        JSON.stringify({
          error: `PoE API error: ${poeResponse.status}`,
          status: poeResponse.status,
        }),
        {
          status: poeResponse.status,
          headers: { ...headers, "Content-Type": "application/json" },
        },
      );
    }

    const data: TradeSearchResponse = await poeResponse.json();

    return new Response(
      JSON.stringify({
        id: data.id,
        total: data.total,
        url: `https://www.pathofexile.com/trade/search/${encodeURIComponent(body.league)}/${data.id}`,
      }),
      {
        status: 200,
        headers: { ...headers, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
}

async function handleLeagues(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") || "";
  const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);

  try {
    const poeResponse = await fetch(`${POE_TRADE_API}/data/leagues`, {
      headers: {
        "User-Agent": "poe-vendor-string/1.0 (https://poe.re)",
      },
    });

    if (!poeResponse.ok) {
      return new Response(
        JSON.stringify({ error: `PoE API error: ${poeResponse.status}` }),
        {
          status: poeResponse.status,
          headers: { ...headers, "Content-Type": "application/json" },
        },
      );
    }

    const data = await poeResponse.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return handleOptions(request, env);
    }

    if (path === "/search" && request.method === "POST") {
      return handleSearch(request, env);
    }

    if (path === "/leagues" && request.method === "GET") {
      return handleLeagues(request, env);
    }

    if (path === "/" || path === "/health") {
      return new Response(
        JSON.stringify({ status: "ok", service: "poe-trade-proxy" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
};
