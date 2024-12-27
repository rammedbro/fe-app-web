/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare const __APP_VERSION__: string;
declare const __TAILWIND_CONFIG__: import('tailwindcss').Config & {
  theme: {
    colors: Record<string, Record<string, string>>
  }
};
