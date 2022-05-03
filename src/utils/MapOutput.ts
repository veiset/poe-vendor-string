import {mapModifiers} from "../generated/GeneratedMapMods";

export interface ModSettings {
    badMods: string[]
    goodMods: string[]
    allGoodMods: boolean
    quantity: string
    strictMatching: boolean
    optimizeQuant: boolean
}

export function generateMapModStr(settings: ModSettings): string {
    const exclusions = generateBadMods(settings);
    const inclusions = generateGoodMods(settings);
    const quantity = generateQuantity(settings);

    return `${exclusions} ${inclusions} ${quantity}`.trim();
}

function generateBadMods(settings: ModSettings): string {
    const {badMods, strictMatching} = settings;
    if (badMods.length === 0) {
        return "";
    }

    const modStr = badMods.map((m) => {
        const regex = strictMatching ? mapModifiers[m].matchSafe : mapModifiers[m].matchUnsafe;
        return regex.replaceAll("\"", "");
    }).join("|");
    return `"!${modStr}"`;
}

function generateGoodMods(settings: ModSettings): string {
    const {goodMods, allGoodMods, strictMatching} = settings;

    if (goodMods.length === 0) {
        return "";
    }

    if (allGoodMods) {
        return goodMods.map((m) => {
            return strictMatching ? mapModifiers[m].matchSafe : mapModifiers[m].matchUnsafe;
        }).join(" ");
    } else {
        const modStr = goodMods.map((m) => {
            return strictMatching ? mapModifiers[m].matchSafe : mapModifiers[m].matchUnsafe;
        }).join("|").replaceAll("\"", "")
        return `"${modStr}"`
    }
}

function generateQuantity(settings: ModSettings): string {
    const {quantity , optimizeQuant} = settings;
    const numbers = quantity.match(/\d/g);
    if (numbers === null) {
        return "";
    }
    const quant = optimizeQuant
        ? Math.floor((Number(numbers.join("")) / 10)) * 10
        : Number(numbers.join(""));
    if (isNaN(quant) || quant === 0) {
        return "";
    }
    if (quant >= 200) {
        return `"m q.*(2\\d{2})"`;
    }
    if (quant > 100) {
        const str = quant.toString();
        const d0 = str[0];
        const d1 = str[1];
        const d2 = str[2];
        if (str[1] === "0" && str[2] === "0") {
            return `"m q.*(${d0}\\d{2})"`;
        } else if (str[2] === "0") {
            return `"m q.*(\\d[${d1}-9]\\d)"`;
        } else if (str[1] === "0") {
            return `"m q.*(\\d0[${d2}-9]\\d|\\d[1-9]\\d)"`;
        } else {
            return `"m q.*(1[${d1}-9][${d2}-9]|1[${Number(d1) + 1}-9]\\d)"`;
        }
    }
    if (quant === 100) {
        return `"m q.*(\\d{3})"`;
    }
    if (quant > 9) {
        const str = quant.toString();
        const d0 = str[0];
        const d1 = str[1];
        if (str[1] === "0") {
            return `"m q.*([${d0}-9]\\d|\\d{3})"`;
        } else {
            return `"m q.*(${d0}[${d1}-9]|[${Number(d0) + 1}-9]\\d|\\d{3})"`;
        }
    }
    if (quant <= 9) {
        return `"m q.*([${quant}-9]|\\d\\d\\d?)"`;
    }
    return quantity;
}