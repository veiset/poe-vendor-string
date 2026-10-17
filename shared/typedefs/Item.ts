// typedefs for data.poe.re/generated/<game>/<patch>/item/Generated.Item.<LANGUAGE>.json
// typedefs for data.poe.re/generated/<game>/<patch>/item/Generated.Basetypes.Item.<LANGUAGE>.json

export interface ItemRegex {
  basetype: string;
  categoryRegex: Array<CategoryRegex>;
}

export interface CategoryRegex {
  category: string;
  modifiers: Array<ItemAffixRegex>;
  warnings: Array<string>;
}

export interface ItemAffixRegex {
  affixes: Array<ItemAffix>;
  affixtype: string;
  after: Array<number>;
  before: Array<number>;
  desc: string;
  disabled: Array<number>;
  end: number;
  on: Array<number>;
  regex: string;
  start: number;
  stats: Array<ItemStat>;
}

export interface ItemAffix {
  desc: string;
  name: string;
}

export interface ItemStat {
  hasRange: boolean;
  id: string;
  max: number;
  min: number;
  numberIndex?: number | null;
}

export type ItemGenerated = Array<ItemRegex>;

export interface ItemBase {
  items: Array<string>;
  name: string;
}

export type ItemBasetypes = Array<ItemBase>;
