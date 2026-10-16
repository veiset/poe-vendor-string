import {createProfileMigrations} from "@shared/migration/ProfileMigrations";
import {defaultSettings} from "../settings";
import type {Settings} from "../settings";
import {loadProfiles, saveProfiles} from "../localStorage";
import {migrateV1ToV2} from "./v02_migration";

// A new migration is added at the end of the list, and defaultSettings.version is bumped to its version.
export const {migrateProfile, migrateStoredProfiles} = createProfileMigrations<Settings>({
  app: "poe2",
  defaultSettings,
  loadProfiles,
  saveProfiles,
  migrations: [
    {version: 2, migrate: migrateV1ToV2},
  ],
});
