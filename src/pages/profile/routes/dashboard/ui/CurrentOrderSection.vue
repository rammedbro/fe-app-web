<template>
  <section class="flex flex-1 flex-col gap-4 md:gap-8">
    <div class="text-xl font-bold">{{ t('pages.profile/dashboard.sections.current-rent.title') }}</div>

    <template v-if="orderAsync.isSuccess.value && order">
      <Map
        :center="[order.pickup.location.latitude, order.pickup.location.longitude]"
        class="p-panel h-100 w-full rounded-lg"
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

      <RouterLink
        :to="{ name: ProfileOrderDetailsRouteName, params: { id: order.id } }"
        class="flex items-center gap-4"
      >
        <UseImage v-slot="{ isLoading, error }" :src="order.car.images[0]">
          <img
            :src="error ? noImgUrl : order.car.images[0]"
            :alt="`${order.car.brand} ${order.car.model}`"
            class="size-30 rounded-lg object-contain"
            :class="{ 'p-skeleton': isLoading }"
          />
        </UseImage>
        <div>
          <div class="font-bold">{{ order.car.brand }} {{ order.car.model }}</div>
          <div class="text-surface-400">{{ order.car.type }}</div>
        </div>
        <div class="ml-auto">#{{ order.id }}</div>
      </RouterLink>

      <div class="flex justify-between gap-4 md:flex-col">
        <div class="flex flex-col gap-2 md:flex-row md:justify-around">
          <div class="pulse-dot my-auto" />
          <div>
            <div class="mb-2 font-semibold">
              {{ t('pages.profile/dashboard.sections.current-rent.pickup.location') }}
            </div>
            <div class="text-surface-400">
              {{ order.pickup.location.latitude.toFixed(4) }},
              {{ order.pickup.location.longitude.toFixed(4) }}
            </div>
          </div>
          <div :class="{ 'p-divider-vertical': breakpoints.md.value }" />
          <div>
            <div class="mb-2 font-semibold">
              {{ t('pages.profile/dashboard.sections.current-rent.pickup.date') }}
            </div>
            <div class="text-surface-400">{{ new Date(order.pickup.date).toLocaleDateString() }}</div>
          </div>
          <div :class="{ 'p-divider-vertical': breakpoints.md.value }" />
          <div>
            <div class="mb-2 font-semibold">
              {{ t('pages.profile/dashboard.sections.current-rent.pickup.time') }}
            </div>
            <div class="text-surface-400">{{ new Date(order.pickup.date).toLocaleTimeString() }}</div>
          </div>
        </div>

        <div class="flex flex-col gap-2 md:flex-row md:justify-around">
          <div class="pulse-dot my-auto" />
          <div>
            <div class="mb-2 font-semibold">
              {{ t('pages.profile/dashboard.sections.current-rent.pickup.location') }}
            </div>
            <div class="text-surface-400">
              {{ order.dropoff.location.latitude.toFixed(4) }},
              {{ order.dropoff.location.longitude.toFixed(4) }}
            </div>
          </div>
          <div :class="{ 'p-divider-vertical': breakpoints.md.value }" />
          <div>
            <div class="mb-2 font-semibold">
              {{ t('pages.profile/dashboard.sections.current-rent.pickup.date') }}
            </div>
            <div class="text-surface-400">{{ new Date(order.dropoff.date).toLocaleDateString() }}</div>
          </div>
          <div :class="{ 'p-divider-vertical': breakpoints.md.value }" />
          <div>
            <div class="mb-2 font-semibold">
              {{ t('pages.profile/dashboard.sections.current-rent.pickup.time') }}
            </div>
            <div class="text-surface-400">{{ new Date(order.dropoff.date).toLocaleTimeString() }}</div>
          </div>
        </div>
      </div>

      <div class="p-divider-horizontal" />

      <div class="flex items-center justify-between gap-4">
        <div>
          <div class="text-xl font-bold">{{ t('pages.profile/dashboard.sections.current-rent.price.title') }}</div>
          <div class="text-sm text-surface-400">
            {{ t('pages.profile/dashboard.sections.current-rent.price.subtitle') }}
          </div>
        </div>

        <div class="text-4xl font-bold">${{ order.price }}</div>
      </div>
    </template>

    <template v-if="orderAsync.isPending.value">
      <OrderCardSkeleton />
      <div class="p-divider-horizontal" />
      <div class="flex items-center justify-between">
        <div class="w-2/4">
          <div class="p-skeleton mb-2 h-4 w-2/3" />
          <div class="p-skeleton h-4 w-full" />
        </div>
        <div class="p-skeleton h-12 w-1/4" />
      </div>
    </template>

    <div v-if="orderAsync.isError.value" class="text-center">
      <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
      <Button as="router-link" :to="{ name: CarListRouteName }" :label="t('shared.buttons.order')" class="w-full" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCurrentOrder, OrderCardSkeleton } from '@/entities/order';
import messages from '@/pages/profile/routes/dashboard/i18n/messages.json';
import { noImgUrl } from '@/shared/assets/images';
import { useAsync } from '@/shared/lib/async/useAsync';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { colors } from '@/shared/model/colors';
import { CarListRouteName, ProfileOrderDetailsRouteName } from '@/shared/model/routes';
import { LMarker, LPolyline, Map } from '@/shared/ui/map';
import { UseImage } from '@vueuse/components';
import { useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const breakpoints = useBreakpoints(defaultBreakpoints);
const orderAsync = useAsync(
  async () => {
    const { data } = await getCurrentOrder({ withCredentials: true });
    return data;
  },
  undefined,
  { throwOnError: false }
);
const order = orderAsync.data;
</script>
