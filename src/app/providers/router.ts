import { useAuthStore } from '@/entities/auth';
import { CarsRoute } from '@/pages/cars';
import { ErrorRoute } from '@/pages/error';
import { PrivacyPolicyRoute } from '@/pages/help/privacy-policy';
import { TermsOfServiceRoute } from '@/pages/help/terms-of-service';
import { HomeRoute } from '@/pages/home';
import { ProfileRoute } from '@/pages/profile';
import { SignInRoute } from '@/pages/sign-in';
import { SignUpRoute } from '@/pages/sign-up';
import { ProfileDashboardRouteName, SignInRouteName } from '@/shared/router/routes.ts';
import { useProgressBarStore } from '@/widgets/progress-bar';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    HomeRoute,
    ErrorRoute,
    SignUpRoute,
    SignInRoute,
    CarsRoute,
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
  const progressBarStore = useProgressBarStore();
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  progressBarStore.show();

  if (!authStore.isLoaded) {
    await authStore.fetchSession();
  }

  if (to.meta.requiresAuth === true && !isAuthenticated.value) {
    next({ name: SignInRouteName });
  } else if (to.meta.requiresGuest === true && isAuthenticated.value) {
    next({ name: ProfileDashboardRouteName });
  } else {
    next();
  }
});

router.afterEach(() => {
  const progressBarStore = useProgressBarStore();

  progressBarStore.hide();
});

export { router };
