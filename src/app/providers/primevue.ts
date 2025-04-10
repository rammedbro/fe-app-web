import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import type { App, Plugin } from 'vue';

export const primevue: Plugin<PrimeVueConfiguration> = (app: App, options) => {
  app.use(PrimeVue, options);
  app.use(ToastService);

  if (options.ripple) {
    app.directive('ripple', Ripple);
  }
};
