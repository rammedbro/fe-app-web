import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/index.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/pages/sign-in/index.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/pages/sign-up/index.vue'),
    },
    {
      path: '/cars',
      name: 'car-list',
      component: () => import('@/pages/car-list/index.vue'),
    },
    {
      path: '/cars/:id',
      name: 'car-detail',
      component: () => import('@/pages/car-detail/index.vue'),
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/pages/payment/index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/index.vue'),
    },
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
