<template>
  <div class="flex flex-col items-center gap-4 xl:flex-row xl:gap-8">
    <div class="p-card p-4 xl:px-12 xl:py-6">
      <div class="mb-4 flex items-center gap-4">
        <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary/30">
          <div class="h-2 w-2 rounded-full bg-primary" />
        </div>

        <div class="font-semibold">Pick - Up</div>
      </div>

      <div class="flex flex-row gap-4">
        <div>
          <div class="mb-2 font-semibold">Location</div>
          <LocationPicker
            v-model="order.pickupLocation.value"
            size="small"
            fluid
            placeholder="Select your city"
            input-class="!dark:pl-0 border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">Date</div>
          <Datepicker
            v-model="order.pickupDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            placeholder="Select your date"
            input-class="-ml-2 border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">Time</div>
          <Datepicker
            v-model="order.pickupDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            placeholder="Select your time"
            time-only
            input-class="-ml-2 border-0 shadow-none"
          >
            <template #inputicon="{ clickCallback }">
              <i class="pi pi-clock" @click="clickCallback" />
            </template>
          </Datepicker>
        </div>
      </div>
    </div>

    <Button class="-mx-12 -my-8 h-16 w-16 drop-shadow-xl" @click="swap">
      <i class="pi pi-arrow-right-arrow-left rotate-90 text-2xl" />
    </Button>

    <div class="p-card p-4 xl:px-12 xl:py-6">
      <div class="mb-4 flex items-center gap-4">
        <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary/30">
          <div class="h-2 w-2 rounded-full bg-primary" />
        </div>

        <div class="font-semibold">Drop - Off</div>
      </div>

      <div class="flex flex-row gap-4">
        <div>
          <div class="mb-2 font-semibold">Location</div>
          <LocationPicker
            v-model="order.dropoffLocation.value"
            size="small"
            fluid
            placeholder="Select your city"
            input-class="!dark:pl-0 border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">Date</div>
          <Datepicker
            v-model="order.dropoffDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            placeholder="Select your date"
            input-class="border-0 shadow-none"
          />
        </div>

        <div class="p-divider-vertical" />

        <div>
          <div class="mb-2 font-semibold">Time</div>
          <Datepicker
            v-model="order.dropoffDate.value"
            size="small"
            fluid
            show-icon
            icon-display="input"
            placeholder="Select your time"
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
import { LocationPicker } from '@/shared/ui/map';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Datepicker from 'primevue/datepicker';

const addOrderStore = useAddOrderStore();
const order = storeToRefs(addOrderStore);

function swap() {
  [order.pickupLocation.value, order.dropoffLocation.value] = [order.dropoffLocation.value, order.pickupLocation.value];
  [order.pickupDate.value, order.dropoffDate.value] = [order.dropoffDate.value, order.pickupDate.value];
}
</script>
