import { client } from '@/shared/api';
import qs from 'query-string';
import type { Plugin } from 'vue';

interface Options {
  url: string;
}

export const api: Plugin<Options> = (_, options): void => {
  client.setConfig({
    baseURL: options.url,
    throwOnError: true,
    paramsSerializer: (params) => qs.stringify(params),
  });
};
