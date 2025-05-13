import { ErrorRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';

export const ErrorRoute = {
  path: '/:pathMatch(.*)*',
  name: ErrorRouteName,
  component: () => import('./ui/Page.vue'),
  props: (route) => ({ status: Number(route.query.status) || 404 }),
} as RouteRecordRaw;
