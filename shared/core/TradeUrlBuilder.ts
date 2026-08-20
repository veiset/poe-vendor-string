export type Game = "poe1" | "poe2";

const WORKER_URL = import.meta.env.VITE_TRADE_PROXY_URL || "https://league-fetcher.poe-re.workers.dev";
const TRADE_BASE = {
  poe1: "https://www.pathofexile.com/trade/search",
  poe2: "https://www.pathofexile.com/trade2/search",
} satisfies Record<Game, string>;

export const tradeSearchBase = (game: Game): string => TRADE_BASE[game];

export interface LeagueResponse {
  result: { id: string }[];
}

export async function getLeagues(game: Game): Promise<string[]> {
  const endpoint = game === "poe2" ? "/poe2/leagues" : "/leagues";
  const response = await fetch(`${WORKER_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch leagues: ${response.status}`);
  }
  const data = await response.json() as LeagueResponse;
  return data.result.map(({ id }) => id).filter(Boolean);
}

export function challengeLeague(leagues: string[]): string {
  return leagues.find((league) => {
    const name = league.toLowerCase();
    return !["standard", "hardcore", "ruthless", "ssf"].some((variant) => name.includes(variant));
  }) ?? leagues[0] ?? "";
}

export function buildTradeUrl(query: object, league: string, game: Game): string {
  const gamePath = game === "poe2" ? "/poe2" : "";
  const encodedLeague = encodeURIComponent(league);
  const encodedQuery = encodeURIComponent(JSON.stringify(query));
  return `${tradeSearchBase(game)}${gamePath}/${encodedLeague}?q=${encodedQuery}`;
}
