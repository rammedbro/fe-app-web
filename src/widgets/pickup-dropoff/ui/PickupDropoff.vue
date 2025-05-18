<template>
  <div class="flex flex-col items-center gap-4 xl:flex-row xl:gap-8">
    <div class="p-card p-4 xl:px-12 xl:py-6">
      <div class="mb-4 flex items-center gap-4">
        <div class="pulse-dot" />
        <div class="font-semibold">{{ t('widgets.pickup-dropoff.pickup.title') }}</div>
      </div>

      <div class="flex flex-row gap-4">
        <div>
          <div class="mb-2 font-semibold">{{ t('widgets.pickup-dropoff.pickup.inputs.location.label') }}</div>
          <LocationPicker
            v-model="order.pickupLocation.value"
            size="small"
            fluid
            :placeholder="t('widgets.pickup-dropoff.pickup.inputs.location.placeholder')"
            input-class="border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">{{ t('widgets.pickup-dropoff.pickup.inputs.date.label') }}</div>
          <Datepicker
            v-model="order.pickupDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            :placeholder="t('widgets.pickup-dropoff.pickup.inputs.date.placeholder')"
            input-class="border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">{{ t('widgets.pickup-dropoff.pickup.inputs.time.label') }}</div>
          <Datepicker
            v-model="order.pickupDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            :placeholder="t('widgets.pickup-dropoff.pickup.inputs.time.placeholder')"
            time-only
            input-class="border-0 shadow-none"
          >
            <template #inputicon="{ clickCallback }">
              <i class="pi pi-clock" @click="clickCallback" />
            </template>
          </Datepicker>
        </div>
      </div>
    </div>

    <Button
      :title="t('widgets.pickup-dropoff.buttons.swap')"
      class="-mx-12 -my-8 size-16 flex-none drop-shadow-xl"
      @click="swap"
    >
      <i class="pi pi-arrow-right-arrow-left rotate-90 text-2xl" />
    </Button>

    <div class="p-card p-4 xl:px-12 xl:py-6">
      <div class="mb-4 flex items-center gap-4">
        <div class="pulse-dot" />
        <div class="font-semibold">{{ t('widgets.pickup-dropoff.dropoff.title') }}</div>
      </div>

      <div class="flex flex-row gap-4">
        <div>
          <div class="mb-2 font-semibold">{{ t('widgets.pickup-dropoff.dropoff.inputs.location.label') }}</div>
          <LocationPicker
            v-model="order.dropoffLocation.value"
            size="small"
            fluid
            :placeholder="t('widgets.pickup-dropoff.dropoff.inputs.location.placeholder')"
            input-class="border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">{{ t('widgets.pickup-dropoff.dropoff.inputs.date.label') }}</div>
          <Datepicker
            v-model="order.dropoffDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            :placeholder="t('widgets.pickup-dropoff.dropoff.inputs.date.placeholder')"
            input-class="border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">{{ t('widgets.pickup-dropoff.dropoff.inputs.time.label') }}</div>
          <Datepicker
            v-model="order.dropoffDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            :placeholder="t('widgets.pickup-dropoff.dropoff.inputs.time.placeholder')"
            time-only
            input-class="border-0 shadow-none"
          >
            <template #inputicon="{ clickCallback }">
              <i class="pi pi-clock" @click="clickCallback" />
            </template>
          </Datepicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddOrderStore } from '@/entities/order';
import { LocationPicker } from '@/shared/ui/location-picker';
import messages from '@/widgets/pickup-dropoff/i18n/messages.json';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Datepicker from 'primevue/datepicker';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const addOrderStore = useAddOrderStore();
const order = storeToRefs(addOrderStore);

function swap() {
  [order.pickupLocation.value, order.dropoffLocation.value] = [order.dropoffLocation.value, order.pickupLocation.value];
  [order.pickupDate.value, order.dropoffDate.value] = [order.dropoffDate.value, order.pickupDate.value];
}
</script>
