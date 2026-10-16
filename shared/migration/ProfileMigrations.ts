import {merge} from "@shared/core/utils";

// Profiles saved before settings had a version
const UNVERSIONED = 1;

export interface ProfileMigration<Settings> {
  version: number;
  migrate: (settings: Settings) => Promise<Settings>;
}

interface ProfileMigrationOptions<Settings> {
  // Names the app in the log, e.g. "Running poe2 profile migration 1 -> 2 for 'default'"
  app: string;
  defaultSettings: Settings;
  // In order. Each migration takes a profile from the version before it to its own version.
  migrations: ProfileMigration<Settings>[];
  loadProfiles: () => Record<string, Settings>;
  saveProfiles: (profiles: Record<string, Settings>) => void;
}

export const profileVersion = (profile: {version?: unknown}): number => Number(profile.version) || UNVERSIONED;

/** Runs an app's profile migrations, for one profile or for every stored profile. */
export function createProfileMigrations<Settings extends {name: string; version: number}>({
  app, defaultSettings, migrations, loadProfiles, saveProfiles,
}: ProfileMigrationOptions<Settings>) {
  async function migrateProfile(profile: Partial<Settings>): Promise<Settings> {
    let settings = {...merge(defaultSettings, profile), version: profileVersion(profile)};
    for (const migration of migrations.filter((e) => e.version > settings.version)) {
      console.log(`Running ${app} profile migration ${settings.version} -> ${migration.version} for '${settings.name}'`);
      settings = {...await migration.migrate(settings), version: migration.version};
    }
    return settings;
  }

  // Runs before the app renders, so no page reads a profile that is not migrated yet
  async function migrateStoredProfiles(): Promise<void> {
    const profiles = loadProfiles();
    const outdated = Object.keys(profiles).filter((name) => profileVersion(profiles[name]) < defaultSettings.version);
    if (outdated.length === 0) return;

    for (const name of outdated) {
      try {
        profiles[name] = await migrateProfile(profiles[name]);
      } catch (error) {
        // Kept on its version, so it is migrated again on the next visit
        console.error(`Could not migrate ${app} profile '${name}'`, error);
        profiles[name] = {...profiles[name], version: profileVersion(profiles[name])};
      }
    }
    saveProfiles(profiles);
  }

  return {migrateProfile, migrateStoredProfiles};
}
