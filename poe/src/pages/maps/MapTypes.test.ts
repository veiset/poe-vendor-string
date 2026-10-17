import {MapType, MapTypeRegex} from "./MapTypes";
import {generateMapModRegex} from "./OptimizedMapOutput";
import {defaultSettings, MapSettings} from "@poe/utils/SavedSettings";
import type {RegexResult} from "@shared/typedefs/RegexResult";
import type {Language} from "@shared/typedefs/Language";

const off = {enabled: false, include: false};
const noMapTypes: MapSettings["mapTypes"] = {shaper: off, elder: off, conqueror: off, originator: off, blighted: off, blightRavaged: off};
const mapMods = import.meta.glob<{tokens: {rawText: string}[]}>("../../../generated/mapmods/Generated.Map.*.json", {eager: true, import: "default"});

const termRegex = (term: string) => new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
// Map mod lines with the [Keyword|Text] markup resolved both ways
const modLines = (language: Language) => mapMods[`../../../generated/mapmods/Generated.Map.${language}.json`].tokens
  .flatMap((token) => token.rawText.split("|"))
  .flatMap((line) => [line.replace(/\[[^\]|]*\|([^\]]*)\]/g, "$1"), line.replace(/\[([^\]|]*)(\|[^\]]*)?\]/g, "$1")]);

describe("MapTypeRegex", () => {
  describe.each(Object.keys(MapTypeRegex) as Language[])("%s", (language) => {
    const terms = Object.entries(MapTypeRegex[language]) as [MapType, string][];
    const mods = modLines(language);

    test.each(terms)("%s (%s) matches no map mod", (_type, term) => {
      expect(mods.filter((line) => termRegex(term).test(line))).toEqual([]);
    });

    test("no term matches another map type's term", () => {
      const overlaps = terms.flatMap(([type, term]) => terms
        .filter(([other, otherTerm]) => other !== type && termRegex(term).test(otherTerm))
        .map(([other]) => `${type} matches ${other}`));
      expect(overlaps).toEqual([]);
    });
  });
});

describe("map types in the map regex", () => {
  const noMods = {tokens: [], optimizationTable: {}} as unknown as RegexResult<any>;
  const settings = (mapTypes: MapSettings["mapTypes"]): MapSettings => ({...defaultSettings.map, mapTypes, mapTypesInRegex: true});

  test("by default map types are only used for the trade search", () => {
    expect(generateMapModRegex(defaultSettings.map, noMods, "ENGLISH")).toBe("");
  });

  test("in the regex, the default excludes every map type", () => {
    expect(generateMapModRegex(settings(defaultSettings.map.mapTypes), noMods, "ENGLISH"))
      .toBe(`"!the shaper|the elder|citadel|originator|25% value|50% value"`);
  });

  test("excluded map types share the term of the excluded mods", () => {
    const english = JSON.parse(JSON.stringify(mapMods["../../../generated/mapmods/Generated.Map.ENGLISH.json"])) as RegexResult<any>;
    const taunted = english.tokens.find((token) => token.rawText.includes("Monsters cannot be Taunted"))!;
    const mapTypes = {...noMapTypes, shaper: {enabled: true, include: false}, elder: {enabled: true, include: false}};
    const regex = generateMapModRegex({...settings(mapTypes), badIds: [taunted.id]}, english, "ENGLISH");
    expect(regex).toBe(`"!taunte|the shaper|the elder"`);
  });

  test("included map types match any of them", () => {
    const regex = generateMapModRegex(settings({
      ...noMapTypes,
      conqueror: {enabled: true, include: true},
      originator: {enabled: true, include: true},
      blighted: {enabled: true, include: false},
    }), noMods, "GERMAN");
    expect(regex).toBe(`"!20% auch" "Zitadelle|Erschafferin"`);
  });

  test("no map types, no map type terms", () => {
    expect(generateMapModRegex(settings(noMapTypes), noMods, "ENGLISH")).toBe("");
  });
});
