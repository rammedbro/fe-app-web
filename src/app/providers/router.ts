import { CarDetailRoute } from '@/pages/car-detail';
import { CarListRoute } from '@/pages/car-list';
import { TermsOfServiceRoute } from '@/pages/help/terms-of-service';
import { HomeRoute } from '@/pages/home';
import { PrivacyPolicyRoute } from '@/pages/help/privacy-policy';
import { PaymentRoute } from '@/pages/payment';
import { ProfileRoute } from '@/pages/profile/router.ts';
import { SignInRoute } from '@/pages/sign-in';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    HomeRoute,
    SignInRoute,
    CarListRoute,
    CarDetailRoute,
    PaymentRoute,
    ProfileRoute,
    PrivacyPolicyRoute,
    TermsOfServiceRoute,
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
