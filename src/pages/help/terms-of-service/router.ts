import { TermsOfServiceRouteName } from '@/shared/model/routes';
import type { RouteRecordRaw } from 'vue-router';

export const TermsOfServiceRoute = {
  path: '/help/terms-of-service',
  name: TermsOfServiceRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
