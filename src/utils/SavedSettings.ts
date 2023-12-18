import {ContractLevel} from "../pages/heist/Heist";
import {heistContractTypes} from "../generated/GeneratedHeist";

export const leagueName = "Affliction";

export interface SavedSettings {
  name: string
  version: number
  beast: BeastSettings
  heist: HeistSettings
  flask: FlaskSettings
  expedition: ExpeditionSettings
}

export interface BeastSettings {
  includeHarvest: boolean
  minChaosValue: string
  maxChaosValue: string
}

export interface HeistSettings {
  targetValue: number
  requireCoinValue: boolean
  contractLevels: ContractLevel[],
}

export interface FlaskSettings {
  selectedPrefix: string[]
  selectedSuffix: string[]
  ilevel: string
  onlyMaxPrefixTierMod: boolean
  onlyMaxSuffixTierMod: boolean
  matchBothPrefixAndSuffix: boolean
  ignoreEffectTiers: boolean
}

export interface ExpeditionSettings {
  selectedBaseTypes: string[]
  league: string
  addFillerItems: boolean,
  minValueToDisplay: number
  minAddValue: number
}

export const defaultSettings: SavedSettings = {
  name: "default",
  version: 1,
  beast: {
    includeHarvest: true,
    minChaosValue: '',
    maxChaosValue: '',
  },
  heist: {
    targetValue: 0,
    requireCoinValue: false,
    contractLevels:
      Object.keys(heistContractTypes)
        .map((key) => heistContractTypes[key])
        .map((type) => ({start: 0, end: 0, type})),
  },
  flask: {
    selectedPrefix: [],
    selectedSuffix: [],
    ilevel: "85",
    onlyMaxPrefixTierMod: false,
    onlyMaxSuffixTierMod: false,
    matchBothPrefixAndSuffix: false,
    ignoreEffectTiers: false,
  },
  expedition: {
    selectedBaseTypes: [],
    league: leagueName,
    addFillerItems: true,
    minValueToDisplay: 90,
    minAddValue: 0,
  }
}