import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import ToastService from 'primevue/toastservice';
import type { App, Plugin } from 'vue';

export const primevue: Plugin = (app: App) => {
  app.use(PrimeVue, {
    theme: 'none',
  } as PrimeVueConfiguration);
  app.use(ToastService);
};
