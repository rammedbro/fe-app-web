import { isAuthenticated } from '@/shared/api';
import { ProfileDashboardRouteName, SignUpRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const SignUpRoute = {
  path: '/sign-up',
  name: SignUpRouteName,
  component: () => import('./ui/Page.vue'),
  beforeEnter: () => {
    return isAuthenticated.value ? { name: ProfileDashboardRouteName } : true;
  },
} as RouteRecordRaw;
