import { useOrderQuery } from '@/entities/order';
import { renderError, validateRoute } from '@/shared/lib/router/abort';
import { useQueryClient } from '@tanstack/vue-query';
import { AxiosError } from 'axios';
import type { NavigationGuard } from 'vue-router';

export const beforeEnter: NavigationGuard = async (to) => {
  const id = Number(to.params.id as string);

  if (Number.isNaN(id)) {
    return renderError(to);
  }

  const queryClient = useQueryClient();
  const queryOptions = useOrderQuery(id).options();

  try {
    await queryClient.fetchQuery(queryOptions);
    return true;
  } catch (e) {
    return validateRoute(to, e instanceof AxiosError ? e.status : undefined);
  }
};
