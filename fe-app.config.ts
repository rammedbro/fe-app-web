import type { FEAppConfig } from '@imolater/fe-app-types';
import pkg from './package.json';

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
      dts: 'src/types/auto-imports.d.ts',
    },
    useWorkers: {
      dedicated: true,
      service: true,
    },
  },
  server: {
    sentry: {
      authToken:
        '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',
      project: 'fe-app',
      url: 'https://imolater-company.sentry.io/',
      release: pkg.version,
    },
  },
};

export default config;
