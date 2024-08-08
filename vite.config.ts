/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), svgr()],
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
