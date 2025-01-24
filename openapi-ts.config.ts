import { defineConfig } from '@hey-api/openapi-ts';
import { getConfig } from '@imolater/fe-app-config';
import configJson from './config.json';

const config = getConfig(configJson as any);

export default defineConfig({
  client: '@hey-api/client-axios',
  input: `${ config.get('api.url') }/docs/?json=1`,
  output: 'src/shared/api/openapi',
  logs: {
    path: 'logs',
  },
});
