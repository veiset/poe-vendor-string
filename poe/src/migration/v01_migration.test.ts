import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {defaultSettings} from "../utils/SavedSettings";
import type {SavedSettings} from "../utils/SavedSettings";
import {loadProfiles} from "../utils/LocalStorage";
import {migrateStoredProfiles} from "./migrations";

type DeepPartial<T> = T extends object ? {[K in keyof T]?: DeepPartial<T[K]>} : T;

// The storage before profiles: each page saved its settings under its own key, as the pages did before #105
const v0Storage = {
  mapSearch: {badMods: ["reflect"], goodMods: ["packsize"], kirac: [], allGoodMods: false, quantity: "80", packsize: "20", optimizeQuant: true, optimizePacksize: true},
  vendorSearch: {anyFourLink: true, movement: {ten: true, fifteen: false}, colors: {rrg: true, specLink: false, specLinkColors: {}}},
  flaskSearch: {prefix: ["Increased Charges"], suffix: [], ilevel: "84", onlyMaxPrefixTierMod: true, onlyMaxSuffixTierMod: true, matchBothPrefixAndSuffix: false, ignoreEffectTiers: false},
  expedition: {selectedBaseTypes: ["Gold Ring"], league: "Affliction", addFillerItems: false, minValueToDisplay: 50, minAddValue: 0},
};

// The settings the pages read today. Old settings no page reads any more, like map.badMods, are kept as they were.
const expectedV2Structure: DeepPartial<SavedSettings> = {
  name: "default",
  version: 2,
  favorites: [],
  map: {allGoodMods: false, quantity: "80", packsize: "20", optimizeQuant: true, optimizePacksize: true, goodIds: [], badIds: []},
  vendor: {anyFourLink: true, anySixLink: false, movement: {ten: true, fifteen: false}, colors: {rrg: true, rrr: false}},
  flask: {ilevel: "84", onlyMaxPrefixTierMod: true, onlyMaxSuffixTierMod: true, matchBothPrefixAndSuffix: false, matchOpenPrefixSuffix: true},
  expedition: {selectedBaseTypes: ["Gold Ring"], addFillerItems: false, minValueToDisplay: 50, minAddValue: 0},
  beast: defaultSettings.beast,
};

const storeV0 = (storage: Record<string, object>) =>
  Object.entries(storage).forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));

describe("v0 -> v1 migration", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => undefined);

  beforeEach(() => { localStorage.clear(); });
  afterEach(() => { log.mockClear(); });

  it("makes the default profile from the settings saved before profiles, and migrates it to the current version", async () => {
    storeV0(v0Storage);
    await migrateStoredProfiles();

    expect(Object.keys(loadProfiles())).toEqual(["default"]);
    expect(loadProfiles().default).toMatchObject(expectedV2Structure);
    expect(loadProfiles().default.map).toMatchObject({badMods: ["reflect"]});
    expect(localStorage.getItem("selectedProfile")).toBe("default");
    expect(log.mock.calls.map(([message]) => message)).toEqual([
      "Running poe profile migration 0 -> 1 for 'default'",
      "Running poe profile migration 1 -> 2 for 'default'",
    ]);
  });

  it("removes the old keys, so a second run does nothing", async () => {
    storeV0(v0Storage);
    await migrateStoredProfiles();
    const migrated = localStorage.getItem("profiles");
    expect(Object.keys(v0Storage).filter((key) => localStorage.getItem(key) !== null)).toEqual([]);

    log.mockClear();
    await migrateStoredProfiles();
    expect(localStorage.getItem("profiles")).toBe(migrated);
    expect(log).not.toHaveBeenCalled();
  });

  it("migrates a single old key, with the defaults for the rest", async () => {
    storeV0({flaskSearch: v0Storage.flaskSearch});
    await migrateStoredProfiles();
    expect(loadProfiles().default).toEqual({...defaultSettings, flask: {...defaultSettings.flask, ...v0Storage.flaskSearch}});
  });

  it("gives a first visit the default profile on the current version, without migrating", async () => {
    await migrateStoredProfiles();
    expect(loadProfiles()).toEqual({default: defaultSettings});
    expect(localStorage.getItem("selectedProfile")).toBe("default");
    expect(log).not.toHaveBeenCalled();
  });

  it("leaves the storage alone when there are profiles", async () => {
    const profiles = JSON.stringify({default: {...defaultSettings, name: "default"}});
    localStorage.setItem("profiles", profiles);
    storeV0({mapSearch: v0Storage.mapSearch});
    await migrateStoredProfiles();
    expect(localStorage.getItem("profiles")).toBe(profiles);
    expect(localStorage.getItem("mapSearch")).not.toBeNull();
  });
});
