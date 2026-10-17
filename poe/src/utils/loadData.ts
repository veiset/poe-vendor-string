import type {ItemBase, ItemRegex} from "@poe/types/generated/item";
import type {BeastRegex} from "@poe/types/generated/beast";
import type {BoatModsRegex} from "@poe/types/generated/boatmods";
import type {Expedition} from "@poe/types/generated/expedition";
import type {Jewel} from "@poe/types/generated/jewel";
import type {MapModsRegex} from "@poe/types/generated/mapmods";
import type {Scarabs} from "@poe/types/generated/scarabs";
import type {GemsRegex} from "@poe/types/generated/gems";
import {createLanguageDataLoader} from "@shared/core/LanguageDataLoader";
import {fetchGeneratedFile} from "@shared/generatedData";
import {hasItem} from "@shared/core/item/RebaseItemSettings";
import type {Itembase} from "@shared/core/item/ItemBaseSelector";

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

const itemBasetypes = createLanguageDataLoader<string, ItemBase[]>((language) =>
  fetchGeneratedFile<ItemBase[]>(`item/Generated.Basetypes.Item.${language}.min.json`),
);

const itemRegex = createLanguageDataLoader<string, ItemRegex[]>((language) =>
  fetchGeneratedFile<ItemRegex[]>(`item/Generated.Item.${language}.min.json`),
);

const boatMods = createLanguageDataLoader<string, BoatModsRegex>((language) =>
  fetchGeneratedFile<BoatModsRegex>(`boatmods/Generated.BoatMods.${language}.min.json`),
);
const expedition = lazy(() => fetchGeneratedFile<Expedition>(`expedition/Generated.Expedition.min.json`));
const jewel = lazy(() => fetchGeneratedFile<Jewel>(`jewel/Generated.Jewel.min.json`));
const beastRegexes = createLanguageDataLoader<string, BeastRegex>((language) =>
  fetchGeneratedFile<BeastRegex>(`beast/Generated.BeastRegex.${language}.min.json`),
);
const scarabData = createLanguageDataLoader<string, Scarabs>((language) =>
  fetchGeneratedFile<Scarabs>(`scarabs/Generated.Scarabs.${language}.min.json`),
);
const mapMods = createLanguageDataLoader<string, MapModsRegex>((language) =>
  fetchGeneratedFile<MapModsRegex>(`mapmods/Generated.Map.${language}.min.json`),
);
const gems = createLanguageDataLoader<string, GemsRegex>((language) =>
  fetchGeneratedFile<GemsRegex>(`gems/Generated.Gems.${language}.min.json`),
);

export const loadItemBasetypes = (language: string): Promise<ItemBase[]> => itemBasetypes(language);
export const loadItemRegex = (language: string): Promise<ItemRegex[]> => itemRegex(language);

// Item settings saved before items were localized hold English names
export const itemSettingsLanguage = async (language: string, itembase: Itembase | undefined): Promise<string> =>
  hasItem(await loadItemBasetypes(language), itembase) ? language : "ENGLISH";

export const loadBeastRegex = (language: string): Promise<BeastRegex> => beastRegexes(language);
export const loadBoatMods = (language: string): Promise<BoatModsRegex> => boatMods(language);
export const loadExpedition = (): Promise<Expedition> => expedition();
export const loadJewel = (): Promise<Jewel> => jewel();
export const loadScarabs = (language: string): Promise<Scarabs> => scarabData(language);
export const loadMapMods = (language: string): Promise<MapModsRegex> => mapMods(language);
export function loadGems(language = "ENGLISH"): Promise<GemsRegex> {
  return gems(language);
}
