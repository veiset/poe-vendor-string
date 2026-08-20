import {Settings} from "../../settings";
import {SelectOption} from "../../settings";
import {selectedOptionRegex} from "../../utils/SelectedOptionRegex";

function joinSelected(options: SelectOption[]): string {
  return options
    .filter((e) => e.isSelected)
    .map((e) => selectedOptionRegex(e, false))
    .join("|");
}

export function generateRelicResult(settings: Settings): string {

  const modifiers = [
    joinSelected(settings.relic.modifier.prefixes),
    joinSelected(settings.relic.modifier.suffixes),
  ].filter((e) => e !== "");

  if (modifiers.length === 0) {
    return "";
  }
  if (settings.relic.matchType === "any") {
    return `"${modifiers.join("|")}"`;
  } else {
    return modifiers.map((e) => `"${e}"`).join(" ");
  }
}
