// typedefs for data.poe.re/generated/poe2/<patch>/relic/Generated.Relic.<LANGUAGE>.json

export interface RelicRegex {
  affix: string;
  id: number;
  name: string;
  ranges: Array<Array<number>>;
  regex: string;
  values: Array<number>;
}

export type Relic = Array<RelicRegex>;
