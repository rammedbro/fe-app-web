import { ProfileDashboardRoute } from '@/pages/profile/dashboard';
import { ProfileFavoritesRoute } from '@/pages/profile/favorites';
import { ProfileSettingsRoute } from '@/pages/profile/settings';
import { isAuthenticated } from '@/shared/api';
import { ProfileRouteName, SignInRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileRoute = {
  path: '/profile',
  name: ProfileRouteName,
  component: () => import('./_layout/Layout.vue'),
  beforeEnter: () => {
    return isAuthenticated.value ? true : { name: SignInRouteName };
  },
  children: [ProfileDashboardRoute, ProfileFavoritesRoute, ProfileSettingsRoute],
} as RouteRecordRaw;
