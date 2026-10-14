import {generateJewelRegex} from "./JewelOutput";
import {JewelSettings} from "@poe/utils/SavedSettings";
import type {Jewel, JewelRegex} from "@poe/types/generated/jewel";

const abyssMod = (mod: string, regex: string): JewelRegex =>
  ({mod, regex, regexAffix: "", isAbyss: true, isPrefix: false});

const jewel: Jewel = {
  abyss: [
    abyssMod("Minions Regenerate (0.4—0.8)% of Life per second", "s regenerate \\d+%"),
    abyssMod("Minions have +(181—250) to Accuracy Rating", "e \\+\\d+ t"),
  ],
  regular: [],
};

const settings = (selected: string): JewelSettings => ({
  allMatch: false,
  magicOnly: false,
  abyssJewel: true,
  selectedRegular: [],
  selectedAbyss: [selected],
  matchBothPrefixAndSuffix: false,
  matchOpenPrefixSuffix: false,
});

const matcher = (result: string) => new RegExp(result.replace(/^"|"$/g, ""), "i");

describe("generateJewelRegex with mods that display a decimal value", () => {
  test("matches a mod whose value range is fractional", () => {
    const result = generateJewelRegex(settings(jewel.abyss[0].mod), jewel);
    expect(matcher(result).test("Minions Regenerate 0.6% of Life per second")).toBe(true);
  });

  test("leaves mods with whole number values unchanged", () => {
    expect(generateJewelRegex(settings(jewel.abyss[1].mod), jewel)).toBe(`"e \\+\\d+ t"`);
  });
});
