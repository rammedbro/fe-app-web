import { useOrderStore } from '@/pages/profile/routes/orders/routes/@id/model/store';
import { renderError, validateRoute } from '@/shared/lib/router/abort';
import type { NavigationGuard } from 'vue-router';

export const beforeEnter: NavigationGuard = async (to) => {
  const id = Number(to.params.id);

  if (Number.isNaN(id)) {
    return renderError(to);
  }

  const status = await useOrderStore().fetchOrder(id);

  return validateRoute(to, status);
};
