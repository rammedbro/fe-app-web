<template>
  <div>
    <Drawer v-model:visible="isDrawerVisible" :show-close-icon="false" :modal="false">
      <div class="flex h-full flex-col">
        <section class="mb-12">
          <div class="mb-6 ml-4 font-semibold text-surface-400 uppercase">
            {{ t('profile.aside.menus.main.title') }}
          </div>
          <ul class="grid gap-2">
            <li v-for="item in menus.main" :key="item.route">
              <RouterLink
                :to="{ name: item.route }"
                :title="item.text"
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
          <div class="mb-6 ml-4 font-semibold text-surface-400 uppercase">
            {{ t('profile.aside.menus.preferences.title') }}
          </div>
          <ul class="grid gap-2">
            <li v-for="item in menus.preferences" :key="item.route">
              <RouterLink
                :to="{ name: item.route }"
                :title="item.text"
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
          <Button
            icon="pi pi-sign-out"
            text
            :label="t('profile.aside.buttons.sign-out')"
            size="large"
            :loading="isLoading"
            @click="logout"
          />
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
import messages from '@/pages/profile/i18n/messages.json';
import { logError } from '@/shared/lib/log';
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
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n({ messages });
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const menus = computed(() => ({
  main: [
    { route: ProfileDashboardRouteName, text: t('profile.aside.menus.main.items.dashboard'), icon: 'pi-home' },
    { route: ProfileFavoritesRouteName, text: t('profile.aside.menus.main.items.favorites'), icon: 'pi-heart' },
    { route: ProfileOrderListRouteName, text: t('profile.aside.menus.main.items.orders'), icon: 'pi-car' },
  ],
  preferences: [
    { route: ProfileSettingsRouteName, text: t('profile.aside.menus.preferences.items.settings'), icon: 'pi-cog' },
  ],
}));
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
      logError(error);
      toast.add({
        severity: 'error',
        summary: 'Logout failed',
        detail: 'Something went wrong while letting you out',
        life: 5000,
      });
  }
}
</script>
