import {tattooRegex} from "./GeneratedTattoo";

// Help text rendered on every tattoo in-game. Source: screenshot in
// https://github.com/veiset/poe-vendor-string/issues/338.
const SHARED_HELP_TEXT =
  "Right click this item then left click an allocated Passive Skill. " +
  "Maximum 50 Tattoos. Shift click to unstack.";

const fullSearchableText = (t: {tattoo: string; description: string}) =>
  `${t.tattoo}\n${t.description}\n${SHARED_HELP_TEXT}`;

describe("tattoo regex invariants (#338)", () => {
  test("no tattoo regex matches the shared in-game help text", () => {
    const collisions: string[] = [];
    for (const t of tattooRegex) {
      const re = new RegExp(t.regex, "i");
      if (re.test(SHARED_HELP_TEXT)) {
        collisions.push(`${t.tattoo} (regex="${t.regex}") matches shared help text`);
      }
    }
    expect(collisions).toEqual([]);
  });

  test("no tattoo regex matches any other tattoo's full text", () => {
    const collisions: string[] = [];
    for (const target of tattooRegex) {
      const re = new RegExp(target.regex, "i");
      const others = tattooRegex.filter((o) => o !== target && re.test(fullSearchableText(o)));
      if (others.length > 0) {
        collisions.push(
          `${target.tattoo} (regex="${target.regex}") matches ${others.length} other tattoo(s): ${others.slice(0, 3).map((o) => o.tattoo).join(", ")}`,
        );
      }
    }
    expect(collisions).toEqual([]);
  });
});
