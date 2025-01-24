import type { Config } from '@imolater/fe-app-config';

const config = (config: Config) => {
  return {
    host: config.get('host'),
    api: config.get('api'),
  };
};

export default config;
