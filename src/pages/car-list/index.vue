<template>
<div class="flex">
  <component
    :is="responsiveAsideComponent"
    v-model:visible="isDrawerVisible"
    v-bind="responsiveAsideComponentProps"
  >
    <section class="mb-14">
      <div class="text-content-300 mb-6">Type</div>
      <ul>
        <li
          v-for="item in ['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback']"
          :key="item"
          class="flex items-center mb-8"
        >
          <Checkbox class="mr-3" />
          <label class="text-lg font-semibold">
            <span class="text-content-400 mr-2">{{ item }}</span>
            <span class="text-content-300">(12)</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-14">
      <div class="text-content-300 mb-6">Capacity</div>
      <ul>
        <li
          v-for="item in [2, 4, 6, 8]"
          :key="item"
          class="flex items-center mb-8"
        >
          <Checkbox class="mr-3" />
          <label class="text-lg font-semibold">
            <span class="text-content-400 mr-2">Person</span>
            <span class="text-content-300">(4)</span>
          </label>
        </li>
      </ul>
    </section>

    <section>
      <div class="text-content-300 mb-6">Price</div>

      <div>
        <Slider class="mb-4" />
        <div class="flex items-center justify-between">
          <div class="text-sm text-content-300">0</div>
          <div class="text-sm text-content-300">100</div>
        </div>
      </div>
    </section>
  </component>

  <div class="flex-1 px-4 xl:px-8 py-8">
    <div class="md:flex md:justify-center">
      <PickupDropoffWidgetDesktop v-if="breakpoints.md.value" class="mb-6" />
      <PickupDropoffWidgetMobile v-else />
    </div>

    <div class="flex justify-end">
      <Toolbar v-if="!breakpoints.xl.value" class="rounded-full mb-6">
        <template #start>
          <Button icon="pi pi-filter" severity="secondary" text @click="isDrawerVisible = true" />
        </template>
        <template #end>
          <Button icon="pi pi-sort-alpha-down" severity="secondary" text />
        </template>
      </Toolbar>
    </div>

    <div class="flex flex-wrap justify-center xl:justify-start gap-4 mb-6">
      <Card v-for="car in cars" :key="car.img" :img="car.img" class="lg:max-w-[340px]" />
    </div>

    <div class="flex justify-center">
      <Paginator :rows="5" :total-records="120" :rows-per-page-options="[10,25,50,100]" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Checkbox from 'primevue/checkbox';
import Slider from 'primevue/slider';
import { Card } from '@/shared/ui';
import Paginator from 'primevue/paginator';
import Drawer from 'primevue/drawer';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { PickupDropoffWidgetDesktop, PickupDropoffWidgetMobile } from '@/widgets/pickup-dropoff';

const cars = [
  { img: 'https://primefaces.org/cdn/primevue/images/product/blue-t-shirt.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/bracelet.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/brown-purse.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/black-watch.jpg' },
  { img: 'https://primefaces.org/cdn/primevue/images/product/blue-band.jpg' },
];
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDrawerVisible = ref(false);
const responsiveAsideComponent = computed(() => breakpoints.xl.value ? 'aside' : Drawer);
const responsiveAsideComponentProps = computed(() =>
  breakpoints.xl.value
    ? { class: 'bg-white border-t-2 border-t-gray min-w-[320px] p-8' }
    : { header: 'Filters' },
);
</script>
