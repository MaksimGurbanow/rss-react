/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL;
  readonly VITE_TOTAL;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
