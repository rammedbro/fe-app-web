<template>
  <section v-intersection-observer.once="([e]: IntersectionObserverEntry[]) => e.isIntersecting && cars.execute()">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-surface-600 dark:text-surface-200">
        <slot name="title">{{ props.title }}</slot>
      </div>

      <Button as="router-link" :to="{ name: CarListRouteName, query: props.query }" text label="View all" class="" />
    </div>

    <Carousel
      v-bind="props.carousel"
      :value="cars.state.value"
      :show-navigators="false"
      content-class="-mx-2 mb-2"
      container-class="overflow-hidden"
    >
      <template #item="{ data }">
        <CarCard v-if="cars.isReady.value" v-bind="data as Car" class="mx-2" />
        <CarCardSkeleton v-else class="mx-2" />
      </template>
      <template #empty>
        <div class="text-center">
          <p class="mb-4">
            Something went wrong while fetching cars :(<br />
            Try to push button bellow and see what happens!
          </p>
          <Button label="Retry" class="w-60" @click="cars.execute()" />
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import { getCarList, type GetCarListOptions } from '@/entities/car/api';
import type { Car } from '@/entities/car/model/types';
import { useAsync } from '@/shared/lib/async';
import { vIntersectionObserver } from '@/shared/lib/dom';
import { defaultCarouselBreakpoints } from '@/shared/model/breakpoints';
import { CarListRouteName } from '@/shared/model/routes';
import Button from 'primevue/button';
import Carousel, { type CarouselProps } from 'primevue/carousel';
import { useToast } from 'primevue/usetoast';
import CarCard from './CarCard.vue';
import CarCardSkeleton from './CarCardSkeleton.vue';

interface CarCarouselProps {
  title?: string;
  query?: GetCarListOptions;
  carousel?: CarouselProps;
}

const props = withDefaults(defineProps<CarCarouselProps>(), {
  carousel: () => ({
    numVisible: 4,
    numScroll: 1,
    responsiveOptions: defaultCarouselBreakpoints,
  }),
});
const toast = useToast();
const cars = useAsync(
  async () => {
    const { data, error } = await getCarList<false>({ query: props.query, throwOnError: false });

    if (error) {
      console.error(error);
      toast.add({
        severity: 'error',
        summary: 'Fetch error',
        detail: 'Something went wrong while fetching cars.',
        life: 5000,
      });

      return [];
    }

    return data;
  },
  new Array(props.carousel.numVisible),
  { immediate: false }
);
</script>
