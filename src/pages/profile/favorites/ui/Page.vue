<template>
  <div class="container mx-auto">
    <div v-if="favoritesAsync.isReady.value" class="flex flex-wrap justify-center gap-4">
      <CarCard v-for="car in favoritesAsync.state.value" :key="car.id" v-bind="car" class="lg:max-w-[340px]" />
    </div>
    <Spinner v-else class="block mx-auto" />
  </div>
</template>

<script setup lang="ts">
import { useAsyncState } from '@vueuse/core';
import Spinner from 'primevue/progressspinner';
import { useUserStore } from '@/entities/user';
import { getFavoriteList } from '@/shared/api';
import { CarCard } from '@/entities/car';

const { user } = useUserStore();
const favoritesAsync = useAsyncState(async () => {
  const { data } = await getFavoriteList<true>({ path: { id: user!.id } });

  return data;
}, []);
</script>
