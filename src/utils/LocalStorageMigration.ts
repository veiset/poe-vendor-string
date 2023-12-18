import {loadSettings, merge, saveSettings} from "./LocalStorage";
import {defaultSettings} from "./SavedSettings";

export function migrateSavedSettings_V1() {
  if (localStorage.getItem("settings") !== null) {
    return;
  }
  const settings = loadSettings();
  if (settings.version !== 1) {
    return;
  }

  console.log("Running migration 0 -> 1");

  const updatedSettings = merge(defaultSettings, {
    map: {
      ...JSON.parse(localStorage.getItem("mapSearch") ?? "{}"),
    },
    vendor: {
      ...JSON.parse(localStorage.getItem("vendorSearch") ?? "{}"),
    },
    flask: {
      ...JSON.parse(localStorage.getItem("flaskSearch") ?? "{}"),
    },
    expedition: {
      ...JSON.parse(localStorage.getItem("expedition") ?? "{}"),
    }
  })
  saveSettings(updatedSettings);
}