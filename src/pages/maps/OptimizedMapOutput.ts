import {MapSettings} from "../../utils/SavedSettings";
import {Regex} from "../../generated/GeneratedTypes";
import {idToRegex, optimizeRegexFromIds} from "../../utils/regex/OptimizeRegexResult";
import {generateNumberRegex} from "../../utils/regex/GenerateNumberRegex";
import {LanguageFiles, MapStaticStatRegex, RepoeLanguageKey} from "../../utils/Languages";

export function generateMapModRegex(settings: MapSettings, regex: Regex<any>, language: RepoeLanguageKey): string {
  const exclusions = generateBadMods(settings, regex, language);
  const inclusions = generateGoodMods(settings, regex, language);
  const statRegex = MapStaticStatRegex[language] ?? MapStaticStatRegex.ENGLISH;
  const quantity = addQuantifier(statRegex.quantity, generateNumberRegex(settings.quantity, settings.optimizeQuant));
  const packsize = addQuantifier(statRegex.packsize, generateNumberRegex(settings.packsize, settings.optimizePacksize));
  const mapDrop = addQuantifier(statRegex.mapdrop, generateNumberRegex(settings.mapDropChance, false));
  const itemRarity = addQuantifier(statRegex.itemrarity, generateNumberRegex(settings.itemRarity, false));
  const quality = qualityQualifier(settings, language);
  const rarity = addRarityRegex(settings.rarity.normal, settings.rarity.magic, settings.rarity.rare, settings.rarity.include, language);
  const corrupted = corruptedMapCheck(settings, language);
  const unidentified = unidentifiedMap(settings, language);

  const result = `${exclusions} ${inclusions} ${quantity} ${packsize} ${itemRarity} ${quality} ${rarity} ${mapDrop} ${corrupted} ${unidentified}`
    .trim().replaceAll(/\s{2,}/g, ' ');

  return optimize(result);
}

function unidentifiedMap(settings: MapSettings, language: RepoeLanguageKey) {
  const statRegex = MapStaticStatRegex[language] ?? MapStaticStatRegex.ENGLISH;
  if (settings.unidentified.enabled) {
    return settings.unidentified.include ? statRegex.unidentified : `!${statRegex.unidentified}`
  }
  return "";
}

function corruptedMapCheck(settings: MapSettings, language: RepoeLanguageKey) {
  const statRegex = MapStaticStatRegex[language] ?? MapStaticStatRegex.ENGLISH;
  if (settings.corrupted.enabled) {
    return settings.corrupted.include ? statRegex.corrupted : `!${statRegex.corrupted}`;
  }
  return "";
}

function qualityQualifier(settings: MapSettings, language: RepoeLanguageKey) {
  const statRegex = MapStaticStatRegex[language] ?? MapStaticStatRegex.ENGLISH;
  function qualityType(type: string) {
    if (type === "regular") return statRegex.quality_regular;
    if (type === "currency") return statRegex.quality_currency;
    if (type === "divination") return statRegex.quality_divination;
    if (type === "rarity") return statRegex.quality_rarity;
    if (type === "pack size") return statRegex.quality_packsize;
    if (type === "scarab") return statRegex.quality_scarab;
    return ""
  }

  const result = [
    addQuantifier(qualityType("regular"), generateNumberRegex(settings.quality.regular, settings.optimizeQuality)),
    addQuantifier(qualityType("currency"), generateNumberRegex(settings.quality.currency, settings.optimizeQuality)),
    addQuantifier(qualityType("divination"), generateNumberRegex(settings.quality.divination, settings.optimizeQuality)),
    addQuantifier(qualityType("rarity"), generateNumberRegex(settings.quality.rarity, settings.optimizeQuality)),
    addQuantifier(qualityType("pack size"), generateNumberRegex(settings.quality.packSize, settings.optimizeQuality)),
    addQuantifier(qualityType("scarab"), generateNumberRegex(settings.quality.scarab, settings.optimizeQuality)),
  ].filter((e) => e !== "");
  if (settings.anyQuality) {
    if (result.length === 0) return "";
    const r = result.map((e) => e.slice(1, -1)).join("|");
    return `"${r}"`;
  } else {
    return result.join(" ");
  }
}

function generateBadMods(settings: MapSettings, regex: Regex<any>, language: RepoeLanguageKey): string {
  if (settings.badIds.length === 0) {
    return "";
  }
  const tokens = optimizeRegexFromIds(getSelectedIds(settings, settings.badIds, language), regex)
  return `"!${tokens.join("|")}"`;
}

function generateGoodMods(settings: MapSettings, regex: Regex<any>, language: RepoeLanguageKey): string {
  if (settings.goodIds.length === 0) {
    return "";
  }
  const tokens = (getSelectedIds(settings, settings.goodIds, language)
    .map((id) => idToRegex(id, regex))
    .filter((e) => e !== undefined) as string[])
    .filter(onlyUnique);

  if (settings.allGoodMods) {
    return tokens
      .map((token) => token.includes(" ") ? `"${token}"` : token).join(" ");
  } else {
    return `"${tokens.join("|")}"`;
  }
}

function onlyUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

function addRarityRegex(normal: boolean, magic: boolean, rare: boolean, include: boolean, language: RepoeLanguageKey): string {
  const statRegex = MapStaticStatRegex[language] ?? MapStaticStatRegex.ENGLISH;
  if (normal && magic && rare) {
    return include ? "" : `"!${statRegex.rarity_prefix}(n|m|r)"`;
  }
  const normalRegex = normal ? "n" : "";
  const magicRegex = magic ? "m" : "";
  const rareRegex = rare ? "r" : "";
  const result = [normalRegex, magicRegex, rareRegex]
    .filter((e) => e.length > 0)
    .join("|");

  const excludePrefix = include ? "" : "!";
  if (result.length === 0) return "";
  if (result.length === 1) return `"${excludePrefix}${statRegex.rarity_prefix}${result}"`;
  if (result.length > 1) return `"${excludePrefix}${statRegex.rarity_prefix}(${result})"`;
  return "";
}

function addQuantifier(prefix: string, string: string) {
  if (string === "") {
    return "";
  }
  return `"${prefix}${string}%"`;
}

function optimize(string: string): string {
  return string
    .replaceAll(`"!"`, "")
    .replaceAll("[8-9]", "[89]")
    .replaceAll("[9-9]", "9");
}

function getSelectedIds(settings: MapSettings, ids: number[], language: RepoeLanguageKey) {
  return settings.displayNightmareMods
    ? ids
    : ids.filter((id) => !isNightmareId(id, language));
}

function isNightmareId(id: number, language: RepoeLanguageKey): boolean {
    const token = LanguageFiles.mapmods[language].tokens.find(t => t.id === id);
    return token?.options.nm === true;
}