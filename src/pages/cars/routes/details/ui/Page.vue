<template>
  <div class="container mx-auto py-8">
    <template v-if="car">
      <section class="mb-4 flex flex-col gap-4 md:mb-8 md:gap-8 lg:flex-row">
        <Galleria
          :value="car.images"
          :show-thumbnails="breakpoints.md.value"
          :show-item-navigators="!breakpoints.md.value"
          show-item-navigators-on-hover
          :num-visible="4"
          :responsive-options="[{ breakpoint: `${breakpointsTailwind.xl - 1}px`, numVisible: 3 }]"
          container-class="lg:w-1/2"
        >
          <template #item="{ item }">
            <UseImage v-slot="{ isLoading, error }" :src="item">
              <Image
                :src="error ? noImgUrl : item"
                :alt="title"
                :preview="breakpoints.md.value"
                class="w-full"
                image-class="h-[400px] w-full rounded-lg bg-white object-contain"
                :class="{ 'p-skeleton': isLoading }"
              />
            </UseImage>
          </template>
          <template #thumbnail="{ item }">
            <div class="px-2">
              <UseImage v-slot="{ isLoading, error }" :src="item">
                <img
                  :src="error ? noImgUrl : item"
                  :alt="title"
                  class="h-[85px] w-full rounded-lg bg-surface-200 object-contain"
                  :class="{ 'p-skeleton': isLoading }"
                />
              </UseImage>
            </div>
          </template>
        </Galleria>

        <div class="flex flex-col rounded-lg bg-white p-6 lg:w-1/2">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="mb-2 text-xl font-bold md:text-4xl">{{ title }}</div>
              <div class="mb-8 flex items-center gap-2">
                <Rating :model-value="4" readonly />
                <div class="text-sm text-surface-500">{{ car.views }} Views</div>
              </div>
            </div>

            <Button icon="pi pi-heart" variant="text" rounded />
          </div>

          <p class="mb-8 text-lg">{{ car.description }}</p>

          <div class="mb-auto grid grid-cols-4 justify-between gap-4">
            <div class="text-lg text-surface-400">Type</div>
            <div class="text-lg font-semibold">{{ car.type }}</div>

            <div class="text-lg text-surface-400">Capacity</div>
            <div class="text-lg font-semibold text-nowrap">{{ car.capacity }} Person</div>

            <div class="text-lg text-surface-400">Steering</div>
            <div class="text-lg font-semibold">{{ car.steering }}</div>

            <div class="text-lg text-surface-400">Gasoline</div>
            <div class="text-lg font-semibold">{{ car.gasoline }}L</div>
          </div>

          <div class="p-divider-horizontal my-8" />

          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="text-xl font-bold">
                ${{ ((Number(car.price) * (100 - car.discount)) / 100).toFixed(2) }} /
                <span class="font-semibold text-surface-400">a day</span>
              </div>
              <div class="font-semibold text-surface-400 line-through">${{ car.price }}</div>
            </div>

            <Button as="router-link" :to="{ name: CarPaymentRouteName }" label="Rent Now" size="large" class="w-1/2" />
          </div>
        </div>
      </section>

      <section class="mb-4 rounded-lg bg-white p-6 md:mb-8">
        <div class="mb-6 flex items-center gap-4">
          <div class="text-lg font-semibold">Reviews</div>
          <Badge :value="car.reviews.length" />
        </div>

        <div v-for="review in car.reviews" :key="review.id" class="mb-6 flex gap-4">
          <Avatar :image="review.user.avatar ?? undefined" circle size="large" />

          <div class="flex-1">
            <div class="mb-3 flex items-center justify-between">
              <div>
                <div class="mb-2 text-xl font-bold">{{ review.title }}</div>
                <div class="text-sm text-surface-400">{{ review.user.name }} {{ review.user.lastname }}</div>
              </div>

              <div>
                <div class="mb-2 text-right text-sm text-surface-400">
                  {{ new Date(review.createdAt).toLocaleDateString() }}
                </div>
                <Rating :model-value="review.rating" readonly />
              </div>
            </div>

            <p>{{ review.content }}</p>
          </div>
        </div>

        <div v-if="car.reviews.length > 5" class="flex justify-center">
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
import { noImgUrl } from '@/shared/assets/images';
import { CarPaymentRouteName } from '@/shared/router/routes';
import { CarCarouselBlock } from '@/widgets/car-carousel-block';
import { UseImage } from '@vueuse/components';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import Rating from 'primevue/rating';
import { onBeforeRouteUpdate } from 'vue-router';

const breakpoints = useBreakpoints(breakpointsTailwind);
const carStore = useCarStore();
const { car } = storeToRefs(carStore);
const title = computed(() => `${car.value?.brand} ${car.value?.model}`);

onBeforeRouteUpdate((to) => carStore.fetchCar(Number(to.params.id)));

function reload() {
  window.location.reload();
}
</script>
