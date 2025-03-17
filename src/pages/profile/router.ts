import type { RouteRecordRaw } from 'vue-router';
import { ProfileDashboardRoute } from './routes/dashboard';
import { ProfileFavoritesRoute } from './routes/favorites';
import { ProfileOrdersRoute } from './routes/orders';
import { ProfileSettingsRoute } from './routes/settings';

export const ProfileRoute = {
  path: '/profile',
  meta: { requiresAuth: true },
  component: () => import('./ui/Layout.vue'),
  children: [ProfileDashboardRoute, ProfileFavoritesRoute, ProfileOrdersRoute, ProfileSettingsRoute],
} as RouteRecordRaw;
