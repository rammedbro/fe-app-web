import { PaymentRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const PaymentRoute = {
  path: '/cars/:id/payment',
  name: PaymentRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
