export const hasKey = (savedSettings: any, key: string): boolean => {
    return savedSettings !== undefined && savedSettings.hasOwnProperty(key)
}

export const hasNKey = (savedSettings: any, key: string): boolean => {
    const props = key.split(".");
    let obj = savedSettings;
    for (const prop of props) {
        if (!obj || !Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
        obj = obj[prop];
    }
    return obj === true;
}