import { ProfileOrderListRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileOrderListRoute = {
  path: '',
  name: ProfileOrderListRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
