import {ItemBasetype} from "../types/generated/ItemBasetypesTypedef";
import {ItemRegex} from "../types/generated/ItemTypedef";
import {Token} from "../types/generated/RegexResult";
import {ParsedAffix, parseAffixToken} from "./parseAffixToken";

export type WaystoneAffix = ParsedAffix & { prefix: boolean };
export type TabletAffix = ParsedAffix;
export type TradeStatIdMap = Record<string, string>;

const basePath = "/generated";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status} ${response.statusText}`);
  }
  return response.json() as T;
}

function lazy<T>(load: () => Promise<T>): () => Promise<T> {
  let value: Promise<T> | null = null;
  return () => {
    if (!value) {
      value = load().catch((error) => {
        value = null;
        throw error;
      });
    }
    return value;
  };
}

const itemBasetypes = lazy(() =>
  fetchJson<ItemBasetype[]>(`${basePath}/Generated.Basetypes.Item.json`),
);

const itemRegex = lazy(() =>
  fetchJson<ItemRegex[]>(`${basePath}/Generated.Item.json`),
);

export function loadItemBasetypes(): Promise<ItemBasetype[]> {
  return itemBasetypes();
}

export function loadItemRegex(): Promise<ItemRegex[]> {
  return itemRegex();
}

async function loadAffixTokens(file: string): Promise<Token<{prefix: boolean}>[]> {
  const {tokens} = await fetchJson<{tokens: Token<{prefix: boolean}>[]}>(file);
  return tokens;
}

const tabletAffixes = lazy(async () => {
  const tokens = await loadAffixTokens(`${basePath}/Generated.Tablet.min.json`);
  return tokens.map(parseAffixToken).sort((a, b) => a.name.localeCompare(b.name));
});

const waystoneAffixes = lazy(async () => {
  const tokens = await loadAffixTokens(`${basePath}/Generated.Waystone.min.json`);
  return tokens
    .map((token) => ({...parseAffixToken(token), prefix: token.options.prefix}))
    .sort((a, b) => a.name.localeCompare(b.name));
});

export function loadTabletAffixes(): Promise<TabletAffix[]> {
  return tabletAffixes();
}

export function loadWaystoneAffixes(): Promise<WaystoneAffix[]> {
  return waystoneAffixes();
}

async function loadTradeFile(file: string): Promise<TradeStatIdMap> {
  try {
    return await fetchJson<TradeStatIdMap>(file);
  } catch {
    return {};
  }
}

const waystoneTradeStatIds = lazy(() =>
  loadTradeFile(`${basePath}/trade/WaystoneTradeStatIds.json`),
);

const tabletTradeStatIds = lazy(() =>
  loadTradeFile(`${basePath}/trade/TabletTradeStatIds.json`),
);

export function loadWaystoneTradeStatIds(): Promise<TradeStatIdMap> {
  return waystoneTradeStatIds();
}

export function loadTabletTradeStatIds(): Promise<TradeStatIdMap> {
  return tabletTradeStatIds();
}
