import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import type { App, Plugin } from 'vue';

export const primevue: Plugin = (app: App) => {
  app.use(PrimeVue, {
    theme: {
      // TODO: Remake with tailwind - https://tailwind.primevue.org/vite/#primeuiplugin
      preset: definePreset(Aura, {
        semantic: {
          primary: __TAILWIND_CONFIG__.theme.colors.primary,
        },
        components: {
          button: {
            borderRadius: '8px',
          },
        },
      }),
      options: {
        darkModeSelector: '.dark',
        cssLayer: {
          name: 'primevue',
          order: '_base, primevue, _components, _utilities',
        },
      },
    },
  } as PrimeVueConfiguration);
};
