import { defineConfig } from '@hey-api/openapi-ts';
import { getConfig } from '@imolater/fe-app-config';
import configJson from './config.json';

const config = getConfig(configJson as Parameters<typeof getConfig>[0]);

/**
 * @see https://heyapi.dev/openapi-ts/configuration
 */
export default defineConfig({
  client: '@hey-api/client-axios',
  input: config.get('api.json'),
  output: 'src/shared/api/openapi',
  plugins: [
    '@hey-api/sdk',
    {
      name: '@hey-api/typescript',
      enums: 'javascript',
    },
  ],
  logs: {
    path: 'logs',
  },
});
