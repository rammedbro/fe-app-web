<template>
  <div class="container mx-auto">
    <template v-if="ordersAsync.isReady.value">
      <template v-for="(order, index) in ordersAsync.state.value" :key="order.id">
        <Divider v-if="index > 0" class="my-4" />
        <OrderCard v-bind="order" />
      </template>
    </template>
    <div v-else-if="ordersAsync.error.value" class="text-center">
      <p class="mb-4">
        Something went wrong while fetching your most recent rents :(<br />
        Try to push button bellow and see what happens!
      </p>
      <Button label="Retry" @click="() => ordersAsync.execute()" />
    </div>
    <Spinner v-else class="mx-auto block" />
  </div>
</template>

<script setup lang="ts">
import { OrderCard } from '@/entities/order';
import { getOrderList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Spinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const ordersAsync = useAsync(
  async () => {
    const { data } = await getOrderList<true>({
      query: {
        sortBy: ['createdAt'],
        sortDir: 'desc',
      },
      withCredentials: true,
    });
    return data;
  },
  [],
  {
    onError(e) {
      console.error(e?.message);
      toast.add({
        severity: 'error',
        summary: 'Fetch error',
        detail: 'Something went wrong while your recent rents.',
        life: 5000,
      });
    },
  }
);
</script>
