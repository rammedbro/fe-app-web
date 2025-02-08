<template>
  <div v-if="user" class="flex items-center gap-4">
    <Button
      as="router-link"
      :to="{ name: ProfileFavoritesRouteName }"
      icon="pi pi-heart-fill"
      rounded
      variant="outlined"
    />
    <Button icon="pi pi-bell" rounded variant="outlined" @click="notificationPopover?.toggle" />
    <Popover ref="notificationPopover" class="w-[320px]">
      <div class="flex items-center justify-between mb-4">
        <div class="font-bold">Notifications</div>
        <label class="flex items-center">
          <span class="text-sm mr-2">Unseen</span>
          <ToggleSwitch v-model="onlyUnseen" />
        </label>
      </div>

      <ul class="grid gap-4 h-[320px] overflow-scroll">
        <li v-for="item in filteredNotifications" :key="item.id" class="flex gap-4 pb-4 border-b-gray border-b-2">
          <span>{{ item.text }}</span>
          <Checkbox v-model="seenIds" :value="item.id" />
        </li>
      </ul>
    </Popover>
    <Button as="router-link" :to="{ name: ProfileSettingsRouteName }" icon="pi pi-cog" rounded variant="outlined" />
    <Button as="router-link" :to="{ name: ProfileDashboardRouteName }" icon="pi pi-user" rounded variant="outlined" />
  </div>
  <Button v-else as="router-link" :to="{ name: SignInRouteName }" icon="pi pi-sign-in" rounded variant="outlined" />
</template>

<script setup lang="ts">
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileSettingsRouteName,
  SignInRouteName,
} from '@/shared/router/routes.ts';
import { useAsync } from '@/shared/lib/async';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Popover, { type PopoverMethods } from 'primevue/popover';
import ToggleSwitch from 'primevue/toggleswitch';
import { useUserStore } from '@/entities/user';
import { getNotificationList } from '@/shared/api';

const { user } = storeToRefs(useUserStore());
const seenIds = ref<number[]>([]);
const notificationPopover = ref<PopoverMethods | null>(null);
const notificationsAsync = useAsync(
  async (id: number) => {
    const { data } = await getNotificationList<true>({ path: { id } });

    data.forEach((item) => item.isSeen && seenIds.value.push(item.id));

    return data;
  },
  [],
  { immediate: false }
);
const onlyUnseen = ref(false);
const filteredNotifications = computed(() => {
  const items = notificationsAsync.state.value;

  return onlyUnseen.value ? items.filter((item) => !item.isSeen) : items;
});

watch(user, (value) => {
  if (value) {
    notificationsAsync.execute(value.id);
  }
});
</script>
