import {MapSettings} from "../../utils/SavedSettings";
import {Regex} from "../../generated/GeneratedTypes";
import {idToRegex, optimizeRegexFromIds} from "../../utils/regex/OptimizeRegexResult";
import {generateIntegerRangeRegex, generateNumberRegex} from "../../utils/regex/GenerateNumberRegex";
import {LanguageFiles, MapStaticStatRegex, RepoeLanguageKey} from "../../utils/Languages";

export interface PriceNoteOptions {
  currency: string;
  min: string;
  max: string;
  optimize: boolean;
}

const CURRENCY_RE = /^[A-Za-z]+$/;

export function generateMapModRegex(settings: MapSettings, regex: Regex<any>, language: RepoeLanguageKey): string {
  const exclusions = generateBadMods(settings, regex, language);
  const inclusions = generateGoodMods(settings, regex, language);
  const statRegex = MapStaticStatRegex[language] ?? MapStaticStatRegex.ENGLISH;
  const quantity = addQuantifier(statRegex.quantity, generateNumberRegex(settings.quantity, settings.optimizeQuant));
  const packsize = addQuantifier(statRegex.packsize, generateNumberRegex(settings.packsize, settings.optimizePacksize));
  const mapDrop = addQuantifier(statRegex.mapdrop, generateNumberRegex(settings.mapDropChance, settings.optimizeQuant));
  const itemRarity = addQuantifier(statRegex.itemrarity, generateNumberRegex(settings.itemRarity, settings.optimizeQuant));
  const quality = qualityQualifier(settings, language);
  const rarity = addRarityRegex(settings.rarity.normal, settings.rarity.magic, settings.rarity.rare, settings.rarity.include, language);
  const corrupted = corruptedMapCheck(settings, language);
  const unidentified = unidentifiedMap(settings, language);
  const price = generatePriceNoteRegex(settings.price);

  const result = `${exclusions} ${inclusions} ${quantity} ${packsize} ${itemRarity} ${quality} ${rarity} ${mapDrop} ${corrupted} ${unidentified} ${price}`
    .trim().replaceAll(/\s{2,}/g, ' ');

  return optimize(result);
}

export function generatePriceNoteRegex(options: PriceNoteOptions): string {
  const currency = options.currency.trim();
  if (!CURRENCY_RE.test(currency)) return "";

  const minRaw = options.min.trim();
  const maxRaw = options.max.trim();
  if (minRaw.length === 0 && maxRaw.length === 0) return "";

  const rawMin = minRaw.length === 0 ? 0 : Number.parseInt(minRaw, 10);
  const minPrice = optimizedMin(rawMin, options.optimize);

  let priceRegex: string;
  if (maxRaw.length === 0) {
    if (minPrice === 0) return "";
    priceRegex = generateNumberRegex(String(minPrice), false);
  } else {
    const rawMax = Number.parseInt(maxRaw, 10);
    if (rawMin > rawMax) return "";
    priceRegex = generateIntegerRangeRegex(minPrice, optimizedMax(rawMax, options.optimize));
  }

  if (priceRegex === "") return "";
  return noteRegex(priceRegex, currency);
}

function noteRegex(priceRegex: string, currency: string): string {
  const amount = priceRegex.includes("|") ? `(${priceRegex})` : priceRegex;
  return String.raw`"Note:.*? ${amount} ${currency}"`;
}

// fillDigit=9 rounds an upper bound up (42 -> 49); fillDigit=0 rounds a lower bound down (23 -> 20).
function roundToLeadingDigit(n: number, fillDigit: 0 | 9): number {
  const digits = String(n).length;
  if (digits === 1) return n;
  const magnitude = Math.pow(10, digits - 1);
  const leading = Math.floor(n / magnitude);
  return fillDigit === 9 ? leading * magnitude + (magnitude - 1) : leading * magnitude;
}

function optimizedMax(rawMax: number, optimize: boolean): number {
  return optimize ? roundToLeadingDigit(rawMax, 9) : rawMax;
}

function optimizedMin(rawMin: number, optimize: boolean): number {
  if (!optimize || rawMin === 0) return rawMin;
  return roundToLeadingDigit(rawMin, 0);
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
    return include ? "" : `"!${statRegex.rarity_prefix}(${statRegex.rarity_normal}|${statRegex.rarity_magic}|${statRegex.rarity_rare})"`;
  }
  const normalRegex = normal ? statRegex.rarity_normal : "";
  const magicRegex = magic ? statRegex.rarity_magic : "";
  const rareRegex = rare ? statRegex.rarity_rare : "";
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
    .replace(/\[(\d)-(\d)\]/g, (m, a, b) => {
      const span = Number(b) - Number(a);
      if (span === 0) return a;
      if (span === 1) return `[${a}${b}]`;
      return m;
    });
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
