import tradeStatIds from "@poe/generated/mapmods/trade/TradeStatIdMatching.json";
import { MapSettings } from "../utils/SavedSettings";
import {tradeSearchBase} from "@shared/core/TradeUrlBuilder";

interface StatFilter {
  id: string;
  value?: { min: number };
}

interface StatGroup {
  type: "and" | "not" | "count" | "if";
  filters: StatFilter[];
  value?: { min: number };
}

export interface TradeSettings {
  badIds: number[];
  goodIds: number[];
  allGoodMods: boolean;
  quantity: string;
  packsize: string;
  itemRarity: string;
  currency: string;
  regex: string;
  eightModOnly: boolean;
  excludeValdo: boolean;
  excludeShaperElder: boolean;
  mapDropChance: string;
  quality: Omit<MapSettings["quality"], "regular">;
  anyQuality: boolean;
  corrupted: {
    enabled: boolean;
    include: boolean;
  };
  unidentified: {
    enabled: boolean;
    include: boolean;
  };
}

interface TradeQuery {
  query: {
    status: { option: string };
    stats?: StatGroup[];
    filters: {
      map_filters: {
        disabled: boolean;
        filters: {
          map_tier: { min: number };
          map_iiq?: { min: number };
          map_packsize?: { min: number };
          map_iir?: { min: number };
        };
      };
      type_filters?: {
        disabled: boolean;
        filters: {
          rarity?: { option: string };
          category?: { option: string };
        };
      };
      misc_filters?: {
        disabled: boolean;
        filters: {
          corrupted?: { option: "true" | "false" };
          identified?: { option: "true" | "false" };
          foil_variation?: { option: "none" };
        };
      };
    };
  };
  sort: { price: string };
}

export interface TradeSearchResult {
  success: boolean;
  url: string;
  error?: string;
}

const tradeStatMap = tradeStatIds as Record<string, string>;

function toStatFilters(ids: number[]): { id: string }[] {
  return ids
    .map((id) => tradeStatMap[id.toString()])
    .filter((statId): statId is string => statId !== undefined)
    .map((id) => ({ id }));
}

function parseMinFilter(value: string): { min: number } | undefined {
  const num = parseInt(value, 10);
  return !isNaN(num) && num > 0 ? { min: num } : undefined;
}

export function buildTradeQuery(settings: TradeSettings): TradeQuery {
  const query: TradeQuery = {
    query: {
      status: { option: "securable" },
      filters: {
        map_filters: {
          disabled: false,
          filters: {
            map_tier: { min: 16 },
          },
        },
        type_filters: {
          disabled: false,
          filters: {
            category: { option: "map" },
            rarity: { option: "nonunique" },
          },
        },
      },
    },
    sort: { price: "asc" },
  };

  const stats: StatGroup[] = [];

  const badFilters = toStatFilters(settings.badIds);
  if (badFilters.length > 0) {
    stats.push({ type: "not", filters: badFilters });
  }

  const goodFilters = toStatFilters(settings.goodIds);
  if (goodFilters.length > 0) {
    if (settings.allGoodMods) {
      stats.push({ type: "and", filters: goodFilters });
    } else {
      stats.push({ type: "count", filters: goodFilters, value: { min: 1 } });
    }
  }

  const andFilters: StatFilter[] = [];

  if (settings.eightModOnly) {
    andFilters.push({
      id: "pseudo.pseudo_number_of_affix_mods",
      value: { min: 8 },
    });
  }

  const mapDropMin = parseMinFilter(settings.mapDropChance);
  if (mapDropMin) {
    andFilters.push({
      id: "pseudo.pseudo_map_more_map_drops",
      value: mapDropMin,
    });
  }

  const currencyMin = parseMinFilter(settings.currency);
  if (currencyMin) {
    andFilters.push({
      id: "pseudo.pseudo_map_more_currency_drops",
      value: currencyMin,
    });
  }

  const qualityFilters: StatFilter[] = [];
  const pushQuality = (raw: string, id: string) => {
    const min = parseMinFilter(raw);
    if (min) qualityFilters.push({ id, value: min });
  };

  pushQuality(settings.quality.currency, "pseudo.pseudo_map_quality_currency");
  pushQuality(settings.quality.divination, "pseudo.pseudo_map_quality_cards");
  pushQuality(settings.quality.scarab, "pseudo.pseudo_map_quality_scarabs");
  pushQuality(settings.quality.rarity, "pseudo.pseudo_map_quality_rarity");
  pushQuality(settings.quality.packSize, "pseudo.pseudo_map_quality_pack_size");

  if (qualityFilters.length > 0) {
    if (settings.anyQuality && qualityFilters.length > 1) {
      stats.push({
        type: "count",
        filters: qualityFilters,
        value: { min: 1 },
      });
    } else {
      andFilters.push(...qualityFilters);
    }
  }

  if (settings.excludeShaperElder) {
    stats.push({
      type: "not",
      filters: [
        { id: "implicit.stat_1792283443|1" },
        { id: "implicit.stat_1792283443|2" },
      ],
    });
  }

  if (andFilters.length > 0) {
    stats.push({
      type: "and",
      filters: andFilters,
    });
  }

  if (stats.length > 0) {
    query.query.stats = stats;
  }

  const mapIiq = parseMinFilter(settings.quantity);
  const mapPacksize = parseMinFilter(settings.packsize);
  const mapIir = parseMinFilter(settings.itemRarity);

  if (mapIiq || mapPacksize || mapIir) {
    query.query.filters.map_filters.filters = {
      ...query.query.filters.map_filters.filters,
      ...(mapIiq && { map_iiq: mapIiq }),
      ...(mapPacksize && { map_packsize: mapPacksize }),
      ...(mapIir && { map_iir: mapIir }),
    };
  }

  if (
    settings.corrupted.enabled ||
    settings.unidentified.enabled ||
    settings.excludeValdo
  ) {
    query.query.filters.misc_filters = {
      disabled: false,
      filters: {
        ...(settings.corrupted.enabled && {
          corrupted: { option: settings.corrupted.include ? "true" : "false" },
        }),
        ...(settings.unidentified.enabled && {
          identified: {
            option: settings.unidentified.include ? "false" : "true",
          },
        }),
        ...(settings.excludeValdo && {
          foil_variation: { option: "none" },
        }),
      },
    };
  }

  return query;
}

export async function createTradeSearch(
  settings: TradeSettings,
  league: string,
): Promise<TradeSearchResult> {
  const query = buildTradeQuery(settings);

  try {
    const encodedQuery = encodeURIComponent(JSON.stringify(query));
    const url = `${tradeSearchBase("poe1")}/${encodeURIComponent(league)}?q=${encodedQuery}`;

    return {
      success: true,
      url,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Trade search failed:", error);

    return {
      success: false,
      url: `${tradeSearchBase("poe1")}/${encodeURIComponent(league)}`,
      error: message,
    };
  }
}

export async function openTradeSearch(
  settings: TradeSettings,
  league: string,
): Promise<TradeSearchResult> {
  const result = await createTradeSearch(settings, league);
  window.open(result.url, "_blank", "noopener,noreferrer");
  return result;
}
