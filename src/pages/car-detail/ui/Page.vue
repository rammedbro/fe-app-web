<template>
  <div class="container py-8 mx-auto">
    <template v-if="car">
      <section class="flex flex-col lg:flex-row gap-4 md:gap-8 mb-4 md:mb-8">
        <Galleria
          :value="car.images"
          :show-item-navigators="!breakpoints.md.value"
          :show-thumbnails="breakpoints.md.value"
          :num-visible="4"
          :responsive-options="[{ breakpoint: `${breakpointsTailwind.xl - 1}px`, numVisible: 3 }]"
          container-class="lg:w-1/2"
        >
          <template #item="{ item }">
            <img :src="item" :alt="title" class="rounded-lg w-full h-[400px]" />
          </template>
          <template #thumbnail="{ item }">
            <div class="px-4">
              <img :src="item" :alt="title" class="rounded-lg" />
            </div>
          </template>
        </Galleria>

        <div class="flex flex-col lg:w-1/2 bg-white drop-shadow-md rounded-lg p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-xl md:text-4xl font-bold mb-2">{{ title }}</div>
              <div class="flex items-center gap-2 mb-8">
                <Rating :model-value="4" readonly />
                <div class="text-sm text-content-400">{{ car.views }} Views</div>
              </div>
            </div>

            <Button icon="pi pi-heart" variant="text" rounded />
          </div>

          <p class="text-lg mb-8">{{ car.description }}</p>

          <div class="grid grid-cols-4 justify-between gap-4 mb-8">
            <div class="text-lg text-content-300">Type</div>
            <div class="text-lg font-semibold">{{ car.type }}</div>

            <div class="text-lg text-content-300">Capacity</div>
            <div class="text-lg font-semibold text-nowrap">{{ car.capacity }} Person</div>

            <div class="text-lg text-content-300">Steering</div>
            <div class="text-lg font-semibold">{{ car.steering }}</div>

            <div class="text-lg text-content-300">Gasoline</div>
            <div class="text-lg font-semibold">{{ car.gasoline }}L</div>
          </div>

          <div class="flex items-center justify-between gap-4 mt-auto">
            <div>
              <div class="text-xl font-bold">
                ${{ ((Number(car.price) * (100 - car.discount)) / 100).toFixed(2) }} /
                <span class="font-semibold text-content-300">a day</span>
              </div>
              <div class="font-semibold text-content-300 line-through">${{ car.price }}</div>
            </div>

            <Button as="router-link" :to="{ name: PaymentRouteName }" label="Rent Now" />
          </div>
        </div>
      </section>

      <section class="bg-white drop-shadow-md rounded-lg p-6 mb-4 md:mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-lg font-semibold">Reviews</div>
          <Badge :value="car.reviews.length" />
        </div>

        <div v-for="review in car.reviews" :key="review.id" class="flex gap-4 mb-6">
          <Avatar :image="review.user.avatar ?? undefined" circle size="large" />

          <div class="flex-1">
            <div class="flex items-center justify-between mb-3">
              <div>
                <div class="text-xl font-bold mb-2">{{ review.title }}</div>
                <div class="text-sm text-content-300">{{ review.user.name }} {{ review.user.lastname }}</div>
              </div>

              <div>
                <div class="text-sm text-content-300 text-right mb-2">
                  {{ new Date(review.createdAt).toLocaleDateString() }}
                </div>
                <Rating :model-value="review.rating" readonly />
              </div>
            </div>

            <p>{{ review.content }}</p>
          </div>
        </div>

        <div class="flex justify-center">
          <Button text label="Show more" icon="pi pi-chevron-down" icon-pos="right" />
        </div>
      </section>

      <CarCarouselBlock title="Recent cars" :query="{ sortBy: ['createdAt'], sortDir: 'desc', limit: 10 }" />

      <CarCarouselBlock title="Recommended cars" :query="{ sortBy: ['rating'], limit: 10 }" />
    </template>
    <div v-else class="text-center">
      <p class="mb-4">
        Something went wrong while fetching a car :(<br />
        Try to push button bellow and see what happens!
      </p>
      <Button label="Reload" @click="reload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarStore } from '@/entities/car';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Galleria from 'primevue/galleria';
import Rating from 'primevue/rating';
import { PaymentRouteName } from '@/shared/router/routes';
import { CarCarouselBlock } from '@/widgets/car-carousel-block';
import { onBeforeRouteUpdate } from 'vue-router';
import { beforeEnter } from '@/pages/car-detail/router/guards';

const breakpoints = useBreakpoints(breakpointsTailwind);
const { car } = storeToRefs(useCarStore());
const title = computed(() => `${car.value?.brand} ${car.value?.model}`);

onBeforeRouteUpdate((...args) => beforeEnter(...args));

function reload() {
  window.location.reload();
}
</script>
