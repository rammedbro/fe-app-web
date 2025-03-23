<template>
  <RouterLink
    :to="{ name: ProfileOrderDetailsRouteName, params: { id } }"
    class="flex items-center justify-between gap-4"
  >
    <UseImage v-slot="{ isLoading, error }" :src="car.images[0]">
      <img
        :src="error ? noImgUrl : car.images[0]"
        :alt="`${car.brand} ${car.model}`"
        class="size-30 rounded-lg object-contain"
        :class="{ 'p-skeleton': isLoading }"
      />
    </UseImage>
    <div class="text-right">
      <div class="font-bold">{{ car.brand }} {{ car.model }}</div>
      <div class="text-surface-400">{{ new Date(createdAt).toLocaleDateString() }}</div>
      <div class="font-bold">${{ price }}</div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Order } from '@/entities/order/model/types';
import { noImgUrl } from '@/shared/assets/images';
import { ProfileOrderDetailsRouteName } from '@/shared/router/routes.ts';
import { UseImage } from '@vueuse/components';

defineProps<Order>();
</script>
