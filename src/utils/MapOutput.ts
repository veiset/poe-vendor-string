import {mapModifiers, kiracModifier} from "../generated/GeneratedMapMods";
import {MapSettings} from "./SavedSettings";


export function generateMapModStr(settings: MapSettings): string {
  const exclusions = generateBadMods(settings);
  const inclusions = generateGoodMods(settings);
  const kirac = generateKirac(settings);
  const quantity = addQuantifier("m q.*", generateNumberRegex(settings.quantity, settings.optimizeQuant));
  const packsize = addQuantifier("iz.*", generateNumberRegex(settings.packsize, settings.optimizePacksize));
  const rarity = addRarityRegex(settings.rarity.normal, settings.rarity.magic, settings.rarity.rare, settings.rarity.include);

  const result = `${exclusions} ${inclusions} ${quantity} ${packsize} ${rarity} ${kirac}`
    .trim().replaceAll(/\s{2,}/g, ' ');
  return optimize(result);
}

function addRarityRegex(normal: boolean, magic: boolean, rare: boolean, include: boolean): string {
  if (normal && magic && rare) {
    return include ? "" : `"!y: (n|m|r)"`;
  }
  const normalRegex = normal ? "n" : "";
  const magicRegex = magic ? "m" : "";
  const rareRegex = rare ? "r" : "";
  const result = [normalRegex, magicRegex, rareRegex]
    .filter((e) => e.length > 0)
    .join("|");

  const excludePrefix = include ? "" : "!";
  if (result.length === 0) return "";
  if (result.length === 1) return `"${excludePrefix}y: ${result}"`;
  if (result.length > 1) return `"${excludePrefix}y: (${result})"`;
  return "";
}

function addQuantifier(prefix: string, string: string) {
  if (string === "") {
    return "";
  }
  return `"${prefix}${string}%"`;
}

function optimize(string: string): string {
  return string
    .replaceAll("[8-9]", "[89]")
    .replaceAll("[9-9]", "9");
}

function generateBadMods(settings: MapSettings): string {
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

function generateGoodMods(settings: MapSettings): string {
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

function generateKirac(settings: MapSettings): string {
  const {kirac} = settings;

  if (kirac.length === 0) {
    return "";
  }

  const selectedKirac = kirac.map((m) => {
    return kiracModifier[m].matchSafe
  }).join("|");

  return `"(${selectedKirac}).*ici"`;

}

function generateNumberRegex(number: string, optimize: boolean): string {
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
    return `2..`;
  }
  if (quant > 100) {
    const str = quant.toString();
    const d0 = str[0];
    const d1 = str[1];
    const d2 = str[2];
    if (str[1] === "0" && str[2] === "0") {
      return `${d0}..`;
    } else if (str[2] === "0") {
      return `1[${d1}-9].`;
    } else if (str[1] === "0") {
      return `(\\d0[${d2}-9]|\\d[1-9].)`;
    } else if (str[1] === "9" && str[2] === "9") {
      return `199`;
    } else {
      if (d1 === "9") {
        return `19[${d2}-9]`;
      }
      return `1([${d1}-9][${d2}-9]|[${Number(d1) + 1}-9].)`;
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
      return `([${d0}-9].|1..)`;
    } else if (str[0] === "9") {
      return `(${d0}[${d1}-9]|1..)`;
    } else {
      return `(${d0}[${d1}-9]|[${Number(d0) + 1}-9].|1..)`;
    }
  }
  if (quant <= 9) {
    return `([${quant}-9]|\\d..?)`;
  }
  return number;
}
