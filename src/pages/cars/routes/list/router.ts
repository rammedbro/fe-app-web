import { CarListRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';

export const CarListRoute = {
  path: '',
  name: CarListRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
