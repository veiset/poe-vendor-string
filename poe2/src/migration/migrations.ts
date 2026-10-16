import {merge} from "@shared/core/utils";
import {defaultSettings} from "../settings";
import type {Settings} from "../settings";
import {loadProfiles, saveProfiles} from "../localStorage";
import {migrateV1ToV2} from "./v02_migration";

// Profiles saved before settings had a version
export const UNVERSIONED = 1;

// In order. Each migration takes a profile from the version before it to its own version.
// A new migration is added at the end, and defaultSettings.version is bumped to its version.
const migrations: {version: number; migrate: (settings: Settings) => Promise<Settings>}[] = [
  {version: 2, migrate: migrateV1ToV2},
];

const versionOf = (profile: Partial<Settings>): number => Number(profile.version) || UNVERSIONED;

export async function migrateProfile(profile: Partial<Settings>): Promise<Settings> {
  let settings = {...merge(defaultSettings, profile), version: versionOf(profile)};
  for (const migration of migrations.filter((e) => e.version > settings.version)) {
    console.log(`Running poe2 profile migration ${settings.version} -> ${migration.version} for '${settings.name}'`);
    settings = {...await migration.migrate(settings), version: migration.version};
  }
  return settings;
}

// Runs before the app renders, so no page reads a profile that is not migrated yet
export async function migrateStoredProfiles(): Promise<void> {
  const profiles = loadProfiles();
  const outdated = Object.keys(profiles).filter((name) => versionOf(profiles[name]) < defaultSettings.version);
  if (outdated.length === 0) return;

  for (const name of outdated) {
    try {
      profiles[name] = await migrateProfile(profiles[name]);
    } catch (error) {
      // Kept on its version, so it is migrated again on the next visit
      console.error(`Could not migrate poe2 profile '${name}'`, error);
      profiles[name] = {...profiles[name], version: versionOf(profiles[name])};
    }
  }
  saveProfiles(profiles);
}
