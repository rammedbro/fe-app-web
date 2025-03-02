import { api } from '@/app/providers/api';
import { pinia } from '@/app/providers/pinia';
import { primevue } from '@/app/providers/primevue';
import { router } from '@/app/providers/router';
import '@/app/providers/style';
import App from '@/app/ui/App.vue';
import { configInjectionKey, emitterInjectionKey, loggerInjectionKey } from '@/shared/model/symbols';
import { getApplication } from '@imolater/fe-app-client';
import { createApp } from 'vue';

async function init() {
  const { emitter, logger, config } = await getApplication();
  const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(api, { url: config.get('api.url') as string })
    .use(primevue)
    .provide(configInjectionKey, config)
    .provide(emitterInjectionKey, emitter)
    .provide(loggerInjectionKey, logger)
    .directive<HTMLElement>('focus', (el) => el.focus());

  Object.assign(app.config.globalProperties, {
    version: __APP_VERSION__,
    config: config.get(),
    env: import.meta.env,
  });
  app.config.performance = true;

  // Emitter
  emitter.addEventListener('update', (evt) => {
    logger.info({
      name: 'Application update event',
      data: (evt as CustomEvent).detail,
    });
  });

  // Mounting
  app.mount('#app');
}

window.addEventListener('load', () => {
  init().catch(console.error);
});
