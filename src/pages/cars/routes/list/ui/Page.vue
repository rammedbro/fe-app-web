<template>
  <div class="flex">
    <CarListAside v-model:visible="isDrawerVisible" v-model:filter="options" />

    <div class="flex-1 px-4 py-8 xl:px-8">
      <div class="md:flex md:justify-center">
        <PickupDropoff v-if="breakpoints.md.value" class="mb-6" />
      </div>

      <div class="flex justify-end">
        <Toolbar class="mb-6 rounded-full">
          <template #center>
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
          </template>
        </Toolbar>
      </div>

      <div ref="itemsRef" class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <template v-if="carsAsync.isReady.value">
          <CarCard v-for="car in carsAsync.state.value" :key="car.id" v-bind="car" />
        </template>
        <div v-else-if="carsAsync.error.value" class="w-full text-center">
          <p class="mb-4">
            Something went wrong while fetching cars :(<br />
            Try to push button bellow and see what happens!
          </p>
          <Button label="Retry" @click="() => carsAsync.execute(options)" />
        </div>
        <template v-else>
          <CarCardSkeleton v-for="n in limit" :key="n" />
        </template>
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
import { CarCard, CarCardSkeleton, type GetCarListOptions } from '@/entities/car';
import { getCarList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async';
import { ensureArray } from '@/shared/lib/objects';
import { useRouteQuery } from '@/shared/lib/router';
import type { SortDirection } from '@/shared/model/models';
import { PickupDropoff } from '@/widgets/pickup-dropoff';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import ListBox from 'primevue/listbox';
import Paginator, { type PageState } from 'primevue/paginator';
import Popover, { type PopoverMethods } from 'primevue/popover';
import Toolbar from 'primevue/toolbar';
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';
import CarListAside from './Aside.vue';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const itemsRef = ref<HTMLDivElement | null>(null);
const sortByPopoverRef = ref<PopoverMethods | null>(null);
const page = useRouteQuery('page', 1, { transform: Number });
const limit = useRouteQuery('limit', 10, { transform: Number });
const sortBy = useRouteQuery<string[]>('sortBy', [], { transform: ensureArray });
const sortDir = useRouteQuery<SortDirection>('sortDir', 'asc');
const options = reactive({
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
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDrawerVisible = ref(false);

watch(options, async (value) => {
  await carsAsync.execute(value);
  itemsRef.value?.scrollIntoView({ behavior: 'smooth' });
});

function onUpdatePaginatorState(state: PageState) {
  router.push({ query: { ...route.query, page: state.page + 1, limit: state.rows }, replace: true });
}
</script>
