import { ProfileOrderListRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';
import { ProfileOrderDetailsRoute } from './routes/@id';

export const ProfileOrdersRoute = {
  path: 'orders',
  children: [
    {
      path: '',
      name: ProfileOrderListRouteName,
      component: () => import('./ui/Page.vue'),
    },
    ProfileOrderDetailsRoute,
  ],
} as RouteRecordRaw;
