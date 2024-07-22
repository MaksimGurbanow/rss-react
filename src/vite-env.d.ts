/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL;
  readonly VITE_API_PAGE_URL;
  readonly VITE_API_PRODUCTS_URL;
  readonly VITE_LIMIT;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
