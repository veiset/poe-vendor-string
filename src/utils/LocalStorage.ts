import {defaultSettings, SavedSettings} from "./SavedSettings";


export function merge(a: any, b: any): any {
  return [a, b].reduce((r, o) => Object
      .entries(o)
      .reduce((q, [k, v]) => ({
        ...q,
        [k]: v && typeof v === 'object' && !Array.isArray(v) ? merge(q[k] || {}, v) : v
      }), r),
    {});
}

interface SavedProfiles {
  [key: string]: SavedSettings
}

export const loadProfiles = (): SavedProfiles => {
  return safeLoad("profiles");
}

export const loadProfileNames = (): string[] => {
  return Object.keys(loadProfiles());
}

export const deleteProfile = (profile: string): void => {
  const profiles = loadProfiles();
  delete profiles[profile];
  localStorage.setItem("profiles", JSON.stringify(profiles));
}
export const loadSettings = (profile: string): SavedSettings => {
  const settings = loadProfiles()[profile] ?? {};
  return merge(defaultSettings, settings);
}

export const selectedProfile = (): string =>
  localStorage.getItem("selectedProfile") ?? "default";

export const setSelectedProfile = (name: string): void => {
  localStorage.setItem("selectedProfile", name);
}

export const saveSettings = (settings: SavedSettings): void => {
  localStorage.setItem("selectedProfile", settings.name);
  const profiles = loadProfiles();
  profiles[settings.name] = settings;
  localStorage.setItem("profiles", JSON.stringify(profiles));
}

const safeLoad = (key: string): any => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}") ?? {};
  } catch (e) {
    return {};
  }
}


export const valueFromKeyMap = (savedSettings: any, key: string): any | undefined => {
  const props = key.split(".");
  let obj = savedSettings;
  for (const prop of props) {
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, prop)) {
      return undefined;
    }
    obj = obj[prop];
  }
  return obj;
}

export const hasNKey = (savedSettings: any, key: string): boolean => {
  return valueFromKeyMap(savedSettings, key) === true;
}

export const hasNumberKey = (savedSettings: any, key: string): number | undefined => {
  const value = valueFromKeyMap(savedSettings, key);
  const isANumber = !isNaN(Number(value));
  return isANumber ? Number(value) : undefined;
}
