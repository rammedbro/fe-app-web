<template>
  <section v-intersection-observer.once="([e]: IntersectionObserverEntry[]) => (isVisible = e.isIntersecting)">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-surface-600 dark:text-surface-200">
        <slot name="title">{{ props.title }}</slot>
      </div>

      <Button as="router-link" :to="{ name: CarListRouteName, query: props.query }" text label="View all" class="" />
    </div>

    <Carousel
      v-bind="props.carousel"
      :value="carsAsync.data.value"
      :show-navigators="false"
      content-class="-mx-2 mb-2"
      container-class="overflow-hidden"
    >
      <template v-if="carsAsync.isSuccess.value" #item="{ data: item }">
        <CarCardSkeleton v-if="carsAsync.isPlaceholderData.value" class="mx-2" />
        <CarCard v-else v-bind="item as Car" class="mx-2" />
      </template>

      <template #empty>
        <div class="text-center">
          <p class="mb-4">
            Something went wrong while fetching cars :(<br />
            Try to push button bellow and see what happens!
          </p>
          <Button label="Retry" class="w-60" @click="carsAsync.refetch()" />
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
import { getCarList, type GetCarListOptions } from '@/entities/car/api';
import type { Car } from '@/entities/car/model/types';
import { vIntersectionObserver } from '@/shared/lib/dom';
import { defaultCarouselBreakpoints } from '@/shared/model/breakpoints';
import { CarListRouteName } from '@/shared/model/routes';
import { skipToken, useQuery } from '@tanstack/vue-query';
import Button from 'primevue/button';
import Carousel, { type CarouselProps } from 'primevue/carousel';
import CarCard from './CarCard.vue';
import CarCardSkeleton from './CarCardSkeleton.vue';

interface Props {
  title?: string;
  query?: GetCarListOptions;
  carousel?: CarouselProps;
}

const props = withDefaults(defineProps<Props>(), {
  query: () => ({}),
  carousel: () => ({
    numVisible: 4,
    numScroll: 1,
    responsiveOptions: defaultCarouselBreakpoints,
  }),
});
const isVisible = ref(false);
const queryFn = computed(() =>
  isVisible.value
    ? async () => {
        const { data } = await getCarList<true>({ query: props.query });
        return data;
      }
    : skipToken
);
const carsAsync = useQuery({
  queryKey: ['cars', props.query],
  queryFn,
  placeholderData: Array(props.carousel.numVisible),
});
</script>
