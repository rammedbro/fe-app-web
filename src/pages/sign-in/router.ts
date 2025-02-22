import { SignInRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const SignInRoute = {
  path: '/sign-in',
  name: SignInRouteName,
  meta: { requiresGuest: true },
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
