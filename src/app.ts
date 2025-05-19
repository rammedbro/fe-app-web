import { api } from '@/app/providers/api';
import { pinia } from '@/app/providers/pinia';
import { primevue } from '@/app/providers/primevue';
import { router } from '@/app/providers/router';
import App from '@/app/ui/Layout.vue';
import { createApp } from 'vue';
import { head } from './app/providers/head';
import { i18n } from './app/providers/i18n';
import { query } from './app/providers/query';

const app = createApp(App)
  .use(pinia)
  .use(query, { enableDevtoolsV6Plugin: true })
  .use(router)
  .use(i18n)
  .use(head)
  .use(api, { url: import.meta.env.API_PATH })
  .use(primevue, {
    theme: 'none',
    ripple: true,
    zIndex: {
      overlay: 10,
      menu: 10,
      modal: 40,
      tooltip: 60,
    },
  })
  .directive<HTMLElement>('focus', (el) => el.focus());

app.config.performance = true;

export { app };
