<template>
  <div class="flex">
    <CarListAside v-model:visible="isDrawerVisible" v-model:filter="options" />

    <div class="flex-1 px-4 xl:px-8 py-8">
      <div class="md:flex md:justify-center">
        <PickupDropoffDesktop v-if="breakpoints.md.value" class="mb-6" />
        <PickupDropoffMobile v-else />
      </div>

      <div class="flex justify-end">
        <Toolbar class="rounded-full mb-6">
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

      <div ref="itemsRef" class="flex flex-wrap justify-center xl:justify-start gap-4 mb-6">
        <template v-if="carsAsync.isReady.value">
          <CarCard v-for="car in carsAsync.state.value" :key="car.id" v-bind="car" class="lg:max-w-[340px]" />
        </template>
        <template v-else>
          <div v-for="n in limit" :key="n" class="block bg-white rounded-lg w-full max-w-[340px] p-3 md:p-6">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="w-full">
                <Skeleton height="18px" class="mb-2" />
                <Skeleton height="12px" />
              </div>

              <Skeleton size="40px" />
            </div>
            <Skeleton height="160px" class="mb-4" />
            <div class="grid grid-cols-3 gap-2 mb-6">
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </div>
            <div class="flex items-center justify-between gap-4 mt-auto">
              <Skeleton width="60%" height="30px" />
              <Skeleton width="40%" height="44px" />
            </div>
          </div>
        </template>
      </div>

      <div class="flex justify-center">
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
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import ListBox from 'primevue/listbox';
import Paginator, { type PageState } from 'primevue/paginator';
import Popover, { type PopoverMethods } from 'primevue/popover';
import Skeleton from 'primevue/skeleton';
import Toolbar from 'primevue/toolbar';
import { useRouter, useRoute } from 'vue-router';
import CarListAside from './Aside.vue';
import { PickupDropoffDesktop, PickupDropoffMobile } from '@/widgets/pickup-dropoff';
import { getCarList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async';
import { useRouteQuery } from '@/shared/lib/router';
import { ensureArray } from '@/shared/lib/objects';
import type { GetCarListOptions, SortDirection } from '@/shared/model/models';
import { CarCard } from '@/entities/car';

const router = useRouter();
const route = useRoute();
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

    // page.value = Number(headers['x-page']);
    totalCount.value = Number(headers['x-total-count']);

    return data;
  },
  [],
  { immediate: false }
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
