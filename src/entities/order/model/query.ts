import { getOrder, getOrderList, GetOrderListOptions } from '@/entities/order/api';
import { queryOptions, useQuery } from '@tanstack/vue-query';

export function useOrderQuery(id: MaybeRefOrGetter<number>) {
  const options = () =>
    queryOptions({
      queryKey: ['order', id],
      queryFn: async () => {
        const { data } = await getOrder<true>({ path: { id: toValue(id) }, withCredentials: true });

        return data;
      },
    });
  const query = () => useQuery(options());

  return { query, options };
}

export function useOrderListQuery(options: MaybeRefOrGetter<GetOrderListOptions>) {
  return useQuery({
    queryKey: ['order-list', options],
    queryFn: async () => {
      const { data } = await getOrderList<true>({
        query: toValue(options),
        withCredentials: true,
      });

      return data;
    },
  });
}
