import { ProfileFavoritesRouteName } from '@/shared/router/routes.ts';
import type { RouteRecordRaw } from 'vue-router';

export const ProfileFavoritesRoute = {
  path: 'favorites',
  name: ProfileFavoritesRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
