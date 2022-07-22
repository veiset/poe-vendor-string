import {FlaskModGroup} from "../generated/GeneratedFlaskMods";

export interface FlaskModSettings {
    prefix: string[]
    suffix: string[]
    ilevel: string
    onlyMaxPrefixTierMod: boolean
    onlyMaxSuffixTierMod: boolean
    matchBothPrefixAndSuffix: boolean
}


export function minItemLevel(modGroups: FlaskModGroup[], settings: FlaskModSettings): string | undefined {
    const {prefix, suffix, ilevel, onlyMaxPrefixTierMod, onlyMaxSuffixTierMod } = settings;
    const ilevelNumber = isNaN(Number(ilevel)) ? 85 : Number(ilevel);
    if (!onlyMaxSuffixTierMod && !onlyMaxPrefixTierMod) return undefined;

    const itemLevels = prefix.concat(suffix).map((modStr) => {
        const mod = modGroups.find((modGroup) => modGroup.description === modStr);
        return mod ? findIlevel(mod, ilevelNumber) : undefined;
    })
        .filter((i) => { return i !== undefined}) as number[];

    if (itemLevels.length === 0) {
        return undefined;
    }
    const minIlevel = Math.max(...itemLevels);
    return `minimum flask item level: ${minIlevel}`;
}

export function generateFlaskOutput(modGroups: FlaskModGroup[], settings: FlaskModSettings): string {
    const {prefix, suffix, ilevel, onlyMaxPrefixTierMod, onlyMaxSuffixTierMod, matchBothPrefixAndSuffix} = settings;
    const ilevelNumber = isNaN(Number(ilevel)) ? 85 : Number(ilevel);

    const prefixRegex = prefix.map((p => {
        const mod = modGroups.find((modGroup) => modGroup.description === p);
        return mod ? findRegex(mod, ilevelNumber, onlyMaxPrefixTierMod) : undefined;
    })).filter((v) => v !== undefined).join("|");

    const suffixRegex = suffix.map((p => {
        const mod = modGroups.find((modGroup) => modGroup.description === p);
        return mod ? findRegex(mod, ilevelNumber, onlyMaxSuffixTierMod) : undefined;
    })).filter((v) => v !== undefined).join("|");

    if (prefixRegex.length > 0 && suffixRegex.length > 0) {
        if (matchBothPrefixAndSuffix) {
            return `"${prefixRegex}".*"${suffixRegex}"`;
        } else {
            return `"${prefixRegex}|${suffixRegex}"`;
        }
    } else if (prefixRegex.length > 0) {
        return `"${prefixRegex}"`;
    } else if (suffixRegex.length > 0) {
        return `"${suffixRegex}"`;
    } else {
        return "";
    }
}

function findIlevel(modGroup: FlaskModGroup, ilevelNumber: number): number | undefined {
    const possibleMods = modGroup.mods.filter((m) => m.level <= ilevelNumber);
    if (possibleMods.length > 0) {
        return possibleMods.reduce((a, b) => a.level > b.level ? a : b).level
    }
    return undefined;
}

function findRegex(modGroup: FlaskModGroup, ilevelNumber: number, onlyMaxTierMod: boolean): string | undefined {
    const possibleMods = modGroup.mods.filter((m) => m.level <= ilevelNumber);
    if (onlyMaxTierMod && possibleMods.length > 0) {
        return possibleMods.reduce((a, b) => a.level > b.level ? a : b).regex
    }
    if (!onlyMaxTierMod && modGroup.minLevel <= ilevelNumber) {
        return modGroup.regex;
    }
    return undefined;
}