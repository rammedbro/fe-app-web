import { HomeRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';

export const HomeRoute = {
  path: '/',
  name: HomeRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
