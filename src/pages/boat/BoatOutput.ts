import {Regex} from "../../generated/GeneratedBoatMods";
import {idToRegex} from "../../utils/regex/OptimizeRegexResult";

export function generateBoatModRegex(
  selectedIds: number[],
  allSelectedMods: boolean,
  regex: Regex<any>,
  matchChartsWithAdjacentModifier: boolean,
  matchChartsWithoutAdjacentModifier: boolean,
  selectedAreaRegexes: string[],
): string {
  const result: string[] = [];
  const adjacentModifierRegex = "adjacent";

  if (selectedIds.length > 0) {
    const tokens = selectedIds
      .map((id) => idToRegex(id, regex))
      .filter((e) => e !== undefined) as string[];

    if (allSelectedMods) {
      result.push(...tokens.map((token) => token.includes(" ") ? `"${token}"` : token));
    } else {
      result.push(`"${tokens.join("|")}"`);
    }
  }

  if (matchChartsWithAdjacentModifier) {
    result.push(`"${adjacentModifierRegex}"`);
  }

  if (matchChartsWithoutAdjacentModifier) {
    result.push(`"!${adjacentModifierRegex}"`);
  }

  if (selectedAreaRegexes.length > 0) {
    result.push(`"${selectedAreaRegexes.join("|")}"`);
  }

  return result.join(" ");
}
