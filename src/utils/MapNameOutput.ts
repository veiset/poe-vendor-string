import {mapNames} from "../generated/GeneratedMapNames";
import {MapNameSettings} from "./SavedSettings";


export function generateMapNameStr(settings: MapNameSettings): string {
  const inclusions = generateMaps(settings);

  return `${inclusions}`.trim().replaceAll(/\s{2,}/g, " ");
}

function generateMaps(settings: MapNameSettings): string {
  const {selected} = settings;

  if (selected.length === 0) {
    return "";
  }

  const modStr = selected
    .map((m) => {
      return mapNames[m].matchSafe;
    })
    .join("|")
    .replaceAll('"', "");
  return `"${modStr}"`;
}