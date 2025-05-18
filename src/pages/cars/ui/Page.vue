<template>
  <div class="flex">
    <CarListAside v-model:visible="isDrawerVisible" v-model:filter="filter" :title="t('pages.cars.aside.title')" />

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
                :options="sortByListOptions"
                option-label="label"
                option-value="value"
                multiple
                checkmark
                class="border-0 shadow-none"
              />
            </Popover>
          </div>
        </div>
      </div>

      <div ref="itemsRef" class="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <template v-if="carsAsync.isSuccess.value">
          <template v-if="cars.length">
            <CarCard v-for="car in cars" :key="car.id" v-bind="car" />
          </template>
          <div v-else class="col-span-full text-center">
            <p class="mb-4">{{ t('shared.messages.info.empty') }}</p>
            <Button :label="t('shared.buttons.clear')" class="w-60" @click="clearOptions" />
          </div>
        </template>

        <template v-if="carsAsync.isPending.value">
          <CarCardSkeleton v-for="n in limit" :key="n" />
        </template>

        <div v-if="carsAsync.isError.value" class="col-span-full text-center">
          <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
          <Button :label="t('shared.buttons.reload')" class="w-60" @click="carsAsync.refetch()" />
        </div>
      </div>

      <div v-if="carsAsync.isSuccess.value" class="flex justify-center">
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
import { CarCard, CarCardSkeleton, getCarList, GetCarListOptions, mergeCarMessages } from '@/entities/car';
import messages from '@/pages/cars/i18n/messages.json';
import { ensureArray } from '@/shared/lib/objects';
import { useRouteQuery } from '@/shared/lib/router/useRouteQuery';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import type { SortDirection } from '@/shared/model/types';
import { PickupDropoff } from '@/widgets/pickup-dropoff';
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import ListBox from 'primevue/listbox';
import Paginator, { type PageState } from 'primevue/paginator';
import Popover, { type PopoverMethods } from 'primevue/popover';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import CarListAside from './Aside.vue';

const { t } = useI18n({ messages: mergeCarMessages(messages) });
const router = useRouter();
const route = useRoute();
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
const filter = reactive<GetCarListOptions>({});
const isFilterSet = computed(() => Object.keys(filter).length > 0);
const carsAsync = useQuery({
  queryKey: ['cars', options, filter],
  queryFn: async () => {
    const { data, headers } = await getCarList<true>({ query: { ...options, ...filter } });

    return { data, headers };
  },
  placeholderData: keepPreviousData,
  enabled: isFilterSet,
});
const cars = computed(() => carsAsync.data.value?.data || []);
const totalCount = computed(() => Number(carsAsync.data.value?.headers['x-total-count'] || 0));
const breakpoints = useBreakpoints(defaultBreakpoints);
const isDrawerVisible = ref(false);
const sortByListOptions = computed(() => [
  { label: t('entities.car.fields.brand.label'), value: 'brand' },
  { label: t('entities.car.fields.model.label'), value: 'model' },
  { label: t('entities.car.fields.rating.label'), value: 'rating' },
  { label: t('entities.car.fields.gasoline.label'), value: 'gasoline' },
  { label: t('entities.car.fields.price.label'), value: 'price' },
]);

function onUpdatePaginatorState(state: PageState) {
  router.push({
    query: {
      ...route.query,
      page: state.page + 1,
      limit: state.rows,
    },
  });
}

function clearOptions() {
  router.push({ path: route.path });
}
</script>
