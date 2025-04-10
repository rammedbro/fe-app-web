import { CarListRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';
import { CarDetailsRoute } from './routes/@id';

export const CarsRoute = {
  path: '/cars',
  children: [
    {
      path: '',
      name: CarListRouteName,
      component: () => import('./ui/Page.vue'),
    },
    CarDetailsRoute,
  ],
} as RouteRecordRaw;
