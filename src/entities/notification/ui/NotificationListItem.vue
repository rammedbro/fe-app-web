<template>
  <template v-if="props.type === 'UserCreated'">
    <div class="mb-1 font-medium">Hey there, {{ props.meta.name }}! Glad that you are with us now 😄</div>
    <p class="text-sm">
      Don't forget to check your
      <RouterLink :to="{ name: ProfileDashboardRouteName }" class="p-button-link underline">dashboard</RouterLink>
      after you've made the first order!<br />
      And in the
      <RouterLink :to="{ name: ProfileSettingsRouteName }" class="p-button-link underline">settings</RouterLink> you can
      tune the site visuals. Have fun!
    </p>
  </template>
  <template v-if="props.type === 'OrderCreated'">
    <div class="flex flex-nowrap items-center justify-between gap-2">
      <div class="mb-1 text-sm font-semibold">Order {{ props.meta.orderId }} has been planted 💣</div>
      <div class="text-xs text-surface-400">{{ new Date(createdAt).toLocaleDateString() }}</div>
    </div>
    <p class="text-sm">
      Thank you for choosing our "fake" service. Now you can check your
      <RouterLink :to="{ name: ProfileDashboardRouteName }" class="p-button-link underline">dashboard</RouterLink> or
      see the details on the
      <RouterLink
        :to="{ name: ProfileOrderDetailsRouteName, params: { id: props.meta.orderId } }"
        class="p-button-link underline"
      >
        order's page </RouterLink
      >.
    </p>
  </template>
</template>

<script setup lang="ts">
import type { Notification } from '@/entities/notification/model/types';
import {
  ProfileDashboardRouteName,
  ProfileOrderDetailsRouteName,
  ProfileSettingsRouteName,
} from '@/shared/model/routes';

const props = defineProps<Notification>();
</script>
