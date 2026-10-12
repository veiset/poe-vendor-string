import {defaultMapTypes, legacyMapTypes, MAP_TYPES, MapType, MapTypeRegex, MapTypeSettings, withFavoriteMapTypes} from "./MapTypes";
import {generateMapModRegex} from "./OptimizedMapOutput";
import {defaultSettings, MapSettings} from "@poe/utils/SavedSettings";
import type {RepoeLanguageKey} from "@poe/utils/Languages";
import type {RegexResult} from "@poe/types/generated/mapmods";
// The map type lines in every language, from the PoE1 stat_descriptions.txt (3.29.3.3).
// "required" lines are shown on every map of the type; "extra" lines only on some (Elder guardians).
import mapTypeLines from "./MapTypeLines.json";

type TypeLines = {required: string[][]; extra: string[][]};
const lines = mapTypeLines as Record<RepoeLanguageKey, Record<MapType, TypeLines>>;
const mapMods = import.meta.glob<{tokens: {rawText: string}[]}>("../../../generated/mapmods/Generated.Map.*.json", {eager: true, import: "default"});

const termRegex = (term: string) => new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
// Map mod lines with the [Keyword|Text] markup resolved both ways
const modLines = (language: RepoeLanguageKey) => mapMods[`../../../generated/mapmods/Generated.Map.${language}.json`].tokens
  .flatMap((token) => token.rawText.split("|"))
  .flatMap((line) => [line.replace(/\[[^\]|]*\|([^\]]*)\]/g, "$1"), line.replace(/\[([^\]|]*)(\|[^\]]*)?\]/g, "$1")]);

describe("MapTypeRegex", () => {
  describe.each(Object.keys(MapTypeRegex) as RepoeLanguageKey[])("%s", (language) => {
    const mods = modLines(language);
    test.each([...MAP_TYPES])("%s matches its own map type and nothing else", (type) => {
      const regex = termRegex(MapTypeRegex[language][type]);
      const own = lines[language][type];
      expect(own.required.every((variant) => variant.some((line) => regex.test(line)))).toBe(true);
      const otherTypes = MAP_TYPES.filter((other) => other !== type)
        .flatMap((other) => [...lines[language][other].required, ...lines[language][other].extra].flat())
        .map((line) => line.replace("{0}", "9"));
      expect(otherTypes.filter((line) => regex.test(line))).toEqual([]);
      expect(mods.filter((line) => regex.test(line))).toEqual([]);
    });
  });
});

describe("map types in the map regex", () => {
  const noMods = {tokens: [], optimizationTable: {}} as unknown as RegexResult<any>;
  const settings = (mapTypes: MapTypeSettings): MapSettings => ({...defaultSettings.map, mapTypes});

  test("the default excludes Shaper and Elder maps", () => {
    expect(generateMapModRegex(settings(defaultMapTypes), noMods, "ENGLISH")).toBe(`"!the shaper|the elder"`);
  });

  test("excluded map types share the term of the excluded mods", () => {
    const english = JSON.parse(JSON.stringify(mapMods["../../../generated/mapmods/Generated.Map.ENGLISH.json"])) as RegexResult<any>;
    const taunted = english.tokens.find((token) => token.rawText.includes("Monsters cannot be Taunted"))!;
    const regex = generateMapModRegex({...settings(defaultMapTypes), badIds: [taunted.id]}, english, "ENGLISH");
    expect(regex).toBe(`"!taunte|the shaper|the elder"`);
  });

  test("included map types match any of them", () => {
    const regex = generateMapModRegex(settings({
      ...legacyMapTypes(false),
      conqueror: {enabled: true, include: true},
      originator: {enabled: true, include: true},
      blighted: {enabled: true, include: false},
    }), noMods, "GERMAN");
    expect(regex).toBe(`"!20% auch" "Zitadelle|Erschafferin"`);
  });

  test("no map types, no map type terms", () => {
    expect(generateMapModRegex(settings(legacyMapTypes(false)), noMods, "ENGLISH")).toBe("");
  });
});

describe("settings saved before map types existed", () => {
  test("profiles keep what the Shaper/Elder trade checkbox did", () => {
    expect(legacyMapTypes(true)).toEqual(defaultMapTypes);
    expect(MAP_TYPES.every((type) => !legacyMapTypes(false)[type].enabled)).toBe(true);
  });

  test("favorites keep their regex without a map type term", () => {
    const upgraded = withFavoriteMapTypes({badIds: [1]} as Partial<MapSettings>);
    expect(upgraded.mapTypes).toEqual(legacyMapTypes(false));
    expect(withFavoriteMapTypes({mapTypes: defaultMapTypes}).mapTypes).toBe(defaultMapTypes);
  });
});
