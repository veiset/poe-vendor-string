export type AffixType = "PREFIX" | "SUFFIX";

export interface ItemStat {
  id: string;
  min: number;
  max: number;
  numberIndex: number;
  hasRange: boolean;
}

export interface RegexPosition {
  start: number;
  end: number;
  disabled: number[];
  before: number[];
  on: number[];
  after: number[];
}

export interface Affix {
  description: string;
  name: string;
}

export interface ItemModifier {
  description: string;
  regex: string;
  stats: ItemStat[];
  regexPosition: RegexPosition;
  affixes: Affix[];
  affixType: AffixType;
}

export interface ItemRegexCategory {
  modCategory: string;
  baseitems: string[];
  modifiers: ItemModifier[];
  warnings?: string[];
}

export interface ItemRegex {
  basetype: string;
  itemRegexForCategory: ItemRegexCategory[];
}

export interface Itembase {
  baseType: string,
  item: string,
}

