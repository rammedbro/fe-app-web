import { getCar } from '@/entities/car/api';
import { queryOptions, useQuery } from '@tanstack/vue-query';
import type { AxiosError } from 'axios';
import { MaybeRefOrGetter, toValue } from 'vue';
import type { GetCarReturn } from './types';

export const useCarQuery = (id: MaybeRefOrGetter<number>) => {
  const options = () =>
    queryOptions<GetCarReturn, AxiosError>({
      queryKey: ['car', id],
      queryFn: async () => {
        const { data } = await getCar<true>({ path: { id: toValue(id) } });

        return data;
      },
    });
  const query = () => useQuery<GetCarReturn, AxiosError>(options());

  return { query, options };
};
