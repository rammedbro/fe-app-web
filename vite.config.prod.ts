import dotenv from '@dotenvx/dotenvx';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(() => {
  const API_URL = dotenv.get('API_URL');
  const API_PROXY = dotenv.get('API_PROXY');
  const config: UserConfig = {
    build: {
      outDir: 'build',
    },
    preview: {
      proxy: {
        [API_URL]: {
          target: API_PROXY,
          changeOrigin: true,
          toProxy: true,
          rewrite: (path) => path.replace(new RegExp(`^${API_URL}`), ''),
          timeout: 10e3,
        },
      },
    },
  };

  return config;
});
