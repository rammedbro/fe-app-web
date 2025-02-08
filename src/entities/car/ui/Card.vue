<template>
  <div class="block bg-white rounded-lg p-3 md:p-6">
    <div class="flex items-start justify-between gap-4 mb-4">
      <div>
        <div class="text-lg font-bold">{{ brand }} {{ model }}</div>
        <div class="text-sm text-content-300">{{ type }}</div>
      </div>

      <Button icon="pi pi-heart" variant="text" rounded />
    </div>

    <RouterLink :to="{ name: CarDetailRouteName, params: { id } }">
      <img :src="images[0]" :alt="`${brand} ${model}`" class="w-full h-[240px] rounded-lg mb-6" />
    </RouterLink>

    <div class="flex flex-wrap justify-between gap-2 mb-6">
      <div class="flex items-center text-sm md:text-base text-content-300">
        <GasStationIcon class="w-5 md:w-6 mr-2" />
        <span>{{ gasoline }}L</span>
      </div>

      <div class="flex items-center text-sm md:text-base text-content-300">
        <SteeringWheelIcon class="w-5 md:w-6 mr-2" />
        <span>{{ steering }}</span>
      </div>

      <div class="flex items-center text-sm md:text-base text-content-300">
        <Profile2UserIcon class="w-5 md:w-6 mr-2" />
        <span>{{ capacity }} People</span>
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 mt-auto">
      <div>
        <div class="text-lg font-bold">
          ${{ totalPrice }} /
          <span class="text-sm font-medium text-content-300">a day</span>
        </div>
        <div class="text-sm font-medium text-content-300 line-through">${{ Number(price).toFixed(2) }}</div>
      </div>

      <Button as="router-link" :to="{ name: PaymentRouteName, params: { id } }" type="submit" label="Rent Now" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarDetailRouteName, PaymentRouteName } from '@/shared/router/routes.ts';
import Button from 'primevue/button';
import type { Car } from '@/shared/model/models';
import { GasStationIcon, Profile2UserIcon, SteeringWheelIcon } from '@/shared/ui/icons';

const { price, discount } = defineProps<Car>();

const totalPrice = computed(() => ((Number(price) * (100 - discount)) / 100).toFixed(2));
</script>
