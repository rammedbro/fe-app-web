<template>
  <div class="p-card p-3 md:p-6">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div>
        <div class="text-lg font-bold">{{ brand }} {{ model }}</div>
        <div class="text-sm text-surface-400">{{ type }}</div>
      </div>

      <FavoriteButton :car-id="id" />
    </div>

    <RouterLink :to="{ name: CarDetailsRouteName, params: { id } }">
      <UseImage v-slot="{ isLoading, error }" :src="images[0]">
        <img
          :src="error ? noImgUrl : images[0]"
          :alt="`${brand} ${model}`"
          class="mb-6 h-60 w-full rounded-lg object-contain"
          :class="{ 'p-skeleton': isLoading }"
        />
      </UseImage>
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

      <Button
        as="router-link"
        :to="{ name: CarPaymentRouteName, params: { id } }"
        type="submit"
        label="Rent Now"
        class="w-1/2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarStore } from '@/entities/car/model/store';
import type { Car } from '@/entities/car/model/types';
import { FavoriteButton } from '@/entities/favorite';
import { noImgUrl } from '@/shared/assets/images';
import { CarDetailsRouteName, CarPaymentRouteName } from '@/shared/model/routes';
import { GasStationIcon, Profile2UserIcon, SteeringWheelIcon } from '@/shared/ui/icons';
import { UseImage } from '@vueuse/components';
import Button from 'primevue/button';

const { id, price, discount } = defineProps<Car>();

const carStore = useCarStore();
const totalPrice = computed(() => carStore.calcTotalPrice(price, discount));
</script>
