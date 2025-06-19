import {MapSettings} from "../../utils/SavedSettings";
import {Regex} from "../../generated/GeneratedTypes";
import {optimizeRegexFromIds, idToRegex} from "../../utils/regex/OptimizeRegexResult";
import {generateNumberRegex} from "../../utils/regex/GenerateNumberRegex";

export function generateMapModRegex(settings: MapSettings, regex: Regex<any>): string {
  const exclusions = generateBadMods(settings, regex);
  const inclusions = generateGoodMods(settings, regex);
  const quantity = addQuantifier("m q.*", generateNumberRegex(settings.quantity, settings.optimizeQuant));
  const packsize = addQuantifier("iz.*", generateNumberRegex(settings.packsize, settings.optimizePacksize));
  const mapDrop = addQuantifier("ap.*dro.*", generateNumberRegex(settings.mapDropChance, false));
  const quality = addQuantifier(qualityQualifier(settings), generateNumberRegex(settings.quality.value, settings.optimizeQuality));
  const rarity = addRarityRegex(settings.rarity.normal, settings.rarity.magic, settings.rarity.rare, settings.rarity.include);
  const corrupted = corruptedMapCheck(settings);

  const result = `${exclusions} ${inclusions} ${quantity} ${packsize} ${quality} ${rarity} ${mapDrop} ${corrupted}`
    .trim().replaceAll(/\s{2,}/g, ' ');

  return optimize(result);
}

function corruptedMapCheck(settings: MapSettings) {
  if (settings.corrupted.enabled) {
    return settings.corrupted.include ? "pte" : "!pte";
  }
  return "";
}

function qualityQualifier(settings: MapSettings) {
  const type = settings.quality.type;
  if (type === "regular") return "lity:.*";
  if (type === "currency") return "urr.*";
  if (type === "divination") return "div.*";
  if (type === "rarity") return "ty\\).*";
  if (type === "pack size") return "ze\\).*";
  if (type === "scarab") return "sca.*";
  return ""
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
