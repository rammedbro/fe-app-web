import { getOrder, type Order } from '@/entities/order';
import { defineStore } from 'pinia';

export const useOrderStore = defineStore('order', () => {
  const order = ref<Order>();

  async function fetchOrder(id: number) {
    const { data, status } = await getOrder<false>({ path: { id }, throwOnError: false });

    order.value = data;

    return status;
  }

  return {
    order,
    fetchOrder,
  };
});
