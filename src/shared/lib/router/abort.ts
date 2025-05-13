import { ErrorRouteName } from '@/shared/model/routes';
import type { NavigationGuardReturn, RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

export function renderError(to: RouteLocationNormalized, status?: number): RouteLocationRaw {
  return {
    name: ErrorRouteName,
    params: { pathMatch: to.path.substring(1).split('/') },
    query: { ...to.query, status },
    hash: to.hash,
  };
}

export function validateRoute(to: RouteLocationNormalized, status?: number): NavigationGuardReturn {
  if (status === 200) {
    return true;
  }

  if (status === 404) {
    return renderError(to);
  }

  return renderError(to, status);
}
