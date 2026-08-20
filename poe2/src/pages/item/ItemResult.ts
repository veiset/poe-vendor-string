import {generateBoundedValueRegex} from "@shared/core/regex/GenerateNumberRegex";
import {ItemSettings} from "../../settings";

export function generateRareItemRegex(
  settings: ItemSettings,
): string {
  const itemBase = settings.itemBase;
  const selectedMods = settings.selectedMods;
  if (!itemBase) return "";

  const result = selectedMods
    .filter((e) => e.selected)
    .filter((e) => e.basetype.startsWith(itemBase.baseType))
    .map((e) => {
      const boundedRegex = (index: number): string => {
        const max = e.itemModifier.stats[index]?.max;
        return generateBoundedValueRegex(
          e.values[index],
          max !== undefined ? max.toString() : "",
          false,
        );
      };

      const rangeInRegex = e.itemModifier.regexPosition.on[0];
      const hasRangeInsideRegex = rangeInRegex !== undefined
        && e.values[rangeInRegex] !== ""
        && e.values[rangeInRegex] !== undefined;
      const regex = hasRangeInsideRegex
        ? e.itemModifier.regex.replace("\\d+", `${boundedRegex(rangeInRegex)}.*`)
        : e.itemModifier.regex;
      const numbersBefore = e.itemModifier.regexPosition.before
        .filter((index) => e.values[index] !== undefined && e.values[index] !== "")
        .map((index) => boundedRegex(index))
        .join(".*");
      const numbersAfter = e.itemModifier.regexPosition.after
        .filter((index) => e.values[index] !== undefined && e.values[index] !== "")
        .map((index) => boundedRegex(index))
        .join(".*");

      const regexStr = [numbersBefore, regex, numbersAfter]
        .filter((e) => e !== undefined && e !== "")
        .join(".*");

      return {
        str: regexStr,
        affixtype: e.itemModifier.affixType
      };
    });

  if (settings.rareSettings.matchAnyMod) {
    const regex = result.map(e => e.str).join("|");
    return regex.length > 0 ? `"${regex}"` : "";
  } else {
    return result.map((e) => `"${e.str}"`).join(" ");
  }
}
