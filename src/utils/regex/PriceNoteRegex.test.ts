import {generatePriceNoteRegex, PriceNoteOptions} from "./PriceNoteRegex";

const base: PriceNoteOptions = {
  enabled: true,
  currency: "chaos",
  max: "100",
};

describe("generatePriceNoteRegex - integer max bounds", () => {
  test("<= 0", () => {
    expect(generatePriceNoteRegex({...base, max: "0"}))
      .toBe(String.raw`"Note:.*?\b0\b.*chaos"`);
  });

  test("<= 5 (small single-digit)", () => {
    expect(generatePriceNoteRegex({...base, max: "5"}))
      .toBe(String.raw`"Note:.*?\b[0-5]\b.*chaos"`);
  });

  test("<= 9", () => {
    expect(generatePriceNoteRegex({...base, max: "9"}))
      .toBe(String.raw`"Note:.*?\b\d\b.*chaos"`);
  });

  test("<= 15 (intermediate with tens=1)", () => {
    expect(generatePriceNoteRegex({...base, max: "15"}))
      .toBe(String.raw`"Note:.*?\b(\d|1[0-5])\b.*chaos"`);
  });

  test("<= 42 (general two-digit case)", () => {
    expect(generatePriceNoteRegex({...base, max: "42"}))
      .toBe(String.raw`"Note:.*?\b(\d|[1-3]\d|4[0-2])\b.*chaos"`);
  });

  test("<= 99", () => {
    expect(generatePriceNoteRegex({...base, max: "99"}))
      .toBe(String.raw`"Note:.*?\b[1-9]?\d\b.*chaos"`);
  });

  test("<= 100", () => {
    expect(generatePriceNoteRegex({...base, max: "100"}))
      .toBe(String.raw`"Note:.*?\b([1-9]?\d|100)\b.*chaos"`);
  });

  test("<= 110 (three-digit, tens=1, units=0)", () => {
    expect(generatePriceNoteRegex({...base, max: "110"}))
      .toBe(String.raw`"Note:.*?\b([1-9]?\d|10\d|110)\b.*chaos"`);
  });

  test("<= 200 (round hundred)", () => {
    expect(generatePriceNoteRegex({...base, max: "200"}))
      .toBe(String.raw`"Note:.*?\b([1-9]?\d|1\d\d|200)\b.*chaos"`);
  });

  test("<= 345 (general three-digit)", () => {
    expect(generatePriceNoteRegex({...base, max: "345"}))
      .toBe(String.raw`"Note:.*?\b([1-9]?\d|[1-2]\d\d|3[0-3]\d|34[0-5])\b.*chaos"`);
  });

  test("<= 500 (mid round hundred)", () => {
    expect(generatePriceNoteRegex({...base, max: "500"}))
      .toBe(String.raw`"Note:.*?\b([1-9]?\d|[1-4]\d\d|500)\b.*chaos"`);
  });

  test("<= 999 (upper boundary)", () => {
    expect(generatePriceNoteRegex({...base, max: "999"}))
      .toBe(String.raw`"Note:.*?\b([1-9]?\d|[1-9]\d\d)\b.*chaos"`);
  });
});

describe("generatePriceNoteRegex - currency escaping", () => {
  test("currency with space is preserved as-is", () => {
    expect(generatePriceNoteRegex({...base, max: "9", currency: "ancient orb"}))
      .toBe(String.raw`"Note:.*?\b\d\b.*ancient orb"`);
  });

  test("currency with regex dot is escaped", () => {
    expect(generatePriceNoteRegex({...base, max: "9", currency: "a.b"}))
      .toBe(String.raw`"Note:.*?\b\d\b.*a\.b"`);
  });

  test("currency with parens is escaped", () => {
    expect(generatePriceNoteRegex({...base, max: "9", currency: "(test)"}))
      .toBe(String.raw`"Note:.*?\b\d\b.*\(test\)"`);
  });

  test("currency with multiple metacharacters is escaped", () => {
    expect(generatePriceNoteRegex({...base, max: "9", currency: "a.*+?"}))
      .toBe(String.raw`"Note:.*?\b\d\b.*a\.\*\+\?"`);
  });
});

describe("generatePriceNoteRegex - disabled or invalid input", () => {
  test("disabled returns empty string", () => {
    expect(generatePriceNoteRegex({...base, enabled: false})).toBe("");
  });

  test("empty currency returns empty string", () => {
    expect(generatePriceNoteRegex({...base, currency: ""})).toBe("");
  });

  test("whitespace-only currency returns empty string", () => {
    expect(generatePriceNoteRegex({...base, currency: "   "})).toBe("");
  });

  test("empty max returns empty string", () => {
    expect(generatePriceNoteRegex({...base, max: ""})).toBe("");
  });

  test("non-numeric max returns empty string", () => {
    expect(generatePriceNoteRegex({...base, max: "abc"})).toBe("");
  });

  test("decimal max returns empty string (integer-only)", () => {
    expect(generatePriceNoteRegex({...base, max: "1.5"})).toBe("");
  });

  test("negative max returns empty string", () => {
    expect(generatePriceNoteRegex({...base, max: "-5"})).toBe("");
  });

  test("max above 999 returns empty string", () => {
    expect(generatePriceNoteRegex({...base, max: "1000"})).toBe("");
  });
});
