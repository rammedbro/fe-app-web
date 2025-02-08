<template>
  <div class="lg:container px-4 py-8 mx-auto">
    <Carousel
      :value="banners"
      :num-visible="2"
      :show-navigators="false"
      :show-indicators="false"
      :autoplay-interval="0"
      circular
      :responsive-options="[{ breakpoint: `${breakpointsTailwind.xl - 1}px`, numVisible: 1, numScroll: 1 }]"
      content-class="-mx-4"
      class="mb-8"
    >
      <template #item="{ data }">
        <div class="relative rounded-lg mx-4">
          <img :src="data.img" alt="" />
          <div class="absolute inset-y-0 left-0 md:right-1/3 text-white p-4 md:p-6">
            <div class="md:text-4xl lg:text-5xl xl:text-3xl font-semibold mb-3">{{ data.title }}</div>
            <p class="text-xs md:text-xl lg:text-3xl xl:text-lg font-medium mb-4 md:mb-8">{{ data.desc }}</p>
            <Button as="router-link" :to="{ name: data.route }" label="Rental car" />
          </div>
        </div>
      </template>
    </Carousel>

    <PickupDropoffDesktop v-if="breakpoints.md.value" class="mb-8" />
    <PickupDropoffMobile v-else />

    <section
      v-intersection-observer="
        ([e]: IntersectionObserverEntry[]) => e?.isIntersecting && !popularCars.isReady.value && popularCars.execute()
      "
      class="mb-8"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="text-content-300">Popular cars</div>

        <Button
          as="router-link"
          :to="{ name: CarListRouteName, query: { sortBy: ['rating'] } }"
          text
          label="View all"
        />
      </div>

      <Carousel
        v-if="popularCars.isReady.value"
        :value="popularCars.state.value"
        :num-visible="4"
        :num-scroll="1"
        :show-navigators="false"
        :responsive-options="defaultCarouselResponsiveOptions"
        content-class="-mx-2"
      >
        <template #item="{ data }">
          <CarCard v-bind="data as Car" class="mx-2" />
        </template>
      </Carousel>
      <Spinner v-else class="block mx-auto" />
    </section>

    <section
      v-intersection-observer="
        ([e]: IntersectionObserverEntry[]) => e?.isIntersecting && !cheapCars.isReady.value && cheapCars.execute()
      "
      class="mb-8"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="text-content-300">Cheap cars</div>

        <Button as="router-link" :to="{ name: CarListRouteName, query: { sortBy: ['price'] } }" text label="View all" />
      </div>

      <div v-if="cheapCars.isReady.value">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-6">
          <CarCard v-for="car in cheapCars.state.value" :key="car.id" v-bind="car as Car" />
        </div>
        <div class="flex justify-center">
          <Button as="router-link" :to="{ name: CarListRouteName, query: { sortBy: ['price'] } }" label="Show more" />
        </div>
      </div>
      <Spinner v-else class="block mx-auto" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Spinner from 'primevue/progressspinner';
import { PickupDropoffDesktop, PickupDropoffMobile } from '@/widgets/pickup-dropoff';
import { getCarList } from '@/shared/api';
import { banner1ImgUrl, banner2ImgUrl } from '@/shared/assets/images';
import { useAsync } from '@/shared/lib/async';
import { defaultCarouselResponsiveOptions } from '@/shared/model/breakpoints';
import type { Car } from '@/shared/model/models';
import { CarCard } from '@/entities/car';
import { CarListRouteName } from '@/shared/router/routes';

const breakpoints = useBreakpoints(breakpointsTailwind);
const banners = [
  {
    title: 'The Best Platform for Car Rental',
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
const popularCars = useAsync(
  () => getCarList<true>({ query: { sortBy: ['rating'], limit: 10 } }).then((res) => res.data),
  [],
  { immediate: false }
);
const cheapCars = useAsync(
  () => getCarList<true>({ query: { sortBy: ['price'], limit: 10 } }).then((res) => res.data),
  [],
  { immediate: false }
);
</script>
