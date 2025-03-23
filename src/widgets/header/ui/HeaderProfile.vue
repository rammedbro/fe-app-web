<template>
  <div v-if="isAuthenticated" class="flex items-center gap-4">
    <Button
      as="router-link"
      :to="{ name: ProfileFavoritesRouteName }"
      icon="pi pi-heart-fill"
      rounded
      variant="outlined"
    />
    <Button icon="pi pi-bell" rounded variant="outlined" @click="notificationPopover?.toggle" />
    <Popover ref="notificationPopover" class="w-[320px]">
      <div class="mb-4 flex items-center justify-between">
        <div class="font-bold">Notifications</div>
        <label class="flex items-center">
          <span class="mr-2 text-sm">Unseen</span>
          <ToggleSwitch v-model="onlyUnseen" />
        </label>
      </div>

      <Spinner v-if="notificationsAsync.isLoading.value" class="mx-auto block h-10" />
      <ul v-else-if="filteredNotifications.length > 0" class="grid h-[320px] overflow-scroll">
        <li v-for="(item, index) in filteredNotifications" :key="item.id">
          <div v-if="index > 0" class="p-divider-horizontal" />
          <div class="flex gap-4">
            <span>{{ item.text }}</span>
            <Checkbox v-model="seenIds" :value="item.id" />
          </div>
        </li>
      </ul>
      <div v-else class="text-sm">You have no notifications to read. Good job!</div>
    </Popover>
    <Button as="router-link" :to="{ name: ProfileSettingsRouteName }" icon="pi pi-cog" rounded variant="outlined" />
    <Button as="router-link" :to="{ name: ProfileDashboardRouteName }" icon="pi pi-user" rounded variant="outlined" />
  </div>
  <Button v-else as="router-link" :to="{ name: SignInRouteName }" icon="pi pi-sign-in" rounded variant="outlined" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import { getNotificationList } from '@/shared/api';
import { useAsync } from '@/shared/lib/async';
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileSettingsRouteName,
  SignInRouteName,
} from '@/shared/router/routes.ts';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Popover, { type PopoverMethods } from 'primevue/popover';
import Spinner from 'primevue/progressspinner';
import ToggleSwitch from 'primevue/toggleswitch';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const { isAuthenticated } = storeToRefs(useAuthStore());
const seenIds = ref<number[]>([]);
const notificationPopover = ref<PopoverMethods | null>(null);
const notificationsAsync = useAsync(
  async () => {
    const { data } = await getNotificationList<true>({ withCredentials: true });

    data.forEach((item) => item.isSeen && seenIds.value.push(item.id));

    return data;
  },
  [],
  {
    immediate: false,
    onError(e) {
      console.error(e?.message);
      toast.add({
        severity: 'error',
        summary: 'Fetch error',
        detail: 'Something went wrong while fetching notifications.',
        life: 5000,
      });
    },
  }
);
const onlyUnseen = ref(false);
const filteredNotifications = computed(() => {
  const items = notificationsAsync.state.value;

  return onlyUnseen.value ? items.filter((item) => !item.isSeen) : items;
});

watch(
  isAuthenticated,
  (value) => {
    if (!value) return;

    notificationsAsync.execute();
  },
  { once: true }
);
</script>
