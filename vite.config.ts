import { defineConfig, mergeConfig } from 'vitest/config';
import path from 'path';
import poeConfig from './vite.config.poe';

export default mergeConfig(poeConfig, defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'shared/setupTests.ts')],
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      '../poe2/src/**/*.{test,spec}.{ts,tsx}',
      '../shared/**/*.{test,spec}.{ts,tsx}',
    ],
  },
}));
