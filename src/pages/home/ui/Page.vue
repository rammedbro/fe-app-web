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

    <CarCarouselBlock title="Popular cars" :query="{ sortBy: ['rating'], limit: 10 }" />

    <CarCarouselBlock title="Cheap cars" :query="{ sortBy: ['price'], limit: 10 }" />
  </div>
</template>

<script setup lang="ts">
import { CarCarouselBlock } from '@/widgets/car-carousel-block';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import { PickupDropoffDesktop, PickupDropoffMobile } from '@/widgets/pickup-dropoff';
import { banner1ImgUrl, banner2ImgUrl } from '@/shared/assets/images';
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
</script>
