import * as process from 'node:process';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig(() => {
  const { API_URL, API_PROXY } = process.env;
  const config: UserConfig = {
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
