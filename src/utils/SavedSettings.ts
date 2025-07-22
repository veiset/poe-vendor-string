import {ContractLevel} from "../pages/heist/Heist";
import {heistContractTypes} from "../generated/GeneratedHeist";
import {ItemCategory, MagicItemType, SelectedMod} from "../pages/magicitem/MagicItem";
import {Itembase} from "../pages/item/ItemBaseSelector";
import {RareModSelection} from "../pages/item/RareItemSelect";
import {SelectedMagicMod} from "../pages/item/MagicItemSelect";

export const leagueName = "Mercenaries";
export const categories: ItemCategory[] = [
  {
    name: "One Handed Weapons", itemType: [
      {name: "Claws", modKey: "Claws"},
      {name: "Daggers", modKey: "Daggers"},
      {name: "Wands", modKey: "Wands"},
      {name: "One Hand Swords", modKey: "One Hand Swords"},
      {name: "Thrusting One Hand Swords", modKey: "Thrusting One Hand Swords"},
      {name: "One Hand Axes", modKey: "One Hand Axes"},
      {name: "One Hand Maces", modKey: "One Hand Maces"},
      {name: "Sceptres", modKey: "Sceptres"},
      {name: "Rune Daggers", modKey: "Rune Daggers"},
    ]
  },
  {
    name: "Two Handed Weapons", itemType: [
      {name: "Bows", modKey: "Bows"},
      {name: "Staves", modKey: "Staves"},
      {name: "Two Hand Swords", modKey: "Two Hand Swords"},
      {name: "Two Hand Axes", modKey: "Two Hand Axes"},
      {name: "Two Hand Maces", modKey: "Two Hand Maces"},
      {name: "Warstaves", modKey: "Warstaves"},
      {name: "Fishing Rods", modKey: "Fishing Rods"},
    ]
  },
  {
    name: "Offhand", itemType: [
      {name: "Quivers", modKey: "Quivers"},
      {name: "Shields (str)", modKey: "Shields (str)"},
      {name: "Shields (dex)", modKey: "Shields (dex)"},
      {name: "Shields (int)", modKey: "Shields (int)"},
      {name: "Shields (str / dex)", modKey: "Shields (str, dex)"},
      {name: "Shields (str / int)", modKey: "Shields (str, int)"},
      {name: "Shields (dex / int)", modKey: "Shields (dex, int)"},
    ],
  },
  {
    name: "Jewellery", itemType: [
      {name: "Amulets", modKey: "Amulets"},
      {name: "Rings", modKey: "Rings"},
      {name: "Belts", modKey: "Belts"},
    ]
  },
  {
    name: "Gloves", itemType: [
      {name: "Gloves (str)", modKey: "Gloves (str)"},
      {name: "Gloves (dex)", modKey: "Gloves (dex)"},
      {name: "Gloves (int)", modKey: "Gloves (int)"},
      {name: "Gloves (str / dex)", modKey: "Gloves (str, dex)"},
      {name: "Gloves (str / int)", modKey: "Gloves (str, int)"},
      {name: "Gloves (dex / int)", modKey: "Gloves (dex, int)"},
    ]
  },
  {
    name: "Boots", itemType: [
      {name: "Boots (str)", modKey: "Boots (str)"},
      {name: "Boots (dex)", modKey: "Boots (dex)"},
      {name: "Boots (int)", modKey: "Boots (int)"},
      {name: "Boots (str / dex)", modKey: "Boots (str, dex)"},
      {name: "Boots (str / int)", modKey: "Boots (str, int)"},
      {name: "Boots (dex / int)", modKey: "Boots (dex, int)"},
    ]
  },
  {
    name: "Helmets", itemType: [
      {name: "Helmets (str)", modKey: "Helmets (str)"},
      {name: "Helmets (dex)", modKey: "Helmets (dex)"},
      {name: "Helmets (int)", modKey: "Helmets (int)"},
      {name: "Helmets (str / dex)", modKey: "Helmets (str, dex)"},
      {name: "Helmets (str / int)", modKey: "Helmets (str, int)"},
      {name: "Helmets (dex / int)", modKey: "Helmets (dex, int)"},
    ]
  },
  {
    name: "Body Armours", itemType: [
      {name: "Body Armours (str)", modKey: "Body Armours (str)"},
      {name: "Body Armours (dex)", modKey: "Body Armours (dex)"},
      {name: "Body Armours (int)", modKey: "Body Armours (int)"},
      {name: "Body Armours (str / dex)", modKey: "Body Armours (str, dex)"},
      {name: "Body Armours (str / int)", modKey: "Body Armours (str, int)"},
      {name: "Body Armours (dex / int)", modKey: "Body Armours (dex, int)"},
    ]
  },
  {
    name: "Flasks", itemType: [
      {name: "Tinctures", modKey: "Tinctures"},
    ]
  },
]

export interface SavedSettings {
  name: string
  version: number
  beast: BeastSettings
  heist: HeistSettings
  flask: FlaskSettings
  expedition: ExpeditionSettings
  map: MapSettings
  item: ItemSettings
  mapT17: MapT17Settings
  vendor: VendorSettings
  mapNames: MapNameSettings
  scarab: ScarabSettings
  jewel: JewelSettings
  itemCrafting: ItemCraftingSettings
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

export interface ItemSettings {
  synthItem: boolean
  matchAnyAffix: boolean
  matchOpenAffix: boolean
  category: ItemCategory
  itemType: MagicItemType
  selected: SelectedMod[]
  customText: {
    value: string,
    enabled: boolean,
  }
}

export interface ItemCraftingSettings {
  itembase: Itembase | undefined
  selectedRareMods: { [p: string]: RareModSelection }
  selectedMagicMods: SelectedMagicMod[]
  rareSettings: {
    matchAnyMod: boolean,
  }
  magicSettings: {
    onlyIfBothPrefixAndSuffix: boolean,
    matchOpenAffix: boolean,
  }
}

export interface MapSettings {
  badIds: number[]
  goodIds: number[]
  allGoodMods: boolean
  quantity: string
  packsize: string
  optimizeQuant: boolean
  optimizePacksize: boolean
  optimizeQuality: boolean
  t17: boolean
  rarity: {
    normal: boolean
    magic: boolean
    rare: boolean
    include: boolean
  },
  corrupted: {
    enabled: boolean,
    include: boolean,
  }
  quality: {
    regular: string,
    currency: string,
    divination: string,
    rarity: string,
    packSize: string,
    scarab: string,
  }
  anyQuality: boolean,
  customText: {
    value: string,
    enabled: boolean,
  },
  mapDropChance: string,
}

export interface MapT17Settings {
  mods: string[]
  quantity: string
  packsize: string
  optimizeQuant: boolean
  optimizePacksize: boolean
}

export interface MapNameSettings {
  selected: string[]
  mapTabSearch: boolean
}

export interface ScarabSettings {
  selected: string[]
  maxPrice: string
  minPrice: string
}

export interface JewelSettings {
  allMatch: boolean
  magicOnly: boolean
  abyssJewel: boolean
  selectedRegular: string[]
  selectedAbyss: string[]
  matchBothPrefixAndSuffix: boolean
  matchOpenPrefixSuffix: boolean
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
  gems?: string[]
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
    minAddValue: 90,
  },
  item: {
    synthItem: false,
    matchAnyAffix: false,
    matchOpenAffix: true,
    category: categories[0],
    itemType: categories[0].itemType[0],
    selected: [],
    customText: {
      value: "",
      enabled: true,
    }
  },
  map: {
    goodIds: [],
    badIds: [],
    allGoodMods: true,
    quantity: "",
    packsize: "",
    optimizeQuant: false,
    optimizePacksize: false,
    optimizeQuality: false,
    t17: false,
    rarity: {
      normal: true,
      magic: true,
      rare: true,
      include: true,
    },
    corrupted: {
      enabled: false,
      include: true,
    },
    quality: {
      regular: "",
      currency: "",
      divination: "",
      rarity: "",
      packSize: "",
      scarab: "",
    },
    anyQuality: true,
    customText: {
      value: "",
      enabled: true,
    },
    mapDropChance: "",
  },
  mapT17: {
    mods: [],
    quantity: "",
    packsize: "",
    optimizeQuant: false,
    optimizePacksize: false,
  },
  mapNames: {
    selected: [],
    mapTabSearch: false,
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
  },
  scarab: {
    selected: [],
    maxPrice: "0.81",
    minPrice: "0.00"
  },
  jewel: {
    allMatch: false,
    magicOnly: true,
    abyssJewel: false,
    matchBothPrefixAndSuffix: true,
    matchOpenPrefixSuffix: true,
    selectedRegular: [],
    selectedAbyss: [],
  },
  itemCrafting: {
    itembase: undefined,
    selectedRareMods: {},
    selectedMagicMods: [],
    rareSettings: {
      matchAnyMod: false,
    },
    magicSettings: {
      onlyIfBothPrefixAndSuffix: true,
      matchOpenAffix: true,
    },
  }
}