// typedefs for data.poe.re/generated/poe1/<patch>/gems/Generated.Gems.<LANGUAGE>.json

import type {RegexResult} from "../RegexResult";

export interface GemOption {
  c: string;
  regexNoTransfiguredMatch: string;
  support: boolean;
}

export type GemsRegex = RegexResult<GemOption>;
