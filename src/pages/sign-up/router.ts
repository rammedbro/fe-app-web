import { SignUpRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';

export const SignUpRoute = {
  path: '/sign-up',
  name: SignUpRouteName,
  meta: { requiresGuest: true },
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
