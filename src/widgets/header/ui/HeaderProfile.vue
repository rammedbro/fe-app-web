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
      <div class="mb-4 font-bold">Notifications</div>

      <ul v-if="notifications.length > 0" class="grid h-[320px] overflow-scroll pr-4">
        <li v-for="(item, index) in notifications" :key="item.id">
          <div v-if="index > 0" class="p-divider-horizontal" />
          <div>{{ item.text }}</div>
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
import { useUserStore } from '@/entities/user';
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileSettingsRouteName,
  SignInRouteName,
} from '@/shared/router/routes.ts';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Popover, { type PopoverMethods } from 'primevue/popover';

const authStore = useAuthStore();
const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(authStore);
const { notifications } = storeToRefs(userStore);
const notificationPopover = ref<PopoverMethods | null>(null);

watch(isAuthenticated, (value) => {
  if (value) {
    userStore.fetchUser();
  } else {
    userStore.$reset();
  }
});
</script>
