import { getCar } from '@/shared/api';
import { defineStore } from 'pinia';
import type { GetCarReturn } from './types';

export const useCarStore = defineStore('car', () => {
  const car = ref<GetCarReturn>();

  async function fetchCar(id: number) {
    if (car.value?.id === id) return;

    const { data } = await getCar<true>({ path: { id } });
    car.value = data;
  }

  function calcTotalPrice(price: string, discount: number) {
    return ((Number(price) * (100 - discount)) / 100).toFixed(2);
  }

  return {
    car,
    calcTotalPrice,
    fetchCar,
  };
});
