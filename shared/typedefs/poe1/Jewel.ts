// typedefs for data.poe.re/generated/poe1/<patch>/jewel/Generated.Jewel.json

export interface JewelOutput {
  abyss: Array<JewelRegex>;
  regular: Array<JewelRegex>;
}

export interface JewelRegex {
  regexAffix: string;
  isAbyss: boolean;
  isPrefix: boolean;
  mod: string;
  regex: string;
}

export type Jewel = JewelOutput;
