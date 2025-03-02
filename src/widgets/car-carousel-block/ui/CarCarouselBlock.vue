<template>
  <section v-intersection-observer.once="([e]: IntersectionObserverEntry[]) => e.isIntersecting && cars.execute()">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-content-300">
        <slot name="title">{{ props.title }}</slot>
      </div>

      <Button as="router-link" :to="{ name: CarListRouteName, query: props.query }" text label="View all" />
    </div>

    <Carousel
      v-if="cars.isReady.value"
      v-bind="props.carousel"
      :value="cars.state.value"
      :show-navigators="false"
      content-class="-mx-2"
      container-class="overflow-hidden"
    >
      <template #item="{ data }">
        <CarCard v-bind="data as Car" class="mx-2" />
      </template>
    </Carousel>
    <div v-else-if="cars.error.value" class="text-center">
      <p class="mb-4">
        Something went wrong while fetching cars :(<br />
        Try to push button bellow and see what happens!
      </p>
      <Button label="Retry" @click="() => cars.execute()" />
    </div>
    <Spinner v-else class="mx-auto block" />
  </section>
</template>

<script setup lang="ts">
import { CarCard, type Car } from '@/entities/car';
import { getCarList } from '@/shared/api/openapi';
import { useAsync } from '@/shared/lib/async.ts';
import { vIntersectionObserver } from '@/shared/lib/dom';
import { defaultCarouselResponsiveOptions } from '@/shared/model/breakpoints.ts';
import { CarListRouteName } from '@/shared/router/routes.ts';
import type { CarCarouselBlockProps } from '@/widgets/car-carousel-block/model/types';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Spinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';

const props = withDefaults(defineProps<CarCarouselBlockProps>(), {
  carousel: () => ({
    numVisible: 4,
    numScroll: 1,
    responsiveOptions: defaultCarouselResponsiveOptions,
  }),
});
const toast = useToast();
const cars = useAsync(
  async () => {
    const { data } = await getCarList<true>({ query: props.query });
    return data;
  },
  [],
  {
    immediate: false,
    onError(e) {
      console.error(e?.message);
      toast.add({
        severity: 'error',
        summary: 'Fetch error',
        detail: 'Something went wrong while fetching cars.',
        life: 5000,
      });
    },
  }
);
</script>
