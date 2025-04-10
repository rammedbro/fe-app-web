<template>
  <header
    class="static top-0 z-(--z-sticky) bg-white shadow-sm dark:bg-surface-800 dark:text-surface-200 dark:shadow-lg"
    :class="{ sticky: stickyHeader }"
  >
    <div class="container mx-auto flex flex-wrap gap-4 py-6 lg:items-center lg:py-10">
      <RouterLink :to="{ name: HomeRouteName }" class="text-3xl font-bold text-primary uppercase">Morent</RouterLink>

      <HeaderProfile class="ml-auto lg:order-3" />

      <div class="flex flex-1 items-center gap-2 lg:order-2 lg:gap-4">
        <IconField class="flex-1 lg:ml-16 lg:max-w-[500px]">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchInput"
            placeholder="Search something here"
            class="w-full rounded-full"
            @keyup.enter="search"
          />
          <InputIcon class="pi pi-sliders-h cursor-pointer" @click="search" />
        </IconField>
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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import { CarListRouteName, HomeRouteName } from '@/shared/model/routes';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useRoute, useRouter } from 'vue-router';
import HeaderProfile from './HeaderProfile.vue';

const router = useRouter();
const route = useRoute();
const settingsStore = useSettingsStore();
const { stickyHeader, darkMode } = storeToRefs(settingsStore);
const searchInput = computed({
  get: () => route.query.search as string | undefined,
  set: (value: string | undefined) => router.push({ path: route.path, query: { search: value } }),
});

function search() {
  router.push({ name: CarListRouteName, query: { search: searchInput.value } });
}
</script>
