import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

const history = {current: {poe1: {patch: "3.29.3.3", commit: "d1bab48"}, poe2: {patch: "0.5.5.4.2", commit: "72cc002"}}};
const ok = (body: unknown) => ({ok: true, json: async () => body});
// Answers history.json, and every other file with its own URL
const fetchMock = vi.fn(async (url: string, _init?: RequestInit) => ok(url.endsWith("/history.json") ? history : {url}));
const historyRequests = () => fetchMock.mock.calls.filter(([url]) => url.endsWith("/history.json"));

// Each test imports the module again, so it reads history.json again
const load = async () => (await import("./generatedData")).fetchGeneratedFile;

describe("generated data from R2", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockClear();
  });

  it("loads a file of the game's latest upload, with its commit", async () => {
    const fetchGeneratedFile = await load();
    await expect(fetchGeneratedFile("poe2", "relic/Generated.Relic.ENGLISH.min.json")).resolves.toEqual({
      url: "https://data.poe.re/generated/poe2/0.5.5.4.2/relic/Generated.Relic.ENGLISH.min.json?v=72cc002",
    });
  });

  it("revalidates history.json, and reads it once per page load", async () => {
    const fetchGeneratedFile = await load();
    await Promise.all([fetchGeneratedFile("poe1", "a.json"), fetchGeneratedFile("poe1", "b.json")]);
    await fetchGeneratedFile("poe2", "c.json");
    expect(historyRequests()).toEqual([["https://data.poe.re/history.json", {cache: "no-cache"}]]);
  });

  it("reads history.json again after a failed request", async () => {
    fetchMock.mockResolvedValueOnce({ok: false, status: 503, statusText: "Service Unavailable"} as never);
    const fetchGeneratedFile = await load();
    await expect(fetchGeneratedFile("poe1", "a.json")).rejects.toThrow("503 Service Unavailable");
    await expect(fetchGeneratedFile("poe1", "a.json")).resolves.toEqual({url: "https://data.poe.re/generated/poe1/3.29.3.3/a.json?v=d1bab48"});
    expect(historyRequests()).toHaveLength(2);
  });

  it("fails when history.json has no upload for the game", async () => {
    fetchMock.mockResolvedValueOnce(ok({current: {poe1: history.current.poe1}}));
    const fetchGeneratedFile = await load();
    await expect(fetchGeneratedFile("poe2", "a.json")).rejects.toThrow("history.json has no upload for poe2");
  });
});
