import { ProfileOrderDetailsRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';
import { useOrderStore } from './model/store';

export const ProfileOrderDetailsRoute = {
  path: ':id',
  name: ProfileOrderDetailsRouteName,
  component: () => import('./ui/Page.vue'),
  beforeEnter: (to) => useOrderStore().fetchOrder(Number(to.params.id)),
} as RouteRecordRaw;
