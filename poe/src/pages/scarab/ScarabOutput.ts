import {ScarabSettings} from "@poe/utils/SavedSettings";
import type {Scarabs} from "@shared/typedefs/poe1/Scarabs";

export function generateScarabRegex(settings: ScarabSettings, scarabs: Scarabs): string {
  const regex = settings.selected.map((icon) => {
    return Object.values(scarabs).find((scarab) => scarab.icon === icon)?.regex;
  }).filter((regex): regex is string => regex !== undefined).join("|");
  return (regex.length > 0) ? `"${regex}"` : "";
}
