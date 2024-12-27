import * as Sentry from '@sentry/vue';
import type { Options } from '@sentry/vue/types/types';
import type { App, Plugin } from 'vue';
import { router } from './router.ts';

export const sentry: Plugin = (app: App, options: Partial<Options> = {}): void => {
  Sentry.init({
    app,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
    ],
    tracesSampleRate: 1.0,
    ...options,
  });
};
