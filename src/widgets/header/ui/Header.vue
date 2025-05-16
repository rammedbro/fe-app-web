<template>
  <header
    class="static top-0 z-(--z-sticky) bg-white shadow-sm dark:bg-surface-800 dark:text-surface-200 dark:shadow-lg"
    :class="{ sticky: stickyHeader }"
  >
    <div class="container mx-auto flex flex-wrap gap-4 py-6 lg:items-center lg:py-10">
      <RouterLink :to="{ name: HomeRouteName }" class="text-3xl font-bold text-primary uppercase">Morent</RouterLink>

      <HeaderProfile class="ml-auto md:order-3" />

      <HeaderSearch class="min-w-[320px] flex-1 lg:mx-16 lg:max-w-[500px]" />
    </div>
    <ProgressBar class="rounded-none" />
  </header>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import { HomeRouteName } from '@/shared/model/routes';
import { ProgressBar } from '@/widgets/progress-bar';
import { storeToRefs } from 'pinia';
import HeaderProfile from './HeaderProfile.vue';
import HeaderSearch from './HeaderSearch.vue';

const settingsStore = useSettingsStore();
const { stickyHeader } = storeToRefs(settingsStore);
</script>
