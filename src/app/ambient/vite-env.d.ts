/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly APP_VERSION: string;
  readonly API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
