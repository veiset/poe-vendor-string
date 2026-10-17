import {useState} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {act, cleanup, fireEvent, render, screen} from "@testing-library/react";
import {Link, MemoryRouter, Outlet, Route, Routes} from "react-router-dom";

const history = {current: {poe1: {patch: "3.29.3.3", commit: "d1bab48"}}};
const ok = (body: unknown) => ({ok: true, json: async () => body});
const failed = (status: number, statusText: string) => ({ok: false, status, statusText});
// history.json, and a 404 for every file
const answer = async (url: string) => url.endsWith("/history.json") ? ok(history) : failed(404, "Not Found");
const fetchMock = vi.fn(answer);

// Each test imports the modules again, so they read history.json again
async function renderApp() {
  const {GeneratedDataProvider} = await import("./GeneratedDataProvider");
  const App = () => {
    const [language, setLanguage] = useState("FRENCH");
    return (
      <MemoryRouter initialEntries={["/boat"]}>
        <button type="button" onClick={() => setLanguage("ENGLISH")}>English</button>
        <Routes>
          <Route element={<GeneratedDataProvider game="poe1" language={language}><Outlet/></GeneratedDataProvider>}>
            <Route path="boat" element={<p>Boat <Link to="/maps">Maps</Link></p>}/>
            <Route path="maps" element={<p>Maps page</p>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };
  render(<App/>);
  return import("@shared/generatedData");
}

// Fails a request for the French boat mods, as R2 only has English ones
async function failBoatMods(data: typeof import("@shared/generatedData")) {
  await act(async () => {
    await expect(data.fetchGeneratedFile("poe1", "boatmods/Generated.BoatMods.FRENCH.min.json")).rejects.toThrow("404");
  });
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
    await renderApp();
    expect(screen.getByText("Loading game data…")).toBeInTheDocument();
    expect(screen.queryByText("Boat")).not.toBeInTheDocument();

    await act(async () => respond(ok(history)));
    expect(screen.getByText("Boat")).toBeInTheDocument();
    expect(screen.queryByText("Loading game data…")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says when it can't find the data, and tries again", async () => {
    fetchMock.mockResolvedValueOnce(failed(503, "Service Unavailable") as never);
    await act(renderApp);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Error loading data");
    expect(alert).toHaveTextContent("503 Service Unavailable");
    expect(screen.getByRole("link", {name: "Discord"})).toHaveAttribute("href", "https://discord.gg/T8BzKnatY6");
    expect(screen.getByRole("link", {name: "GitHub"}).getAttribute("href"))
      .toMatch(/^https:\/\/github\.com\/veiset\/poe\.re\/issues\/new\?.*title=.*503/);
    expect(screen.queryByText("Boat")).not.toBeInTheDocument();

    await act(async () => fireEvent.click(screen.getByRole("button", {name: "Try again"})));
    expect(screen.getByText("Boat")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says when a file failed to load, keeps the page, and forgets it on the next page", async () => {
    let data!: typeof import("@shared/generatedData");
    await act(async () => { data = await renderApp(); });
    await failBoatMods(data);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Some data couldn't be loaded");
    expect(alert).toHaveTextContent("404 Not Found");
    expect(screen.getByText("Boat")).toBeInTheDocument();

    await act(async () => fireEvent.click(screen.getByRole("link", {name: "Maps"})));
    expect(screen.getByText("Maps page")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("forgets a file that failed to load when the language changes", async () => {
    let data!: typeof import("@shared/generatedData");
    await act(async () => { data = await renderApp(); });
    await failBoatMods(data);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await act(async () => fireEvent.click(screen.getByRole("button", {name: "English"})));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("Boat")).toBeInTheDocument();
  });
});
