import type {ItemBase, ItemRegex} from "@shared/typedefs/Item";
import type {RelicRegex} from "@shared/typedefs/poe2/Relic";
import type {TabletRegex} from "@shared/typedefs/poe2/Tablet";
import type {WaystoneRegex} from "@shared/typedefs/poe2/Waystone";
import type {Language} from "@shared/typedefs/Language";
import type {TradeIds} from "@shared/typedefs/TradeIds";
import {ParsedAffix, parseAffixToken} from "./parseAffixToken";
import {createLanguageDataLoader} from "@shared/core/LanguageDataLoader";
import {fetchGeneratedFile} from "@shared/generatedData";

export type WaystoneAffix = ParsedAffix & { prefix: boolean };
export type TabletAffix = ParsedAffix;

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

// Without them, a trade search still opens, without the mod filters
const waystoneTradeIds = lazy(() =>
  fetchGeneratedFile<TradeIds>("trade-ids/Generated.TradeIds.Waystone.min.json").catch((): TradeIds => ({})),
);

const tabletTradeIds = lazy(() =>
  fetchGeneratedFile<TradeIds>("trade-ids/Generated.TradeIds.Tablet.min.json").catch((): TradeIds => ({})),
);

export function loadWaystoneTradeIds(): Promise<TradeIds> {
  return waystoneTradeIds();
}

export function loadTabletTradeIds(): Promise<TradeIds> {
  return tabletTradeIds();
}
