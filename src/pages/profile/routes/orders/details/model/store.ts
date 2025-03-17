import type { Order } from '@/entities/order';
import { getOrder } from '@/shared/api/openapi';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', () => {
  const order = ref<Order>();

  async function fetchOrder(id: number) {
    if (order.value?.id === id) return;

    const { data } = await getOrder<true>({ path: { id } });

    order.value = data;
  }

  return {
    order,
    fetchOrder,
  };
});
