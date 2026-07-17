import { generateNumberRegex } from "./GenerateNumberRegex";

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
