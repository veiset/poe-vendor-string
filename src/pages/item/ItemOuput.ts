import {Itembase} from "./ItemBaseSelector";
import {RareModSelection} from "./RareItemSelect";
import {ItemAffixRegex} from "../../generated/GeneratedItemMods";
import {generateNumberRegex} from "../../utils/regex/GenerateNumberRegex";
import {ItemCraftingSettings} from "../../utils/SavedSettings";

type RareModSelectionEntry = {
  key: string;
  value: RareModSelection;
  regex: ItemAffixRegex
};

export function generateMagicItemRegex(
  settings: ItemCraftingSettings,
) {
  const itemBase = settings.itembase;
  const selectedMods = settings.selectedMagicMods;
  if (!itemBase) return "";

  return JSON.stringify(selectedMods.map((e) => e.regex.desc));
}

export function generateRareItemRegex(
  affixMap: Record<string, ItemAffixRegex>,
  settings: ItemCraftingSettings,
): string {
  const itemBase = settings.itembase;
  const selectedMods = settings.selectedRareMods;

  if (!itemBase) return "";

  const mods: RareModSelectionEntry[] = Object.entries(selectedMods)
    .map(([key, value]) => ({key, value, regex: affixMap[key]}));

  const result = mods.filter((e) => e.value.selected)
    .map((e) => {
      const rangeInRegex = e.regex.on[0];
      const hasRangeInsideRegex = rangeInRegex !== undefined
        && e.value.values[rangeInRegex] !== ""
        && e.value.values[rangeInRegex] !== undefined;
      const regex = hasRangeInsideRegex
        ? e.regex.regex
          .replace(
            "\\d+",
            generateNumberRegex(e.value.values[rangeInRegex], false).replaceAll(".", "\\d")
          )
        : e.regex.regex;
      const numbersBefore = e.regex.before
        .map((number) => e.value.values[number])
        .filter((e) => e !== undefined && e !== "")
        .map((f) => generateNumberRegex(f, false).replaceAll(".", "\\d"))
        .join(".*");
      const numbersAfter = e.regex.after
        .map((number) => e.value.values[number])
        .filter((e) => e !== undefined && e !== "")
        .map((f) => generateNumberRegex(f, false).replaceAll(".", "\\d"))
        .join(".*");

      return [numbersBefore, regex, numbersAfter]
        .filter((e) => e !== undefined && e !== "")
        .join(".*");

    })

  return result.map((e) => `"${e}"`).join(" ");
  // return result.join("|");
}