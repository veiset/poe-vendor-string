import {merge, saveSettings} from "./LocalStorage";
import {defaultSettings} from "./SavedSettings";

export function migrateSavedSettings_V1() {
  if (localStorage.getItem("profiles") !== null) {
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
  });
  saveSettings(updatedSettings);
  localStorage.removeItem("mapSearch");
  localStorage.removeItem("vendorSearch");
  localStorage.removeItem("flaskSearch");
  localStorage.removeItem("expedition");
}