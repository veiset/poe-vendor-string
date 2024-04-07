export interface MapMod {
  value: string
  scary: number
  matchSafe: string
}
export const mapModifiers: { [key: string]: MapMod } = {
 "Monsters reflect #% of Elemental Damage": {
   value: "Monsters reflect #% of Elemental Damage",
   scary: 0,
   matchSafe: "tal d",
 },
 "Monsters reflect #% of Physical Damage": {
   value: "Monsters reflect #% of Physical Damage",
   scary: 1,
   matchSafe: "f ph",
 },
 "Players cannot Regenerate Life, Mana or Energy Shield": {
   value: "Players cannot Regenerate Life, Mana or Energy Shield",
   scary: 2,
   matchSafe: "gen",
 },
 "Cannot Leech from Monsters": {
   value: "Cannot Leech from Monsters",
   scary: 3,
   matchSafe: "eec",
 },
 "Players are Cursed with Temporal Chains": {
   value: "Players are Cursed with Temporal Chains",
   scary: 100,
   matchSafe: "h tem",
 },
 "Players have -#% to all maximum Resistances": {
   value: "Players have -#% to all maximum Resistances",
   scary: 101,
   matchSafe: "o al",
 },
 "Players have #% less Recovery Rate of Life and Energy Shield": {
   value: "Players have #% less Recovery Rate of Life and Energy Shield",
   scary: 102,
   matchSafe: "s rec",
 },
 "Monsters deal #% extra Physical Damage as Chaos|Monsters Inflict Withered for 2 seconds on Hit": {
   value: "Monsters deal #% extra Physical Damage as Chaos|Monsters Inflict Withered for 2 seconds on Hit",
   scary: 103,
   matchSafe: "withe",
 },
 "Monsters are Hexproof": {
   value: "Monsters are Hexproof",
   scary: 200,
   matchSafe: "re he",
 },
 "Unique Bosses are Possessed": {
   value: "Unique Bosses are Possessed",
   scary: 201,
   matchSafe: "poss",
 },
 "Players have #% reduced effect of Non-Curse Auras from Skills": {
   value: "Players have #% reduced effect of Non-Curse Auras from Skills",
   scary: 203,
   matchSafe: "non",
 },
 "Players are Cursed with Enfeeble": {
   value: "Players are Cursed with Enfeeble",
   scary: 204,
   matchSafe: "h en",
 },
 "Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier": {
   value: "Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier",
   scary: 205,
   matchSafe: "tip",
 },
 "Unique Boss deals #% increased Damage|Unique Boss has #% increased Attack and Cast Speed": {
   value: "Unique Boss deals #% increased Damage|Unique Boss has #% increased Attack and Cast Speed",
   scary: 206,
   matchSafe: "d at",
 },
 "#% increased Monster Damage": {
   value: "#% increased Monster Damage",
   scary: 207,
   matchSafe: "d monster d",
 },
 "Monsters deal #% extra Physical Damage as Cold": {
   value: "Monsters deal #% extra Physical Damage as Cold",
   scary: 208,
   matchSafe: "s col",
 },
 "Monsters deal #% extra Physical Damage as Fire": {
   value: "Monsters deal #% extra Physical Damage as Fire",
   scary: 209,
   matchSafe: "as fi",
 },
 "Monsters deal #% extra Physical Damage as Lightning": {
   value: "Monsters deal #% extra Physical Damage as Lightning",
   scary: 210,
   matchSafe: "as l",
 },
 "Area has patches of Shocked Ground which increase Damage taken by #%": {
   value: "Area has patches of Shocked Ground which increase Damage taken by #%",
   scary: 211,
   matchSafe: "ked",
 },
 "All Monster Damage from Hits always Ignites": {
   value: "All Monster Damage from Hits always Ignites",
   scary: 212,
   matchSafe: "lw",
 },
 "Monsters cannot be Stunned": {
   value: "Monsters cannot be Stunned",
   scary: 213,
   matchSafe: "tun",
 },
 "#% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed": {
   value: "#% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed",
   scary: 214,
   matchSafe: "r at",
 },
 "Monsters have a #% chance to cause Elemental Ailments on Hit": {
   value: "Monsters have a #% chance to cause Elemental Ailments on Hit",
   scary: 215,
   matchSafe: "cau",
 },
 "Monsters Poison on Hit": {
   value: "Monsters Poison on Hit",
   scary: 216,
   matchSafe: "son o",
 },
 "Monsters' Action Speed cannot be modified to below base value|Monsters cannot be Taunted": {
   value: "Monsters' Action Speed cannot be modified to below base value|Monsters cannot be Taunted",
   scary: 217,
   matchSafe: "elo",
 },
 "Monsters have #% chance to Impale with Attacks": {
   value: "Monsters have #% chance to Impale with Attacks",
   scary: 218,
   matchSafe: "o im",
 },
 "Monsters have #% increased Area of Effect": {
   value: "Monsters have #% increased Area of Effect",
   scary: 219,
   matchSafe: "e \\d+% increased ar",
 },
 "Area has patches of Consecrated Ground": {
   value: "Area has patches of Consecrated Ground",
   scary: 300,
   matchSafe: "nsecrate",
 },
 "Monsters gain #% of Maximum Life as Extra Maximum Energy Shield": {
   value: "Monsters gain #% of Maximum Life as Extra Maximum Energy Shield",
   scary: 301,
   matchSafe: "m li",
 },
 "Unique Boss has #% increased Life|Unique Boss has #% increased Area of Effect": {
   value: "Unique Boss has #% increased Life|Unique Boss has #% increased Area of Effect",
   scary: 302,
   matchSafe: "d li",
 },
 "#% more Monster Life": {
   value: "#% more Monster Life",
   scary: 303,
   matchSafe: "r li",
 },
 "Players cannot inflict Exposure": {
   value: "Players cannot inflict Exposure",
   scary: 304,
   matchSafe: "ot i",
 },
 "+#% Monster Physical Damage Reduction": {
   value: "+#% Monster Physical Damage Reduction",
   scary: 305,
   matchSafe: "uct",
 },
 "+#% Monster Chaos Resistance|+#% Monster Elemental Resistances": {
   value: "+#% Monster Chaos Resistance|+#% Monster Elemental Resistances",
   scary: 306,
   matchSafe: "r el",
 },
 "#% less effect of Curses on Monsters": {
   value: "#% less effect of Curses on Monsters",
   scary: 307,
   matchSafe: "rses",
 },
 "Monsters have +#% chance to Suppress Spell Damage": {
   value: "Monsters have +#% chance to Suppress Spell Damage",
   scary: 308,
   matchSafe: "o su",
 },
 "Players have #% reduced Chance to Block|Players have #% less Armour": {
   value: "Players have #% reduced Chance to Block|Players have #% less Armour",
   scary: 309,
   matchSafe: "o bl",
 },
 "Players have -#% to amount of Suppressed Spell Damage Prevented|Monsters have #% increased Accuracy Rating": {
   value: "Players have -#% to amount of Suppressed Spell Damage Prevented|Monsters have #% increased Accuracy Rating",
   scary: 310,
   matchSafe: "rev",
 },
 "Monsters have #% chance to Avoid Elemental Ailments": {
   value: "Monsters have #% chance to Avoid Elemental Ailments",
   scary: 311,
   matchSafe: "d el",
 },
 "Monsters take #% reduced Extra Damage from Critical Strikes": {
   value: "Monsters take #% reduced Extra Damage from Critical Strikes",
   scary: 312,
   matchSafe: "kes",
 },
 "Buffs on Players expire #% faster": {
   value: "Buffs on Players expire #% faster",
   scary: 400,
   matchSafe: "fs",
 },
 "Players gain #% reduced Flask Charges": {
   value: "Players gain #% reduced Flask Charges",
   scary: 401,
   matchSafe: "ask",
 },
 "Players have #% less Area of Effect": {
   value: "Players have #% less Area of Effect",
   scary: 402,
   matchSafe: "ss are",
 },
 "Players have #% less Cooldown Recovery Rate": {
   value: "Players have #% less Cooldown Recovery Rate",
   scary: 403,
   matchSafe: "coo",
 },
 "Players have #% less Accuracy Rating": {
   value: "Players have #% less Accuracy Rating",
   scary: 404,
   matchSafe: "s ac",
 },
 "Players are Cursed with Vulnerability": {
   value: "Players are Cursed with Vulnerability",
   scary: 405,
   matchSafe: "h vu",
 },
 "Players are Cursed with Elemental Weakness": {
   value: "Players are Cursed with Elemental Weakness",
   scary: 406,
   matchSafe: "h el",
 },
 "Monsters' skills Chain 2 additional times": {
   value: "Monsters' skills Chain 2 additional times",
   scary: 407,
   matchSafe: "tim",
 },
 "Monsters fire 2 additional Projectiles": {
   value: "Monsters fire 2 additional Projectiles",
   scary: 408,
   matchSafe: "oj",
 },
 "Monsters have a #% chance to avoid Poison, Impale, and Bleeding": {
   value: "Monsters have a #% chance to avoid Poison, Impale, and Bleeding",
   scary: 409,
   matchSafe: "on,",
 },
 "Monsters gain an Endurance Charge on Hit": {
   value: "Monsters gain an Endurance Charge on Hit",
   scary: 410,
   matchSafe: "an en",
 },
 "Monsters gain a Frenzy Charge on Hit": {
   value: "Monsters gain a Frenzy Charge on Hit",
   scary: 411,
   matchSafe: "zy c",
 },
 "Monsters gain a Power Charge on Hit": {
   value: "Monsters gain a Power Charge on Hit",
   scary: 412,
   matchSafe: "a pow",
 },
 "Monsters Blind on Hit": {
   value: "Monsters Blind on Hit",
   scary: 413,
   matchSafe: "s bli",
 },
 "Monsters Maim on Hit with Attacks": {
   value: "Monsters Maim on Hit with Attacks",
   scary: 414,
   matchSafe: "aim",
 },
 "Monsters Hinder on Hit with Spells": {
   value: "Monsters Hinder on Hit with Spells",
   scary: 415,
   matchSafe: "hind",
 },
 "Monsters steal Power, Frenzy and Endurance charges on Hit": {
   value: "Monsters steal Power, Frenzy and Endurance charges on Hit",
   scary: 416,
   matchSafe: "er,",
 },
 "Area has patches of Burning Ground": {
   value: "Area has patches of Burning Ground",
   scary: 417,
   matchSafe: "f bur",
 },
 "Area has patches of Chilled Ground": {
   value: "Area has patches of Chilled Ground",
   scary: 418,
   matchSafe: "hil",
 },
 "Area has patches of desecrated ground": {
   value: "Area has patches of desecrated ground",
   scary: 419,
   matchSafe: "s of d",
 },
 "Area is inhabited by Abominations": {
   value: "Area is inhabited by Abominations",
   scary: 499,
   matchSafe: "bom",
 },
 "Area is inhabited by Animals": {
   value: "Area is inhabited by Animals",
   scary: 499,
   matchSafe: "nim",
 },
 "Area is inhabited by Demons": {
   value: "Area is inhabited by Demons",
   scary: 499,
   matchSafe: "emons",
 },
 "Area is inhabited by Ghosts": {
   value: "Area is inhabited by Ghosts",
   scary: 499,
   matchSafe: "osts",
 },
 "Area is inhabited by Goatmen": {
   value: "Area is inhabited by Goatmen",
   scary: 499,
   matchSafe: "oa",
 },
 "Area is inhabited by Humanoids": {
   value: "Area is inhabited by Humanoids",
   scary: 499,
   matchSafe: "hum",
 },
 "Area is inhabited by Cultists of Kitava": {
   value: "Area is inhabited by Cultists of Kitava",
   scary: 499,
   matchSafe: "cul",
 },
 "Area is inhabited by Lunaris fanatics": {
   value: "Area is inhabited by Lunaris fanatics",
   scary: 499,
   matchSafe: "unari",
 },
 "Area is inhabited by ranged monsters": {
   value: "Area is inhabited by ranged monsters",
   scary: 499,
   matchSafe: "rang",
 },
 "Area is inhabited by Skeletons": {
   value: "Area is inhabited by Skeletons",
   scary: 499,
   matchSafe: "eto",
 },
 "Area is inhabited by Solaris fanatics": {
   value: "Area is inhabited by Solaris fanatics",
   scary: 499,
   matchSafe: "laris",
 },
 "Area is inhabited by Sea Witches and their Spawn": {
   value: "Area is inhabited by Sea Witches and their Spawn",
   scary: 499,
   matchSafe: "ei",
 },
 "Area is inhabited by Undead": {
   value: "Area is inhabited by Undead",
   scary: 499,
   matchSafe: "by un",
 },
 "Area has increased monster variety": {
   value: "Area has increased monster variety",
   scary: 499,
   matchSafe: "ety",
 },
 "Area is inhabited by 2 additional Rogue Exiles": {
   value: "Area is inhabited by 2 additional Rogue Exiles",
   scary: 500,
   matchSafe: "rog",
 },
 "Area contains many Totems": {
   value: "Area contains many Totems",
   scary: 500,
   matchSafe: "tot",
 },
 "Area contains two Unique Bosses": {
   value: "Area contains two Unique Bosses",
   scary: 600,
   matchSafe: "two",
 },
 "This Map's Modifiers to Quantity of Items found also apply to Rarity": {
   value: "This Map's Modifiers to Quantity of Items found also apply to Rarity",
   scary: 630,
   matchSafe: "p'",
 },
 "#% increased number of Rare Monsters": {
   value: "#% increased number of Rare Monsters",
   scary: 803,
   matchSafe: "nu",
 },
 "#% more Magic Monsters": {
   value: "#% more Magic Monsters",
   scary: 810,
   matchSafe: "e mag",
 },
 "Slaying Enemies close together has a #% chance to attract monsters from Beyond": {
   value: "Slaying Enemies close together has a #% chance to attract monsters from Beyond",
   scary: 900,
   matchSafe: "yi",
 },
};
export const kiracModifier: { [key: string]: MapMod } = {
 "Area contains The Sacred Grove": {
   value: "Area contains The Sacred Grove",
   scary: 900,
   matchSafe: "sac",
 },
 "Area contains an additional Legion Encounter": {
   value: "Area contains an additional Legion Encounter",
   scary: 899,
   matchSafe: "leg",
 },
 "Area contains an additional Expedition Encounter": {
   value: "Area contains an additional Expedition Encounter",
   scary: 898,
   matchSafe: "xped",
 },
 "Area contains an additional Smuggler's Cache": {
   value: "Area contains an additional Smuggler's Cache",
   scary: 897,
   matchSafe: "r'",
 },
 "Area contains Metamorph Monsters": {
   value: "Area contains Metamorph Monsters",
   scary: 896,
   matchSafe: "tam",
 },
 "Areas contain Ritual Altars": {
   value: "Areas contain Ritual Altars",
   scary: 895,
   matchSafe: "ual",
 },
 "Area contains # additional Abysses": {
   value: "Area contains # additional Abysses",
   scary: 894,
   matchSafe: "ysse",
 },
 "Area contains # additional Breaches": {
   value: "Area contains # additional Breaches",
   scary: 893,
   matchSafe: "brea",
 },
 "Area contains # additional Harbingers": {
   value: "Area contains # additional Harbingers",
   scary: 892,
   matchSafe: "arb",
 },
 "Area contains # additional Essences": {
   value: "Area contains # additional Essences",
   scary: 891,
   matchSafe: "ssen",
 },
 "Area contains # additional Strongboxes": {
   value: "Area contains # additional Strongboxes",
   scary: 890,
   matchSafe: "gb",
 },
 "Area is inhabited by # additional Tormented Spirits": {
   value: "Area is inhabited by # additional Tormented Spirits",
   scary: 889,
   matchSafe: "rme",
 },
 "Area contains # additional Shrines": {
   value: "Area contains # additional Shrines",
   scary: 888,
   matchSafe: "rines",
 },
 "Area is inhabited by # additional Rogue Exiles": {
   value: "Area is inhabited by # additional Rogue Exiles",
   scary: 887,
   matchSafe: "rog",
 },
 "Area is inhabited by Cultists of Kitava": {
   value: "Area is inhabited by Cultists of Kitava",
   scary: 886,
   matchSafe: "cul",
 },
};
export const t17Mods: { [key: string]: MapMod } = {
 "Monsters' skills Chain # additional times|Monsters' Projectiles can Chain when colliding with Terrain": {
   value: "Monsters' skills Chain # additional times|Monsters' Projectiles can Chain when colliding with Terrain",
   scary: 1100,
   matchSafe: "lid",
 },
 "Players and their Minions deal no damage for # out of every # seconds": {
   value: "Players and their Minions deal no damage for # out of every # seconds",
   scary: 1100,
   matchSafe: "ever",
 },
 "Monsters have #% increased Area of Effect|Monsters fire # additional Projectiles": {
   value: "Monsters have #% increased Area of Effect|Monsters fire # additional Projectiles",
   scary: 1100,
   matchSafe: "fir",
 },
 "#% increased Monster Damage": {
   value: "#% increased Monster Damage",
   scary: 1100,
   matchSafe: "d monster d",
 },
 "Monsters gain #% of Maximum Life as Extra Maximum Energy Shield": {
   value: "Monsters gain #% of Maximum Life as Extra Maximum Energy Shield",
   scary: 1100,
   matchSafe: "m li",
 },
 "Unique Bosses are Possessed": {
   value: "Unique Bosses are Possessed",
   scary: 1100,
   matchSafe: "poss",
 },
 "Monsters have +#% chance to Suppress Spell Damage": {
   value: "Monsters have +#% chance to Suppress Spell Damage",
   scary: 1100,
   matchSafe: "o su",
 },
 "Monsters have +#% Chance to Block Attack Damage": {
   value: "Monsters have +#% Chance to Block Attack Damage",
   scary: 1100,
   matchSafe: "o bl",
 },
 "Monsters reflect #% of Physical Damage|Monsters reflect #% of Elemental Damage": {
   value: "Monsters reflect #% of Physical Damage|Monsters reflect #% of Elemental Damage",
   scary: 1100,
   matchSafe: "f ph",
 },
 "#% more Monster Life": {
   value: "#% more Monster Life",
   scary: 1100,
   matchSafe: "r li",
 },
 "#% increased number of Rare Monsters|Rare Monsters each have # additional Modifiers": {
   value: "#% increased number of Rare Monsters|Rare Monsters each have # additional Modifiers",
   scary: 1100,
   matchSafe: "d nu",
 },
 "Monsters inflict # Grasping Vines on Hit": {
   value: "Monsters inflict # Grasping Vines on Hit",
   scary: 1100,
   matchSafe: "vines",
 },
 "Rare Monsters have Volatile Cores": {
   value: "Rare Monsters have Volatile Cores",
   scary: 1100,
   matchSafe: "cores",
 },
 "Monsters gain #% of their Physical Damage as Extra Damage of a random Element": {
   value: "Monsters gain #% of their Physical Damage as Extra Damage of a random Element",
   scary: 1100,
   matchSafe: "om e",
 },
 "Monsters gain #% of their Physical Damage as Extra Chaos Damage": {
   value: "Monsters gain #% of their Physical Damage as Extra Chaos Damage",
   scary: 1100,
   matchSafe: "ra c",
 },
 "#% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed": {
   value: "#% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed",
   scary: 1100,
   matchSafe: "r at",
 },
 "Players are assaulted by Bloodstained Sawblades": {
   value: "Players are assaulted by Bloodstained Sawblades",
   scary: 1100,
   matchSafe: "wb",
 },
 "Area contains Drowning Orbs": {
   value: "Area contains Drowning Orbs",
   scary: 1100,
   matchSafe: "wni",
 },
 "#% reduced Effect of Curses on Monsters": {
   value: "#% reduced Effect of Curses on Monsters",
   scary: 1100,
   matchSafe: "ses o",
 },
 "+#% Monster Physical Damage Reduction|+#% Monster Chaos Resistance|+#% Monster Elemental Resistances": {
   value: "+#% Monster Physical Damage Reduction|+#% Monster Chaos Resistance|+#% Monster Elemental Resistances",
   scary: 1100,
   matchSafe: "uct",
 },
 "All Monster Damage can Ignite, Freeze and Shock|Monsters Ignite, Freeze and Shock on Hit": {
   value: "All Monster Damage can Ignite, Freeze and Shock|Monsters Ignite, Freeze and Shock on Hit",
   scary: 1100,
   matchSafe: "ign",
 },
 "Players are Marked for Death for # seconds after killing a Rare or Unique monster": {
   value: "Players are Marked for Death for # seconds after killing a Rare or Unique monster",
   scary: 1100,
   matchSafe: "rke",
 },
 "Rare and Unique Monsters remove #% of Life, Mana and Energy Shield on hit": {
   value: "Rare and Unique Monsters remove #% of Life, Mana and Energy Shield on hit",
   scary: 1100,
   matchSafe: "fe,",
 },
 "Monsters' Attacks Impale on Hit|When a fifth Impale is inflicted on a Player, Impales are removed to Reflect thier Physical Damage multiplied by their remaining Hits to that Player and their Allies within #.# metres": {
   value: "Monsters' Attacks Impale on Hit|When a fifth Impale is inflicted on a Player, Impales are removed to Reflect thier Physical Damage multiplied by their remaining Hits to that Player and their Allies within #.# metres",
   scary: 1100,
   matchSafe: "ale",
 },
 "Rare monsters in area are Shaper-Touched": {
   value: "Rare monsters in area are Shaper-Touched",
   scary: 1100,
   matchSafe: "hap",
 },
 "Players have -# to maximum number of Summoned Totems": {
   value: "Players have -# to maximum number of Summoned Totems",
   scary: 1100,
   matchSafe: "moned",
 },
 "Player Skills which Throw Mines throw # fewer Mine|Player Skills which Throw Traps throw # fewer Trap": {
   value: "Player Skills which Throw Mines throw # fewer Mine|Player Skills which Throw Traps throw # fewer Trap",
   scary: 1100,
   matchSafe: "whi",
 },
 "#% of Damage Players' Totems take from Hits is taken from their Summoner's Life instead": {
   value: "#% of Damage Players' Totems take from Hits is taken from their Summoner's Life instead",
   scary: 1100,
   matchSafe: "oner",
 },
 "Players in Area take #% increased Damage per nearby Ally": {
   value: "Players in Area take #% increased Damage per nearby Ally",
   scary: 1100,
   matchSafe: "nea",
 },
 "Map Boss is accompanied by a Synthesis Boss": {
   value: "Map Boss is accompanied by a Synthesis Boss",
   scary: 1100,
   matchSafe: "cc",
 },
 "Area contains Runes of the Searing Exarch": {
   value: "Area contains Runes of the Searing Exarch",
   scary: 1100,
   matchSafe: "rune",
 },
 "All Magic and Normal Monsters in Area are in a Union of Souls": {
   value: "All Magic and Normal Monsters in Area are in a Union of Souls",
   scary: 1100,
   matchSafe: "sou",
 },
 "Monsters have +# to Maximum Power Charges|Monsters gain a Power Charge on Hit": {
   value: "Monsters have +# to Maximum Power Charges|Monsters gain a Power Charge on Hit",
   scary: 1100,
   matchSafe: "mum p",
 },
 "Monsters have +# to Maximum Frenzy Charges|Monsters gain a Frenzy Charge on Hit": {
   value: "Monsters have +# to Maximum Frenzy Charges|Monsters gain a Frenzy Charge on Hit",
   scary: 1100,
   matchSafe: "mum f",
 },
 "Monsters have +# to Maximum Endurance Charges|Monsters gain an Endurance Charge when hit": {
   value: "Monsters have +# to Maximum Endurance Charges|Monsters gain an Endurance Charge when hit",
   scary: 1100,
   matchSafe: "m end",
 },
 "Players have -#% to all maximum Resistances": {
   value: "Players have -#% to all maximum Resistances",
   scary: 1100,
   matchSafe: "o al",
 },
 "Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier": {
   value: "Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier",
   scary: 1100,
   matchSafe: "lier",
 },
 "Monsters Poison on Hit|All Damage from Monsters' Hits can Poison": {
   value: "Monsters Poison on Hit|All Damage from Monsters' Hits can Poison",
   scary: 1100,
   matchSafe: "iso",
 },
 "Monsters cannot be Leeched from": {
   value: "Monsters cannot be Leeched from",
   scary: 1100,
   matchSafe: "eec",
 },
 "Players are Cursed with Vulnerability": {
   value: "Players are Cursed with Vulnerability",
   scary: 1100,
   matchSafe: "h vu",
 },
 "Players have #% less Area of Effect": {
   value: "Players have #% less Area of Effect",
   scary: 1100,
   matchSafe: "ss are",
 },
 "Monsters take #% reduced Extra Damage from Critical Strikes": {
   value: "Monsters take #% reduced Extra Damage from Critical Strikes",
   scary: 1100,
   matchSafe: "kes",
 },
 "Unique Monsters have a random Shrine Buff": {
   value: "Unique Monsters have a random Shrine Buff",
   scary: 1100,
   matchSafe: "ve a",
 },
 "Area contains Petrification Statues": {
   value: "Area contains Petrification Statues",
   scary: 1100,
   matchSafe: "atu",
 },
 "Area contains # additional Clusters of Highly Volatile Barrels": {
   value: "Area contains # additional Clusters of Highly Volatile Barrels",
   scary: 1100,
   matchSafe: "hl",
 },
 "Players cannot gain Endurance Charges|Players cannot gain Frenzy Charges|Players cannot gain Power Charges": {
   value: "Players cannot gain Endurance Charges|Players cannot gain Frenzy Charges|Players cannot gain Power Charges",
   scary: 1100,
   matchSafe: "ot g",
 },
 "Monsters cannot be Stunned|Monsters' Action Speed cannot be modified to below Base Value|Monsters' Movement Speed cannot be modified to below Base Value": {
   value: "Monsters cannot be Stunned|Monsters' Action Speed cannot be modified to below Base Value|Monsters' Movement Speed cannot be modified to below Base Value",
   scary: 1100,
   matchSafe: "tun",
 },
 "Players are targeted by a Meteor when they use a Flask": {
   value: "Players are targeted by a Meteor when they use a Flask",
   scary: 1100,
   matchSafe: "get",
 },
 "Players have #% less Defences": {
   value: "Players have #% less Defences",
   scary: 1100,
   matchSafe: "efe",
 },
 "Players cannot Recharge Energy Shield": {
   value: "Players cannot Recharge Energy Shield",
   scary: 1100,
   matchSafe: "rech",
 },
 "Players cannot Block|Players cannot Suppress Spell Damage": {
   value: "Players cannot Block|Players cannot Suppress Spell Damage",
   scary: 1100,
   matchSafe: "ot s",
 },
 "Players have #% reduced effect of Non-Curse Auras from Skills": {
   value: "Players have #% reduced effect of Non-Curse Auras from Skills",
   scary: 1100,
   matchSafe: "non",
 },
 "Players have #% less Recovery Rate of Life and Energy Shield": {
   value: "Players have #% less Recovery Rate of Life and Energy Shield",
   scary: 1100,
   matchSafe: "reco",
 },
 "Buffs on Players expire #% faster": {
   value: "Buffs on Players expire #% faster",
   scary: 1100,
   matchSafe: "n pl",
 },
 "Monster Damage Penetrates #% Elemental Resistances": {
   value: "Monster Damage Penetrates #% Elemental Resistances",
   scary: 1100,
   matchSafe: "tes",
 },
 "Players have #% reduced Action Speed for each time they've used a Skill Recently": {
   value: "Players have #% reduced Action Speed for each time they've used a Skill Recently",
   scary: 1100,
   matchSafe: "'v",
 },
 "Area contains Unstable Tentacle Fiends": {
   value: "Area contains Unstable Tentacle Fiends",
   scary: 1100,
   matchSafe: "uns",
 },
 "Area has patches of Awakeners' Desolation": {
   value: "Area has patches of Awakeners' Desolation",
   scary: 1100,
   matchSafe: "tc",
 },
 "Rare and Unique monsters spawn a Tormented Spirit on reaching Low Life": {
   value: "Rare and Unique monsters spawn a Tormented Spirit on reaching Low Life",
   scary: 1100,
   matchSafe: "eachi",
 },
 "Players' Minions have #% less Attack Speed|Players' Minions have #% less Cast Speed|Players' Minions have #% less Movement Speed": {
   value: "Players' Minions have #% less Attack Speed|Players' Minions have #% less Cast Speed|Players' Minions have #% less Movement Speed",
   scary: 1100,
   matchSafe: "' mi",
 },
 "Debuffs on Monsters expire #% faster": {
   value: "Debuffs on Monsters expire #% faster",
   scary: 1100,
   matchSafe: "deb",
 },
 "The Maven interferes with Players": {
   value: "The Maven interferes with Players",
   scary: 1100,
   matchSafe: "mav",
 },
};