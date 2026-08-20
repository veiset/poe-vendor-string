import {PageNavigation} from "@shared/components/PageNavigation";
import type {NavigationItem} from "@shared/components/PageNavigation";
import vendorIcon from "@shared/img/linkicons/fusing.png";
import mapIcon from "@shared/img/linkicons/crimson_temple_map.png";
import boatIcon from "@shared/img/chart.png";
import alterationIcon from "@shared/img/linkicons/alteration.png";
import mapNameIcon from "@shared/img/linkicons/chateau_map.png";
import heistIcon from "@shared/img/linkicons/blueprint.png";
import expeditionIcon from "@shared/img/linkicons/expeidition_reroll.png";
import jewelIcon from "@shared/img/linkicons/cobalt.png";
import beastIcon from "@shared/img/BestiaryOrbFull.png";
import scarabIcon from "@shared/img/scarab.png";
import tattooIcon from "@shared/img/tattoo.png";
import runegraftIcon from "@shared/img/runegraft.png";

const items: NavigationItem[] = [
  {text: "Vendor", icon: vendorIcon, route: "/vendor"},
  {text: "Map mods", icon: mapIcon, route: "/maps"},
  {text: "Boat", icon: boatIcon, route: "/boat"},
  {text: "Items", icon: alterationIcon, route: "/items"},
  {text: "Map names", icon: mapNameIcon, route: "/mapnames"},
  {text: "Expedition", icon: expeditionIcon, route: "/expedition"},
  {text: "Heist", icon: heistIcon, route: "/heist"},
  {text: "Bestiary", icon: beastIcon, route: "/beast"},
  {text: "Tattoo", icon: tattooIcon, route: "/tattoo"},
  {text: "Runegraft", icon: runegraftIcon, route: "/runegraft"},
  {text: "Scarab", icon: scarabIcon, route: "/scarab"},
  {text: "Jewel", icon: jewelIcon, route: "/jewel"},
];

const PageLinks = () => (
  <PageNavigation
    otherGameLabel="Path of Exile 2 Regex"
    otherGameUrl={`${import.meta.env.VITE_POE2_URL || "https://poe2.re"}/vendor`}
    statsUrl="https://p.vz.is/poe.re"
    items={items}
  />
);

export default PageLinks;
