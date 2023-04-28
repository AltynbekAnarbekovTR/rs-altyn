import istanbul from 'vite-plugin-istanbul';
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    istanbul({
      // forceBuildInstrument: true,
      cypress: true,
      // requireEnv: false,
      // include: ['src/*'],
      // exclude: ['node_modules', 'test/'],
      // extension: ['.js', '.ts'],
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.tsx'],
      // requireEnv: true,
    }),
  ],
  root: 'src',
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: ['./src/setupTests.ts'],
  //   coverage: {
  //     provider: 'istanbul',
  //   },
  // },
});
