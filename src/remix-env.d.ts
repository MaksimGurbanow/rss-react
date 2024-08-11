// remix-env.d.ts
/// <reference types="remix" />
/// <reference types="remix/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    REMIX_LIMIT: number;
    REMIX_API_BASE_URL: string;
    REMIX_API_PAGE_URL: string;
    REMIX_API_PRODUCTS_URL: string;
  }
}

declare module "**/*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "**/*.svg?react" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare global {
  interface Window {
    ENV: {
      [key: string]: string;
    };
  }
}

export {}; // Ensure the file is treated as a module
