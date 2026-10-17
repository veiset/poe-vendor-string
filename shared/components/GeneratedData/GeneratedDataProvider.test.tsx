import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {act, cleanup, fireEvent, render, screen} from "@testing-library/react";

const history = {current: {poe1: {patch: "3.29.3.3", commit: "d1bab48"}}};
const ok = (body: unknown) => ({ok: true, json: async () => body});
const failed = (status: number, statusText: string) => ({ok: false, status, statusText});
// history.json, and a 404 for every file
const answer = async (url: string) => url.endsWith("/history.json") ? ok(history) : failed(404, "Not Found");
const fetchMock = vi.fn(answer);

// Each test imports the modules again, so they read history.json again
async function renderPage() {
  const {GeneratedDataProvider} = await import("./GeneratedDataProvider");
  await act(async () => {
    render(<GeneratedDataProvider game="poe1"><p>Page</p></GeneratedDataProvider>);
  });
  return import("@shared/generatedData");
}

describe("GeneratedDataProvider", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
    fetchMock.mockImplementation(answer);
  });

  it("shows a spinner until it has found the data, then the page", async () => {
    let respond: (response: unknown) => void = () => {};
    fetchMock.mockImplementationOnce((() => new Promise((resolve) => { respond = resolve; })) as never);
    const {GeneratedDataProvider} = await import("./GeneratedDataProvider");
    render(<GeneratedDataProvider game="poe1"><p>Page</p></GeneratedDataProvider>);
    expect(screen.getByText("Loading game data…")).toBeInTheDocument();
    expect(screen.queryByText("Page")).not.toBeInTheDocument();

    await act(async () => respond(ok(history)));
    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.queryByText("Loading game data…")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says when it can't find the data, and tries again", async () => {
    fetchMock.mockResolvedValueOnce(failed(503, "Service Unavailable") as never);
    await renderPage();
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Couldn't load the game data.");
    expect(alert).toHaveTextContent("503 Service Unavailable");
    expect(screen.queryByText("Page")).not.toBeInTheDocument();

    await act(async () => fireEvent.click(screen.getByRole("button", {name: "Try again"})));
    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says which file failed to load, and keeps the page", async () => {
    const {fetchGeneratedFile} = await renderPage();
    await act(async () => {
      await expect(fetchGeneratedFile("poe1", "mapmods/Generated.Map.FRENCH.min.json")).rejects.toThrow("404");
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Some of the game data failed to load (mapmods/Generated.Map.FRENCH.min.json)");
    expect(alert).toHaveTextContent("404 Not Found");
    expect(screen.getByText("Page")).toBeInTheDocument();
  });
});
