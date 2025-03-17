import { useCarStore } from '@/entities/car';
import { CarDetailsRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';
import { CarPaymentRoute } from './routes/payment';

export const CarDetailsRoute: RouteRecordRaw = {
  path: ':id',
  children: [
    {
      path: '',
      name: CarDetailsRouteName,
      component: () => import('./ui/Page.vue'),
    },
    CarPaymentRoute,
  ],
  beforeEnter: (to) => useCarStore().fetchCar(Number(to.params.id)),
};
