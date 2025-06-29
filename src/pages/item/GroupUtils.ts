import {CategoryRegex} from "../../generated/GeneratedItemMods";

export const cleanCategoryName = (category: string): string => category
  .replace(RegExp("suffix_?"), "Suffix")
  .replace(RegExp("prefix_?"), "Prefix")
  .replace("adjudicator", " Warlord")
  .replace("basilisk", " Hunter")
  .replace("crusader", " Crusader")
  .replace("eyrie", " Redeemer")
  .replace("elder", " Elder")
  .replace("shaper", " Shaper")

export const categoryOrder = (a: CategoryRegex, b: CategoryRegex) => {
  const priorityMap: Record<string, number> = {
    '': -1,
    'shaper': 0,
    'elder': 1,
    'basilisk': 2,
    'crusader': 3,
    'eyrie': 4,
    'adjudicator': 5,
  };
  const getPriority = (group: string) => {
    const name = group.replace(RegExp("(prefix|suffix)_?"), "");
    return priorityMap[name] ?? Infinity;
  };
  return getPriority(a.category) - getPriority(b.category);
};

export function groupedCategory(categories: CategoryRegex[]): Record<string, CategoryRegex[]> {
  return categories.reduce<Record<string, CategoryRegex[]>>((acc, category) => {
    const key = category.category.replace(RegExp("(suffix|prefix)_?"), "");
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(category);
    return acc;
  }, {});
}
