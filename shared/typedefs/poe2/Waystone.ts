// typedefs for data.poe.re/generated/poe2/<patch>/waystone/Generated.Waystone.<LANGUAGE>.json

import type {RegexResult} from "../RegexResult";

export interface WaystoneOption {
  name: string;
  prefix: boolean;
  tags: Array<string>;
}

export type WaystoneRegex = RegexResult<WaystoneOption>;
