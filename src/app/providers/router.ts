import { useAuthStore } from '@/entities/auth';
import { CarDetailRoute } from '@/pages/car-detail';
import { CarListRoute } from '@/pages/car-list';
import { ErrorRoute } from '@/pages/error';
import { PrivacyPolicyRoute } from '@/pages/help/privacy-policy';
import { TermsOfServiceRoute } from '@/pages/help/terms-of-service';
import { HomeRoute } from '@/pages/home';
import { PaymentRoute } from '@/pages/payment';
import { ProfileRoute } from '@/pages/profile';
import { SignInRoute } from '@/pages/sign-in';
import { SignUpRoute } from '@/pages/sign-up';
import { ErrorRouteName, ProfileDashboardRouteName, SignInRouteName } from '@/shared/router/routes.ts';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    HomeRoute,
    ErrorRoute,
    SignUpRoute,
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

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (!authStore.isLoaded) {
    const { error, status } = await authStore.fetchSession();

    if (status !== 200) {
      return next({ name: ErrorRouteName, query: { error } });
    }
  }

  if (to.meta.requiresAuth === true && !isAuthenticated.value) {
    next({ name: SignInRouteName });
  } else if (to.meta.requiresGuest === true && isAuthenticated.value) {
    next({ name: ProfileDashboardRouteName });
  } else {
    next();
  }
});

export { router };
