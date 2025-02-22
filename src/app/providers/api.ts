import { SignInRoute } from '@/pages/sign-in';
import qs from 'query-string';
import type { Plugin } from 'vue';
import { client } from '@/shared/api';

interface Options {
  url: string;
}

export const api: Plugin<Options> = (_, options): void => {
  client.setConfig({
    baseURL: options.url,
    throwOnError: true,
    paramsSerializer: (params) => qs.stringify(params),
  });

  client.instance.interceptors.response.use(undefined, async (error) => {
    if (error.response.status === 401) {
      if (window.location.pathname !== SignInRoute.path) {
        window.location.href = SignInRoute.path;
      }
    }

    throw error;
  });
};
