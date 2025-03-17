import type { RouteRecordRaw } from 'vue-router';
import { ProfileOrderDetailsRoute } from './details';
import { ProfileOrderListRoute } from './list';

export const ProfileOrdersRoute = {
  path: 'orders',
  children: [ProfileOrderListRoute, ProfileOrderDetailsRoute],
} as RouteRecordRaw;
