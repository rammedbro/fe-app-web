import { ProfileOrderDetailsRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';
import { beforeEnter } from './guards/beforeEnter';

export const ProfileOrderDetailsRoute = {
  path: ':id',
  name: ProfileOrderDetailsRouteName,
  component: () => import('./ui/Page.vue'),
  beforeEnter,
} as RouteRecordRaw;
