// import { mapModifiers } from "../generated/GeneratedMapMods";
import { mapNames } from "../generated/GeneratedMapNames";

export interface MapNameSettings {
  maps: string[];
}

export function generateMapNameStr(settings: MapNameSettings): string {
  const inclusions = generateMaps(settings);

  const result = `${inclusions}`.trim().replaceAll(/\s{2,}/g, " ");
  return optimize(result);
}

function optimize(string: string): string {
  return string.replaceAll("[8-9]", "[89]").replaceAll("[9-9]", "9");
}

function generateMaps(settings: MapNameSettings): string {
  const { maps } = settings;

  if (maps.length === 0) {
    return "";
  }

  const modStr = maps
    .map((m) => {
      return mapNames[m].matchSafe;
    })
    .join("|")
    .replaceAll('"', "");
  return `"${modStr}"`;

  // if (true) {
  //     return maps.map((m) => {
  //         return mapNames[m].matchSafe;
  //     }).join(" ");
  // } else {
  //     const modStr = maps.map((m) => {
  //         return mapNames[m].matchSafe;
  //     }).join("|").replaceAll("\"", "")
  //     return `"${modStr}"`
  // }
}
