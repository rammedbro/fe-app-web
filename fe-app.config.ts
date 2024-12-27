/// <reference types="node"/>

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
      dts: 'src/app/ambient/auto-imports.d.ts',
    },
    useWorkers: {
      dedicated: true,
      service: true,
    },
  },
  server: {
    sentry: {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      project: 'fe-app',
      url: 'https://imolater-company.sentry.io/',
      release: pkg.version,
    },
  },
};

export default config;
