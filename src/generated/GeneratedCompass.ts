export interface Compass {
  mod: string
  matchSafe: string
}
 
export const compasses: { [key: string]: Compass } = {
 "Map Bosses drop an additional Unique Item": {
   mod: "Map Bosses drop an additional Unique Item",
   matchSafe: "\"es drop an\"",
 },
 "Map Bosses deal #% more Damage\nMap Bosses have #% more Life\nAn additional Shaper Guardian Map drops on Completing your Maps": {
   mod: "Map Bosses deal #% more Damage\nMap Bosses have #% more Life\nAn additional Shaper Guardian Map drops on Completing your Maps",
   matchSafe: "hap",
 },
 "Map Bosses deal #% more Damage\nMap Bosses have #% more Life\nAn additional Elder Guardian Map drops on Completing your Maps": {
   mod: "Map Bosses deal #% more Damage\nMap Bosses have #% more Life\nAn additional Elder Guardian Map drops on Completing your Maps",
   matchSafe: "eld",
 },
 "Map Bosses deal #% more Damage\nMap Bosses have #% more Life\nAn additional Conqueror Map drops on Completing your Maps": {
   mod: "Map Bosses deal #% more Damage\nMap Bosses have #% more Life\nAn additional Conqueror Map drops on Completing your Maps",
   matchSafe: "onq",
 },
 "Items found in your Identified Maps are Identified\n#% increased Pack Size in your Unidentified Maps": {
   mod: "Items found in your Identified Maps are Identified\n#% increased Pack Size in your Unidentified Maps",
   matchSafe: "ide",
 },
 "Players and Monsters take #% increased Fire Damage\nYour Maps contain # additional packs of Monsters that deal Fire Damage": {
   mod: "Players and Monsters take #% increased Fire Damage\nYour Maps contain # additional packs of Monsters that deal Fire Damage",
   matchSafe: "ire",
 },
 "Players and Monsters take #% increased Cold Damage\nYour Maps contain # additional packs of Monsters that deal Cold Damage": {
   mod: "Players and Monsters take #% increased Cold Damage\nYour Maps contain # additional packs of Monsters that deal Cold Damage",
   matchSafe: "col",
 },
 "Players and Monsters take #% increased Lightning Damage\nYour Maps contain # additional packs of Monsters that deal Lightning Damage": {
   mod: "Players and Monsters take #% increased Lightning Damage\nYour Maps contain # additional packs of Monsters that deal Lightning Damage",
   matchSafe: "tn",
 },
 "Players and Monsters take #% increased Physical Damage\nYour Maps contain # additional packs of Monsters that deal Physical Damage": {
   mod: "Players and Monsters take #% increased Physical Damage\nYour Maps contain # additional packs of Monsters that deal Physical Damage",
   matchSafe: "hy",
 },
 "Players and Monsters take #% increased Chaos Damage\nYour Maps contain # additional packs of Monsters that deal Chaos Damage": {
   mod: "Players and Monsters take #% increased Chaos Damage\nYour Maps contain # additional packs of Monsters that deal Chaos Damage",
   matchSafe: "ao",
 },
 "Unique Monsters drop Corrupted Items": {
   mod: "Unique Monsters drop Corrupted Items",
   matchSafe: "\"p c\"",
 },
 "Map Bosses deal #% increased Damage\nYour Maps have #% Quality": {
   mod: "Map Bosses deal #% increased Damage\nYour Maps have #% Quality",
   matchSafe: "\"% q\"",
 },
 "Map Bosses have #% increased Life\nQuality bonus of your Maps also applies to Rarity of Items found": {
   mod: "Map Bosses have #% increased Life\nQuality bonus of your Maps also applies to Rarity of Items found",
   matchSafe: "bon",
 },
 "Your Maps are Alluring": {
   mod: "Your Maps are Alluring",
   matchSafe: "all",
 },
 "Your Maps contain Einhar": {
   mod: "Your Maps contain Einhar",
   matchSafe: "ein",
 },
 "Your Maps contain Alva": {
   mod: "Your Maps contain Alva",
   matchSafe: "lv",
 },
 "Your Maps contain Niko": {
   mod: "Your Maps contain Niko",
   matchSafe: "ik",
 },
 "Your Maps contain Jun": {
   mod: "Your Maps contain Jun",
   matchSafe: "ju",
 },
 "Your Maps contain # additional Strongboxes\nStrongboxes in your Maps are Corrupted\nStrongboxes in your Maps are at least Rare": {
   mod: "Your Maps contain # additional Strongboxes\nStrongboxes in your Maps are Corrupted\nStrongboxes in your Maps are at least Rare",
   matchSafe: "xe",
 },
 "Map Bosses of your Corrupted Maps drop # additional Vaal Items\nItems found in your Maps have #% chance to be Corrupted": {
   mod: "Map Bosses of your Corrupted Maps drop # additional Vaal Items\nItems found in your Maps have #% chance to be Corrupted",
   matchSafe: "\"es o\"",
 },
 "#% increased Magic Pack Size": {
   mod: "#% increased Magic Pack Size",
   matchSafe: "\"c p\"",
 },
 "Rogue Exiles deal #% increased Damage\nRogue Exiles drop # additional Jewels\nRogue Exiles in your Maps have #% increased Life\nYour Maps are inhabited by # additional Rogue Exiles": {
   mod: "Rogue Exiles deal #% increased Damage\nRogue Exiles drop # additional Jewels\nRogue Exiles in your Maps have #% increased Life\nYour Maps are inhabited by # additional Rogue Exiles",
   matchSafe: "xi",
 },
 "Your Magic Maps contain # additional packs of Magic Monsters\nYour Normal Maps contain # additional packs of Normal Monsters\nYour Rare Maps contain # additional Rare Monster packs": {
   mod: "Your Magic Maps contain # additional packs of Magic Monsters\nYour Normal Maps contain # additional packs of Normal Monsters\nYour Rare Maps contain # additional Rare Monster packs",
   matchSafe: "nor",
 },
 "Players and their Minions cannot take Reflected Damage\nYour Maps contain # additional Packs with Mirrored Rare Monsters": {
   mod: "Players and their Minions cannot take Reflected Damage\nYour Maps contain # additional Packs with Mirrored Rare Monsters",
   matchSafe: "nn",
 },
 "Your Maps contain # additional Clusters of Mysterious Barrels": {
   mod: "Your Maps contain # additional Clusters of Mysterious Barrels",
   matchSafe: "clu",
 },
 "Strongbox Monsters are Enraged\nStrongbox Monsters have #% increased Item Quantity\nYour Maps contain an additional Strongbox": {
   mod: "Strongbox Monsters are Enraged\nStrongbox Monsters have #% increased Item Quantity\nYour Maps contain an additional Strongbox",
   matchSafe: "enr",
 },
 "Your Maps contain hunted traitors": {
   mod: "Your Maps contain hunted traitors",
   matchSafe: "hu",
 },
 "Your Maps contain # additional packs of Monsters that Convert when Killed": {
   mod: "Your Maps contain # additional packs of Monsters that Convert when Killed",
   matchSafe: "nv",
 },
 "Player's Life and Mana Recovery from Flasks are instant\nYour Maps contain # additional packs of Monsters that Heal": {
   mod: "Player's Life and Mana Recovery from Flasks are instant\nYour Maps contain # additional packs of Monsters that Heal",
   matchSafe: "ry",
 },
 "Map Bosses are accompanied by Bodyguards\n# additional Maps drop on Completing your Maps": {
   mod: "Map Bosses are accompanied by Bodyguards\n# additional Maps drop on Completing your Maps",
   matchSafe: "dy",
 },
 "Your Maps contain # additional Breaches": {
   mod: "Your Maps contain # additional Breaches",
   matchSafe: "\"l b\"",
 },
 "Breaches in your Maps belong to Xoph\nBreaches in your Maps contain # additional Clasped Hands": {
   mod: "Breaches in your Maps belong to Xoph\nBreaches in your Maps contain # additional Clasped Hands",
   matchSafe: "xo",
 },
 "Breaches in your Maps belong to Tul\nBreaches in your Maps contain # additional Clasped Hands": {
   mod: "Breaches in your Maps belong to Tul\nBreaches in your Maps contain # additional Clasped Hands",
   matchSafe: "tul",
 },
 "Breaches in your Maps belong to Esh\nBreaches in your Maps contain # additional Clasped Hands": {
   mod: "Breaches in your Maps belong to Esh\nBreaches in your Maps contain # additional Clasped Hands",
   matchSafe: "esh",
 },
 "Breaches in your Maps belong to Uul-Netol\nBreaches in your Maps contain # additional Clasped Hands": {
   mod: "Breaches in your Maps belong to Uul-Netol\nBreaches in your Maps contain # additional Clasped Hands",
   matchSafe: "uu",
 },
 "Breaches in your Maps belong to Chayula\nBreaches in your Maps contain # additional Clasped Hands": {
   mod: "Breaches in your Maps belong to Chayula\nBreaches in your Maps contain # additional Clasped Hands",
   matchSafe: "yu",
 },
 "Your Maps contain # additional Abysses\nYour Maps can contain Abysses": {
   mod: "Your Maps contain # additional Abysses\nYour Maps can contain Abysses",
   matchSafe: "aby",
 },
 "Your Maps contain an additional Gloom Shrine": {
   mod: "Your Maps contain an additional Gloom Shrine",
   matchSafe: "oo",
 },
 "Your Maps contain an additional Resonating Shrine": {
   mod: "Your Maps contain an additional Resonating Shrine",
   matchSafe: "res",
 },
 "Monsters Imprisoned by Essences have a #% chance to contain a Remnant of Corruption": {
   mod: "Monsters Imprisoned by Essences have a #% chance to contain a Remnant of Corruption",
   matchSafe: "mn",
 },
 "Maps found in your Maps are Corrupted with # Modifiers": {
   mod: "Maps found in your Maps are Corrupted with # Modifiers",
   matchSafe: "iers",
 },
 "Create a copy of Beasts Captured in your Maps": {
   mod: "Create a copy of Beasts Captured in your Maps",
   matchSafe: "py",
 },
 "Your Maps contain #% increased number of Runic Monster Markers": {
   mod: "Your Maps contain #% increased number of Runic Monster Markers",
   matchSafe: "rk",
 },
 "Legion Monsters in your Maps have #% more Life\nSplinters and Emblems dropped by Legion Monsters in your Maps are duplicated": {
   mod: "Legion Monsters in your Maps have #% more Life\nSplinters and Emblems dropped by Legion Monsters in your Maps are duplicated",
   matchSafe: "nsp",
 },
 "Oils found in your Maps are # tier higher\nCost of Building and Upgrading Blight Towers in your Maps is doubled": {
   mod: "Oils found in your Maps are # tier higher\nCost of Building and Upgrading Blight Towers in your Maps is doubled",
   matchSafe: "bu",
 },
 "#% increased Intelligence gained from Immortal Syndicate targets encountered in your Maps": {
   mod: "#% increased Intelligence gained from Immortal Syndicate targets encountered in your Maps",
   matchSafe: "mm",
 },
 "Delirium Reward Bars fill #% faster in your Maps": {
   mod: "Delirium Reward Bars fill #% faster in your Maps",
   matchSafe: "wa",
 },
 "Lifeforce dropped by Harvest Monsters in your Maps is Duplicated\nHarvest Monsters in your Maps have #% more Life\nHarvests in your Maps contain at least one Crop of Blue Plants": {
   mod: "Lifeforce dropped by Harvest Monsters in your Maps is Duplicated\nHarvest Monsters in your Maps have #% more Life\nHarvests in your Maps contain at least one Crop of Blue Plants",
   matchSafe: "blu",
 },
 "Lifeforce dropped by Harvest Monsters in your Maps is Duplicated\nHarvest Monsters in your Maps have #% more Life\nHarvests in your Maps contain at least one Crop of Purple Plants": {
   mod: "Lifeforce dropped by Harvest Monsters in your Maps is Duplicated\nHarvest Monsters in your Maps have #% more Life\nHarvests in your Maps contain at least one Crop of Purple Plants",
   matchSafe: "pu",
 },
 "Lifeforce dropped by Harvest Monsters in your Maps is Duplicated\nHarvest Monsters in your Maps have #% more Life\nHarvests in your Maps contain at least one Crop of Yellow Plants": {
   mod: "Lifeforce dropped by Harvest Monsters in your Maps is Duplicated\nHarvest Monsters in your Maps have #% more Life\nHarvests in your Maps contain at least one Crop of Yellow Plants",
   matchSafe: "yel",
 },
 "Non-Unique Heist Contracts found in your Maps have an additional Implicit Modifier": {
   mod: "Non-Unique Heist Contracts found in your Maps have an additional Implicit Modifier",
   matchSafe: "ci",
 },
 "Rerolling Favours at Ritual Altars in your Maps has no Cost the first # time": {
   mod: "Rerolling Favours at Ritual Altars in your Maps has no Cost the first # time",
   matchSafe: "rer",
 },
 "Map Bosses are accompanied by a mysterious Harbinger\nMap Bosses drop additional Currency Shards\nHarbingers in your Maps drop additional Currency Shards": {
   mod: "Map Bosses are accompanied by a mysterious Harbinger\nMap Bosses drop additional Currency Shards\nHarbingers in your Maps drop additional Currency Shards",
   matchSafe: "rb",
 },
 "Players gain an additional Vaal Soul on Kill\nYour Maps contain # additional packs of Corrupted Vaal Monsters": {
   mod: "Players gain an additional Vaal Soul on Kill\nYour Maps contain # additional packs of Corrupted Vaal Monsters",
   matchSafe: "\"s g\"",
 },
 "Your Maps contain # additional packs of Corrupted Vaal Monsters\nItems dropped by Corrupted Vaal Monsters in your Maps have #% chance to be Corrupted": {
   mod: "Your Maps contain # additional packs of Corrupted Vaal Monsters\nItems dropped by Corrupted Vaal Monsters in your Maps have #% chance to be Corrupted",
   matchSafe: "\"y c\"",
 },
 "Slaying Enemies close together can attract monsters from Beyond this realm\n#% increased Beyond Demon Pack Size in your Maps": {
   mod: "Slaying Enemies close together can attract monsters from Beyond this realm\n#% increased Beyond Demon Pack Size in your Maps",
   matchSafe: "sl",
 },
 "The First # Possessed Monsters drop an additional Rusted Scarab\nYour Maps are haunted by an additional Tormented Betrayer": {
   mod: "The First # Possessed Monsters drop an additional Rusted Scarab\nYour Maps are haunted by an additional Tormented Betrayer",
   matchSafe: "rus",
 },
 "The First # Possessed Monsters drop an additional Polished Scarab\nYour Maps are haunted by an additional Tormented Betrayer": {
   mod: "The First # Possessed Monsters drop an additional Polished Scarab\nYour Maps are haunted by an additional Tormented Betrayer",
   matchSafe: "pol",
 },
 "The First # Possessed Monsters drop an additional Gilded Scarab\nYour Maps are haunted by an additional Tormented Betrayer": {
   mod: "The First # Possessed Monsters drop an additional Gilded Scarab\nYour Maps are haunted by an additional Tormented Betrayer",
   matchSafe: "gil",
 },
 "The First # Possessed Monsters drop an additional Winged Scarab\nYour Maps are haunted by an additional Tormented Betrayer": {
   mod: "The First # Possessed Monsters drop an additional Winged Scarab\nYour Maps are haunted by an additional Tormented Betrayer",
   matchSafe: "win",
 },
 "The First # Possessed Monsters drop an additional Map\nYour Maps are haunted by an additional Tormented Heretic": {
   mod: "The First # Possessed Monsters drop an additional Map\nYour Maps are haunted by an additional Tormented Heretic",
   matchSafe: "ret",
 },
 "The First # Possessed Monsters drop an additional Unique Item\nYour Maps are haunted by an additional Tormented Graverobber": {
   mod: "The First # Possessed Monsters drop an additional Unique Item\nYour Maps are haunted by an additional Tormented Graverobber",
   matchSafe: "ob",
 },
 "Your Maps contain # additional packs of Corrupted Vaal Monsters\nYour Maps have a #% chance to contain Gifts of the Red Queen per Mortal Fragment used\nYour Maps have a #% chance to contain Gifts of the Sacrificed per Sacrifice Fragment used": {
   mod: "Your Maps contain # additional packs of Corrupted Vaal Monsters\nYour Maps have a #% chance to contain Gifts of the Red Queen per Mortal Fragment used\nYour Maps have a #% chance to contain Gifts of the Sacrificed per Sacrifice Fragment used",
   matchSafe: "ee",
 },
 "Players' Vaal Skills do not apply Soul Gain Prevention\nYour Maps contain # additional packs of Corrupted Vaal Monsters": {
   mod: "Players' Vaal Skills do not apply Soul Gain Prevention\nYour Maps contain # additional packs of Corrupted Vaal Monsters",
   matchSafe: "s'",
 },
 "Your Maps contain an additional Legion Encounter": {
   mod: "Your Maps contain an additional Legion Encounter",
   matchSafe: "\"l le\"",
 },
 "Your Maps contain a Blight Encounter": {
   mod: "Your Maps contain a Blight Encounter",
   matchSafe: "\"a b\"",
 },
 "Your Maps contain a Mirror of Delirium": {
   mod: "Your Maps contain a Mirror of Delirium",
   matchSafe: "\"f d\"",
 },
 "Your Maps contain The Sacred Grove": {
   mod: "Your Maps contain The Sacred Grove",
   matchSafe: "gro",
 },
 "Your Maps contain Ritual Altars": {
   mod: "Your Maps contain Ritual Altars",
   matchSafe: "\"n r\"",
 },
 "Your Maps contain an Ultimatum Encounter": {
   mod: "Your Maps contain an Ultimatum Encounter",
   matchSafe: "ult",
 },
 "Area contains a Smuggler's Cache": {
   mod: "Area contains a Smuggler's Cache",
   matchSafe: "sm",
 },
};