import { api } from '@/app/providers/api';
import { pinia } from '@/app/providers/pinia';
import { primevue } from '@/app/providers/primevue';
import { router } from '@/app/providers/router';
import '@/app/providers/style';
import App from '@/app/ui/App.vue';
import { createApp } from 'vue';

async function init() {
  const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(api, { url: import.meta.env.API_URL })
    .use(primevue)
    .directive<HTMLElement>('focus', (el) => el.focus());

  app.config.performance = true;

  // Mounting
  app.mount('#app');
}

window.addEventListener('load', () => {
  init().catch(console.error);
});
