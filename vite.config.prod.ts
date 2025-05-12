import dotenv from '@dotenvx/dotenvx';
import { defineConfig, type UserConfig } from 'vite';

const API_PATH = dotenv.get('API_PATH');
const API_PROXY = dotenv.get('API_PROXY');
const SOCKET_PATH = dotenv.get('SOCKET_PATH');
const SOCKET_PROXY = dotenv.get('SOCKET_PROXY');
const VITE_ALLOWED_HOSTS = dotenv.get('VITE_ALLOWED_HOSTS');

export default defineConfig(() => {
  const config: UserConfig = {
    build: {
      outDir: 'build',
    },
    preview: {
      allowedHosts: VITE_ALLOWED_HOSTS?.split(','),
      proxy: {
        [API_PATH]: {
          target: API_PROXY,
          changeOrigin: true,
          toProxy: true,
          timeout: 10e3,
        },
        [SOCKET_PATH]: {
          ws: true,
          target: SOCKET_PROXY,
          rewriteWsOrigin: true,
          toProxy: true,
        },
      },
    },
  };

  return config;
});
