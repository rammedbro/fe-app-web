<template>
  <div class="block rounded-lg bg-white p-3 md:p-6">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div>
        <div class="text-lg font-bold">{{ brand }} {{ model }}</div>
        <div class="text-sm text-surface-400">{{ type }}</div>
      </div>

      <Button icon="pi pi-heart" variant="text" rounded />
    </div>

    <RouterLink :to="{ name: CarDetailRouteName, params: { id } }">
      <img :src="images[0]" :alt="`${brand} ${model}`" class="mb-6 h-[240px] w-full rounded-lg" />
    </RouterLink>

    <div class="mb-6 flex flex-wrap justify-between gap-2">
      <div class="flex items-center text-sm text-surface-400 md:text-base">
        <GasStationIcon class="mr-2 w-5 md:w-6" />
        <span>{{ gasoline }}L</span>
      </div>

      <div class="flex items-center text-sm text-surface-400 md:text-base">
        <SteeringWheelIcon class="mr-2 w-5 md:w-6" />
        <span>{{ steering }}</span>
      </div>

      <div class="flex items-center text-sm text-surface-400 md:text-base">
        <Profile2UserIcon class="mr-2 w-5 md:w-6" />
        <span>{{ capacity }} People</span>
      </div>
    </div>

    <div class="mt-auto flex items-center justify-between gap-4">
      <div>
        <div class="text-lg font-bold">
          ${{ totalPrice }} /
          <span class="text-sm font-medium text-surface-400">a day</span>
        </div>
        <div class="text-sm font-medium text-surface-400 line-through">${{ Number(price).toFixed(2) }}</div>
      </div>

      <Button as="router-link" :to="{ name: PaymentRouteName, params: { id } }" type="submit" label="Rent Now" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Car } from '@/entities/car/model/types';
import { CarDetailRouteName, PaymentRouteName } from '@/shared/router/routes.ts';
import { GasStationIcon, Profile2UserIcon, SteeringWheelIcon } from '@/shared/ui/icons';
import Button from 'primevue/button';

const { price, discount } = defineProps<Car>();

const totalPrice = computed(() => ((Number(price) * (100 - discount)) / 100).toFixed(2));
</script>
