import {ScarabSettings} from "../../utils/SavedSettings";
import {scarabs} from "../../generated/GeneratedScarabs";

export function generateScarabRegex(settings: ScarabSettings): string {
  const regex = settings.selected.map((scarab) => {
    return scarabs[scarab].regex
  }).join("|");
  return (regex.length > 0) ? `"${regex}"` : "";
}