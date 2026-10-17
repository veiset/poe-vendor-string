import {ComponentType, lazy, LazyExoticComponent} from "react";

let preloading = false;
// Pages whose code React is waiting for, because the user opened them
let pagesLoading = 0;

// A failed import fires vite:preloadError, on which recoverFromDynamicImportFailure reloads the
// page. That is right for a page the user opened, but not for the background preload: the user
// would see the page reload under them. When the user opens that page, its own import tries again,
// and reloads the page if that fails too.
window.addEventListener("vite:preloadError", (event) => {
  if (preloading && pagesLoading === 0) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, {capture: true});

/**
 * Lazy-loaded pages whose code can also be loaded in the background. React Router keeps the old
 * page on screen until the new page's code is there, so a click on a page whose code isn't loaded
 * yet feels unresponsive; preload() loads every page's code once the browser is idle.
 */
export function lazyPages() {
  const loaders: (() => Promise<unknown>)[] = [];
  return {
    page<T extends ComponentType<any>>(load: () => Promise<{default: T}>): LazyExoticComponent<T> {
      loaders.push(load);
      return lazy(() => {
        pagesLoading++;
        return load().finally(() => pagesLoading--);
      });
    },
    preload(): void {
      const loadAll = async () => {
        preloading = true;
        await Promise.allSettled(loaders.map((load) => load()));
        preloading = false;
      };
      if ("requestIdleCallback" in window) requestIdleCallback(loadAll);
      else setTimeout(loadAll, 1000);
    },
  };
}
