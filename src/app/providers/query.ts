import { QueryClient, VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import type { App } from 'vue';

type Options = Omit<VueQueryPluginOptions, 'queryClient'>;

export const query = (app: App, options?: Options) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry(failureCount, e) {
          if (e instanceof AxiosError && e.status && e.status < 500) {
            return false;
          }

          if (failureCount > 3) {
            return false;
          }

          return true;
        },
      },
    },
  });

  app.use(VueQueryPlugin, {
    queryClient,
    ...options,
  });
};
