// next-env.d.ts
/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_LIMIT: number;
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_PAGE_URL: string;
    NEXT_PUBLIC_API_PRODUCTS_URL: string;
  }
}
