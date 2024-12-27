<template>
<div class="lg:container px-4 py-8 mx-auto">
  <Carousel
    :value="banners"
    :num-visible="2"
    :show-navigators="false"
    :show-indicators="false"
    :autoplay-interval="0"
    circular
    :responsive-options="[
      { breakpoint: `${breakpointsTailwind.xl - 1}px`, numVisible: 1, numScroll: 1 },
    ]"
    content-class="-mx-4"
    class="mb-8"
  >
    <template #item="{data}">
      <div class="relative rounded-lg mx-4">
        <img :src="data.img" alt="" />
        <div class="absolute inset-y-0 left-0 md:right-1/3 text-white p-4 md:p-6">
          <div class="md:text-4xl lg:text-5xl xl:text-3xl font-semibold mb-3">{{ data.title }}</div>
          <p class="text-xs md:text-xl lg:text-3xl xl:text-lg font-medium mb-4 md:mb-8">{{ data.desc }}</p>
          <Button as="router-link" :to="data.link" label="Rental car" />
        </div>
      </div>
    </template>
  </Carousel>

  <PickupDropoffWidgetDesktop v-if="breakpoints.md.value" class="mb-8" />
  <PickupDropoffWidgetMobile v-else />

  <section class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <div class="text-content-300">Popular cars</div>

      <Button text link label="View All" />
    </div>

    <Carousel
      :value="cars"
      :num-visible="4"
      :num-scroll="1"
      :show-navigators="false"
      :responsive-options="defaultCarouselResponsiveOptions"
      content-class="-mx-2"
    >
      <template #item="{data}">
        <Card :img="data.img" class="mx-2" />
      </template>
    </Carousel>
  </section>

  <section class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <div class="text-content-300">Recommended cars</div>

      <Button text link label="View All" />
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-6">
      <Card v-for="car in cars" :key="car.img" :img="car.img" />
    </div>

    <div class="flex justify-center">
      <Button as="router-link" :to="{name: 'car-list'}" label="Show more" />
    </div>
  </section>
</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Banner1ImgUrl from '@/shared/assets/images/ads/banner-1.jpg';
import Banner2ImgUrl from '@/shared/assets/images/ads/banner-2.jpg';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { defaultCarouselResponsiveOptions } from '@/shared/const';
import { Card } from '@/shared/ui';
import { PickupDropoffWidgetDesktop, PickupDropoffWidgetMobile } from '@/widgets/pickup-dropoff';

const banners = [
  {
    title: 'The Best Platform for Car Rental',
    desc: 'Ease of doing a car rental safely and reliably. Of course at a low price.',
    link: '/cars',
    img: Banner1ImgUrl,
  },
  {
    title: 'Easy way to rent a car at a low price',
    desc: 'Providing cheap car rental services and safe and comfortable facilities.',
    link: '/cars',
    img: Banner2ImgUrl,
  },
];
const cars = [
  { img: 'https://primefaces.org/cdn/primevue/images/product/blue-t-shirt.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/bracelet.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/black-watch.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/blue-band.jpg' },
];
const breakpoints = useBreakpoints(breakpointsTailwind);
</script>
