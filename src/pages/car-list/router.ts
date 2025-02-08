import { CarListRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const CarListRoute = {
  path: '/cars',
  name: CarListRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
