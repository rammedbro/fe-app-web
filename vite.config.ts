import { defineConfig, type CSSModulesOptions } from 'vite';
import { createHash } from 'node:crypto';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import svg from 'vite-svg-loader';
import pkg from './package.json';
import tailwindConfig from './tailwind.config';

const generateScopedName: CSSModulesOptions['generateScopedName'] = (name, filename) => {
  const hash = createHash('md5').update(filename).digest('hex').slice(0, 5);
  const file = filename.slice(filename.lastIndexOf('/') + 1, filename.indexOf('.'));

  return `${ file }__${ name }__${ hash }`;
};

export default defineConfig((config) => ({
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
      generateScopedName: (config.mode === 'production') ? '[hash:base64:5]' : generateScopedName,
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [
    vue(),
    jsx(),
    svg(),
  ],
}));
