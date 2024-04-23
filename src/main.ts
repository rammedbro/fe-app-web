import { createApp } from 'vue';
import { getApplication } from '@imolater/fe-app-client';
import '@/app/providers/style';
import { router } from '@/app/providers/router';
import { pinia } from '@/app/providers/pinia';
import { useSentry } from '@/app/providers/sentry';
// import { useSocket } from '@/app/providers/socket';
import * as firebase from '@/app/providers/firebase';
import App from '@/app/ui/App.vue';

declare const __APP_VERSION__: string;

async function init() {
  // Application
  const app = await getApplication();

  // Emitter
  app.emitter.addEventListener('update', evt => {
    app.logger.info({
      name: 'Application update event',
      data: evt,
    });
  });

  // Log
  app.logger.info({
    name: 'Application successfully started with config',
    data: app.config.get(),
  });

  // Api
  app.api.get('/api/hello-world/')
    .then(response => {
      app.logger.info({
        name: 'proxy server check request',
        data: response.data,
      });
    })
    .catch(err => app.logger.error({ data: err }));

  // Web worker
  app.workers.dedicated.start();
  app.workers.dedicated.addEventListener('update', evt => console.info(evt));

  // Service worker
  await app.workers.service.start();
  app.workers.dedicated.addEventListener('notification', evt => console.info(evt));

  // Vue
  const vue = createApp(App)
    .use(pinia)
    .use(router);

  // Sentry
  useSentry(vue, router, {
    dsn: 'https://4dfe7c0b0078b3dac5942feff6846719@o4504389401968640.ingest.us.sentry.io/4507131709947904',
    environment: app.config.env() as string,
    release: __APP_VERSION__,
  });

  // Wss
  // useSocket(`http://localhost:${ app.config.get('host.port') }`, '/socket');

  // Mounting
  vue.mount('#app');

  // Firebase
  firebase.start('#firebaseui-auth-container');
}

window.addEventListener('load', () => {
  init().catch(err => console.error(err));
});
