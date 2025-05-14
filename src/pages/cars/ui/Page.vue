<template>
  <div class="flex">
    <CarListAside v-model:visible="isDrawerVisible" v-model:filter="options" />

    <div class="flex-1 px-4 py-8 xl:px-8">
      <div class="md:flex md:justify-center">
        <PickupDropoff v-if="breakpoints.md.value" class="mb-6" />
      </div>

      <div class="flex justify-end">
        <div class="p-toolbar mb-6 rounded-full">
          <div class="p-toolbar-center">
            <Button
              v-if="!breakpoints.xl.value"
              icon="pi pi-filter"
              severity="secondary"
              text
              @click="isDrawerVisible = true"
            />
            <Button icon="pi pi-sort-alpha-down" severity="secondary" text @click="sortByPopoverRef?.toggle" />
            <Popover ref="sortByPopoverRef">
              <ListBox
                v-model="sortBy"
                :options="['brand', 'model', 'rating', 'price', 'gasoline']"
                multiple
                checkmark
                class="border-0 shadow-none"
              />
            </Popover>
          </div>
        </div>
      </div>

      <div ref="itemsRef" class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <template v-if="carsAsync.isReady.value">
          <CarCard
            v-for="car in carsAsync.state.value"
            v-if="carsAsync.state.value.length"
            :key="car.id"
            v-bind="car"
          />
          <div v-else class="col-span-full text-center">There are no cars available for your search :(</div>
        </template>
        <CarCardSkeleton v-for="n in limit" v-else-if="carsAsync.isLoading.value" :key="n" />
        <div v-else-if="carsAsync.error.value" class="col-span-full text-center">
          <p class="mb-4">
            Something went wrong while fetching cars :(<br />
            Try to push button bellow and see what happens!
          </p>
          <Button label="Retry" @click="carsAsync.execute(options)" />
        </div>
      </div>

      <div v-if="carsAsync.isReady.value" class="flex justify-center">
        <Paginator
          :rows="limit"
          :first="page > 1 ? (page - 1) * limit : 0"
          :total-records="totalCount"
          :rows-per-page-options="[10, 25, 50, 100]"
          @page="onUpdatePaginatorState"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCard, CarCardSkeleton, getCarList, type GetCarListOptions } from '@/entities/car';
import { useAsync } from '@/shared/lib/async';
import { ensureArray } from '@/shared/lib/objects';
import { useRouteQuery } from '@/shared/lib/router/useRouteQuery';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import type { SortDirection } from '@/shared/model/types';
import { PickupDropoff } from '@/widgets/pickup-dropoff';
import { useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import ListBox from 'primevue/listbox';
import Paginator, { type PageState } from 'primevue/paginator';
import Popover, { type PopoverMethods } from 'primevue/popover';
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';
import CarListAside from './Aside.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const itemsRef = ref<HTMLDivElement | null>(null);
const sortByPopoverRef = ref<PopoverMethods | null>(null);
const search = useRouteQuery('search', '');
const page = useRouteQuery('page', 1, { transform: Number });
const limit = useRouteQuery('limit', 10, { transform: Number });
const sortBy = useRouteQuery<string[]>('sortBy', [], { transform: ensureArray });
const sortDir = useRouteQuery<SortDirection>('sortDir', 'asc');
const options = reactive({
  search,
  page,
  limit,
  sortBy,
  sortDir,
});
const totalCount = ref(0);
const carsAsync = useAsync(
  async (args?: GetCarListOptions) => {
    const { data, headers } = await getCarList<true>({ query: args });

    totalCount.value = Number(headers['x-total-count']);

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
const breakpoints = useBreakpoints(defaultBreakpoints);
const isDrawerVisible = ref(false);

watch(options, async (value) => {
  await carsAsync.execute(value);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function onUpdatePaginatorState(state: PageState) {
  router.push({ query: { ...route.query, page: state.page + 1, limit: state.rows }, replace: true });
}
</script>
