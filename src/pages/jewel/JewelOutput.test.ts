import {generateJewelRegex} from "./JewelOutput";
import {JewelSettings} from "../../utils/SavedSettings";

const baseSettings = (overrides: Partial<JewelSettings> = {}): JewelSettings => ({
  allMatch: false,
  magicOnly: false,
  abyssJewel: true,
  selectedRegular: [],
  selectedAbyss: [],
  matchBothPrefixAndSuffix: false,
  matchOpenPrefixSuffix: false,
  ...overrides,
});

const stripQuotes = (s: string) => s.replace(/^"|"$/g, "");

describe("generateJewelRegex — decimal values (#264 follow-up)", () => {
  test("'Minions Regenerate % of Life per second' (abyss, decimal-display) matches in-game text", () => {
    const out = generateJewelRegex(
      baseSettings({selectedAbyss: ["Minions Regenerate (0.4-0.8)% of Life per second"]}),
    );
    const re = new RegExp(stripQuotes(out), "i");
    expect(re.test("Minions Regenerate 0.4% of Life per second")).toBe(true);
    expect(re.test("Minions Regenerate 0.8% of Life per second")).toBe(true);
  });

  test("Integer-display jewel mods still match (no regression)", () => {
    const out = generateJewelRegex(
      baseSettings({selectedAbyss: ["Minions Regenerate (42-60) Life per second"]}),
    );
    const re = new RegExp(stripQuotes(out), "i");
    expect(re.test("Minions Regenerate 50 Life per second")).toBe(true);
  });
});
