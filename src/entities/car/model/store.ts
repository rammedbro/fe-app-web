import { getCar } from '@/entities/car/api';
import type { GetCarReturn } from '@/entities/car/model/types';
import { defineStore } from 'pinia';

export const useCarStore = defineStore('car', () => {
  const car = ref<GetCarReturn>();

  async function fetchCar(id: number) {
    const { data, status } = await getCar<false>({ path: { id }, throwOnError: false });

    car.value = data;

    return status;
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
