import {generateIntegerMinRegex, generateIntegerRangeRegex, generateNumberRegex} from "./GenerateNumberRegex";

const testRegex = (n: number, optimize = false) => {
  const r = generateNumberRegex(String(n), optimize);
  return r ? new RegExp("^" + r + "$") : null;
};

describe("generateNumberRegex", () => {
  describe("regressions", () => {
    test("min=290 does not over-match values below the minimum (was [2-9]..)", () => {
      const re = testRegex(290)!;
      for (let v = 200; v < 290; v++) {
        expect(re.test(String(v))).toBe(false);
      }
      for (let v = 290; v <= 999; v++) {
        expect(re.test(String(v))).toBe(true);
      }
    });

    test("min=175 matches 200-999 (was [12]([7-9][5-9]|[8-9].) missing 300+)", () => {
      const re = testRegex(175)!;
      for (let v = 175; v <= 999; v++) {
        expect(re.test(String(v))).toBe(true);
      }
    });

    test("min=185 matches 200-999", () => {
      const re = testRegex(185)!;
      for (let v = 185; v <= 999; v++) {
        expect(re.test(String(v))).toBe(true);
      }
    });

    test("min=105 matches X00 values like 200, 300, ..., 900 (was missing via \\d[1-9].)", () => {
      const re = testRegex(105)!;
      [200, 300, 400, 500, 600, 700, 800, 900].forEach((v) => {
        expect(re.test(String(v))).toBe(true);
      });
    });
  });

  describe("exact-hundred minimums collapse to compact form", () => {
    test.each([
      [100, "[1-9].."],
      [200, "[2-9].."],
      [500, "[5-9].."],
      [900, "9.."],
    ])("min=%i produces %s", (n, expected) => {
      expect(generateNumberRegex(String(n), false)).toBe(expected);
    });
  });

  describe("edge cases", () => {
    test("min=999 only matches 999", () => {
      const re = testRegex(999)!;
      expect(re.test("999")).toBe(true);
      expect(re.test("998")).toBe(false);
      expect(re.test("100")).toBe(false);
    });

    test("min=990 matches 990-999", () => {
      const re = testRegex(990)!;
      for (let v = 990; v <= 999; v++) expect(re.test(String(v))).toBe(true);
      expect(re.test("989")).toBe(false);
    });

    test("empty input returns empty string", () => {
      expect(generateNumberRegex("", false)).toBe("");
      expect(generateNumberRegex("abc", false)).toBe("");
    });

    test("zero input returns empty string", () => {
      expect(generateNumberRegex("0", false)).toBe("");
    });

    test("optimize=true with single digit returns wildcard", () => {
      expect(generateNumberRegex("5", true)).toBe(".");
    });
  });

  describe("exhaustive correctness sweep (1-999)", () => {
    test("every minimum n produces a regex that matches exactly v>=n for v in 1..999", () => {
      const failures: string[] = [];
      for (let n = 1; n <= 999; n++) {
        const r = generateNumberRegex(String(n), false);
        if (!r) {
          failures.push(`n=${n} produced empty regex`);
          continue;
        }
        const re = new RegExp("^" + r + "$");
        for (let v = 1; v <= 999; v++) {
          const should = v >= n;
          const does = re.test(String(v));
          if (should !== does) {
            failures.push(`n=${n} v=${v} should=${should} does=${does} re=${r}`);
            if (failures.length > 10) break;
          }
        }
        if (failures.length > 10) break;
      }
      expect(failures).toEqual([]);
    });

    test("with optimize=true, every minimum produces a correct regex for its rounded-down tens floor", () => {
      const failures: string[] = [];
      for (let n = 10; n <= 999; n++) {
        const r = generateNumberRegex(String(n), true);
        if (!r) {
          failures.push(`n=${n} produced empty regex`);
          continue;
        }
        const re = new RegExp("^" + r + "$");
        const effectiveMin = Math.floor(n / 10) * 10;
        for (let v = 1; v <= 999; v++) {
          const should = v >= effectiveMin;
          const does = re.test(String(v));
          if (should !== does) {
            failures.push(`n=${n} (effectiveMin=${effectiveMin}) v=${v} should=${should} does=${does} re=${r}`);
            if (failures.length > 10) break;
          }
        }
        if (failures.length > 10) break;
      }
      expect(failures).toEqual([]);
    });
  });

  describe("output length stays compact", () => {
    test("no output exceeds 30 characters for inputs 1-999", () => {
      const oversized: { n: number; r: string }[] = [];
      for (let n = 1; n <= 999; n++) {
        const r = generateNumberRegex(String(n), false);
        if (r.length > 30) oversized.push({ n, r });
      }
      expect(oversized).toEqual([]);
    });
  });
});

describe("generateIntegerRangeRegex", () => {
  const testRangeRegex = (min: number, max: number) =>
    new RegExp("^(?:" + generateIntegerRangeRegex(min, max) + ")$");

  test.each([
    [0, 42, [0, 9, 42], [43, 100]],
    [10, 50, [10, 25, 50], [9, 51]],
    [156, 900, [156, 500, 900], [155, 901]],
    [12, 3000, [12, 999, 3000], [11, 3001]],
  ])("matches %i..%i inclusively", (min, max, matches, misses) => {
    const re = testRangeRegex(min, max);

    matches.forEach((value) => expect(re.test(String(value))).toBe(true));
    misses.forEach((value) => expect(re.test(String(value))).toBe(false));
  });

  test("returns empty string for invalid ranges", () => {
    expect(generateIntegerRangeRegex(50, 10)).toBe("");
    expect(generateIntegerRangeRegex(0, 10000)).toBe("");
  });

  test.each([
    [0, 42],
    [1, 234],
    [10, 50],
    [156, 900],
    [1000, 3000],
    [12, 3000],
    [9999, 9999],
  ])("matches exactly every integer in %i..%i", (min, max) => {
    const re = testRangeRegex(min, max);
    const failures: string[] = [];

    for (let value = 0; value <= 9999; value++) {
      const shouldMatch = value >= min && value <= max;
      const matches = re.test(String(value));
      if (matches !== shouldMatch) {
        failures.push(`value=${value} should=${shouldMatch} matches=${matches}`);
        if (failures.length > 10) break;
      }
    }

    expect(failures).toEqual([]);
  });
});

describe("generateIntegerMinRegex", () => {
  test("matches the minimum and higher digit lengths", () => {
    const re = new RegExp("^(?:" + generateIntegerMinRegex(10) + ")$");

    expect(re.test("9")).toBe(false);
    expect(re.test("10")).toBe(true);
    expect(re.test("9999")).toBe(true);
    expect(re.test("10000")).toBe(true);
  });

  test("returns empty string for unsupported minimums", () => {
    expect(generateIntegerMinRegex(10000)).toBe("");
  });
});
