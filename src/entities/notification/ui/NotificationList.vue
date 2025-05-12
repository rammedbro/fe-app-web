<template>
  <ul v-if="items.length > 0" class="grid overflow-scroll pr-4">
    <li v-for="(item, index) in items.concat().reverse()" :key="item.id">
      <div v-if="index > 0" class="p-divider-horizontal" />
      <NotificationListItem v-bind="item" />
    </li>
  </ul>
  <div v-else class="text-sm">You have no notifications to read. Good job!</div>
</template>

<script setup lang="ts">
import type { Notification } from '@/entities/notification/model/types';
import NotificationListItem from './NotificationListItem.vue';

interface Props {
  items: Notification[];
}

defineProps<Props>();
</script>
