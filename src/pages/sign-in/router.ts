import { isAuthenticated } from '@/shared/api';
import { ProfileDashboardRouteName, SignInRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const SignInRoute = {
  path: '/sign-in',
  name: SignInRouteName,
  component: () => import('./ui/Page.vue'),
  beforeEnter: () => {
    return isAuthenticated.value ? { name: ProfileDashboardRouteName } : true;
  },
} as RouteRecordRaw;
