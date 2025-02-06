import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '@/shared/api';

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
      beforeEnter: () => isAuthenticated.value ? { name: 'profile-dashboard' } : true,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/pages/sign-up/index.vue'),
      beforeEnter: () => isAuthenticated.value ? { name: 'profile-dashboard' } : true,
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
      path: '/cars/:id/payment',
      name: 'payment',
      component: () => import('@/pages/payment/index.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile/_layout/ProfileLayout.vue'),
      beforeEnter: () => isAuthenticated.value ? true : { name: 'sign-in' },
      children: [
        {
          path: 'dashboard',
          name: 'profile-dashboard',
          component: () => import('@/pages/profile/dashboard/index.vue'),
        },
        {
          path: 'favorites',
          name: 'profile-favorites',
          component: () => import('@/pages/profile/favorites/index.vue'),
        },
        {
          path: 'settings',
          name: 'profile-settings',
          component: () => import('@/pages/profile/settings/index.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/index.vue'),
    },
    {
      path: '/help/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/pages/help/terms-of-service/index.vue'),
    },
    {
      path: '/help/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/pages/help/privacy-policy/index.vue'),
    },
  ],
  scrollBehavior(to, from, position) {
    if (position) {
      return position;
    }

    if (to.hash) {
      return { selector: to.hash, behavior: 'smooth' };
    }

    if (from.path === to.path) {
      return {};
    }

    return { top: 0 };
  },
});
