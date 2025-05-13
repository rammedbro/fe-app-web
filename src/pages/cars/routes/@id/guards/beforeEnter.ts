import { useCarStore } from '@/entities/car';
import { renderError, validateRoute } from '@/shared/lib/router/abort';
import type { NavigationGuard } from 'vue-router';

export const beforeEnter: NavigationGuard = async (to) => {
  const id = Number(to.params.id);

  if (Number.isNaN(id)) {
    return renderError(to);
  }

  const status = await useCarStore().fetchCar(id);

  return validateRoute(to, status);
};
