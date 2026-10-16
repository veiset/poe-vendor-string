import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {defaultSettings} from "../utils/SavedSettings";
import type {SavedSettings} from "../utils/SavedSettings";
import {loadProfiles} from "../utils/LocalStorage";
import {migrateProfile, migrateStoredProfiles} from "./migrations";

type DeepPartial<T> = T extends object ? {[K in keyof T]?: DeepPartial<T[K]>} : T;

// A profile as stored before #496: version 1, no favorites, and a boat page without a custom text
const v1Structure = {
  language: "ENGLISH",
  name: "mapping",
  version: 1,
  map: {...defaultSettings.map, badIds: [12, 34], quantity: "80"},
  boat: {selectedGoodIds: [3], allGoodMods: true, adjacentModifier: {enabled: false, include: true}, selectedAreaRegexes: []},
};

const expectedV2Structure: DeepPartial<SavedSettings> = {
  name: "mapping",
  version: 2,
  favorites: [],
  map: {badIds: [12, 34], quantity: "80"},
  boat: {selectedGoodIds: [3], allGoodMods: true, customText: {value: "", enabled: false}},
};

describe("v1 -> v2 migration", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { log.mockClear(); });

  it("migrates a stored v1 profile to the v2 structure", async () => {
    expect(await migrateProfile(v1Structure as object)).toMatchObject(expectedV2Structure);
  });

  it("runs for a profile on version 1 or without a version, and not for one on version 2", async () => {
    const {version: _version, ...unversioned} = v1Structure;
    expect(await migrateProfile(unversioned as object)).toMatchObject(expectedV2Structure);
    expect(log).toHaveBeenCalledWith("Running poe profile migration 1 -> 2 for 'mapping'");

    log.mockClear();
    const current = {...defaultSettings, name: "current", favorites: []};
    expect(await migrateProfile(current)).toEqual(current);
    expect(log).not.toHaveBeenCalled();
  });

  it("migrates every stored profile below version 2 at startup, and leaves the others alone", async () => {
    const current = {...defaultSettings, name: "current", map: {...defaultSettings.map, goodIds: [7]}};
    localStorage.setItem("profiles", JSON.stringify({mapping: v1Structure, current}));
    await migrateStoredProfiles();

    expect(loadProfiles().mapping).toMatchObject(expectedV2Structure);
    expect(loadProfiles().current).toEqual(current);
    expect(log.mock.calls.map(([message]) => message)).toEqual(["Running poe profile migration 1 -> 2 for 'mapping'"]);
  });
});
