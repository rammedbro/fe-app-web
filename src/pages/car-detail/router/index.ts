import { CarDetailRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';
import { beforeEnter } from './guards';

export const CarDetailRoute: RouteRecordRaw = {
  path: '/cars/:id',
  name: CarDetailRouteName,
  component: () => import('@/pages/car-detail/ui/Page.vue'),
  beforeEnter,
};
