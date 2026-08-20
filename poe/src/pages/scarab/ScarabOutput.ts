import {ScarabSettings} from "@poe/utils/SavedSettings";
import {scarabs} from "@poe/generated/GeneratedScarabs";

export function generateScarabRegex(settings: ScarabSettings): string {
  const regex = settings.selected.map((scarab) => {
    return scarabs[scarab].regex
  }).join("|");
  return (regex.length > 0) ? `"${regex}"` : "";
}