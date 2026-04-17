import {mapModIsPrefix} from "./MapModAffixes";
import {regexMapModsENGLISH} from "../generated/mapmods/Generated.MapModsV3.ENGLISH";

describe("MapModAffixes", () => {
  test("every English token has a prefix/suffix classification", () => {
    const missing = regexMapModsENGLISH.tokens
      .filter((t) => mapModIsPrefix(t.id) === undefined)
      .map((t) => ({id: t.id, text: t.rawText}));
    expect(missing).toEqual([]);
  });

  test("returns undefined for an unknown token id", () => {
    expect(mapModIsPrefix(0)).toBeUndefined();
  });

  test("classifies a known prefix correctly", () => {
    // "(40-49)% more Monster Life" is the "Bristling" prefix — confirms the
    // pipeline works end-to-end against real data, not just synthetic ids.
    const token = regexMapModsENGLISH.tokens.find((t) =>
      t.rawText.toLowerCase().includes("more monster life") && !t.rawText.includes("|"),
    );
    expect(token).toBeDefined();
    expect(mapModIsPrefix(token!.id)).toBe(true);
  });

  test("classifies a known suffix correctly", () => {
    // "Players cannot Regenerate Life, Mana or Energy Shield" is "of Stasis".
    const token = regexMapModsENGLISH.tokens.find((t) =>
      t.rawText.toLowerCase().startsWith("players cannot regenerate"),
    );
    expect(token).toBeDefined();
    expect(mapModIsPrefix(token!.id)).toBe(false);
  });
});
