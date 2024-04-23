import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/help/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/pages/help/terms-of-service.vue'),
    },
    {
      path: '/help/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/pages/help/privacy-policy.vue'),
    },
  ],
});
