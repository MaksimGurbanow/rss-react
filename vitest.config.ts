import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
const mediaTypes = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  'webp',
  'ico',
  'bmp',
  'avif',
  'webp',
];

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'media-to-data-url',
      enforce: 'pre',
      load(id) {
        for (const mediaType of mediaTypes) {
          if (id.endsWith(`.${mediaType}`)) {
            return `export default "svg"`;
          }
        }
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitestSetup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'clover', 'json'],
      exclude: [
        'next.config.mjs',
        'src/pages/_document.tsx',
        ...coverageConfigDefaults.exclude,
      ],
    },
    env: {
      ...config({ path: '.env' }).parsed,
    },
  },
});
