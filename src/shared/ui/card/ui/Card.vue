<template>
<RouterLink
  :to="{name: 'car-detail', params: {id: '0'}}"
  class="block bg-white rounded-lg p-3 md:p-6"
>
  <div class="flex items-start justify-between gap-4 mb-4">
    <div>
      <div class="text-lg font-bold">Nissan GT - R</div>
      <div class="text-sm text-content-300">Sport</div>
    </div>

    <Button icon="pi pi-heart" variant="text" rounded />
  </div>

  <img :src="img" alt="" class="w-full rounded-lg mb-6" />

  <div class="flex flex-wrap justify-between gap-2 mb-6">
    <div class="flex items-center text-sm md:text-base text-content-300">
      <GasStationIcon class="w-5 md:w-6 mr-2" />
      <span>90L</span>
    </div>

    <div class="flex items-center text-sm md:text-base text-content-300">
      <SteeringWheelIcon class="w-5 md:w-6 mr-2" />
      <span>Manual</span>
    </div>

    <div class="flex items-center text-sm md:text-base text-content-300">
      <Profile2UserIcon class="w-5 md:w-6 mr-2" />
      <span>2 People</span>
    </div>
  </div>

  <div class="flex items-center justify-between gap-4 mt-auto">
    <div>
      <div class="text-lg font-bold">
        $80.00 /
        <span class="text-sm font-medium text-content-300">a day</span>
      </div>
      <div class="text-sm font-medium text-content-300 line-through">$100.00</div>
    </div>

    <Button
      as="router-link"
      :to="{name: 'payment'}"
      type="submit"
      label="Rent Now"
    />
  </div>
</RouterLink>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { GasStationIcon, Profile2UserIcon, SteeringWheelIcon } from '@/shared/ui';

defineProps<{
  img: string;
}>();
</script>
