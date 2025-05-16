import { ProfileOrderDetailsRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';
import { beforeEnter } from './hooks/beforeEnter';

export const ProfileOrderDetailsRoute = {
  path: ':id',
  name: ProfileOrderDetailsRouteName,
  component: () => import('./ui/Page.vue'),
  props: (route) => ({ id: Number(route.params.id) }),
  beforeEnter,
} as RouteRecordRaw;
