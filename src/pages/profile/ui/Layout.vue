<template>
  <div>
    <Drawer v-model:visible="isDrawerVisible" :show-close-icon="false" :modal="false">
      <div class="flex h-full flex-col">
        <section class="mb-12">
          <div class="mb-6 ml-4 font-semibold text-surface-400 uppercase">Main menu</div>
          <ul class="grid gap-2">
            <li v-for="item in menus.main" :key="item.route">
              <RouterLink
                :to="{ name: item.route }"
                exact-active-class="bg-primary text-surface-200"
                class="flex gap-4 rounded-lg p-4 [&:not(.router-link-active)]:hover:bg-primary/5"
              >
                <i class="pi text-2xl" :class="item.icon" />
                <span class="text-lg">{{ item.text }}</span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <section>
          <div class="mb-6 ml-4 font-semibold text-surface-400 uppercase">Preferences</div>
          <ul class="grid gap-2">
            <li v-for="item in menus.preferences" :key="item.route">
              <RouterLink
                :to="{ name: item.route }"
                exact-active-class="bg-primary text-surface-200"
                class="flex gap-4 rounded-lg p-4 [&:not(.router-link-active)]:hover:bg-primary/5"
              >
                <i class="pi text-2xl" :class="item.icon" />
                <span class="text-lg">{{ item.text }}</span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <section class="mt-auto">
          <Button icon="pi pi-sign-out" text label="Sign Out" size="large" :loading="isLoading" @click="logout" />
        </section>
      </div>
    </Drawer>

    <div class="px-4 py-8 xl:px-8">
      <div class="mx-auto flex justify-end lg:container">
        <div class="p-toolbar mb-6 rounded-full">
          <div class="p-toolbar-center">
            <Button icon="pi pi-bars" severity="secondary" text @click="isDrawerVisible = true" />
          </div>
        </div>
      </div>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileOrderListRouteName,
  ProfileSettingsRouteName,
  SignInRouteName,
} from '@/shared/model/routes';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const menus = {
  main: [
    { route: ProfileDashboardRouteName, text: 'Dashboard', icon: 'pi-home' },
    { route: ProfileFavoritesRouteName, text: 'Favorites', icon: 'pi-heart' },
    { route: ProfileOrderListRouteName, text: 'Rents', icon: 'pi-car' },
    // { text: 'Chat', icon: 'pi-send' },
  ],
  preferences: [
    { route: ProfileSettingsRouteName, text: 'Settings', icon: 'pi-cog' },
    // { text: 'Help & Center', icon: 'pi-question-circle' },
  ],
};
const isDrawerVisible = ref(false);
const isLoading = ref(false);

async function logout() {
  isLoading.value = true;

  const { error, status } = await authStore.logout();

  isLoading.value = false;

  switch (status) {
    case 200:
      await router.push({ name: SignInRouteName });
      toast.add({
        severity: 'success',
        summary: 'Logout succeeded',
        detail: 'Lets go to the sign in page',
        life: 5000,
      });
      break;
    default:
      console.error(error);
      toast.add({
        severity: 'error',
        summary: 'Logout failed',
        detail: 'Something went wrong while letting you out',
        life: 5000,
      });
  }
}
</script>
