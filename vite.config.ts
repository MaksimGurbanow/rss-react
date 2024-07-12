/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
    },
  },
});
