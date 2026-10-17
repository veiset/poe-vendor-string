import type {GGPKLanguageKey} from "@poe/utils/Languages";
import type {MapSettings} from "@poe/utils/SavedSettings";

export type MapType = keyof MapSettings["mapTypes"];

export const MAP_TYPE_LABELS: Record<MapType, string> = {
  shaper: "Shaper",
  elder: "Elder",
  conqueror: "Conqueror",
  originator: "Originator",
  blighted: "Blighted",
  blightRavaged: "Blight-ravaged",
};

// A part of each map type's line as the game shows it, found in no map mod (see MapTypes.test.ts).
// Case is kept as in the game text.
export const MapTypeRegex: Record<GGPKLanguageKey, Record<MapType, string>> = {
  ENGLISH: {shaper: "the shaper", elder: "the elder", conqueror: "citadel", originator: "originator", blighted: "25% value", blightRavaged: "50% value"},
  FRENCH: {shaper: "influence du", elder: "de l'Ancien", conqueror: "Citadelle", originator: "Instigateur", blighted: "à 20%", blightRavaged: "à 40%"},
  GERMAN: {shaper: "vom Schöpfer", elder: "Ältesten", conqueror: "Zitadelle", originator: "Erschafferin", blighted: "20% auch", blightRavaged: "40% auch"},
  JAPANESE: {shaper: "シェイパーのイン", elder: "エルダー", conqueror: "砦が出現", originator: "オリジネイター", blighted: "20%がブライト", blightRavaged: "40%がブライト"},
  KOREAN: {shaper: "쉐이퍼의 영향", elder: "엘더의", conqueror: "시타델", originator: "태초자", blighted: "25%만큼", blightRavaged: "50%만큼"},
  PORTUGUESE: {shaper: "da pelo Criador", elder: "pelo Ancião", conqueror: "Cidadela", originator: "Originadora", blighted: "20% de seu", blightRavaged: "40% de seu"},
  RUSSIAN: {shaper: "влиянием Создателя", elder: "Древнего", conqueror: "крепость", originator: "Источника", blighted: "маслами до 3 раз", blightRavaged: "размере 40%"},
  SPANISH: {shaper: "da por el Creador", elder: "el Antiguo", conqueror: "Ciudadela", originator: "Originadora", blighted: "Blight al 20%", blightRavaged: "Blight al 40%"},
  THAI: {shaper: "จาก เชปเปอร์", elder: "เอลเดอร์", conqueror: "หอคอยของ", originator: "ผู้รังสรรค์", blighted: "25% ของ", blightRavaged: "50% ของ"},
  CHINESE: {shaper: "塑界者控制", elder: "異界尊師", conqueror: "的壁壘", originator: "開創者", blighted: "20% 的值", blightRavaged: "40% 的值"},
};

export const selectedMapTypes = (mapTypes: MapSettings["mapTypes"], include: boolean): MapType[] =>
  (Object.keys(MAP_TYPE_LABELS) as MapType[]).filter((type) => mapTypes[type].enabled && mapTypes[type].include === include);

// The trade site finds map types by their implicit stat; blighted maps have their own map filters
export const MAP_TYPE_TRADE_STATS: Partial<Record<MapType, string[]>> = {
  shaper: ["implicit.stat_1792283443|1"],
  elder: ["implicit.stat_1792283443|2"],
  conqueror: ["implicit.stat_2563183002|1", "implicit.stat_2563183002|2", "implicit.stat_2563183002|3", "implicit.stat_2563183002|4"],
  originator: ["implicit.stat_2696470877"],
};
export const MAP_TYPE_TRADE_FILTERS = {blighted: "map_blighted", blightRavaged: "map_uberblighted"} as const;
