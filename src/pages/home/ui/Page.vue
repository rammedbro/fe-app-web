<template>
  <div class="container mx-auto py-8">
    <Carousel
      :value="banners"
      :num-visible="2"
      :show-navigators="false"
      :show-indicators="false"
      :autoplay-interval="0"
      circular
      :responsive-options="[{ breakpoint: `${defaultBreakpoints.xl - 1}px`, numVisible: 1, numScroll: 1 }]"
      content-class="-mx-4"
      container-class="overflow-hidden"
      class="mb-8"
    >
      <template #item="{ data, index }">
        <div class="relative mx-4 overflow-hidden rounded-xl">
          <img :src="data.img" :alt="`benner-${index}`" />
          <div class="absolute inset-y-0 right-0 left-0 p-4 text-white md:p-6">
            <template v-if="breakpoints.xl.value">
              <div class="mb-4 text-3xl font-semibold">{{ data.title }}</div>
              <p class="mb-8 w-3/4 text-xl font-medium">{{ data.desc }}</p>
              <Button as="router-link" :to="{ name: data.route }" label="Rental car" size="large" class="w-2/4" />
            </template>
            <div
              v-else
              class="flex h-full w-full items-center justify-center text-lg font-semibold md:text-4xl lg:text-5xl"
            >
              {{ data.title }}
            </div>
          </div>
        </div>
      </template>
    </Carousel>

    <PickupDropoff v-if="breakpoints.md.value" class="mb-8" />

    <CarCarousel title="Popular cars" :query="{ sortBy: ['rating'], limit: 10 }" />

    <CarCarousel title="Cheap cars" :query="{ sortBy: ['price'], limit: 10 }" />
  </div>
</template>

<script setup lang="ts">
import { CarCarousel } from '@/entities/car';
import { banner1ImgUrl, banner2ImgUrl } from '@/shared/assets/images';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { CarListRouteName } from '@/shared/model/routes';
import { PickupDropoff } from '@/widgets/pickup-dropoff';
import { useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';

const breakpoints = useBreakpoints(defaultBreakpoints);
const banners = [
  {
    title: 'The Best Platform For Car Rental',
    desc: 'Ease of doing a car rental safely and reliably. Of course at a low price.',
    route: CarListRouteName,
    img: banner1ImgUrl,
  },
  {
    title: 'Easy way to rent a car at a low price',
    desc: 'Providing cheap car rental services and safe and comfortable facilities.',
    route: CarListRouteName,
    img: banner2ImgUrl,
  },
];
</script>
