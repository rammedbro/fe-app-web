<template>
  <div class="mx-auto lg:container">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <template v-if="favorites.isSuccess.value">
        <template v-if="favorites.data.value.length">
          <CarCard v-for="item in favorites.data.value" :key="item.car.id" v-bind="item.car" />
        </template>
        <div v-else class="col-span-full text-center">
          <p class="mb-4">There is no a single car in your favorites :(</p>
          <Button as="router-link" :to="{ name: CarListRouteName }" label="Look for a car" class="w-60" />
        </div>
      </template>

      <template v-if="favorites.isPending.value">
        <CarCardSkeleton v-for="n in 10" v-if="favorites.isPending" :key="n" />
      </template>

      <div v-if="favorites.isError.value" class="col-span-full text-center">
        <p class="mb-4">Something went wrong while fetching your most favorite cars :(</p>
        <Button label="Retry" class="w-60" @click="favoriteStore.fetchFavorites()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCard, CarCardSkeleton } from '@/entities/car';
import { useFavoriteStore } from '@/entities/favorite';
import { CarListRouteName } from '@/shared/model/routes';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';

const favoriteStore = useFavoriteStore();
const favorites = storeToRefs(favoriteStore);
</script>
