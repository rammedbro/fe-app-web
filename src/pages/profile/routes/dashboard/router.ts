import { ProfileDashboardRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileDashboardRoute = {
  path: 'dashboard',
  name: ProfileDashboardRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
