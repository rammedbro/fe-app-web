import type { FEAppConfig } from '@imolater/fe-app-types';

/**
 * @see https://gitlab.com/imolater/fe-app/-/blob/master/packages/types/docs/api/interfaces/FEAppConfig.md
 */
export default {
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
  logLevel: 'error',
} as FEAppConfig;
