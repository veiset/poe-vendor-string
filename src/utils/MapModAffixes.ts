import affixes from "../generated/mapmods/affixes/MapModAffixes.json";

const affixMap = affixes as Record<string, boolean>;

export const mapModIsPrefix = (tokenId: number): boolean | undefined => {
  const entry = affixMap[String(tokenId)];
  return typeof entry === "boolean" ? entry : undefined;
};

export const mapModAffixCount = (): number => Object.keys(affixMap).length;
