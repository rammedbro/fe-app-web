<template>
  <div class="mx-auto lg:container">
    <template v-if="order">
      <section class="p-card mb-8 p-6">
        <div class="mb-12 flex items-end justify-between">
          <span class="text-3xl font-bold">Rental Details</span>
          <span class="text-xl font-semibold">#{{ order.id }}</span>
        </div>

        <div class="mb-8 grid gap-8 md:grid-cols-2">
          <div class="grid grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
              <div class="mb-2 text-lg font-semibold">Customer</div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-user" />
                <span>{{ order.name }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-phone" />
                <span>{{ order.phone }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-home" />
                <span>{{ order.address }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-map-marker" />
                <span>{{ order.city }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="mb-2 text-lg font-semibold">Car</div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-car" />
                <span>{{ `${order.car.brand} ${order.car.model}` }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <SteeringWheelIcon class="w-5" />
                <span>{{ order.car.steering }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <Profile2UserIcon class="w-5" />
                <span>{{ order.car.capacity }} People</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <GasStationIcon class="w-5" />
                <span>{{ order.car.gasoline }}L</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="mb-2 text-lg font-semibold">Pick Up</div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-calendar-clock" />
                <span>{{ new Date(order.pickup.date).toLocaleDateString() }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-map" />
                <span>
                  {{ order.pickup.location.latitude.toFixed(4) }},
                  {{ order.pickup.location.longitude.toFixed(4) }}
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <div class="mb-2 text-lg font-semibold">Drop Off</div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-calendar-clock" />
                <span>{{ new Date(order.dropoff.date).toLocaleDateString() }}</span>
              </div>
              <div class="text-md flex items-center gap-2">
                <i class="pi pi-map" />
                <span>
                  {{ order.dropoff.location.latitude.toFixed(4) }},
                  {{ order.dropoff.location.longitude.toFixed(4) }}
                </span>
              </div>
            </div>
          </div>

          <UseImage v-slot="{ isLoading, error }" :src="order.car.images[0]">
            <Image
              :src="error ? noImgUrl : order.car.images[0]"
              :alt="`${order.car.brand} ${order.car.model}`"
              :preview="breakpoints.md.value"
              class="p-panel"
              image-class="h-100 w-full rounded-lg bg-white dark:bg-surface-800 object-contain"
              :class="{ 'p-skeleton': isLoading }"
            />
          </UseImage>
        </div>

        <Map
          :center="[order.pickup.location.latitude, order.pickup.location.longitude]"
          class="h-100 w-full rounded-lg"
        >
          <LMarker
            :model-value="[order.pickup.location.latitude, order.pickup.location.longitude]"
            :popup="{ content: 'Pickup point' }"
          />
          <LMarker
            :model-value="[order.dropoff.location.latitude, order.dropoff.location.longitude]"
            :popup="{ content: 'Dropoff point' }"
          />
          <LPolyline
            :model-value="[
              [order.pickup.location.latitude, order.pickup.location.longitude],
              [order.dropoff.location.latitude, order.dropoff.location.longitude],
            ]"
            :color="colors['--p-primary-500']"
          />
        </Map>

        <div class="p-divider-horizontal my-12" />

        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xl font-bold">Total Rental Price</div>
            <div class="text-sm text-surface-400">Overall price including rental discount</div>
          </div>
          <div class="text-4xl font-bold">${{ order.price }}</div>
        </div>
      </section>

      <ReviewSection :car-id="order.carId" />
    </template>
    <div v-else class="text-center">
      <p class="mb-4">Something went wrong while fetching an order :(</p>
      <Button label="Reload" size="large" class="w-full" @click="reload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderQuery } from '@/entities/order';
import { beforeEnter } from '@/pages/profile/routes/orders/routes/@id/hooks/beforeEnter';
import { noImgUrl } from '@/shared/assets/images';
import { reload } from '@/shared/lib/browser';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { colors } from '@/shared/model/colors';
import { GasStationIcon, Profile2UserIcon, SteeringWheelIcon } from '@/shared/ui/icons';
import { LMarker, LPolyline, Map } from '@/shared/ui/map';
import { UseImage } from '@vueuse/components';
import { useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { onBeforeRouteUpdate } from 'vue-router';
import ReviewSection from './ReviewSection.vue';

const props = defineProps<{ id: number }>();
const id = computed(() => props.id);
const breakpoints = useBreakpoints(defaultBreakpoints);
const { data: order } = useOrderQuery(id).query();

/** Important! It has to be registered exactly this way otherwise it won't work */
onBeforeRouteUpdate((...args) => beforeEnter(...args));
</script>
