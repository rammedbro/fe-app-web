<template>
  <div class="mx-auto grid gap-4 lg:max-w-200">
    <h1 class="mb-8 text-3xl font-bold">{{ t('pages.profile/orders.title') }}</h1>

    <template v-if="ordersAsync.isSuccess.value">
      <template v-if="ordersAsync.data.value?.length">
        <OrderCard v-for="order in ordersAsync.data.value" :key="order.id" v-bind="order" class="p-card p-4" />
      </template>
      <div v-else class="col-span-full text-center">
        <p class="mb-4">{{ t('pages.profile/orders.list.slots.empty.text') }}</p>
        <Button
          as="router-link"
          :to="{ name: CarListRouteName }"
          :label="t('pages.profile/orders.list.slots.empty.button')"
          class="w-60"
        />
      </div>
    </template>

    <template v-if="ordersAsync.isPending.value">
      <OrderCardSkeleton v-for="n in 5" :key="n" class="p-card p-4" />
    </template>

    <div v-if="ordersAsync.isError.value" class="text-center">
      <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
      <Button :label="t('shared.buttons.reload')" class="w-60" @click="ordersAsync.refetch()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderCard, OrderCardSkeleton, useOrderListQuery } from '@/entities/order';
import messages from '@/pages/profile/routes/orders/i18n/messages.json';
import { CarListRouteName } from '@/shared/model/routes';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const ordersAsync = useOrderListQuery({
  sortBy: ['createdAt'],
  sortDir: 'desc',
});
</script>
