import withSvgr from 'next-svgr';

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  // output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  webpack(config) {
    config.module.rules.push({
      test: /\.(spec|test)\.(js|ts|tsx)$/,
      use: 'ignore-loader',
      include: import.meta.resolve(import.meta.dirname, 'src'),
    });
    return config;
  },
});

export default nextConfig;
