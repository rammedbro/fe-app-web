<template>
  <div class="mx-auto lg:container">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <template v-if="favoritesAsync.isReady.value">
        <CarCard v-for="car in favoritesAsync.state.value" :key="car.id" v-bind="car" />
      </template>
      <div v-else-if="favoritesAsync.error.value" class="w-full text-center">
        <p class="mb-4">
          Something went wrong while fetching your most favorite cars :(<br />
          Try to push button bellow and see what happens!
        </p>
        <Button label="Retry" @click="() => favoritesAsync.execute()" />
      </div>
      <template v-else>
        <CarCardSkeleton v-for="n in 10" :key="n" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCard, CarCardSkeleton } from '@/entities/car';
import { getFavoriteList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async.ts';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
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
</script>
