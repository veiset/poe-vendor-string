// @formatter:off
export interface RunegraftRegex {
  runegraft: string
  description: string
  regex: string
}

export const runegraftRegex: RunegraftRegex[] = [
  { runegraft: "Runegraft of the Angler", description: "Critical Strikes while holding a Fishing Rod", regex: "Rod" },
  { runegraft: "Runegraft of Gemcraft", description: "+1 to Level of all non-Exceptional Support Gems", regex: "Gem" },
  { runegraft: "Runegraft of Stability", description: "Your Lucky or Unlucky effects are instead Unexciting", regex: "Luc" },
  { runegraft: "Runegraft of the Witchmark", description: "Spells deal added Chaos Damage equal to 2% of your maximum Life", regex: "fe s" },
  { runegraft: "Runegraft of the Soulwick", description: "Gain 1 Vaal Soul per second", regex: "1 V" },
  { runegraft: "Runegraft of the Warp", description: "Buffs on you expire 30% slower", regex: "Deb" },
  { runegraft: "Runegraft of the Bound", description: "Reduced bonuses gained from Equipped Boots", regex: "Bou" },
  { runegraft: "Runegraft of Time", description: "Chance for Skills to not consume a Cooldown", regex: "a C" },
  { runegraft: "Runegraft of the Fortress", description: "Increased Global Defences", regex: "Def" },
  { runegraft: "Runegraft of Treachery", description: "Increased Reservation Efficiency of Skills", regex: "15%" },
  { runegraft: "Runegraft of Refraction", description: "Skills Chain +1 times", regex: "Ref" },
  { runegraft: "Runegraft of Quaffing", description: "Reduced Mana Recovery from Flasks", regex: "25%" },
  { runegraft: "Runegraft of Blasphemy", description: "Chance to Curse non-Cursed Enemies", regex: "Hex" },
  { runegraft: "Runegraft of Loyalty", description: "Chance for Elemental Ailments to be inflicted on Minion", regex: "Loy" },
  { runegraft: "Runegraft of Bellows", description: "Increased Warcry Speed", regex: "100" },
  { runegraft: "Runegraft of the Combatant", description: "Increased Attack Damage against Enemies with higher Life", regex: "50%" },
  { runegraft: "Runegraft of the Sinistral", description: "More Attack speed with Offhand", regex: "Sin" },
  { runegraft: "Runegraft of the River", description: "Chance on reaching Low Life to recover to Full Life", regex: "Riv" },
  { runegraft: "Runegraft of the Novamark", description: "Nova Spells Cast at a Marked target", regex: "Nov" },
  { runegraft: "Runegraft of Restitching", description: "Damage taken from Critical Strikes Recouped as Life", regex: "ken" },
  { runegraft: "Runegraft of the Jeweller", description: "Increased Damage for each unlinked Socket", regex: "Two" },
]