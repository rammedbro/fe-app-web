<template>
<div class="bg-white rounded-lg p-4 xl:px-12 xl:py-6">
  <slot name="title" />

  <div
    class="flex gap-4"
    :class="{
      'flex-row': layout === 'horizontal',
      'flex-col': layout === 'vertical'
    }"
  >
    <div>
      <div class="mb-2 font-semibold">Location</div>
      <Select
        size="small"
        fluid
        placeholder="Select your city"
        input-class="pl-0"
        class="border-0 shadow-none"
      />
    </div>

    <Divider v-if="layout === 'horizontal'" layout="vertical" />

    <div>
      <div class="mb-2 font-semibold">Date</div>
      <Datepicker
        size="small"
        fluid
        show-icon
        icon-display="input"
        placeholder="Select your date"
        input-class="pl-0 border-0 shadow-none"
      />
    </div>

    <Divider v-if="layout === 'horizontal'" layout="vertical" />

    <div>
      <div class="mb-2 font-semibold">Time</div>
      <Datepicker
        size="small"
        fluid
        show-icon
        icon-display="input"
        placeholder="Select your time"
        time-only
        input-class="pl-0 border-0 shadow-none"
      >
        <template #inputicon="{clickCallback}">
          <i class="pi pi-clock" @click="clickCallback" />
        </template>
      </Datepicker>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import Datepicker from 'primevue/datepicker';
import Divider from 'primevue/divider';

interface Props {
  layout?: 'horizontal' | 'vertical';
}

withDefaults(defineProps<Props>(), { layout: 'horizontal' });
</script>
