<template>
  <component :is="responsiveAsideComponent" v-model:visible="visible" v-bind="responsiveAsideComponentProps">
    <section class="mb-10">
      <div class="mb-6 text-surface-400">{{ t('entities.car.fields.type.label') }}</div>
      <ul>
        <li v-for="item in Object.values(CarType)" :key="item" class="mb-4 flex items-center">
          <Checkbox v-model="type" :value="item" :input-id="`type-${item}`" class="mr-3" />
          <label :for="`type-${item}`" class="text-md font-semibold">
            <span class="mr-2">{{ item }}</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">{{ t('entities.car.fields.steering.label') }}</div>
      <ul>
        <li v-for="item in Object.values(CarSteering)" :key="item" class="mb-4 flex items-center">
          <Checkbox v-model="steering" :value="item" :input-id="`steering-${item}`" class="mr-3" />
          <label :for="`steering-${item}`" class="text-md font-semibold">
            <span class="mr-2">{{ t(`entities.car.fields.steering.values.${item}`) }}</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">{{ t('entities.car.fields.capacity.label') }}</div>
      <ul>
        <li v-for="item in Object.values(CarCapacity)" :key="item" class="mb-4 flex items-center">
          <Checkbox v-model="capacity" :value="item" :input-id="`capacity-${item}`" class="mr-3" />
          <label :for="`capacity-${item}`" class="text-md font-semibold">
            <span class="mr-2">{{ t('entities.car.fields.capacity.value', [item]) }}</span>
          </label>
        </li>
      </ul>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">{{ t('entities.car.fields.gasoline.label') }}</div>
      <Slider v-model="gasoline" :min="0" :max="100" class="mb-4" />
      <div class="flex items-center justify-between text-sm">
        <span>0</span>
        <span>{{ gasoline }}</span>
        <span>100</span>
      </div>
    </section>

    <section class="mb-10">
      <div class="mb-6 text-surface-400">{{ t('entities.car.fields.price.label') }}</div>
      <Slider v-model="price" :min="0" :max="500" class="mb-4" />
      <div class="flex items-center justify-between text-sm">
        <span>0</span>
        <span>{{ price }}</span>
        <span>500</span>
      </div>
    </section>

    <section>
      <Button :label="t('shared.buttons.clear')" size="large" class="w-full" @click="clearFilter" />
    </section>
  </component>
</template>

<script setup lang="ts">
import { CarCapacity, CarSteering, CarType, messages, type GetCarListOptions } from '@/entities/car';
import { ensureArray } from '@/shared/lib/objects';
import { useRouteQuery } from '@/shared/lib/router/useRouteQuery';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { useBreakpoints, watchDebounced } from '@vueuse/core';
import isEqual from 'lodash/isEqual';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Drawer from 'primevue/drawer';
import Slider from 'primevue/slider';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const visible = defineModel<boolean>('visible', { default: false });
const filter = defineModel<GetCarListOptions>('filter', { required: true });

const props = defineProps<{ title: string }>();
const { t } = useI18n({ messages });
const router = useRouter();
const route = useRoute();
const breakpoints = useBreakpoints(defaultBreakpoints);
const responsiveAsideComponent = computed(() => (breakpoints.xl.value ? 'aside' : Drawer));
const responsiveAsideComponentProps = computed(() =>
  breakpoints.xl.value
    ? {
        class:
          'bg-white text-surface-700 dark:bg-surface-800 dark:text-surface-300 ' +
          'border-t-2 border-t-surface-100 dark:border-t-surface-600 min-w-[320px] p-8',
      }
    : { header: props.title }
);

const type = useRouteQuery<CarType[]>('type', [], { transform: ensureArray });
const steering = useRouteQuery<CarSteering[]>('steering', [], { transform: ensureArray });
const capacity = useRouteQuery<CarCapacity[], number[]>('capacity', [], {
  transform: (v) => ensureArray(v).map(Number),
});
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
  { immediate: true, debounce: 750 }
);

function clearFilter() {
  router.push({ path: route.path });
}
</script>
