import dotenv from '@dotenvx/dotenvx';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import browserslist from 'browserslist';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { browserslistToTargets } from 'lightningcss';
import * as mime from 'mime-types';
import path from 'node:path';
import process from 'node:process';
import unimport from 'unimport/unplugin';
import { defineConfig, type UserConfig } from 'vite';
import svg from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

const { npm_package_name, npm_package_version } = process.env;
const API_PATH = dotenv.get('API_PATH');
const API_PROXY = dotenv.get('API_PROXY');
const SOCKET_PATH = dotenv.get('SOCKET_PATH');
const SOCKET_PROXY = dotenv.get('SOCKET_PROXY');

const assetPath = (filename: string, type?: string) => {
  return path.join('assets', type || mime.lookup(filename) || '', filename);
};

/**
 * @see https://vite.dev/dotenv/
 */
export default defineConfig(() => {
  const config: UserConfig = {
    define: {
      'import.meta.env.APP_NAME': JSON.stringify(npm_package_name),
      'import.meta.env.APP_VERSION': JSON.stringify(npm_package_version),
      'import.meta.env.API_PATH': JSON.stringify(API_PATH),
      'import.meta.env.SOCKET_PATH': JSON.stringify(SOCKET_PATH),
    },
    build: {
      outDir: 'build',
      target: browserslistToEsbuild(),
      sourcemap: 'hidden',
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 5000, // @see https://github.com/rollup/rollup/issues/4327
          manualChunks: (id) => {
            if (id.includes('@vue/')) {
              return 'vue';
            }

            if (id.includes('@primevue/icons')) {
              return 'icons';
            }

            if (id.includes('chart.js')) {
              return 'chart';
            }

            if (id.match('leaflet')) {
              return 'leaflet';
            }

            return null;
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.source === '/* vite internal call, ignore */') return '';

            const assetName = assetInfo.names[0];
            return assetPath('[name].[ext]', mime.lookup(assetName) || '');
          },
          chunkFileNames: assetPath('chunk-[name].[hash].js'),
          entryFileNames: assetPath('entry-[name].[hash].js'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      devSourcemap: true,
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
    plugins: [
      tsconfigPaths({ projects: ['tsconfig.app.json'] }),
      vue(),
      jsx(),
      svg(),
      unimport.vite({
        presets: ['vue'],
        addons: {
          vueTemplate: true,
        },
        dts: './src/app/ambient/auto-imports.d.ts',
      }),
      tailwindcss(),
      vueI18n({
        compositionOnly: true,
        fullInstall: false,
      }),
    ],
    server: {
      proxy: {
        [API_PATH]: {
          target: API_PROXY,
          changeOrigin: true,
          timeout: 10e3,
        },
        [SOCKET_PATH]: {
          ws: true,
          target: SOCKET_PROXY,
          rewriteWsOrigin: true,
          timeout: 10e3,
        },
      },
    },
  };

  return config;
});
