import { useAuthStore } from '@/entities/auth';
import { ErrorRoute } from '@/pages/_error';
import { CarsRoute } from '@/pages/cars';
import { PrivacyPolicyRoute } from '@/pages/help/privacy-policy';
import { TermsOfServiceRoute } from '@/pages/help/terms-of-service';
import { HomeRoute } from '@/pages/home';
import { ProfileRoute } from '@/pages/profile';
import { SignInRoute } from '@/pages/sign-in';
import { SignUpRoute } from '@/pages/sign-up';
import { logError } from '@/shared/lib/log';
import { renderError } from '@/shared/lib/router/abort';
import { ProfileDashboardRouteName, SignInRouteName } from '@/shared/model/routes';
import { useProgressBarStore } from '@/widgets/progress-bar';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    HomeRoute,
    SignUpRoute,
    SignInRoute,
    CarsRoute,
    ProfileRoute,
    PrivacyPolicyRoute,
    TermsOfServiceRoute,
    ErrorRoute,
  ],
  scrollBehavior(to, from, position) {
    /* Scroll to pages saved in history state harshly to imitate non-spa page navigation */
    if (position) {
      return position;
    }

    /* Scroll to #id dom elements with smooth */
    if (to.hash) {
      return { selector: to.hash, behavior: 'smooth' };
    }

    /* Scroll smoothly when it's the same page (e.g. when query params are changed)  */
    if (from.path === to.path) {
      return { top: 0, behavior: 'smooth' };
    }

    /* Scroll to new pages harshly to imitate non-spa page navigation */
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

router.onError((err, to) => {
  logError(err);
  router.replace(renderError(to, 500));
});

export { router };
