import { api } from '@/app/providers/api';
import { pinia } from '@/app/providers/pinia';
import { primevue } from '@/app/providers/primevue';
import { router } from '@/app/providers/router';
import App from '@/app/ui/App.vue';
import { createApp } from 'vue';

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(api, { url: import.meta.env.API_URL })
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
