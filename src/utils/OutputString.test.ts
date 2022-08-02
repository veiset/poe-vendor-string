import {generateResultString, PoeStringSettings} from "./OutputString";
import {generatedItemsLevel15} from "../generated/GeneratedItemsLevel15";
import {generatedItemsLevel40} from "../generated/GeneratedItemsLevel40";

const baseTest = [
    // damage mods (melee)
    "R G B    Humming Rusted Hatchet of Absorption        Adds 1 to 5 Lightning Damage +1 Mana gained on Kill",
    "R G B    Heated Rusted Hatchet                       Adds 1 to 3 Fire Damage",
    "R G B    Frosted Skinning Knife                      Adds 1 to 3 Cold Damage",
    "R G B    Heavy Rusted Hatchet of Rejuvenation        40% increased Physical Damage +2 Life gained for each Enemy hit by Attacks",
    "B R G    Glinting Rusted Hatchet of the Whelpling    Adds 1 to 2 Physical Damage +6% to Fire Resistance",
    // damage mods (spells/gems)
    "G R B    Apprentice's Goat's Horn                    10% increased Spell Damage",
    "B R G    Lithomancer's Goat's Horn of the Whelpling  +1 to Level of all Physical Spell Skill Gems +6% to Fire Resistance",
    "G G G    Flame Shaper's Carved Wand                  +1 to Level of all Fire Spell Skill Gems",
    "R R R    Frost Singer's Driftwood Wand               +1 to Level of all Cold Spell Skill Gems",
    "B B B    Thunderhand's Driftwood Wand of Snow        3% increased Cold Damage +1 to Level of all Lightning Spell Skill Gems",
    "B B B    Mad Lord's Driftwood Wand                   +1 to Level of all Chaos Spell Skill Gems",
    "B B R    Frosted Driftwood Wand                      Adds 1 to 2 Cold Damage to Spells",
    "B B R    Heated Driftwood Wand                       Adds 1 to 3 Fire Damage to Spells",
    "B B R    Humming Driftwood Wand                      Adds 1 to 4 Lightning Damage to Spells",
    // movement speed
    "R R R    Runner's Rawhide Boots                      10% increased Movement Speed",
    "B B B    Sprinter's Goathide Boots                   15% increased Movement Speed",
    // Junk
    "R G B    Hale Fishscale Gauntlets of Absorption      +3 to maximum Life  +1 Mana gained on Kill",
    "R G B    Reinforced Iron Hat of the Cloud            Armour: 12   ArmourBasePercentile: 0 Crafted: true Quality: 20 Sockets: LevelReq: 2 Implicits: 0 16% increased Armour +8% to Lightning Resistance",
    "R G B    Squire's Crude Bow of Ire                   15% increased Physical Damage +10% to Global Critical Strike Multiplier +16 to Accuracy Rating",
    "R G G    Catalysing Driftwood Wand of Skill          7% increased Attack Speed  17% increased Elemental Damage with Attack Skills",
    // 2 Link colours
    "R-R", "G-G", "B-B",
    "R-G", "G-R", "B-R", "R-B", "G-B", "B-G",
    // 3 Link colours
    "R-R-R", "R-R-G", "R-G-R", "G-R-R", "R-R-B", "R-B-R", "B-R-R",
    "G-G-G", "G-G-R", "G-R-G", "R-G-G", "G-G-B", "G-B-G", "B-G-G",
    "B-B-B", "B-B-G", "B-G-B", "G-B-B", "B-B-R", "B-R-B", "R-B-B",
    // 4 Link colours
    "R-R-R-R", "G-G-G-G", "B-B-B-B",

].map(v => v.toLowerCase());

const testData = baseTest.concat(generatedItemsLevel15).concat(generatedItemsLevel40);

function getDefaultSettings(): PoeStringSettings {
    return {
        anyThreeLink: false,
        anyFourLink: false,
        movement: {ten: false, fifteen: false,},
        colors: {
            rrr: false, ggg: false, bbb: false,
            rrA: false, ggA: false, bbA: false,
            ggr: false, ggb: false, rrg: false, rrb: false, bbg: false, bbr: false,
            rgb: false, raa: false, gaa: false, baa: false,
            rr: false, gg: false, bb: false,
            rb: false, gr: false, bg: false,
        },
        plusGems: {
            lightning: false,
            fire: false,
            cold: false,
            phys: false,
            chaos: false,
            any: false,
        },
        damage: {phys: false, elemental: false, spellFlat: false, spellDamage: false,}
    }
}

function strWithSettings(settings: any): string {
    const s: PoeStringSettings = {...getDefaultSettings(), ...settings};
    // lower casing as PoE client is case insensitive
    // remove " as these are used for grouping together and not in the search
    return generateResultString(s).toLowerCase().replaceAll("\"", "");
}

function expectN(n: number, setting: any) {
    const query = strWithSettings(setting);
    const strings = testData.filter(v => v.toLowerCase().match(RegExp(query)));
    expect(strings.length).toEqual(n);
}

it("Three links should match four links", () => {
    expectN(6, {colors: {ggg: true, rrr: true, bbb: true,}});
});

it("any 3L should match all linked colours", () => {
    expectN(24, {anyThreeLink: true});
});

it("3L colours", () => {
    expectN(2, {colors: {ggg: true}});
    expectN(2, {colors: {bbb: true}});
    expectN(2, {colors: {rrr: true}});

    expectN(3, {colors: {ggr: true}});
    expectN(3, {colors: {ggb: true}});
    expectN(3, {colors: {rrg: true}});
    expectN(3, {colors: {rrb: true}});
    expectN(3, {colors: {bbr: true}});
    expectN(3, {colors: {bbg: true}});

    expectN(6, {colors: {bbg: true, bbr: true}});
    expectN(6, {colors: {ggr: true, ggb: true}});
    expectN(6, {colors: {rrg: true, rrb: true}});

    expectN(6, {colors: {bbr: true, rrb: true}});
    expectN(6, {colors: {ggb: true, ggr: true}});

    expectN(9, {colors: {rrg: true, rrb: true, bbr: true}});

    expectN(9, {colors: {rrg: true, rrb: true, bbr: true}});
});

it("3L with any colours", () => {
    expectN(8, {colors: {ggA: true}});
    expectN(8, {colors: {bbA: true}});
    expectN(8, {colors: {rrA: true}});

    expectN(16, {colors: {ggA: true, bbA: true}});
    expectN(16, {colors: {rrA: true, bbA: true}});
    expectN(16, {colors: {rrA: true, ggA: true}});

    expectN(24, {colors: {rrA: true, ggA: true, bbA: true}});

    expectN(14, {colors: {gaa: true}});
    expectN(14, {colors: {baa: true}});
    expectN(14, {colors: {raa: true}});

    expectN(22, {colors: {raa: true, baa: true }});
    expectN(22, {colors: {gaa: true, baa: true }});
    expectN(22, {colors: {gaa: true, raa: true }});

    expectN(24, {colors: {gaa: true, raa: true, baa: true }});

    expectN(14, {colors: {gga: true, baa: true }});
    expectN(22, {colors: {gga: true, baa: true, raa: true }});
});


it("match movement speed", () => {
    expectN(1, {movement: {ten: true}});
    expectN(1, {movement: {fifteen: true}});
});

it("damage", () => {
    expectN(6, {damage: { elemental: true }});
    expectN(2, {damage: { phys: true }});
    expectN(1, {damage: { spellDamage: true }});
});

it("match skill gems", () => {
    const queries = [{lightning: true}, {cold: true}, {fire: true}, {chaos: true}, {phys: true}];
    const results = queries.map(q => testData.filter(v => v.match(strWithSettings({plusGems: {...q}}))));
    results.forEach(r => {
        expect(r.length).toEqual(1);
    });
    const queryAllChecked = strWithSettings({
        plusGems: {
            lightning: true,
            fire: true,
            cold: true,
            phys: true,
            chaos: true,
        }
    });
    const queryAnyChecked = strWithSettings({
        plusGems: {
            any: true,
        }
    });
    expect(queryAnyChecked).toEqual(queryAllChecked);
    const result = testData.filter(v => v.match(RegExp(queryAllChecked)))
    expect(result.length).toEqual(5);
});