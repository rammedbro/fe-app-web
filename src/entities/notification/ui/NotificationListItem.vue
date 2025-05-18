<template>
  <template v-if="props.type === 'UserCreated'">
    <div class="mb-1 font-medium">
      {{ t('entities.notification.list.slots.item.type.user-created.title', { name: props.meta.name }) }}
    </div>
    <I18nT keypath="entities.notification.list.slots.item.type.user-created.text" tag="p" class="text-sm">
      <template #dashboard>
        <RouterLink :to="{ name: ProfileDashboardRouteName }" class="p-button-link underline">
          {{ t('entities.notification.list.slots.item.type.user-created.links.dashboard') }}
        </RouterLink>
      </template>
      <template #settings>
        <RouterLink :to="{ name: ProfileSettingsRouteName }" class="p-button-link underline">
          {{ t('entities.notification.list.slots.item.type.user-created.links.settings') }}
        </RouterLink>
      </template>
    </I18nT>
  </template>

  <template v-if="props.type === 'OrderCreated'">
    <div class="flex flex-nowrap items-center justify-between gap-2">
      <div class="mb-1 text-sm font-semibold">
        {{ t('entities.notification.list.slots.item.type.order-created.title', { id: props.meta.orderId }) }}
      </div>
      <div class="text-xs text-surface-400">{{ new Date(createdAt).toLocaleDateString() }}</div>
    </div>
    <I18nT keypath="entities.notification.list.slots.item.type.order-created.text" tag="p" class="text-sm">
      <template #dashboard>
        <RouterLink :to="{ name: ProfileDashboardRouteName }" class="p-button-link underline">
          {{ t('entities.notification.list.slots.item.type.order-created.links.dashboard') }}
        </RouterLink>
      </template>
      <template #order>
        <RouterLink
          :to="{ name: ProfileOrderDetailsRouteName, params: { id: props.meta.orderId } }"
          class="p-button-link underline"
        >
          {{ t('entities.notification.list.slots.item.type.order-created.links.order') }}
        </RouterLink>
      </template>
    </I18nT>
  </template>
</template>

<script setup lang="ts">
import messages from '@/entities/notification/i18n/messages.json';
import type { Notification } from '@/entities/notification/model/types';
import {
  ProfileDashboardRouteName,
  ProfileOrderDetailsRouteName,
  ProfileSettingsRouteName,
} from '@/shared/model/routes';
import { I18nT, useI18n } from 'vue-i18n';

const props = defineProps<Notification>();
const { t } = useI18n({ messages });
</script>
