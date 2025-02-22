import { ErrorRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ErrorRoute = {
  path: '/error',
  name: ErrorRouteName,
  component: () => import('./ui/Page.vue'),
  props: (route) => ({
    errorMessage: route.query.error,
  }),
} as RouteRecordRaw;
