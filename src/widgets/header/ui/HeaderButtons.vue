<template>
  <div class="inline-flex items-center gap-2 xl:gap-4">
    <Button
      rounded
      class="ml-auto"
      :title="t('header.buttons.sticky-header.tooltip')"
      @click="settingsStore.toggleStickyHeader"
    >
      <template #icon>
        <i class="pi pi-thumbtack" :class="{ 'rotate-45': stickyHeader }" />
      </template>
    </Button>
    <Button rounded :title="t('header.buttons.dark-mode.tooltip')" @click="settingsStore.toggleDarkMode">
      <template #icon>
        <i class="pi" :class="{ 'pi-sun': !darkMode, 'pi-moon': darkMode }" />
      </template>
    </Button>
    <HeaderLocale />

    <template v-if="isAuthenticated">
      <template v-if="breakpoints.lg.value">
        <Button
          as="router-link"
          :to="{ name: ProfileFavoritesRouteName }"
          icon="pi pi-heart-fill"
          :title="t('header.buttons.favorites.tooltip')"
          rounded
          variant="outlined"
        />
        <HeaderNotifications />
        <Button
          as="router-link"
          :to="{ name: ProfileSettingsRouteName }"
          icon="pi pi-cog"
          :title="t('header.buttons.settings.tooltip')"
          rounded
          variant="outlined"
        />
      </template>
      <Button
        as="router-link"
        :to="{ name: ProfileDashboardRouteName }"
        icon="pi pi-user"
        :title="t('header.buttons.profile.tooltip')"
        rounded
        variant="outlined"
      />
    </template>
    <Button
      v-else
      as="router-link"
      :to="{ name: SignInRouteName }"
      icon="pi pi-sign-in"
      :title="t('header.buttons.sign-in.tooltip')"
      rounded
      variant="outlined"
    />
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
import messages from '@/widgets/header/i18n/messages.json';
import { useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';
import HeaderLocale from './buttons/HeaderLocale.vue';
import HeaderNotifications from './buttons/HeaderNotifications.vue';

const { t } = useI18n({ messages });
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
