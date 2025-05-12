/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
  readonly APP_NAME: string;
  readonly APP_VERSION: string;
  readonly API_PATH: string;
  readonly SOCKET_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
