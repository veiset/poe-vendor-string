import {FlaskModGroup} from "../generated/GeneratedFlaskMods";

export interface FlaskModSettings {
    prefix: string[]
    suffix: string[]
    ilevel: string
    onlyMaxTierMod: boolean
}

export function generateFlaskOutput(modGroups: FlaskModGroup[], settings: FlaskModSettings): string {
    const {prefix, suffix, ilevel, onlyMaxTierMod} = settings;
    const ilevelNumber = isNaN(Number(ilevel)) ? 85 : Number(ilevel);

    const prefixRegex = prefix.map((p => {
        const mod = modGroups.find((modGroup) => modGroup.description == p);
        return mod ? findRegex(mod, ilevelNumber, onlyMaxTierMod) : undefined;
    })).filter((v) => v !== undefined).join("|");
    const suffixRegex = suffix.map((p => {
        const mod = modGroups.find((modGroup) => modGroup.description == p);
        return mod ? findRegex(mod, ilevelNumber, onlyMaxTierMod) : undefined;
    })).filter((v) => v !== undefined).join("|");

    if (prefixRegex.length > 0 && suffixRegex.length > 0) {
        return `"${prefixRegex}".*"${suffixRegex}"`;
    } else if (prefixRegex.length > 0) {
        return `"${prefixRegex}"`;
    } else if (suffixRegex.length > 0) {
        return `"${suffixRegex}"`;
    } else {
        return "";
    }
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