import {generateRareItemRegex} from "./ItemOuput";
import {ItemAffixRegex} from "../../generated/GeneratedItemMods";
import {ItemCraftingSettings} from "../../utils/SavedSettings";

const baseAffix: ItemAffixRegex = {
  desc: "Regenerate # Life per second",
  regex: "^regenerate \\d+ l",
  start: 0,
  end: 0,
  disabled: [],
  before: [],
  on: [0],
  after: [],
  affixtype: "SUFFIX",
  stats: [],
  affixes: [],
};

const baseSettings = (overrides: {value?: string} = {}): {
  affixMap: Record<string, ItemAffixRegex>;
  settings: ItemCraftingSettings;
} => ({
  affixMap: {"helmet|life_regen": baseAffix},
  settings: {
    itembase: {baseType: "helmet", item: "Helmet", rarity: "Rare"},
    selectedRareMods: {
      "helmet|life_regen": {
        itembase: {baseType: "helmet", item: "Helmet", rarity: "Rare"},
        selected: true,
        values: overrides.value !== undefined ? {0: overrides.value} : {},
      },
    },
    selectedMagicMods: [],
    rareSettings: {matchAnyMod: true, matchPrefixAndSuffix: false},
    magicSettings: {onlyIfBothPrefixAndSuffix: false, matchOpenAffix: false},
    customText: {value: "", enabled: false},
  },
});

const stripQuotes = (s: string) => s.replace(/^"|"$/g, "");

describe("generateRareItemRegex — decimal values (regression for #264)", () => {
  test("matches decimal life-regen value when user specified a minimum", () => {
    const {affixMap, settings} = baseSettings({value: "90"});
    const out = generateRareItemRegex(affixMap, settings);
    const re = new RegExp(stripQuotes(out), "i");
    expect(re.test("Regenerate 127.7 Life per second")).toBe(true);
  });

  test("matches integer life-regen value when user specified a minimum", () => {
    const {affixMap, settings} = baseSettings({value: "90"});
    const out = generateRareItemRegex(affixMap, settings);
    const re = new RegExp(stripQuotes(out), "i");
    expect(re.test("Regenerate 127 Life per second")).toBe(true);
  });

  test("matches decimal value with no user-specified minimum", () => {
    const {affixMap, settings} = baseSettings();
    const out = generateRareItemRegex(affixMap, settings);
    const re = new RegExp(stripQuotes(out), "i");
    expect(re.test("Regenerate 127.7 Life per second")).toBe(true);
  });

  test("does NOT match values below the user-specified minimum", () => {
    const {affixMap, settings} = baseSettings({value: "90"});
    const out = generateRareItemRegex(affixMap, settings);
    const re = new RegExp(stripQuotes(out), "i");
    expect(re.test("Regenerate 25.5 Life per second")).toBe(false);
    expect(re.test("Regenerate 89 Life per second")).toBe(false);
  });
});
