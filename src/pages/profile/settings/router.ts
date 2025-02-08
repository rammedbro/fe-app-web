import { ProfileSettingsRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileSettingsRoute = {
  path: 'settings',
  name: ProfileSettingsRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
