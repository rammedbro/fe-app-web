<template>
<div class="container py-8 mx-auto">
  <section class="flex flex-col lg:flex-row gap-4 md:gap-8 mb-4 md:mb-8">
    <Galleria
      :value="galleryImages"
      :show-item-navigators="!breakpoints.md.value"
      :show-thumbnails="breakpoints.md.value"
      :num-visible="4"
      :responsive-options="[{ breakpoint: `${breakpointsTailwind.xl - 1}px`, numVisible: 3 },]"
      container-class="lg:w-1/2"
    >
      <template #item="{item}">
        <img :src="item.src" :alt="item.alt" class="rounded-lg w-full max-h-[400px]" />
      </template>
      <template #thumbnail="{item}">
        <div class="px-4">
          <img :src="item.src" :alt="item.alt" class="rounded-lg" />
        </div>
      </template>
    </Galleria>

    <div class="flex flex-col lg:w-1/2 bg-white drop-shadow-md rounded-lg p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-xl md:text-4xl font-bold mb-2">Nissan GT - R</div>
          <div class="flex items-center gap-2 mb-8">
            <Rating :model-value="4" />
            <div class="text-sm text-content-400">440+ Reviews</div>
          </div>
        </div>

        <Button icon="pi pi-heart" variant="text" rounded />
      </div>

      <p class="text-lg mb-8">
        NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving
        ground, the "race track".
      </p>

      <div class="grid grid-cols-4 justify-between gap-4 mb-8">
        <div class="text-lg text-content-300">Type</div>
        <div class="text-lg font-semibold">Sport</div>

        <div class="text-lg text-content-300">Capacity</div>
        <div class="text-lg font-semibold text-nowrap">2 Person</div>

        <div class="text-lg text-content-300">Steering</div>
        <div class="text-lg font-semibold">Manual</div>

        <div class="text-lg text-content-300">Gasoline</div>
        <div class="text-lg font-semibold">70L</div>
      </div>

      <div class="flex items-center justify-between gap-4 mt-auto">
        <div>
          <div class="text-xl font-bold">$80.00 / <span class="font-semibold text-content-300">a day</span></div>
          <div class="font-semibold text-content-300 line-through">$100.00</div>
        </div>

        <Button type="submit" label="Rent Now" />
      </div>
    </div>
  </section>

  <section class="bg-white drop-shadow-md rounded-lg p-6 mb-4 md:mb-8">
    <div class="flex items-center gap-4 mb-6">
      <div class="text-lg font-semibold">Reviews</div>
      <Badge value="13" />
    </div>

    <div class="flex gap-4 mb-6">
      <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" circle size="large" />

      <div class="flex-1">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="text-xl font-bold mb-2">Alex Stanton</div>
            <div class="text-sm text-content-300">CEO at Bukalapak</div>
          </div>

          <div>
            <div class="text-sm text-content-300 text-right mb-2">21 July 2022</div>
            <Rating :model-value="4" />
          </div>
        </div>

        <p>
          We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of
          cars with good and comfortable facilities. In addition, the service provided by the officers is also very
          friendly and very polite.
        </p>
      </div>
    </div>

    <div class="flex justify-center">
      <Button text label="Show more" icon="pi pi-chevron-down" icon-pos="right" />
    </div>
  </section>

  <section>
    <div class="flex items-center justify-between mb-4">
      <div class="text-content-300">Recent cars</div>

      <Button text link label="View All" />
    </div>

    <Carousel
      :value="recentCars"
      :num-visible="3"
      :show-navigators="false"
      :responsive-options="defaultCarouselResponsiveOptions"
      content-class="-mx-4"
    >
      <template #item="{data}">
        <Card :img="data.img" class="mx-4" />
      </template>
    </Carousel>
  </section>

  <section>
    <div class="flex items-center justify-between mb-4">
      <div class="text-content-300">Recommended cars</div>

      <Button text link label="View All" />
    </div>

    <Carousel
      :value="recentCars"
      :num-visible="3"
      :show-navigators="false"
      :responsive-options="defaultCarouselResponsiveOptions"
      content-class="-mx-4"
    >
      <template #item="{data}">
        <Card :img="data.img" class="mx-4" />
      </template>
    </Carousel>
  </section>
</div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';
import Rating from 'primevue/rating';
import { defaultCarouselResponsiveOptions } from '@/shared/model';
import { Card } from '@/shared/ui';

const galleryImages = [
  { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg', alt: 'Placeholder image' },
  { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg', alt: 'Placeholder image' },
  { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg', alt: 'Placeholder image' },
  { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg', alt: 'Placeholder image' },
  { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg', alt: 'Placeholder image' },
  { src: 'https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg', alt: 'Placeholder image' },
];
const recentCars = [
  { img: 'https://primefaces.org/cdn/primevue/images/product/blue-t-shirt.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/bracelet.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/black-watch.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/blue-band.jpg' },
];
const breakpoints = useBreakpoints(breakpointsTailwind);
</script>
