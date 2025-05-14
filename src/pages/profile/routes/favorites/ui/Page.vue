<template>
  <div class="mx-auto lg:container">
    <div
      v-if="favoritesAsync.isReady || favoritesAsync.isLoading"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <CarCard
        v-for="item in favoritesAsync.state"
        v-if="favoritesAsync.isReady"
        :key="item.car.id"
        v-bind="item.car"
      />
      <CarCardSkeleton v-for="n in 10" v-if="favoritesAsync.isLoading" :key="n" />
    </div>
    <div v-if="favoritesAsync.isReady && favoritesAsync.state.length === 0" class="w-full text-center">
      <p class="mb-4">There is no a single car in your favorites :(</p>
      <Button as="router-link" :to="{ name: CarListRouteName }" label="Look for a car" class="w-60" />
    </div>
    <div v-if="favoritesAsync.error" class="w-full text-center">
      <p class="mb-4">Something went wrong while fetching your most favorite cars :(</p>
      <Button label="Retry" class="w-60" @click="fetchFavorites()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCard, CarCardSkeleton } from '@/entities/car';
import { useFavoriteStore } from '@/entities/favorite';
import { CarListRouteName } from '@/shared/model/routes';
import Button from 'primevue/button';

const { favoritesAsync, fetchFavorites } = useFavoriteStore();
</script>
