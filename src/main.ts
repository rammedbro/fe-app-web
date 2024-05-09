import { createApp } from 'vue';
import { getApplication } from '@imolater/fe-app-client';
import '@/app/providers/style';
import { router } from '@/app/providers/router';
import { pinia } from '@/app/providers/pinia';
import { useSentry } from '@/app/providers/sentry';
import {
  configInjectionKey,
  emitterInjectionKey,
  loggerInjectionKey,
} from '@/shared/const';
import App from '@/app/ui/App.vue';

async function init() {
  const { emitter, logger, config, workers } = await getApplication();
  const app = createApp(App)
    .use(pinia)
    .use(router)
    .provide(configInjectionKey, config)
    .provide(emitterInjectionKey, emitter)
    .provide(loggerInjectionKey, logger);

  Object.assign(app.config.globalProperties, {
    version: __APP_VERSION__,
    config: config.get(),
    env: import.meta.env,
  });
  app.config.performance = true;
  app.config.errorHandler = ((err, _, info) => {
    logger.error({ data: { err, info } });
  });
  app.config.warnHandler = ((msg, _, info) => {
    logger.info({ data: { msg, info } });
  });

  // Emitter
  emitter.addEventListener('update', evt => {
    logger.info({
      name: 'Application update event',
      data: (evt as CustomEvent).detail,
    });
  });

  // Web worker
  workers.dedicated.start();
  workers.dedicated.addEventListener('update', evt => console.info(evt));

  // Service worker
  await workers.service.start();
  workers.dedicated.addEventListener('notification', evt => console.info(evt));

  // Sentry
  useSentry(app, router, {
    dsn: 'https://4dfe7c0b0078b3dac5942feff6846719@o4504389401968640.ingest.us.sentry.io/4507131709947904',
    environment: config.env() as string,
    release: __APP_VERSION__,
  });

  // Mounting
  app.mount('#app');
}

window.addEventListener('load', () => {
  init().catch(err => console.error(err));
});
