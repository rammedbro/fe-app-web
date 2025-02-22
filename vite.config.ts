import { getConfig } from '@imolater/fe-app-config';
import { createHash } from 'node:crypto';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig, type CSSModulesOptions } from 'vite';
import svg from 'vite-svg-loader';
import pkg from './package.json';
import tailwindConfig from './tailwind.config';
import configJson from './config.json';

const config = getConfig(configJson as Parameters<typeof getConfig>[0]);
const generateScopedName: CSSModulesOptions['generateScopedName'] = (name, filename) => {
  const hash = createHash('md5').update(filename).digest('hex').slice(0, 5);
  const file = filename.slice(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

  return `${file}__${name}__${hash}`;
};

/**
 * @see https://vite.dev/config/
 */
export default defineConfig(({ mode }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __TAILWIND_CONFIG__: JSON.stringify(tailwindConfig),
  },
  build: {
    target: browserslistToEsbuild(),
    cssMinify: false, // Delegate it to cssnano
  },
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: mode === 'production' ? '[hash:base64:5]' : generateScopedName,
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [vue(), jsx(), svg()],
  server: {
    proxy: config.dev() && {
      [config.get('api.url')]: {
        target: config.get('api.proxy'),
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        timeout: 10e3,
      },
    },
  },
}));
