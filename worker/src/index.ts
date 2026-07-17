/**
 * Cloudflare Worker: PoE Trade API Proxy
 *
 * Endpoints:
 *   GET /leagues - Get available leagues
 */

interface Env {
  ALLOWED_ORIGIN: string;
}

const POE_TRADE_API = "https://www.pathofexile.com/api/trade";

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
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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
