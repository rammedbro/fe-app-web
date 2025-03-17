<template>
  <component :is="responsiveAsideComponent" v-model:visible="visible" v-bind="responsiveAsideComponentProps">
    <section class="mb-10">
      <div class="mb-6 text-surface-400">Type</div>
      <ul>
        <li v-for="item in Object.values(CarType)" :key="item" class="mb-4 flex items-center">
          <Checkbox v-model="type" :value="item" :input-id="`type-${item}`" class="mr-3" />
          <label :for="`type-${item}`" class="text-lg font-semibold">
            <span class="mr-2 text-surface-500">{{ item }}</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">Steering</div>
      <ul>
        <li v-for="item in Object.values(CarSteering)" :key="item" class="mb-4 flex items-center">
          <Checkbox v-model="steering" :value="item" :input-id="`steering-${item}`" class="mr-3" />
          <label :for="`steering-${item}`" class="text-lg font-semibold">
            <span class="mr-2 text-surface-500">{{ item }}</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">Capacity</div>
      <ul>
        <li v-for="item in [2, 4, 6, 8]" :key="item" class="mb-4 flex items-center">
          <Checkbox v-model="capacity" :value="item" :input-id="`capacity-${item}`" class="mr-3" />
          <label :for="`capacity-${item}`" class="text-lg font-semibold">
            <span class="mr-2 text-surface-500">{{ item }} Person</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">Gasoline</div>

      <div>
        <Slider v-model.lazy="gasoline" :min="0" :max="100" class="mb-4" />
        <div class="flex items-center justify-between">
          <div class="text-sm text-surface-400">0</div>
          <div class="text-sm text-surface-400">{{ gasoline }}</div>
          <div class="text-sm text-surface-400">100</div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">Price</div>

      <div>
        <Slider v-model.lazy="price" :min="0" :max="500" class="mb-4" />
        <div class="flex items-center justify-between">
          <div class="text-sm text-surface-400">0</div>
          <div class="text-sm text-surface-400">{{ price }}</div>
          <div class="text-sm text-surface-400">500</div>
        </div>
      </div>
    </section>

    <section>
      <Button label="Clear" size="large" @click="clearFilter" />
    </section>
  </component>
</template>

<script setup lang="ts">
import { CarSteering, CarType, type GetCarListOptions } from '@/entities/car';
import { ensureArray } from '@/shared/lib/objects';
import { useRouteQuery } from '@/shared/lib/router';
import { breakpointsTailwind, useBreakpoints, watchDebounced } from '@vueuse/core';
import isEqual from 'lodash/isEqual';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Drawer from 'primevue/drawer';
import Slider from 'primevue/slider';
import { useRoute, useRouter } from 'vue-router';

const visible = defineModel<boolean>('visible', { default: false });
const filter = defineModel<GetCarListOptions>('filter', { default: () => ({}) });

const router = useRouter();
const route = useRoute();
const breakpoints = useBreakpoints(breakpointsTailwind);
const responsiveAsideComponent = computed(() => (breakpoints.xl.value ? 'aside' : Drawer));
const responsiveAsideComponentProps = computed(() =>
  breakpoints.xl.value ? { class: 'bg-white border-t-2 border-t-gray min-w-[320px] p-8' } : { header: 'Filters' }
);

const type = useRouteQuery<CarType[]>('type', [], { transform: ensureArray });
const steering = useRouteQuery<CarSteering[]>('steering', [], { transform: ensureArray });
const capacity = useRouteQuery<string[], number[]>('capacity', [], { transform: (v) => ensureArray(v).map(Number) });
const gasoline = useRouteQuery<number | undefined>('gasoline', undefined, { transform: (v) => Number(v) || undefined });
const price = useRouteQuery<number | undefined>('price', undefined, { transform: (v) => Number(v) || undefined });

watchDebounced(
  [type, steering, capacity, gasoline, price],
  (value, oldValue) => {
    if (isEqual(value, oldValue)) {
      return;
    }

    filter.value.type = type.value;
    filter.value.steering = steering.value;
    filter.value.capacity = capacity.value;
    filter.value.gasoline = gasoline.value;
    filter.value.price = price.value?.toFixed(2);
  },
  { immediate: true, debounce: 1000 }
);

function clearFilter() {
  // TODO: Implement correct logic when undefined in query refs will be supported
  router.push({ path: route.path });
}
</script>
