<template>
  <div>
    <Drawer v-model:visible="isDrawerVisible" :show-close-icon="false" :modal="false">
      <div class="flex flex-col h-full">
        <section class="mb-12">
          <div class="font-semibold uppercase text-content-300 ml-4 mb-6">Main menu</div>
          <ul class="grid gap-2">
            <li v-for="item in menus.main" :key="item.route">
              <RouterLink
                :to="{ name: item.route }"
                exact-active-class="bg-primary text-white"
                class="flex gap-4 p-4 rounded-lg [&:not(.router-link-active)]:hover:bg-primary/5"
              >
                <i class="pi text-2xl" :class="item.icon" />
                <span class="text-lg">{{ item.text }}</span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <section>
          <div class="font-semibold uppercase text-content-300 ml-4 mb-6">Preferences</div>
          <ul class="grid gap-2">
            <li v-for="item in menus.preferences" :key="item.route">
              <RouterLink
                :to="{ name: item.route }"
                exact-active-class="bg-primary text-white"
                class="flex gap-4 p-4 rounded-lg [&:not(.router-link-active)]:hover:bg-primary/5"
              >
                <i class="pi text-2xl" :class="item.icon" />
                <span class="text-lg">{{ item.text }}</span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <section class="mt-auto">
          <Button icon="pi pi-sign-out" text label="Sign Out" size="large" @click="signOut" />
        </section>
      </div>
    </Drawer>

    <div class="px-4 xl:px-8 py-8">
      <div class="flex justify-end">
        <Toolbar class="rounded-full mb-6">
          <template #center>
            <Button icon="pi pi-bars" severity="secondary" text @click="isDrawerVisible = true" />
          </template>
        </Toolbar>
      </div>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ProfileDashboardRouteName,
  ProfileFavoritesRouteName,
  ProfileSettingsRouteName,
} from '@/shared/router/routes.ts';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Toolbar from 'primevue/toolbar';
import { signOut } from '@/shared/api';

const menus = {
  main: [
    { route: ProfileDashboardRouteName, text: 'Dashboard', icon: 'pi-home' },
    { route: ProfileFavoritesRouteName, text: 'Favorites', icon: 'pi-heart' },
    // { text: 'Rents', icon: 'pi-car' },
    // { text: 'Chat', icon: 'pi-send' },
  ],
  preferences: [
    { route: ProfileSettingsRouteName, text: 'Settings', icon: 'pi-cog' },
    // { text: 'Help & Center', icon: 'pi-question-circle' },
  ],
};
const isDrawerVisible = ref(false);
</script>
