import { ProfileDashboardRoute } from '@/pages/profile/dashboard';
import { ProfileFavoritesRoute } from '@/pages/profile/favorites';
import { ProfileSettingsRoute } from '@/pages/profile/settings';
import { ProfileRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileRoute = {
  path: '/profile',
  name: ProfileRouteName,
  meta: { requiresAuth: true },
  component: () => import('./_layout/Layout.vue'),
  children: [ProfileDashboardRoute, ProfileFavoritesRoute, ProfileSettingsRoute],
} as RouteRecordRaw;
