import istanbul from 'vite-plugin-istanbul';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\\.*\.ts$/ }, async (args) => ({
              loader: 'tsx',
              contents: await fs.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },
  plugins: [
    react(),
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
