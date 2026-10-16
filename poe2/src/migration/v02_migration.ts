import {RepoeLanguage} from "@poe/utils/Languages";
import type {RepoeLanguageKey} from "@poe/utils/Languages";
import type {Poe2FavoriteRecord, SelectOption, Settings} from "../settings";
import {loadTabletAffixes, loadWaystoneAffixes} from "../utils/loadData";
import type {ParsedAffix} from "../utils/parseAffixToken";

// v1 -> v2: saved waystone and tablet mods get the ids of the current data (#557).
// The ids changed when the data was regenerated in #536 and again in #549, and saved mods kept their old id.
// Mods saved between those two also have # in their name where the data now has ##.
// A saved mod is matched by id, else by name or regex, and gets the current id, name, regex and ranges.
// Mods that are no longer in the data are dropped, and a mod saved twice is kept once.

type WaystoneMods = Pick<Settings["waystone"], "modifier">;
type TabletMods = Pick<Settings["tablet"], "modifier">;

const languageKey = (language: unknown): RepoeLanguageKey =>
  typeof language === "string" && Object.prototype.hasOwnProperty.call(RepoeLanguage, language)
    ? language as RepoeLanguageKey
    : "ENGLISH";

const plainName = (name: string) => name.replace(/##/g, "#");

const migrateOptions = (options: SelectOption[], data: ParsedAffix[]): SelectOption[] => {
  const migrated = options.flatMap((option) => {
    const mod = data.find((affix) => affix.id === option.id)
      ?? data.find((affix) => plainName(affix.name) === plainName(option.name) || affix.regex === option.regex);
    return mod ? [{...option, id: mod.id, name: mod.name, regex: mod.regex, ranges: mod.ranges}] : [];
  });
  // A mod saved twice keeps its selected copy
  return migrated.filter((option) =>
    option === (migrated.find((e) => e.id === option.id && e.isSelected) ?? migrated.find((e) => e.id === option.id)));
};

const migrateWaystone = async <T extends WaystoneMods>(waystone: T, language: RepoeLanguageKey): Promise<T> => {
  const {wantedMods = [], unwantedMods = []} = waystone.modifier;
  if (wantedMods.length === 0 && unwantedMods.length === 0) return waystone;
  const data = await loadWaystoneAffixes(language);
  return {...waystone, modifier: {
    ...waystone.modifier,
    wantedMods: migrateOptions(wantedMods, data),
    unwantedMods: migrateOptions(unwantedMods, data),
  }};
};

const migrateTablet = async <T extends TabletMods>(tablet: T, language: RepoeLanguageKey): Promise<T> => {
  const {affixes = []} = tablet.modifier;
  if (affixes.length === 0) return tablet;
  const data = await loadTabletAffixes(language);
  return {...tablet, modifier: {...tablet.modifier, affixes: migrateOptions(affixes, data)}};
};

// Favorites saved without a language were saved in English, as in renderPoe2Favorite
const migrateFavorite = async (favorite: Poe2FavoriteRecord): Promise<Poe2FavoriteRecord> => {
  if (!("pageKey" in favorite)) return favorite;
  const configuration = favorite.configuration as {modifier?: object} | null;
  if (!configuration?.modifier) return favorite;
  const language = languageKey(favorite.context?.language);
  if (favorite.pageKey === "waystone") return {...favorite, configuration: await migrateWaystone(configuration as WaystoneMods, language)};
  if (favorite.pageKey === "tablet") return {...favorite, configuration: await migrateTablet(configuration as TabletMods, language)};
  return favorite;
};

export async function migrateV1ToV2(settings: Settings): Promise<Settings> {
  const language = languageKey(settings.language);
  return {
    ...settings,
    waystone: await migrateWaystone(settings.waystone, language),
    tablet: await migrateTablet(settings.tablet, language),
    favorites: Array.isArray(settings.favorites) ? await Promise.all(settings.favorites.map(migrateFavorite)) : settings.favorites,
  };
}
