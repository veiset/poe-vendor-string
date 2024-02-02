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
  map: MapSettings
  vendor: VendorSettings
  mapNames: MapNameSettings
  compass: CompassSettings
}

export interface BeastSettings {
  includeHarvest: boolean
  minChaosValue: string
  maxChaosValue: string
  menagerieLimit: boolean
  redBeastsOnly: boolean
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
  matchOpenPrefixSuffix: boolean
}

export interface ExpeditionSettings {
  selectedBaseTypes: string[]
  league: string
  addFillerItems: boolean,
  minValueToDisplay: number
  minAddValue: number
}

export interface MapSettings {
  badMods: string[]
  goodMods: string[]
  kirac: string[]
  allGoodMods: boolean
  quantity: string
  packsize: string
  optimizeQuant: boolean
  optimizePacksize: boolean
  rarity: {
    normal: boolean
    magic: boolean
    rare: boolean
    include: boolean
  }
}

export interface MapNameSettings {
  selected: string[]
}

export interface CompassSettings {
  selected: string[]
}

export interface VendorSettings {
  anyThreeLink: boolean
  anyFourLink: boolean
  anyFiveLink: boolean
  anySixLink: boolean
  anySixSocket: boolean
  movement: {
    ten: boolean
    fifteen: boolean
  }
  colors: {
    rrr: boolean
    ggg: boolean
    bbb: boolean

    rrA: boolean
    ggA: boolean
    bbA: boolean

    ggr: boolean
    ggb: boolean
    rrg: boolean
    rrb: boolean
    bbg: boolean
    bbr: boolean

    rgb: boolean

    raa: boolean
    gaa: boolean
    baa: boolean

    rr: boolean
    gg: boolean
    bb: boolean

    rb: boolean
    gr: boolean
    bg: boolean

    specLink: boolean
    specLinkColors: {
      r: number | undefined
      g: number | undefined
      b: number | undefined
    }
  }
  plusGems: {
    lightning: boolean
    fire: boolean
    cold: boolean
    phys: boolean
    chaos: boolean
    any: boolean
  }
  damage: {
    phys: boolean
    firemult: boolean
    coldmult: boolean
    chaosmult: boolean
  }
  weapon: {
    sceptre: boolean
    mace: boolean
    axe: boolean
    sword: boolean
    bow: boolean
    claw: boolean
    dagger: boolean
    staff: boolean
    wand: boolean
  }
}

export const defaultSettings: SavedSettings = {
  name: "default",
  version: 1,
  beast: {
    includeHarvest: true,
    minChaosValue: '',
    maxChaosValue: '',
    menagerieLimit: true,
    redBeastsOnly: true,
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
    matchBothPrefixAndSuffix: true,
    ignoreEffectTiers: false,
    matchOpenPrefixSuffix: true,
  },
  expedition: {
    selectedBaseTypes: [],
    league: leagueName,
    addFillerItems: true,
    minValueToDisplay: 90,
    minAddValue: 0,
  },
  map: {
    badMods: [],
    goodMods: [],
    kirac: [],
    allGoodMods: true,
    quantity: "",
    packsize: "",
    optimizeQuant: true,
    optimizePacksize: true,
    rarity: {
      normal: true,
      magic: true,
      rare: true,
      include: true,
    },
  },
  mapNames: {
    selected: [],
  },
  compass: {
    selected: [],
  },
  vendor: {
    anyThreeLink: false,
    anyFourLink: false,
    anyFiveLink: false,
    anySixLink: false,
    anySixSocket: false,
    movement: {
      ten: false,
      fifteen: false,
    },
    colors: {
      rrr: false,
      ggg: false,
      bbb: false,

      rrA: false,
      ggA: false,
      bbA: false,

      ggr: false,
      ggb: false,
      rrg: false,
      rrb: false,
      bbg: false,
      bbr: false,

      rgb: false,

      raa: false,
      gaa: false,
      baa: false,

      rr: false,
      gg: false,
      bb: false,

      rb: false,
      gr: false,
      bg: false,

      specLink: false,
      specLinkColors: {
        r: undefined,
        g: undefined,
        b: undefined,
      }
    },
    plusGems: {
      lightning: false,
      fire: false,
      cold: false,
      phys: false,
      chaos: false,
      any: false,
    },
    damage: {
      phys: false,
      firemult: false,
      coldmult: false,
      chaosmult: false,
    },
    weapon: {
      sceptre: false,
      mace: false,
      axe: false,
      sword: false,
      bow: false,
      claw: false,
      dagger: false,
      staff: false,
      wand: false,
    }
  }
}