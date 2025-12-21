import {MapSettings} from "../../utils/SavedSettings";
import {Regex} from "../../generated/GeneratedTypes";
import {idToRegex, optimizeRegexFromIds} from "../../utils/regex/OptimizeRegexResult";
import {generateNumberRegex} from "../../utils/regex/GenerateNumberRegex";

export function generateMapModRegex(settings: MapSettings, regex: Regex<any>): string {
  const exclusions = generateBadMods(settings, regex);
  const inclusions = generateGoodMods(settings, regex);
  const quantity = addQuantifier("m q.*", generateNumberRegex(settings.quantity, settings.optimizeQuant));
  const packsize = addQuantifier("iz.*", generateNumberRegex(settings.packsize, settings.optimizePacksize));
  const mapDrop = addQuantifier("re maps.*", generateNumberRegex(settings.mapDropChance, false));
  const itemRarity = addQuantifier("m rar.*", generateNumberRegex(settings.itemRarity, false));
  const quality = qualityQualifier(settings);
  const rarity = addRarityRegex(settings.rarity.normal, settings.rarity.magic, settings.rarity.rare, settings.rarity.include);
  const corrupted = corruptedMapCheck(settings);
  const unidentified = unidentifiedMap(settings);

  const result = `${exclusions} ${inclusions} ${quantity} ${packsize} ${itemRarity} ${quality} ${rarity} ${mapDrop} ${corrupted} ${unidentified}`
    .trim().replaceAll(/\s{2,}/g, ' ');

  return optimize(result);
}

function unidentifiedMap(settings: MapSettings) {
  if (settings.unidentified.enabled) {
    return settings.unidentified.include ? "tified" : "!tified"
  }
  return "";
}

function corruptedMapCheck(settings: MapSettings) {
  if (settings.corrupted.enabled) {
    return settings.corrupted.include ? "pte" : "!pte";
  }
  return "";
}

function qualityQualifier(settings: MapSettings) {
  function qualityType(type: string) {
    if (type === "regular") return "lity:.*";
    if (type === "currency") return "urr.*";
    if (type === "divination") return "div.*";
    if (type === "rarity") return "ty\\).*";
    if (type === "pack size") return "ze\\).*";
    if (type === "scarab") return "sca.*";
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

function generateBadMods(settings: MapSettings, regex: Regex<any>): string {
  if (settings.badIds.length === 0) {
    return "";
  }
  const tokens = optimizeRegexFromIds(settings.badIds, regex)
  return `"!${tokens.join("|")}"`;
}

function generateGoodMods(settings: MapSettings, regex: Regex<any>): string {
  if (settings.goodIds.length === 0) {
    return "";
  }
  const tokens = (settings.goodIds
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

function addRarityRegex(normal: boolean, magic: boolean, rare: boolean, include: boolean): string {
  if (normal && magic && rare) {
    return include ? "" : `"!y: (n|m|r)"`;
  }
  const normalRegex = normal ? "n" : "";
  const magicRegex = magic ? "m" : "";
  const rareRegex = rare ? "r" : "";
  const result = [normalRegex, magicRegex, rareRegex]
    .filter((e) => e.length > 0)
    .join("|");

  const excludePrefix = include ? "" : "!";
  if (result.length === 0) return "";
  if (result.length === 1) return `"${excludePrefix}y: ${result}"`;
  if (result.length > 1) return `"${excludePrefix}y: (${result})"`;
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
