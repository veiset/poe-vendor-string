import type {SavedSettings} from "../utils/SavedSettings";

// v1 -> v2: favorites (#496). Profiles got a favorites list, and the boat page a custom text.
// Both are new settings with a default, which a profile gets when migrateProfile merges it with defaultSettings,
// so there is nothing to change and this migration only takes the profile to version 2.

export async function migrateV1ToV2(settings: SavedSettings): Promise<SavedSettings> {
  return settings;
}
