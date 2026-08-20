import { generateNumberRegex } from "./GenerateNumberRegex";
import { generateBoundedValueRegex, generateNumberRangeRegex } from "./GenerateNumberRegex";

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

// In this codebase `.` in the generated regex stands for "any digit"
// (it gets replaced with `\d` downstream), so mirror that when testing.
const toMatcher = (regex: string) =>
  new RegExp(`^(?:${regex.replace(/\./g, "\\d")})$`);

describe("generateNumberRangeRegex", () => {
  describe("produces compact output", () => {
    const cases: [string, string, string][] = [
      ["23", "27", "2[3-7]"],
      ["20", "29", "2."],
      ["10", "99", "[1-9]."],
      ["15", "42", "(1[5-9]|[2-3].|4[0-2])"],
      ["15", "40", "(1[5-9]|[2-3].|40)"],
      ["19", "30", "(19|2.|30)"],
      ["30", "50", "([3-4].|50)"],
      ["30", "59", "[3-5]."],
      ["23", "23", "23"],
      // single-digit ranges
      ["3", "7", "[3-7]"],
      ["5", "5", "5"],
      ["0", "9", "."],
      // ranges spanning single and double digits
      ["5", "20", "([5-9]|1.|20)"],
      ["8", "12", "([8-9]|1[0-2])"],
      ["1", "99", "([1-9]|[1-9].)"],
    ];
    test.each(cases)("%s-%s -> %s", (min, max, expected) => {
      expect(generateNumberRangeRegex(min, max, false)).toBe(expected);
    });
  });

  test("matches exactly the integers within the range for every 1-2 digit range", () => {
    for (let lo = 1; lo <= 99; lo++) {
      for (let hi = lo; hi <= 99; hi++) {
        const matcher = toMatcher(
          generateNumberRangeRegex(String(lo), String(hi), false),
        );
        for (let n = 1; n <= 99; n++) {
          expect(matcher.test(String(n))).toBe(n >= lo && n <= hi);
        }
      }
    }
  });

  describe("round10 floors both bounds to the nearest ten", () => {
    test("floors min and max before building the range", () => {
      expect(generateNumberRangeRegex("25", "48", true)).toBe("([2-3].|40)");
    });
    test("collapses to a single value when both round to the same ten", () => {
      expect(generateNumberRangeRegex("25", "29", true)).toBe("20");
    });
  });

  describe("ignores non-digit characters in the input", () => {
    test("parses values out of surrounding text", () => {
      expect(generateNumberRangeRegex("+23%", "27", false)).toBe("2[3-7]");
    });
  });

  describe("only supports 1-2 digit numbers", () => {
    test("returns empty for 3-digit input", () => {
      expect(generateNumberRangeRegex("100", "200", false)).toBe("");
      expect(generateNumberRangeRegex("10", "150", false)).toBe("");
    });
  });

  describe("returns empty for invalid input", () => {
    test("returns empty when no digits are present", () => {
      expect(generateNumberRangeRegex("abc", "27", false)).toBe("");
    });
    test("returns empty when max is below min", () => {
      expect(generateNumberRangeRegex("50", "30", false)).toBe("");
    });
  });
});

describe("generateBoundedValueRegex", () => {
  test("anchors the bounded range on the opening parenthesis", () => {
    expect(generateBoundedValueRegex("45", "45", false)).toBe("45\\(");
    expect(generateBoundedValueRegex("45", "50", false)).toBe("(4[5-9]|50)\\(");
  });

  test("turns digit-dots into \\d so it never matches the range itself", () => {
    expect(generateBoundedValueRegex("10", "99", false)).toBe("[1-9]\\d\\(");
  });

  test("falls back to an open-ended >= match for 3-digit rolls", () => {
    const fallback = generateNumberRegex("120", false).replace(/\./g, "\\d");
    expect(generateBoundedValueRegex("120", "150", false)).toBe(`${fallback}\\(`);
  });

  test("matches the rolled value but not a number inside the range", () => {
    const regex = `${generateBoundedValueRegex("45", "45", false)}.*spi`;
    expect(new RegExp(regex, "i").test("+38(38-45) to Spirit")).toBe(false);
    expect(new RegExp(regex, "i").test("+45(38-45) to Spirit")).toBe(true);
  });
});
