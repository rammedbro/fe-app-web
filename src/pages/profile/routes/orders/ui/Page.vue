<template>
  <div class="mx-auto grid gap-4 lg:max-w-200">
    <template v-if="ordersAsync.isSuccess.value">
      <OrderCard v-for="order in ordersAsync.data.value" :key="order.id" v-bind="order" class="p-card p-4" />
    </template>

    <template v-if="ordersAsync.isPending.value">
      <OrderCardSkeleton v-for="n in 5" :key="n" class="p-card p-4" />
    </template>

    <div v-if="ordersAsync.isError.value" class="text-center">
      <p class="mb-4">
        Something went wrong while fetching your most recent rents :(<br />
        Try to push button bellow and see what happens!
      </p>
      <Button label="Retry" class="w-60" @click="ordersAsync.refetch()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderCard, OrderCardSkeleton, useOrderListQuery } from '@/entities/order';
import Button from 'primevue/button';

const ordersAsync = useOrderListQuery({
  sortBy: ['createdAt'],
  sortDir: 'desc',
});
</script>
