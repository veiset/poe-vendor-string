export interface MapMod {
  value: string
  scary: number
  regex: string
  regexT17: string
  isTier17: boolean
}
export const mapModifiers: { [key: string]: MapMod } = {
 "Monsters reflect #% of Elemental Damage": {
   value: "Monsters reflect #% of Elemental Damage",
   scary: 50,
   regex: "tal d",
   regexT17: "tal d",
   isTier17: false,
 },
 "Monsters reflect #% of Physical Damage": {
   value: "Monsters reflect #% of Physical Damage",
   scary: 51,
   regex: "f ph",
   regexT17: "f ph",
   isTier17: false,
 },
 "Players cannot Regenerate Life, Mana or Energy Shield": {
   value: "Players cannot Regenerate Life, Mana or Energy Shield",
   scary: 52,
   regex: "gen",
   regexT17: "gen",
   isTier17: false,
 },
 "Cannot Leech from Monsters": {
   value: "Cannot Leech from Monsters",
   scary: 53,
   regex: "eec",
   regexT17: "ot l",
   isTier17: false,
 },
 "Players are Cursed with Temporal Chains": {
   value: "Players are Cursed with Temporal Chains",
   scary: 100,
   regex: "h tem",
   regexT17: "h tem",
   isTier17: false,
 },
 "Players have -#% to all maximum Resistances": {
   value: "Players have -#% to all maximum Resistances",
   scary: 101,
   regex: "o al",
   regexT17: "o al",
   isTier17: false,
 },
 "Players have #% less Recovery Rate of Life and Energy Shield": {
   value: "Players have #% less Recovery Rate of Life and Energy Shield",
   scary: 102,
   regex: "s rec",
   regexT17: "s rec",
   isTier17: false,
 },
 "Monsters deal #% extra Physical Damage as Chaos|Monsters Inflict Withered for 2 seconds on Hit": {
   value: "Monsters deal #% extra Physical Damage as Chaos|Monsters Inflict Withered for 2 seconds on Hit",
   scary: 103,
   regex: "withe",
   regexT17: "withe",
   isTier17: false,
 },
 "Monsters are Hexproof": {
   value: "Monsters are Hexproof",
   scary: 200,
   regex: "re he",
   regexT17: "re he",
   isTier17: false,
 },
 "Unique Bosses are Possessed": {
   value: "Unique Bosses are Possessed",
   scary: 201,
   regex: "poss",
   regexT17: "poss",
   isTier17: false,
 },
 "Players have #% reduced effect of Non-Curse Auras from Skills": {
   value: "Players have #% reduced effect of Non-Curse Auras from Skills",
   scary: 203,
   regex: "non",
   regexT17: "non",
   isTier17: false,
 },
 "Players are Cursed with Enfeeble": {
   value: "Players are Cursed with Enfeeble",
   scary: 204,
   regex: "h en",
   regexT17: "h en",
   isTier17: false,
 },
 "Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier": {
   value: "Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier",
   scary: 205,
   regex: "tip",
   regexT17: "lier",
   isTier17: false,
 },
 "Unique Boss deals #% increased Damage|Unique Boss has #% increased Attack and Cast Speed": {
   value: "Unique Boss deals #% increased Damage|Unique Boss has #% increased Attack and Cast Speed",
   scary: 206,
   regex: "d at",
   regexT17: "d at",
   isTier17: false,
 },
 "#% increased Monster Damage": {
   value: "#% increased Monster Damage",
   scary: 207,
   regex: "d monster d",
   regexT17: "d monster d",
   isTier17: false,
 },
 "Monsters deal #% extra Physical Damage as Cold": {
   value: "Monsters deal #% extra Physical Damage as Cold",
   scary: 208,
   regex: "s col",
   regexT17: "s col",
   isTier17: false,
 },
 "Monsters deal #% extra Physical Damage as Fire": {
   value: "Monsters deal #% extra Physical Damage as Fire",
   scary: 209,
   regex: "as fi",
   regexT17: "as fi",
   isTier17: false,
 },
 "Monsters deal #% extra Physical Damage as Lightning": {
   value: "Monsters deal #% extra Physical Damage as Lightning",
   scary: 210,
   regex: "as l",
   regexT17: "as l",
   isTier17: false,
 },
 "Area has patches of Shocked Ground which increase Damage taken by #%": {
   value: "Area has patches of Shocked Ground which increase Damage taken by #%",
   scary: 211,
   regex: "ked",
   regexT17: "ocke",
   isTier17: false,
 },
 "All Monster Damage from Hits always Ignites": {
   value: "All Monster Damage from Hits always Ignites",
   scary: 212,
   regex: "lw",
   regexT17: "lw",
   isTier17: false,
 },
 "Monsters cannot be Stunned": {
   value: "Monsters cannot be Stunned",
   scary: 213,
   regex: "tun",
   regexT17: "tun",
   isTier17: false,
 },
 "#% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed": {
   value: "#% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed",
   scary: 214,
   regex: "r at",
   regexT17: "r at",
   isTier17: false,
 },
 "Monsters have a #% chance to Ignite, Freeze and Shock on Hit": {
   value: "Monsters have a #% chance to Ignite, Freeze and Shock on Hit",
   scary: 215,
   regex: "te,",
   regexT17: "te,",
   isTier17: false,
 },
 "Monsters Poison on Hit": {
   value: "Monsters Poison on Hit",
   scary: 216,
   regex: "son o",
   regexT17: "son o",
   isTier17: false,
 },
 "Monsters' Action Speed cannot be modified to below base value|Monsters cannot be Taunted": {
   value: "Monsters' Action Speed cannot be modified to below base value|Monsters cannot be Taunted",
   scary: 217,
   regex: "elo",
   regexT17: "taun",
   isTier17: false,
 },
 "Monsters have #% chance to Impale with Attacks": {
   value: "Monsters have #% chance to Impale with Attacks",
   scary: 218,
   regex: "o im",
   regexT17: "o im",
   isTier17: false,
 },
 "Monsters have #% increased Area of Effect": {
   value: "Monsters have #% increased Area of Effect",
   scary: 219,
   regex: "e \\d+% increased ar",
   regexT17: "e \\d+% increased ar",
   isTier17: false,
 },
 "Area has patches of Consecrated Ground": {
   value: "Area has patches of Consecrated Ground",
   scary: 300,
   regex: "nsecrate",
   regexT17: "nsecrate",
   isTier17: false,
 },
 "Monsters gain #% of Maximum Life as Extra Maximum Energy Shield": {
   value: "Monsters gain #% of Maximum Life as Extra Maximum Energy Shield",
   scary: 301,
   regex: "m li",
   regexT17: "m li",
   isTier17: false,
 },
 "Unique Boss has #% increased Life|Unique Boss has #% increased Area of Effect": {
   value: "Unique Boss has #% increased Life|Unique Boss has #% increased Area of Effect",
   scary: 302,
   regex: "d li",
   regexT17: "d li",
   isTier17: false,
 },
 "#% more Monster Life": {
   value: "#% more Monster Life",
   scary: 303,
   regex: "r li",
   regexT17: "r li",
   isTier17: false,
 },
 "Players cannot inflict Exposure": {
   value: "Players cannot inflict Exposure",
   scary: 304,
   regex: "ot i",
   regexT17: "ot i",
   isTier17: false,
 },
 "+#% Monster Physical Damage Reduction": {
   value: "+#% Monster Physical Damage Reduction",
   scary: 305,
   regex: "uct",
   regexT17: "uct",
   isTier17: false,
 },
 "+#% Monster Chaos Resistance|+#% Monster Elemental Resistances": {
   value: "+#% Monster Chaos Resistance|+#% Monster Elemental Resistances",
   scary: 306,
   regex: "r el",
   regexT17: "r el",
   isTier17: false,
 },
 "#% less effect of Curses on Monsters": {
   value: "#% less effect of Curses on Monsters",
   scary: 307,
   regex: "rses",
   regexT17: "s ef",
   isTier17: false,
 },
 "Monsters have +#% chance to Suppress Spell Damage": {
   value: "Monsters have +#% chance to Suppress Spell Damage",
   scary: 308,
   regex: "o su",
   regexT17: "o su",
   isTier17: false,
 },
 "Players have #% reduced Chance to Block|Players have #% less Armour": {
   value: "Players have #% reduced Chance to Block|Players have #% less Armour",
   scary: 309,
   regex: "o bl",
   regexT17: "s arm",
   isTier17: false,
 },
 "Players have -#% to amount of Suppressed Spell Damage Prevented|Monsters have #% increased Accuracy Rating": {
   value: "Players have -#% to amount of Suppressed Spell Damage Prevented|Monsters have #% increased Accuracy Rating",
   scary: 310,
   regex: "rev",
   regexT17: "rev",
   isTier17: false,
 },
 "Monsters have #% chance to Avoid Elemental Ailments": {
   value: "Monsters have #% chance to Avoid Elemental Ailments",
   scary: 311,
   regex: "d el",
   regexT17: "d el",
   isTier17: false,
 },
 "Monsters take #% reduced Extra Damage from Critical Strikes": {
   value: "Monsters take #% reduced Extra Damage from Critical Strikes",
   scary: 312,
   regex: "kes",
   regexT17: "kes",
   isTier17: false,
 },
 "Buffs on Players expire #% faster": {
   value: "Buffs on Players expire #% faster",
   scary: 400,
   regex: "fs",
   regexT17: "n pl",
   isTier17: false,
 },
 "Players gain #% reduced Flask Charges": {
   value: "Players gain #% reduced Flask Charges",
   scary: 401,
   regex: "ask",
   regexT17: "d fl",
   isTier17: false,
 },
 "Players have #% less Area of Effect": {
   value: "Players have #% less Area of Effect",
   scary: 402,
   regex: "ss are",
   regexT17: "ss are",
   isTier17: false,
 },
 "Players have #% less Cooldown Recovery Rate": {
   value: "Players have #% less Cooldown Recovery Rate",
   scary: 403,
   regex: "coo",
   regexT17: "coo",
   isTier17: false,
 },
 "Players have #% less Accuracy Rating": {
   value: "Players have #% less Accuracy Rating",
   scary: 404,
   regex: "s ac",
   regexT17: "ss ac",
   isTier17: false,
 },
 "Players are Cursed with Vulnerability": {
   value: "Players are Cursed with Vulnerability",
   scary: 405,
   regex: "h vu",
   regexT17: "h vu",
   isTier17: false,
 },
 "Players are Cursed with Elemental Weakness": {
   value: "Players are Cursed with Elemental Weakness",
   scary: 406,
   regex: "h el",
   regexT17: "h el",
   isTier17: false,
 },
 "Monsters' skills Chain 2 additional times": {
   value: "Monsters' skills Chain 2 additional times",
   scary: 407,
   regex: "tim",
   regexT17: "imes",
   isTier17: false,
 },
 "Monsters fire 2 additional Projectiles": {
   value: "Monsters fire 2 additional Projectiles",
   scary: 408,
   regex: "oj",
   regexT17: "rs fi",
   isTier17: false,
 },
 "Monsters have a #% chance to avoid Poison, Impale, and Bleeding": {
   value: "Monsters have a #% chance to avoid Poison, Impale, and Bleeding",
   scary: 409,
   regex: "on,",
   regexT17: "on,",
   isTier17: false,
 },
 "Monsters gain an Endurance Charge on Hit": {
   value: "Monsters gain an Endurance Charge on Hit",
   scary: 410,
   regex: "an en",
   regexT17: "e charge o",
   isTier17: false,
 },
 "Monsters gain a Frenzy Charge on Hit": {
   value: "Monsters gain a Frenzy Charge on Hit",
   scary: 411,
   regex: "zy c",
   regexT17: "a fre",
   isTier17: false,
 },
 "Monsters gain a Power Charge on Hit": {
   value: "Monsters gain a Power Charge on Hit",
   scary: 412,
   regex: "a pow",
   regexT17: "a pow",
   isTier17: false,
 },
 "Monsters Blind on Hit": {
   value: "Monsters Blind on Hit",
   scary: 413,
   regex: "s bli",
   regexT17: "s bli",
   isTier17: false,
 },
 "Monsters Maim on Hit with Attacks": {
   value: "Monsters Maim on Hit with Attacks",
   scary: 414,
   regex: "aim",
   regexT17: "aim",
   isTier17: false,
 },
 "Monsters Hinder on Hit with Spells": {
   value: "Monsters Hinder on Hit with Spells",
   scary: 415,
   regex: "hind",
   regexT17: "hind",
   isTier17: false,
 },
 "Monsters steal Power, Frenzy and Endurance charges on Hit": {
   value: "Monsters steal Power, Frenzy and Endurance charges on Hit",
   scary: 416,
   regex: "er,",
   regexT17: "teal",
   isTier17: false,
 },
 "Area has patches of Burning Ground": {
   value: "Area has patches of Burning Ground",
   scary: 417,
   regex: "f bur",
   regexT17: "f bur",
   isTier17: false,
 },
 "Area has patches of Chilled Ground": {
   value: "Area has patches of Chilled Ground",
   scary: 418,
   regex: "hil",
   regexT17: "hil",
   isTier17: false,
 },
 "Area has patches of desecrated ground": {
   value: "Area has patches of desecrated ground",
   scary: 419,
   regex: "s of d",
   regexT17: "s of d",
   isTier17: false,
 },
 "Area is inhabited by Abominations": {
   value: "Area is inhabited by Abominations",
   scary: 499,
   regex: "bom",
   regexT17: "bom",
   isTier17: false,
 },
 "Area is inhabited by Animals": {
   value: "Area is inhabited by Animals",
   scary: 499,
   regex: "nim",
   regexT17: "nim",
   isTier17: false,
 },
 "Area is inhabited by Demons": {
   value: "Area is inhabited by Demons",
   scary: 499,
   regex: "emons",
   regexT17: "emons",
   isTier17: false,
 },
 "Area is inhabited by Ghosts": {
   value: "Area is inhabited by Ghosts",
   scary: 499,
   regex: "osts",
   regexT17: "osts",
   isTier17: false,
 },
 "Area is inhabited by Goatmen": {
   value: "Area is inhabited by Goatmen",
   scary: 499,
   regex: "oa",
   regexT17: "oa",
   isTier17: false,
 },
 "Area is inhabited by Humanoids": {
   value: "Area is inhabited by Humanoids",
   scary: 499,
   regex: "hum",
   regexT17: "hum",
   isTier17: false,
 },
 "Area is inhabited by Cultists of Kitava": {
   value: "Area is inhabited by Cultists of Kitava",
   scary: 499,
   regex: "cul",
   regexT17: "cul",
   isTier17: false,
 },
 "Area is inhabited by Lunaris fanatics": {
   value: "Area is inhabited by Lunaris fanatics",
   scary: 499,
   regex: "unari",
   regexT17: "unari",
   isTier17: false,
 },
 "Area is inhabited by ranged monsters": {
   value: "Area is inhabited by ranged monsters",
   scary: 499,
   regex: "rang",
   regexT17: "rang",
   isTier17: false,
 },
 "Area is inhabited by Skeletons": {
   value: "Area is inhabited by Skeletons",
   scary: 499,
   regex: "eto",
   regexT17: "eto",
   isTier17: false,
 },
 "Area is inhabited by Solaris fanatics": {
   value: "Area is inhabited by Solaris fanatics",
   scary: 499,
   regex: "laris",
   regexT17: "laris",
   isTier17: false,
 },
 "Area is inhabited by Sea Witches and their Spawn": {
   value: "Area is inhabited by Sea Witches and their Spawn",
   scary: 499,
   regex: "ei",
   regexT17: "itc",
   isTier17: false,
 },
 "Area is inhabited by Undead": {
   value: "Area is inhabited by Undead",
   scary: 499,
   regex: "by un",
   regexT17: "by un",
   isTier17: false,
 },
 "Area has increased monster variety": {
   value: "Area has increased monster variety",
   scary: 499,
   regex: "ety",
   regexT17: "ety",
   isTier17: false,
 },
 "Area is inhabited by 2 additional Rogue Exiles": {
   value: "Area is inhabited by 2 additional Rogue Exiles",
   scary: 500,
   regex: "rog",
   regexT17: "rog",
   isTier17: false,
 },
 "Area contains many Totems": {
   value: "Area contains many Totems",
   scary: 500,
   regex: "tot",
   regexT17: "many",
   isTier17: false,
 },
 "Area contains two Unique Bosses": {
   value: "Area contains two Unique Bosses",
   scary: 600,
   regex: "two",
   regexT17: "two",
   isTier17: false,
 },
 "This Map's Modifiers to Quantity of Items found also apply to Rarity": {
   value: "This Map's Modifiers to Quantity of Items found also apply to Rarity",
   scary: 630,
   regex: "p'",
   regexT17: "p'",
   isTier17: false,
 },
 "#% increased number of Rare Monsters": {
   value: "#% increased number of Rare Monsters",
   scary: 803,
   regex: "nu",
   regexT17: "d nu",
   isTier17: false,
 },
 "#% more Magic Monsters": {
   value: "#% more Magic Monsters",
   scary: 810,
   regex: "e mag",
   regexT17: "e mag",
   isTier17: false,
 },
 "Slaying Enemies close together has a #% chance to attract monsters from Beyond": {
   value: "Slaying Enemies close together has a #% chance to attract monsters from Beyond",
   scary: 900,
   regex: "yi",
   regexT17: "yi",
   isTier17: false,
 },
 "(T17) Monsters' skills Chain 3 additional times|Monsters' Projectiles can Chain when colliding with Terrain": {
   value: "(T17) Monsters' skills Chain 3 additional times|Monsters' Projectiles can Chain when colliding with Terrain",
   scary: 11,
   regex: "lid",
   regexT17: "lid",
   isTier17: true,
 },
 "(T17) Players and their Minions deal no damage for 4 out of every 10 seconds": {
   value: "(T17) Players and their Minions deal no damage for 4 out of every 10 seconds",
   scary: 11,
   regex: "ever",
   regexT17: "ever",
   isTier17: true,
 },
 "(T17) Monsters have #% increased Area of Effect|Monsters fire 4 additional Projectiles": {
   value: "(T17) Monsters have #% increased Area of Effect|Monsters fire 4 additional Projectiles",
   scary: 11,
   regex: "rs fi",
   regexT17: "rs fi",
   isTier17: true,
 },
 "(T17) #% increased Monster Damage": {
   value: "(T17) #% increased Monster Damage",
   scary: 11,
   regex: "d monster d",
   regexT17: "d monster d",
   isTier17: true,
 },
 "(T17) Monsters gain #% of Maximum Life as Extra Maximum Energy Shield": {
   value: "(T17) Monsters gain #% of Maximum Life as Extra Maximum Energy Shield",
   scary: 11,
   regex: "m li",
   regexT17: "m li",
   isTier17: true,
 },
 "(T17) Unique Bosses are Possessed": {
   value: "(T17) Unique Bosses are Possessed",
   scary: 11,
   regex: "poss",
   regexT17: "poss",
   isTier17: true,
 },
 "(T17) Monsters have +#% chance to Suppress Spell Damage": {
   value: "(T17) Monsters have +#% chance to Suppress Spell Damage",
   scary: 11,
   regex: "o su",
   regexT17: "o su",
   isTier17: true,
 },
 "(T17) Monsters have +#% Chance to Block Attack Damage": {
   value: "(T17) Monsters have +#% Chance to Block Attack Damage",
   scary: 11,
   regex: "k at",
   regexT17: "k at",
   isTier17: true,
 },
 "(T17) Monsters reflect #% of Physical Damage|Monsters reflect #% of Elemental Damage": {
   value: "(T17) Monsters reflect #% of Physical Damage|Monsters reflect #% of Elemental Damage",
   scary: 11,
   regex: "f ph",
   regexT17: "f ph",
   isTier17: true,
 },
 "(T17) #% more Monster Life": {
   value: "(T17) #% more Monster Life",
   scary: 11,
   regex: "r li",
   regexT17: "r li",
   isTier17: true,
 },
 "(T17) #% increased number of Rare Monsters|Rare Monsters each have 2 additional Modifiers": {
   value: "(T17) #% increased number of Rare Monsters|Rare Monsters each have 2 additional Modifiers",
   scary: 11,
   regex: "s ea",
   regexT17: "s ea",
   isTier17: true,
 },
 "(T17) Monsters inflict 2 Grasping Vines on Hit": {
   value: "(T17) Monsters inflict 2 Grasping Vines on Hit",
   scary: 11,
   regex: "pin",
   regexT17: "pin",
   isTier17: true,
 },
 "(T17) Rare Monsters have Volatile Cores": {
   value: "(T17) Rare Monsters have Volatile Cores",
   scary: 11,
   regex: "cores",
   regexT17: "cores",
   isTier17: true,
 },
 "(T17) Monsters gain #% of their Physical Damage as Extra Damage of a random Element": {
   value: "(T17) Monsters gain #% of their Physical Damage as Extra Damage of a random Element",
   scary: 11,
   regex: "om e",
   regexT17: "om e",
   isTier17: true,
 },
 "(T17) Monsters gain #% of their Physical Damage as Extra Chaos Damage": {
   value: "(T17) Monsters gain #% of their Physical Damage as Extra Chaos Damage",
   scary: 11,
   regex: "ra c",
   regexT17: "ra c",
   isTier17: true,
 },
 "(T17) #% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed": {
   value: "(T17) #% increased Monster Movement Speed|#% increased Monster Attack Speed|#% increased Monster Cast Speed",
   scary: 11,
   regex: "r at",
   regexT17: "r at",
   isTier17: true,
 },
 "(T17) Players are assaulted by Bloodstained Sawblades": {
   value: "(T17) Players are assaulted by Bloodstained Sawblades",
   scary: 11,
   regex: "wb",
   regexT17: "wb",
   isTier17: true,
 },
 "(T17) Area contains Drowning Orbs": {
   value: "(T17) Area contains Drowning Orbs",
   scary: 11,
   regex: "wni",
   regexT17: "wni",
   isTier17: true,
 },
 "(T17) #% reduced Effect of Curses on Monsters": {
   value: "(T17) #% reduced Effect of Curses on Monsters",
   scary: 11,
   regex: "d effect of c",
   regexT17: "d effect of c",
   isTier17: true,
 },
 "(T17) +#% Monster Physical Damage Reduction|+#% Monster Chaos Resistance|+#% Monster Elemental Resistances": {
   value: "(T17) +#% Monster Physical Damage Reduction|+#% Monster Chaos Resistance|+#% Monster Elemental Resistances",
   scary: 11,
   regex: "uct",
   regexT17: "uct",
   isTier17: true,
 },
 "(T17) All Monster Damage can Ignite, Freeze and Shock|Monsters Ignite, Freeze and Shock on Hit": {
   value: "(T17) All Monster Damage can Ignite, Freeze and Shock|Monsters Ignite, Freeze and Shock on Hit",
   scary: 11,
   regex: "te,",
   regexT17: "te,",
   isTier17: true,
 },
 "(T17) Players are Marked for Death for 10 seconds after killing a Rare or Unique monster": {
   value: "(T17) Players are Marked for Death for 10 seconds after killing a Rare or Unique monster",
   scary: 11,
   regex: "rke",
   regexT17: "rke",
   isTier17: true,
 },
 "(T17) Rare and Unique Monsters remove #% of Life, Mana and Energy Shield on hit": {
   value: "(T17) Rare and Unique Monsters remove #% of Life, Mana and Energy Shield on hit",
   scary: 11,
   regex: "na a",
   regexT17: "na a",
   isTier17: true,
 },
 "(T17) Monsters' Attacks Impale on Hit|When a fifth Impale is inflicted on a Player, Impales are removed to Reflect thier Physical Damage multiplied by their remaining Hits to that Player and their Allies within 1.8 metres": {
   value: "(T17) Monsters' Attacks Impale on Hit|When a fifth Impale is inflicted on a Player, Impales are removed to Reflect thier Physical Damage multiplied by their remaining Hits to that Player and their Allies within 1.8 metres",
   scary: 11,
   regex: "fif",
   regexT17: "fif",
   isTier17: true,
 },
 "(T17) Rare monsters in area are Shaper-Touched": {
   value: "(T17) Rare monsters in area are Shaper-Touched",
   scary: 11,
   regex: "hap",
   regexT17: "hap",
   isTier17: true,
 },
 "(T17) Players have -2 to maximum number of Summoned Totems": {
   value: "(T17) Players have -2 to maximum number of Summoned Totems",
   scary: 11,
   regex: "moned",
   regexT17: "moned",
   isTier17: true,
 },
 "(T17) Player Skills which Throw Mines throw 1 fewer Mine|Player Skills which Throw Traps throw 1 fewer Trap": {
   value: "(T17) Player Skills which Throw Mines throw 1 fewer Mine|Player Skills which Throw Traps throw 1 fewer Trap",
   scary: 11,
   regex: "hro",
   regexT17: "hro",
   isTier17: true,
 },
 "(T17) #% of Damage Players' Totems take from Hits is taken from their Summoner's Life instead": {
   value: "(T17) #% of Damage Players' Totems take from Hits is taken from their Summoner's Life instead",
   scary: 11,
   regex: "oner",
   regexT17: "oner",
   isTier17: true,
 },
 "(T17) Players in Area take #% increased Damage per nearby Ally": {
   value: "(T17) Players in Area take #% increased Damage per nearby Ally",
   scary: 11,
   regex: "nea",
   regexT17: "nea",
   isTier17: true,
 },
 "(T17) Map Boss is accompanied by a Synthesis Boss": {
   value: "(T17) Map Boss is accompanied by a Synthesis Boss",
   scary: 11,
   regex: "yn",
   regexT17: "yn",
   isTier17: true,
 },
 "(T17) Area contains Runes of the Searing Exarch": {
   value: "(T17) Area contains Runes of the Searing Exarch",
   scary: 11,
   regex: "rune",
   regexT17: "rune",
   isTier17: true,
 },
 "(T17) All Magic and Normal Monsters in Area are in a Union of Souls": {
   value: "(T17) All Magic and Normal Monsters in Area are in a Union of Souls",
   scary: 11,
   regex: "sou",
   regexT17: "sou",
   isTier17: true,
 },
 "(T17) Monsters have +1 to Maximum Power Charges|Monsters gain a Power Charge on Hit": {
   value: "(T17) Monsters have +1 to Maximum Power Charges|Monsters gain a Power Charge on Hit",
   scary: 11,
   regex: "mum p",
   regexT17: "mum p",
   isTier17: true,
 },
 "(T17) Monsters have +1 to Maximum Frenzy Charges|Monsters gain a Frenzy Charge on Hit": {
   value: "(T17) Monsters have +1 to Maximum Frenzy Charges|Monsters gain a Frenzy Charge on Hit",
   scary: 11,
   regex: "mum f",
   regexT17: "mum f",
   isTier17: true,
 },
 "(T17) Monsters have +1 to Maximum Endurance Charges|Monsters gain an Endurance Charge when hit": {
   value: "(T17) Monsters have +1 to Maximum Endurance Charges|Monsters gain an Endurance Charge when hit",
   scary: 11,
   regex: "m end",
   regexT17: "m end",
   isTier17: true,
 },
 "(T17) Players have -#% to all maximum Resistances": {
   value: "(T17) Players have -#% to all maximum Resistances",
   scary: 11,
   regex: "o al",
   regexT17: "o al",
   isTier17: true,
 },
 "(T17) Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier": {
   value: "(T17) Monsters have #% increased Critical Strike Chance|+#% to Monster Critical Strike Multiplier",
   scary: 11,
   regex: "lier",
   regexT17: "lier",
   isTier17: true,
 },
 "(T17) Monsters Poison on Hit|All Damage from Monsters' Hits can Poison": {
   value: "(T17) Monsters Poison on Hit|All Damage from Monsters' Hits can Poison",
   scary: 11,
   regex: "' h",
   regexT17: "' h",
   isTier17: true,
 },
 "(T17) Monsters cannot be Leeched from": {
   value: "(T17) Monsters cannot be Leeched from",
   scary: 11,
   regex: "eche",
   regexT17: "eche",
   isTier17: true,
 },
 "(T17) Players are Cursed with Vulnerability": {
   value: "(T17) Players are Cursed with Vulnerability",
   scary: 11,
   regex: "h vu",
   regexT17: "h vu",
   isTier17: true,
 },
 "(T17) Players have #% less Area of Effect": {
   value: "(T17) Players have #% less Area of Effect",
   scary: 11,
   regex: "ss are",
   regexT17: "ss are",
   isTier17: true,
 },
 "(T17) Monsters take #% reduced Extra Damage from Critical Strikes": {
   value: "(T17) Monsters take #% reduced Extra Damage from Critical Strikes",
   scary: 11,
   regex: "kes",
   regexT17: "kes",
   isTier17: true,
 },
 "(T17) Unique Monsters have a random Shrine Buff": {
   value: "(T17) Unique Monsters have a random Shrine Buff",
   scary: 11,
   regex: "e a r",
   regexT17: "e a r",
   isTier17: true,
 },
 "(T17) Area contains Petrification Statues": {
   value: "(T17) Area contains Petrification Statues",
   scary: 11,
   regex: "pet",
   regexT17: "pet",
   isTier17: true,
 },
 "(T17) Area contains (30-40) additional Clusters of Highly Volatile Barrels": {
   value: "(T17) Area contains (30-40) additional Clusters of Highly Volatile Barrels",
   scary: 11,
   regex: "hl",
   regexT17: "hl",
   isTier17: true,
 },
 "(T17) Players cannot gain Endurance Charges|Players cannot gain Frenzy Charges|Players cannot gain Power Charges": {
   value: "(T17) Players cannot gain Endurance Charges|Players cannot gain Frenzy Charges|Players cannot gain Power Charges",
   scary: 11,
   regex: "ot g",
   regexT17: "ot g",
   isTier17: true,
 },
 "(T17) Monsters cannot be Stunned|Monsters' Action Speed cannot be modified to below Base Value|Monsters' Movement Speed cannot be modified to below Base Value": {
   value: "(T17) Monsters cannot be Stunned|Monsters' Action Speed cannot be modified to below Base Value|Monsters' Movement Speed cannot be modified to below Base Value",
   scary: 11,
   regex: "' mo",
   regexT17: "' mo",
   isTier17: true,
 },
 "(T17) Players are targeted by a Meteor when they use a Flask": {
   value: "(T17) Players are targeted by a Meteor when they use a Flask",
   scary: 11,
   regex: "teo",
   regexT17: "teo",
   isTier17: true,
 },
 "(T17) Players have #% less Defences": {
   value: "(T17) Players have #% less Defences",
   scary: 11,
   regex: "efe",
   regexT17: "efe",
   isTier17: true,
 },
 "(T17) Players cannot Recharge Energy Shield": {
   value: "(T17) Players cannot Recharge Energy Shield",
   scary: 11,
   regex: "rech",
   regexT17: "rech",
   isTier17: true,
 },
 "(T17) Players cannot Block|Players cannot Suppress Spell Damage": {
   value: "(T17) Players cannot Block|Players cannot Suppress Spell Damage",
   scary: 11,
   regex: "ot s",
   regexT17: "ot s",
   isTier17: true,
 },
 "(T17) Players have #% reduced effect of Non-Curse Auras from Skills": {
   value: "(T17) Players have #% reduced effect of Non-Curse Auras from Skills",
   scary: 11,
   regex: "non",
   regexT17: "non",
   isTier17: true,
 },
 "(T17) Players have #% less Recovery Rate of Life and Energy Shield": {
   value: "(T17) Players have #% less Recovery Rate of Life and Energy Shield",
   scary: 11,
   regex: "s rec",
   regexT17: "s rec",
   isTier17: true,
 },
 "(T17) Buffs on Players expire #% faster": {
   value: "(T17) Buffs on Players expire #% faster",
   scary: 11,
   regex: "n pl",
   regexT17: "n pl",
   isTier17: true,
 },
 "(T17) Monster Damage Penetrates #% Elemental Resistances": {
   value: "(T17) Monster Damage Penetrates #% Elemental Resistances",
   scary: 11,
   regex: "net",
   regexT17: "net",
   isTier17: true,
 },
 "(T17) Players have #% reduced Action Speed for each time they've used a Skill Recently": {
   value: "(T17) Players have #% reduced Action Speed for each time they've used a Skill Recently",
   scary: 11,
   regex: "'v",
   regexT17: "'v",
   isTier17: true,
 },
 "(T17) Area contains Unstable Tentacle Fiends": {
   value: "(T17) Area contains Unstable Tentacle Fiends",
   scary: 11,
   regex: "tab",
   regexT17: "tab",
   isTier17: true,
 },
 "(T17) Area has patches of Awakeners' Desolation": {
   value: "(T17) Area has patches of Awakeners' Desolation",
   scary: 11,
   regex: "wak",
   regexT17: "wak",
   isTier17: true,
 },
 "(T17) Players' Minions have #% less Attack Speed|Players' Minions have #% less Cast Speed|Players' Minions have #% less Movement Speed": {
   value: "(T17) Players' Minions have #% less Attack Speed|Players' Minions have #% less Cast Speed|Players' Minions have #% less Movement Speed",
   scary: 11,
   regex: "' mi",
   regexT17: "' mi",
   isTier17: true,
 },
 "(T17) Debuffs on Monsters expire #% faster": {
   value: "(T17) Debuffs on Monsters expire #% faster",
   scary: 11,
   regex: "deb",
   regexT17: "deb",
   isTier17: true,
 },
 "(T17) The Maven interferes with Players": {
   value: "(T17) The Maven interferes with Players",
   scary: 11,
   regex: "mav",
   regexT17: "mav",
   isTier17: true,
 },
  "(T17) Monsters Ignite, Freeze and Shock on Hit|All Monster Damage can Ignite, Freeze and Shock": {
   value: "(T17) Monsters Ignite, Freeze and Shock on Hit|All Monster Damage can Ignite, Freeze and Shock",
   scary: 11,
   regex: "te,",
   regexT17: "te,",
   isTier17: true,
 },
};
export const kiracModifier: { [key: string]: MapMod } = {
 "Area contains The Sacred Grove": {
   value: "Area contains The Sacred Grove",
   scary: 900,
   regex: "sac",
   regexT17: "",
   isTier17: false,
 },
 "Area contains an additional Legion Encounter": {
   value: "Area contains an additional Legion Encounter",
   scary: 899,
   regex: "leg",
   regexT17: "",
   isTier17: false,
 },
 "Area contains an additional Expedition Encounter": {
   value: "Area contains an additional Expedition Encounter",
   scary: 898,
   regex: "xped",
   regexT17: "",
   isTier17: false,
 },
 "Area contains an additional Smuggler's Cache": {
   value: "Area contains an additional Smuggler's Cache",
   scary: 897,
   regex: "r'",
   regexT17: "",
   isTier17: false,
 },
 "Area contains Metamorph Monsters": {
   value: "Area contains Metamorph Monsters",
   scary: 896,
   regex: "tam",
   regexT17: "",
   isTier17: false,
 },
 "Areas contain Ritual Altars": {
   value: "Areas contain Ritual Altars",
   scary: 895,
   regex: "ual",
   regexT17: "",
   isTier17: false,
 },
 "Area contains # additional Abysses": {
   value: "Area contains # additional Abysses",
   scary: 894,
   regex: "ysse",
   regexT17: "",
   isTier17: false,
 },
 "Area contains # additional Breaches": {
   value: "Area contains # additional Breaches",
   scary: 893,
   regex: "brea",
   regexT17: "",
   isTier17: false,
 },
 "Area contains # additional Harbingers": {
   value: "Area contains # additional Harbingers",
   scary: 892,
   regex: "arb",
   regexT17: "",
   isTier17: false,
 },
 "Area contains # additional Essences": {
   value: "Area contains # additional Essences",
   scary: 891,
   regex: "ssen",
   regexT17: "",
   isTier17: false,
 },
 "Area contains # additional Strongboxes": {
   value: "Area contains # additional Strongboxes",
   scary: 890,
   regex: "gb",
   regexT17: "",
   isTier17: false,
 },
 "Area is inhabited by # additional Tormented Spirits": {
   value: "Area is inhabited by # additional Tormented Spirits",
   scary: 889,
   regex: "rme",
   regexT17: "",
   isTier17: false,
 },
 "Area contains # additional Shrines": {
   value: "Area contains # additional Shrines",
   scary: 888,
   regex: "rines",
   regexT17: "",
   isTier17: false,
 },
 "Area is inhabited by # additional Rogue Exiles": {
   value: "Area is inhabited by # additional Rogue Exiles",
   scary: 887,
   regex: "rog",
   regexT17: "",
   isTier17: false,
 },
 "Area is inhabited by Cultists of Kitava": {
   value: "Area is inhabited by Cultists of Kitava",
   scary: 886,
   regex: "cul",
   regexT17: "",
   isTier17: false,
 },
};
