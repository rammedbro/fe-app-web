<template>
  <section>
    <div class="mb-8 flex items-center justify-between">
      <span class="text-xl font-bold">{{ t('pages.profile/dashboard.sections.top.title') }}</span>
      <Button icon="pi pi-ellipsis-v" severity="secondary" text class="-mr-4" @click="groupByPopoverRef?.toggle" />
      <Popover ref="groupByPopoverRef">
        <ListBox
          v-model="groupBy"
          :options="groupByListOptions"
          option-label="label"
          option-value="value"
          class="border-0 shadow-none"
          @change="orderAggregationAsync.refetch()"
        />
      </Popover>
    </div>

    <div v-if="orderAggregationAsync.isSuccess.value && chartData" class="flex flex-col gap-4 md:flex-row">
      <div class="relative">
        <Chart
          type="doughnut"
          :data="{ labels: chartData.labels, datasets: [chartData] }"
          :options="chartOptions"
          class="z-10 mx-auto size-60"
        />
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <div class="text-lg font-semibold">{{ orderAggregationTotalCount }}</div>
          <div class="text-surface-500">{{ t('pages.profile/dashboard.sections.top.chart.total') }}</div>
        </div>
      </div>
      <ul class="grid flex-1 gap-2">
        <li v-for="(label, index) in chartData.labels" :key="label" class="flex items-center gap-2">
          <span class="size-4 rounded-[50%]" :style="{ backgroundColor: chartData.backgroundColor[index] }" />
          <span>{{ label }}</span>
          <span class="ml-auto font-bold">{{ chartData.data[index] }}</span>
        </li>
      </ul>
    </div>
    <div v-if="orderAggregationAsync.isPending.value" class="flex justify-center">
      <ProgressSpinner />
    </div>
    <div v-if="orderAggregationAsync.isError.value" class="text-center">
      <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
      <Button :label="t('shared.buttons.reload')" class="w-full" @click="orderAggregationAsync.refetch()" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { mergeCarMessages } from '@/entities/car';
import { getOrderAggregation } from '@/entities/order';
import messages from '@/pages/profile/routes/dashboard/i18n/messages.json';
import { useAsync } from '@/shared/lib/async/useAsync';
import { colors } from '@/shared/model/colors';
import { GetOrderAggregationOptions } from '@/shared/model/types';
import type { ChartOptions } from 'chart.js';
import Button from 'primevue/button';
import Chart from 'primevue/chart';
import ListBox from 'primevue/listbox';
import type { PopoverMethods } from 'primevue/popover';
import Popover from 'primevue/popover';
import ProgressSpinner from 'primevue/progressspinner';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages: mergeCarMessages(messages) });
const groupByPopoverRef = ref<PopoverMethods>();
const groupBy = ref<GetOrderAggregationOptions['groupBy']>('type');
const groupByListOptions = computed(() => [
  { label: t('entities.car.fields.type.label'), value: 'type' },
  { label: t('entities.car.fields.brand.label'), value: 'brand' },
]);
const orderAggregationAsync = useAsync(async () => {
  const { data } = await getOrderAggregation<true>({
    query: { groupBy: groupBy.value },
    withCredentials: true,
  });
  return data;
}, undefined);
const orderAggregationTotalCount = computed(() =>
  orderAggregationAsync.data.value?.reduce((acc, item) => acc + item._count, 0)
);
const chartData = computed(() => {
  if (!orderAggregationAsync.data.value) return;

  const labels: string[] = [];
  const data: number[] = [];
  const backgroundColor: string[] = [];
  const colorsToArray = Object.values(colors).reverse();

  orderAggregationAsync.data.value.forEach((item, index) => {
    if ('type' in item) {
      labels.push(item.type);
    } else if ('brand' in item) {
      labels.push(item.brand);
    }

    data.push(item._count);
    backgroundColor.push(colorsToArray[index + 1]);
  });

  return { labels, data, backgroundColor };
});
const chartOptions: ChartOptions<'pie'> = {
  cutout: '80%',
  elements: {
    arc: {
      borderAlign: 'inner',
      borderJoinStyle: 'round',
      borderRadius: 8,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
</script>
