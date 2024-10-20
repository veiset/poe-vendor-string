import {ItemSettings} from "../../utils/SavedSettings";
import {ItemAffixRegex} from "../../generated/GeneratedMagicItem";

const openSuffix = (numOfWords: number) => `^(\\w+ ){${numOfWords}}\\w+$`;
const openPrefix = (numOfWords: number) => `^(\\w+.){${numOfWords}}\\sof`;

export const generateMagicItemRegex = (settings: ItemSettings) => {
  const {selected, itemType, synthItem, matchAnyAffix} = settings;

  const selectedMods = selected
    .filter((e) => e.itemType === itemType.name)
    .map((e) => e.affix);

  const prefixes = selectedMods.filter((e) => e.isPrefix);
  const suffixes = selectedMods.filter((e) => !e.isPrefix);

  const prefixRegex = [
    regexPrefixStartOfLine(prefixes, synthItem),
    regexPrefixGeneric(prefixes)
  ].filter((e) => e !== undefined).join("|");

  const suffixRegex = [
    regexSuffixEndOfLine(suffixes),
    regexSuffixGeneric(suffixes),
  ].filter((e) => e !== undefined).join("|");

  const p = matchOpenPrefix(settings, prefixRegex);
  const s = matchOpenSuffix(settings, suffixRegex);
  if (p.length > 0 && s.length > 0 && matchAnyAffix) {
    return spaceEscape(`${p}|${s}`).trim();
  }
  return `${spaceEscape(p)} ${spaceEscape(s)}`.trim();
}

const matchOpenSuffix = (settings: ItemSettings, regex: string): string => {
  const {matchOpenAffix, synthItem} = settings;
  return matchOpenAffix && regex.length > 0
    ? `${regex}|${openSuffix(synthItem ? 3 : 2)}`
    : `${regex}`;
}

const matchOpenPrefix = (settings: ItemSettings, regex: string): string => {
  const {matchOpenAffix, synthItem} = settings;
  return matchOpenAffix && regex.length > 0
    ? `${regex}|${openPrefix(synthItem ? 3 : 2)}`
    : `${regex}`
}

const spaceEscape = (regex: string): string => {
  return regex.includes(" ") ? `"${regex}"` : regex;
}

const regexSuffixEndOfLine = (suffixes: ItemAffixRegex[]): string | undefined => {
  const endOfLineSuffix = suffixes.filter((e) => e.regex.endsWith("$"));
  if (endOfLineSuffix.length === 0) return undefined;
  if (endOfLineSuffix.length <= 2) {
    return endOfLineSuffix.map((e) => e.regex).join("|");
  }

  const regex = endOfLineSuffix.map((e) => e.regex.slice(0, -1)).join("|");
  return `(${regex})$`;
}

const regexSuffixGeneric = (suffixes: ItemAffixRegex[]): string | undefined => {
  const genericSuffixes = suffixes.filter((e) => !e.regex.endsWith("$"));
  if (genericSuffixes.length === 0) return undefined;

  return genericSuffixes.map((e) => e.regex).join("|")
}

const regexPrefixStartOfLine = (prefixes: ItemAffixRegex[], synthItem: boolean): string | undefined => {
  const startOfLinePrefixes = prefixes.filter((e) => e.regex.startsWith("^"));
  if (startOfLinePrefixes.length === 0) return undefined;

  const synthPrefix = synthItem ? "(s.+)?" : "";
  const regex = startOfLinePrefixes.map((e) => e.regex.slice(1)).join("|");

  if (!synthItem && startOfLinePrefixes.length === 2) {
    return startOfLinePrefixes.map((e) => e.regex).join("|");
  }

  return (startOfLinePrefixes.length === 1)
    ? `^${synthPrefix}${regex}`
    : `^${synthPrefix}(${regex})`
}

const regexPrefixGeneric = (prefixes: ItemAffixRegex[]): string | undefined => {
  const itemAffixRegexes = prefixes.filter((e) => !e.regex.startsWith("^"));
  if (itemAffixRegexes.length === 0) return undefined;

  return itemAffixRegexes.map((e) => e.regex).join("|")
}