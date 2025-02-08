import { CarDetailRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const CarDetailRoute = {
  path: '/cars/:id',
  name: CarDetailRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
