import dotenv from '@dotenvx/dotenvx';
import { defineConfig } from '@hey-api/openapi-ts';

/**
 * @see https://heyapi.dev/openapi-ts/configuration
 */
export default defineConfig({
  client: '@hey-api/client-axios',
  input: dotenv.get('API_JSON'),
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
