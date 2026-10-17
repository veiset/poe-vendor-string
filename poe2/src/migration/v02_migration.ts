import {storedLanguage} from "@poe/utils/Languages";
import type {Poe2FavoriteRecord, SelectOption, Settings} from "../settings";
import {loadTabletAffixes, loadWaystoneAffixes} from "../utils/loadData";
import type {ParsedAffix} from "../utils/parseAffixToken";
import type {Language} from "@shared/typedefs/Language";

// v1 -> v2: saved waystone and tablet mods get the ids of the current data (#557).
// The ids changed when the data was regenerated in #536 and again in #549, and saved mods kept their old id.
// Mods saved between those two also have # in their name where the data now has ##.
// A saved mod is matched by id, else by name or regex, and gets the current id, name, regex and ranges.
// Mods that are no longer in the data are dropped, and a mod saved twice is kept once.

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

const migrateWaystone = async (waystone: Settings["waystone"], language: Language): Promise<Settings["waystone"]> => {
  const {wantedMods = [], unwantedMods = []} = waystone.modifier;
  if (wantedMods.length === 0 && unwantedMods.length === 0) return waystone;
  const data = await loadWaystoneAffixes(language);
  return {...waystone, modifier: {
    ...waystone.modifier,
    wantedMods: migrateOptions(wantedMods, data),
    unwantedMods: migrateOptions(unwantedMods, data),
  }};
};

const migrateTablet = async (tablet: Settings["tablet"], language: Language): Promise<Settings["tablet"]> => {
  const {affixes = []} = tablet.modifier;
  if (affixes.length === 0) return tablet;
  const data = await loadTabletAffixes(language);
  return {...tablet, modifier: {...tablet.modifier, affixes: migrateOptions(affixes, data)}};
};

// A favorite's configuration is the page's settings. Favorites saved without a language are English, as in renderPoe2Favorite.
const migrateFavorite = async (favorite: Poe2FavoriteRecord): Promise<Poe2FavoriteRecord> => {
  if (!("pageKey" in favorite) || !(favorite.configuration as {modifier?: object} | null)?.modifier) return favorite;
  const language = storedLanguage(favorite.context?.language);
  if (favorite.pageKey === "waystone") return {...favorite, configuration: await migrateWaystone(favorite.configuration as Settings["waystone"], language)};
  if (favorite.pageKey === "tablet") return {...favorite, configuration: await migrateTablet(favorite.configuration as Settings["tablet"], language)};
  return favorite;
};

export async function migrateV1ToV2(settings: Settings): Promise<Settings> {
  const language = storedLanguage(settings.language);
  return {
    ...settings,
    waystone: await migrateWaystone(settings.waystone, language),
    tablet: await migrateTablet(settings.tablet, language),
    favorites: Array.isArray(settings.favorites) ? await Promise.all(settings.favorites.map(migrateFavorite)) : settings.favorites,
  };
}
