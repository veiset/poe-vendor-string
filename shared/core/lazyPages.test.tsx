import {Component, ReactNode, Suspense} from "react";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {act, cleanup, render, screen} from "@testing-library/react";

// recoverFromDynamicImportFailure's listener: reloads the page on vite:preloadError
const reload = vi.fn();
const recover = (event: Event) => {
  event.preventDefault();
  reload();
};

// A page whose code fails to load, as Vite's import wrapper fails: it fires vite:preloadError first
const failingPage = () => {
  window.dispatchEvent(new Event("vite:preloadError", {cancelable: true}));
  return Promise.reject(new Error("Failed to fetch dynamically imported module"));
};

class ErrorBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {
    return {failed: true};
  }
  render() {
    return this.state.failed ? <p>Failed</p> : this.props.children;
  }
}

// Each test imports the module again, so nothing is preloading or loading
const load = () => import("./lazyPages");

describe("lazyPages", () => {
  beforeEach(() => {
    vi.resetModules();
    window.addEventListener("vite:preloadError", recover);
  });
  afterEach(() => {
    cleanup();
    window.removeEventListener("vite:preloadError", recover);
    vi.useRealTimers();
    vi.restoreAllMocks();
    reload.mockClear();
  });

  it("doesn't reload the page when the background preload fails", async () => {
    vi.useFakeTimers();
    const {lazyPages} = await load();
    const pages = lazyPages();
    pages.page(failingPage as never);
    // jsdom has no requestIdleCallback, so preload() waits a second
    pages.preload();
    await vi.advanceTimersByTimeAsync(1000);
    expect(reload).not.toHaveBeenCalled();
  });

  it("still reloads the page when a page the user opened fails to load", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const {lazyPages} = await load();
    const Page = lazyPages().page(failingPage as never);
    await act(async () => {
      render(<ErrorBoundary><Suspense fallback="Loading"><Page/></Suspense></ErrorBoundary>);
    });
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
