// typedefs for data.poe.re/generated/poe1/<patch>/mapmods/Generated.Map.<LANGUAGE>.json

import type {RegexResult} from "../RegexResult";

export interface MapOption {
  nm: boolean;
  prefix: boolean;
  rewards: Array<string>;
  scary: number;
}

export type MapModsRegex = RegexResult<MapOption>;
