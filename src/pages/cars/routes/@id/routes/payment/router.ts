import { CarPaymentRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';

export const CarPaymentRoute = {
  path: 'payment',
  name: CarPaymentRouteName,
  meta: { requiresAuth: true },
  component: () => import('./ui/Page.vue'),
  props: (route) => ({ id: Number(route.params.id) }),
} as RouteRecordRaw;
