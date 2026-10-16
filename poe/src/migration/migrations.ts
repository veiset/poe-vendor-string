import {createProfileMigrations} from "@shared/migration/ProfileMigrations";
import {defaultSettings} from "../utils/SavedSettings";
import type {SavedSettings} from "../utils/SavedSettings";
import {loadProfiles, saveProfiles} from "../utils/LocalStorage";
import {migrateV1ToV2} from "./v02_migration";

// A new migration is added at the end of the list, and defaultSettings.version is bumped to its version.
export const {migrateProfile, migrateStoredProfiles} = createProfileMigrations<SavedSettings>({
  app: "poe",
  defaultSettings,
  loadProfiles,
  saveProfiles,
  migrations: [
    {version: 2, migrate: migrateV1ToV2},
  ],
});
