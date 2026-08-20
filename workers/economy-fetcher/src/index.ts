interface Env { ECONOMY: R2Bucket; }

const POE_TRADE_API = "https://www.pathofexile.com/api/trade";
const POE_NINJA_API = "https://poe.ninja";
const ECONOMY_FETCH_CONCURRENCY = 4;
const userAgent = "poe.re/1.0 (https://poe.re)";

interface EconomyFile { key: string; url: string; }
interface TradeLeagueResponse { result?: { id?: string }[]; }

function poeNinjaUrl(path: string, params: Record<string, string>): string {
  const url = new URL(path, POE_NINJA_API);
  url.search = new URLSearchParams(params).toString();
  return url.toString();
}

function economyKey(category: string, league: string, type: string): string {
  return `${category}/eco_${league}_${type}.json`;
}

function economyFiles(leagues: string[]): EconomyFile[] {
  const categories = [
    ["expedition", "UniqueJewel", "/poe1/api/economy/stash/current/item/overview"],
    ["expedition", "UniqueWeapon", "/poe1/api/economy/stash/current/item/overview"],
    ["expedition", "UniqueArmour", "/poe1/api/economy/stash/current/item/overview"],
    ["expedition", "UniqueAccessory", "/poe1/api/economy/stash/current/item/overview"],
    ["beast", "Beast", "/poe1/api/economy/stash/current/item/overview"],
    ["tattoo", "Tattoo", "/poe1/api/economy/exchange/current/overview"],
    ["runegraft", "Runegraft", "/poe1/api/economy/exchange/current/overview"],
    ["scarab", "Scarab", "/poe1/api/economy/exchange/current/overview"],
  ] as const;
  return leagues.flatMap((league) => categories.map(([category, type, path]) => ({
    key: economyKey(category, league, type),
    url: poeNinjaUrl(path, { league, type }),
  })));
}

async function getPoe1Leagues(): Promise<string[]> {
  const response = await fetch(`${POE_TRADE_API}/data/leagues`, {
    headers: { "User-Agent": userAgent },
  });
  if (!response.ok) throw new Error(`Could not fetch PoE leagues: ${response.status}`);
  const data = await response.json() as TradeLeagueResponse;
  const leagues = [...new Set(
    (data.result ?? [])
      .map(({ id }) => id?.trim())
      .filter((id): id is string => Boolean(id))
      .filter((id) => !id.includes("Ruthless")),
  )];
  if (leagues.length === 0) throw new Error("PoE returned no leagues");
  return leagues;
}

async function fetchEconomyFile(
  env: Env,
  key: string,
  url: string,
  cacheExpiry: Date,
): Promise<void> {
  const response = await fetch(url, { headers: { "User-Agent": userAgent } });
  try {
    if (!response.ok || response.body === null) {
      throw new Error(`${key}: poe.ninja returned ${response.status}`);
    }
    try {
      await env.ECONOMY.put(key, response.body, {
        httpMetadata: {
          contentType: "application/json; charset=utf-8",
          cacheControl: "public",
          cacheExpiry,
        },
      });
    } catch (error) {
      throw new Error(
        `${key}: failed to store poe.ninja response from ${url}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  } finally {
    if (!response.bodyUsed && response.body !== null) {
      await response.body.cancel().catch(() => undefined);
    }
  }
}

async function refreshEconomy(env: Env): Promise<void> {
  const executionTime = new Date();
  const cacheExpiry = new Date(executionTime.getTime() + 2 * 60 * 60 * 1000);
  const files = economyFiles(await getPoe1Leagues());
  if (files.length !== new Set(files.map(({ key }) => key)).size) {
    throw new Error("Economy refresh generated duplicate R2 keys");
  }

  const results: PromiseSettledResult<void>[] = [];
  for (let start = 0; start < files.length; start += ECONOMY_FETCH_CONCURRENCY) {
    const batch = files.slice(start, start + ECONOMY_FETCH_CONCURRENCY);
    results.push(...await Promise.allSettled(
      batch.map(({ key, url }) => fetchEconomyFile(env, key, url, cacheExpiry)),
    ));
  }
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length > 0) {
    for (const failure of failures) {
      const error = failure.reason instanceof Error ? failure.reason.message : String(failure.reason);
      console.error(JSON.stringify({ message: "Economy file refresh failed", error }));
    }
    throw new Error(`Economy refresh failed for ${failures.length} file(s)`);
  }
  await env.ECONOMY.put("generated.txt", executionTime.toISOString(), {
    httpMetadata: {
      contentType: "text/plain; charset=utf-8",
      cacheControl: "public",
      cacheExpiry,
    },
  });
}

export default {
  async scheduled(
    _controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    ctx.waitUntil(refreshEconomy(env));
  },

  fetch(): Response {
    return new Response(JSON.stringify({ status: "ok", service: "economy-fetcher" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
