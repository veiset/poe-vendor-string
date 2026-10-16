import {merge} from "@shared/core/utils";
import {defaultSettings} from "../utils/SavedSettings";
import type {SavedSettings} from "../utils/SavedSettings";
import {loadProfiles, saveProfiles} from "../utils/LocalStorage";
import {migrateV0ToV1} from "./v01_migration";
import {migrateV1ToV2} from "./v02_migration";

// Profiles saved without a version. Profiles have had one since #105, so this is an export or storage without one.
export const UNVERSIONED = 1;

// In order. Each migration takes a profile from the version before it to its own version.
// A new migration is added at the end, and defaultSettings.version is bumped to its version.
// 0 -> 1 makes the first profile from the storage before profiles, see migrateStoredProfiles.
const migrations: {version: number; migrate: (settings: SavedSettings) => Promise<SavedSettings>}[] = [
  {version: 2, migrate: migrateV1ToV2},
];

const versionOf = (profile: Partial<SavedSettings>): number => Number(profile.version) || UNVERSIONED;

export async function migrateProfile(profile: Partial<SavedSettings>): Promise<SavedSettings> {
  let settings = {...merge(defaultSettings, profile), version: versionOf(profile)};
  for (const migration of migrations.filter((e) => e.version > settings.version)) {
    console.log(`Running poe profile migration ${settings.version} -> ${migration.version} for '${settings.name}'`);
    settings = {...await migration.migrate(settings), version: migration.version};
  }
  return settings;
}

// Runs before the app renders, so no page reads a profile that is not migrated yet
export async function migrateStoredProfiles(): Promise<void> {
  migrateV0ToV1();

  const profiles = loadProfiles();
  const outdated = Object.keys(profiles).filter((name) => versionOf(profiles[name]) < defaultSettings.version);
  if (outdated.length === 0) return;

  for (const name of outdated) {
    try {
      profiles[name] = await migrateProfile(profiles[name]);
    } catch (error) {
      // Kept on its version, so it is migrated again on the next visit
      console.error(`Could not migrate poe profile '${name}'`, error);
      profiles[name] = {...profiles[name], version: versionOf(profiles[name])};
    }
  }
  saveProfiles(profiles);
}
