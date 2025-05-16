<template>
  <div class="inline-flex items-center gap-2 xl:gap-4">
    <Button rounded class="ml-auto" title="Toggle sticky header" @click="stickyHeader = !stickyHeader">
      <template #icon>
        <i class="pi pi-thumbtack" :class="{ 'rotate-45': stickyHeader }" />
      </template>
    </Button>
    <Button rounded title="Toggle dark theme" @click="darkMode = !darkMode">
      <template #icon>
        <i class="pi" :class="{ 'pi-sun': !darkMode, 'pi-moon': darkMode }" />
      </template>
    </Button>
    <template v-if="isAuthenticated">
      <template v-if="breakpoints.lg.value">
        <Button
          as="router-link"
          :to="{ name: ProfileFavoritesRouteName }"
          icon="pi pi-heart-fill"
          rounded
          variant="outlined"
        />
        <HeaderNotifications />
        <Button as="router-link" :to="{ name: ProfileSettingsRouteName }" icon="pi pi-cog" rounded variant="outlined" />
      </template>
      <Button as="router-link" :to="{ name: ProfileDashboardRouteName }" icon="pi pi-user" rounded variant="outlined" />
    </template>
    <Button v-else as="router-link" :to="{ name: SignInRouteName }" icon="pi pi-sign-in" rounded variant="outlined" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import { useFavoriteStore } from '@/entities/favorite';
import { useSettingsStore } from '@/entities/settings';
import { userSocket, useUserStore } from '@/entities/user';
import { reload } from '@/shared/lib/browser';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileSettingsRouteName,
  SignInRouteName,
} from '@/shared/model/routes';
import { useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import HeaderNotifications from './HeaderNotifications.vue';

const breakpoints = useBreakpoints(defaultBreakpoints);
const authStore = useAuthStore();
const userStore = useUserStore();
const favoriteStore = useFavoriteStore();
const { isAuthenticated } = storeToRefs(authStore);
const settingsStore = useSettingsStore();
const { stickyHeader, darkMode } = storeToRefs(settingsStore);

userSocket.on('signOut', () => {
  userSocket.disconnect();
  reload();
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
    reload();
  }
});

function onUserAuthenticate() {
  userStore.fetchUser();
  favoriteStore.fetchFavorites();
  userSocket.connect();
}
</script>
