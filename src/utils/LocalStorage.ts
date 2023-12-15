export interface SavedSettings {
    version: number
    beast: BeastSettings
    heist: HeistSettings
}

export interface BeastSettings {
    includeHarvest: boolean
    minChaosValue: string
    maxChaosValue: string
}

export interface HeistSettings {

}

export const defaultSettings: SavedSettings = {
    version: 1,
    beast: {
        includeHarvest: true,
        minChaosValue: '',
        maxChaosValue: '',
    },
    heist: {

    }
}

export const loadSettings = (): SavedSettings => {
    const loaded = JSON.parse(localStorage.getItem("settings") ?? "{}");
    return {...defaultSettings, ...loaded};
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