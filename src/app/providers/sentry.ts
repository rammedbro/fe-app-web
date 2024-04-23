import * as Sentry from '@sentry/vue';
import type { Options } from '@sentry/vue/types/types';
import type { App } from 'vue';
import type { Router } from 'vue-router';

export function useSentry(app: App, router: Router, options: Partial<Options> = {}): void {
  Sentry.init({
    app,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
    ],
    tracesSampleRate: 1.0,
    ...options,
  });
}
