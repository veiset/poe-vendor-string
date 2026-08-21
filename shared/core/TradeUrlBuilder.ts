import {economyUrl} from "@shared/economy";

export type Game = "poe1" | "poe2";

const TRADE_BASE = {
  poe1: "https://www.pathofexile.com/trade/search",
  poe2: "https://www.pathofexile.com/trade2/search",
} satisfies Record<Game, string>;

export const tradeSearchBase = (game: Game): string => TRADE_BASE[game];

export async function getLeagues(game: Game): Promise<string[]> {
  const endpoint = game === "poe2" ? "poe2-leagues.txt" : "leagues.txt";
  const response = await fetch(economyUrl(endpoint));
  if (!response.ok) {
    throw new Error(`Failed to fetch leagues: ${response.status}`);
  }
  const leagues = (await response.text()).split(/\r?\n/).map((league) => league.trim()).filter(Boolean);
  if (leagues.length === 0) {
    throw new Error(`League file was empty: ${endpoint}`);
  }
  return leagues;
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
