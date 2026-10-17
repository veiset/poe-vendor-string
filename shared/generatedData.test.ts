import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

const history = {current: {poe1: {patch: "3.29.3.3", commit: "d1bab48"}, poe2: {patch: "0.5.5.4.2", commit: "72cc002"}}};
const ok = (body: unknown) => ({ok: true, json: async () => body});
const notFound = {ok: false, status: 404, statusText: "Not Found"};
// Answers history.json, and every other file with its own URL
const answer = async (url: string, _init?: RequestInit) => ok(url.endsWith("/history.json") ? history : {url});
const fetchMock = vi.fn(answer);
const historyRequests = () => fetchMock.mock.calls.filter(([url]) => url.endsWith("/history.json"));

// Each test imports the module again, so it reads history.json again
const load = () => import("./generatedData");

describe("generated data from R2", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
    fetchMock.mockImplementation(answer);
  });

  it("loads a file of the game's latest upload, with its commit", async () => {
    const {fetchGeneratedFile} = await load();
    await expect(fetchGeneratedFile("poe2", "relic/Generated.Relic.ENGLISH.min.json")).resolves.toEqual({
      url: "https://data.poe.re/generated/poe2/0.5.5.4.2/relic/Generated.Relic.ENGLISH.min.json?v=72cc002",
    });
  });

  it("revalidates history.json, and reads it once per page load", async () => {
    const {fetchGeneratedFile} = await load();
    await Promise.all([fetchGeneratedFile("poe1", "a.json"), fetchGeneratedFile("poe1", "b.json")]);
    await fetchGeneratedFile("poe2", "c.json");
    expect(historyRequests()).toEqual([["https://data.poe.re/history.json", {cache: "no-cache"}]]);
  });

  it("reads history.json again after a failed request", async () => {
    fetchMock.mockResolvedValueOnce({ok: false, status: 503, statusText: "Service Unavailable"} as never);
    const {fetchGeneratedFile} = await load();
    await expect(fetchGeneratedFile("poe1", "a.json")).rejects.toThrow("503 Service Unavailable");
    await expect(fetchGeneratedFile("poe1", "a.json")).resolves.toEqual({url: "https://data.poe.re/generated/poe1/3.29.3.3/a.json?v=d1bab48"});
    expect(historyRequests()).toHaveLength(2);
  });

  it("fails when history.json has no upload for the game", async () => {
    fetchMock.mockResolvedValueOnce(ok({current: {poe1: history.current.poe1}}));
    const {loadGeneratedData} = await load();
    await expect(loadGeneratedData("poe2")).rejects.toThrow("history.json has no upload for poe2");
  });

  it("reports a file that fails to load, but not history.json", async () => {
    const {fetchGeneratedFile, onGeneratedDataError} = await load();
    const listener = vi.fn();
    onGeneratedDataError(listener);

    fetchMock.mockResolvedValueOnce(notFound as never);
    await expect(fetchGeneratedFile("poe1", "a.json")).rejects.toThrow("404");
    expect(listener).not.toHaveBeenCalled();

    fetchMock.mockImplementation(async (url: string) => url.endsWith("/history.json") ? ok(history) : notFound as never);
    await expect(fetchGeneratedFile("poe1", "mapmods/Generated.Map.ENGLISH.min.json")).rejects.toThrow("404");
    expect(listener).toHaveBeenCalledWith({
      file: "mapmods/Generated.Map.ENGLISH.min.json",
      message: "Failed to load https://data.poe.re/generated/poe1/3.29.3.3/mapmods/Generated.Map.ENGLISH.min.json?v=d1bab48: 404 Not Found",
    });
  });
});
