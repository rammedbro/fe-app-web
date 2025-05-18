<template>
  <div class="container mx-auto py-8">
    <template v-if="car">
      <section class="mb-4 flex flex-col gap-4 md:mb-8 md:gap-8 lg:flex-row">
        <Galleria
          :value="car.images"
          :show-thumbnails="breakpoints.md.value"
          :show-item-navigators="!breakpoints.md.value"
          show-item-navigators-on-hover
          :num-visible="4"
          :responsive-options="[{ breakpoint: `${defaultBreakpoints.xl - 1}px`, numVisible: 3 }]"
          container-class="lg:w-1/2"
        >
          <template #item="{ item }">
            <UseImage v-slot="{ isLoading, error }" :src="item">
              <Image
                :src="error ? noImgUrl : item"
                :alt="title"
                :preview="breakpoints.md.value"
                class="w-full"
                image-class="h-[400px] w-full rounded-lg bg-white dark:bg-surface-800 object-contain"
                :class="{ 'p-skeleton': isLoading }"
              />
            </UseImage>
          </template>
          <template #thumbnail="{ item }">
            <div class="px-2">
              <UseImage v-slot="{ isLoading, error }" :src="item">
                <img
                  :src="error ? noImgUrl : item"
                  :alt="title"
                  class="h-[85px] w-full rounded-lg bg-surface-200 object-contain dark:bg-surface-800"
                  :class="{ 'p-skeleton': isLoading }"
                />
              </UseImage>
            </div>
          </template>
        </Galleria>

        <div class="p-card flex flex-col p-6 lg:w-1/2">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="mb-2 text-xl font-bold md:text-4xl">{{ title }}</div>
              <div class="mb-8 flex items-center gap-2">
                <Rating :model-value="4" readonly />
                <div class="text-sm text-surface-500">{{ t('entities.car.fields.views.value', [car.views]) }}</div>
              </div>
            </div>

            <FavoriteButton :car-id="id" />
          </div>

          <p class="mb-8 text-lg">{{ car.description }}</p>

          <div class="mb-auto grid grid-cols-4 justify-between gap-4">
            <div class="text-lg text-surface-400">{{ t('entities.car.fields.type.label') }}</div>
            <div class="text-lg font-semibold">{{ car.type }}</div>

            <div class="text-lg text-surface-400">{{ t('entities.car.fields.capacity.label') }}</div>
            <div class="text-lg font-semibold text-nowrap">
              {{ t('entities.car.fields.capacity.value', [car.capacity]) }}
            </div>

            <div class="text-lg text-surface-400">{{ t('entities.car.fields.steering.label') }}</div>
            <div class="text-lg font-semibold">{{ t(`entities.car.fields.steering.values.${car.steering}`) }}</div>

            <div class="text-lg text-surface-400">{{ t('entities.car.fields.gasoline.label') }}</div>
            <div class="text-lg font-semibold">{{ t('entities.car.fields.gasoline.value', [car.gasoline]) }}</div>
          </div>

          <div class="p-divider-horizontal my-8" />

          <div class="flex items-center justify-between gap-4">
            <div>
              <div class="text-xl font-bold">
                ${{ calcDiscountPrice(car.price, car.discount) }} /
                <span class="font-semibold text-surface-400">a day</span>
              </div>
              <div class="font-semibold text-surface-400 line-through">${{ Number(car.price).toFixed(2) }}</div>
            </div>

            <Button
              as="router-link"
              :to="{ name: CarPaymentRouteName }"
              :label="t('entities.car.buttons.order')"
              size="large"
              class="w-1/2"
            />
          </div>
        </div>
      </section>

      <section class="p-card mb-4 p-6 md:mb-8">
        <div class="mb-6 flex items-center gap-4">
          <div class="text-lg font-semibold">{{ t('pages.cars/@id.sections.reviews.title') }}</div>
          <Badge :value="car.reviews.length" />
        </div>

        <ReviewCard v-for="review in car.reviews" :key="review.id" v-bind="review" class="mb-6" />
      </section>

      <CarCarousel
        :title="t('pages.cars/@id.sections.recent.title')"
        :query="{ sortBy: ['createdAt'], sortDir: 'desc', limit: 10 }"
      />

      <CarCarousel :title="t('pages.cars/@id.sections.recommended.title')" :query="{ sortBy: ['rating'], limit: 10 }" />
    </template>
    <div v-else class="text-center">
      <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
      <Button :label="t('shared.buttons.reload')" size="large" class="w-full" @click="reload" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCarousel, mergeCarMessages, useCarQuery, useCarSocket } from '@/entities/car';
import { FavoriteButton } from '@/entities/favorite';
import { ReviewCard } from '@/entities/review';
import { beforeEnter } from '@/pages/cars/routes/@id/hooks/beforeEnter';
import messages from '@/pages/cars/routes/@id/i18n/messages.json';
import { noImgUrl } from '@/shared/assets/images';
import { reload } from '@/shared/lib/browser';
import { calcDiscountPrice } from '@/shared/lib/numbers';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { CarPaymentRouteName } from '@/shared/model/routes';
import { UseImage } from '@vueuse/components';
import { useBreakpoints } from '@vueuse/core';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Galleria from 'primevue/galleria';
import Image from 'primevue/image';
import Rating from 'primevue/rating';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps<{ id: number }>();
const { t } = useI18n({ messages: mergeCarMessages(messages) });
const toast = useToast();
const breakpoints = useBreakpoints(defaultBreakpoints);
const { data: car } = useCarQuery(() => props.id).query();
const title = computed(() => `${car.value?.brand} ${car.value?.model}`);
const carSocket = useCarSocket(props.id);

carSocket.on('addReview', (review) => {
  if (!car.value) return;

  car.value.reviews.push(review);
  toast.add({
    severity: 'info',
    summary: t('pages.cars/@id.messages.info.add-review.message'),
    detail: t('pages.cars/@id.messages.info.add-review.details'),
    life: 5000,
  });
});

/** Important! It has to be registered exactly this way otherwise it won't work */
onBeforeRouteUpdate((...args) => beforeEnter(...args));
</script>
