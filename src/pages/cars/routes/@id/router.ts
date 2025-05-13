import { CarDetailsRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';
import { beforeEnter } from './guards/beforeEnter';
import { CarPaymentRoute } from './routes/payment';

export const CarDetailsRoute: RouteRecordRaw = {
  path: ':id',
  children: [
    {
      path: '',
      name: CarDetailsRouteName,
      component: () => import('./ui/Page.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    CarPaymentRoute,
  ],
  beforeEnter,
};
