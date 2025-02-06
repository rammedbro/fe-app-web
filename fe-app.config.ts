import type { FEAppConfig } from '@imolater/fe-app-types';

const config: FEAppConfig = {
  logLevel: 'error',
  configs: {
    clientConfig: 'client.config.ts',
    serverConfig: 'server.config.ts',
    viteConfig: 'vite.config.ts',
  },
  build: {
    useTsConfigPaths: true,
    useAutoImport: {
      dts: 'src/app/ambient/auto-imports.d.ts',
    },
  },
};

export default config;
