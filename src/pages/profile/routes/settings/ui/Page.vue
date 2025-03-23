<template>
  <div class="p-card mx-auto p-8 lg:container">
    <div class="flex justify-between">
      <label>Dark Mode</label>
      <ToggleSwitch v-model="darkMode">
        <template #handle="{ checked }">
          <i class="pi text-sm" :class="{ 'pi-sun': !checked, 'pi-moon': checked }" />
        </template>
      </ToggleSwitch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import { storeToRefs } from 'pinia';
import ToggleSwitch from 'primevue/toggleswitch';

const { darkMode } = storeToRefs(useSettingsStore());
</script>
