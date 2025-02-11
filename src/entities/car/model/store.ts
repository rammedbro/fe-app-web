import { getCar as getCarFromApi } from '@/shared/api';
import type { GetCarReturn } from './types';
import { defineStore } from 'pinia';

export const useCarStore = defineStore('carStore', () => {
  const car = ref<GetCarReturn | null>(null);

  async function getCar(id: number) {
    const { data } = await getCarFromApi<true>({ path: { id } });
    car.value = data;
  }

  return {
    car,
    getCar,
  };
});
