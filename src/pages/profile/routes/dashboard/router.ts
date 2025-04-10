import { ProfileDashboardRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileDashboardRoute = {
  path: 'dashboard',
  name: ProfileDashboardRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
