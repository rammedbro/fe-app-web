<template>
  <section>
    <div class="mb-8 flex items-center justify-between">
      <span class="text-xl font-bold">Recent Transactions</span>
      <Button as="router-link" :to="{ name: ProfileOrderListRouteName }" text label="View All" class="text-sm" />
    </div>

    <template v-if="recentOrdersAsync.isSuccess.value">
      <template v-if="recentOrdersAsync.data.value?.length">
        <template v-for="(order, index) in recentOrdersAsync.data.value" :key="order.id">
          <div v-if="index > 0" class="p-divider-horizontal my-4" />
          <OrderCard v-bind="order" />
        </template>
      </template>
      <div v-else class="text-center">
        <p class="mb-4">
          You've not made a single order :(<br />
          Go checkout our car park, it's amazing!
        </p>
        <Button as="router-link" :to="{ name: CarListRouteName }" label="Rent now" class="w-full" />
      </div>
    </template>

    <template v-if="recentOrdersAsync.isPending.value">
      <template v-for="n in 4" :key="n">
        <div v-if="n > 1" class="p-divider-horizontal my-4" />
        <OrderCardSkeleton />
      </template>
    </template>

    <div v-if="recentOrdersAsync.isError.value">
      <p class="mb-4">Something went wrong while fetching your most recent rents :(</p>
      <Button label="Retry" class="w-full" @click="recentOrdersAsync.refetch()" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { OrderCard, OrderCardSkeleton, useOrderListQuery } from '@/entities/order';
import { CarListRouteName, ProfileOrderListRouteName } from '@/shared/model/routes';
import Button from 'primevue/button';

const recentOrdersAsync = useOrderListQuery({
  sortBy: ['createdAt'],
  sortDir: 'desc',
  page: 1,
  limit: 5,
});
</script>
