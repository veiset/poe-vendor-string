import {LanguageFiles} from "../../utils/Languages";
import {defaultSettings, MapSettings} from "../../utils/SavedSettings";
import {generateMapModRegex} from "./OptimizedMapOutput";

function resultRegexes(result: string): RegExp[] {
  return Array.from(result.matchAll(/"([^"]+)"/g), (match) => new RegExp(match[1]));
}

function resultMatches(result: string, text: string): boolean {
  return resultRegexes(result).some((regex) => regex.test(text));
}

function mapSettings(overrides: Partial<MapSettings> = {}): MapSettings {
  return {
    ...defaultSettings.map,
    ...overrides,
    price: {
      ...defaultSettings.map.price,
      ...overrides.price,
    },
  };
}

describe("generateMapModRegex price filter", () => {
  test("does not include a price note filter when price settings are empty", () => {
    const result = generateMapModRegex(
      mapSettings(),
      LanguageFiles.mapmods.ENGLISH,
      "ENGLISH",
    );

    expect(result).not.toContain("Note:");
    expect(resultMatches(result, "Note: ~b/o 10 chaos")).toBe(false);
  });

  test("includes the price note filter in the canonical result", () => {
    const result = generateMapModRegex(
      mapSettings({
        price: {
          min: "10",
          max: "50",
          currency: "chaos",
          optimize: false,
        },
      }),
      LanguageFiles.mapmods.ENGLISH,
      "ENGLISH",
    );

    expect(resultMatches(result, "Note: ~b/o 10 chaos")).toBe(true);
    expect(resultMatches(result, "Note: ~price 50 chaos")).toBe(true);
    expect(resultMatches(result, "Note: ~b/o 9 chaos")).toBe(false);
    expect(resultMatches(result, "Note: ~b/o 51 chaos")).toBe(false);
  });

  test("omits invalid price filters", () => {
    const result = generateMapModRegex(
      mapSettings({
        price: {
          min: "60",
          max: "50",
          currency: "chaos",
          optimize: false,
        },
      }),
      LanguageFiles.mapmods.ENGLISH,
      "ENGLISH",
    );

    expect(resultMatches(result, "Note: ~b/o 50 chaos")).toBe(false);
  });
});
