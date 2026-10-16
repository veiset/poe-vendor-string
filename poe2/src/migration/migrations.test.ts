import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {defaultSettings} from "../settings";
import type {Poe2RegexFavoriteRecord, SelectOption, Settings} from "../settings";
import {migrateProfile} from "./migrations";

const tokens: Record<string, object[]> = {
  waystone: [
    {id: 2039236504, regex: "ses", rawText: "(50-20)% less effect of Curses on Monsters", options: {prefix: false}},
    {id: -1307791168, regex: "bui", rawText: "Monsters have (50-110)% increased Stun Buildup", options: {prefix: true}},
  ],
  tablet: [
    {id: -2026817376, regex: "cs", rawText: "Expeditions contain (1-2) Vaal Relics in Map", options: {}},
  ],
};
const fetchMock = vi.fn(async (url: string) => ({ok: true, json: async () => ({tokens: tokens[url.split("/")[2]]})}));

const option = (name: string, extra: Partial<SelectOption>): SelectOption =>
  ({name, value: null, isSelected: true, ranges: [], regex: "", ...extra});
const curses = option("##% less effect of Curses on Monsters", {id: 2039236504, regex: "ses", ranges: [[50, 20]]});
const stun = option("Monsters have ##% increased Stun Buildup", {id: -1307791168, regex: "bui", ranges: [[50, 110]]});
const relics = option("Expeditions contain ## Vaal Relics in Map", {id: -2026817376, regex: "cs", ranges: [[1, 2]]});
// Saved before the data was regenerated in #549: an id from older data and the old regex
const oldCurses = {...curses, id: 1985506203, regex: "eff"};

const waystone = (wantedMods: SelectOption[], unwantedMods: SelectOption[]): Settings["waystone"] =>
  ({...defaultSettings.waystone, modifier: {...defaultSettings.waystone.modifier, wantedMods, unwantedMods}});

const favorite: Poe2RegexFavoriteRecord = {
  schemaVersion: 1, id: "favorite", name: "No curses", description: "", color: "#c6930a", tags: [],
  createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z",
  kind: "favorite", pageKey: "waystone", regex: '"!eff"', languageDependent: true, context: {language: "ENGLISH"},
  configuration: waystone([], [oldCurses]),
};

describe("poe2 profile migrations", () => {
  beforeEach(() => { vi.stubGlobal("fetch", fetchMock); });
  afterEach(() => { vi.unstubAllGlobals(); fetchMock.mockClear(); });

  it("moves a profile without a version to version 2 with the waystone and tablet mods of the current data", async () => {
    const {version: _version, ...unversioned} = {
      ...defaultSettings,
      waystone: waystone([
        // The same mod saved twice, once with # in the name as between #536 and #549
        {...stun, id: 888, name: "Monsters have #% increased Stun Buildup", regex: "OLD", isSelected: false},
        {...stun, id: 999, value: 60},
      ], [
        oldCurses,
        option("Removed mod", {id: 123, regex: "rem"}),
      ]),
      tablet: {...defaultSettings.tablet, modifier: {...defaultSettings.tablet.modifier, affixes: [{...relics, id: undefined, regex: "old"}]}},
      favorites: [favorite],
    };

    const migrated = await migrateProfile(unversioned);

    expect(migrated.version).toBe(2);
    expect(migrated.waystone.modifier.unwantedMods).toEqual([curses]);
    expect(migrated.waystone.modifier.wantedMods).toEqual([{...stun, value: 60}]);
    expect(migrated.tablet.modifier.affixes).toEqual([relics]);
    expect(migrated.favorites).toEqual([{...favorite, configuration: waystone([], [curses])}]);
  });

  it("leaves a profile on the current version as it is", async () => {
    const profile = {...defaultSettings, waystone: waystone([], [oldCurses])};
    expect(await migrateProfile(profile)).toEqual(profile);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
