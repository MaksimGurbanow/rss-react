/// <reference types="vitest" />
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { vitePlugin as remix } from '@remix-run/dev';

// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    remix({
      appDirectory: './src/app',
    }),
    svgr(),
  ],
  build: {
    rollupOptions: {
      external: ['**/*.spec.ts', '**/*.test.tsx'],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json'],
    },
    exclude: ['**/*.spec.ts', '**/*.test.tsx'],
  },
});
