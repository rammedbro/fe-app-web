import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import type { App, Plugin } from 'vue';

export const primevue: Plugin = (app: App) => {
  const config: PrimeVueConfiguration = {
    theme: 'none',
    ripple: true,
  };

  app.use(PrimeVue, config);
  app.use(ToastService);
  app.directive('ripple', Ripple);
};
