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

export const loadSettings = (): SavedSettings => {
  const loaded = JSON.parse(localStorage.getItem("settings") ?? "{}");
  return merge(defaultSettings, loaded) as SavedSettings;
}

export const saveSettings = (settings: SavedSettings): void => {
  localStorage.setItem("settings", JSON.stringify(settings));
}

export const hasKey = (savedSettings: any, key: string): boolean => {
  return savedSettings !== undefined && savedSettings.hasOwnProperty(key)
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
