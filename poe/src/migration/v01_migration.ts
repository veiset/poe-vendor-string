import {merge} from "@shared/core/utils";
import {defaultSettings} from "../utils/SavedSettings";
import {saveSettings} from "../utils/LocalStorage";

// v0 -> v1: profiles (#105). Before profiles, the map, vendor, flask and expedition pages saved their settings
// under their own localStorage keys. When there is no `profiles` key yet, those settings become the default
// profile on version 1, the later migrations take it from there, and the old keys are removed.
// It works on the storage and not on a profile, so it runs first in migrateStoredProfiles and is not in the list.

const oldKeys = {map: "mapSearch", vendor: "vendorSearch", flask: "flaskSearch", expedition: "expedition"};

export function migrateV0ToV1(): void {
  if (localStorage.getItem("profiles") !== null) {
    return;
  }

  if (Object.values(oldKeys).every((key) => localStorage.getItem(key) === null)) {
    // A first visit: the default profile has nothing to migrate
    saveSettings(defaultSettings);
    return;
  }

  console.log("Running poe profile migration 0 -> 1 for 'default'");
  const oldSettings = Object.fromEntries(Object.entries(oldKeys)
    .map(([setting, key]) => [setting, {...JSON.parse(localStorage.getItem(key) ?? "{}")}]));
  saveSettings({...merge(defaultSettings, oldSettings), version: 1});
  Object.values(oldKeys).forEach((key) => localStorage.removeItem(key));
}
