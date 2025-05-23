<template>
  <div class="p-card p-3 md:p-6">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div>
        <div class="text-lg font-bold">{{ title }}</div>
        <div class="text-sm text-surface-400">{{ type }}</div>
      </div>

      <FavoriteButton :car-id="id" />
    </div>

    <RouterLink :to="{ name: CarDetailsRouteName, params: { id } }">
      <UseImage v-slot="{ isLoading, error }" :src="images[0]">
        <img
          :src="error ? noImgUrl : images[0]"
          :alt="title"
          class="mb-6 h-60 w-full rounded-lg object-contain"
          :class="{ 'p-skeleton': isLoading }"
        />
      </UseImage>
    </RouterLink>

    <div class="mb-6 flex flex-wrap justify-between gap-2">
      <div class="flex items-center text-sm text-surface-400 md:text-base">
        <GasStationIcon class="mr-2 w-5 md:w-6" />
        <span>{{ t('entities.car.fields.gasoline.value', [gasoline]) }}</span>
      </div>

      <div class="flex items-center text-sm text-surface-400 md:text-base">
        <SteeringWheelIcon class="mr-2 w-5 md:w-6" />
        <span>{{ t(`entities.car.fields.steering.values.${steering}`) }}</span>
      </div>

      <div class="flex items-center text-sm text-surface-400 md:text-base">
        <Profile2UserIcon class="mr-2 w-5 md:w-6" />
        <span>{{ t('entities.car.fields.capacity.value', [capacity]) }}</span>
      </div>
    </div>

    <div class="mt-auto flex items-center justify-between gap-4">
      <div>
        <div class="text-lg font-bold">
          ${{ totalPrice }} /
          <span class="text-sm font-medium text-surface-400">a day</span>
        </div>
        <div class="text-sm font-medium text-surface-400 line-through">${{ price }}</div>
      </div>

      <Button
        as="router-link"
        :to="{ name: CarPaymentRouteName, params: { id } }"
        :label="t('entities.car.buttons.order')"
        class="w-1/2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { messages } from '@/entities/car/i18n';
import type { Car } from '@/entities/car/model/types';
import { FavoriteButton } from '@/entities/favorite';
import { noImgUrl } from '@/shared/assets/images';
import { calcDiscountPrice } from '@/shared/lib/numbers';
import { CarDetailsRouteName, CarPaymentRouteName } from '@/shared/model/routes';
import { GasStationIcon, Profile2UserIcon, SteeringWheelIcon } from '@/shared/ui/icons';
import { UseImage } from '@vueuse/components';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const props = defineProps<Car>();
const { t } = useI18n({ messages });
const title = computed(() => `${props.brand} ${props.model}`);
const totalPrice = computed(() => calcDiscountPrice(props.price, props.discount));
</script>
