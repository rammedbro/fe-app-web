import { PrivacyPolicyRouteName } from '@/shared/router/routes';
import type { RouteRecordRaw } from 'vue-router';

export const PrivacyPolicyRoute = {
  path: '/help/privacy-policy',
  name: PrivacyPolicyRouteName,
  component: () => import('./ui/Page.vue'),
} as RouteRecordRaw;
