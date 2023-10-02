import {mapModifiers} from "../generated/GeneratedMapMods";

export interface MapModSettings {
    badMods: string[]
    goodMods: string[]
    allGoodMods: boolean
    quantity: string
    packsize: string
    optimizeQuant: boolean
    optimizePacksize: boolean
}

export function generateMapModStr(settings: MapModSettings): string {
    const exclusions = generateBadMods(settings);
    const inclusions = generateGoodMods(settings);
    const quantity = addPrefix("m q.*", generateNumberRegex(settings.quantity, settings.optimizeQuant));
    const packsize = addPrefix("iz.*", generateNumberRegex(settings.packsize, settings.optimizePacksize));

    const result = `${exclusions} ${inclusions} ${quantity} ${packsize}`
        .trim().replaceAll(/\s{2,}/g, ' ');
    return optimize(result);
}

function addPrefix(prefix: string, string: string) {
   if (string === "") {
       return "";
   }
   return `"${prefix}${string}"`;
}

function optimize(string: string): string {
    return string
        .replaceAll("[8-9]", "[89]")
        .replaceAll("[9-9]", "9");
}

function generateBadMods(settings: MapModSettings): string {
    const {badMods} = settings;
    if (badMods.length === 0) {
        return "";
    }

    const modStr = badMods.map((m) => {
        const regex = mapModifiers[m].matchSafe;
        return regex.replaceAll("\"", "");
    }).join("|");
    return `"!${modStr}"`;
}

function generateGoodMods(settings: MapModSettings): string {
    const {goodMods, allGoodMods} = settings;

    if (goodMods.length === 0) {
        return "";
    }

    if (allGoodMods) {
        return goodMods.map((m) => {
            return mapModifiers[m].matchSafe;
        }).join(" ");
    } else {
        const modStr = goodMods.map((m) => {
            return mapModifiers[m].matchSafe;
        }).join("|").replaceAll("\"", "")
        return `"${modStr}"`
    }
}

export function generateNumberRegex(number: string, optimize: boolean): string {
    const numbers = number.match(/\d/g);
    if (numbers === null) {
        return "";
    }
    const quant = optimize
        ? Math.floor((Number(numbers.join("")) / 10)) * 10
        : Number(numbers.join(""));
    if (isNaN(quant) || quant === 0) {
        return "";
    }
    if (quant >= 200) {
        return `(2\\d{2})`;
    }
    if (quant > 100) {
        const str = quant.toString();
        const d0 = str[0];
        const d1 = str[1];
        const d2 = str[2];
        if (str[1] === "0" && str[2] === "0") {
            return `(${d0}\\d{2})`;
        } else if (str[2] === "0") {
            return `(\\d[${d1}-9]\\d)`;
        } else if (str[1] === "0") {
            return `(\\d0[${d2}-9]|\\d[1-9]\\d)`;
        } else if (str[1] === "9" && str[2] === "9") {
            return `(199)`;
        } else {
            if (d1 === "9") {
                return `(19[${d2}-9])`;
            }
            return `(1[${d1}-9][${d2}-9]|1[${Number(d1) + 1}-9]\\d)`;
        }
    }
    if (quant === 100) {
        return `(\\d{3})`;
    }
    if (quant > 9) {
        const str = quant.toString();
        const d0 = str[0];
        const d1 = str[1];
        if (str[1] === "0") {
            return `([${d0}-9]\\d|\\d{3})`;
        }
        else if (str[0] === "9") {
            return `(${d0}[${d1}-9]|\\d{3})`;
        }
        else {
            return `(${d0}[${d1}-9]|[${Number(d0) + 1}-9]\\d|\\d{3})`;
        }
    }
    if (quant <= 9) {
        return `([${quant}-9]|\\d\\d\\d?)`;
    }
    return number;
}