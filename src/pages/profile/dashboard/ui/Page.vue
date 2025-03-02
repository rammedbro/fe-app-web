<template>
  <div class="container mx-auto flex flex-col gap-8 md:flex-row">
    <section class="flex flex-1 flex-col gap-8 rounded-lg bg-white p-6">
      <div class="text-xl font-bold">Current rent</div>

      <Spinner v-if="recentOrdersAsync.isLoading.value" />
      <template v-else-if="currentOrder">
        <div class="flex items-center gap-4">
          <img :src="currentOrder.car.images[0]" :alt="currentOrder.car.brand" class="w-[130px] rounded-lg" />
          <div>
            <div class="font-bold">{{ currentOrder.car.brand }} {{ currentOrder.car.model }}</div>
            <div class="text-surface-400">{{ currentOrder.car.type }}</div>
          </div>
          <div class="ml-auto">#{{ currentOrder.id }}</div>
        </div>

        <template v-if="breakpoints.lg.value">
          <PickupDropoffForm>
            <template #title>
              <div class="mb-4 flex items-center gap-4">
                <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary/30">
                  <div class="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div class="font-semibold">Pick - Up</div>
              </div>
            </template>
          </PickupDropoffForm>

          <PickupDropoffForm>
            <template #title>
              <div class="mb-4 flex items-center gap-4">
                <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary/30">
                  <div class="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div class="font-semibold">Drop - Off</div>
              </div>
            </template>
          </PickupDropoffForm>
        </template>

        <Divider />

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Rental Price</div>
            <div class="text-sm text-surface-400">Overall price and includes rental discount</div>
          </div>

          <div class="text-4xl font-bold">${{ currentOrder.price }}</div>
        </div>
      </template>
      <template v-else>
        <p>
          There is no current rent :(<br />
          Click the button below and chose your first drive!
        </p>

        <Button as="router-link" :to="{ name: CarListRouteName }" label="Rent now" />
      </template>
    </section>

    <section class="rounded-lg bg-white p-6">
      <div class="mb-8 text-xl font-bold">Recent transactions</div>

      <template v-if="recentOrdersAsync.isReady.value">
        <template v-for="(order, index) in recentOrdersAsync.state.value" :key="order.id">
          <Divider v-if="index > 0" class="my-4" />

          <img :src="order.car.images[0]" :alt="order.car.brand" class="mb-4 h-30 w-full rounded-lg" />
          <div class="flex items-center gap-4">
            <div>
              <div class="font-bold">{{ order.car.brand }} {{ order.car.model }}</div>
              <div class="text-surface-400">{{ order.car.type }}</div>
            </div>
            <div class="ml-auto">
              <div class="text-surface-400">{{ new Date(order.createdAt).toLocaleDateString() }}</div>
              <div class="text-right font-bold">${{ order.price }}</div>
            </div>
          </div>
        </template>
      </template>
      <div v-else-if="recentOrdersAsync.error.value" class="text-center">
        <p class="mb-4">
          Something went wrong while fetching your most recent rents :(<br />
          Try to push button bellow and see what happens!
        </p>
        <Button label="Retry" @click="() => recentOrdersAsync.execute()" />
      </div>
      <Spinner v-else class="mx-auto block" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { getOrderList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async.ts';
import type { Order } from '@/shared/model/models.ts';
import { CarListRouteName } from '@/shared/router/routes.ts';
import { PickupDropoffForm } from '@/widgets/pickup-dropoff';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Spinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';

const breakpoints = useBreakpoints(breakpointsTailwind);
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
