export interface MapMod {
  value: string
  scary: number
  matchSafe: string
}
 
export const mapModifiers: { [key: string]: MapMod } = {
 "Monsters reflect X% of Elemental Damage": {
   value: "Monsters reflect X% of Elemental Damage",
   scary: 0,
   matchSafe: "\"tal d\"",
 },
 "Monsters reflect X% of Physical Damage": {
   value: "Monsters reflect X% of Physical Damage",
   scary: 1,
   matchSafe: "\"f ph\"",
 },
 "Players cannot Regenerate Life, Mana or Energy Shield": {
   value: "Players cannot Regenerate Life, Mana or Energy Shield",
   scary: 2,
   matchSafe: "ege",
 },
 "Cannot Leech from Monsters": {
   value: "Cannot Leech from Monsters",
   scary: 3,
   matchSafe: "eec",
 },
 "Players are Cursed with Temporal Chains": {
   value: "Players are Cursed with Temporal Chains",
   scary: 100,
   matchSafe: "\"h tem\"",
 },
 "-X% maximum Player Resistances": {
   value: "-X% maximum Player Resistances",
   scary: 101,
   matchSafe: "\"% ma\"",
 },
 "Players have X% less Recovery Rate of Life and Energy Shield": {
   value: "Players have X% less Recovery Rate of Life and Energy Shield",
   scary: 102,
   matchSafe: "\"s rec\"",
 },
 "Monsters are Hexproof": {
   value: "Monsters are Hexproof",
   scary: 200,
   matchSafe: "\"re he\"",
 },
 "Unique Bosses are Possessed": {
   value: "Unique Bosses are Possessed",
   scary: 201,
   matchSafe: "poss",
 },
 "Players have X% reduced effect of Non-Curse Auras from Skills": {
   value: "Players have X% reduced effect of Non-Curse Auras from Skills",
   scary: 203,
   matchSafe: "non",
 },
 "Players are Cursed with Enfeeble": {
   value: "Players are Cursed with Enfeeble",
   scary: 204,
   matchSafe: "\"h en\"",
 },
 "Monsters have X% increased Critical Strike Chance": {
   value: "Monsters have X% increased Critical Strike Chance",
   scary: 205,
   matchSafe: "\"ke c\"",
 },
 "Unique Boss deals X% increased Damage": {
   value: "Unique Boss deals X% increased Damage",
   scary: 206,
   matchSafe: "eals",
 },
 "X% increased Monster Damage": {
   value: "X% increased Monster Damage",
   scary: 207,
   matchSafe: "\"d monster d\"",
 },
 "Monsters deal X% extra Physical Damage as Cold": {
   value: "Monsters deal X% extra Physical Damage as Cold",
   scary: 208,
   matchSafe: "\"as c\"",
 },
 "Monsters deal X% extra Physical Damage as Fire": {
   value: "Monsters deal X% extra Physical Damage as Fire",
   scary: 209,
   matchSafe: "\" as f\"",
 },
 "Monsters deal X% extra Physical Damage as Lightning": {
   value: "Monsters deal X% extra Physical Damage as Lightning",
   scary: 210,
   matchSafe: "\"as l\"",
 },
 "Area has patches of Shocked Ground which increase Damage taken by X%": {
   value: "Area has patches of Shocked Ground which increase Damage taken by X%",
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
 "X% increased Monster Movement Speed|X% increased Monster Attack Speed|X% increased Monster Cast Speed": {
   value: "X% increased Monster Movement Speed|X% increased Monster Attack Speed|X% increased Monster Cast Speed",
   scary: 214,
   matchSafe: "mov",
 },
 "Monsters have a X% chance to cause Elemental Ailments on Hit": {
   value: "Monsters have a X% chance to cause Elemental Ailments on Hit",
   scary: 215,
   matchSafe: "cau",
 },
 "Monsters Poison on Hit": {
   value: "Monsters Poison on Hit",
   scary: 216,
   matchSafe: "\"son o\"",
 },
 "Monsters' Action Speed cannot be modified to below base value|Monsters cannot be Taunted": {
   value: "Monsters' Action Speed cannot be modified to below base value|Monsters cannot be Taunted",
   scary: 217,
   matchSafe: "elo",
 },
 "Monsters have X% chance to Impale with Attacks": {
   value: "Monsters have X% chance to Impale with Attacks",
   scary: 218,
   matchSafe: "\"o im\"",
 },
 "Monsters have X% increased Area of Effect": {
   value: "Monsters have X% increased Area of Effect",
   scary: 219,
   matchSafe: "\"e \\d+% increased ar\"",
 },
 "Area has patches of Consecrated Ground": {
   value: "Area has patches of Consecrated Ground",
   scary: 300,
   matchSafe: "nsecrate",
 },
 "Monsters gain X% of Maximum Life as Extra Maximum Energy Shield": {
   value: "Monsters gain X% of Maximum Life as Extra Maximum Energy Shield",
   scary: 301,
   matchSafe: "\"m li\"",
 },
 "Unique Boss has X% increased Life|Unique Boss has X% increased Area of Effect": {
   value: "Unique Boss has X% increased Life|Unique Boss has X% increased Area of Effect",
   scary: 302,
   matchSafe: "\"as x\"",
 },
 "X% more Monster Life": {
   value: "X% more Monster Life",
   scary: 303,
   matchSafe: "\"r li\"",
 },
 "Players cannot inflict Exposure": {
   value: "Players cannot inflict Exposure",
   scary: 304,
   matchSafe: "fli",
 },
 "+X% Monster Physical Damage Reduction": {
   value: "+X% Monster Physical Damage Reduction",
   scary: 305,
   matchSafe: "uct",
 },
 "+X% Monster Chaos Resistance|+X% Monster Elemental Resistances": {
   value: "+X% Monster Chaos Resistance|+X% Monster Elemental Resistances",
   scary: 306,
   matchSafe: "\"r el\"",
 },
 "X% less effect of Curses on Monsters": {
   value: "X% less effect of Curses on Monsters",
   scary: 307,
   matchSafe: "rses",
 },
 "Monsters have +X% chance to Suppress Spell Damage": {
   value: "Monsters have +X% chance to Suppress Spell Damage",
   scary: 308,
   matchSafe: "\"o su\"",
 },
 "Players have X% reduced Chance to Block|Players have X% less Armour": {
   value: "Players have X% reduced Chance to Block|Players have X% less Armour",
   scary: 309,
   matchSafe: "loc",
 },
 "Players have -X% to amount of Suppressed Spell Damage Prevented|Monsters have X% increased Accuracy Rating": {
   value: "Players have -X% to amount of Suppressed Spell Damage Prevented|Monsters have X% increased Accuracy Rating",
   scary: 310,
   matchSafe: "rev",
 },
 "Monsters have X% chance to Avoid Elemental Ailments": {
   value: "Monsters have X% chance to Avoid Elemental Ailments",
   scary: 311,
   matchSafe: "\"d el\"",
 },
 "Monsters take X% reduced Extra Damage from Critical Strikes": {
   value: "Monsters take X% reduced Extra Damage from Critical Strikes",
   scary: 312,
   matchSafe: "kes",
 },
 "Buffs on Players expire X% faster": {
   value: "Buffs on Players expire X% faster",
   scary: 400,
   matchSafe: "fs",
 },
 "Players gain X% reduced Flask Charges": {
   value: "Players gain X% reduced Flask Charges",
   scary: 401,
   matchSafe: "ask",
 },
 "Players have X% less Area of Effect": {
   value: "Players have X% less Area of Effect",
   scary: 402,
   matchSafe: "\"ss are\"",
 },
 "Players have X% less Cooldown Recovery Rate": {
   value: "Players have X% less Cooldown Recovery Rate",
   scary: 403,
   matchSafe: "coo",
 },
 "Players have X% less Accuracy Rating": {
   value: "Players have X% less Accuracy Rating",
   scary: 404,
   matchSafe: "\"s ac\"",
 },
 "Players are Cursed with Vulnerability": {
   value: "Players are Cursed with Vulnerability",
   scary: 405,
   matchSafe: "\"h vu\"",
 },
 "Players are Cursed with Elemental Weakness": {
   value: "Players are Cursed with Elemental Weakness",
   scary: 406,
   matchSafe: "\"h el\"",
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
 "Monsters have a X% chance to avoid Poison, Impale, and Bleeding": {
   value: "Monsters have a X% chance to avoid Poison, Impale, and Bleeding",
   scary: 409,
   matchSafe: "n,",
 },
 "Monsters gain an Endurance Charge on Hit": {
   value: "Monsters gain an Endurance Charge on Hit",
   scary: 410,
   matchSafe: "\"n en\"",
 },
 "Monsters gain a Frenzy Charge on Hit": {
   value: "Monsters gain a Frenzy Charge on Hit",
   scary: 411,
   matchSafe: "\" a f\"",
 },
 "Monsters gain a Power Charge on Hit": {
   value: "Monsters gain a Power Charge on Hit",
   scary: 412,
   matchSafe: "\" a po\"",
 },
 "Monsters Blind on Hit": {
   value: "Monsters Blind on Hit",
   scary: 413,
   matchSafe: "\"s bli\"",
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
   matchSafe: "r,",
 },
 "Area has patches of Burning Ground": {
   value: "Area has patches of Burning Ground",
   scary: 417,
   matchSafe: "\"f bu\"",
 },
 "Area has patches of Chilled Ground": {
   value: "Area has patches of Chilled Ground",
   scary: 418,
   matchSafe: "hil",
 },
 "Area has patches of desecrated ground": {
   value: "Area has patches of desecrated ground",
   scary: 419,
   matchSafe: "\"es of d\"",
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
   matchSafe: "\"by un\"",
 },
 "Area has increased monster variety": {
   value: "Area has increased monster variety",
   scary: 499,
   matchSafe: "var",
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
 "X% increased number of Rare Monsters": {
   value: "X% increased number of Rare Monsters",
   scary: 803,
   matchSafe: "nu",
 },
 "X% more Magic Monsters": {
   value: "X% more Magic Monsters",
   scary: 810,
   matchSafe: "\"e mag\"",
 },
 "Slaying Enemies close together has a X% chance to attract monsters from Beyond": {
   value: "Slaying Enemies close together has a X% chance to attract monsters from Beyond",
   scary: 900,
   matchSafe: "yi",
 },
};