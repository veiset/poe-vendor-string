import {ComponentType, lazy, LazyExoticComponent} from "react";

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
      return lazy(load);
    },
    preload(): void {
      const loadAll = () => loaders.forEach((load) => load().catch(() => {}));
      if ("requestIdleCallback" in window) requestIdleCallback(loadAll);
      else setTimeout(loadAll, 1000);
    },
  };
}
