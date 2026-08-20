interface Env {
  ALLOWED_ORIGIN: string;
}

const POE_TRADE_API = "https://www.pathofexile.com/api/trade";
const POE2_TRADE_API = "https://www.pathofexile.com/api/trade2";
const userAgent = "pore.re/1.0 (https://poe.re)";

function parseAllowedOrigins(allowedOrigin: string): string[] {
  return allowedOrigin.split(",").map((origin) => origin.trim()).filter(Boolean);
}

function corsHeaders(requestOrigin: string, allowedOrigins: string[]): HeadersInit {
  const origin = requestOrigin.startsWith("http://localhost:")
    ? requestOrigin
    : allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0];
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function jsonResponse(body: object, status: number, headers: HeadersInit): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

async function handleLeagues(origin: string, env: Env, apiBase: string): Promise<Response> {
  const headers = corsHeaders(origin, parseAllowedOrigins(env.ALLOWED_ORIGIN));
  try {
    const response = await fetch(`${apiBase}/data/leagues`, {
      headers: { "User-Agent": userAgent },
    });
    if (!response.ok) {
      return jsonResponse({ error: `PoE API error: ${response.status}` }, response.status, headers);
    }
    const data = await response.json() as { result?: { id?: string }[] };
    const uniqueLeagues = [...new Set(
      (data.result ?? [])
        .map(({ id }) => id?.trim())
        .filter((id): id is string => Boolean(id))
        .filter((id) => !id.includes("Ruthless")),
    )];
    const filtered = {
      ...data,
      result: uniqueLeagues.map((id) => ({ id })),
    };
    return jsonResponse(filtered, 200, headers);
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500,
      headers,
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin, parseAllowedOrigins(env.ALLOWED_ORIGIN));

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (url.pathname === "/leagues" && request.method === "GET") {
      return handleLeagues(origin, env, POE_TRADE_API);
    }
    if (url.pathname === "/poe2/leagues" && request.method === "GET") {
      return handleLeagues(origin, env, POE2_TRADE_API);
    }
    if (url.pathname === "/" || url.pathname === "/health") {
      return jsonResponse({ status: "ok", service: "league-fetcher" }, 200, {});
    }
    return jsonResponse({ error: "Not found" }, 404, {});
  },
};
