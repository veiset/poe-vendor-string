import {afterEach, describe, expect, it, vi} from "vitest";
import {createProfileMigrations, profileVersion} from "./ProfileMigrations";
import type {ProfileMigration} from "./ProfileMigrations";

interface Settings {
  name: string;
  version: number;
  steps: string[];
  page: {mods: number[]; text: string};
}

const defaultSettings: Settings = {name: "default", version: 3, steps: [], page: {mods: [], text: ""}};
const step = (version: number): ProfileMigration<Settings> =>
  ({version, migrate: async (settings) => ({...settings, steps: [...settings.steps, `v${version}`]})});

const setup = (profiles: Record<string, Partial<Settings>>, migrations = [step(2), step(3)]) => {
  const stored = {current: profiles as Record<string, Settings>};
  const saveProfiles = vi.fn((saved: Record<string, Settings>) => { stored.current = saved; });
  const runner = createProfileMigrations<Settings>({app: "test", defaultSettings, migrations, loadProfiles: () => ({...stored.current}), saveProfiles});
  return {...runner, stored, saveProfiles};
};

describe("profile migrations", () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
  const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
  afterEach(() => { log.mockClear(); error.mockClear(); });

  it("reads a profile without a version as version 1", () => {
    expect(profileVersion({})).toBe(1);
    expect(profileVersion({version: "2"})).toBe(2);
  });

  it("runs the migrations newer than the profile's version, in order, on the profile merged with the defaults", async () => {
    const {migrateProfile} = setup({});
    expect(await migrateProfile({name: "old", page: {mods: [1], text: ""}}))
      .toEqual({name: "old", version: 3, steps: ["v2", "v3"], page: {mods: [1], text: ""}});
    expect(await migrateProfile({name: "newer", version: 2, page: {mods: [], text: "x"}}))
      .toEqual({name: "newer", version: 3, steps: ["v3"], page: {mods: [], text: "x"}});
    expect(log.mock.calls.map(([message]) => message)).toEqual([
      "Running test profile migration 1 -> 2 for 'old'",
      "Running test profile migration 2 -> 3 for 'old'",
      "Running test profile migration 2 -> 3 for 'newer'",
    ]);
  });

  it("migrates the stored profiles below the current version, and leaves the others alone", async () => {
    const current = {...defaultSettings, name: "current", steps: ["kept"]};
    const {migrateStoredProfiles, stored} = setup({old: {name: "old", version: 2}, current});
    await migrateStoredProfiles();
    expect(stored.current).toEqual({old: {...defaultSettings, name: "old", steps: ["v3"]}, current});
  });

  it("saves nothing when every profile is current", async () => {
    const {migrateStoredProfiles, saveProfiles} = setup({default: defaultSettings});
    await migrateStoredProfiles();
    expect(saveProfiles).not.toHaveBeenCalled();
  });

  it("keeps a profile whose migration fails on its version, and migrates the others", async () => {
    const failing: ProfileMigration<Settings> = {version: 2, migrate: async (settings) => {
      if (settings.name === "broken") throw new Error("no data");
      return settings;
    }};
    const {migrateStoredProfiles, stored} = setup({broken: {name: "broken", steps: ["saved"]}, fine: {name: "fine", version: 1}}, [failing, step(3)]);
    await migrateStoredProfiles();
    expect(stored.current.broken).toEqual({name: "broken", steps: ["saved"], version: 1});
    expect(stored.current.fine.version).toBe(3);
    expect(error).toHaveBeenCalledWith("Could not migrate test profile 'broken'", expect.any(Error));
  });
});
