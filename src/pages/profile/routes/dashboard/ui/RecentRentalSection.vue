<template>
  <section>
    <div class="mb-8 flex items-center justify-between">
      <span class="text-xl font-bold">Recent Transactions</span>
      <Button as="router-link" :to="{ name: ProfileOrderListRouteName }" text label="View All" class="text-sm" />
    </div>

    <template v-if="recentOrdersAsync.isReady.value">
      <template v-for="(order, index) in recentOrdersAsync.state.value" :key="order.id">
        <div v-if="index > 0" class="p-divider-horizontal my-4" />
        <OrderCard v-bind="order" />
      </template>
    </template>
    <template v-else-if="recentOrdersAsync.isLoading.value">
      <template v-for="n in 4" :key="n">
        <div v-if="n > 1" class="p-divider-horizontal my-4" />
        <OrderCardSkeleton />
      </template>
    </template>
    <div v-else>
      <p class="mb-4">Something went wrong while fetching your most recent rents :(</p>
      <Button label="Retry" class="w-full" @click="recentOrdersAsync.execute()" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getOrderList, OrderCard, OrderCardSkeleton } from '@/entities/order';
import { useAsync } from '@/shared/lib/async';
import { ProfileOrderListRouteName } from '@/shared/model/routes';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const recentOrdersAsync = useAsync(
  async () => {
    const { data } = await getOrderList<true>({
      query: {
        sortBy: ['createdAt'],
        sortDir: 'desc',
        page: 1,
        limit: 5,
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
