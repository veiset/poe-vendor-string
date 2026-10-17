import type {GemsSettings} from "@poe/utils/SavedSettings";
import type {GemsRegex} from "@shared/typedefs/poe1/Gems";
import {generateNumberRangeRegex} from "@shared/core/regex/GenerateNumberRegex";

const boundedValue = (value: string, low: number, high: number) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) return low;
  return Math.max(low, Math.min(high, parsed));
};

const rangeRegex = (min: string, max: string, low: number, high: number, prefix: string, suffix = "") => {
  const start = boundedValue(min, low, high);
  const end = boundedValue(max, low, high);
  if (end < start) return "";
  return `${prefix}${generateNumberRangeRegex(String(start), String(end), false)}${suffix}`;
};

export const generateGemsRegex = (settings: GemsSettings, gems?: GemsRegex): string => {
  const names = gems?.tokens
    .filter((gem) => settings.selected.includes(gem.id))
    .map((gem) => gem.regex) ?? [];
  const nameRegex = names.length === 0 ? "" : names.length === 1 ? names[0] : `"${names.join("|")}"`;
  const levelValueRegex = rangeRegex(settings.levelMin, settings.levelMax, 1, 21, "level: ");
  const qualityValueRegex = rangeRegex(settings.qualityMin, settings.qualityMax, 0, 23, "quality: \\+", "%");
  const levelRegex = settings.levelEnabled && levelValueRegex ? `"${levelValueRegex}"` : "";
  const qualityRegex = settings.qualityEnabled && qualityValueRegex ? `"${qualityValueRegex}"` : "";
  return [nameRegex, levelRegex, qualityRegex].filter(Boolean).join(" ");
};

export const translateGemIds = (selected: number[], source: GemsRegex, target: GemsRegex): number[] => {
  const localizedIds = new Set(target.tokens.map((token) => token.id));
  return selected.filter((id) => source.tokens.some((token) => token.id === id) && localizedIds.has(id));
};
