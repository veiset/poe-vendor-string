export interface DivinationCard {
  name: string;
  regex: string;
  description: string;
  flavourText: string;
}

export const divinationCards: { [key: string]: DivinationCard } = {
  "A Chilling Wind": {
    "name": "A Chilling Wind",
    "regex": "slo",
    "description": "Level 21 Vaal Cold Snap Quality: +20% Corrupted",
    "flavourText": "All things slow under winter's onslaught - even life itself."
  },
  "A Dab of Ink": {
    "name": "A Dab of Ink",
    "regex": "dab",
    "description": "The Poet's Pen",
    "flavourText": "The Poet's blood is the Empire's ink."
  },
  "A Dusty Memory": {
    "name": "A Dusty Memory",
    "regex": "a du",
    "description": "Item Item Level: 100 Fractured",
    "flavourText": "In the oldest halls of my mind, at the end of a rarely used passage, lies my greatest treasure: one moment of happiness and innocence, pure and untouchable."
  },
  "A Familiar Call": {
    "name": "A Familiar Call",
    "regex": "ilia",
    "description": "Jewellery of Farrul Item Level: 100 Shaper + Hunter Item",
    "flavourText": "The mighty huntress always called for her share, But what we shared was a lifelong bond."
  },
  "A Fate Worse Than Death": {
    "name": "A Fate Worse Than Death",
    "regex": "an d",
    "description": "Cortex Corrupted",
    "flavourText": "\"It was as though my very thoughts were breaking... fracturing into tiny motes to be lost on the wind.\""
  },
  "A Modest Request": {
    "name": "A Modest Request",
    "regex": "tui",
    "description": "Megalomaniac Corrupted",
    "flavourText": "Cede all power and wealth to me and serve me in perpetuity. A minor inconvenience I assure you."
  },
  "A Mother's Parting Gift": {
    "name": "A Mother's Parting Gift",
    "regex": "rtin",
    "description": "Fertile Mind Corrupted",
    "flavourText": "Nature was her domain, Love was her song, Family was her devotion, Knowledge was her gift."
  },
  "A Note in the Wind": {
    "name": "A Note in the Wind",
    "regex": "lyr",
    "description": "Asenath's Mark",
    "flavourText": "The artist is long dead, the lyrics are long forgotten, yet the Song of War longs to be sung again"
  },
  "A Sea of Blue": {
    "name": "A Sea of Blue",
    "regex": "ea o",
    "description": "13x Orb of Alteration",
    "flavourText": "The harvest ended, the floods began."
  },
  "A Stone Perfected": {
    "name": "A Stone Perfected",
    "regex": "ey g",
    "description": "Jewel Primordial 1-2 Implicit Corrupted",
    "flavourText": "They gave the stone life. Over eons spent bathed in Corruption, that life evolved."
  },
  "Abandoned Wealth": {
    "name": "Abandoned Wealth",
    "regex": "aba",
    "description": "3x Exalted Orb",
    "flavourText": "When the world burned, the greedy burned with it, while the clever left as paupers."
  },
  "Acclimatisation": {
    "name": "Acclimatisation",
    "regex": "ccl",
    "description": "20x Orb of Alteration",
    "flavourText": "The world is ever-changing. Once-lush woods now lost beneath shifting sands, Great cities now drown beneath turbulent waters. Adapt or perish."
  },
  "Akil's Prophecy": {
    "name": "Akil's Prophecy",
    "regex": "il'",
    "description": "Elegant Round Shield Two-Implicit Corrupted",
    "flavourText": "The hatungo know many answers to the same question, for time itself is a tangled web."
  },
  "Alivia's Grace": {
    "name": "Alivia's Grace",
    "regex": "ivia",
    "description": "Queen of the Forest",
    "flavourText": "Her innocence and grace were enough to tame even the wildest of beasts."
  },
  "Alluring Bounty": {
    "name": "Alluring Bounty",
    "regex": "h k",
    "description": "10x Exalted Orb",
    "flavourText": "A treasure worth killing for is a treasure worth dying for."
  },
  "Alone in the Darkness": {
    "name": "Alone in the Darkness",
    "regex": "ryl",
    "description": "Delve Item",
    "flavourText": "\"Sometimes, the most beautiful treasures...are the ones you cannot have.\" - Beryl, Survivor from the Azurite Mines"
  },
  "Altered Perception": {
    "name": "Altered Perception",
    "regex": "stn",
    "description": "Simulacrum",
    "flavourText": "You mustn't forget: you won't be leaving this place."
  },
  "Ambitious Obsession": {
    "name": "Ambitious Obsession",
    "regex": "us o",
    "description": "Skittering Delirium Orb",
    "flavourText": "The most pathetic person in the world is someone who has sight, but no vision."
  },
  "Anarchy's Price": {
    "name": "Anarchy's Price",
    "regex": "ana",
    "description": "Voltaxic Rift Corrupted",
    "flavourText": "Born of relentless fury and abhorrence, warped by turmoil and anguish, tainted through desire and carnality, I thirst for bloodshed once more."
  },
  "Apocalypse": {
    "name": "Apocalypse",
    "regex": "poc",
    "description": "Eyes of the Greatwolf Item Level: 82 Corrupted",
    "flavourText": "The Ezomytes, buried beneath flaming mountains by the First Ones. The Vaal, undone by a cataclysm of their own making. Are all empires fated to fall to hubris?"
  },
  "Arrogance of the Vaal": {
    "name": "Arrogance of the Vaal",
    "regex": "oga",
    "description": "Item Two-Implicit Corrupted",
    "flavourText": "Discovery can lead to beauty, or it can lead to ruin."
  },
  "Assassin's Favour": {
    "name": "Assassin's Favour",
    "regex": "ir e",
    "description": "Dagger",
    "flavourText": "By the time their eyes meet, the dark deal has long since been made, and his fate long since sealed."
  },
  "Assassin's Gift": {
    "name": "Assassin's Gift",
    "regex": "gev",
    "description": "Divinarius Two-Implicit Corrupted",
    "flavourText": "What matters are the Marks of your life, not its Longevity."
  },
  "Astral Protection": {
    "name": "Astral Protection",
    "regex": "n el",
    "description": "Shield Shaper Item",
    "flavourText": "For a time, we had something stronger than eldritch evil. We had each other."
  },
  "Atziri's Arsenal": {
    "name": "Atziri's Arsenal",
    "regex": "arse",
    "description": "Weapon Corrupted",
    "flavourText": "In the prison of all sins, will you grasp godhood or sorrow? Only hope lies under the shadows."
  },
  "Audacity": {
    "name": "Audacity",
    "regex": "uda",
    "description": "Doryani's Fist Corrupted",
    "flavourText": "A jolt, and it moves. Or smolders. A current, and it lives. Or dies. A surge, and it transcends. Or... not. Only one way to find out."
  },
  "Auspicious Ambitions": {
    "name": "Auspicious Ambitions",
    "regex": "usp",
    "description": "Experimented Item Item Level: 100 Double-Influenced Item",
    "flavourText": "\"Gaze upon the mirrors of what may come and step backward into infinity.\" - Dexion, Thaumetic Aspirant"
  },
  "Avian Pursuit": {
    "name": "Avian Pursuit",
    "regex": "wn'",
    "description": "1,500x Vivid Crystallised Lifeforce",
    "flavourText": "Blazing through the night Longing for infinite flight Awaiting dawn's first light"
  },
  "Azure Rage": {
    "name": "Azure Rage",
    "regex": "lso",
    "description": "Punishing Map Map Tier: 16",
    "flavourText": "The mask hides his identity but also makes it hard to read..."
  },
  "Azyran's Reward": {
    "name": "Azyran's Reward",
    "regex": "zyr",
    "description": "Prismatic Jewel Corrupted",
    "flavourText": "Method transcends shape and size. Do something in parallel long enough, and you will always find another way."
  },
  "Baited Expectations": {
    "name": "Baited Expectations",
    "regex": "bai",
    "description": "Fishing Item",
    "flavourText": "The line between having not enough to do and too much to do is unusually fine."
  },
  "Beauty Through Death": {
    "name": "Beauty Through Death",
    "regex": "ty d",
    "description": "Atziri's Reflection",
    "flavourText": "Her beauty did not fade her humanity did not survive."
  },
  "Bijoux": {
    "name": "Bijoux",
    "regex": "bij",
    "description": "Cluster Jewel Item Level: 84",
    "flavourText": "\"Such fine trinkets show their true value in times of crisis.\" - Tangmazu"
  },
  "Blind Venture": {
    "name": "Blind Venture",
    "regex": "kla",
    "description": "Ring Corrupted",
    "flavourText": "\"It's risky not knowing where your wares come from. That's why I source my own.\" - Klayver, the Antiquarian"
  },
  "Boon of Justice": {
    "name": "Boon of Justice",
    "regex": "f j",
    "description": "Offering to the Goddess",
    "flavourText": "Some gifts are obligations while others are simply opportunities."
  },
  "Boon of the First Ones": {
    "name": "Boon of the First Ones",
    "regex": "wreat",
    "description": "Bestiary Item",
    "flavourText": "Wreathed in the skin and bones of the beasts she slew, her gift came from what she lost: her humanity."
  },
  "Bound by Flame": {
    "name": "Bound by Flame",
    "regex": "we b",
    "description": "Level 21 Flame Link Quality: +20%",
    "flavourText": "In battle we burn together or not at all."
  },
  "Boundless Realms": {
    "name": "Boundless Realms",
    "regex": "undl",
    "description": "Map",
    "flavourText": "Boundless is the distance between where we start and where we start again."
  },
  "Bowyer's Dream": {
    "name": "Bowyer's Dream",
    "regex": "owy",
    "description": "Six-Link Harbinger Bow Item Level: 91",
    "flavourText": "If this is my dream, I don't wish to wake."
  },
  "Broken Truce": {
    "name": "Broken Truce",
    "regex": "uce",
    "description": "Cold Iron Point",
    "flavourText": "With a single act, years of peace have been shattered. An unknown assassin brings war upon us all."
  },
  "Brother's Gift": {
    "name": "Brother's Gift",
    "regex": "gh hi",
    "description": "5x Divine Orb",
    "flavourText": "Even though his flame has burned out, he will never fade away."
  },
  "Brother's Stash": {
    "name": "Brother's Stash",
    "regex": "stas",
    "description": "5x Exalted Orb",
    "flavourText": "Even though he found the stash just in time, He would trade it all away and then some to have him back."
  },
  "Brotherhood in Exile": {
    "name": "Brotherhood in Exile",
    "regex": "rmt",
    "description": "One With Nothing Corrupted",
    "flavourText": "Seeking shelter from the night, in the warmth of the run-down inn, erstwhile foes put aside the fight, to bond over whiskey and gin."
  },
  "Brush, Paint and Palette": {
    "name": "Brush, Paint and Palette",
    "regex": "inq",
    "description": "The Artist",
    "flavourText": "\"Man may shape the world, but these? These shape the man.\" -Inquisitor Maligaro"
  },
  "Buried Treasure": {
    "name": "Buried Treasure",
    "regex": "dir",
    "description": "Sulphite Scarab",
    "flavourText": "You can't seek riches without getting your hands dirty."
  },
  "Burning Blood": {
    "name": "Burning Blood",
    "regex": "urni",
    "description": "Xoph's Blood Corrupted",
    "flavourText": "There's a place where up is down, where right is wrong, where pleasure is agony, and where the living wish only for death."
  },
  "Call to the First Ones": {
    "name": "Call to the First Ones",
    "regex": "cried",
    "description": "Talisman",
    "flavourText": "The Ezomyte, desperate for aid, cried out to the gods."
  },
  "Cameria's Cut": {
    "name": "Cameria's Cut",
    "regex": "dbl",
    "description": "Scarab",
    "flavourText": "\"There are two ways to pay, Gold and Blood. I'll take my share in both.\" -Cameria the Coldblooded"
  },
  "Cartographer's Delight": {
    "name": "Cartographer's Delight",
    "regex": "simi",
    "description": "Map Map Tier: 5",
    "flavourText": "A map is similar to a pair of eyes, without one you stumble around, unable to find your way."
  },
  "Chaotic Disposition": {
    "name": "Chaotic Disposition",
    "regex": "aot",
    "description": "5x Chaos Orb",
    "flavourText": "Life isn't what you make of it, it's already been made for you."
  },
  "Chasing Risk": {
    "name": "Chasing Risk",
    "regex": "fon",
    "description": "Synthesis Item",
    "flavourText": "A fond memory fills me with nostalgia; some men would have felt guilt, but I felt no regret over the anguish and fear my ambitions caused."
  },
  "Checkmate": {
    "name": "Checkmate",
    "regex": "ckm",
    "description": "76x Simulacrum Splinter",
    "flavourText": "When victory is impossible, each of us plays only to delay the end."
  },
  "Choking Guilt": {
    "name": "Choking Guilt",
    "regex": "hok",
    "description": "Stranglegasp",
    "flavourText": "As death approached, clarity eluded him. The pain he had wrought surrounded him, dragging him into darkness."
  },
  "Costly Curio": {
    "name": "Costly Curio",
    "regex": "ffo",
    "description": "Item Double-Influenced Item",
    "flavourText": "\"Oh no, I couldn't possibly afford this fine artefact. I'm... just looking.\""
  },
  "Council of Cats": {
    "name": "Council of Cats",
    "regex": "tfa",
    "description": "Farrul Item",
    "flavourText": "A King Loved By All, A Shadow Awaiting Nightfall, A Speaker Howling Away, A Hunter Seeking Prey"
  },
  "Coveted Possession": {
    "name": "Coveted Possession",
    "regex": "vet",
    "description": "5x Regal Orb",
    "flavourText": "A taste of power brings a hunger for more."
  },
  "Cursed Words": {
    "name": "Cursed Words",
    "regex": "u lo",
    "description": "Maw of Mischief",
    "flavourText": "If you look hard enough for hidden meaning, you will find it."
  },
  "Damnation": {
    "name": "Damnation",
    "regex": "mnat",
    "description": "The Original Scripture Item Level: 83",
    "flavourText": "Blood and death lead the way to hell."
  },
  "Dark Dreams": {
    "name": "Dark Dreams",
    "regex": "o on",
    "description": "Bone Helmet Elder Item",
    "flavourText": "No one ever truly understood what she meant when she said she wanted to raise a family."
  },
  "Dark Temptation": {
    "name": "Dark Temptation",
    "regex": "cts",
    "description": "Obliteration",
    "flavourText": "\"Only a fool looks to the occult for power and expects to be spared from its wrath.\" - Voll, Emperor of Purity"
  },
  "Darker Half": {
    "name": "Darker Half",
    "regex": "rker",
    "description": "5x Eldritch Chaos Orb",
    "flavourText": "When you find what you're looking for, it's never quite right. When you have what you desire, yet you still want more."
  },
  "Deadly Joy": {
    "name": "Deadly Joy",
    "regex": "y jo",
    "description": "Torrent's Reclamation Two-Implicit Corrupted",
    "flavourText": "\"Be fast. That is all that matters.\" - Rita of the Asylum"
  },
  "Death": {
    "name": "Death",
    "regex": "a u",
    "description": "Mon'tregul's Grasp",
    "flavourText": "The end of the old, the beginning of the new. A unique opportunity for transformation, for those with the power to grasp it."
  },
  "Deathly Designs": {
    "name": "Deathly Designs",
    "regex": "hly",
    "description": "Level 21 Trap Gem Quality: +23% Corrupted",
    "flavourText": "\"The Karui was correct; there is virtue in honouring my ancestors.\""
  },
  "Dementophobia": {
    "name": "Dementophobia",
    "regex": "bys",
    "description": "10x Delirium Orb",
    "flavourText": "I never truly understood the depths of my insanity, until I realized the voices beckoning me towards the abyss, were none other than my own."
  },
  "Demigod's Wager": {
    "name": "Demigod's Wager",
    "regex": "od'",
    "description": "Orb of Annulment",
    "flavourText": "Sometimes you need to make your own luck."
  },
  "Desecrated Virtue": {
    "name": "Desecrated Virtue",
    "regex": "awo",
    "description": "Level 4 Exceptional Support Gem Quality: +23% Corrupted",
    "flavourText": "Awoken virtuous slivers of the void, defiled by the avaricious, seized by the tyrannical."
  },
  "Desperate Crusade": {
    "name": "Desperate Crusade",
    "regex": "espo",
    "description": "Prism Guardian",
    "flavourText": "Through despondent hardships, those strong of spirit shall claim the prize."
  },
  "Destined to Crumble": {
    "name": "Destined to Crumble",
    "regex": "ios",
    "description": "Body Armour Item Level: 100",
    "flavourText": "\"Let us not forget the most important lesson the Vaal taught us: Nothing is eternal.\" - Siosa Foaga, Imperial Scholar"
  },
  "Dialla's Subjugation": {
    "name": "Dialla's Subjugation",
    "regex": "la'",
    "description": "Support Gem Quality: +23% Corrupted",
    "flavourText": "A symbol of beauty and innocence The gems corrupted her mind Malachai corrupted her gems All but a glimmer of greatness lost in madness"
  },
  "Disdain": {
    "name": "Disdain",
    "regex": "sda",
    "description": "Delirium Orb",
    "flavourText": "No man sees all, but you'll see more than some see in a lifetime."
  },
  "Divine Beauty": {
    "name": "Divine Beauty",
    "regex": "npa",
    "description": "7x Divine Orb",
    "flavourText": "In a land far away lived a maiden most fair. Her smile melted the coldest of hearts, her song made men and beast cry, her beauty unparalleled; Divine."
  },
  "Divine Justice": {
    "name": "Divine Justice",
    "regex": "ss'",
    "description": "Grand Spectrum Corrupted",
    "flavourText": "Many sought the Goddess' blessing. Few survived the Labyrinth to receive it."
  },
  "Divine Shard": {
    "name": "Divine Shard",
    "regex": "l wo",
    "description": "Divine Vessel",
    "flavourText": "Sin sought to contain Divinity so that no mortal would gain such monstrous power ever again."
  },
  "Doedre's Madness": {
    "name": "Doedre's Madness",
    "regex": "oed",
    "description": "Doedre Item",
    "flavourText": "\"Hold your tongue before I claim it.\" - Doedre Darktongue"
  },
  "Doryani's Epiphany": {
    "name": "Doryani's Epiphany",
    "regex": "pip",
    "description": "Level 21 Transfigured Gem Quality: +20% Corrupted",
    "flavourText": "\"Virtue gems have facets beyond those that can be seen by the mortal eye. Let us look deeper...\""
  },
  "Draped in Dreams": {
    "name": "Draped in Dreams",
    "regex": "avy",
    "description": "Six-Link Astral Plate Item Level: 100 Influenced Item",
    "flavourText": "The suit I wear, Is heavy and bare. A canvas, it seems, breathing life into dreams."
  },
  "Duality": {
    "name": "Duality",
    "regex": "dua",
    "description": "Body Armour Item Level: 100 Double-Influenced Item",
    "flavourText": "Good and Evil can be woven together to become something greater than either."
  },
  "Dying Anguish": {
    "name": "Dying Anguish",
    "regex": "bun",
    "description": "Level 19 Transfigured Gem Quality: +19%",
    "flavourText": "Moribund, he gazed upon the journey taken as blood trickled down his chin. His eye closed on the city ahead that he would never call home."
  },
  "Dying Light": {
    "name": "Dying Light",
    "regex": "brig",
    "description": "Diamond Ring Item Level: 100 Shaper + Elder Item",
    "flavourText": "Even the brightest eventually fade to darkness."
  },
  "Earth Drinker": {
    "name": "Earth Drinker",
    "regex": "h dr",
    "description": "Granite Flask",
    "flavourText": "Taste and grow strong. Drink too much and be buried."
  },
  "Echoes of Love": {
    "name": "Echoes of Love",
    "regex": "choe",
    "description": "Fidelitas' Spike Two-Implicit Corrupted",
    "flavourText": "\"I gave up my body for you. I gave up my name for you. And one day I shall give up my life for you.\""
  },
  "Eldritch Perfection": {
    "name": "Eldritch Perfection",
    "regex": "tch p",
    "description": "Item Item Level: 100 Perfect Eldritch Implicit Modifier",
    "flavourText": "Embrace horror. Bathe in its beauty."
  },
  "Emperor of Purity": {
    "name": "Emperor of Purity",
    "regex": "ewl",
    "description": "Six-Link Holy Chainmail Item Level: 60",
    "flavourText": "True to his title, Voll, newly crowned, had many of the Eternal Empire's signature extravagances destroyed."
  },
  "Emperor's Luck": {
    "name": "Emperor's Luck",
    "regex": "'s lu",
    "description": "5x Currency",
    "flavourText": "The house always wins."
  },
  "Endless Night": {
    "name": "Endless Night",
    "regex": "rms",
    "description": "Maloney's Mechanism",
    "flavourText": "The sun shines not for me. I walk in darkness, never free. Time stopped when you both died in my arms."
  },
  "Energy Sword": {
    "name": "Energy Sword",
    "regex": "ffi",
    "description": "Ephemeral Edge",
    "flavourText": "To my number one fan. - Griffin, with love"
  },
  "Etched in Blood": {
    "name": "Etched in Blood",
    "regex": "o wr",
    "description": "Rigwald's Quills Two-Implicit Corrupted",
    "flavourText": "When you strive to write your name on the dense pages of History, someone else, inevitably, must be crossed out."
  },
  "Eternal Bonds": {
    "name": "Eternal Bonds",
    "regex": "onds",
    "description": "Replica Cortex",
    "flavourText": "Separate, stories untold. Together, memories unfold."
  },
  "Ever-Changing": {
    "name": "Ever-Changing",
    "regex": "fenc",
    "description": "10x Orb of Unmaking",
    "flavourText": "The Atlas is our prison, and our only defence. She is our only hope, and our certain doom."
  },
  "Fateful Meeting": {
    "name": "Fateful Meeting",
    "regex": "o z",
    "description": "League-Specific Item Double-Influenced Item Item Level: 97 Two-Implicit Corrupted",
    "flavourText": "Some people act as beacons, illuminating the path for others. I was lucky to meet one such person. - Anton to Zhenya"
  },
  "Father's Love": {
    "name": "Father's Love",
    "regex": "ather'",
    "description": "Sublime Vision",
    "flavourText": "Everything is not enough."
  },
  "Fire Of Unknown Origin": {
    "name": "Fire Of Unknown Origin",
    "regex": "enz",
    "description": "Nimis",
    "flavourText": "Faith sparks the flame, a frenzy on the wind; a fervour that drives us wildly onward."
  },
  "Forbidden Power": {
    "name": "Forbidden Power",
    "regex": "en p",
    "description": "Balefire Corrupted",
    "flavourText": "Some things should not be used. Some power is too great a risk."
  },
  "Friendship": {
    "name": "Friendship",
    "regex": "rumi",
    "description": "Aul's Uprising",
    "flavourText": "\"Set your life on fire. Seek those who fan your flames\" -Rumi of the Vaal"
  },
  "From Bone to Ashes": {
    "name": "From Bone to Ashes",
    "regex": "ooz",
    "description": "Ngamahu's Flame Two-Implicit Corrupted",
    "flavourText": "For centuries, they stood vigil in secret over their sleeping goddess, even as contamination oozed out of the decadent Vaal empire."
  },
  "Further Invention": {
    "name": "Further Invention",
    "regex": "furt",
    "description": "Helmet Double-Influenced Item Item Level: 100",
    "flavourText": "Why not both?"
  },
  "Gemcutter's Mercy": {
    "name": "Gemcutter's Mercy",
    "regex": "rcy",
    "description": "Empower, Enhance or Enlighten",
    "flavourText": "When you can only have one, which shall it be? Red? Blue? Probably Green."
  },
  "Gemcutter's Promise": {
    "name": "Gemcutter's Promise",
    "regex": "asm",
    "description": "Gem Quality: +20%",
    "flavourText": "\"I swore to use my position to help the people. What good is power when it just accumulates on the already-powerful?\" - Erasmus, Imperial Gemcutter"
  },
  "Gift of Asenath": {
    "name": "Gift of Asenath",
    "regex": "ma'",
    "description": "Asenath's Gentle Touch Two-Implicit Corrupted",
    "flavourText": "The Golden Sekhema's words could solve many a feud. Just what form that solution took was another matter."
  },
  "Gift of the Gemling Queen": {
    "name": "Gift of the Gemling Queen",
    "regex": "g q",
    "description": "Level 20 Support Gem",
    "flavourText": "Our Lady Dialla, as a symbol of our progress, shines greater than all the gems."
  },
  "Glimmer of Hope": {
    "name": "Glimmer of Hope",
    "regex": "dwe",
    "description": "Gold Ring",
    "flavourText": "When you dwell in total darkness, even the faintest light may guide you out."
  },
  "Grave Knowledge": {
    "name": "Grave Knowledge",
    "regex": "y'v",
    "description": "Summon Raging Spirit Quality: +20%",
    "flavourText": "The dead tell me great insights. They've had nothing but time to sit and think."
  },
  "Guardian's Challenge": {
    "name": "Guardian's Challenge",
    "regex": "cid",
    "description": "Shaper Guardian Map",
    "flavourText": "To accept a challenge from the void is merely suicide for the unprepared."
  },
  "Harmony of Souls": {
    "name": "Harmony of Souls",
    "regex": "hri",
    "description": "9x Shrieking Essence",
    "flavourText": "Shrieking souls locked away Hate splits frozen cells asunder The knot of corruption undone at last"
  },
  "Haunting Shadows": {
    "name": "Haunting Shadows",
    "regex": "haun",
    "description": "Metamorph Item",
    "flavourText": "In the dead of night you may elude your shadows, but they will always find you by dawn."
  },
  "Her Mask": {
    "name": "Her Mask",
    "regex": "ubm",
    "description": "Sacrifice Fragment",
    "flavourText": "To her beauty you submit, lest your neck the great Queen slit."
  },
  "Heterochromia": {
    "name": "Heterochromia",
    "regex": "mia",
    "description": "Two-Stone Ring",
    "flavourText": "Black and White, Silver and Gold Let us see the world Unfold Red and Blue, Yellow and Green Let us remake it in colours Unseen"
  },
  "History": {
    "name": "History",
    "regex": "oret",
    "description": "2x Hinekora's Lock",
    "flavourText": "The future is oft-foretold in records of the past."
  },
  "Home": {
    "name": "Home",
    "regex": "ss st",
    "description": "Exceptional Support Gem Quality: +1-20%",
    "flavourText": "There are countless people, countless stories, and countless eras, but there is one place that, for a time, each of us loved and was loved. It matters. We matter."
  },
  "Hope": {
    "name": "Hope",
    "regex": "bed",
    "description": "Prismatic Ring Corrupted",
    "flavourText": "The others succumbed to madness and depravity, but Lori fought on. Alone in the darkness, she could still see the dull light of hope's distant dawn."
  },
  "House of Mirrors": {
    "name": "House of Mirrors",
    "regex": "t do y",
    "description": "Mirror of Kalandra",
    "flavourText": "What do you see in the mirror?"
  },
  "Hubris": {
    "name": "Hubris",
    "regex": "pry",
    "description": "Ring",
    "flavourText": "\"This one? It is NOT for sale. You would sooner pry it from my lifeless hand.\" - Jonfé Darontos, Ringmaker"
  },
  "Humility": {
    "name": "Humility",
    "regex": "humi",
    "description": "Tabula Rasa",
    "flavourText": ""
  },
  "Hunter's Resolve": {
    "name": "Hunter's Resolve",
    "regex": "usn",
    "description": "Bow",
    "flavourText": "Primed, curved and sleek. Decisive and final. For malice and righteousness. There's but one solution."
  },
  "Hunter's Reward": {
    "name": "Hunter's Reward",
    "regex": "ubd",
    "description": "The Taming",
    "flavourText": "To tame a beast, you first must subdue its heart."
  },
  "I See Brothers": {
    "name": "I See Brothers",
    "regex": "ee b",
    "description": "2x Fracturing Orb",
    "flavourText": "\"Where does the light go when it is dark?\""
  },
  "Immortal Resolve": {
    "name": "Immortal Resolve",
    "regex": "tal r",
    "description": "Six-Linked Body Armour Influenced Item",
    "flavourText": "The threads of fate are the strongest ties."
  },
  "Imperfect Memories": {
    "name": "Imperfect Memories",
    "regex": "ct m",
    "description": "Astrolabe",
    "flavourText": "Everything is eroded by time, but sometimes the edges that fade can make a wonderful memory even more beautiful."
  },
  "Imperial Legacy": {
    "name": "Imperial Legacy",
    "regex": "l le",
    "description": "Six-Link Imperial Bow Item Level: 100",
    "flavourText": "A life lost, A legacy born."
  },
  "Jack in the Box": {
    "name": "Jack in the Box",
    "regex": "cran",
    "description": "Item",
    "flavourText": "Turn the crank, close your eyes, and pray to the gods for a pleasant surprise."
  },
  "Judging Voices": {
    "name": "Judging Voices",
    "regex": "udg",
    "description": "Forbidden Shako",
    "flavourText": "He was seeking sanity, but the demons were inside his head."
  },
  "Justified Ambition": {
    "name": "Justified Ambition",
    "regex": "ve d",
    "description": "Synthesis Map",
    "flavourText": "\"Everything I have done has been for Wraeclast. You would pledge your life to me if you saw things my way... and soon, you will.\" - High Templar Venarius"
  },
  "Keeper's Corruption": {
    "name": "Keeper's Corruption",
    "regex": "per'",
    "description": "Eldritch Bone Helmet (Concentrated Effect) Item Level: 89 Elder Item",
    "flavourText": "With great power comes... ...Even greater power."
  },
  "Lachrymal Necrosis": {
    "name": "Lachrymal Necrosis",
    "regex": "hry",
    "description": "Jewel Implicit Modifier: Corrupted Blood cannot be inflicted on you Corrupted",
    "flavourText": "Without the ability to weep, the heart hardens against both the pure and the corrupt."
  },
  "Lantador's Lost Love": {
    "name": "Lantador's Lost Love",
    "regex": "tad",
    "description": "Two-Stone Ring",
    "flavourText": "They fought the storm together as one, Until the longest of days was done. Their love grew stronger with every breath, Until it was broken apart in death."
  },
  "Last Hope": {
    "name": "Last Hope",
    "regex": "r ci",
    "description": "Mortal Hope",
    "flavourText": "As their civilisation crumbled, the Vaal looked to their queen. In her, they saw a way out. In them, she saw a burden she was happy to free herself from."
  },
  "Last Stand": {
    "name": "Last Stand",
    "regex": "urn w",
    "description": "The Surrender",
    "flavourText": "Return with your shield... or on it."
  },
  "Left to Fate": {
    "name": "Left to Fate",
    "regex": "roe",
    "description": "Map Map Tier: 16 Unidentified Corrupted",
    "flavourText": "Many strive for greatness, but it is challenge, unforeseen, that forges heroes."
  },
  "Lethean Temptation": {
    "name": "Lethean Temptation",
    "regex": "i e",
    "description": "Nebulis",
    "flavourText": "My memories tortured me without end. To escape them, I embraced nothingness, but oblivion simply brought a different kind of pain..."
  },
  "Light and Truth": {
    "name": "Light and Truth",
    "regex": "vai",
    "description": "Crystal Sceptre",
    "flavourText": "Time and change shall naught avail, To dim the Light of Truth's fair grail."
  },
  "Lingering Remnants": {
    "name": "Lingering Remnants",
    "regex": "emn",
    "description": "Vaal Temple Map Corrupted",
    "flavourText": "Never dying, yet not living, Endlessly they wander beneath the harvest moon."
  },
  "Lonely Warrior": {
    "name": "Lonely Warrior",
    "regex": "nel",
    "description": "Defiance of Destiny",
    "flavourText": "A true warrior fights for those who cannot fight for themselves."
  },
  "Lost Worlds": {
    "name": "Lost Worlds",
    "regex": "ie b",
    "description": "Map Map Tier: 15",
    "flavourText": "\"There are worlds that lie beyond the edge of my page, the edge of my understanding. Worlds of wonder. Worlds of terror.\" Aramil - Cartographer to Emperor Chitus"
  },
  "Love Through Ice": {
    "name": "Love Through Ice",
    "regex": "gh i",
    "description": "Unnatural Instinct Two-Implicit Corrupted",
    "flavourText": "\"I know one lady for whose sake I will rip out my heart\" - Derrok, the Dreamer"
  },
  "Loyalty": {
    "name": "Loyalty",
    "regex": "inse",
    "description": "3x Orb of Fusing",
    "flavourText": "Bound by fate, inseparable by choice."
  },
  "Lucky Bastion": {
    "name": "Lucky Bastion",
    "regex": "nbr",
    "description": "Svalinn",
    "flavourText": "Discipline forged our unbreakable Rampart. Bastion against Despair."
  },
  "Lucky Connections": {
    "name": "Lucky Connections",
    "regex": "ky c",
    "description": "20x Orb of Fusing",
    "flavourText": "Luck is a fool's game, and I know plenty of rich fools."
  },
  "Lucky Deck": {
    "name": "Lucky Deck",
    "regex": "utc",
    "description": "10x Stacked Deck",
    "flavourText": "When the outcome is the same, does it matter if it is fortune or trickery?"
  },
  "Luminous Trove": {
    "name": "Luminous Trove",
    "regex": "ch'",
    "description": "Voices Corrupted",
    "flavourText": "Plenty enter, dreaming of treasure Twenty bled, slain as they fled Shadows loom, half left doomed The blind cries, five lost eyes Careless twins, a lich's new prize One as a decoy, none pass the king Gehennix feeds only on whispers"
  },
  "Lysah's Respite": {
    "name": "Lysah's Respite",
    "regex": "ysa",
    "description": "Agate Amulet Corrupted",
    "flavourText": "So many memories, so much pain in such a small token. Drown it in blood so you can forget."
  },
  "Man With Bear": {
    "name": "Man With Bear",
    "regex": "reo",
    "description": "Bestiary Scarab",
    "flavourText": "A stereotypical joke may lead to an unexpected bond."
  },
  "Matryoshka": {
    "name": "Matryoshka",
    "regex": "atr",
    "description": "Item Vestigial Item Level: 86",
    "flavourText": "I cannot contain myself, but I can barely squeak, so many words I'd have for you, if I could only speak!"
  },
  "Mawr Blaidd": {
    "name": "Mawr Blaidd",
    "regex": "awr",
    "description": "Eyes of the Greatwolf",
    "flavourText": "Rigwald believed he'd seized great power, but it was the great power that had seized Rigwald"
  },
  "Merciless Armament": {
    "name": "Merciless Armament",
    "regex": "mam",
    "description": "Merciless Two-Hand Weapon Item Level: 100",
    "flavourText": "\"Through thick and thin, blood and bone, a peaceful life is one I can't condone.\" - Tukohama, Father Of War"
  },
  "Might is Right": {
    "name": "Might is Right",
    "regex": "d mu",
    "description": "Trypanon",
    "flavourText": "The mind had much to endure before the advent of thaumaturgy."
  },
  "Misery in Darkness": {
    "name": "Misery in Darkness",
    "regex": "opi",
    "description": "Shroud of the Lightless",
    "flavourText": "He wandered the bone-filled depths hoping each corner would be his last. Eventually, he found Light."
  },
  "Mitts": {
    "name": "Mitts",
    "regex": "lih",
    "description": "Gloves",
    "flavourText": "Those whose hands are their livelihood know the importance of keeping them safe and warm."
  },
  "Monochrome": {
    "name": "Monochrome",
    "regex": "rtr",
    "description": "Valdo's Puzzle Box",
    "flavourText": "\"You cannot portray the world using just one colour. Together, you and I, we will paint our world into perfection.\" - Kyra, renegade thaumaturgist"
  },
  "More is Never Enough": {
    "name": "More is Never Enough",
    "regex": "eed i",
    "description": "4x Scarab",
    "flavourText": "Greed is a hunger that only grows as you feed it"
  },
  "No Traces": {
    "name": "No Traces",
    "regex": "o mi",
    "description": "30x Orb of Scouring",
    "flavourText": "There is no mistake so great that it cannot be undone."
  },
  "Nook's Crown": {
    "name": "Nook's Crown",
    "regex": "noo",
    "description": "Bone Helmet Item Level: 100 Elder Item",
    "flavourText": "Every skull was once a person. Though 'Who?' is rarely asked. Friends, who wear the crown of Nook, Never need to ask. They remember."
  },
  "One Last Score": {
    "name": "One Last Score",
    "regex": "w h",
    "description": "Experimented Jewellery Item Level: 86",
    "flavourText": "You want to know how I haven't been caught? It's not just speed. You need some luck."
  },
  "Outfoxed": {
    "name": "Outfoxed",
    "regex": "utf",
    "description": "Veiled Exalted Orb",
    "flavourText": "The prize vanished. No trail, no struggle. Just a single, rust-red hair."
  },
  "Peaceful Moments": {
    "name": "Peaceful Moments",
    "regex": "ey m",
    "description": "Timeless Jewel",
    "flavourText": "Savour these moments, for they may never return."
  },
  "Pearls Before Swine": {
    "name": "Pearls Before Swine",
    "regex": "rls",
    "description": "Progenesis",
    "flavourText": "The unknowledgable know not what treasures lie so closely within their feeble reach."
  },
  "Perfection": {
    "name": "Perfection",
    "regex": "mitl",
    "description": "Jewellery Item Level: 100 Shaper Item",
    "flavourText": "There are countless worlds, but only those with limitless potential will be able to achieve perfection."
  },
  "Poisoned Faith": {
    "name": "Poisoned Faith",
    "regex": "efs",
    "description": "Arakaali's Fang Corrupted",
    "flavourText": "Even our most devout beliefs are subtly shaped by our darkest desires."
  },
  "Prejudice": {
    "name": "Prejudice",
    "regex": "rej",
    "description": "Item Influenced Item",
    "flavourText": "One who is blinded by their past may only see a sliver of the present."
  },
  "Pride Before the Fall": {
    "name": "Pride Before the Fall",
    "regex": "as k",
    "description": "Kaom's Heart Corrupted",
    "flavourText": "As Kaom slew the last of his kin, something deep inside him broke. And through the cracks, corruption, pure and black, spread forth."
  },
  "Pride of the First Ones": {
    "name": "Pride of the First Ones",
    "regex": "paw",
    "description": "Farrul's Fur",
    "flavourText": "Upon silent paws and masked by the reeds, Farrul's hunt begins as the light recedes."
  },
  "Prometheus' Armoury": {
    "name": "Prometheus' Armoury",
    "regex": "' a",
    "description": "One-Hand Weapon Item Level: 100 Double-Influenced Item",
    "flavourText": "It is a mortal man's folly to seek power beyond his comprehension."
  },
  "Prosperity": {
    "name": "Prosperity",
    "regex": "h ha",
    "description": "Perandus' Gold Ring",
    "flavourText": "Accumulating wealth has its own costs."
  },
  "Rain of Chaos": {
    "name": "Rain of Chaos",
    "regex": "joz",
    "description": "Chaos Orb",
    "flavourText": "Fire filled the sky that night Chaos reigned Where the shards fell All was destroyed -Jozen Kasigi, retelling an urban legend of the Cataclysm"
  },
  "Rain Tempter": {
    "name": "Rain Tempter",
    "regex": "mpte",
    "description": "Map Map Tier: 6",
    "flavourText": "Be like water, friend."
  },
  "Rats": {
    "name": "Rats",
    "regex": "oev",
    "description": "Rat's Nest",
    "flavourText": "Whoever said 'more is always better' has obviously never met a rat."
  },
  "Rebirth": {
    "name": "Rebirth",
    "regex": "catt",
    "description": "Charan's Sword",
    "flavourText": "He shattered Her smile Scattered the fragments like ash All she did was laugh"
  },
  "Rebirth and Renewal": {
    "name": "Rebirth and Renewal",
    "regex": "enew",
    "description": "Horned Scarab",
    "flavourText": "Life has an end, then life begins again."
  },
  "Reckless Ambition": {
    "name": "Reckless Ambition",
    "regex": "reck",
    "description": "Omeyocan",
    "flavourText": "Why settle when more is never enough."
  },
  "Reflection of the Heart": {
    "name": "Reflection of the Heart",
    "regex": "l he",
    "description": "Kalandra's Touch",
    "flavourText": "He thought she was all he ever wanted, yet his heart yearned for something more."
  },
  "Remembrance": {
    "name": "Remembrance",
    "regex": "jul",
    "description": "Precursor's Emblem Corrupted",
    "flavourText": "\"For all your struggles, all your achievements, even for the greatest of us, a story is all that remains. Write it well.\" -Julius Perandus, Father of Chitus"
  },
  "Runic Luck": {
    "name": "Runic Luck",
    "regex": "c l",
    "description": "10x Vendor Refresh Currency",
    "flavourText": "If you believe hard enough, you'll win."
  },
  "Sambodhi's Vow": {
    "name": "Sambodhi's Vow",
    "regex": "pef",
    "description": "Mortal Fragment",
    "flavourText": "He dispels dark realms until mortal sufferings yield to hopeful light."
  },
  "Sambodhi's Wisdom": {
    "name": "Sambodhi's Wisdom",
    "regex": "unv",
    "description": "Tabula Rasa Two-Implicit Corrupted",
    "flavourText": "No blade conquers sin; guide a sinner to virtue, unveil their lost sight— your eyes, too, see in everyone the inner child, no matter their might."
  },
  "Scholar of the Seas": {
    "name": "Scholar of the Seas",
    "regex": "mma",
    "description": "Mao Kun",
    "flavourText": "I've never come upon a ship I could not command. I have however met sailors that were not willing to be led."
  },
  "Seven Years Bad Luck": {
    "name": "Seven Years Bad Luck",
    "regex": "bad",
    "description": "Mirror Shard",
    "flavourText": "If enough people believe something to be true, whether or not it is becomes irrelevant."
  },
  "Shard of Fate": {
    "name": "Shard of Fate",
    "regex": "ir w",
    "description": "Vivid Jewel",
    "flavourText": "Their whims left unknown, Their life left for others."
  },
  "Silence and Frost": {
    "name": "Silence and Frost",
    "regex": "fros",
    "description": "The Pandemonius",
    "flavourText": "Cry havoc! Unleash pandemonium!"
  },
  "Society's Remorse": {
    "name": "Society's Remorse",
    "regex": "soc",
    "description": "10x Orb of Alteration",
    "flavourText": "We live to dream of worlds we aren't in, a false narrative that we use to fill our souls with doubt; The world is already beautiful, there's no need to dream."
  },
  "Something Dark": {
    "name": "Something Dark",
    "regex": "ss y",
    "description": "Blueprint Area Level: 83 Fully Revealed",
    "flavourText": "Even in darkness you may find a friend."
  },
  "Squandered Prosperity": {
    "name": "Squandered Prosperity",
    "regex": "uan",
    "description": "The Light of Meaning Corrupted",
    "flavourText": "\"Our rulers are being ridiculous, and we are suffering.\""
  },
  "Struck by Lightning": {
    "name": "Struck by Lightning",
    "regex": "'li",
    "description": "Electrocuting Jewellery Item Level: 76",
    "flavourText": "'Lightning never strikes the same place twice' is really just wishful thinking."
  },
  "Succor of the Sinless": {
    "name": "Succor of the Sinless",
    "regex": "cco",
    "description": "Bottled Faith",
    "flavourText": "Blessed is the blood of the beholden disciple. The earth is anointed by his step. The damnable are sanctified by his strike."
  },
  "Temperance": {
    "name": "Temperance",
    "regex": "eks",
    "description": "Relic Item Level: 83",
    "flavourText": "Good things come to those who wait; but, greatness seeks those who do not come."
  },
  "Terrible Secret of Space": {
    "name": "Terrible Secret of Space",
    "regex": "spac",
    "description": "Level 21 Transfigured Golem Gem Quality: +23% Corrupted",
    "flavourText": "They said they were here to protect us."
  },
  "The Academic": {
    "name": "The Academic",
    "regex": "ny y",
    "description": "Inspired Learning",
    "flavourText": "\"Such dedication for so many years, all for a couple extra letters at the front of your name...\""
  },
  "The Admirer": {
    "name": "The Admirer",
    "regex": "adm",
    "description": "Atziri Item",
    "flavourText": "Lucian lost himself in ancient scrolls and found in those scrolls a love whose power bridged a millennium."
  },
  "The Adventuring Spirit": {
    "name": "The Adventuring Spirit",
    "regex": "dos",
    "description": "Victario's Influence",
    "flavourText": "Dost thou lead my men to victory, my child?"
  },
  "The Aesthete": {
    "name": "The Aesthete",
    "regex": "aes",
    "description": "Shavronne Item",
    "flavourText": "\"Some see our mortal flesh as a limitation. I see it as an opportunity for vast, miraculous improvements.\" - Shavronne of Umbra"
  },
  "The Apothecary": {
    "name": "The Apothecary",
    "regex": "e ap",
    "description": "Mageblood",
    "flavourText": "\"You seek the power of my strongest potions, but the price will be far higher than you can imagine.\""
  },
  "The Archmage's Right Hand": {
    "name": "The Archmage's Right Hand",
    "regex": "chm",
    "description": "Glyphic Prophecy Wand Item Level: 100",
    "flavourText": "\"When grasped in his hand, even an ordinary piece of wood can make the heavens tremble with fear.\""
  },
  "The Arena Champion": {
    "name": "The Arena Champion",
    "regex": "t'l",
    "description": "Map Map Tier: 12",
    "flavourText": "The fight is the easy part. It's the years of training that'll kill you."
  },
  "The Army of Blood": {
    "name": "The Army of Blood",
    "regex": "rmy",
    "description": "Bloodbond",
    "flavourText": "I gave my mind without a fight, The twelfth hour I lost control. The day is gone but there is light, eyes that glow like red-hot coal."
  },
  "The Artist": {
    "name": "The Artist",
    "regex": "ue a",
    "description": "Level 4 Enhance Corrupted",
    "flavourText": "\"Paint, metal, flesh... A true artist does not limit himself.\" - Malachai the Soulless"
  },
  "The Aspirant": {
    "name": "The Aspirant",
    "regex": "se e",
    "description": "Item Elevated Item Influenced Item",
    "flavourText": "Those Exiles that survive Wraeclast dream not of home, but of power."
  },
  "The Astromancer": {
    "name": "The Astromancer",
    "regex": "nbo",
    "description": "The Eternity Shroud Two-Implicit Corrupted",
    "flavourText": "They would say that he was a dangerous man, unbound by the sense of morality, but what does this matter, when his love for humanity is undeniable and completion of his work would benefit everyone?"
  },
  "The Avenger": {
    "name": "The Avenger",
    "regex": "wif",
    "description": "Mjölner Corrupted",
    "flavourText": "Justice comes swift Equal to the crime Revenge is a gift Life for a life Eye for an eye"
  },
  "The Awakened": {
    "name": "The Awakened",
    "regex": "he aw",
    "description": "Jewellery Item Level: 86 Double-Influenced Item",
    "flavourText": "Some seek to change the world. Others change the world as a consequence of what they seek."
  },
  "The Battle Born": {
    "name": "The Battle Born",
    "regex": "i v",
    "description": "Axe",
    "flavourText": "\"No man can best me, no demon can fell me. For I vanquish all with my axe!\""
  },
  "The Bear Woman": {
    "name": "The Bear Woman",
    "regex": "wom",
    "description": "Fecund Ursine Pelt Warlord Item",
    "flavourText": "For the blessed bear in the cave, A hundred days pass in silence and darkness, until moon begins its fourth passage, the bear sheds her beastly fur, and is reborn, human and whole."
  },
  "The Beast": {
    "name": "The Beast",
    "regex": "e mon",
    "description": "Belly of the Beast",
    "flavourText": "To know the monster, you must become the monster."
  },
  "The Betrayal": {
    "name": "The Betrayal",
    "regex": "aya",
    "description": "Maligaro's Virtuosity",
    "flavourText": "It's sad times we live in when a friendship has a price people are willing to pay."
  },
  "The Bitter Blossom": {
    "name": "The Bitter Blossom",
    "regex": "bitt",
    "description": "Level 21 Chaos Gem Quality: +23% Corrupted",
    "flavourText": "The pain you feel is of no consequence, it is evolution, to be made whole within something greater."
  },
  "The Blazing Fire": {
    "name": "The Blazing Fire",
    "regex": "afl",
    "description": "Chin Sol",
    "flavourText": "Lethal, untouchable, keen, aflame. Just what I was looking for."
  },
  "The Blessing of Moosh": {
    "name": "The Blessing of Moosh",
    "regex": "aps",
    "description": "Level 21 Transfigured Gem Corrupted",
    "flavourText": "While the Labyrinth traps have claimed countless adventurers, they were not designed with felines in mind."
  },
  "The Body": {
    "name": "The Body",
    "regex": "l mu",
    "description": "Body Armour",
    "flavourText": "They say it is the head that leads, but all must flow through the body at some point."
  },
  "The Bones": {
    "name": "The Bones",
    "regex": "esh i",
    "description": "Level 21 Vaal Summon Skeletons Corrupted",
    "flavourText": "The flesh is a prison, and we are finally free."
  },
  "The Brawny Battle Mage": {
    "name": "The Brawny Battle Mage",
    "regex": "wny",
    "description": "Merciless Tornado Wand Item Level: 100",
    "flavourText": "A humble piece of wood offers the simplest solution to life's problems: just hit them really, really hard."
  },
  "The Breach": {
    "name": "The Breach",
    "regex": "eeli",
    "description": "Breach Item",
    "flavourText": "Ever get the feeling you're being watched...?"
  },
  "The Brittle Emperor": {
    "name": "The Brittle Emperor",
    "regex": "nfe",
    "description": "Voll's Devotion Corrupted",
    "flavourText": "\"When Voll spared Malachai, accepting his aid in pursuit of Purity, the strongest faith was infected by Corruption and made brittle as glass.\" - Victario, the People's Poet"
  },
  "The Cache": {
    "name": "The Cache",
    "regex": "tag",
    "description": "Jewellery",
    "flavourText": "Vintage or crafted, Glittering and shiny Dusty or glittering, huge or tiny Secured within a chest or unearthed from your mining Find jewellery everywhere, no need for divining! So why is it so hard to figure out which one to wear? This one makes me stronger, but does it match my hair?"
  },
  "The Cacophony": {
    "name": "The Cacophony",
    "regex": "cop",
    "description": "3x Deafening Essence",
    "flavourText": "Nothing can be heard above the din or seen amongst the turmoil. The senses are shattered. All is left to fate."
  },
  "The Calling": {
    "name": "The Calling",
    "regex": "d fl",
    "description": "Beyond Item",
    "flavourText": "Blood flows not just through veins, but through worlds."
  },
  "The Card Sharp": {
    "name": "The Card Sharp",
    "regex": "rd s",
    "description": "Divination Scarab",
    "flavourText": "\"The house always wins... except when I do.\""
  },
  "The Carrion Crow": {
    "name": "The Carrion Crow",
    "regex": "rhe",
    "description": "Life Armour",
    "flavourText": "From death, life. From life, death. The wheel turns, and the corbies wheel overhead."
  },
  "The Cataclysm": {
    "name": "The Cataclysm",
    "regex": "iors",
    "description": "Level 21 Spell Gem Corrupted",
    "flavourText": "The mighty warriors traded in blows, the nimble archers in arrows, yet it was the brazen thaumaturgists who would bring catastrophe to all."
  },
  "The Catalyst": {
    "name": "The Catalyst",
    "regex": "n ea",
    "description": "Vaal Orb",
    "flavourText": "Simple actions can lead the world to an early grave."
  },
  "The Catch": {
    "name": "The Catch",
    "regex": "catc",
    "description": "Fishing Rod Item Level: 99",
    "flavourText": "The largest hooks offer the greatest catch, but often the catch is the hook."
  },
  "The Celestial Justicar": {
    "name": "The Celestial Justicar",
    "regex": "tica",
    "description": "Six-Link Astral Plate",
    "flavourText": "Wrapped in the glory of the heavens, she comes to mete out justice for the fallen."
  },
  "The Celestial Stone": {
    "name": "The Celestial Stone",
    "regex": "tare",
    "description": "Opal Ring Item Level: 100 Shaper Item",
    "flavourText": "Stare into its depths too long, and you may lose yourself entirely."
  },
  "The Chains that Bind": {
    "name": "The Chains that Bind",
    "regex": "cari",
    "description": "Six-Link Body Armour",
    "flavourText": "Scarier than any criminal is an innocent man in chains, for when he breaks free, his revenge will be justified."
  },
  "The Chosen": {
    "name": "The Chosen",
    "regex": "chos",
    "description": "Skin of the Lords Corrupted",
    "flavourText": "They whose lives were given to clothe the Dark Dreamer... They were the lucky ones."
  },
  "The Coming Storm": {
    "name": "The Coming Storm",
    "regex": "ttra",
    "description": "Lightning Coil",
    "flavourText": "No man may hope to turn back the storm. You can only hope you do not attract its ire."
  },
  "The Conduit": {
    "name": "The Conduit",
    "regex": "o go",
    "description": "Doryani's Fist",
    "flavourText": "The path to godhood is guided by the hand of sacrifice."
  },
  "The Craving": {
    "name": "The Craving",
    "regex": "crav",
    "description": "Unending Hunger",
    "flavourText": "What was once a passing thought tickling the back of the mind is now a desperate, driving desire."
  },
  "The Cursed King": {
    "name": "The Cursed King",
    "regex": "sph",
    "description": "Rigwald's Curse",
    "flavourText": "The First Ones may be blasphemy, but they are powerful blasphemy."
  },
  "The Damned": {
    "name": "The Damned",
    "regex": "om o",
    "description": "Soul Ripper",
    "flavourText": "Souls along a conduit of blood, from one vessel to the next."
  },
  "The Dapper Prodigy": {
    "name": "The Dapper Prodigy",
    "regex": "isl",
    "description": "Six-Link Body Armour Item Level: 100",
    "flavourText": "\"Many believe murder is a grisly, grim, and grotesque crime. Then there are those who simply make art of it.\""
  },
  "The Dark Mage": {
    "name": "The Dark Mage",
    "regex": "k m",
    "description": "Six-Link Staff Item Level: 55",
    "flavourText": "With staff in hand and wrath in heart, your soul and corpse shall surely part."
  },
  "The Darkest Dream": {
    "name": "The Darkest Dream",
    "regex": "ch y",
    "description": "Severed in Sleep Corrupted",
    "flavourText": "A dream from which you cannot awake is nothing other than a nightmare."
  },
  "The Deal": {
    "name": "The Deal",
    "regex": "goe",
    "description": "Cartography Scarab",
    "flavourText": "In the pursuit of wealth, as in that of power, anything goes."
  },
  "The Deceiver": {
    "name": "The Deceiver",
    "regex": "conf",
    "description": "Belt of the Deceiver Corrupted",
    "flavourText": "Beware the combatant who shows no confidence, yet still enters the ring, for they are surely hiding something."
  },
  "The Deep Ones": {
    "name": "The Deep Ones",
    "regex": "ep o",
    "description": "Tidebreaker",
    "flavourText": "\"The Seas Call, the Mad Answer\""
  },
  "The Demon": {
    "name": "The Demon",
    "regex": "rs v",
    "description": "Headhunter Two-Implicit Corrupted",
    "flavourText": "A man who hears voices may not necessarily be crazy."
  },
  "The Demoness": {
    "name": "The Demoness",
    "regex": "erev",
    "description": "Death's Hand",
    "flavourText": "Wherever she went, death was sure to follow."
  },
  "The Destination": {
    "name": "The Destination",
    "regex": "ryb",
    "description": "Watcher's Eye Two-Implicit Corrupted",
    "flavourText": "You may be nothing to everybody, but you are everything to somebody."
  },
  "The Doctor": {
    "name": "The Doctor",
    "regex": "xam",
    "description": "Headhunter",
    "flavourText": "\"They said I needed my head examined, but I'd rather just take yours.\" - Klopek the Cannibal"
  },
  "The Doppelganger": {
    "name": "The Doppelganger",
    "regex": "dop",
    "description": "Mirror Arrow Quality: +20%",
    "flavourText": "Upon seeing her face, I am terrified—the moon shows me my own form!"
  },
  "The Dragon": {
    "name": "The Dragon",
    "regex": "tchi",
    "description": "Coruscating Elixir",
    "flavourText": "Scaly beast of the skies, watching with his golden eyes. Shadow that blocks out the sun, it's too late for you to run."
  },
  "The Dragon's Heart": {
    "name": "The Dragon's Heart",
    "regex": "gon'",
    "description": "Level 4 Empower Corrupted",
    "flavourText": "They say when a dragon dies, the flesh smoulders and burns until all that remains is the still, white-hot, heart."
  },
  "The Dreamer": {
    "name": "The Dreamer",
    "regex": "k n",
    "description": "Chayula Item",
    "flavourText": "A dark note drips from the dreamer's lips, A honeyed melody. We stand, we fall on his beck and call, for in his dream we're free."
  },
  "The Dreamland": {
    "name": "The Dreamland",
    "regex": "aml",
    "description": "Poorjoy's Asylum",
    "flavourText": "All dreams vanish when the dreamers wake."
  },
  "The Drunken Aristocrat": {
    "name": "The Drunken Aristocrat",
    "regex": "dru",
    "description": "Divination Distillate",
    "flavourText": "The finer the brew, the harder it is to remember drinking it."
  },
  "The Dungeon Master": {
    "name": "The Dungeon Master",
    "regex": "dun",
    "description": "Belt Double-Influenced Item",
    "flavourText": "\"So desperate was I for control, I turned my entire world into a prison. Now you will share in my agony.\""
  },
  "The Easy Stroll": {
    "name": "The Easy Stroll",
    "regex": "goi",
    "description": "Map Map Tier: 15 Modifiers: 8 Corrupted",
    "flavourText": "\"I'm going for a walk. I'll be back soon.\" - Blonca's last words"
  },
  "The Eldritch Decay": {
    "name": "The Eldritch Decay",
    "regex": "dism",
    "description": "Uber Elder Fragment",
    "flavourText": "Time dismantles all things eventually, but some wish to accelerate the process."
  },
  "The Encroaching Darkness": {
    "name": "The Encroaching Darkness",
    "regex": "ncr",
    "description": "Map Corrupted",
    "flavourText": "No matter where your dreams take you, Nightmare follows close behind."
  },
  "The Endless Darkness": {
    "name": "The Endless Darkness",
    "regex": "ze t",
    "description": "Voidforge",
    "flavourText": "Gaze towards the stars, but beware what gazes back."
  },
  "The Endurance": {
    "name": "The Endurance",
    "regex": "rub",
    "description": "Vivid Crimson Jewel",
    "flavourText": "Crimson rubies, drops of vigour, flowing through my veins, flesh like coal, try to crush me, diamond is what remains."
  },
  "The Enforcer": {
    "name": "The Enforcer",
    "regex": "enf",
    "description": "Spiked Gloves of the Conquest (Culling Strike) Item Level: 86 Warlord Item",
    "flavourText": "\"Boss said to get rid of him, didn't say not to make a mess.\" - Rune The Goon"
  },
  "The Enlightened": {
    "name": "The Enlightened",
    "regex": "serp",
    "description": "Level 3 Enlighten",
    "flavourText": "Weaving the six, a serpent stands tall. Wearing a crown, the thousand petals call."
  },
  "The Enthusiasts": {
    "name": "The Enthusiasts",
    "regex": "ias",
    "description": "Victario's Influence Two-Implicit Corrupted",
    "flavourText": "\"Glimmers of benevolence, Shrouded a lacquered lust for power, Yet still they followed his influence.\""
  },
  "The Escape": {
    "name": "The Escape",
    "regex": "e es",
    "description": "Seven-League Step",
    "flavourText": "In fleeing reality, you step into the realm of madness."
  },
  "The Eternal War": {
    "name": "The Eternal War",
    "regex": "utl",
    "description": "Timeless Jewel Two-Implicit Corrupted",
    "flavourText": "They believed, falsely, that the strongest of generals could outlast eons of corruption."
  },
  "The Ethereal": {
    "name": "The Ethereal",
    "regex": "erea",
    "description": "Six-Link Vaal Regalia",
    "flavourText": "\"Long ago, people looked to the stars, believing they influenced us. Soon, it will be us who influence the stars.\" - Doryani, Queen's Thaumaturge"
  },
  "The Everlasting": {
    "name": "The Everlasting",
    "regex": "erl",
    "description": "Originator Incarnation Item",
    "flavourText": "The Atlas invites us all to a lifelong journey. It would be unwise to overstay our welcome."
  },
  "The Explorer": {
    "name": "The Explorer",
    "regex": "sef",
    "description": "Map Corrupted",
    "flavourText": "A map is only useful if you know where you stand."
  },
  "The Eye of Terror": {
    "name": "The Eye of Terror",
    "regex": "nbl",
    "description": "Mageblood Foulborn",
    "flavourText": "The Lord of Chaos dreams as his Eye gazes, unblinking, at his prize. And soon, all shall tremble before his waking form."
  },
  "The Eye of the Dragon": {
    "name": "The Eye of the Dragon",
    "regex": "at e",
    "description": "Jewel Corrupted",
    "flavourText": "Some powers are far too great even for the gods of old."
  },
  "The Fathomless Depths": {
    "name": "The Fathomless Depths",
    "regex": "oml",
    "description": "Lightpoacher",
    "flavourText": "Fall into endless night; a voyage into an ocean of oblivion."
  },
  "The Feast": {
    "name": "The Feast",
    "regex": "usb",
    "description": "Romira's Banquet Corrupted",
    "flavourText": "Shame what happened to my husband. He had such good taste."
  },
  "The Fiend": {
    "name": "The Fiend",
    "regex": "r er",
    "description": "Headhunter Corrupted",
    "flavourText": "Your era is now, your power unwavered, soon we will see who the gods truly favoured."
  },
  "The Finishing Touch": {
    "name": "The Finishing Touch",
    "regex": "hur",
    "description": "1x Fertile Catalyst",
    "flavourText": "A little extra flair never hurts."
  },
  "The Fishmonger": {
    "name": "The Fishmonger",
    "regex": "hmo",
    "description": "Albino Rhoa Feather",
    "flavourText": "However vicious Rhoas might be, a dedicated angler may in time tame them."
  },
  "The Fletcher": {
    "name": "The Fletcher",
    "regex": "se f",
    "description": "Drillneck Corrupted",
    "flavourText": "Let these fine arrows pack a punch."
  },
  "The Flora's Gift": {
    "name": "The Flora's Gift",
    "regex": "rdy",
    "description": "Five-Link Staff Item Level: 66",
    "flavourText": "Sturdy and strong, grown from the stream. The Flora that live here, A combatant's dream."
  },
  "The Fool": {
    "name": "The Fool",
    "regex": "e foo",
    "description": "20x Orb of Chance",
    "flavourText": "Even the most learned man is a fool to his own fate."
  },
  "The Forbidden Fruit": {
    "name": "The Forbidden Fruit",
    "regex": "orki",
    "description": "Uber Pinnacle Fragment",
    "flavourText": "It's about working smarter, not harder."
  },
  "The Forgotten Treasure": {
    "name": "The Forgotten Treasure",
    "regex": "'t l",
    "description": "Leather Belt Double-Influenced Item",
    "flavourText": "Don't let fool's gold deceive you."
  },
  "The Formless Sea": {
    "name": "The Formless Sea",
    "regex": "ss m",
    "description": "Varunastra",
    "flavourText": "Formless might, Wild beauty tamed, The brine of gods, The seas restrained."
  },
  "The Forsaken": {
    "name": "The Forsaken",
    "regex": "u ga",
    "description": "Umbilicus Immortalis",
    "flavourText": "You gave us life and love, more than you could spare. Now you're gone, and we are stranded, alone, cold and without purpose."
  },
  "The Fortunate": {
    "name": "The Fortunate",
    "regex": "eros",
    "description": "2x Divine Orb",
    "flavourText": "The fortunate find generosity in the divine."
  },
  "The Forward Gaze": {
    "name": "The Forward Gaze",
    "regex": "orw",
    "description": "Replica Item",
    "flavourText": "\"When they realize our true intent, they will decry us, assault us, and try to crush what we have built. We must stand tall, Qotra, and make the future our own.\""
  },
  "The Fox": {
    "name": "The Fox",
    "regex": "rsh",
    "description": "Level 20 Gem",
    "flavourText": "\"Masters of wit, strength and cunning. To survive the harsh winters, you must be like the fox.\" - Ezomyte Proverb"
  },
  "The Fox in the Brambles": {
    "name": "The Fox in the Brambles",
    "regex": "emm",
    "description": "Bramblejack Two-Implicit Corrupted",
    "flavourText": "Hemmingsworth 6:10 - \"And the fox gazed out from the brambles, unreachable and smirking.\""
  },
  "The Gambler": {
    "name": "The Gambler",
    "regex": "bler",
    "description": "Divination Card",
    "flavourText": "\"I don't believe in karma. If it were real, I would never win.\""
  },
  "The Garish Power": {
    "name": "The Garish Power",
    "regex": "fun",
    "description": "Jewel",
    "flavourText": "Maligaro may have valued function over form, but that did not mute his flair for the dramatic."
  },
  "The Gemcutter": {
    "name": "The Gemcutter",
    "regex": "peb",
    "description": "Gemcutter's Prism",
    "flavourText": "In the hands of a master craftsman, a worthless pebble can adorn the crown of a king."
  },
  "The Gentleman": {
    "name": "The Gentleman",
    "regex": "xes",
    "description": "Sword Corrupted",
    "flavourText": "\"Axes and mauls are so uncivilised. A good clean cut to the neck with a sharp blade, that's the Sarn way!\""
  },
  "The Gladiator": {
    "name": "The Gladiator",
    "regex": "b t",
    "description": "Nightmare Bascinet",
    "flavourText": "The thumb turns down and the crowd roars, they want death and the blood is yours."
  },
  "The Golden Era": {
    "name": "The Golden Era",
    "regex": "n er",
    "description": "Flaring Eclipse Staff Item Level: 100",
    "flavourText": "Before gemlings, before thaumaturgy, a simple court magician could enthrall the masses."
  },
  "The Greatest Intentions": {
    "name": "The Greatest Intentions",
    "regex": "g pu",
    "description": "The Saviour Two-Implicit Corrupted",
    "flavourText": "Chasing purity in the rising light means facing the darkening edges of the spirit."
  },
  "The Gulf": {
    "name": "The Gulf",
    "regex": "ulf",
    "description": "Thread of Hope Two-Implicit Corrupted",
    "flavourText": "I thought love stronger than all, but time and isolation broke that which madness could not."
  },
  "The Hale Heart": {
    "name": "The Hale Heart",
    "regex": "hale",
    "description": "Item Item Level: 100 Elder Item",
    "flavourText": "Though the years weakened his mind, his body remained deadly as ever."
  },
  "The Harvester": {
    "name": "The Harvester",
    "regex": "eirs",
    "description": "The Harvest",
    "flavourText": "Taste not of their forbidden fruit. Theirs is a harvest of the darkest kind, twisted, rotten and damned for eternity."
  },
  "The Hermit": {
    "name": "The Hermit",
    "regex": "herm",
    "description": "Lifesprig",
    "flavourText": "The hermit's only friend is the greenery he can find."
  },
  "The Heroic Shot": {
    "name": "The Heroic Shot",
    "regex": "roi",
    "description": "17x Chromatic Orb",
    "flavourText": "Try a thousand times, and eventually you'll have to give up."
  },
  "The Hive of Knowledge": {
    "name": "The Hive of Knowledge",
    "regex": "hiv",
    "description": "Machina Mitts Two-Implicit Corrupted",
    "flavourText": "Within years of knowledge, distilled by careful craftsmanship, lies great power."
  },
  "The Hoarder": {
    "name": "The Hoarder",
    "regex": "fae",
    "description": "Exalted Orb",
    "flavourText": "\"More! I want more!\" - Faendris, the Insatiable"
  },
  "The Hook": {
    "name": "The Hook",
    "regex": "y ob",
    "description": "Level 21 Transfigured Gem Quality: +23% Corrupted",
    "flavourText": "Every obsession began with a single, innocent taste."
  },
  "The Hunger": {
    "name": "The Hunger",
    "regex": "ny l",
    "description": "Taste of Hate",
    "flavourText": "\"How many lives have you consumed?\" \"How many times have you blinked?\""
  },
  "The Immortal": {
    "name": "The Immortal",
    "regex": "ndm",
    "description": "House of Mirrors",
    "flavourText": "\"Greetings! Just because you think I'm greedy doesn't mean I'm not willing to share. You'll just have to kill me first.\" -Grandmaster Dy'Ness"
  },
  "The Incantation": {
    "name": "The Incantation",
    "regex": "ncan",
    "description": "The Whispering Ice",
    "flavourText": "When there is no other choice, even the meekest whisper can bring about the greatest storm."
  },
  "The Innocent": {
    "name": "The Innocent",
    "regex": "aton",
    "description": "40x Orb of Regret",
    "flavourText": "His brother would not atone, so he took his brother's life, and with it, his sins."
  },
  "The Inoculated": {
    "name": "The Inoculated",
    "regex": "inoc",
    "description": "Seraphim's Armour",
    "flavourText": "Chaos spread, wreaking havoc and death. They said none would be spared, and yet here I stand."
  },
  "The Insane Cat": {
    "name": "The Insane Cat",
    "regex": "sane",
    "description": "Mageblood Item Level: 84 Corrupted",
    "flavourText": "One person's madness is another person's reality."
  },
  "The Insatiable": {
    "name": "The Insatiable",
    "regex": "sfy",
    "description": "The Harvest Corrupted",
    "flavourText": "A lust for souls. The urge to kill just to satisfy its thirst. An unbearable burden that would make even the purest heart blacken over time."
  },
  "The Inventor": {
    "name": "The Inventor",
    "regex": "jum",
    "description": "10x Vaal Orb",
    "flavourText": "Jump right in, But beware Of things broken Or beyond compare."
  },
  "The Jester": {
    "name": "The Jester",
    "regex": "ppl",
    "description": "Merciless One-Hand Weapon Item Level: 100",
    "flavourText": "Summoned for the King's desire, soon applause came from the court. However insanity was his only sire, so the King's reign was cut short."
  },
  "The Jeweller's Boon": {
    "name": "The Jeweller's Boon",
    "regex": "el'",
    "description": "Five-Linked Body Armour Influenced Item",
    "flavourText": "The jeweller's true talent is the capacity to see a jewel's beauty before they draw it out."
  },
  "The Journalist": {
    "name": "The Journalist",
    "regex": "rco",
    "description": "Helmet Double-Veiled Item",
    "flavourText": "A good spy doesn't forget she's gone undercover."
  },
  "The Journey": {
    "name": "The Journey",
    "regex": "oh t",
    "description": "Journey Tattoo",
    "flavourText": "Oh the places you will go, the sights you will see, the things you will meet."
  },
  "The King's Blade": {
    "name": "The King's Blade",
    "regex": "w f",
    "description": "Bloodthirsty Eternal Sword Item Level: 66",
    "flavourText": "\"To know for what you fight. To get up again when you've been struck down. To outmanoeuvre someone faster, trick someone smarter, crush someone stronger. That's what it takes to claim the crown.\" - Daresso, the King of Swords"
  },
  "The King's Heart": {
    "name": "The King's Heart",
    "regex": "rtl",
    "description": "Kaom's Heart",
    "flavourText": "500 times Kaom's axe fell, 500 times Kaom's Heart splintered. Finally, all that remained was a terrible, heartless Fury."
  },
  "The Lake": {
    "name": "The Lake",
    "regex": "lak",
    "description": "Reflecting Mist",
    "flavourText": "Gaze upon the Lake Gaze upon your Reflection Your full Potential"
  },
  "The Last Laugh": {
    "name": "The Last Laugh",
    "regex": "oldi",
    "description": "Replica Dragonfang's Flight Corrupted",
    "flavourText": "Holding fast when shadows fall, Over ruins, jesters call. Nothing breaks their twisted cheer, Kings of chaos, friends sincere."
  },
  "The Last One Standing": {
    "name": "The Last One Standing",
    "regex": "t em",
    "description": "Atziri's Disfavour",
    "flavourText": "The strongest emerge from suffering. The toughest bear the most scars. The sole survivor claims the greatest of rewards."
  },
  "The Last Supper": {
    "name": "The Last Supper",
    "regex": "no'",
    "description": "Bino's Kitchen Knife",
    "flavourText": "\"Bino's brief career as a chef at Axiom saved the executioner a lot of work.\""
  },
  "The Leviathan": {
    "name": "The Leviathan",
    "regex": "wam",
    "description": "Maven Item Two-Implicit Corrupted",
    "flavourText": "Ancient behemoths swam the depths of the oceans long before Man walked these lands."
  },
  "The Lich": {
    "name": "The Lich",
    "regex": "ad r",
    "description": "Midnight Bargain Corrupted",
    "flavourText": "When the dead raise and master their own, the land is truly lost."
  },
  "The Life Thief": {
    "name": "The Life Thief",
    "regex": "zer",
    "description": "Zerphi's Heart",
    "flavourText": "\"The process of eternal youth is a give and take. You give them death and take their youth.\" - Zerphi of the Vaal"
  },
  "The Lion": {
    "name": "The Lion",
    "regex": "ceu",
    "description": "Lioneye Item",
    "flavourText": "The Eternals lauded his valour. The Karui relished his defeat. Yet the final thoughts of Marceus Lioneye were naught but lament for his pride."
  },
  "The Long Con": {
    "name": "The Long Con",
    "regex": "prou",
    "description": "Elderslayer's Exalted Orb",
    "flavourText": "\"This was the proudest moment of my life.\" \"... so far\""
  },
  "The Long Watch": {
    "name": "The Long Watch",
    "regex": "mud",
    "description": "The Fourth Vow",
    "flavourText": "The rain pelts down, Mud grasping at his feet, as thoughts of those in his care bolster his resolve."
  },
  "The Lord in Black": {
    "name": "The Lord in Black",
    "regex": "hy k",
    "description": "Ring of Bameth Item Level: 83",
    "flavourText": "Thy knee shall bend in shifting dark, thy blade shall serve his vigil. Thy oath shall bind thee to his mark, thy flesh shall bear his sigil."
  },
  "The Lord of Celebration": {
    "name": "The Lord of Celebration",
    "regex": "oto",
    "description": "Sceptre of Celebration Shaper Item",
    "flavourText": "Though they were a pack of elite combatants, the Emperor's royal guards were not ready to face one of his notorious parties."
  },
  "The Lover": {
    "name": "The Lover",
    "regex": "to y",
    "description": "Jewellery Item Level: 79",
    "flavourText": "\"I wanted to give you three things. I've given you my eternal love. I've sung to you my most beautiful song. I'd have given you the moon last, but it couldn't be found. I hope you'll accept this instead.\""
  },
  "The Lunaris Priestess": {
    "name": "The Lunaris Priestess",
    "regex": "prie",
    "description": "Sire of Shards",
    "flavourText": "Embrace the Light, Await the Morrow, No more Spite, And no more Sorrow."
  },
  "The Mad King": {
    "name": "The Mad King",
    "regex": "ad k",
    "description": "Vaal Aspect",
    "flavourText": "Fear the man who lusts for power, for he will do anything to get it."
  },
  "The Magma Crab": {
    "name": "The Magma Crab",
    "regex": "afi",
    "description": "Level 21 Vaal Molten Shell Corrupted",
    "flavourText": "Drink deeply of living rock and be as stone, with blood afire."
  },
  "The Master Artisan": {
    "name": "The Master Artisan",
    "regex": "isan",
    "description": "20x Quality Currency",
    "flavourText": "Perfection is the standard, excellence will be handled on a case by case basis."
  },
  "The Mayor": {
    "name": "The Mayor",
    "regex": "ayo",
    "description": "The Light of Meaning",
    "flavourText": "A ruler is only as powerful as he is wealthy. Control the coin, control the empire."
  },
  "The Mercenary": {
    "name": "The Mercenary",
    "regex": "uye",
    "description": "Shield Corrupted",
    "flavourText": "Loyalty can be bought. Just make sure you know who the buyer is."
  },
  "The Messenger": {
    "name": "The Messenger",
    "regex": "seng",
    "description": "Harbinger Item",
    "flavourText": ""
  },
  "The Metalsmith's Gift": {
    "name": "The Metalsmith's Gift",
    "regex": "lsm",
    "description": "Prismatic Ring",
    "flavourText": "A month's work, a year's wages, a foolish shortcut through a Rhoa's nest, and a grieving bride-to-be, who never received her betrothed's great gift."
  },
  "The Mind's Eyes": {
    "name": "The Mind's Eyes",
    "regex": "nd'",
    "description": "Astral Projector",
    "flavourText": "Through the eyes of a person, you can see their soul Through the eyes of a jewel, you can see the universe"
  },
  "The Miracle": {
    "name": "The Miracle",
    "regex": "202",
    "description": "Awakened Exceptional Gem",
    "flavourText": "Despite arriving early, her silly seraphim couldn't be happier. Octavia, 2023"
  },
  "The Mountain": {
    "name": "The Mountain",
    "regex": "rme",
    "description": "Jewel of Potency",
    "flavourText": "Charmed by beautiful stones Consumed with the pursuit of perfection Ever deeper into the waiting dark"
  },
  "The Nurse": {
    "name": "The Nurse",
    "regex": "trie",
    "description": "The Doctor",
    "flavourText": "We tried to tell him to get his head checked."
  },
  "The Oath": {
    "name": "The Oath",
    "regex": "e oa",
    "description": "Death's Oath",
    "flavourText": "An oath once made is an oath never broken. Do not delay in keeping it, for I take no pleasure in fools."
  },
  "The Offering": {
    "name": "The Offering",
    "regex": "f ot",
    "description": "Shavronne's Wrappings",
    "flavourText": "Eternal beauty has a cost, one which Shavronne was happy to pay with the lives of others."
  },
  "The Offspring": {
    "name": "The Offspring",
    "regex": "ffs",
    "description": "Ryslatha's Coil",
    "flavourText": "The swarm began with just a couple of children. Now, it is her entire existence."
  },
  "The Old Man": {
    "name": "The Old Man",
    "regex": "ct y",
    "description": "Fishing Rod Two-Implicit Corrupted",
    "flavourText": "Hear me, fish! I love and respect you, but before this day ends I will kill you dead."
  },
  "The One That Got Away": {
    "name": "The One That Got Away",
    "regex": "goa",
    "description": "Replica Bated Breath",
    "flavourText": "Savor life's missing pieces. To complete one's final goal is to take one's last breath."
  },
  "The One With All": {
    "name": "The One With All",
    "regex": "gho",
    "description": "Le Heup of All Corrupted",
    "flavourText": "Embrace death to honour the lost, no fear in life no matter the cost. With one of all we are, and all of one we trust, throughout past, present and future... be just."
  },
  "The Opulent": {
    "name": "The Opulent",
    "regex": "opu",
    "description": "Ring Item Level: 100",
    "flavourText": "Wealth can, in fact, buy happiness."
  },
  "The Pack Leader": {
    "name": "The Pack Leader",
    "regex": "eade",
    "description": "Alpha's Howl",
    "flavourText": "Become the leader you were born to be."
  },
  "The Pact": {
    "name": "The Pact",
    "regex": "pact",
    "description": "Pledge of Hands",
    "flavourText": "\"On this day I mark the first of many agreements that I will have with this land and its people.\""
  },
  "The Patient": {
    "name": "The Patient",
    "regex": "pati",
    "description": "The Nurse",
    "flavourText": "I have a headache, can anyone find me a nurse?"
  },
  "The Penitent": {
    "name": "The Penitent",
    "regex": "gry",
    "description": "Unset Ring",
    "flavourText": "First, I gave my wealth, and we went hungry. Next, I gave my land, and we were homeless. Then, I gave my family, and I was alone. Last, I gave my eyes, and all I could dream was mine."
  },
  "The Poet": {
    "name": "The Poet",
    "regex": "wep",
    "description": "Blood of Corruption Corrupted",
    "flavourText": "God had forsaken the land And Victario wept. Corruption consumed the land And Victario's tears turned to blood."
  },
  "The Polymath": {
    "name": "The Polymath",
    "regex": "pol",
    "description": "Astramentis",
    "flavourText": "Genius knows no limits."
  },
  "The Porcupine": {
    "name": "The Porcupine",
    "regex": "rcu",
    "description": "Six-Link Short Bow Item Level: 50",
    "flavourText": "The first quill separates the quick learners from the dead."
  },
  "The Price of Devotion": {
    "name": "The Price of Devotion",
    "regex": "bek",
    "description": "Mageblood Quality: +20% Two-Implicit Corrupted",
    "flavourText": "Unbeknown to Atziri's finest thaumaturgists, their loyalty would require far greater devotion than mere research."
  },
  "The Price of Loyalty": {
    "name": "The Price of Loyalty",
    "regex": "mbu",
    "description": "Skin of the Loyal Item Level: 25 Two-Implicit Corrupted",
    "flavourText": "\"Forge me a carapace from their skin, imbued with their soul. Then feed their flesh to the hounds.\""
  },
  "The Price of Prescience": {
    "name": "The Price of Prescience",
    "regex": "ltu",
    "description": "Vaal Temple Map Delirium: 100% Corrupted",
    "flavourText": "The strange voice showed Aul a future where his legacy was forgotten, where new cultures broke themselves upon Aul's ruined world."
  },
  "The Price of Protection": {
    "name": "The Price of Protection",
    "regex": "ct h",
    "description": "Elder Guardian Occupied Map Modifiers: 8 Corrupted",
    "flavourText": "To protect her mansion, she would cut a deal with anyone. Anything. Something answered."
  },
  "The Primordial": {
    "name": "The Primordial",
    "regex": "we p",
    "description": "Jewel Primordial",
    "flavourText": "We play at God with our necromancy, but forces far more potent sleep within these stones."
  },
  "The Prince of Darkness": {
    "name": "The Prince of Darkness",
    "regex": "f dar",
    "description": "Elegant Hubris",
    "flavourText": "Fear a man who is willing to sacrifice anything for power."
  },
  "The Professor": {
    "name": "The Professor",
    "regex": "rof",
    "description": "The Putrid Cloister",
    "flavourText": "The academic route to knowledge is wide and well-trodden; but it is the untaught one who scales the mountain."
  },
  "The Progeny of Lunaris": {
    "name": "The Progeny of Lunaris",
    "regex": "is'",
    "description": "Dying Sun",
    "flavourText": "Born beneath silver light, bearing Lunaris' mark. Conjuring all his might, the Prodigy turned light to dark."
  },
  "The Queen": {
    "name": "The Queen",
    "regex": "he que",
    "description": "Atziri's Acuity",
    "flavourText": "The power of the world, lies upon your hands."
  },
  "The Rabbit's Foot": {
    "name": "The Rabbit's Foot",
    "regex": "abb",
    "description": "10x Incursion Vial",
    "flavourText": "It is said anyone who bears this trinket is the luckiest exile in all of Wraeclast. The gods would disagree, and forever curse any whom give it away."
  },
  "The Rabid Rhoa": {
    "name": "The Rabid Rhoa",
    "regex": "t 2",
    "description": "Malicious Gemini Claw Item Level: 83",
    "flavourText": "\"Experiment 22A: Rhoas, when deprived of water, secrete a most delightfully potent toxin.\" - Maligaro"
  },
  "The Realm": {
    "name": "The Realm",
    "regex": "ge p",
    "description": "Portal Quality: +1-20%",
    "flavourText": "If you wish to rush into strange places, be prepared to face strange things."
  },
  "The Return of the Rat": {
    "name": "The Return of the Rat",
    "regex": "hera",
    "description": "Tavukai",
    "flavourText": "And he shall be heralded by the screams of the damned."
  },
  "The Risk": {
    "name": "The Risk",
    "regex": "o ri",
    "description": "Ventor's Gamble",
    "flavourText": "\"There is no right or wrong choice, no best or worst. There are only choices and their consequences.\""
  },
  "The Rite of Elements": {
    "name": "The Rite of Elements",
    "regex": "as q",
    "description": "Level 21 Golem Gem Corrupted",
    "flavourText": "A mind as quick as lightning, fists as hard as stone, a heart that burns with fury, and eyes that chill to the bone."
  },
  "The Road to Power": {
    "name": "The Road to Power",
    "regex": "oad",
    "description": "Runic One-Hand Weapon Item Level: 100",
    "flavourText": "A beacon on the horizon; a guiding light, a call for help, or a warning to turn back."
  },
  "The Rusted Bard": {
    "name": "The Rusted Bard",
    "regex": "urf",
    "description": "4x Tainted Mythic Orb",
    "flavourText": "Fourfold the refrain, fortissimo cheer. One hundred rent twain, naught left for a bier. The song rattles on, though hollow a bit. See the hope is gone, no prize shall ye get."
  },
  "The Ruthless Ceinture": {
    "name": "The Ruthless Ceinture",
    "regex": "uthl",
    "description": "Meginord's Girdle Corrupted",
    "flavourText": "In combat, a warrior must first be resourceful, and second, decisive."
  },
  "The Sacrifice": {
    "name": "The Sacrifice",
    "regex": "e sac",
    "description": "Six-Link Sacrificial Garb Item Level: 100",
    "flavourText": "For some, the price of power is never too great."
  },
  "The Saint's Treasure": {
    "name": "The Saint's Treasure",
    "regex": "pub",
    "description": "2x Exalted Orb",
    "flavourText": "Publicly, he lived a pious and chaste life of poverty. Privately, tithes and tributes made him and his lascivious company very comfortable indeed."
  },
  "The Samurai's Eye": {
    "name": "The Samurai's Eye",
    "regex": "ai'",
    "description": "Watcher's Eye",
    "flavourText": "At night, when the seas are calm, and the skies dark, he can see it. The formless fiend that took his eye, and fractured his mind."
  },
  "The Scarred Meadow": {
    "name": "The Scarred Meadow",
    "regex": "hme",
    "description": "Wake of Destruction",
    "flavourText": "The earth offers nourishment, growth and healing. Unless, of course, the sky has other plans."
  },
  "The Scavenger": {
    "name": "The Scavenger",
    "regex": "sem",
    "description": "Carcass Jack",
    "flavourText": "Take small pieces of things and then assemble them together"
  },
  "The Scholar": {
    "name": "The Scholar",
    "regex": "uths",
    "description": "40x Scroll of Wisdom",
    "flavourText": "It is with the smallest of words that we find the largest of truths."
  },
  "The Scout": {
    "name": "The Scout",
    "regex": "cout",
    "description": "7x Exalted Orb",
    "flavourText": "The first to travel are often rewarded for their journey, but all the treasure in the world cannot bring back those that are lost."
  },
  "The Seeker": {
    "name": "The Seeker",
    "regex": "awe",
    "description": "3x Orb of Annulment",
    "flavourText": "All that is flawed is worthless. The slightest error, and this might as well be trash."
  },
  "The Sephirot": {
    "name": "The Sephirot",
    "regex": "seph",
    "description": "10x Divine Orb",
    "flavourText": "If the path to divinity were simple, we'd all be gods."
  },
  "The Shepherd's Sandals": {
    "name": "The Shepherd's Sandals",
    "regex": "hep",
    "description": "Boots Item Level: 100 Two-Implicit Corrupted",
    "flavourText": "He who watches the flock is himself watched by those with loyalty beyond measure."
  },
  "The Shieldbearer": {
    "name": "The Shieldbearer",
    "regex": "dbe",
    "description": "The Squire",
    "flavourText": "While you grow, I shall be your knight, and you my squire. One day, you shall be the one who stands and defends our home."
  },
  "The Shortcut": {
    "name": "The Shortcut",
    "regex": "lua",
    "description": "Quicksilver Flask of the Cheetah Item Level: 100",
    "flavourText": "If time is the most valuable currency, how do you make more of it?"
  },
  "The Side Quest": {
    "name": "The Side Quest",
    "regex": "p y",
    "description": "Incarnation Echo",
    "flavourText": "You'll never know the things you miss if you keep your eyes closed"
  },
  "The Sigil": {
    "name": "The Sigil",
    "regex": "c u",
    "description": "Unassailable Amulet",
    "flavourText": "Three men travel through the gate; they carry a protective ward. A faction conspires against their fate, but magic unravels the sword."
  },
  "The Silly Boy": {
    "name": "The Silly Boy",
    "regex": "m si",
    "description": "6x Horned Scarab",
    "flavourText": "From silly pondering comes legend, and from legend, horned fortune"
  },
  "The Siren": {
    "name": "The Siren",
    "regex": "r ra",
    "description": "The Whispering Ice Corrupted",
    "flavourText": "At the beck and call of The Siren's hand, winter ravages the trembling land, and the weight of ice that binds will break the strongest of minds."
  },
  "The Skeleton": {
    "name": "The Skeleton",
    "regex": "g u",
    "description": "Level 1 Summon Skeletons Quality: +23% Corrupted",
    "flavourText": "They stand among us, and within us."
  },
  "The Slumbering Beast": {
    "name": "The Slumbering Beast",
    "regex": "beri",
    "description": "Hinekora's Lock",
    "flavourText": "He slumbers... But soon he will awaken."
  },
  "The Soul": {
    "name": "The Soul",
    "regex": "t pe",
    "description": "Soul Taker",
    "flavourText": "\"Most people only have one. I'm a bit of a hoarder.\""
  },
  "The Spark and the Flame": {
    "name": "The Spark and the Flame",
    "regex": "ky m",
    "description": "Berek's Respite",
    "flavourText": "When sky meets ground the flames can be found, but who has the will to tame them."
  },
  "The Spoiled Prince": {
    "name": "The Spoiled Prince",
    "regex": "spoi",
    "description": "Dictator's Prophecy Wand Item Level: 100",
    "flavourText": "A boy who grows up with everything learns to appreciate nothing."
  },
  "The Standoff": {
    "name": "The Standoff",
    "regex": "dof",
    "description": "Rustic Sash",
    "flavourText": "Sometimes your greatest enemy is the only one keeping you breathing."
  },
  "The Stormcaller": {
    "name": "The Stormcaller",
    "regex": "rmc",
    "description": "Agnerod Staff",
    "flavourText": "If you beckon the Lord of Lightning, do not be surprised when you are struck."
  },
  "The Strategist": {
    "name": "The Strategist",
    "regex": "hys",
    "description": "Inspired Learning Corrupted",
    "flavourText": "Know thine enemy better than you know thyself."
  },
  "The Summoner": {
    "name": "The Summoner",
    "regex": "o ow",
    "description": "Minion Gem Quality: +20%",
    "flavourText": "To own a piece of the Nightmare, you must first belong to the Nightmare."
  },
  "The Sun": {
    "name": "The Sun",
    "regex": "ch n",
    "description": "Rise of the Phoenix",
    "flavourText": "Each night, the light dies, and each morning she is born anew, embracing the land in her golden wings."
  },
  "The Surgeon": {
    "name": "The Surgeon",
    "regex": "rgeo",
    "description": "Surgeon's Flask",
    "flavourText": "\"He might be lacking in vision, but his virtuosity is undeniable.\" - Malachai, on Maligaro"
  },
  "The Surveyor": {
    "name": "The Surveyor",
    "regex": "vey",
    "description": "Map Map Tier: 14",
    "flavourText": "Exploring lands made of flesh and sorrow, we'll reap and plunder like there's no tomorrow."
  },
  "The Survivalist": {
    "name": "The Survivalist",
    "regex": "p u",
    "description": "7x Orb of Alchemy",
    "flavourText": "A lucky number For us all To help us through The perils told."
  },
  "The Sword King's Salute": {
    "name": "The Sword King's Salute",
    "regex": "rd k",
    "description": "Daresso's Salute",
    "flavourText": "Many were slain by the sword king Their blood decorating his ring Those who retreated were slaughtered Those who fought bravely were honoured"
  },
  "The Thaumaturgist": {
    "name": "The Thaumaturgist",
    "regex": "tery",
    "description": "Shavronne's Revelation Corrupted",
    "flavourText": "\"Mastery of thaumaturgy is like any other pursuit; it requires dedication and sacrifice. Sometimes several sacrifices.\" - Shavronne of Umbra"
  },
  "The Throne": {
    "name": "The Throne",
    "regex": "hron",
    "description": "Kaom's Roots Corrupted",
    "flavourText": "A king's movement is unwavering."
  },
  "The Tinkerer's Table": {
    "name": "The Tinkerer's Table",
    "regex": "ryi",
    "description": "5x Fossil",
    "flavourText": "Trying to bring your vision to life is enough to drive you mad."
  },
  "The Tireless Extractor": {
    "name": "The Tireless Extractor",
    "regex": "p s",
    "description": "10x Oil",
    "flavourText": "\"I am not alone in this. I have God by my side! And... you help sometimes, I suppose.\" - Sister Cassia"
  },
  "The Tower": {
    "name": "The Tower",
    "regex": "towe",
    "description": "Staff",
    "flavourText": "A tower built of the strongest stone is not eternal; a towering intellect is not enlightened."
  },
  "The Traitor": {
    "name": "The Traitor",
    "regex": "rait",
    "description": "Wand Corrupted",
    "flavourText": "Sometimes an apprentice becomes a master through countless hours of hard work and practice. Sometimes it happens by force."
  },
  "The Transformation": {
    "name": "The Transformation",
    "regex": "ul o",
    "description": "Tainted Mythic Orb",
    "flavourText": "Even the most beautiful of transformations can still have a dark side."
  },
  "The Trial": {
    "name": "The Trial",
    "regex": "tria",
    "description": "Map Map Tier: 15 Corrupted",
    "flavourText": "You cannot journey to new lands until you have the courage to leave the safety of home."
  },
  "The Tumbleweed": {
    "name": "The Tumbleweed",
    "regex": "sps",
    "description": "Diamond Ring of Redemption Item Level: 100 Redeemer Item",
    "flavourText": "Love is the only redemption after succumbing to the grasps of the Wasteland."
  },
  "The Twilight Moon": {
    "name": "The Twilight Moon",
    "regex": "coo",
    "description": "The Twilight Temple",
    "flavourText": "The day is dying, the night is born, the air grows cool, the sky is torn."
  },
  "The Twins": {
    "name": "The Twins",
    "regex": "wo s",
    "description": "Gemini Claw of Celebration Item Level: 83",
    "flavourText": "Two sides of a coin; Heads for a friend, tails a foe; Gemini toss up"
  },
  "The Tyrant": {
    "name": "The Tyrant",
    "regex": "asz",
    "description": "Merciless Weapon Item Level: 100",
    "flavourText": "\"Fear controls the masses.\" - Laszlo, the Scourge"
  },
  "The Undaunted": {
    "name": "The Undaunted",
    "regex": "kje",
    "description": "Nemesis Item Corrupted",
    "flavourText": "\"Fate was always my nemesis... But it didn't stop me then, and it won't stop me now.\" - Kjetilbrann, The Undaunted"
  },
  "The Undisputed": {
    "name": "The Undisputed",
    "regex": "spu",
    "description": "Merciless Vaal Axe Item Level: 100 Elder Item",
    "flavourText": "To create something truly spectacular, you must risk total failure."
  },
  "The Unexpected Prize": {
    "name": "The Unexpected Prize",
    "regex": "m fa",
    "description": "Attribute Transforming Jewel Corrupted",
    "flavourText": "They came from far and wide under a common banner. They sought companionship and competition, but found a treasure none had foreseen."
  },
  "The Union": {
    "name": "The Union",
    "regex": "e 2",
    "description": "10x Gemcutter's Prism",
    "flavourText": "On the 21st of Eterni, two become one, their light outshines the setting sun."
  },
  "The Valkyrie": {
    "name": "The Valkyrie",
    "regex": "lky",
    "description": "Nemesis Item",
    "flavourText": "The villain strikes, the world is torn. A war begins, a hero is born, The nemesis sets the sky alight. A hero's sacrifice sets everything right. - Drake's Epitaph"
  },
  "The Vast": {
    "name": "The Vast",
    "regex": "m h",
    "description": "Song of the Sirens",
    "flavourText": "Can you hear the siren's calls, Just beyond the sea? A voice which hearts of men enthralls, I too am hooked to thee."
  },
  "The Visionary": {
    "name": "The Visionary",
    "regex": "onar",
    "description": "Lioneye's Vision",
    "flavourText": "Lioneye looked to the heights of glorious victory. And thus he missed the defeat right under his nose."
  },
  "The Void": {
    "name": "The Void",
    "regex": "im y",
    "description": "—",
    "flavourText": "Reach into the Void and claim your prize."
  },
  "The Warden": {
    "name": "The Warden",
    "regex": "' f",
    "description": "Amulet Corrupted",
    "flavourText": "Brutus' first innovation as Lord Incarcerator was a weighted chain around every neck so that his prisoners would forever bow to him."
  },
  "The Warlord": {
    "name": "The Warlord",
    "regex": "o cu",
    "description": "Six-Link Coronal Maul Item Level: 83",
    "flavourText": "To cure the Goddess, and break the chains of corruption, you must shatter the world."
  },
  "The Watcher": {
    "name": "The Watcher",
    "regex": "op o",
    "description": "Crown of Eyes",
    "flavourText": "Strange eyes on top of spines Gaze beyond the veil of time Deep down below the mines A dream of crimson and of grime"
  },
  "The Web": {
    "name": "The Web",
    "regex": "eb'",
    "description": "Weapon of Crafting",
    "flavourText": "A weapon, a shelter, a prison. The web's purpose changes with the spider's needs. A lesson we should take to heart."
  },
  "The Wedding Gift": {
    "name": "The Wedding Gift",
    "regex": "edd",
    "description": "Arakaali's Fang",
    "flavourText": "The acolytes congratulated the lucky groom for becoming one with the goddess."
  },
  "The White Knight": {
    "name": "The White Knight",
    "regex": "xpu",
    "description": "Six-Link Astral Plate Item Level: 100 Crusader Item",
    "flavourText": "Where Decay festers, I shall expunge it, and leave in its place a shining monument."
  },
  "The Whiteout": {
    "name": "The Whiteout",
    "regex": "sno",
    "description": "Cospri's Malice",
    "flavourText": "They thought winter had come early, that snow blanketed the land, but in truth, all their chickens had come home to roost."
  },
  "The Wilted Rose": {
    "name": "The Wilted Rose",
    "regex": "rau",
    "description": "Level 21 Aura Gem Corrupted",
    "flavourText": "Though the path to divinity is fraught with peril, hope may bloom from within."
  },
  "The Wind": {
    "name": "The Wind",
    "regex": "akn",
    "description": "Windripper",
    "flavourText": "Weaving through the cracks, searching for weaknesses, silent, indiscriminate, leaving sorrow in its wake."
  },
  "The Witch": {
    "name": "The Witch",
    "regex": "sue",
    "description": "Kiara's Determination",
    "flavourText": "A wanderer in the wild strives Against countless foes he survives A fool pursues a quest contrived By the gift of the witch, alive."
  },
  "The Wolf": {
    "name": "The Wolf",
    "regex": "obe",
    "description": "Rigwald Item",
    "flavourText": "The largest beasts cannot be overpowered. The Greatwolf teaches us to use guile, not strength, to probe for the soft flesh and strike deep."
  },
  "The Wolf's Legacy": {
    "name": "The Wolf's Legacy",
    "regex": "wls",
    "description": "Vaults of Atziri",
    "flavourText": "The howls and cackling could not mask the sadness."
  },
  "The Wolf's Shadow": {
    "name": "The Wolf's Shadow",
    "regex": "i fa",
    "description": "Hyaon's Fury",
    "flavourText": "\"If I fall, we will fall together with my fangs in your throat.\""
  },
  "The Wolven King's Bite": {
    "name": "The Wolven King's Bite",
    "regex": "tee",
    "description": "Rigwald's Quills",
    "flavourText": "A wolf does not bite his mate as he does his prey, yet both begin with bared teeth. Know who you are, and you will know the meaning of the bite."
  },
  "The Wolverine": {
    "name": "The Wolverine",
    "regex": "t '",
    "description": "Claw Corrupted",
    "flavourText": "Claw them from the bottom, you'll be glad that you have got 'em, claw them from the top, you'll never want to stop."
  },
  "The World Eater": {
    "name": "The World Eater",
    "regex": "dy k",
    "description": "Starforge",
    "flavourText": "Its body knows no limits. Its appetite knows no bounds."
  },
  "The Wrath": {
    "name": "The Wrath",
    "regex": "daug",
    "description": "10x Chaos Orb",
    "flavourText": "\"Daughter of catastrophe, mother of pain. Amongst the filth of Wraeclast, she wanders, and her wrath follows.\" - Quintoon the Returned"
  },
  "The Wretched": {
    "name": "The Wretched",
    "regex": "ify",
    "description": "Belt",
    "flavourText": "Necromancers, believe me, are more terrifying than their thralls."
  },
  "Thirst for Knowledge": {
    "name": "Thirst for Knowledge",
    "regex": "dil",
    "description": "Gluttony",
    "flavourText": "A ravenous mind can readily take in ideas from any source. Fortunately for the scholars, he has already learned about sustainability."
  },
  "Three Faces in the Dark": {
    "name": "Three Faces in the Dark",
    "regex": "ee f",
    "description": "3x Chaos Orb",
    "flavourText": "For every threat you spy in the shadows, there are two others you don't."
  },
  "Three Voices": {
    "name": "Three Voices",
    "regex": "lag",
    "description": "3x Essence",
    "flavourText": "The village elders had a curious rule: If you hear three voices scream for aid, flee as fast as you can."
  },
  "Thunderous Skies": {
    "name": "Thunderous Skies",
    "regex": "wie",
    "description": "Storm Cloud",
    "flavourText": "Many that have wielded the power of lightning have said that death by electrocution looks like the victim is more alive than ever before."
  },
  "Time-Lost Relic": {
    "name": "Time-Lost Relic",
    "regex": "me c",
    "description": "League-Specific Item",
    "flavourText": "Time cannot wash away that which cannot be forgotten."
  },
  "Toxic Tidings": {
    "name": "Toxic Tidings",
    "regex": "c t",
    "description": "Dendrobate Two-Implicit Corrupted",
    "flavourText": "A beast even Einhar will not hunt."
  },
  "Tranquillity": {
    "name": "Tranquillity",
    "regex": "sud",
    "description": "Voltaxic Rift",
    "flavourText": "Beware the sudden calm, for it is a sure sign of a storm on the horizon."
  },
  "Treasure Hunter": {
    "name": "Treasure Hunter",
    "regex": "ogg",
    "description": "Vaults of Atziri Corrupted",
    "flavourText": "\"Don't worry, I know what I'm doing.\" - Toggo's Last Words"
  },
  "Triskaidekaphobia": {
    "name": "Triskaidekaphobia",
    "regex": "ska",
    "description": "Map Map Tier: 13 Delirium: 100% Modifiers: 8 Corrupted",
    "flavourText": "The Mists of Madness prey on those who harbour the deepest of fears."
  },
  "Turn the Other Cheek": {
    "name": "Turn the Other Cheek",
    "regex": "a a",
    "description": "Pacifism Corrupted",
    "flavourText": "\"Only after one forsakes rage, can true power be found.\" - Sekhema Asenath"
  },
  "Unchained": {
    "name": "Unchained",
    "regex": "ncha",
    "description": "Facebreaker Two-Implicit Corrupted",
    "flavourText": "Mold the world with your bare hands. Be careful, for what is your doing might become your undoing."
  },
  "Underground Forest": {
    "name": "Underground Forest",
    "regex": "rgr",
    "description": "10x Grand Eldritch Ichor",
    "flavourText": "\"In the forest again... But at least I have these.\""
  },
  "Unrequited Love": {
    "name": "Unrequited Love",
    "regex": "sap",
    "description": "19x Mirror Shard",
    "flavourText": "The pale flame of his heart disappeared in his azure reflection. The work of a life. Ambitious, and unfinished."
  },
  "Vanity": {
    "name": "Vanity",
    "regex": "vanit",
    "description": "Tabula Rasa Corrupted",
    "flavourText": ""
  },
  "Vile Power": {
    "name": "Vile Power",
    "regex": "n n",
    "description": "Doomfletch",
    "flavourText": "Dread and danger makes the air feel thin. Above, power slumbers, tempting fate. Greed and ambition draws countless in, For those who seek power can never wait."
  },
  "Vinia's Token": {
    "name": "Vinia's Token",
    "regex": "inia",
    "description": "10x Orb of Regret",
    "flavourText": "You can change your name, but you cannot change your history."
  },
  "Void of the Elements": {
    "name": "Void of the Elements",
    "regex": "ida",
    "description": "Overpowering Opal Ring Item Level: 100 Elder Item",
    "flavourText": "Though the forces of nature are mighty and intimidating, it is their absence which should be feared."
  },
  "Volatile Power": {
    "name": "Volatile Power",
    "regex": "vola",
    "description": "Vaal Gem Quality: +20% Corrupted",
    "flavourText": "Unlimited power is apt to corrupt the minds of those who possess it."
  },
  "Wealth and Power": {
    "name": "Wealth and Power",
    "regex": "w mu",
    "description": "Level 4 Enlighten Corrupted",
    "flavourText": "The greatness of a man is not in how much wealth or power he acquires, but in his integrity and his ability to positively affect those around him."
  },
  "When Currents Blaze": {
    "name": "When Currents Blaze",
    "regex": "laze",
    "description": "Stormfire Quality: +20% Corrupted",
    "flavourText": "In their fiery union, the storm left the rivers forever changed."
  },
  "Who Asked": {
    "name": "Who Asked",
    "regex": "ids",
    "description": "Dictator's Weapon Item Level: 83 Fractured",
    "flavourText": "In the midst of unrelenting requests, the blacksmith's forge conjures the unpredictable Countless voices, countless desires – yielding weapons as diverse as those who ask"
  },
  "Winter's Embrace": {
    "name": "Winter's Embrace",
    "regex": "swee",
    "description": "Circle of Fear Three-Implicit Synthesised",
    "flavourText": "Come home to me, my sweet. Oh, how long you've been! Lie with me in the frozen dark. I may yet find forgiveness Now that fear has left you."
  }
};
