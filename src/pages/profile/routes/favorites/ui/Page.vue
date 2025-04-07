<template>
  <div class="mx-auto lg:container">
    <div
      v-if="favoritesAsync.isReady.value || favoritesAsync.isLoading.value"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <CarCard
        v-for="car in favoritesAsync.state.value"
        v-if="favoritesAsync.isReady.value"
        :key="car.id"
        v-bind="car"
      />
      <CarCardSkeleton v-for="n in 10" v-if="favoritesAsync.isLoading.value" :key="n" />
    </div>
    <div v-if="favoritesAsync.isReady.value && favoritesAsync.state.value.length === 0" class="w-full text-center">
      <p class="mb-4">There is no a signle car in your favorites :(</p>
      <Button as="router-link" :to="{ name: CarListRouteName }" label="Look for a car" class="w-60" />
    </div>
    <div v-if="favoritesAsync.error.value" class="w-full text-center">
      <p class="mb-4">Something went wrong while fetching your most favorite cars :(</p>
      <Button label="Retry" class="w-60" @click="favoritesAsync.execute()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCard, CarCardSkeleton } from '@/entities/car';
import { useUserStore } from '@/entities/user';
import { getFavoriteList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async.ts';
import { CarListRouteName } from '@/shared/router/routes';
import { watchDebounced } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const userStore = useUserStore();
const user = storeToRefs(userStore);
const favoritesAsync = useAsync(
  async () => {
    const { data } = await getFavoriteList<true>({ withCredentials: true });
    return data;
  },
  [],
  {
    onError(e) {
      console.error(e?.message);
      toast.add({
        severity: 'error',
        summary: 'Fetch error',
        detail: 'Something went wrong while fetching your favorite cars.',
        life: 5000,
      });
    },
  }
);

watchDebounced(
  user.favorites.value,
  () => {
    favoritesAsync.execute();
  },
  { debounce: 1500 }
);
</script>
