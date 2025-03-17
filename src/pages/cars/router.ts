import type { RouteRecordRaw } from 'vue-router';
import { CarDetailsRoute } from './routes/details';
import { CarListRoute } from './routes/list';

export const CarsRoute = {
  path: '/cars',
  children: [CarListRoute, CarDetailsRoute],
} as RouteRecordRaw;
