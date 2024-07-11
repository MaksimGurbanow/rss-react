/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['html'],
    },
  },
});
