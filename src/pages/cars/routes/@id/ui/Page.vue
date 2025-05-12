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
          :responsive-options="[{ breakpoint: `${defaultBreakpoints.xl - 1}px`, numVisible: 3 }]"
          container-class="lg:w-1/2"
        >
          <template #item="{ item }">
            <UseImage v-slot="{ isLoading, error }" :src="item">
              <Image
                :src="error ? noImgUrl : item"
                :alt="title"
                :preview="breakpoints.md.value"
                class="w-full"
                image-class="h-[400px] w-full rounded-lg bg-white dark:bg-surface-800 object-contain"
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
                  class="h-[85px] w-full rounded-lg bg-surface-200 object-contain dark:bg-surface-800"
                  :class="{ 'p-skeleton': isLoading }"
                />
              </UseImage>
            </div>
          </template>
        </Galleria>

        <div class="p-card flex flex-col p-6 lg:w-1/2">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="mb-2 text-xl font-bold md:text-4xl">{{ title }}</div>
              <div class="mb-8 flex items-center gap-2">
                <Rating :model-value="4" readonly />
                <div class="text-sm text-surface-500">{{ car.views }} Views</div>
              </div>
            </div>

            <Button
              icon="pi"
              :icon-class="{ 'pi-heart': !isFavorite, 'pi-heart-fill': isFavorite }"
              variant="text"
              rounded
              size="large"
              @click="userStore.toggleFavorite(car.id)"
            />
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

      <section class="p-card mb-4 p-6 md:mb-8">
        <div class="mb-6 flex items-center gap-4">
          <div class="text-lg font-semibold">Reviews</div>
          <Badge :value="car.reviews.length" />
        </div>

        <ReviewCard v-for="review in car.reviews" :key="review.id" v-bind="review" class="mb-6" />

        <div v-if="car.reviews.length > 5" class="flex justify-center">
          <Button text label="Show more" icon="pi pi-chevron-down" icon-pos="right" />
        </div>
      </section>

      <CarCarousel title="Recent cars" :query="{ sortBy: ['createdAt'], sortDir: 'desc', limit: 10 }" />

      <CarCarousel title="Recommended cars" :query="{ sortBy: ['rating'], limit: 10 }" />
    </template>
    <div v-else class="text-center">
      <p class="mb-4">Something went wrong while fetching a car :(</p>
      <Button label="Reload" size="large" class="w-full" @click="reload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCarousel, useCarSocket, useCarStore } from '@/entities/car';
import { ReviewCard } from '@/entities/review';
import { useUserStore } from '@/entities/user';
import { noImgUrl } from '@/shared/assets/images';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { CarPaymentRouteName } from '@/shared/model/routes';
import { UseImage } from '@vueuse/components';
import { useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import Rating from 'primevue/rating';
import { useToast } from 'primevue/usetoast';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps<{ id: number }>();
const toast = useToast();
const breakpoints = useBreakpoints(defaultBreakpoints);
const carStore = useCarStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);
const { car } = storeToRefs(carStore);
const title = computed(() => `${car.value?.brand} ${car.value?.model}`);
const isFavorite = computed(() => user.favorites.value.has(props.id));
const carSocket = useCarSocket(props.id);

carSocket.on('addReview', (review) => {
  car.value?.reviews.push(review);
  toast.add({
    severity: 'info',
    summary: "We've got a new review",
    detail: 'Looks like somebody said a few words about this car. Go check it bellow 👇',
    life: 5000,
  });
});
onBeforeRouteUpdate((to) => carStore.fetchCar(Number(to.params.id)));

function reload() {
  window.location.reload();
}
</script>
