<template>
  <div class="p-card mx-auto grid gap-4 p-8 lg:container">
    <div class="flex items-center justify-between">
      <label class="text-lg">Dark Mode</label>
      <ToggleSwitch v-model="darkMode" />
    </div>

    <div class="flex items-center justify-between">
      <label class="text-lg">Sticky Header</label>
      <ToggleSwitch v-model="stickyHeader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import { storeToRefs } from 'pinia';
import ToggleSwitch from 'primevue/toggleswitch';

const { darkMode, stickyHeader } = storeToRefs(useSettingsStore());
</script>
