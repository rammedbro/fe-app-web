<template>
  <RouterLink :to="{ name: ProfileOrderDetailsRouteName, params: { id } }" class="flex gap-4">
    <img :src="car.images[0]" :alt="car.brand" class="mb-4 h-30 w-1/3 rounded-lg" />
    <div>
      <div class="font-bold">{{ car.brand }} {{ car.model }}</div>
      <div class="text-surface-400">{{ car.type }}</div>
    </div>
    <div class="ml-auto">
      <div class="text-surface-400">{{ new Date(createdAt).toLocaleDateString() }}</div>
      <div class="text-right font-bold">${{ price }}</div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Order } from '@/entities/order/model/types';
import { ProfileOrderDetailsRouteName } from '@/shared/router/routes.ts';

defineProps<Order>();
</script>
