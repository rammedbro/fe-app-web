import { CarPaymentRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const CarPaymentRoute = {
  path: 'payment',
  name: CarPaymentRouteName,
  meta: { requiresAuth: true },
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
