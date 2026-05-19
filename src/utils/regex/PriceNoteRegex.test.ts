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

function priceNoteSearchRegex(options: Partial<PriceNoteOptions>): RegExp {
  const regex = generatePriceNoteRegex({...base, ...options});
  expect(regex).not.toBe("");

  return new RegExp(regex.slice(1, -1));
}

function expectMatches(options: Partial<PriceNoteOptions>, notes: string[]): void {
  const regex = priceNoteSearchRegex(options);
  notes.forEach((note) => expect(regex.test(note)).toBe(true));
}

function expectNotMatches(options: Partial<PriceNoteOptions>, notes: string[]): void {
  const regex = priceNoteSearchRegex(options);
  notes.forEach((note) => expect(regex.test(note)).toBe(false));
}

function expectNoPriceNote(options: Partial<PriceNoteOptions>): void {
  expect(generatePriceNoteRegex({...base, ...options})).toBe("");
}

describe("generatePriceNoteRegex - max price", () => {
  test("matches prices up to the max and rejects larger integer prices", () => {
    const options = {max: "42"};

    expectMatches(options, [
      "Note: ~b/o 0 chaos",
      "Note: ~b/o 9 chaos",
      "Note: ~b/o 42 chaos",
      "Note: ~price 42 chaos",
    ]);
    expectNotMatches(options, [
      "Note: ~b/o 43 chaos",
      "Note: ~b/o 100 chaos",
      "Note: ~b/o 42 divine",
    ]);
  });

  test("does not match decimal price prefixes", () => {
    expectNotMatches(
      {max: "10"},
      ["Note: ~b/o 1.5 chaos", "Note: ~b/o 10.5 chaos", "Note: ~b/o 100 chaos"],
    );
  });

  test("three digit max does not match four digit prices", () => {
    expectMatches({max: "999"}, ["Note: ~b/o 999 chaos"]);
    expectNotMatches({max: "999"}, ["Note: ~b/o 1000 chaos"]);
  });
});

describe("generatePriceNoteRegex - min and max price", () => {
  test("matches the inclusive range and rejects values outside it", () => {
    const options = {min: "10", max: "50"};

    expectMatches(options, [
      "Note: ~b/o 10 chaos",
      "Note: ~b/o 25 chaos",
      "Note: ~price 50 chaos",
    ]);
    expectNotMatches(options, [
      "Note: ~b/o 9 chaos",
      "Note: ~b/o 51 chaos",
      "Note: ~b/o 10.5 chaos",
    ]);
  });

  test.each([
    [{min: "1", max: "234"}, ["Note: ~b/o 1 chaos", "Note: ~b/o 123 chaos", "Note: ~b/o 234 chaos"], ["Note: ~b/o 0 chaos", "Note: ~b/o 235 chaos"]],
    [{min: "156", max: "900"}, ["Note: ~b/o 156 chaos", "Note: ~b/o 500 chaos", "Note: ~b/o 900 chaos"], ["Note: ~b/o 155 chaos", "Note: ~b/o 901 chaos"]],
    [{min: "12", max: "999"}, ["Note: ~b/o 12 chaos", "Note: ~b/o 500 chaos", "Note: ~b/o 999 chaos"], ["Note: ~b/o 11 chaos", "Note: ~b/o 1000 chaos"]],
  ])("handles grouped range branches for %p", (options, matches, misses) => {
    expectMatches(options, matches);
    expectNotMatches(options, misses);
  });

  test.each(["7", "42", "999"])("min == max matches only exact price %s", (value) => {
    expectMatches({min: value, max: value}, [`Note: ~b/o ${value} chaos`]);
    expectNotMatches({min: value, max: value}, [`Note: ~b/o ${Number(value) + 1} chaos`]);
  });
});

describe("generatePriceNoteRegex - min-only price", () => {
  test("matches the min and higher prices", () => {
    const options = {min: "10", max: ""};

    expectMatches(options, [
      "Note: ~b/o 10 chaos",
      "Note: ~b/o 999 chaos",
    ]);
    expectNotMatches(options, [
      "Note: ~b/o 9 chaos",
      "Note: ~b/o 1000 chaos",
      "Note: ~b/o 10.5 chaos",
    ]);
  });

  test('min "0" with empty max matches integer prices', () => {
    expectMatches({min: "0", max: ""}, ["Note: ~b/o 0 chaos", "Note: ~b/o 123 chaos"]);
  });
});

describe("generatePriceNoteRegex - optimize flag", () => {
  test("max-only optimize rounds the upper bound up by leading digit", () => {
    const options = {max: "42", optimize: true};

    expectMatches(options, ["Note: ~b/o 42 chaos", "Note: ~b/o 49 chaos"]);
    expectNotMatches(options, ["Note: ~b/o 50 chaos"]);
  });

  test("min/max optimize rounds lower and upper bounds outward", () => {
    const options = {min: "23", max: "75", optimize: true};

    expectMatches(options, [
      "Note: ~b/o 20 chaos",
      "Note: ~b/o 23 chaos",
      "Note: ~b/o 75 chaos",
      "Note: ~b/o 79 chaos",
    ]);
    expectNotMatches(options, ["Note: ~b/o 19 chaos", "Note: ~b/o 80 chaos"]);
  });

  test("min-only optimize rounds the lower bound down", () => {
    const options = {min: "23", max: "", optimize: true};

    expectMatches(options, ["Note: ~b/o 20 chaos", "Note: ~b/o 23 chaos"]);
    expectNotMatches(options, ["Note: ~b/o 19 chaos"]);
  });
});

describe("generatePriceNoteRegex - invalid input", () => {
  test("trims currency before building the filter", () => {
    expectMatches({max: "9", currency: " chaos "}, ["Note: ~b/o 9 chaos"]);
  });

  test.each([
    ["empty currency", {currency: ""}],
    ["space-only currency", {currency: "   "}],
    ["currency with space", {currency: "ancient orb"}],
    ["currency with digits", {currency: "chaos2"}],
    ["invalid max", {max: "chaos"}],
    ["decimal max", {max: "1.5"}],
    ["max over 999", {max: "1000"}],
    ["invalid min", {min: "chaos", max: "100"}],
    ["decimal min", {min: "1.5", max: "100"}],
    ["min over 999", {min: "1000", max: "1000"}],
    ["min greater than max", {min: "50", max: "10"}],
    ["both min and max empty", {min: "", max: ""}],
    ["both min and max space-only", {min: "  ", max: "  "}],
  ])("%s returns empty string", (_name, options) => {
    expectNoPriceNote(options);
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
    valid: ["", "   ", "250", " 250 ", "999"],
    invalid: ["chaos", "1.5", "-5", "1000"],
  },
  {
    name: "isValidPriceNoteMin",
    isValid: isValidPriceNoteMin,
    valid: ["", "   ", "50", " 50 ", "999"],
    invalid: ["chaos", "1.5", "-5", "1000"],
  },
])("$name", ({isValid, valid, invalid}) => {
  test.each(valid)("valid %p", (raw) => {
    expect(isValid(raw)).toBe(true);
  });

  test.each(invalid)("invalid %p", (raw) => {
    expect(isValid(raw)).toBe(false);
  });
});
