import dotenv from '@dotenvx/dotenvx';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import browserslist from 'browserslist';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { browserslistToTargets } from 'lightningcss';
import * as mime from 'mime-types';
import path from 'node:path';
import unimport from 'unimport/unplugin';
import { defineConfig, type UserConfig } from 'vite';
import svg from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

const assetPath = (filename: string, type?: string) => {
  return path.join('assets', type || mime.lookup(filename) || '', filename);
};

/**
 * @see https://vite.dev/dotenv/
 */
export default defineConfig(() => {
  const API_URL = dotenv.get('API_URL');
  const API_PROXY = dotenv.get('API_PROXY');
  const config: UserConfig = {
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(pkg.version),
      'import.meta.env.API_URL': JSON.stringify(dotenv.get('API_URL')),
    },
    build: {
      outDir: 'build',
      target: browserslistToEsbuild(),
      sourcemap: 'hidden',
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.source === '/* vite internal call, ignore */') return '';

            const assetName = assetInfo.names[0];
            return assetPath('[hash:12].[ext]', mime.lookup(assetName) || '');
          },
          entryFileNames: assetPath('[hash:12].js'),
          chunkFileNames: assetPath('[hash:12].js'),
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
    ],
    server: {
      proxy: {
        [API_URL]: {
          target: API_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${API_URL}`), ''),
          timeout: 10e3,
        },
      },
    },
  };

  return config;
});
