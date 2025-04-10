<template>
  <div class="mx-auto flex flex-col gap-4 lg:container lg:flex-row lg:gap-8">
    <section class="p-card flex flex-1 flex-col gap-4 p-4 md:gap-8 xl:p-8">
      <div class="text-xl font-bold">Current rent</div>

      <template v-if="recentOrdersAsync.isLoading.value">
        <OrderCardSkeleton />
        <div class="p-divider-horizontal" />
        <div class="flex items-center justify-between">
          <div class="w-2/4">
            <div class="p-skeleton mb-2 h-4 w-2/3" />
            <div class="p-skeleton h-4 w-full" />
          </div>
          <div class="p-skeleton h-12 w-1/4" />
        </div>
      </template>
      <template v-else-if="currentOrder">
        <div class="flex items-center gap-4">
          <UseImage v-slot="{ isLoading, error }" :src="currentOrder.car.images[0]">
            <img
              :src="error ? noImgUrl : currentOrder.car.images[0]"
              :alt="`${currentOrder.car.brand} ${currentOrder.car.model}`"
              class="size-30 rounded-lg object-contain"
              :class="{ 'p-skeleton': isLoading }"
            />
          </UseImage>
          <div>
            <div class="font-bold">{{ currentOrder.car.brand }} {{ currentOrder.car.model }}</div>
            <div class="text-surface-400">{{ currentOrder.car.type }}</div>
          </div>
          <div class="ml-auto">#{{ currentOrder.id }}</div>
        </div>

        <div class="p-divider-horizontal mt-0" />

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Rental Price</div>
            <div class="text-sm text-surface-400">Overall price and includes rental discount</div>
          </div>

          <div class="text-4xl font-bold">${{ currentOrder.price }}</div>
        </div>
      </template>
      <div v-else>
        <p class="mb-4">
          There is no current rent :(<br />
          Click the button below and chose your first drive!
        </p>

        <Button as="router-link" :to="{ name: CarListRouteName }" label="Rent now" class="w-60" />
      </div>
    </section>

    <section class="p-card p-4 lg:w-[340px] xl:p-8">
      <div class="mb-8 text-xl font-bold">Recent transactions</div>

      <template v-if="recentOrdersAsync.isReady.value">
        <template v-for="(order, index) in recentOrdersAsync.state.value" :key="order.id">
          <div v-if="index > 0" class="p-divider-horizontal my-4" />
          <OrderCard v-bind="order" />
        </template>
      </template>
      <div v-else-if="recentOrdersAsync.error.value">
        <p class="mb-4">Something went wrong while fetching your most recent rents :(</p>
        <Button label="Retry" class="w-full" @click="recentOrdersAsync.execute()" />
      </div>
      <template v-else>
        <template v-for="n in 4" :key="n">
          <div v-if="n > 1" class="p-divider-horizontal my-4" />
          <OrderCardSkeleton />
        </template>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getOrderList, OrderCard, OrderCardSkeleton, type Order } from '@/entities/order';
import { noImgUrl } from '@/shared/assets/images';
import { useAsync } from '@/shared/lib/async';
import { CarListRouteName } from '@/shared/model/routes';
import { UseImage } from '@vueuse/components';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const currentOrder = ref<Order>();
const recentOrdersAsync = useAsync(
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
    immediate: false,
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

onMounted(async () => {
  const orders = await recentOrdersAsync.execute();

  if (orders.length) {
    currentOrder.value = orders[0];
  }
});
</script>
