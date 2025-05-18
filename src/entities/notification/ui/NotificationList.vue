<template>
  <ul v-if="items.length > 0" class="grid overflow-scroll pr-4">
    <li v-for="(item, index) in items.concat().reverse()" :key="item.id">
      <div v-if="index > 0" class="p-divider-horizontal" />
      <NotificationListItem v-bind="item" />
    </li>
  </ul>
  <div v-else class="text-sm">{{ t('entities.notification.list.slots.empty.text') }}</div>
</template>

<script setup lang="ts">
import messages from '@/entities/notification/i18n/messages.json';
import type { Notification } from '@/entities/notification/model/types';
import { useI18n } from 'vue-i18n';
import NotificationListItem from './NotificationListItem.vue';

defineProps<{ items: Notification[] }>();
const { t } = useI18n({ messages });
</script>
