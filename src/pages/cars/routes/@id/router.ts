import { useCarStore } from '@/entities/car';
import { CarDetailsRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';
import { CarPaymentRoute } from './routes/payment';

export const CarDetailsRoute: RouteRecordRaw = {
  path: ':id',
  children: [
    {
      path: '',
      name: CarDetailsRouteName,
      component: () => import('./ui/Page.vue'),
      props: (route) => ({ id: Number(route.params.id as string) }),
    },
    CarPaymentRoute,
  ],
  beforeEnter: (to) => useCarStore().fetchCar(Number(to.params.id)),
};
