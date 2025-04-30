<template>
  <div class="mx-auto grid gap-4 lg:max-w-200">
    <OrderCard
      v-for="order in ordersAsync.state.value"
      v-if="ordersAsync.isReady.value"
      :key="order.id"
      v-bind="order"
      class="p-card p-4"
    />
    <div v-else-if="ordersAsync.error.value" class="text-center">
      <p class="mb-4">
        Something went wrong while fetching your most recent rents :(<br />
        Try to push button bellow and see what happens!
      </p>
      <Button label="Retry" @click="() => ordersAsync.execute()" />
    </div>
    <template v-else>
      <template v-for="n in 5" :key="n">
        <div v-if="n > 1" class="p-divider-horizontal" />
        <OrderCardSkeleton />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { getOrderList, OrderCard, OrderCardSkeleton } from '@/entities/order';
import { useAsync } from '@/shared/lib/async';
import Button from 'primevue/button';
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
