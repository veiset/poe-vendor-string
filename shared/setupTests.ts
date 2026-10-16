/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';

// Node 25 has its own global localStorage, which hides jsdom's and has no
// Storage methods unless Node is started with --localstorage-file.
if (typeof globalThis.localStorage?.getItem !== 'function') {
  const {window} = (globalThis as unknown as {jsdom: {window: Window}}).jsdom;
  Object.defineProperty(globalThis, 'localStorage', {value: window.localStorage, configurable: true});
}
