export interface MapName {
  name: string
  isUnique: boolean
  matchSafe: string
}
export const mapNames: { [key: string]: MapName } = {
 "Academy Map": {
   name: "Academy Map",
   isUnique: false,
   matchSafe: "aca",
 },
 "Acid Caverns Map": {
   name: "Acid Caverns Map",
   isUnique: false,
   matchSafe: "cid",
 },
 "Alleyways Map": {
   name: "Alleyways Map",
   isUnique: false,
   matchSafe: "yw",
 },
 "Ancient City Map": {
   name: "Ancient City Map",
   isUnique: false,
   matchSafe: "t cit",
 },
 "Arachnid Nest Map": {
   name: "Arachnid Nest Map",
   isUnique: false,
   matchSafe: "nest",
 },
 "Arachnid Tomb Map": {
   name: "Arachnid Tomb Map",
   isUnique: false,
   matchSafe: "omb",
 },
 "Arcade Map": {
   name: "Arcade Map",
   isUnique: false,
   matchSafe: "rcad",
 },
 "Arena Map": {
   name: "Arena Map",
   isUnique: false,
   matchSafe: "aren",
 },
 "Arid Lake Map": {
   name: "Arid Lake Map",
   isUnique: false,
   matchSafe: "d la",
 },
 "Armoury Map": {
   name: "Armoury Map",
   isUnique: false,
   matchSafe: "ury",
 },
 "Arsenal Map": {
   name: "Arsenal Map",
   isUnique: false,
   matchSafe: "^ars",
 },
 "Ashen Wood Map": {
   name: "Ashen Wood Map",
   isUnique: false,
   matchSafe: "^as",
 },
 "Atoll Map": {
   name: "Atoll Map",
   isUnique: false,
   matchSafe: "^at",
 },
 "Barrows Map": {
   name: "Barrows Map",
   isUnique: false,
   matchSafe: "arro",
 },
 "Basilica Map": {
   name: "Basilica Map",
   isUnique: false,
   matchSafe: "^bas",
 },
 "Bazaar Map": {
   name: "Bazaar Map",
   isUnique: false,
   matchSafe: "baz",
 },
 "Beach Map": {
   name: "Beach Map",
   isUnique: false,
   matchSafe: "bea",
 },
 "Belfry Map": {
   name: "Belfry Map",
   isUnique: false,
   matchSafe: "elf",
 },
 "Bog Map": {
   name: "Bog Map",
   isUnique: false,
   matchSafe: "bog",
 },
 "Bone Crypt Map": {
   name: "Bone Crypt Map",
   isUnique: false,
   matchSafe: "bon",
 },
 "Bramble Valley Map": {
   name: "Bramble Valley Map",
   isUnique: false,
   matchSafe: "bra",
 },
 "Burial Chambers Map": {
   name: "Burial Chambers Map",
   isUnique: false,
   matchSafe: "uria",
 },
 "Cage Map": {
   name: "Cage Map",
   isUnique: false,
   matchSafe: "^cage ma",
 },
 "Caldera Map": {
   name: "Caldera Map",
   isUnique: false,
   matchSafe: "lde",
 },
 "Canyon Map": {
   name: "Canyon Map",
   isUnique: false,
   matchSafe: "yo",
 },
 "Carcass Map": {
   name: "Carcass Map",
   isUnique: false,
   matchSafe: "^car",
 },
 "Castle Ruins Map": {
   name: "Castle Ruins Map",
   isUnique: false,
   matchSafe: "tle",
 },
 "Cells Map": {
   name: "Cells Map",
   isUnique: false,
   matchSafe: "^cel",
 },
 "Cemetery Map": {
   name: "Cemetery Map",
   isUnique: false,
   matchSafe: "cem",
 },
 "Channel Map": {
   name: "Channel Map",
   isUnique: false,
   matchSafe: "nel",
 },
 "Chateau Map": {
   name: "Chateau Map",
   isUnique: false,
   matchSafe: "chat",
 },
 "City Square Map": {
   name: "City Square Map",
   isUnique: false,
   matchSafe: "^cit",
 },
 "Cold River Map": {
   name: "Cold River Map",
   isUnique: false,
   matchSafe: "^cold",
 },
 "Colonnade Map": {
   name: "Colonnade Map",
   isUnique: false,
   matchSafe: "lon",
 },
 "Colosseum Map": {
   name: "Colosseum Map",
   isUnique: false,
   matchSafe: "olos",
 },
 "Conservatory Map": {
   name: "Conservatory Map",
   isUnique: false,
   matchSafe: "nser",
 },
 "Coral Ruins Map": {
   name: "Coral Ruins Map",
   isUnique: false,
   matchSafe: "cora",
 },
 "Core Map": {
   name: "Core Map",
   isUnique: false,
   matchSafe: "^core ma",
 },
 "Courthouse Map": {
   name: "Courthouse Map",
   isUnique: false,
   matchSafe: "rth",
 },
 "Courtyard Map": {
   name: "Courtyard Map",
   isUnique: false,
   matchSafe: "rty",
 },
 "Coves Map": {
   name: "Coves Map",
   isUnique: false,
   matchSafe: "ves",
 },
 "Crater Map": {
   name: "Crater Map",
   isUnique: false,
   matchSafe: "rater",
 },
 "Crimson Temple Map": {
   name: "Crimson Temple Map",
   isUnique: false,
   matchSafe: "son te",
 },
 "Crimson Township Map": {
   name: "Crimson Township Map",
   isUnique: false,
   matchSafe: "wns",
 },
 "Crystal Ore Map": {
   name: "Crystal Ore Map",
   isUnique: false,
   matchSafe: "rys",
 },
 "Cursed Crypt Map": {
   name: "Cursed Crypt Map",
   isUnique: false,
   matchSafe: "d cry",
 },
 "Dark Forest Map": {
   name: "Dark Forest Map",
   isUnique: false,
   matchSafe: "k fore",
 },
 "Defiled Cathedral Map": {
   name: "Defiled Cathedral Map",
   isUnique: false,
   matchSafe: "fil",
 },
 "Desert Map": {
   name: "Desert Map",
   isUnique: false,
   matchSafe: "ert m",
 },
 "Desert Spring Map": {
   name: "Desert Spring Map",
   isUnique: false,
   matchSafe: "spr",
 },
 "Dig Map": {
   name: "Dig Map",
   isUnique: false,
   matchSafe: "^dig",
 },
 "Dry Sea Map": {
   name: "Dry Sea Map",
   isUnique: false,
   matchSafe: "^dry",
 },
 "Dunes Map": {
   name: "Dunes Map",
   isUnique: false,
   matchSafe: "dune",
 },
 "Dungeon Map": {
   name: "Dungeon Map",
   isUnique: false,
   matchSafe: "eon",
 },
 "Estuary Map": {
   name: "Estuary Map",
   isUnique: false,
   matchSafe: "^es",
 },
 "Excavation Map": {
   name: "Excavation Map",
   isUnique: false,
   matchSafe: "xc",
 },
 "Factory Map": {
   name: "Factory Map",
   isUnique: false,
   matchSafe: "^fa",
 },
 "Fields Map": {
   name: "Fields Map",
   isUnique: false,
   matchSafe: "^fi",
 },
 "Flooded Mine Map": {
   name: "Flooded Mine Map",
   isUnique: false,
   matchSafe: "flo",
 },
 "Forbidden Woods Map": {
   name: "Forbidden Woods Map",
   isUnique: false,
   matchSafe: "woods",
 },
 "Forge of the Phoenix Map": {
   name: "Forge of the Phoenix Map",
   isUnique: false,
   matchSafe: "oe",
 },
 "Forking River Map": {
   name: "Forking River Map",
   isUnique: false,
   matchSafe: "ork",
 },
 "Foundry Map": {
   name: "Foundry Map",
   isUnique: false,
   matchSafe: "fou",
 },
 "Frozen Cabins Map": {
   name: "Frozen Cabins Map",
   isUnique: false,
   matchSafe: "oz",
 },
 "Fungal Hollow Map": {
   name: "Fungal Hollow Map",
   isUnique: false,
   matchSafe: "nga",
 },
 "Gardens Map": {
   name: "Gardens Map",
   isUnique: false,
   matchSafe: "gar",
 },
 "Geode Map": {
   name: "Geode Map",
   isUnique: false,
   matchSafe: "^ge",
 },
 "Ghetto Map": {
   name: "Ghetto Map",
   isUnique: false,
   matchSafe: "ghe",
 },
 "Glacier Map": {
   name: "Glacier Map",
   isUnique: false,
   matchSafe: "^gl",
 },
 "Grave Trough Map": {
   name: "Grave Trough Map",
   isUnique: false,
   matchSafe: "trou",
 },
 "Graveyard Map": {
   name: "Graveyard Map",
   isUnique: false,
   matchSafe: "vey",
 },
 "Grotto Map": {
   name: "Grotto Map",
   isUnique: false,
   matchSafe: "^gro",
 },
 "Haunted Mansion Map": {
   name: "Haunted Mansion Map",
   isUnique: false,
   matchSafe: "mans",
 },
 "Iceberg Map": {
   name: "Iceberg Map",
   isUnique: false,
   matchSafe: "^ic",
 },
 "Infested Valley Map": {
   name: "Infested Valley Map",
   isUnique: false,
   matchSafe: "fes",
 },
 "Ivory Temple Map": {
   name: "Ivory Temple Map",
   isUnique: false,
   matchSafe: "^iv",
 },
 "Jungle Valley Map": {
   name: "Jungle Valley Map",
   isUnique: false,
   matchSafe: "^j",
 },
 "Laboratory Map": {
   name: "Laboratory Map",
   isUnique: false,
   matchSafe: "lab",
 },
 "Lair Map": {
   name: "Lair Map",
   isUnique: false,
   matchSafe: "^lair m",
 },
 "Lair of the Hydra Map": {
   name: "Lair of the Hydra Map",
   isUnique: false,
   matchSafe: "yd",
 },
 "Lava Chamber Map": {
   name: "Lava Chamber Map",
   isUnique: false,
   matchSafe: "va c",
 },
 "Lava Lake Map": {
   name: "Lava Lake Map",
   isUnique: false,
   matchSafe: "va l",
 },
 "Leyline Map": {
   name: "Leyline Map",
   isUnique: false,
   matchSafe: "^le",
 },
 "Lighthouse Map": {
   name: "Lighthouse Map",
   isUnique: false,
   matchSafe: "^li",
 },
 "Lookout Map": {
   name: "Lookout Map",
   isUnique: false,
   matchSafe: "ok",
 },
 "Malformation Map": {
   name: "Malformation Map",
   isUnique: false,
   matchSafe: "alf",
 },
 "Marshes Map": {
   name: "Marshes Map",
   isUnique: false,
   matchSafe: "rsh",
 },
 "Mausoleum Map": {
   name: "Mausoleum Map",
   isUnique: false,
   matchSafe: "mau",
 },
 "Maze Map": {
   name: "Maze Map",
   isUnique: false,
   matchSafe: "ze m",
 },
 "Maze of the Minotaur Map": {
   name: "Maze of the Minotaur Map",
   isUnique: false,
   matchSafe: "ino",
 },
 "Mesa Map": {
   name: "Mesa Map",
   isUnique: false,
   matchSafe: "^me",
 },
 "Mineral Pools Map": {
   name: "Mineral Pools Map",
   isUnique: false,
   matchSafe: "ols",
 },
 "Moon Temple Map": {
   name: "Moon Temple Map",
   isUnique: false,
   matchSafe: "moo",
 },
 "Mud Geyser Map": {
   name: "Mud Geyser Map",
   isUnique: false,
   matchSafe: "mud",
 },
 "Museum Map": {
   name: "Museum Map",
   isUnique: false,
   matchSafe: "mus",
 },
 "Necropolis Map": {
   name: "Necropolis Map",
   isUnique: false,
   matchSafe: "nec",
 },
 "Orchard Map": {
   name: "Orchard Map",
   isUnique: false,
   matchSafe: "^or",
 },
 "Overgrown Ruin Map": {
   name: "Overgrown Ruin Map",
   isUnique: false,
   matchSafe: "wn ru",
 },
 "Overgrown Shrine Map": {
   name: "Overgrown Shrine Map",
   isUnique: false,
   matchSafe: "wn s",
 },
 "Palace Map": {
   name: "Palace Map",
   isUnique: false,
   matchSafe: "^pal",
 },
 "Park Map": {
   name: "Park Map",
   isUnique: false,
   matchSafe: "park",
 },
 "Pen Map": {
   name: "Pen Map",
   isUnique: false,
   matchSafe: "pen m",
 },
 "Peninsula Map": {
   name: "Peninsula Map",
   isUnique: false,
   matchSafe: "peni",
 },
 "Phantasmagoria Map": {
   name: "Phantasmagoria Map",
   isUnique: false,
   matchSafe: "^ph",
 },
 "Pier Map": {
   name: "Pier Map",
   isUnique: false,
   matchSafe: "pie",
 },
 "Pit Map": {
   name: "Pit Map",
   isUnique: false,
   matchSafe: "^pit ma",
 },
 "Pit of the Chimera Map": {
   name: "Pit of the Chimera Map",
   isUnique: false,
   matchSafe: "him",
 },
 "Plateau Map": {
   name: "Plateau Map",
   isUnique: false,
   matchSafe: "plat",
 },
 "Plaza Map": {
   name: "Plaza Map",
   isUnique: false,
   matchSafe: "laz",
 },
 "Port Map": {
   name: "Port Map",
   isUnique: false,
   matchSafe: "^por",
 },
 "Primordial Blocks Map": {
   name: "Primordial Blocks Map",
   isUnique: false,
   matchSafe: "ocks",
 },
 "Primordial Pool Map": {
   name: "Primordial Pool Map",
   isUnique: false,
   matchSafe: "ial p",
 },
 "Promenade Map": {
   name: "Promenade Map",
   isUnique: false,
   matchSafe: "ome",
 },
 "Racecourse Map": {
   name: "Racecourse Map",
   isUnique: false,
   matchSafe: "cec",
 },
 "Ramparts Map": {
   name: "Ramparts Map",
   isUnique: false,
   matchSafe: "rts",
 },
 "Reef Map": {
   name: "Reef Map",
   isUnique: false,
   matchSafe: "eef",
 },
 "Relic Chambers Map": {
   name: "Relic Chambers Map",
   isUnique: false,
   matchSafe: "rel",
 },
 "Residence Map": {
   name: "Residence Map",
   isUnique: false,
   matchSafe: "sid",
 },
 "Scriptorium Map": {
   name: "Scriptorium Map",
   isUnique: false,
   matchSafe: "rip",
 },
 "Sepulchre Map": {
   name: "Sepulchre Map",
   isUnique: false,
   matchSafe: "^sepulchre ma",
 },
 "Shipyard Map": {
   name: "Shipyard Map",
   isUnique: false,
   matchSafe: "ipy",
 },
 "Shore Map": {
   name: "Shore Map",
   isUnique: false,
   matchSafe: "hore",
 },
 "Shrine Map": {
   name: "Shrine Map",
   isUnique: false,
   matchSafe: "^shr",
 },
 "Siege Map": {
   name: "Siege Map",
   isUnique: false,
   matchSafe: "ieg",
 },
 "Silo Map": {
   name: "Silo Map",
   isUnique: false,
   matchSafe: "ilo",
 },
 "Spider Forest Map": {
   name: "Spider Forest Map",
   isUnique: false,
   matchSafe: "ider f",
 },
 "Spider Lair Map": {
   name: "Spider Lair Map",
   isUnique: false,
   matchSafe: "r la",
 },
 "Stagnation Map": {
   name: "Stagnation Map",
   isUnique: false,
   matchSafe: "gna",
 },
 "Strand Map": {
   name: "Strand Map",
   isUnique: false,
   matchSafe: "^str",
 },
 "Sulphur Vents Map": {
   name: "Sulphur Vents Map",
   isUnique: false,
   matchSafe: "lp",
 },
 "Summit Map": {
   name: "Summit Map",
   isUnique: false,
   matchSafe: "mmi",
 },
 "Sunken City Map": {
   name: "Sunken City Map",
   isUnique: false,
   matchSafe: "sun",
 },
 "Temple Map": {
   name: "Temple Map",
   isUnique: false,
   matchSafe: "^tem",
 },
 "Terrace Map": {
   name: "Terrace Map",
   isUnique: false,
   matchSafe: "rrac",
 },
 "Thicket Map": {
   name: "Thicket Map",
   isUnique: false,
   matchSafe: "ick",
 },
 "Tower Map": {
   name: "Tower Map",
   isUnique: false,
   matchSafe: "ower m",
 },
 "Toxic Sewer Map": {
   name: "Toxic Sewer Map",
   isUnique: false,
   matchSafe: "tox",
 },
 "Tropical Island Map": {
   name: "Tropical Island Map",
   isUnique: false,
   matchSafe: "opi",
 },
 "Underground River Map": {
   name: "Underground River Map",
   isUnique: false,
   matchSafe: "und r",
 },
 "Underground Sea Map": {
   name: "Underground Sea Map",
   isUnique: false,
   matchSafe: "und s",
 },
 "Vaal Pyramid Map": {
   name: "Vaal Pyramid Map",
   isUnique: false,
   matchSafe: "yr",
 },
 "Vaal Temple Map": {
   name: "Vaal Temple Map",
   isUnique: false,
   matchSafe: "aal t",
 },
 "Vault Map": {
   name: "Vault Map",
   isUnique: false,
   matchSafe: "^vault ma",
 },
 "Villa Map": {
   name: "Villa Map",
   isUnique: false,
   matchSafe: "^vil",
 },
 "Volcano Map": {
   name: "Volcano Map",
   isUnique: false,
   matchSafe: "olc",
 },
 "Waste Pool Map": {
   name: "Waste Pool Map",
   isUnique: false,
   matchSafe: "e poo",
 },
 "Wasteland Map": {
   name: "Wasteland Map",
   isUnique: false,
   matchSafe: "tel",
 },
 "Waterways Map": {
   name: "Waterways Map",
   isUnique: false,
   matchSafe: "rw",
 },
 "Wharf Map": {
   name: "Wharf Map",
   isUnique: false,
   matchSafe: "arf",
 },
 "Acton's Nightmare": {
   name: "Acton's Nightmare",
   isUnique: true,
   matchSafe: "on'",
 },
 "Caer Blaidd, Wolfpack's Den": {
   name: "Caer Blaidd, Wolfpack's Den",
   isUnique: true,
   matchSafe: "d,",
 },
 "Death and Taxes": {
   name: "Death and Taxes",
   isUnique: true,
   matchSafe: "tax",
 },
 "Doryani's Machinarium": {
   name: "Doryani's Machinarium",
   isUnique: true,
   matchSafe: "i'",
 },
 "Hallowed Ground": {
   name: "Hallowed Ground",
   isUnique: true,
   matchSafe: "hal",
 },
 "Maelström of Chaos": {
   name: "Maelström of Chaos",
   isUnique: true,
   matchSafe: "ö",
 },
 "Mao Kun": {
   name: "Mao Kun",
   isUnique: true,
   matchSafe: "ku",
 },
 "Pillars of Arun": {
   name: "Pillars of Arun",
   isUnique: true,
   matchSafe: "pil",
 },
 "Poorjoy's Asylum": {
   name: "Poorjoy's Asylum",
   isUnique: true,
   matchSafe: "rj",
 },
 "The Coward's Trial": {
   name: "The Coward's Trial",
   isUnique: true,
   matchSafe: "cow",
 },
 "The Putrid Cloister": {
   name: "The Putrid Cloister",
   isUnique: true,
   matchSafe: "loi",
 },
 "The Tower of Ordeals": {
   name: "The Tower of Ordeals",
   isUnique: true,
   matchSafe: "orde",
 },
 "The Twilight Temple": {
   name: "The Twilight Temple",
   isUnique: true,
   matchSafe: "wil",
 },
 "The Vinktar Square": {
   name: "The Vinktar Square",
   isUnique: true,
   matchSafe: "kt",
 },
 "Whakawairua Tuahu": {
   name: "Whakawairua Tuahu",
   isUnique: true,
   matchSafe: "ka",
 },
};