<template>
  <div class="container mx-auto flex flex-wrap gap-8">
    <section class="flex flex-col bg-white rounded-lg p-6 gap-8">
      <div class="text-xl font-bold">Current rent</div>

      <Spinner v-if="recentOrdersAsync.isLoading.value" />
      <template v-else-if="currentOrder">
        <div class="flex items-center gap-4">
          <img :src="currentOrder.car.images[0]" :alt="currentOrder.car.brand" class="w-[130px] rounded-lg" />
          <div>
            <div class="font-bold">{{ currentOrder.car.brand }} {{ currentOrder.car.model }}</div>
            <div class="text-content-300">{{ currentOrder.car.type }}</div>
          </div>
          <div class="ml-auto">#{{ currentOrder.id }}</div>
        </div>

        <PickupDropoffForm>
          <template #title>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center justify-center bg-primary/30 w-4 h-4 rounded-full">
                <div class="bg-primary w-2 h-2 rounded-full" />
              </div>

              <div class="font-semibold">Pick - Up</div>
            </div>
          </template>
        </PickupDropoffForm>

        <PickupDropoffForm>
          <template #title>
            <div class="flex items-center gap-4 mb-4">
              <div class="flex items-center justify-center bg-primary/30 w-4 h-4 rounded-full">
                <div class="bg-primary w-2 h-2 rounded-full" />
              </div>

              <div class="font-semibold">Drop - Off</div>
            </div>
          </template>
        </PickupDropoffForm>

        <Divider />

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Rental Price</div>
            <div class="text-sm text-content-300">Overall price and includes rental discount</div>
          </div>

          <div class="text-4xl font-bold">${{ currentOrder.price }}</div>
        </div>
      </template>
      <template v-else>
        <p>
          There is no current rent :(<br />
          Click the button below and chose your first drive!
        </p>

        <Button as="router-link" :to="{ name: CarListRouteName }" label="Rent Now" />
      </template>
    </section>

    <section class="flex-1 bg-white rounded-lg p-6">
      <div class="text-xl font-bold mb-8">Recent transactions</div>

      <template v-if="recentOrdersAsync.isReady.value">
        <template v-for="(order, index) in recentOrdersAsync.state.value" :key="order.id">
          <Divider v-if="index > 0" class="my-4" />

          <div class="flex items-center gap-4">
            <img :src="order.car.images[0]" :alt="order.car.brand" class="w-[130px] rounded-lg" />
            <div>
              <div class="font-bold">{{ order.car.brand }} {{ order.car.model }}</div>
              <div class="text-content-300">{{ order.car.type }}</div>
            </div>
            <div class="ml-auto">
              <div class="text-content-300">{{ new Date(order.createdAt).toLocaleDateString() }}</div>
              <div class="font-bold text-right">{{ order.price }}</div>
            </div>
          </div>
        </template>
      </template>
      <Spinner v-else class="block mx-auto" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { CarListRouteName } from '@/shared/router/routes.ts';
import { useAsyncState } from '@vueuse/core';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Spinner from 'primevue/progressspinner';
import { PickupDropoffForm } from '@/widgets/pickup-dropoff';
import { useUserStore } from '@/entities/user';
import { getOrderList } from '@/shared/api';
import type { Order } from '@/shared/model/models.ts';

const { user } = useUserStore();
const currentOrder = ref<Order | undefined>();
const recentOrdersAsync = useAsyncState(async () => {
  const { data } = await getOrderList<true>({
    path: { id: user!.id },
    query: {
      sortBy: ['createdAt'],
      sortDir: 'desc',
    },
  });
  currentOrder.value = data[0];

  return data;
}, []);
</script>
