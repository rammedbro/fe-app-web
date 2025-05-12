<template>
  <div v-if="isAuthenticated" class="flex items-center gap-2 lg:gap-4">
    <Button
      as="router-link"
      :to="{ name: ProfileFavoritesRouteName }"
      icon="pi pi-heart-fill"
      rounded
      variant="outlined"
    />
    <HeaderNotifications />
    <Button as="router-link" :to="{ name: ProfileSettingsRouteName }" icon="pi pi-cog" rounded variant="outlined" />
    <Button as="router-link" :to="{ name: ProfileDashboardRouteName }" icon="pi pi-user" rounded variant="outlined" />
  </div>
  <Button v-else as="router-link" :to="{ name: SignInRouteName }" icon="pi pi-sign-in" rounded variant="outlined" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import { userSocket, useUserStore } from '@/entities/user';
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileSettingsRouteName,
  SignInRouteName,
} from '@/shared/model/routes';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import HeaderNotifications from './HeaderNotifications.vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(authStore);

userSocket.on('signOut', () => {
  userSocket.disconnect();

  if (isAuthenticated.value) {
    window.location.reload();
  }
});

onMounted(() => {
  if (isAuthenticated.value) {
    onUserAuthenticate();
  }
});

watch(isAuthenticated, (value) => {
  if (value) {
    onUserAuthenticate();
  } else {
    window.location.reload();
  }
});

function onUserAuthenticate() {
  userStore.fetchUser();
  userSocket.connect();
}
</script>
