import {
  generatePriceNoteRegex,
  isValidPriceNoteCurrencyInput,
  isValidPriceNoteMax,
  isValidPriceNoteMin,
  PriceNoteOptions,
} from "./PriceNoteRegex";

const base: PriceNoteOptions = {
  currency: "chaos",
  min: "",
  max: "100",
  optimize: false,
};

function priceNoteSearchRegex(options: PriceNoteOptions): RegExp {
  const regex = generatePriceNoteRegex(options);

  return new RegExp(regex.slice(1, -1));
}

function expectPriceNote(options: Partial<PriceNoteOptions>, regex: string): void {
  expect(generatePriceNoteRegex({...base, ...options})).toBe(regex);
}

describe("generatePriceNoteRegex - max price", () => {
  test.each([
    ["0", String.raw`"Note:.*? 0 chaos"`],
    ["5", String.raw`"Note:.*? [0-5] chaos"`],
    ["9", String.raw`"Note:.*? \d chaos"`],
    ["15", String.raw`"Note:.*? (\d|1[0-5]) chaos"`],
    ["42", String.raw`"Note:.*? (\d|[1-3]\d|4[0-2]) chaos"`],
    ["99", String.raw`"Note:.*? \d\d? chaos"`],
    ["100", String.raw`"Note:.*? (\d\d?|100) chaos"`],
    ["345", String.raw`"Note:.*? (\d\d?|[12]\d\d|3[0-3]\d|34[0-5]) chaos"`],
    ["999", String.raw`"Note:.*? \d\d?\d? chaos"`],
    ["1000", String.raw`"Note:.*? (\d\d?\d?|1000) chaos"`],
    ["1234", String.raw`"Note:.*? (\d\d?\d?|1[01]\d\d|12[0-2]\d|123[0-4]) chaos"`],
    ["9999", String.raw`"Note:.*? \d\d?\d?\d? chaos"`],
    ["200", String.raw`"Note:.*? (\d\d?|1\d\d|200) chaos"`],
    ["2000", String.raw`"Note:.*? (\d\d?\d?|1\d\d\d|2000) chaos"`],
  ])("<= %s", (max, regex) => {
    expectPriceNote({max}, regex);
  });
});

describe("generatePriceNoteRegex - currency input", () => {
  test("currency with surrounding space", () => {
    expectPriceNote({max: "9", currency: " chaos "}, String.raw`"Note:.*? \d chaos"`);
  });

  test.each(["ancient orb", "chaos2", "a.*+?"])(
    "currency %p returns empty string",
    (currency) => {
      expect(generatePriceNoteRegex({...base, max: "9", currency})).toBe("");
    },
  );
});

describe("generatePriceNoteRegex - decimal price guards", () => {
  test("does not match the number prefix of a decimal price", () => {
    const regex = priceNoteSearchRegex({...base, max: "1"});

    expect(regex.test("Note: ~b/o 1.5 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 1 chaos")).toBe(true);
  });

  test("does not match digits after the decimal point", () => {
    const regex = priceNoteSearchRegex({...base, max: "5"});

    expect(regex.test("Note: ~b/o 10.5 chaos")).toBe(false);
  });

  test("matches the max price", () => {
    const regex = priceNoteSearchRegex({...base, max: "10"});

    expect(regex.test("Note: ~b/o 10 chaos")).toBe(true);
  });

  test("does not match a larger number with the same prefix", () => {
    const regex = priceNoteSearchRegex({...base, max: "10"});

    expect(regex.test("Note: ~b/o 100 chaos")).toBe(false);
  });

  test("does not match five digits when max price has four digits", () => {
    const regex = priceNoteSearchRegex({...base, max: "9999"});

    expect(regex.test("Note: ~b/o 10000 chaos")).toBe(false);
  });

  test("matches with ~price prefix as well as ~b/o", () => {
    const regex = priceNoteSearchRegex({...base, max: "100"});

    expect(regex.test("Note: ~b/o 50 chaos")).toBe(true);
    expect(regex.test("Note: ~price 50 chaos")).toBe(true);
  });
});

describe("generatePriceNoteRegex - optimize flag", () => {
  test.each([
    ["max 42 without optimize", {max: "42", optimize: false}, String.raw`"Note:.*? (\d|[1-3]\d|4[0-2]) chaos"`],
    ["max 42 with optimize", {max: "42", optimize: true}, String.raw`"Note:.*? (\d|[1-3]\d|4\d) chaos"`],
    ["max 345 with optimize", {max: "345", optimize: true}, String.raw`"Note:.*? (\d\d?|[12]\d\d|3\d\d) chaos"`],
    ["max 1234 with optimize", {max: "1234", optimize: true}, String.raw`"Note:.*? (\d\d?\d?|1\d\d\d) chaos"`],
    ["max 99 with optimize", {max: "99", optimize: true}, String.raw`"Note:.*? \d\d? chaos"`],
    ["max 9999 with optimize", {max: "9999", optimize: true}, String.raw`"Note:.*? \d\d?\d?\d? chaos"`],
    ["single-digit max with optimize", {max: "5", optimize: true}, String.raw`"Note:.*? [0-5] chaos"`],
  ])("%s", (_name, options, regex) => {
    expectPriceNote(options, regex);
  });

  test("optimize=true matches values above the raw max but within the optimized range", () => {
    const regex = priceNoteSearchRegex({...base, max: "42", optimize: true});

    expect(regex.test("Note: ~b/o 42 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 49 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 50 chaos")).toBe(false);
  });
});

describe("generatePriceNoteRegex - min price", () => {
  test.each(["", "   ", "0"])("min %p uses max-only path", (min) => {
    expectPriceNote({min, max: "42"}, String.raw`"Note:.*? (\d|[1-3]\d|4[0-2]) chaos"`);
  });

  test("single-digit range returns a character class", () => {
    expectPriceNote({min: "3", max: "7"}, String.raw`"Note:.*? [3-7] chaos"`);
  });

  test.each(["7", "42", "1234", "9999"])("min == max returns exact price %s", (value) => {
    expectPriceNote({min: value, max: value}, `"Note:.*? ${value} chaos"`);
  });

  test("two-digit range with no shared prefix splits into min/max parts", () => {
    expectPriceNote({min: "15", max: "75"}, String.raw`"Note:.*? (1[5-9]|[2-6]\d|7[0-5]) chaos"`);
  });

  test("two-digit range with shared prefix returns one branch", () => {
    expectPriceNote({min: "15", max: "17"}, String.raw`"Note:.*? 1[5-7] chaos"`);
  });

  test("single-digit min with two-digit max", () => {
    expectPriceNote({min: "5", max: "50"}, String.raw`"Note:.*? ([5-9]|[1-4]\d|50) chaos"`);
  });

  test("two-digit min with three-digit max", () => {
    expectPriceNote({min: "50", max: "200"}, String.raw`"Note:.*? ([5-9]\d|1\d\d|200) chaos"`);
  });

  test("full 1..9999 range", () => {
    expectPriceNote({min: "1", max: "9999"}, String.raw`"Note:.*? [1-9]\d?\d?\d? chaos"`);
  });

  test.each([
    ["min greater than max", {min: "50", max: "10"}],
    ["invalid min text", {min: "chaos", max: "100"}],
    ["decimal min", {min: "1.5", max: "100"}],
    ["min below 0", {min: "-5", max: "100"}],
    ["min over 9999", {min: "10000", max: "20000"}],
  ])("%s returns empty string", (_name, options) => {
    expectPriceNote(options, "");
  });

  test("range values do not match prices below the min price", () => {
    const regex = priceNoteSearchRegex({...base, min: "10", max: "50"});

    expect(regex.test("Note: ~b/o 9 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 10 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 50 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 51 chaos")).toBe(false);
  });

  test("min set with empty max returns a min-only range", () => {
    expectPriceNote({min: "10", max: ""}, String.raw`"Note:.*? ([1-9]\d|\d\d\d\d*) chaos"`);
  });

  test("min set with space-only max uses empty max path", () => {
    expectPriceNote({min: "10", max: "   "}, String.raw`"Note:.*? ([1-9]\d|\d\d\d\d*) chaos"`);
  });

  test("single-digit min with empty max uses shorter regex for higher digit lengths", () => {
    expectPriceNote({currency: "div", min: "4", max: ""}, String.raw`"Note:.*? ([4-9]|\d\d\d*) div"`);
  });

  test("min-only filter matches prices above 9999", () => {
    const regex = priceNoteSearchRegex({...base, min: "10", max: ""});

    expect(regex.test("Note: ~b/o 9 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 10 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 1234 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 9999 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 10000 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 123456 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 10.5 chaos")).toBe(false);
  });

  // For 1..234 the L=3 piece is "2" + (0\d|[12]\d|3[0-4]). Without grouping the
  // branch regex, the "2" prefix only applies to the first branch, so 10..29 +
  // 30..34 would match while 210..234 would not.
  test("1..234 uses prefix grouping in the max price", () => {
    expectPriceNote({min: "1", max: "234"}, String.raw`"Note:.*? ([1-9]\d?|1\d\d|2([0-2]\d|3[0-4])) chaos"`);
  });

  test("min..max range matches every value in [1,234] and does not match values below and above", () => {
    const regex = priceNoteSearchRegex({...base, min: "1", max: "234"});

    for (let n = 1; n <= 234; n++) {
      expect(regex.test(`Note: ~b/o ${n} chaos`)).toBe(true);
    }
    expect(regex.test("Note: ~b/o 0 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 235 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 999 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 1234 chaos")).toBe(false);
  });

  // Same grouping issue on the min side: "1" + (5[6-9]|[6-9]\d) must include its "1" prefix on every branch,
  // Without grouping, 60..99 would match even though min=156.
  test("156..900 uses prefix grouping in the min price", () => {
    expectPriceNote({min: "156", max: "900"}, String.raw`"Note:.*? (1(5[6-9]|[6-9]\d)|[2-8]\d\d|900) chaos"`);
  });

  test("min..max range matches every value in [156,900] and does not match values below and above", () => {
    const regex = priceNoteSearchRegex({...base, min: "156", max: "900"});

    expect(regex.test("Note: ~b/o 60 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 90 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 155 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 156 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 500 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 900 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 901 chaos")).toBe(false);
  });

  // Max price includes the full remaining range, so it uses the shared char class.
  test("12..99 uses the shared digit class for a full max price", () => {
    expectPriceNote({min: "12", max: "99"}, String.raw`"Note:.*? (1[2-9]|[2-9]\d) chaos"`);
  });

  // Min price includes the full remaining range, so it uses the shared char class.
  test("1000..3000 uses the shared digit class for a full min price", () => {
    expectPriceNote({min: "1000", max: "3000"}, String.raw`"Note:.*? ([12]\d\d\d|3000) chaos"`);
  });

  test("12..3000 uses shared digit classes across lengths", () => {
    expectPriceNote({min: "12", max: "3000"}, String.raw`"Note:.*? (1[2-9]|[2-9]\d|[1-9]\d\d|[12]\d\d\d|3000) chaos"`);
  });

  test("12..3000 matches every value in the range and does not match values below and above", () => {
    const regex = priceNoteSearchRegex({...base, min: "12", max: "3000"});

    expect(regex.test("Note: ~b/o 11 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 12 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 99 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 100 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 999 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 1000 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 2999 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 3000 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 3001 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 9999 chaos")).toBe(false);
  });

  test("10..37 uses shared class and exact max digits", () => {
    expectPriceNote({min: "10", max: "37"}, String.raw`"Note:.*? ([12]\d|3[0-7]) chaos"`);
  });

  test("150..999 uses exact min digits and shared class", () => {
    expectPriceNote({min: "150", max: "999"}, String.raw`"Note:.*? (1[5-9]\d|[2-9]\d\d) chaos"`);
  });

  // Decimal-price guard must still apply under a min/max range, not only max-only.
  test("decimal price does not match under a min/max range", () => {
    const regex = priceNoteSearchRegex({...base, min: "10", max: "50"});

    expect(regex.test("Note: ~b/o 10.5 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 25.0 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 25 chaos")).toBe(true);
  });

  // min "0" is non-empty so the both-empty guard does not run; uses the \d\d* fallback.
  test('min "0" with empty max returns the min-only any-digit form', () => {
    expectPriceNote({min: "0", max: ""}, String.raw`"Note:.*? \d\d* chaos"`);
  });
});

describe("generatePriceNoteRegex - min with optimize", () => {
  test.each([
    ["min and max", {min: "23", max: "75", optimize: true}, String.raw`"Note:.*? [2-7]\d chaos"`],
    ["single-digit min exact", {min: "5", max: "9", optimize: true}, String.raw`"Note:.*? [5-9] chaos"`],
    ["min-only path", {min: "23", max: "", optimize: true}, String.raw`"Note:.*? ([2-9]\d|\d\d\d\d*) chaos"`],
  ])("optimize %s", (_name, options, regex) => {
    expectPriceNote(options, regex);
  });

  test("optimize matches 20..79 for min 23 max 75", () => {
    const regex = priceNoteSearchRegex({...base, min: "23", max: "75", optimize: true});

    expect(regex.test("Note: ~b/o 19 chaos")).toBe(false);
    expect(regex.test("Note: ~b/o 20 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 23 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 75 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 79 chaos")).toBe(true);
    expect(regex.test("Note: ~b/o 80 chaos")).toBe(false);
  });

});

describe("generatePriceNoteRegex - small range simplification", () => {
  test.each([
    ["min 8 collapses [8-9] to [89]", {min: "8", max: ""}, String.raw`"Note:.*? ([89]|\d\d\d*) chaos"`],
    ["min 8 max 9 collapses [8-9] to [89]", {min: "8", max: "9"}, String.raw`"Note:.*? [89] chaos"`],
    ["min 1 max 2 collapses [1-2] to [12]", {min: "1", max: "2"}, String.raw`"Note:.*? [12] chaos"`],
  ])("%s", (_name, options, regex) => {
    expectPriceNote(options, regex);
  });
});

describe("generatePriceNoteRegex - invalid input", () => {
  test.each([
    ["empty currency", {currency: ""}],
    ["space-only currency", {currency: "   "}],
    ["invalid max", {max: "chaos"}],
    ["both min and max empty", {min: "", max: ""}],
    ["both min and max space-only", {min: "  ", max: "  "}],
  ])("%s returns empty string", (_name, options) => {
    expectPriceNote(options, "");
  });
});

describe("isValidPriceNoteCurrencyInput", () => {
  test.each(["", "chaos", "Divine", "EXALTED"])("valid %p", (raw) => {
    expect(isValidPriceNoteCurrencyInput(raw)).toBe(true);
  });

  test.each(["chaos2", "ancient orb", "a.*+?", "1"])("invalid %p", (raw) => {
    expect(isValidPriceNoteCurrencyInput(raw)).toBe(false);
  });
});

describe.each([
  {
    name: "isValidPriceNoteMax",
    isValid: isValidPriceNoteMax,
    valid: ["", "   ", "250", " 250 ", "9999"],
    invalid: ["chaos", "1.5", "-5", "10000"],
  },
  {
    name: "isValidPriceNoteMin",
    isValid: isValidPriceNoteMin,
    valid: ["", "   ", "50", " 50 ", "9999"],
    invalid: ["chaos", "1.5", "-5", "10000"],
  },
])("$name", ({isValid, valid, invalid}) => {
  test.each(valid)("valid %p", (raw) => {
    expect(isValid(raw)).toBe(true);
  });

  test.each(invalid)("invalid %p", (raw) => {
    expect(isValid(raw)).toBe(false);
  });
});
