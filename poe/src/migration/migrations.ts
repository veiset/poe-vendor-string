import {createProfileMigrations} from "@shared/migration/ProfileMigrations";
import {defaultSettings} from "../utils/SavedSettings";
import type {SavedSettings} from "../utils/SavedSettings";
import {loadProfiles, saveProfiles} from "../utils/LocalStorage";
import {migrateV0ToV1} from "./v01_migration";
import {migrateV1ToV2} from "./v02_migration";

// A new migration is added at the end of the list, and defaultSettings.version is bumped to its version.
const profileMigrations = createProfileMigrations<SavedSettings>({
  app: "poe",
  defaultSettings,
  loadProfiles,
  saveProfiles,
  migrations: [
    {version: 2, migrate: migrateV1ToV2},
  ],
});

export const {migrateProfile} = profileMigrations;

// 0 -> 1 makes the first profile from the storage before profiles, so it runs before the profile migrations
export async function migrateStoredProfiles(): Promise<void> {
  migrateV0ToV1();
  await profileMigrations.migrateStoredProfiles();
}
