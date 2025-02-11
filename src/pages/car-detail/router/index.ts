import { CarDetailRouteName } from '@/shared/router/routes';
import { beforeEnter } from './guards';
import type { RouteRecordRaw } from 'vue-router';

export const CarDetailRoute: RouteRecordRaw = {
  path: '/cars/:id',
  name: CarDetailRouteName,
  component: () => import('@/pages/car-detail/ui/Page.vue'),
  beforeEnter,
};
