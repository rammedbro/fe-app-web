import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import type { App } from 'vue';

export const primevue = (app: App, options?: PrimeVueConfiguration) => {
  app.use(PrimeVue, options);
  app.use(ToastService);

  if (options?.ripple) {
    app.directive('ripple', Ripple);
  }
};
