import type {ItemBase, ItemRegex} from "@shared/typedefs/Item";
import type {RelicRegex} from "@shared/typedefs/poe2/Relic";
import type {TabletRegex} from "@shared/typedefs/poe2/Tablet";
import type {WaystoneRegex} from "@shared/typedefs/poe2/Waystone";
import type {Language} from "@shared/typedefs/Language";
import {ParsedAffix, parseAffixToken} from "./parseAffixToken";
import {createLanguageDataLoader} from "@shared/core/LanguageDataLoader";
import {fetchGeneratedFile} from "@shared/generatedData";

export type WaystoneAffix = ParsedAffix & { prefix: boolean };
export type TabletAffix = ParsedAffix;
export type TradeStatIdMap = Record<string, string>;

// The trade stat ids are still the copies in public/generated/trade, see "Trade stat mappings" in README.md
const tradePath = "/generated/trade";

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

const basetypes = createLanguageDataLoader<Language, ItemBase[]>((language) =>
  fetchGeneratedFile<ItemBase[]>(`item/Generated.Basetypes.Item.${language}.min.json`),
);
const itemRegexes = createLanguageDataLoader<Language, ItemRegex[]>((language) =>
  fetchGeneratedFile<ItemRegex[]>(`item/Generated.Item.${language}.min.json`),
);

export function loadItemBasetypes(language: Language): Promise<ItemBase[]> {
  return basetypes(language);
}

export function loadItemRegex(language: Language): Promise<ItemRegex[]> {
  return itemRegexes(language);
}

const tabletAffixes = createLanguageDataLoader<Language, TabletAffix[]>(async (language) => {
  const {tokens} = await fetchGeneratedFile<TabletRegex>(`tablet/Generated.Tablet.${language}.min.json`);
  return tokens.map((token, sourceIndex) => ({...parseAffixToken(token), sourceIndex})).sort((a, b) => a.name.localeCompare(b.name));
});

const waystoneAffixes = createLanguageDataLoader<Language, WaystoneAffix[]>(async (language) => {
  const {tokens} = await fetchGeneratedFile<WaystoneRegex>(`waystone/Generated.Waystone.${language}.min.json`);
  return tokens.map((token, sourceIndex) => ({...parseAffixToken(token), sourceIndex, prefix: token.options.prefix})).sort((a, b) => a.name.localeCompare(b.name));
});

export function loadTabletAffixes(language: Language): Promise<TabletAffix[]> {
  return tabletAffixes(language);
}

export function loadWaystoneAffixes(language: Language): Promise<WaystoneAffix[]> {
  return waystoneAffixes(language);
}

const relicRegexes = createLanguageDataLoader<Language, RelicRegex[]>((language) =>
  fetchGeneratedFile<RelicRegex[]>(`relic/Generated.Relic.${language}.min.json`),
);

export function loadRelicRegex(language: Language): Promise<RelicRegex[]> {
  return relicRegexes(language);
}

async function loadTradeFile(file: string): Promise<TradeStatIdMap> {
  try {
    return await fetchJson<TradeStatIdMap>(file);
  } catch {
    return {};
  }
}

const waystoneTradeStatIds = lazy(() =>
  loadTradeFile(`${tradePath}/WaystoneTradeStatIds.json`),
);

const tabletTradeStatIds = lazy(() =>
  loadTradeFile(`${tradePath}/TabletTradeStatIds.json`),
);

export function loadWaystoneTradeStatIds(): Promise<TradeStatIdMap> {
  return waystoneTradeStatIds();
}

export function loadTabletTradeStatIds(): Promise<TradeStatIdMap> {
  return tabletTradeStatIds();
}
